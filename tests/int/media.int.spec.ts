import { describe, expect, it } from 'vitest'

import { resolveImage, resolveOgImage, toDisplayURL } from '@/lib/media'
import type { Media } from '@/payload-types'

/**
 * Payload medya URL'lerini mutlak üretir; next/image ise mutlak adresleri
 * "uzak görsel" sayıp remotePatterns'ta arar. Bu testler, kendi sunucumuzdan
 * gelen görsellerin kök-göreli yola çevrildiğini garanti eder.
 */

const media = (overrides: Partial<Media>): Media =>
  ({
    id: 1,
    alt: 'Logo',
    updatedAt: '',
    createdAt: '',
    ...overrides,
  }) as Media

describe('toDisplayURL', () => {
  it('kendi sunucumuzun dosya adresini kök-göreli yapar', () => {
    expect(toDisplayURL('http://localhost:3000/api/media/file/logo.png')).toBe(
      '/api/media/file/logo.png',
    )
    expect(toDisplayURL('https://ornek-firma.com.tr/api/media/file/logo.png')).toBe(
      '/api/media/file/logo.png',
    )
  })

  it('Türkçe karakterli / boşluklu dosya adlarının kodlamasını bozmaz', () => {
    expect(
      toDisplayURL('http://localhost:3000/api/media/file/%C3%87al%C4%B1%C5%9Fma%20Y%C3%BCzeyi.png'),
    ).toBe('/api/media/file/%C3%87al%C4%B1%C5%9Fma%20Y%C3%BCzeyi.png')
  })

  it('zaten göreli olan adrese dokunmaz', () => {
    expect(toDisplayURL('/api/media/file/logo.png')).toBe('/api/media/file/logo.png')
  })

  it('kendi dosya yolumuza uymayan dış adresi mutlak bırakır', () => {
    const external = 'https://cdn.ornek.com/logo.png'

    expect(toDisplayURL(external)).toBe(external)
  })
})

describe('resolveImage', () => {
  it('<Image /> için göreli src döner', () => {
    const resolved = resolveImage(
      media({ url: 'http://localhost:3000/api/media/file/logo.png', width: 200, height: 56 }),
    )

    expect(resolved).toEqual({
      url: '/api/media/file/logo.png',
      alt: 'Logo',
      width: 200,
      height: 56,
    })
  })

  it('görsel yoksa null döner', () => {
    expect(resolveImage(null)).toBeNull()
    expect(resolveImage(5)).toBeNull()
  })
})

describe('resolveOgImage', () => {
  it('paylaşım önizlemesi için adresi mutlak tutar', () => {
    expect(resolveOgImage(media({ url: '/api/media/file/logo.png' }))).toMatch(
      /^https?:\/\/[^/]+\/api\/media\/file\/logo\.png$/,
    )
    expect(resolveOgImage(media({ url: 'http://localhost:3000/api/media/file/logo.png' }))).toBe(
      'http://localhost:3000/api/media/file/logo.png',
    )
  })
})
