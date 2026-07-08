import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Shield,
  QrCode,
  MapPin,
  Clock,
  CalendarDays,
  BarChart3,
  Users,
  FileText,
  AlertTriangle,
  HardHat,
  Building,
  Wrench,
  Truck,
  Smartphone,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

/* ─── Page-level SEO metadata ────────────────────────────────────────── */
const pageUrl = `${SITE_URL}/construction`

export const metadata: Metadata = {
  title:
    'Staff Management Software for Construction | Site Attendance & Leave Tracking — Leavely',
  description:
    'Leavely helps builders, contractors, and construction firms manage site attendance, leave, and compliance. GPS clock-in from any site, multi-site dashboard, subcontractor tracking, CSCS compliance support. Free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'construction staff management software',
    'site attendance tracking construction',
    'construction leave management',
    'builder clock in system',
    'CSCS compliance tracking',
    'subcontractor attendance software',
    'construction rota software',
    'multi-site workforce management',
    'construction GPS clock in',
    'contractor leave tracker',
    'construction absence management',
    'site worker attendance app',
    'construction project staff tracker',
    'mobile clock in construction site',
    'construction working time directive',
  ],
  openGraph: {
    title: 'Staff Management Software for Construction — Leavely',
    description:
      'GPS clock-in from any construction site, multi-site workforce dashboard, leave tracking, and compliance support. Built for builders, contractors, and trades.',
    url: pageUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staff Management Software for Construction — Leavely',
    description:
      'GPS clock-in from any construction site, multi-site workforce dashboard, leave tracking, and compliance support. Built for builders, contractors, and trades.',
  },
}

/* ─── JSON-LD Structured Data ────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} for Construction`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Staff management software for construction companies, contractors, and trades. GPS clock-in from any site, multi-site attendance dashboard, leave management, and compliance tracking.',
      offers: {
        '@type': 'Offer',
        price: '8.00',
        priceCurrency: 'GBP',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        description:
          'Per user per month, billed monthly. 14-day free trial included.',
      },
      featureList: [
        'GPS clock-in from any construction site',
        'Multi-site attendance dashboard',
        'Real-time workforce visibility across sites',
        'Leave management with one-click approvals',
        'Subcontractor and employee tracking',
        'Bradford Factor monitoring',
        'Attendance and absence reports',
        'Role-based access control',
        'Rota and shift scheduling',
        'Cloud-based — works on any device',
      ],
      audience: {
        '@type': 'Audience',
        audienceType:
          'Construction companies, builders, contractors, trades, civil engineering firms, subcontractors',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does GPS clock-in work on construction sites?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You create a QR code for each construction site. Workers scan it with their phone camera when they arrive and leave. Each scan records the time, date, and GPS coordinates automatically — proving they were on the right site. No special hardware or app download required.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I track attendance across multiple construction sites?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely supports unlimited sites. Create a QR code for each project or site location. The dashboard shows who is clocked in at which site in real time, so you always know where your workforce is deployed.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I manage subcontractors separately from employees?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can set up separate teams or departments within Leavely to distinguish between direct employees and subcontractors. Each group can have different leave policies, and managers can filter attendance reports by team to see exactly who was on site and when.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Leavely help with CSCS compliance?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can store CSCS card details, expiry dates, and qualification documents against each employee profile. Leavely keeps a digital audit trail of attendance records that supports your site compliance requirements and can be exported for inspections.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I handle weather delays and site shutdowns?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can create company-wide leave blocks for weather delays or site shutdowns. These apply to all affected workers automatically, and their leave balances are adjusted accordingly. The audit trail records the reason for the shutdown.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Leavely handle seasonal workers and short-term contracts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can add and remove workers quickly as projects start and finish. Leave allowances are pro-rated based on start and end dates, so seasonal workers and short-term contractors get the correct entitlement automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can workers clock in from their mobile phone on site?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely is fully mobile-first and works on any smartphone with a camera and web browser. Workers scan the site QR code to clock in — no app download needed. It works even with limited connectivity as it queues the scan.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does Leavely cost for construction companies?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leavely costs £8 per user per month with all features included — no tiers, no hidden fees. Every account starts with a free 14-day trial, no credit card required. For a construction firm with 50 workers, that is £400 per month.',
          },
        },
      ],
    },
  ],
}

/* ─── FAQ data (rendered on page + in JSON-LD above) ─────────────────── */
const faqs = [
  {
    q: 'How does GPS clock-in work on construction sites?',
    a: 'You create a QR code for each construction site. Workers scan it with their phone camera when they arrive and leave. Each scan records the time, date, and GPS coordinates automatically — proving they were on the right site. No special hardware or app download required.',
  },
  {
    q: 'Can I track attendance across multiple construction sites?',
    a: 'Yes. Leavely supports unlimited sites. Create a QR code for each project or site location. The dashboard shows who is clocked in at which site in real time, so you always know where your workforce is deployed.',
  },
  {
    q: 'How do I manage subcontractors separately from employees?',
    a: 'You can set up separate teams or departments within Leavely to distinguish between direct employees and subcontractors. Each group can have different leave policies, and managers can filter attendance reports by team to see exactly who was on site and when.',
  },
  {
    q: 'Can Leavely help with CSCS compliance?',
    a: 'Yes. You can store CSCS card details, expiry dates, and qualification documents against each employee profile. Leavely keeps a digital audit trail of attendance records that supports your site compliance requirements and can be exported for inspections.',
  },
  {
    q: 'How do I handle weather delays and site shutdowns?',
    a: 'You can create company-wide leave blocks for weather delays or site shutdowns. These apply to all affected workers automatically, and their leave balances are adjusted accordingly. The audit trail records the reason for the shutdown.',
  },
  {
    q: 'Does Leavely handle seasonal workers and short-term contracts?',
    a: 'Yes. You can add and remove workers quickly as projects start and finish. Leave allowances are pro-rated based on start and end dates, so seasonal workers and short-term contractors get the correct entitlement automatically.',
  },
  {
    q: 'Can workers clock in from their mobile phone on site?',
    a: 'Yes. Leavely is fully mobile-first and works on any smartphone with a camera and web browser. Workers scan the site QR code to clock in — no app download needed. It works even with limited connectivity as it queues the scan.',
  },
  {
    q: 'How much does Leavely cost for construction companies?',
    a: 'Leavely costs £8 per user per month with all features included — no tiers, no hidden fees. Every account starts with a free 14-day trial, no credit card required. For a construction firm with 50 workers, that is £400 per month.',
  },
]

/* ─── Solution features ──────────────────────────────────────────────── */
const solutions = [
  {
    icon: QrCode,
    title: 'GPS Clock-In From Any Site',
    description:
      'Print a QR code for each construction site. Workers scan on arrival with their phone — time, date, and GPS coordinates are recorded automatically. No hardware, no app downloads, no training.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    bullets: [
      'Unique QR code per site or project',
      'GPS coordinates captured on every scan',
      'Works on any smartphone camera',
      'Instant digital record — no paper timesheets',
    ],
  },
  {
    icon: MapPin,
    title: 'Multi-Site Workforce Dashboard',
    description:
      'See who is clocked in at which construction site in real time. Track attendance across multiple projects from a single dashboard. Spot gaps in coverage before they delay your programme.',
    color: 'from-teal-500 to-emerald-600',
    bg: 'bg-teal-50',
    bullets: [
      'Live view of all sites and workers',
      'Filter by project, team, or trade',
      'Instant gap detection across sites',
      'Access from phone, tablet, or desktop',
    ],
  },
  {
    icon: CalendarDays,
    title: 'Leave Management & Sick Leave',
    description:
      'Workers request leave from their phone. Managers approve in one click. Sick leave triggers Bradford Factor monitoring and return-to-work processes — all tracked automatically.',
    color: 'from-emerald-600 to-teal-700',
    bg: 'bg-emerald-50',
    bullets: [
      'One-click leave approvals',
      'Bradford Factor auto-calculated',
      'Weather delay and shutdown tracking',
      'Pro-rated allowances for seasonal workers',
    ],
  },
  {
    icon: Users,
    title: 'Real-Time Staff Visibility',
    description:
      'Know exactly who is on each site right now, how long they have been there, and whether you have enough cover. Access the dashboard from anywhere — even from another site.',
    color: 'from-teal-600 to-emerald-700',
    bg: 'bg-teal-50',
    bullets: [
      'Live dashboard of who is on site',
      'Site-level and project-level breakdown',
      'Instant gap detection',
      'Works on any device, anywhere',
    ],
  },
  {
    icon: BarChart3,
    title: 'Attendance & Absence Reports',
    description:
      'Pre-built reports for attendance patterns, absence trends, Bradford Factor scores, and overtime. Export to CSV for payroll, CITB audits, or share with project managers.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    bullets: [
      '8 pre-built report templates',
      'Filter by site, team, or trade',
      'Export to CSV for payroll',
      'Trend analysis for absence patterns',
    ],
  },
]

/* ─── Built-for sector list ──────────────────────────────────────────── */
const sectors = [
  {
    icon: Building,
    title: 'Builders',
    description: 'Residential and commercial builders managing site teams',
  },
  {
    icon: HardHat,
    title: 'Contractors',
    description: 'Main contractors coordinating multiple trades on site',
  },
  {
    icon: Wrench,
    title: 'Trades',
    description: 'Electricians, plumbers, joiners, and specialist trades',
  },
  {
    icon: Truck,
    title: 'Civil Engineering',
    description: 'Civil engineering firms running infrastructure projects',
  },
  {
    icon: Users,
    title: 'Construction Firms',
    description: 'Multi-site construction companies with large workforces',
  },
]

/* ─── Problem cards ──────────────────────────────────────────────────── */
const problems = [
  {
    icon: FileText,
    title: 'Paper timesheets go missing',
    description:
      'Paper sign-in sheets get lost, rained on, or left in the site cabin. When you need attendance records for payroll or audits, you are scrambling to reconstruct them.',
  },
  {
    icon: AlertTriangle,
    title: 'No visibility across multiple sites',
    description:
      'With workers spread across different projects, you have no way to see who is on which site right now. Gaps in coverage only surface when it is too late to rearrange.',
  },
  {
    icon: Clock,
    title: 'Leave and absence chaos',
    description:
      'Holiday requests come in by text, WhatsApp, or word-of-mouth. Without a central system, double-bookings happen and critical trades go uncovered on site.',
  },
]

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function ConstructionPage() {
  const registerUrl =
    '/register?utm_source=website&utm_campaign=construction'

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Nav ── */}
      <MarketingNav />

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          {/* Background decoration — emerald/teal accent */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/60 via-white to-white" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-emerald-100/40 to-teal-100/30 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-sm text-emerald-700 font-medium mb-6">
                <HardHat className="h-4 w-4" />
                Built for construction
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Staff Management Software
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  for Construction
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                GPS clock-in from any construction site, multi-site workforce
                dashboard, leave tracking, and compliance support.
                Replace paper timesheets with Leavely.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href={registerUrl}>
                  <Button
                    size="lg"
                    className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30"
                  >
                    Start free trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/book-a-demo">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-base font-medium px-8 h-12"
                  >
                    Book a demo
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-400">
                Free 14-day trial. No credit card required.
              </p>
              <div className="flex items-center gap-6 justify-center mt-6">
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">
                    GPS
                  </p>
                  <p className="text-sm text-gray-500">verified clock-in</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">
                    &lt; 5 min
                  </p>
                  <p className="text-sm text-gray-500">setup time</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">
                    £8
                  </p>
                  <p className="text-sm text-gray-500">per user/month</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Problem Section ── */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Sound familiar?
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                These are the problems construction managers face every day — and
                exactly what Leavely solves.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {problems.map((problem) => (
                <div
                  key={problem.title}
                  className="rounded-2xl border bg-white p-8 shadow-sm"
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-red-50 text-red-500 mb-4">
                    <problem.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Solution Sections ── */}
        {solutions.map((solution, index) => {
          const isEven = index % 2 === 0
          return (
            <section
              key={solution.title}
              className={isEven ? '' : 'bg-gray-50/50 border-y'}
            >
              <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={isEven ? '' : 'order-2'}>
                    <div
                      className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${solution.color} text-white mb-4 shadow-sm`}
                    >
                      <solution.icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                      {solution.title}
                    </h2>
                    <p className="mt-4 text-lg text-gray-500 leading-relaxed">
                      {solution.description}
                    </p>
                    <ul className="mt-8 space-y-4">
                      {solution.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-center gap-3 text-gray-700"
                        >
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                          <span className="font-medium">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`${isEven ? '' : 'order-1'} rounded-2xl ${solution.bg} border p-8`}
                  >
                    <div className="space-y-4">
                      {/* Visual illustration card */}
                      {index === 0 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <div className="flex items-center gap-3 mb-4">
                              <QrCode className="h-8 w-8 text-emerald-600" />
                              <div>
                                <p className="font-semibold text-gray-900">
                                  Riverside Development — Phase 2
                                </p>
                                <p className="text-xs text-gray-500">
                                  QR Code — Site Entrance
                                </p>
                              </div>
                            </div>
                            <div className="bg-emerald-50 rounded-lg p-4 text-center">
                              <div className="w-24 h-24 mx-auto bg-white rounded-lg border-2 border-dashed border-emerald-300 flex items-center justify-center">
                                <QrCode className="h-12 w-12 text-emerald-400" />
                              </div>
                              <p className="text-xs text-emerald-600 font-medium mt-2">
                                Scan to clock in
                              </p>
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                              <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                              GPS verified — Riverside Rd, Manchester M3 5FT
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="h-3.5 w-3.5 text-emerald-500" />
                              Clocked in at 06:45 — 24 Mar 2026
                            </div>
                          </div>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Multi-Site Dashboard
                            </p>
                            <div className="space-y-3">
                              {[
                                {
                                  site: 'Riverside Phase 2',
                                  workers: '14 on site',
                                  status: 'Active',
                                  statusColor:
                                    'bg-emerald-50 text-emerald-600',
                                },
                                {
                                  site: 'Kings Road Flats',
                                  workers: '8 on site',
                                  status: 'Active',
                                  statusColor:
                                    'bg-emerald-50 text-emerald-600',
                                },
                                {
                                  site: 'Elm Park Offices',
                                  workers: '0 on site',
                                  status: 'No Workers',
                                  statusColor: 'bg-red-50 text-red-500',
                                },
                              ].map((entry) => (
                                <div
                                  key={entry.site}
                                  className="flex items-center justify-between text-xs border-b pb-2 last:border-0"
                                >
                                  <div>
                                    <span className="font-medium text-gray-700">
                                      {entry.site}
                                    </span>
                                    <span className="text-gray-400 ml-2">
                                      {entry.workers}
                                    </span>
                                  </div>
                                  <span
                                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${entry.statusColor}`}
                                  >
                                    {entry.status}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4">
                            <p className="text-sm font-medium text-gray-900">
                              Total workforce today
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              22 workers across 2 active sites. 1 site with no
                              cover — review deployment.
                            </p>
                          </div>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Leave Requests
                            </p>
                            <div className="space-y-2">
                              {[
                                {
                                  name: 'Mike T.',
                                  type: 'Sick Leave',
                                  dates: 'Today',
                                  status: 'Pending',
                                  statusColor:
                                    'bg-amber-50 text-amber-600',
                                },
                                {
                                  name: 'Ryan K.',
                                  type: 'Holiday',
                                  dates: '28 – 30 Mar',
                                  status: 'Approved',
                                  statusColor:
                                    'bg-emerald-50 text-emerald-600',
                                },
                                {
                                  name: 'Steve P.',
                                  type: 'Weather Delay',
                                  dates: '20 Mar',
                                  status: 'Completed',
                                  statusColor:
                                    'bg-gray-50 text-gray-500',
                                },
                              ].map((req) => (
                                <div
                                  key={req.name}
                                  className="flex items-center justify-between text-xs py-2 border-b last:border-0"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-semibold text-emerald-700">
                                      {req.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                    </div>
                                    <div>
                                      <span className="font-medium text-gray-700">
                                        {req.name}
                                      </span>
                                      <span className="text-gray-400 ml-1">
                                        {req.type}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-400">
                                      {req.dates}
                                    </span>
                                    <span
                                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${req.statusColor}`}
                                    >
                                      {req.status}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  Bradford Factor — Mike T.
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  3 spells, 5 days — Score: 45
                                </p>
                              </div>
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">
                                Medium
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                      {index === 3 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Live Site Dashboard
                            </p>
                            <div className="space-y-2">
                              {[
                                {
                                  name: 'Dave W.',
                                  location: 'Riverside Phase 2',
                                  since: '06:45',
                                  status: 'On Site',
                                },
                                {
                                  name: 'Craig M.',
                                  location: 'Kings Road Flats',
                                  since: '07:10',
                                  status: 'On Site',
                                },
                                {
                                  name: 'Lee B.',
                                  location: 'Riverside Phase 2',
                                  since: '—',
                                  status: 'Not Clocked In',
                                },
                              ].map((staff) => (
                                <div
                                  key={staff.name}
                                  className="flex items-center justify-between text-xs py-2 border-b last:border-0"
                                >
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`h-2 w-2 rounded-full ${staff.status === 'On Site' ? 'bg-emerald-500' : 'bg-gray-300'}`}
                                    />
                                    <span className="font-medium text-gray-700">
                                      {staff.name}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-gray-400">
                                      {staff.location}
                                    </span>
                                    <span
                                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                                        staff.status === 'On Site'
                                          ? 'bg-emerald-50 text-emerald-600'
                                          : 'bg-red-50 text-red-500'
                                      }`}
                                    >
                                      {staff.status}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4 flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Cover gap detected
                              </p>
                              <p className="text-xs text-gray-500">
                                Lee B. has not clocked in at Riverside Phase 2.
                                Shift started at 07:00. Consider arranging cover.
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                      {index === 4 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Absence Report — March 2026
                            </p>
                            <div className="space-y-3">
                              {[
                                {
                                  label: 'Total sick days',
                                  value: '18',
                                  trend: '+4 vs Feb',
                                  trendColor: 'text-red-500',
                                },
                                {
                                  label: 'Weather delay days',
                                  value: '3',
                                  trend: '-2 vs Feb',
                                  trendColor: 'text-emerald-500',
                                },
                                {
                                  label: 'Avg Bradford Factor',
                                  value: '52',
                                  trend: 'Medium',
                                  trendColor: 'text-amber-500',
                                },
                                {
                                  label: 'Attendance rate',
                                  value: '92.8%',
                                  trend: '+1.2%',
                                  trendColor: 'text-emerald-500',
                                },
                              ].map((metric) => (
                                <div
                                  key={metric.label}
                                  className="flex items-center justify-between text-xs"
                                >
                                  <span className="text-gray-500">
                                    {metric.label}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-gray-900">
                                      {metric.value}
                                    </span>
                                    <span
                                      className={`text-[10px] ${metric.trendColor}`}
                                    >
                                      {metric.trend}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4 text-center">
                            <p className="text-xs text-gray-500">
                              Export to CSV for payroll, CITB audits, or
                              project management reports
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        })}

        {/* ── Built For Section ── */}
        <section className="bg-gradient-to-br from-emerald-50/60 to-teal-50/40">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Built for every type of construction business
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Whether you run a single site or manage projects across the
                country, Leavely fits your workflow.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {sectors.map((sector) => (
                <div
                  key={sector.title}
                  className="rounded-2xl border bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white mb-4 shadow-sm">
                    <sector.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    {sector.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {sector.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Compliance Section ── */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Compliance support for construction
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Stay on top of industry regulations with digital records and
                audit trails built into every feature.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'CITB & Industry Regulations',
                  description:
                    'Leavely creates a digital audit trail for every clock-in, absence, and approval. Exportable reports support CITB levy returns and HSE compliance checks.',
                },
                {
                  icon: Clock,
                  title: 'Working Time Directive',
                  description:
                    'Track hours worked across sites to monitor compliance with the Working Time Regulations 1998. Spot workers approaching the 48-hour weekly average before it becomes an issue.',
                },
                {
                  icon: FileText,
                  title: 'CSCS Card Tracking',
                  description:
                    'Store CSCS card numbers, qualification types, and expiry dates against each employee profile. Keep your site records audit-ready with documents attached to every worker.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border bg-white p-8 shadow-sm"
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing Section ── */}
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              One plan, everything included. No hidden fees. No long-term
              contracts.
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="rounded-2xl border-2 border-emerald-500 bg-white p-8 shadow-xl shadow-emerald-500/10 text-center">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-2">
                Per seat
              </p>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-5xl font-extrabold text-gray-900">
                  £8
                </span>
                <span className="text-lg text-gray-500">/user/month</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                Billed monthly based on active worker count
              </p>
              <ul className="text-left space-y-3 mb-8">
                {[
                  'Everything included — no tiers',
                  'GPS clock-in from any site',
                  'Multi-site workforce dashboard',
                  'Leave management & approvals',
                  'Bradford Factor monitoring',
                  'Rota & shift scheduling',
                  'Attendance & absence reports',
                  'Employee profiles & documents',
                  'CSCS card tracking',
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-sm text-gray-600"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={registerUrl}>
                <Button
                  size="lg"
                  className="w-full text-base font-semibold h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25"
                >
                  Start free for 14 days
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="mt-3 text-xs text-gray-400">
                No credit card required. Cancel anytime.
              </p>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Example: a construction firm with 50 workers ={' '}
                <strong className="text-gray-900">£400/month</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Ready to ditch paper timesheets?
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Join construction firms that have switched to digital site
              attendance tracking. Set up in under 5 minutes, free for 14 days.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={registerUrl}>
                <Button
                  size="lg"
                  className="text-base font-semibold px-8 h-12 bg-white text-emerald-700 hover:bg-gray-50 shadow-lg shadow-black/10"
                >
                  Start free trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/book-a-demo">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base font-medium px-8 h-12 border-white/30 text-white hover:bg-white/10"
                >
                  Book a demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="scroll-mt-16">
          <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                Common questions from construction managers about Leavely.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-left font-semibold text-gray-900 [&::-webkit-details-marker]:hidden list-none">
                    <span>{faq.q}</span>
                    <ChevronDown className="h-5 w-5 text-gray-400 shrink-0 ml-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <MarketingFooter />
    </div>
  )
}
