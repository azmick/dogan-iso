import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

/** 12.03.2026 biçiminde Türkçe tarih. */
export const formatDate = (value?: string | null): string => {
  if (!value) return ''

  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Istanbul',
  }).format(new Date(value))
}

/** <time dateTime=""> için ISO tarih (YYYY-MM-DD). */
export const toISODate = (value?: string | null): string =>
  value ? new Date(value).toISOString().slice(0, 10) : ''

/** Telefon numarasını tel: bağlantısı için sadeleştirir. */
export const toTelHref = (value?: string | null): string =>
  value ? `tel:${value.replace(/[^\d+]/g, '')}` : ''

/** WhatsApp bağlantısı (wa.me sadece rakam ister). */
export const toWhatsAppHref = (value?: string | null): string =>
  value ? `https://wa.me/${value.replace(/\D/g, '')}` : ''

/** Zengin metinden düz metin özeti (meta description yedeği için). */
export const richTextToExcerpt = (data: unknown, maxLength = 160): string => {
  if (!data) return ''

  try {
    const plain = convertLexicalToPlaintext({ data: data as never })
      .replace(/\s+/g, ' ')
      .trim()

    if (plain.length <= maxLength) return plain

    return `${plain.slice(0, maxLength).replace(/\s+\S*$/, '')}…`
  } catch {
    return ''
  }
}
