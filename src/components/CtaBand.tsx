import Link from 'next/link'

import { PhoneIcon } from '@/components/Icons'
import { toTelHref } from '@/lib/format'
import { getContactInfo } from '@/lib/payload'
import { ROUTES } from '@/lib/site'

type CtaBandProps = {
  title?: string
  description?: string
  buttonLabel?: string
  buttonHref?: string
}

/** Koyu mavi zeminli teklif/iletişim çağrısı şeridi. */
export const CtaBand = async ({
  title = 'Belgelendirme danışmanlığı süreciniz için teklif alın',
  description = 'İhtiyacınıza uygun kapsam, süre ve maliyeti birlikte belirleyelim. Uzman ekibimiz aynı gün içinde size dönüş yapsın.',
  buttonLabel = 'Teklif Al',
  buttonHref = ROUTES.contact,
}: CtaBandProps) => {
  const contact = await getContactInfo()

  return (
    <section className="bg-primary text-white" aria-labelledby="cta-band-title">
      <div className="container-site flex flex-col items-center gap-7 py-12 text-center md:flex-row md:justify-between md:gap-10 md:py-14 md:text-left">
        <div className="max-w-2xl">
          <h2 id="cta-band-title" className="text-xl font-bold text-white sm:text-2xl">
            {title}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-white/80">{description}</p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href={buttonHref} className="btn btn-invert">
            {buttonLabel}
          </Link>

          {contact?.phone ? (
            <a
              href={toTelHref(contact.phone)}
              className="btn border border-white/30 text-white hover:bg-white/10"
            >
              <PhoneIcon width={17} height={17} />
              {contact.phone}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
