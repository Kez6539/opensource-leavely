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
  AlertTriangle,
  UtensilsCrossed,
  Wine,
  Coffee,
  Hotel,
  PartyPopper,
  RefreshCw,
  Building,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

/* ─── Page-level SEO metadata ────────────────────────────────────────── */
const pageUrl = `${SITE_URL}/hospitality`

export const metadata: Metadata = {
  title:
    'Staff Management Software for Hospitality | Shift & Leave Tracking — Leavely',
  description:
    'Leavely helps hotels, restaurants, pubs, cafes, and event venues manage staff rotas, shift patterns, and leave. Built for seasonal staff, zero-hour contracts, split shifts, and multi-location teams. Free 14-day trial.',
  alternates: { canonical: pageUrl },
  keywords: [
    'hospitality staff management software',
    'restaurant rota management',
    'hotel shift planning software',
    'pub staff scheduling',
    'hospitality leave tracking',
    'zero-hour contract management',
    'seasonal staff scheduling',
    'hospitality shift rota software',
    'restaurant staff attendance',
    'multi-location hospitality software',
    'hospitality workforce management',
    'cafe staff rota',
    'event venue staff management',
    'split shift management software',
    'hospitality clock in system',
  ],
  openGraph: {
    title: 'Staff Management Software for Hospitality — Leavely',
    description:
      'Shift scheduling, rota management, QR code clock-in, and leave tracking built for hotels, restaurants, pubs, cafes, and event venues. Handle seasonal staff, zero-hour contracts, and multi-site teams.',
    url: pageUrl,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staff Management Software for Hospitality — Leavely',
    description:
      'Shift scheduling, rota management, and leave tracking for hotels, restaurants, pubs, and event venues. Free 14-day trial.',
  },
}

/* ─── JSON-LD Structured Data ────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} for Hospitality`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Staff management software for hotels, restaurants, pubs, cafes, and event venues. Shift scheduling, rota management, QR code clock-in with GPS, leave tracking for zero-hour and seasonal staff, and multi-location support.',
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
        'Shift and rota management',
        'QR code clock-in with GPS verification',
        'Leave tracking for zero-hour and variable-hours staff',
        'Multi-location staff management',
        'Real-time staff attendance dashboard',
        'Holiday accrual for variable-hours workers',
        'Split shift and late-night shift support',
        'Bradford Factor monitoring',
        'Attendance and absence reports',
        'Cloud-based — works on any device',
      ],
      audience: {
        '@type': 'Audience',
        audienceType:
          'Hotels, restaurants, pubs, cafes, bars, event venues, catering companies, hospitality groups',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does Leavely handle shift patterns in hospitality?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leavely supports the irregular shift patterns common in hospitality — early mornings, late nights, split shifts, and rotating rotas. Staff clock in and out by scanning a QR code, and the system records exact hours worked regardless of shift pattern. Managers get a real-time view of who is on shift at each location.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Leavely manage seasonal and temporary staff?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can add seasonal staff in seconds and remove them when the season ends. Holiday entitlement is calculated pro-rata based on actual hours worked, so you stay compliant with employment law even for short-term contracts. There is no minimum commitment per user.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Leavely support zero-hour contract workers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Zero-hour workers accrue holiday based on hours worked (5.6 weeks pro-rata under UK law). Leavely tracks hours via clock-in records and calculates accrued holiday automatically, so you always know what each worker is entitled to.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I manage multiple locations with one account?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. You can set up a QR code for each location — each restaurant, bar, hotel, or venue. Staff clock in at whichever site they are working at, and managers can see real-time attendance across all locations from a single dashboard.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the QR code clock-in work for restaurants and hotels?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You print a QR code poster for each location — for example, one in the kitchen and one at reception. Staff scan it with their phone camera when they arrive and leave. Each scan records the time, date, and GPS location. No special hardware or app download required.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Leavely handle split shifts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. In hospitality, staff often work a lunch service and then return for the evening. Leavely records each clock-in and clock-out separately, so split shifts are tracked accurately. Total hours are calculated across all shifts in a day.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does Leavely help with Working Time Regulations compliance?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leavely records exact working hours for every employee, making it straightforward to evidence compliance with the Working Time Regulations 1998. You can monitor weekly hours, check rest break compliance, and ensure holiday entitlement is calculated correctly — especially important for variable-hours workers.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does Leavely cost for hospitality businesses?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Leavely costs £8 per user per month with all features included — no tiers, no hidden fees. Every account starts with a free 14-day trial, no credit card required. For a restaurant with 20 staff, that is £160 per month.',
          },
        },
      ],
    },
  ],
}

/* ─── FAQ data (rendered on page + in JSON-LD above) ─────────────────── */
const faqs = [
  {
    q: 'How does Leavely handle shift patterns in hospitality?',
    a: 'Leavely supports the irregular shift patterns common in hospitality — early mornings, late nights, split shifts, and rotating rotas. Staff clock in and out by scanning a QR code, and the system records exact hours worked regardless of shift pattern. Managers get a real-time view of who is on shift at each location.',
  },
  {
    q: 'Can Leavely manage seasonal and temporary staff?',
    a: 'Yes. You can add seasonal staff in seconds and remove them when the season ends. Holiday entitlement is calculated pro-rata based on actual hours worked, so you stay compliant with employment law even for short-term contracts. There is no minimum commitment per user.',
  },
  {
    q: 'Does Leavely support zero-hour contract workers?',
    a: 'Yes. Zero-hour workers accrue holiday based on hours worked (5.6 weeks pro-rata under UK law). Leavely tracks hours via clock-in records and calculates accrued holiday automatically, so you always know what each worker is entitled to.',
  },
  {
    q: 'Can I manage multiple locations with one account?',
    a: 'Yes. You can set up a QR code for each location — each restaurant, bar, hotel, or venue. Staff clock in at whichever site they are working at, and managers can see real-time attendance across all locations from a single dashboard.',
  },
  {
    q: 'How does the QR code clock-in work for restaurants and hotels?',
    a: 'You print a QR code poster for each location — for example, one in the kitchen and one at reception. Staff scan it with their phone camera when they arrive and leave. Each scan records the time, date, and GPS location. No special hardware or app download required.',
  },
  {
    q: 'Does Leavely handle split shifts?',
    a: 'Yes. In hospitality, staff often work a lunch service and then return for the evening. Leavely records each clock-in and clock-out separately, so split shifts are tracked accurately. Total hours are calculated across all shifts in a day.',
  },
  {
    q: 'How does Leavely help with Working Time Regulations compliance?',
    a: 'Leavely records exact working hours for every employee, making it straightforward to evidence compliance with the Working Time Regulations 1998. You can monitor weekly hours, check rest break compliance, and ensure holiday entitlement is calculated correctly — especially important for variable-hours workers.',
  },
  {
    q: 'How much does Leavely cost for hospitality businesses?',
    a: 'Leavely costs £8 per user per month with all features included — no tiers, no hidden fees. Every account starts with a free 14-day trial, no credit card required. For a restaurant with 20 staff, that is £160 per month.',
  },
]

/* ─── Solution features ──────────────────────────────────────────────── */
const solutions = [
  {
    icon: QrCode,
    title: 'QR Code Clock-In',
    description:
      'Print a QR code for each venue, kitchen, or site. Staff scan on arrival with their phone — time, date, and GPS coordinates are recorded automatically. Perfect for split shifts and late-night finishes. No hardware, no app downloads.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    bullets: [
      'Unique QR code per location',
      'GPS coordinates captured on every scan',
      'Works on any smartphone camera',
      'Split shift clock-in and clock-out',
    ],
  },
  {
    icon: CalendarDays,
    title: 'Shift & Rota Management',
    description:
      'Create and manage rotas for your hospitality team. Track who is working which shift, manage cover requests, and get real-time visibility of staffing levels across all your locations — from the kitchen to front-of-house.',
    color: 'from-teal-500 to-emerald-600',
    bg: 'bg-teal-50',
    bullets: [
      'Weekly and monthly rota views',
      'Cover requests and shift swaps',
      'Real-time staffing levels per location',
      'Exportable rotas for staff notice boards',
    ],
  },
  {
    icon: RefreshCw,
    title: 'Leave Tracking for Variable Hours',
    description:
      'Hospitality workers often have irregular hours. Leavely calculates holiday accrual based on actual hours worked — fully compliant with UK law for zero-hour contracts, part-time, and seasonal staff. No more spreadsheet calculations.',
    color: 'from-emerald-600 to-teal-700',
    bg: 'bg-emerald-50',
    bullets: [
      'Pro-rata holiday for variable-hours staff',
      'Zero-hour contract accrual tracking',
      'One-click leave approvals',
      'Bradford Factor auto-calculated',
    ],
  },
  {
    icon: Users,
    title: 'Real-Time Staff Visibility',
    description:
      'See who is clocked in right now, at which venue, and for how long. Spot gaps in cover before service starts. Access from your phone, tablet, or desktop — even when you are between sites.',
    color: 'from-teal-600 to-emerald-700',
    bg: 'bg-teal-50',
    bullets: [
      'Live dashboard of who is on shift',
      'Multi-location breakdown',
      'Instant gap detection before service',
      'Works on any device, anywhere',
    ],
  },
  {
    icon: BarChart3,
    title: 'Attendance & Absence Reports',
    description:
      'Pre-built reports for attendance patterns, absence trends, hours worked, and overtime. Export to CSV for payroll or share with your management team. See exactly how your labour costs break down.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    bullets: [
      'Hours worked reports for payroll',
      'Filter by date range, employee, or location',
      'Export to CSV for payroll providers',
      'Trend analysis for absence patterns',
    ],
  },
]

/* ─── Built-for sector list ──────────────────────────────────────────── */
const sectors = [
  {
    icon: Hotel,
    title: 'Hotels',
    description: 'Front desk, housekeeping, kitchen, and management teams',
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurants',
    description: 'Front-of-house, kitchen staff, and split shift management',
  },
  {
    icon: Wine,
    title: 'Pubs & Bars',
    description: 'Evening and weekend staff with variable-hours contracts',
  },
  {
    icon: Coffee,
    title: 'Cafes',
    description: 'Early-morning starts and part-time staff rotas',
  },
  {
    icon: PartyPopper,
    title: 'Event Venues',
    description: 'Seasonal events, temporary staff, and multi-room cover',
  },
]

/* ─── Problem cards ──────────────────────────────────────────────────── */
const problems = [
  {
    icon: RefreshCw,
    title: 'High staff turnover drains time',
    description:
      'Hospitality has the highest turnover rate of any UK sector. Every new starter means more admin — onboarding, rota changes, and holiday calculations. Without a system, it spirals.',
  },
  {
    icon: AlertTriangle,
    title: 'Complex rotas and last-minute changes',
    description:
      'Split shifts, late-night finishes, weekend-heavy patterns, and constant cover requests. Managing rotas on paper or WhatsApp groups leads to gaps, no-shows, and frustrated staff.',
  },
  {
    icon: Clock,
    title: 'No visibility across multiple sites',
    description:
      'Running two restaurants or a hotel group? Without a central system, you cannot tell who is on shift where, whether cover is in place, or how your labour costs compare across sites.',
  },
]

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function HospitalityPage() {
  const registerUrl =
    '/register?utm_source=website&utm_campaign=hospitality'

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
                <UtensilsCrossed className="h-4 w-4" />
                Built for hospitality
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Staff Management Software
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  for Hospitality
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Shift scheduling, QR code clock-in, and leave tracking built
                for hotels, restaurants, pubs, cafes, and event venues. Handle
                seasonal staff, zero-hour contracts, and multi-site teams.
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
                  <p className="text-sm text-gray-500">digital attendance</p>
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
                These are the problems hospitality managers face every day —
                and exactly what Leavely solves.
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
                                  The Crown & Anchor
                                </p>
                                <p className="text-xs text-gray-500">
                                  QR Code — Kitchen Entrance
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
                              GPS verified — 42 High Street, Manchester M1 2AB
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="h-3.5 w-3.5 text-emerald-500" />
                              Clocked in at 10:58 — 24 Mar 2026
                            </div>
                          </div>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Weekly Rota — The Crown & Anchor
                            </p>
                            <div className="space-y-3">
                              {[
                                {
                                  name: 'Jake T.',
                                  role: 'Chef',
                                  shifts: 'Mon–Fri 07:00–15:00',
                                  status: 'Confirmed',
                                },
                                {
                                  name: 'Sophie L.',
                                  role: 'Server',
                                  shifts: 'Wed–Sun 11:00–15:00, 18:00–23:00',
                                  status: 'Confirmed',
                                },
                                {
                                  name: 'Ryan K.',
                                  role: 'Bar Staff',
                                  shifts: 'Fri–Sun 17:00–01:00',
                                  status: 'Cover Needed',
                                },
                              ].map((entry) => (
                                <div
                                  key={entry.name}
                                  className="flex items-center justify-between text-xs border-b pb-2 last:border-0"
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-semibold text-emerald-700">
                                      {entry.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')}
                                    </div>
                                    <div>
                                      <span className="font-medium text-gray-700">
                                        {entry.name}
                                      </span>
                                      <span className="text-gray-400 ml-1">
                                        {entry.role}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-gray-500">
                                      {entry.shifts}
                                    </p>
                                    <p
                                      className={
                                        entry.status === 'Cover Needed'
                                          ? 'text-amber-500 font-medium'
                                          : 'text-gray-400'
                                      }
                                    >
                                      {entry.status}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border p-4">
                            <p className="text-sm font-medium text-gray-900">
                              Split Shift Tracking
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Sophie L. works lunch (11:00–15:00) and evening
                              (18:00–23:00). Both shifts tracked separately with
                              combined daily hours.
                            </p>
                          </div>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Holiday Accrual — Variable Hours
                            </p>
                            <div className="space-y-2">
                              {[
                                {
                                  name: 'Amira R.',
                                  type: 'Zero-Hour',
                                  hours: '124 hrs worked',
                                  accrued: '15.1 hrs accrued',
                                  statusColor:
                                    'bg-emerald-50 text-emerald-600',
                                },
                                {
                                  name: 'Luke P.',
                                  type: 'Part-Time',
                                  hours: '200 hrs worked',
                                  accrued: '24.3 hrs accrued',
                                  statusColor:
                                    'bg-emerald-50 text-emerald-600',
                                },
                                {
                                  name: 'Priya S.',
                                  type: 'Seasonal',
                                  hours: '80 hrs worked',
                                  accrued: '9.7 hrs accrued',
                                  statusColor:
                                    'bg-teal-50 text-teal-600',
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
                                      {req.hours}
                                    </span>
                                    <span
                                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${req.statusColor}`}
                                    >
                                      {req.accrued}
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
                                  UK Law — 5.6 Weeks Pro-Rata
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  Accrual calculated as 12.07% of hours worked
                                </p>
                              </div>
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                                Compliant
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
                                  name: 'Jake T.',
                                  location: 'The Crown & Anchor',
                                  since: '10:58',
                                  status: 'On Shift',
                                },
                                {
                                  name: 'Sophie L.',
                                  location: 'The Crown & Anchor',
                                  since: '11:02',
                                  status: 'On Shift',
                                },
                                {
                                  name: 'Ryan K.',
                                  location: 'The Old Mill',
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
                                      className={`h-2 w-2 rounded-full ${staff.status === 'On Shift' ? 'bg-emerald-500' : 'bg-gray-300'}`}
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
                                Ryan K. has not clocked in at The Old Mill.
                                Evening shift starts at 17:00. Consider
                                arranging cover.
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                      {index === 4 && (
                        <>
                          <div className="bg-white rounded-xl border p-5">
                            <p className="text-sm font-semibold text-gray-900 mb-3">
                              Staff Report — March 2026
                            </p>
                            <div className="space-y-3">
                              {[
                                {
                                  label: 'Total hours worked',
                                  value: '2,840',
                                  trend: '+120 vs Feb',
                                  trendColor: 'text-emerald-500',
                                },
                                {
                                  label: 'Total sick days',
                                  value: '8',
                                  trend: '-2 vs Feb',
                                  trendColor: 'text-emerald-500',
                                },
                                {
                                  label: 'Avg Bradford Factor',
                                  value: '32',
                                  trend: 'Low',
                                  trendColor: 'text-emerald-500',
                                },
                                {
                                  label: 'Attendance rate',
                                  value: '96.8%',
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
                              Export to CSV for payroll, management meetings, or
                              labour cost analysis
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

        {/* ── Compliance Section ── */}
        <section className="bg-gradient-to-br from-emerald-50/60 to-teal-50/40">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Stay compliant without the paperwork
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Hospitality businesses face unique compliance challenges.
                Leavely handles the complexity so you can focus on service.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: 'Working Time Regulations',
                  description:
                    'Automatic tracking of hours worked ensures compliance with the 48-hour weekly limit, rest break requirements, and night worker protections. Digital records ready for any inspection.',
                },
                {
                  icon: CalendarDays,
                  title: 'Holiday Accrual for Variable Hours',
                  description:
                    'Zero-hour and variable-hours workers accrue 5.6 weeks holiday pro-rata. Leavely calculates this automatically from clock-in records — no spreadsheets, no guesswork.',
                },
                {
                  icon: Building,
                  title: 'Multi-Site Record Keeping',
                  description:
                    'Every clock-in, leave request, and absence is logged with timestamps and GPS coordinates. One audit trail across all your venues, accessible from anywhere.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border bg-white p-8 shadow-sm"
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white mb-4 shadow-sm">
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

        {/* ── Built For Section ── */}
        <section>
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Built for every type of hospitality venue
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Whether you run a single cafe or manage a chain of restaurants,
                Leavely fits your workflow.
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

        {/* ── Social Proof Section ── */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Trusted by hospitality teams
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                See how hospitality businesses are using Leavely to simplify
                staff management.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    'We used to manage rotas on WhatsApp and a whiteboard. Leavely replaced all of that — our staff clock in with QR codes and I can see who is on shift from my phone.',
                  name: 'Restaurant Manager',
                  venue: 'Independent Restaurant, Manchester',
                },
                {
                  quote:
                    'With zero-hour staff, calculating holiday entitlement was a nightmare. Leavely does it automatically based on hours worked. No more spreadsheet errors.',
                  name: 'Operations Manager',
                  venue: 'Pub Group, 4 Locations',
                },
                {
                  quote:
                    'Running three venues, I needed one place to see all my staff. The multi-location dashboard means I spot cover gaps before they become problems.',
                  name: 'General Manager',
                  venue: 'Hotel & Events Group, Birmingham',
                },
              ].map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="rounded-2xl border bg-white p-8 shadow-sm"
                >
                  <p className="text-gray-600 text-sm leading-relaxed italic mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.venue}
                    </p>
                  </div>
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
                Billed monthly based on active employee count
              </p>
              <ul className="text-left space-y-3 mb-8">
                {[
                  'Everything included — no tiers',
                  'QR code clock-in with GPS',
                  'Shift & rota management',
                  'Leave management & approvals',
                  'Holiday accrual for variable hours',
                  'Multi-location support',
                  'Attendance & absence reports',
                  'Employee profiles & documents',
                  'Bradford Factor monitoring',
                  'Real-time staff dashboard',
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
                Example: a restaurant with 20 staff ={' '}
                <strong className="text-gray-900">£160/month</strong>
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
              Ready to simplify staff management?
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Join hospitality businesses that have switched to digital
              attendance and leave tracking. Set up in under 5 minutes, free
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
                Common questions from hospitality managers about Leavely.
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
