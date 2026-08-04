'use client'

import Link from 'next/link'
import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'cerez-onayi'

/** Sunucuda ve hydration sırasında banner gizli kalsın diye kullanılan sentinel. */
const HIDDEN = 'gizli'

const listeners = new Set<() => void>()

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  window.addEventListener('storage', listener)

  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', listener)
  }
}

const getSnapshot = (): string => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? ''
  } catch {
    // Depolama kapalıysa banner gösterilmez
    return HIDDEN
  }
}

const getServerSnapshot = (): string => HIDDEN

const setConsent = (value: 'kabul' | 'red') => {
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // yoksay
  }
  listeners.forEach((listener) => listener())
}

/** KVKK / çerez onay bandı. Tercih tarayıcıda (localStorage) saklanır. */
export const CookieBanner = () => {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  if (consent !== '') return null

  return (
    <div
      role="region"
      aria-label="Çerez bilgilendirmesi"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-bg shadow-[0_-4px_24px_rgb(12_60_120/0.12)]"
    >
      <div className="container-site flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <p className="text-sm leading-relaxed text-text-muted">
          Sitemizde deneyiminizi iyileştirmek için zorunlu ve isteğe bağlı çerezler kullanıyoruz.
          Detaylar için{' '}
          <Link
            href="/cerez-politikasi"
            className="font-semibold text-link underline underline-offset-2"
          >
            Çerez Politikası
          </Link>{' '}
          ve{' '}
          <Link
            href="/kvkk-aydinlatma-metni"
            className="font-semibold text-link underline underline-offset-2"
          >
            KVKK Aydınlatma Metni
          </Link>{' '}
          sayfalarımızı inceleyebilirsiniz.
        </p>

        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={() => setConsent('red')} className="btn btn-outline">
            Reddet
          </button>
          <button type="button" onClick={() => setConsent('kabul')} className="btn btn-primary">
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  )
}
