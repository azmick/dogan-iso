CLAUDE.md — ISO Belgelendirme / Denetim Tanıtım Sitesi

Bu dosya, projenin kalıcı talimat setidir. Claude Code her oturumda buna uymalıdır.

1. Proje Amacı

ISO sertifika denetimi yapıp belge veren bir firma için kurumsal tanıtım sitesi kuruyoruz. Sitenin iskelet/yapı olarak referansı, aşağıda "Site Haritası" ve "Sayfa İskeletleri" bölümlerinde tarif edilen kurumsal danışmanlık sitesi düzenidir (klasik: üst bar + logo + açılır menülü navigasyon, hero slider, hizmet kartları, hakkımızda, projeler/etkinlikler, blog, iletişim, footer).

Önemli çerçeve:

Yapı/iskelet birebir bu düzende olacak. Sayfa listesi, bölüm sıralaması ve bileşen mantığı tarif edildiği gibi kurulacak.
Renk paleti farklı olacak — bu dosyadaki soğuk mavi/beyaz "güven & güvenlik" paletini kullan (Bölüm 4).
İçerik = temsili (placeholder). Metinleri, referans sitenin metinlerini birebir kopyalayarak değil, aynı konu ve aynı yapıda Türkçe temsili içerik üreterek doldur. Kullanıcı sonradan tüm içerikleri kendi metinleriyle değiştirecek. Hizmet adları (ISO 27001, ISO 9001, KVKK vb.) sektör terimidir, olduğu gibi kullanılır.
İletişim bilgileri, logo ve görseller placeholder olacak (gerçek adres/telefon/ e-posta/logo sonradan girilecek — hiçbir gerçek firmanın bilgisi doldurulmayacak).
2. Teknoloji Yığını (kesin — değiştirme)
Framework: Next.js (App Router, TypeScript)
CMS / Backend: Payload CMS 3 — Next.js projesinin içine gömülü (tek proje, tek deploy)
Veritabanı: Neon Postgres (@payloadcms/db-postgres) — ücretsiz katman
Görsel & dosya yükleme: Vercel Blob (@payloadcms/storage-vercel-blob) — ücretsiz katman. clientUploads: true ayarlanacak (Vercel'in 4.5MB sunucu-upload limitini aşmak için). Yerel diske upload YOK (Vercel dosya sistemi kalıcı değil).
Deploy: Vercel
Styling: Tailwind CSS (renkler Bölüm 4'teki token'larla tailwind.config'e işlenecek)
Zengin metin: Payload'ın Lexical editörü
SEO: @payloadcms/plugin-seo + App Router sitemap.ts / robots.ts + JSON-LD

Kurulum yolu: Boş şablonla başla: npx create-payload-app@latest → Postgres → Neon connection string. Ardından bu dosyadaki yapıyı kur.

Ortam değişkenleri (.env, gizli — repoya girmeyecek): DATABASE_URI, PAYLOAD_SECRET, BLOB_READ_WRITE_TOKEN.

Production notları: Postgres adaptöründe push: process.env.NODE_ENV === 'development' (canlıda otomatik şema değişikliği kapalı, migration kullan).

3. Genel İlkeler (her sayfada geçerli)
Responsive (mobil öncelikli — ZORUNLU)
Next.js ve Payload MCP'sini kapalıysa aç ve bütün geliştirmeleri bu mcpleri kullanarak yap.
Faz faz ilerle ve geliştirmeleri yaptıkça commitleri otomatik at. 
Mobile-first yaz. Kırılımlar: mobil (<640), tablet (≥768), masaüstü (≥1024), geniş (≥1280).
Menü mobilde hamburger; masaüstünde yatay + açılır (dropdown) alt menüler.
Grid'ler mobilde tek sütuna insin (hizmet kartları 1 → 2 → 3 sütun).
Görseller next/image ile, sizes verilerek optimize.
Dokunma hedefleri yeterli büyüklükte, yatay kaydırma olmayacak.
SEO (ÖNCELİK — her kararda önce bunu düşün)
SSR/SSG: Sayfalar sunucuda render edilecek (Server Components + Payload Local API). İçerik ilk HTML'de gelmeli; client-side'da sonradan basılmayacak.
Semantik HTML: <header> <nav> <main> <section> <article> <footer>, tek <h1>/sayfa, başlık hiyerarşisi düzgün.
Sayfa metadata'sı: Her sayfada generateMetadata ile title + description + canonical + OpenGraph + Twitter card. Dinamik sayfalarda (hizmet/haber) veriden üretilecek.
sitemap.ts (tüm statik + dinamik URL'ler) ve robots.ts.
JSON-LD schema.org: Site geneli Organization; iletişimde LocalBusiness (ad, adres, telefon, coğrafi konum, çalışma saatleri — placeholder); hizmet sayfalarında Service; haberlerde Article; sayfalarda BreadcrumbList.
Erişilebilirlik: alt metinleri, aria-label'lar, odak görünürlüğü, renk kontrastı.
Temiz, Türkçe-uyumlu slug'lar (/hizmetler/iso-27001-bilgi-guvenligi).
Performans: gereksiz JS yok, fontlar next/font ile, görseller optimize, iyi Core Web Vitals.
4. Renk Paleti — Soğuk Mavi/Beyaz ("Güven & Güvenlik")

ISO/güvenlik/standart temasına uygun; soğuk, kurumsal, temiz. Beyaz zemin + derin mavi + soğuk camgöbeği vurgu + koyu lacivert (footer/koyu bölümler). Bu token'ları hem CSS değişkeni hem Tailwind teması olarak kur ve her yerde tutarlı kullan.

css
:root {
  /* Zeminler */
  --color-bg:          #FFFFFF; /* ana zemin */
  --color-bg-soft:     #F4F8FC; /* açık soğuk gri-mavi: bölüm ayrımı, kart arkası */
  --color-bg-muted:    #E8F1FA; /* biraz daha belirgin açık mavi zemin */

  /* Marka mavileri */
  --color-primary:     #0C3C78; /* ana marka mavisi (derin, güven veren) */
  --color-primary-dark:#082A57; /* hover / koyu ton */
  --color-primary-soft:#E8F1FA; /* çok açık mavi (etiket/rozet zemini) */

  /* Vurgu (soğuk camgöbeği) */
  --color-accent:      #1592B5; /* CTA vurgusu, ikon/altçizgi vurgusu */
  --color-accent-dark: #0F7091;

  /* Koyu bölümler */
  --color-navy:        #0A1F3C; /* footer zemini, koyu şeritler */

  /* Metin */
  --color-text:        #0F1F33; /* ana metin (koyu lacivert-gri) */
  --color-text-muted:  #556579; /* ikincil metin */
  --color-text-invert: #FFFFFF; /* koyu zemin üstü metin */

  /* Çizgi / detay */
  --color-border:      #D5E2F0; /* kart ve ayraç çizgileri */
  --color-link:        #1560BD; /* metin içi bağlantı */
}

Kullanım kuralları:

Zemin ağırlıklı beyaz; bölümleri --color-bg-soft ile ayır (zebra etkisi).
Butonlar/başlık vurguları --color-primary; ikincil aksiyon/hover --color-accent.
Footer --color-navy zemin, beyaz metin.
Hero üzerinde koyu maviye çalan degrade + beyaz metin (okunabilirlik için karartma katmanı).
Kartlar: beyaz zemin, --color-border ince kenarlık, hafif ve soğuk gölge.
Genel his: temiz, ferah, kurumsal, "soğuk". Sıcak renk (turuncu/kırmızı/sarı) kullanma; gerekiyorsa yalnızca durum renkleri (hata/başarı) için nötr yeşil/kırmızı.

Tipografi: Modern, okunaklı bir sans-serif (ör. Inter) — next/font ile. Başlıklar kalın ve net; gövde rahat okunur satır yüksekliğiyle.

Yönetim paneli (Payload admin) teması: TAMAMLANDI. Panel arayüzü aynı soğuk mavi/beyaz paletle markalandı ve Türkçeleştirildi. Panele dokunurken şu kurallara uy:

Panel arayüz dili Türkçe (`i18n.fallbackLanguage: 'tr'`, desteklenenler `tr` + `en`). Yeni alan/koleksiyon eklerken `label`, `admin.description` ve `admin.placeholder` alanlarını Türkçe ve teknik olmayan bir dille doldur — panelin kullanıcısı editördür, geliştirici değil.
Panel stilleri `src/app/(payload)/custom.scss` içindedir. Payload kendi CSS'ini `@layer payload-default` / `@layer payload` katmanlarına yazar; bu dosya katmansızdır ve bu yüzden `!important` olmadan üstün gelir — katmansız kalmasına dikkat et.
Renkler `--color-base-*`, `--color-success-*` ve `--color-error-*` rampaları üzerinden ezilir; tek tek bileşen rengi yazmak yerine önce rampayı düşün.
Panele özel React bileşenleri `src/admin/components/` altındadır (marka işareti, giriş ekranı metni, menü kısayolu, karşılama panosu). Bileşen ekleyip `payload.config.ts` içinde yol ile referans verdikten sonra `payload generate:importmap` çalıştırmayı unutma.
Eklenti eklediğin koleksiyonları sonradan düzenleyecek bir plugin yazarsan `order` değerini o eklentininkinden büyük ver (Payload eklentileri `order ?? 0`'a göre sıralar; ör. `@payloadcms/plugin-mcp` = 10).

5. Site Haritası (kurulacak sayfalar)
Ana Sayfa — /
Hakkımızda — /hakkimizda
Hizmetlerimiz (dinamik detay sayfaları) — /hizmetler/[slug] Başlangıç hizmetleri (temsili, kullanıcı sonra düzenler):
ISO 27001 Bilgi Güvenliği Yönetim Sistemi
ISO 9001 Kalite Yönetim Sistemi
ISO 14001 Çevre Yönetim Sistemi
ISO 45001 İş Sağlığı ve Güvenliği Yönetim Sistemi
ISO 27701 Kişisel Veri Yönetim Sistemi
KVKK Uyum Danışmanlığı
KVKK Teknik Gereksinim Çözümleri
Eğitim ve Seminer Hizmetleri
SGK Teşvik Danışmanlığı (Bir de opsiyonel /hizmetler liste sayfası yap.)
Etkinlikler / Projeler — liste /etkinlikler, detay /etkinlikler/[slug]
Medya / Galeri — /galeri (foto galeri; video bölümü opsiyonel)
Haberler / Blog — liste /haberler, detay /haberler/[slug]
İletişim — /iletisim
Kurumsal / Yasal sayfalar (statik içerik, pages koleksiyonundan):
/kvkk-aydinlatma-metni
/cerez-politikasi
/kvkk-basvuru-formu
/kvkk-rehberleri
SSS — /sss
6. Sayfa İskeletleri (bölüm bölüm)
6.1 Header (tüm sayfalarda, sabit/sticky)
Üst bar (ince şerit): solda adres + telefon (placeholder); sağda "Haberler", "İletişim" linkleri + e-posta + sosyal medya ikonları (Facebook, X, LinkedIn, Instagram).
Ana bar: solda logo (placeholder); sağda yatay menü: Ana Sayfa · Kurumsal ▾ · Hizmetlerimiz ▾ · Etkinliklerimiz · Medya · İletişim
belirgin bir "İletişim / Teklif Al" butonu (accent renkte).
Kurumsal ▾ alt menü: Hakkımızda, KVKK Aydınlatma Metni, KVKK Başvuru Formu, Çerez Politikası, KVKK Rehberleri.
Hizmetlerimiz ▾ alt menü: Bölüm 5'teki 9 hizmet.
Mobilde: hamburger menü, açılır panel, alt menüler açılabilir (accordion).
6.2 Footer (tüm sayfalarda)
Üst kısım: logo (açık/ters versiyon) + sosyal medya ikonları.
Sütunlar:
Hızlı Linkler: Ana Sayfa, Hakkımızda, Haberler, Galeri, SSS, İletişim
İletişim: adres, telefon, e-posta (placeholder)
Faydalı Linkler: ilgili resmî kaynaklara dış bağlantılar (placeholder linkler)
Alt şerit: telif satırı ("© [YIL] [Firma Adı]. Tüm hakları saklıdır.").
Zemin: --color-navy, beyaz metin.
6.3 Ana Sayfa (/)
Hero slider — tam genişlik, 3–4 slayt. Her slaytta: arkaplan görseli (koyu degrade katmanlı) + başlık (H2) + kısa açıklama + CTA butonu. Otomatik geçiş, ok ve nokta göstergeleri. Örnek slayt konuları: Bilgi Güvenliği Danışmanlığı, KVKK Danışmanlığı, Teknik Gereksinim Çözümleri, Eğitim Hizmetleri.
Hakkımızda özeti — iki sütun: solda görsel, sağda başlık ("Firmamız Kimdir?")
kısa tanıtım paragrafı + "Hakkımızda" butonu.
Hizmetlerimiz — başlık + hizmet kartları grid'i (Payload services'ten çekilir). Her kart: görsel, başlık, 1–2 satır açıklama, "Devamı →" linki (detay sayfasına). Mobil 1, tablet 2, masaüstü 3 sütun.
Etkinlikler / Projeler — başlık + proje kartları (görsel + başlık) yatay şerit/carousel.
CTA şeridi — koyu mavi zeminli, "Teklif alın / bize ulaşın" çağrısı + buton.
6.4 Hakkımızda (/hakkimizda)
Breadcrumb (BreadcrumbList schema).
H1 + kapak görseli.
Firma tanıtım metni (temsili). İsteğe bağlı: Misyon / Vizyon / Değerler blokları, "neden biz" maddeleri, sayısal göstergeler (yıl, müşteri sayısı — placeholder).
6.5 Hizmet Detay (/hizmetler/[slug]) — dinamik
Breadcrumb: Ana Sayfa › Hizmetler › [Hizmet].
H1 (hizmet adı) + kapak görseli.
İçerik alanı (Payload richText): açıklamalar, alt başlıklar, madde listeleri.
Yan panel (sidebar): "Hizmetlerimiz" listesi (diğer hizmetlere linkler) + bir "Hemen Teklif Al" kutusu (WhatsApp + Telefon + form linki).
Alt CTA: teklif/iletişim çağrısı.
generateMetadata ile SEO; Service + BreadcrumbList JSON-LD.
(/hizmetler liste sayfası: tüm hizmet kartları grid.)
6.6 Etkinlikler / Projeler
Liste (/etkinlikler): proje kartları grid (görsel + başlık + kısa açıklama + link).
Detay (/etkinlikler/[slug]): breadcrumb, H1, görsel(ler)/galeri, içerik metni, tarih.
6.7 Medya / Galeri (/galeri)
Foto galeri: responsive grid + lightbox (tıklayınca büyüt).
(Opsiyonel) Video galeri sekmesi.
6.8 Haberler / Blog
Liste (/haberler): haber kartları (görsel, başlık, tarih, özet, "Devamı →"). Sayfalama.
Detay (/haberler/[slug]): breadcrumb, H1, tarih, kapak görseli, içerik, paylaş butonları. Article + BreadcrumbList JSON-LD.
6.9 İletişim (/iletisim)
Breadcrumb + H1.
İki sütun: solda iletişim bilgileri (adres, telefon, WhatsApp, e-posta, çalışma saatleri — placeholder) + sosyal medya; sağda iletişim formu.
Form alanları: Ad Soyad, E-posta, Telefon, Konu, Mesaj + KVKK onay kutusu (zorunlu). Gönderim: Payload'a kayıt + e-posta bildirimi (ör. Resend/Nodemailer; ücretsiz/uygun olanı seç). Doğrulama ve başarı/hata mesajları.
Google Harita gömülü (placeholder konum).
LocalBusiness JSON-LD.
6.10 Kurumsal / Yasal Sayfalar
pages koleksiyonundan gelen basit içerik sayfaları: breadcrumb + H1 + richText.
Sayfalar: KVKK Aydınlatma Metni, Çerez Politikası, KVKK Başvuru Formu, KVKK Rehberleri.
Ayrıca: siteye çerez onay banner'ı (KVKK/çerez uyumu) ekle.
6.11 SSS (/sss)
Accordion soru-cevap listesi (faq koleksiyonundan). FAQPage JSON-LD (opsiyonel).
7. Payload İçerik Modelleri (Collections & Globals)

Tüm içerik türleri panelden yönetilebilir olacak. Erişim: herkese read: () => true (site göstereceği için), yazma yalnızca giriş yapmış kullanıcıya.

Collections:

media (upload) — Vercel Blob'a yüklenir; alt alanı zorunlu (SEO/erişilebilirlik).
services (Hizmetler): title, slug, excerpt (kısa açıklama), coverImage (→ media), content (richText), order (sıralama), seo (plugin alanları).
posts (Haberler): title, slug, publishedDate, coverImage, excerpt, content (richText), seo.
projects (Etkinlikler): title, slug, coverImage, gallery (media dizisi), content (richText), date.
pages (Statik/Yasal): title, slug, content (richText), seo.
faq (SSS): question, answer (richText), order.
contactSubmissions (İletişim formu kayıtları): name, email, phone, subject, message, createdAt. (Panelden okunur.)

Globals:

siteSettings: logo (→ media), favicon, site adı, varsayılan SEO.
contactInfo: adres, telefon, whatsapp, e-posta, çalışma saatleri, harita gömme kodu/koordinat, sosyal medya linkleri. (Header, footer, iletişim sayfası buradan besleniyor.)
navigation (opsiyonel): menü öğeleri (istenirse menü de panelden yönetilebilir).

Not: Alan adlarını ve etiketleri (label) Türkçe ver ki panel Türkçe okunsun.

8. Çalışma Şekli (Claude Code için yönerge)
Küçük adımlarla ilerle, her adımdan sonra derle/çalıştır ve sonucu doğrula. Tek seferde tüm siteyi üretmeye çalışma.
Önerilen sıra:
Payload + Next.js kurulumu (Postgres/Neon), .env, ilk admin, panelin açılması.
Collections + Globals'ı tanımla; birkaç temsili kayıt gir.
Global düzen: Header + Footer + Tailwind + renk token'ları + tipografi.
Ana sayfa (bölümleriyle), veriyi Payload'dan çekerek.
Hizmet detay (dinamik) + liste; sonra Haberler, Etkinlikler, Galeri.
İletişim (form + harita + e-posta) + yasal sayfalar + SSS + çerez banner'ı.
SEO katmanı: metadata, sitemap.ts, robots.ts, JSON-LD, OpenGraph.
Vercel Blob yapılandırması + deploy hazırlığı (migration, build ayarları).
Her sayfada responsive ve SEO kontrolünü atlama (Bölüm 3).
Kararsız kaldığın yerde önce kısa bir plan sun, sonra uygula.
Kod açık, tiplenmiş (TypeScript) ve yeniden kullanılabilir bileşenlere bölünmüş olsun (Header, Footer, ServiceCard, Hero, Section, PostCard, ContactForm, Breadcrumbs, vb.).
9. Şimdilik YAPILMAYACAKLAR
Panelde rol/yetki ayrımı (şimdilik giriş yapan herkes tam yetkili).
Çok dillilik (şimdilik yalnızca Türkçe).
E-ticaret / sepet / ödeme.
Gerçek firma bilgileri, gerçek metinler, gerçek görseller (hepsi placeholder; kullanıcı sonradan girecek). Referans sitenin metin/görsel/iletişim bilgilerini birebir kopyalama.
10. Özet (tek cümle)

Beyaz/soğuk-mavi paletli, tamamen responsive, SEO öncelikli, Payload CMS ile yönetilebilen, Vercel + Neon + Vercel Blob (ücretsiz katmanlar) üzerinde yayınlanacak, klasik kurumsal danışmanlık düzeninde çok sayfalı bir ISO belgelendirme tanıtım sitesi; içerikler temsili (sonra değiştirilecek), yönetim paneli aynı paletle markalanmış ve tamamen Türkçedir.