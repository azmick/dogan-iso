import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'
import { previewUrl } from '../lib/adminPreview'
import { revalidateWholeSiteAfterChange, revalidateWholeSiteAfterDelete } from '../lib/revalidate'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Hizmet',
    plural: 'Hizmetler',
  },
  admin: {
    group: 'İçerik',
    useAsTitle: 'title',
    defaultColumns: ['title', 'excerpt', 'order', 'updatedAt'],
    listSearchableFields: ['title', 'excerpt', 'slug'],
    description:
      'Sitedeki hizmet sayfaları. Ana sayfadaki "Hizmetlerimiz" kartları ve üst menüdeki hizmet listesi buradan otomatik oluşur.',
    preview: previewUrl('/hizmetler'),
    pagination: { defaultLimit: 25 },
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  // Hizmetler üst menüde ve hizmet detay sayfalarının yan panelinde de listelendiği
  // için bir hizmet değişince sitenin tamamı tazelenmeli.
  hooks: {
    afterChange: [revalidateWholeSiteAfterChange],
    afterDelete: [revalidateWholeSiteAfterDelete],
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Hizmet Adı',
      required: true,
      admin: {
        placeholder: 'Örn: ISO 27001 Bilgi Güvenliği Yönetim Sistemi',
        description: 'Sayfanın en üstünde büyük başlık olarak ve hizmet kartlarında görünür.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Kısa Açıklama',
      maxLength: 240,
      admin: {
        placeholder: 'Bu hizmeti bir iki cümleyle anlatın.',
        description:
          'Ana sayfadaki hizmet kartında ve Google sonuçlarında görünen özet. En fazla 240 karakter.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Kapak Görseli',
      admin: {
        description:
          'Hizmet kartında ve sayfanın üst bölümünde kullanılır. Önerilen ölçü: 1600 x 900 piksel (yatay).',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Sayfa İçeriği',
      admin: {
        description:
          'Hizmetin detaylı anlatımı. Ara başlık, madde listesi ve bağlantı ekleyebilirsiniz.',
      },
    },
    slugField(),
    {
      name: 'order',
      type: 'number',
      label: 'Sıra Numarası',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description:
          'Hizmetlerin listelenme sırası. Küçük sayı önce gösterilir (1 en üstte). Emin değilseniz 100 bırakın.',
      },
    },
  ],
}
