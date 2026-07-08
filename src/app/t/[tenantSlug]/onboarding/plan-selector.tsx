'use client'

import { Button } from '@/components/ui/button'
import { CardSection } from '@/components/shared'
import { Check, CreditCard, Shield } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PRICE_PER_SEAT_GBP, TRIAL_DAYS } from '@/lib/plans'
import { selectPlan, createTrialCheckout } from './actions'
import { trackSubscriptionStarted } from '@/lib/analytics'

const features = [
  'Unlimited employees',
  'Leave calendar & approvals',
  'Advanced reporting',
  'Custom policies',
  'Role-based access',
  'Email support',
]

interface Props {
  tenantSlug: string
  onNext: () => void
  onSkip: () => void
}

export function PlanSelector({ tenantSlug, onNext }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState<'checkout' | 'skip' | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout() {
    setLoading('checkout')
    setError(null)
    try {
      trackSubscriptionStarted(tenantSlug, 'standard', 0)
      const result = await createTrialCheckout(tenantSlug)
      if (!result.ok) {
        setError(result.error)
        setLoading(null)
        return
      }
      router.push(result.data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start checkout')
      setLoading(null)
    }
  }

  async function handleSkip() {
    setLoading('skip')
    await selectPlan(tenantSlug)
    onNext()
  }

  return (
    <CardSection title="Your Plan">
      <p className="text-sm text-muted-foreground mb-2">
        Simple per-seat pricing. Start your free trial today.
      </p>
      <div className="max-w-md mx-auto my-6">
        <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50/50 shadow-md p-6 text-center">
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span className="text-4xl font-extrabold">&pound;{PRICE_PER_SEAT_GBP}</span>
            <span className="text-sm text-muted-foreground">/user/month</span>
          </div>
          <p className="text-sm text-emerald-700 font-medium mb-4">
            {TRIAL_DAYS}-day free trial &mdash; cancel anytime
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            All features included. Billed monthly based on active employee count.
          </p>
          <ul className="space-y-2 text-left">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 text-destructive text-sm p-3 font-medium mb-4">{error}</div>
      )}

      <div className="space-y-3">
        <Button
          onClick={handleCheckout}
          disabled={loading === 'checkout'}
          className="w-full h-11 font-semibold shadow-md shadow-emerald-500/20 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          {loading === 'checkout' ? 'Redirecting to Stripe\u2026' : `Start free trial \u2014 add payment details`}
        </Button>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Shield className="h-3.5 w-3.5" />
          <span>You won&apos;t be charged for {TRIAL_DAYS} days. Cancel anytime.</span>
        </div>
        <div className="text-center">
          <button
            onClick={handleSkip}
            disabled={loading === 'skip'}
            className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2"
          >
            {loading === 'skip' ? 'Saving\u2026' : 'Skip for now \u2014 no card needed'}
          </button>
        </div>
      </div>
    </CardSection>
  )
}
