import type { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle2,
  ArrowRight,
  Star,
  Sparkles,
  Shield,
  Clock,
  CreditCard,
  Percent,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SocialProofSection } from '@/components/shared/social-proof-section'
import { TrustBadges } from '@/components/shared/trust-badges'
import { SITE_URL } from '@/lib/seo'
import { PricingCalculator } from './pricing-calculator'

export const metadata: Metadata = {
  title: 'Pricing — £8/User/Month | Leave, Analytics & Clock-In',
  description:
    'Leavely pricing: £8 per user per month for unlimited leave, analytics and clock-in. 14 days free, no credit card required.',
  alternates: { canonical: `${SITE_URL}/pricing` },
  keywords: [
    'leave management software pricing',
    'leave management cost',
    'leave management software price UK',
    'employee leave tracker pricing',
    'absence management software cost',
    'affordable leave management',
    'leave management per user pricing',
  ],
  openGraph: {
    title: 'Leavely Pricing — £8/User/Month',
    description:
      'Unlimited leave, analytics and clock-in for £8/user/month. Start with 14 days free, no card required.',
    url: `${SITE_URL}/pricing`,
  },
}

const faqs = [
  {
    q: 'Is £8 per user all we pay?',
    a: 'Yes. £8 per active user per month includes every Leavely feature: unlimited leave requests, approvals, balances, absence analytics, clock-in, TOIL, Bradford Factor, documents, audit trail, UK bank holidays and email support. There are no setup fees or paid feature tiers.',
  },
  {
    q: 'What counts as a paid user?',
    a: 'A paid user is any active, non-archived employee in your workspace. Archived leavers are not billed, so your monthly cost adjusts as your team changes.',
  },
  {
    q: 'Can we try it before paying?',
    a: 'Yes. Every workspace starts with a 14-day free trial, full access to every feature and no credit card required. You can invite your team and test the real approval flow before subscribing.',
  },
  {
    q: 'Can we cancel without a contract?',
    a: 'Yes. There are no long-term contracts, cancellation penalties or exit fees. Cancel from billing settings and your access continues until the end of the current billing period.',
  },
  {
    q: 'Do we need a paid onboarding package?',
    a: 'No. Most teams set up Leavely in minutes by creating a workspace, inviting employees and choosing leave policies. If you need help, email support is included in the price.',
  },
  {
    q: 'Can finance pay annually or get an invoice?',
    a: 'Yes. Monthly billing is available by default, and annual billing saves 20%. If your finance team needs an annual invoice for procurement, get in touch and we will arrange one.',
  },
  {
    q: 'Are discounts available?',
    a: 'Yes. Charities, schools, NHS teams and social enterprises get 50% off. Early-stage startups get 25% off, applied to the full Leavely subscription.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Leavely Pricing',
      description: 'Pricing for Leavely leave management software.',
      url: `${SITE_URL}/pricing`,
    },
    {
      '@type': 'Product',
      name: 'Leavely',
      description: 'Leave management software for UK businesses',
      url: SITE_URL,
      offers: {
        '@type': 'Offer',
        price: '8.00',
        priceCurrency: 'GBP',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        description: 'Per user per month, billed monthly, with 20% savings on annual billing. 14-day free trial.',
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
          description: 'Cancel anytime. Access continues until end of billing period.',
        },
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ],
}

const tierFeatureGroups = [
  {
    tier: 'Tier 1: Core leave',
    subtitle: 'The essentials for moving leave out of spreadsheets.',
    features: [
      'Unlimited holiday and absence requests',
      'Visual team leave calendar',
      'One-click approvals',
      'Automatic balance tracking',
      'Custom leave policies',
      'UK public holidays built in',
    ],
  },
  {
    tier: 'Tier 2: Manager controls',
    subtitle: 'Approval, policy and absence controls for growing teams.',
    features: [
      'Role-based access control',
      'Company-wide leave blocks',
      'TOIL tracking',
      'Sick leave and return-to-work forms',
      'Bradford Factor monitoring',
      'Full audit trail',
    ],
  },
  {
    tier: 'Tier 3: Operations insight',
    subtitle: 'Reporting, clock-in and records for day-to-day HR operations.',
    features: [
      'Employee clock-in',
      'Leave and absence analytics',
      'Employee profiles and directory',
      'Document management',
      'Team invitations by email',
      'Email support',
    ],
  },
]

const pricingTableRows = [
  {
    plan: 'Monthly',
    price: '£8',
    cadence: 'per user / month',
    saving: 'No long contract',
    eligibility: 'Every team',
    bestFor: 'Teams that want flexible monthly billing',
  },
  {
    plan: 'Annual',
    price: '£6.40',
    cadence: 'per user / month equivalent',
    saving: 'Save 20%',
    eligibility: 'Every team',
    bestFor: 'Teams that know they will use Leavely all year',
  },
  {
    plan: 'Charity, education, NHS and social enterprise',
    price: '£4',
    cadence: 'per user / month',
    saving: '50% off',
    eligibility: 'Verified organisations',
    bestFor: 'Mission-led teams keeping HR admin lean',
  },
  {
    plan: 'Startup',
    price: '£6',
    cadence: 'per user / month',
    saving: '25% off',
    eligibility: 'Early-stage startups',
    bestFor: 'Small teams getting set up before HR gets messy',
  },
]

const comparisons = [
  { feature: 'Cost', spreadsheet: 'Looks free, costs manager time', leavely: '£8/user/month' },
  { feature: 'Leave requests', spreadsheet: 'Manual forms, messages and edits', leavely: 'Unlimited self-serve requests' },
  { feature: 'Approvals', spreadsheet: 'Email chains and version confusion', leavely: 'One-click manager approvals' },
  { feature: 'Balances', spreadsheet: 'Easy to break formulas', leavely: 'Automatic balance tracking' },
  { feature: 'Team visibility', spreadsheet: 'Static sheets that go stale', leavely: 'Live shared leave calendar' },
  { feature: 'Analytics', spreadsheet: 'Manual summaries', leavely: 'Built-in absence analytics' },
  { feature: 'Clock-in', spreadsheet: 'Separate timesheet process', leavely: 'Included clock-in' },
  { feature: 'Audit trail', spreadsheet: 'Hard to prove who changed what', leavely: 'Full audit history' },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MarketingNav showTrustBadges />

      <main>
        {/* ============================================== */}
        {/* HERO — rich emerald/teal gradient               */}
        {/* ============================================== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-emerald-700 via-emerald-600 to-teal-700 text-white">
          {/* Decorative blobs */}
          <div aria-hidden className="pointer-events-none absolute -top-32 -right-24 w-[520px] h-[520px] rounded-full bg-white/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute top-1/3 -left-40 w-[420px] h-[420px] rounded-full bg-teal-300/15 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute bottom-0 right-1/4 w-[320px] h-[320px] rounded-full bg-emerald-300/15 blur-3xl" />

          <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-28 md:pt-28 md:pb-36 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
              <Sparkles className="h-3 w-3" />
              £8/user/month · 14 days free
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-balance">
              Unlimited leave, analytics and clock-in.
              <br />
              <span className="text-emerald-100">One clear price.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-emerald-50/90 max-w-2xl mx-auto leading-relaxed">
              £8 per user per month for unlimited leave requests, absence analytics, clock-in, approvals and balances. Start with 14 days free. No credit card required.
            </p>

            {/* Price anchor chip */}
            <div className="mt-8 inline-flex items-baseline gap-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 shadow-xl">
              <span className="text-4xl md:text-5xl font-extrabold tabular-nums">£8</span>
              <span className="text-base md:text-lg text-emerald-50/80 font-medium">/ user / month</span>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register">
                <Button
                  size="lg"
                  className="text-base font-semibold px-8 h-12 bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg shadow-black/10"
                >
                  Start free trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#calculator">
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-base font-semibold px-6 h-12 text-white hover:bg-white/10 hover:text-white"
                >
                  See what you&rsquo;ll pay
                </Button>
              </a>
            </div>

            {/* Trust row */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-emerald-50/85">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-200" /> No credit card
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-200" /> Cancel anytime
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-200" /> Unlimited leave
              </span>
            </div>
          </div>

          {/* Curved bottom divider for a softer transition */}
          <div aria-hidden className="relative">
            <svg
              className="block w-full h-12 md:h-20 -mb-px text-white"
              viewBox="0 0 1440 80"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M0,80 L0,32 C240,72 480,72 720,48 C960,24 1200,24 1440,48 L1440,80 Z" />
            </svg>
          </div>
        </section>

        {/* ============================================== */}
        {/* SOCIAL PROOF BAND                               */}
        {/* ============================================== */}
        <section className="bg-white">
          <div className="max-w-5xl mx-auto px-6 -mt-16 md:-mt-20 relative z-10">
            <div className="rounded-2xl bg-white border shadow-xl shadow-emerald-500/5 px-6 py-5 md:px-8 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-gray-900">Rated 4.9</span>{' '}
                  <span className="text-gray-500">by UK teams</span>
                </div>
              </div>
              <div className="hidden md:block h-6 w-px bg-gray-200" />
              <p className="text-sm text-gray-600 text-center md:text-left italic max-w-md">
                &ldquo;Swapped a messy spreadsheet for Leavely. The whole team uses it — best £8 we spend.&rdquo;
              </p>
              <div className="hidden md:block h-6 w-px bg-gray-200" />
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-emerald-600" /> GDPR-ready
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-600" /> 2-min setup
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================== */}
        {/* PRICING CARD — on a coloured section            */}
        {/* ============================================== */}
        <section id="pricing" className="relative py-20 md:py-28 bg-gradient-to-b from-emerald-50/60 via-white to-white">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                One plan. Everything included.
              </h2>
              <p className="mt-3 text-base md:text-lg text-gray-500">
                £8/user/month for unlimited leave, analytics and clock-in. 14 days free.
              </p>
            </div>

            <div className="relative">
              {/* Glow halo */}
              <div aria-hidden className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-emerald-400/30 via-teal-400/20 to-emerald-500/30 blur-2xl" />

              <div className="relative rounded-2xl border-2 border-emerald-500 bg-white p-8 md:p-10 shadow-2xl shadow-emerald-500/20">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* Left: plan + price */}
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-700 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
                      <Zap className="h-3 w-3 shrink-0" />
                      Scalable plan
                    </div>
                    <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
                      <Percent className="h-3 w-3 shrink-0" />
                      Save 20% with annual billing
                    </div>
                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-6xl md:text-7xl font-extrabold text-gray-900 tabular-nums">£8</span>
                      <span className="text-lg text-gray-500 font-medium">/ user / month</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Billed monthly. You&apos;re only charged for active users.
                    </p>
                    <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                      <div className="flex items-start gap-3">
                        <Percent className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                        <div>
                          <p className="text-sm font-semibold text-amber-900">
                            Annual billing drops the equivalent rate to £6.40/user/month.
                          </p>
                          <p className="mt-1 text-xs text-amber-800">
                            Pay yearly to save 20% while keeping every Leavely feature included.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: CTA */}
                  <div className="md:w-64 md:pl-6 md:border-l md:border-gray-100">
                    <Link href="/register" className="block">
                      <Button
                        size="lg"
                        className="w-full text-base font-semibold h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25"
                      >
                        Start free trial
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <p className="mt-3 text-xs text-gray-500 text-center">
                      No credit card. Cancel anytime.
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-8 border-t border-dashed border-gray-200" />

                {/* Feature highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {[
                    'Unlimited leave requests',
                    'Visual team leave calendar',
                    'One-click approvals',
                    'Automatic balance tracking',
                    'Leave and absence analytics',
                    'Employee clock-in',
                    'TOIL and Bradford Factor',
                    'Full audit trail',
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Trust row */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-gray-500 border-t pt-5">
                  <span className="inline-flex items-center gap-1.5">
                    <CreditCard className="h-3.5 w-3.5 text-emerald-600" />
                    Monthly or annual billing
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-emerald-600" />
                    GDPR compliant
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-emerald-600" />
                    14-day free trial
                  </span>
                </div>
                <TrustBadges className="mt-5 border-t border-gray-100 pt-5" />
              </div>
            </div>

            {/* Discounts available — compact link */}
            <div className="mt-6 text-center">
              <Link
                href="#discounts"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                <Percent className="h-4 w-4" />
                Discounts available for charities, education, NHS & startups
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================== */}
        {/* RESPONSIVE PRICING TABLE                        */}
        {/* ============================================== */}
        <section className="bg-white py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                One clear price, with eligible discounts
              </h2>
              <p className="mt-3 text-sm md:text-base text-gray-500">
                Compare monthly, annual and discounted pricing without hidden tiers or feature gates.
              </p>
            </div>

            <div className="mt-8 grid gap-3 lg:hidden">
              {pricingTableRows.map((row) => (
                <article
                  key={row.plan}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm shadow-emerald-500/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-base font-extrabold text-gray-900">{row.plan}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                        {row.saving}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-3xl font-extrabold tabular-nums text-gray-900">{row.price}</p>
                      <p className="text-xs text-gray-500">{row.cadence}</p>
                    </div>
                  </div>
                  <dl className="mt-5 grid gap-3 text-sm">
                    <div className="flex items-start justify-between gap-4 border-t border-gray-100 pt-3">
                      <dt className="font-medium text-gray-500">Eligibility</dt>
                      <dd className="text-right font-semibold text-gray-800">{row.eligibility}</dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 border-t border-gray-100 pt-3">
                      <dt className="font-medium text-gray-500">Best for</dt>
                      <dd className="max-w-[12rem] text-right text-gray-700">{row.bestFor}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>

            <div className="mt-10 hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm lg:block">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="w-[24%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                      Plan
                    </th>
                    <th className="w-[20%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                      Price
                    </th>
                    <th className="w-[16%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                      Saving
                    </th>
                    <th className="w-[18%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                      Eligibility
                    </th>
                    <th className="w-[22%] px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-gray-500">
                      Best for
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pricingTableRows.map((row) => (
                    <tr key={row.plan} className="align-top">
                      <td className="px-5 py-5 text-sm font-bold text-gray-900">{row.plan}</td>
                      <td className="px-5 py-5">
                        <div className="flex flex-col">
                          <span className="text-2xl font-extrabold tabular-nums text-gray-900">
                            {row.price}
                          </span>
                          <span className="mt-1 text-xs text-gray-500">{row.cadence}</span>
                        </div>
                      </td>
                      <td className="px-5 py-5">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {row.saving}
                        </span>
                      </td>
                      <td className="px-5 py-5 text-sm text-gray-600">{row.eligibility}</td>
                      <td className="px-5 py-5 text-sm text-gray-600">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 flex flex-col gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 text-sm text-gray-700 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Every option includes unlimited leave requests, analytics, clock-in, support and the 14-day trial.
              </p>
              <Link
                href="/register"
                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                Start free trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ============================================== */}
        {/* PRICING CALCULATOR (unchanged logic)            */}
        {/* ============================================== */}
        <section id="calculator" className="relative bg-gradient-to-b from-white via-emerald-50/40 to-white py-20">
          <div className="max-w-2xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                Work out what you&apos;ll pay
              </h2>
              <p className="mt-2 text-sm md:text-base text-gray-500">
                Drag the slider — we&apos;ll show your monthly and annual cost.
              </p>
            </div>
            <PricingCalculator />
          </div>
        </section>

        <SocialProofSection />

        {/* ============================================== */}
        {/* DISCOUNTS (anchor #discounts)                   */}
        {/* ============================================== */}
        <section id="discounts" className="relative bg-white py-20 md:py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
                <Percent className="h-3 w-3" /> Discounts
              </div>
              <h2 className="mt-4 text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                Special pricing for organisations doing good work
              </h2>
              <p className="mt-3 text-sm md:text-base text-gray-500">
                Verified and applied at signup. Get in touch if you&apos;re not sure you qualify.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { href: '/charities', label: 'Charities', off: '50% off', bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', hover: 'hover:bg-purple-100' },
                { href: '/education-discount', label: 'Education', off: '50% off', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', hover: 'hover:bg-blue-100' },
                { href: '/nhs', label: 'NHS', off: '50% off', bg: 'bg-cyan-50', border: 'border-cyan-200', text: 'text-cyan-700', hover: 'hover:bg-cyan-100' },
                { href: '/social-enterprises', label: 'Social enterprises', off: '50% off', bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', hover: 'hover:bg-orange-100' },
                { href: '/startups', label: 'Startups', off: '25% off', bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', hover: 'hover:bg-indigo-100' },
              ].map((d) => (
                <Link
                  key={d.href}
                  href={d.href}
                  className={`group rounded-xl border ${d.border} ${d.bg} ${d.hover} p-4 text-center transition-all`}
                >
                  <p className={`text-sm font-bold ${d.text}`}>{d.label}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{d.off}</p>
                  <ArrowRight className={`h-3.5 w-3.5 ${d.text} mx-auto mt-2 opacity-70 group-hover:translate-x-0.5 transition-transform`} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================== */}
        {/* FEATURE BREAKDOWN                               */}
        {/* ============================================== */}
        <section className="bg-gradient-to-b from-gray-50/80 to-white border-y">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Feature tiers included for £8/user/month
              </h2>
              <p className="mt-3 text-base md:text-lg text-gray-500">
                These tiers show the feature depth included in the same plan. There are no paid upgrades to unlock manager controls, analytics or clock-in.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tierFeatureGroups.map((group) => (
                <div
                  key={group.tier}
                  className="rounded-2xl bg-white border p-6 shadow-sm shadow-emerald-500/5"
                >
                  <h3 className="text-lg font-extrabold text-gray-900">{group.tier}</h3>
                  <p className="mt-2 min-h-10 text-sm text-gray-500">{group.subtitle}</p>
                  <div className="mt-5 space-y-3">
                    {group.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="text-sm font-medium text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================== */}
        {/* COMPARISON TABLE                                */}
        {/* ============================================== */}
        <section className="max-w-4xl mx-auto px-6 py-20 md:py-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Spreadsheets vs Leavely
            </h2>
            <p className="mt-3 text-base md:text-lg text-gray-500">
              A spreadsheet starts cheap, then turns into manual work, missed updates and unclear ownership.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Feature</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Spreadsheets</th>
                  <th className="text-center px-6 py-4 text-sm font-semibold text-emerald-700">Leavely</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {row.spreadsheet}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                        <CheckCircle2 className="h-4 w-4" />
                        {row.leavely}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ============================================== */}
        {/* FAQ                                             */}
        {/* ============================================== */}
        <section id="faq" className="bg-gradient-to-b from-white to-emerald-50/40 border-t">
          <div className="max-w-3xl mx-auto px-6 py-20 md:py-24">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Pricing questions
              </h2>
              <p className="mt-3 text-base md:text-lg text-gray-500">
                Clear answers to the pricing objections teams usually raise before they sign up.
              </p>
            </div>
            <div className="grid gap-4">
              {faqs.map((faq) => (
                <article
                  key={faq.q}
                  className="rounded-2xl border bg-white p-6 shadow-sm shadow-emerald-500/5"
                >
                  <h3 className="text-base font-bold text-gray-900">{faq.q}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {faq.a}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================== */}
        {/* FROM THE BLOG                                   */}
        {/* ============================================== */}
        <section className="max-w-3xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight text-center mb-8">
            From our blog
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { href: '/blog/best-leave-management-software-uk', title: 'Best Leave Management Software UK 2026', desc: 'Key features, pricing, and what separates good tools from great ones.' },
              { href: '/blog/staff-holiday-tracker-uk', title: 'Staff Holiday Tracker: Stop Using Spreadsheets', desc: 'Why spreadsheets fail for leave tracking and how to switch.' },
              { href: '/blog/hr-software-small-business-uk', title: 'HR Software for Small Businesses UK', desc: 'Core features, pricing expectations, and how to evaluate platforms.' },
              { href: '/blog/switch-from-brighthr', title: 'How to Switch from BrightHR', desc: 'Step-by-step migration guide with cost comparisons.' },
            ].map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="group rounded-xl border bg-white p-5 hover:shadow-md hover:border-emerald-200 transition-all flex flex-col"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors text-sm mb-2 flex-1">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{post.desc}</p>
                <span className="inline-flex items-center text-xs font-semibold text-emerald-600">
                  Read article <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ============================================== */}
        {/* FINAL CTA                                       */}
        {/* ============================================== */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-700" />
          <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 w-[380px] h-[380px] rounded-full bg-white/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 w-[320px] h-[320px] rounded-full bg-teal-300/15 blur-3xl" />

          <div className="relative max-w-3xl mx-auto px-6 py-20 md:py-24 text-center text-white">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1 text-[11px] font-semibold tracking-wide uppercase">
              <Sparkles className="h-3 w-3" /> 14 days free · No card
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
              Start free trial
            </h2>
            <p className="mt-4 text-lg text-emerald-50/90">
              £8/user/month after trial for unlimited leave, analytics and clock-in.
            </p>
            <div className="mt-8">
              <Link href="/register">
                <Button
                  size="lg"
                  className="text-base font-semibold px-8 h-12 bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg shadow-black/10"
                >
                  Start free trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="mt-5 text-xs text-emerald-50/80">
              Trusted by UK teams from 5 to 250 staff · GDPR-ready · Made in the UK
            </p>
          </div>
        </section>
      </main>

      <MarketingFooter showTrustBadges />
    </div>
  )
}
