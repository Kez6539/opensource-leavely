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

const pageUrl = `${SITE_URL}/timetastic-alternative`

export const metadata: Metadata = {
  title: 'Best Timetastic Alternative UK: Leave Management That Goes Further (2026)',
  description:
    'Looking for a Timetastic alternative? Leavely includes everything Timetastic does plus absence management, sickness tracking, Bradford Factor, employee onboarding, and document storage. £8/user/month, all features included.',
  alternates: { canonical: pageUrl },
  keywords: [
    'Timetastic alternative',
    'alternative to Timetastic',
    'better than Timetastic',
    'Timetastic competitor',
    'Timetastic replacement',
    'Timetastic alternative UK',
    'Timetastic reviews',
    'switch from Timetastic',
  ],
  openGraph: {
    title: 'Best Timetastic Alternative UK — Leavely',
    description:
      'Timetastic does leave tracking. Leavely does leave tracking plus absence management, sickness monitoring, Bradford Factor, onboarding, and more. £8/user/month.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'How does Leavely pricing compare to Timetastic?',
    a: 'Timetastic charges around £1.50 per user per month for their leave tracking product. Leavely is £8 per user per month but includes everything: leave management, absence tracking, sickness monitoring with Bradford Factor, employee onboarding, document storage, shift rotas, clock in/out, expense management, and performance reviews. If you need more than a basic holiday tracker, Leavely is significantly better value than buying separate tools to fill the gaps Timetastic leaves.',
  },
  {
    q: 'Does Leavely do everything Timetastic does?',
    a: 'Yes. Leavely covers all core Timetastic features including a visual leave calendar, one click approvals, automatic balance tracking, custom leave types, and UK bank holidays. Beyond that, Leavely adds absence management, sickness tracking with Bradford Factor scoring, return to work interviews, employee onboarding, document management, shift rotas, clock in/out, expense management, and performance reviews.',
  },
  {
    q: 'Why would I pay more for Leavely when Timetastic is cheaper?',
    a: 'If all you need is a basic holiday tracker with no other HR features, Timetastic works fine. But most growing businesses eventually need absence management, sickness monitoring, rota planning, or employee onboarding. Buying separate tools for each of those costs far more than £8 per user per month and creates multiple logins, multiple invoices, and data spread across different systems. Leavely gives you one platform for everything.',
  },
  {
    q: 'Can I switch from Timetastic to Leavely easily?',
    a: 'Yes. Set up your Leavely account in under 2 minutes and add your team. Most businesses run both systems side by side for a week to check everything is correct, then cancel Timetastic. Leavely calculates balances from your leave year start date so there is no complex data migration required.',
  },
  {
    q: 'Is Timetastic good for absence management?',
    a: 'Timetastic is designed for leave booking and holiday tracking. It does not offer dedicated absence management features like Bradford Factor monitoring, sickness trend analysis, return to work interview forms, or trigger point alerts. If managing employee absence is important to your business, you will need a separate tool or a more complete platform like Leavely.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Timetastic Alternative`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      datePublished: '2026-04-06',
      description:
        'Leavely is a Timetastic alternative that goes beyond basic leave tracking. Includes absence management, sickness monitoring, Bradford Factor, onboarding, and more at £8/user/month.',
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
  { feature: 'Visual leave calendar', leavely: true, competitor: true },
  { feature: 'One-click approvals', leavely: true, competitor: true },
  { feature: 'Automatic balance tracking', leavely: true, competitor: true },
  { feature: 'Custom leave types', leavely: true, competitor: true },
  { feature: 'UK bank holidays', leavely: true, competitor: true },
  { feature: 'Email notifications', leavely: true, competitor: true },
  { feature: 'Absence management', leavely: true, competitor: false },
  { feature: 'Sickness tracking', leavely: true, competitor: false },
  { feature: 'Bradford Factor monitoring', leavely: true, competitor: false },
  { feature: 'Return-to-work interviews', leavely: true, competitor: false },
  { feature: 'TOIL tracking', leavely: true, competitor: false },
  { feature: 'Employee onboarding', leavely: true, competitor: false },
  { feature: 'Document management', leavely: true, competitor: false },
  { feature: 'Rota / shift scheduling', leavely: true, competitor: false },
  { feature: 'QR code clock-in/out', leavely: true, competitor: false },
  { feature: 'Expense management', leavely: true, competitor: false },
  { feature: 'Performance reviews', leavely: true, competitor: false },
  { feature: 'Audit trail', leavely: true, competitor: false },
]

export default function TimetasticAlternativePage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=timetastic_alternative'

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
                Timetastic alternative
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Outgrown
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Timetastic?
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Timetastic was one of the first online leave trackers in the UK. It does holiday booking well, but that is all it does. No absence management. No sickness tracking. No Bradford Factor. No employee onboarding. No document management. Businesses outgrow it fast.
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
                  <p className="text-sm text-gray-500">every feature included</p>
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

        {/* The problem */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                A great holiday tracker that never evolved
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Timetastic launched as a simple leave tracker and it remains exactly that. There is nothing wrong with doing one thing well, but modern UK businesses need more from their HR software.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { gap: 'Absence management', detail: 'No tools for tracking and managing patterns of employee absence beyond simple leave booking.' },
                { gap: 'Sickness tracking', detail: 'No dedicated sickness absence monitoring. No way to distinguish between types of absence or spot trends.' },
                { gap: 'Bradford Factor', detail: 'No automatic Bradford Factor calculation. No trigger points. No alerts when scores reach concerning levels.' },
                { gap: 'Employee onboarding', detail: 'No onboarding checklists, no new starter workflows, no way to get employees set up systematically.' },
                { gap: 'Document management', detail: 'No document storage. Contracts, policies, and certificates need to live in a separate system.' },
                { gap: 'Shift rotas and clock in', detail: 'No rota planning, no shift scheduling, no time tracking. You need additional tools for all of these.' },
              ].map((item) => (
                <div key={item.gap} className="rounded-xl border bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{item.gap}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border-2 border-emerald-500 bg-emerald-50 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-emerald-800 text-sm">Leavely includes all of the above</h3>
                  <p className="text-sm text-emerald-700 mt-1">Every feature listed above is included in the standard Leavely plan at £8 per user per month. No add-ons, no upgrades, no extra cost.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing comparison */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                What you actually pay: Leavely vs Timetastic
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Timetastic looks cheap, but once you start adding the tools it does not include, the total cost adds up quickly.
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
                <p className="text-sm text-gray-500 mb-6">Everything included. One platform.</p>
                <ul className="space-y-3">
                  {['Leave management and absence tracking', 'Sickness monitoring with Bradford Factor', 'Employee onboarding and document storage', 'Shift rotas and clock in/out', 'Expense management and performance reviews', '14-day free trial, no credit card'].map((item) => (
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
                  <h3 className="text-xl font-bold text-gray-900">Timetastic</h3>
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mb-1">~£1.50<span className="text-lg font-medium text-gray-400">/user/mo</span></p>
                <p className="text-sm text-gray-500 mb-6">Holiday tracking only. Everything else is extra.</p>
                <ul className="space-y-3">
                  {[
                    { text: 'Leave booking and calendar only', included: false },
                    { text: 'No absence management', included: false },
                    { text: 'No sickness tracking or Bradford Factor', included: false },
                    { text: 'No employee onboarding', included: false },
                    { text: 'No document management', included: false },
                    { text: 'Need separate tools for rotas, expenses', included: false },
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
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Feature comparison: Leavely vs Timetastic
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Leavely matches Timetastic on leave management and adds everything else a growing business needs.
              </p>
            </div>
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 border-b px-6 py-4 text-sm font-semibold text-gray-700">
                <span>Feature</span>
                <span className="text-center">Leavely</span>
                <span className="text-center">Timetastic</span>
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
                      <X className="h-5 w-5 text-gray-300 mx-auto" />
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">Based on publicly available information from Timetastic&apos;s website as of April 2026. Features and pricing may have changed.</p>
          </div>
        </section>

        {/* Switch CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Ready to move beyond basic leave tracking?
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Sign up, add your team, and run Leavely alongside Timetastic for a week. Once you are happy, cancel Timetastic. No data migration needed.
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
              Why businesses switch from Timetastic to Leavely
            </h2>
            <div className="space-y-6">
              {[
                { title: 'They outgrew a leave-only tool', description: 'Timetastic handles holiday booking well, but as your team grows you need absence management, sickness monitoring, onboarding, and reporting. Timetastic has not added these features. Leavely has them all built in.' },
                { title: 'They needed Bradford Factor monitoring', description: 'Frequent short-term absence is expensive for UK businesses. Leavely automatically calculates Bradford Factor scores, sets trigger points, and alerts managers when scores reach concerning levels. Timetastic does not offer this at all.' },
                { title: 'They wanted one platform instead of five', description: 'Using Timetastic for leave, a spreadsheet for rotas, an email folder for documents, and a separate tool for expenses creates friction and costs more in total. Leavely replaces all of them with a single login and a single monthly invoice.' },
                { title: 'They needed proper employee self-service', description: 'Beyond requesting leave, employees need access to their documents, onboarding checklists, expense submissions, and performance reviews. Leavely gives every employee a self-service portal where they can manage everything themselves.' },
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
              No credit card. No annual contract. All features included from day one.
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
