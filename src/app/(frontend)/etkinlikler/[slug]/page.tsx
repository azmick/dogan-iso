import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CtaBand } from '@/components/CtaBand'
import { LightboxGallery, type GalleryItem } from '@/components/Lightbox'
import { PageHero } from '@/components/PageHero'
import { RichText } from '@/components/RichText'
import { Section } from '@/components/Section'
import { formatDate, richTextToExcerpt, toISODate } from '@/lib/format'
import { isMedia } from '@/lib/media'
import { getProjectBySlug, getProjects } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

export const revalidate = 300

type PageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  const projects = await getProjects()

  return projects.map((project) => ({ slug: project.slug }))
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) return { title: 'Etkinlik bulunamadı' }

  return buildMetadata({
    title: project.title,
    description: project.excerpt || richTextToExcerpt(project.content),
    path: `${ROUTES.projects}/${project.slug}`,
    image: project.coverImage,
    type: 'article',
    publishedTime: project.date,
    seo: project.meta,
  })
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  const gallery: GalleryItem[] = (project.gallery ?? [])
    .filter(isMedia)
    .filter((item) => Boolean(item.url))
    .map((item) => ({
      id: String(item.id),
      url: item.url as string,
      alt: item.alt || project.title,
      width: item.width ?? undefined,
      height: item.height ?? undefined,
      caption: item.caption,
    }))

  return (
    <>
      <PageHero
        title={project.title}
        eyebrow={formatDate(project.date)}
        description={project.excerpt}
        image={project.coverImage}
      />

      <Breadcrumbs
        items={[{ label: 'Etkinliklerimiz', href: ROUTES.projects }, { label: project.title }]}
      />

      <div className="container-site py-12 md:py-16">
        <article className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm text-text-muted">
            Tarih:{' '}
            <time dateTime={toISODate(project.date)} className="font-semibold text-primary">
              {formatDate(project.date)}
            </time>
          </p>

          {project.content ? <RichText data={project.content} /> : null}
        </article>
      </div>

      {gallery.length ? (
        <Section soft title="Etkinlik Galerisi">
          <LightboxGallery items={gallery} />
        </Section>
      ) : null}

      <CtaBand />
    </>
  )
}
