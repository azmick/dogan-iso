import Link from 'next/link'

import { MailIcon, MapPinIcon, PhoneIcon } from '@/components/Icons'
import { Logo } from '@/components/Logo'
import { SiteNav } from '@/components/SiteNav'
import { SocialLinks } from '@/components/SocialLinks'
import { toTelHref } from '@/lib/format'
import { getContactInfo, getCorporateMenuPages, getServiceLinks, getSiteSettings } from '@/lib/payload'
import { ROUTES, type NavItem } from '@/lib/site'

export const Header = async () => {
  const [settings, contact, services, corporatePages] = await Promise.all([
    getSiteSettings(),
    getContactInfo(),
    getServiceLinks(),
    getCorporateMenuPages(),
  ])

  const navItems: NavItem[] = [
    { label: 'Ana Sayfa', href: ROUTES.home },
    {
      label: 'Kurumsal',
      href: ROUTES.about,
      children: [
        { label: 'Hakkımızda', href: ROUTES.about },
        ...corporatePages.map((page) => ({ label: page.title, href: `/${page.slug}` })),
        { label: 'Sıkça Sorulan Sorular', href: ROUTES.faq },
      ],
    },
    {
      label: 'Hizmetlerimiz',
      href: ROUTES.services,
      children: services.map((service) => ({
        label: service.title,
        href: `${ROUTES.services}/${service.slug}`,
      })),
    },
    { label: 'Blog', href: ROUTES.blog },
    { label: 'İletişim', href: ROUTES.contact },
  ]

  return (
    <header className="sticky top-0 z-50 bg-bg">
      {/* Üst ince şerit — mobilde gizli */}
      <div className="hidden bg-navy text-white lg:block">
        <div className="container-site flex h-10 items-center justify-between gap-6 text-[13px]">
          <ul className="flex items-center gap-6 text-white/80">
            {contact?.addressLine ? (
              <li className="flex items-center gap-2">
                <MapPinIcon width={15} height={15} className="text-accent" />
                <span className="max-w-[42ch] truncate">{contact.addressLine}</span>
              </li>
            ) : null}
            {contact?.phone ? (
              <li>
                <a
                  href={toTelHref(contact.phone)}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <PhoneIcon width={15} height={15} className="text-accent" />
                  {contact.phone}
                </a>
              </li>
            ) : null}
          </ul>

          <div className="flex items-center gap-5">
            <Link href={ROUTES.blog} className="text-white/80 transition-colors hover:text-white">
              Blog
            </Link>
            <Link href={ROUTES.contact} className="text-white/80 transition-colors hover:text-white">
              İletişim
            </Link>
            {contact?.email ? (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              >
                <MailIcon width={15} height={15} className="text-accent" />
                {contact.email}
              </a>
            ) : null}
            <SocialLinks
              social={contact?.social}
              className="-mr-2"
              linkClassName="text-white/70 hover:bg-white/10 hover:text-white"
            />
          </div>
        </div>
      </div>

      {/* Ana bar */}
      <div className="relative border-b border-border bg-bg shadow-[0_1px_3px_rgb(12_60_120/0.06)]">
        <div className="container-site flex h-20 items-center justify-between gap-4 md:h-26">
          <Logo
            siteName={settings?.siteName || 'Örnek ISO Belgelendirme'}
            tagline={settings?.tagline}
            image={settings?.logo}
          />

          <div className="flex items-center gap-2">
            <SiteNav items={navItems} ctaHref={ROUTES.contact} ctaLabel="Teklif Al" />
          </div>
        </div>
      </div>
    </header>
  )
}
