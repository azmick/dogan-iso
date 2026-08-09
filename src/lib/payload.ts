import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import type { ContactInfo, Faq, Page, Post, Service, SiteSetting } from '@/payload-types'

/** Payload Local API istemcisi (istek başına tekilleştirilmiş). */
export const getPayloadClient = cache(async () => getPayload({ config }))

/* ------------------------------------------------------------------ */
/* Globals                                                             */
/* ------------------------------------------------------------------ */

export const getSiteSettings = cache(async (): Promise<SiteSetting> => {
  const payload = await getPayloadClient()

  return payload.findGlobal({ slug: 'site-settings', depth: 1 })
})

export const getContactInfo = cache(async (): Promise<ContactInfo> => {
  const payload = await getPayloadClient()

  return payload.findGlobal({ slug: 'contact-info', depth: 0 })
})

/* ------------------------------------------------------------------ */
/* Hizmetler                                                           */
/* ------------------------------------------------------------------ */

export const getServices = cache(async (limit = 100): Promise<Service[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'services',
    limit,
    depth: 1,
    sort: 'order',
  })

  return docs
})

/** Menü ve yan panel için yalnızca başlık + slug. */
export const getServiceLinks = cache(
  async (): Promise<Pick<Service, 'id' | 'title' | 'slug'>[]> => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'services',
      limit: 100,
      depth: 0,
      sort: 'order',
      select: { title: true, slug: true },
    })

    return docs as Pick<Service, 'id' | 'title' | 'slug'>[]
  },
)

export const getServiceBySlug = cache(async (slug: string): Promise<Service | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  return docs[0] ?? null
})

/* ------------------------------------------------------------------ */
/* Blog                                                                */
/* ------------------------------------------------------------------ */

export const getPosts = cache(async (page = 1, limit = 9) => {
  const payload = await getPayloadClient()

  return payload.find({
    collection: 'posts',
    page,
    limit,
    depth: 1,
    sort: '-publishedDate',
  })
})

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  return docs[0] ?? null
})

/* ------------------------------------------------------------------ */
/* Sayfalar (kurumsal / yasal)                                         */
/* ------------------------------------------------------------------ */

export const getPages = cache(async (): Promise<Page[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    limit: 100,
    depth: 0,
    sort: 'menuOrder',
  })

  return docs
})

export const getPageBySlug = cache(async (slug: string): Promise<Page | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  return docs[0] ?? null
})

/** Header'daki "Kurumsal" açılır menüsü. */
export const getCorporateMenuPages = cache(
  async (): Promise<Pick<Page, 'id' | 'title' | 'slug'>[]> => {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'pages',
      where: { showInCorporateMenu: { equals: true } },
      limit: 20,
      depth: 0,
      sort: 'menuOrder',
      select: { title: true, slug: true },
    })

    return docs as Pick<Page, 'id' | 'title' | 'slug'>[]
  },
)

/* ------------------------------------------------------------------ */
/* SSS                                                                 */
/* ------------------------------------------------------------------ */

export const getFaqs = cache(async (): Promise<Faq[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'faq',
    limit: 100,
    depth: 0,
    sort: 'order',
  })

  return docs
})
