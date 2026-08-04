import type { Field, FieldHook } from 'payload'

const TURKISH_MAP: Record<string, string> = {
  ç: 'c',
  Ç: 'c',
  ğ: 'g',
  Ğ: 'g',
  ı: 'i',
  I: 'i',
  İ: 'i',
  ö: 'o',
  Ö: 'o',
  ş: 's',
  Ş: 's',
  ü: 'u',
  Ü: 'u',
  â: 'a',
  Â: 'a',
  î: 'i',
  Î: 'i',
  û: 'u',
  Û: 'u',
}

/** "ISO 27001 Bilgi Güvenliği" -> "iso-27001-bilgi-guvenligi" */
export const slugify = (value: string): string =>
  value
    .split('')
    .map((char) => TURKISH_MAP[char] ?? char)
    .join('')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** Slug boşsa kaynak alandan (genelde title) türetir. */
const formatSlugHook =
  (fallbackFrom: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string' && value.length > 0) {
      return slugify(value)
    }

    if (operation === 'create' || operation === 'update') {
      const fallbackData = data?.[fallbackFrom]

      if (typeof fallbackData === 'string' && fallbackData.length > 0) {
        return slugify(fallbackData)
      }
    }

    return value
  }

type SlugFieldOptions = {
  /** Slug'ın türetileceği alan adı. Varsayılan: title */
  fallbackFrom?: string
  /** Alan açıklaması (admin panelinde görünür) */
  description?: string
}

export const slugField = ({
  fallbackFrom = 'title',
  description = 'URL adresinde görünen kısa ad. Boş bırakılırsa başlıktan otomatik üretilir.',
}: SlugFieldOptions = {}): Field => ({
  name: 'slug',
  type: 'text',
  label: 'URL Adı (slug)',
  index: true,
  unique: true,
  required: true,
  admin: {
    position: 'sidebar',
    description,
  },
  hooks: {
    beforeValidate: [formatSlugHook(fallbackFrom)],
  },
})
