import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Görsel / Dosya',
    plural: 'Medya',
  },
  admin: {
    group: 'İçerik',
    useAsTitle: 'alt',
    description: 'Sitede kullanılan tüm görseller ve dosyalar.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alternatif Metin (alt)',
      required: true,
      admin: {
        description:
          'Görselin içeriğini kısaca anlatır. SEO ve erişilebilirlik için zorunludur.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Açıklama (opsiyonel)',
    },
  ],
  upload: {
    // Vercel Blob eklentisi devredeyken dosyalar Blob'a yüklenir.
    mimeTypes: ['image/*', 'application/pdf'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 480, height: 320, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'wide', width: 1600, height: 900, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
  },
}
