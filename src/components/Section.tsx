import type { ReactNode } from 'react'

type SectionProps = {
  children: ReactNode
  /** Bölüm başlığı (H2). */
  title?: string
  /** Başlık üstündeki küçük etiket. */
  eyebrow?: string
  description?: string
  /** Zebra etkisi için açık soğuk zemin. */
  soft?: boolean
  centered?: boolean
  id?: string
  className?: string
  /** Başlığın sağındaki aksiyon (ör. "Tümünü gör"). */
  action?: ReactNode
}

export const Section = ({
  children,
  title,
  eyebrow,
  description,
  soft = false,
  centered = false,
  id,
  className = '',
  action,
}: SectionProps) => (
  <section
    id={id}
    className={`py-14 md:py-20 ${soft ? 'bg-bg-soft' : 'bg-bg'} ${className}`}
  >
    <div className="container-site">
      {(title || eyebrow || description) && (
        <div
          className={`mb-10 flex flex-col gap-4 md:mb-12 ${
            action ? 'md:flex-row md:items-end md:justify-between' : ''
          }`}
        >
          <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''}`}>
            {eyebrow ? (
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                {eyebrow}
              </p>
            ) : null}

            {title ? (
              <h2
                className={`section-title text-2xl leading-tight sm:text-3xl lg:text-[2rem] ${
                  centered ? 'section-title-center' : ''
                }`}
              >
                {title}
              </h2>
            ) : null}

            {description ? (
              <p className="mt-5 text-[15px] leading-relaxed text-text-muted md:text-base">
                {description}
              </p>
            ) : null}
          </div>

          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      )}

      {children}
    </div>
  </section>
)
