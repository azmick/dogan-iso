import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
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
  // Medya/galeri sayfası kaldırıldı; görseller artık ilgili sayfaların içinde.
  // Dışarıda kalmış eski bağlantılar 404 yerine etkinliklere gitsin.
  redirects: async () => [
    {
      source: '/galeri',
      destination: '/etkinlikler',
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
