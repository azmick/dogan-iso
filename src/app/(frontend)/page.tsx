import Link from 'next/link'

import { CardImage } from '@/components/CardImage'
import { CtaBand } from '@/components/CtaBand'
import { HeroSlider, type HeroSlide } from '@/components/HeroSlider'
import { ArrowRightIcon, CheckIcon } from '@/components/Icons'
import { ProjectCard } from '@/components/ProjectCard'
import { Section } from '@/components/Section'
import { ServiceCard } from '@/components/ServiceCard'
import { getProjects, getServices } from '@/lib/payload'
import { ROUTES } from '@/lib/site'

export const revalidate = 300

/** Temsili slayt içerikleri — kullanıcı sonradan kendi metinleriyle değiştirecek. */
const HERO_SLIDES: HeroSlide[] = [
  {
    title: 'Bilgi Güvenliği Yönetim Sistemi Danışmanlığı',
    description:
      'ISO 27001 kapsamında kurumunuzun bilgi varlıklarını sınıflandırıyor, risk analizini yapıyor ve belgelendirme denetimine hazır hâle getiriyoruz.',
    ctaLabel: 'Hizmeti İnceleyin',
    ctaHref: ROUTES.services,
  },
  {
    title: 'KVKK Uyum Süreçlerinizi Uçtan Uca Yönetin',
    description:
      'Veri envanteri, aydınlatma metinleri, açık rıza yönetimi ve VERBİS bildirimlerine kadar tüm uyum adımlarında yanınızdayız.',
    ctaLabel: 'KVKK Hizmetlerimiz',
    ctaHref: ROUTES.services,
  },
  {
    title: 'KVKK Teknik Gereksinim Çözümleri',
    description:
      'Log yönetimi, yetkilendirme matrisi, sızma testi ve veri maskeleme gibi teknik tedbirleri kurumunuza uygun şekilde kurguluyoruz.',
    ctaLabel: 'Teknik Çözümler',
    ctaHref: ROUTES.services,
  },
  {
    title: 'Eğitim ve Seminer Hizmetleri',
    description:
      'Baş denetçi, iç denetçi ve farkındalık eğitimleriyle ekiplerinizin standartları doğru yorumlamasını sağlıyoruz.',
    ctaLabel: 'Eğitim Takvimi',
    ctaHref: ROUTES.services,
  },
]

const HIGHLIGHTS = [
  'Akredite kuruluşlarla yürütülen bağımsız denetim süreci',
  'Sektöre özel, uygulanabilir dokümantasyon desteği',
  'Denetim öncesi boşluk analizi ve hazırlık çalışması',
  'Belge sonrası gözetim denetimlerinde sürekli takip',
]

const STATS = [
  { value: '20+', label: 'Yıllık saha tecrübesi' },
  { value: '500+', label: 'Tamamlanan denetim' },
  { value: '9', label: 'Yönetim sistemi standardı' },
  { value: '%98', label: 'Denetim başarı oranı' },
]

export default async function HomePage() {
  const [services, projects] = await Promise.all([getServices(6), getProjects(6)])

  return (
    <>
      <HeroSlider slides={HERO_SLIDES} />

      {/* ---------------- Hakkımızda özeti ---------------- */}
      <Section soft>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <CardImage
              fallbackLabel="Kurumsal Tanıtım Görseli"
              aspect="aspect-[4/3]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="rounded-lg border border-border shadow-[var(--shadow-card)]"
            />

            <div className="absolute -bottom-6 -right-2 hidden rounded-lg bg-primary px-6 py-5 text-white shadow-[var(--shadow-card-hover)] sm:block lg:-right-6">
              <p className="text-3xl font-extrabold leading-none">15+</p>
              <p className="mt-1.5 text-xs font-medium uppercase tracking-wider text-white/70">
                Yıllık tecrübe
              </p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
              Hakkımızda
            </p>

            <h2 className="section-title text-2xl leading-tight sm:text-3xl lg:text-[2rem]">
              Firmamız Kimdir?
            </h2>

            <p className="mt-6 text-[15px] leading-relaxed text-text-muted md:text-base">
              Kuruluşumuz, yönetim sistemi standartlarının kurulması, denetlenmesi ve
              belgelendirilmesi alanında hizmet veren bir danışmanlık kuruluşudur. Bilgi
              güvenliğinden kalite yönetimine, çevre performansından iş sağlığı ve güvenliğine kadar
              geniş bir kapsamda; tarafsızlık, gizlilik ve şeffaflık ilkelerine bağlı kalarak
              çalışırız.
            </p>

            <ul className="mt-7 space-y-3.5">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-text">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <CheckIcon width={13} height={13} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <Link href={ROUTES.about} className="btn btn-primary mt-8">
              Hakkımızda
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </Section>

      {/* ---------------- Hizmetler ---------------- */}
      <Section
        eyebrow="Ne yapıyoruz?"
        title="Hizmetlerimiz"
        description="Kurumunuzun ihtiyaç duyduğu yönetim sistemi standartlarında denetim, belgelendirme ve uyum danışmanlığı sağlıyoruz."
        action={
          <Link href={ROUTES.services} className="btn btn-outline">
            Tüm Hizmetler
            <ArrowRightIcon />
          </Link>
        }
      >
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

      {/* ---------------- Etkinlikler / Projeler ---------------- */}
      {projects.length ? (
        <Section
          soft
          eyebrow="Sahadan"
          title="Etkinlikler ve Projeler"
          description="Katıldığımız fuarlar, düzenlediğimiz eğitimler ve tamamladığımız saha çalışmalarından bir seçki."
          action={
            <Link href={ROUTES.projects} className="btn btn-outline">
              Tümünü Gör
              <ArrowRightIcon />
            </Link>
          }
        >
          {/* Mobilde yatay kaydırmalı şerit, masaüstünde grid */}
          <ul className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.id} className="w-[78vw] shrink-0 snap-start sm:w-[52vw] md:w-auto">
                <ProjectCard project={project} className="h-full" />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* ---------------- Sayısal göstergeler ---------------- */}
      <section className="border-y border-border bg-bg py-12" aria-label="Rakamlarla firmamız">
        <div className="container-site grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold text-primary sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-text-muted sm:text-[13px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
