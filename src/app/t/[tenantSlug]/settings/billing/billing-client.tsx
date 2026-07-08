'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CardSection } from '@/components/shared/card-section'
import { FieldRow } from '@/components/shared/field-row'
import { StatusBadge } from '@/components/shared/status-badge'
import { CreditCard, Users, AlertTriangle } from 'lucide-react'
import { getPriceForPlanKey, getPlanLabel } from '@/lib/plans'
import { createCheckoutSession, createPortalSession } from './actions'
import { formatGBP } from '@/lib/formatters'

interface Props {
  billing: {
    status: string
    planKey: string
    currentPeriodEnd: string | null
    trialEndsAt: string | null
    hasStripe: boolean
    employeeCount: number
  }
  tenantSlug: string
}

function trialDaysRemaining(trialEndsAt: string | null): number | null {
  if (!trialEndsAt) return null
  const diff = new Date(trialEndsAt).getTime() - Date.now()
  if (diff <= 0) return 0
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function BillingClient({ billing, tenantSlug }: Props) {
  const [loading, setLoading] = useState<'subscribe' | 'manage' | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubscribe() {
    setLoading('subscribe')
    setError(null)
    try {
      const { url } = await createCheckoutSession(tenantSlug)
      // Issue #102 — router.push() on an external Stripe URL routes
      // through Next's client router first, which adds a visible flicker
      // and lets a slow network turn into a double-click → two checkout
      // sessions. Hard-navigating via window.location.href bypasses the
      // router entirely and keeps the button in its loading state until
      // the browser actually leaves the page.
      window.location.href = url
    } catch (err) {
      // Server action errors arrive with masked messages in production, so
      // raw err.message would render Next.js boilerplate. Match the digest
      // sentinel (src/lib/paywall.ts) and otherwise show stable copy.
      setError(
        (err as { digest?: string } | null)?.digest === 'DEMO_READONLY'
          ? 'Demo mode is read-only, so checkout is disabled. Sign up for a free trial to subscribe.'
          : 'Failed to start checkout. Please try again.'
      )
      setLoading(null)
    }
  }

  async function handleManage() {
    setLoading('manage')
    setError(null)
    try {
      const { url } = await createPortalSession(tenantSlug)
      if (!url) {
        throw new Error('Billing portal did not return a URL.')
      }
      // Same reasoning as handleSubscribe (#102). The billing portal is
      // on billing.stripe.com, so router.push would blow up anyway on
      // next/navigation's URL validation in newer Next versions.
      window.location.href = url
    } catch (err) {
      setError(
        (err as { digest?: string } | null)?.digest === 'DEMO_READONLY'
          ? 'Demo mode is read-only, so billing changes are disabled.'
          : 'Failed to open billing portal. Please try again.'
      )
      setLoading(null)
    }
  }

  const pricePerSeat = getPriceForPlanKey(billing.planKey)
  const planLabel = getPlanLabel(billing.planKey)
  const monthlyCost = billing.employeeCount * pricePerSeat
  const daysLeft = trialDaysRemaining(billing.trialEndsAt)
  const isTrialing = billing.status === 'TRIALING'
  const isExpired = billing.status === 'CANCELED' || (isTrialing && daysLeft === 0)
  const needsSubscription = (isTrialing || isExpired) && !billing.hasStripe

  return (
    <div className="space-y-6">
      {isExpired && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">Your trial has ended</p>
            <p className="text-xs text-amber-700 mt-0.5">
              Subscribe to regain full access. Your data is safe — you just need an active subscription to make changes.
            </p>
          </div>
        </div>
      )}

      {isTrialing && daysLeft !== null && daysLeft > 0 && daysLeft <= 3 && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">
              {daysLeft} day{daysLeft === 1 ? '' : 's'} left in your trial
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              Subscribe now to avoid any interruption.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-800 text-sm">Something went wrong</p>
            <p className="text-xs text-red-700 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      <CardSection title="Your Plan">
        <div className="space-y-1">
          <FieldRow label="Status" value={<StatusBadge status={billing.status} />} />
          {/* (#198) Use shared formatGBP — was previously inconsistent
              with the rest of the app (no decimals, no thousands sep). */}
          <FieldRow label="Plan" value={`${planLabel} — ${formatGBP(pricePerSeat)}/user/month`} />
          <FieldRow
            label="Active employees"
            value={
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                {billing.employeeCount}
              </span>
            }
          />
          <FieldRow
            label="Monthly cost"
            value={
              <span className="font-semibold">
                {formatGBP(monthlyCost)}
                <span className="text-muted-foreground font-normal text-xs ml-1">
                  ({billing.employeeCount} × {formatGBP(pricePerSeat)})
                </span>
              </span>
            }
          />
          {isTrialing && daysLeft !== null && daysLeft > 0 && (
            <FieldRow
              label="Trial ends"
              value={`${new Date(billing.trialEndsAt!).toLocaleDateString('en-GB')} (${daysLeft} day${daysLeft === 1 ? '' : 's'} left)`}
            />
          )}
          {billing.currentPeriodEnd && (
            <FieldRow label="Current period ends" value={new Date(billing.currentPeriodEnd).toLocaleDateString('en-GB')} />
          )}
        </div>
        <div className="pt-4 flex gap-3">
          {needsSubscription && (
            <Button onClick={handleSubscribe} disabled={loading === 'subscribe'}>
              <CreditCard className="mr-2 h-4 w-4" />
              {loading === 'subscribe' ? 'Redirecting...' : `Subscribe — ${formatGBP(monthlyCost)}/month`}
            </Button>
          )}
          {billing.hasStripe && (
            <Button variant="outline" onClick={handleManage} disabled={loading === 'manage'}>
              <CreditCard className="mr-2 h-4 w-4" />
              {loading === 'manage' ? 'Redirecting...' : 'Manage billing'}
            </Button>
          )}
        </div>
      </CardSection>
    </div>
  )
}
