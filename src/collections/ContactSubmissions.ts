import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

/**
 * İletişim formu kayıtları.
 * Kayıt oluşturma yalnızca sunucu tarafındaki server action üzerinden yapılır
 * (Local API `overrideAccess` ile), bu yüzden erişim tamamen kapalıdır —
 * kişisel veri içerdiği için herkese açık okuma/yazma verilmez.
 */
export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'Gelen Mesaj',
    plural: 'Gelen Mesajlar',
  },
  admin: {
    group: 'Yönetim',
    useAsTitle: 'subject',
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
    listSearchableFields: ['name', 'email', 'subject', 'message'],
    description:
      'Sitedeki iletişim formundan gönderilen mesajlar. Bu kayıtlar salt okunurdur; değiştirilemez, yalnızca okunup silinebilir.',
    pagination: { defaultLimit: 25 },
  },
  access: {
    read: authenticated,
    create: () => false,
    update: () => false,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Ad Soyad',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-posta',
      required: true,
      admin: {
        readOnly: true,
        description: 'Yanıt vermek için bu adrese yazabilirsiniz.',
      },
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefon',
      admin: { readOnly: true },
    },
    {
      name: 'subject',
      type: 'text',
      label: 'Konu',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Mesaj',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'kvkkConsent',
      type: 'checkbox',
      label: 'KVKK Aydınlatma Metni onayı verildi',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Gönderen kişi formu doldururken KVKK metnini onayladı mı?',
      },
    },
  ],
  timestamps: true,
}
