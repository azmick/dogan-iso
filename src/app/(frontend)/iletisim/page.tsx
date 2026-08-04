import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ContactForm } from '@/components/ContactForm'
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from '@/components/Icons'
import { JsonLd } from '@/components/JsonLd'
import { PageHero } from '@/components/PageHero'
import { SocialLinks } from '@/components/SocialLinks'
import { toTelHref, toWhatsAppHref } from '@/lib/format'
import { getContactInfo, getSiteSettings } from '@/lib/payload'
import { buildMetadata, SITE_URL } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

export const revalidate = 300

const DESCRIPTION =
  'Belgelendirme, denetim ve KVKK uyum hizmetlerimiz hakkında bilgi almak veya teklif istemek için bize ulaşın.'

export const generateMetadata = async (): Promise<Metadata> =>
  buildMetadata({
    title: 'İletişim',
    description: DESCRIPTION,
    path: ROUTES.contact,
  })

export default async function ContactPage() {
  const [contact, settings] = await Promise.all([getContactInfo(), getSiteSettings()])

  const siteName = settings?.siteName || 'Örnek ISO Belgelendirme'

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: siteName,
    description: DESCRIPTION,
    url: SITE_URL,
    telephone: contact?.phone || undefined,
    email: contact?.email || undefined,
    ...(contact?.addressLine
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: contact.addressLine,
            addressLocality: contact.addressLocality || undefined,
            postalCode: contact.postalCode || undefined,
            addressCountry: 'TR',
          },
        }
      : {}),
    ...(contact?.latitude && contact?.longitude
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: contact.latitude,
            longitude: contact.longitude,
          },
        }
      : {}),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  }

  const details = [
    contact?.addressLine && {
      label: 'Adres',
      value: contact.addressLine,
      Icon: MapPinIcon,
    },
    contact?.phone && {
      label: 'Telefon',
      value: contact.phone,
      href: toTelHref(contact.phone),
      Icon: PhoneIcon,
    },
    contact?.whatsapp && {
      label: 'WhatsApp',
      value: contact.whatsapp,
      href: toWhatsAppHref(contact.whatsapp),
      external: true,
      Icon: WhatsAppIcon,
    },
    contact?.email && {
      label: 'E-posta',
      value: contact.email,
      href: `mailto:${contact.email}`,
      Icon: MailIcon,
    },
    contact?.workingHours && {
      label: 'Çalışma Saatleri',
      value: contact.workingHours,
      Icon: ClockIcon,
    },
  ].filter(Boolean) as {
    label: string
    value: string
    href?: string
    external?: boolean
    Icon: typeof MapPinIcon
  }[]

  return (
    <>
      <PageHero title="İletişim" description={DESCRIPTION} />
      <Breadcrumbs items={[{ label: 'İletişim' }]} />

      <div className="container-site py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-14">
          {/* Sol sütun: iletişim bilgileri */}
          <div>
            <h2 className="section-title text-xl sm:text-2xl">İletişim Bilgilerimiz</h2>

            <dl className="mt-8 space-y-6">
              {details.map(({ label, value, href, external, Icon }) => (
                <div key={label} className="flex gap-4">
                  <span
                    aria-hidden
                    className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary"
                  >
                    <Icon width={19} height={19} />
                  </span>

                  <div>
                    <dt className="text-xs font-bold uppercase tracking-wider text-text-muted">
                      {label}
                    </dt>
                    <dd className="mt-1 text-[15px] leading-relaxed text-text">
                      {href ? (
                        <a
                          href={href}
                          {...(external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className="transition-colors hover:text-accent-dark"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="whitespace-pre-line">{value}</span>
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-8 border-t border-border pt-6">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">
                Sosyal medya
              </p>
              <SocialLinks
                social={contact?.social}
                className="-ml-2"
                linkClassName="border border-border text-primary hover:border-accent hover:bg-primary-soft"
              />
            </div>

            <p className="mt-8 rounded-md border border-border bg-bg-soft p-4 text-xs leading-relaxed text-text-muted">
              Buradaki adres, telefon ve e-posta bilgileri temsilidir. Yönetim panelindeki{' '}
              <strong>Ayarlar → İletişim Bilgileri</strong> bölümünden gerçek bilgilerinizle
              güncelleyebilirsiniz.
            </p>
          </div>

          {/* Sağ sütun: form */}
          <div className="rounded-lg border border-border bg-bg p-6 shadow-[var(--shadow-card)] md:p-8">
            <h2 className="section-title text-xl sm:text-2xl">Bize Yazın</h2>
            <p className="mb-8 mt-5 text-[15px] leading-relaxed text-text-muted">
              Formu doldurun, uzman ekibimiz en kısa sürede size dönüş yapsın.
            </p>

            <ContactForm />
          </div>
        </div>
      </div>

      {/* Harita */}
      {contact?.mapEmbedUrl ? (
        <section aria-label="Konum haritası" className="border-t border-border">
          <iframe
            src={contact.mapEmbedUrl}
            title="Ofis konumu haritası"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[22rem] w-full border-0 md:h-[26rem]"
          />
        </section>
      ) : null}

      <JsonLd data={localBusinessJsonLd} />
    </>
  )
}
