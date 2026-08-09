import Link from 'next/link'

import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from '@/components/Icons'
import { Logo } from '@/components/Logo'
import { SocialLinks } from '@/components/SocialLinks'
import { splitEmail, toTelHref } from '@/lib/format'
import { getContactInfo, getCorporateMenuPages, getSiteSettings } from '@/lib/payload'
import { ROUTES } from '@/lib/site'

const QUICK_LINKS = [
  { label: 'Ana Sayfa', href: ROUTES.home },
  { label: 'Hakkımızda', href: ROUTES.about },
  { label: 'Hizmetlerimiz', href: ROUTES.services },
  { label: 'Blog', href: ROUTES.blog },
  { label: 'Sıkça Sorulan Sorular', href: ROUTES.faq },
  { label: 'İletişim', href: ROUTES.contact },
]

export const Footer = async () => {
  const [settings, contact, corporatePages] = await Promise.all([
    getSiteSettings(),
    getContactInfo(),
    getCorporateMenuPages(),
  ])

  const siteName = settings?.siteName || 'Örnek ISO Belgelendirme'
  const usefulLinks = contact?.usefulLinks ?? []
  // Dar sütunda adres "@" işaretinden sonra kırılsın diye iki parçaya ayrılıyor.
  const [emailLocal, emailDomain] = splitEmail(contact?.email)

  return (
    <footer className="mt-auto bg-navy text-white/75">
      <div className="container-site py-12 md:py-16">
        {/* Üst kısım: logo + sosyal medya */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-center md:justify-between">
          <Logo
            siteName={siteName}
            tagline={settings?.tagline}
            image={settings?.logoInverted || settings?.logo}
            inverted
          />

          <div className="flex flex-col gap-2 md:items-end">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Bizi takip edin
            </span>
            <SocialLinks
              social={contact?.social}
              className="-ml-2 md:ml-0"
              linkClassName="bg-white/5 text-white/70 hover:bg-accent hover:text-white"
            />
          </div>
        </div>

        {/* Sütunlar */}
        {/*
          Masaüstünde sütunlar eşit değil: İletişim sütunu (3.) en uzun tek
          parça içeriği (e-posta adresi) taşıdığı için biraz daha geniş.
          Eşit dört sütunda adres satıra sığmayıp ikiye bölünüyordu.
        */}
        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.2fr_1fr]">
          <nav aria-labelledby="footer-quick-links">
            <h2
              id="footer-quick-links"
              className="mb-4 text-sm font-bold uppercase tracking-wider text-white"
            >
              Hızlı Linkler
            </h2>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-0.5 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-corporate">
            <h2
              id="footer-corporate"
              className="mb-4 text-sm font-bold uppercase tracking-wider text-white"
            >
              Kurumsal
            </h2>
            <ul className="space-y-2.5 text-sm">
              {corporatePages.map((page) => (
                <li key={page.id}>
                  <Link
                    href={`/${page.slug}`}
                    className="inline-block py-0.5 transition-colors hover:text-accent"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">İletişim</h2>
            <ul className="space-y-3.5 text-sm">
              {contact?.addressLine ? (
                <li className="flex gap-3">
                  <MapPinIcon width={17} height={17} className="mt-0.5 shrink-0 text-accent" />
                  <span className="whitespace-pre-line">{contact.addressLine}</span>
                </li>
              ) : null}
              {contact?.phone ? (
                <li className="flex gap-3">
                  <PhoneIcon width={17} height={17} className="mt-0.5 shrink-0 text-accent" />
                  <a href={toTelHref(contact.phone)} className="transition-colors hover:text-accent">
                    {contact.phone}
                  </a>
                </li>
              ) : null}
              {contact?.email ? (
                <li className="flex gap-3">
                  <MailIcon width={17} height={17} className="mt-0.5 shrink-0 text-accent" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="break-words transition-colors hover:text-accent"
                  >
                    {emailLocal}
                    <wbr />
                    {emailDomain}
                  </a>
                </li>
              ) : null}
              {contact?.workingHours ? (
                <li className="flex gap-3">
                  <ClockIcon width={17} height={17} className="mt-0.5 shrink-0 text-accent" />
                  <span>{contact.workingHours}</span>
                </li>
              ) : null}
            </ul>
          </address>

          <nav aria-labelledby="footer-useful">
            <h2
              id="footer-useful"
              className="mb-4 text-sm font-bold uppercase tracking-wider text-white"
            >
              Faydalı Linkler
            </h2>
            <ul className="space-y-2.5 text-sm">
              {usefulLinks.map((link) => (
                <li key={link.id ?? link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block py-0.5 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Alt şerit */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteName}. Tüm hakları saklıdır.
          </p>
          <p>
            Bu sitedeki içerikler temsilidir.{' '}
            <Link href={ROUTES.contact} className="underline-offset-2 hover:text-accent hover:underline">
              Bize ulaşın
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
