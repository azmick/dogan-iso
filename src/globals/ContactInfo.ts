import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  label: 'İletişim Bilgileri',
  admin: {
    group: 'Ayarlar',
    description:
      'Header, footer ve iletişim sayfası bu bilgilerden beslenir. Şu an temsili (placeholder) değerler girilidir.',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'İletişim',
          fields: [
            {
              name: 'addressLine',
              type: 'textarea',
              label: 'Adres',
              defaultValue: 'Örnek Mah. Örnek Cad. No: 1 Kat: 2, Çankaya / Ankara',
            },
            {
              name: 'addressLocality',
              type: 'text',
              label: 'İlçe / Şehir',
              defaultValue: 'Çankaya, Ankara',
            },
            {
              name: 'postalCode',
              type: 'text',
              label: 'Posta Kodu',
              defaultValue: '06000',
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Telefon',
              defaultValue: '+90 (000) 000 00 00',
            },
            {
              name: 'whatsapp',
              type: 'text',
              label: 'WhatsApp Numarası',
              defaultValue: '+900000000000',
              admin: {
                description: 'Uluslararası formatta, boşluksuz. Örn: +905551112233',
              },
            },
            {
              name: 'email',
              type: 'text',
              label: 'E-posta',
              defaultValue: 'bilgi@ornek-firma.com.tr',
            },
            {
              name: 'workingHours',
              type: 'text',
              label: 'Çalışma Saatleri',
              defaultValue: 'Pazartesi - Cuma, 09:00 - 18:00',
            },
          ],
        },
        {
          label: 'Harita',
          fields: [
            {
              name: 'mapEmbedUrl',
              type: 'text',
              label: 'Google Harita Gömme Adresi (iframe src)',
              defaultValue:
                'https://www.google.com/maps?q=39.9208,32.8541&hl=tr&z=14&output=embed',
              admin: {
                description:
                  'Google Haritalar > Paylaş > Haritayı yerleştir bölümündeki iframe içindeki src adresi. Şu an temsili bir konum girilidir.',
              },
            },
            {
              name: 'latitude',
              type: 'number',
              label: 'Enlem (latitude)',
              defaultValue: 39.9208,
            },
            {
              name: 'longitude',
              type: 'number',
              label: 'Boylam (longitude)',
              defaultValue: 32.8541,
            },
          ],
        },
        {
          label: 'Sosyal Medya',
          fields: [
            {
              name: 'social',
              type: 'group',
              label: false,
              fields: [
                { name: 'facebook', type: 'text', label: 'Facebook' },
                { name: 'x', type: 'text', label: 'X (Twitter)' },
                { name: 'linkedin', type: 'text', label: 'LinkedIn' },
                { name: 'instagram', type: 'text', label: 'Instagram' },
                { name: 'youtube', type: 'text', label: 'YouTube' },
              ],
            },
          ],
        },
        {
          label: 'Faydalı Linkler',
          fields: [
            {
              name: 'usefulLinks',
              type: 'array',
              label: 'Footer Faydalı Linkler',
              labels: { singular: 'Link', plural: 'Linkler' },
              fields: [
                { name: 'label', type: 'text', label: 'Başlık', required: true },
                { name: 'url', type: 'text', label: 'Adres (URL)', required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
}
