import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/pro-rata-annual-leave-calculator`

export const metadata: Metadata = {
  title: 'How to Calculate Pro Rata Annual Leave UK (2026 Guide + Examples)',
  description:
    'Learn how to calculate pro rata annual leave for part-time employees in the UK. Step-by-step formulas, worked examples for different work patterns, and common mistakes employers make.',
  alternates: { canonical: articleUrl },
  keywords: [
    'pro rata annual leave calculator',
    'pro rata annual leave UK',
    'how to calculate pro rata annual leave',
    'part time annual leave entitlement UK',
    'pro rata holiday entitlement',
    'annual leave calculator part time',
    'pro rata leave calculation formula',
    'holiday entitlement part time workers UK',
  ],
  openGraph: {
    title: 'Pro Rata Annual Leave Calculator UK — Formulas & Examples',
    description: 'Step-by-step guide to calculating pro rata annual leave for part-time UK employees.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Calculate Pro Rata Annual Leave UK',
  description: 'Step-by-step formulas and worked examples for calculating pro rata annual leave for part-time employees.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function ProRataArticle() {
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
            <span className="text-xs text-gray-400 ml-3">7 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            How to Calculate Pro Rata Annual Leave UK: Formulas & Examples
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Calculating annual leave for part-time employees is one of the most common HR headaches for UK small businesses. Get it wrong and you could be underpaying entitlement (illegal) or overpaying (costly). This guide gives you the exact formulas with worked examples.
            </p>

            <h2>The basic formula</h2>
            <p>For employees who work a fixed number of days per week, the calculation is simple:</p>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <p className="text-emerald-800 font-mono text-center text-lg mb-0">
                <strong>Days worked per week × 5.6 = annual leave entitlement (in days)</strong>
              </p>
            </div>
            <p>The 5.6 comes from the statutory 5.6 weeks of leave that all UK workers are entitled to.</p>

            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6 text-center">
              <p className="text-emerald-800 font-semibold mb-2">Free Pro Rata Leave Calculator</p>
              <p className="text-emerald-700 text-sm mb-3">Enter days per week and company allowance to instantly calculate pro rata annual leave entitlement.</p>
              <Link href="/tools/pro-rata-leave-calculator" className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:underline">
                Try it now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <h2>Quick reference table</h2>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Days per week</th>
                  <th>Annual leave (days)</th>
                  <th>Annual leave (hours at 8h/day)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>5 days (full-time)</td><td><strong>28 days</strong></td><td>224 hours</td></tr>
                <tr><td>4 days</td><td><strong>22.4 days</strong></td><td>179.2 hours</td></tr>
                <tr><td>3 days</td><td><strong>16.8 days</strong></td><td>134.4 hours</td></tr>
                <tr><td>2.5 days</td><td><strong>14 days</strong></td><td>112 hours</td></tr>
                <tr><td>2 days</td><td><strong>11.2 days</strong></td><td>89.6 hours</td></tr>
                <tr><td>1 day</td><td><strong>5.6 days</strong></td><td>44.8 hours</td></tr>
              </tbody>
            </table>

            <h2>Worked examples</h2>

            <h3>Example 1: Employee works 3 days per week</h3>
            <div className="rounded-xl bg-gray-50 border p-5 my-4">
              <p className="mb-1"><strong>Calculation:</strong> 3 × 5.6 = <strong>16.8 days</strong> annual leave</p>
              <p className="mb-0">If the company offers 25 days + 8 bank holidays (33 days) for full-time: 33 × (3/5) = <strong>19.8 days</strong></p>
            </div>

            <h3>Example 2: Employee works 4 days but different hours each day</h3>
            <div className="rounded-xl bg-gray-50 border p-5 my-4">
              <p className="mb-1">Mon: 8h, Tue: 6h, Wed: 8h, Thu: 4h = <strong>26 hours/week</strong></p>
              <p className="mb-1">Full-time equivalent: 40 hours/week</p>
              <p className="mb-1"><strong>By days:</strong> 4 × 5.6 = <strong>22.4 days</strong></p>
              <p className="mb-0"><strong>By hours (more accurate):</strong> (26/40) × 224 = <strong>145.6 hours</strong></p>
            </div>
            <p>When employees work different hours on different days, calculating in <strong>hours</strong> is more accurate than days.</p>

            <h3>Example 3: Employee starts mid-year (1 July)</h3>
            <div className="rounded-xl bg-gray-50 border p-5 my-4">
              <p className="mb-1">Works 5 days/week, leave year is Jan–Dec</p>
              <p className="mb-1">Full entitlement: 28 days</p>
              <p className="mb-1">Remaining months: 6 out of 12</p>
              <p className="mb-0"><strong>Pro rata:</strong> 28 × (6/12) = <strong>14 days</strong></p>
            </div>

            <h2>Calculating for irregular hours workers</h2>
            <p>
              For workers with no fixed weekly hours (<Link href="/blog/zero-hour-contract-holiday-uk" className="text-emerald-600 hover:underline font-medium">zero-hours contracts</Link>, casual workers), use the <strong>12.07% method</strong>:
            </p>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <p className="text-emerald-800 font-mono text-center text-lg mb-0">
                <strong>Hours worked × 12.07% = holiday hours accrued</strong>
              </p>
            </div>
            <p>
              The 12.07% comes from: 5.6 weeks ÷ 46.4 working weeks (52 minus 5.6). For example, if a worker does 100 hours in a month, they accrue 12.07 hours of paid holiday.
            </p>

            <h2>Common mistakes</h2>
            <ol className="list-decimal pl-6">
              <li><strong>Rounding down</strong> — always round up or use exact figures. Rounding down risks underpaying statutory entitlement.</li>
              <li><strong>Forgetting bank holidays</strong> — <Link href="/blog/part-time-workers-rights-uk" className="text-emerald-600 hover:underline font-medium">part-time workers</Link> are entitled to bank holidays pro rata, even if they don&apos;t fall on their working days.</li>
              <li><strong>Using the wrong base</strong> — if your company offers more than statutory (e.g., 33 days for full-time), pro rata the company amount, not just 28.</li>
              <li><strong>Not adjusting for mid-year starters</strong> — new employees joining mid-year need their entitlement pro-rated for the remaining leave year.</li>
              <li><strong>Calculating in days when hours vary</strong> — if an employee works different hours on different days, use hours instead of days for accuracy.</li>
            </ol>

            <h2>Let Leavely handle the maths</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> calculates pro rata entitlement automatically based on each employee&apos;s work pattern. Set the pattern once, and balances are always accurate — including for mid-year starters and bank holidays.
            </p>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Stop calculating leave in spreadsheets</h3>
            <p className="text-emerald-100 mb-6">Leavely handles pro rata calculations, part-time entitlements, and mid-year starters automatically.</p>
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
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
              <Link href="/blog/part-time-workers-rights-uk" className="block text-emerald-600 hover:underline font-medium">Part-Time Workers&apos; Rights UK: Leave, Pay &amp; Employer Obligations &rarr;</Link>
              <Link href="/tools/pro-rata-leave-calculator" className="block text-emerald-600 hover:underline font-medium">Pro Rata Leave Calculator: Free Online Tool &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
