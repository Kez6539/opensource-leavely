import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Calculator,
  CalendarDays,
  Clock,
  FileSpreadsheet,
  Zap,
  RefreshCw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/leave-trackers-uk`

export const metadata: Metadata = {
  title: 'Leave Trackers UK: Best Employee Leave Trackers for Small Business',
  description:
    'Compare the best leave trackers for UK businesses. Automatic balance tracking, pro-rata, carry-over, accruals, and bank holidays handled for you. No more spreadsheets. £8/user/month. Free 14-day trial.',
  alternates: { canonical: `${SITE_URL}/annual-leave-tracker` }, // canonical points to primary in cluster — 2026-05-21 audit
  keywords: [
    'leave trackers',
    'employee leave trackers',
    'leave trackers UK',
    'annual leave trackers',
    'staff leave trackers',
    'leave balance trackers',
    'leave tracking tools',
    'best leave trackers UK',
  ],
  openGraph: {
    title: 'Employee Leave Trackers UK — Leavely',
    description:
      'Automatic balance tracking, pro-rata calculations, carry-over, and one-click approvals. No more spreadsheets. Free 14-day trial.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'What should I look for in a leave tracker?',
    a: 'The best leave trackers handle balance calculations automatically, support pro-rata for part-time employees, manage carry-over rules, and let managers approve requests in one click. Leavely does all of this out of the box, with setup taking under 2 minutes.',
  },
  {
    q: 'Can leave trackers handle carry-over rules?',
    a: 'Yes. Good leave trackers let you configure how many days employees are allowed to carry over from one leave year to the next, and set an expiry date for carried-over days. Leavely enforces these rules automatically so you do not have to check them manually.',
  },
  {
    q: 'Do leave trackers replace Excel spreadsheets?',
    a: 'Yes. Modern leave trackers like Leavely replace Excel spreadsheets entirely. Employees submit requests online, managers approve in one click, and balances update automatically. There is no formula to maintain, no shared file to break, and no risk of someone accidentally deleting a row.',
  },
  {
    q: 'How much do leave trackers cost?',
    a: 'Leave trackers range from free basic tools to premium platforms costing £15 or more per user. Leavely costs £8 per user per month with all features included. There are no setup fees, no tiers, and no annual contracts. Start with a free 14-day trial and no credit card.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Employee Leave Tracker`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'One of the best leave trackers for UK businesses. Automatic balance tracking, pro-rata calculations, carry-over rules, and one-click approvals.',
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

const spreadsheetProblems = [
  { icon: FileSpreadsheet, title: 'Formulas break', description: 'Someone edits the wrong cell, deletes a row, or overwrites a formula. Suddenly half the balances are wrong and nobody knows which ones to trust.' },
  { icon: Calculator, title: 'Manual calculations', description: 'Pro-rata for part-timers, bank holiday deductions, carry-over limits. Every edge case requires a manual calculation that is easy to get wrong.' },
  { icon: Clock, title: 'No real-time updates', description: 'The spreadsheet only updates when someone remembers to update it. Employees ask managers about their balance, managers check the spreadsheet, and neither is sure the number is right.' },
]

const features = [
  { icon: Zap, title: 'Balances update automatically', description: 'When a request is approved, the balance changes instantly. When a request is cancelled, it is reversed. There is no delay and no manual step.' },
  { icon: Calculator, title: 'Pro-rata calculated for you', description: 'Part-time employees get their entitlement calculated based on contracted hours. Mid-year starters get a pro-rata allowance for the remaining leave year. You set the rules once.' },
  { icon: RefreshCw, title: 'Carry-over and accrual rules', description: 'Set carry-over limits and expiry dates. Or use accrual based leave where entitlement builds up each month. Leavely enforces the rules automatically.' },
  { icon: CalendarDays, title: 'Bank holidays deducted or added', description: 'Choose whether UK bank holidays are deducted from the employee allowance or treated as additional days off. Region-specific holidays for Scotland and Northern Ireland are supported.' },
  { icon: CheckCircle2, title: 'One-click approvals', description: 'Managers receive email notifications for new requests and approve or decline in a single click. The employee is notified immediately.' },
  { icon: FileSpreadsheet, title: 'Export to CSV', description: 'Need to send leave data to your accountant or payroll provider? Export any report to CSV with one click. Filter by date range, department, or leave type.' },
]

export default function LeaveTrackersUKPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=leave_trackers_uk'

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
                <Calculator className="h-4 w-4" />
                Employee leave trackers
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Employee Leave Trackers
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  That Do the Maths for You
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Stop spending hours updating spreadsheets. The best leave trackers automatically manage every employee&apos;s balance, handle pro-rata calculations, and enforce carry-over rules. Leavely is one of the simplest leave trackers available. Set it up once and it runs on its own.
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
              <p className="mt-4 text-sm text-gray-400">Free 14-day trial. No credit card required. £8/user/month.</p>
            </div>
          </div>
        </section>

        {/* Spreadsheet problems */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Why spreadsheets fail as leave trackers
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Excel was built for numbers, not for managing people. Here is what goes wrong.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {spreadsheetProblems.map((problem) => (
                <div key={problem.title} className="rounded-2xl border bg-white p-8 shadow-sm">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-red-50 text-red-500 mb-4">
                    <problem.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{problem.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{problem.description}</p>
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
                Leave trackers that run themselves
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Set up your leave policies once. Leavely handles everything from there.
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
            <div className="mt-12 text-center">
              <Link href={registerUrl}>
                <Button size="lg" className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Balance illustration */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Every employee sees their balance instantly
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                No more &quot;how many days do I have left?&quot; questions. With proper leave trackers, employees check their own balance anytime.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-6 shadow-sm max-w-md mx-auto">
              <h3 className="font-bold text-gray-900 mb-4">Sarah M. — Annual Leave 2026</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total allowance</span>
                  <span className="font-bold text-gray-900">25 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Carried over</span>
                  <span className="font-bold text-gray-900">3 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Used</span>
                  <span className="font-bold text-red-500">8 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Pending approval</span>
                  <span className="font-bold text-amber-500">3 days</span>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-900">Remaining</span>
                  <span className="text-2xl font-extrabold text-emerald-600">17 days</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Replace your spreadsheet with a proper leave tracker
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Set up in 2 minutes. Free for 14 days. £8 per user per month after that.
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
      </main>

      <MarketingFooter />
    </div>
  )
}
