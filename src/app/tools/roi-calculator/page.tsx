import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingFooter, MarketingNav } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { RoiCalculator } from './calculator'

const pageUrl = `${SITE_URL}/tools/roi-calculator`

export const metadata: Metadata = {
  title: 'Free HR Software ROI Calculator UK | Leavely',
  description:
    'Calculate how much time and money leave management software could save your business. Free interactive ROI calculator for UK employers.',
  alternates: { canonical: pageUrl },
  keywords: [
    'HR software ROI calculator',
    'leave management ROI calculator',
    'absence management savings calculator',
    'HR software cost savings',
    'holiday tracker ROI',
    'leave management software savings',
    'small business HR calculator',
    'UK HR software calculator',
  ],
  openGraph: {
    title: 'Free HR Software ROI Calculator | Leavely',
    description:
      'Estimate the time and money saved by replacing leave spreadsheets with Leavely.',
    url: pageUrl,
    type: 'website',
    siteName: 'Leavely',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'HR Software ROI Calculator',
  description:
    'Free ROI calculator for estimating time and money saved by using leave management software.',
  url: pageUrl,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
  },
  author: {
    '@type': 'Organization',
    name: 'Leavely',
    url: SITE_URL,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Leavely',
    url: SITE_URL,
  },
}

export default function RoiCalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MarketingNav />

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-700 to-cyan-700 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.14),transparent_62%)]" />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <span className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-emerald-100">
              Free ROI Tool
            </span>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              HR Software ROI Calculator
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-emerald-100">
              See how much admin time, payroll cost, and spreadsheet effort Leavely could save your
              team each month.
            </p>
          </div>
        </section>

        <section className="relative z-10 mx-auto -mt-8 max-w-5xl px-6 py-12">
          <RoiCalculator />
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-16">
          <div className="prose prose-gray max-w-none [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_li]:text-gray-600 [&_ol]:space-y-2 [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-gray-600 [&_strong]:text-gray-900 [&_ul]:space-y-2">
            <h2>How the ROI calculator works</h2>
            <p>
              Manual leave management costs money because every request creates small bits of work:
              checking balances, looking for clashes, updating a spreadsheet, telling managers, and
              answering follow-up questions. The calculator turns those minutes into a monthly cost
              using your team size and admin hourly rate.
            </p>

            <h2>What Leavely typically removes</h2>
            <ul className="list-disc pl-6">
              <li><strong>Balance checks</strong> before a request is approved.</li>
              <li><strong>Spreadsheet updates</strong> after leave is booked, changed, or cancelled.</li>
              <li><strong>Calendar clash checks</strong> across teams, departments, and blackout dates.</li>
              <li><strong>Repeat questions</strong> from employees asking how much leave they have left.</li>
              <li><strong>Manager follow-up</strong> when requests sit unresolved.</li>
            </ul>

            <h2>Use your own assumptions</h2>
            <p>
              The default numbers are deliberately conservative. If your current process depends on
              shared spreadsheets, email chains, or manual entitlement calculations, increase the
              time-per-request and admin-hours assumptions to match what actually happens in your
              business.
            </p>
          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="mb-2 text-xl font-bold text-white">Turn the saving into a live workflow</h3>
            <p className="mb-6 text-emerald-100">
              Start a 14-day trial and replace manual leave tracking with approvals, balances, and
              team visibility in one place.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white font-semibold text-emerald-700 shadow-lg hover:bg-gray-50">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
