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
  Factory,
  Truck,
  Package,
  Warehouse,
  Wrench,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

/* ─── Page-level SEO metadata ────────────────────────────────────────── */
const pageUrl = `${SITE_URL}/manufacturing`

export const metadata: Metadata = {
  title:
    'Staff Management Software for Manufacturing & Logistics | Shift & Leave Tracking — Leavely',
  description:
    'Leavely helps factories, warehouses, and distribution centres manage shift patterns, leave, and attendance. QR code clock-in for the factory floor, rotating shift leave management, agency staff tracking, production line cover planning. Free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'manufacturing staff management software',
    'factory attendance tracking',
    'warehouse leave management',
    'logistics staff scheduling',
    'shift pattern leave management',
    'production line absence management',
    'factory QR clock in',
    'warehouse shift rota software',
    'manufacturing absence tracking',
    'distribution centre staff management',
    'agency staff leave tracking',
    'factory floor clock in system',
    'rotating shift leave management',
    'manufacturing Bradford Factor',
    'warehouse attendance software',
  ],
  openGraph: {
    title:
      'Staff Management Software for Manufacturing & Logistics — Leavely',
    description:
      'QR code clock-in for the factory floor, rotating shift leave management, agency staff tracking, and production line cover planning. Built for factories, warehouses, and distribution centres.',
    url: pageUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Staff Management Software for Manufacturing & Logistics — Leavely',
    description:
      'QR code clock-in for the factory floor, rotating shift leave management, agency staff tracking, and production line cover planning. Built for factories, warehouses, and distribution centres.',
  },
}

/* ─── JSON-LD Structured Data ────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} for Manufacturing & Logistics`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Staff management software for factories, warehouses, and distribution centres. QR code clock-in on the factory floor, rotating shift leave management, agency staff tracking, production line cover planning, and attendance reporting.',
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
        'QR code clock-in for factory floor and warehouse',
        'Rotating shift and continental pattern leave management',
        'Agency and temp staff tracking',
        'Production line minimum staffing alerts',
        'Bradford Factor monitoring',
        'Attendance and absence reports',
        'Role-based access control',
        'Rota and shift scheduling',
        'Multi-site workforce dashboard',
        'Cloud-based — works on any device',
      ],
      audience: {
        '@type': 'Audience',
        audienceType:
          'Factories, warehouses, distribution centres, food production facilities, engineering and assembly plants, logistics companies',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does QR code clock-in work on the factory floor?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You print a QR code and place it at the factory entrance, warehouse door, or production line area. Workers scan it with their phone camera when they arrive and leave. Each scan records the time, date, and location automatically. No special hardware, no app download, no training needed.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Leavely handle rotating shift patterns and continental shifts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely supports rotating shifts, continental patterns, fixed nights, 4-on-4-off, and any custom shift pattern. Leave requests are calculated against the correct shift pattern so workers only use allowance for the shifts they would have worked.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I track agency and temp staff alongside permanent employees?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can set up separate teams or departments within Leavely for agency workers, temps, and permanent staff. Each group can have different leave policies and entitlements. Managers can filter reports by team to see attendance across all workforce types in one dashboard.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Leavely alert me when production line staffing drops below minimum levels?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You set minimum staffing levels for each team, department, or production line. When a leave request would take staffing below that threshold, the system flags it to the approving manager before they approve. This prevents production line shutdowns caused by too many overlapping absences.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Leavely support HSE compliance and audit trails?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Every clock-in, absence, and approval creates a digital audit trail. You can export attendance records for HSE inspections, Working Time Directive compliance, and health and safety audits. Documents such as training certificates can be stored against employee profiles.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the Bradford Factor work for manufacturing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Bradford Factor is automatically calculated for every employee based on their absence spells and total days lost. Operations managers can view scores on the dashboard, set trigger thresholds, and identify patterns of short-term absence that disrupt production schedules.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can workers on the factory floor request leave from their phone?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely is fully mobile-first and works on any smartphone with a web browser. Workers can submit leave requests, check their remaining allowance, and view the team calendar from their phone — no app download required.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does Leavely cost for manufacturing companies?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leavely costs £8 per user per month with all features included — no tiers, no hidden fees. Every account starts with a free 14-day trial, no credit card required. For a factory with 80 workers, that is £640 per month.',
          },
        },
      ],
    },
  ],
}

/* ─── FAQ data (rendered on page + in JSON-LD above) ─────────────────── */
const faqs = [
  {
    q: 'How does QR code clock-in work on the factory floor?',
    a: 'You print a QR code and place it at the factory entrance, warehouse door, or production line area. Workers scan it with their phone camera when they arrive and leave. Each scan records the time, date, and location automatically. No special hardware, no app download, no training needed.',
  },
  {
    q: 'Can Leavely handle rotating shift patterns and continental shifts?',
    a: 'Yes. Leavely supports rotating shifts, continental patterns, fixed nights, 4-on-4-off, and any custom shift pattern. Leave requests are calculated against the correct shift pattern so workers only use allowance for the shifts they would have worked.',
  },
  {
    q: 'How do I track agency and temp staff alongside permanent employees?',
    a: 'You can set up separate teams or departments within Leavely for agency workers, temps, and permanent staff. Each group can have different leave policies and entitlements. Managers can filter reports by team to see attendance across all workforce types in one dashboard.',
  },
  {
    q: 'Can Leavely alert me when production line staffing drops below minimum levels?',
    a: 'Yes. You set minimum staffing levels for each team, department, or production line. When a leave request would take staffing below that threshold, the system flags it to the approving manager before they approve. This prevents production line shutdowns caused by too many overlapping absences.',
  },
  {
    q: 'Does Leavely support HSE compliance and audit trails?',
    a: 'Yes. Every clock-in, absence, and approval creates a digital audit trail. You can export attendance records for HSE inspections, Working Time Directive compliance, and health and safety audits. Documents such as training certificates can be stored against employee profiles.',
  },
  {
    q: 'How does the Bradford Factor work for manufacturing?',
    a: 'The Bradford Factor is automatically calculated for every employee based on their absence spells and total days lost. Operations managers can view scores on the dashboard, set trigger thresholds, and identify patterns of short-term absence that disrupt production schedules.',
  },
  {
    q: 'Can workers on the factory floor request leave from their phone?',
    a: 'Yes. Leavely is fully mobile-first and works on any smartphone with a web browser. Workers can submit leave requests, check their remaining allowance, and view the team calendar from their phone &mdash; no app download required.',
  },
  {
    q: 'How much does Leavely cost for manufacturing companies?',
    a: 'Leavely costs &pound;8 per user per month with all features included &mdash; no tiers, no hidden fees. Every account starts with a free 14-day trial, no credit card required. For a factory with 80 workers, that is &pound;640 per month.',
  },
]

/* ─── Solution features ──────────────────────────────────────────────── */
const solutions = [
  {
    icon: QrCode,
    title: 'QR Code Clock-In for Factory Floor & Warehouse',
    description:
      'Print a QR code and stick it at the factory gate, warehouse entrance, or production line area. Workers scan on arrival with their phone &mdash; time, date, and location are recorded automatically. No hardware, no app downloads, no training.',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    bullets: [
      'QR code per entrance, line, or zone',
      'Works on any smartphone camera',
      'Instant digital record &mdash; no paper timesheets',
      'GPS coordinates captured on every scan',
    ],
  },
  {
    icon: CalendarDays,
    title: 'Shift Pattern Leave Management',
    description:
      'Leavely understands rotating shifts, continental patterns, fixed nights, and 4-on-4-off. Leave requests are calculated against the correct shift pattern so workers only use allowance for shifts they would have actually worked.',
    color: 'from-orange-500 to-amber-600',
    bg: 'bg-orange-50',
    bullets: [
      'Supports rotating, continental, and night shifts',
      'Leave deducted only for rostered shift days',
      'Team calendar shows shift-aware availability',
      'Pro-rated allowances for mid-year starters',
    ],
  },
  {
    icon: Users,
    title: 'Agency & Temp Staff Tracking',
    description:
      'Manage agency workers, temps, and permanent staff in one system. Separate teams with different leave policies and entitlements. One dashboard gives you full visibility across your entire workforce &mdash; regardless of contract type.',
    color: 'from-amber-600 to-orange-700',
    bg: 'bg-amber-50',
    bullets: [
      'Separate teams for agency, temp, and permanent',
      'Different leave policies per group',
      'Filter reports by workforce type',
      'Add and remove temps quickly as demand changes',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Production Line Cover Planning',
    description:
      'Set minimum staffing levels for each production line, zone, or department. When a leave request would drop cover below your threshold, the system flags it before approval &mdash; preventing costly line shutdowns.',
    color: 'from-orange-600 to-amber-700',
    bg: 'bg-orange-50',
    bullets: [
      'Minimum staffing alerts per line or zone',
      'Clash detection before leave is approved',
      'Team calendar shows gaps at a glance',
      'Prevent overlapping absences on critical lines',
    ],
  },
  {
    icon: BarChart3,
    title: 'Attendance Reports & Bradford Factor',
    description:
      'Pre-built reports for attendance patterns, absence trends, Bradford Factor scores, and overtime. Export to CSV for payroll, HSE audits, or share with operations managers to spot problems early.',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    bullets: [
      '8 pre-built report templates',
      'Filter by shift, team, or department',
      'Export to CSV for payroll integration',
      'Bradford Factor auto-calculated per employee',
    ],
  },
]

/* ─── Built-for sector list ──────────────────────────────────────────── */
const sectors = [
  {
    icon: Factory,
    title: 'Factories',
    description:
      'Production facilities managing shift workers and line operators',
  },
  {
    icon: Warehouse,
    title: 'Warehouses',
    description:
      'Warehouse operations tracking pickers, packers, and goods-in teams',
  },
  {
    icon: Truck,
    title: 'Distribution Centres',
    description:
      'Distribution and fulfilment centres coordinating multi-shift teams',
  },
  {
    icon: Package,
    title: 'Food Production',
    description:
      'Food and beverage manufacturing with strict compliance requirements',
  },
  {
    icon: Wrench,
    title: 'Engineering & Assembly',
    description:
      'Engineering workshops and assembly plants with skilled trade teams',
  },
]

/* ─── Problem cards ──────────────────────────────────────────────────── */
const problems = [
  {
    icon: FileText,
    title: 'Production line disruption from unplanned absence',
    description:
      'A single no-show on a production line can halt an entire shift. Without advance warning and cover planning, unplanned absences cascade into missed targets, overtime costs, and delivery delays.',
  },
  {
    icon: AlertTriangle,
    title: 'No visibility across shifts',
    description:
      'With day shifts, night shifts, and rotating patterns, managers have no single view of who is working when. Gaps in coverage only surface when it&apos;s too late to find a replacement.',
  },
  {
    icon: Clock,
    title: 'Managing permanent and agency staff leave together',
    description:
      'Permanent employees, agency temps, and seasonal workers all have different contracts and entitlements. Without a central system, tracking leave across the mix is a spreadsheet nightmare.',
  },
]

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function ManufacturingPage() {
  const registerUrl =
    '/register?utm_source=website&utm_campaign=manufacturing'

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
          {/* Background decoration — amber/orange accent */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/60 via-white to-white" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-amber-100/40 to-orange-100/30 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 border border-amber-200 px-4 py-1.5 text-sm text-amber-700 font-medium mb-6">
                <Factory className="h-4 w-4" />
                Built for manufacturing &amp; logistics
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Staff Management Software
                <br />
                <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  for Manufacturing &amp; Logistics
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                QR code clock-in on the factory floor, shift pattern leave
                management, and production line cover planning &mdash; built for
                factories, warehouses, and distribution centres.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href={registerUrl}>
                  <Button
                    size="lg"
                    className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30"
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
                  <p className="text-3xl font-extrabold text-amber-600">
                    QR
                  </p>
                  <p className="text-sm text-gray-500">factory clock-in</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-amber-600">
                    &lt; 5 min
                  </p>
                  <p className="text-sm text-gray-500">setup time</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-amber-600">
                    &pound;8
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
                These are the problems operations managers in manufacturing
                face every day &mdash; and exactly what Leavely solves.
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
                          <CheckCircle2 className="h-5 w-5 text-amber-500 flex-shrink-0" />
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
                              <QrCode className="h-8 w-8 text-amber-600" />
                              <div>
                                <p className="font-semibold text-gray-900">
                                  Westfield Manufacturing &mdash; Line A
                                </p>
                                <p className="text-xs text-gray-500">
                                  QR Code &mdash; Factory Entrance
                                </p>
                              </div>
                            </div>
                            <div className="bg-amber-50 rounded-lg p-4 text-center">
                              <div className="w-24 h-24 mx-auto bg-white rounded-lg border-2 border-dashed border-amber-300 flex items-center justify-center">
                                <QrCode className="h-12 w-12 text-amber-400" />
                              </div>
                              <p className="text-xs text-amber-600 font-medium mt-2">
                                Scan to clock in
                              </p>
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                              <MapPin className="h-3.5 w-3.5 text-amber-500" />
                              Verified &mdash; Westfield Industrial Estate, Unit 7, B66 4PJ
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="h-3.5 w-3.5 text-amber-500" />
                              Clocked in at 05:55 &mdash; 25 Mar 2026
                            </div>
                          </div>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Shift Pattern Calendar
                            </p>
                            <div className="space-y-3">
                              {[
                                {
                                  pattern: 'Early Shift (06:00 – 14:00)',
                                  staff: '12 rostered',
                                  leave: '1 on leave',
                                  leaveColor:
                                    'bg-amber-50 text-amber-600',
                                },
                                {
                                  pattern: 'Late Shift (14:00 – 22:00)',
                                  staff: '10 rostered',
                                  leave: '0 on leave',
                                  leaveColor:
                                    'bg-green-50 text-green-600',
                                },
                                {
                                  pattern: 'Night Shift (22:00 – 06:00)',
                                  staff: '8 rostered',
                                  leave: '2 on leave',
                                  leaveColor:
                                    'bg-red-50 text-red-500',
                                },
                              ].map((entry) => (
                                <div
                                  key={entry.pattern}
                                  className="flex items-center justify-between text-xs border-b pb-2 last:border-0"
                                >
                                  <div>
                                    <span className="font-medium text-gray-700">
                                      {entry.pattern}
                                    </span>
                                    <span className="text-gray-400 ml-2">
                                      {entry.staff}
                                    </span>
                                  </div>
                                  <span
                                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${entry.leaveColor}`}
                                  >
                                    {entry.leave}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4">
                            <p className="text-sm font-medium text-gray-900">
                              Today&apos;s shift coverage
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              30 workers rostered across 3 shifts. Night shift
                              has 2 on leave &mdash; review cover before handover.
                            </p>
                          </div>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Workforce Breakdown
                            </p>
                            <div className="space-y-3">
                              {[
                                {
                                  type: 'Permanent Staff',
                                  count: '45 employees',
                                  status: 'Full entitlement',
                                  statusColor:
                                    'bg-amber-50 text-amber-600',
                                },
                                {
                                  type: 'Agency Workers',
                                  count: '18 active',
                                  status: 'Agency policy',
                                  statusColor:
                                    'bg-orange-50 text-orange-600',
                                },
                                {
                                  type: 'Seasonal Temps',
                                  count: '6 active',
                                  status: 'Pro-rated',
                                  statusColor:
                                    'bg-gray-50 text-gray-500',
                                },
                              ].map((entry) => (
                                <div
                                  key={entry.type}
                                  className="flex items-center justify-between text-xs border-b pb-2 last:border-0"
                                >
                                  <div>
                                    <span className="font-medium text-gray-700">
                                      {entry.type}
                                    </span>
                                    <span className="text-gray-400 ml-2">
                                      {entry.count}
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
                              Total workforce
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              69 workers across 3 contract types. All tracked
                              in one dashboard with separate leave policies.
                            </p>
                          </div>
                        </>
                      )}
                      {index === 3 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Production Line Coverage
                            </p>
                            <div className="space-y-2">
                              {[
                                {
                                  line: 'Line A &mdash; Assembly',
                                  staffed: '8 / 8',
                                  status: 'Full Cover',
                                  statusColor:
                                    'bg-green-50 text-green-600',
                                },
                                {
                                  line: 'Line B &mdash; Packing',
                                  staffed: '5 / 6',
                                  status: '1 Below Min',
                                  statusColor:
                                    'bg-amber-50 text-amber-600',
                                },
                                {
                                  line: 'Line C &mdash; Quality',
                                  staffed: '2 / 4',
                                  status: '2 Below Min',
                                  statusColor:
                                    'bg-red-50 text-red-500',
                                },
                              ].map((entry) => (
                                <div
                                  key={entry.line}
                                  className="flex items-center justify-between text-xs py-2 border-b last:border-0"
                                >
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`h-2 w-2 rounded-full ${
                                        entry.status === 'Full Cover'
                                          ? 'bg-green-500'
                                          : entry.status === '1 Below Min'
                                            ? 'bg-amber-500'
                                            : 'bg-red-500'
                                      }`}
                                    />
                                    <span className="font-medium text-gray-700">
                                      {entry.line}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-400">
                                      {entry.staffed}
                                    </span>
                                    <span
                                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${entry.statusColor}`}
                                    >
                                      {entry.status}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4 flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Staffing alert &mdash; Line C
                              </p>
                              <p className="text-xs text-gray-500">
                                Quality line is 2 below minimum. A leave request
                                for Line B was blocked &mdash; approving would drop
                                packing below threshold.
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                      {index === 4 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Absence Report &mdash; March 2026
                            </p>
                            <div className="space-y-3">
                              {[
                                {
                                  label: 'Total sick days',
                                  value: '24',
                                  trend: '+6 vs Feb',
                                  trendColor: 'text-red-500',
                                },
                                {
                                  label: 'Unplanned absences',
                                  value: '9',
                                  trend: '+2 vs Feb',
                                  trendColor: 'text-red-500',
                                },
                                {
                                  label: 'Avg Bradford Factor',
                                  value: '68',
                                  trend: 'Medium-High',
                                  trendColor: 'text-amber-500',
                                },
                                {
                                  label: 'Attendance rate',
                                  value: '94.2%',
                                  trend: '-0.8%',
                                  trendColor: 'text-red-500',
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
                              Export to CSV for payroll, HSE audits, or
                              operations management reviews
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
        <section className="bg-gradient-to-br from-amber-50/60 to-orange-50/40">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Built for every type of manufacturing &amp; logistics
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Whether you run a single factory or manage warehouses across
                the country, Leavely fits your workflow.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {sectors.map((sector) => (
                <div
                  key={sector.title}
                  className="rounded-2xl border bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white mb-4 shadow-sm">
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

        {/* ── Stats Section ── */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                The real cost of unplanned absence in manufacturing
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Every unplanned absence on a production line has a ripple
                effect. Here&apos;s what the numbers look like.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  stat: '&pound;600+',
                  label: 'Average cost per unplanned absence on a production line',
                  description:
                    'Including lost output, overtime for cover, and knock-on delays to downstream processes. Leavely&apos;s cover planning and Bradford Factor monitoring help you reduce unplanned absences before they hit your bottom line.',
                },
                {
                  icon: Clock,
                  stat: '4.7%',
                  label: 'Average absence rate in UK manufacturing',
                  description:
                    'CIPD data shows manufacturing has one of the highest absence rates of any sector. Leavely gives operations managers the visibility and tools to bring that number down with early intervention.',
                },
                {
                  icon: FileText,
                  stat: '3 hours',
                  label: 'Saved per week on admin by switching from spreadsheets',
                  description:
                    'Manufacturing managers spend hours every week chasing leave requests, updating rotas, and compiling attendance reports. Leavely automates all of it so you can focus on running production.',
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border bg-white p-8 shadow-sm"
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-amber-50 text-amber-600 mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <p
                    className="text-3xl font-extrabold text-amber-600 mb-2"
                    dangerouslySetInnerHTML={{ __html: item.stat }}
                  />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.label}
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
            <div className="rounded-2xl border-2 border-amber-500 bg-white p-8 shadow-xl shadow-amber-500/10 text-center">
              <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-2">
                Per seat
              </p>
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="text-5xl font-extrabold text-gray-900">
                  &pound;8
                </span>
                <span className="text-lg text-gray-500">/user/month</span>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                Billed monthly based on active worker count
              </p>
              <ul className="text-left space-y-3 mb-8">
                {[
                  'Everything included &mdash; no tiers',
                  'QR code clock-in for factory floor',
                  'Rotating shift leave management',
                  'Agency &amp; temp staff tracking',
                  'Production line cover alerts',
                  'Bradford Factor monitoring',
                  'Rota &amp; shift scheduling',
                  'Attendance &amp; absence reports',
                  'Employee profiles &amp; documents',
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-sm text-gray-600"
                  >
                    <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: f }} />
                  </li>
                ))}
              </ul>
              <Link href={registerUrl}>
                <Button
                  size="lg"
                  className="w-full text-base font-semibold h-12 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-lg shadow-amber-500/25"
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
                Example: a factory with 80 workers ={' '}
                <strong className="text-gray-900">&pound;640/month</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-amber-500 to-orange-600" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Ready to take control of factory attendance?
            </h2>
            <p className="mt-4 text-lg text-amber-100 max-w-xl mx-auto">
              Join manufacturing companies that have switched from spreadsheets
              to Leavely. Set up in under 5 minutes, free for 14 days.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={registerUrl}>
                <Button
                  size="lg"
                  className="text-base font-semibold px-8 h-12 bg-white text-amber-700 hover:bg-gray-50 shadow-lg shadow-black/10"
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
                Common questions from manufacturing and logistics managers
                about Leavely.
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
