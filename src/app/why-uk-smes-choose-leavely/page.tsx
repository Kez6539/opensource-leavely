import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Clock, CreditCard, ShieldCheck, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingFooter, MarketingNav } from '@/components/marketing-layout'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

const pageUrl = `${SITE_URL}/why-uk-smes-choose-leavely`
const registerUrl = '/register?utm_source=website&utm_campaign=why_uk_smes_choose_leavely'

export const metadata: Metadata = {
  title: 'Why UK SMEs Choose Leavely: Compare BreatheHR, Timetastic, CharlieHR',
  description:
    'Compare Leavely with BreatheHR, Timetastic, and CharlieHR side by side. See why UK SMEs choose Leavely for leave, sickness, rotas, clock-in, expenses, and clear pricing.',
  alternates: { canonical: pageUrl },
  keywords: [
    'why UK SMEs choose Leavely',
    'Leavely comparison',
    'BreatheHR vs Timetastic vs CharlieHR',
    'best leave management software for UK SMEs',
    'BreatheHR alternative',
    'Timetastic alternative',
    'CharlieHR alternative',
    'UK SME HR software comparison',
  ],
  openGraph: {
    title: 'Why UK SMEs Choose Leavely',
    description:
      'Side-by-side comparison of Leavely, BreatheHR, Timetastic, and CharlieHR for UK SMEs.',
    url: pageUrl,
    type: 'website',
  },
}

type FeatureValue = boolean | string

type CompetitorKey = 'leavely' | 'breathehr' | 'timetastic' | 'charliehr'

type ComparisonRow = {
  feature: string
} & Record<CompetitorKey, FeatureValue>

type SummaryCard = {
  name: string
  bestFor: string
  pricing: string
  note: string
  highlighted?: boolean
}

const summaryCards: SummaryCard[] = [
  {
    name: 'Leavely',
    bestFor: 'UK SMEs that want leave, sickness, rotas, clock-in, expenses, and performance in one simple workspace.',
    pricing: '£8/user/month',
    note: 'Every Leavely feature included, with a 14-day trial and no credit card required.',
    highlighted: true,
  },
  {
    name: 'BreatheHR',
    bestFor: 'SMEs that want a broader HR admin platform with leave management included.',
    pricing: 'Package dependent',
    note: 'Good fit when employee records and wider HR admin are the main buying reason.',
  },
  {
    name: 'Timetastic',
    bestFor: 'Teams that only need a focused holiday booking and absence calendar tool.',
    pricing: 'Low per-user entry price',
    note: 'Simple leave tracking, but not designed as a wider workforce operations platform.',
  },
  {
    name: 'CharlieHR',
    bestFor: 'Startups that want modern HR basics and people admin in a polished product.',
    pricing: 'Plan dependent',
    note: 'Useful HR workflows, but buyers should check plan details as teams grow.',
  },
]

const comparisonRows: ComparisonRow[] = [
  { feature: 'Annual leave requests and approvals', leavely: true, breathehr: true, timetastic: true, charliehr: true },
  { feature: 'Visual team leave calendar', leavely: true, breathehr: true, timetastic: true, charliehr: true },
  { feature: 'Automatic holiday balance tracking', leavely: true, breathehr: true, timetastic: true, charliehr: true },
  { feature: 'UK bank holiday support', leavely: true, breathehr: true, timetastic: true, charliehr: true },
  { feature: 'Sickness absence tracking', leavely: true, breathehr: true, timetastic: 'Limited', charliehr: true },
  { feature: 'Bradford Factor visibility', leavely: true, breathehr: 'Check plan', timetastic: false, charliehr: false },
  { feature: 'Return-to-work records', leavely: true, breathehr: 'Check plan', timetastic: false, charliehr: false },
  { feature: 'TOIL tracking', leavely: true, breathehr: true, timetastic: false, charliehr: false },
  { feature: 'Rotas and shift planning', leavely: true, breathehr: 'Package dependent', timetastic: false, charliehr: false },
  { feature: 'Employee clock-in and attendance', leavely: true, breathehr: 'Package dependent', timetastic: false, charliehr: false },
  { feature: 'Expense management', leavely: true, breathehr: 'Package dependent', timetastic: false, charliehr: false },
  { feature: 'Performance reviews', leavely: true, breathehr: true, timetastic: false, charliehr: true },
  { feature: 'Document management', leavely: true, breathehr: true, timetastic: false, charliehr: true },
  { feature: 'Audit trail for leave decisions', leavely: true, breathehr: true, timetastic: 'Basic', charliehr: 'Check plan' },
  { feature: 'Department clash detection', leavely: true, breathehr: 'Manual', timetastic: false, charliehr: false },
  { feature: 'One published Leavely plan', leavely: true, breathehr: false, timetastic: true, charliehr: false },
  { feature: 'All core workforce features included', leavely: true, breathehr: 'Package dependent', timetastic: false, charliehr: 'Plan dependent' },
  { feature: 'Free trial without credit card', leavely: true, breathehr: true, timetastic: true, charliehr: true },
]

const reasons = [
  {
    title: 'Built around the manager approval moment',
    copy:
      'Leavely brings leave requests, balances, sickness history, rota coverage, and clock-in context into the same operational view, so managers can approve time off with fewer side checks.',
    icon: Clock,
  },
  {
    title: 'Clear pricing for budget-conscious SMEs',
    copy:
      'UK small businesses can model Leavely at £8 per user per month before speaking to anyone. There are no Leavely feature tiers to decode during the buying process.',
    icon: CreditCard,
  },
  {
    title: 'Absence controls beyond basic holiday booking',
    copy:
      'Bradford Factor visibility, sickness tracking, TOIL, return-to-work records, restricted dates, and audit trails help SMEs move from simple booking to proper absence management.',
    icon: ShieldCheck,
  },
]

const faqs = [
  {
    q: 'Why do UK SMEs choose Leavely over Timetastic?',
    a: 'Timetastic is a strong simple holiday tracker. UK SMEs choose Leavely when they also need sickness tracking, Bradford Factor visibility, TOIL, rotas, clock-in, expenses, performance workflows, and a broader operational view.',
  },
  {
    q: 'How does Leavely compare with BreatheHR?',
    a: 'BreatheHR is a broader HR platform. Leavely is usually the better fit when the immediate problem is leave, absence, shifts, attendance, and manager approvals rather than building a wider HR administration system.',
  },
  {
    q: 'Is Leavely a CharlieHR alternative?',
    a: 'Yes. Leavely can be a practical CharlieHR alternative for UK SMEs that want leave management, sickness tracking, rotas, clock-in, expenses, and performance tools at a single published per-user price.',
  },
  {
    q: 'Can we try Leavely before switching?',
    a: 'Yes. Leavely offers a 14-day free trial with no credit card required, so SMEs can compare the workflow with their current process before committing.',
  },
] satisfies Array<{
  q: string
  a: string
}>

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} for UK SMEs`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Leavely is leave management and workforce operations software for UK SMEs, with leave, sickness, rotas, clock-in, expenses, and performance workflows in one plan.',
      offers: {
        '@type': 'Offer',
        price: '8.00',
        priceCurrency: 'GBP',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        description: 'Per user per month, billed monthly. 14-day free trial included.',
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
    {
      '@type': 'WebPage',
      name: 'Why UK SMEs Choose Leavely',
      url: pageUrl,
      datePublished: '2026-06-27',
      dateModified: '2026-06-27',
    },
  ],
}

function ComparisonCell({ value }: { value: FeatureValue }) {
  if (value === true) {
    return <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-500" aria-label="Included" />
  }

  if (value === false) {
    return <X className="mx-auto h-5 w-5 text-red-300" aria-label="Not included" />
  }

  return <span className="text-xs font-medium text-amber-700">{value}</span>
}

export default function WhyUkSmesChooseLeavelyPage() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/70 via-white to-white" />
          <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-20 text-center md:pb-16 md:pt-28">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
              <Sparkles className="h-4 w-4" />
              UK SME comparison
            </div>
            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Why UK SMEs choose Leavely
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-500 md:text-xl">
              Compare Leavely side by side with BreatheHR, Timetastic, and CharlieHR. See which platform fits best
              when your team needs leave, sickness, rotas, clock-in, expenses, and clear pricing without a long buying
              process.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={registerUrl}>
                <Button
                  size="lg"
                  className="h-12 bg-gradient-to-r from-emerald-600 to-teal-600 px-8 text-base font-semibold shadow-lg shadow-emerald-500/25 hover:from-emerald-700 hover:to-teal-700"
                >
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#comparison">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold">
                  Compare products
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-400">14-day free trial. No credit card required.</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-16 md:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.name}
              className={
                card.highlighted
                  ? 'rounded-xl border-2 border-emerald-500 bg-white p-6 shadow-sm'
                  : 'rounded-xl border bg-white p-6 shadow-sm'
              }
            >
              <h2 className="text-xl font-extrabold text-gray-900">{card.name}</h2>
              <p className="mt-2 text-sm font-semibold text-emerald-700">{card.pricing}</p>
              <p className="mt-4 text-sm leading-6 text-gray-600">{card.bestFor}</p>
              <p className="mt-4 text-xs leading-5 text-gray-400">{card.note}</p>
            </div>
          ))}
        </section>

        <section id="comparison" className="border-y bg-gray-50/70">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                Leavely vs BreatheHR vs Timetastic vs CharlieHR
              </h2>
              <p className="mt-4 text-gray-500">
                A practical feature comparison for UK SMEs choosing leave and HR software. Competitor package details
                can change, so confirm current pricing and plan availability directly before buying.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-5 py-4 text-left font-semibold text-gray-700">Feature</th>
                      <th className="w-36 bg-emerald-50/70 px-5 py-4 text-center font-semibold text-emerald-700">
                        Leavely
                      </th>
                      <th className="w-36 px-5 py-4 text-center font-semibold text-gray-600">BreatheHR</th>
                      <th className="w-36 px-5 py-4 text-center font-semibold text-gray-600">Timetastic</th>
                      <th className="w-36 px-5 py-4 text-center font-semibold text-gray-600">CharlieHR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, index) => (
                      <tr key={row.feature} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}>
                        <td className="px-5 py-4 font-medium text-gray-700">{row.feature}</td>
                        <td className="bg-emerald-50/30 px-5 py-4 text-center">
                          <ComparisonCell value={row.leavely} />
                        </td>
                        <td className="px-5 py-4 text-center">
                          <ComparisonCell value={row.breathehr} />
                        </td>
                        <td className="px-5 py-4 text-center">
                          <ComparisonCell value={row.timetastic} />
                        </td>
                        <td className="px-5 py-4 text-center">
                          <ComparisonCell value={row.charliehr} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-4 text-center text-xs leading-5 text-gray-400">
              Comparison based on publicly available product information and Leavely product capabilities as of June
              2026. BreatheHR, Timetastic, and CharlieHR are trademarks of their respective owners.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Why Leavely wins for growing UK teams
            </h2>
            <p className="mt-4 text-gray-500">
              The decision usually comes down to whether your team needs only holiday booking, a wider HR admin suite,
              or a day-to-day workforce operations hub.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {reasons.map((reason) => {
              const Icon = reason.icon

              return (
                <div key={reason.title} className="rounded-xl border bg-white p-6 shadow-sm">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50">
                    <Icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{reason.copy}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="border-y bg-gray-950">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Quick verdict</p>
                <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                  Choose Leavely when leave decisions need rota, sickness, and attendance context
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
                  BreatheHR can suit teams buying a broader HR database. Timetastic can suit teams that only want a
                  simple leave tracker. CharlieHR can suit startups buying polished HR basics. Leavely is built for UK
                  SMEs that need the absence workflow to connect with daily operations.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-bold text-white">Leavely includes</h3>
                <ul className="mt-5 space-y-3">
                  {[
                    'Leave and sickness tracking',
                    'Bradford Factor and TOIL',
                    'Rotas and employee clock-in',
                    'Expenses and performance reviews',
                    'One £8/user/month plan',
                    '14-day trial, no credit card',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-gray-200">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href={registerUrl} className="mt-6 block">
                  <Button className="h-11 w-full bg-white text-gray-950 hover:bg-gray-100">
                    Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Questions before switching?</h2>
            <p className="mt-4 text-gray-500">
              These are the common buying questions SMEs ask when comparing Leavely with BreatheHR, Timetastic, and
              CharlieHR.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border bg-white p-6">
                <h3 className="font-bold text-gray-900">{faq.q}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
