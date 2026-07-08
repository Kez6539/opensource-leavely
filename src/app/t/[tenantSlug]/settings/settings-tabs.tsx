'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Bell,
  Building2,
  CalendarClock,
  CalendarDays,
  CalendarOff,
  CalendarRange,
  CreditCard,
  MapPin,
  Megaphone,
  ScrollText,
  Settings as SettingsIcon,
  Sparkles,
  UserCog,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Tab = { label: string; href: string; icon: LucideIcon }
type Group = { label: string; tabs: Tab[] }

const groups: Group[] = [
  {
    label: 'Organisation',
    tabs: [
      { label: 'General', href: '/settings/general', icon: SettingsIcon },
      { label: 'Locations', href: '/settings/locations', icon: MapPin },
      { label: 'Onboarding', href: '/settings/onboarding', icon: Sparkles },
      { label: 'Announcements', href: '/settings/announcements', icon: Megaphone },
    ],
  },
  {
    label: 'Leave',
    tabs: [
      { label: 'Leave Policies', href: '/settings/leave-policies', icon: CalendarDays },
      { label: 'Holidays', href: '/settings/holidays', icon: CalendarRange },
      { label: 'Company Leave', href: '/settings/company-leave', icon: Building2 },
      { label: 'Blackout Dates', href: '/settings/blackout-dates', icon: CalendarOff },
    ],
  },
  {
    label: 'People',
    tabs: [
      { label: 'Users', href: '/settings/users', icon: Users },
      { label: 'Delegation', href: '/settings/delegation', icon: UserCog },
    ],
  },
  {
    label: 'Integrations',
    tabs: [
      { label: 'Notifications', href: '/settings/notifications', icon: Bell },
      { label: 'Calendar Sync', href: '/settings/calendar-sync', icon: CalendarClock },
    ],
  },
  {
    label: 'Account',
    tabs: [
      { label: 'Billing', href: '/settings/billing', icon: CreditCard },
      { label: 'Audit Log', href: '/settings/audit-log', icon: ScrollText },
    ],
  },
]

const allTabs = groups.flatMap((g) => g.tabs)

export function SettingsTabs({ tenantSlug }: { tenantSlug: string }) {
  const pathname = usePathname()
  const router = useRouter()

  const currentTab = allTabs.find((t) =>
    pathname.startsWith(`/t/${tenantSlug}${t.href}`),
  )

  return (
    <>
      {/* Mobile: native select grouped by section */}
      <div className="md:hidden mb-4">
        <label htmlFor="settings-section" className="sr-only">
          Settings section
        </label>
        <select
          id="settings-section"
          value={currentTab?.href ?? ''}
          onChange={(e) => router.push(`/t/${tenantSlug}${e.target.value}`)}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {groups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.tabs.map((tab) => (
                <option key={tab.href} value={tab.href}>
                  {tab.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Desktop: grouped vertical sidebar */}
      <nav
        aria-label="Settings sections"
        className="hidden md:flex flex-col gap-6"
      >
        {groups.map((group) => (
          <div key={group.label} className="flex flex-col gap-0.5">
            <p className="px-3 mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {group.label}
            </p>
            {group.tabs.map((tab) => {
              const href = `/t/${tenantSlug}${tab.href}`
              const isActive = pathname.startsWith(href)
              const Icon = tab.icon
              return (
                <Link
                  key={tab.href}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0 transition-colors',
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground/70 group-hover:text-foreground',
                    )}
                  />
                  {tab.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
    </>
  )
}
