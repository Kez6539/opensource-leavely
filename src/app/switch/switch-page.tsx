'use client'

import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Zap,
  Upload,
  Columns3,
  Rocket,
  CalendarClock,
  ShieldCheck,
  Cloud,
  Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { trackCtaClicked } from '@/lib/analytics'

export type SwitchVariant = 'default' | 'spreadsheet' | 'brighthr'

interface SwitchCopy {
  /** PostHog source tag appended to /try */
  src: string
  /** analytics page name */
  page: string
  badge: string
  h1Lead: string
  h1Highlight: string
  subhead: string
}

const VARIANT_COPY: Record<SwitchVariant, SwitchCopy> = {
  default: {
    src: 'switch',
    page: 'switch',
    badge: 'Switch to Leavely in minutes',
    h1Lead: 'Moving to a proper leave system?',
    h1Highlight: 'Bring your whole team across in minutes.',
    subhead:
      'Upload the staff list you already have. Leavely maps the columns, imports everyone, and sets up their leave balances for you. No re-typing, no card needed to start.',
  },
  spreadsheet: {
    src: 'switch-spreadsheet',
    page: 'switch-spreadsheet',
    badge: 'Switch from spreadsheets',
    h1Lead: 'Still tracking holiday in a spreadsheet?',
    h1Highlight: 'Move your whole team across in minutes.',
    subhead:
      'Upload the spreadsheet you already have. Leavely maps the columns, imports everyone, and sets up their leave balances for you. No re-typing, no card needed to start.',
  },
  brighthr: {
    src: 'switch-brighthr',
    page: 'switch-brighthr',
    badge: 'Switching from BrightHR?',
    h1Lead: 'Switching from BrightHR?',
    h1Highlight: 'Bring your people, balances and bookings with you.',
    subhead:
      'Export your staff list and upload it to Leavely. We map the columns, import everyone, and set up their leave balances for you. No re-typing, no card needed to start.',
  },
}

const steps = [
  {
    icon: Upload,
    step: '1',
    title: 'Export',
    description:
      'Download from your spreadsheet or current system. We accept .csv and .xlsx — or send us your file and we’ll import it for you.',
  },
  {
    icon: Columns3,
    step: '2',
    title: 'Map',
    description:
      'We auto-detect names, emails, start dates and remaining allowance. Fix any column in one click.',
  },
  {
    icon: Rocket,
    step: '3',
    title: 'Go live',
    description:
      'Everyone’s invited, balances are set, and approvals are ready the same day.',
  },
]

const painPoints = [
  {
    icon: CalendarClock,
    pain: 'Two people booked the same week off and nobody noticed.',
    relief: 'A live team calendar with automatic clash warnings before anything is approved.',
  },
  {
    icon: ShieldCheck,
    pain: 'Allowances are wrong by half a day and you can’t prove why.',
    relief: 'Automatic accrual, pro rata and a full audit trail for every change.',
  },
  {
    icon: Cloud,
    pain: 'It all lives on one person’s laptop.',
    relief: 'Cloud-based, role-based access, UK-hosted. Available to everyone who needs it.',
  },
]

const comparisonRows = [
  {
    feature: 'Time to set up',
    leavely: 'Minutes — import your team from a CSV',
    spreadsheet: 'Hours of manual setup, then constant upkeep',
    suite: 'Onboarding calls and configuration projects',
  },
  {
    feature: 'Cost predictability',
    leavely: 'One simple per-user price, every feature included',
    spreadsheet: '“Free” — but paid for in admin time and errors',
    suite: 'Tiered plans and modules you may not use',
  },
  {
    feature: 'Leave clash detection',
    leavely: 'Built in — warns you before approval',
    spreadsheet: 'None — you have to spot clashes yourself',
    suite: 'Usually included',
  },
  {
    feature: 'Accrual & carryover',
    leavely: 'Automatic, with UK rules built in',
    spreadsheet: 'Manual formulas that break',
    suite: 'Usually included',
  },
  {
    feature: 'Data export on exit',
    leavely: 'Export your data anytime, no lock-in',
    spreadsheet: 'It’s your file already',
    suite: 'Varies by provider',
  },
]

const migrationObjections = [
  {
    q: 'Will I lose my existing leave balances?',
    a: 'No. Your remaining allowance for each person comes across in the import, so balances are correct from day one. If anything needs adjusting, you can fix it in one click.',
  },
  {
    q: 'My spreadsheet is messy — will it still work?',
    a: 'Yes. The importer auto-detects common columns and lets you map the rest. If you’d rather not wrangle it yourself, download our clean CSV template, or just send us your file and we’ll import it for you.',
  },
  {
    q: 'Do I need a credit card to start?',
    a: 'No. You can start your free trial and import your team without entering any card details. Add billing later only if you decide to continue.',
  },
  {
    q: 'How long does switching actually take?',
    a: 'Most teams are live the same day. Export your staff list, upload it, map the columns, and everyone is invited with their balances set.',
  },
  {
    q: 'Is my data safe and UK-hosted?',
    a: 'Yes. Leavely is UK-hosted with role-based access, so the right people see the right information — and it’s no longer sitting on one person’s laptop.',
  },
]

export function SwitchPage({ variant }: { variant: SwitchVariant }) {
  const copy = VARIANT_COPY[variant]
  const tryUrl = `/try?src=${copy.src}`

  return (
    <div className="min-h-screen bg-white">
      <MarketingNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/60 via-white to-white" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-emerald-100/40 to-teal-100/30 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-sm text-emerald-700 font-medium mb-6">
                <Zap className="h-4 w-4" />
                {copy.badge}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                {copy.h1Lead}
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {copy.h1Highlight}
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                {copy.subhead}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href={tryUrl} onClick={() => trackCtaClicked('start_free_import_team', copy.page)}>
                  <Button size="lg" className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30">
                    Start free — import my team <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/leavely-import-template.csv" onClick={() => trackCtaClicked('download_csv_template', copy.page)}>
                  <Button variant="outline" size="lg" className="text-base font-medium px-8 h-12">
                    <Download className="mr-2 h-4 w-4" /> Download CSV template
                  </Button>
                </Link>
              </div>
              {/* Reassurance bar (reuse from backlog card b3a8279d) */}
              <p className="mt-4 text-sm text-gray-400">
                Cancel anytime · No card needed to start · UK-hosted
              </p>
            </div>
          </div>
        </section>

        {/* The 3-step import — the differentiator */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Your team imported in three steps
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                You already have the data. We do the heavy lifting — so you’re up and running today, not next month.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((item) => (
                <div key={item.step} className="rounded-2xl border bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <span className="text-sm font-bold text-emerald-600">Step {item.step}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/leavely-import-template.csv" onClick={() => trackCtaClicked('download_csv_template', copy.page)}>
                <Button variant="outline" size="lg" className="text-base font-medium px-8 h-12">
                  <Download className="mr-2 h-4 w-4" /> Download our CSV template
                </Button>
              </Link>
              <p className="mt-3 text-sm text-gray-400">
                Got a messy sheet? Start from a clean template — or send us your file and we’ll import it for you.
              </p>
            </div>
          </div>
        </section>

        {/* Pain → Relief */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-4">
              The everyday spreadsheet headaches — gone
            </h2>
            <p className="text-lg text-gray-500 max-w-xl mx-auto text-center mb-12">
              If any of these sound familiar, you’ve outgrown the spreadsheet.
            </p>
            <div className="space-y-6">
              {painPoints.map((item) => (
                <div key={item.pain} className="rounded-2xl border bg-white p-6 shadow-sm flex gap-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">“{item.pain}”</p>
                    <p className="mt-1 text-gray-500 leading-relaxed flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{item.relief}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison strip (qualitative — no fabricated claims) */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Leave-focused, not a bundled suite
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                Leavely does leave and absence really well — so you pay only for leave management, not a stack of HR modules you don’t use.
              </p>
            </div>
            <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b bg-gray-50/80">
                    <th className="px-4 py-4 font-semibold text-gray-900"></th>
                    <th className="px-4 py-4 font-bold text-emerald-700">Leavely</th>
                    <th className="px-4 py-4 font-semibold text-gray-500">Spreadsheet</th>
                    <th className="px-4 py-4 font-semibold text-gray-500">Bundled HR suite</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="border-b last:border-0 align-top">
                      <td className="px-4 py-4 font-semibold text-gray-900">{row.feature}</td>
                      <td className="px-4 py-4 text-gray-700">{row.leavely}</td>
                      <td className="px-4 py-4 text-gray-500">{row.spreadsheet}</td>
                      <td className="px-4 py-4 text-gray-500">{row.suite}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Migration objection-killers */}
        <section>
          <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Worried about switching? Don’t be.
            </h2>
            <div className="space-y-6">
              {migrationObjections.map((faq) => (
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

        {/* Bottom CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Bring your team across today
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Upload the list you already have and be live the same day. No card needed to start.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={tryUrl} onClick={() => trackCtaClicked('start_free_import_team', copy.page)}>
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg text-base px-8 h-12">
                  Start free — import my team <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-emerald-100/90">
              Cancel anytime · No card needed to start · UK-hosted
            </p>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
