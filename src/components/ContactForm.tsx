'use client'

import { useActionState, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

import { CheckIcon, ShieldCheckIcon } from '@/components/Icons'
import { Modal } from '@/components/Modal'
import { submitContactForm, type ContactFormState } from '@/app/(frontend)/iletisim/actions'

type ContactFormProps = {
  /** Açılır pencerede gösterilen aydınlatma metni başlığı (paneldeki sayfa başlığı). */
  kvkkNoticeTitle: string
  /** Aydınlatma metninin kendisi — sunucuda hazırlanıp buraya verilir. */
  kvkkNotice: ReactNode
}

const initialContactFormState: ContactFormState = { status: 'idle' }

const KVKK_REQUIRED_MESSAGE = 'Devam etmek için aydınlatma metnini onaylamanız gerekir.'

const fieldClass =
  'w-full rounded-md border bg-bg px-3.5 py-2.5 text-[15px] text-text transition-colors placeholder:text-text-muted/60 focus:border-accent focus:outline-none'

const labelClass = 'mb-1.5 block text-sm font-semibold text-primary'

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending} className="btn btn-primary w-full disabled:opacity-60 sm:w-auto">
      {pending ? 'Gönderiliyor…' : 'Mesajı Gönder'}
    </button>
  )
}

const FieldError = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p id={id} className="mt-1.5 text-sm text-red-700">
      {message}
    </p>
  ) : null

export const ContactForm = ({ kvkkNoticeTitle, kvkkNotice }: ContactFormProps) => {
  const [state, formAction] = useActionState<ContactFormState, FormData>(
    submitContactForm,
    initialContactFormState,
  )

  // React her gönderimden sonra formu form.reset() ile sıfırlar. Doğrulama hatasında
  // yazılanlar ve KVKK onayı silinmesin diye bunu engelliyoruz (başarıda form zaten
  // teşekkür mesajına dönüyor). React sıfırlamayı kendi olay sistemi kapalıyken yaptığı
  // için onReset prop'u tetiklenmez; formun kendi dinleyicisi gerekir.
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const form = formRef.current
    if (!form) return

    const keepValues = (event: Event) => event.preventDefault()
    form.addEventListener('reset', keepValues)

    return () => form.removeEventListener('reset', keepValues)
  }, [])

  // Onay yalnızca açılır penceredeki "Kabul Ediyorum" ile verilir.
  const [kvkkAccepted, setKvkkAccepted] = useState(false)
  const [kvkkOpen, setKvkkOpen] = useState(false)
  const [kvkkMissing, setKvkkMissing] = useState(false)

  const acceptKvkk = () => {
    setKvkkAccepted(true)
    setKvkkMissing(false)
    setKvkkOpen(false)
  }

  const rejectKvkk = () => {
    setKvkkAccepted(false)
    setKvkkMissing(true)
    setKvkkOpen(false)
  }

  // Onay yoksa form sunucuya hiç gitmez; onun yerine metin açılır.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (kvkkAccepted) return

    event.preventDefault()
    setKvkkMissing(true)
    setKvkkOpen(true)
  }

  if (state.status === 'success') {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-lg border border-border bg-bg-soft px-6 py-14 text-center"
      >
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
          <CheckIcon width={26} height={26} />
        </span>
        <h3 className="text-lg">Teşekkür ederiz</h3>
        <p className="max-w-sm text-[15px] leading-relaxed text-text-muted">{state.message}</p>
      </div>
    )
  }

  const errors = state.errors ?? {}
  const kvkkError = kvkkAccepted
    ? undefined
    : (errors.kvkk ?? (kvkkMissing ? KVKK_REQUIRED_MESSAGE : undefined))

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5"
    >
      {state.status === 'error' && state.message ? (
        <p role="alert" className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.message}
        </p>
      ) : null}

      {/* Bot tuzağı — ekran okuyuculardan ve kullanıcıdan gizli */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Web siteniz</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Ad Soyad <span className="text-accent-dark">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`${fieldClass} ${errors.name ? 'border-red-400' : 'border-border'}`}
            placeholder="Adınız ve soyadınız"
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            E-posta <span className="text-accent-dark">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`${fieldClass} ${errors.email ? 'border-red-400' : 'border-border'}`}
            placeholder="ornek@firma.com.tr"
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Telefon
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={`${fieldClass} ${errors.phone ? 'border-red-400' : 'border-border'}`}
            placeholder="0 (5xx) xxx xx xx"
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>

        <div>
          <label htmlFor="subject" className={labelClass}>
            Konu <span className="text-accent-dark">*</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            className={`${fieldClass} ${errors.subject ? 'border-red-400' : 'border-border'}`}
            placeholder="Örn: ISO 27001 teklif talebi"
          />
          <FieldError id="subject-error" message={errors.subject} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Mesajınız <span className="text-accent-dark">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`${fieldClass} resize-y ${errors.message ? 'border-red-400' : 'border-border'}`}
          placeholder="Kuruluşunuz, çalışan sayınız ve talep ettiğiniz kapsam hakkında kısaca bilgi verin."
        />
        <FieldError id="message-error" message={errors.message} />
      </div>

      <div>
        <label htmlFor="kvkk" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-text-muted">
          <input
            id="kvkk"
            name="kvkk"
            type="checkbox"
            required
            checked={kvkkAccepted}
            onChange={(event) => {
              // İşaretlemek metni açar; işaret penceredeki onayla konur. İşareti kaldırmak serbest.
              if (event.target.checked) setKvkkOpen(true)
              else setKvkkAccepted(false)
            }}
            aria-invalid={Boolean(kvkkError)}
            aria-describedby={kvkkError ? 'kvkk-error' : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-border accent-[var(--color-primary)]"
          />
          <span>
            <button
              type="button"
              onClick={() => setKvkkOpen(true)}
              aria-haspopup="dialog"
              className="font-semibold text-link underline underline-offset-2 transition-colors hover:text-primary-dark"
            >
              KVKK Aydınlatma Metni
            </button>
            ’ni okudum, kişisel verilerimin bu kapsamda işlenmesini kabul ediyorum.{' '}
            <span className="text-accent-dark">*</span>
          </span>
        </label>
        <FieldError id="kvkk-error" message={kvkkError} />
      </div>

      <div>
        <SubmitButton />
        <p className="mt-3 text-xs text-text-muted">
          <span className="text-accent-dark">*</span> işaretli alanlar zorunludur.
        </p>
      </div>

      <Modal
        open={kvkkOpen}
        onClose={() => setKvkkOpen(false)}
        title={kvkkNoticeTitle}
        icon={<ShieldCheckIcon />}
        footer={
          <>
            <p className="hidden text-xs leading-relaxed text-text-muted md:mr-auto md:block">
              Mesajınızı gönderebilmek için onayınız gereklidir.
            </p>
            <button type="button" onClick={rejectKvkk} className="btn btn-outline whitespace-nowrap">
              Kabul Etmiyorum
            </button>
            <button type="button" onClick={acceptKvkk} className="btn btn-primary whitespace-nowrap">
              <CheckIcon width={18} height={18} />
              Okudum, Kabul Ediyorum
            </button>
          </>
        }
      >
        {kvkkNotice}
      </Modal>
    </form>
  )
}
