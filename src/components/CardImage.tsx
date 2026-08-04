import Image from 'next/image'

import { ShieldCheckIcon } from '@/components/Icons'
import { resolveImage, type MediaLike } from '@/lib/media'

type CardImageProps = {
  image?: MediaLike
  /** Görsel yoksa yer tutucuda gösterilecek metin. */
  fallbackLabel?: string
  sizes: string
  priority?: boolean
  className?: string
  /** Görsel en-boy oranı sınıfı. */
  aspect?: string
}

/**
 * Kart görselleri. İçerik henüz görsel içermiyorsa (temsili içerik aşaması)
 * paletle uyumlu bir yer tutucu gösterilir.
 */
export const CardImage = ({
  image,
  fallbackLabel,
  sizes,
  priority = false,
  className = '',
  aspect = 'aspect-[4/3]',
}: CardImageProps) => {
  const resolved = resolveImage(image)

  return (
    <div className={`relative overflow-hidden bg-bg-muted ${aspect} ${className}`}>
      {resolved ? (
        <Image
          src={resolved.url}
          alt={resolved.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary-soft via-bg-muted to-bg-soft text-primary/40"
        >
          <ShieldCheckIcon width={34} height={34} />
          {fallbackLabel ? (
            <span className="px-4 text-center text-[11px] font-semibold uppercase tracking-widest">
              {fallbackLabel}
            </span>
          ) : null}
        </div>
      )}
    </div>
  )
}
