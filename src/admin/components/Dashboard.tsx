import type { Payload } from 'payload'
import React from 'react'

import type { User } from '@/payload-types'

type DashboardProps = {
  payload: Payload
  user?: null | Partial<User>
}

const dateFormatter = new Intl.DateTimeFormat('tr-TR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

/** "Ali Veli" -> "Ali", e-posta -> "@" öncesi. */
const firstName = (user?: null | Partial<User>): string => {
  const name = typeof user?.name === 'string' ? user.name.trim() : ''
  if (name) return name.split(' ')[0]

  const email = typeof user?.email === 'string' ? user.email : ''
  if (email) return email.split('@')[0]

  return 'Hoş geldiniz'
}

const greeting = (): string => {
  const hour = new Date().getHours()
  if (hour < 6) return 'İyi geceler'
  if (hour < 12) return 'Günaydın'
  if (hour < 18) return 'İyi günler'
  return 'İyi akşamlar'
}

/* ------------------------------------------------------------------ */
/* İkonlar                                                             */
/* ------------------------------------------------------------------ */

const iconProps = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  'aria-hidden': true,
} as const

const NewsIcon = () => (
  <svg {...iconProps}>
    <path
      d="M4 5h11a1 1 0 0 1 1 1v13H5a1 1 0 0 1-1-1V5Zm12 4h3a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2h-2M7 8h5M7 12h5M7 16h5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ServiceIcon = () => (
  <svg {...iconProps}>
    <path
      d="M12 3 4 6.2v5.4c0 4.6 3.3 8.9 8 10.1 4.7-1.2 8-5.5 8-10.1V6.2L12 3Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m8.8 12 2.2 2.2 4.2-4.4"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const MediaIcon = () => (
  <svg {...iconProps}>
    <rect
      x="3.5"
      y="5"
      width="17"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="m4 16 4.2-4.2a1.5 1.5 0 0 1 2.1 0L14 15.5m-1.4-1.4 1.8-1.8a1.5 1.5 0 0 1 2.1 0L20 15.5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="9.5" r="1.3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

const InfoIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M12 11v5.5M12 7.8v.4"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
    />
  </svg>
)

const ExternalIcon = () => (
  <svg {...iconProps}>
    <path
      d="M14 4h6v6M20 4l-8.5 8.5M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const PhoneIcon = () => (
  <svg {...iconProps}>
    <path
      d="M7.6 4h-2A1.6 1.6 0 0 0 4 5.7C4 13 11 20 18.3 20a1.6 1.6 0 0 0 1.7-1.6v-2a1 1 0 0 0-.8-1l-3-.6a1 1 0 0 0-1 .4l-.8 1.1a12.6 12.6 0 0 1-5.7-5.7l1.1-.8a1 1 0 0 0 .4-1l-.6-3a1 1 0 0 0-1-.8Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
)

const SettingsIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M18 6l-1.6 1.6M7.6 16.4 6 18M18 18l-1.6-1.6M7.6 7.6 6 6"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
)

/* ------------------------------------------------------------------ */
/* Pano                                                                */
/* ------------------------------------------------------------------ */

/**
 * Panelin ana ekranında, hazır koleksiyon kartlarının üstünde görünen
 * Türkçe karşılama bölümü. Amaç: teknik olmayan bir editörün panele girdiği
 * anda "ne yapabilirim, nereye tıklarım" sorusunun cevabını görmesi.
 */
export const AdminDashboard = async ({ payload, user }: DashboardProps) => {
  const admin = payload.config.routes.admin || '/admin'
  const link = (path: string) => `${admin}${path}`

  const [services, posts, pages, faq, media, submissions, latestMessages] =
    await Promise.all([
      payload.count({ collection: 'services' }),
      payload.count({ collection: 'posts' }),
      payload.count({ collection: 'pages' }),
      payload.count({ collection: 'faq' }),
      payload.count({ collection: 'media' }),
      payload.count({ collection: 'contact-submissions' }),
      payload.find({
        collection: 'contact-submissions',
        limit: 5,
        depth: 0,
        sort: '-createdAt',
        select: { name: true, subject: true, createdAt: true },
      }),
    ])

  const quickActions = [
    {
      href: link('/collections/posts/create'),
      icon: <NewsIcon />,
      label: 'Yeni Blog Yazısı Ekle',
      hint: 'Duyuru veya bilgilendirme yazısı yayınlayın.',
    },
    {
      href: link('/collections/services/create'),
      icon: <ServiceIcon />,
      label: 'Yeni Hizmet Ekle',
      hint: 'Belgelendirme / danışmanlık hizmeti tanımlayın.',
    },
    {
      href: link('/collections/media/create'),
      icon: <MediaIcon />,
      label: 'Görsel Yükle',
      hint: 'Sayfalarda kullanacağınız fotoğrafları ekleyin.',
    },
  ]

  const stats = [
    { href: link('/collections/services'), value: services.totalDocs, label: 'Hizmet' },
    { href: link('/collections/posts'), value: posts.totalDocs, label: 'Blog Yazısı' },
    { href: link('/collections/pages'), value: pages.totalDocs, label: 'Sayfa' },
    { href: link('/collections/faq'), value: faq.totalDocs, label: 'S.S.S.' },
    { href: link('/collections/media'), value: media.totalDocs, label: 'Görsel / Dosya' },
  ]

  return (
    <div className="dg-dash">
      {/* Karşılama */}
      <section className="dg-dash__hero">
        <div className="dg-dash__hero-inner">
          <span className="dg-dash__eyebrow">Web Sitesi Yönetim Paneli</span>
          <h1 className="dg-dash__title">
            {greeting()}, {firstName(user)}
          </h1>
          <p className="dg-dash__lead">
            Buradan sitenizin tüm içeriğini düzenleyebilirsiniz. Bir şeyi değiştirip{' '}
            <strong>Kaydet</strong> dediğinizde sitede anında yayına girer. Ne yapacağınızdan emin
            değilseniz aşağıdaki kısayollardan başlayın.
          </p>

          <div className="dg-dash__hero-actions">
            <a
              className="dg-dash__hero-btn dg-dash__hero-btn--solid"
              href="/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalIcon />
              Siteyi Görüntüle
            </a>
            <a className="dg-dash__hero-btn dg-dash__hero-btn--ghost" href={link('/globals/contact-info')}>
              <PhoneIcon />
              İletişim Bilgileri
            </a>
            <a className="dg-dash__hero-btn dg-dash__hero-btn--ghost" href={link('/globals/site-settings')}>
              <SettingsIcon />
              Site Ayarları
            </a>
          </div>
        </div>
      </section>

      {/* Hızlı işlemler */}
      <section>
        <div className="dg-dash__section-head">
          <h2 className="dg-dash__section-title">Hızlı İşlemler</h2>
          <p className="dg-dash__section-hint">En sık yapılan işler</p>
        </div>

        <div className="dg-dash__actions">
          {quickActions.map((action) => (
            <a className="dg-dash__action" href={action.href} key={action.href}>
              <span className="dg-dash__action-icon">{action.icon}</span>
              <span>
                <span className="dg-dash__action-label">{action.label}</span>
                <span className="dg-dash__action-hint">{action.hint}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* İçerik özeti + son mesajlar */}
      <div className="dg-dash__split">
        <section>
          <div className="dg-dash__section-head">
            <h2 className="dg-dash__section-title">Sitedeki İçerik</h2>
            <p className="dg-dash__section-hint">Listeyi açmak için tıklayın</p>
          </div>

          <div className="dg-dash__stats">
            {stats.map((stat) => (
              <a className="dg-dash__stat" href={stat.href} key={stat.href}>
                <span className="dg-dash__stat-value">{stat.value}</span>
                <span className="dg-dash__stat-label">{stat.label}</span>
              </a>
            ))}
          </div>
        </section>

        <section>
          <div className="dg-dash__section-head">
            <h2 className="dg-dash__section-title">Son Gelen Mesajlar</h2>
            <p className="dg-dash__section-hint">Toplam {submissions.totalDocs}</p>
          </div>

          <div className="dg-dash__panel">
            {latestMessages.docs.length === 0 ? (
              <p className="dg-dash__empty">
                Henüz iletişim formundan mesaj gelmedi.
              </p>
            ) : (
              latestMessages.docs.map((message) => (
                <a
                  className="dg-dash__msg"
                  href={link(`/collections/contact-submissions/${message.id}`)}
                  key={message.id}
                >
                  <span className="dg-dash__msg-top">
                    <span className="dg-dash__msg-name">{message.name}</span>
                    <span className="dg-dash__msg-date">
                      {message.createdAt ? dateFormatter.format(new Date(message.createdAt)) : ''}
                    </span>
                  </span>
                  <span className="dg-dash__msg-subject">{message.subject}</span>
                </a>
              ))
            )}
          </div>
        </section>
      </div>

      {/* İpucu */}
      <p className="dg-dash__tip">
        <InfoIcon />
        <span>
          <strong>İpucu:</strong> Sol menüdeki <em>İçerik</em> bölümünden sayfaları düzenler,{' '}
          <em>Ayarlar</em> bölümünden adres, telefon ve sosyal medya bilgilerinizi güncellersiniz.
          Bir kaydı açtığınızda sağ üstteki <strong>Önizle</strong> düğmesiyle sayfanın sitede nasıl
          göründüğünü kontrol edebilirsiniz.
        </span>
      </p>
    </div>
  )
}

export default AdminDashboard
