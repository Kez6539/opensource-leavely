'use client'

import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Check, Mail } from 'lucide-react'
import {
  type ConversionAttribution,
  trackLeadCaptured,
  trackCtaClicked,
  trackDemoVisit,
  trackTrialClicked,
  trackTrialStart,
} from '@/lib/analytics'
import { startMagicLinkSignup } from './actions'

export function TryForm({
  utmCampaign,
  utmSource,
  utmMedium,
  utmContent,
  prefilledEmail,
  gclid,
  demoCompany,
  source,
}: {
  utmCampaign?: string
  utmSource?: string
  utmMedium?: string
  utmContent?: string
  prefilledEmail?: string | null
  gclid?: string | null
  demoCompany?: string | null
  source: string
}) {
  const [email, setEmail] = useState(prefilledEmail ?? '')
  const [error, setError] = useState<string | null>(null)
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const autoFiredRef = useRef(false)
  const attribution = useMemo<ConversionAttribution>(
    () => ({
      utmCampaign,
      utmSource,
      utmMedium,
      utmContent,
      gclid,
    }),
    [gclid, utmCampaign, utmContent, utmMedium, utmSource],
  )

  function trigger(rawEmail: string, triggerSource: 'manual' | 'auto') {
    const trimmed = rawEmail.trim()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid work email.')
      return
    }
    if (demoCompany) {
      window.localStorage.setItem('leavely:setup-company', demoCompany)
    }
    setError(null)
    trackCtaClicked(triggerSource === 'auto' ? 'start_trial_autofire' : 'start_trial', '/try')
    trackTrialClicked(source, triggerSource === 'auto' ? 'auto' : 'email', attribution)

    startTransition(async () => {
      const result = await startMagicLinkSignup({
        email: trimmed,
        utmCampaign: utmCampaign ?? null,
        utmSource: utmSource ?? null,
        utmMedium: utmMedium ?? null,
        utmContent: utmContent ?? null,
        gclid: gclid ?? null,
        source,
      })
      if (!result.ok) {
        setError(result.error)
        return
      }
      trackLeadCaptured('try', attribution)
      trackTrialStart(source, triggerSource === 'auto' ? 'auto' : 'email', attribution)
      setSentTo(result.email)
    })
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    trigger(email, 'manual')
  }

  // When the cold-email CTA delivers a valid `pe=` we auto-fire the magic link
  // so the prospect lands directly on "check your inbox" instead of being asked
  // to retype the email they just clicked from. Single-shot via the ref to
  // survive React strict-mode double-effect.
  useEffect(() => {
    if (source === 'demo') {
      trackDemoVisit('demo_redirect', attribution)
    }
  }, [attribution, source])

  useEffect(() => {
    if (!prefilledEmail) return
    if (autoFiredRef.current) return
    autoFiredRef.current = true
    trigger(prefilledEmail, 'auto')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefilledEmail])

  if (sentTo) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <Mail className="h-6 w-6 text-emerald-600" aria-hidden />
        </div>
        <h3 className="text-base font-bold text-gray-900">Check your inbox</h3>
        <p className="mt-1 text-sm text-gray-600">
          We&rsquo;ve sent a setup link to <span className="font-semibold text-gray-900">{sentTo}</span>. Click it and you&rsquo;re in — no password needed.
        </p>
        <ul className="mt-4 space-y-1.5 text-[13px] text-gray-600 text-left inline-block">
          {['Link expires in 20 minutes', 'Can\'t find it? Check spam', 'Wrong email? Just submit again'].map((t) => (
            <li key={t} className="flex items-start gap-1.5">
              <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-600" aria-hidden />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // Auto-fire from `pe=` is in flight — show a calm "we're on it" state
  // instead of an empty form the prospect has to wait through.
  if (prefilledEmail && pending && !error) {
    return (
      <div className="py-2" aria-busy="true" aria-live="polite">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <Mail className="h-6 w-6 text-emerald-600 animate-pulse" aria-hidden />
        </div>
        <div className="mx-auto max-w-xs space-y-2 text-center">
          <h3 className="text-base font-bold text-gray-900">Setting up your trial…</h3>
          <p className="text-sm text-gray-600">
            Sending a setup link to <span className="font-semibold text-gray-900">{prefilledEmail}</span>.
          </p>
        </div>
        <div className="mt-5 space-y-3">
          <Skeleton className="h-14 w-full rounded-lg bg-stone-100" />
          <Skeleton className="h-14 w-full rounded-lg bg-stone-100" />
          <div className="space-y-2 pt-1">
            <Skeleton className="h-3 w-11/12 bg-stone-100" />
            <Skeleton className="h-3 w-8/12 bg-stone-100" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-3" aria-busy={pending}>
      <Input
        type="email"
        name="email"
        inputMode="email"
        autoComplete="email"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck={false}
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-14 text-base bg-white"
        aria-label="Work email"
        disabled={pending}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button
        type="submit"
        disabled={pending}
        className="w-full h-14 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25"
      >
        {pending ? 'Sending your link…' : 'Start my free trial'}
      </Button>
      {pending && (
        <div className="space-y-2 pt-1" aria-hidden>
          <Skeleton className="h-3 w-11/12 bg-stone-100" />
          <Skeleton className="h-3 w-7/12 bg-stone-100" />
        </div>
      )}
    </form>
  )
}
