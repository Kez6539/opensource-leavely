import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Zap,
  Clock,
  Shield,
  Calendar,
  BarChart3,
  Calculator,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/annual-leave-tracker`

export const metadata: Metadata = {
  title: 'Annual Leave Tracker UK: Automatic Holiday Balance Tracking',
  description:
    'Track annual leave for your UK team automatically. Pro rata calculations, carry over, bank holidays, and real-time balances. £8/user/month, set up in 2 minutes. Free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'annual leave tracker',
    'annual leave tracker UK',
    'track annual leave',
    'holiday leave tracker',
    'annual leave balance tracker',
    'employee annual leave tracker',
    'annual leave tracking software',
    'holiday entitlement tracker',
  ],
  openGraph: {
    title: 'Annual Leave Tracker UK — Leavely',
    description:
      'Automatic holiday balance tracking with pro rata, carry over, and bank holidays. £8/user/month, set up in 2 minutes.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'How does Leavely calculate annual leave balances?',
    a: 'Leavely automatically calculates each employee\'s remaining leave based on their total allowance, approved leave taken, pending requests, and any carry over from previous years. Balances update in real time as leave is requested, approved, or cancelled.',
  },
  {
    q: 'Does Leavely handle pro rata annual leave?',
    a: 'Yes. When you add a part time employee or someone who starts mid year, Leavely automatically calculates their pro rata entitlement. You set their working pattern and start date, and Leavely works out the correct allowance.',
  },
  {
    q: 'Can Leavely track carry over from the previous year?',
    a: 'Yes. You can configure carry over rules per leave policy. Set a maximum number of days that employees can carry over, and Leavely will automatically add those days to the new year\'s allowance.',
  },
  {
    q: 'How does Leavely handle UK bank holidays?',
    a: 'UK bank holidays are built in to Leavely. You can choose whether to include them as part of the statutory 28 day entitlement or treat them as additional days off. The system excludes bank holidays when calculating business days for leave requests.',
  },
  {
    q: 'Can employees check their own leave balance?',
    a: 'Yes. Every employee has access to their own dashboard showing their total allowance, days used, days pending approval, and remaining balance. They do not need to ask HR or check a spreadsheet.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Annual Leave Tracker`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Leavely is an annual leave tracker for UK businesses. Automatic balance tracking with pro rata calculations, carry over, and bank holidays.',
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

export default function AnnualLeaveTrackerPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=annual_leave_tracker'

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
                Annual leave tracker
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Annual Leave Tracker
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  for UK Businesses
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                The one thing every business needs: knowing who has how many holiday days left. Leavely tracks annual leave balances automatically with pro rata calculations, carry over, and UK bank holidays all handled for you.
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
                  <p className="text-3xl font-extrabold text-emerald-600">Real time</p>
                  <p className="text-sm text-gray-500">balance updates</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">Automatic</p>
                  <p className="text-sm text-gray-500">pro rata and carry over</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core tracking features */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Automatic annual leave tracking that just works
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                No manual calculations. No spreadsheet formulas. Leavely tracks every aspect of annual leave entitlement and usage automatically.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Calculator,
                  title: 'Pro rata calculations',
                  description: 'Part time employees and mid year starters get their entitlement calculated automatically. Set the working pattern and Leavely handles the maths.',
                },
                {
                  icon: Calendar,
                  title: 'Carry over rules',
                  description: 'Configure maximum carry over days per policy. At year end, unused leave is automatically rolled forward within your limits. No manual adjustments needed.',
                },
                {
                  icon: BarChart3,
                  title: 'Real time balances',
                  description: 'Balances update instantly as leave is requested, approved, or cancelled. Employees and managers always see accurate, up to date figures.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border bg-white p-6 shadow-sm">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                    <item.icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Everything tracked */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Every type of leave, tracked in one place
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Annual leave (holiday)',
                'Sick leave and sickness absence',
                'TOIL (time off in lieu)',
                'Compassionate leave',
                'Maternity and paternity leave',
                'Unpaid leave',
                'Study leave',
                'Bank holidays (configurable)',
                'Company shutdown days',
                'Custom leave types',
                'Half day leave',
                'Carry over from previous year',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 py-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Start tracking annual leave in 2 minutes
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Sign up, set your leave year dates and allowances, add your team. Balances are calculated automatically from day one.
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

        {/* Why choose Leavely */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Why businesses choose Leavely to track annual leave
            </h2>
            <div className="space-y-6">
              {[
                { title: 'No more spreadsheet headaches', description: 'Spreadsheets break. Formulas go wrong. Someone forgets to update them. Leavely replaces all of that with automatic, real time tracking that everyone on your team can access.' },
                { title: 'UK employment law built in', description: 'Statutory 5.6 weeks entitlement, UK bank holidays, pro rata for part time workers, and carry over rules are all built in to Leavely. You do not need to calculate these yourself.' },
                { title: 'Employees can check their own balance', description: 'Every team member has their own dashboard showing their allowance, used days, pending requests, and remaining balance. This eliminates the constant "how many days do I have left?" questions.' },
                { title: 'Managers see the full picture', description: 'The team calendar shows who is off and when. Absence reports highlight patterns. Balance summaries show who has too much leave remaining. All the information you need to manage your team effectively.' },
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
              No credit card. No sales calls. No annual contract. Just accurate annual leave tracking for your team.
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
