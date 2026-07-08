import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  X,
  Zap,
  PoundSterling,
  Shield,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/cheapest-hr-software-uk`

export const metadata: Metadata = {
  title: 'Cheapest HR Software UK: Full Features from £8/User/Month (2026)',
  description:
    'Compare the cheapest HR software in the UK. Leavely offers all HR features from £8/user/month with no tiers, no lock-in, and no hidden costs. Transparent price comparison table included.',
  alternates: { canonical: pageUrl },
  keywords: [
    'cheapest HR software UK',
    'cheap HR software',
    'affordable HR software UK',
    'low cost HR software',
    'budget HR software',
    'HR software price comparison UK',
  ],
  openGraph: {
    title: 'Cheapest HR Software UK — Leavely',
    description:
      'Full HR features from £8/user/month. See how Leavely compares on price to BrightHR, Breathe, Charlie HR, and more.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'Is Leavely really the cheapest HR software in the UK?',
    a: 'Leavely is one of the most affordable options when you consider what is included. At £8 per user per month, every feature is included: leave management, rotas, time tracking, performance reviews, expenses, and onboarding. Some competitors start cheaper but lock features behind tiers, meaning you pay more as your needs grow. Leavely has one price with everything included.',
  },
  {
    q: 'What is the catch with cheap HR software?',
    a: 'Some "cheap" or "free" HR tools make money by limiting features, charging for add-ons, requiring annual contracts, or collecting your data. Leavely is transparent: £8 per user per month, all features, pay monthly, cancel anytime. The price is low because Leavely is efficient and focused on the features UK SMBs actually need.',
  },
  {
    q: 'How does Leavely compare to free HR software?',
    a: 'Free HR tools typically have significant limitations: limited users, missing features, no support, or they monetise your data. Leavely costs £8 per user per month but gives you a complete HR platform with no restrictions. For a team of 10, that is £80 per month for leave management, rotas, time tracking, performance reviews, expenses, and onboarding.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes. Leavely offers a 14-day free trial with full access to every feature. No credit card required. You can add your team, test the features, and decide if it works before you pay anything.',
  },
  {
    q: 'Are there any hidden costs?',
    a: 'No. Leavely is £8 per user per month. That is the only cost. There are no setup fees, no implementation charges, no training costs, no add-on modules, and no annual commitment. If you cancel, you stop paying immediately.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Cheapest HR Software UK`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      datePublished: '2026-04-05',
      description:
        'Affordable HR software for UK businesses. All features from £8 per user per month with no hidden costs, no tiers, and no annual contracts.',
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

const priceComparison = [
  { name: 'Leavely', price: '£8', period: '/user/mo', features: 'All features', contract: 'Monthly', highlight: true },
  { name: 'Charlie HR', price: '£5+', period: '/user/mo', features: 'Limited on basic plan', contract: 'Annual', highlight: false },
  { name: 'Sage HR', price: '£5.50+', period: '/user/mo', features: 'Tiered, premium costs more', contract: 'Annual', highlight: false },
  { name: 'Factorial', price: '£5.25+', period: '/user/mo', features: 'Tiered, enterprise extra', contract: 'Annual', highlight: false },
  { name: 'Breathe', price: '£13+', period: '/user/mo', features: 'Tiered pricing', contract: 'Annual', highlight: false },
  { name: 'BrightHR', price: '£13.50+', period: '/user/mo', features: 'Quote-based, add-ons', contract: 'Annual', highlight: false },
  { name: 'Personio', price: 'Quote', period: '', features: 'Custom + implementation fees', contract: 'Annual', highlight: false },
  { name: 'HiBob', price: 'Quote', period: '', features: 'Enterprise pricing', contract: 'Annual', highlight: false },
]

export default function CheapestHRSoftwareUKPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=cheapest_hr_software_uk'

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
                Affordable HR software
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Cheapest HR Software
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  That Actually Works
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Looking for affordable HR software that does not cut corners? Leavely gives you leave management, rotas, time tracking, performance reviews, expenses, and onboarding for £8 per user per month. No tiers. No add-ons. No annual contract. See exactly how we compare to every major competitor below.
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
            </div>
          </div>
        </section>

        {/* Price comparison table */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                UK HR software price comparison (2026)
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                A transparent comparison of what you actually pay. Prices shown are per user per month at the time of writing.
              </p>
            </div>
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-4 bg-gray-50 border-b px-6 py-4 text-sm font-semibold text-gray-700">
                <span>Software</span>
                <span className="text-center">Price</span>
                <span className="text-center">Features</span>
                <span className="text-center">Contract</span>
              </div>
              {priceComparison.map((row) => (
                <div key={row.name} className={`grid grid-cols-4 px-6 py-3.5 border-b last:border-b-0 text-sm ${row.highlight ? 'bg-emerald-50/50' : ''}`}>
                  <span className={`font-medium ${row.highlight ? 'text-emerald-700' : 'text-gray-700'}`}>
                    {row.name}
                    {row.highlight && <span className="ml-1 text-xs text-emerald-500">(recommended)</span>}
                  </span>
                  <span className="text-center font-semibold text-gray-900">{row.price}<span className="text-gray-400 font-normal">{row.period}</span></span>
                  <span className="text-center text-gray-500 text-xs">{row.features}</span>
                  <span className="text-center text-gray-500 text-xs">{row.contract}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">Prices based on publicly available information as of April 2026. Some competitors use quote-based pricing that may differ. Charlie HR, Sage HR, and Factorial start cheaper but have tiered plans where key features cost extra.</p>
          </div>
        </section>

        {/* What you get for £8 */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-4">
              What you get for £8 per user per month
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto text-center mb-12">
              Every feature is included. Nothing is locked behind a more expensive plan.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Leave management and approvals',
                'Team calendar with visual planner',
                'Bradford Factor monitoring',
                'TOIL tracking',
                'Return-to-work forms',
                'Rota and shift planning',
                'QR code and GPS clock-in',
                'Weekly timesheet export',
                'Performance review cycles',
                'Goal tracking',
                'Expense management',
                'Onboarding checklists',
                'Employee directory',
                'Document management',
                'Audit trail',
                'UK bank holidays built in',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 py-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Affordable does not mean limited
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Leavely includes every feature at £8 per user per month. No tiers, no add-ons, no annual contract. For a team of 20, that is just £160 per month for complete HR software.
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

        {/* Why cheap isn't always bad */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Why Leavely is affordable without compromising
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Focused on what UK SMBs actually need', description: 'Leavely does not try to be an enterprise platform. It focuses on the HR features that businesses with 5 to 200 employees use every day: leave, rotas, time tracking, performance, expenses, and onboarding. No bloat means lower costs passed on to you.' },
                { title: 'No sales team inflating the price', description: 'Many HR tools charge £13 to £20 per user because they need to fund a large sales team. Leavely is self-service. You sign up, add your team, and start using it. That efficiency means lower costs.' },
                { title: 'One plan keeps things simple', description: 'Maintaining multiple pricing tiers is expensive. Leavely has one plan at one price. This simplicity reduces overhead and lets us offer a lower price while still including every feature.' },
                { title: 'Transparent pricing builds trust', description: 'When you can see the price on the website, there are no negotiation games. You know what you will pay before you sign up. If it does not work, cancel anytime. That transparency is something most enterprise HR tools refuse to offer.' },
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

        {/* Team size pricing */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              What does Leavely cost for your team?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { size: '5 employees', cost: '£40/mo' },
                { size: '10 employees', cost: '£80/mo' },
                { size: '20 employees', cost: '£160/mo' },
                { size: '50 employees', cost: '£400/mo' },
              ].map((item) => (
                <div key={item.size} className="rounded-2xl border bg-white p-6 text-center shadow-sm">
                  <p className="text-2xl font-extrabold text-emerald-600">{item.cost}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.size}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">All features included. Pay monthly, cancel anytime.</p>
          </div>
        </section>

        {/* FAQ */}
        <section>
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
        <section className="border-t">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Try Leavely free for 14 days
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              Full HR software at £8 per user per month. No credit card needed to start. No surprises when the invoice arrives.
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
