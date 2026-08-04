import Link from 'next/link'

import { CardImage } from '@/components/CardImage'
import { ArrowRightIcon } from '@/components/Icons'
import { ROUTES } from '@/lib/site'
import type { Service } from '@/payload-types'

type ServiceCardProps = {
  service: Service
  priority?: boolean
}

export const ServiceCard = ({ service, priority = false }: ServiceCardProps) => {
  const href = `${ROUTES.services}/${service.slug}`

  return (
    <article className="card group flex flex-col overflow-hidden">
      <Link href={href} tabIndex={-1} aria-hidden className="block">
        <CardImage
          image={service.coverImage}
          fallbackLabel="Belgelendirme Hizmeti"
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="text-lg leading-snug">
          <Link href={href} className="transition-colors hover:text-accent-dark">
            {service.title}
          </Link>
        </h3>

        {service.excerpt ? (
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-text-muted">
            {service.excerpt}
          </p>
        ) : (
          <div className="flex-1" />
        )}

        <Link
          href={href}
          className="mt-5 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-accent-dark transition-colors hover:text-primary"
        >
          Devamı
          <ArrowRightIcon className="transition-transform group-hover:translate-x-1" />
          <span className="sr-only">— {service.title}</span>
        </Link>
      </div>
    </article>
  )
}
