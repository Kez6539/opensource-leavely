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

const pageUrl = `${SITE_URL}/personio-alternative`

export const metadata: Metadata = {
  title: 'Best Personio Alternative UK: Leave Management Built for British Businesses (2026)',
  description:
    'Looking for a Personio alternative built for the UK? Leavely handles statutory sick pay, Bradford Factor, TOIL, and UK bank holidays properly. £8/user/month, all features included.',
  alternates: { canonical: pageUrl },
  keywords: [
    'Personio alternative',
    'alternative to Personio',
    'Personio competitor UK',
    'cheaper than Personio',
    'Personio alternative for small business',
    'Personio replacement UK',
    'switch from Personio',
  ],
  openGraph: {
    title: 'Best Personio Alternative UK — Leavely',
    description:
      'Leave management built for UK employment law. £8/user/month, transparent pricing, no enterprise complexity.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'Why is Personio not ideal for UK businesses?',
    a: 'Personio was built in Berlin for the German and wider European market. While they have expanded to the UK, their platform was not designed around UK employment law. Features like statutory sick pay calculations, Bradford Factor scoring, TOIL policies, and nation-specific bank holidays (England, Scotland, Northern Ireland) are often missing or poorly implemented compared to a UK-native platform.',
  },
  {
    q: 'How does Leavely pricing compare to Personio?',
    a: 'Personio does not publish their pricing. You must speak to a sales representative and go through a demo process before receiving a quote. Implementation fees can run into thousands of pounds, and annual contracts are standard. Leavely is £8 per user per month, billed monthly, with no setup fees, no sales calls, and no annual contract.',
  },
  {
    q: 'Can I migrate from Personio to Leavely?',
    a: 'Yes. You can set up Leavely in under 2 minutes and start adding employees immediately. Most businesses run both systems side by side for a week, then cancel Personio once everything looks correct. Leavely calculates balances from your leave year start date so there is no complex data migration required.',
  },
  {
    q: 'Does Leavely support UK-specific leave types?',
    a: 'Yes. Leavely is built entirely for UK employment law. It includes statutory annual leave entitlements, nation-specific bank holidays for England, Scotland, Wales, and Northern Ireland, statutory sick pay tracking, TOIL policies, compassionate leave, and custom leave types. These are not afterthoughts; they are core to how the product works.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Personio Alternative`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Leavely is a UK-native Personio alternative offering leave management built for British employment law at £8/user/month.',
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
  { feature: 'Bradford Factor monitoring', leavely: true, competitor: false },
  { feature: 'UK statutory sick pay tracking', leavely: true, competitor: 'Partial' },
  { feature: 'TOIL policies', leavely: true, competitor: false },
  { feature: 'Nation-specific bank holidays', leavely: true, competitor: 'Partial' },
  { feature: 'Custom leave types', leavely: true, competitor: true },
  { feature: 'Shift rotas', leavely: true, competitor: false },
  { feature: 'Employee clock in/out', leavely: true, competitor: 'Add-on' },
  { feature: 'Expense management', leavely: true, competitor: false },
  { feature: 'Performance reviews', leavely: true, competitor: true },
  { feature: 'Transparent pricing', leavely: true, competitor: false },
  { feature: 'No implementation fees', leavely: true, competitor: false },
  { feature: 'No annual contract', leavely: true, competitor: false },
  { feature: 'Self-service signup', leavely: true, competitor: false },
]

export default function PersonioAlternativePage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=personio_alternative'

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
                Personio alternative
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Looking for a
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Personio Alternative?
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Personio is a German HR platform that has expanded to the UK, but its DNA is continental European. UK-specific features like statutory sick pay, Bradford Factor, TOIL, and nation-specific bank holidays are often missing or poorly implemented. Leavely is built from the ground up for UK employment law, at £8 per user per month.
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
                  <p className="text-3xl font-extrabold text-gray-400 line-through">Quote</p>
                  <p className="text-sm text-gray-500">Personio (hidden pricing)</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">UK first</p>
                  <p className="text-sm text-gray-500">built for British law</p>
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
                UK-native vs adapted for the UK
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Personio was designed for German employment law and adapted for other markets. Leavely was designed for UK employment law from day one. The difference shows in every feature.
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
                <p className="text-sm text-gray-500 mb-6">Built for UK businesses. All features included.</p>
                <ul className="space-y-3">
                  {['UK employment law built in', 'Bradford Factor monitoring included', 'Bank holidays by nation (Eng, Scot, NI)', 'Transparent pricing, no sales calls', 'No implementation fees', '14-day free trial, no credit card'].map((item) => (
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
                  <h3 className="text-xl font-bold text-gray-900">Personio</h3>
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mb-1">Quote<span className="text-lg font-medium text-gray-400"> based</span></p>
                <p className="text-sm text-gray-500 mb-6">German platform adapted for UK market.</p>
                <ul className="space-y-3">
                  {[
                    { text: 'Built for German employment law first', included: false },
                    { text: 'No Bradford Factor monitoring', included: false },
                    { text: 'UK bank holidays not nation-specific', included: false },
                    { text: 'Must speak to sales for pricing', included: false },
                    { text: 'Implementation fees in the thousands', included: false },
                    { text: 'Annual contracts required', included: false },
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
                Feature comparison: Leavely vs Personio
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Every feature listed below is included in the standard Leavely plan. Personio requires add-ons and higher tiers for many of these capabilities.
              </p>
            </div>
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 border-b px-6 py-4 text-sm font-semibold text-gray-700">
                <span>Feature</span>
                <span className="text-center">Leavely</span>
                <span className="text-center">Personio</span>
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
                    ) : row.competitor === 'Partial' ? (
                      <span className="text-amber-500 font-medium text-xs">Partial</span>
                    ) : row.competitor === 'Add-on' ? (
                      <span className="text-amber-500 font-medium text-xs">Add-on</span>
                    ) : (
                      <span className="text-gray-300">✗</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">Based on publicly available information from Personio&apos;s website as of April 2026. Features and pricing may have changed.</p>
          </div>
        </section>

        {/* Switch CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Switch from Personio in minutes
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              No implementation project. No weeks of onboarding. Sign up, add your team, and start managing leave properly with a platform built for UK businesses.
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
              Why UK businesses choose Leavely over Personio
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Built for UK employment law', description: 'Leavely understands Working Time Regulations, statutory leave entitlements, statutory sick pay, and the differences between English, Scottish, Welsh, and Northern Irish bank holidays. These are not bolted on; they are fundamental to how the product works.' },
                { title: 'Bradford Factor included as standard', description: 'Leavely automatically calculates Bradford Factor scores for every employee, helping you identify patterns of short, frequent absences. Personio does not offer Bradford Factor monitoring because it is a UK-specific metric that is not relevant to their primary German market.' },
                { title: 'Transparent pricing with no surprises', description: 'Leavely is £8 per user per month. That is the price. No sales calls, no custom quotes, no implementation fees, no annual contracts. With Personio, you cannot even see the price until you have spoken to a sales representative.' },
                { title: 'Set up in 2 minutes, not 2 months', description: 'Personio requires an implementation project that can take weeks and cost thousands. Leavely is self-service. Sign up, add your employees, configure your leave policies, and you are live. Most businesses are fully operational within a day.' },
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
              No credit card. No sales calls. No implementation fees. Just leave management that actually understands UK employment law.
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
