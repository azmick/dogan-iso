import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Sayfa',
    plural: 'Sayfalar',
  },
  admin: {
    group: 'İçerik',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'showInCorporateMenu', 'updatedAt'],
    description:
      'Kurumsal / yasal içerik sayfaları (KVKK Aydınlatma Metni, Çerez Politikası vb.). Adres: /sayfa-url-adi',
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Sayfa Başlığı',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Kısa Açıklama',
      maxLength: 300,
      admin: {
        description: 'Arama motorlarına verilecek varsayılan açıklama.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'İçerik',
    },
    slugField(),
    {
      name: 'showInCorporateMenu',
      type: 'checkbox',
      label: 'Kurumsal menüsünde göster',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Üst menüdeki "Kurumsal" açılır listesinde görünsün mü?',
      },
    },
    {
      name: 'menuOrder',
      type: 'number',
      label: 'Menü Sırası',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        condition: (data) => Boolean(data?.showInCorporateMenu),
      },
    },
  ],
}
