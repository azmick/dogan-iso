import type { CollectionAdminOptions } from 'payload'

/**
 * Panelde bir kaydı düzenlerken sağ üstte çıkan "Önizle" düğmesinin adresi.
 *
 * Taslak (draft) özelliği açık olmadığı için düğme kaydın canlı sitedeki
 * sayfasını açar; yani editör kaydettiği içeriği tek tıkla yerinde görebilir.
 *
 * @param prefix Sayfa yolu öneki — ör. `/hizmetler`. Kurumsal sayfalar için boş.
 */
export const previewUrl =
  (prefix: string): NonNullable<CollectionAdminOptions['preview']> =>
  (doc) => {
    const slug = typeof doc?.slug === 'string' ? doc.slug : ''

    if (!slug) return null

    const base = process.env.NEXT_PUBLIC_SERVER_URL || ''

    return `${base}${prefix}/${slug}`
  }
