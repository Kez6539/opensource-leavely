import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  X,
  Zap,
  CreditCard,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/whosoff-alternative`

export const metadata: Metadata = {
  title: 'Best WhosOff Alternative UK: More Than Just a Calendar (2026)',
  description:
    'Looking for a WhosOff alternative? Leavely goes beyond a simple calendar with Bradford Factor, return to work forms, TOIL tracking, and absence reports. £8/user/month, all features included. Free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'WhosOff alternative',
    'alternative to WhosOff',
    'WhosOff competitor',
    'better than WhosOff',
    'WhosOff alternative UK',
    'WhosOff replacement',
    'switch from WhosOff',
    'WhosOff vs Leavely',
  ],
  openGraph: {
    title: 'Best WhosOff Alternative UK — Leavely',
    description:
      'More than just a calendar. Leavely includes Bradford Factor, RTW forms, TOIL tracking, and absence reports. £8/user/month.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'How does Leavely compare to WhosOff?',
    a: 'WhosOff is primarily a leave calendar and booking system. It does the basics well but lacks advanced features like Bradford Factor monitoring, return to work forms, TOIL tracking, and detailed absence reports. Leavely includes all of these in the standard price, giving you a complete leave management system rather than just a calendar.',
  },
  {
    q: 'Is Leavely more expensive than WhosOff?',
    a: 'Leavely is £8 per user per month with every feature included. WhosOff has various pricing tiers depending on team size and features. When you factor in the additional features Leavely includes, the value is significantly better. Plus there is no annual contract with Leavely.',
  },
  {
    q: 'Can I switch from WhosOff to Leavely easily?',
    a: 'Yes. Set up your Leavely account in under 2 minutes, add your employees, and configure your leave policies. You can run both systems in parallel for a week to make sure everything is correct, then cancel WhosOff. Leavely calculates balances from your leave year start date.',
  },
  {
    q: 'Does Leavely have a team calendar like WhosOff?',
    a: 'Yes. Leavely includes a visual team calendar that shows all leave, sickness, and company holidays at a glance. You get the same calendar visibility as WhosOff, plus Bradford Factor scoring, automatic balance tracking, return to work forms, and much more.',
  },
  {
    q: 'What features does Leavely have that WhosOff does not?',
    a: 'Leavely includes Bradford Factor monitoring, return to work interview forms, TOIL (time off in lieu) tracking, trigger point alerts, detailed absence reports, carry over rules, custom leave types, and employee self service dashboards. All of these are included at no extra cost.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — WhosOff Alternative`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Leavely is a WhosOff alternative that goes beyond a simple calendar with Bradford Factor, return to work forms, TOIL tracking, and absence reports.',
      datePublished: '2026-04-05',
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
      datePublished: '2026-04-05',
      dateModified: '2026-04-05',
    },
  ],
}

const comparisonFeatures = [
  { feature: 'Visual leave calendar', leavely: true, competitor: true },
  { feature: 'Leave request and approval', leavely: true, competitor: true },
  { feature: 'Automatic balance tracking', leavely: true, competitor: true },
  { feature: 'UK bank holidays', leavely: true, competitor: true },
  { feature: 'Bradford Factor monitoring', leavely: true, competitor: false },
  { feature: 'Return to work forms', leavely: true, competitor: false },
  { feature: 'TOIL tracking', leavely: true, competitor: false },
  { feature: 'Trigger point alerts', leavely: true, competitor: false },
  { feature: 'Detailed absence reports', leavely: true, competitor: false },
  { feature: 'Custom leave types', leavely: true, competitor: true },
  { feature: 'Carry over rules', leavely: true, competitor: true },
  { feature: 'Pro rata calculations', leavely: true, competitor: true },
  { feature: 'Employee self service dashboard', leavely: true, competitor: false },
  { feature: 'No annual contract', leavely: true, competitor: false },
  { feature: 'Set up in under 2 minutes', leavely: true, competitor: false },
]

export default function WhosOffAlternativePage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=whosoff_alternative'

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/60 via-white to-white" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-emerald-100/40 to-teal-100/30 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-sm text-emerald-700 font-medium mb-6">
                <Zap className="h-4 w-4" />
                WhosOff alternative
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Looking for a
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  WhosOff Alternative?
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                WhosOff is a solid calendar tool, but modern leave management needs more. Leavely gives you Bradford Factor scoring, return to work forms, TOIL tracking, absence reports, and a team calendar. All at £8 per user per month.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href={registerUrl}>
                  <Button size="lg" className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30">
                    Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/book-a-demo">
                  <Button variant="outline" size="lg" className="text-base font-medium px-8 h-12">
                    Book a demo
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-400">Free 14-day trial. No credit card required.</p>
              <div className="flex items-center gap-6 justify-center mt-6">
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">£8</p>
                  <p className="text-sm text-gray-500">per user/month</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">All in</p>
                  <p className="text-sm text-gray-500">every feature</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">More</p>
                  <p className="text-sm text-gray-500">than a calendar</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing comparison */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                What you actually get: Leavely vs WhosOff
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                WhosOff gives you a leave calendar and booking system. Leavely gives you a complete leave management platform with the features growing businesses actually need.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border-2 border-emerald-500 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Leavely</h3>
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mb-1">£8<span className="text-lg font-medium text-gray-400">/user/mo</span></p>
                <p className="text-sm text-gray-500 mb-6">Complete leave management. All features.</p>
                <ul className="space-y-3">
                  {['Calendar plus Bradford Factor', 'Return to work forms included', 'TOIL tracking included', 'Trigger point alerts', 'Detailed absence reports', '14-day free trial, no credit card'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border bg-white p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">WhosOff</h3>
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mb-1">Varies<span className="text-lg font-medium text-gray-400">/user/mo</span></p>
                <p className="text-sm text-gray-500 mb-6">Calendar focused. Basic features.</p>
                <ul className="space-y-3">
                  {[
                    { text: 'No Bradford Factor monitoring', included: false },
                    { text: 'No return to work forms', included: false },
                    { text: 'No TOIL tracking', included: false },
                    { text: 'No trigger point alerts', included: false },
                    { text: 'Limited reporting capabilities', included: false },
                    { text: 'No employee self service dashboard', included: false },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center gap-2 text-sm text-gray-500">
                      <X className="h-4 w-4 text-gray-300 flex-shrink-0" />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature comparison table */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Feature comparison: Leavely vs WhosOff
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Leavely matches WhosOff on calendar features and adds the absence management tools that growing businesses need.
              </p>
            </div>
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 border-b px-6 py-4 text-sm font-semibold text-gray-700">
                <span>Feature</span>
                <span className="text-center">Leavely</span>
                <span className="text-center">WhosOff</span>
              </div>
              {comparisonFeatures.map((row) => (
                <div key={row.feature} className="grid grid-cols-3 px-6 py-3.5 border-b last:border-b-0 text-sm">
                  <span className="text-gray-700 font-medium">{row.feature}</span>
                  <span className="text-center">
                    {row.leavely === true ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto" />
                    ) : (
                      <span className="text-gray-300">✗</span>
                    )}
                  </span>
                  <span className="text-center">
                    {row.competitor === true ? (
                      <CheckCircle2 className="h-5 w-5 text-gray-400 mx-auto" />
                    ) : (
                      <span className="text-gray-300">✗</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">Based on publicly available information from WhosOff&apos;s website as of April 2026. Features and pricing may have changed.</p>
          </div>
        </section>

        {/* Switch CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Upgrade from WhosOff in minutes
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Keep the calendar you love and add the absence management features you need. Sign up, add your team, and run both side by side until you are ready to switch.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={registerUrl}>
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg text-base px-8 h-12">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-base px-8 h-12">
                  View pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why people switch */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Why businesses switch from WhosOff to Leavely
            </h2>
            <div className="space-y-6">
              {[
                { title: 'More than just a calendar', description: 'WhosOff is great for seeing who is off, but modern leave management requires more. Leavely tracks sickness patterns with Bradford Factor, manages return to work interviews, handles TOIL, and provides detailed absence reports. All in one system.' },
                { title: 'Bradford Factor built in', description: 'If you are tracking sickness absence, you need Bradford Factor scoring. WhosOff does not offer this. Leavely calculates Bradford Factor scores automatically for every employee and alerts managers when thresholds are reached.' },
                { title: 'Proper absence documentation', description: 'Leavely includes return to work interview forms, fit note recording, and a full audit trail of every absence. This gives you the documentation you need for welfare meetings and any formal processes.' },
                { title: 'Simple, transparent pricing', description: 'Leavely is £8 per user per month with every feature included. No tiers to navigate, no annual contract, and no hidden costs. Pay monthly and cancel anytime.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-2xl border bg-white shadow-sm">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-left">
                    <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                    <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Try Leavely free for 14 days
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              No credit card. No sales calls. No annual contract. Just complete leave management for your team.
            </p>
            <div className="mt-8">
              <Link href={registerUrl}>
                <Button size="lg" className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
