import Image from 'next/image'
import Link from 'next/link'

import { resolveImage, type MediaLike } from '@/lib/media'
import { STATIC_LOGO, STATIC_LOGO_INVERTED } from '@/lib/static-assets'

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
 *   2. Değilse `public/logo.svg` (footer için `public/logo-beyaz.svg`) aranır.
 *      Bu dosyaları siz koyup commit edersiniz; canlıya kodla birlikte gider.
 *   3. Hiçbiri yoksa firma adından oluşan yazı tabanlı yer tutucu gösterilir.
 *
 * Koyu zeminde yalnızca `logo-beyaz` kabul edilir — açık zemin logosu lacivert
 * footer üzerinde okunmayacağı için, o dosya yoksa yazı logosuna düşülür.
 */
export const Logo = ({ siteName, tagline, image, inverted = false }: LogoProps) => {
  const logo = resolveImage(image)
  const staticLogo = inverted ? STATIC_LOGO_INVERTED : STATIC_LOGO

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
          className="h-10 w-auto object-contain md:h-12"
        />
      ) : staticLogo ? (
        /*
         * `unoptimized`: bu dosya kendi public/ klasörümüzden geliyor ve zaten
         * küçük. Next'in görsel iyileştiricisinden geçirmek gereksiz olduğu gibi,
         * SVG'yi reddetmesine ve next.config'teki `localPatterns` listesine
         * takılmasına da yol açardı.
         */
        <Image
          src={staticLogo}
          alt={siteName}
          width={220}
          height={56}
          priority
          unoptimized
          className="h-10 w-auto object-contain md:h-12"
        />
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
