import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'

/**
 * Sayfalar ISR ile önbelleğe alınıyor (her sayfada `export const revalidate = 300`).
 * Bu, panelde yapılan bir değişikliğin canlıda beş dakikaya kadar geç görünmesi
 * demek. Buradaki hook'lar kayıt kaydedilir kaydedilmez ilgili sayfaların
 * önbelleğini düşürüyor; 300 saniye artık yalnızca emniyet ağı olarak kalıyor.
 *
 * `revalidatePath` yalnızca Next.js istek bağlamında çalışır. Seed betiği,
 * migration ya da CLI üzerinden yapılan yazmalarda hata fırlatır — kaydın
 * kendisi bu yüzden başarısız olmasın diye hatayı yutup uyarı basıyoruz.
 */
const runRevalidate = (req: PayloadRequest, paths: string[], subtrees: string[] = []) => {
  // Toplu içe aktarma / seed sırasında kapatmak için: req.context.disableRevalidate = true
  if (req?.context?.disableRevalidate) return

  try {
    // 'layout' → o adresin altındaki tüm sayfalar birlikte tazelenir.
    subtrees.forEach((path) => revalidatePath(path, 'layout'))
    paths.forEach((path) => revalidatePath(path))
  } catch (error) {
    req?.payload?.logger?.warn(
      { err: error },
      'Next.js önbelleği tazelenemedi; sayfalar ISR süresi dolunca güncellenecek.',
    )
  }
}

const slugOf = (doc: unknown): string | undefined => {
  const slug = (doc as { slug?: unknown } | undefined)?.slug

  return typeof slug === 'string' && slug ? slug : undefined
}

/**
 * Header, footer ve menülerde göründüğü için tüm siteyi etkileyen içerikler
 * (hizmetler, kurumsal sayfalar, medya, global ayarlar) için kullanılır.
 */
export const revalidateWholeSite = (req: PayloadRequest) =>
  runRevalidate(req, ['/sitemap.xml'], ['/'])

export const revalidateWholeSiteAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  revalidateWholeSite(req)

  return doc
}

export const revalidateWholeSiteAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidateWholeSite(req)

  return doc
}

export const revalidateWholeSiteAfterGlobalChange: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidateWholeSite(req)

  return doc
}

/**
 * Yalnızca kendi liste ve detay sayfalarında görünen koleksiyonlar için hook üretir.
 *
 * @param basePath   Liste sayfasının adresi (ör. '/haberler').
 * @param extraPaths Kaydın ayrıca göründüğü sabit sayfalar (ör. ana sayfa).
 */
export const revalidateCollectionHooks = (basePath: string, extraPaths: string[] = []) => {
  const pathsFor = (slug?: string) => [
    ...extraPaths,
    basePath,
    ...(slug ? [`${basePath}/${slug}`] : []),
    '/sitemap.xml',
  ]

  const afterChange: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
    // Slug değiştiyse eski adres de tazelenmeli, yoksa eski URL bayat kalır.
    const paths = new Set([...pathsFor(slugOf(doc)), ...pathsFor(slugOf(previousDoc))])

    runRevalidate(req, [...paths])

    return doc
  }

  const afterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
    runRevalidate(req, pathsFor(slugOf(doc)))

    return doc
  }

  return {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
  }
}
