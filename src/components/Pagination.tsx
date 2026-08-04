import Link from 'next/link'

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/Icons'

type PaginationProps = {
  currentPage: number
  totalPages: number
  /** Sayfa numarası eklenecek temel yol, ör. /haberler */
  basePath: string
  /** Sayfa numarası sorgu parametresi. */
  paramName?: string
}

export const Pagination = ({
  currentPage,
  totalPages,
  basePath,
  paramName = 'sayfa',
}: PaginationProps) => {
  if (totalPages <= 1) return null

  const hrefFor = (page: number) => (page === 1 ? basePath : `${basePath}?${paramName}=${page}`)
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  const linkClass =
    'inline-flex h-11 min-w-11 items-center justify-center rounded-md border px-3 text-sm font-semibold transition-colors'

  return (
    <nav aria-label="Sayfalama" className="mt-12 flex justify-center">
      <ul className="flex flex-wrap items-center gap-2">
        <li>
          {currentPage > 1 ? (
            <Link
              href={hrefFor(currentPage - 1)}
              rel="prev"
              aria-label="Önceki sayfa"
              className={`${linkClass} border-border text-primary hover:border-accent hover:bg-bg-soft`}
            >
              <ChevronLeftIcon width={16} height={16} />
            </Link>
          ) : (
            <span
              aria-disabled
              className={`${linkClass} border-border text-text-muted opacity-40`}
            >
              <ChevronLeftIcon width={16} height={16} />
            </span>
          )}
        </li>

        {pages.map((page) => (
          <li key={page}>
            {page === currentPage ? (
              <span
                aria-current="page"
                className={`${linkClass} border-primary bg-primary text-white`}
              >
                {page}
              </span>
            ) : (
              <Link
                href={hrefFor(page)}
                aria-label={`${page}. sayfa`}
                className={`${linkClass} border-border text-primary hover:border-accent hover:bg-bg-soft`}
              >
                {page}
              </Link>
            )}
          </li>
        ))}

        <li>
          {currentPage < totalPages ? (
            <Link
              href={hrefFor(currentPage + 1)}
              rel="next"
              aria-label="Sonraki sayfa"
              className={`${linkClass} border-border text-primary hover:border-accent hover:bg-bg-soft`}
            >
              <ChevronRightIcon width={16} height={16} />
            </Link>
          ) : (
            <span
              aria-disabled
              className={`${linkClass} border-border text-text-muted opacity-40`}
            >
              <ChevronRightIcon width={16} height={16} />
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}
