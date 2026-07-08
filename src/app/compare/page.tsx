import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Compare Leavely vs Other Leave Management Software UK',
  description:
    'See how Leavely compares to spreadsheets, Timetastic, BrightHR, Breathe HR, Charlie HR, WhosOff, Personio, Sage HR, Natural HR, absence.io, Holiday Tracker, BambooHR, Factorial, HiBob, Calamari, and Zoho People. Feature-by-feature comparison of UK leave management software — pricing, features, and what\'s included.',
  alternates: { canonical: `${SITE_URL}/compare` },
  keywords: [
    'leave management software comparison UK',
    'spreadsheet leave tracker alternative',
    'Excel holiday tracker alternative',
    'Timetastic alternative',
    'BrightHR alternative',
    'Breathe HR alternative',
    'Charlie HR alternative',
    'WhosOff alternative',
    'Personio alternative',
    'Sage HR alternative',
    'Natural HR alternative',
    'absence.io alternative',
    'Holiday Tracker alternative',
    'BambooHR alternative',
    'Factorial alternative',
    'HiBob alternative',
    'Calamari alternative',
    'Zoho People alternative',
    'best leave management software UK',
    'leave tracker comparison',
    'absence management software comparison',
  ],
  openGraph: {
    title: 'Compare Leavely vs UK Leave Management Software',
    description:
      'Feature-by-feature comparison: Leavely vs spreadsheets, Timetastic, BrightHR, Breathe HR, Charlie HR, WhosOff, Personio, Sage HR, Natural HR, absence.io, Holiday Tracker, BambooHR, Factorial, HiBob, Calamari, Zoho People.',
    url: `${SITE_URL}/compare`,
  },
}

const competitors = [
  {
    name: 'Spreadsheets',
    slug: 'spreadsheets',
    tagline: 'Excel and Google Sheets manual leave tracking',
    price: 'Free + admin time',
    pricingNote: 'No software fee, but managers still spend time checking balances, approvals, and clashes manually.',
  },
  {
    name: 'Timetastic',
    slug: 'timetastic',
    tagline: 'Popular UK leave tracker',
    price: 'From £1.50/user/mo',
    pricingNote: 'Lower entry price, focused mainly on leave calendars and approvals.',
  },
  {
    name: 'BrightHR',
    slug: 'brighthr',
    tagline: 'HR software suite by Peninsula',
    price: 'Quote-based',
    pricingNote: 'Pricing usually requires speaking to sales, with leave management inside a broader HR suite.',
  },
  {
    name: 'Breathe HR',
    slug: 'breathe-hr',
    tagline: 'HR platform for SMBs',
    price: 'From £13/mo (up to 10 employees)',
    pricingNote: 'Plan pricing varies by team size and HR modules.',
  },
  {
    name: 'Charlie HR',
    slug: 'charlie-hr',
    tagline: 'Modern HR for small companies',
    price: 'From £5/user/mo',
    pricingNote: 'Entry pricing is per user, with broader HR features beyond leave tracking.',
  },
  {
    name: 'WhosOff',
    slug: 'whosoff',
    tagline: 'Online leave management',
    price: 'From £1.55/user/mo',
    pricingNote: 'Simple leave management pricing, with fewer wider HR workflows included.',
  },
  {
    name: 'Personio',
    slug: 'personio',
    tagline: 'All-in-one HR platform (German-based)',
    price: 'From ~£3.50/user/mo (bundle)',
    pricingNote: 'Typically sold as a modular HR bundle rather than a standalone leave tracker.',
  },
  {
    name: 'Sage HR',
    slug: 'sage-hr',
    tagline: 'HR software from the Sage ecosystem',
    price: 'From £5/user/mo',
    pricingNote: 'Pricing depends on selected HR modules and Sage ecosystem needs.',
  },
  {
    name: 'Natural HR',
    slug: 'natural-hr',
    tagline: 'UK HR platform for growing businesses',
    price: 'Quote-based',
    pricingNote: 'A broader HR platform with sales-led pricing.',
  },
  {
    name: 'absence.io',
    slug: 'absence-io',
    tagline: 'European absence management tool',
    price: 'From ~£2.50/user/mo (EUR)',
    pricingNote: 'EUR-based pricing, with UK cost depending on exchange rate and plan.',
  },
  {
    name: 'Holiday Tracker',
    slug: 'holiday-tracker',
    tagline: 'Simple UK leave tracking tool',
    price: 'From £1.50/user/mo',
    pricingNote: 'Low entry price for straightforward annual leave tracking.',
  },
  {
    name: 'BambooHR',
    slug: 'bamboohr',
    tagline: 'US-based full HR suite',
    price: 'Quote-based (est. £5-15/user)',
    pricingNote: 'Quote-based HR suite pricing, often shaped by team size and package.',
  },
  {
    name: 'Factorial',
    slug: 'factorial',
    tagline: 'Spanish HR platform growing in UK',
    price: 'From £4.50/user/mo',
    pricingNote: 'Modular HR pricing with leave management as part of a larger platform.',
  },
  {
    name: 'HiBob',
    slug: 'hibob',
    tagline: 'Modern HR platform for mid-market',
    price: 'Quote-based',
    pricingNote: 'Designed for larger teams, with quote-based mid-market pricing.',
  },
  {
    name: 'Calamari',
    slug: 'calamari',
    tagline: 'Polish leave management tool',
    price: 'From £1.70/user/mo',
    pricingNote: 'Lower entry price, with modules for time off and attendance.',
  },
  {
    name: 'Zoho People',
    slug: 'zoho-people',
    tagline: 'Part of the Zoho suite',
    price: 'From £1.50/user/mo',
    pricingNote: 'Low starting price inside the wider Zoho product ecosystem.',
  },
]

const features = [
  { name: 'Visual leave calendar', leavely: true, timetastic: true, brighthr: true, breathe: true, charlie: true, whosoff: true },
  { name: 'One-click approvals', leavely: true, timetastic: true, brighthr: true, breathe: true, charlie: true, whosoff: true },
  { name: 'Automatic balance tracking', leavely: true, timetastic: true, brighthr: true, breathe: true, charlie: true, whosoff: true },
  { name: 'Custom leave policies', leavely: true, timetastic: 'Limited', brighthr: true, breathe: true, charlie: true, whosoff: true },
  { name: 'Bradford Factor', leavely: true, timetastic: false, brighthr: true, breathe: false, charlie: false, whosoff: false },
  { name: 'TOIL tracking', leavely: true, timetastic: false, brighthr: 'Add-on', breathe: 'Manual', charlie: false, whosoff: false },
  { name: 'Return-to-work forms', leavely: true, timetastic: false, brighthr: true, breathe: false, charlie: false, whosoff: false },
  { name: 'Employee directory', leavely: true, timetastic: false, brighthr: true, breathe: true, charlie: true, whosoff: false },
  { name: 'Document management', leavely: true, timetastic: false, brighthr: true, breathe: true, charlie: true, whosoff: false },
  { name: 'Audit trail', leavely: true, timetastic: false, brighthr: true, breathe: true, charlie: false, whosoff: false },
  { name: 'All features in one plan', leavely: true, timetastic: true, brighthr: false, breathe: false, charlie: false, whosoff: true },
  { name: 'No credit card for trial', leavely: true, timetastic: true, brighthr: false, breathe: true, charlie: true, whosoff: true },
  { name: 'UK bank holidays built in', leavely: true, timetastic: true, brighthr: true, breathe: true, charlie: true, whosoff: true },
  { name: 'Role-based access control', leavely: true, timetastic: 'Basic', brighthr: true, breathe: true, charlie: 'Basic', whosoff: 'Basic' },
  { name: 'Department clash detection', leavely: true, timetastic: false, brighthr: false, breathe: false, charlie: false, whosoff: false },
  { name: 'Blackout/restricted dates', leavely: true, timetastic: false, brighthr: 'Manual', breathe: false, charlie: false, whosoff: false },
  { name: 'Approval delegation', leavely: true, timetastic: false, brighthr: false, breathe: false, charlie: false, whosoff: false },
  { name: 'Service-based entitlement', leavely: true, timetastic: false, brighthr: false, breathe: 'Manual', charlie: false, whosoff: false },
  { name: 'iCal calendar sync', leavely: true, timetastic: true, brighthr: false, breathe: false, charlie: true, whosoff: true },
  { name: 'Employee self-service', leavely: true, timetastic: false, brighthr: true, breathe: true, charlie: true, whosoff: false },
  { name: 'Accrual-based leave', leavely: true, timetastic: false, brighthr: 'Add-on', breathe: false, charlie: false, whosoff: false },
  { name: 'Manager hierarchy filtering', leavely: true, timetastic: false, brighthr: true, breathe: true, charlie: false, whosoff: false },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
  if (value === false) return <X className="h-4 w-4 text-red-300 mx-auto" />
  return <span className="text-xs text-amber-600 font-medium">{value}</span>
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-white to-white" />
          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              How Leavely compares to
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                other leave management software
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              An honest, feature-by-feature comparison of UK leave management tools.
              All information is based on publicly available data at the time of writing.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register">
                <Button size="lg" className="text-base font-semibold px-8 h-12 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#pricing-comparison">
                <Button size="lg" variant="outline" className="text-base font-semibold px-8 h-12">
                  Compare pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Competitor Cards */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {competitors.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="group rounded-2xl border bg-white p-6 hover:shadow-lg hover:shadow-black/5 transition-all"
              >
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  Leavely vs {c.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{c.tagline}</p>
                <p className="text-xs text-gray-400 mt-2">{c.price}</p>
                <span className="inline-flex items-center text-sm font-semibold text-emerald-600 mt-4">
                  Compare <ArrowRight className="ml-1 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Pricing Comparison */}
        <section id="pricing-comparison" className="bg-white border-y">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">
                Side-by-side pricing
              </p>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
                Compare Leavely pricing with 16 alternatives
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Leavely has one transparent plan: £8 per user per month with every feature included and a 14-day trial.
                Competitor pricing can vary by module, contract, billing term, and team size.
              </p>
            </div>
            <div className="rounded-2xl border bg-white overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 min-w-[170px]">Comparison</th>
                    <th className="text-left px-4 py-3 font-semibold text-emerald-600 bg-emerald-50/50 min-w-[150px]">Leavely</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 min-w-[170px]">Alternative</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 min-w-[260px]">Pricing note</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 min-w-[140px]">Next step</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((competitor, index) => (
                    <tr key={competitor.slug} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                      <td className="px-4 py-4 font-semibold text-gray-900">
                        Leavely vs {competitor.name}
                      </td>
                      <td className="px-4 py-4 bg-emerald-50/30">
                        <p className="font-semibold text-emerald-700">£8/user/mo</p>
                        <p className="text-xs text-emerald-700/80 mt-1">All features included</p>
                      </td>
                      <td className="px-4 py-4 font-medium text-gray-700">{competitor.price}</td>
                      <td className="px-4 py-4 text-gray-500 leading-relaxed">{competitor.pricingNote}</td>
                      <td className="px-4 py-4">
                        <Link
                          href={`/compare/${competitor.slug}`}
                          className="inline-flex items-center rounded-lg border border-emerald-200 px-3 py-2 text-sm font-semibold text-emerald-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
                        >
                          Compare <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 flex justify-center">
              <Link href="/register">
                <Button size="lg" className="text-base font-semibold px-8 h-12 bg-emerald-600 hover:bg-emerald-700 text-white">
                  Start your free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Master Comparison Table */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center mb-4">
              Feature comparison at a glance
            </h2>
            <p className="text-center text-gray-500 mb-2 max-w-2xl mx-auto">
              Comparing Leavely with popular UK leave management tools at a glance.
            </p>
            <p className="text-center text-xs text-gray-400 mb-10">
              Based on publicly available information as of March 2026. Features and pricing may have changed.
            </p>
            <div className="rounded-2xl border bg-white overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 min-w-[180px]">Feature</th>
                    <th className="text-center px-3 py-3 font-semibold text-emerald-600 bg-emerald-50/50 min-w-[80px]">Leavely</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-500 min-w-[80px]">Timetastic</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-500 min-w-[80px]">BrightHR</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-500 min-w-[80px]">Breathe</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-500 min-w-[80px]">Charlie</th>
                    <th className="text-center px-3 py-3 font-semibold text-gray-500 min-w-[80px]">WhosOff</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((f, i) => (
                    <tr key={f.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                      <td className="px-4 py-3 font-medium text-gray-700">{f.name}</td>
                      <td className="text-center px-3 py-3 bg-emerald-50/30"><Cell value={f.leavely} /></td>
                      <td className="text-center px-3 py-3"><Cell value={f.timetastic} /></td>
                      <td className="text-center px-3 py-3"><Cell value={f.brighthr} /></td>
                      <td className="text-center px-3 py-3"><Cell value={f.breathe} /></td>
                      <td className="text-center px-3 py-3"><Cell value={f.charlie} /></td>
                      <td className="text-center px-3 py-3"><Cell value={f.whosoff} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600" />
          <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Try Leavely free for 14 days
            </h2>
            <p className="mt-4 text-lg text-emerald-100">
              All features included. No credit card. Set up in 2 minutes.
            </p>
            <div className="mt-8">
              <Link href="/register">
                <Button size="lg" className="text-base font-semibold px-8 h-12 bg-white text-emerald-700 hover:bg-gray-50 shadow-lg">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
