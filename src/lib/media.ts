import type { Media } from '@/payload-types'

export type MediaLike = Media | number | null | undefined

export type ResolvedImage = {
  url: string
  alt: string
  width?: number
  height?: number
}

/** İlişkili medya alanı dolu bir nesne mi (depth>0), yoksa sadece ID mi? */
export const isMedia = (value: MediaLike): value is Media =>
  typeof value === 'object' && value !== null && 'url' in value

/** Payload'ın kendi dosya sunma yolu: /api/<koleksiyon>/file/<dosya adı> */
const PAYLOAD_FILE_PATH = /^\/api\/[^/]+\/file\//

/**
 * Payload, medya URL'lerini HER ZAMAN mutlak üretir:
 * `${serverURL}/api/media/file/...` (yerelde http://localhost:3000/..., canlıda
 * https://alanadi.com/...). next/image ise alan adı içeren her adresi "uzak
 * görsel" sayar ve next.config'teki `images.remotePatterns` listesinde arar;
 * bulamayınca "hostname ... is not configured" hatası verir.
 *
 * Dosya bizim kendi sunucumuzdan geldiği için doğru çözüm origin'i kırpıp
 * kök-göreli yola çevirmek: `/api/media/file/...`. Bu hem next.config'teki
 * `localPatterns` ile eşleşir hem de yerel/canlı adres farklarından etkilenmez.
 * Bu kalıba uymayan dış adresler (ileride bir CDN kullanılırsa) aynen bırakılır.
 */
export const toDisplayURL = (url: string): string => {
  if (url.startsWith('/')) return url

  try {
    const parsed = new URL(url)

    return PAYLOAD_FILE_PATH.test(parsed.pathname) ? `${parsed.pathname}${parsed.search}` : url
  } catch {
    return url
  }
}

/**
 * Medya alanını <Image /> için hazır hâle getirir.
 * Görsel yoksa null döner — çağıran taraf yer tutucu gösterir.
 */
export const resolveImage = (value: MediaLike): ResolvedImage | null => {
  if (!isMedia(value) || !value.url) return null

  return {
    url: toDisplayURL(value.url),
    alt: value.alt || '',
    width: value.width ?? undefined,
    height: value.height ?? undefined,
  }
}

const SITE_URL = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/+$/, '')

/**
 * OpenGraph görseli (1200x630 türevi varsa onu kullanır).
 * Paylaşım önizlemelerini üreten servisler göreli yolu çözemez; bu yüzden
 * burada — resolveImage'ın aksine — adres bilerek mutlak tutulur.
 */
export const resolveOgImage = (value: MediaLike): string | null => {
  if (!isMedia(value)) return null

  const url = value.sizes?.og?.url || value.url

  if (!url) return null

  return url.startsWith('/') ? `${SITE_URL}${url}` : url
}
