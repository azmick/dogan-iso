import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { revalidateCollectionHooks } from '../lib/revalidate'

export const Faq: CollectionConfig = {
  slug: 'faq',
  labels: {
    singular: 'Soru',
    plural: 'Sıkça Sorulan Sorular',
  },
  admin: {
    group: 'İçerik',
    useAsTitle: 'question',
    defaultColumns: ['question', 'order', 'updatedAt'],
    listSearchableFields: ['question'],
    description:
      'Sitedeki /sss sayfasında açılır-kapanır liste olarak gösterilen soru-cevaplar. Her kayıt bir soru demektir.',
    pagination: { defaultLimit: 50 },
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  // Sorular yalnızca /sss sayfasında listeleniyor.
  hooks: revalidateCollectionHooks('/sss'),
  defaultSort: 'order',
  fields: [
    {
      name: 'question',
      type: 'text',
      label: 'Soru',
      required: true,
      admin: {
        placeholder: 'Örn: ISO 9001 belgesi kaç yıl geçerlidir?',
        description: 'Ziyaretçinin tıklayacağı soru başlığı.',
      },
    },
    {
      name: 'answer',
      type: 'richText',
      label: 'Cevap',
      required: true,
      admin: {
        description: 'Soruya verilen cevap. Kısa ve net tutmanız önerilir.',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Sıra Numarası',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description: 'Soruların listelenme sırası. Küçük sayı önce gösterilir.',
      },
    },
  ],
}
