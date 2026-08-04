import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CtaBand } from '@/components/CtaBand'
import { JsonLd } from '@/components/JsonLd'
import { PageHero } from '@/components/PageHero'
import { PostCard } from '@/components/PostCard'
import { RichText } from '@/components/RichText'
import { Section } from '@/components/Section'
import { ShareButtons } from '@/components/ShareButtons'
import { formatDate, richTextToExcerpt, toISODate } from '@/lib/format'
import { resolveOgImage } from '@/lib/media'
import { getPostBySlug, getPosts, getSiteSettings } from '@/lib/payload'
import { absoluteUrl, buildMetadata, SITE_URL } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

export const revalidate = 300

type PageProps = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = async () => {
  const { docs } = await getPosts(1, 100)

  return docs.map((post) => ({ slug: post.slug }))
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return { title: 'Haber bulunamadı' }

  return buildMetadata({
    title: post.title,
    description: post.excerpt || richTextToExcerpt(post.content),
    path: `${ROUTES.posts}/${post.slug}`,
    image: post.coverImage,
    type: 'article',
    publishedTime: post.publishedDate,
    seo: post.meta,
  })
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params
  const [post, settings, latest] = await Promise.all([
    getPostBySlug(slug),
    getSiteSettings(),
    getPosts(1, 4),
  ])

  if (!post) notFound()

  const url = absoluteUrl(`${ROUTES.posts}/${post.slug}`)
  const description = post.excerpt || richTextToExcerpt(post.content)
  const related = latest.docs.filter((item) => item.id !== post.id).slice(0, 3)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: description || undefined,
    image: resolveOgImage(post.coverImage) || undefined,
    datePublished: post.publishedDate,
    dateModified: post.updatedAt || post.publishedDate,
    inLanguage: 'tr-TR',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: settings?.siteName || 'Örnek ISO Belgelendirme',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: settings?.siteName || 'Örnek ISO Belgelendirme',
    },
  }

  return (
    <>
      <PageHero
        title={post.title}
        eyebrow={formatDate(post.publishedDate)}
        image={post.coverImage}
      />

      <Breadcrumbs items={[{ label: 'Haberler', href: ROUTES.posts }, { label: post.title }]} />

      <div className="container-site py-12 md:py-16">
        <article className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm text-text-muted">
            Yayın tarihi:{' '}
            <time dateTime={toISODate(post.publishedDate)} className="font-semibold text-primary">
              {formatDate(post.publishedDate)}
            </time>
          </p>

          {post.excerpt ? (
            <p className="mb-8 border-l-[3px] border-accent bg-bg-soft px-5 py-4 text-[15px] leading-relaxed text-text-muted">
              {post.excerpt}
            </p>
          ) : null}

          {post.content ? <RichText data={post.content} /> : null}

          <div className="mt-10">
            <ShareButtons url={url} title={post.title} />
          </div>
        </article>
      </div>

      {related.length ? (
        <Section soft title="Diğer Haberler">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <PostCard key={item.id} post={item} />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand />

      <JsonLd data={articleJsonLd} />
    </>
  )
}
