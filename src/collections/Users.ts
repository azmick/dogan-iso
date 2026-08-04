import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Kullanıcı',
    plural: 'Kullanıcılar',
  },
  admin: {
    group: 'Yönetim',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'updatedAt'],
    listSearchableFields: ['name', 'email'],
    description:
      'Bu panele giriş yapabilen kişiler. Yeni bir çalışana erişim vermek için "Yeni Kullanıcı" deyip e-posta ve şifre belirleyin.',
  },
  auth: true,
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
    admin: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Ad Soyad',
      admin: {
        placeholder: 'Örn: Ayşe Yılmaz',
        description: 'Panelde ve kayıt listelerinde görünen isim.',
      },
    },
  ],
}
