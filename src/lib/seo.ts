import type { Metadata } from 'next'

import { resolveOgImage, type MediaLike } from '@/lib/media'
import { getSiteSettings } from '@/lib/payload'

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
).replace(/\/+$/, '')

export const absoluteUrl = (path = '/'): string =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

/** SEO eklentisinin dokümana eklediği meta grubu. */
export type SeoMeta = {
  title?: string | null
  description?: string | null
  image?: MediaLike
} | null

type BuildMetadataArgs = {
  /** Sayfaya özel başlık (site adı otomatik eklenir). */
  title: string
  description?: string | null
  /** Kök göreli yol, örn: /hizmetler/iso-27001 */
  path: string
  /** Öne çıkan görsel (OpenGraph). */
  image?: MediaLike
  type?: 'website' | 'article'
  publishedTime?: string | null
  noIndex?: boolean
  /** Payload SEO eklentisi alanları — doluysa önceliklidir. */
  seo?: SeoMeta
}

/**
 * Her sayfa için title + description + canonical + OpenGraph + Twitter üretir.
 * Payload SEO eklentisinde girilen değerler varsa onlar önceliklidir.
 */
export const buildMetadata = async ({
  title,
  description,
  path,
  image,
  type = 'website',
  publishedTime,
  noIndex = false,
  seo,
}: BuildMetadataArgs): Promise<Metadata> => {
  const settings = await getSiteSettings()

  const siteName = settings?.siteName || 'Örnek ISO Belgelendirme'
  const finalTitle = seo?.title || title
  const finalDescription =
    seo?.description || description || settings?.defaultSeo?.description || ''

  const ogImage =
    resolveOgImage(seo?.image) ||
    resolveOgImage(image) ||
    resolveOgImage(settings?.defaultSeo?.ogImage)

  const canonical = absoluteUrl(path)
  const images = ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: finalTitle }] : undefined

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonical,
      siteName,
      locale: 'tr_TR',
      type,
      images,
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      title: finalTitle,
      description: finalDescription,
      images: ogImage ? [ogImage] : undefined,
    },
  }
}
