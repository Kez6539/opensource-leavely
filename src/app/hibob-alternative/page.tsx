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

const pageUrl = `${SITE_URL}/hibob-alternative`

export const metadata: Metadata = {
  title: 'Best HiBob Alternative UK: SMB HR Without Enterprise Pricing (2026)',
  description:
    'Looking for a HiBob alternative? HiBob is built for mid-market companies with 100+ employees. Leavely is built for UK SMBs with 5-200 employees. £8/user/month, all features, no demo required. Free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'HiBob alternative',
    'Bob HR alternative',
    'alternative to HiBob',
    'HiBob competitor',
    'HiBob replacement UK',
    'cheaper than HiBob',
    'HiBob for small business',
    'HiBob pricing',
  ],
  openGraph: {
    title: 'Best HiBob Alternative UK — Leavely',
    description:
      'HiBob is enterprise HR software with enterprise pricing. Leavely gives UK SMBs the features they actually need at £8/user/month. No demo call required.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'How much does HiBob actually cost?',
    a: 'HiBob does not publish pricing on their website. You have to request a demo and go through a sales process to get a quote. Industry estimates put HiBob at roughly £15 to £25 per user per month depending on company size and modules selected, but your actual quote may differ. Leavely is £8 per user per month with every feature included. The price is on the website. No sales call needed.',
  },
  {
    q: 'Is HiBob overkill for a company with under 50 employees?',
    a: 'In most cases, yes. HiBob is designed for mid-market and enterprise companies with 100 to 5,000 employees. Their platform includes compensation benchmarking, workforce planning, headcount analytics, and complex org chart tools that a 20 person company will never use. You end up paying for capabilities that add no value to your business. Leavely is built for UK SMBs with 5 to 200 employees and focuses on the features they actually need.',
  },
  {
    q: 'Can I try Leavely without speaking to a salesperson?',
    a: 'Yes. Sign up on the website, start your 14-day free trial, and add your team. No credit card required. No demo booking. No sales follow up. You can explore every feature on your own and decide if it works for your business.',
  },
  {
    q: 'Does Leavely have the same core features as HiBob?',
    a: 'Leavely covers the core HR features that UK SMBs need: leave management, absence tracking, sickness monitoring with Bradford Factor, employee self-service, shift rotas, clock in/out, expense management, performance reviews, onboarding, and document storage. HiBob offers additional enterprise features like compensation planning, payroll connectors, and workforce analytics that most small businesses do not need.',
  },
  {
    q: 'What if I am currently evaluating HiBob?',
    a: 'Start a free Leavely trial alongside your HiBob evaluation. You will have a working Leavely account in under 2 minutes. Compare the two side by side and see which one actually fits your team size, budget, and feature requirements. Many businesses find that Leavely covers everything they need at a fraction of the cost.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — HiBob Alternative`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      datePublished: '2026-04-06',
      description:
        'Leavely is a HiBob alternative built for UK SMBs. All features at £8/user/month with no sales process, no minimum seats, and no enterprise overhead.',
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
  { feature: 'Team calendar', leavely: true, competitor: true },
  { feature: 'Employee directory', leavely: true, competitor: true },
  { feature: 'Employee self-service', leavely: true, competitor: true },
  { feature: 'Onboarding workflows', leavely: true, competitor: true },
  { feature: 'Performance reviews', leavely: true, competitor: true },
  { feature: 'Bradford Factor monitoring', leavely: true, competitor: false },
  { feature: 'Shift rota planning', leavely: true, competitor: false },
  { feature: 'QR code clock-in/out', leavely: true, competitor: 'Add-on' },
  { feature: 'Expense management', leavely: true, competitor: false },
  { feature: 'Document management', leavely: true, competitor: true },
  { feature: 'Published pricing', leavely: true, competitor: false },
  { feature: 'Self-service signup (no demo)', leavely: true, competitor: false },
  { feature: 'No minimum seat count', leavely: true, competitor: false },
  { feature: 'No annual contract required', leavely: true, competitor: false },
  { feature: 'Set up in under 2 minutes', leavely: true, competitor: false },
  { feature: 'UK-focused (bank holidays, Bradford Factor)', leavely: true, competitor: false },
]

export default function HiBobAlternativePage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=hibob_alternative'

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
                HiBob alternative
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                HiBob is built for
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  enterprise. You are not.
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                HiBob (Bob) targets mid-market and enterprise companies with 100 to 5,000 employees. Their pricing reflects that. If you are a UK SMB with 5 to 50 employees, you are paying for compensation planning, workforce analytics, and org chart tools you will never use. Leavely gives you the features you actually need at £8 per user per month.
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
              <p className="mt-4 text-sm text-gray-400">Free 14-day trial. No credit card required. No sales call.</p>
              <div className="flex items-center gap-6 justify-center mt-6">
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">£8</p>
                  <p className="text-sm text-gray-500">per user/month</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-gray-400 line-through">~£15-25</p>
                  <p className="text-sm text-gray-500">HiBob (estimated)</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">No</p>
                  <p className="text-sm text-gray-500">demo required</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The problem with enterprise HR for SMBs */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Enterprise pricing for SMB needs
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                HiBob was built for companies with hundreds of employees. Here is what that means for a small business trying to use it.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { problem: 'No published pricing', detail: 'You cannot see what HiBob costs until you book a demo and speak to their sales team. This typically means the price is higher than you expect.' },
                { problem: 'Sales process required', detail: 'You cannot sign up and start using it today. HiBob requires a demo call, a needs assessment, and a custom quote. That process can take weeks.' },
                { problem: 'Minimum seat counts', detail: 'HiBob is optimised for companies with 50+ employees. Smaller teams may face minimum seat requirements or pricing that does not make sense at their scale.' },
                { problem: 'Annual contracts', detail: 'Enterprise software typically means annual commitments. If you need flexibility to scale up or down month to month, that is a problem.' },
                { problem: 'Features you will never use', detail: 'Compensation benchmarking, workforce planning, payroll hub, and complex org charts. These are valuable for a 500 person company. For a 20 person team, they just add cost.' },
                { problem: 'Global focus, not UK-specific', detail: 'HiBob serves companies worldwide. UK-specific features like Bradford Factor monitoring, statutory leave compliance, and bank holiday management are not their primary focus.' },
              ].map((item) => (
                <div key={item.problem} className="rounded-xl border bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <X className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{item.problem}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing comparison */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Transparent pricing vs &ldquo;request a demo&rdquo;
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                With Leavely, the price is on the website. No calls, no negotiations, no surprises.
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
                <p className="text-sm text-gray-500 mb-6">All features. Published pricing. Pay monthly.</p>
                <ul className="space-y-3">
                  {['Price published on the website', 'Sign up and start using it in 2 minutes', 'No minimum seat count', 'Cancel anytime, no contract', 'All features in one plan', '14-day free trial, no credit card'].map((item) => (
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
                  <h3 className="text-xl font-bold text-gray-900">HiBob (Bob)</h3>
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mb-1">???<span className="text-lg font-medium text-gray-400"> /user/mo</span></p>
                <p className="text-sm text-gray-500 mb-6">Pricing not published. Demo required.</p>
                <ul className="space-y-3">
                  {[
                    { text: 'No pricing on website', included: false },
                    { text: 'Must book demo to get a quote', included: false },
                    { text: 'Minimum seat counts likely', included: false },
                    { text: 'Annual contracts typical', included: false },
                    { text: 'Enterprise modules inflate cost', included: false },
                    { text: 'Overkill for teams under 50', included: false },
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
                Feature comparison: Leavely vs HiBob
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Leavely covers the features UK SMBs actually use. HiBob adds enterprise modules that inflate the price.
              </p>
            </div>
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 border-b px-6 py-4 text-sm font-semibold text-gray-700">
                <span>Feature</span>
                <span className="text-center">Leavely</span>
                <span className="text-center">HiBob</span>
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
                    ) : row.competitor === 'Add-on' ? (
                      <span className="text-amber-500 font-medium text-xs">Add-on</span>
                    ) : (
                      <span className="text-gray-300">✗</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">Based on publicly available information from HiBob&apos;s website as of April 2026. Features and pricing may have changed.</p>
          </div>
        </section>

        {/* Switch CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Skip the sales call. Start managing leave today.
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Sign up for Leavely in 2 minutes and get every feature from day one. No demo, no sales process, no waiting.
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
              Why UK SMBs choose Leavely over HiBob
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Transparent pricing from the start', description: 'Leavely is £8 per user per month. The price is on the website. You do not need to book a demo, speak to sales, or negotiate a custom quote. What you see is what you pay.' },
                { title: 'Built for the size of business you actually are', description: 'HiBob is designed for companies with 100 to 5,000 employees. Leavely is designed for UK SMBs with 5 to 200 employees. Every feature is built with smaller teams in mind, not retrofitted from an enterprise product.' },
                { title: 'UK-focused compliance and features', description: 'Leavely includes native support for UK bank holidays, Bradford Factor monitoring, TOIL tracking, and Working Time Regulations. HiBob serves a global market, which means UK compliance is one part of a much larger platform rather than the core focus.' },
                { title: 'No demo call standing between you and your HR software', description: 'With Leavely, you sign up on the website, add your team, and start using it in under 2 minutes. No demo booking, no needs assessment, no weeks of waiting for a custom quote. Just sign up and go.' },
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
              No credit card. No sales calls. No minimum seats. Just modern HR software at a price that makes sense.
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
