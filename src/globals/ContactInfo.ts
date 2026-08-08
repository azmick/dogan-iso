import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { revalidateWholeSiteAfterGlobalChange } from '../lib/revalidate'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  label: 'İletişim Bilgileri',
  admin: {
    group: 'Ayarlar',
    description:
      'Üst bar, footer ve İletişim sayfası tek bir yerden — buradan — beslenir. Bir bilgiyi burada değiştirdiğinizde sitenin her yerinde güncellenir. Şu an temsili (örnek) değerler girilidir.',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  // Üst bar, footer ve iletişim sayfası buradan besleniyor.
  hooks: {
    afterChange: [revalidateWholeSiteAfterGlobalChange],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'İletişim',
          admin: {
            description: 'Sitenin üst barında, footer’da ve İletişim sayfasında görünen bilgiler.',
          },
          fields: [
            {
              name: 'addressLine',
              type: 'textarea',
              label: 'Açık Adres',
              defaultValue: 'Örnek Mah. Örnek Cad. No: 1 Kat: 2, Çankaya / Ankara',
              admin: {
                placeholder: 'Mahalle, cadde, no, kat, ilçe / il',
                description: 'Footer ve İletişim sayfasında olduğu gibi gösterilir.',
              },
            },
            {
              name: 'addressLocality',
              type: 'text',
              label: 'İlçe / Şehir',
              defaultValue: 'Çankaya, Ankara',
              admin: {
                placeholder: 'Örn: Çankaya, Ankara',
                description:
                  'Google’a "bu firma nerede" bilgisini vermek için ayrıca istenir. Sayfada tek başına görünmez.',
              },
            },
            {
              name: 'postalCode',
              type: 'text',
              label: 'Posta Kodu',
              defaultValue: '06000',
              admin: { placeholder: 'Örn: 06510' },
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Telefon',
              defaultValue: '+90 (000) 000 00 00',
              admin: {
                placeholder: '+90 (312) 000 00 00',
                description: 'Ziyaretçiye gösterilen numara. Mobilde tıklanınca arama başlatır.',
              },
            },
            {
              name: 'whatsapp',
              type: 'text',
              label: 'WhatsApp Numarası',
              defaultValue: '+900000000000',
              admin: {
                placeholder: '+905551112233',
                description:
                  'Uluslararası formatta, boşluk ve parantez olmadan yazın. Örn: +905551112233',
              },
            },
            {
              name: 'email',
              type: 'text',
              label: 'E-posta',
              defaultValue: 'bilgi@ornek-firma.com.tr',
              admin: {
                placeholder: 'bilgi@firmaniz.com.tr',
                description: 'İletişim formundan gelen mesajların bildirileceği adres de budur.',
              },
            },
            {
              name: 'workingHours',
              type: 'text',
              label: 'Çalışma Saatleri',
              defaultValue: 'Pazartesi - Cuma, 09:00 - 18:00',
              admin: { placeholder: 'Pazartesi - Cuma, 09:00 - 18:00' },
            },
          ],
        },
        {
          label: 'Harita',
          admin: { description: 'İletişim sayfasındaki gömülü Google haritası.' },
          fields: [
            {
              name: 'mapEmbedUrl',
              type: 'text',
              label: 'Google Harita Adresi',
              defaultValue: 'https://www.google.com/maps?q=39.9208,32.8541&hl=tr&z=14&output=embed',
              admin: {
                description:
                  'Google Haritalar’da konumunuzu açın → Paylaş → "Haritayı yerleştir" → çıkan kodun içindeki src="..." adresini buraya yapıştırın. Şu an temsili bir konum girilidir.',
              },
            },
            {
              name: 'latitude',
              type: 'number',
              label: 'Enlem (latitude)',
              defaultValue: 39.9208,
              admin: {
                description:
                  'Google Haritalar’da konuma sağ tıklayınca çıkan iki sayıdan ilki. Arama motorlarına konum bildirmek için kullanılır.',
              },
            },
            {
              name: 'longitude',
              type: 'number',
              label: 'Boylam (longitude)',
              defaultValue: 32.8541,
              admin: { description: 'Sağ tıklayınca çıkan iki sayıdan ikincisi.' },
            },
          ],
        },
        {
          label: 'Sosyal Medya',
          admin: {
            description:
              'Doldurduğunuz hesaplar üst barda ve footer’da ikon olarak görünür. Boş bıraktığınız hesabın ikonu hiç gösterilmez.',
          },
          fields: [
            {
              name: 'social',
              type: 'group',
              label: false,
              fields: [
                {
                  name: 'facebook',
                  type: 'text',
                  label: 'Facebook',
                  admin: { placeholder: 'https://facebook.com/kullanici-adiniz' },
                },
                {
                  name: 'x',
                  type: 'text',
                  label: 'X (Twitter)',
                  admin: { placeholder: 'https://x.com/kullanici-adiniz' },
                },
                {
                  name: 'linkedin',
                  type: 'text',
                  label: 'LinkedIn',
                  admin: { placeholder: 'https://linkedin.com/company/firmaniz' },
                },
                {
                  name: 'instagram',
                  type: 'text',
                  label: 'Instagram',
                  admin: { placeholder: 'https://instagram.com/kullanici-adiniz' },
                },
                {
                  name: 'youtube',
                  type: 'text',
                  label: 'YouTube',
                  admin: { placeholder: 'https://youtube.com/@kanaliniz' },
                },
              ],
            },
          ],
        },
        {
          label: 'Faydalı Linkler',
          admin: {
            description:
              'Footer’daki "Faydalı Linkler" sütunu. Resmî kurum sayfaları gibi dış bağlantılar ekleyebilirsiniz.',
          },
          fields: [
            {
              name: 'usefulLinks',
              type: 'array',
              label: 'Footer Faydalı Linkler',
              labels: { singular: 'Link', plural: 'Linkler' },
              admin: {
                description:
                  '"Yeni Link Ekle" ile satır ekleyin, soldaki tutamaçtan sürükleyerek sıralayın.',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'Görünen Başlık',
                  required: true,
                  admin: { placeholder: 'Örn: Türk Akreditasyon Kurumu' },
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'Adres (URL)',
                  required: true,
                  admin: { placeholder: 'https://...' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
