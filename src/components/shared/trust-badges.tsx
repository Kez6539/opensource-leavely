import { KeyRound, LockKeyhole, ShieldCheck, type LucideIcon } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

type TrustBadge = {
  label: string
  detail: string
  href: string
  Icon: LucideIcon
}

const trustBadges: TrustBadge[] = [
  {
    label: 'SSL secured',
    detail: 'Encrypted connection',
    href: '/privacy',
    Icon: LockKeyhole,
  },
  {
    label: 'UK data protection',
    detail: 'UK GDPR aligned',
    href: '/privacy',
    Icon: ShieldCheck,
  },
  {
    label: '256-bit',
    detail: 'Data encryption',
    href: '/privacy',
    Icon: KeyRound,
  },
]

export function TrustBadges({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-2',
        compact ? 'gap-1.5' : 'gap-2',
        className
      )}
      aria-label="Security trust badges"
    >
      {trustBadges.map((badge) => {
        const BadgeIcon = badge.Icon

        return (
          <Link
            key={badge.label}
            href={badge.href}
            className={cn(
              'group inline-flex min-h-11 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-left shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
              compact ? 'min-h-9 px-2.5 py-1.5' : 'min-h-12'
            )}
            aria-label={`${badge.label}: ${badge.detail}`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 transition-colors group-hover:bg-white">
              <BadgeIcon className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} aria-hidden="true" />
            </span>
            <span className={cn('leading-tight', compact ? 'hidden lg:block' : 'block')}>
              <span className="block text-[11px] font-bold text-gray-900">{badge.label}</span>
              <span className="block text-[10px] font-medium text-gray-500 group-hover:text-emerald-700">
                {badge.detail}
              </span>
            </span>
          </Link>
        )
      })}
    </div>
  )
}
