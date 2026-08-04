import Link from 'next/link'

import { CardImage } from '@/components/CardImage'
import { formatDate, toISODate } from '@/lib/format'
import { ROUTES } from '@/lib/site'
import type { Project } from '@/payload-types'

type ProjectCardProps = {
  project: Project
  priority?: boolean
  className?: string
}

export const ProjectCard = ({ project, priority = false, className = '' }: ProjectCardProps) => {
  const href = `${ROUTES.projects}/${project.slug}`

  return (
    <article className={`card group relative flex flex-col overflow-hidden ${className}`}>
      <CardImage
        image={project.coverImage}
        fallbackLabel="Etkinlik"
        priority={priority}
        aspect="aspect-[4/3]"
        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw"
      />

      <div className="flex flex-1 flex-col p-5">
        <time dateTime={toISODate(project.date)} className="text-xs font-semibold uppercase tracking-wider text-accent-dark">
          {formatDate(project.date)}
        </time>

        <h3 className="mt-2 text-base leading-snug">
          {/* Kartın tamamı tıklanabilir (stretched link) */}
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {project.title}
          </Link>
        </h3>

        {project.excerpt ? (
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-text-muted">
            {project.excerpt}
          </p>
        ) : null}
      </div>
    </article>
  )
}
