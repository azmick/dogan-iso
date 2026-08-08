import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { slugField } from '../fields/slug'
import { previewUrl } from '../lib/adminPreview'
import { revalidateWholeSiteAfterChange, revalidateWholeSiteAfterDelete } from '../lib/revalidate'

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
    listSearchableFields: ['title', 'slug'],
    description:
      'Kurumsal ve yasal metin sayfaları: KVKK Aydınlatma Metni, Çerez Politikası, Başvuru Formu vb. Adresleri "site.com/sayfa-adi" biçimindedir.',
    preview: previewUrl(''),
    pagination: { defaultLimit: 25 },
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  // Kurumsal sayfalar üst menüde ve footer'da da listelendiği için
  // bir sayfa değişince sitenin tamamı tazelenmeli.
  hooks: {
    afterChange: [revalidateWholeSiteAfterChange],
    afterDelete: [revalidateWholeSiteAfterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Sayfa Başlığı',
      required: true,
      admin: {
        placeholder: 'Örn: KVKK Aydınlatma Metni',
        description: 'Sayfanın en üstünde görünen başlık ve menüdeki adı.',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Kısa Açıklama',
      maxLength: 300,
      admin: {
        placeholder: 'Sayfanın konusunu bir iki cümleyle özetleyin.',
        description:
          'Google arama sonuçlarında başlığın altında görünen açıklama. Boş bırakılırsa site geneli açıklama kullanılır.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Sayfa Metni',
      admin: {
        description:
          'Sayfanın tam metni. Word veya benzeri bir programdan yapıştırdığınız metinler biçimlendirmesiyle birlikte gelir.',
      },
    },
    slugField(),
    {
      name: 'showInCorporateMenu',
      type: 'checkbox',
      label: 'Kurumsal menüsünde göster',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description:
          'İşaretliyse sayfa, üst menüdeki "Kurumsal" açılır listesinde görünür. Yalnızca adresi bilenlerin görmesini istiyorsanız işareti kaldırın.',
      },
    },
    {
      name: 'menuOrder',
      type: 'number',
      label: 'Menüdeki Sırası',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description: 'Küçük sayı menüde daha üstte görünür.',
        condition: (data) => Boolean(data?.showInCorporateMenu),
      },
    },
  ],
}
