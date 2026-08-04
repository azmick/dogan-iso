import type { GlobalConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Ayarları',
  admin: {
    group: 'Ayarlar',
    description:
      'Firma adı, logo ve Google/sosyal medya paylaşımlarında kullanılan varsayılan bilgiler. Buradaki değişiklikler sitenin tamamını etkiler.',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      // İsimsiz sekmeler yalnızca görsel düzendir; veritabanı yapısını değiştirmez.
      type: 'tabs',
      tabs: [
        {
          label: 'Firma Bilgileri',
          admin: { description: 'Sitenin her yerinde kullanılan temel firma bilgileri.' },
          fields: [
            {
              name: 'siteName',
              type: 'text',
              label: 'Site / Firma Adı',
              required: true,
              defaultValue: 'Örnek ISO Belgelendirme',
              admin: {
                placeholder: 'Örn: Doğan ISO Belgelendirme',
                description: 'Üst menüde, tarayıcı sekmesinde ve footer telif satırında görünür.',
              },
            },
            {
              name: 'tagline',
              type: 'text',
              label: 'Slogan',
              defaultValue: 'Bağımsız Belgelendirme ve Denetim Hizmetleri',
              admin: {
                placeholder: 'Örn: Bağımsız Belgelendirme ve Denetim Hizmetleri',
                description: 'Logonun altında görünen kısa tanıtım cümlesi.',
              },
            },
            {
              name: 'legalName',
              type: 'text',
              label: 'Resmî Ticari Unvan',
              defaultValue: 'Örnek ISO Belgelendirme ve Denetim Hizmetleri A.Ş.',
              admin: {
                placeholder: 'Örn: Doğan Belgelendirme ve Denetim Hizmetleri A.Ş.',
                description:
                  'Ticaret sicilindeki tam unvan. Arama motorlarına firma bilgisi olarak bildirilir; sayfalarda görünmez.',
              },
            },
          ],
        },
        {
          label: 'Logo ve Simge',
          admin: {
            description:
              'Logo yüklemezseniz site, firma adından oluşan yazı tabanlı bir logo gösterir.',
          },
          fields: [
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo — açık zemin için',
              admin: {
                description:
                  'Üst menüde (beyaz zemin) kullanılır. Şeffaf arka planlı PNG veya SVG önerilir. Önerilen yükseklik: 56 piksel.',
              },
            },
            {
              name: 'logoInverted',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo — koyu zemin için',
              admin: {
                description:
                  'Footer lacivert zemin üzerinde kullanılır. Logonun beyaz / ters renkli versiyonunu yükleyin.',
              },
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              label: 'Favicon (sekme simgesi)',
              admin: {
                description:
                  'Tarayıcı sekmesinde görünen küçük kare simge. Önerilen ölçü: 512 x 512 piksel.',
              },
            },
          ],
        },
        {
          label: 'Arama Motoru (SEO)',
          admin: {
            description:
              'Kendi açıklaması olmayan sayfalarda bu bilgiler kullanılır. Sayfa bazlı ayar için ilgili kaydın "SEO" sekmesine bakın.',
          },
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
                  admin: {
                    description:
                      'Google sonuçlarında mavi bağlantı olarak görünen metin. 55-60 karakteri geçmemesi önerilir.',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Varsayılan Açıklama',
                  maxLength: 300,
                  defaultValue:
                    'ISO 27001, ISO 9001, ISO 14001 ve ISO 45001 başta olmak üzere yönetim sistemi belgelendirme, denetim ve KVKK uyum hizmetleri.',
                  admin: {
                    description:
                      'Google sonuçlarında başlığın altındaki gri açıklama. 150-160 karakter idealdir.',
                  },
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Sosyal Medya Paylaşım Görseli',
                  admin: {
                    description:
                      'Site bağlantısı WhatsApp, LinkedIn veya Facebook’ta paylaşıldığında görünen görsel. Önerilen ölçü: 1200 x 630 piksel.',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
