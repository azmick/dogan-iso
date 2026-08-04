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

/**
 * Medya alanını <Image /> için hazır hâle getirir.
 * Görsel yoksa null döner — çağıran taraf yer tutucu gösterir.
 */
export const resolveImage = (value: MediaLike): ResolvedImage | null => {
  if (!isMedia(value) || !value.url) return null

  return {
    url: value.url,
    alt: value.alt || '',
    width: value.width ?? undefined,
    height: value.height ?? undefined,
  }
}

/** OpenGraph görseli (1200x630 türevi varsa onu kullanır). */
export const resolveOgImage = (value: MediaLike): string | null => {
  if (!isMedia(value)) return null

  return value.sizes?.og?.url || value.url || null
}
