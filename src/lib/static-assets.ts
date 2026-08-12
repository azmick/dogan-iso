import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

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

/**
 * Bir logo dosyasının ölçüleri + içindeki GÖRÜNÜR alanın sınırları.
 *
 * Neden gerekiyor: logo dosyalarının kenarlarında çoğu zaman şeffaf boşluk olur.
 * Header'da yükseklik CSS ile sabitlendiği için bu boşluk da ölçeklenir ve logo
 * olduğundan çok küçük görünür. (Örn. 568x567'lik bir dosyanın içindeki gerçek
 * logo 449x149 ise, 56 piksellik alanda logo yalnızca ~15 piksel kalır.)
 *
 * Çözüm dosyayı kırpmak DEĞİL — dosyaya hiç dokunmuyoruz. Görünür alanın
 * sınırlarını burada ölçüp Logo bileşenine veriyoruz; o da CSS ile boşluğu
 * kırpılmış gibi gösteriyor. Böylece hangi logoyu koyarsanız koyun, boşluklu
 * ya da boşluksuz, header'da aynı ölçüde görünür.
 */
export type LogoAsset = {
  /** Site içi adres, ör. `/logo.png` */
  url: string
  /** Dosyanın tamamının ölçüsü */
  width: number
  height: number
  /** Şeffaf boşluk çıkarıldığında geriye kalan alan (dosya içi koordinat) */
  content: { x: number; y: number; width: number; height: number }
}

/**
 * Ölçüm dosya başına bir kez yapılır ve süreç boyunca saklanır — her sayfa
 * isteğinde diski okumayalım diye.
 */
const measurements = new Map<string, Promise<LogoAsset | null>>()

const measure = async (url: string): Promise<LogoAsset | null> => {
  const filePath = path.join(PUBLIC_DIR, url.replace(/^\//, ''))

  try {
    const image = sharp(filePath)
    const meta = await image.metadata()

    if (!meta.width || !meta.height) return null

    const full = { x: 0, y: 0, width: meta.width, height: meta.height }

    // SVG vektördür; kenar boşluğu viewBox meselesidir, piksel kırpması anlamsız.
    if (meta.format === 'svg') {
      return { url, width: meta.width, height: meta.height, content: full }
    }

    // threshold 1: tamamen saydam olmayan ilk pikselden itibaren "içerik" say.
    const { info } = await image.trim({ threshold: 1 }).toBuffer({ resolveWithObject: true })

    // sharp kırptığı payı negatif verir (ör. soldan 60px atıldıysa -60).
    return {
      url,
      width: meta.width,
      height: meta.height,
      content: {
        x: Math.abs(info.trimOffsetLeft ?? 0),
        y: Math.abs(info.trimOffsetTop ?? 0),
        width: info.width,
        height: info.height,
      },
    }
  } catch {
    // Dosya bozuksa ya da sharp okuyamazsa logoyu hiç göstermemektense
    // ölçüsüz bırakmak daha iyi; çağıran taraf yer tutucuya düşer.
    return null
  }
}

/** Açık/koyu zemin logosunu ölçüleriyle birlikte döner. */
export const getLogoAsset = (inverted = false): Promise<LogoAsset | null> => {
  const url = inverted ? STATIC_LOGO_INVERTED : STATIC_LOGO

  if (!url) return Promise.resolve(null)

  let pending = measurements.get(url)

  if (!pending) {
    pending = measure(url)
    measurements.set(url, pending)
  }

  return pending
}
