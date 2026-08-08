import type { Metadata } from 'next'
import Link from 'next/link'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CardImage } from '@/components/CardImage'
import { CtaBand } from '@/components/CtaBand'
import { CheckIcon, ShieldCheckIcon } from '@/components/Icons'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { buildMetadata } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

export const revalidate = 300

const DESCRIPTION =
  'Bağımsız bir belgelendirme kuruluşu olarak yönetim sistemi standartlarında denetim, belgelendirme ve uyum danışmanlığı hizmetleri sunuyoruz.'

export const generateMetadata = async (): Promise<Metadata> =>
  buildMetadata({
    title: 'Hakkımızda',
    description: DESCRIPTION,
    path: ROUTES.about,
  })

const VALUES = [
  {
    title: 'Misyonumuz',
    text: 'Kuruluşların yönetim sistemlerini uluslararası standartlara uygun şekilde kurmalarına ve sürdürmelerine; tarafsız, şeffaf ve izlenebilir denetim süreçleriyle katkı sağlamak.',
  },
  {
    title: 'Vizyonumuz',
    text: 'Belgelendirme hizmetlerinde güvenilirliğiyle anılan, denetim kalitesini sürekli geliştiren ve sektöre değer katan bir kuruluş olmak.',
  },
  {
    title: 'Değerlerimiz',
    text: 'Tarafsızlık, gizlilik, yetkinlik, sorumluluk ve sürekli iyileştirme; tüm denetim ve karar süreçlerimizin temelini oluşturur.',
  },
]

const WHY_US = [
  'Standart bazında yetkinliği belgelenmiş baş denetçi kadrosu',
  'Sektör ve ölçek farkını gözeten denetim planlaması',
  'Denetim öncesi boşluk analizi ve hazırlık desteği',
  'Uygunsuzluklarda net, uygulanabilir düzeltici faaliyet önerileri',
  'Belge geçerlilik süresi boyunca gözetim takibi',
  'Gizlilik taahhüdü ve veri güvenliği prosedürleri',
]

const STATS = [
  { value: '15+', label: 'Yıllık saha tecrübesi' },
  { value: '500+', label: 'Tamamlanan denetim' },
  { value: '40+', label: 'Hizmet verilen sektör' },
  { value: '20+', label: 'Denetçi kadrosu' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero title="Hakkımızda" description={DESCRIPTION} />
      <Breadcrumbs items={[{ label: 'Hakkımızda' }]} />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="rich-text">
            <h2 className="section-title text-2xl sm:text-3xl">Firmamız Kimdir?</h2>

            <p>
              Kuruluşumuz; ISO 27001 ve ISO 27701, ISO 22301, ISO 9001 başta olmak üzere yönetim
              sistemi standartlarında denetim ve danışmanlık hizmeti veren bağımsız bir kuruluştur.
              Aynı çatı altında KVKK uyum danışmanlığı, teknik gereksinim çözümleri, eğitim ve SGK
              teşvik danışmanlığı hizmetleri de sunuyoruz.
            </p>

            <p>
              Denetim yaklaşımımız, kuruluşların günlük işleyişini aksatmadan gerçek riskleri
              görünür kılmayı hedefler. Denetim ekiplerimiz; kuruluşun sektörü, ölçeği ve süreç
              olgunluğu dikkate alınarak oluşturulur. Böylece hem standardın gereklilikleri
              karşılanır hem de kuruluşa somut bir iyileştirme yol haritası bırakılır.
            </p>

            <p>
              Belgelendirme kararları, denetimi gerçekleştiren ekipten bağımsız bir karar vericisi
              tarafından alınır. Bu ayrım, tarafsızlık ilkemizin uygulamadaki karşılığıdır. Tüm
              denetim kayıtları gizlilik prosedürlerimiz kapsamında saklanır ve üçüncü taraflarla
              paylaşılmaz.
            </p>

            <p className="text-sm text-text-muted">
              <em>
                Bu sayfadaki metinler temsilidir; yönetim panelinden kendi kurumsal metinlerinizle
                değiştirilebilir.
              </em>
            </p>
          </div>

          <div>
            <CardImage
              fallbackLabel="Kurumsal Görsel"
              aspect="aspect-[4/3]"
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="rounded-lg border border-border shadow-[var(--shadow-card)]"
            />

            <dl className="mt-6 grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border bg-bg-soft px-4 py-5 text-center"
                >
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-2xl font-extrabold text-primary">{stat.value}</span>
                    <span className="mt-1 block text-[11px] font-medium uppercase tracking-wider text-text-muted">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* Misyon / Vizyon / Değerler */}
      <Section soft title="Misyon, Vizyon ve Değerlerimiz" centered>
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((value) => (
            <article key={value.title} className="card p-6 md:p-7">
              <span
                aria-hidden
                className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary-soft text-primary"
              >
                <ShieldCheckIcon width={22} height={22} />
              </span>
              <h3 className="mt-5 text-lg">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{value.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Neden biz */}
      <Section
        title="Neden Bizimle Çalışmalısınız?"
        description="Belgelendirme sürecini bir formalite değil, kuruluşunuzun işleyişini iyileştiren bir çalışma olarak ele alıyoruz."
      >
        <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {WHY_US.map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-md border border-border bg-bg-soft px-4 py-4 text-[15px] leading-relaxed"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <CheckIcon width={12} height={12} />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-[15px] text-text-muted">
          Hizmet kapsamlarımızı{' '}
          <Link
            href={ROUTES.services}
            className="font-semibold text-link underline underline-offset-2"
          >
            Hizmetlerimiz
          </Link>{' '}
          sayfasından inceleyebilir, sorularınız için{' '}
          <Link href={ROUTES.faq} className="font-semibold text-link underline underline-offset-2">
            SSS
          </Link>{' '}
          bölümüne göz atabilirsiniz.
        </p>
      </Section>

      <CtaBand />
    </>
  )
}
