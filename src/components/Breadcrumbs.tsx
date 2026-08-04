import Link from 'next/link'

import { JsonLd } from '@/components/JsonLd'
import { absoluteUrl } from '@/lib/seo'

export type Crumb = {
  label: string
  /** Son öğede (mevcut sayfa) verilmez. */
  href?: string
}

type BreadcrumbsProps = {
  items: Crumb[]
}

/**
 * Sayfa üstü kırıntı navigasyonu + BreadcrumbList JSON-LD.
 * "Ana Sayfa" otomatik olarak başa eklenir.
 */
export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const crumbs: Crumb[] = [{ label: 'Ana Sayfa', href: '/' }, ...items]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: absoluteUrl(crumb.href) } : {}),
    })),
  }

  return (
    <div className="border-b border-border bg-bg-soft">
      <div className="container-site py-3">
        <nav aria-label="Sayfa yolu">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-text-muted">
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1

              return (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden className="text-border">
                      ›
                    </span>
                  ) : null}

                  {crumb.href && !isLast ? (
                    <Link href={crumb.href} className="transition-colors hover:text-primary">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current={isLast ? 'page' : undefined} className="font-medium text-primary">
                      {crumb.label}
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
      </div>

      <JsonLd data={jsonLd} />
    </div>
  )
}
