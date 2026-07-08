import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CalendarDays,
  BarChart3,
  Users,
  Clock,
  Shield,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/leave-management-software-uk`

export const metadata: Metadata = {
  title: 'Leave Management Software UK: Track Holidays, Sick Leave & Absences',
  description:
    'Leavely is leave management software built for UK businesses. Track holidays, sick leave, and absences in one place. Automatic balances, one-click approvals, Bradford Factor. £8/user/month. Free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'leave management software UK',
    'leave management system UK',
    'leave management tool',
    'leave management software',
    'employee leave management UK',
    'staff leave management software',
    'annual leave management system',
    'leave tracking software UK',
  ],
  openGraph: {
    title: 'Leave Management Software UK — Leavely',
    description:
      'Track holidays, sick leave, and absences in one place. Automatic balances, one-click approvals, and full audit trail. Free 14-day trial.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'What does leave management software do?',
    a: 'Leave management software replaces spreadsheets and paper forms for tracking employee time off. It handles holiday requests, sick leave recording, balance calculations, approval workflows, and reporting. Employees submit requests online, managers approve in one click, and balances update automatically.',
  },
  {
    q: 'How much does Leavely cost?',
    a: 'Leavely costs £8 per user per month with all features included. There are no tiers, no add-on fees, and no annual contracts. Every account starts with a free 14-day trial with no credit card required.',
  },
  {
    q: 'Is Leavely suitable for small businesses?',
    a: 'Yes. Leavely is designed specifically for UK SMBs with 5 to 250 employees. You can set up your account in under 2 minutes, invite your team, and start tracking leave immediately. There is no minimum user count and no setup fee.',
  },
  {
    q: 'Does Leavely handle UK bank holidays and pro-rata calculations?',
    a: 'Yes. Leavely includes all UK bank holidays by default and automatically calculates pro-rata entitlements for part-time staff and mid-year joiners. Carry-over rules, accrual based leave, and custom leave types are all supported.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Leave Management Software UK`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Leave management software for UK businesses. Track holidays, sick leave, and absences with automatic balance tracking, one-click approvals, and full audit trail.',
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

const features = [
  { icon: CalendarDays, title: 'Visual leave calendar', description: 'See who is off at a glance. Filter by team, department, or location. Spot clashes before approving.' },
  { icon: Zap, title: 'One-click approvals', description: 'Managers approve or decline leave requests in a single click. Email notifications keep everyone in the loop.' },
  { icon: BarChart3, title: 'Automatic balance tracking', description: 'Allowances, used days, pending requests, and remaining balance update in real time. No manual calculations.' },
  { icon: Shield, title: 'Bradford Factor monitoring', description: 'Automatically calculate Bradford Factor scores for every employee. Set trigger points and flag patterns of short-term absence.' },
  { icon: Users, title: 'Team and department views', description: 'Separate views for each team or department. Managers only see their direct reports. Owners see everyone.' },
  { icon: Clock, title: 'TOIL and custom leave types', description: 'Track time off in lieu, compassionate leave, study leave, or any custom absence type alongside annual leave.' },
]

const freeVsPaid = [
  { feature: 'Holiday request submission', free: true, paid: true },
  { feature: 'Automatic balance calculations', free: false, paid: true },
  { feature: 'Pro-rata for part-timers', free: false, paid: true },
  { feature: 'Bradford Factor monitoring', free: false, paid: true },
  { feature: 'One-click manager approvals', free: false, paid: true },
  { feature: 'Leave calendar with clash detection', free: false, paid: true },
  { feature: 'Carry-over and accrual rules', free: false, paid: true },
  { feature: 'Audit trail for every action', free: false, paid: true },
  { feature: 'Custom leave types (TOIL, etc.)', free: false, paid: true },
  { feature: 'Exportable reports', free: false, paid: true },
  { feature: 'Role-based access control', free: false, paid: true },
  { feature: 'UK bank holidays included', free: false, paid: true },
]

export default function LeaveManagementSoftwareUKPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=leave_management_software_uk'

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
                Leave management for UK businesses
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Leave Management Software
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  for UK Businesses
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Stop chasing spreadsheets and paper forms. Leavely gives you one place to track holidays, sick leave, and every other absence type. Automatic balances, one-click approvals, and a full audit trail. Set up in 2 minutes.
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
                  <p className="text-3xl font-extrabold text-emerald-600">2 min</p>
                  <p className="text-sm text-gray-500">setup time</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">All</p>
                  <p className="text-sm text-gray-500">features included</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is leave management software */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-6">
              What is leave management software?
            </h2>
            <div className="prose prose-gray max-w-none [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4">
              <p>
                Leave management software is a tool that handles the entire lifecycle of employee time off. From the moment an employee submits a request, through manager approval, to the automatic update of their remaining balance, it replaces manual processes with a system that works on its own.
              </p>
              <p>
                For UK businesses, the right leave management system also handles the specifics: 28 days statutory entitlement, bank holiday deductions, pro-rata calculations for part-time workers, carry-over limits, and accrual based leave for employees who join mid year.
              </p>
              <p>
                Most businesses start with a spreadsheet. That works for 5 people. By the time you reach 10 or 15, the errors start creeping in. Someone gets double-booked. A balance is wrong. A sick day is forgotten. Leave management software eliminates those problems entirely.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section>
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Everything you need to manage leave
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Every feature is included in the £8/user/month price. No tiers, no add-ons.
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

        {/* Free vs Paid comparison */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Free tools vs proper leave management software
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Spreadsheets and free tools handle the basics. Leavely handles everything.
              </p>
            </div>
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 border-b px-6 py-4 text-sm font-semibold text-gray-700">
                <span>Feature</span>
                <span className="text-center">Spreadsheets / Free Tools</span>
                <span className="text-center">Leavely (£8/user/mo)</span>
              </div>
              {freeVsPaid.map((row) => (
                <div key={row.feature} className="grid grid-cols-3 px-6 py-3.5 border-b last:border-b-0 text-sm">
                  <span className="text-gray-700 font-medium">{row.feature}</span>
                  <span className="text-center">
                    {row.free ? (
                      <CheckCircle2 className="h-5 w-5 text-gray-400 mx-auto" />
                    ) : (
                      <span className="text-gray-300">✗</span>
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

        {/* Why Leavely */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Why UK businesses choose Leavely
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Built for the UK', description: 'Statutory entitlements, bank holidays, pro-rata rules, and carry-over limits are all handled out of the box. You do not need to configure anything.' },
                { title: 'Simple, transparent pricing', description: '£8 per user per month. All features included. No tiers, no annual contracts, no hidden charges. Pay monthly, cancel anytime.' },
                { title: 'Set up in 2 minutes', description: 'Register, add your employees, and start tracking leave. No onboarding calls, no implementation projects. Your team can submit their first request within minutes.' },
                { title: 'Everything in one place', description: 'Holidays, sick leave, TOIL, compassionate leave, and any custom type you create. One calendar, one dashboard, one source of truth.' },
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
              Ready to ditch the spreadsheet?
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Start your free 14-day trial today. No credit card, no sales calls, no commitment.
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
