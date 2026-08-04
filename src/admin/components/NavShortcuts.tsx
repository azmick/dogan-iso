import React from 'react'

/**
 * Sol menünün en üstündeki kısayol.
 * Editörün yaptığı değişikliği canlı sitede görmesi tek tıkla mümkün olsun diye
 * menü bağlantılarının hemen üstüne yerleştirilir.
 */
export const NavShortcuts = () => (
  <div className="dg-nav-shortcuts">
    <a
      className="dg-nav-shortcuts__link"
      href="/"
      target="_blank"
      rel="noopener noreferrer"
      title="Siteyi yeni sekmede açar"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M14 4h6v6M20 4l-8.5 8.5M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Siteyi Görüntüle
    </a>
  </div>
)

export default NavShortcuts
