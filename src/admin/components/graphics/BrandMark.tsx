import React from 'react'

type BrandMarkProps = {
  /** Piksel cinsinden kenar uzunluğu. */
  size?: number
  /** Degrade tanımları global olduğu için her kullanımda benzersiz olmalı. */
  idPrefix: string
  className?: string
}

/**
 * Marka işareti — kalkan + onay işareti.
 * ISO belgelendirme / bilgi güvenliği temasını temsil eden yer tutucu logodur.
 * Firma kendi logosunu "Site Ayarları > Logo" alanından yüklediğinde giriş
 * ekranında o logo gösterilir; bu işaret yedek (fallback) olarak kalır.
 */
export const BrandMark = ({ size = 32, idPrefix, className }: BrandMarkProps) => {
  const gradientId = `${idPrefix}-gradient`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="6" y1="2" x2="42" y2="46" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0C3C78" />
          <stop offset="1" stopColor="#1592B5" />
        </linearGradient>
      </defs>
      <path
        d="M24 3.5 6.5 10.2v13.3c0 10.6 7.1 20.5 17.5 23.5 10.4-3 17.5-12.9 17.5-23.5V10.2L24 3.5Z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M15.5 24.2l6.1 6.1 11-11.4"
        stroke="#FFFFFF"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
