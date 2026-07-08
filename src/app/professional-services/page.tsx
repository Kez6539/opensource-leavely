import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Shield,
  Clock,
  CalendarDays,
  BarChart3,
  Users,
  FileText,
  AlertTriangle,
  Briefcase,
  Building2,
  Scale,
  Calculator,
  Landmark,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

/* ─── Page-level SEO metadata ────────────────────────────────────────── */
const pageUrl = `${SITE_URL}/professional-services`

export const metadata: Metadata = {
  title:
    'Leave Management Software for Professional Services | Law Firms & Accountancy Practices — Leavely',
  description:
    'Leavely helps law firms, accountancy practices, consultancies, and professional services firms manage leave, protect billable hours, and maintain client cover. SRA and ICAEW compliant leave tracking, multi-office management, and partner-level reporting. Free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'law firm leave management',
    'accountancy practice absence tracking',
    'professional services HR software',
    'SRA compliant leave tracking',
    'solicitor firm staff management',
    'consultancy leave management',
    'ICAEW compliant absence management',
    'law firm holiday tracker',
    'accountancy staff scheduling',
    'professional services absence management',
    'partner leave management software',
    'FCA compliant leave tracking',
    'multi-office leave management',
    'billable hours protection software',
    'legal firm staff management',
  ],
  openGraph: {
    title: 'Leave Management Software for Professional Services — Leavely',
    description:
      'Leave tracking, client cover planning, billable hours protection, and compliance reporting. Built for law firms, accountancy practices, consultancies, and financial advisory firms.',
    url: pageUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leave Management Software for Professional Services — Leavely',
    description:
      'Leave tracking, client cover planning, billable hours protection, and compliance reporting. Built for law firms, accountancy practices, consultancies, and financial advisory firms.',
  },
}

/* ─── JSON-LD Structured Data ────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} for Professional Services`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Leave management software for law firms, accountancy practices, management consultancies, recruitment agencies, and financial advisory firms. Client cover planning, billable hours protection, SRA and ICAEW compliance, multi-office management, and partner-level reporting.',
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
        'Leave management with client cover planning',
        'Billable hours protection and team availability',
        'SRA, ICAEW, and FCA compliant leave tracking',
        'Multi-office and branch management',
        'Partner and management reporting',
        'One-click leave approvals',
        'Team calendar with department views',
        'Audit trail for regulatory compliance',
        'Cloud-based — works on any device',
        'Employee self-service portal',
      ],
      audience: {
        '@type': 'Audience',
        audienceType:
          'Law firms, accountancy practices, management consultancies, recruitment agencies, financial advisory firms',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does Leavely help protect billable hours when staff are on leave?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leavely gives partners and managers full visibility of team availability before approving leave. The team calendar shows who is off, who is available, and how leave impacts capacity across practice areas. This lets you plan client cover in advance and avoid losing billable hours to poorly timed absences.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Leavely handle different leave entitlements for partners versus employees?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely supports multiple leave policies so you can set different allowances for equity partners, salaried partners, associates, trainees, and support staff. Each group gets their own entitlement rules, approval workflows, and carry-over settings — all managed from one system.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Leavely compliant with SRA and ICAEW requirements for leave record keeping?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely maintains a complete digital audit trail of all leave requests, approvals, rejections, and cancellations. Records are stored securely and can be exported at any time for SRA, ICAEW, or FCA compliance reviews. Every action is timestamped and attributed to a specific user.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Leavely help with client cover during staff absences?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The team calendar shows all approved and pending leave across departments, practice areas, or office locations. Managers can see at a glance who is available to cover client work before approving leave requests. This prevents situations where multiple fee earners on the same matter are off simultaneously.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can we manage leave across multiple offices with Leavely?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely supports multi-office setups from a single account. You can organise staff by office location, department, or practice area. Each office can have its own public holiday calendar, and managers can view leave across all locations from one dashboard.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Leavely support TOIL (time off in lieu) for professional services staff?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Professional services staff often work beyond their contracted hours during busy periods. Leavely lets employees log TOIL hours and request time off against their accrued balance. Managers approve TOIL just like any other leave type, with full visibility of balances.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does Leavely cost for a professional services firm?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leavely costs £8 per user per month with all features included — no tiers, no hidden fees. Every account starts with a free 14-day trial, no credit card required. For a 30-person law firm, that is £240 per month — a fraction of one lost billable hour.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can partners and management see reporting dashboards?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely provides pre-built reports covering absence trends, leave balances, Bradford Factor scores, and department-level summaries. Partners and management can filter by date range, department, office, or individual. Reports export to CSV for inclusion in management packs or board papers.',
          },
        },
      ],
    },
  ],
}

/* ─── FAQ data (rendered on page + in JSON-LD above) ─────────────────── */
const faqs = [
  {
    q: 'How does Leavely help protect billable hours when staff are on leave?',
    a: "Leavely gives partners and managers full visibility of team availability before approving leave. The team calendar shows who is off, who is available, and how leave impacts capacity across practice areas. This lets you plan client cover in advance and avoid losing billable hours to poorly timed absences.",
  },
  {
    q: 'Can Leavely handle different leave entitlements for partners versus employees?',
    a: 'Yes. Leavely supports multiple leave policies so you can set different allowances for equity partners, salaried partners, associates, trainees, and support staff. Each group gets their own entitlement rules, approval workflows, and carry-over settings \u2014 all managed from one system.',
  },
  {
    q: 'Is Leavely compliant with SRA and ICAEW requirements for leave record keeping?',
    a: 'Yes. Leavely maintains a complete digital audit trail of all leave requests, approvals, rejections, and cancellations. Records are stored securely and can be exported at any time for SRA, ICAEW, or FCA compliance reviews. Every action is timestamped and attributed to a specific user.',
  },
  {
    q: 'How does Leavely help with client cover during staff absences?',
    a: 'The team calendar shows all approved and pending leave across departments, practice areas, or office locations. Managers can see at a glance who is available to cover client work before approving leave requests. This prevents situations where multiple fee earners on the same matter are off simultaneously.',
  },
  {
    q: 'Can we manage leave across multiple offices with Leavely?',
    a: 'Yes. Leavely supports multi-office setups from a single account. You can organise staff by office location, department, or practice area. Each office can have its own public holiday calendar, and managers can view leave across all locations from one dashboard.',
  },
  {
    q: 'Does Leavely support TOIL (time off in lieu) for professional services staff?',
    a: 'Yes. Professional services staff often work beyond their contracted hours during busy periods. Leavely lets employees log TOIL hours and request time off against their accrued balance. Managers approve TOIL just like any other leave type, with full visibility of balances.',
  },
  {
    q: 'How much does Leavely cost for a professional services firm?',
    a: 'Leavely costs \u00a38 per user per month with all features included \u2014 no tiers, no hidden fees. Every account starts with a free 14-day trial, no credit card required. For a 30-person law firm, that is \u00a3240 per month \u2014 a fraction of one lost billable hour.',
  },
  {
    q: 'Can partners and management see reporting dashboards?',
    a: 'Yes. Leavely provides pre-built reports covering absence trends, leave balances, Bradford Factor scores, and department-level summaries. Partners and management can filter by date range, department, office, or individual. Reports export to CSV for inclusion in management packs or board papers.',
  },
]

/* ─── Solution features ──────────────────────────────────────────────── */
const solutions = [
  {
    icon: CalendarDays,
    title: 'Leave Management with Client Cover Planning',
    description:
      'See who is off and who is available across every practice area before approving leave. The team calendar gives partners and managers the visibility they need to ensure client work is always covered and deadlines are never missed.',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    bullets: [
      'Team calendar with department and practice area views',
      'Prevent clashes on the same client matter',
      'One-click approvals from email or dashboard',
      'Self-service requests reduce admin burden',
    ],
  },
  {
    icon: Clock,
    title: 'Billable Hours Protection',
    description:
      'Every unplanned absence costs your firm in lost billable hours. Leavely gives you advance visibility of team capacity so you can redistribute client work, adjust timelines, and protect revenue before gaps appear.',
    color: 'from-purple-500 to-violet-600',
    bg: 'bg-purple-50',
    bullets: [
      'Real-time team availability dashboard',
      'Spot capacity gaps weeks in advance',
      'Plan resource allocation around absences',
      'Reduce lost billable hours from poor cover',
    ],
  },
  {
    icon: Shield,
    title: 'SRA, ICAEW & FCA Compliance',
    description:
      'Professional services firms face regulatory obligations around record keeping and staff welfare. Leavely maintains a complete audit trail of every leave request, approval, and cancellation &mdash; exportable at any time for compliance reviews.',
    color: 'from-violet-600 to-purple-700',
    bg: 'bg-violet-50',
    bullets: [
      'Complete digital audit trail',
      'Timestamped records for every action',
      'Export to CSV for regulatory reviews',
      'Automatic statutory minimum enforcement',
    ],
  },
  {
    icon: Building2,
    title: 'Multi-Office & Branch Management',
    description:
      'Whether your firm operates from two offices or twenty, Leavely lets you manage them all from one place. Organise staff by office, department, or practice area. Set location-specific public holidays and view leave across the entire firm.',
    color: 'from-purple-600 to-violet-700',
    bg: 'bg-purple-50',
    bullets: [
      'Single dashboard for all office locations',
      'Per-office public holiday calendars',
      'Department and practice area grouping',
      'Cross-office visibility for resource planning',
    ],
  },
  {
    icon: BarChart3,
    title: 'Reports for Partners & Management',
    description:
      'Pre-built reports that give partners and senior management the data they need. Absence trends, Bradford Factor scores, leave balances by department, and team utilisation &mdash; all filterable and exportable for management packs.',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    bullets: [
      '8 pre-built report templates',
      'Filter by date, department, office, or individual',
      'Export to CSV for board papers',
      'Bradford Factor scoring for absence patterns',
    ],
  },
]

/* ─── Built-for sector list ──────────────────────────────────────────── */
const sectors = [
  {
    icon: Scale,
    title: 'Law Firms',
    description: 'Solicitors, barristers&apos; chambers, and legal practices of all sizes',
  },
  {
    icon: Calculator,
    title: 'Accountancy Practices',
    description: 'Chartered accountants, audit firms, and tax advisory practices',
  },
  {
    icon: Briefcase,
    title: 'Management Consultancies',
    description: 'Strategy, operations, and IT consultancies with project-based teams',
  },
  {
    icon: Users,
    title: 'Recruitment Agencies',
    description: 'Staffing agencies and executive search firms with fast-paced teams',
  },
  {
    icon: Landmark,
    title: 'Financial Advisory',
    description: 'IFAs, wealth managers, and FCA-regulated financial planning firms',
  },
]

/* ─── Problem cards ──────────────────────────────────────────────────── */
const problems = [
  {
    icon: FileText,
    title: 'Client work suffers from unplanned absence',
    description:
      'When a fee earner is unexpectedly off, their client work stalls. Deadlines slip, other team members scramble to cover, and clients lose confidence. Without advance visibility of who is available, every absence becomes a crisis.',
  },
  {
    icon: AlertTriangle,
    title: 'No visibility across partners and teams',
    description:
      'Partners cannot see who is off across departments or offices. Leave is tracked in spreadsheets, inboxes, or not at all. When two people on the same matter book holiday at the same time, nobody spots the clash until it&apos;s too late.',
  },
  {
    icon: Clock,
    title: 'Compliance and audit trail gaps',
    description:
      'Regulators like the SRA, ICAEW, and FCA expect firms to maintain proper staff records. Paper-based or spreadsheet leave tracking creates gaps in your audit trail and risks non-compliance during regulatory reviews.',
  },
]

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function ProfessionalServicesPage() {
  const registerUrl =
    '/register?utm_source=website&utm_campaign=professional-services'

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
          {/* Background decoration — violet/purple accent */}
          <div className="absolute inset-0 bg-gradient-to-b from-violet-50/60 via-white to-white" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-violet-100/40 to-purple-100/30 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 border border-violet-200 px-4 py-1.5 text-sm text-violet-700 font-medium mb-6">
                <Briefcase className="h-4 w-4" />
                Built for professional services
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Leave Management Software
                <br />
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  for Professional Services
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Leave tracking, client cover planning, and compliance
                reporting. Built for law firms, accountancy practices,
                consultancies, and financial advisory firms.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href={registerUrl}>
                  <Button
                    size="lg"
                    className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30"
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
                  <p className="text-3xl font-extrabold text-violet-600">
                    &pound;200+
                  </p>
                  <p className="text-sm text-gray-500">billable hour saved</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-violet-600">
                    &lt; 5 min
                  </p>
                  <p className="text-sm text-gray-500">setup time</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-violet-600">
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
                These are the problems professional services firms face every
                day &mdash; and exactly what Leavely solves.
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
                          <CheckCircle2 className="h-5 w-5 text-violet-500 flex-shrink-0" />
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
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Team Calendar &mdash; Corporate Law
                            </p>
                            <div className="space-y-2">
                              {[
                                {
                                  name: 'Sarah M.',
                                  role: 'Partner',
                                  days: ['In', 'In', 'In', 'Leave', 'Leave', '—', '—'],
                                },
                                {
                                  name: 'James T.',
                                  role: 'Associate',
                                  days: ['In', 'In', 'In', 'In', 'In', '—', '—'],
                                },
                                {
                                  name: 'Priya K.',
                                  role: 'Trainee',
                                  days: ['In', 'In', 'Leave', 'In', 'In', '—', '—'],
                                },
                              ].map((row) => (
                                <div
                                  key={row.name}
                                  className="flex items-center gap-2 text-xs"
                                >
                                  <span className="w-20 font-medium text-gray-700 shrink-0">
                                    {row.name}
                                  </span>
                                  {row.days.map((day, i) => (
                                    <span
                                      key={i}
                                      className={`flex-1 text-center py-1 rounded text-[10px] font-medium ${
                                        day === 'Leave'
                                          ? 'bg-violet-50 text-violet-600'
                                          : day === 'In'
                                            ? 'bg-green-50 text-green-700'
                                            : 'bg-gray-50 text-gray-400'
                                      }`}
                                    >
                                      {day}
                                    </span>
                                  ))}
                                </div>
                              ))}
                              <div className="flex items-center gap-2 text-[10px] text-gray-400 pt-1">
                                <span className="w-20 shrink-0" />
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                                  (day) => (
                                    <span key={day} className="flex-1 text-center">
                                      {day}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <CheckCircle2 className="h-3.5 w-3.5 text-violet-500" />
                              Client cover confirmed &mdash; all matters staffed this week
                            </div>
                          </div>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Team Capacity &mdash; This Week
                            </p>
                            <div className="space-y-3">
                              {[
                                {
                                  dept: 'Corporate Law',
                                  available: 8,
                                  total: 10,
                                  utilisation: '80%',
                                  color: 'bg-green-50 text-green-600',
                                },
                                {
                                  dept: 'Litigation',
                                  available: 5,
                                  total: 6,
                                  utilisation: '83%',
                                  color: 'bg-green-50 text-green-600',
                                },
                                {
                                  dept: 'Tax Advisory',
                                  available: 3,
                                  total: 5,
                                  utilisation: '60%',
                                  color: 'bg-amber-50 text-amber-600',
                                },
                              ].map((dept) => (
                                <div
                                  key={dept.dept}
                                  className="flex items-center justify-between text-xs border-b pb-2 last:border-0"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-violet-100 flex items-center justify-center text-[10px] font-semibold text-violet-700">
                                      {dept.available}
                                    </div>
                                    <div>
                                      <span className="font-medium text-gray-700">
                                        {dept.dept}
                                      </span>
                                      <span className="text-gray-400 ml-1">
                                        {dept.available}/{dept.total} available
                                      </span>
                                    </div>
                                  </div>
                                  <span
                                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${dept.color}`}
                                  >
                                    {dept.utilisation} capacity
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                              Tax Advisory at 60% capacity &mdash; 2 fee earners on leave
                            </div>
                          </div>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <div className="flex items-center gap-3 mb-4">
                              <Shield className="h-8 w-8 text-violet-600" />
                              <div>
                                <p className="font-semibold text-gray-900">
                                  Audit Trail
                                </p>
                                <p className="text-xs text-gray-500">
                                  Complete record of all leave activity
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {[
                                {
                                  action: 'Leave approved',
                                  by: 'Sarah M. (Partner)',
                                  time: '14:32, 24 Mar 2026',
                                },
                                {
                                  action: 'Leave requested',
                                  by: 'James T. (Associate)',
                                  time: '09:15, 24 Mar 2026',
                                },
                                {
                                  action: 'Leave cancelled',
                                  by: 'Priya K. (Trainee)',
                                  time: '17:45, 23 Mar 2026',
                                },
                              ].map((entry) => (
                                <div
                                  key={entry.time}
                                  className="flex items-center justify-between text-xs py-2 border-b last:border-0"
                                >
                                  <div>
                                    <span className="font-medium text-gray-700">
                                      {entry.action}
                                    </span>
                                    <span className="text-gray-400 ml-1">
                                      by {entry.by}
                                    </span>
                                  </div>
                                  <span className="text-gray-400 text-[10px]">
                                    {entry.time}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4">
                            <p className="text-sm font-medium text-gray-900">
                              Regulatory Ready
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Every action is logged with timestamp, user, and
                              details. Export your full audit trail to CSV at
                              any time for SRA, ICAEW, or FCA reviews.
                            </p>
                          </div>
                        </>
                      )}
                      {index === 3 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Office Overview
                            </p>
                            <div className="space-y-2">
                              {[
                                {
                                  office: 'London (Head Office)',
                                  staff: 45,
                                  onLeave: 3,
                                  status: 'Fully Covered',
                                },
                                {
                                  office: 'Manchester',
                                  staff: 22,
                                  onLeave: 1,
                                  status: 'Fully Covered',
                                },
                                {
                                  office: 'Birmingham',
                                  staff: 15,
                                  onLeave: 4,
                                  status: '2 Gaps',
                                },
                              ].map((loc) => (
                                <div
                                  key={loc.office}
                                  className="flex items-center justify-between text-xs py-2 border-b last:border-0"
                                >
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`h-2 w-2 rounded-full ${loc.status === 'Fully Covered' ? 'bg-violet-500' : 'bg-amber-500'}`}
                                    />
                                    <span className="font-medium text-gray-700">
                                      {loc.office}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-gray-400">
                                      {loc.onLeave} of {loc.staff} on leave
                                    </span>
                                    <span
                                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                                        loc.status === 'Fully Covered'
                                          ? 'bg-violet-50 text-violet-600'
                                          : 'bg-amber-50 text-amber-600'
                                      }`}
                                    >
                                      {loc.status}
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
                                Birmingham &mdash; 2 gaps
                              </p>
                              <p className="text-xs text-gray-500">
                                4 staff on leave this week. Consider
                                redistributing 2 client matters to Manchester.
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                      {index === 4 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Management Report &mdash; Q1 2026
                            </p>
                            <div className="space-y-3">
                              {[
                                {
                                  label: 'Total leave days taken',
                                  value: '342',
                                  trend: '-8% vs Q4',
                                  trendColor: 'text-violet-500',
                                },
                                {
                                  label: 'Sick days taken',
                                  value: '28',
                                  trend: '-12% vs Q4',
                                  trendColor: 'text-violet-500',
                                },
                                {
                                  label: 'Average leave balance',
                                  value: '14.2 days',
                                  trend: 'On track',
                                  trendColor: 'text-violet-500',
                                },
                                {
                                  label: 'Bradford Factor alerts',
                                  value: '2',
                                  trend: '-1 vs Q4',
                                  trendColor: 'text-violet-500',
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
                              Export to CSV for partner meetings, board papers,
                              or regulatory submissions
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
        <section className="bg-gradient-to-br from-violet-50/60 to-purple-50/40">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Built for every type of professional services firm
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Whether you&apos;re a two-partner practice or a multi-office
                firm, Leavely fits your workflow.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {sectors.map((sector) => (
                <div
                  key={sector.title}
                  className="rounded-2xl border bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white mb-4 shadow-sm">
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
        <section>
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                The cost of poor leave management
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                In professional services, every absence has a direct impact on
                revenue and client relationships.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Calculator,
                  title: '&pound;200+ billable hour lost',
                  description:
                    'Every unplanned absence day costs your firm at least one senior fee earner&apos;s billable hour. For a partner, that figure can exceed &pound;500. Leavely gives you the advance visibility to plan cover and protect revenue.',
                },
                {
                  icon: Users,
                  title: '3.4 days per employee per year',
                  description:
                    'UK professional services firms average 3.4 sickness absence days per employee per year. Without proper tracking, patterns go unnoticed and small problems become expensive ones.',
                },
                {
                  icon: Shield,
                  title: 'Audit trail in seconds',
                  description:
                    'When the SRA, ICAEW, or FCA ask for your leave records, Leavely lets you export a complete, timestamped audit trail in seconds &mdash; not hours of digging through spreadsheets and email chains.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border bg-white p-8 shadow-sm"
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-violet-50 text-violet-600 mb-4">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3
                    className="text-lg font-bold text-gray-900 mb-2"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  />
                  <p
                    className="text-gray-500 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing Section ── */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
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
              <div className="rounded-2xl border-2 border-violet-500 bg-white p-8 shadow-xl shadow-violet-500/10 text-center">
                <p className="text-sm font-semibold text-violet-600 uppercase tracking-wider mb-2">
                  Per seat
                </p>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-5xl font-extrabold text-gray-900">
                    &pound;8
                  </span>
                  <span className="text-lg text-gray-500">/user/month</span>
                </div>
                <p className="text-sm text-gray-400 mb-6">
                  Billed monthly based on active employee count
                </p>
                <ul className="text-left space-y-3 mb-8">
                  {[
                    'Everything included \u2014 no tiers',
                    'Leave management & approvals',
                    'Client cover planning',
                    'Team calendar with department views',
                    'Multi-office management',
                    'TOIL tracking & approvals',
                    'Compliance audit trail',
                    'Partner & management reports',
                    'Employee self-service portal',
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-gray-600"
                    >
                      <CheckCircle2 className="h-4 w-4 text-violet-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={registerUrl}>
                  <Button
                    size="lg"
                    className="w-full text-base font-semibold h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/25"
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
                  Example: a 30-person law firm ={' '}
                  <strong className="text-gray-900">&pound;240/month</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-violet-500 to-purple-600" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Ready to protect your firm&apos;s billable hours?
            </h2>
            <p className="mt-4 text-lg text-violet-100 max-w-xl mx-auto">
              Join professional services firms that have switched from
              spreadsheets to proper leave management. Set up in under
              5 minutes, free for 14 days.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={registerUrl}>
                <Button
                  size="lg"
                  className="text-base font-semibold px-8 h-12 bg-white text-violet-700 hover:bg-gray-50 shadow-lg shadow-black/10"
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
                Common questions from professional services firms about Leavely.
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
