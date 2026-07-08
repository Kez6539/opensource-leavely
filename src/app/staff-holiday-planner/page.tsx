import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  CalendarDays,
  AlertTriangle,
  Users,
  ShieldCheck,
  Eye,
  Ban,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/staff-holiday-planner`

export const metadata: Metadata = {
  title: 'Staff Holiday Planner UK: Plan Team Leave Without the Chaos',
  description:
    'Staff holiday planner for UK businesses. Visual team calendar, clash detection, blackout dates, and department views. Stop overlapping holidays causing coverage gaps. £8/user/month. Free 14-day trial.',
  alternates: { canonical: `${SITE_URL}/holiday-tracker-software` }, // canonical points to primary in cluster — 2026-05-21 audit
  keywords: [
    'staff holiday planner',
    'team holiday planner',
    'staff leave planner',
    'employee holiday planner UK',
    'holiday planner for teams',
    'team leave calendar',
    'staff holiday calendar UK',
    'holiday rota planner',
  ],
  openGraph: {
    title: 'Staff Holiday Planner for UK Businesses — Leavely',
    description:
      'Visual team calendar with clash detection and blackout dates. Plan holidays without the chaos. Free 14-day trial.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'How does clash detection work?',
    a: 'When an employee submits a holiday request, Leavely checks whether anyone else from the same team or department has already booked the same dates. If there is a clash, the manager sees a warning before approving. You can configure the maximum number of people allowed off at the same time per team.',
  },
  {
    q: 'Can I block certain dates from being booked?',
    a: 'Yes. Leavely supports blackout dates where no leave can be requested. This is useful for peak trading periods, month-end close, or any dates where you need full staffing. Employees see blackout dates on their calendar and cannot submit requests for those dates.',
  },
  {
    q: 'Can different managers see different teams?',
    a: 'Yes. Leavely uses role-based access control. Managers only see leave requests and calendars for their direct reports. Department heads see their whole department. Owners and admins see everyone. Employees see only their own requests.',
  },
  {
    q: 'How much does Leavely cost?',
    a: 'Leavely costs £8 per user per month with all features included. There are no tiers, no setup fees, and no annual contracts. Every account starts with a free 14-day trial and no credit card is required.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Staff Holiday Planner`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Staff holiday planner for UK businesses with visual team calendar, clash detection, blackout dates, and department views.',
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

const problems = [
  { icon: AlertTriangle, title: 'Too many people off at once', description: 'Two people from the same team book the same week. Nobody notices until Monday morning when the team is half-staffed.' },
  { icon: CalendarDays, title: 'No visibility of who is off when', description: 'Holiday approvals happen over email or Slack. There is no central calendar, so managers cannot see the full picture before approving.' },
  { icon: Ban, title: 'Peak periods left unprotected', description: 'Critical trading periods, month-end close, or busy seasons get booked up because there is no mechanism to block dates.' },
]

const features = [
  { icon: Eye, title: 'Visual team calendar', description: 'See every approved and pending holiday on a colour-coded calendar. Filter by team, department, or the whole company. Spot gaps and clashes at a glance.' },
  { icon: ShieldCheck, title: 'Clash detection', description: 'Leavely warns managers when a new request would overlap with existing approved leave. Configure maximum simultaneous absences per team to prevent coverage gaps.' },
  { icon: Ban, title: 'Blackout dates', description: 'Block specific dates where no leave can be requested. Useful for busy periods, product launches, or month-end close. Employees see blocked dates on their calendar.' },
  { icon: Users, title: 'Department views', description: 'Each manager sees only their team. Department heads see their department. Owners see the whole company. The right people see the right information.' },
  { icon: CalendarDays, title: 'Calendar sync', description: 'Sync approved leave to Google Calendar, Outlook, or any iCal-compatible calendar. Managers see team absences alongside their own meetings.' },
  { icon: CheckCircle2, title: 'One-click approvals', description: 'Managers receive an email notification when someone requests leave. One click to approve, one click to decline. The employee is notified immediately.' },
]

export default function StaffHolidayPlannerPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=staff_holiday_planner'

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
                Team holiday planning
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Staff Holiday Planner
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  for UK Businesses
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                See who is off, spot clashes before they happen, and protect busy periods with blackout dates. Leavely gives you a visual staff holiday planner that keeps your team running smoothly all year.
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

        {/* Problems */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Holiday planning without a system is chaos
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                These problems are completely avoidable with the right tool.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {problems.map((problem) => (
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
                Plan holidays with confidence
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Every feature included at £8 per user per month. No tiers, no hidden costs.
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

        {/* Visual calendar demo */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Your team calendar, at a glance
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                One view shows you who is off, who has pending requests, and where the gaps are.
              </p>
            </div>
            {/* Illustrative calendar card */}
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900">July 2026</h3>
                <span className="text-sm text-gray-400">Marketing team</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Sarah M.', dates: '7-11 Jul', status: 'Approved', colour: 'bg-emerald-100 text-emerald-700' },
                  { name: 'James T.', dates: '7-9 Jul', status: 'Clash warning', colour: 'bg-amber-100 text-amber-700' },
                  { name: 'Emily R.', dates: '21-25 Jul', status: 'Approved', colour: 'bg-emerald-100 text-emerald-700' },
                  { name: 'David K.', dates: '28-30 Jul', status: 'Pending', colour: 'bg-blue-100 text-blue-700' },
                ].map((row) => (
                  <div key={row.name} className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                        {row.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{row.name}</p>
                        <p className="text-xs text-gray-500">{row.dates}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${row.colour}`}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Leavely */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Why businesses choose Leavely as their holiday planner
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Built for teams, not individuals', description: 'Leavely is designed around team visibility. Every feature focuses on helping managers plan across their team, not just track individual requests.' },
                { title: 'Prevents problems, not just records them', description: 'Clash detection and blackout dates stop problems before they happen. You do not find out about overlapping holidays on Monday morning.' },
                { title: 'Simple enough for everyone', description: 'Employees submit requests in seconds. Managers approve in one click. There is no training needed and nothing to install.' },
                { title: 'Affordable for growing teams', description: '£8 per user per month, all features included. No tiers, no contracts, no hidden charges. Scale up or down as your team changes.' },
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
              Plan your team&apos;s holidays properly
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Start your free 14-day trial. No credit card, no sales calls, no commitment.
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
