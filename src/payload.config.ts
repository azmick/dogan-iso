import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, type Plugin } from 'payload'
import { en } from 'payload/i18n/en'
import { tr } from 'payload/i18n/tr'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { ContactSubmissions } from './collections/ContactSubmissions'
import { Faq } from './collections/Faq'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Services } from './collections/Services'
import { Users } from './collections/Users'
import { ContactInfo } from './globals/ContactInfo'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/**
 * CSRF allowlist — panelin çıkış/kaydetme gibi POST isteklerinde tarayıcının
 * gönderdiği `Origin` başlığı bu listede yoksa Payload oturum çerezini yok sayar;
 * istek "giriş yapılmamış" sayılır. Panel bunu kullanıcıya hata olarak göstermez
 * (ör. çıkışta yine "başarılı" der ama çerez silinmez), o yüzden listenin
 * eksiksiz olması önemli.
 *
 * serverURL'i Payload kendisi ekler; biz PAYLOAD_CSRF_ORIGINS ile bildirilen
 * ek adresleri (www'lu/www'suz alan adı, sunucunun IP'si) ekliyoruz.
 */
const csrf = Array.from(
  new Set(
    [serverURL, ...(process.env.PAYLOAD_CSRF_ORIGINS || '').split(',')]
      .map((origin) => origin?.trim().replace(/\/$/, ''))
      .filter((origin): origin is string => Boolean(origin)),
  ),
)

const plugins: Plugin[] = [
  seoPlugin({
    collections: ['services', 'posts', 'pages'],
    uploadsCollection: 'media',
    tabbedUI: true,
    generateTitle: ({ doc }) => (doc?.title as string) ?? '',
    generateDescription: ({ doc }) => (doc?.excerpt as string) ?? '',
    generateURL: ({ doc, collectionSlug }) => {
      const prefixes: Record<string, string> = {
        services: '/hizmetler',
        posts: '/blog',
        pages: '',
      }

      const prefix = prefixes[collectionSlug as string] ?? ''

      return `${serverURL}${prefix}/${doc?.slug ?? ''}`
    },
  }),

  /**
   * MCP sunucusu — POST /api/mcp
   *
   * Erişim yalnızca `payload-mcp-api-keys` koleksiyonundaki bir API anahtarıyla
   * mümkündür (Authorization: Bearer <anahtar>). Her anahtarda aşağıda açılan
   * yetenekler tek tek işaretlenir; varsayılanları kapalıdır.
   *
   * Anahtar üretmek için: pnpm mcp:key
   * Canlıda tamamen kapatmak için: PAYLOAD_MCP_DISABLED=true
   */
  mcpPlugin({
    disabled: process.env.PAYLOAD_MCP_DISABLED === 'true',
    userCollection: 'users',
    collections: {
      services: {
        description: 'ISO hizmetleri (başlık, slug, özet, içerik, sıralama, SEO).',
        enabled: { create: true, delete: true, find: true, update: true },
      },
      posts: {
        description: 'Blog yazıları (başlık, slug, yayın tarihi, özet, içerik, SEO).',
        enabled: { create: true, delete: true, find: true, update: true },
      },
      pages: {
        description: 'Kurumsal / yasal statik sayfalar (KVKK, çerez politikası vb.).',
        enabled: { create: true, delete: true, find: true, update: true },
      },
      faq: {
        description: 'Sıkça sorulan sorular (soru, cevap, sıralama).',
        enabled: { create: true, delete: true, find: true, update: true },
      },
      media: {
        description: 'Görsel ve dosya kütüphanesi. Yeni dosya yükleme panelden yapılır.',
        enabled: { find: true, update: true },
      },
      'contact-submissions': {
        description: 'İletişim formu kayıtları. Salt okunur.',
        enabled: { find: true },
      },
    },
    globals: {
      'site-settings': {
        description: 'Site geneli ayarlar: logo, favicon, site adı, varsayılan SEO.',
        enabled: { find: true, update: true },
      },
      'contact-info': {
        description: 'İletişim bilgileri: adres, telefon, e-posta, çalışma saatleri, sosyal medya.',
        enabled: { find: true, update: true },
      },
    },
    mcp: {
      handlerOptions: {
        verboseLogs: process.env.NODE_ENV === 'development',
      },
      serverOptions: {
        instructions:
          'Bu sunucu ISO belgelendirme tanıtım sitesinin Payload CMS içeriğini yönetir. ' +
          'Slug alanları Türkçe-uyumlu ve tirelidir (ör. iso-27001-bilgi-guvenligi). ' +
          'Zengin metin alanları Lexical JSON biçimindedir. ' +
          'contact-submissions salt okunurdur.',
        serverInfo: {
          name: 'dogan-iso-payload',
          version: '1.0.0',
        },
      },
    },
  }),
]

/**
 * MCP eklentisinin eklediği `payload-mcp-api-keys` koleksiyonu varsayılan olarak
 * İngilizce etiketlerle ("API Keys") ve kendi başına bir "MCP" menü grubunda çıkıyor.
 * İçerik editörü için anlamsız olduğundan Türkçeleştirip menünün sonundaki
 * "Gelişmiş" grubuna alıyoruz.
 *
 * `order` mcpPlugin'in order'ından (10) büyük olmalı — Payload eklentileri
 * order'a göre sıralar ve koleksiyon ancak mcpPlugin çalıştıktan sonra var olur.
 */
const localizeMcpKeysCollection: Plugin = (incomingConfig) => ({
  ...incomingConfig,
  collections: (incomingConfig.collections ?? []).map((collection) => {
    if (collection.slug !== 'payload-mcp-api-keys') return collection

    return {
      ...collection,
      labels: {
        singular: 'MCP Erişim Anahtarı',
        plural: 'MCP Erişim Anahtarları',
      },
      admin: {
        ...collection.admin,
        group: 'Gelişmiş',
        description:
          'Teknik ayar — yapay zekâ araçlarının siteyi güncellemesi için üretilen erişim anahtarları. İçerik düzenlemek için bu bölüme girmenize gerek yoktur.',
      },
    }
  }),
})

localizeMcpKeysCollection.order = 20
localizeMcpKeysCollection.slug = 'dogan-iso/localize-mcp-keys'

plugins.push(localizeMcpKeysCollection)

export default buildConfig({
  serverURL,
  csrf,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Yönetim Paneli',
      description:
        'ISO belgelendirme tanıtım sitesinin içerik yönetim paneli. Sayfalar, blog yazıları, hizmetler ve iletişim bilgileri buradan güncellenir.',
    },
    // Panel açık kalırken oturumun kendiliğinden düşmesini engeller —
    // yazı yazarken oturumu kapanan editör, yazdıklarını kaybetmesin.
    autoRefresh: true,
    // Türkçe tarih gösterimi (gg.aa.yyyy).
    dateFormat: 'dd.MM.yyyy HH:mm',
    components: {
      graphics: {
        Icon: '/admin/components/graphics/Icon#AdminIcon',
        Logo: '/admin/components/graphics/Logo#AdminLogo',
      },
      beforeLogin: ['/admin/components/BeforeLogin#BeforeLogin'],
      beforeNavLinks: ['/admin/components/NavShortcuts#NavShortcuts'],
      beforeDashboard: ['/admin/components/Dashboard#AdminDashboard'],
    },
  },
  /**
   * Panel arayüzü Türkçe açılır. Payload'ın hazır Türkçe çevirileri
   * ("Kaydet", "Sil", "Yeni ... oluştur" vb.) kullanılır; kullanıcı isterse
   * sağ üstteki hesap ekranından İngilizceye geçebilir.
   */
  i18n: {
    fallbackLanguage: 'tr',
    supportedLanguages: { tr, en },
  },
  collections: [Services, Posts, Pages, Faq, Media, ContactSubmissions, Users],
  globals: [SiteSettings, ContactInfo],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    // Canlıda otomatik şema değişikliği kapalı; migration kullanılır.
    push: process.env.NODE_ENV === 'development',
  }),
  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: process.env.EMAIL_FROM_ADDRESS || 'bilgi@ornek-firma.com.tr',
        defaultFromName: process.env.EMAIL_FROM_NAME || 'Örnek ISO Belgelendirme',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: Number(process.env.SMTP_PORT || 587) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        },
      })
    : undefined,
  sharp,
  plugins,
})
