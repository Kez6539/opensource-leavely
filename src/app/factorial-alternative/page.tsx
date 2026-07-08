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

const pageUrl = `${SITE_URL}/factorial-alternative`

export const metadata: Metadata = {
  title: 'Best Factorial Alternative UK: All Features, One Price (2026)',
  description:
    'Looking for a Factorial alternative? Leavely gives you all HR features for £8/user/month with no tiers or upgrades. No features locked behind expensive plans. Free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'Factorial alternative',
    'alternative to Factorial HR',
    'Factorial competitor UK',
    'Factorial replacement',
    'cheaper than Factorial',
  ],
  openGraph: {
    title: 'Best Factorial Alternative UK — Leavely',
    description:
      'All HR features, one price. £8/user/month with no tiers, no upgrades, and no locked features.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'How does Leavely pricing compare to Factorial?',
    a: 'Factorial uses tiered pricing. Their Business plan starts around £5.25 per user per month but only covers basic HR. To get performance management, shift management, and expenses, you need their Enterprise plan which costs significantly more. Leavely is £8 per user per month with every single feature included. There are no tiers and nothing to upgrade.',
  },
  {
    q: 'What features does Leavely include that Factorial charges extra for?',
    a: 'Leavely includes shift scheduling, time tracking, performance reviews, expense management, onboarding checklists, and advanced reporting in the standard £8 per user price. With Factorial, several of these features require upgrading to a more expensive plan or purchasing add-ons.',
  },
  {
    q: 'Can I switch from Factorial to Leavely?',
    a: 'Yes. Sign up for Leavely in under 2 minutes, add your employees, and run both systems in parallel for a week. Once you are happy, cancel Factorial. Leavely calculates leave balances from your leave year start date, so no data migration is needed.',
  },
  {
    q: 'Is Leavely suitable for UK businesses specifically?',
    a: 'Yes. Leavely is built for the UK market. It includes UK bank holidays, calculates leave in line with UK employment law, supports Bradford Factor monitoring, and handles TOIL tracking. Factorial is a Spanish company that serves multiple countries, which means the UK-specific features can feel like an afterthought.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Factorial Alternative`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      datePublished: '2026-04-05',
      description:
        'Leavely is a Factorial alternative that includes all HR features in one flat price of £8 per user per month. No tiers, no upgrades needed.',
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
  { feature: 'Leave management', leavely: true, competitor: true },
  { feature: 'Absence tracking', leavely: true, competitor: true },
  { feature: 'Team calendar', leavely: true, competitor: true },
  { feature: 'Employee directory', leavely: true, competitor: true },
  { feature: 'Document management', leavely: true, competitor: true },
  { feature: 'Onboarding checklists', leavely: true, competitor: true },
  { feature: 'Shift management', leavely: true, competitor: 'Upgrade' },
  { feature: 'Time tracking', leavely: true, competitor: 'Upgrade' },
  { feature: 'Performance reviews', leavely: true, competitor: 'Upgrade' },
  { feature: 'Expense management', leavely: true, competitor: 'Upgrade' },
  { feature: 'UK bank holidays built in', leavely: true, competitor: false },
  { feature: 'Bradford Factor monitoring', leavely: true, competitor: false },
  { feature: 'One plan, all features', leavely: true, competitor: false },
  { feature: 'No annual contract', leavely: true, competitor: false },
  { feature: 'Self-service signup', leavely: true, competitor: false },
]

export default function FactorialAlternativePage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=factorial_alternative'

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
                Factorial alternative
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Looking for a
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Factorial Alternative?
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Factorial looks affordable at first, but the moment you need shift management, performance reviews, or expense tracking, you are pushed to upgrade. Leavely gives you every feature for £8 per user per month. One plan. No tiers. No upgrade pressure.
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
                  <p className="text-3xl font-extrabold text-emerald-600">1</p>
                  <p className="text-sm text-gray-500">plan, all features</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">0</p>
                  <p className="text-sm text-gray-500">upgrade costs</p>
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
                The real cost: Leavely vs Factorial
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Factorial&apos;s starting price is low, but the features most businesses need are locked behind expensive tiers. Here is a transparent comparison.
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
                <p className="text-sm text-gray-500 mb-6">Every feature included. Nothing to unlock.</p>
                <ul className="space-y-3">
                  {['All features for £8/user/month', 'No tiers or upgrade pressure', 'Pay monthly, cancel anytime', 'UK-focused with bank holidays', 'Self-service signup', '14-day free trial, no credit card'].map((item) => (
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
                  <h3 className="text-xl font-bold text-gray-900">Factorial</h3>
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mb-1">£5.25+<span className="text-lg font-medium text-gray-400">/user/mo</span></p>
                <p className="text-sm text-gray-500 mb-6">Business plan. Enterprise costs much more.</p>
                <ul className="space-y-3">
                  {[
                    { text: 'Key features require upgrade', included: false },
                    { text: 'Shift management is paid extra', included: false },
                    { text: 'Performance reviews locked', included: false },
                    { text: 'Built for global market, not UK-first', included: false },
                    { text: 'Annual billing required for best price', included: false },
                    { text: 'Sales process for enterprise features', included: false },
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
                Feature comparison: Leavely vs Factorial
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Leavely includes every feature in one plan. Factorial locks several behind their more expensive Enterprise tier.
              </p>
            </div>
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 border-b px-6 py-4 text-sm font-semibold text-gray-700">
                <span>Feature</span>
                <span className="text-center">Leavely</span>
                <span className="text-center">Factorial</span>
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
                    ) : row.competitor === 'Upgrade' ? (
                      <span className="text-amber-500 font-medium text-xs">Upgrade</span>
                    ) : (
                      <span className="text-gray-300">✗</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">Based on publicly available information from Factorial&apos;s website as of April 2026. Features and pricing may have changed.</p>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              One plan. Every feature. No upgrade games.
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Stop paying more every time you need a new feature. Leavely includes everything at £8 per user per month.
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
              Why businesses choose Leavely over Factorial
            </h2>
            <div className="space-y-6">
              {[
                { title: 'No tiered pricing games', description: 'Factorial offers a Business plan, an Enterprise plan, and add-ons on top. Each tier unlocks more features, which means your costs grow as your needs grow. Leavely has one plan at £8 per user per month. Every feature is included from day one.' },
                { title: 'Built for the UK, not adapted for it', description: 'Factorial is a Spanish company serving a global market. While they support UK businesses, features like bank holidays, Bradford Factor monitoring, and UK employment law compliance are native to Leavely, not added as an afterthought.' },
                { title: 'Genuinely simple to set up', description: 'You can sign up for Leavely, add your employees, and start managing leave in under 10 minutes. There is no sales process, no onboarding call, and no waiting for account activation.' },
                { title: 'Pay monthly, leave anytime', description: 'Factorial encourages annual billing for the best price. Leavely is pay monthly, cancel anytime. If it does not work for your team, you can cancel from your account settings with no notice period and no penalty.' },
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
              No credit card. No sales calls. No tiers to navigate. Just straightforward HR software at one honest price.
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
