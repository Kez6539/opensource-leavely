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

const pageUrl = `${SITE_URL}/natural-hr-alternative`

export const metadata: Metadata = {
  title: 'Best Natural HR Alternative UK: Focused Leave Management (2026)',
  description:
    'Looking for a Natural HR alternative? Leavely focuses entirely on leave and absence management at £8/user/month. No paying for recruitment or performance modules you do not need.',
  alternates: { canonical: pageUrl },
  keywords: [
    'Natural HR alternative',
    'alternative to Natural HR',
    'Natural HR competitor',
    'cheaper than Natural HR',
    'Natural HR alternative UK',
    'Natural HR replacement',
    'switch from Natural HR',
  ],
  openGraph: {
    title: 'Best Natural HR Alternative UK — Leavely',
    description:
      'Focused leave management at £8/user/month. No paying for modules you do not use. All features in one plan.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'How does Leavely compare to Natural HR for leave management?',
    a: 'Natural HR is a full-spectrum HR platform covering recruitment, onboarding, leave, performance, and payroll. If leave management is your primary concern, you are paying for modules you may never use. Leavely focuses entirely on leave and absence management, doing one thing properly rather than spreading across the full HR spectrum.',
  },
  {
    q: 'Is Leavely cheaper than Natural HR?',
    a: 'Natural HR does not publish transparent pricing, and costs vary depending on which modules you select. Leavely is £8 per user per month with every feature included. There are no modules to select, no tiers to choose between, and no hidden costs. You know exactly what you will pay before you sign up.',
  },
  {
    q: 'Can I migrate from Natural HR to Leavely?',
    a: 'Yes. You can set up Leavely in under 2 minutes and start adding employees immediately. Most businesses run both systems side by side for a week before cancelling Natural HR. Leavely calculates balances from your leave year start date, so there is no complex data migration involved.',
  },
  {
    q: 'What if I need more than just leave management?',
    a: 'Leavely includes more than just leave tracking. You also get shift rotas, employee clock in and out, expense management, performance reviews, and document management. These are all included at £8 per user per month. For most SMBs, this covers everything you need without paying for a full HR suite.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Natural HR Alternative`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Leavely is a Natural HR alternative offering focused leave management at a flat £8/user/month without paying for unnecessary HR modules.',
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
      datePublished: '2026-04-06',
      dateModified: '2026-04-06',
    },
  ],
}

const comparisonFeatures = [
  { feature: 'Leave management', leavely: true, competitor: true },
  { feature: 'Absence tracking', leavely: true, competitor: true },
  { feature: 'Bradford Factor monitoring', leavely: true, competitor: 'Module' },
  { feature: 'Visual team calendar', leavely: true, competitor: true },
  { feature: 'TOIL tracking', leavely: true, competitor: true },
  { feature: 'Custom leave types', leavely: true, competitor: true },
  { feature: 'Shift rotas', leavely: true, competitor: 'Module' },
  { feature: 'Employee clock in/out', leavely: true, competitor: 'Module' },
  { feature: 'Expense management', leavely: true, competitor: 'Module' },
  { feature: 'Performance reviews', leavely: true, competitor: 'Module' },
  { feature: 'UK bank holidays by nation', leavely: true, competitor: true },
  { feature: 'All features in one price', leavely: true, competitor: false },
  { feature: 'Transparent pricing', leavely: true, competitor: false },
  { feature: 'No annual contract', leavely: true, competitor: false },
  { feature: 'Set up in under 2 minutes', leavely: true, competitor: false },
]

export default function NaturalHRAlternativePage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=natural_hr_alternative'

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
                Natural HR alternative
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Looking for a
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Natural HR Alternative?
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Natural HR covers the full HR spectrum: recruitment, onboarding, leave, performance, payroll. The problem with platforms that do everything is they often do nothing brilliantly. If leave management is your main pain point, Leavely does one thing and does it properly. £8 per user per month, all features included.
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
                  <p className="text-sm text-gray-500">no modules to buy</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">2 min</p>
                  <p className="text-sm text-gray-500">setup time</p>
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
                Stop paying for modules you do not use
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Natural HR charges by module. If you just need leave management, you are still paying for the platform overhead. Leavely gives you everything leave-related in one flat price.
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
                <p className="text-sm text-gray-500 mb-6">Focused on leave. Every feature included.</p>
                <ul className="space-y-3">
                  {['All leave features from day one', 'No modules to buy separately', 'Rotas, expenses, clock in included', 'No annual contract required', 'Cancel anytime', '14-day free trial, no credit card'].map((item) => (
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
                  <h3 className="text-xl font-bold text-gray-900">Natural HR</h3>
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mb-1">Quote<span className="text-lg font-medium text-gray-400"> based</span></p>
                <p className="text-sm text-gray-500 mb-6">Modular pricing. Pay per module.</p>
                <ul className="space-y-3">
                  {[
                    { text: 'Pricing not published', included: false },
                    { text: 'Features split across modules', included: false },
                    { text: 'Pay for modules you may not need', included: false },
                    { text: 'Annual contract typically required', included: false },
                    { text: 'Onboarding and setup takes time', included: false },
                    { text: 'Cost increases with each module', included: false },
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
                Feature comparison: Leavely vs Natural HR
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Every feature listed below is included in the standard Leavely plan. With Natural HR, many features require purchasing additional modules.
              </p>
            </div>
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 border-b px-6 py-4 text-sm font-semibold text-gray-700">
                <span>Feature</span>
                <span className="text-center">Leavely</span>
                <span className="text-center">Natural HR</span>
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
                    ) : row.competitor === 'Module' ? (
                      <span className="text-amber-500 font-medium text-xs">Separate module</span>
                    ) : (
                      <span className="text-gray-300">✗</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">Based on publicly available information from Natural HR&apos;s website as of April 2026. Features and pricing may have changed.</p>
          </div>
        </section>

        {/* Switch CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Switch from Natural HR in minutes
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Sign up, add your team, and run Leavely alongside Natural HR for a week. Once you are happy, cancel Natural HR. No data migration needed.
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
              Why businesses switch from Natural HR to Leavely
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Focused on what matters most', description: 'Natural HR tries to cover the entire HR lifecycle: recruitment, onboarding, performance, payroll, and leave. When a platform does everything, it rarely excels at any one thing. Leavely focuses entirely on leave and absence management, which means every feature is designed to make managing time off as smooth as possible.' },
                { title: 'No paying for modules you do not need', description: 'Natural HR uses modular pricing. If you only need leave management, you are still paying for the overhead of a full HR platform. With Leavely, £8 per user per month gets you everything related to leave, absence, rotas, and time tracking. No modules to select, no features to unlock.' },
                { title: 'Transparent, predictable pricing', description: 'Natural HR does not publish their prices. You need to request a demo and get a custom quote. Leavely is £8 per user per month. That is published on the website. No surprises, no negotiations, no sales calls required.' },
                { title: 'Up and running in 2 minutes', description: 'Natural HR requires an onboarding process to configure all their modules. Leavely is self-service. Sign up, add your employees, set your leave policies, and you are live. Most businesses are fully operational on the same day they sign up.' },
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
              No credit card. No sales calls. No annual contract. Just focused leave management that works.
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
