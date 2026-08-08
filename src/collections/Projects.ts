import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'
import { previewUrl } from '../lib/adminPreview'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Etkinlik / Proje',
    plural: 'Etkinlikler',
  },
  admin: {
    group: 'İçerik',
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'updatedAt'],
    listSearchableFields: ['title', 'excerpt', 'slug'],
    description:
      'Fuar, eğitim, seminer ve proje kayıtları. Her kayıt kendi detay sayfasında fotoğraflarıyla yayınlanır.',
    preview: previewUrl('/etkinlikler'),
    pagination: { defaultLimit: 25 },
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  defaultSort: '-date',
  fields: [
    {
      // Fotoğraf galerisi ayrı sekmede dursun ki içerik formu kalabalıklaşmasın.
      // (İsimsiz sekmeler yalnızca görseldir; veritabanı yapısını değiştirmez.)
      type: 'tabs',
      tabs: [
        {
          label: 'Etkinlik Bilgileri',
          admin: { description: 'Etkinliğin adı, tanıtım metni ve kapak görseli.' },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Başlık',
              required: true,
              admin: {
                placeholder: 'Örn: Bilgi Güvenliği Farkındalık Semineri',
                description: 'Etkinliğin adı. Kartlarda ve sayfa başlığında görünür.',
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              label: 'Kısa Açıklama',
              maxLength: 300,
              admin: {
                placeholder: 'Etkinliği birkaç cümleyle tanıtın.',
                description: 'Etkinlik kartlarında görünen özet. En fazla 300 karakter.',
              },
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Kapak Görseli',
              admin: {
                description:
                  'Etkinlik kartında kullanılan ana görsel. Önerilen ölçü: 1600 x 900 piksel (yatay).',
              },
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Etkinlik Metni',
              admin: {
                description: 'Etkinliğin detaylı anlatımı, katılımcılar, program vb.',
              },
            },
          ],
        },
        {
          label: 'Fotoğraf Galerisi',
          admin: {
            description:
              'Bu etkinliğe ait fotoğraflar. Etkinliğin detay sayfasında, metnin altındaki galeri bölümünde listelenir.',
          },
          fields: [
            {
              name: 'gallery',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              label: 'Galeri Görselleri',
              admin: {
                description:
                  'Birden fazla fotoğraf seçebilirsiniz. Sürükleyerek sıralarını değiştirebilirsiniz.',
              },
            },
          ],
        },
      ],
    },
    slugField(),
    {
      name: 'date',
      type: 'date',
      label: 'Etkinlik Tarihi',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'dd.MM.yyyy' },
        description: 'Etkinliğin gerçekleştiği tarih. Listeleme sırası bu tarihe göre yapılır.',
      },
    },
  ],
}
