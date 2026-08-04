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
    singular: 'İletişim Formu Kaydı',
    plural: 'İletişim Formu Kayıtları',
  },
  admin: {
    group: 'Yönetim',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
    description: 'Siteden gönderilen iletişim formu mesajları.',
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
    },
    {
      name: 'email',
      type: 'email',
      label: 'E-posta',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefon',
    },
    {
      name: 'subject',
      type: 'text',
      label: 'Konu',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Mesaj',
      required: true,
    },
    {
      name: 'kvkkConsent',
      type: 'checkbox',
      label: 'KVKK Aydınlatma Metni onayı verildi',
      defaultValue: false,
    },
  ],
  timestamps: true,
}
