export type NavChild = {
  label: string
  href: string
}

export type NavItem = {
  label: string
  href: string
  children?: NavChild[]
}

/** Statik sayfa yolları — sitemap ve breadcrumb'lar için tek kaynak. */
export const ROUTES = {
  home: '/',
  about: '/hakkimizda',
  services: '/hizmetler',
  projects: '/etkinlikler',
  gallery: '/galeri',
  posts: '/haberler',
  contact: '/iletisim',
  faq: '/sss',
} as const

export const STATIC_PAGE_TITLES: Record<string, string> = {
  [ROUTES.home]: 'Ana Sayfa',
  [ROUTES.about]: 'Hakkımızda',
  [ROUTES.services]: 'Hizmetlerimiz',
  [ROUTES.projects]: 'Etkinliklerimiz',
  [ROUTES.gallery]: 'Medya',
  [ROUTES.posts]: 'Haberler',
  [ROUTES.contact]: 'İletişim',
  [ROUTES.faq]: 'Sıkça Sorulan Sorular',
}
