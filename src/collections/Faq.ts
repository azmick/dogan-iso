import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Faq: CollectionConfig = {
  slug: 'faq',
  labels: {
    singular: 'Soru',
    plural: 'Sıkça Sorulan Sorular',
  },
  admin: {
    group: 'İçerik',
    useAsTitle: 'question',
    defaultColumns: ['question', 'order'],
    description: '/sss sayfasındaki soru-cevap listesi.',
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
      name: 'question',
      type: 'text',
      label: 'Soru',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      label: 'Cevap',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sıra',
      defaultValue: 100,
      admin: { position: 'sidebar' },
    },
  ],
}
