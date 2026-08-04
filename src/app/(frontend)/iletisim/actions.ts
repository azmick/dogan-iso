'use server'

import { getContactInfo, getPayloadClient, getSiteSettings } from '@/lib/payload'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: Partial<Record<'name' | 'email' | 'phone' | 'subject' | 'message' | 'kvkk', string>>
}

export const initialContactFormState: ContactFormState = { status: 'idle' }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const asString = (value: FormDataEntryValue | null): string =>
  typeof value === 'string' ? value.trim() : ''

/** İletişim formunu doğrular, Payload'a kaydeder ve bildirim e-postası gönderir. */
export const submitContactForm = async (
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> => {
  // Bot tuzağı: gerçek kullanıcılar bu gizli alanı doldurmaz.
  if (asString(formData.get('website'))) {
    return { status: 'success', message: 'Mesajınız alındı.' }
  }

  const name = asString(formData.get('name'))
  const email = asString(formData.get('email'))
  const phone = asString(formData.get('phone'))
  const subject = asString(formData.get('subject'))
  const message = asString(formData.get('message'))
  const kvkkConsent = formData.get('kvkk') === 'on'

  const errors: ContactFormState['errors'] = {}

  if (name.length < 2) errors.name = 'Lütfen ad soyad bilgisi girin.'
  if (!EMAIL_PATTERN.test(email)) errors.email = 'Geçerli bir e-posta adresi girin.'
  if (phone && phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Telefon numarası en az 10 haneli olmalıdır.'
  }
  if (subject.length < 3) errors.subject = 'Lütfen bir konu yazın.'
  if (message.length < 10) errors.message = 'Mesajınız en az 10 karakter olmalıdır.'
  if (!kvkkConsent) errors.kvkk = 'Devam etmek için aydınlatma metnini onaylamanız gerekir.'

  if (Object.keys(errors).length) {
    return {
      status: 'error',
      message: 'Lütfen işaretli alanları kontrol edin.',
      errors,
    }
  }

  try {
    const payload = await getPayloadClient()

    await payload.create({
      collection: 'contact-submissions',
      data: { name, email, phone: phone || undefined, subject, message, kvkkConsent },
      overrideAccess: true,
    })

    // E-posta adaptörü yapılandırıldıysa bildirim gönder (SMTP_HOST tanımlıysa).
    const notifyTo = process.env.CONTACT_NOTIFY_TO
    if (notifyTo && process.env.SMTP_HOST) {
      const [settings, contact] = await Promise.all([getSiteSettings(), getContactInfo()])
      const siteName = settings?.siteName || 'Web sitesi'

      await payload
        .sendEmail({
          to: notifyTo,
          replyTo: email,
          subject: `[${siteName}] Yeni iletişim formu: ${subject}`,
          text: [
            `Ad Soyad: ${name}`,
            `E-posta: ${email}`,
            `Telefon: ${phone || '-'}`,
            `Konu: ${subject}`,
            '',
            'Mesaj:',
            message,
            '',
            `Bu bildirim ${contact?.email || siteName} sitesinden gönderildi.`,
          ].join('\n'),
        })
        .catch((error: unknown) => {
          // E-posta gönderilemese de kayıt panele düştüğü için formu başarısız saymıyoruz.
          console.error('İletişim formu bildirim e-postası gönderilemedi:', error)
        })
    }

    return {
      status: 'success',
      message: 'Mesajınız bize ulaştı. En kısa sürede size dönüş yapacağız.',
    }
  } catch (error) {
    console.error('İletişim formu kaydedilemedi:', error)

    return {
      status: 'error',
      message:
        'Mesajınız gönderilemedi. Lütfen daha sonra tekrar deneyin veya telefonla bize ulaşın.',
    }
  }
}
