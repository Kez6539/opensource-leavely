import type { Metadata } from 'next'
import { RegisterForm } from './register-form'
import { FormErrorBanner } from '@/components/shared/form-error-banner'
import Link from 'next/link'
import { SITE_URL } from '@/lib/seo'
import { OAuthErrorTracker } from '@/components/shared/oauth-error-tracker'
import { TrustBadges } from '@/components/shared/trust-badges'
import { headers } from 'next/headers'
import { isInAppBrowser } from '@/lib/in-app-browser'
import { microsoftEnabled } from '@/lib/oauth'

export const metadata: Metadata = {
  title: 'Start Free Trial — Leavely Leave Management Software',
  description:
    'Create your Leavely account and start your free 14-day trial. No credit card required. Set up leave management for your UK team in under 2 minutes.',
  alternates: { canonical: `${SITE_URL}/register` },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Start Your Free Trial',
    description:
      'Try Leavely free for 14 days. Leave management software for UK businesses — set up in 2 minutes, no credit card required.',
  },
}

const oauthErrors: Record<string, string> = {
  invalid_state: 'Your sign-in session expired or your browser blocked cookies. Try again, or use the email form below.',
  oauth_failed: 'We couldn\'t finish signing you in with Google. Please try again or use the email form below.',
  no_email: 'Google didn\'t share an email address. Please use the email form below to sign up.',
  email_not_verified: 'Your Google email isn\'t verified yet. Verify it with Google, then try again — or sign up with email below.',
  microsoft_not_configured: 'Microsoft sign-up isn\'t available yet. Please use Google or email below.',
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string
    ref?: string
    utm_campaign?: string
    utm_source?: string
    utm_medium?: string
    utm_content?: string
    email?: string
    gclid?: string
  }>
}) {
  const { error, ref, utm_campaign, utm_source, utm_medium, utm_content, email, gclid } = await searchParams
  const cleanParam = (value: string | undefined, maxLength = 120) =>
    typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength
      ? value.trim()
      : undefined
  const prefilledEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined
  const gclidValue = typeof gclid === 'string' && /^[A-Za-z0-9_-]{10,256}$/.test(gclid) ? gclid : undefined
  const errorMessage = error ? oauthErrors[error] ?? 'An unexpected error occurred.' : null

  const h = await headers()
  const inApp = isInAppBrowser(h.get('user-agent'))

  // NOTE: ref + utm_campaign + gclid cookies (for the OAuth round-trip) are set in
  // middleware.ts, NOT here. Calling cookies().set() during this Server
  // Component render throws and 500s the whole page — which is exactly what
  // used to break every ?ref= and ?utm_campaign= link to /register.

  return (
    <div className="min-h-[100svh] flex bg-[#FAF8F4] text-stone-900 relative overflow-hidden">
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

      {/* Left panel — copy + value props (desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center">
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 py-12">
          <div className="flex items-center gap-2.5 mb-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-500/20">
              L
            </div>
            <span className="font-semibold text-base tracking-tight">Leavely</span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-extrabold text-stone-900 leading-[1.05] tracking-tight">
            Get started<br />in minutes.
          </h1>
          <p className="text-stone-600 mt-4 text-base max-w-md leading-relaxed">
            Create your workspace and start managing your team&rsquo;s leave today. Free for 14 days, no credit card.
          </p>
          <TrustBadges className="mt-6 justify-start" />
          <div className="mt-10 space-y-3 max-w-sm">
            {[
              { label: 'Set up in 2 minutes', desc: 'Bank holidays auto-load, default policies ready' },
              { label: 'Invite your team', desc: 'CSV or one-by-one — staff sign in via email link' },
              { label: 'Free 14-day trial', desc: 'No credit card. £8/user/month after that.' },
            ].map((f) => (
              <div key={f.label} className="flex items-start gap-3 rounded-xl bg-white/80 border border-stone-200 p-3 shadow-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-stone-900 font-semibold text-sm">{f.label}</p>
                  <p className="text-stone-500 text-xs">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center relative p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-lg shadow-md shadow-emerald-500/20">
                L
              </div>
            </div>
            <p className="text-sm font-semibold tracking-tight text-stone-900">Leavely</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-xl shadow-stone-900/5 ring-1 ring-stone-200">
            <div className="text-center mb-5">
              <h2 className="text-xl font-bold tracking-tight text-stone-900">Create your account</h2>
              <p className="text-sm text-stone-500 mt-1">Start your free 14-day trial</p>
            </div>
            <FormErrorBanner message={errorMessage} className="mb-4" />
            {error && <OAuthErrorTracker error={error} intent="register" />}
            <RegisterForm
              referralCode={ref}
              utmCampaign={cleanParam(utm_campaign)}
              utmSource={cleanParam(utm_source)}
              utmMedium={cleanParam(utm_medium)}
              utmContent={cleanParam(utm_content)}
              gclid={gclidValue}
              hideOAuth={inApp}
              prefilledEmail={prefilledEmail}
              showMicrosoft={microsoftEnabled}
            />
            <p className="text-center text-sm text-stone-500 mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-emerald-700 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
          <TrustBadges className="mt-4" />
        </div>
      </div>
    </div>
  )
}
