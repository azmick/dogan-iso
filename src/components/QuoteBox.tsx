import Link from 'next/link'

import { MailIcon, PhoneIcon, WhatsAppIcon } from '@/components/Icons'
import { toTelHref, toWhatsAppHref } from '@/lib/format'
import { getContactInfo } from '@/lib/payload'
import { ROUTES } from '@/lib/site'

/** Detay sayfalarının yan panelindeki "Hemen Teklif Al" kutusu. */
export const QuoteBox = async () => {
  const contact = await getContactInfo()

  return (
    <div className="rounded-lg bg-primary p-6 text-white">
      <h2 className="text-lg font-bold text-white">Hemen Teklif Al</h2>
      <p className="mt-2.5 text-sm leading-relaxed text-white/80">
        Kapsamınıza uygun fiyat ve takvim için bize ulaşın.
      </p>

      <div className="mt-5 flex flex-col gap-2.5">
        {contact?.whatsapp ? (
          <a
            href={toWhatsAppHref(contact.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent w-full"
          >
            <WhatsAppIcon width={18} height={18} />
            WhatsApp ile Yazın
          </a>
        ) : null}

        {contact?.phone ? (
          <a
            href={toTelHref(contact.phone)}
            className="btn w-full border border-white/30 text-white hover:bg-white/10"
          >
            <PhoneIcon width={17} height={17} />
            {contact.phone}
          </a>
        ) : null}

        <Link href={ROUTES.contact} className="btn btn-invert w-full">
          <MailIcon width={17} height={17} />
          Teklif Formu
        </Link>
      </div>
    </div>
  )
}
