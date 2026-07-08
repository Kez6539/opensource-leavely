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

const pageUrl = `${SITE_URL}/charlie-hr-alternative`

export const metadata: Metadata = {
  title: 'Best Charlie HR Alternative UK: All Features Included (2026)',
  description:
    'Looking for a Charlie HR alternative? Leavely scales at a flat £8/user/month with all features included. Rotas, clock in, expenses, performance reviews. No price jumps as you grow.',
  alternates: { canonical: pageUrl },
  keywords: [
    'Charlie HR alternative',
    'alternative to Charlie HR',
    'CharlieHR competitor',
    'cheaper than Charlie HR',
    'Charlie HR alternative UK',
    'Charlie HR replacement',
    'switch from Charlie HR',
  ],
  openGraph: {
    title: 'Best Charlie HR Alternative UK — Leavely',
    description:
      'Flat £8/user/month with all features included. No price jumps as you grow. See how Leavely compares to Charlie HR.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'Why switch from Charlie HR to Leavely?',
    a: 'Charlie HR targets startups but gets expensive as your team grows. Leavely is a flat £8 per user per month regardless of team size. You also get features Charlie HR does not include, like shift rotas, employee clock in and out, and expense management.',
  },
  {
    q: 'Is Leavely as easy to use as Charlie HR?',
    a: 'Yes. Leavely is designed for businesses that do not have a dedicated HR department. The setup takes under 2 minutes. Adding employees, requesting leave, and approving time off are all intuitive and require no training.',
  },
  {
    q: 'Does Leavely work for growing teams?',
    a: 'Absolutely. Unlike Charlie HR where pricing can jump as you add more employees, Leavely stays at £8 per user per month with no volume penalties. Whether you have 5 employees or 100, the price per user never changes and every feature is always included.',
  },
  {
    q: 'Can I try Leavely before committing?',
    a: 'Yes. Leavely offers a free 14-day trial with no credit card required. You get access to every feature during the trial. There is no contract, so if it is not the right fit, you simply do not continue.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Charlie HR Alternative`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Leavely is a Charlie HR alternative offering flat pricing at £8/user/month with all features included and no price jumps as you scale.',
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
  { feature: 'One-click approvals', leavely: true, competitor: true },
  { feature: 'Automatic balance tracking', leavely: true, competitor: true },
  { feature: 'Bradford Factor monitoring', leavely: true, competitor: false },
  { feature: 'Shift rotas', leavely: true, competitor: false },
  { feature: 'Employee clock in/out', leavely: true, competitor: false },
  { feature: 'Expense management', leavely: true, competitor: false },
  { feature: 'Performance reviews', leavely: true, competitor: true },
  { feature: 'TOIL tracking', leavely: true, competitor: false },
  { feature: 'Sick leave recording', leavely: true, competitor: true },
  { feature: 'UK bank holidays', leavely: true, competitor: true },
  { feature: 'Flat pricing at any team size', leavely: true, competitor: false },
  { feature: 'No annual contract', leavely: true, competitor: false },
  { feature: 'Self-service signup', leavely: true, competitor: true },
  { feature: 'Free trial without credit card', leavely: true, competitor: true },
]

export default function CharlieHRAlternativePage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=charlie_hr_alternative'

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
                Charlie HR alternative
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Looking for a
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Charlie HR Alternative?
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Charlie HR is great for startups, but it gets expensive as your team grows. Leavely scales at a flat £8 per user per month. Plus you get more features: rotas, clock in, expenses, and performance reviews all included.
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
                  <p className="text-3xl font-extrabold text-emerald-600">Flat</p>
                  <p className="text-sm text-gray-500">pricing at any size</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">All in</p>
                  <p className="text-sm text-gray-500">every feature included</p>
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
                What you actually pay: Leavely vs Charlie HR
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Charlie HR pricing starts affordably but can increase as your team grows and you add features. Leavely is one flat price for everyone, forever.
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
                <p className="text-sm text-gray-500 mb-6">All features included. Scales with you.</p>
                <ul className="space-y-3">
                  {['Same price at 5 or 100 employees', 'Rotas, expenses, clock in included', 'Bradford Factor and TOIL tracking', 'No annual contract', 'Cancel anytime', '14-day free trial, no credit card'].map((item) => (
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
                  <h3 className="text-xl font-bold text-gray-900">Charlie HR</h3>
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mb-1">Varies<span className="text-lg font-medium text-gray-400">/user/mo</span></p>
                <p className="text-sm text-gray-500 mb-6">Pricing scales with team size and plan.</p>
                <ul className="space-y-3">
                  {[
                    { text: 'Price increases as team grows', included: false },
                    { text: 'No Bradford Factor tracking', included: false },
                    { text: 'No shift rota management', included: false },
                    { text: 'No expense management', included: false },
                    { text: 'No employee clock in/out', included: false },
                    { text: 'Contract terms may apply', included: false },
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
                Feature comparison: Leavely vs Charlie HR
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Leavely includes features that Charlie HR does not offer, all at a flat price that stays the same as your team grows.
              </p>
            </div>
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 border-b px-6 py-4 text-sm font-semibold text-gray-700">
                <span>Feature</span>
                <span className="text-center">Leavely</span>
                <span className="text-center">Charlie HR</span>
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
            <p className="text-xs text-gray-400 mt-4 text-center">Based on publicly available information from Charlie HR&apos;s website as of April 2026. Features and pricing may have changed.</p>
          </div>
        </section>

        {/* Switch CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Outgrown Charlie HR? Try Leavely.
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Sign up in 2 minutes, add your team, and see why growing businesses choose Leavely. Run both side by side, then cancel Charlie HR when you are ready.
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
              Why growing businesses switch from Charlie HR to Leavely
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Predictable pricing that scales', description: 'Leavely is £8 per user per month whether you have 5 employees or 100. The price never increases based on team size. No surprises on your bill as your business grows.' },
                { title: 'More features included', description: 'Leavely includes shift rotas, employee clock in and out, expense management, Bradford Factor monitoring, and TOIL tracking. These are features that Charlie HR either does not offer or charges extra for.' },
                { title: 'No contract required', description: 'Leavely is month to month. Cancel from your account settings at any time. There are no annual commitments, no early termination fees, and no hoops to jump through.' },
                { title: 'Same simplicity, more power', description: 'Leavely is just as easy to set up and use as Charlie HR. The difference is that you get a complete people management platform, not just leave tracking, for a price that stays fair as you grow.' },
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
              No credit card. No sales calls. No annual contract. Just a better way to manage your team.
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
