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
| Deploy | Kendi sunucumuz (VPS) — Node + Nginx |

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
> `?sslmode=verify-full` yapın (sunucudaki `.env` dosyasında da). node-postgres
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
| `pnpm ci` | `migrate` + `build` (sunucuda deploy komutu) |

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

## VPS'e deploy

Site kendi sunucumuzda çalışır: **Node** uygulamayı 3000 portunda ayakta tutar, **Nginx**
öne geçip 80/443'ten gelen trafiği ona iletir (reverse proxy), SSL sertifikası da
Nginx'te durur.

> **Neden Vercel değil?** Vercel'in dosya sistemi kalıcı değildir — panelden yüklenen
> görseller her deploy'da silinirdi. Bu proje yüklemeleri sunucunun kendi diskine yazar,
> dolayısıyla kalıcı diski olan bir sunucu gerekir.

### 1. Klasör düzeni

Kod ile müşterinin yüklediği görselleri **ayrı klasörlerde** tutun:

```
/var/www/dogan-iso/
├── app/     ← git deposu (kod). Her deploy'da değişir.
└── media/   ← MEDIA_DIR. Panelden yüklenenler. Deploy buraya dokunmaz.
```

Bu ayrım şart: `media/` proje klasörünün içinde kalırsa bir gün `git clean` ya da temiz
bir kurulum müşterinin tüm görsellerini siler.

### 2. Sunucu hazırlığı

```bash
# Node 22 + pnpm + Nginx kurulu olmalı
sudo mkdir -p /var/www/dogan-iso/media
sudo chown -R www-data:www-data /var/www/dogan-iso
```

`media/` klasörünün sahibi, uygulamayı çalıştıran kullanıcı olmalı — aksi hâlde panelden
yükleme "permission denied" ile başarısız olur.

### 3. Kod ve ortam değişkenleri

```bash
cd /var/www/dogan-iso
git clone <repo-adresi> app
cd app
pnpm install --frozen-lockfile
```

Sunucudaki `.env` dosyasını oluşturun:

```bash
DATABASE_URI=postgresql://...?sslmode=verify-full&channel_binding=require
PAYLOAD_SECRET=<uzun rastgele dize>
NEXT_PUBLIC_SERVER_URL=https://ornek-firma.com.tr
PAYLOAD_CSRF_ORIGINS=https://www.ornek-firma.com.tr
MEDIA_DIR=/var/www/dogan-iso/media
PAYLOAD_MCP_DISABLED=true
```

> **`NEXT_PUBLIC_SERVER_URL` derleme anında gömülür.** `NEXT_PUBLIC_` ile başlayan
> değişkenler tarayıcıya giden koda yazılır, yani **`pnpm build`'den önce** doğru
> olmalı. Sonradan değiştirirseniz yeniden derlemeniz gerekir.
>
> Değer, tarayıcıdaki adresin birebir aynısı olmalı (protokol dahil, sonda `/` yok).
> Yanlışsa panelde kaydetme ve çıkış yapma **sessizce** çalışmaz. Siteye birden fazla
> adresten giriliyorsa (www'lu/www'suz) diğerlerini `PAYLOAD_CSRF_ORIGINS`'e virgülle
> ekleyin.

> **Yerel ve canlı aynı veritabanını kullanmasın.** Yerelde yüklediğiniz görselin künyesi
> ortak veritabanına yazılır ama dosya sizin diskinizde kalır; canlıda o görsel kırık
> çıkar. Neon'da canlı için ayrı bir branch açın.

### 4. İlk derleme

```bash
pnpm ci   # migration'ları uygular, sonra derler
```

### 5. systemd servisi

Uygulamanın sunucu yeniden başlasa da ayakta kalması için
`/etc/systemd/system/dogan-iso.service`:

```ini
[Unit]
Description=dogan-iso (Next.js + Payload)
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/dogan-iso/app
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/env pnpm start
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now dogan-iso
sudo systemctl status dogan-iso
```

`.env` dosyasını Next.js kendisi okur; systemd'ye ayrıca tanıtmanıza gerek yoktur.

### 6. Nginx

`/etc/nginx/sites-available/dogan-iso`:

```nginx
server {
    listen 80;
    server_name ornek-firma.com.tr www.ornek-firma.com.tr;

    # Panelden görsel yüklenebilmesi için ŞART. Nginx varsayılanı 1 MB'tır ve
    # normal bir telefon fotoğrafı bunu aşar — müşteri "413 Request Entity
    # Too Large" hatası alır.
    client_max_body_size 25M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade           $http_upgrade;
        proxy_set_header Connection        'upgrade';
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/dogan-iso /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d ornek-firma.com.tr -d www.ornek-firma.com.tr
```

`media/` klasörünü Nginx'ten doğrudan sunmayın — dosyalar Payload'ın
`/api/media/file/...` ucundan gelir, klasörün web'e açık olması gerekmez.

### 7. Güncelleme (sonraki deploy'lar)

```bash
cd /var/www/dogan-iso/app
git pull
pnpm install --frozen-lockfile
pnpm ci
sudo systemctl restart dogan-iso
```

Derleme sırasında birkaç saniyelik kesinti olur. `media/` klasörüne dokunulmadığı için
müşterinin yüklediği görseller etkilenmez.

Production'da `push` kapalıdır; şema değişikliklerini yerelde `pnpm migrate:create` ile
üretip **commit edin** — sunucuda `pnpm ci` bunları otomatik uygular.

### 8. Yedekleme

Yedeklenecek **iki** şey var; ikisi birlikte alınmalı, yoksa kırık görseller çıkar:

| Ne | Nasıl |
| --- | --- |
| Veritabanı | Neon kendi yedekliyor (point-in-time restore) |
| `MEDIA_DIR` klasörü | **Sizin sorumluluğunuzda** — günlük `tar`/`rsync` |

```bash
tar -czf /yedek/media-$(date +%F).tar.gz -C /var/www/dogan-iso media
```

### Sık karşılaşılan sorunlar

| Belirti | Sebep | Çözüm |
| --- | --- | --- |
| Yüklerken "413 Request Entity Too Large" | Nginx'in 1 MB varsayılanı | `client_max_body_size 25M;` |
| Yüklerken "permission denied" | `MEDIA_DIR` yazılabilir değil | `chown -R www-data:www-data` |
| Panelde kaydetme/çıkış sessizce çalışmıyor | `NEXT_PUBLIC_SERVER_URL` adresle uyuşmuyor | `.env`'i düzeltin, yeniden derleyip başlatın |
| Görsel panelde var, sitede kırık | Yerel ve canlı aynı veritabanında | Canlıya ayrı veritabanı |
| Deploy sonrası görseller kayboldu | `MEDIA_DIR` proje klasörünün içinde | Proje dışına taşıyın |
