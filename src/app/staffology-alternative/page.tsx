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

const pageUrl = `${SITE_URL}/staffology-alternative`

export const metadata: Metadata = {
  title: 'Best Staffology Alternative UK: Purpose-Built Leave Management (2026)',
  description:
    'Looking for a Staffology alternative for leave management? Leavely is purpose-built for absence tracking at £8/user/month. All features included, no payroll bolt-on limitations.',
  alternates: { canonical: pageUrl },
  keywords: [
    'Staffology alternative',
    'alternative to Staffology',
    'Staffology competitor',
    'Staffology HR alternative',
    'Staffology leave management alternative',
    'Staffology replacement UK',
    'switch from Staffology',
  ],
  openGraph: {
    title: 'Best Staffology Alternative UK — Leavely',
    description:
      'Purpose-built leave management at £8/user/month. All features included. No payroll bolt-on limitations.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'How does Leavely compare to Staffology for leave management?',
    a: 'Staffology is primarily a payroll platform. Their leave management features exist to complement payroll processing, not as a standalone product. Leavely is built from the ground up for leave and absence management, with features like Bradford Factor scoring, detailed absence reports, TOIL tracking, and employee self-service that Staffology simply does not prioritise.',
  },
  {
    q: 'Can I use Leavely alongside Staffology payroll?',
    a: 'Yes. Many businesses keep Staffology for payroll and use Leavely for leave management. Leavely handles all your absence tracking, approvals, and reporting, while Staffology continues to process your payroll. There is no conflict between the two systems.',
  },
  {
    q: 'What leave management features does Leavely have that Staffology lacks?',
    a: 'Leavely includes Bradford Factor monitoring, custom leave types, TOIL tracking, shift rotas, employee clock in and out, visual team calendars, Slack integration, and detailed absence reports. Staffology focuses on payroll compliance and offers only basic leave tracking as a supporting feature.',
  },
  {
    q: 'Is Leavely suitable for small businesses currently using Staffology?',
    a: 'Absolutely. Leavely is designed for UK SMBs with 5 to 200 employees. You can set up your account in under 2 minutes, add your team, and start managing leave immediately. There is no contract and you can cancel anytime. Most businesses run both systems side by side for a week before deciding.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Staffology Alternative`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Leavely is a Staffology alternative offering purpose-built leave management at a flat £8/user/month with no payroll bolt-on limitations.',
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
  { feature: 'Leave request and approval', leavely: true, competitor: true },
  { feature: 'Visual team calendar', leavely: true, competitor: false },
  { feature: 'Bradford Factor monitoring', leavely: true, competitor: false },
  { feature: 'Custom leave types', leavely: true, competitor: 'Basic only' },
  { feature: 'TOIL tracking', leavely: true, competitor: false },
  { feature: 'Shift rotas', leavely: true, competitor: false },
  { feature: 'Employee clock in/out', leavely: true, competitor: false },
  { feature: 'Expense management', leavely: true, competitor: false },
  { feature: 'Absence reports and analytics', leavely: true, competitor: 'Basic only' },
  { feature: 'Employee self-service portal', leavely: true, competitor: 'Basic only' },
  { feature: 'Slack integration', leavely: true, competitor: false },
  { feature: 'Calendar sync', leavely: true, competitor: false },
  { feature: 'UK bank holidays by nation', leavely: true, competitor: true },
  { feature: 'No annual contract', leavely: true, competitor: false },
  { feature: 'Transparent pricing', leavely: true, competitor: true },
]

export default function StaffologyAlternativePage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=staffology_alternative'

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
                Staffology alternative
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Looking for a
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Staffology Alternative?
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Staffology is a payroll platform first. Their leave management exists to support payroll, not to stand on its own. If you want proper absence tracking, Bradford Factor scoring, and employee self-service, you need a tool that was built for it. Leavely does one thing and does it properly, for £8 per user per month.
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

        {/* Pricing comparison */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Payroll bolt-on vs purpose-built leave management
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Staffology added leave tracking to complement their payroll product. Leavely was built from scratch to handle every aspect of leave and absence management for UK businesses.
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
                <p className="text-sm text-gray-500 mb-6">Purpose-built leave management. Every feature included.</p>
                <ul className="space-y-3">
                  {['Built specifically for leave management', 'Bradford Factor, TOIL, custom leave types', 'Rotas, clock in/out, expenses included', 'Visual team calendar and reports', 'No annual contract', '14-day free trial, no credit card'].map((item) => (
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
                  <h3 className="text-xl font-bold text-gray-900">Staffology</h3>
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mb-1">Varies<span className="text-lg font-medium text-gray-400"> by module</span></p>
                <p className="text-sm text-gray-500 mb-6">Payroll-first platform. HR is secondary.</p>
                <ul className="space-y-3">
                  {[
                    { text: 'Leave tracking is a payroll add-on', included: false },
                    { text: 'No Bradford Factor monitoring', included: false },
                    { text: 'No visual team calendar', included: false },
                    { text: 'Limited absence reporting', included: false },
                    { text: 'No shift rotas or time tracking', included: false },
                    { text: 'HR features secondary to payroll', included: false },
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
                Feature comparison: Leavely vs Staffology
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Every feature listed below is included in the standard Leavely plan at £8 per user per month. Staffology&apos;s HR features are limited compared to their payroll offering.
              </p>
            </div>
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 border-b px-6 py-4 text-sm font-semibold text-gray-700">
                <span>Feature</span>
                <span className="text-center">Leavely</span>
                <span className="text-center">Staffology</span>
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
                    ) : row.competitor === 'Basic only' ? (
                      <span className="text-amber-500 font-medium text-xs">Basic only</span>
                    ) : (
                      <span className="text-gray-300">✗</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">Based on publicly available information from Staffology&apos;s website as of April 2026. Features and pricing may have changed.</p>
          </div>
        </section>

        {/* Switch CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Keep Staffology for payroll. Use Leavely for leave.
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              You do not have to choose one or the other. Keep Staffology handling your payroll and let Leavely handle your leave management properly. Sign up in 2 minutes.
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
              Why businesses choose Leavely over Staffology for leave management
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Purpose-built, not bolted on', description: 'Staffology is a payroll company that added HR and leave features as a complement. Leavely was designed from day one to handle leave and absence management. Every feature, every workflow, every report is built around managing time off properly.' },
                { title: 'Bradford Factor and absence analytics', description: 'Leavely includes Bradford Factor scoring out of the box, helping you identify patterns of short, frequent absences before they become a problem. Staffology does not offer this level of absence intelligence because their focus is payroll compliance, not absence management.' },
                { title: 'Visual team calendar', description: 'See your entire team at a glance with Leavely. Who is off, who is on leave next week, where the gaps are. Staffology does not offer a visual calendar view because leave tracking is secondary to their payroll engine.' },
                { title: 'Everything included at £8 per user per month', description: 'Rotas, clock in and out, expenses, performance reviews, custom leave types, TOIL tracking. All included in one flat price. No modules to add, no tiers to upgrade to, no surprises on your bill.' },
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
              No credit card. No sales calls. No annual contract. Just proper leave management for your team.
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
