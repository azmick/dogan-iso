import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CtaBand } from '@/components/CtaBand'
import { PageHero } from '@/components/PageHero'
import { ProjectCard } from '@/components/ProjectCard'
import { Section } from '@/components/Section'
import { getProjects } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

export const revalidate = 300

const DESCRIPTION =
  'Katıldığımız fuarlar, düzenlediğimiz eğitim ve seminerler ile tamamladığımız saha çalışmalarından örnekler.'

export const generateMetadata = async (): Promise<Metadata> =>
  buildMetadata({
    title: 'Etkinliklerimiz',
    description: DESCRIPTION,
    path: ROUTES.projects,
  })

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <>
      <PageHero title="Etkinliklerimiz" description={DESCRIPTION} />
      <Breadcrumbs items={[{ label: 'Etkinliklerimiz' }]} />

      <Section>
        {projects.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} priority={index < 3} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-border bg-bg-soft p-8 text-center text-sm text-text-muted">
            Henüz etkinlik eklenmemiş. Yönetim panelinden <strong>Etkinlikler</strong> bölümüne
            kayıt ekleyebilirsiniz.
          </p>
        )}
      </Section>

      <CtaBand />
    </>
  )
}
