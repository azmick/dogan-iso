import fs from 'fs'
import path from 'path'

/**
 * `public/` klasörüne elle konan sabit görseller (logo, favicon).
 *
 * Buradaki dosyalar repoya girer ve kodla birlikte sunucuya taşınır — yani
 * bilgisayarınıza koyup commit ettiğinizde canlıda da görünürler. Panelden
 * yüklenen görseller ise (Medya Kütüphanesi) sunucunun diskinde yaşar ve
 * repoya girmez; ikisi ayrı dünyalardır.
 *
 * Öncelik sırası her zaman: panelde yüklüyse panel → yoksa buradaki dosya →
 * o da yoksa yazı tabanlı yer tutucu.
 *
 * NOT: Dosya varlığı sunucu açılırken bir kez okunur. Geliştirme sırasında
 * `public/` içine yeni dosya eklerseniz `pnpm dev`'i yeniden başlatın.
 */
const PUBLIC_DIR = path.resolve(process.cwd(), 'public')

/** Verilen adlardan diskte var olan ilkinin site içi adresini döner. */
const firstExisting = (filenames: string[]): string | null => {
  for (const filename of filenames) {
    if (fs.existsSync(path.join(PUBLIC_DIR, filename))) return `/${filename}`
  }

  return null
}

/** Açık zemin (üst menü) için logo. */
export const STATIC_LOGO = firstExisting(['logo.svg', 'logo.png', 'logo.webp'])

/** Koyu zemin (footer) için logonun beyaz/ters versiyonu. */
export const STATIC_LOGO_INVERTED = firstExisting(['logo.svg', 'logo.png', 'logo.webp'])

/** Tarayıcı sekmesi simgesi. */
export const STATIC_FAVICON = firstExisting(['favicon.svg', 'favicon.ico', 'favicon.png'])
