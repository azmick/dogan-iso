import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CtaBand } from '@/components/CtaBand'
import { LightboxGallery, type GalleryItem } from '@/components/Lightbox'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { getGalleryImages } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

export const revalidate = 300

const DESCRIPTION =
  'Denetim çalışmalarımız, eğitimlerimiz ve katıldığımız etkinliklerden fotoğraflar.'

export const generateMetadata = async (): Promise<Metadata> =>
  buildMetadata({
    title: 'Medya / Galeri',
    description: DESCRIPTION,
    path: ROUTES.gallery,
  })

export default async function GalleryPage() {
  const media = await getGalleryImages()

  const items: GalleryItem[] = media
    .filter((item) => Boolean(item.url))
    .map((item) => ({
      id: String(item.id),
      url: item.url as string,
      alt: item.alt || '',
      width: item.width ?? undefined,
      height: item.height ?? undefined,
      caption: item.caption,
    }))

  return (
    <>
      <PageHero title="Medya / Galeri" description={DESCRIPTION} />
      <Breadcrumbs items={[{ label: 'Medya' }]} />

      <Section>
        {items.length ? (
          <LightboxGallery items={items} />
        ) : (
          <p className="rounded-lg border border-dashed border-border bg-bg-soft p-8 text-center text-sm text-text-muted">
            Galeride henüz görsel yok. Yönetim panelindeki <strong>Medya</strong> bölümüne görsel
            yüklediğinizde burada listelenir.
          </p>
        )}
      </Section>

      <CtaBand />
    </>
  )
}
