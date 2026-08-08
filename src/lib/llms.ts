import { convertLexicalToMarkdown, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

import { richTextToExcerpt, toISODate } from '@/lib/format'
import {
  getContactInfo,
  getFaqs,
  getPages,
  getPayloadClient,
  getPosts,
  getProjects,
  getServices,
  getSiteSettings,
} from '@/lib/payload'
import { absoluteUrl } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

/**
 * llmstxt.org biçiminde /llms.txt ve /llms-full.txt üretir.
 *
 * llms.txt  → yalnızca başlık + özet + bölümlenmiş bağlantı listesi (küçük dosya).
 * llms-full → aynı sayfaların tam metni tek markdown belgesinde.
 *
 * İkisi de içeriği Payload'dan okur; panelde bir kayıt değişince
 * `revalidate.ts` bu iki adresi de tazeler.
 */

/** llms.txt'te listelenecek en fazla haber/etkinlik sayısı (dosya şişmesin). */
const LIST_LIMIT = 50

/* ------------------------------------------------------------------ */
/* Yardımcılar                                                         */
/* ------------------------------------------------------------------ */

/** Bağlantı metnindeki köşeli parantezler markdown'ı bozmasın. */
const escapeLinkText = (value: string): string => value.replace(/([[\]])/g, '\\$1')

/** Açıklamaları tek satıra indirger ve gerekirse kısaltır. */
const oneLine = (value?: string | null, maxLength = 200): string => {
  if (!value) return ''

  const flat = value.replace(/\s+/g, ' ').trim()

  if (flat.length <= maxLength) return flat

  return `${flat
    .slice(0, maxLength)
    // Yarım kalan kelimeyi ve ardından boşta kalan ayracı at ("… soru ·…" olmasın).
    .replace(/\s+\S*$/, '')
    .replace(/[\s·,;:–—-]+$/, '')}…`
}

/** Kısa açıklama; girilmemişse içerikten üretilir. */
const summarize = (excerpt?: string | null, content?: unknown): string =>
  oneLine(excerpt) || richTextToExcerpt(content, 200)

type LinkEntry = {
  title: string
  /** Kök göreli yol, örn. /hizmetler/iso-27001 */
  path: string
  description?: string | null
}

const linkLine = ({ title, path, description }: LinkEntry): string => {
  const note = oneLine(description)

  return `- [${escapeLinkText(title)}](${absoluteUrl(path)})${note ? `: ${note}` : ''}`
}

/** Boş bölüm başlığı basılmasın diye kayıt yoksa hiçbir şey döndürmez. */
const linkSection = (heading: string, entries: LinkEntry[]): string[] =>
  entries.length ? ['', `## ${heading}`, '', ...entries.map(linkLine)] : []

type Timestamped = { updatedAt?: string | null }

/** İçeriğin en son ne zaman değiştiğini bulur (dosyanın tazeliğini bildirmek için). */
const latestUpdate = (...groups: Timestamped[][]): string => {
  const times = groups
    .flat()
    .map((doc) => (doc?.updatedAt ? new Date(doc.updatedAt).getTime() : 0))
    .filter((time) => Number.isFinite(time) && time > 0)

  return times.length ? toISODate(new Date(Math.max(...times)).toISOString()) : ''
}

/* ------------------------------------------------------------------ */
/* /llms.txt — bağlantı dizini                                         */
/* ------------------------------------------------------------------ */

export const buildLlmsTxt = async (): Promise<string> => {
  const [settings, contact, services, postsResult, projects, pages, faqs] = await Promise.all([
    getSiteSettings(),
    getContactInfo(),
    getServices(100),
    getPosts(1, LIST_LIMIT),
    getProjects(LIST_LIMIT),
    getPages(),
    getFaqs(),
  ])

  const posts = postsResult.docs
  const siteName = settings?.siteName || 'ISO Belgelendirme'
  const tagline = oneLine(settings?.tagline, 240)
  const intro = oneLine(settings?.defaultSeo?.description, 400)

  const lines: string[] = [`# ${siteName}`]

  if (tagline) lines.push('', `> ${tagline}`)
  // Site geneli açıklama tagline ile aynıysa iki kez yazma.
  if (intro && intro !== tagline) lines.push('', intro)

  lines.push(
    '',
    'Bu dosya llmstxt.org biçimindedir; sitedeki tüm sayfaları dil modelleri için ' +
      'özetler. Site tamamen Türkçedir (tr-TR).',
    '',
  )

  const address = [
    contact?.addressLine,
    [contact?.postalCode, contact?.addressLocality].filter(Boolean).join(' '),
  ]
    .filter(Boolean)
    .join(', ')

  const facts: [string, string | null | undefined][] = [
    ['Kuruluş', settings?.legalName || siteName],
    ['Adres', address],
    ['Telefon', contact?.phone],
    ['E-posta', contact?.email],
    ['Çalışma saatleri', contact?.workingHours],
    ['Son içerik güncellemesi', latestUpdate(services, posts, projects, pages, faqs)],
    ['Tüm sayfaların tam metni', absoluteUrl('/llms-full.txt')],
    ['Site haritası', absoluteUrl('/sitemap.xml')],
  ]

  facts.forEach(([label, value]) => {
    const clean = oneLine(value)

    if (clean) lines.push(`- ${label}: ${clean}`)
  })

  /* -------------------- Hizmetler -------------------- */
  lines.push(
    ...linkSection('Hizmetler', [
      {
        title: 'Hizmetlerimiz',
        path: ROUTES.services,
        description: 'Verilen tüm belgelendirme, denetim ve danışmanlık hizmetlerinin listesi.',
      },
      ...services.map((service) => ({
        title: service.title,
        path: `${ROUTES.services}/${service.slug}`,
        description: summarize(service.excerpt, service.content),
      })),
    ]),
  )

  /* -------------------- Kurumsal -------------------- */
  const faqTopics = faqs
    .slice(0, 6)
    .map((item) => item.question.replace(/\s+/g, ' ').trim())
    .join(' · ')

  lines.push(
    ...linkSection('Kurumsal', [
      {
        title: 'Hakkımızda',
        path: ROUTES.about,
        description: `${siteName} hakkında kurumsal tanıtım, misyon, vizyon ve değerler.`,
      },
      {
        title: 'Sıkça Sorulan Sorular',
        path: ROUTES.faq,
        description: faqs.length
          ? `${faqs.length} soru-cevap. Öne çıkanlar: ${faqTopics}`
          : 'Belgelendirme ve uyum süreçleri hakkında sık sorulan sorular.',
      },
      {
        title: 'İletişim',
        path: ROUTES.contact,
        description: [address, contact?.phone, contact?.email].filter(Boolean).join(' — '),
      },
    ]),
  )

  /* -------------------- Yasal / kurumsal metinler -------------------- */
  lines.push(
    ...linkSection(
      'Yasal ve Bilgilendirme Metinleri',
      pages.map((page) => ({
        title: page.title,
        path: `/${page.slug}`,
        description: summarize(page.excerpt, page.content),
      })),
    ),
  )

  /* -------------------- Haberler -------------------- */
  lines.push(
    ...linkSection('Haberler', [
      ...(posts.length
        ? [
            {
              title: 'Haberler',
              path: ROUTES.posts,
              description: 'Sektörel gelişmeler, mevzuat değişiklikleri ve kurumsal duyurular.',
            },
          ]
        : []),
      ...posts.map((post) => ({
        title: post.title,
        path: `${ROUTES.posts}/${post.slug}`,
        description: [toISODate(post.publishedDate), summarize(post.excerpt, post.content)]
          .filter(Boolean)
          .join(' — '),
      })),
    ]),
  )

  /* -------------------- Etkinlikler -------------------- */
  lines.push(
    ...linkSection('Etkinlikler ve Projeler', [
      ...(projects.length
        ? [
            {
              title: 'Etkinliklerimiz',
              path: ROUTES.projects,
              description: 'Katılınan fuarlar, düzenlenen eğitimler ve tamamlanan saha çalışmaları.',
            },
          ]
        : []),
      ...projects.map((project) => ({
        title: project.title,
        path: `${ROUTES.projects}/${project.slug}`,
        description: [toISODate(project.date), summarize(project.excerpt, project.content)]
          .filter(Boolean)
          .join(' — '),
      })),
    ]),
  )

  return `${lines.join('\n').trim()}\n`
}

/* ------------------------------------------------------------------ */
/* /llms-full.txt — tam metin                                          */
/* ------------------------------------------------------------------ */

/**
 * İçerikten gelen başlıkları iki seviye aşağı kaydırır; böylece belgenin
 * kendi `#`/`##`/`###` hiyerarşisiyle çakışmazlar.
 */
const demoteHeadings = (markdown: string): string => markdown.replace(/^(#{1,4}) /gm, '$1## ')

type Document = {
  title: string
  path: string
  /** Başlığın altındaki listeye eklenecek "Yayın tarihi: …" gibi bilgiler. */
  meta?: (string | null | undefined)[]
  excerpt?: string | null
  content?: unknown
}

export const buildLlmsFullTxt = async (): Promise<string> => {
  const payload = await getPayloadClient()

  const [editorConfig, settings, contact, services, postsResult, projects, pages, faqs] =
    await Promise.all([
      editorConfigFactory.default({ config: payload.config }),
      getSiteSettings(),
      getContactInfo(),
      getServices(100),
      getPosts(1, LIST_LIMIT),
      getProjects(LIST_LIMIT),
      getPages(),
      getFaqs(),
    ])

  const posts = postsResult.docs
  const siteName = settings?.siteName || 'ISO Belgelendirme'

  /** Lexical içeriği markdown'a çevirir; çeviremezse düz metne düşer. */
  const toMarkdown = (data: unknown): string => {
    if (!data) return ''

    try {
      return demoteHeadings(convertLexicalToMarkdown({ data: data as never, editorConfig }).trim())
    } catch {
      try {
        return convertLexicalToPlaintext({ data: data as never }).trim()
      } catch {
        return ''
      }
    }
  }

  const documentBlock = ({ title, path, meta = [], excerpt, content }: Document): string[] => {
    const body = toMarkdown(content)
    // "Adres" fiziksel adres için ayrıldı; sayfa bağlantısı "Sayfa" olarak geçer.
    const block = ['', `### ${title}`, '', `- Sayfa: ${absoluteUrl(path)}`]

    meta.filter(Boolean).forEach((item) => block.push(`- ${item}`))

    if (excerpt) block.push('', oneLine(excerpt, 400))
    if (body) block.push('', body)

    return block
  }

  const lines: string[] = [
    `# ${siteName} — Tüm Site İçeriği`,
    '',
    `> Sitedeki tüm sayfaların tam metni tek dosyada (llmstxt.org). Dizin için: ${absoluteUrl('/llms.txt')}`,
    '',
    `- Site: ${absoluteUrl('/')}`,
    `- Dil: Türkçe (tr-TR)`,
  ]

  const updated = latestUpdate(services, posts, projects, pages, faqs)

  if (updated) lines.push(`- Son içerik güncellemesi: ${updated}`)
  if (contact?.phone) lines.push(`- Telefon: ${contact.phone}`)
  if (contact?.email) lines.push(`- E-posta: ${contact.email}`)

  /* -------------------- Hizmetler -------------------- */
  if (services.length) {
    lines.push('', '## Hizmetler')

    services.forEach((service) => {
      lines.push(
        ...documentBlock({
          title: service.title,
          path: `${ROUTES.services}/${service.slug}`,
          excerpt: service.excerpt,
          content: service.content,
        }),
      )
    })
  }

  /* -------------------- Yasal / kurumsal metinler -------------------- */
  if (pages.length) {
    lines.push('', '## Yasal ve Bilgilendirme Metinleri')

    pages.forEach((page) => {
      lines.push(
        ...documentBlock({
          title: page.title,
          path: `/${page.slug}`,
          excerpt: page.excerpt,
          content: page.content,
        }),
      )
    })
  }

  /* -------------------- SSS -------------------- */
  if (faqs.length) {
    lines.push('', '## Sıkça Sorulan Sorular', '', `- Sayfa: ${absoluteUrl(ROUTES.faq)}`)

    faqs.forEach((item) => {
      const answer = toMarkdown(item.answer)

      lines.push('', `### ${item.question}`)

      if (answer) lines.push('', answer)
    })
  }

  /* -------------------- Haberler -------------------- */
  if (posts.length) {
    lines.push('', '## Haberler')

    posts.forEach((post) => {
      lines.push(
        ...documentBlock({
          title: post.title,
          path: `${ROUTES.posts}/${post.slug}`,
          meta: [post.publishedDate ? `Yayın tarihi: ${toISODate(post.publishedDate)}` : null],
          excerpt: post.excerpt,
          content: post.content,
        }),
      )
    })
  }

  /* -------------------- Etkinlikler -------------------- */
  if (projects.length) {
    lines.push('', '## Etkinlikler ve Projeler')

    projects.forEach((project) => {
      lines.push(
        ...documentBlock({
          title: project.title,
          path: `${ROUTES.projects}/${project.slug}`,
          meta: [project.date ? `Tarih: ${toISODate(project.date)}` : null],
          excerpt: project.excerpt,
          content: project.content,
        }),
      )
    })
  }

  /* -------------------- İletişim -------------------- */
  const contactFacts = [
    contact?.addressLine ? `Adres: ${contact.addressLine}` : null,
    contact?.addressLocality
      ? `İlçe/İl: ${[contact.postalCode, contact.addressLocality].filter(Boolean).join(' ')}`
      : null,
    contact?.phone ? `Telefon: ${contact.phone}` : null,
    contact?.whatsapp ? `WhatsApp: ${contact.whatsapp}` : null,
    contact?.email ? `E-posta: ${contact.email}` : null,
    contact?.workingHours ? `Çalışma saatleri: ${contact.workingHours}` : null,
  ].filter(Boolean) as string[]

  if (contactFacts.length) {
    lines.push(
      '',
      '## İletişim',
      '',
      `- Sayfa: ${absoluteUrl(ROUTES.contact)}`,
      ...contactFacts.map((fact) => `- ${fact}`),
    )
  }

  return `${lines.join('\n').trim()}\n`
}
