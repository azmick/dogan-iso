import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig, type Plugin } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { ContactSubmissions } from './collections/ContactSubmissions'
import { Faq } from './collections/Faq'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Services } from './collections/Services'
import { Users } from './collections/Users'
import { ContactInfo } from './globals/ContactInfo'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

const plugins: Plugin[] = [
  seoPlugin({
    collections: ['services', 'posts', 'projects', 'pages'],
    uploadsCollection: 'media',
    tabbedUI: true,
    generateTitle: ({ doc }) => (doc?.title as string) ?? '',
    generateDescription: ({ doc }) => (doc?.excerpt as string) ?? '',
    generateURL: ({ doc, collectionSlug }) => {
      const prefixes: Record<string, string> = {
        services: '/hizmetler',
        posts: '/haberler',
        projects: '/etkinlikler',
        pages: '',
      }

      const prefix = prefixes[collectionSlug as string] ?? ''

      return `${serverURL}${prefix}/${doc?.slug ?? ''}`
    },
  }),
]

// BLOB_READ_WRITE_TOKEN tanımlıysa yüklemeler Vercel Blob'a gider.
// Token yoksa (ilk kurulum / yerel geliştirme) eklenti devre dışı kalır.
if (process.env.BLOB_READ_WRITE_TOKEN) {
  plugins.push(
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // Vercel'in 4.5MB sunucu-upload limitini aşmak için doğrudan istemciden yükleme
      clientUploads: true,
    }),
  )
}

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Yönetim Paneli',
    },
  },
  collections: [Services, Posts, Projects, Pages, Faq, Media, ContactSubmissions, Users],
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
