import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'
import { previewUrl } from '../lib/adminPreview'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Haber',
    plural: 'Haberler',
  },
  admin: {
    group: 'İçerik',
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedDate', 'updatedAt'],
    listSearchableFields: ['title', 'excerpt', 'slug'],
    description:
      'Haber, duyuru ve blog yazıları. Sitedeki "Haberler" sayfasında en yeniden eskiye doğru listelenir.',
    preview: previewUrl('/haberler'),
    pagination: { defaultLimit: 25 },
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: '-publishedDate',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Başlık',
      required: true,
      admin: {
        placeholder: 'Örn: ISO 27001 denetimlerinde 2025 güncellemeleri',
        description: 'Haberin ana başlığı. Kısa ve açıklayıcı olması okunma oranını artırır.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Özet',
      maxLength: 300,
      admin: {
        placeholder: 'Haberin ne anlattığını iki üç cümleyle özetleyin.',
        description:
          'Haber kartlarında ve Google sonuçlarında görünen kısa metin. En fazla 300 karakter.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Kapak Görseli',
      admin: {
        description:
          'Haber kartında ve sosyal medya paylaşımlarında kullanılır. Önerilen ölçü: 1600 x 900 piksel (yatay).',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Haber Metni',
      admin: {
        description: 'Haberin tam metni. Ara başlık, liste, bağlantı ve görsel ekleyebilirsiniz.',
      },
    },
    slugField(),
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Yayın Tarihi',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
        description: 'Haberin sitede görünen tarihi. Listeleme sırası bu tarihe göre yapılır.',
      },
    },
  ],
}
