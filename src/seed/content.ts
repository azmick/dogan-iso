import { doc, h, ol, p, ul } from './lexical'

/**
 * TEMSİLİ İÇERİK — hiçbir gerçek firmaya ait bilgi içermez.
 * Kullanıcı bu metinleri yönetim panelinden kendi içerikleriyle değiştirecektir.
 */

export const services = [
  {
    title: 'ISO 27001 Bilgi Güvenliği Yönetim Sistemi',
    excerpt:
      'Bilgi varlıklarınızı sınıflandırıyor, risk analizini yapıyor ve ISO 27001 belgelendirme denetimine hazır hâle getiriyoruz.',
    order: 10,
    content: doc(
      p(
        'ISO 27001, kuruluşların bilgi varlıklarını gizlilik, bütünlük ve erişilebilirlik ilkeleri çerçevesinde korumasını sağlayan uluslararası bir yönetim sistemi standardıdır. Standart; teknolojik tedbirlerin yanında süreç, insan ve fiziksel güvenlik boyutlarını da kapsar.',
      ),
      h('h2', 'Kapsam ve Yaklaşımımız'),
      p(
        'Denetim öncesinde kuruluşunuzun süreç haritasını çıkarıyor, bilgi varlıklarını kritiklik seviyelerine göre sınıflandırıyoruz. Ardından risk işleme planınızı standardın Ek-A kontrolleriyle eşleştirerek uygulanabilir bir yol haritası oluşturuyoruz.',
      ),
      ul([
        'Bilgi varlık envanteri ve sınıflandırma çalışması',
        'Risk değerlendirme ve risk işleme planı',
        'Ek-A kontrollerine yönelik boşluk analizi',
        'Zorunlu dokümantasyonun hazırlanması',
        'İç denetim ve yönetimin gözden geçirmesi desteği',
        'Belgelendirme denetimi ve gözetim denetimleri',
      ]),
      h('h2', 'Belgelendirme Süreci'),
      ol([
        'Başvuru ve kapsam belirleme görüşmesi',
        'Aşama 1 denetimi: doküman ve hazırlık incelemesi',
        'Aşama 2 denetimi: uygulamanın sahada doğrulanması',
        'Uygunsuzlukların kapatılması ve belgelendirme kararı',
        'Yıllık gözetim denetimleri ve üç yılda bir yeniden belgelendirme',
      ]),
      h('h2', 'Kuruluşunuza Katkısı'),
      p(
        'Sertifikanın ötesinde; olay müdahale süreçlerinin netleşmesi, tedarikçi güvenliğinin izlenebilir hâle gelmesi ve müşteri sözleşmelerindeki güvenlik taahhütlerinin belgelenebilmesi gibi somut kazanımlar sağlanır.',
      ),
    ),
  },
  {
    title: 'ISO 9001 Kalite Yönetim Sistemi',
    excerpt:
      'Süreçlerinizi müşteri memnuniyeti odağında yapılandırarak ISO 9001 kalite yönetim sistemi belgelendirmesini tamamlıyoruz.',
    order: 20,
    content: doc(
      p(
        'ISO 9001, kuruluşların ürün ve hizmet kalitesini tutarlı biçimde sağlamasını hedefleyen, süreç yaklaşımı ve risk temelli düşünme üzerine kurulu bir yönetim sistemi standardıdır.',
      ),
      h('h2', 'Neleri Ele Alıyoruz?'),
      ul([
        'Kuruluş bağlamı ve ilgili taraf beklentilerinin belirlenmesi',
        'Süreç haritası, girdi-çıktı ve performans göstergeleri',
        'Doküman ve kayıt yönetiminin sadeleştirilmesi',
        'Tedarikçi değerlendirme ve satın alma kontrolleri',
        'Müşteri geri bildirimi ve şikâyet yönetimi',
        'Düzeltici faaliyet ve sürekli iyileştirme döngüsü',
      ]),
      h('h2', 'Denetim Yaklaşımımız'),
      p(
        'Denetimlerimizi kâğıt üzerindeki uygunluğu değil, sahadaki uygulamayı esas alarak yürütürüz. Bulguları yalnızca uygunsuzluk olarak raporlamakla kalmaz, iyileştirme fırsatlarını da açıkça belirtiriz.',
      ),
    ),
  },
  {
    title: 'ISO 14001 Çevre Yönetim Sistemi',
    excerpt:
      'Çevresel boyut ve etki analizinden yasal uygunluk değerlendirmesine kadar ISO 14001 sürecinizin tamamını yönetiyoruz.',
    order: 30,
    content: doc(
      p(
        'ISO 14001, kuruluşların faaliyetlerinden kaynaklanan çevresel etkileri sistematik biçimde yönetmesini ve yasal yükümlülüklerini izlenebilir şekilde yerine getirmesini sağlar.',
      ),
      h('h2', 'Çalışma Başlıkları'),
      ul([
        'Çevresel boyut ve etki değerlendirmesi',
        'Yasal ve diğer şartların takip sistemi',
        'Atık yönetimi, emisyon ve deşarj kontrolleri',
        'Enerji ve doğal kaynak tüketiminin izlenmesi',
        'Acil durum hazırlığı ve müdahale planları',
        'Çevresel performans göstergelerinin belirlenmesi',
      ]),
      h('h2', 'Yasal Uygunluk'),
      p(
        'Yürürlükteki çevre mevzuatı kapsamında kuruluşunuzun yükümlülüklerini listeler, uygunluk durumunu değerlendirir ve eksiklikler için önceliklendirilmiş bir aksiyon planı sunarız.',
      ),
    ),
  },
  {
    title: 'ISO 45001 İş Sağlığı ve Güvenliği Yönetim Sistemi',
    excerpt:
      'Tehlike tanımlama ve risk değerlendirmesinden çalışan katılımına kadar ISO 45001 gerekliliklerini sahada uygulanabilir hâle getiriyoruz.',
    order: 40,
    content: doc(
      p(
        'ISO 45001, iş kazalarını ve meslek hastalıklarını önlemeye yönelik proaktif bir yönetim sistemi kurar. Standart, çalışan katılımını sistemin merkezine yerleştirmesiyle öne çıkar.',
      ),
      h('h2', 'Uygulama Adımları'),
      ul([
        'Tehlike tanımlama ve risk değerlendirme metodolojisi',
        'Yasal gereklilikler ve uygunluk değerlendirmesi',
        'Çalışan temsilcisi katılım mekanizmaları',
        'Acil durum planları ve tatbikat programı',
        'Olay/ramak kala bildirim ve kök neden analizi',
        'İSG performans göstergelerinin izlenmesi',
      ]),
      h('h2', 'Denetimde Nelere Bakıyoruz?'),
      p(
        'Saha denetimlerinde risk değerlendirmelerinin güncelliğini, alınan tedbirlerin uygulamadaki karşılığını ve çalışanların sisteme dair farkındalık düzeyini birlikte değerlendiririz.',
      ),
    ),
  },
  {
    title: 'ISO 27701 Kişisel Veri Yönetim Sistemi',
    excerpt:
      'ISO 27001 üzerine kurulan ISO 27701 ile kişisel veri işleme süreçlerinizi uluslararası mahremiyet standardına uyumlu hâle getiriyoruz.',
    order: 50,
    content: doc(
      p(
        'ISO 27701, ISO 27001 bilgi güvenliği yönetim sistemini mahremiyet gereklilikleriyle genişleten bir eklenti standarttır. Veri sorumlusu ve veri işleyen rolleri için ayrı kontrol setleri tanımlar.',
      ),
      h('h2', 'Kapsam'),
      ul([
        'Kişisel veri işleme envanterinin oluşturulması',
        'Veri sorumlusu / veri işleyen rol ayrımının netleştirilmesi',
        'İlgili kişi başvuru süreçlerinin kurgulanması',
        'Veri saklama ve imha politikalarının hazırlanması',
        'Yurt dışına veri aktarımı değerlendirmesi',
        'KVKK ve GDPR ile eşleştirme çalışması',
      ]),
      h('h2', 'KVKK ile İlişkisi'),
      p(
        'ISO 27701 sertifikası tek başına KVKK uyumluluğu anlamına gelmez; ancak uyum çalışmalarınızı uluslararası kabul görmüş bir çerçeveye oturtarak denetlenebilir kılar.',
      ),
    ),
  },
  {
    title: 'KVKK Uyum Danışmanlığı',
    excerpt:
      'Veri envanterinden aydınlatma metinlerine, VERBİS bildiriminden ihlal yönetimine kadar KVKK uyum sürecinizi uçtan uca kurguluyoruz.',
    order: 60,
    content: doc(
      p(
        '6698 sayılı Kişisel Verilerin Korunması Kanunu, kişisel veri işleyen tüm kuruluşlara idari ve teknik yükümlülükler getirir. Uyum çalışması tek seferlik bir proje değil, sürdürülebilir bir yönetim süreci olarak ele alınmalıdır.',
      ),
      h('h2', 'Hizmet Adımlarımız'),
      ol([
        'Mevcut durum analizi ve veri akış haritasının çıkarılması',
        'Kişisel veri işleme envanterinin hazırlanması',
        'Aydınlatma metinleri ve açık rıza formlarının düzenlenmesi',
        'Saklama ve imha politikası ile periyodik imha takvimi',
        'VERBİS kayıt ve bildirim desteği',
        'Veri ihlali müdahale prosedürünün oluşturulması',
        'Çalışan farkındalık eğitimleri',
      ]),
      h('h2', 'Sürdürülebilirlik'),
      p(
        'Uyum sonrası dönemde de yanınızdayız: mevzuat değişikliklerini takip eder, yeni süreçlerinizin veri işleme boyutunu değerlendirir ve dokümantasyonunuzu güncel tutarız.',
      ),
    ),
  },
  {
    title: 'KVKK Teknik Gereksinim Çözümleri',
    excerpt:
      'Log yönetimi, yetkilendirme matrisi, veri maskeleme ve sızma testi gibi teknik tedbirleri kurumunuzun altyapısına uygun şekilde kurguluyoruz.',
    order: 70,
    content: doc(
      p(
        'KVKK kapsamındaki teknik tedbirler, kişisel verilerin hukuka aykırı erişim ve işlemeye karşı korunmasını sağlar. Bu tedbirlerin kuruluşun altyapısına ve risk düzeyine uygun seçilmesi gerekir.',
      ),
      h('h2', 'Teknik Tedbir Başlıkları'),
      ul([
        'Kimlik doğrulama ve yetkilendirme matrisi',
        'Merkezî log yönetimi ve kayıt bütünlüğü',
        'Veri maskeleme ve anonimleştirme uygulamaları',
        'Yedekleme, saklama ve güvenli imha altyapısı',
        'Ağ güvenliği ve uç nokta koruması',
        'Sızma testi ve zafiyet tarama programı',
        'Şifreleme politikaları ve anahtar yönetimi',
      ]),
      h('h2', 'Raporlama'),
      p(
        'Yapılan her teknik çalışma; bulgular, risk seviyesi ve önerilen aksiyonlar şeklinde raporlanır. Bu raporlar denetimlerde kanıt olarak kullanılabilecek biçimde hazırlanır.',
      ),
    ),
  },
  {
    title: 'Eğitim ve Seminer Hizmetleri',
    excerpt:
      'Baş denetçi, iç denetçi ve farkındalık eğitimleriyle ekiplerinizin standartları doğru yorumlamasını ve uygulamasını sağlıyoruz.',
    order: 80,
    content: doc(
      p(
        'Eğitim programlarımız, katılımcıların standardı ezberlemesini değil kendi süreçlerinde uygulayabilmesini hedefler. Bu nedenle her eğitim, kuruluşun sektörüne göre uyarlanmış örnek vakalarla desteklenir.',
      ),
      h('h2', 'Eğitim Başlıklarımız'),
      ul([
        'ISO 27001 iç denetçi ve baş denetçi eğitimi',
        'ISO 9001 kalite yönetim sistemi temel eğitimi',
        'ISO 14001 ve ISO 45001 entegre yönetim sistemi eğitimi',
        'KVKK farkındalık ve veri güvenliği eğitimi',
        'Risk yönetimi ve iş sürekliliği semineri',
        'Yönetim sistemleri dokümantasyon atölyesi',
      ]),
      h('h2', 'Eğitim Formatları'),
      p(
        'Eğitimler kurum içi (yüz yüze), uzaktan canlı veya karma formatta düzenlenebilir. Katılımcılara eğitim sonunda katılım belgesi düzenlenir.',
      ),
    ),
  },
  {
    title: 'SGK Teşvik Danışmanlığı',
    excerpt:
      'Yararlanabileceğiniz SGK teşviklerini tespit ediyor, geriye dönük hak kayıplarını inceliyor ve başvuru süreçlerini yönetiyoruz.',
    order: 90,
    content: doc(
      p(
        'İşverenlere sunulan SGK teşvikleri, doğru tespit ve zamanında başvuru yapıldığında istihdam maliyetlerinde önemli bir azalma sağlar. Uygulamada teşviklerin bir kısmı bilgi eksikliği nedeniyle kullanılmamaktadır.',
      ),
      h('h2', 'Çalışma Kapsamımız'),
      ul([
        'Mevcut bordro ve sigortalı verilerinin incelenmesi',
        'Yararlanılabilecek teşviklerin tespiti',
        'Geriye dönük teşvik hak kaybı analizi',
        'Başvuru ve bildirim süreçlerinin yürütülmesi',
        'Teşvik uygunluk şartlarının sürekli takibi',
        'Dönemsel raporlama ve bilgilendirme',
      ]),
      h('h2', 'Gizlilik'),
      p(
        'Çalışan ve bordro verileri kişisel veri niteliğindedir. Tüm inceleme süreçlerimiz gizlilik sözleşmesi kapsamında ve KVKK gerekliliklerine uygun şekilde yürütülür.',
      ),
    ),
  },
]

export const pages = [
  {
    title: 'KVKK Aydınlatma Metni',
    slug: 'kvkk-aydinlatma-metni',
    menuOrder: 10,
    excerpt:
      '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla hazırlanan aydınlatma metni.',
    content: doc(
      p(
        'Bu metin temsilidir. Yayına almadan önce kendi veri işleme süreçlerinize göre hukuk danışmanınızla birlikte düzenlemeniz gerekir.',
      ),
      h('h2', 'Veri Sorumlusunun Kimliği'),
      p(
        '6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla kuruluşumuz tarafından aşağıda açıklanan kapsamda işlenmektedir.',
      ),
      h('h2', 'İşlenen Kişisel Veriler'),
      ul([
        'Kimlik bilgileri: ad, soyad',
        'İletişim bilgileri: e-posta adresi, telefon numarası',
        'Müşteri işlem bilgileri: talep ve şikâyet kayıtları',
        'İşlem güvenliği bilgileri: IP adresi, çerez kayıtları',
      ]),
      h('h2', 'İşleme Amaçları'),
      ul([
        'Talep ve başvuruların değerlendirilmesi ve sonuçlandırılması',
        'Hizmet süreçlerinin yürütülmesi ve sözleşmesel yükümlülüklerin yerine getirilmesi',
        'İletişim faaliyetlerinin yürütülmesi',
        'Yasal yükümlülüklerin yerine getirilmesi',
      ]),
      h('h2', 'Hukuki Sebepler'),
      p(
        'Kişisel verileriniz; Kanun’un 5. maddesinde belirtilen sözleşmenin kurulması veya ifası, hukuki yükümlülüğün yerine getirilmesi ve veri sorumlusunun meşru menfaati hukuki sebeplerine dayanılarak işlenmektedir.',
      ),
      h('h2', 'İlgili Kişinin Hakları'),
      p(
        'Kanun’un 11. maddesi kapsamındaki haklarınıza ilişkin taleplerinizi, KVKK Başvuru Formu sayfamızdaki yöntemlerle kuruluşumuza iletebilirsiniz.',
      ),
    ),
  },
  {
    title: 'Çerez Politikası',
    slug: 'cerez-politikasi',
    menuOrder: 20,
    excerpt:
      'Web sitemizde kullanılan çerez türleri, kullanım amaçları ve çerez tercihlerinizi yönetme yöntemleri.',
    content: doc(
      p('Bu metin temsilidir ve yayına almadan önce güncellenmelidir.'),
      h('h2', 'Çerez Nedir?'),
      p(
        'Çerezler, ziyaret ettiğiniz web siteleri tarafından tarayıcınıza kaydedilen küçük metin dosyalarıdır. Sitenin düzgün çalışmasını sağlamak ve kullanıcı deneyimini iyileştirmek için kullanılır.',
      ),
      h('h2', 'Kullanılan Çerez Türleri'),
      ul([
        'Zorunlu çerezler: Sitenin temel işlevleri için gereklidir, devre dışı bırakılamaz.',
        'Tercih çerezleri: Dil ve görünüm gibi seçimlerinizi hatırlar.',
        'İstatistik çerezleri: Sayfa ziyaretlerinin anonim olarak ölçülmesini sağlar.',
      ]),
      h('h2', 'Çerez Tercihlerinizi Yönetme'),
      p(
        'Sitemizin alt kısmında görüntülenen çerez bilgilendirme bandı üzerinden tercihinizi belirtebilir; ayrıca tarayıcınızın ayarlar bölümünden çerezleri silebilir veya engelleyebilirsiniz.',
      ),
    ),
  },
  {
    title: 'KVKK Başvuru Formu',
    slug: 'kvkk-basvuru-formu',
    menuOrder: 30,
    excerpt:
      'Kanun’un 11. maddesi kapsamındaki haklarınıza ilişkin başvurularınızı nasıl yapabileceğinizi açıklayan bilgilendirme.',
    content: doc(
      p('Bu metin temsilidir ve yayına almadan önce güncellenmelidir.'),
      h('h2', 'Başvuru Hakkınız'),
      p(
        '6698 sayılı Kanun’un 11. maddesi uyarınca kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, düzeltilmesini veya silinmesini isteme haklarına sahipsiniz.',
      ),
      h('h2', 'Başvuru Yöntemleri'),
      ul([
        'Yazılı olarak, ıslak imzalı dilekçe ile şirket adresimize elden veya noter aracılığıyla',
        'Kayıtlı elektronik posta (KEP) adresi üzerinden',
        'Sistemimizde kayıtlı e-posta adresiniz üzerinden güvenli elektronik imza ile',
      ]),
      h('h2', 'Başvuruda Yer Alması Gereken Bilgiler'),
      ol([
        'Ad, soyad ve başvuru yazılı ise imza',
        'Türkiye Cumhuriyeti vatandaşları için T.C. kimlik numarası',
        'Tebligata esas yerleşim yeri veya iş yeri adresi',
        'Varsa bildirime esas elektronik posta adresi ve telefon numarası',
        'Talep konusu ve konuya ilişkin bilgi ve belgeler',
      ]),
      h('h2', 'Sonuçlandırma Süresi'),
      p(
        'Başvurularınız, talebin niteliğine göre en kısa sürede ve en geç otuz gün içinde ücretsiz olarak sonuçlandırılır. İşlemin ayrıca bir maliyet gerektirmesi hâlinde Kurul tarafından belirlenen tarifedeki ücret alınabilir.',
      ),
    ),
  },
  {
    title: 'KVKK Rehberleri',
    slug: 'kvkk-rehberleri',
    menuOrder: 40,
    excerpt:
      'Kişisel verilerin korunması alanındaki temel kavramlar ve kuruluşlar için uygulama rehberleri.',
    content: doc(
      p('Bu sayfadaki içerik temsilidir ve bilgilendirme amaçlıdır.'),
      h('h2', 'Temel Kavramlar'),
      ul([
        'Kişisel veri: Kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgi',
        'Özel nitelikli kişisel veri: Sağlık, biyometrik veri, din, üye olunan dernek gibi bilgiler',
        'Veri sorumlusu: Veri işleme amaç ve vasıtalarını belirleyen kişi',
        'Veri işleyen: Veri sorumlusu adına veri işleyen kişi',
      ]),
      h('h2', 'Kuruluşlar İçin Uygulama Adımları'),
      ol([
        'Kişisel veri envanterinin çıkarılması',
        'İşleme amaçlarının ve hukuki sebeplerin belirlenmesi',
        'Aydınlatma yükümlülüğünün yerine getirilmesi',
        'Teknik ve idari tedbirlerin alınması',
        'Saklama ve imha politikasının uygulanması',
        'Periyodik denetim ve gözden geçirme',
      ]),
      h('h2', 'Sık Yapılan Hatalar'),
      ul([
        'Aydınlatma metni ile açık rıza metninin birleştirilmesi',
        'Veri envanterinin güncel tutulmaması',
        'İmha sürelerinin belirlenmemesi',
        'Tedarikçilerle veri işleyen sözleşmesi yapılmaması',
      ]),
    ),
  },
]

export const posts = [
  {
    title: 'ISO 27001 Belgelendirme Sürecinde Sık Yapılan 5 Hata',
    excerpt:
      'Belgelendirme denetimine hazırlanan kuruluşların en sık karşılaştığı uygunsuzlukları ve bunlardan kaçınma yollarını derledik.',
    daysAgo: 6,
    content: doc(
      p(
        'Belgelendirme denetimlerinde karşılaştığımız uygunsuzlukların büyük bölümü, standardın yanlış anlaşılmasından değil hazırlık aşamasının aceleye getirilmesinden kaynaklanıyor.',
      ),
      h('h2', '1. Risk değerlendirmesinin kâğıt üstünde kalması'),
      p(
        'Risk değerlendirmesi, bir kez doldurulup dosyalanan bir tablo değildir. Yeni bir uygulama devreye alındığında veya süreç değiştiğinde güncellenmesi gerekir.',
      ),
      h('h2', '2. Ek-A kontrollerinin gerekçesiz kapsam dışı bırakılması'),
      p(
        'Uygulanabilirlik bildirgesinde kapsam dışı bırakılan her kontrol için gerekçe sunulmalıdır. Gerekçesiz hariç tutmalar denetimde uygunsuzluk olarak değerlendirilir.',
      ),
      h('h2', '3. Tedarikçi güvenliğinin göz ardı edilmesi'),
      p(
        'Bulut hizmet sağlayıcıları ve dış kaynak kullanılan hizmetler, bilgi güvenliği kapsamının bir parçasıdır. Sözleşmelerde güvenlik şartlarının yer alması beklenir.',
      ),
      h('h2', '4. İç denetimin şekilsel yapılması'),
      p(
        'İç denetim, belgelendirme denetiminin provası olarak görülmelidir. Bulgusuz tamamlanan iç denetimler genellikle denetim derinliğinin yetersizliğine işaret eder.',
      ),
      h('h2', '5. Farkındalık eğitimlerinin kayıt altına alınmaması'),
      p(
        'Eğitimin yapılmış olması yeterli değildir; katılım kayıtları ve etkinlik değerlendirmesi de belgelenmelidir.',
      ),
    ),
  },
  {
    title: 'KVKK Uyum Çalışmalarında Veri Envanterinin Önemi',
    excerpt:
      'Kişisel veri işleme envanteri, uyum çalışmasının temelini oluşturur. Doğru bir envanterin nasıl hazırlanacağını anlatıyoruz.',
    daysAgo: 18,
    content: doc(
      p(
        'KVKK uyum projelerinde ilk adım her zaman veri envanteridir. Hangi verinin nerede, hangi amaçla ve ne kadar süreyle tutulduğu bilinmeden diğer yükümlülüklerin yerine getirilmesi mümkün değildir.',
      ),
      h('h2', 'Envanterde Bulunması Gerekenler'),
      ul([
        'Veri kategorisi ve veri konusu kişi grubu',
        'İşleme amacı ve hukuki sebep',
        'Aktarılan alıcı grupları ve aktarım amacı',
        'Azami saklama süresi ve imha yöntemi',
        'Alınan teknik ve idari tedbirler',
      ]),
      h('h2', 'Sahadan Bir Gözlem'),
      p(
        'Envanter çalışmalarında en çok atlanan alan, departmanların kendi oluşturduğu yerel dosyalar oluyor. Bu nedenle envanter görüşmelerini yalnızca bilgi işlem birimiyle değil, veriyi fiilen kullanan ekiplerle birlikte yürütmek gerekir.',
      ),
    ),
  },
  {
    title: 'Entegre Yönetim Sistemi Kurmanın Avantajları',
    excerpt:
      'ISO 9001, ISO 14001 ve ISO 45001 standartlarını tek bir yönetim sistemi altında birleştirmenin kuruluşa sağladığı kazanımlar.',
    daysAgo: 32,
    content: doc(
      p(
        'Yüksek seviye yapı (HLS) sayesinde yönetim sistemi standartları ortak bir madde düzeni kullanır. Bu durum, standartların ayrı ayrı değil entegre biçimde kurulmasını mümkün kılar.',
      ),
      h('h2', 'Başlıca Avantajlar'),
      ul([
        'Tek bir doküman seti ve ortak kayıt yapısı',
        'Denetim gün sayısında ve maliyette azalma',
        'Çalışanlar için sadeleşmiş, anlaşılır süreçler',
        'Risk ve fırsatların bütüncül değerlendirilmesi',
        'Yönetimin gözden geçirmesinde tek gündem',
      ]),
      h('h2', 'Dikkat Edilmesi Gerekenler'),
      p(
        'Entegrasyon, standartların kendine özgü gerekliliklerini görmezden gelmek anlamına gelmez. Çevresel boyut analizi veya İSG risk değerlendirmesi gibi standarda özgü çalışmalar ayrı ayrı sürdürülmelidir.',
      ),
    ),
  },
  {
    title: 'Gözetim Denetimlerine Nasıl Hazırlanılır?',
    excerpt:
      'Belge aldıktan sonraki yıllık gözetim denetimlerinde hangi kayıtların hazır olması gerektiğini adım adım açıklıyoruz.',
    daysAgo: 47,
    content: doc(
      p(
        'Belgelendirme denetimi tamamlandıktan sonra sistemin canlı tutulması gerekir. Gözetim denetimleri, bu sürekliliğin doğrulandığı aşamadır.',
      ),
      h('h2', 'Hazır Bulundurulması Gereken Kayıtlar'),
      ul([
        'Güncel iç denetim programı ve denetim raporları',
        'Yönetimin gözden geçirmesi toplantı kayıtları',
        'Düzeltici faaliyet kayıtları ve etkinlik değerlendirmeleri',
        'Güncellenmiş risk değerlendirmesi',
        'Eğitim ve yetkinlik kayıtları',
        'Müşteri şikâyetleri ve çözüm kayıtları',
      ]),
      h('h2', 'Sık Karşılaşılan Durum'),
      p(
        'Gözetim denetiminden birkaç hafta önce toplu şekilde oluşturulan kayıtlar, tarih tutarsızlıkları nedeniyle kolayca fark edilir. Kayıtların süreç işledikçe oluşturulması esastır.',
      ),
    ),
  },
  {
    title: 'Bilgi Güvenliği Farkındalık Eğitimleri Neden Zorunlu?',
    excerpt:
      'Teknik tedbirlerin en güçlü olduğu kuruluşlarda bile ihlallerin önemli bölümü insan kaynaklı. Farkındalık eğitiminin rolünü ele alıyoruz.',
    daysAgo: 63,
    content: doc(
      p(
        'Bilgi güvenliği ihlallerinin önemli bir kısmı, teknik bir açıktan değil kullanıcı davranışından kaynaklanır. Oltalama saldırıları bunun en yaygın örneğidir.',
      ),
      h('h2', 'Etkili Bir Eğitim Programı'),
      ul([
        'Yıllık tekrarlanan temel farkındalık modülü',
        'Rol bazlı ek eğitimler (yazılım geliştirme, insan kaynakları, satın alma)',
        'Simüle oltalama testleri ve sonuç değerlendirmesi',
        'Yeni işe başlayanlar için oryantasyon modülü',
      ]),
      h('h2', 'Ölçme ve Değerlendirme'),
      p(
        'Eğitimin etkinliği, katılım oranıyla değil davranış değişikliğiyle ölçülür. Simülasyon testlerindeki tıklama oranlarının zaman içindeki değişimi iyi bir göstergedir.',
      ),
    ),
  },
  {
    title: 'Belgelendirme Kuruluşu Seçerken Nelere Dikkat Edilmeli?',
    excerpt:
      'Akreditasyon kapsamı, denetçi yetkinliği ve tarafsızlık güvencesi gibi kriterleri değerlendirmeniz için bir kontrol listesi.',
    daysAgo: 81,
    content: doc(
      p(
        'Belgelendirme kuruluşu seçimi, alacağınız belgenin uluslararası geçerliliğini doğrudan etkiler. Fiyat tek başına belirleyici olmamalıdır.',
      ),
      h('h2', 'Değerlendirme Kriterleri'),
      ol([
        'Akreditasyon kurumu ve akreditasyon kapsamının doğrulanması',
        'İlgili standart ve sektör için denetçi yetkinliği',
        'Tarafsızlık politikası ve karar mekanizmasının bağımsızlığı',
        'Denetim gün sayısının standartlara uygunluğu',
        'Gözetim denetimi planı ve sonrası destek',
        'Gizlilik taahhüdü ve veri güvenliği uygulamaları',
      ]),
      h('h2', 'Danışmanlık ve Belgelendirme Ayrımı'),
      p(
        'Tarafsızlık ilkesi gereği, bir kuruluşa hem yönetim sistemi danışmanlığı verip hem de aynı sistem için belgelendirme denetimi yapmak kabul edilmez. Bu ayrımın nasıl sağlandığını mutlaka sorun.',
      ),
    ),
  },
]

export const faqs = [
  {
    question: 'Belgelendirme süreci ne kadar sürer?',
    order: 10,
    answer: doc(
      p(
        'Süre; kuruluşun büyüklüğüne, süreç sayısına ve mevcut hazırlık düzeyine göre değişir. Hazırlığı tamamlanmış orta ölçekli bir kuruluşta başvurudan belge teslimine kadar geçen süre genellikle 6-10 hafta arasındadır.',
      ),
    ),
  },
  {
    question: 'Belge kaç yıl geçerlidir?',
    order: 20,
    answer: doc(
      p(
        'Yönetim sistemi belgeleri üç yıl geçerlidir. Bu süre boyunca yılda bir kez gözetim denetimi yapılır; üçüncü yılın sonunda yeniden belgelendirme denetimi gerçekleştirilir.',
      ),
    ),
  },
  {
    question: 'Denetim öncesinde hangi dokümanlar hazır olmalı?',
    order: 30,
    answer: doc(
      p('Standarda göre değişmekle birlikte genellikle şu kayıtlar istenir:'),
      ul([
        'Kapsam dokümanı ve politika metinleri',
        'Risk değerlendirmesi ve risk işleme planı',
        'Süreç prosedürleri ve talimatlar',
        'İç denetim raporu ve yönetimin gözden geçirmesi kaydı',
        'Düzeltici faaliyet kayıtları',
        'Eğitim ve yetkinlik kayıtları',
      ]),
    ),
  },
  {
    question: 'Denetim sırasında uygunsuzluk çıkarsa ne olur?',
    order: 40,
    answer: doc(
      p(
        'Uygunsuzluklar majör ve minör olarak sınıflandırılır. Minör uygunsuzluklar için düzeltici faaliyet planı sunulması yeterliyken, majör uygunsuzluklarda kapatma doğrulaması yapılmadan belgelendirme kararı alınmaz.',
      ),
    ),
  },
  {
    question: 'Danışmanlık ve belgelendirme hizmetini aynı kuruluştan alabilir miyim?',
    order: 50,
    answer: doc(
      p(
        'Tarafsızlık ilkesi gereği, bir kuruluşa yönetim sistemi danışmanlığı veren taraf aynı sistem için belgelendirme denetimi yapamaz. Bu iki hizmet birbirinden bağımsız yürütülmelidir.',
      ),
    ),
  },
  {
    question: 'KVKK uyumu için ISO 27001 belgesi yeterli mi?',
    order: 60,
    answer: doc(
      p(
        'ISO 27001 belgesi tek başına KVKK uyumluluğu anlamına gelmez. Ancak standardın gerektirdiği kontrollerin önemli bir bölümü, KVKK kapsamındaki teknik ve idari tedbirlerle örtüşür ve uyum çalışmasını kolaylaştırır.',
      ),
    ),
  },
  {
    question: 'Denetim ekibi kaç kişiden oluşur?',
    order: 70,
    answer: doc(
      p(
        'Denetim ekibinin büyüklüğü; kuruluşun çalışan sayısı, saha sayısı ve süreç karmaşıklığına göre belirlenir. Küçük ölçekli kuruluşlarda tek denetçi yeterli olabilirken, çok lokasyonlu yapılarda ekip genişletilir.',
      ),
    ),
  },
  {
    question: 'Uzaktan denetim mümkün mü?',
    order: 80,
    answer: doc(
      p(
        'Doküman incelemesi gibi bazı denetim faaliyetleri uzaktan yürütülebilir. Ancak sahada doğrulama gerektiren aşamalar için yerinde denetim yapılması esastır.',
      ),
    ),
  },
]

export const usefulLinks = [
  { label: 'Kişisel Verileri Koruma Kurumu', url: 'https://www.kvkk.gov.tr' },
  { label: 'Türk Standardları Enstitüsü', url: 'https://www.tse.org.tr' },
  { label: 'Türk Akreditasyon Kurumu', url: 'https://www.turkak.org.tr' },
  { label: 'Uluslararası Standardizasyon Örgütü (ISO)', url: 'https://www.iso.org' },
  { label: 'Sosyal Güvenlik Kurumu', url: 'https://www.sgk.gov.tr' },
]
