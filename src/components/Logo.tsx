import Image from 'next/image'
import Link from 'next/link'

import { resolveImage, type MediaLike } from '@/lib/media'
import { getLogoAsset } from '@/lib/static-assets'

type LogoProps = {
  siteName: string
  tagline?: string | null
  image?: MediaLike
  /** Koyu zemin üzerinde (footer) kullanım. */
  inverted?: boolean
}

/**
 * Logo üç kademeli çözülür:
 *   1. Panelde (Site Ayarları) logo yüklüyse o kullanılır.
 *   2. Değilse `public/` içindeki logo dosyası aranır (bkz. lib/static-assets).
 *      Bu dosyayı siz koyup commit edersiniz; canlıya kodla birlikte gider.
 *   3. Hiçbiri yoksa firma adından oluşan yazı tabanlı yer tutucu gösterilir.
 *
 * ÖLÇÜ: Logo dosyalarının kenarlarında genelde şeffaf boşluk olur ve bu boşluk
 * da yükseklikle birlikte ölçeklendiği için logo olduğundan küçük görünür.
 * Dosyayı kırpmıyoruz — görünür alanın sınırlarını `getLogoAsset` ölçüyor,
 * burada da CSS ile boşluk kırpılmış gibi gösteriliyor. Boşluksuz bir logoda
 * hesap 1'e 1 çıkar, yani davranış değişmez.
 */
export const Logo = async ({ siteName, tagline, image, inverted = false }: LogoProps) => {
  const logo = resolveImage(image)
  const staticLogo = logo ? null : await getLogoAsset(inverted)

  return (
    <Link
      href="/"
      aria-label={`${siteName} — Ana sayfa`}
      className="inline-flex items-center gap-3"
    >
      {logo ? (
        <Image
          src={logo.url}
          alt={logo.alt || siteName}
          width={logo.width ?? 200}
          height={logo.height ?? 56}
          priority
          sizes="(max-width: 768px) 160px, 220px"
          className="h-12 w-auto object-contain md:h-14"
        />
      ) : staticLogo ? (
        /*
         * Şeffaf kenar boşluğunu CSS ile kırpıyoruz — dosyaya dokunmadan.
         *
         * Dış kutunun en-boy oranı logonun GÖRÜNÜR alanına eşitlenir; görsel de
         * içeride, o görünür alan kutuyu tam dolduracak kadar büyütülüp kaydırılır.
         * Taşan şeffaf kısmı `overflow-hidden` kırpar. Bütün ölçüler yüzde
         * olduğu için header yüksekliğini değiştirmek yeterli, hesap kendini
         * ayarlar. Boşluksuz bir logoda oranlar %100 / 0 çıkar, hiçbir şey olmaz.
         */
        <span
          className="relative block h-12 overflow-hidden md:h-14"
          style={{ aspectRatio: `${staticLogo.content.width} / ${staticLogo.content.height}` }}
        >
          {/*
           * `unoptimized`: dosya kendi public/ klasörümüzden geliyor ve zaten küçük.
           * Next'in iyileştiricisinden geçirmek gereksiz olduğu gibi, SVG'yi
           * reddetmesine ve next.config'teki `localPatterns` listesine takılmasına
           * da yol açardı.
           */}
          <Image
            src={staticLogo.url}
            alt={siteName}
            width={staticLogo.width}
            height={staticLogo.height}
            priority
            unoptimized
            className="absolute max-w-none"
            style={{
              width: `${(staticLogo.width / staticLogo.content.width) * 100}%`,
              height: `${(staticLogo.height / staticLogo.content.height) * 100}%`,
              left: `${(-staticLogo.content.x / staticLogo.content.width) * 100}%`,
              top: `${(-staticLogo.content.y / staticLogo.content.height) * 100}%`,
            }}
          />
        </span>
      ) : (
        <>
          <span
            aria-hidden
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-sm font-extrabold tracking-tight md:h-11 md:w-11 ${
              inverted ? 'bg-white text-primary' : 'bg-primary text-white'
            }`}
          >
            ISO
          </span>
          <span className="flex flex-col leading-tight">
            <span
              className={`text-base font-extrabold tracking-tight md:text-lg ${
                inverted ? 'text-white' : 'text-primary'
              }`}
            >
              {siteName}
            </span>
            {tagline ? (
              <span
                className={`hidden text-[11px] font-medium sm:block ${
                  inverted ? 'text-white/70' : 'text-text-muted'
                }`}
              >
                {tagline}
              </span>
            ) : null}
          </span>
        </>
      )}
    </Link>
  )
}
