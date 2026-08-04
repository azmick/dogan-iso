import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
  YouTubeIcon,
} from '@/components/Icons'
import type { ContactInfo } from '@/payload-types'

type SocialLinksProps = {
  social?: ContactInfo['social']
  className?: string
  linkClassName?: string
}

const NETWORKS = [
  { key: 'facebook', label: 'Facebook', Icon: FacebookIcon },
  { key: 'x', label: 'X (Twitter)', Icon: XIcon },
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon },
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
  { key: 'youtube', label: 'YouTube', Icon: YouTubeIcon },
] as const

export const SocialLinks = ({ social, className = '', linkClassName = '' }: SocialLinksProps) => {
  const links = NETWORKS.map(({ key, label, Icon }) => ({
    label,
    Icon,
    url: (social as Record<string, string | null | undefined> | undefined)?.[key],
  })).filter((link) => Boolean(link.url))

  if (!links.length) return null

  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {links.map(({ label, url, Icon }) => (
        <li key={label}>
          <a
            href={url as string}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors ${linkClassName}`}
          >
            <Icon />
          </a>
        </li>
      ))}
    </ul>
  )
}
