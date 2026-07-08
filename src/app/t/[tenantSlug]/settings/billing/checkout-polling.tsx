'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { CardSection } from '@/components/shared/card-section'

interface Props {
  tenantSlug: string
}

/**
 * Rendered by billing/page.tsx when the server-side poll for the
 * `checkout.session.completed` webhook timed out (issue #96). Shows a
 * spinner and auto-refreshes every 1.5s, dropping the ?session_id= query
 * param once it reloads so we don't re-poll forever if the webhook never
 * arrives (e.g. the user back-buttoned from a cancelled checkout).
 *
 * Keeping this as a tiny client component — not a full refetch loop — so
 * the real billing page (with CSRF-protected server actions, up-to-date
 * billing row, etc.) is the thing that eventually renders.
 */
export function CheckoutPolling({ tenantSlug }: Props) {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      // Drop the session_id param so the next render goes through the
      // normal getBillingInfo path rather than re-polling. If the webhook
      // still hasn't landed we just show whatever state the DB has — the
      // user can refresh manually from there.
      router.replace(`/t/${tenantSlug}/settings/billing`)
      router.refresh()
    }, 1500)
    return () => clearTimeout(timer)
  }, [router, tenantSlug])

  return (
    <div className="space-y-6">
      <CardSection title="Finalising your subscription">
        <div className="flex items-center gap-3 py-6">
          <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
          <div>
            <p className="text-sm font-medium text-gray-900">
              Confirming your payment with Stripe...
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              This usually takes a couple of seconds. Don&rsquo;t refresh or click back.
            </p>
          </div>
        </div>
      </CardSection>
    </div>
  )
}
