'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Lock, CreditCard } from 'lucide-react'
import { EmptyState } from '@/components/shared'
import { captureError } from '@/lib/analytics'

// Translate the sentinel strings thrown by guards in src/lib/* into user-friendly
// titles + descriptions + actions. These strings are intentionally short and
// stable (e.g. 'UNAUTHORIZED', 'SUBSCRIPTION_REQUIRED') so we can pattern-match
// without coupling to localized copy.
//
// IMPORTANT: in production Next.js replaces every server error MESSAGE with a
// generic "An error occurred in the Server Components render…" string, so the
// message comparisons below only ever match in dev. The paywall guards
// (src/lib/paywall.ts) therefore carry the sentinel on `error.digest`, which
// Next forwards untouched — match digest FIRST, message as dev-time fallback.
function translateError(error: Error & { digest?: string }): {
  icon: React.ReactNode
  title: string
  description: string
  showRetry: boolean
  primaryLabel?: string
} {
  const message = error.message
  const digest = error.digest
  // RBAC denial — `ForbiddenError` from src/lib/rbac.ts. Match by name so we
  // catch ForbiddenError instances even when their detailed message gets
  // replaced by Next.js in production.
  if (
    digest === 'FORBIDDEN' ||
    error.name === 'ForbiddenError' ||
    message === 'UNAUTHORIZED' ||
    message === 'FORBIDDEN' ||
    message.startsWith("Role '")
  ) {
    return {
      icon: <Lock className="h-10 w-10" />,
      title: 'Access denied',
      description: "You don't have permission to view this page. If you think this is a mistake, contact your administrator.",
      showRetry: false,
    }
  }
  if (message === 'TENANT_NOT_FOUND') {
    return {
      icon: <Lock className="h-10 w-10" />,
      title: 'Workspace not found',
      description: "This workspace doesn't exist or you no longer have access.",
      showRetry: false,
    }
  }
  if (digest === 'DEMO_READONLY' || message === 'DEMO_READONLY') {
    return {
      icon: <Lock className="h-10 w-10" />,
      title: 'Demo mode is read-only',
      description: "This is a shared demo workspace, so changes are disabled. Sign up for a free trial to manage your own team's leave.",
      showRetry: false,
    }
  }
  if (digest === 'SUBSCRIPTION_REQUIRED' || message === 'SUBSCRIPTION_REQUIRED') {
    return {
      icon: <CreditCard className="h-10 w-10" />,
      title: 'Subscription required',
      description: 'Your subscription has ended or your trial has expired. Reactivate to continue using Leavely.',
      showRetry: false,
      primaryLabel: 'Manage billing',
    }
  }
  return {
    icon: <AlertTriangle className="h-10 w-10" />,
    title: 'Something went wrong',
    description: 'An unexpected error occurred. Please try again.',
    showRetry: true,
  }
}

export default function TenantError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const params = useParams<{ tenantSlug: string }>()
  const tenantSlug = params?.tenantSlug

  // Push to PostHog so we see real-user crashes, not just the CF Workers log.
  // captureError fails silently if PostHog isn't configured.
  useEffect(() => {
    captureError(error, { boundary: 'tenant', digest: error.digest })
  }, [error])

  const t = translateError(error)
  const billingHref = tenantSlug ? `/t/${tenantSlug}/settings/billing` : undefined
  const showBilling =
    (error.digest === 'SUBSCRIPTION_REQUIRED' || error.message === 'SUBSCRIPTION_REQUIRED') &&
    billingHref

  return (
    <div className="py-16">
      <EmptyState
        icon={t.icon}
        title={t.title}
        description={t.description}
        action={
          t.showRetry ? (
            <Button variant="outline" onClick={reset}>
              Try again
            </Button>
          ) : showBilling ? (
            <Button asChild>
              <a href={billingHref}>{t.primaryLabel}</a>
            </Button>
          ) : undefined
        }
      />
    </div>
  )
}
