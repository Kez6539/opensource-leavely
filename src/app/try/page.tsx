import type { Metadata } from 'next'
import { Logo } from '@/components/shared/logo'
import { TrustBadges } from '@/components/shared/trust-badges'
import { TrustedLogoStrip } from '@/components/shared/trusted-logo-strip'
import { SITE_URL } from '@/lib/seo'
import { TryForm } from './try-form'
import { Check, CalendarDays, Plane, Thermometer, Clock, ShieldCheck, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Start your free Leavely trial — Leave management for UK teams',
  description:
    '14-day free trial. No credit card. Stop chasing holiday requests on spreadsheets — Leavely tracks leave, sickness and balances for your whole team.',
  alternates: { canonical: `${SITE_URL}/try` },
  robots: { index: false, follow: false },
}

export default async function TryPage({
  searchParams,
}: {
  searchParams: Promise<{
    utm_campaign?: string
    utm_source?: string
    utm_medium?: string
    utm_content?: string
    pe?: string
    gclid?: string
    company?: string
    src?: string
  }>
}) {
  const { utm_campaign, utm_source, utm_medium, utm_content, pe, gclid, company, src } = await searchParams
  const cleanParam = (value: string | undefined, maxLength = 120) =>
    typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength
      ? value.trim()
      : undefined
  const prefilledEmail =
    typeof pe === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pe.trim())
      ? pe.trim().toLowerCase()
      : null
  const gclidValue = typeof gclid === 'string' && /^[A-Za-z0-9_-]{10,256}$/.test(gclid) ? gclid : null
  const demoCompany =
    typeof company === 'string' && company.trim().length > 0 && company.trim().length <= 80
      ? company.trim()
      : null
  const source =
    typeof src === 'string' && src.trim().length > 0 && src.trim().length <= 40
      ? src.trim()
      : 'try'

  return (
    <div className="min-h-[100svh] flex flex-col bg-[#FAF8F4] text-stone-900 relative overflow-hidden">
      {/* Soft emerald radial spotlight — single accent, not a gradient sweep */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[680px]"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 30%, rgba(5, 150, 105, 0.10), rgba(5, 150, 105, 0) 70%)',
        }}
      />
      {/* Off-white grain texture (subtle) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />

      <header className="relative px-5 pt-5 pb-2 flex items-center justify-between max-w-6xl w-full mx-auto">
        <Logo className="h-12" />
        <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-white border border-stone-200 px-3 py-1 text-[11px] font-semibold text-stone-700 shadow-sm">
          <ShieldCheck className="h-3 w-3 text-emerald-600" />
          UK-built · GDPR-ready
        </div>
      </header>

      <main className="relative flex-1 flex flex-col px-5 pt-6 pb-12">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-start">
          {/* LEFT — copy + form */}
          <div className="max-w-md mx-auto lg:mx-0 w-full">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase text-emerald-700">
              <Plane className="h-3 w-3" />
              UK leave tracker
            </div>
            <h1 className="mt-4 text-[34px] lg:text-[44px] leading-[1.05] font-extrabold tracking-tight text-balance text-stone-900">
              Stop chasing holiday requests on spreadsheets.
            </h1>
            <p className="mt-4 text-[15px] lg:text-[16px] text-stone-600 leading-relaxed">
              Saves a few hours of holiday admin every week. Set up in 2 minutes — no credit card to start.
            </p>

            {/* Pricing chip */}
            <div className="mt-5 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl bg-white border border-stone-200 px-4 py-2 text-sm text-stone-700 shadow-sm">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="font-bold text-stone-900">£8 / user / month</span>
              </span>
              <span className="text-stone-300">·</span>
              <span>14-day free trial</span>
              <span className="text-stone-300">·</span>
              <span>Cancel anytime</span>
            </div>

            {/* Form card */}
            <div className="mt-6 rounded-2xl bg-white p-5 sm:p-6 shadow-xl shadow-stone-900/5 ring-1 ring-stone-200">
              <h2 className="text-base font-bold text-stone-900">Start your 14-day free trial</h2>
              <p className="text-xs text-stone-500 mt-0.5 mb-4">
                We&rsquo;ll email a one-click setup link — no password, no card, takes ~2 mins.
              </p>
              <TryForm
                utmCampaign={cleanParam(utm_campaign)}
                utmSource={cleanParam(utm_source)}
                utmMedium={cleanParam(utm_medium)}
                utmContent={cleanParam(utm_content)}
                prefilledEmail={prefilledEmail}
                gclid={gclidValue}
                demoCompany={demoCompany}
                source={source}
              />
              <TrustBadges className="mt-4 justify-start border-t border-stone-100 pt-4" />
              <ul className="mt-4 space-y-1.5 text-[13px] text-stone-600">
                {[
                  'Full access for 14 days — every feature',
                  'Christmas closures auto-deduct from staff allowance',
                  'Export your data any time you want',
                ].map((t) => (
                  <li key={t} className="flex items-start gap-1.5">
                    <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-600" aria-hidden />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-5 text-[12px] text-center lg:text-left text-stone-500">
              Built for UK teams from 5 to 250 staff · Bank holidays auto-loaded · Made in the UK
            </p>
          </div>

          {/* RIGHT — demo card + supporting tiles */}
          <div className="space-y-5 lg:mt-2">
            <div className="rounded-2xl bg-white border border-stone-200 p-5 shadow-xl shadow-stone-900/5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-stone-500" />
                  <span className="text-xs font-semibold text-stone-700">This week · who&rsquo;s off</span>
                </div>
                <span className="text-[10px] font-medium tracking-wider uppercase text-stone-400">APR 20 – 26</span>
              </div>
              <div className="space-y-2">
                <Row colour="bg-emerald-500" name="Sarah — Annual leave" days="Mon – Wed" icon={<Plane className="h-3 w-3" />} />
                <Row colour="bg-amber-500" name="Tom — Sickness" days="Tue" icon={<Thermometer className="h-3 w-3" />} />
                <Row colour="bg-teal-500" name="Priya — Half day" days="Fri PM" icon={<CalendarDays className="h-3 w-3" />} />
                <Row colour="bg-purple-500" name="Christmas Shutdown — whole company" days="29 – 31 Dec" icon={<Sparkles className="h-3 w-3" />} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Tile
                icon={<Clock className="h-4 w-4" />}
                title="2-minute setup"
                body="Import staff via CSV or invite by email. Bank holidays auto-loaded for your country."
              />
              <Tile
                icon={<ShieldCheck className="h-4 w-4" />}
                title="No password to remember"
                body="Sign in via email link — fast for the team, secure (single-use, expires in 20 mins)."
              />
              <Tile
                icon={<Sparkles className="h-4 w-4" />}
                title="Mandatory closures"
                body="Set a Christmas shutdown once — Leavely deducts the days off everyone&rsquo;s allowance automatically."
              />
              <Tile
                icon={<CalendarDays className="h-4 w-4" />}
                title="Calendar feed"
                body="Sync team leave into Google Calendar, Outlook or Apple Calendar — no extra app."
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="relative px-5 pb-6 text-center text-[11px] text-stone-500">
        <TrustedLogoStrip className="mx-auto mb-6 max-w-6xl border-t border-stone-200 pt-6" />
        <div>
          © Leavely · UK leave management software ·{' '}
          <a href="/privacy" className="hover:text-stone-800 underline-offset-2 hover:underline">Privacy</a>
          {' · '}
          <a href="/terms" className="hover:text-stone-800 underline-offset-2 hover:underline">Terms</a>
        </div>
      </footer>
    </div>
  )
}

function Row({ colour, name, days, icon }: { colour: string; name: string; days: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-stone-50 border border-stone-100 px-3 py-2">
      <span className={`h-2 w-2 rounded-full ${colour}`} />
      <span className="text-[13px] font-medium text-stone-800 flex-1 truncate">{name}</span>
      <span className="flex items-center gap-1 text-[11px] text-stone-500 shrink-0">
        {icon}
        {days}
      </span>
    </div>
  )
}

function Tile({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-xl bg-white border border-stone-200 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
          {icon}
        </span>
        <h3 className="text-sm font-semibold text-stone-900">{title}</h3>
      </div>
      <p className="text-xs text-stone-600 leading-relaxed">{body}</p>
    </div>
  )
}
