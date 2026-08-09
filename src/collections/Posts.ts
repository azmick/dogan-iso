import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'
import { previewUrl } from '../lib/adminPreview'
import { revalidateCollectionHooks } from '../lib/revalidate'

export const Posts: CollectionConfig = {
  // Koleksiyonun teknik adı 'posts' kalıyor; sitede ve panelde "Blog" olarak geçer.
  slug: 'posts',
  labels: {
    singular: 'Blog Yazısı',
    plural: 'Blog',
  },
  admin: {
    group: 'İçerik',
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedDate', 'updatedAt'],
    listSearchableFields: ['title', 'excerpt', 'slug'],
    description:
      'Blog yazıları ve duyurular. Sitedeki "Blog" sayfasında en yeniden eskiye doğru listelenir.',
    preview: previewUrl('/blog'),
    pagination: { defaultLimit: 25 },
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  // Blog yazıları yalnızca kendi liste ve detay sayfalarında görünüyor.
  hooks: revalidateCollectionHooks('/blog'),
  defaultSort: '-publishedDate',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Başlık',
      required: true,
      admin: {
        placeholder: 'Örn: ISO 27001 denetimlerinde 2025 güncellemeleri',
        description: 'Yazının ana başlığı. Kısa ve açıklayıcı olması okunma oranını artırır.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Özet',
      maxLength: 300,
      admin: {
        placeholder: 'Yazının ne anlattığını iki üç cümleyle özetleyin.',
        description:
          'Blog kartlarında ve Google sonuçlarında görünen kısa metin. En fazla 300 karakter.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Kapak Görseli',
      admin: {
        description:
          'Blog kartında ve sosyal medya paylaşımlarında kullanılır. Önerilen ölçü: 1600 x 900 piksel (yatay).',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Yazı Metni',
      admin: {
        description: 'Yazının tam metni. Ara başlık, liste, bağlantı ve görsel ekleyebilirsiniz.',
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
        description: 'Yazının sitede görünen tarihi. Listeleme sırası bu tarihe göre yapılır.',
      },
    },
  ],
}
