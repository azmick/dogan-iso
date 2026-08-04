import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CtaBand } from '@/components/CtaBand'
import { PageHero } from '@/components/PageHero'
import { RichText } from '@/components/RichText'
import { richTextToExcerpt } from '@/lib/format'
import { getPageBySlug, getPages } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 300

type PageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  const pages = await getPages()

  return pages.map((page) => ({ slug: page.slug }))
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) return { title: 'Sayfa bulunamadı' }

  return buildMetadata({
    title: page.title,
    description: page.excerpt || richTextToExcerpt(page.content),
    path: `/${page.slug}`,
    seo: page.meta,
  })
}

/** Kurumsal / yasal içerik sayfaları (KVKK metinleri, çerez politikası vb.). */
export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPageBySlug(slug)

  if (!page) notFound()

  return (
    <>
      <PageHero title={page.title} description={page.excerpt} />
      <Breadcrumbs items={[{ label: page.title }]} />

      <div className="container-site py-12 md:py-16">
        <article className="mx-auto max-w-3xl">
          {page.content ? (
            <RichText data={page.content} />
          ) : (
            <p className="text-text-muted">
              Bu sayfa için içerik henüz eklenmemiş. Yönetim panelinden{' '}
              <strong>Sayfalar → {page.title}</strong> kaydını düzenleyebilirsiniz.
            </p>
          )}
        </article>
      </div>

      <CtaBand />
    </>
  )
}
