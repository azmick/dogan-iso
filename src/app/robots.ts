import type { MetadataRoute } from 'next'

import { absoluteUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Yönetim paneli ve API uçları dizinlenmemeli
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
