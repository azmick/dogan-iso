import type { MetadataRoute } from 'next'

import { getPages, getPosts, getServiceLinks } from '@/lib/payload'
import { absoluteUrl } from '@/lib/seo'
import { ROUTES } from '@/lib/site'

export const revalidate = 3600

/** Tüm statik ve dinamik URL'leri içeren site haritası. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, { docs: posts }, pages] = await Promise.all([
    getServiceLinks(),
    getPosts(1, 1000),
    getPages(),
  ])

  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl(ROUTES.home), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl(ROUTES.about), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl(ROUTES.services), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl(ROUTES.blog), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl(ROUTES.faq), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: absoluteUrl(ROUTES.contact), lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
  ]

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`${ROUTES.services}/${service.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`${ROUTES.blog}/${post.slug}`),
    lastModified: new Date(post.updatedAt || post.publishedDate),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: absoluteUrl(`/${page.slug}`),
    lastModified: new Date(page.updatedAt),
    changeFrequency: 'yearly',
    priority: 0.4,
  }))

  return [...staticEntries, ...serviceEntries, ...postEntries, ...pageEntries]
}
