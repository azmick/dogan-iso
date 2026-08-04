import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Ayarları',
  admin: {
    group: 'Ayarlar',
    description: 'Site adı, logo ve varsayılan SEO bilgileri.',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Site / Firma Adı',
      required: true,
      defaultValue: 'Örnek ISO Belgelendirme',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Slogan',
      defaultValue: 'Bağımsız Belgelendirme ve Denetim Hizmetleri',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo (açık zemin için)',
      admin: { description: 'Header için. Yüklenmezse yazı logo gösterilir.' },
    },
    {
      name: 'logoInverted',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo (koyu zemin için)',
      admin: { description: 'Footer için ters/beyaz versiyon.' },
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon',
    },
    {
      type: 'collapsible',
      label: 'Varsayılan SEO',
      fields: [
        {
          name: 'defaultSeo',
          type: 'group',
          label: false,
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Varsayılan Sayfa Başlığı',
              defaultValue: 'Örnek ISO Belgelendirme',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Varsayılan Açıklama',
              maxLength: 300,
              defaultValue:
                'ISO 27001, ISO 9001, ISO 14001 ve ISO 45001 başta olmak üzere yönetim sistemi belgelendirme, denetim ve KVKK uyum hizmetleri.',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Paylaşım Görseli (OpenGraph)',
              admin: { description: 'Önerilen ölçü: 1200 x 630 piksel.' },
            },
          ],
        },
      ],
    },
    {
      name: 'legalName',
      type: 'text',
      label: 'Resmî Unvan (schema.org için)',
      defaultValue: 'Örnek ISO Belgelendirme ve Denetim Hizmetleri A.Ş.',
    },
  ],
}
