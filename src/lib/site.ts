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
  blog: '/blog',
  contact: '/iletisim',
  faq: '/sss',
} as const

export const STATIC_PAGE_TITLES: Record<string, string> = {
  [ROUTES.home]: 'Ana Sayfa',
  [ROUTES.about]: 'Hakkımızda',
  [ROUTES.services]: 'Hizmetlerimiz',
  [ROUTES.blog]: 'Blog',
  [ROUTES.contact]: 'İletişim',
  [ROUTES.faq]: 'Sıkça Sorulan Sorular',
}
