import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Shield,
  GraduationCap,
  CalendarDays,
  BarChart3,
  Users,
  FileText,
  AlertTriangle,
  Clock,
  Building2,
  BookOpen,
  School,
  Layers,
  ClipboardCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

/* ─── Page-level SEO metadata ────────────────────────────────────────── */
const pageUrl = `${SITE_URL}/education`

export const metadata: Metadata = {
  title:
    'Staff Management Software for Schools & Education | Leave & Absence Tracking — Leavely',
  description:
    'Leavely helps schools, academies, multi-academy trusts, colleges, and universities manage teacher absence, supply cover, and term-time leave. Bradford Factor monitoring, Ofsted-ready attendance reports, and multi-site dashboards. Free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'school staff management software',
    'teacher absence management system',
    'supply cover tracking software',
    'term-time leave management',
    'school staff scheduling software',
    'multi-academy trust staff management',
    'MAT absence management software',
    'school absence tracking',
    'education leave management',
    'teacher leave tracker UK',
    'school Bradford Factor tracking',
    'Ofsted attendance reports',
    'academy trust HR software',
    'school holiday tracker',
    'college staff absence management',
  ],
  openGraph: {
    title: 'Staff Management Software for Schools & Education — Leavely',
    description:
      'Teacher absence tracking, supply cover workflows, term-time leave policies, and multi-school dashboards. Built for schools, academies, MATs, colleges, and universities.',
    url: pageUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staff Management Software for Schools & Education — Leavely',
    description:
      'Teacher absence tracking, supply cover workflows, term-time leave policies, and multi-school dashboards. Built for schools, academies, MATs, colleges, and universities.',
  },
}

/* ─── JSON-LD Structured Data ────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} for Education`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Staff management software for schools, academies, multi-academy trusts, colleges, and universities. Teacher absence tracking, supply cover workflows, term-time leave policies, Bradford Factor monitoring, and Ofsted-ready reports.',
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
        'Teacher absence and supply cover tracking',
        'Term-time leave policy management',
        'Multi-school and multi-academy trust dashboard',
        'Bradford Factor monitoring for education staff',
        'Ofsted-ready attendance and absence reports',
        'Leave management with one-click approvals',
        'INSET day and training day management',
        'Role-based access control across schools',
        'Sick leave and fit note tracking',
        'Cloud-based — works on any device',
      ],
      audience: {
        '@type': 'Audience',
        audienceType:
          'Schools, academies, multi-academy trusts (MATs), colleges, universities, education providers',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can Leavely handle term-time only staff?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely supports different leave policies for term-time only staff and all-year-round staff within the same school. You can set pro-rated leave allowances based on working weeks, and the system automatically calculates entitlements for part-time and term-time contracts.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Leavely help with INSET day management?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can set up INSET days and teacher training days as company-wide leave blocks. These are automatically excluded from leave calculations and appear on the staff calendar so everyone knows when they are scheduled. This prevents double-booking and ensures accurate leave balance tracking.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Leavely track supply teacher cover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. When a teacher is absent, Leavely records the absence and helps you track whether supply cover has been arranged. You can log cover arrangements against each absence, giving you a clear audit trail of cover decisions and costs over time.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Leavely work for multi-academy trusts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Multi-academy trusts can set up each school as a separate location within Leavely. Trust-level administrators get a dashboard across all schools, while individual headteachers and office managers only see their own school. This gives central oversight without compromising school-level autonomy.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Leavely support Ofsted readiness?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leavely creates a digital record of every absence, leave request, and approval with timestamps and user attribution. You can export attendance and absence reports at any time, showing patterns, trends, and how cover was managed. This evidence supports Ofsted inspections around staff attendance and safeguarding.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Leavely track the Bradford Factor for school staff?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely automatically calculates the Bradford Factor for every staff member based on their sick leave records. This helps school leaders identify patterns of short-term absence and manage staff wellbeing proactively, supporting fair and consistent absence management policies.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does Leavely cost for schools?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leavely costs £8 per user per month with all features included — no tiers, no hidden fees. Every account starts with a free 14-day trial, no credit card required. For a school with 50 staff, that is £400 per month.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can teaching assistants and support staff use Leavely too?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely is designed for all school staff — teachers, teaching assistants, support staff, caretakers, and administrative teams. Each staff group can have different leave policies, allowances, and approval workflows to reflect their different terms and conditions.',
          },
        },
      ],
    },
  ],
}

/* ─── FAQ data (rendered on page + in JSON-LD above) ─────────────────── */
const faqs = [
  {
    q: 'Can Leavely handle term-time only staff?',
    a: 'Yes. Leavely supports different leave policies for term-time only staff and all-year-round staff within the same school. You can set pro-rated leave allowances based on working weeks, and the system automatically calculates entitlements for part-time and term-time contracts.',
  },
  {
    q: 'How does Leavely help with INSET day management?',
    a: 'You can set up INSET days and teacher training days as company-wide leave blocks. These are automatically excluded from leave calculations and appear on the staff calendar so everyone knows when they are scheduled. This prevents double-booking and ensures accurate leave balance tracking.',
  },
  {
    q: 'Can Leavely track supply teacher cover?',
    a: 'Yes. When a teacher is absent, Leavely records the absence and helps you track whether supply cover has been arranged. You can log cover arrangements against each absence, giving you a clear audit trail of cover decisions and costs over time.',
  },
  {
    q: 'Does Leavely work for multi-academy trusts?',
    a: 'Yes. Multi-academy trusts can set up each school as a separate location within Leavely. Trust-level administrators get a dashboard across all schools, while individual headteachers and office managers only see their own school. This gives central oversight without compromising school-level autonomy.',
  },
  {
    q: 'How does Leavely support Ofsted readiness?',
    a: 'Leavely creates a digital record of every absence, leave request, and approval with timestamps and user attribution. You can export attendance and absence reports at any time, showing patterns, trends, and how cover was managed. This evidence supports Ofsted inspections around staff attendance and safeguarding.',
  },
  {
    q: 'Does Leavely track the Bradford Factor for school staff?',
    a: 'Yes. Leavely automatically calculates the Bradford Factor for every staff member based on their sick leave records. This helps school leaders identify patterns of short-term absence and manage staff wellbeing proactively, supporting fair and consistent absence management policies.',
  },
  {
    q: 'How much does Leavely cost for schools?',
    a: 'Leavely costs £8 per user per month with all features included — no tiers, no hidden fees. Every account starts with a free 14-day trial, no credit card required. For a school with 50 staff, that is £400 per month.',
  },
  {
    q: 'Can teaching assistants and support staff use Leavely too?',
    a: 'Yes. Leavely is designed for all school staff — teachers, teaching assistants, support staff, caretakers, and administrative teams. Each staff group can have different leave policies, allowances, and approval workflows to reflect their different terms and conditions.',
  },
]

/* ─── Solution features ──────────────────────────────────────────────── */
const solutions = [
  {
    icon: CalendarDays,
    title: 'Teacher Absence Tracking',
    description:
      'Track every staff absence with a complete digital record. Teachers and support staff request leave from their phone. Managers approve in one click. Sick leave triggers Bradford Factor monitoring and fit note requirements — all tracked automatically.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    bullets: [
      'One-click leave approvals for headteachers',
      'Bradford Factor auto-calculated per staff member',
      'Fit note tracking and return-to-work prompts',
      'Full audit trail for every absence',
    ],
  },
  {
    icon: Users,
    title: 'Supply Cover Workflow',
    description:
      'When a teacher is absent, you need to arrange cover fast. Leavely records the absence and lets you log supply cover arrangements against it. Track cover costs, see which classes are affected, and build a clear picture of supply spend over time.',
    color: 'from-teal-500 to-emerald-600',
    bg: 'bg-teal-50',
    bullets: [
      'Log cover arrangements against each absence',
      'Track supply cover costs per term',
      'See which classes are affected at a glance',
      'Audit trail of all cover decisions',
    ],
  },
  {
    icon: BookOpen,
    title: 'Term-Time Leave Policies',
    description:
      'Different staff groups have different terms. Term-time only TAs, all-year-round caretakers, part-time admin — Leavely handles them all with separate leave policies, pro-rated allowances, and automatic balance calculations.',
    color: 'from-emerald-600 to-teal-700',
    bg: 'bg-emerald-50',
    bullets: [
      'Separate policies for each staff group',
      'Pro-rated allowances for part-time staff',
      'Term-time only leave calculations',
      'INSET days and training days built in',
    ],
  },
  {
    icon: Layers,
    title: 'Multi-School Dashboard',
    description:
      'For multi-academy trusts and school groups, Leavely gives trust-level administrators a single dashboard across all schools. See absence trends, staffing levels, and leave balances across every school — while headteachers manage their own site independently.',
    color: 'from-teal-600 to-emerald-700',
    bg: 'bg-teal-50',
    bullets: [
      'Trust-wide absence overview',
      'Per-school dashboards for headteachers',
      'Role-based access across the trust',
      'Consistent policies across all schools',
    ],
  },
  {
    icon: BarChart3,
    title: 'Attendance Reports & Bradford Factor',
    description:
      'Pre-built reports for absence patterns, Bradford Factor scores, supply cover costs, and staff attendance trends. Export to CSV for governors, trustees, or Ofsted inspectors. Spot patterns before they become problems.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    bullets: [
      'Bradford Factor scores per staff member',
      'Absence trend reports by term',
      'Supply cover cost analysis',
      'Export to CSV for governors and Ofsted',
    ],
  },
]

/* ─── Built-for sector list ──────────────────────────────────────────── */
const sectors = [
  {
    icon: School,
    title: 'Primary Schools',
    description: 'State and independent primary schools with teaching and support staff',
  },
  {
    icon: Building2,
    title: 'Secondary Schools',
    description: 'Secondary schools and sixth form colleges with large staff teams',
  },
  {
    icon: Layers,
    title: 'Multi-Academy Trusts',
    description: 'MATs managing absence and leave policies across multiple schools',
  },
  {
    icon: GraduationCap,
    title: 'Colleges',
    description: 'Further education colleges with mixed academic and support staff',
  },
  {
    icon: BookOpen,
    title: 'Universities',
    description: 'Higher education institutions with complex departmental structures',
  },
]

/* ─── Problem cards ──────────────────────────────────────────────────── */
const problems = [
  {
    icon: FileText,
    title: 'Term-time leave calculations are a nightmare',
    description:
      'Manually calculating pro-rated leave for term-time only staff, part-time teachers, and job shares eats hours every month. Mistakes lead to overpayments, underpayments, and grievances.',
  },
  {
    icon: AlertTriangle,
    title: 'Supply cover costs are spiralling',
    description:
      'Without clear data on absence patterns and cover arrangements, supply costs creep up unnoticed. Governors and trustees want answers, but pulling the numbers together takes days.',
  },
  {
    icon: Clock,
    title: 'No joined-up view across schools',
    description:
      'Multi-academy trusts struggle to get a consistent picture of staff absence across their schools. Each school tracks leave differently, making trust-level reporting unreliable.',
  },
]

/* ─── Compliance items ───────────────────────────────────────────────── */
const complianceItems = [
  {
    title: 'Burgundy Book & Green Book',
    description:
      'Leavely supports leave policies aligned to the Burgundy Book (teachers) and Green Book (support staff) terms and conditions, ensuring your leave management reflects the correct contractual entitlements.',
  },
  {
    title: 'Ofsted Attendance Evidence',
    description:
      'Generate exportable reports showing staff attendance patterns, absence rates, and how cover was arranged. Digital records with timestamps provide the evidence Ofsted inspectors expect.',
  },
  {
    title: 'Teachers\' Terms & Conditions',
    description:
      'Configure leave policies that reflect directed time, term-time only contracts, and the specific entitlements for qualified teachers, unqualified teachers, and support staff.',
  },
]

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function EducationPage() {
  const registerUrl =
    '/register?utm_source=website&utm_campaign=education'

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
                <GraduationCap className="h-4 w-4" />
                Built for education
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Staff Management Software
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  for Schools &amp; Education
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Teacher absence tracking, supply cover workflows, term-time
                leave policies, and multi-school dashboards. Replace
                spreadsheets with Leavely.
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
                    100%
                  </p>
                  <p className="text-sm text-gray-500">digital audit trail</p>
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
                These are the problems school leaders and MAT administrators
                face every day — and exactly what Leavely solves.
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
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Leave Requests
                            </p>
                            <div className="space-y-2">
                              {[
                                {
                                  name: 'Mrs Clarke',
                                  type: 'Sick Leave',
                                  dates: 'Today',
                                  status: 'Pending',
                                  statusColor:
                                    'bg-amber-50 text-amber-600',
                                },
                                {
                                  name: 'Mr Patel',
                                  type: 'Holiday',
                                  dates: '7 – 11 Apr',
                                  status: 'Approved',
                                  statusColor:
                                    'bg-emerald-50 text-emerald-600',
                                },
                                {
                                  name: 'Ms Thompson',
                                  type: 'Sick Leave',
                                  dates: '20 – 21 Mar',
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
                                  Bradford Factor — Mrs Clarke
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  5 spells, 9 days — Score: 225
                                </p>
                              </div>
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-600">
                                Very High
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Supply Cover Log
                            </p>
                            <div className="space-y-3">
                              {[
                                {
                                  teacher: 'Mrs Clarke',
                                  cover: 'Agency — J. Morris',
                                  date: '24 Mar',
                                  cost: '£185',
                                },
                                {
                                  teacher: 'Mr Davies',
                                  cover: 'Internal — Ms Begum',
                                  date: '21 Mar',
                                  cost: '£0',
                                },
                                {
                                  teacher: 'Ms Thompson',
                                  cover: 'Agency — K. Williams',
                                  date: '20 Mar',
                                  cost: '£185',
                                },
                              ].map((entry) => (
                                <div
                                  key={`${entry.teacher}-${entry.date}`}
                                  className="flex items-center justify-between text-xs border-b pb-2 last:border-0"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-teal-100 flex items-center justify-center text-[10px] font-semibold text-teal-700">
                                      {entry.teacher
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                    </div>
                                    <div>
                                      <span className="font-medium text-gray-700">
                                        {entry.teacher}
                                      </span>
                                      <span className="text-gray-400 ml-1">
                                        absent
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-gray-500">
                                      {entry.cover}
                                    </p>
                                    <p className="text-gray-400">
                                      {entry.date} — {entry.cost}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4">
                            <p className="text-sm font-medium text-gray-900">
                              Supply spend this term
                            </p>
                            <p className="text-2xl font-extrabold text-teal-600 mt-1">
                              £4,625
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              23 supply days arranged across 8 absences
                            </p>
                          </div>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Leave Policies
                            </p>
                            <div className="space-y-2">
                              {[
                                {
                                  group: 'Teachers (full-time)',
                                  allowance: '25 days',
                                  type: 'Term-time directed',
                                },
                                {
                                  group: 'Teaching Assistants',
                                  allowance: '18 days (pro-rata)',
                                  type: 'Term-time only',
                                },
                                {
                                  group: 'Admin & Support',
                                  allowance: '25 days',
                                  type: 'All-year-round',
                                },
                                {
                                  group: 'Caretakers',
                                  allowance: '28 days',
                                  type: 'All-year-round',
                                },
                              ].map((policy) => (
                                <div
                                  key={policy.group}
                                  className="flex items-center justify-between text-xs py-2 border-b last:border-0"
                                >
                                  <div>
                                    <span className="font-medium text-gray-700">
                                      {policy.group}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-500">
                                      {policy.allowance}
                                    </span>
                                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                                      {policy.type}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4 flex items-center gap-3">
                            <CalendarDays className="h-5 w-5 text-emerald-500 shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                5 INSET days scheduled
                              </p>
                              <p className="text-xs text-gray-500">
                                Automatically excluded from leave calculations
                                for all staff
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                      {index === 3 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Trust Overview — 4 Schools
                            </p>
                            <div className="space-y-2">
                              {[
                                {
                                  school: 'Oakwood Primary',
                                  absent: '2',
                                  present: '28',
                                  rate: '93%',
                                },
                                {
                                  school: 'Riverside Academy',
                                  absent: '1',
                                  present: '45',
                                  rate: '98%',
                                },
                                {
                                  school: 'Hillcrest Secondary',
                                  absent: '4',
                                  present: '62',
                                  rate: '94%',
                                },
                                {
                                  school: 'Meadow Lane Primary',
                                  absent: '0',
                                  present: '22',
                                  rate: '100%',
                                },
                              ].map((school) => (
                                <div
                                  key={school.school}
                                  className="flex items-center justify-between text-xs py-2 border-b last:border-0"
                                >
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`h-2 w-2 rounded-full ${
                                        school.absent === '0'
                                          ? 'bg-emerald-500'
                                          : Number(school.absent) >= 3
                                            ? 'bg-amber-500'
                                            : 'bg-emerald-400'
                                      }`}
                                    />
                                    <span className="font-medium text-gray-700">
                                      {school.school}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-gray-400">
                                      {school.absent} absent
                                    </span>
                                    <span
                                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                                        school.rate === '100%'
                                          ? 'bg-emerald-50 text-emerald-600'
                                          : 'bg-gray-50 text-gray-500'
                                      }`}
                                    >
                                      {school.rate}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4 flex items-center gap-3">
                            <Layers className="h-5 w-5 text-teal-500 shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Trust-wide attendance: 96.2%
                              </p>
                              <p className="text-xs text-gray-500">
                                7 absences across 157 staff today
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                      {index === 4 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Absence Report — Spring Term 2026
                            </p>
                            <div className="space-y-3">
                              {[
                                {
                                  label: 'Total sick days',
                                  value: '47',
                                  trend: '-8 vs Autumn',
                                  trendColor: 'text-emerald-500',
                                },
                                {
                                  label: 'Supply days arranged',
                                  value: '23',
                                  trend: '-3 vs Autumn',
                                  trendColor: 'text-emerald-500',
                                },
                                {
                                  label: 'Avg Bradford Factor',
                                  value: '52',
                                  trend: 'Medium',
                                  trendColor: 'text-amber-500',
                                },
                                {
                                  label: 'Staff attendance rate',
                                  value: '96.2%',
                                  trend: '+1.1%',
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
                              Export to CSV for governors, trustees, or Ofsted
                              inspections
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
                Built for every type of education provider
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Whether you run a single primary school or manage a
                multi-academy trust, Leavely fits your workflow.
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
        <section>
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Compliance built in
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Leavely helps you meet education-specific compliance
                requirements without extra work.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {complianceItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border bg-white p-8 shadow-sm"
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 mb-4">
                    <ClipboardCheck className="h-6 w-6" />
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
                  Billed monthly based on active staff count
                </p>
                <ul className="text-left space-y-3 mb-8">
                  {[
                    'Everything included — no tiers',
                    'Teacher absence tracking',
                    'Supply cover workflow',
                    'Term-time leave policies',
                    'Multi-school dashboard',
                    'Bradford Factor monitoring',
                    'Attendance & absence reports',
                    'Employee profiles & documents',
                    'INSET day management',
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
                  Example: a school with 50 staff ={' '}
                  <strong className="text-gray-900">£400/month</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related guidance ── */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-3xl mx-auto px-6 py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Calculating leave for term-time and part-time staff?
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Our UK guide explains pro-rata holiday, irregular-hours accrual,
              zero-hours workers, and bank holiday treatment.
            </p>
            <Link
              href="/part-time-worker-leave-entitlement"
              className="mt-5 inline-flex items-center text-sm font-semibold text-emerald-600 hover:underline"
            >
              Part-time worker leave entitlement guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Ready to take control of staff absence?
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Join schools and academy trusts that have switched to digital
              leave management. Set up in under 5 minutes, free for 14 days.
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
                Common questions from school leaders about Leavely.
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
