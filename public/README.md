# public/ — sabit dosyalar

Bu klasördeki dosyalar **repoya girer** ve kodla birlikte sunucuya taşınır.
Buraya bir dosya koyup commit ederseniz canlıda da görünür.

Panelden (Medya Kütüphanesi) yüklenen görseller **buraya gelmez** — onlar
sunucunun diskinde ayrı bir klasörde yaşar. İkisini karıştırmayın:

| | `public/` | Panel / Medya Kütüphanesi |
| --- | --- | --- |
| Dosyayı kim koyar | Geliştirici, elle | Müşteri, panelden |
| Nerede durur | Repo (git) | Sunucunun diski (`MEDIA_DIR`) |
| Nasıl canlıya çıkar | `git push` + deploy | Yüklendiği anda |
| Ne için | Logo, favicon, sabit görseller | Blog kapağı, hizmet görseli, içerik |

## Tanınan dosya adları

Aşağıdaki adlarla dosya koyarsanız site onları otomatik kullanır. Hiçbiri
zorunlu değildir; koymazsanız yazı tabanlı yer tutucu logo görünür.

| Dosya | Nerede kullanılır |
| --- | --- |
| `logo.svg` / `logo.png` / `logo.webp` | Üst menü (beyaz zemin) |
| `logo-beyaz.svg` / `logo-beyaz.png` / `logo-beyaz.webp` | Footer (lacivert zemin) |
| `favicon.svg` / `favicon.ico` / `favicon.png` | Tarayıcı sekmesi simgesi |

Aynı türden birden fazla dosya varsa yukarıdaki sıra geçerlidir (önce `.svg`).

**Öncelik:** Panelde logo yüklüyse panel kazanır. Bu klasördeki dosyalar
yalnızca panel boşken devreye girer.

## Notlar

- **Koyu zemin logosu ayrı olmalı.** `logo-beyaz.*` yoksa footer, açık zemin
  logosunu kullanmaz (lacivert üzerinde okunmaz) — yazı logosuna düşer.
- **Kenar boşluğu dert değil.** Logo dosyalarının çevresinde genelde şeffaf boşluk
  olur; bu boşluk yükseklikle birlikte ölçeklendiği için logo olduğundan küçük
  görünürdü. Site artık dosyanın içindeki görünür alanı ölçüp boşluğu CSS ile
  kırpıyor — dosyayı elden geçirmenize gerek yok, olduğu gibi atın.
- **Yeni dosya ekledikten sonra** `pnpm dev`'i yeniden başlatın; dosya varlığı
  sunucu açılırken bir kez okunur.
- `favicon.svg` şu an yer tutucudur (lacivert kare + beyaz onay işareti).
  Gerçek simgeyle değiştirin.
