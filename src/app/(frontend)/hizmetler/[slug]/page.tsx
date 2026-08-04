import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CtaBand } from '@/components/CtaBand'
import { JsonLd } from '@/components/JsonLd'
import { PageHero } from '@/components/PageHero'
import { QuoteBox } from '@/components/QuoteBox'
import { RichText } from '@/components/RichText'
import { richTextToExcerpt } from '@/lib/format'
import { resolveOgImage } from '@/lib/media'
import { getServiceBySlug, getServiceLinks, getSiteSettings } from '@/lib/payload'
import { absoluteUrl, buildMetadata, SITE_URL } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

export const revalidate = 300

type PageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  const services = await getServiceLinks()

  return services.map((service) => ({ slug: service.slug }))
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) return { title: 'Hizmet bulunamadı' }

  return buildMetadata({
    title: service.title,
    description: service.excerpt || richTextToExcerpt(service.content),
    path: `${ROUTES.services}/${service.slug}`,
    image: service.coverImage,
    seo: service.meta,
  })
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const [service, allServices, settings] = await Promise.all([
    getServiceBySlug(slug),
    getServiceLinks(),
    getSiteSettings(),
  ])

  if (!service) notFound()

  const description = service.excerpt || richTextToExcerpt(service.content)

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: description || undefined,
    url: absoluteUrl(`${ROUTES.services}/${service.slug}`),
    serviceType: service.title,
    image: resolveOgImage(service.coverImage) || undefined,
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    provider: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: settings?.siteName || 'Örnek ISO Belgelendirme',
    },
  }

  return (
    <>
      <PageHero title={service.title} description={service.excerpt} image={service.coverImage} />

      <Breadcrumbs
        items={[
          { label: 'Hizmetlerimiz', href: ROUTES.services },
          { label: service.title },
        ]}
      />

      <div className="container-site grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
        {/* İçerik */}
        <article>
          {service.content ? (
            <RichText data={service.content} />
          ) : (
            <p className="text-text-muted">
              Bu hizmet için içerik henüz eklenmemiş. Yönetim panelinden{' '}
              <strong>Hizmetler → {service.title}</strong> kaydını düzenleyebilirsiniz.
            </p>
          )}
        </article>

        {/* Yan panel */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
          <nav aria-labelledby="other-services" className="rounded-lg border border-border bg-bg-soft p-5">
            <h2 id="other-services" className="text-base font-bold text-primary">
              Hizmetlerimiz
            </h2>

            <ul className="mt-4 space-y-1">
              {allServices.map((item) => {
                const isCurrent = item.slug === service.slug

                return (
                  <li key={item.id}>
                    <Link
                      href={`${ROUTES.services}/${item.slug}`}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={`flex min-h-11 items-center rounded-md border-l-2 px-3 text-sm leading-snug transition-colors ${
                        isCurrent
                          ? 'border-accent bg-bg font-semibold text-primary'
                          : 'border-transparent text-text-muted hover:border-accent hover:bg-bg hover:text-primary'
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <QuoteBox />
        </aside>
      </div>

      <CtaBand
        title={`${service.title} için teklif alın`}
        description="Kapsam, süre ve maliyeti netleştirelim; kuruluşunuza özel bir denetim planı hazırlayalım."
      />

      <JsonLd data={serviceJsonLd} />
    </>
  )
}
