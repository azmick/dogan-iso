import { FacebookIcon, LinkedInIcon, WhatsAppIcon, XIcon } from '@/components/Icons'

type ShareButtonsProps = {
  url: string
  title: string
}

/** Sunucuda üretilen paylaşım bağlantıları (ekstra JS yok). */
export const ShareButtons = ({ url, title }: ShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const targets = [
    {
      label: 'Facebook’ta paylaş',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FacebookIcon,
    },
    {
      label: 'X’te paylaş',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: XIcon,
    },
    {
      label: 'LinkedIn’de paylaş',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: LinkedInIcon,
    },
    {
      label: 'WhatsApp ile paylaş',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      Icon: WhatsAppIcon,
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
      <span className="text-sm font-semibold text-primary">Paylaş:</span>

      <ul className="flex items-center gap-2">
        {targets.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border text-primary transition-colors hover:border-accent hover:bg-primary-soft"
            >
              <Icon width={17} height={17} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
