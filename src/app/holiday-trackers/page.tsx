import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CalendarDays,
  Clock,
  Users,
  Zap,
  Smartphone,
  Calculator,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/holiday-trackers`

export const metadata: Metadata = {
  title: 'Holiday Trackers UK: Best Holiday Tracker Tools for Teams (2026)',
  description:
    'Compare the best holiday trackers for UK teams. Visual calendars, automatic balance tracking, one-click approvals. Set up in 2 minutes. £8/user/month. Free 14-day trial.',
  alternates: { canonical: `${SITE_URL}/holiday-tracker-software` }, // canonical points to primary in cluster — 2026-05-21 audit
  keywords: [
    'holiday trackers',
    'holiday tracker tools',
    'best holiday trackers UK',
    'holiday trackers for teams',
    'staff holiday trackers',
    'online holiday trackers',
    'team holiday tracker tools',
    'holiday tracking tools UK',
  ],
  openGraph: {
    title: 'Holiday Trackers for UK Teams — Leavely',
    description:
      'The simplest holiday tracker tools for teams. Visual calendars, automatic balances, one-click approvals. Free 14-day trial.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'What makes a good holiday tracker?',
    a: 'The best holiday trackers handle balance calculations automatically, let employees submit requests online, and give managers one-click approvals. They should also support pro-rata for part-time staff, handle mid-year starters, and show a visual team calendar. Leavely does all of this and takes under 2 minutes to set up.',
  },
  {
    q: 'Do holiday trackers handle part-time staff?',
    a: 'Good holiday trackers automatically calculate pro-rata holiday entitlements for part-time employees based on their contracted hours or days. Leavely also handles mid-year starters and leavers, so you never have to do the maths yourself.',
  },
  {
    q: 'Can employees see their own holiday balance in these trackers?',
    a: 'Yes. With Leavely, every employee can log in and see their total allowance, days used, days pending approval, and remaining balance. This reduces the number of "how many days do I have left?" questions managers receive.',
  },
  {
    q: 'How much do holiday trackers typically cost?',
    a: 'Holiday trackers range from free basic tools to enterprise platforms costing £15 or more per user. Leavely costs £8 per user per month with all features included. There are no tiers, no setup fees, and no annual contracts. You start with a free 14-day trial and no credit card is required.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Holiday Tracker`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'One of the best holiday trackers for UK teams. Visual calendars, automatic balance tracking, and one-click approvals.',
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

const steps = [
  { number: '1', title: 'Register your account', description: 'Enter your company name and email. Takes 30 seconds.' },
  { number: '2', title: 'Add your team', description: 'Import employees or send them an invite link. They set up their own profiles.' },
  { number: '3', title: 'Start tracking', description: 'Employees submit requests, managers approve in one click, and balances update automatically.' },
]

const features = [
  { icon: CalendarDays, title: 'Visual holiday calendars', description: 'See all approved and pending holidays on a clean, colour-coded calendar. Filter by team or department to spot coverage gaps instantly.' },
  { icon: Calculator, title: 'Automatic balance tracking', description: 'No more manual calculations. Leavely tracks allowances, used days, pending requests, and remaining balance in real time. Pro-rata is handled automatically.' },
  { icon: Zap, title: 'One-click approvals', description: 'Managers get an email when someone requests time off. One click to approve, one click to decline. The employee is notified instantly.' },
  { icon: Users, title: 'Team overlap detection', description: 'Leavely flags when too many people from the same team request the same dates. You will never accidentally approve overlapping holidays again.' },
  { icon: Smartphone, title: 'Works on any device', description: 'Leavely is fully cloud-based and works on phones, tablets, and desktops. No app to download. Employees submit requests from wherever they are.' },
  { icon: Clock, title: 'UK bank holidays included', description: 'All UK bank holidays are pre-loaded. Choose whether to deduct them from allowance or treat them as additional. Region-specific holidays for Scotland and NI are supported.' },
]

export default function HolidayTrackersPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=holiday_trackers'

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
                <CalendarDays className="h-4 w-4" />
                Holiday tracker tools
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Holiday Trackers
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  for UK Teams
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Looking for the right holiday tracker for your team? Leavely is one of the simplest holiday trackers on the market. Your team books holidays, managers approve in one click, and balances update automatically. No spreadsheets, no email chains, no confusion.
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

        {/* 3-step setup */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Set up in 2 minutes, not 2 weeks
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Unlike most holiday trackers, Leavely needs no demos, no implementation projects, and no training sessions. Here is how it works.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-emerald-100 text-emerald-700 text-2xl font-extrabold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section>
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                What the best holiday trackers should offer
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                All features included at £8 per user per month. No tiers, no surprises.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-2xl border bg-white p-8 shadow-sm">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Still using a spreadsheet instead of a proper holiday tracker?
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Join thousands of UK teams who switched to Leavely. Set up takes 2 minutes and the first 14 days are completely free.
            </p>
            <div className="mt-8">
              <Link href={registerUrl}>
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg text-base px-8 h-12">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Why Leavely vs alternatives */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Why teams choose Leavely over other holiday trackers
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Simpler than enterprise HR tools', description: 'Tools like BrightHR and BambooHR are built for large HR teams. Leavely is built for businesses that need a holiday tracker, not a 50-module HR suite. You get exactly what you need and nothing you do not.' },
                { title: 'More powerful than free holiday trackers', description: 'Free holiday trackers handle basic requests but lack automatic balances, clash detection, pro-rata calculations, and reporting. Leavely gives you all of that for £8 per user per month.' },
                { title: 'No lock-in', description: 'Pay monthly, cancel anytime. No annual contracts, no cancellation fees, no awkward conversations with a sales team. Your data is always exportable.' },
                { title: 'Genuinely easy to use', description: 'Employees figure it out in seconds. Managers approve in one click. Admins set up in 2 minutes. There is no training required and no manual to read.' },
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
              Try one of the simplest holiday trackers for UK teams
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              £8 per user per month. All features. No credit card to start.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={registerUrl}>
                <Button size="lg" className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="text-base font-medium px-8 h-12">
                  View pricing
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
