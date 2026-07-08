import type { Metadata } from 'next'
import { LoginForm } from './login-form'
import Link from 'next/link'
import { CalendarDays, Clock, Users } from 'lucide-react'
import { SITE_URL } from '@/lib/seo'
import { OAuthErrorTracker } from '@/components/shared/oauth-error-tracker'
import { headers } from 'next/headers'
import { isInAppBrowser } from '@/lib/in-app-browser'
import { getSession } from '@/lib/session'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import { logoutAction } from './logout-action'
import { microsoftEnabled } from '@/lib/oauth'

export const metadata: Metadata = {
  title: 'Sign In to Leavely — Leave Management Dashboard',
  description:
    'Sign in to your Leavely leave management dashboard. Manage employee holidays, approve leave requests, and track team absences.',
  alternates: { canonical: `${SITE_URL}/login` },
  robots: { index: false, follow: true },
}

const features = [
  { icon: CalendarDays, label: 'Leave Calendar', desc: 'See who\'s off at a glance' },
  { icon: Clock, label: 'One-Click Approvals', desc: 'Approve or decline requests in seconds' },
  { icon: Users, label: 'Team Management', desc: 'Organize your entire team in one place' },
]

const successMessages: Record<string, string> = {
  password_reset: 'Your password has been reset. Please sign in with your new password.',
}

const oauthErrors: Record<string, string> = {
  invalid_state: 'Your sign-in session expired or your browser blocked cookies. Please try again.',
  oauth_failed: 'We couldn\'t finish signing you in with Google. Please try again.',
  no_email: 'Google didn\'t share an email address. Please sign in with your email and password.',
  no_account: 'No account found with that email. Please sign up first.',
  provider_mismatch: 'This email is already registered with a different provider.',
  email_registered_with_password: 'This email is already registered with a password. Please sign in with your email and password.',
  email_not_verified: 'Your Google email isn\'t verified yet. Verify it with Google, then try again.',
  account_disabled: 'This account has been disabled. Please contact your administrator.',
  microsoft_not_configured: 'Microsoft sign-in isn\'t available yet. Please use Google or email/password.',
  demo_rate_limited: 'Too many demo attempts. Please wait a minute and try again.',
  demo_unavailable: 'The demo is temporarily unavailable. Please try again shortly.',
  demo_db_error: 'The demo is temporarily unavailable. Please try again shortly.',
  demo_session_error: 'We couldn\'t start the demo session. Please try again.',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; provider?: string; success?: string; redirect?: string }>
}) {
  const { error, provider, success, redirect: redirectParam } = await searchParams
  const h = await headers()
  const inApp = isInAppBrowser(h.get('user-agent'))
  let errorMessage = error ? oauthErrors[error] ?? 'An unexpected error occurred.' : null
  if (error === 'provider_mismatch' && provider) {
    errorMessage = `This email is already registered with ${provider}. Please sign in with ${provider} instead.`
  }

  // (#169) If the user is already signed in AND they're following an explicit
  // redirect (e.g. an invite link), honour it instead of dropping them on this
  // form. For a bare /login visit we now show the form with a banner so users
  // can switch accounts without going via the topbar dropdown.
  const session = await getSession()
  let activeSession: { email: string; dashboardSlug: string | null } | null = null
  if (session.userId) {
    if (
      redirectParam &&
      redirectParam.startsWith('/') &&
      !redirectParam.startsWith('//') &&
      !redirectParam.includes('\\')
    ) {
      redirect(redirectParam)
    }
    const membership = await prisma.membership.findFirst({
      where: { userId: session.userId },
      include: { tenant: { select: { slug: true } } },
    })
    activeSession = {
      email: session.email ?? '',
      dashboardSlug: membership?.tenant.slug ?? null,
    }
  }

  return (
    <div className="min-h-[100svh] flex bg-[#FAF8F4] text-stone-900 relative overflow-hidden">
      {/* Soft emerald spotlight + grain — matches /try and onboarding */}
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

      {/* Left panel — copy + value props (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center">
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 py-12">
          <div className="flex items-center gap-2.5 mb-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-md shadow-emerald-500/20">
              L
            </div>
            <span className="font-semibold text-base tracking-tight">Leavely</span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-extrabold text-stone-900 leading-[1.05] tracking-tight">
            Welcome back.
          </h1>
          <p className="text-stone-600 mt-4 text-base max-w-md leading-relaxed">
            Sign in to manage your team&rsquo;s leave, track balances, and keep everyone in sync.
          </p>
          <div className="mt-10 space-y-4 max-w-sm">
            {features.map((f) => (
              <div key={f.label} className="flex items-start gap-3 rounded-xl bg-white/80 border border-stone-200 p-3 shadow-sm">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <f.icon className="h-4 w-4" />
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

      {/* Right panel — sign-in form */}
      <div className="flex-1 flex items-center justify-center relative p-6">
        <div className="w-full max-w-sm">
          {/* Mobile-only branding */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex justify-center mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold text-lg shadow-md shadow-emerald-500/20">
                L
              </div>
            </div>
            <p className="text-sm font-semibold tracking-tight text-stone-900">Leavely</p>
            <p className="text-xs text-stone-500 mt-0.5">Leave management, made simple</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-xl shadow-stone-900/5 ring-1 ring-stone-200">
            <div className="text-center mb-5">
              <h2 className="text-xl font-bold tracking-tight text-stone-900">Sign in to your account</h2>
              <p className="text-sm text-stone-500 mt-1">Enter your credentials to continue</p>
            </div>
            {activeSession && (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 mb-4">
                <p className="text-sm text-emerald-900">
                  You&rsquo;re already signed in{activeSession.email ? ` as ${activeSession.email}` : ''}.
                </p>
                <div className="flex items-center gap-3 mt-2">
                  {activeSession.dashboardSlug && (
                    <Link
                      href={`/t/${activeSession.dashboardSlug}/dashboard`}
                      className="text-sm font-semibold text-emerald-700 hover:underline"
                    >
                      Continue to dashboard
                    </Link>
                  )}
                  <form action={logoutAction}>
                    <button type="submit" className="text-sm text-stone-600 hover:underline">
                      Sign in as different user
                    </button>
                  </form>
                </div>
              </div>
            )}
            {success && successMessages[success] && (
              <div className="rounded-lg bg-emerald-50 text-emerald-700 text-sm p-3 font-medium mb-4 border border-emerald-200">
                {successMessages[success]}
              </div>
            )}
            {errorMessage && (
              <div className="rounded-lg bg-destructive/10 text-destructive text-sm p-3 font-medium mb-4">
                {errorMessage}
              </div>
            )}
            {error && <OAuthErrorTracker error={error} intent="login" />}
            <LoginForm hideOAuth={inApp} showMicrosoft={microsoftEnabled} />
            <div className="text-center text-sm text-stone-500 mt-6 space-y-2">
              <p>
                Don&rsquo;t have an account?{' '}
                <Link href="/register" className="text-emerald-700 hover:underline font-medium">
                  Sign up free
                </Link>
              </p>
              <p>
                Or{' '}
                <Link href="/book-a-demo" className="text-emerald-700 hover:underline font-medium">
                  book a demo
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
