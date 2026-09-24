import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  // `next dev` proje kökündeki CLAUDE.md'ye kendi bloğunu eklemesin —
  // o dosya projenin elle yazılmış talimat setidir.
  agentRules: false,
  experimental: {
    // CSS'i <link rel="stylesheet"> yerine HTML'in içine <style> olarak göm.
    // Böylece ilk boyama için ayrı CSS isteği beklenmez (render-blocking kalkar).
    // Frontend CSS'i ~45 KB ham / ~7 KB sıkıştırılmış olduğundan gömmek karlı.
    inlineCss: true,
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  /**
   * Kaldırılan adreslerin kalıcı (301) karşılıkları — arama motorlarındaki
   * ve dışarıdaki eski bağlantılar 404 vermesin, sıralama yeni adrese geçsin.
   *
   * - /haberler → /blog : Haberler bölümü Blog olarak devam ediyor (içerik aynı).
   * - /etkinlikler, /galeri → /blog : bu bölümler kaldırıldı; en yakın karşılık blog.
   */
  redirects: async () => [
    {
      source: '/haberler',
      destination: '/blog',
      permanent: true,
    },
    {
      source: '/haberler/:slug',
      destination: '/blog/:slug',
      permanent: true,
    },
    {
      source: '/etkinlikler',
      destination: '/blog',
      permanent: true,
    },
    {
      source: '/etkinlikler/:slug',
      destination: '/blog',
      permanent: true,
    },
    {
      source: '/galeri',
      destination: '/blog',
      permanent: true,
    },
  ],
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
