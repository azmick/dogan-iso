# ISO Belgelendirme / Denetim Tanıtım Sitesi

Next.js (App Router) + Payload CMS 3 ile geliştirilen, tamamen panelden yönetilebilen kurumsal tanıtım sitesi.
Proje kuralları ve tasarım kararları için [CLAUDE.md](CLAUDE.md) dosyasına bakın.

> **Not:** Sitedeki tüm metinler, iletişim bilgileri ve görseller **temsilidir**. Gerçek bilgiler
> yönetim panelinden girilecektir.

## Teknoloji

| Katman | Seçim |
| --- | --- |
| Framework | Next.js 16 (App Router, TypeScript, Server Components) |
| CMS | Payload CMS 3 (aynı proje içinde gömülü) |
| Veritabanı | Neon Postgres (`@payloadcms/db-postgres`) |
| Dosya yükleme | Vercel Blob (`clientUploads: true`) |
| Stil | Tailwind CSS v4 (CSS-first `@theme` token'ları) |
| Zengin metin | Payload Lexical editörü |
| SEO | `@payloadcms/plugin-seo`, `generateMetadata`, `sitemap.ts`, `robots.ts`, JSON-LD |
| Deploy | Vercel |

## Kurulum

### 1. Bağımlılıklar

```bash
pnpm install
```

### 2. Ortam değişkenleri

`.env` dosyasındaki değerleri doldurun (`.env.example` şablondur):

| Değişken | Açıklama |
| --- | --- |
| `DATABASE_URI` | Neon Postgres bağlantı adresi (pooled connection string) |
| `PAYLOAD_SECRET` | Rastgele uzun bir dize (oturum/şifreleme anahtarı) |
| `NEXT_PUBLIC_SERVER_URL` | Sitenin genel adresi — canonical, OpenGraph ve sitemap için |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob okuma/yazma anahtarı. Boşsa yüklemeler yerel diske gider (yalnızca geliştirme). |
| `SMTP_*`, `CONTACT_NOTIFY_TO` | İletişim formu e-posta bildirimi (opsiyonel; boşsa kayıt yalnızca panele düşer) |

Neon bağlantı adresini almak için: [neon.com](https://neon.com) → yeni proje →
**Connection string** → *Pooled connection* seçeneği.

### 3. Geliştirme sunucusu

```bash
pnpm dev
```

- Site: http://localhost:3000
- Yönetim paneli: http://localhost:3000/admin

Geliştirmede veritabanı şeması otomatik güncellenir (`push: true`).

### 4. Temsili içerikleri yükle

```bash
pnpm seed
```

Yönetici kullanıcı, 9 hizmet, 4 kurumsal/yasal sayfa, 6 haber, 4 etkinlik ve 8 SSS kaydı ekler.
Dolu koleksiyonlara dokunmaz, tekrar tekrar çalıştırılabilir.

Varsayılan yönetici bilgileri (`SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` ile değiştirilebilir):

```
admin@ornek-firma.com.tr / Degistir!2026
```

**İlk girişten sonra parolayı mutlaka değiştirin.**

## Komutlar

| Komut | Açıklama |
| --- | --- |
| `pnpm dev` | Geliştirme sunucusu |
| `pnpm build` | Production derlemesi |
| `pnpm start` | Derlenmiş sürümü çalıştırır |
| `pnpm lint` | ESLint |
| `pnpm generate:types` | `src/payload-types.ts` dosyasını yeniden üretir |
| `pnpm seed` | Temsili içerikleri yükler |
| `pnpm migrate:create` | Şema değişikliği için migration üretir |
| `pnpm migrate` | Bekleyen migration'ları uygular |
| `pnpm ci` | `migrate` + `build` (Vercel build komutu) |

## Proje yapısı

```
src/
├── access/            Payload erişim kuralları (herkese okuma / girişe yazma)
├── app/
│   ├── (frontend)/    Site sayfaları, sitemap.ts, robots.ts, styles.css
│   └── (payload)/     Payload yönetim paneli ve REST/GraphQL uçları
├── collections/       services, posts, projects, pages, faq, media, contact-submissions, users
├── components/        Header, Footer, HeroSlider, kartlar, form, lightbox vb.
├── fields/            Türkçe-uyumlu slug alanı
├── globals/           site-settings, contact-info
├── lib/               Payload veri erişimi, SEO, medya ve biçimlendirme yardımcıları
└── seed/              Temsili içerik ve yükleyici
```

## İçerik yönetimi

Panelde tüm içerik türleri Türkçe etiketlerle listelenir:

- **İçerik:** Hizmetler, Haberler, Etkinlikler, Sayfalar, SSS, Medya
- **Ayarlar:** Site Ayarları (logo, favicon, varsayılan SEO), İletişim Bilgileri (adres, telefon,
  WhatsApp, e-posta, harita, sosyal medya, faydalı linkler)
- **Yönetim:** İletişim Formu Kayıtları, Kullanıcılar

Header'daki *Kurumsal* menüsü `Sayfalar` koleksiyonundaki "Kurumsal menüsünde göster" işaretli
kayıtlardan, *Hizmetlerimiz* menüsü ise `Hizmetler` koleksiyonundan otomatik oluşur.

## Vercel'e deploy

1. Projeyi bir Git deposuna gönderin ve Vercel'de içe aktarın.
2. Ortam değişkenlerini Vercel proje ayarlarına ekleyin (`DATABASE_URI`, `PAYLOAD_SECRET`,
   `NEXT_PUBLIC_SERVER_URL`, `BLOB_READ_WRITE_TOKEN`, gerekiyorsa `SMTP_*`).
3. Vercel > Storage > **Blob** deposu oluşturup token'ı ekleyin.
4. Build komutunu `pnpm ci` yapın — böylece derlemeden önce migration'lar uygulanır.

Production'da `push` kapalıdır; şema değişikliklerini `pnpm migrate:create` ile üretip commit edin.
