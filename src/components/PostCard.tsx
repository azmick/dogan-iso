import Link from 'next/link'

import { CardImage } from '@/components/CardImage'
import { ArrowRightIcon } from '@/components/Icons'
import { formatDate, toISODate } from '@/lib/format'
import { ROUTES } from '@/lib/site'
import type { Post } from '@/payload-types'

type PostCardProps = {
  post: Post
  priority?: boolean
}

export const PostCard = ({ post, priority = false }: PostCardProps) => {
  const href = `${ROUTES.blog}/${post.slug}`

  return (
    <article className="card group flex flex-col overflow-hidden">
      <Link href={href} tabIndex={-1} aria-hidden className="block">
        <CardImage
          image={post.coverImage}
          fallbackLabel="Blog"
          priority={priority}
          aspect="aspect-[16/10]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <time dateTime={toISODate(post.publishedDate)} className="text-xs font-semibold uppercase tracking-wider text-accent-dark">
          {formatDate(post.publishedDate)}
        </time>

        <h3 className="mt-2.5 text-lg leading-snug">
          <Link href={href} className="transition-colors hover:text-accent-dark">
            {post.title}
          </Link>
        </h3>

        {post.excerpt ? (
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-text-muted">
            {post.excerpt}
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
          <span className="sr-only">— {post.title}</span>
        </Link>
      </div>
    </article>
  )
}
