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

const pageUrl = `${SITE_URL}/sage-hr-alternative`

export const metadata: Metadata = {
  title: 'Best Sage HR Alternative UK: No Brand Tax, All Features (2026)',
  description:
    'Looking for a Sage HR alternative? Sage HR is a separate acquired product with limited Sage accounting integration. Leavely is purpose-built for leave management at £8/user/month. No brand tax, no ecosystem lock-in. Free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'Sage HR alternative',
    'alternative to Sage HR',
    'Sage HR competitor',
    'Sage People alternative',
    'Sage HR replacement UK',
    'cheaper than Sage HR',
    'switch from Sage HR',
    'Sage HR pricing',
  ],
  openGraph: {
    title: 'Best Sage HR Alternative UK — Leavely',
    description:
      'Stop paying the Sage brand tax. Leavely is purpose-built for leave management at £8/user/month with every feature included.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'Does Sage HR integrate well with Sage Accounting?',
    a: 'Many businesses assume that because both products carry the Sage name, the integration must be seamless. In practice, Sage HR (formerly CakeHR) was acquired by Sage and is a separate product with its own codebase. The integration with Sage Accounting is surprisingly limited. If tight accounting integration is the reason you are considering Sage HR, it is worth testing the actual integration before committing.',
  },
  {
    q: 'How does Leavely pricing compare to Sage HR?',
    a: 'Sage HR pricing is not always straightforward. Their base plan starts at approximately £4 to £5.50 per user per month for basic leave management, but features like shift scheduling, timesheets, and performance reviews require add-ons or higher tiers that increase the cost significantly. Leavely is £8 per user per month with every feature included. No tiers, no add-ons, no surprises.',
  },
  {
    q: 'Is Sage HR the same product Sage built from scratch?',
    a: 'No. Sage HR was originally an independent product called CakeHR. Sage acquired it and rebranded it as Sage HR. It was not built in-house by Sage alongside their accounting and payroll products. This is why the integration between Sage HR and other Sage products can feel disconnected compared to what you might expect from a single vendor.',
  },
  {
    q: 'Can I use Leavely without any Sage products?',
    a: 'Absolutely. Leavely is a fully standalone product. You do not need Sage Accounting, Sage Payroll, or any other Sage software to use it. If you are already using Sage for accounting and want better HR software, Leavely works independently alongside whatever accounting tool you prefer.',
  },
  {
    q: 'Is it easy to switch from Sage HR to Leavely?',
    a: 'Yes. Set up your Leavely account in under 2 minutes, add your employees, and run both systems side by side for a week. Once you are satisfied, cancel Sage HR. Leavely calculates leave balances from your leave year start date, so there is no complex data migration required.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Sage HR Alternative`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      datePublished: '2026-04-06',
      description:
        'Leavely is a purpose-built Sage HR alternative for UK SMBs. All features at £8/user/month with no brand tax and no ecosystem lock-in.',
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
  { feature: 'Bradford Factor monitoring', leavely: true, competitor: true },
  { feature: 'Approval workflows', leavely: true, competitor: true },
  { feature: 'Shift scheduling / rotas', leavely: true, competitor: 'Add-on' },
  { feature: 'Time tracking / timesheets', leavely: true, competitor: 'Add-on' },
  { feature: 'Performance reviews', leavely: true, competitor: 'Add-on' },
  { feature: 'Onboarding checklists', leavely: true, competitor: 'Add-on' },
  { feature: 'Expense management', leavely: true, competitor: false },
  { feature: 'Document management', leavely: true, competitor: true },
  { feature: 'All features in one plan', leavely: true, competitor: false },
  { feature: 'No ecosystem dependency', leavely: true, competitor: false },
  { feature: 'Modern mobile-first interface', leavely: true, competitor: false },
  { feature: 'Transparent flat pricing', leavely: true, competitor: false },
  { feature: 'No annual contract required', leavely: true, competitor: false },
  { feature: 'Self-service signup', leavely: true, competitor: false },
]

export default function SageHRAlternativePage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=sage_hr_alternative'

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
                Sage HR alternative
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Stop paying the
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Sage brand tax
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Many UK businesses use Sage for accounting and assume Sage HR must be the natural choice. But Sage HR is a separate product Sage acquired (originally CakeHR), not one they built alongside their accounting platform. The integration is surprisingly limited, and you are paying a premium for the Sage name. Leavely is purpose-built for leave management at £8 per user per month.
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
                  <p className="text-3xl font-extrabold text-gray-400 line-through">£4-5+</p>
                  <p className="text-sm text-gray-500">Sage HR (base, add-ons extra)</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">All in</p>
                  <p className="text-sm text-gray-500">no add-ons needed</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The brand tax problem */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                The legacy brand tax, explained
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Sage is a massive, trusted brand in UK accounting. But Sage HR is not the same thing as Sage. Here is what you should know before choosing it.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { point: 'Sage HR was acquired, not built in-house', detail: 'Sage HR started life as CakeHR, an independent HR product. Sage acquired and rebranded it. It was not designed and built by the same teams that created Sage Accounting or Sage Payroll.' },
                { point: 'The Sage accounting integration is limited', detail: 'If you are choosing Sage HR because you already use Sage Accounting and expect deep, seamless integration between the two, the reality may disappoint you. The integration is basic compared to what you might expect from products under the same brand.' },
                { point: 'You are paying for the brand, not for a better product', detail: 'The Sage name carries a premium. You trust it because of their accounting software. But that trust does not automatically make Sage HR the best choice for leave management. Purpose-built alternatives can offer more features at a lower price.' },
                { point: 'Add-ons increase the real cost', detail: 'Sage HR starts at approximately £4 to £5.50 per user per month for basic leave management. But shift scheduling, timesheets, performance reviews, and onboarding are add-ons that increase the total cost. The headline price does not tell the full story.' },
              ].map((item) => (
                <div key={item.point} className="rounded-xl border bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-gray-900">{item.point}</h3>
                      <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{item.detail}</p>
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
                What you actually pay: Leavely vs Sage HR
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Sage HR advertises a low starting price, but add-ons for shift scheduling, performance reviews, and timesheets push the real cost higher. Leavely has one price for everything.
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
                <p className="text-sm text-gray-500 mb-6">Every feature. One price. No add-ons.</p>
                <ul className="space-y-3">
                  {['All features at £8/user/month', 'Purpose-built for leave management', 'No dependency on other products', 'Modern, mobile-friendly interface', 'No annual contract', '14-day free trial, no credit card'].map((item) => (
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
                  <h3 className="text-xl font-bold text-gray-900">Sage HR</h3>
                </div>
                <p className="text-4xl font-extrabold text-gray-900 mb-1">~£4-5+<span className="text-lg font-medium text-gray-400">/user/mo</span></p>
                <p className="text-sm text-gray-500 mb-6">Base plan only. Add-ons cost extra.</p>
                <ul className="space-y-3">
                  {[
                    { text: 'Base plan covers basic leave only', included: false },
                    { text: 'Shift scheduling is an add-on', included: false },
                    { text: 'Performance reviews cost extra', included: false },
                    { text: 'Timesheets are a paid add-on', included: false },
                    { text: 'Acquired product (formerly CakeHR)', included: false },
                    { text: 'Limited Sage accounting integration', included: false },
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
                Feature comparison: Leavely vs Sage HR
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Every feature below is included in the standard Leavely plan. With Sage HR, many are locked behind add-on modules.
              </p>
            </div>
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 border-b px-6 py-4 text-sm font-semibold text-gray-700">
                <span>Feature</span>
                <span className="text-center">Leavely</span>
                <span className="text-center">Sage HR</span>
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
            <p className="text-xs text-gray-400 mt-4 text-center">Based on publicly available information from Sage HR&apos;s website as of April 2026. Features and pricing may have changed.</p>
          </div>
        </section>

        {/* Switch CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Purpose-built beats bolted-on
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Leavely was designed from day one as leave management software. Not acquired. Not rebranded. Not bolted onto an accounting platform. Try it free for 14 days.
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
              Why businesses switch from Sage HR to Leavely
            </h2>
            <div className="space-y-6">
              {[
                { title: 'The Sage accounting integration was not what they expected', description: 'Many businesses chose Sage HR because they assumed it would integrate deeply with Sage Accounting. When they discovered the integration was limited, they realised they could choose any HR software without losing anything. Leavely works alongside any accounting tool you use.' },
                { title: 'Add-ons made Sage HR more expensive than it looked', description: 'The base price is attractive, but once you add shift scheduling, timesheets, and performance reviews, the total cost per user climbs well above what you expected. With Leavely, every feature is included at £8 per user per month. The price you see is the price you pay.' },
                { title: 'They wanted a modern, mobile-friendly experience', description: 'Sage HR has been around for years and the interface reflects that. Leavely is built with a clean, modern design that works beautifully on any device through the browser. No app download required. Employees actually enjoy using it.' },
                { title: 'They did not need the Sage ecosystem', description: 'If you are not using multiple Sage products, there is no benefit to choosing Sage HR over a purpose-built alternative. Leavely is fully standalone. Use whatever accounting, payroll, and other tools work best for your business.' },
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
              No credit card. No sales calls. No Sage account needed. Just better leave management software.
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
