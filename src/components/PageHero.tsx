import Image from 'next/image'

import { resolveImage, type MediaLike } from '@/lib/media'

type PageHeroProps = {
  title: string
  description?: string | null
  image?: MediaLike
  /** Başlığın üstünde küçük etiket (ör. tarih veya kategori). */
  eyebrow?: string
}

/** İç sayfaların H1 + kapak görseli bölümü. */
export const PageHero = ({ title, description, image, eyebrow }: PageHeroProps) => {
  const cover = resolveImage(image)

  return (
    <section className="relative isolate overflow-hidden bg-navy">
      {cover ? (
        <>
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/60"
          />
        </>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_120%_at_10%_0%,#12518f_0%,#0c3c78_50%,#0a1f3c_100%)]"
        />
      )}

      <div className="container-site relative py-12 md:py-16 lg:py-20">
        {eyebrow ? (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
        ) : null}

        <h1 className="max-w-4xl text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
          {title}
        </h1>

        {description ? (
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/80 md:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  )
}
