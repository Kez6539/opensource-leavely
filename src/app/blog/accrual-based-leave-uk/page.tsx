import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/accrual-based-leave-uk`

export const metadata: Metadata = {
  title: 'Accrual-Based Leave UK: Monthly vs Upfront Holiday Allowance (2026 Guide)',
  description:
    'How accrual-based leave works in the UK. Monthly leave accrual vs upfront allowance, worked calculation examples, legal position under Working Time Regulations, and when to use each approach.',
  alternates: { canonical: articleUrl },
  keywords: [
    'accrual based leave UK',
    'monthly leave accrual',
    'holiday accrual UK',
    'leave accrual calculation',
    'upfront vs accrual leave',
    'holiday accrual new starters',
    'leave accrual method UK',
    'annual leave accrual calculation',
    'Working Time Regulations accrual',
  ],
  openGraph: {
    title: 'Accrual-Based Leave UK — Monthly vs Upfront Allowance',
    description: 'How monthly leave accrual works, when to use it, and how it compares to giving the full allowance upfront.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Accrual-Based Leave UK: Monthly vs Upfront Holiday Allowance',
  description: 'Complete guide to accrual-based leave in the UK for employers.',
  url: articleUrl,
  datePublished: '2026-04-02',
  dateModified: '2026-04-02',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function AccrualBasedLeaveArticle() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />

      <main>
        <article className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline font-medium mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          <div className="mb-8">
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">HR Guide</span>
            <span className="text-xs text-gray-400 ml-3">9 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Accrual-Based Leave UK: Monthly vs Upfront Holiday Allowance
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              When a new employee starts, do they get their full annual leave allowance immediately, or does it build up month by month? This is the difference between <strong>upfront allocation</strong> and <strong>accrual-based leave</strong>. Both approaches are legal in the UK, but they suit different situations. This guide explains how each method works, the legal position, and when to use which.
            </p>

            <h2>What is accrual-based leave?</h2>
            <p>
              Accrual-based leave means an employee&apos;s holiday allowance <strong>builds up gradually</strong> over the leave year, typically on a monthly basis. Instead of receiving their full 25 days (or whatever the allowance is) on day one, they earn a fraction each month.
            </p>
            <p>
              The standard formula is:
            </p>
            <p>
              <strong>Monthly accrual = Annual allowance &divide; 12</strong>
            </p>
            <p>
              So an employee with 28 days of annual leave accrues 2.33 days per month. After 3 months, they have 7 days available. After 6 months, 14 days. After the full year, they&apos;ve accrued the complete 28 days.
            </p>

            <h2>What is upfront allocation?</h2>
            <p>
              Upfront allocation gives the employee their <strong>entire annual allowance</strong> at the start of the leave year (or on their start date). A new starter joining on 1 January with 25 days gets all 25 days immediately.
            </p>
            <p>
              This is simpler to manage and more generous to employees, but it carries a risk: if the employee leaves after three months having taken 15 days of holiday, you may have overpaid leave.
            </p>

            <h2>The legal position in the UK</h2>
            <p>
              Under the <strong>Working Time Regulations 1998</strong>, all employees are entitled to a minimum of 5.6 weeks&apos; paid annual leave per year (28 days for full-time workers, including bank holidays). This statutory entitlement <strong>accrues from the first day of employment</strong>.
            </p>
            <p>Key legal points:</p>
            <ul className="list-disc pl-6">
              <li><strong>Statutory leave accrues from day one</strong> &mdash; there is no qualifying period. An employee who has worked for one month is entitled to 1/12th of their annual statutory allowance.</li>
              <li><strong>Employers can choose the method</strong> &mdash; you can grant the full allowance upfront or use accrual. Both are lawful, provided the employee can always take at least what they&apos;ve accrued under the statutory rules.</li>
              <li><strong>Contractual leave above the statutory minimum</strong> &mdash; if you offer 30 days (above the 28-day statutory minimum), you have more flexibility in how the extra 2 days are allocated.</li>
              <li><strong>On termination</strong> &mdash; employees are entitled to pay in lieu of any accrued but untaken statutory leave. If they&apos;ve taken more than they&apos;ve accrued, you can only deduct overpaid holiday if the contract allows it.</li>
            </ul>

            <h2>How the accrual calculation works</h2>
            <h3>Worked example 1: Full-year employee</h3>
            <p>
              Emma has 25 days of annual leave per year. Her leave year runs January to December. Under monthly accrual:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Monthly accrual:</strong> 25 &divide; 12 = 2.08 days per month</li>
              <li><strong>By end of March (3 months):</strong> 3 &times; 2.08 = 6.25 days</li>
              <li><strong>By end of June (6 months):</strong> 6 &times; 2.08 = 12.5 days</li>
              <li><strong>By end of December (12 months):</strong> 12 &times; 2.08 = 25 days</li>
            </ul>

            <h3>Worked example 2: Mid-year starter</h3>
            <p>
              James joins on 1 April. The leave year runs January to December, so he has 9 months remaining.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Pro-rated allowance:</strong> 25 &times; (9 &divide; 12) = 18.75 days for the remainder of the year</li>
              <li><strong>Monthly accrual:</strong> 18.75 &divide; 9 = 2.08 days per month</li>
              <li><strong>By end of June (3 months of service):</strong> 3 &times; 2.08 = 6.25 days</li>
            </ul>
            <p>
              Most employers round to the nearest half-day or full day for simplicity. So 6.25 days becomes either 6.5 or 7 days. The key is to be consistent and document your rounding policy.
            </p>

            <h3>Worked example 3: Leaver mid-year</h3>
            <p>
              Sarah has 28 days of annual leave and resigns on 30 June, having worked exactly 6 months of the leave year.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Accrued entitlement:</strong> 28 &times; (6 &divide; 12) = 14 days</li>
              <li><strong>Leave taken so far:</strong> 10 days</li>
              <li><strong>Owed on termination:</strong> 14 &minus; 10 = 4 days paid in lieu</li>
            </ul>
            <p>
              If Sarah had taken 18 days (more than her accrued 14), the employer could deduct the overpayment of 4 days from her final pay &mdash; but only if the employment contract permits this.
            </p>

            <h2>Upfront vs accrual: pros and cons</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left font-bold text-gray-900">&nbsp;</th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-bold text-gray-900">Upfront</th>
                    <th className="border border-gray-200 px-4 py-2 text-left font-bold text-gray-900">Accrual</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-medium text-gray-900">Simplicity</td>
                    <td className="border border-gray-200 px-4 py-2">Easy &mdash; no monthly calculations</td>
                    <td className="border border-gray-200 px-4 py-2">Requires tracking monthly balances</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 font-medium text-gray-900">Risk of overpayment</td>
                    <td className="border border-gray-200 px-4 py-2">Higher &mdash; leavers may have taken more than accrued</td>
                    <td className="border border-gray-200 px-4 py-2">Lower &mdash; employees can only take what they&apos;ve earned</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-medium text-gray-900">Employee experience</td>
                    <td className="border border-gray-200 px-4 py-2">Better &mdash; full allowance from day one</td>
                    <td className="border border-gray-200 px-4 py-2">Can feel restrictive for new starters</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 font-medium text-gray-900">Best for</td>
                    <td className="border border-gray-200 px-4 py-2">Stable teams with low turnover</td>
                    <td className="border border-gray-200 px-4 py-2">High-turnover roles, seasonal staff, new starters</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-200 px-4 py-2 font-medium text-gray-900">Admin overhead</td>
                    <td className="border border-gray-200 px-4 py-2">Minimal</td>
                    <td className="border border-gray-200 px-4 py-2">Higher without software</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>When to use accrual-based leave</h2>
            <p>Accrual makes the most sense in these situations:</p>
            <ul className="list-disc pl-6">
              <li><strong>High staff turnover</strong> &mdash; if employees frequently leave within their first year, accrual prevents overpayment of holiday.</li>
              <li><strong>Seasonal businesses</strong> &mdash; retail, hospitality, and agriculture often hire temporary or seasonal staff who need pro-rated entitlements.</li>
              <li><strong>Probation periods</strong> &mdash; some employers use accrual during the first 3&ndash;6 months, then switch to upfront for the remainder of the year.</li>
              <li><strong>Fixed-term contracts</strong> &mdash; for contracts under 12 months, accrual ensures the entitlement matches the actual period worked.</li>
              <li><strong>Cash flow management</strong> &mdash; accrual spreads the liability evenly rather than front-loading it.</li>
            </ul>

            <h2>When to use upfront allocation</h2>
            <p>Upfront is usually better when:</p>
            <ul className="list-disc pl-6">
              <li><strong>Retention is high</strong> &mdash; most employees stay for the full year, so overpayment risk is low.</li>
              <li><strong>Simplicity matters</strong> &mdash; smaller teams without dedicated HR benefit from less admin.</li>
              <li><strong>Culture</strong> &mdash; upfront allocation signals trust and generosity, which can improve employee satisfaction.</li>
              <li><strong>Leave year starts on 1 January</strong> &mdash; most employees plan holidays for the full year and expect their allowance to be available immediately.</li>
            </ul>

            <h2>A common hybrid approach</h2>
            <p>
              Many UK employers use a <strong>hybrid model</strong>: accrual for the first year of employment, then upfront allocation from the second year onwards. This protects against early leavers taking more than they&apos;ve earned while offering a better experience to established employees.
            </p>

            <h2>How Leavely supports both modes</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> gives you full flexibility over how leave is allocated:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Per-policy accrual settings</strong> &mdash; choose upfront or monthly accrual for each leave policy independently.</li>
              <li><strong>Automatic monthly accrual</strong> &mdash; if accrual is enabled, Leavely calculates the monthly entitlement and updates balances automatically.</li>
              <li><strong>Pro-rated new starters</strong> &mdash; mid-year joiners get the correct allowance based on their start date.</li>
              <li><strong>Leaver calculations</strong> &mdash; when someone leaves, Leavely calculates accrued vs taken and shows whether a payout or deduction is needed.</li>
              <li><strong>Clear balances</strong> &mdash; employees see their current accrued balance, how much is pending, and how much remains.</li>
              <li><strong>Audit trail</strong> &mdash; every accrual adjustment is logged for compliance.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Automate leave accrual calculations</h3>
            <p className="text-emerald-100 mb-6">Leavely handles monthly accrual, pro-rating, and leaver calculations automatically.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK 2026: The Complete Guide &rarr;</Link>
              <Link href="/blog/pro-rata-annual-leave-calculator" className="block text-emerald-600 hover:underline font-medium">Pro Rata Annual Leave Calculator &rarr;</Link>
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
