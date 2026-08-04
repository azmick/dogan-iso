'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@/components/Icons'

export type GalleryItem = {
  id: string
  url: string
  alt: string
  width?: number
  height?: number
  caption?: string | null
}

type LightboxGalleryProps = {
  items: GalleryItem[]
  /** Grid sütun düzeni. */
  className?: string
}

/** Responsive foto galeri + tıklayınca büyüten lightbox. */
export const LightboxGallery = ({ items, className = '' }: LightboxGalleryProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const total = items.length

  const close = useCallback(() => setOpenIndex(null), [])
  const step = useCallback(
    (delta: number) => setOpenIndex((index) => (index === null ? null : (index + delta + total) % total)),
    [total],
  )

  useEffect(() => {
    if (openIndex === null) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [openIndex, close, step])

  if (!total) return null

  const active = openIndex !== null ? items[openIndex] : null

  return (
    <>
      <ul className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
        {items.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`${item.alt || 'Görsel'} — büyüt`}
              className="card group relative block w-full overflow-hidden p-0"
            >
              <span className="relative block aspect-[4/3] overflow-hidden bg-bg-muted">
                <Image
                  src={item.url}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>

              {item.caption ? (
                <span className="block px-4 py-3 text-left text-sm text-text-muted">
                  {item.caption}
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt || 'Görsel önizleme'}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-navy/95 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Kapat"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <CloseIcon />
          </button>

          {total > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  step(-1)
                }}
                aria-label="Önceki görsel"
                className="absolute left-2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 md:left-6"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  step(1)
                }}
                aria-label="Sonraki görsel"
                className="absolute right-2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 md:right-6"
              >
                <ChevronRightIcon />
              </button>
            </>
          ) : null}

          <figure
            className="max-h-full w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={active.url}
              alt={active.alt}
              width={active.width ?? 1600}
              height={active.height ?? 1000}
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="mx-auto max-h-[78vh] w-auto rounded-lg object-contain"
            />

            <figcaption className="mt-4 text-center text-sm text-white/70">
              {active.caption || active.alt}
              {total > 1 ? (
                <span className="ml-2 text-white/40">
                  ({(openIndex ?? 0) + 1} / {total})
                </span>
              ) : null}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  )
}
