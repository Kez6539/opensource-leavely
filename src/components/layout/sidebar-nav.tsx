'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  UsersRound,
  CalendarDays,
  CalendarClock,
  Clock,
  Receipt,
  Target,
  BarChart3,
  Settings,
  HelpCircle,
  MessageSquare,
  Thermometer,
  Timer,
  Building2,
  PieChart,
  GraduationCap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

// Role hierarchy values (mirroring src/lib/rbac.ts so this client-side
// component doesn't need a server import).
const ROLE_RANK: Record<string, number> = {
  OWNER: 4,
  ADMIN: 3,
  MANAGER: 2,
  EMPLOYEE: 1,
}
type Role = 'OWNER' | 'ADMIN' | 'MANAGER' | 'EMPLOYEE'

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  // Minimum role required to see this nav entry. Defaults to EMPLOYEE.
  minRole?: Role
  children?: { label: string; href: string; icon: LucideIcon; minRole?: Role }[]
}

interface NavSection {
  label?: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    items: [
      { label: 'Home', href: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'People',
    items: [
      {
        label: 'Employees', href: '/employees', icon: Users,
        minRole: 'MANAGER',
        children: [
          { label: 'Teams', href: '/employees/teams', icon: UsersRound, minRole: 'MANAGER' },
        ],
      },
    ],
  },
  {
    label: 'Time',
    items: [
      {
        label: 'Leave', href: '/leave', icon: CalendarDays,
        children: [
          { label: 'Balances', href: '/leave/balances', icon: PieChart },
          { label: 'Report Sickness', href: '/leave/report-sickness', icon: Thermometer },
        ],
      },
      { label: 'TOIL', href: '/toil', icon: Clock },
      { label: 'Clock-ins', href: '/clock-ins', icon: Timer },
      { label: 'Rotas & Shifts', href: '/rotas', icon: CalendarClock, minRole: 'MANAGER' },
      { label: 'Expenses', href: '/expenses', icon: Receipt },
    ],
  },
  {
    label: 'Growth',
    items: [
      {
        label: 'Performance', href: '/performance', icon: Target,
        children: [
          { label: 'Reviews', href: '/performance/reviews', icon: Users, minRole: 'MANAGER' },
        ],
      },
      { label: 'Learning', href: '/learning', icon: GraduationCap },
      { label: 'Reports', href: '/reports', icon: BarChart3, minRole: 'MANAGER' },
    ],
  },
  {
    label: 'Admin',
    items: [
      { label: 'Settings', href: '/settings', icon: Settings, minRole: 'ADMIN' },
    ],
  },
]

interface SidebarNavProps {
  tenantSlug: string
  role?: string
  isSuperAdmin?: boolean
  clockInEnabled?: boolean
  onNavigate?: () => void
}

export function SidebarNav({ tenantSlug, role, isSuperAdmin, clockInEnabled, onNavigate }: SidebarNavProps) {
  const pathname = usePathname()

  // Filter sidebar by role. SuperAdmins see everything. Anyone else
  // gets the items their role rank meets the minRole requirement for.
  const myRank = isSuperAdmin ? 100 : ROLE_RANK[role ?? 'EMPLOYEE'] ?? 1
  const meetsRole = (min?: Role) => !min || myRank >= ROLE_RANK[min]

  const visibleSections = navSections
    .map((section) => ({
      ...section,
      items: section.items
        .filter((item) => {
          if (item.href === '/clock-ins' && !clockInEnabled) return false
          return meetsRole(item.minRole)
        })
        .map((item) => ({
          ...item,
          children: item.children?.filter((c) => meetsRole(c.minRole)),
        })),
    }))
    .filter((s) => s.items.length > 0)

  return (
    <nav className="flex flex-col flex-1 px-3 py-3">
      <div className="flex flex-col gap-5">
        {visibleSections.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-0.5">
            {section.label && (
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-sidebar-foreground/40">
                {section.label}
              </p>
            )}
            {section.items.map((item) => {
              const href = `/t/${tenantSlug}${item.href}`
              const isActive = pathname.startsWith(href)
              return (
                <div key={item.href}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={cn(
                      'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-all',
                      isActive
                        ? 'bg-white/10 text-white shadow-sm'
                        : 'text-sidebar-foreground/65 hover:bg-white/5 hover:text-white',
                    )}
                  >
                    {/* Subtle left accent bar on the active item — softer
                        than the previous full background swap. */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-emerald-400" />
                    )}
                    <item.icon className={cn('h-4 w-4 shrink-0 transition-colors', isActive ? 'text-emerald-400' : 'text-sidebar-foreground/50 group-hover:text-white')} />
                    {item.label}
                  </Link>
                  {isActive && item.children && item.children.length > 0 && (
                    <div className="ml-7 mt-0.5 mb-1 flex flex-col gap-0.5">
                      {item.children.map((child) => {
                        const childHref = `/t/${tenantSlug}${child.href}`
                        const isChildActive = pathname === childHref
                        return (
                          <Link
                            key={child.href}
                            href={childHref}
                            onClick={onNavigate}
                            className={cn(
                              'flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] font-medium transition-colors',
                              isChildActive
                                ? 'text-white bg-white/5'
                                : 'text-sidebar-foreground/55 hover:bg-white/5 hover:text-white',
                            )}
                          >
                            <child.icon className="h-3.5 w-3.5" />
                            {child.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-1 pt-4 border-t border-white/10">
        {isSuperAdmin && (
          <Link
            href="/admin/tenants"
            onClick={onNavigate}
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-emerald-300 hover:bg-emerald-500/10 hover:text-emerald-200 transition-colors mb-1"
          >
            <Building2 className="h-4 w-4" />
            See Clients
            <span className="ml-auto text-[9px] uppercase tracking-wider rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-emerald-300">Admin</span>
          </Link>
        )}
        <Link
          href={`/t/${tenantSlug}/help`}
          onClick={onNavigate}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-1.5 text-[12px] transition-colors',
            pathname.startsWith(`/t/${tenantSlug}/help`)
              ? 'text-white bg-white/5'
              : 'text-sidebar-foreground/55 hover:text-white hover:bg-white/5',
          )}
        >
          <HelpCircle className="h-3.5 w-3.5" />
          Help
        </Link>
        <a
          href="mailto:hello@leavely.online"
          className="flex items-center gap-3 rounded-lg px-3 py-1.5 text-[12px] text-sidebar-foreground/55 hover:text-white hover:bg-white/5 transition-colors"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Feedback
        </a>
      </div>
    </nav>
  )
}
