import type { Metadata } from 'next'
import type { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FileText,
  Fingerprint,
  HeartPulse,
  MapPin,
  MessageCircle,
  QrCode,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_URL, SITE_NAME } from '@/lib/seo'
import { Logo } from '@/components/shared/logo'
import { SocialProofSection } from '@/components/shared/social-proof-section'
import { TrustBadges } from '@/components/shared/trust-badges'
import { TrustedLogoStrip } from '@/components/shared/trusted-logo-strip'

type Icon = ComponentType<{ className?: string }>

const MarketingMobileNav = dynamic(() =>
  import('./_marketing-mobile-nav').then((mod) => mod.MarketingMobileNav)
)

const StickyCTA = dynamic(() =>
  import('@/components/shared/sticky-cta').then((mod) => mod.StickyCTA)
)

export const metadata: Metadata = {
  title: 'Leavely — Leave Management Software UK | Holiday Tracker for Small Business',
  description:
    'Leavely is leave management software for UK small businesses. Replace spreadsheets, WhatsApp holiday requests and manual absence tracking with holiday approvals, sickness records, rotas, TOIL and Bradford Factor insights. £8 per user/month. 14-day free trial, no credit card required.',
  alternates: { canonical: SITE_URL },
  keywords: [
    'leave management software UK',
    'holiday tracker for small business',
    'employee absence management',
    'staff holiday planner',
    'Bradford Factor software',
    'care home staff attendance',
    'TOIL tracker',
    'rota and leave management',
    'UK HR software for small business',
  ],
  openGraph: {
    title: 'Leavely — Leave Management Software for UK SMBs',
    description:
      'Replace holiday spreadsheets, WhatsApp requests and manual absence admin with one simple UK leave management system. £8/user/month. Try free for 14 days.',
    url: SITE_URL,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: SITE_NAME,
      url: SITE_URL,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'UK leave management and lightweight HR software for small businesses. Tracks holidays, sickness, rotas, TOIL, expenses, approvals and staff attendance.',
      offers: {
        '@type': 'Offer',
        price: '8.00',
        priceCurrency: 'GBP',
        description: '£8 per user per month. 14-day free trial. No setup fee.',
        availability: 'https://schema.org/InStock',
      },
      featureList: [
        'Holiday and absence management',
        'Staff holiday planner',
        'Sickness absence history',
        'Bradford Factor tracking',
        'Return-to-work forms',
        'TOIL tracking',
        'Rotas and shifts',
        'Expense claims',
        'QR clock-in and GPS attendance',
        'Digital audit trail',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much does Leavely cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leavely costs £8 per active user per month. There are no pricing tiers, setup fees or long contracts.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there a free trial?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely includes a 14-day free trial and no credit card is required to start.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Leavely support UK bank holidays?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely is built for UK teams and includes UK bank holidays so leave calculations are easier to manage.',
          },
        },
      ],
    },
  ],
}

const stopDoing = [
  {
    icon: FileText,
    title: 'Holiday spreadsheets',
    text: 'Stop maintaining fragile formulas and separate tabs for every team member.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp leave requests',
    text: 'Keep requests, approvals and comments in one place instead of buried in chats.',
  },
  {
    icon: Clock,
    title: 'Chasing approvals',
    text: 'Managers get a clear approval queue with enough context to make a decision quickly.',
  },
  {
    icon: BarChart3,
    title: 'Manual balance calculations',
    text: 'Balances update as leave is requested, approved, rejected or adjusted.',
  },
]

const managerCards = [
  {
    icon: CalendarDays,
    title: 'See who is off before you approve',
    text: 'A visual staff holiday planner helps managers spot clashes, busy periods and team coverage issues.',
  },
  {
    icon: HeartPulse,
    title: 'Keep sickness and absence history together',
    text: 'Track sickness, absence reasons, return-to-work notes and Bradford Factor indicators in one record.',
  },
  {
    icon: ClipboardCheck,
    title: 'One place for lightweight HR admin',
    text: 'Leave, rotas, TOIL, expenses and attendance sit together without needing a heavy HR suite.',
  },
]

const careFeatures = [
  { icon: QrCode, title: 'QR clock-in', text: 'Let staff clock in from an approved location or device with a simple QR flow.' },
  { icon: MapPin, title: 'GPS attendance checks', text: 'Record location context for clock-ins where your policy requires it.' },
  { icon: HeartPulse, title: 'Absence history', text: 'Keep sickness records, absence notes and repeat-pattern indicators organised.' },
  { icon: ClipboardCheck, title: 'Return-to-work forms', text: 'Store return-to-work notes alongside the related sickness absence record.' },
  { icon: BarChart3, title: 'Bradford Factor', text: 'Use Bradford Factor indicators to help highlight recurring short-term absence patterns.' },
  { icon: Fingerprint, title: 'Digital audit trail', text: 'Keep a clearer record of approvals, changes and staff HR actions for internal review.' },
]

const comparisonRows = [
  'Simple £8/user/month pricing rather than complicated bundles or add-ons.',
  'Built for owner-managers, care providers and small teams who need fast daily control.',
  'Leave, sickness, rotas, TOIL, expenses and clock-in in one lightweight workspace.',
  '14-day trial with no credit card, so you can compare it properly before switching.',
]

const trustedSmeLogos = [
  { name: 'Care providers', initials: 'CP' },
  { name: 'Accounting firms', initials: 'AF' },
  { name: 'Retail teams', initials: 'RT' },
  { name: 'Trades businesses', initials: 'TB' },
  { name: 'Professional services', initials: 'PS' },
  { name: 'Startups', initials: 'SU' },
]

const faqs = [
  {
    q: 'Who is Leavely best for?',
    a: 'UK small businesses that currently manage holidays, sickness, rotas, TOIL, expenses or attendance in spreadsheets, WhatsApp, email or separate tools.',
  },
  {
    q: 'Is Leavely only for HR departments?',
    a: 'No. It is built for real managers and owners who need clear day-to-day control without a complicated enterprise HR system.',
  },
  {
    q: 'Can care providers use it?',
    a: 'Yes. Leavely includes practical tools such as QR clock-in, GPS attendance context, absence history, return-to-work notes, Bradford Factor indicators and a digital audit trail. It does not claim CQC certification.',
  },
  {
    q: 'How is pricing worked out?',
    a: 'It is £8 per active user per month. For example, 10 staff is £80/month and 25 staff is £200/month. There are no tiers, setup fees or long contracts.',
  },
]

function SectionHeader({ eyebrow, title, text }: { eyebrow?: string; title: string; text: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow ? <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">{eyebrow}</p> : null}
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-950 md:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-gray-600 md:text-lg">{text}</p>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, text }: { icon: Icon; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-bold text-gray-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
    </div>
  )
}

function HeroDashboardPreview() {
  return (
    <div
      className="rounded-3xl border border-white/20 bg-white/10 p-4 shadow-2xl shadow-black/25 backdrop-blur-md"
      role="img"
      aria-label="Dashboard preview showing pending approvals, people off today and a leave clash warning"
    >
      <div className="rounded-2xl bg-white p-4 text-gray-950 shadow-xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Today</p>
            <h3 className="text-lg font-extrabold">Manager dashboard</h3>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">UK bank holidays on</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <DashboardMetric label="Pending" value="5" tone="amber" />
          <DashboardMetric label="Off today" value="3" tone="emerald" />
          <DashboardMetric label="Clashes" value="1" tone="red" />
        </div>

        <div className="mt-4 space-y-2">
          <PreviewRow icon={CalendarCheck} title="Annual leave request" text="5 days requested · enough balance" status="Approve" tone="emerald" />
          <PreviewRow icon={AlertTriangle} title="Possible team clash" text="Two people already off in the same department" status="Review" tone="amber" />
          <PreviewRow icon={HeartPulse} title="Sickness follow-up" text="Return-to-work note ready to complete" status="Open" tone="blue" />
        </div>
      </div>
    </div>
  )
}

function DashboardMetric({ label, value, tone }: { label: string; value: string; tone: 'amber' | 'emerald' | 'red' }) {
  const tones = {
    amber: 'bg-amber-50 text-amber-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    red: 'bg-red-50 text-red-700',
  }
  return (
    <div className={`rounded-xl p-3 text-center ${tones[tone]}`}>
      <p className="text-2xl font-black">{value}</p>
      <p className="text-[11px] font-semibold uppercase tracking-wide">{label}</p>
    </div>
  )
}

function PreviewRow({ icon: Icon, title, text, status, tone }: { icon: Icon; title: string; text: string; status: string; tone: 'emerald' | 'amber' | 'blue' }) {
  const tones = {
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    blue: 'bg-blue-50 text-blue-700',
  }
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tones[tone]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-gray-900">{title}</p>
        <p className="truncate text-xs text-gray-500">{text}</p>
      </div>
      <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-700 shadow-sm">{status}</span>
    </div>
  )
}

const trialCtaHref = '/register?utm_source=website&utm_campaign=homepage_trial_cta&utm_content=no_demo_ab_variant'

function CtaButtons({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link
        href={trialCtaHref}
        className="w-full sm:w-auto"
        data-experiment="homepage_trial_cta"
        data-variant="no_demo"
      >
        <Button
          size="lg"
          className={dark ? 'h-14 w-full px-8 text-base font-extrabold bg-white text-emerald-700 shadow-xl shadow-black/20 hover:bg-emerald-50 sm:w-auto' : 'h-14 w-full bg-emerald-600 px-8 text-base font-extrabold text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-700 sm:w-auto'}
        >
          Start free trial now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
      <p className={dark ? 'text-sm font-semibold text-emerald-50/90' : 'text-sm font-semibold text-gray-600'}>
        No demo required. No credit card.
      </p>
    </div>
  )
}

function TrustedBySmesBadge() {
  return (
    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-2 text-sm font-bold text-white shadow-lg shadow-black/10 backdrop-blur-sm">
      <CheckCircle2 className="h-4 w-4 text-emerald-200" />
      <span>Trusted by UK SMEs</span>
      <span className="hidden text-xs font-semibold text-emerald-50/80 sm:inline">100+ businesses</span>
    </div>
  )
}

function HeroTrustSignals() {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start" aria-label="UK trust signals">
      <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white px-3 py-2 text-sm font-extrabold text-emerald-900 shadow-lg shadow-black/10">
        <span aria-hidden className="text-lg leading-none">🇬🇧</span>
        <span>Built for UK businesses</span>
      </span>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white px-3 py-2 text-sm font-extrabold text-emerald-900 shadow-lg shadow-black/10">
        <ShieldCheck className="h-4 w-4 text-emerald-700" />
        <span>UK data protection</span>
      </span>
    </div>
  )
}

function TrustedSmeBar() {
  const scrollingLogos = [...trustedSmeLogos, ...trustedSmeLogos]

  return (
    <section className="border-b border-emerald-100 bg-white" aria-labelledby="trusted-sme-bar-heading">
      <div className="mx-auto max-w-6xl px-6 py-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="md:w-64 md:shrink-0">
            <p
              id="trusted-sme-bar-heading"
              className="text-center text-xs font-black uppercase tracking-[0.22em] text-emerald-700 md:text-left"
            >
              Trusted by 100+ UK SMEs
            </p>
            <p className="mt-1 text-center text-sm font-semibold text-gray-500 md:text-left">
              Care, retail, trades and office teams
            </p>
          </div>
          <div className="relative min-w-0 flex-1 overflow-hidden" aria-label="Example UK SME customer categories">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent"
            />
            <div className="flex w-max min-w-full animate-[trusted-sme-marquee_28s_linear_infinite] gap-3 motion-reduce:animate-none">
              {scrollingLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex h-16 w-52 shrink-0 items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-950 text-xs font-black tracking-wide text-white">
                    {logo.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-gray-950">{logo.name}</p>
                    <p className="truncate text-xs font-semibold text-gray-500">UK SME team</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-950">
      <StickyCTA />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header>
        <nav className="sticky top-0 z-50 border-b bg-white/85 backdrop-blur-lg" aria-label="Main navigation">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Leavely home">
              <Logo className="h-14" />
            </Link>
            <div className="hidden items-center gap-3 md:flex">
              <Link href="/features"><Button variant="ghost" size="sm">Features</Button></Link>
              <Link href="/pricing"><Button variant="ghost" size="sm">Pricing</Button></Link>
              <Link href="/compare"><Button variant="ghost" size="sm">Compare</Button></Link>
              <Link href="/blog"><Button variant="ghost" size="sm">Blog</Button></Link>
              <Link href="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
              <Link href={trialCtaHref}><Button size="sm" className="bg-emerald-600 font-bold hover:bg-emerald-700">Start free trial</Button></Link>
            </div>
            <div className="flex items-center gap-1 md:hidden">
              <Link href={trialCtaHref}><Button size="sm" className="bg-emerald-600 font-bold hover:bg-emerald-700">Try free</Button></Link>
              <MarketingMobileNav />
            </div>
          </div>
          <div className="border-t border-gray-100 bg-white/95 px-4 py-2">
            <TrustBadges compact className="mx-auto max-w-6xl" />
          </div>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white">
          <div aria-hidden className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />
          <div aria-hidden className="absolute -bottom-28 -left-24 h-[360px] w-[360px] rounded-full bg-teal-300/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:py-24 lg:grid-cols-12">
            <div className="min-w-0 text-center lg:col-span-6 lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em]">
                <Sparkles className="h-3.5 w-3.5" />
                UK leave management software
              </div>
              <HeroTrustSignals />
              <h1 className="mt-5 text-4xl font-black leading-[1.03] tracking-tight text-balance sm:text-5xl md:text-6xl">
                Run staff holidays and HR admin without spreadsheet chaos.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-emerald-50/90 sm:text-lg lg:mx-0">
                Leavely replaces holiday spreadsheets, WhatsApp requests, email approvals and manual absence tracking with one simple workspace for leave, sickness, rotas, TOIL, expenses and clock-in.
              </p>
              <p className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-extrabold text-emerald-800 shadow-lg shadow-black/10">
                Start today without booking a demo
              </p>
              <TrustedBySmesBadge />
              <div className="mt-8 flex justify-center lg:justify-start">
                <CtaButtons dark />
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-emerald-50/90 lg:justify-start">
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" />No credit card</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" />Cancel anytime</span>
                <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" />UK bank holidays included</span>
              </div>
            </div>
            <div className="min-w-0 lg:col-span-6">
              <HeroDashboardPreview />
            </div>
          </div>
        </section>

        <TrustedSmeBar />

        <section className="border-b bg-white">
          <div className="mx-auto grid max-w-6xl gap-4 px-6 py-8 sm:grid-cols-3">
            <div className="rounded-2xl bg-emerald-50 p-5"><p className="text-sm font-bold text-emerald-800">£8/user/month</p><p className="mt-1 text-sm text-emerald-700">Simple pricing. No tiers, setup fee or long contract.</p></div>
            <div className="rounded-2xl bg-gray-50 p-5"><p className="text-sm font-bold text-gray-900">14-day trial</p><p className="mt-1 text-sm text-gray-600">Try the full product before adding payment details.</p></div>
            <div className="rounded-2xl bg-teal-50 p-5"><p className="text-sm font-bold text-teal-800">Built for UK SMBs</p><p className="mt-1 text-sm text-teal-700">For care providers, sales teams, offices and trades businesses.</p></div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <SectionHeader eyebrow="Built for real managers" title="Not every small business has an HR department." text="Leavely is designed for the people actually approving holidays, checking cover, handling sickness and keeping staff admin moving day to day." />
          <div className="grid gap-6 md:grid-cols-3">
            {managerCards.map((item) => <FeatureCard key={item.title} {...item} />)}
          </div>
        </section>

        <section className="border-y bg-gray-50/70">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <SectionHeader eyebrow="What you stop doing" title="Replace the admin that eats your week." text="Give staff a proper request flow and give managers one place to approve, track and report." />
            <div className="grid gap-6 md:grid-cols-4">
              {stopDoing.map((item) => <FeatureCard key={item.title} {...item} />)}
            </div>
          </div>
        </section>

        <SocialProofSection />

        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:py-24 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Care providers</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-950 md:text-4xl">Cleaner attendance and absence records for care teams.</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Keep shift attendance, sickness history and return-to-work notes organised with practical tools that support internal reviews and inspection preparation. No CQC certification claim — just clearer records.
            </p>
            <div className="mt-7"><CtaButtons /></div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {careFeatures.map((item) => <FeatureCard key={item.title} {...item} />)}
          </div>
        </section>

        <section className="border-y bg-slate-950 text-white">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Compare before you switch</p>
                <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Why choose Leavely over bigger HR tools?</h2>
                <p className="mt-4 text-lg leading-8 text-slate-300">
                  BrightHR, Breathe and Timetastic can all be good options depending on your needs. Leavely is built for businesses that want straightforward UK leave and lightweight HR admin at a simple price.
                </p>
              </div>
              <div className="space-y-3 lg:col-span-7">
                {comparisonRows.map((row) => (
                  <div key={row} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                    <p className="text-sm leading-6 text-slate-100">{row}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24" id="pricing">
          <SectionHeader eyebrow="Simple pricing" title="Everything included for £8 per user per month." text="No feature tiers, no setup fee and no long contract. Start with the staff you need and scale when you are ready." />
          <div className="mx-auto max-w-4xl rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-xl md:p-8">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-gray-950">£8</span>
                  <span className="font-semibold text-gray-600">/ user / month</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">14-day free trial. No credit card required. Cancel anytime.</p>
                <div className="mt-6"><CtaButtons /></div>
              </div>
              <div className="space-y-3">
                <PriceExample staff="10 staff" price="£80/month" />
                <PriceExample staff="25 staff" price="£200/month" />
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="font-bold text-gray-950">Included</p>
                  <p className="mt-1 text-sm text-gray-600">Holiday tracker, absence management, rotas, TOIL, expenses, approvals, reports and clock-in.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y bg-gray-50/70">
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
            <SectionHeader eyebrow="FAQ" title="Questions UK small businesses ask before switching." text="Straight answers on pricing, setup and where Leavely fits." />
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-2xl border bg-white p-5 shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-gray-950">
                    {faq.q}
                    <Zap className="h-4 w-4 text-emerald-600 transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-emerald-700 to-teal-800 text-white">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-24">
            <ShieldCheck className="mx-auto mb-5 h-10 w-10 text-emerald-200" />
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">Ready to replace the spreadsheet?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-emerald-50/90">
              Start your 14-day trial and see how Leavely handles staff holidays, absence, rotas and HR admin for your business.
            </p>
            <div className="mt-8 flex justify-center"><CtaButtons dark /></div>
            <p className="mt-4 text-sm text-emerald-50/80">No credit card required · Cancel anytime · UK bank holidays included</p>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col gap-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
            <Logo className="h-10" />
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-900">Terms</Link>
              <Link href={trialCtaHref} className="font-semibold text-emerald-700 hover:text-emerald-800">Start free trial</Link>
            </div>
          </div>
          <TrustedLogoStrip className="mt-6 border-t border-gray-100 pt-6" />
          <TrustBadges className="mt-6 border-t border-gray-100 pt-6" />
        </div>
      </footer>
    </div>
  )
}

function PriceExample({ staff, price }: { staff: string; price: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
      <span className="font-semibold text-gray-700">{staff}</span>
      <span className="text-xl font-black text-emerald-700">{price}</span>
    </div>
  )
}
