import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CtaBand } from '@/components/CtaBand'
import { PageHero } from '@/components/PageHero'
import { Pagination } from '@/components/Pagination'
import { PostCard } from '@/components/PostCard'
import { Section } from '@/components/Section'
import { getPosts } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

const DESCRIPTION =
  'Yönetim sistemi standartları, mevzuat değişiklikleri ve denetim süreçlerine dair güncel haberler ve bilgilendirme yazıları.'

type PageProps = {
  searchParams: Promise<{ sayfa?: string }>
}

export const generateMetadata = async (): Promise<Metadata> =>
  buildMetadata({
    title: 'Haberler',
    description: DESCRIPTION,
    path: ROUTES.posts,
  })

export default async function PostsPage({ searchParams }: PageProps) {
  const { sayfa } = await searchParams
  const parsed = Number.parseInt(sayfa ?? '1', 10)
  const currentPage = Number.isFinite(parsed) && parsed > 0 ? parsed : 1

  const { docs: posts, totalPages } = await getPosts(currentPage, 9)

  return (
    <>
      <PageHero title="Haberler" description={DESCRIPTION} />
      <Breadcrumbs items={[{ label: 'Haberler' }]} />

      <Section>
        {posts.length ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <PostCard key={post.id} post={post} priority={index < 3} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={ROUTES.posts}
            />
          </>
        ) : (
          <p className="rounded-lg border border-dashed border-border bg-bg-soft p-8 text-center text-sm text-text-muted">
            Henüz haber yayınlanmamış. Yönetim panelinden <strong>Haberler</strong> bölümüne
            kayıt ekleyebilirsiniz.
          </p>
        )}
      </Section>

      <CtaBand />
    </>
  )
}
