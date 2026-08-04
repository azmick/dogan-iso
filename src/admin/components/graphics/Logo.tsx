import React from 'react'

import { resolveImage } from '@/lib/media'
import { getSiteSettings } from '@/lib/payload'

import { BrandMark } from './BrandMark'

/**
 * Giriş ekranındaki marka bloğu.
 *
 * "Site Ayarları > Logo" alanına bir görsel yüklenmişse o gösterilir,
 * aksi hâlde marka işareti + firma adı ile yer tutucu bir kilit görünüm kullanılır.
 */
export const AdminLogo = async () => {
  let siteName = 'Yönetim Paneli'
  let logoUrl: string | null = null
  let logoAlt = ''

  try {
    const settings = await getSiteSettings()
    siteName = settings.siteName || siteName
    const logo = resolveImage(settings.logo)
    logoUrl = logo?.url ?? null
    logoAlt = logo?.alt || siteName
  } catch {
    // Veritabanı henüz hazır değilse (ilk kurulum) giriş ekranı yine de açılsın.
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        textAlign: 'center',
      }}
    >
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element -- admin paneli, next/image optimizasyonuna gerek yok
        <img src={logoUrl} alt={logoAlt} style={{ maxHeight: '3.5rem', width: 'auto' }} />
      ) : (
        <BrandMark size={54} idPrefix="dg-admin-logo" />
      )}

      <span
        style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          letterSpacing: '-0.01em',
          color: 'var(--dg-primary)',
          lineHeight: 1.3,
        }}
      >
        {siteName}
      </span>
    </div>
  )
}

export default AdminLogo
