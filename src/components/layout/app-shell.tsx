'use client'

import { ReactNode } from 'react'
import { SidebarNav } from './sidebar-nav'
import { Topbar } from './topbar'
import { TenantOption } from './tenant-switcher'
import { TrialReferralCard } from '@/components/shared/trial-referral-card'

interface TrialReferral {
  referralUrl: string
  daysLeft: number | null
}

interface AppShellProps {
  tenantName: string
  tenantSlug: string
  tenantLogo?: string | null
  userName?: string
  role?: string
  userTenants?: TenantOption[]
  isSuperAdmin?: boolean
  clockInEnabled?: boolean
  unreadCount?: number
  trialReferral?: TrialReferral | null
  children: ReactNode
}

export function AppShell({ tenantName, tenantSlug, tenantLogo, userName, role, userTenants, isSuperAdmin, clockInEnabled, unreadCount, trialReferral, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip-to-content link for keyboard / screen reader users. Hidden until
          focused, then becomes a visible button. WCAG 2.4.1. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg focus:font-medium"
      >
        Skip to content
      </a>
      <Topbar tenantName={tenantName} tenantSlug={tenantSlug} userName={userName} role={role} userTenants={userTenants} isSuperAdmin={isSuperAdmin} clockInEnabled={clockInEnabled} unreadCount={unreadCount} />
      <div className="flex">
        <aside className="hidden md:flex md:flex-col w-64 bg-sidebar min-h-[calc(100vh-3.5rem)] border-r border-white/5">
          <div className="px-5 pt-5 pb-3 border-b border-white/5">
            <div className="flex items-center gap-2.5">
              {tenantLogo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={tenantLogo}
                  alt={`${tenantName} logo`}
                  className="h-8 w-8 rounded-lg object-contain bg-white/95 p-0.5 shadow-md shadow-black/20"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-500/20">
                  L
                </div>
              )}
              <div className="flex flex-col leading-tight min-w-0">
                <span className="font-semibold text-sm text-white tracking-tight truncate">{tenantName}</span>
                <span className="text-[10px] text-sidebar-foreground/50">on Leavely</span>
              </div>
            </div>
          </div>
          <SidebarNav tenantSlug={tenantSlug} role={role} isSuperAdmin={isSuperAdmin} clockInEnabled={clockInEnabled} />
        </aside>
        <main id="main-content" className="flex-1 p-6 md:p-8 max-w-6xl mx-auto w-full">
          {trialReferral && (
            <TrialReferralCard referralUrl={trialReferral.referralUrl} daysLeft={trialReferral.daysLeft} />
          )}
          {children}
        </main>
      </div>
    </div>
  )
}
