import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Hizmet',
    plural: 'Hizmetler',
  },
  admin: {
    group: 'İçerik',
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'updatedAt'],
    description: 'Hizmet detay sayfaları (/hizmetler/...) buradan yönetilir.',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Hizmet Adı',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Kısa Açıklama',
      maxLength: 240,
      admin: {
        description: 'Kartlarda ve arama sonuçlarında görünen 1-2 cümlelik özet.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Kapak Görseli',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'İçerik',
    },
    slugField(),
    {
      name: 'order',
      type: 'number',
      label: 'Sıra',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description: 'Küçük sayı önce gösterilir.',
      },
    },
  ],
}
