'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Giriş ekranındaki şifre alanına "göster / gizle" göz butonu ekler.
 *
 * Payload'ın giriş formu şifre alanına dışarıdan buton eklemeye izin vermiyor;
 * bu yüzden bileşen `afterLogin` ile formun altına yerleşir, şifre kutusunu
 * bulur ve butonu portal ile kutunun içine taşır.
 *
 * React, alan her güncellendiğinde (her tuş vuruşunda) `input.type`'ı yeniden
 * "password" yapar. Bunu önlemek için yalnızca bu kutuda `type` yazımını
 * araya giriyoruz: şifre görünürken gelen "password" değeri "text" olarak uygulanır.
 */

type Target = { input: HTMLInputElement; slot: HTMLElement }

export const PasswordToggle = () => {
  const [target, setTarget] = useState<Target | null>(null)
  const [visible, setVisible] = useState(false)
  const visibleRef = useRef(false)

  useEffect(() => {
    const input = document.querySelector<HTMLInputElement>('.login__form input[name="password"]')
    const wrap = input?.parentElement
    if (!input || !wrap) return

    const nativeType = getNativeType()
    Object.defineProperty(input, 'type', {
      configurable: true,
      get: () => nativeType.get!.call(input),
      set: (value: string) =>
        nativeType.set!.call(input, visibleRef.current && value === 'password' ? 'text' : value),
    })

    const slot = document.createElement('span')
    slot.className = 'dg-password-toggle__slot'
    wrap.classList.add('dg-password-toggle')
    wrap.appendChild(slot)

    // Gönderirken şifreyi tekrar gizle — tarayıcının şifre yöneticisi
    // alanı ancak "password" türündeyse kaydetmeyi önerir.
    const form = input.form
    const hideOnSubmit = () => setVisible(false)
    form?.addEventListener('submit', hideOnSubmit)

    setTarget({ input, slot })

    return () => {
      form?.removeEventListener('submit', hideOnSubmit)
      slot.remove()
      wrap.classList.remove('dg-password-toggle')
      delete (input as { type?: string }).type
      input.type = 'password'
    }
  }, [])

  useEffect(() => {
    if (!target) return
    const { input } = target
    // Tarayıcı tür değişince imleci başa alıyor; yazmaya kalınan yerden devam edilsin.
    const { selectionStart, selectionEnd, selectionDirection } = input

    visibleRef.current = visible
    getNativeType().set!.call(input, visible ? 'text' : 'password')

    if (selectionStart === null || selectionEnd === null) return

    const restoreCaret = () => {
      if (document.activeElement !== input) return
      input.setSelectionRange(selectionStart, selectionEnd, selectionDirection ?? undefined)
    }

    restoreCaret()
    // Fareyle tıklandığında Chromium, tıklamayı işledikten sonra imleci bir kez
    // daha başa alıyor; bir sonraki karede tekrar yerine koyuyoruz.
    const frame = requestAnimationFrame(restoreCaret)
    return () => cancelAnimationFrame(frame)
  }, [target, visible])

  if (!target) return null

  const label = visible ? 'Şifreyi gizle' : 'Şifreyi göster'

  return createPortal(
    <button
      type="button"
      className="dg-password-toggle__button"
      aria-label={label}
      aria-controls={target.input.id}
      aria-pressed={visible}
      title={label}
      // Tıklayınca odak şifre kutusunda kalsın; kullanıcı yazmaya devam edebilsin.
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => setVisible((current) => !current)}
    >
      {visible ? <EyeOffIcon /> : <EyeIcon />}
    </button>,
    target.slot,
  )
}

/** Tarayıcının kendi `type` yazıcısı — örneğe tanımladığımız özelliği atlamak için. */
const getNativeType = () => Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'type')!

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
  </svg>
)

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-2.6 3.6M6.6 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default PasswordToggle
