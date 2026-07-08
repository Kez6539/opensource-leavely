'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Label } from '@/components/ui/label'
import { FormErrorBanner } from '@/components/shared/form-error-banner'
import { useActionState, useCallback, useMemo, useRef } from 'react'
import { registerAction, type RegisterState } from './actions'
import { type ConversionAttribution, trackRegistrationStarted, trackLeadCaptured } from '@/lib/analytics'
import { GoogleIcon, MicrosoftIcon } from '@/components/shared/oauth-icons'

const discountConfig: Record<string, { orgLabel: string; orgPlaceholder: string; refLabel: string; refPlaceholder: string; refHint: string }> = {
  charity: { orgLabel: 'Organisation name', orgPlaceholder: 'e.g. Oxfam UK', refLabel: 'Registered charity number', refPlaceholder: 'e.g. 1234567', refHint: 'Your Charity Commission, OSCR, or CCNI number. Required for 50% discount.' },
  education: { orgLabel: 'School / institution name', orgPlaceholder: 'e.g. Riverside Academy', refLabel: 'URN or institution reference', refPlaceholder: 'e.g. 123456', refHint: 'Your school URN, UKPRN, or institution name. Required for 50% discount.' },
  nhs: { orgLabel: 'NHS organisation name', orgPlaceholder: 'e.g. Leeds Teaching Hospitals NHS Trust', refLabel: 'ODS code or organisation name', refPlaceholder: 'e.g. RR8', refHint: 'Your NHS ODS code or organisation name. Required for 50% discount.' },
  social_enterprise: { orgLabel: 'Organisation name', orgPlaceholder: 'e.g. Social Impact CIC', refLabel: 'CIC or registration number', refPlaceholder: 'e.g. 12345678', refHint: 'Your Companies House CIC number or registration reference. Required for 50% discount.' },
  startup: { orgLabel: 'Company name', orgPlaceholder: 'e.g. TechStart Ltd', refLabel: 'Companies House number (optional)', refPlaceholder: 'e.g. 12345678', refHint: 'Optional. Startups under 10 employees qualify for 25% off.' },
}

export function RegisterForm({
  referralCode,
  utmCampaign,
  utmSource,
  utmMedium,
  utmContent,
  gclid,
  hideOAuth,
  prefilledEmail,
  showMicrosoft,
}: {
  referralCode?: string
  utmCampaign?: string
  utmSource?: string
  utmMedium?: string
  utmContent?: string
  gclid?: string
  hideOAuth?: boolean
  prefilledEmail?: string
  showMicrosoft?: boolean
}) {
  const discount = utmCampaign ? discountConfig[utmCampaign] : null
  const [state, formAction, pending] = useActionState<RegisterState, FormData>(registerAction, { error: '' })
  const tracked = useRef(false)
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

  const captureLead = useCallback(() => {
    if (tracked.current) return
    const form = document.querySelector('form')
    if (!form) return
    const fd = new FormData(form)
    const email = (fd.get('email') as string)?.trim()
    if (!email || !email.includes('@')) return
    tracked.current = true
    trackLeadCaptured('register', attribution)
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name: (fd.get('name') as string)?.trim() || undefined,
        company: (fd.get('company') as string)?.trim() || undefined,
        industry: utmCampaign || undefined,
      }),
    }).catch(() => { tracked.current = false })
  }, [attribution, utmCampaign])

  return (
    <div className="space-y-4">
      {!hideOAuth && (
        <>
          {/* OAuth buttons */}
          <div className="space-y-2">
            <a href="/api/auth/google?intent=register" onClick={() => trackRegistrationStarted('google', attribution)}>
              <Button variant="outline" className="w-full h-11 md:h-10 font-medium gap-2" type="button">
                <GoogleIcon />
                Continue with Google
              </Button>
            </a>
            {showMicrosoft && (
              <a href="/api/auth/microsoft?intent=register" onClick={() => trackRegistrationStarted('microsoft', attribution)}>
                <Button variant="outline" className="w-full h-11 md:h-10 font-medium gap-2" type="button">
                  <MicrosoftIcon />
                  Continue with Microsoft
                </Button>
              </a>
            )}
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>
        </>
      )}

      {/* Email/password form */}
      <form action={(fd) => { trackRegistrationStarted('email', attribution); formAction(fd) }} className="space-y-4">
        {referralCode && <input type="hidden" name="ref" value={referralCode} />}
        {utmCampaign && <input type="hidden" name="utm_campaign" value={utmCampaign} />}
        {utmSource && <input type="hidden" name="utm_source" value={utmSource} />}
        {utmMedium && <input type="hidden" name="utm_medium" value={utmMedium} />}
        {utmContent && <input type="hidden" name="utm_content" value={utmContent} />}
        {gclid && <input type="hidden" name="gclid" value={gclid} />}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">Your name</Label>
          <Input id="name" name="name" placeholder="Jane Smith" required autoComplete="name" className="h-11 md:h-10" defaultValue={state.values?.name ?? ''} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company" className="text-sm font-medium">{discount?.orgLabel ?? 'Company name'}</Label>
          <Input id="company" name="company" placeholder={discount?.orgPlaceholder ?? 'Acme Inc.'} required autoComplete="organization" className="h-11 md:h-10" defaultValue={state.values?.company ?? ''} />
        </div>
        {discount && (
          <div className="space-y-2">
            <Label htmlFor="discountRef" className="text-sm font-medium">{discount.refLabel}</Label>
            <Input id="discountRef" name="discountRef" placeholder={discount.refPlaceholder} required={utmCampaign !== 'startup'} className="h-11 md:h-10" />
            <p className="text-xs text-muted-foreground">{discount.refHint}</p>
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">Work email</Label>
          <Input id="email" name="email" type="email" placeholder="you@company.com" required autoComplete="email" defaultValue={state.values?.email ?? prefilledEmail ?? ''} className="h-11 md:h-10" onBlur={captureLead} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">Password</Label>
          <PasswordInput id="password" name="password" placeholder="At least 8 characters" required minLength={8} autoComplete="new-password" aria-describedby="password-hint" className="h-11 md:h-10" />
          {/* Persistent hint so a too-short password isn't a silent native
              validation popup that disappears the moment the user types. */}
          <p id="password-hint" className="text-xs text-muted-foreground">
            Use at least 8 characters. Pick something only you would guess.
          </p>
        </div>
        <FormErrorBanner message={state.error} />
        <Button
          type="submit"
          className="w-full h-11 md:h-10 font-semibold shadow-md shadow-emerald-500/20 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all duration-150"
          disabled={pending}
        >
          {pending ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
    </div>
  )
}
