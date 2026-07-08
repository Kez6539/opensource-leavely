import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CalendarCheck, CheckCircle2, FileWarning, ShieldCheck, type LucideIcon, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingFooter, MarketingNav } from '@/components/marketing-layout'
import { SITE_NAME, SITE_URL } from '@/lib/seo'
import { RoiCalculator } from '@/app/tools/roi-calculator/calculator'

const pageUrl = `${SITE_URL}/why-leavely-vs-excel-spreadsheets`
const trialUrl = '/register?utm_source=website&utm_campaign=leavely_vs_excel'

export const metadata: Metadata = {
  title: 'Why Leavely vs Excel Spreadsheets for Leave Tracking UK',
  description:
    'Compare Leavely with Excel and Google Sheets for staff holiday tracking. See why UK teams replace leave spreadsheets with live balances, approvals, clash detection, and audit trails.',
  alternates: { canonical: pageUrl },
  keywords: [
    'Leavely vs Excel',
    'Leavely vs spreadsheets',
    'Excel holiday tracker alternative',
    'spreadsheet leave tracker alternative',
    'replace holiday spreadsheet',
    'annual leave spreadsheet alternative',
    'staff holiday spreadsheet alternative',
    'leave management software vs spreadsheet',
  ],
  openGraph: {
    title: 'Why Leavely vs Excel Spreadsheets',
    description:
      'Excel leave trackers look simple until balances, approvals, clashes, and audit trails become manual admin. Compare Leavely with spreadsheets.',
    url: pageUrl,
    type: 'website',
  },
}

const comparisonRows = [
  { feature: 'Employees request annual leave themselves', leavely: true, spreadsheet: 'Usually email or chat' },
  { feature: 'Manager approvals are recorded automatically', leavely: true, spreadsheet: 'Manual copy and paste' },
  { feature: 'Live holiday balance calculations', leavely: true, spreadsheet: 'Formula dependent' },
  { feature: 'Pro-rata entitlement for starters and leavers', leavely: true, spreadsheet: 'Manual calculation' },
  { feature: 'UK bank holidays built in', leavely: true, spreadsheet: 'Template dependent' },
  { feature: 'Team calendar with clash visibility', leavely: true, spreadsheet: 'Static view' },
  { feature: 'Restricted dates and blackout periods', leavely: true, spreadsheet: false },
  { feature: 'Sickness absence and Bradford Factor tracking', leavely: true, spreadsheet: 'Separate sheet' },
  { feature: 'Return-to-work records', leavely: true, spreadsheet: false },
  { feature: 'TOIL tracking', leavely: true, spreadsheet: 'Manual tracking' },
  { feature: 'Role-based access for managers and employees', leavely: true, spreadsheet: false },
  { feature: 'Full audit trail for requests and changes', leavely: true, spreadsheet: false },
  { feature: 'Employee self-service balances', leavely: true, spreadsheet: false },
  { feature: 'Works without broken copies or stale versions', leavely: true, spreadsheet: false },
] satisfies Array<{
  feature: string
  leavely: boolean
  spreadsheet: boolean | string
}>

const painPoints = [
  {
    title: 'Formula errors hide in plain sight',
    copy:
      'One overwritten cell can change a balance, miss a deduction, or make a part-time calculation wrong. Leavely calculates balances from the same source of truth every time.',
    icon: FileWarning,
  },
  {
    title: 'Approvals get scattered',
    copy:
      'Spreadsheet trackers usually rely on email, Slack, Teams, or verbal approval. Leavely keeps the request, decision, approver, and change history together.',
    icon: ShieldCheck,
  },
  {
    title: 'Clashes are hard to spot early',
    copy:
      'A static sheet can show dates, but it rarely warns managers before too many people are away. Leavely gives teams a live calendar built for absence planning.',
    icon: CalendarCheck,
  },
] satisfies Array<{
  title: string
  copy: string
  icon: LucideIcon
}>

const migrationSteps = [
  'Create your Leavely workspace and choose the leave year.',
  'Add employees, departments, managers, and standard entitlement.',
  'Check opening balances against the spreadsheet once.',
  'Invite employees to request future leave in Leavely.',
  'Keep the old spreadsheet as a read-only archive.',
]

const roiReasons = [
  'Fewer manual balance checks before approval.',
  'Less time updating spreadsheets after every change.',
  'Fewer employee questions about remaining allowance.',
  'Less rework from formula, version, and copy errors.',
]

const faqs = [
  {
    q: 'Is Excel enough for annual leave tracking?',
    a: 'Excel can work for very small teams with one manager and simple entitlement rules. As soon as approvals, part-time staff, sickness, TOIL, carry over, or multiple managers are involved, a dedicated leave management system reduces manual checking and audit risk.',
  },
  {
    q: 'Can Leavely replace our holiday spreadsheet?',
    a: 'Yes. Leavely replaces the spreadsheet workflow with employee requests, manager approvals, live balances, team calendars, sickness tracking, TOIL, and a full audit trail.',
  },
  {
    q: 'Do employees need access to the spreadsheet?',
    a: 'No. In Leavely, employees can check their own balance and request leave from their account, while managers keep control of approvals and team visibility.',
  },
  {
    q: 'How long does it take to move from Excel to Leavely?',
    a: 'Most small teams can set up Leavely in one session by adding employees, leave year settings, opening balances, and managers. The old spreadsheet can remain as an archive.',
  },
] satisfies Array<{
  q: string
  a: string
}>

function ComparisonCell({ value }: { value: boolean | string }) {
  if (value === true) {
    return <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-500" aria-label="Included" />
  }

  if (value === false) {
    return <X className="mx-auto h-5 w-5 text-red-300" aria-label="Not included" />
  }

  return <span className="text-sm font-medium text-amber-700">{value}</span>
}

export default function WhyLeavelyVsExcelSpreadsheetsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: `${SITE_NAME} leave management software`,
        url: pageUrl,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description:
          'Leavely is a leave management software alternative to Excel and Google Sheets holiday trackers for UK teams.',
        offers: {
          '@type': 'Offer',
          price: '8.00',
          priceCurrency: 'GBP',
          availability: 'https://schema.org/InStock',
          description: 'Per user per month with a 14-day free trial.',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
      {
        '@type': 'WebPage',
        name: 'Why Leavely vs Excel Spreadsheets',
        url: pageUrl,
        description:
          'A landing page comparing Leavely with Excel and Google Sheets for staff leave tracking, including a feature comparison and ROI calculator.',
        datePublished: '2026-06-28',
        dateModified: '2026-06-28',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/60 via-white to-white" />
          <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-20 text-center md:pb-16 md:pt-28">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-700">
              Excel holiday tracker alternative
            </p>
            <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Why Leavely beats Excel spreadsheets for staff leave tracking
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-500 md:text-xl">
              Spreadsheets look free until managers spend hours checking formulas, chasing approvals, updating balances,
              and proving who agreed what. Leavely gives UK teams live leave balances, one-click approvals, clash
              detection, sickness tracking, and a proper audit trail.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={trialUrl}>
                <Button size="lg" className="h-12 px-8 text-base font-semibold">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#roi-calculator">
                <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold">
                  Calculate ROI
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-400">14-day free trial. No credit card required.</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-4 px-6 pb-16 md:grid-cols-3">
          {painPoints.map((point) => {
            const Icon = point.icon

            return (
              <div key={point.title} className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50">
                  <Icon className="h-5 w-5 text-emerald-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">{point.title}</h2>
                <p className="mt-3 text-sm leading-6 text-gray-600">{point.copy}</p>
              </div>
            )
          })}
        </section>

        <section className="border-y bg-gray-50/70">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                Leavely vs Excel spreadsheets: feature comparison
              </h2>
              <p className="mt-4 text-gray-500">
                A spreadsheet stores data. Leavely manages the full leave workflow from request to audit trail.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="px-6 py-4 text-left font-semibold text-gray-700">Feature</th>
                      <th className="w-40 bg-emerald-50/70 px-6 py-4 text-center font-semibold text-emerald-700">
                        Leavely
                      </th>
                      <th className="w-48 px-6 py-4 text-center font-semibold text-gray-500">Excel or Sheets</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, index) => (
                      <tr key={row.feature} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}>
                        <td className="px-6 py-4 font-medium text-gray-700">{row.feature}</td>
                        <td className="bg-emerald-50/30 px-6 py-4 text-center">
                          <ComparisonCell value={row.leavely} />
                        </td>
                        <td className="px-6 py-4 text-center">
                          <ComparisonCell value={row.spreadsheet} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section id="roi-calculator" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-emerald-700">
              ROI calculator
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              See what the spreadsheet is really costing
            </h2>
            <p className="mt-4 text-gray-500">
              The file may be free, but every request still creates admin work. Use your team size and hourly cost to
              estimate the annual saving from moving leave approvals, balances, and absence records into Leavely.
            </p>
          </div>

          <RoiCalculator />

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {roiReasons.map((reason) => (
              <div key={reason} className="rounded-xl border bg-white p-5 text-sm font-medium leading-6 text-gray-700 shadow-sm">
                <CheckCircle2 className="mb-3 h-5 w-5 text-emerald-500" />
                {reason}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1fr_0.9fr] md:py-20">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              When it is time to move away from a holiday spreadsheet
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              Excel can be useful for a tiny team with simple rules. The warning signs appear when managers have to
              check copied versions, fix broken formulas, answer balance questions, or search email threads to prove an
              approval happened.
            </p>
            <p className="mt-4 leading-7 text-gray-600">
              Leavely is built for the point where leave tracking needs to be a reliable workflow, not a file someone
              remembers to update. Employees request time off, managers approve it, balances update automatically, and
              every change is recorded.
            </p>
          </div>
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900">Simple migration plan</h3>
            <ol className="mt-5 space-y-4">
              {migrationSteps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                    {index + 1}
                  </span>
                  <span className="pt-0.5 text-sm leading-6 text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-emerald-600">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Replace your holiday spreadsheet with Leavely
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-50">
              Keep the simplicity your team wants, but remove the manual checks, version control problems, and missing
              audit trail.
            </p>
            <div className="mt-8">
              <Link href={`${trialUrl}_cta`}>
                <Button size="lg" className="h-12 bg-white px-8 text-base font-semibold text-emerald-700 hover:bg-gray-50">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">FAQs</h2>
          <div className="mt-8 divide-y rounded-xl border bg-white">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-6">
                <h3 className="font-bold text-gray-900">{faq.q}</h3>
                <p className="mt-3 leading-7 text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
