import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  X,
  Zap,
  CreditCard,
  Clock,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/brighthr-alternative`

export const metadata: Metadata = {
  title: 'Best BrightHR Alternative UK: Same Features, Lower Price (2026)',
  description:
    'Looking for a BrightHR alternative? Leavely offers the same leave management features at £8/user/month with no annual contract. Feature comparison, transparent pricing, and a free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'BrightHR alternative',
    'alternative to BrightHR',
    'BrightHR competitor',
    'cheaper than BrightHR',
    'BrightHR alternative UK',
    'BrightHR replacement',
    'switch from BrightHR',
  ],
  openGraph: {
    title: 'Best BrightHR Alternative UK — Leavely',
    description:
      'Same features, lower price. Leavely is £8/user/month with no annual contract. See the feature-for-feature comparison.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'How much cheaper is Leavely compared to BrightHR?',
    a: 'Leavely costs £8 per user per month with all features included. BrightHR uses quote-based pricing that typically starts at £13.50 per user per month and increases if you need additional modules. For a team of 20, that is £160/month with Leavely versus an estimated £270+ with BrightHR.',
  },
  {
    q: 'Can I switch from BrightHR to Leavely easily?',
    a: 'Yes. You can set up your Leavely account in under 2 minutes and start adding employees immediately. Most businesses run both systems in parallel for a week to verify everything is correct, then cancel BrightHR. There is no data migration needed as Leavely calculates balances from your leave year start date.',
  },
  {
    q: 'Does Leavely have the same features as BrightHR?',
    a: 'Leavely covers all core leave and absence management features: visual calendar, one-click approvals, automatic balances, Bradford Factor, TOIL tracking, return-to-work forms, and absence reporting. BrightHR offers additional modules like an employee assistance programme and legal advice line, which Leavely does not include.',
  },
  {
    q: 'Is there a contract with Leavely?',
    a: 'No. Leavely is pay monthly, cancel anytime. There are no annual contracts, no cancellation fees, and no lock-in periods. You can cancel from your account settings at any time.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — BrightHR Alternative`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Leavely is a BrightHR alternative offering the same leave management features at a lower price with no annual contract.',
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
  ],
}

const comparisonFeatures = [
  { feature: 'Visual leave calendar', leavely: true, brighthr: true },
  { feature: 'One-click approvals', leavely: true, brighthr: true },
  { feature: 'Automatic balance tracking', leavely: true, brighthr: true },
  { feature: 'Bradford Factor monitoring', leavely: true, brighthr: true },
  { feature: 'Return-to-work forms', leavely: true, brighthr: true },
  { feature: 'TOIL tracking', leavely: true, brighthr: 'Add-on' },
  { feature: 'Sick leave recording', leavely: true, brighthr: true },
  { feature: 'UK bank holidays', leavely: true, brighthr: true },
  { feature: 'Transparent pricing', leavely: true, brighthr: false },
  { feature: 'No annual contract', leavely: true, brighthr: false },
  { feature: 'Self-service signup', leavely: true, brighthr: false },
  { feature: 'No sales call required', leavely: true, brighthr: false },
  { feature: 'All features in one plan', leavely: true, brighthr: false },
  { feature: 'Free trial without credit card', leavely: true, brighthr: false },
  { feature: 'Set up in under 2 minutes', leavely: true, brighthr: false },
]

export default function BrightHRAlternativePage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=brighthr_alternative'

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
                BrightHR alternative
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Looking for a
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  BrightHR Alternative?
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Leavely gives you the same leave management features as BrightHR at £8 per user per month. No quote-based pricing. No annual contract. No sales calls. Just sign up and start using it.
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
                  <p className="text-3xl font-extrabold text-gray-400 line-through">£13.50+</p>
                  <p className="text-sm text-gray-500">BrightHR price</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">40%</p>
                  <p className="text-sm text-gray-500">savings</p>
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
                What you actually pay: Leavely vs BrightHR
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                BrightHR does not publish pricing on their website. You must call their sales team for a quote. Leavely has one price for everyone.
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
                <p className="text-sm text-gray-500 mb-6">All features included. Pay monthly.</p>
                <ul className="space-y-3">
                  {['Transparent pricing on website', 'No sales call needed', 'No annual contract', 'Cancel anytime', 'All features in one plan', '14-day free trial, no credit card'].map((item) => (
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
                  <h3 className="text-xl font-bold text-gray-900">BrightHR</h3>
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mb-1">£13.50+<span className="text-lg font-medium text-gray-400">/user/mo</span></p>
                <p className="text-sm text-gray-500 mb-6">Quote-based. Price varies by modules.</p>
                <ul className="space-y-3">
                  {[
                    { text: 'Must call sales for pricing', included: false },
                    { text: 'Demo/call required before signup', included: false },
                    { text: 'Annual contract typical', included: false },
                    { text: 'Cancellation may require notice', included: false },
                    { text: 'Some features are paid add-ons', included: false },
                    { text: 'Trial may require credit card', included: false },
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
                Feature-for-feature comparison
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Leavely matches BrightHR on the features that matter for leave management and beats it on transparency and flexibility.
              </p>
            </div>
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 border-b px-6 py-4 text-sm font-semibold text-gray-700">
                <span>Feature</span>
                <span className="text-center">Leavely</span>
                <span className="text-center">BrightHR</span>
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
                    {row.brighthr === true ? (
                      <CheckCircle2 className="h-5 w-5 text-gray-400 mx-auto" />
                    ) : row.brighthr === 'Add-on' ? (
                      <span className="text-amber-500 font-medium text-xs">Add-on</span>
                    ) : (
                      <span className="text-gray-300">✗</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">Based on publicly available information from BrightHR&apos;s website as of April 2026. Features and pricing may have changed.</p>
          </div>
        </section>

        {/* Switch CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Switch from BrightHR in minutes
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Sign up, add your team, and run Leavely alongside BrightHR for a week. Once you are happy, cancel BrightHR. No data migration needed.
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
              Why businesses switch from BrightHR to Leavely
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Transparent, lower pricing', description: 'BrightHR requires a sales call to get a quote. Leavely is £8 per user per month, published on the website. For a team of 20, you could save over £100 per month.' },
                { title: 'No annual contract', description: 'BrightHR typically requires an annual commitment. Leavely is pay monthly, cancel anytime. If it does not work for you, you are not locked in.' },
                { title: 'All features included', description: 'BrightHR charges extra for some modules. With Leavely, every feature is included in the single per-user price. No surprises on your invoice.' },
                { title: 'Self-service, not sales-led', description: 'You do not need to sit through a demo or speak to a sales team. Sign up on the website, add your team, and start using Leavely immediately.' },
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
              No credit card. No sales calls. No annual contract. Just a better way to manage leave.
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
