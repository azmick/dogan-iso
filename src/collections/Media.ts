import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { revalidateWholeSiteAfterChange, revalidateWholeSiteAfterDelete } from '../lib/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Görsel / Dosya',
    plural: 'Medya Kütüphanesi',
  },
  admin: {
    group: 'İçerik',
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    listSearchableFields: ['alt', 'filename', 'caption'],
    description:
      'Sitede kullanılan tüm fotoğraf ve belgeler. Bir görseli buraya bir kez yükleyip birden fazla sayfada kullanabilirsiniz.',
    pagination: { defaultLimit: 24 },
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  // Bir görsel (logo, kapak, galeri) sitenin herhangi bir yerinde kullanılmış
  // olabilir; hangisi olduğunu bilemediğimiz için tamamını tazeliyoruz.
  hooks: {
    afterChange: [revalidateWholeSiteAfterChange],
    afterDelete: [revalidateWholeSiteAfterDelete],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alternatif Metin',
      required: true,
      admin: {
        placeholder: 'Örn: Denetim toplantısında masada oturan üç kişi',
        description:
          'Görselde ne olduğunu kısaca yazın. Görme engelli ziyaretçilere okunur ve Google için önemlidir — bu yüzden zorunludur.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Alt Yazı (isteğe bağlı)',
      admin: {
        description:
          'Etkinlik galerilerinde görselin altında gösterilecek açıklama. Boş bırakabilirsiniz.',
      },
    },
  ],
  upload: {
    // Vercel Blob eklentisi devredeyken dosyalar Blob'a yüklenir.
    mimeTypes: ['image/*', 'application/pdf'],
    focalPoint: true,
    displayPreview: true,
    imageSizes: [
      { name: 'thumbnail', width: 480, height: 320, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'wide', width: 1600, height: 900, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
  },
}
