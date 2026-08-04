import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'

import './styles.css'

import { CookieBanner } from '@/components/CookieBanner'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { resolveOgImage } from '@/lib/media'
import { getContactInfo, getSiteSettings } from '@/lib/payload'
import { SITE_URL } from '@/lib/seo'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
})

export const generateMetadata = async (): Promise<Metadata> => {
  const settings = await getSiteSettings()

  const siteName = settings?.siteName || 'Örnek ISO Belgelendirme'
  const title = settings?.defaultSeo?.title || siteName
  const description =
    settings?.defaultSeo?.description ||
    'ISO yönetim sistemi belgelendirme, denetim ve KVKK uyum hizmetleri.'
  const ogImage = resolveOgImage(settings?.defaultSeo?.ogImage)

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    applicationName: siteName,
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      siteName,
      title,
      description,
      url: SITE_URL,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: siteName }] : undefined,
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    formatDetection: { telephone: false },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, contact] = await Promise.all([getSiteSettings(), getContactInfo()])

  const siteName = settings?.siteName || 'Örnek ISO Belgelendirme'

  const socialProfiles = [
    contact?.social?.facebook,
    contact?.social?.x,
    contact?.social?.linkedin,
    contact?.social?.instagram,
    contact?.social?.youtube,
  ].filter((url): url is string => Boolean(url))

  // Site geneli Organization şeması
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: siteName,
    legalName: settings?.legalName || siteName,
    url: SITE_URL,
    description: settings?.defaultSeo?.description || undefined,
    logo: resolveOgImage(settings?.logo) || undefined,
    ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
    ...(contact?.phone
      ? {
          contactPoint: [
            {
              '@type': 'ContactPoint',
              telephone: contact.phone,
              contactType: 'customer service',
              email: contact.email || undefined,
              areaServed: 'TR',
              availableLanguage: ['Turkish'],
            },
          ],
        }
      : {}),
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
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: siteName,
    inLanguage: 'tr-TR',
    publisher: { '@id': `${SITE_URL}/#organization` },
  }

  return (
    <html lang="tr" className={inter.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2.5 focus:text-white"
        >
          İçeriğe geç
        </a>

        <Header />

        <main id="icerik" className="flex-1">
          {children}
        </main>

        <Footer />
        <CookieBanner />

        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      </body>
    </html>
  )
}
