'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons'

export type HeroSlide = {
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  /** Yüklenmiş görsel varsa kullanılır; yoksa degrade zemin gösterilir. */
  imageUrl?: string | null
  imageAlt?: string
}

type HeroSliderProps = {
  slides: HeroSlide[]
  /** Otomatik geçiş süresi (ms). 0 = kapalı. */
  interval?: number
}

/**
 * Ana sayfa hero slider'ı.
 * SEO için tüm slaytlar ilk HTML'de bulunur; yalnızca görünürlük değişir.
 */
export const HeroSlider = ({ slides, interval = 6500 }: HeroSliderProps) => {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = slides.length
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  const goTo = useCallback((index: number) => setCurrent((index + total) % total), [total])
  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const previous = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    if (paused || interval <= 0 || total < 2) return

    // Hareket azaltma tercihi olan kullanıcılarda otomatik geçiş yapma
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) return

    timer.current = setInterval(() => setCurrent((index) => (index + 1) % total), interval)

    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [paused, interval, total])

  if (!total) return null

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Öne çıkan hizmetler"
      className="relative isolate overflow-hidden bg-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative h-[clamp(26rem,68vh,38rem)]">
        {slides.map((slide, index) => {
          const active = index === current

          return (
            <div
              key={slide.title}
              role="group"
              aria-roledescription="slayt"
              aria-label={`${index + 1} / ${total}`}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-700 ${
                active ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              {/* Arka plan görseli veya degrade yer tutucu */}
              {slide.imageUrl ? (
                <Image
                  src={slide.imageUrl}
                  alt={slide.imageAlt || ''}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              ) : (
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_10%,#12518f_0%,#0c3c78_45%,#0a1f3c_100%)]"
                />
              )}

              {/* Okunabilirlik için karartma katmanı */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/45"
              />

              <div className="container-site relative flex h-full items-center">
                <div className="max-w-2xl py-12">
                  <span className="mb-4 inline-flex items-center rounded-full border border-accent/40 bg-accent/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                    Akredite Belgelendirme
                  </span>

                  <h2 className="text-3xl font-extrabold leading-[1.15] text-white sm:text-4xl lg:text-5xl">
                    {slide.title}
                  </h2>

                  <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/85 sm:text-base">
                    {slide.description}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={slide.ctaHref}
                      className="btn btn-accent"
                      tabIndex={active ? undefined : -1}
                    >
                      {slide.ctaLabel}
                    </Link>
                    <Link
                      href="/iletisim"
                      className="btn border border-white/35 text-white hover:bg-white/10"
                      tabIndex={active ? undefined : -1}
                    >
                      Bize Ulaşın
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {total > 1 ? (
        <>
          {/* Oklar */}
          <button
            type="button"
            onClick={previous}
            aria-label="Önceki slayt"
            className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-navy/40 text-white backdrop-blur-sm transition-colors hover:bg-navy/70 md:inline-flex lg:left-5"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Sonraki slayt"
            className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-navy/40 text-white backdrop-blur-sm transition-colors hover:bg-navy/70 md:inline-flex lg:right-5"
          >
            <ChevronRightIcon />
          </button>

          {/* Nokta göstergeleri — nokta küçük kalır, dokunma hedefi 32x26px'e
              genişletilir (WCAG 2.2 "Target Size (Minimum)" eşiği 24x24px). */}
          <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`${index + 1}. slayta git: ${slide.title}`}
                aria-current={index === current}
                className="group flex h-8 items-center justify-center px-2"
              >
                <span
                  aria-hidden
                  className={`block h-2.5 rounded-full transition-all ${
                    index === current ? 'w-8 bg-accent' : 'w-2.5 bg-white/40 group-hover:bg-white/70'
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      ) : null}
    </section>
  )
}
