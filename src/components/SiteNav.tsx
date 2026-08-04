'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useState } from 'react'

import { ChevronDownIcon, CloseIcon, MenuIcon } from '@/components/Icons'
import type { NavItem } from '@/lib/site'

type SiteNavProps = {
  items: NavItem[]
  ctaHref: string
  ctaLabel: string
}

const isActive = (pathname: string, href: string): boolean =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

type MenuState = {
  /** Menünün açıldığı sayfa — adres değişince menü kendiliğinden kapanır. */
  path: string
  open: boolean
  accordion: string | null
}

const CLOSED: Omit<MenuState, 'path'> = { open: false, accordion: null }

export const SiteNav = ({ items, ctaHref, ctaLabel }: SiteNavProps) => {
  const pathname = usePathname()
  const [menu, setMenu] = useState<MenuState>({ path: pathname, ...CLOSED })
  const panelId = useId()

  // Sayfa değiştiyse menü durumunu efekt kullanmadan sıfırla
  const current = menu.path === pathname ? menu : { path: pathname, ...CLOSED }
  const mobileOpen = current.open
  const openAccordion = current.accordion

  const setMobileOpen = (open: boolean) =>
    setMenu({ path: pathname, open, accordion: open ? current.accordion : null })

  const setOpenAccordion = (accordion: string | null) =>
    setMenu({ path: pathname, open: current.open, accordion })

  // Menü açıkken arka planın kaymasını engelle
  useEffect(() => {
    if (!mobileOpen) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenu((state) => ({ path: state.path, ...CLOSED }))
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileOpen])

  return (
    <>
      {/* ---------- Masaüstü menü ---------- */}
      <nav aria-label="Ana menü" className="hidden lg:block">
        <ul className="flex items-center gap-1">
          {items.map((item) => {
            const active = isActive(pathname, item.href)

            if (!item.children?.length) {
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`inline-flex h-11 items-center rounded-md px-3 text-[15px] font-semibold transition-colors ${
                      active
                        ? 'text-accent-dark'
                        : 'text-primary hover:bg-primary-soft hover:text-primary-dark'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            }

            return (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  aria-haspopup="true"
                  className={`inline-flex h-11 items-center gap-1 rounded-md px-3 text-[15px] font-semibold transition-colors ${
                    active
                      ? 'text-accent-dark'
                      : 'text-primary hover:bg-primary-soft hover:text-primary-dark'
                  }`}
                >
                  {item.label}
                  <ChevronDownIcon className="transition-transform group-hover:rotate-180" />
                </Link>

                <ul className="invisible absolute left-0 top-full z-50 w-72 translate-y-1 rounded-md border border-border bg-bg py-2 opacity-0 shadow-[var(--shadow-card-hover)] transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block border-l-2 border-transparent px-4 py-2.5 text-sm leading-snug text-text transition-colors hover:border-accent hover:bg-bg-soft hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
      </nav>

      <Link href={ctaHref} className="btn btn-accent hidden lg:inline-flex">
        {ctaLabel}
      </Link>

      {/* ---------- Mobil menü düğmesi ---------- */}
      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-expanded={mobileOpen}
        aria-controls={panelId}
        aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-primary transition-colors hover:bg-primary-soft lg:hidden"
      >
        {mobileOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* ---------- Mobil menü paneli ---------- */}
      {mobileOpen && (
        <div
          id={panelId}
          className="absolute left-0 right-0 top-full max-h-[calc(100dvh-var(--header-height,4rem))] overflow-y-auto border-t border-border bg-bg shadow-lg lg:hidden"
        >
          <nav aria-label="Mobil menü" className="container-site py-4">
            <ul className="flex flex-col divide-y divide-border">
              {items.map((item) => {
                const active = isActive(pathname, item.href)
                const expanded = openAccordion === item.href

                return (
                  <li key={item.href} className="py-1">
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className={`flex min-h-11 flex-1 items-center text-[15px] font-semibold ${
                          active ? 'text-accent-dark' : 'text-primary'
                        }`}
                      >
                        {item.label}
                      </Link>

                      {item.children?.length ? (
                        <button
                          type="button"
                          onClick={() => setOpenAccordion(expanded ? null : item.href)}
                          aria-expanded={expanded}
                          aria-label={`${item.label} alt menüsünü ${expanded ? 'kapat' : 'aç'}`}
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-primary hover:bg-primary-soft"
                        >
                          <ChevronDownIcon
                            className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
                          />
                        </button>
                      ) : null}
                    </div>

                    {item.children?.length && expanded ? (
                      <ul className="mb-2 ml-1 border-l-2 border-bg-muted pl-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="flex min-h-11 items-center text-sm leading-snug text-text-muted hover:text-primary"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                )
              })}
            </ul>

            <Link href={ctaHref} className="btn btn-accent mt-4 w-full">
              {ctaLabel}
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
