import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Gift,
  Clock,
  Shield,
  Zap,
  CalendarDays,
  Users,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/free-leave-management-software`

export const metadata: Metadata = {
  title: 'Free Leave Management Software UK: Start Your 14-Day Free Trial',
  description:
    'Try Leavely free for 14 days. No credit card required. Full access to all features: leave calendar, automatic balances, Bradford Factor, approvals, and reporting. £8/user/month after trial.',
  alternates: { canonical: `${SITE_URL}/leave-management-software-uk` }, // canonical points to primary in cluster — 2026-05-21 audit
  keywords: [
    'free leave management software',
    'free holiday tracker',
    'free absence tracker',
    'leave management free trial',
    'free staff holiday planner',
    'free annual leave tracker',
    'free leave tracker UK',
    'leave management software free',
  ],
  openGraph: {
    title: 'Free Leave Management Software — 14-Day Trial — Leavely',
    description:
      'Try Leavely free for 14 days. No credit card. Full access to all features. See why businesses switch from spreadsheets.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'Is Leavely really free?',
    a: 'The 14-day trial is completely free with no credit card required. You get full access to every feature during the trial. After 14 days, Leavely costs £8 per user per month. There is no free-forever plan, but the trial gives you plenty of time to evaluate everything.',
  },
  {
    q: 'What happens after the free trial ends?',
    a: 'After 14 days, you can subscribe at £8 per user per month to keep using Leavely. If you do not subscribe, your account moves to read-only mode. Your data is preserved, so you can subscribe later without losing anything.',
  },
  {
    q: 'Do I need a credit card to start the free trial?',
    a: 'No. You register with your email address and company name. No credit card, no payment details, no commitment. You only enter payment information if you choose to subscribe after the trial.',
  },
  {
    q: 'Why not use a free spreadsheet instead?',
    a: 'Spreadsheets work for very small teams, but they break down quickly. They cannot calculate pro-rata automatically, they do not send approval notifications, they have no audit trail, and they rely on someone remembering to update them. The 14-day Leavely trial lets you experience the difference before spending anything.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Free Leave Management Software Trial`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Try Leavely free for 14 days. Leave management software with automatic balances, one-click approvals, and Bradford Factor monitoring.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
        description: '14-day free trial with full access. No credit card required. £8/user/month after trial.',
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

const trialFeatures = [
  { icon: CalendarDays, title: 'Visual leave calendar', description: 'See who is off at a glance with a colour-coded team calendar. Filter by department or team.' },
  { icon: Zap, title: 'One-click approvals', description: 'Managers approve or decline leave requests in a single click. Email notifications keep everyone informed.' },
  { icon: Shield, title: 'Bradford Factor monitoring', description: 'Automatically calculated for every employee based on their sick leave history. Set trigger point alerts.' },
  { icon: Clock, title: 'Automatic balance tracking', description: 'Allowances, pro-rata, carry-over, and accruals all calculated automatically. No formulas to maintain.' },
  { icon: Users, title: 'Unlimited leave types', description: 'Holiday, sick leave, TOIL, compassionate, study leave, or any custom type you create. All tracked in one place.' },
  { icon: Gift, title: 'Full audit trail', description: 'Every action is logged with timestamps and user attribution. Export reports to CSV at any time.' },
]

const freeVsLeavely = [
  { feature: 'Submit leave requests', spreadsheet: 'Manual', leavely: true },
  { feature: 'Manager approvals', spreadsheet: 'Email/verbal', leavely: true },
  { feature: 'Automatic balance tracking', spreadsheet: false, leavely: true },
  { feature: 'Pro-rata calculations', spreadsheet: 'Manual formula', leavely: true },
  { feature: 'Bank holiday deductions', spreadsheet: 'Manual', leavely: true },
  { feature: 'Carry-over rules', spreadsheet: false, leavely: true },
  { feature: 'Team calendar', spreadsheet: false, leavely: true },
  { feature: 'Clash detection', spreadsheet: false, leavely: true },
  { feature: 'Bradford Factor', spreadsheet: false, leavely: true },
  { feature: 'Email notifications', spreadsheet: false, leavely: true },
  { feature: 'Audit trail', spreadsheet: false, leavely: true },
  { feature: 'Export to CSV', spreadsheet: true, leavely: true },
]

export default function FreeLeaveManagementSoftwarePage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=free_leave_management_software'

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
                <Gift className="h-4 w-4" />
                Free 14-day trial
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Try Leave Management
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Software Free for 14 Days
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                No credit card. No commitment. No feature restrictions. Get full access to Leavely for 14 days and see what proper leave management software feels like compared to spreadsheets and free tools.
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
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> No credit card</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> All features included</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Set up in 2 minutes</span>
              </div>
            </div>
          </div>
        </section>

        {/* What's included in the trial */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Everything is included in the free trial
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                There are no feature restrictions during the 14-day trial. You get full access to everything.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trialFeatures.map((feature) => (
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

        {/* Spreadsheet comparison */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Free spreadsheets vs Leavely (free trial)
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Spreadsheets are free, but they cost you time, accuracy, and sanity. Here is what you gain by trying Leavely.
              </p>
            </div>
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 border-b px-6 py-4 text-sm font-semibold text-gray-700">
                <span>Capability</span>
                <span className="text-center">Spreadsheet (free)</span>
                <span className="text-center">Leavely (free trial)</span>
              </div>
              {freeVsLeavely.map((row) => (
                <div key={row.feature} className="grid grid-cols-3 px-6 py-3.5 border-b last:border-b-0 text-sm">
                  <span className="text-gray-700 font-medium">{row.feature}</span>
                  <span className="text-center">
                    {row.spreadsheet === true ? (
                      <CheckCircle2 className="h-5 w-5 text-gray-400 mx-auto" />
                    ) : row.spreadsheet === false ? (
                      <X className="h-5 w-5 text-gray-300 mx-auto" />
                    ) : (
                      <span className="text-xs text-amber-500 font-medium">{row.spreadsheet}</span>
                    )}
                  </span>
                  <span className="text-center">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mx-auto" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How the trial works */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                How the free trial works
              </h2>
            </div>
            <div className="space-y-8">
              {[
                { step: '1', title: 'Register in 30 seconds', description: 'Enter your name, email, and company name. No credit card, no payment details, no phone number.' },
                { step: '2', title: 'Add your team', description: 'Invite employees by email or let them sign up with a link. They set up their own profiles.' },
                { step: '3', title: 'Use every feature for 14 days', description: 'Submit leave requests, approve them, see the calendar, check balances, run reports. Nothing is restricted.' },
                { step: '4', title: 'Decide after 14 days', description: 'If Leavely works for you, subscribe at £8 per user per month. If not, your account simply moves to read-only mode. No awkward cancellation process.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold text-lg flex items-center justify-center">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Honest about pricing */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Being honest about &quot;free&quot;
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
                Leavely is not free forever. After the 14-day trial, it costs £8 per user per month. We believe that is fair for what you get. Here is why we do not offer a free-forever plan.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { title: 'Free tools have limitations', description: 'Truly free leave trackers either have severe feature restrictions, show advertisements, or are unmaintained side projects. We would rather build a tool that works properly and charge a fair price for it.' },
                { title: 'Your data deserves a paid service', description: 'Employee leave data is sensitive. A paid service means we invest in security, backups, uptime, and support. Free services have no revenue to fund those things.' },
                { title: '£8 per user is affordable', description: 'For a team of 10, that is £80 per month. Compare that to the time your HR person or office manager spends maintaining a spreadsheet, chasing approvals, and fixing balance errors. Leavely pays for itself.' },
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

        {/* CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Try it free. Decide later.
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              14 days. Every feature. No credit card. No sales calls. Just sign up and start using it.
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
