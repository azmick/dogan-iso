import config from '@payload-config'
import { getPayload } from 'payload'

import { slugify } from '../fields/slug'
import { faqs, pages, posts, projects, services, usefulLinks } from './content'

/**
 * Temsili içerikleri yükler.
 *
 *   pnpm seed
 *
 * Zaten kayıt bulunan koleksiyonlara dokunmaz; birden çok kez çalıştırılabilir.
 */

const daysAgoToISO = (days: number): string => {
  const date = new Date()
  date.setDate(date.getDate() - days)

  return date.toISOString()
}

const seed = async () => {
  const payload = await getPayload({ config })

  console.log('\n▶ Temsili içerik yükleniyor…\n')

  /* ---------------- Yönetici kullanıcı ---------------- */
  const { totalDocs: userCount } = await payload.find({
    collection: 'users',
    limit: 0,
    depth: 0,
  })

  if (userCount === 0) {
    const email = process.env.SEED_ADMIN_EMAIL || 'admin@ornek-firma.com.tr'
    const password = process.env.SEED_ADMIN_PASSWORD || 'Degistir!2026'

    await payload.create({
      collection: 'users',
      data: { email, password, name: 'Site Yöneticisi' },
    })

    console.log('  ✓ Yönetici kullanıcı oluşturuldu')
    console.log(`      E-posta : ${email}`)
    console.log(`      Parola  : ${password}`)
    console.log('      → İlk girişten sonra parolayı mutlaka değiştirin.\n')
  } else {
    console.log('  • Kullanıcı zaten var, atlandı')
  }

  /* ---------------- Hizmetler ---------------- */
  const { totalDocs: serviceCount } = await payload.find({
    collection: 'services',
    limit: 0,
    depth: 0,
  })

  if (serviceCount === 0) {
    for (const service of services) {
      await payload.create({
        collection: 'services',
        data: {
          title: service.title,
          slug: slugify(service.title),
          excerpt: service.excerpt,
          order: service.order,
          content: service.content as never,
        },
      })
    }
    console.log(`  ✓ ${services.length} hizmet eklendi`)
  } else {
    console.log('  • Hizmetler zaten var, atlandı')
  }

  /* ---------------- Sayfalar (kurumsal / yasal) ---------------- */
  const { totalDocs: pageCount } = await payload.find({
    collection: 'pages',
    limit: 0,
    depth: 0,
  })

  if (pageCount === 0) {
    for (const page of pages) {
      await payload.create({
        collection: 'pages',
        data: {
          title: page.title,
          slug: page.slug,
          excerpt: page.excerpt,
          menuOrder: page.menuOrder,
          showInCorporateMenu: true,
          content: page.content as never,
        },
      })
    }
    console.log(`  ✓ ${pages.length} kurumsal sayfa eklendi`)
  } else {
    console.log('  • Sayfalar zaten var, atlandı')
  }

  /* ---------------- Haberler ---------------- */
  const { totalDocs: postCount } = await payload.find({
    collection: 'posts',
    limit: 0,
    depth: 0,
  })

  if (postCount === 0) {
    for (const post of posts) {
      await payload.create({
        collection: 'posts',
        data: {
          title: post.title,
          slug: slugify(post.title),
          excerpt: post.excerpt,
          publishedDate: daysAgoToISO(post.daysAgo),
          content: post.content as never,
        },
      })
    }
    console.log(`  ✓ ${posts.length} haber eklendi`)
  } else {
    console.log('  • Haberler zaten var, atlandı')
  }

  /* ---------------- Etkinlikler ---------------- */
  const { totalDocs: projectCount } = await payload.find({
    collection: 'projects',
    limit: 0,
    depth: 0,
  })

  if (projectCount === 0) {
    for (const project of projects) {
      await payload.create({
        collection: 'projects',
        data: {
          title: project.title,
          slug: slugify(project.title),
          excerpt: project.excerpt,
          date: daysAgoToISO(project.daysAgo),
          content: project.content as never,
        },
      })
    }
    console.log(`  ✓ ${projects.length} etkinlik eklendi`)
  } else {
    console.log('  • Etkinlikler zaten var, atlandı')
  }

  /* ---------------- SSS ---------------- */
  const { totalDocs: faqCount } = await payload.find({
    collection: 'faq',
    limit: 0,
    depth: 0,
  })

  if (faqCount === 0) {
    for (const faq of faqs) {
      await payload.create({
        collection: 'faq',
        data: {
          question: faq.question,
          order: faq.order,
          answer: faq.answer as never,
        },
      })
    }
    console.log(`  ✓ ${faqs.length} soru-cevap eklendi`)
  } else {
    console.log('  • SSS zaten var, atlandı')
  }

  /* ---------------- Globals ---------------- */
  const contactInfo = await payload.findGlobal({ slug: 'contact-info', depth: 0 })

  if (!contactInfo?.usefulLinks?.length) {
    await payload.updateGlobal({
      slug: 'contact-info',
      data: {
        usefulLinks,
        social: {
          facebook: 'https://facebook.com/',
          x: 'https://x.com/',
          linkedin: 'https://linkedin.com/',
          instagram: 'https://instagram.com/',
        },
      },
    })
    console.log('  ✓ İletişim bilgileri (temsili) güncellendi')
  } else {
    console.log('  • İletişim bilgileri zaten dolu, atlandı')
  }

  // Global'ler ilk okunduğunda varsayılan değerleriyle oluşsun
  await payload.updateGlobal({ slug: 'site-settings', data: {} })

  console.log('\n✔ Tamamlandı. Panel: http://localhost:3000/admin\n')

  process.exit(0)
}

await seed()
