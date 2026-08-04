import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CtaBand } from '@/components/CtaBand'
import { FaqAccordion } from '@/components/FaqAccordion'
import { JsonLd } from '@/components/JsonLd'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { richTextToExcerpt } from '@/lib/format'
import { getFaqs } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

export const revalidate = 300

const DESCRIPTION =
  'Belgelendirme süreci, denetim aşamaları, belge geçerlilik süresi ve KVKK uyumu hakkında en sık sorulan sorular.'

export const generateMetadata = async (): Promise<Metadata> =>
  buildMetadata({
    title: 'Sıkça Sorulan Sorular',
    description: DESCRIPTION,
    path: ROUTES.faq,
  })

export default async function FaqPage() {
  const faqs = await getFaqs()

  const faqJsonLd = faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: richTextToExcerpt(item.answer, 5000),
          },
        })),
      }
    : null

  return (
    <>
      <PageHero title="Sıkça Sorulan Sorular" description={DESCRIPTION} />
      <Breadcrumbs items={[{ label: 'Sıkça Sorulan Sorular' }]} />

      <Section>
        {faqs.length ? (
          <FaqAccordion items={faqs} />
        ) : (
          <p className="rounded-lg border border-dashed border-border bg-bg-soft p-8 text-center text-sm text-text-muted">
            Henüz soru eklenmemiş. Yönetim panelindeki <strong>Sıkça Sorulan Sorular</strong>{' '}
            bölümünden kayıt ekleyebilirsiniz.
          </p>
        )}
      </Section>

      <CtaBand />

      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
    </>
  )
}
