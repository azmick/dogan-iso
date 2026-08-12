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
| Dosya yükleme | Sunucunun kendi diski (`MEDIA_DIR`) |
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
| `MEDIA_DIR` | Panelden yüklenen görsellerin diskteki klasörü. Boşsa proje kökündeki `media/` kullanılır. |
| `SMTP_*`, `CONTACT_NOTIFY_TO` | İletişim formu e-posta bildirimi (opsiyonel; boşsa kayıt yalnızca panele düşer) |

Neon bağlantı adresini almak için: [neon.com](https://neon.com) → yeni proje →
**Connection string** → *Pooled connection* seçeneği.

> **SSL notu:** Neon'un verdiği adres `?sslmode=require` ile biter; bunu
> `?sslmode=verify-full` yapın (canlıdaki Vercel değişkeninde de). node-postgres
> bugün `require`'ı da tam doğrulama sayıyor, ama pg v9'da `require` sertifika
> doğrulamayı bırakacak; `verify-full` yazmak hem "SECURITY WARNING: The SSL
> modes 'prefer', 'require'..." uyarısını susturur hem de yükseltmede güvenliğin
> sessizce düşmesini engeller.

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

Yönetici kullanıcı, 9 hizmet, 4 kurumsal/yasal sayfa, 6 blog yazısı ve 8 SSS kaydı ekler.
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
| `pnpm mcp:key` | MCP istemcileri için API anahtarı üretir/yeniler |
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
├── collections/       services, posts (Blog), pages, faq, media, contact-submissions, users
├── components/        Header, Footer, HeroSlider, kartlar, form vb.
├── fields/            Türkçe-uyumlu slug alanı
├── globals/           site-settings, contact-info
├── lib/               Payload veri erişimi, SEO, medya ve biçimlendirme yardımcıları
├── scripts/           Tek seferlik bakım betikleri (MCP API anahtarı üretimi)
└── seed/              Temsili içerik ve yükleyici
```

## İçerik yönetimi

Panelde tüm içerik türleri Türkçe etiketlerle listelenir:

- **İçerik:** Hizmetler, Blog, Sayfalar, SSS, Medya
- **Ayarlar:** Site Ayarları (logo, favicon, varsayılan SEO), İletişim Bilgileri (adres, telefon,
  WhatsApp, e-posta, harita, sosyal medya, faydalı linkler)
- **Yönetim:** İletişim Formu Kayıtları, Kullanıcılar

Header'daki *Kurumsal* menüsü `Sayfalar` koleksiyonundaki "Kurumsal menüsünde göster" işaretli
kayıtlardan, *Hizmetlerimiz* menüsü ise `Hizmetler` koleksiyonundan otomatik oluşur.

## Görseller nerede durur?

Sitede iki ayrı görsel kaynağı var. Karıştırılınca "yerelde görünüyor, canlıda görünmüyor"
sorunu çıkar; ayrımı bilmek yeterli:

| | `public/` klasörü | Panel / Medya Kütüphanesi |
| --- | --- | --- |
| Dosyayı kim koyar | Geliştirici, elle | Müşteri, panelden |
| Nerede durur | Repo (git) | Sunucunun diski (`MEDIA_DIR`) |
| Canlıya nasıl çıkar | `git push` + deploy | Yüklendiği anda |
| Ne için | Logo, favicon | Blog kapağı, hizmet görseli, içerik |

Panelden yüklenen dosyalar `.gitignore`'dadır — **repoya girmez, kodla birlikte taşınmaz.**
Yerelde panelden yüklediğiniz bir görsel yalnızca yerelde, canlı panelden yüklenen görsel
yalnızca canlıda görünür. Bu beklenen davranıştır: içerik girişi canlı panelden yapılır.

Logo ve favicon üç kademeli çözülür: **panelde yüklüyse panel → yoksa `public/` içindeki
dosya → o da yoksa yazı tabanlı yer tutucu.** Hangi dosya adlarının tanındığı
[`public/README.md`](public/README.md) içinde yazılıdır.

> Sunucuda `MEDIA_DIR` değerini proje klasörünün **dışında** bir yola verin
> (ör. `/var/www/dogan-iso/media`). Böylece kodu güncellemek müşterinin yüklediği
> görsellere dokunmaz ve yedeklenecek tek bir klasör olur.

## MCP sunucusu (kodlama ajanları için)

`@payloadcms/plugin-mcp` sayesinde içerik, bir MCP istemcisinden (Claude Code vb.) doğrudan
yönetilebilir. Uç nokta: `POST /api/mcp` — yalnızca API anahtarıyla erişilir.

```bash
pnpm mcp:key   # anahtar üretir; ekrana bir kez yazılır
pnpm dev       # MCP sunucusu geliştirme sunucusuyla birlikte çalışır
```

Üretilen anahtarı `.claude/settings.local.json` içindeki `PAYLOAD_MCP_API_KEY` alanına yazın
(bu dosya `.gitignore`'dadır). Sunucu tanımları repodaki [.mcp.json](.mcp.json) dosyasındadır.

Anahtar başına yetkiler panelden **MCP > API Keys** altında tek tek açılıp kapatılabilir.
Hangi koleksiyon/global'in hangi işlemlere açılabileceği ise `payload.config.ts` içindeki
`mcpPlugin` yapılandırmasıyla sınırlıdır:

| Kapsam | İşlemler |
| --- | --- |
| Hizmetler, Blog, Sayfalar, SSS | listele, oluştur, güncelle, sil |
| Medya | listele, güncelle (yükleme yalnızca panelden) |
| İletişim Formu Kayıtları | listele (salt okunur) |
| Site Ayarları, İletişim Bilgileri | listele, güncelle |

`Kullanıcılar` koleksiyonu bilinçli olarak MCP'ye açılmamıştır. Canlıda ucu tamamen kapatmak
için `PAYLOAD_MCP_DISABLED=true` tanımlayın.

## Vercel'e deploy

1. Projeyi bir Git deposuna gönderin ve Vercel'de içe aktarın.
2. Ortam değişkenlerini Vercel proje ayarlarına ekleyin (`DATABASE_URI`, `PAYLOAD_SECRET`,
   `NEXT_PUBLIC_SERVER_URL`, gerekiyorsa `SMTP_*`).
3. Build komutunu `pnpm ci` yapın — böylece derlemeden önce migration'lar uygulanır.

> **Uyarı:** Vercel'in dosya sistemi kalıcı değildir; panelden yüklenen görseller her
> deploy'da kaybolur. Bu proje artık yüklemeleri sunucunun kendi diskine yazıyor, yani
> kalıcı diski olan bir sunucu (VPS) varsayıyor.

Production'da `push` kapalıdır; şema değişikliklerini `pnpm migrate:create` ile üretip commit edin.
