import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CtaBand } from '@/components/CtaBand'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { ServiceCard } from '@/components/ServiceCard'
import { getServices } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

export const revalidate = 300

const DESCRIPTION =
  'ISO 27001, ISO 27701, ISO 22301, ISO 20001-1, ISO 9001 Belgelendirme Danışmanlığı | Bilgi Güvenliği & KVKK Uyum Danışmanlığı'

export const generateMetadata = async (): Promise<Metadata> =>
  buildMetadata({
    title: 'Hizmetlerimiz',
    description: DESCRIPTION,
    path: ROUTES.services,
  })

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      <PageHero title="Hizmetlerimiz" description={DESCRIPTION} />
      <Breadcrumbs items={[{ label: 'Hizmetlerimiz' }]} />

      <Section>
        {services.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} priority={index < 3} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-border bg-bg-soft p-8 text-center text-sm text-text-muted">
            Henüz hizmet eklenmemiş. Yönetim panelinden <strong>Hizmetler</strong> bölümüne kayıt
            ekleyebilirsiniz.
          </p>
        )}
      </Section>

      <CtaBand />
    </>
  )
}
