import Link from 'next/link'

import { ArrowRightIcon } from '@/components/Icons'
import { ROUTES } from '@/lib/site'

export const metadata = {
  title: 'Sayfa Bulunamadı',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="container-site flex flex-col items-center py-24 text-center md:py-32">
      <p className="text-6xl font-extrabold text-primary-soft md:text-8xl" aria-hidden>
        404
      </p>

      <h1 className="mt-4 text-2xl sm:text-3xl">Aradığınız sayfa bulunamadı</h1>

      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-text-muted">
        Sayfa taşınmış, adı değişmiş veya kaldırılmış olabilir. Aşağıdaki bağlantılardan devam
        edebilirsiniz.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href={ROUTES.home} className="btn btn-primary">
          Ana Sayfa
        </Link>
        <Link href={ROUTES.services} className="btn btn-outline">
          Hizmetlerimiz
          <ArrowRightIcon />
        </Link>
        <Link href={ROUTES.contact} className="btn btn-outline">
          İletişim
        </Link>
      </div>
    </div>
  )
}
