'use client'

import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

import { CloseIcon } from '@/components/Icons'

type ModalProps = {
  open: boolean
  /** Pencere hangi yoldan kapanırsa kapansın (Esc, X, arka plan) çağrılır. */
  onClose: () => void
  title: string
  /** Başlığın solundaki küçük ikon. */
  icon?: ReactNode
  children: ReactNode
  /** Alt şeritteki aksiyonlar (butonlar). */
  footer?: ReactNode
}

/** Pencere açıkken arkadaki sayfa kaymasın; kaybolan kaydırma çubuğunun yeri doldurulur. */
const lockPageScroll = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

  document.body.style.overflow = 'hidden'
  if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`
}

const unlockPageScroll = () => {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

/**
 * Tarayıcının yerleşik <dialog> öğesiyle açılır pencere.
 * Odak pencerede tutulur, Esc ile kapanır, arkadaki sayfa etkisizleşir — bunlar
 * tarayıcıdan gelir. Ayrıca arka plana tıklayınca kapanır.
 */
export const Modal = ({ open, onClose, title, icon, children, footer }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const pressedOnBackdrop = useRef(false)
  const titleId = useId()

  // İçerik ilk açılışta oluşturulur; kapalı pencere sayfanın ilk HTML'ini şişirmesin.
  const [hasOpened, setHasOpened] = useState(open)
  if (open && !hasOpened) setHasOpened(true)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
      lockPageScroll()

      // Her açılışta metnin başından başla; klavyeyle gezenler ok tuşlarıyla hemen kaydırabilsin.
      bodyRef.current?.scrollTo({ top: 0 })
      bodyRef.current?.focus({ preventScroll: true })
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  // Pencere açıkken bileşen kaldırılırsa sayfa kilitli kalmasın.
  useEffect(() => unlockPageScroll, [])

  const close = () => dialogRef.current?.close()

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={() => {
        unlockPageScroll()
        onClose()
      }}
      // Yalnızca arka planda başlayıp biten tıklama kapatır; metin seçerken
      // fare pencere dışına taşarsa pencere kapanmasın.
      onPointerDown={(event) => {
        pressedOnBackdrop.current = event.target === event.currentTarget
      }}
      onClick={(event) => {
        if (pressedOnBackdrop.current && event.target === event.currentTarget) close()
        pressedOnBackdrop.current = false
      }}
      className="modal m-auto max-h-[min(88dvh,48rem)] w-[calc(100%-2rem)] max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-bg text-text shadow-[0_24px_64px_rgb(10_31_60/0.28)] open:flex"
    >
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-7 sm:py-5">
        <div className="flex items-center gap-3">
          {icon ? (
            <span
              aria-hidden
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary"
            >
              {icon}
            </span>
          ) : null}
          <h2 id={titleId} className="text-lg sm:text-xl">
            {title}
          </h2>
        </div>

        <button
          type="button"
          onClick={close}
          aria-label="Kapat"
          className="-mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-bg-soft hover:text-primary"
        >
          <CloseIcon />
        </button>
      </div>

      <div
        ref={bodyRef}
        tabIndex={0}
        role="region"
        aria-labelledby={titleId}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 focus-visible:outline-offset-[-3px] sm:px-7 sm:py-6"
      >
        {hasOpened ? children : null}
      </div>

      {footer ? (
        <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-border bg-bg-soft px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-7">
          {footer}
        </div>
      ) : null}
    </dialog>
  )
}
