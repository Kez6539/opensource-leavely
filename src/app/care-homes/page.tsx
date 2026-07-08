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
  Heart,
  Building2,
  Home,
  Stethoscope,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

/* ─── Page-level SEO metadata ────────────────────────────────────────── */
const pageUrl = `${SITE_URL}/care-homes`

export const metadata: Metadata = {
  title:
    'Staff Management Software for Care Homes | CQC Compliant Attendance & Leave Tracking — Leavely',
  description:
    'Leavely helps care homes, nursing homes, and domiciliary care providers manage staff attendance, leave, and CQC compliance. QR code clock-in with GPS proof, Bradford Factor monitoring, digital audit trails. Free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'care home staff management software',
    'CQC compliant attendance tracking',
    'domiciliary care clock in system',
    'care home leave management',
    'care home rota software',
    'nursing home staff tracker',
    'care home QR code clock in',
    'CQC Regulation 18 staffing',
    'care home absence management',
    'home care agency staff software',
    'supported living staff management',
    'care home digital sign in',
    'care worker attendance tracking',
    'care home Bradford Factor',
    'care home fit note tracking',
  ],
  openGraph: {
    title: 'Staff Management Software for Care Homes — Leavely',
    description:
      'QR code clock-in with GPS proof, CQC-compliant audit trails, Bradford Factor monitoring, and real-time staff visibility. Built for care homes, nursing homes, and domiciliary care.',
    url: pageUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staff Management Software for Care Homes — Leavely',
    description:
      'QR code clock-in with GPS proof, CQC-compliant audit trails, Bradford Factor monitoring, and real-time staff visibility. Built for care homes, nursing homes, and domiciliary care.',
  },
}

/* ─── JSON-LD Structured Data ────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} for Care Homes`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Staff management software for care homes, nursing homes, and domiciliary care providers. QR code clock-in with GPS, CQC-compliant attendance records, leave management, and Bradford Factor monitoring.',
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
        'QR code clock-in with GPS verification',
        'CQC-compliant digital audit trails',
        'Real-time staff attendance dashboard',
        'Bradford Factor monitoring',
        'Sick leave and fit note tracking',
        'Leave management with one-click approvals',
        'Attendance and absence reports',
        'Role-based access control',
        'Rota and shift scheduling',
        'Cloud-based — works on any device',
      ],
      audience: {
        '@type': 'Audience',
        audienceType:
          'Care homes, nursing homes, domiciliary care providers, supported living, home care agencies',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is Leavely CQC compliant?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely provides digital audit trails for every clock-in, leave request, and absence record with timestamps, GPS coordinates, and user attribution. This supports CQC Regulation 18 (Staffing) requirements by evidencing who was on shift, when they arrived, and how absences were managed.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the QR code clock-in work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You print a unique QR code for each care home or client address. Staff scan it with their phone camera when they arrive and leave. Each scan records the time, date, and GPS location automatically. No special hardware or app download required.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can domiciliary care workers clock in at client homes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can create a QR code for every client address. When your care workers arrive at a client home, they scan the QR code and their clock-in is recorded with GPS coordinates proving they were at the right location.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to set up Leavely for a care home?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can set up your care home on Leavely in under 5 minutes. Register, add your care home, invite your staff, and print QR codes for your locations. Staff need no training — they just scan the QR code to clock in.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Leavely track the Bradford Factor for care staff?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely automatically calculates the Bradford Factor for every employee based on their sick leave records. This helps care home managers identify patterns of short-term absence that may indicate deeper issues and supports fair, consistent absence management.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can care home managers see who is on shift right now?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The real-time dashboard shows which staff are currently clocked in, at which location, and for how long. Managers can access this from their phone, tablet, or desktop — giving instant visibility even when they are not on site.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does Leavely cost for care homes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leavely costs £8 per user per month with all features included — no tiers, no hidden fees. Every account starts with a free 14-day trial, no credit card required. For a care home with 30 staff, that is £240 per month.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Leavely work on mobile phones?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely is fully cloud-based and works on any device with a web browser — smartphones, tablets, and desktops. Care workers clock in from their phone, and managers can check attendance and approve leave from anywhere.',
          },
        },
      ],
    },
  ],
}

/* ─── FAQ data (rendered on page + in JSON-LD above) ─────────────────── */
const faqs = [
  {
    q: 'Is Leavely CQC compliant?',
    a: 'Yes. Leavely provides digital audit trails for every clock-in, leave request, and absence record with timestamps, GPS coordinates, and user attribution. This supports CQC Regulation 18 (Staffing) requirements by evidencing who was on shift, when they arrived, and how absences were managed.',
  },
  {
    q: 'How does the QR code clock-in work?',
    a: 'You print a unique QR code for each care home or client address. Staff scan it with their phone camera when they arrive and leave. Each scan records the time, date, and GPS location automatically. No special hardware or app download required.',
  },
  {
    q: 'Can domiciliary care workers clock in at client homes?',
    a: 'Yes. You can create a QR code for every client address. When your care workers arrive at a client home, they scan the QR code and their clock-in is recorded with GPS coordinates proving they were at the right location.',
  },
  {
    q: 'How long does it take to set up Leavely for a care home?',
    a: 'You can set up your care home on Leavely in under 5 minutes. Register, add your care home, invite your staff, and print QR codes for your locations. Staff need no training — they just scan the QR code to clock in.',
  },
  {
    q: 'Does Leavely track the Bradford Factor for care staff?',
    a: 'Yes. Leavely automatically calculates the Bradford Factor for every employee based on their sick leave records. This helps care home managers identify patterns of short-term absence that may indicate deeper issues and supports fair, consistent absence management.',
  },
  {
    q: 'Can care home managers see who is on shift right now?',
    a: 'Yes. The real-time dashboard shows which staff are currently clocked in, at which location, and for how long. Managers can access this from their phone, tablet, or desktop — giving instant visibility even when they are not on site.',
  },
  {
    q: 'How much does Leavely cost for care homes?',
    a: 'Leavely costs £8 per user per month with all features included — no tiers, no hidden fees. Every account starts with a free 14-day trial, no credit card required. For a care home with 30 staff, that is £240 per month.',
  },
  {
    q: 'Does Leavely work on mobile phones?',
    a: 'Yes. Leavely is fully cloud-based and works on any device with a web browser — smartphones, tablets, and desktops. Care workers clock in from their phone, and managers can check attendance and approve leave from anywhere.',
  },
]

/* ─── Solution features ──────────────────────────────────────────────── */
const solutions = [
  {
    icon: QrCode,
    title: 'QR Code Clock-In',
    description:
      'Print a QR code for each care home or client address. Staff scan on arrival with their phone — time, date, and GPS coordinates are recorded automatically. No hardware, no app downloads, no training.',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    bullets: [
      'Unique QR code per location',
      'GPS coordinates captured on every scan',
      'Works on any smartphone camera',
      'Instant digital record — no paper',
    ],
  },
  {
    icon: Shield,
    title: 'CQC Compliance — Regulation 18',
    description:
      'CQC expects providers to evidence who was on shift, when they arrived, and how staffing gaps were managed. Leavely creates a digital audit trail for every clock-in, absence, and approval — ready for inspection.',
    color: 'from-indigo-500 to-purple-600',
    bg: 'bg-indigo-50',
    bullets: [
      'Digital attendance records with timestamps',
      'Immutable audit trail for every action',
      'Evidence of cover arrangements',
      'Exportable reports for inspectors',
    ],
  },
  {
    icon: CalendarDays,
    title: 'Leave Management & Sick Leave',
    description:
      'Staff request leave from their phone. Managers approve in one click. Sick leave triggers Bradford Factor monitoring, return-to-work interviews, and fit note requirements — all tracked automatically.',
    color: 'from-blue-600 to-indigo-700',
    bg: 'bg-blue-50',
    bullets: [
      'One-click leave approvals',
      'Bradford Factor auto-calculated',
      'Fit note tracking and reminders',
      'Return-to-work interview prompts',
    ],
  },
  {
    icon: Users,
    title: 'Real-Time Staff Visibility',
    description:
      'See who is clocked in right now, at which location, and for how long. Spot gaps in cover before they become problems. Access from your phone, tablet, or desktop — even when you are off site.',
    color: 'from-indigo-600 to-blue-700',
    bg: 'bg-indigo-50',
    bullets: [
      'Live dashboard of who is on shift',
      'Location-level breakdown',
      'Instant gap detection',
      'Works on any device, anywhere',
    ],
  },
  {
    icon: BarChart3,
    title: 'Attendance & Absence Reports',
    description:
      'Pre-built reports for attendance patterns, absence trends, Bradford Factor scores, and overtime. Export to CSV for payroll or share with your management team and CQC inspectors.',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    bullets: [
      '8 pre-built report templates',
      'Filter by date range, employee, or location',
      'Export to CSV for payroll',
      'Trend analysis for absence patterns',
    ],
  },
]

/* ─── Built-for sector list ──────────────────────────────────────────── */
const sectors = [
  {
    icon: Building2,
    title: 'Care Homes',
    description: 'Residential care homes with on-site staff teams',
  },
  {
    icon: Stethoscope,
    title: 'Nursing Homes',
    description: 'Nursing homes needing accurate nurse and HCA attendance records',
  },
  {
    icon: Home,
    title: 'Domiciliary Care',
    description: 'Home care providers visiting clients at their own addresses',
  },
  {
    icon: Heart,
    title: 'Supported Living',
    description: 'Supported living services with rotating care staff',
  },
  {
    icon: Users,
    title: 'Home Care Agencies',
    description: 'Agencies deploying care workers across multiple client sites',
  },
]

/* ─── Problem cards ──────────────────────────────────────────────────── */
const problems = [
  {
    icon: FileText,
    title: 'Paper sign-in sheets go missing',
    description:
      'Folders of paper records get lost, damaged, or left incomplete. When CQC inspectors ask for attendance evidence, you are scrambling to piece it together.',
  },
  {
    icon: AlertTriangle,
    title: 'CQC inspection failures',
    description:
      'Without digital records, care homes struggle to evidence Regulation 18 compliance. Inspectors want to see who was on shift, when they arrived, and how gaps were covered.',
  },
  {
    icon: Clock,
    title: 'No visibility of who is on shift',
    description:
      'Managers cannot tell who is clocked in, who is running late, or whether there are enough staff to cover the floor. Problems surface too late to fix.',
  },
]

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function CareHomesPage() {
  const registerUrl =
    '/register?utm_source=website&utm_campaign=care_homes'

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
          {/* Background decoration — blue/indigo accent */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white to-white" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-blue-100/40 to-indigo-100/30 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-4 py-1.5 text-sm text-blue-700 font-medium mb-6">
                <Shield className="h-4 w-4" />
                Built for care providers
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Staff Management Software
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  for Care Homes
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                QR code clock-in with GPS proof, CQC-compliant digital audit
                trails, leave management, and real-time staff visibility.
                Replace paper sign-in sheets with Leavely.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href={registerUrl}>
                  <Button
                    size="lg"
                    className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30"
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
                  <p className="text-3xl font-extrabold text-blue-600">
                    100%
                  </p>
                  <p className="text-sm text-gray-500">digital audit trail</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-blue-600">
                    &lt; 5 min
                  </p>
                  <p className="text-sm text-gray-500">setup time</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-blue-600">
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
                These are the problems care home managers face every day — and
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
                          <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
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
                              <QrCode className="h-8 w-8 text-blue-600" />
                              <div>
                                <p className="font-semibold text-gray-900">
                                  Sunrise Care Home
                                </p>
                                <p className="text-xs text-gray-500">
                                  QR Code — Main Entrance
                                </p>
                              </div>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4 text-center">
                              <div className="w-24 h-24 mx-auto bg-white rounded-lg border-2 border-dashed border-blue-300 flex items-center justify-center">
                                <QrCode className="h-12 w-12 text-blue-400" />
                              </div>
                              <p className="text-xs text-blue-600 font-medium mt-2">
                                Scan to clock in
                              </p>
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                              <MapPin className="h-3.5 w-3.5 text-blue-500" />
                              GPS verified — 12 Oak Lane, London SE1 4QP
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="h-3.5 w-3.5 text-blue-500" />
                              Clocked in at 07:02 — 24 Mar 2026
                            </div>
                          </div>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Digital Audit Trail
                            </p>
                            <div className="space-y-3">
                              {[
                                {
                                  action: 'Clock In',
                                  user: 'Sarah M.',
                                  time: '07:02',
                                  detail: 'Sunrise Care Home',
                                },
                                {
                                  action: 'Leave Approved',
                                  user: 'James K.',
                                  time: '09:15',
                                  detail: 'Sick leave — 1 day',
                                },
                                {
                                  action: 'Clock Out',
                                  user: 'Anna W.',
                                  time: '15:30',
                                  detail: 'Meadow View Home',
                                },
                              ].map((entry) => (
                                <div
                                  key={`${entry.user}-${entry.action}`}
                                  className="flex items-center justify-between text-xs border-b pb-2 last:border-0"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-semibold text-blue-700">
                                      {entry.user
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                    </div>
                                    <div>
                                      <span className="font-medium text-gray-700">
                                        {entry.user}
                                      </span>
                                      <span className="text-gray-400 ml-1">
                                        {entry.action}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-gray-500">
                                      {entry.time}
                                    </p>
                                    <p className="text-gray-400">
                                      {entry.detail}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4">
                            <p className="text-sm font-medium text-gray-900">
                              Regulation 18 — Staffing
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              CQC requires providers to deploy sufficient
                              numbers of suitably qualified, competent, skilled
                              and experienced staff. Leavely evidences
                              compliance.
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
                                  name: 'Maria G.',
                                  type: 'Sick Leave',
                                  dates: 'Today',
                                  status: 'Pending',
                                  statusColor:
                                    'bg-amber-50 text-amber-600',
                                },
                                {
                                  name: 'David P.',
                                  type: 'Holiday',
                                  dates: '28 – 30 Mar',
                                  status: 'Approved',
                                  statusColor:
                                    'bg-blue-50 text-blue-600',
                                },
                                {
                                  name: 'Kate R.',
                                  type: 'Sick Leave',
                                  dates: '20 – 22 Mar',
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
                                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-semibold text-blue-700">
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
                                  Bradford Factor — Maria G.
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  4 spells, 8 days — Score: 128
                                </p>
                              </div>
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-50 text-orange-600">
                                High
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                      {index === 3 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Live Staff Dashboard
                            </p>
                            <div className="space-y-2">
                              {[
                                {
                                  name: 'Sarah M.',
                                  location: 'Sunrise Care Home',
                                  since: '07:02',
                                  status: 'On Shift',
                                },
                                {
                                  name: 'Anna W.',
                                  location: 'Meadow View',
                                  since: '07:15',
                                  status: 'On Shift',
                                },
                                {
                                  name: 'Tom B.',
                                  location: 'Sunrise Care Home',
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
                                      className={`h-2 w-2 rounded-full ${staff.status === 'On Shift' ? 'bg-blue-500' : 'bg-gray-300'}`}
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
                                        staff.status === 'On Shift'
                                          ? 'bg-blue-50 text-blue-600'
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
                                Tom B. has not clocked in. Shift started at
                                07:00. Consider arranging cover.
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
                                  value: '14',
                                  trend: '+3 vs Feb',
                                  trendColor: 'text-red-500',
                                },
                                {
                                  label: 'Unique staff absent',
                                  value: '6',
                                  trend: '-1 vs Feb',
                                  trendColor: 'text-blue-500',
                                },
                                {
                                  label: 'Avg Bradford Factor',
                                  value: '67',
                                  trend: 'Medium',
                                  trendColor: 'text-amber-500',
                                },
                                {
                                  label: 'Attendance rate',
                                  value: '94.2%',
                                  trend: '+0.5%',
                                  trendColor: 'text-blue-500',
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
                              Export to CSV for payroll, CQC inspections, or
                              management meetings
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
        <section className="bg-gradient-to-br from-blue-50/60 to-indigo-50/40">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Built for every type of care provider
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Whether you run a single care home or manage a network of
                domiciliary care workers, Leavely fits your workflow.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {sectors.map((sector) => (
                <div
                  key={sector.title}
                  className="rounded-2xl border bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white mb-4 shadow-sm">
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
            <div className="rounded-2xl border-2 border-blue-500 bg-white p-8 shadow-xl shadow-blue-500/10 text-center">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2">
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
                  'QR code clock-in with GPS',
                  'CQC-compliant audit trails',
                  'Leave management & approvals',
                  'Bradford Factor monitoring',
                  'Rota & shift scheduling',
                  'Attendance & absence reports',
                  'Employee profiles & documents',
                  'Fit note & RTW tracking',
                ].map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 text-sm text-gray-600"
                  >
                    <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={registerUrl}>
                <Button
                  size="lg"
                  className="w-full text-base font-semibold h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25"
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
                Example: a care home with 30 staff ={' '}
                <strong className="text-gray-900">£240/month</strong>
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Ready to replace paper sign-in sheets?
            </h2>
            <p className="mt-4 text-lg text-blue-100 max-w-xl mx-auto">
              Join care homes that have switched to digital attendance
              tracking. Set up in under 5 minutes, free for 14 days.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={registerUrl}>
                <Button
                  size="lg"
                  className="text-base font-semibold px-8 h-12 bg-white text-blue-700 hover:bg-gray-50 shadow-lg shadow-black/10"
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
                Common questions from care home managers about Leavely.
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
