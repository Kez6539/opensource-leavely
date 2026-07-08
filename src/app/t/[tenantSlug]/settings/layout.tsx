import { ReactNode } from 'react'
import { redirect, notFound } from 'next/navigation'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { SettingsTabs } from './settings-tabs'

// Reported bug: an EMPLOYEE could see Settings, Billing, Users, etc. via
// the unfiltered sidebar AND by URL-editing. The sidebar is now filtered
// in `src/components/layout/sidebar-nav.tsx`, but defence in depth means
// we also enforce ADMIN+ at the layout level so URL-editing or stale
// links from notifications can't reach a settings page.
export default async function SettingsLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  let membership
  try {
    const result = await requireTenant(tenantSlug)
    membership = result.membership
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : ''
    if (msg === 'UNAUTHORIZED') redirect('/login')
    if (msg === 'TENANT_NOT_FOUND') notFound()
    redirect('/login')
  }

  if (!isAtLeast(membership, 'ADMIN')) {
    redirect(`/t/${tenantSlug}/forbidden`)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <p className="text-sm text-muted-foreground mt-1 pb-6">Manage your organisation settings</p>
      <div className="flex flex-col md:flex-row md:gap-8 lg:gap-10">
        <aside className="md:w-56 lg:w-60 md:shrink-0 md:border-r md:pr-6 lg:pr-8">
          <SettingsTabs tenantSlug={tenantSlug} />
        </aside>
        <div className="flex-1 min-w-0 mt-6 md:mt-0">{children}</div>
      </div>
    </div>
  )
}
