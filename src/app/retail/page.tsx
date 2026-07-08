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
  ShoppingCart,
  Store,
  Warehouse,
  Package,
  Calculator,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

/* ─── Page-level SEO metadata ────────────────────────────────────────── */
const pageUrl = `${SITE_URL}/retail`

export const metadata: Metadata = {
  title:
    'Staff Management Software for Retail | Rota & Leave Tracking — Leavely',
  description:
    'Leavely helps shops, supermarkets, retail chains, and e-commerce warehouses manage staff rotas, leave, and attendance. Part-time scheduling, pro-rata holiday calculations, peak season cover planning, and multi-store management. Free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'retail staff scheduling software',
    'shop rota management',
    'retail leave tracking',
    'part-time staff management',
    'peak season staff planning',
    'shop floor rota software',
    'retail attendance tracking',
    'supermarket staff scheduling',
    'multi-store staff management',
    'retail holiday management',
    'zero-hour contract management',
    'pro-rata holiday calculator',
    'retail shift planning software',
    'e-commerce warehouse staff rota',
    'Black Friday staff scheduling',
  ],
  openGraph: {
    title: 'Staff Management Software for Retail — Leavely',
    description:
      'Rota scheduling, leave tracking, pro-rata holiday calculations, and multi-store management. Built for shops, supermarkets, retail chains, and e-commerce warehouses.',
    url: pageUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staff Management Software for Retail — Leavely',
    description:
      'Rota scheduling, leave tracking, pro-rata holiday calculations, and multi-store management. Built for shops, supermarkets, retail chains, and e-commerce warehouses.',
  },
}

/* ─── JSON-LD Structured Data ────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} for Retail`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Staff management software for retail shops, supermarkets, retail chains, and e-commerce warehouses. Rota scheduling, leave tracking, pro-rata holiday calculations, multi-location management, and QR code clock-in.',
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
        'Rota and shift scheduling',
        'Leave management with one-click approvals',
        'Pro-rata holiday entitlement calculator',
        'Multi-store staff management',
        'QR code clock-in with GPS verification',
        'Part-time and zero-hour contract support',
        'Peak season cover planning',
        'Real-time attendance dashboard',
        'Attendance and absence reports',
        'Cloud-based — works on any device',
      ],
      audience: {
        '@type': 'Audience',
        audienceType:
          'Retail shops, supermarkets, retail chains, e-commerce warehouses, department stores',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does Leavely handle part-time workers with different hours?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leavely lets you set individual working patterns for every employee — whether they work 8 hours, 20 hours, or variable shifts. Leave allowances and pro-rata holiday entitlements are calculated automatically based on each person\'s contracted hours, so part-time staff always get the right amount of leave.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Leavely help us plan for peak seasons like Black Friday and Christmas?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Managers can see all approved leave and upcoming absences on the team calendar, making it easy to spot gaps before peak trading periods. You can set leave blackout guidance and plan rotas weeks in advance so you always have enough floor cover during Black Friday, Christmas, January sales, and other busy periods.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Leavely support multiple store locations?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can manage multiple stores, warehouses, or retail sites from a single Leavely account. Each location gets its own QR code for clock-in, and managers can view attendance across all sites from one dashboard. Staff can be assigned to specific locations or float between them.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Leavely calculate pro-rata holiday for part-time staff?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leavely automatically calculates pro-rata holiday entitlement based on each employee\'s contracted hours relative to a full-time equivalent. For example, if full-time staff get 28 days and an employee works 3 days a week, they receive 16.8 days. The system handles this for you — no manual spreadsheet calculations needed.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can we manage zero-hour contract staff with Leavely?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Zero-hour contract workers are entitled to 5.6 weeks of paid holiday per year under UK law, calculated based on hours actually worked. Leavely tracks hours via clock-in records and calculates accrued holiday entitlement automatically, keeping you compliant without manual tracking.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the QR code clock-in work for retail staff?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You print a unique QR code for each store or warehouse. Staff scan it with their phone camera when they arrive and leave. Each scan records the time, date, and GPS location automatically. No special hardware, no app downloads, and no training required — staff just point their camera and scan.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does Leavely cost for retail businesses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leavely costs £8 per user per month with all features included — no tiers, no hidden fees. Every account starts with a free 14-day trial, no credit card required. For a retail store with 25 staff, that is £200 per month.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Leavely help with Working Time Directive compliance?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely tracks clock-in and clock-out times for every employee, giving you accurate records of hours worked. This helps you monitor weekly hours, ensure rest breaks are taken, and stay compliant with the Working Time Regulations 1998. All records are stored digitally and can be exported for audits.',
          },
        },
      ],
    },
  ],
}

/* ─── FAQ data (rendered on page + in JSON-LD above) ─────────────────── */
const faqs = [
  {
    q: 'How does Leavely handle part-time workers with different hours?',
    a: "Leavely lets you set individual working patterns for every employee — whether they work 8 hours, 20 hours, or variable shifts. Leave allowances and pro-rata holiday entitlements are calculated automatically based on each person's contracted hours, so part-time staff always get the right amount of leave.",
  },
  {
    q: 'Can Leavely help us plan for peak seasons like Black Friday and Christmas?',
    a: 'Yes. Managers can see all approved leave and upcoming absences on the team calendar, making it easy to spot gaps before peak trading periods. You can set leave blackout guidance and plan rotas weeks in advance so you always have enough floor cover during Black Friday, Christmas, January sales, and other busy periods.',
  },
  {
    q: 'Does Leavely support multiple store locations?',
    a: 'Yes. You can manage multiple stores, warehouses, or retail sites from a single Leavely account. Each location gets its own QR code for clock-in, and managers can view attendance across all sites from one dashboard. Staff can be assigned to specific locations or float between them.',
  },
  {
    q: 'How does Leavely calculate pro-rata holiday for part-time staff?',
    a: "Leavely automatically calculates pro-rata holiday entitlement based on each employee's contracted hours relative to a full-time equivalent. For example, if full-time staff get 28 days and an employee works 3 days a week, they receive 16.8 days. The system handles this for you — no manual spreadsheet calculations needed.",
  },
  {
    q: 'Can we manage zero-hour contract staff with Leavely?',
    a: 'Yes. Zero-hour contract workers are entitled to 5.6 weeks of paid holiday per year under UK law, calculated based on hours actually worked. Leavely tracks hours via clock-in records and calculates accrued holiday entitlement automatically, keeping you compliant without manual tracking.',
  },
  {
    q: 'How does the QR code clock-in work for retail staff?',
    a: 'You print a unique QR code for each store or warehouse. Staff scan it with their phone camera when they arrive and leave. Each scan records the time, date, and GPS location automatically. No special hardware, no app downloads, and no training required — staff just point their camera and scan.',
  },
  {
    q: 'How much does Leavely cost for retail businesses?',
    a: 'Leavely costs £8 per user per month with all features included — no tiers, no hidden fees. Every account starts with a free 14-day trial, no credit card required. For a retail store with 25 staff, that is £200 per month.',
  },
  {
    q: 'Does Leavely help with Working Time Directive compliance?',
    a: 'Yes. Leavely tracks clock-in and clock-out times for every employee, giving you accurate records of hours worked. This helps you monitor weekly hours, ensure rest breaks are taken, and stay compliant with the Working Time Regulations 1998. All records are stored digitally and can be exported for audits.',
  },
]

/* ─── Solution features ──────────────────────────────────────────────── */
const solutions = [
  {
    icon: CalendarDays,
    title: 'Rota & Shift Scheduling',
    description:
      'Build weekly rotas in minutes. Assign staff to shifts across stores, manage swaps, and ensure every time slot is covered. Staff see their schedules from their phone — no more checking the noticeboard.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    bullets: [
      'Drag-and-drop rota builder',
      'Cover every shift across all stores',
      'Staff view schedules on their phone',
      'Automatic clash detection',
    ],
  },
  {
    icon: Calculator,
    title: 'Pro-Rata Holiday Calculator',
    description:
      'Stop wrestling with spreadsheets. Leavely automatically calculates pro-rata holiday entitlement for every part-time employee based on their contracted hours. Full-timers, part-timers, and zero-hour staff all handled correctly.',
    color: 'from-teal-500 to-emerald-600',
    bg: 'bg-teal-50',
    bullets: [
      'Automatic pro-rata calculations',
      'Handles variable hour contracts',
      'Zero-hour accrual tracking',
      'UK statutory minimum enforced',
    ],
  },
  {
    icon: QrCode,
    title: 'QR Code Clock-In',
    description:
      'Print a QR code for each store or warehouse. Staff scan on arrival with their phone — time, date, and GPS coordinates are recorded automatically. No hardware, no app downloads, no training.',
    color: 'from-emerald-600 to-teal-700',
    bg: 'bg-emerald-50',
    bullets: [
      'Unique QR code per store location',
      'GPS coordinates captured on every scan',
      'Works on any smartphone camera',
      'Instant digital record — no paper',
    ],
  },
  {
    icon: MapPin,
    title: 'Multi-Store Management',
    description:
      'Manage staff across multiple retail locations from one dashboard. See who is clocked in at each store, track attendance by location, and move staff between sites when cover is needed.',
    color: 'from-teal-600 to-emerald-700',
    bg: 'bg-teal-50',
    bullets: [
      'Single dashboard for all locations',
      'Per-store attendance visibility',
      'Transfer staff between sites',
      'Location-level reporting',
    ],
  },
  {
    icon: BarChart3,
    title: 'Attendance & Absence Reports',
    description:
      'Pre-built reports for attendance patterns, absence trends, overtime, and hours worked. Export to CSV for payroll or use the data to plan staffing levels for busy trading periods.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    bullets: [
      '8 pre-built report templates',
      'Filter by date range, employee, or store',
      'Export to CSV for payroll',
      'Trend analysis for peak period planning',
    ],
  },
]

/* ─── Built-for sector list ──────────────────────────────────────────── */
const sectors = [
  {
    icon: Store,
    title: 'High Street Shops',
    description: 'Independent shops and boutiques with small teams',
  },
  {
    icon: ShoppingCart,
    title: 'Supermarkets',
    description: 'Supermarkets with large part-time workforces and shift patterns',
  },
  {
    icon: Package,
    title: 'Retail Chains',
    description: 'Multi-site retail chains needing consistent staff management',
  },
  {
    icon: Warehouse,
    title: 'E-Commerce Warehouses',
    description: 'Fulfilment centres with seasonal demand spikes',
  },
  {
    icon: Users,
    title: 'Department Stores',
    description: 'Large stores with multiple departments and floor teams',
  },
]

/* ─── Problem cards ──────────────────────────────────────────────────── */
const problems = [
  {
    icon: FileText,
    title: 'Seasonal demand chaos',
    description:
      'Black Friday, Christmas, January sales — every peak period is a scramble to find enough staff. Without clear visibility of who is available, gaps appear on the shop floor when you can least afford them.',
  },
  {
    icon: AlertTriangle,
    title: 'Pro-rata holiday headaches',
    description:
      'With a mix of full-time, part-time, and zero-hour staff, calculating the correct holiday entitlement for each person is a spreadsheet nightmare. Get it wrong and you face compliance issues.',
  },
  {
    icon: Clock,
    title: 'No visibility across stores',
    description:
      'Managers cannot tell who is clocked in at which store, who is running late, or whether there is enough cover on the shop floor. Problems surface too late to fix.',
  },
]

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function RetailPage() {
  const registerUrl =
    '/register?utm_source=website&utm_campaign=retail'

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
                <ShoppingCart className="h-4 w-4" />
                Built for retail
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Staff Management Software
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  for Retail
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Rota scheduling, leave tracking, pro-rata holiday calculations,
                and multi-store management. Built for shops, supermarkets,
                retail chains, and e-commerce warehouses.
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
                  <p className="text-sm text-gray-500">pro-rata accurate</p>
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
                These are the problems retail managers face every day — and
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
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Weekly Rota — Camden High Street
                            </p>
                            <div className="space-y-2">
                              {[
                                {
                                  name: 'Sophie T.',
                                  shifts: ['9–5', '9–5', 'Off', '9–5', '9–5', '10–6', 'Off'],
                                },
                                {
                                  name: 'Raj P.',
                                  shifts: ['Off', '12–8', '12–8', 'Off', '12–8', '12–8', 'Off'],
                                },
                                {
                                  name: 'Emma L.',
                                  shifts: ['10–2', 'Off', '10–2', '10–2', 'Off', '10–6', '10–6'],
                                },
                              ].map((row) => (
                                <div
                                  key={row.name}
                                  className="flex items-center gap-2 text-xs"
                                >
                                  <span className="w-16 font-medium text-gray-700 shrink-0">
                                    {row.name}
                                  </span>
                                  {row.shifts.map((shift, i) => (
                                    <span
                                      key={i}
                                      className={`flex-1 text-center py-1 rounded text-[10px] font-medium ${
                                        shift === 'Off'
                                          ? 'bg-gray-50 text-gray-400'
                                          : 'bg-emerald-50 text-emerald-700'
                                      }`}
                                    >
                                      {shift}
                                    </span>
                                  ))}
                                </div>
                              ))}
                              <div className="flex items-center gap-2 text-[10px] text-gray-400 pt-1">
                                <span className="w-16 shrink-0" />
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
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                              All shifts covered — 0 gaps detected this week
                            </div>
                          </div>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Pro-Rata Holiday Calculator
                            </p>
                            <div className="space-y-3">
                              {[
                                {
                                  name: 'Sophie T.',
                                  hours: '37.5 hrs/wk',
                                  entitlement: '28.0 days',
                                  type: 'Full-time',
                                  typeColor: 'bg-emerald-50 text-emerald-600',
                                },
                                {
                                  name: 'Emma L.',
                                  hours: '20 hrs/wk',
                                  entitlement: '14.9 days',
                                  type: 'Part-time',
                                  typeColor: 'bg-teal-50 text-teal-600',
                                },
                                {
                                  name: 'Jake M.',
                                  hours: 'Variable',
                                  entitlement: '4.2 days accrued',
                                  type: 'Zero-hour',
                                  typeColor: 'bg-amber-50 text-amber-600',
                                },
                              ].map((emp) => (
                                <div
                                  key={emp.name}
                                  className="flex items-center justify-between text-xs border-b pb-2 last:border-0"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-semibold text-emerald-700">
                                      {emp.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                    </div>
                                    <div>
                                      <span className="font-medium text-gray-700">
                                        {emp.name}
                                      </span>
                                      <span className="text-gray-400 ml-1">
                                        {emp.hours}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-gray-700">
                                      {emp.entitlement}
                                    </span>
                                    <span
                                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${emp.typeColor}`}
                                    >
                                      {emp.type}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4">
                            <p className="text-sm font-medium text-gray-900">
                              UK Statutory Minimum
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              All employees are entitled to 5.6 weeks of paid
                              holiday per year. Leavely calculates pro-rata
                              entitlements automatically — including for
                              zero-hour contracts.
                            </p>
                          </div>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <div className="flex items-center gap-3 mb-4">
                              <QrCode className="h-8 w-8 text-emerald-600" />
                              <div>
                                <p className="font-semibold text-gray-900">
                                  Camden High Street Store
                                </p>
                                <p className="text-xs text-gray-500">
                                  QR Code — Staff Entrance
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
                              GPS verified — 42 Camden High St, London NW1 0JH
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="h-3.5 w-3.5 text-emerald-500" />
                              Clocked in at 08:58 — 24 Mar 2026
                            </div>
                          </div>
                        </>
                      )}
                      {index === 3 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Multi-Store Dashboard
                            </p>
                            <div className="space-y-2">
                              {[
                                {
                                  store: 'Camden High Street',
                                  staffIn: 6,
                                  staffExpected: 6,
                                  status: 'Fully Staffed',
                                },
                                {
                                  store: 'Oxford Street',
                                  staffIn: 11,
                                  staffExpected: 12,
                                  status: '1 Gap',
                                },
                                {
                                  store: 'Warehouse — Park Royal',
                                  staffIn: 8,
                                  staffExpected: 8,
                                  status: 'Fully Staffed',
                                },
                              ].map((loc) => (
                                <div
                                  key={loc.store}
                                  className="flex items-center justify-between text-xs py-2 border-b last:border-0"
                                >
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`h-2 w-2 rounded-full ${loc.staffIn >= loc.staffExpected ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                    />
                                    <span className="font-medium text-gray-700">
                                      {loc.store}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-gray-400">
                                      {loc.staffIn}/{loc.staffExpected} staff
                                    </span>
                                    <span
                                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                                        loc.staffIn >= loc.staffExpected
                                          ? 'bg-emerald-50 text-emerald-600'
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
                                Oxford Street — 1 gap
                              </p>
                              <p className="text-xs text-gray-500">
                                Priya K. has not clocked in. Shift started at
                                09:00. Consider redeploying from Camden.
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                      {index === 4 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Staffing Report — March 2026
                            </p>
                            <div className="space-y-3">
                              {[
                                {
                                  label: 'Total hours worked',
                                  value: '2,840',
                                  trend: '+12% vs Feb',
                                  trendColor: 'text-emerald-500',
                                },
                                {
                                  label: 'Sick days taken',
                                  value: '9',
                                  trend: '-2 vs Feb',
                                  trendColor: 'text-emerald-500',
                                },
                                {
                                  label: 'Holiday days taken',
                                  value: '22',
                                  trend: '+5 vs Feb',
                                  trendColor: 'text-amber-500',
                                },
                                {
                                  label: 'Attendance rate',
                                  value: '96.1%',
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
                              Export to CSV for payroll, compliance audits, or
                              head office reporting
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
                Built for every type of retail business
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Whether you run a single shop or manage a chain of stores and
                warehouses, Leavely fits your workflow.
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
                Stay compliant without the paperwork
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                UK employment law applies to every retail business. Leavely
                helps you meet your obligations automatically.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Part-Time Workers Regulations',
                  description:
                    'Part-time employees have the right to the same treatment as comparable full-time workers. Leavely calculates pro-rata entitlements automatically so part-timers always receive fair holiday allowances.',
                },
                {
                  icon: Calculator,
                  title: 'Pro-Rata Holiday Entitlement',
                  description:
                    'All workers — including zero-hour contract staff — are entitled to 5.6 weeks of paid holiday per year. Leavely tracks hours worked and calculates accrued entitlement in real time, removing manual spreadsheet errors.',
                },
                {
                  icon: Clock,
                  title: 'Working Time Directive',
                  description:
                    'The Working Time Regulations 1998 limit average weekly hours to 48 and require rest breaks. Leavely records clock-in and clock-out times, giving you accurate hours-worked data for every employee.',
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
                  Billed monthly based on active employee count
                </p>
                <ul className="text-left space-y-3 mb-8">
                  {[
                    'Everything included — no tiers',
                    'Rota & shift scheduling',
                    'Leave management & approvals',
                    'Pro-rata holiday calculator',
                    'QR code clock-in with GPS',
                    'Multi-store management',
                    'Attendance & absence reports',
                    'Employee profiles & documents',
                    'Zero-hour contract support',
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
                  Example: a retail store with 25 staff ={' '}
                  <strong className="text-gray-900">£200/month</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related guidance ── */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-3xl mx-auto px-6 py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Managing part-time and zero-hour retail staff?
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Read our UK guide to pro-rata holiday, zero-hours accrual, bank
              holidays, and irregular-hours leave entitlement.
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
              Ready to simplify retail staff management?
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Join retail businesses that have switched to digital rota
              scheduling and leave tracking. Set up in under 5 minutes, free
              for 14 days.
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
                Common questions from retail managers about Leavely.
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
