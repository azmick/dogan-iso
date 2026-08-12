import path from 'path'
import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'
import { revalidateWholeSiteAfterChange, revalidateWholeSiteAfterDelete } from '../lib/revalidate'

/**
 * Panelden yüklenen dosyaların diskteki yeri.
 *
 * Varsayılan: proje kökündeki `media/` klasörü (yerel geliştirme için yeterli).
 * Bu klasör `.gitignore`'dadır — yani buradaki dosyalar repoya girmez, sunucuya
 * kod ile birlikte taşınmaz. Yerelde yüklediğiniz görsel yalnızca yerelde,
 * canlı panelden yüklenen görsel yalnızca sunucuda görünür. Bu normaldir.
 *
 * Sunucuda MEDIA_DIR ile proje klasörünün DIŞINDA bir yol verin
 * (ör. /var/www/dogan-iso/media). Böylece `git pull` + yeniden build
 * müşterinin yüklediği görselleri etkilemez ve yedeklemesi tek klasör olur.
 */
const staticDir = process.env.MEDIA_DIR
  ? path.resolve(process.env.MEDIA_DIR)
  : path.resolve(process.cwd(), 'media')

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Görsel / Dosya',
    plural: 'Medya Kütüphanesi',
  },
  admin: {
    group: 'İçerik',
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    listSearchableFields: ['alt', 'filename', 'caption'],
    description:
      'Sitede kullanılan tüm fotoğraf ve belgeler. Bir görseli buraya bir kez yükleyip birden fazla sayfada kullanabilirsiniz.',
    pagination: { defaultLimit: 24 },
  },
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  // Bir görsel (logo, kapak, galeri) sitenin herhangi bir yerinde kullanılmış
  // olabilir; hangisi olduğunu bilemediğimiz için tamamını tazeliyoruz.
  hooks: {
    afterChange: [revalidateWholeSiteAfterChange],
    afterDelete: [revalidateWholeSiteAfterDelete],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alternatif Metin',
      required: true,
      admin: {
        placeholder: 'Örn: Denetim toplantısında masada oturan üç kişi',
        description:
          'Görselde ne olduğunu kısaca yazın. Görme engelli ziyaretçilere okunur ve Google için önemlidir — bu yüzden zorunludur.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Alt Yazı (isteğe bağlı)',
      admin: {
        description:
          'Görselle ilgili kısa bir not. Sayfalarda gösterilmez; kütüphanede aramayı kolaylaştırır. Boş bırakabilirsiniz.',
      },
    },
  ],
  upload: {
    staticDir,
    mimeTypes: ['image/*', 'application/pdf'],
    focalPoint: true,
    displayPreview: true,
    imageSizes: [
      { name: 'thumbnail', width: 480, height: 320, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'wide', width: 1600, height: 900, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
  },
}
