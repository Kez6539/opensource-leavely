import { Linkedin, Twitter, type LucideIcon } from 'lucide-react'

interface SocialShareButtonsProps {
  url: string
  title: string
}

type ShareNetwork = 'twitter' | 'linkedin'

interface ShareLink {
  label: string
  href: string
  icon: LucideIcon
}

const buttonClassName =
  'inline-flex h-10 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700'

function generateShareUrl(network: ShareNetwork, url: string, title: string) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  if (network === 'twitter') {
    return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
  }

  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
}

export function SocialShareButtons({ url, title }: SocialShareButtonsProps) {
  const shareLinks: ShareLink[] = [
    { label: 'Twitter', href: generateShareUrl('twitter', url, title), icon: Twitter },
    { label: 'LinkedIn', href: generateShareUrl('linkedin', url, title), icon: Linkedin },
  ]

  return (
    <aside className="my-8 rounded-lg border border-gray-200 bg-gray-50 p-4" aria-label="Share this article">
      <p className="mb-3 text-sm font-semibold text-gray-900">Share this article</p>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            className={buttonClassName}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </a>
        ))}
      </div>
    </aside>
  )
}
