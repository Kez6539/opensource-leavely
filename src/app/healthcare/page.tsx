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
  Stethoscope,
  AlertTriangle,
  Briefcase,
  Activity,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

/* ─── Page-level SEO metadata ────────────────────────────────────────── */
const pageUrl = `${SITE_URL}/healthcare`

export const metadata: Metadata = {
  title:
    'Staff Management Software for Healthcare | GP Surgery & Clinic Leave Tracking — Leavely',
  description:
    'Leavely helps GP surgeries, dental practices, private clinics, and healthcare providers manage staff leave, absence tracking, and compliance. Bradford Factor monitoring, locum cost reduction, multi-site visibility. Free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'GP surgery staff management',
    'dental practice leave management',
    'healthcare absence tracking',
    'clinic staff scheduling',
    'CQC compliant healthcare software',
    'locum management software',
    'NHS staff leave tracker',
    'GP surgery absence management',
    'dental practice staff software',
    'private clinic leave tracking',
    'healthcare Bradford Factor',
    'physiotherapy staff management',
    'optician staff scheduling',
    'GDC compliant dental software',
    'healthcare staff rota software',
  ],
  openGraph: {
    title: 'Staff Management Software for Healthcare — Leavely',
    description:
      'Leave management, absence tracking, and Bradford Factor monitoring for GP surgeries, dental practices, and private clinics. Reduce locum costs and stay CQC/GDC compliant.',
    url: pageUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staff Management Software for Healthcare — Leavely',
    description:
      'Leave management, absence tracking, and Bradford Factor monitoring for GP surgeries, dental practices, and private clinics. Reduce locum costs and stay CQC/GDC compliant.',
  },
}

/* ─── JSON-LD Structured Data ────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} for Healthcare`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Staff management software for GP surgeries, dental practices, private clinics, and healthcare providers. Leave management, absence tracking, Bradford Factor monitoring, and CQC/GDC compliance support.',
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
        'Leave management for clinical and non-clinical staff',
        'Bradford Factor monitoring and alerts',
        'Locum and agency staff tracking',
        'CQC and GDC compliance support',
        'Real-time staff visibility across sites',
        'Absence reports and trend analysis',
        'One-click leave approvals',
        'Role-based access control',
        'Multi-site management',
        'Cloud-based — works on any device',
      ],
      audience: {
        '@type': 'Audience',
        audienceType:
          'GP surgeries, dental practices, private clinics, physiotherapy practices, opticians, healthcare providers',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Does Leavely work for both NHS and private healthcare providers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely works for NHS GP surgeries, private dental practices, independent clinics, and any healthcare provider that needs to manage staff leave and absences. The system is flexible enough to handle NHS terms and conditions as well as private sector employment policies.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Leavely help reduce our locum and agency costs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely gives practice managers visibility of upcoming leave and absence patterns so they can plan ahead rather than booking expensive last-minute locum cover. Bradford Factor monitoring identifies staff with recurring short-term absences so you can address issues early, before they drive up locum spend.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Leavely support CQC compliance for clinics?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'CQC expects healthcare providers to maintain safe staffing levels and evidence how they manage workforce capacity. Leavely provides a complete digital audit trail of all leave requests, approvals, and absences — giving you inspection-ready evidence that staffing was properly managed.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can dental practices use Leavely for GDC compliance?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Dental practices need to ensure adequate staff coverage for patient safety. Leavely helps practice managers track who is available, manage leave fairly across dentists, hygienists, and nurses, and maintain records that support GDC requirements around safe staffing.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Leavely handle different leave allowances for different roles?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can create separate leave policies for different roles — for example, GPs might have different allowances from practice nurses, receptionists, or healthcare assistants. Each policy can have its own allowance, approval workflow, and rules.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I manage multiple surgeries or clinics from one account?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely supports multi-site management. You can create separate locations for each surgery or clinic, assign staff to specific sites, and view absence data across your entire organisation or filtered by individual site.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Leavely track the Bradford Factor for healthcare staff?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Leavely automatically calculates the Bradford Factor for every employee based on their sick leave records. This helps practice managers identify patterns of short-term absence that may indicate deeper issues and supports fair, consistent absence management across the team.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does Leavely cost for a GP surgery or dental practice?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leavely costs £8 per user per month with all features included — no tiers, no hidden fees. Every account starts with a free 14-day trial, no credit card required. For a GP surgery with 20 staff, that is £160 per month.',
          },
        },
      ],
    },
  ],
}

/* ─── FAQ data (rendered on page + in JSON-LD above) ─────────────────── */
const faqs = [
  {
    q: 'Does Leavely work for both NHS and private healthcare providers?',
    a: 'Yes. Leavely works for NHS GP surgeries, private dental practices, independent clinics, and any healthcare provider that needs to manage staff leave and absences. The system is flexible enough to handle NHS terms and conditions as well as private sector employment policies.',
  },
  {
    q: 'Can Leavely help reduce our locum and agency costs?',
    a: 'Yes. Leavely gives practice managers visibility of upcoming leave and absence patterns so they can plan ahead rather than booking expensive last-minute locum cover. Bradford Factor monitoring identifies staff with recurring short-term absences so you can address issues early, before they drive up locum spend.',
  },
  {
    q: 'How does Leavely support CQC compliance for clinics?',
    a: 'CQC expects healthcare providers to maintain safe staffing levels and evidence how they manage workforce capacity. Leavely provides a complete digital audit trail of all leave requests, approvals, and absences &mdash; giving you inspection-ready evidence that staffing was properly managed.',
  },
  {
    q: 'Can dental practices use Leavely for GDC compliance?',
    a: 'Yes. Dental practices need to ensure adequate staff coverage for patient safety. Leavely helps practice managers track who is available, manage leave fairly across dentists, hygienists, and nurses, and maintain records that support GDC requirements around safe staffing.',
  },
  {
    q: 'Does Leavely handle different leave allowances for different roles?',
    a: 'Yes. You can create separate leave policies for different roles &mdash; for example, GPs might have different allowances from practice nurses, receptionists, or healthcare assistants. Each policy can have its own allowance, approval workflow, and rules.',
  },
  {
    q: 'Can I manage multiple surgeries or clinics from one account?',
    a: 'Yes. Leavely supports multi-site management. You can create separate locations for each surgery or clinic, assign staff to specific sites, and view absence data across your entire organisation or filtered by individual site.',
  },
  {
    q: 'Does Leavely track the Bradford Factor for healthcare staff?',
    a: 'Yes. Leavely automatically calculates the Bradford Factor for every employee based on their sick leave records. This helps practice managers identify patterns of short-term absence that may indicate deeper issues and supports fair, consistent absence management across the team.',
  },
  {
    q: 'How much does Leavely cost for a GP surgery or dental practice?',
    a: 'Leavely costs &pound;8 per user per month with all features included &mdash; no tiers, no hidden fees. Every account starts with a free 14-day trial, no credit card required. For a GP surgery with 20 staff, that is &pound;160 per month.',
  },
]

/* ─── Solution features ──────────────────────────────────────────────── */
const solutions = [
  {
    icon: CalendarDays,
    title: 'Leave Management for Clinical Staff',
    description:
      'Manage annual leave, sick leave, study leave, and compassionate leave across GPs, nurses, dentists, hygienists, receptionists, and support staff. Staff request leave from their phone. Managers approve in one click.',
    color: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-50',
    bullets: [
      'Separate policies for clinical and non-clinical staff',
      'One-click leave approvals from any device',
      'Automatic balance tracking per leave type',
      'Leave calendar with team-wide visibility',
    ],
  },
  {
    icon: Briefcase,
    title: 'Locum & Agency Staff Tracking',
    description:
      'Track when locum GPs, agency nurses, or temporary dental staff are covering shifts. See at a glance who is covering what, how often you rely on agency cover, and what it costs your practice.',
    color: 'from-blue-500 to-sky-600',
    bg: 'bg-blue-50',
    bullets: [
      'Log locum and agency cover against absences',
      'Track cover frequency by role and site',
      'Identify patterns driving locum reliance',
      'Data to support business cases for permanent hires',
    ],
  },
  {
    icon: Shield,
    title: 'CQC & GDC Compliance Support',
    description:
      'CQC and GDC expect healthcare providers to maintain safe staffing levels. Leavely creates a digital audit trail for every leave request, approval, and absence &mdash; giving you inspection-ready evidence that staffing was properly managed.',
    color: 'from-sky-600 to-blue-700',
    bg: 'bg-sky-50',
    bullets: [
      'Digital audit trail for every leave action',
      'Immutable records with timestamps and user attribution',
      'Evidence of how absences were covered',
      'Exportable reports for CQC or GDC inspectors',
    ],
  },
  {
    icon: Users,
    title: 'Real-Time Staff Visibility Across Sites',
    description:
      'See who is on leave today, who is available, and whether you have enough clinical cover &mdash; across one surgery or multiple sites. Access from your phone, tablet, or desktop, even when you&apos;re not in the practice.',
    color: 'from-blue-600 to-sky-700',
    bg: 'bg-blue-50',
    bullets: [
      'Live dashboard of who is in and who is off',
      'Multi-site view for practice groups',
      'Instant gap detection for clinical cover',
      'Works on any device, anywhere',
    ],
  },
  {
    icon: BarChart3,
    title: 'Absence Reports & Bradford Factor',
    description:
      'Pre-built reports for absence trends, Bradford Factor scores, and leave usage by role, site, or time period. Spot patterns early, reduce locum costs, and share data with your practice partners or board.',
    color: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-50',
    bullets: [
      'Bradford Factor auto-calculated for every employee',
      'Filter by role, site, date range, or leave type',
      'Export to CSV for payroll or management reports',
      'Trend analysis to forecast staffing needs',
    ],
  },
]

/* ─── Built-for sector list ──────────────────────────────────────────── */
const sectors = [
  {
    icon: Stethoscope,
    title: 'GP Surgeries',
    description: 'NHS and private GP practices with clinical and admin teams',
  },
  {
    icon: Heart,
    title: 'Dental Practices',
    description: 'Dental surgeries managing dentists, hygienists, and nurses',
  },
  {
    icon: Building2,
    title: 'Private Clinics',
    description: 'Specialist clinics and private healthcare providers',
  },
  {
    icon: Activity,
    title: 'Physiotherapy',
    description: 'Physio practices and rehabilitation centres with multi-site teams',
  },
  {
    icon: MapPin,
    title: 'Opticians',
    description: 'Optometry practices managing optometrists and dispensing staff',
  },
]

/* ─── Problem cards ──────────────────────────────────────────────────── */
const problems = [
  {
    icon: Briefcase,
    title: 'Locum costs spiral from poor absence management',
    description:
      'When you can&apos;t see absences coming, you end up booking expensive last-minute locum or agency cover. A single locum GP day can cost &pound;1,500+ &mdash; and most practices have no visibility of what drives that spend.',
  },
  {
    icon: AlertTriangle,
    title: 'Compliance gaps in staffing records',
    description:
      'CQC and GDC inspectors expect evidence of safe staffing. Without a digital system, practices rely on spreadsheets, emails, and paper diaries that are incomplete, inconsistent, and hard to audit.',
  },
  {
    icon: FileText,
    title: 'No visibility across multiple sites',
    description:
      'Practice groups and multi-site clinics struggle to see who is off, who is available, and whether clinical cover is adequate &mdash; especially when relying on WhatsApp messages and shared spreadsheets.',
  },
]

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function HealthcarePage() {
  const registerUrl =
    '/register?utm_source=website&utm_campaign=healthcare'

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
          {/* Background decoration — sky/blue accent */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-50/60 via-white to-white" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-sky-100/40 to-blue-100/30 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-sky-50 border border-sky-200 px-4 py-1.5 text-sm text-sky-700 font-medium mb-6">
                <Stethoscope className="h-4 w-4" />
                Built for healthcare
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Staff Management Software
                <br />
                <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                  for Healthcare
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Leave management, absence tracking, and Bradford Factor
                monitoring for GP surgeries, dental practices, and private
                clinics. Reduce locum costs and stay compliant.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href={registerUrl}>
                  <Button
                    size="lg"
                    className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl hover:shadow-sky-500/30"
                  >
                    Start free trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/#features">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-base font-medium px-8 h-12"
                  >
                    See features
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-400">
                Free 14-day trial. No credit card required.
              </p>
              <div className="flex items-center gap-6 justify-center mt-6">
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-sky-600">
                    &pound;1,500+
                  </p>
                  <p className="text-sm text-gray-500">avg locum cost/day</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-sky-600">
                    &lt; 5 min
                  </p>
                  <p className="text-sm text-gray-500">setup time</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-sky-600">
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
                These are the problems practice managers and clinic owners face
                every day &mdash; and exactly what Leavely solves.
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
                          <CheckCircle2 className="h-5 w-5 text-sky-500 flex-shrink-0" />
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
                                  name: 'Dr. Patel',
                                  type: 'Annual Leave',
                                  dates: '7 – 11 Apr',
                                  status: 'Pending',
                                  statusColor:
                                    'bg-amber-50 text-amber-600',
                                },
                                {
                                  name: 'Nurse Chen',
                                  type: 'Study Leave',
                                  dates: '14 Apr',
                                  status: 'Approved',
                                  statusColor:
                                    'bg-sky-50 text-sky-600',
                                },
                                {
                                  name: 'Sarah K.',
                                  type: 'Sick Leave',
                                  dates: 'Today',
                                  status: 'Logged',
                                  statusColor:
                                    'bg-red-50 text-red-500',
                                },
                              ].map((req) => (
                                <div
                                  key={req.name}
                                  className="flex items-center justify-between text-xs py-2 border-b last:border-0"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-sky-100 flex items-center justify-center text-[10px] font-semibold text-sky-700">
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
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                              <CalendarDays className="h-3.5 w-3.5 text-sky-500" />
                              4 leave types configured for this practice
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                              <Users className="h-3.5 w-3.5 text-sky-500" />
                              Separate policies for GPs, nurses, and admin
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                              <QrCode className="h-3.5 w-3.5 text-sky-500" />
                              Optional QR clock-in for shift-based staff
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="h-3.5 w-3.5 text-sky-500" />
                              Real-time updates as requests come in
                            </div>
                          </div>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Locum Cover Log
                            </p>
                            <div className="space-y-3">
                              {[
                                {
                                  role: 'Locum GP',
                                  covering: 'Dr. Patel',
                                  dates: '7 – 11 Apr',
                                  cost: '&pound;7,500',
                                },
                                {
                                  role: 'Agency Nurse',
                                  covering: 'Nurse Chen',
                                  dates: '14 Apr',
                                  cost: '&pound;350',
                                },
                                {
                                  role: 'Locum Dentist',
                                  covering: 'Dr. Ahmed',
                                  dates: '21 – 22 Apr',
                                  cost: '&pound;2,400',
                                },
                              ].map((entry) => (
                                <div
                                  key={`${entry.role}-${entry.covering}`}
                                  className="flex items-center justify-between text-xs border-b pb-2 last:border-0"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-semibold text-blue-700">
                                      <Briefcase className="h-3 w-3" />
                                    </div>
                                    <div>
                                      <span className="font-medium text-gray-700">
                                        {entry.role}
                                      </span>
                                      <span className="text-gray-400 ml-1">
                                        for {entry.covering}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-gray-500">
                                      {entry.dates}
                                    </p>
                                    <p
                                      className="text-gray-700 font-medium"
                                      dangerouslySetInnerHTML={{
                                        __html: entry.cost,
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4">
                            <p className="text-sm font-medium text-gray-900">
                              April locum spend
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              &pound;10,250 across 3 bookings. Track patterns
                              to reduce reliance on agency cover.
                            </p>
                          </div>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Digital Audit Trail
                            </p>
                            <div className="space-y-3">
                              {[
                                {
                                  action: 'Leave Approved',
                                  user: 'Dr. Patel',
                                  time: '09:12',
                                  detail: 'Annual leave — 5 days',
                                },
                                {
                                  action: 'Sick Leave Logged',
                                  user: 'Sarah K.',
                                  time: '07:45',
                                  detail: 'Self-certified — 1 day',
                                },
                                {
                                  action: 'Leave Rejected',
                                  user: 'Tom H.',
                                  time: '14:30',
                                  detail: 'Insufficient cover',
                                },
                              ].map((entry) => (
                                <div
                                  key={`${entry.user}-${entry.action}`}
                                  className="flex items-center justify-between text-xs border-b pb-2 last:border-0"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-sky-100 flex items-center justify-center text-[10px] font-semibold text-sky-700">
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
                              CQC &amp; GDC Ready
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Every leave action is recorded with timestamps
                              and user attribution. Export reports for
                              inspectors at any time.
                            </p>
                          </div>
                        </>
                      )}
                      {index === 3 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Today&apos;s Staff Overview
                            </p>
                            <div className="space-y-2">
                              {[
                                {
                                  name: 'Dr. Patel',
                                  location: 'Main Surgery',
                                  role: 'GP',
                                  status: 'Available',
                                },
                                {
                                  name: 'Nurse Chen',
                                  location: 'Branch Surgery',
                                  role: 'Practice Nurse',
                                  status: 'On Leave',
                                },
                                {
                                  name: 'Dr. Williams',
                                  location: 'Main Surgery',
                                  role: 'GP',
                                  status: 'Available',
                                },
                                {
                                  name: 'Sarah K.',
                                  location: 'Main Surgery',
                                  role: 'Receptionist',
                                  status: 'Sick',
                                },
                              ].map((staff) => (
                                <div
                                  key={staff.name}
                                  className="flex items-center justify-between text-xs py-2 border-b last:border-0"
                                >
                                  <div className="flex items-center gap-2">
                                    <div
                                      className={`h-2 w-2 rounded-full ${staff.status === 'Available' ? 'bg-sky-500' : staff.status === 'On Leave' ? 'bg-amber-400' : 'bg-red-400'}`}
                                    />
                                    <span className="font-medium text-gray-700">
                                      {staff.name}
                                    </span>
                                    <span className="text-gray-400">
                                      {staff.role}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="text-gray-400">
                                      {staff.location}
                                    </span>
                                    <span
                                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                                        staff.status === 'Available'
                                          ? 'bg-sky-50 text-sky-600'
                                          : staff.status === 'On Leave'
                                            ? 'bg-amber-50 text-amber-600'
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
                                Cover needed at Branch Surgery
                              </p>
                              <p className="text-xs text-gray-500">
                                Nurse Chen is on leave and no cover has been
                                arranged. Consider booking agency nurse.
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
                                  value: '11',
                                  trend: '+2 vs Feb',
                                  trendColor: 'text-red-500',
                                },
                                {
                                  label: 'Locum days booked',
                                  value: '8',
                                  trend: '+3 vs Feb',
                                  trendColor: 'text-red-500',
                                },
                                {
                                  label: 'Avg Bradford Factor',
                                  value: '54',
                                  trend: 'Medium',
                                  trendColor: 'text-amber-500',
                                },
                                {
                                  label: 'Leave utilisation',
                                  value: '72%',
                                  trend: 'On track',
                                  trendColor: 'text-sky-500',
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
                              Export to CSV for payroll, CQC reports, or
                              practice partner meetings
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
        <section className="bg-gradient-to-br from-sky-50/60 to-blue-50/40">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Built for every type of healthcare provider
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Whether you run a single GP surgery or manage a group of
                clinics, Leavely fits your workflow.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {sectors.map((sector) => (
                <div
                  key={sector.title}
                  className="rounded-2xl border bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white mb-4 shadow-sm">
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
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              The cost of poor absence management
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              Unplanned absences hit healthcare providers harder than most
              industries. Every gap in cover means locum costs or cancelled
              appointments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
              <p className="text-4xl font-extrabold text-sky-600 mb-2">
                &pound;1,500+
              </p>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Average locum GP cost per day
              </p>
              <p className="text-xs text-gray-500">
                Last-minute bookings cost even more. Visibility of upcoming
                absences lets you plan ahead and negotiate better rates.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
              <p className="text-4xl font-extrabold text-sky-600 mb-2">
                8.4 days
              </p>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Average sick days per NHS employee per year
              </p>
              <p className="text-xs text-gray-500">
                Higher than the UK average. Bradford Factor monitoring helps
                you identify and address patterns early.
              </p>
            </div>
            <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
              <p className="text-4xl font-extrabold text-sky-600 mb-2">
                37%
              </p>
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Of GP practices report staffing as their biggest challenge
              </p>
              <p className="text-xs text-gray-500">
                Better absence management means fewer gaps, less reliance on
                agency staff, and a more resilient workforce.
              </p>
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
              <div className="rounded-2xl border-2 border-sky-500 bg-white p-8 shadow-xl shadow-sky-500/10 text-center">
                <p className="text-sm font-semibold text-sky-600 uppercase tracking-wider mb-2">
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
                    'Everything included — no tiers',
                    'Leave management & approvals',
                    'Bradford Factor monitoring',
                    'CQC & GDC compliance support',
                    'Multi-site management',
                    'Absence reports & trend analysis',
                    'Employee profiles & documents',
                    'Locum & agency tracking',
                    'Role-based access control',
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-gray-600"
                    >
                      <CheckCircle2 className="h-4 w-4 text-sky-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={registerUrl}>
                  <Button
                    size="lg"
                    className="w-full text-base font-semibold h-12 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 shadow-lg shadow-sky-500/25"
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
                  Example: a GP surgery with 20 staff ={' '}
                  <strong className="text-gray-900">&pound;160/month</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-sky-500 to-blue-600" />
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Ready to take control of staff absences?
            </h2>
            <p className="mt-4 text-lg text-sky-100 max-w-xl mx-auto">
              Join GP surgeries, dental practices, and clinics that have
              switched to Leavely. Set up in under 5 minutes, free for 14
              days.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={registerUrl}>
                <Button
                  size="lg"
                  className="text-base font-semibold px-8 h-12 bg-white text-sky-700 hover:bg-gray-50 shadow-lg shadow-black/10"
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
                Common questions from practice managers and clinic owners
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
