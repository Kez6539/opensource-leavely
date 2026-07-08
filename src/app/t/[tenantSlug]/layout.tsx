import { AppShell } from '@/components/layout/app-shell'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { prisma } from '@/lib/db'
import { redirect, notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { ReactNode } from 'react'
import { TrialBanner, PaywallBanner, DemoBanner, ImpersonationBanner, TrialChatWidget, TrialOnboardingTour } from '@/components/shared'
import { getSession } from '@/lib/session'

export default async function TenantLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') ?? headersList.get('x-invoke-path') ?? ''

  // Start session read immediately (no DB dependency)
  const sessionPromise = getSession()

  let tenant, membership, user
  try {
    const result = await requireTenant(tenantSlug)
    tenant = result.tenant
    membership = result.membership
    user = result.user
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : ''
    if (msg === 'UNAUTHORIZED') redirect('/login')
    if (msg === 'TENANT_NOT_FOUND') notFound()
    if (msg === 'FORBIDDEN') redirect(`/t/${tenantSlug}/forbidden`)
    redirect('/login')
  }

  // (#175) Force unfinished onboarding back to the wizard. Without this, a
  // freshly-registered owner can URL-edit to /leave/new before completing
  // the steps and hit `createLeaveRequest` with no leave policies — which
  // throws "Selected leave policy does not exist" instead of guiding them
  // back to the wizard. The wizard itself is exempt from the redirect.
  const isOnboarding = pathname.includes(`/t/${tenantSlug}/onboarding`)
  if (!tenant.onboardedAt && !isOnboarding) {
    redirect(`/t/${tenantSlug}/onboarding`)
  }

  // Render the onboarding wizard full-screen — no sidebar, no topbar.
  // First impression of a fresh signup shouldn't be a half-empty app
  // dashboard; it should feel like a focused setup experience that
  // matches the /try landing page palette.
  if (isOnboarding) {
    return (
      <div className="min-h-[100svh] bg-[#FAF8F4] text-stone-900 relative overflow-x-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 h-[680px]"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 30%, rgba(5, 150, 105, 0.10), rgba(5, 150, 105, 0) 70%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
        <header className="relative max-w-3xl mx-auto px-5 pt-6 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-500/20">
              L
            </div>
            <span className="font-semibold text-sm tracking-tight">Leavely</span>
          </div>
          <span className="text-[11px] text-stone-500">{tenant.name}</span>
        </header>
        <main className="relative">{children}</main>
      </div>
    )
  }

  // Run remaining queries in parallel (all depend on tenant.id / user.userId).
  // The sidebar logo (base64 data URI, ~80KB) is deliberately NOT loaded by
  // requireTenant() — it's fetched here explicitly so the 7+ requireTenant()
  // fan-out on a dashboard render doesn't ship the blob each time.
  const [userMemberships, session, billing, unreadCount, logoRow] = await Promise.all([
    prisma.membership.findMany({
      where: { userId: user.userId },
      include: { tenant: { select: { slug: true, name: true } } },
      orderBy: { tenant: { name: 'asc' } },
    }),
    sessionPromise,
    prisma.tenantBilling.findUnique({
      where: { tenantId: tenant.id },
    }),
    prisma.notification.count({
      where: { userId: user.userId, tenantId: tenant.id, read: false },
    }),
    prisma.tenant.findUnique({
      where: { id: tenant.id },
      select: { logoDataUri: true },
    }),
  ])
  const userTenants = userMemberships.map(m => ({ slug: m.tenant.slug, name: m.tenant.name }))
  const currentTime = new Date().getTime()

  let banner: ReactNode = null
  let showTrialChat = false
  let showTrialOnboardingTour = false
  let trialDaysLeft: number | null = null
  if (billing) {
    if (billing.status === 'TRIALING' && billing.trialEndsAt) {
      showTrialChat = billing.trialEndsAt.getTime() >= currentTime
      showTrialOnboardingTour = showTrialChat
      const daysLeft = Math.max(0, Math.ceil((billing.trialEndsAt.getTime() - currentTime) / (1000 * 60 * 60 * 24)))
      trialDaysLeft = daysLeft
      if (daysLeft <= 7) {
        banner = <TrialBanner tenantSlug={tenantSlug} daysLeft={daysLeft} />
      }
      // Trial expiry email used to be sent from inside this layout render on
      // every page load — racy, slow, and often dropped by the Workers
      // runtime. It now runs nightly from /api/cron/trial-warnings using a
      // deduped `lastTrialWarningAt` check. The banner above still gives the
      // in-app warning on every request.
    } else if (billing.status === 'TRIALING') {
      showTrialChat = true
      showTrialOnboardingTour = true
    } else if (billing.status === 'PAST_DUE') {
      banner = <PaywallBanner tenantSlug={tenantSlug} variant="upgrade" message="Your payment is past due. Please update your billing information." actionLabel="Update payment" />
    } else if (billing.status === 'CANCELED' || billing.status === 'INCOMPLETE') {
      banner = <PaywallBanner tenantSlug={tenantSlug} variant="limit" message="Your subscription is inactive. Data is read-only until you resubscribe." actionLabel="Subscribe" />
    }
  }
  const canUseGuidedTour = isAtLeast(membership, 'MANAGER')
  const enableTrialOnboardingTour = canUseGuidedTour && (session.isDemo || (showTrialOnboardingTour && !session.isDemo))
  const enableTrialReferral = showTrialChat && !session.isDemo && isAtLeast(membership, 'MANAGER')
  const host = headersList.get('host')
  const protocol = headersList.get('x-forwarded-proto') ?? 'https'
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || (host ? `${protocol}://${host}` : 'https://leavely.online')).replace(/\/$/, '')
  const referralParams = new URLSearchParams({
    ref: tenant.slug,
    utm_campaign: 'trial_referral',
    utm_source: 'in_app',
  })
  const trialReferral = enableTrialReferral
    ? {
        referralUrl: `${baseUrl}/register?${referralParams.toString()}`,
        daysLeft: trialDaysLeft,
      }
    : null

  return (
    <AppShell tenantName={tenant.name} tenantSlug={tenant.slug} tenantLogo={logoRow?.logoDataUri ?? null} userName={user.name} role={membership.role} userTenants={userTenants} isSuperAdmin={user.isSuperAdmin} clockInEnabled={tenant.clockInEnabled} unreadCount={unreadCount} trialReferral={trialReferral}>
      {session.isDemo && <DemoBanner />}
      {session.impersonatingFrom && <ImpersonationBanner tenantName={tenant.name} />}
      {banner}
      {children}
      {showTrialChat && !session.isDemo && <TrialChatWidget />}
      <TrialOnboardingTour tenantSlug={tenant.slug} enabled={enableTrialOnboardingTour} />
    </AppShell>
  )
}
