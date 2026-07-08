import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/how-to-calculate-holiday-entitlement-uk`

export const metadata: Metadata = {
  title: 'How to Calculate Holiday Entitlement UK: Step-by-Step (2026)',
  description:
    'How to calculate holiday entitlement in the UK. Statutory 5.6 weeks explained, bank holidays, part-time workers, starters and leavers, with worked examples.',
  alternates: { canonical: articleUrl },
  keywords: [
    'calculate holiday entitlement UK',
    'how to work out holiday entitlement',
    'holiday entitlement calculation',
    'annual leave calculator UK',
    'holiday entitlement UK 2026',
    'statutory holiday entitlement UK',
  ],
  openGraph: {
    title: 'How to Calculate Holiday Entitlement UK: Step-by-Step (2026)',
    description: 'Statutory 5.6 weeks explained with worked examples for full-time, part-time, starters, and leavers.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Calculate Holiday Entitlement UK: Step-by-Step (2026)',
  description: 'How to calculate holiday entitlement in the UK with worked examples.',
  url: articleUrl,
  datePublished: '2026-04-04',
  dateModified: '2026-04-04',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function HolidayEntitlementCalculationArticle() {
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
            <span className="text-xs text-gray-400 ml-3">8 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            How to Calculate Holiday Entitlement UK: Step-by-Step (2026)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Calculating holiday entitlement correctly is essential for every UK employer. Errors lead to underpayment, disputes, and potential employment tribunal claims. This guide walks you through the rules, the formulas, and real worked examples so you can get it right every time.
            </p>

            <h2>The statutory minimum: 5.6 weeks</h2>
            <p>
              Under the Working Time Regulations 1998, all workers in the UK are entitled to a minimum of <strong>5.6 weeks of paid annual leave</strong> per year. For someone working 5 days per week, that works out to 28 days. This is the maximum the government requires. It <strong>cannot</strong> be replaced by a payment in lieu, except when someone leaves the job.
            </p>
            <p>
              The 28-day figure is also the statutory cap. Even if someone works 6 days per week, the statutory entitlement remains 28 days (5.6 &times; 5 = 28 for calculation purposes, capped at 28).
            </p>

            <h2>Do bank holidays count?</h2>
            <p>
              There is no statutory right to bank holidays off. Employers <strong>can</strong> include bank holidays within the 28-day entitlement. Many employers offer 20 days of annual leave plus 8 bank holidays, which totals 28 days. Others offer additional days on top.
            </p>
            <p>
              Whatever your approach, make it clear in the employment contract whether bank holidays are included in or additional to the holiday allowance.
            </p>

            <h2>Calculating entitlement for part-time workers</h2>
            <p>
              Part-time workers are entitled to the same 5.6 weeks, but calculated based on their working pattern. The formula is:
            </p>
            <p><strong>Days per week &times; 5.6 = annual entitlement in days</strong></p>

            <h3>Example 1: 3 days per week</h3>
            <p>
              3 &times; 5.6 = <strong>16.8 days</strong> per year. You can round this up to 17 days if your policy rounds up.
            </p>

            <h3>Example 2: 4 days per week</h3>
            <p>
              4 &times; 5.6 = <strong>22.4 days</strong> per year.
            </p>

            <p>
              For employees who work irregular hours, you can calculate entitlement in hours instead of days. Multiply their weekly contracted hours by 5.6 to get their annual entitlement in hours.
            </p>

            <h2>Pro-rata calculation for starters and leavers</h2>
            <p>
              When someone starts or leaves part way through the holiday year, you need to calculate their entitlement on a pro-rata basis.
            </p>
            <p>The formula is:</p>
            <p><strong>(Full-year entitlement &divide; 12) &times; number of complete months worked</strong></p>
            <p>Or for a more precise calculation:</p>
            <p><strong>(Full-year entitlement &divide; 365) &times; number of calendar days in the period</strong></p>

            <h3>Example 3: Starter joins 1 July</h3>
            <p>
              If your holiday year runs January to December and a full-time employee with 28 days entitlement starts on 1 July, they have 184 days remaining in the year.
            </p>
            <p>
              28 &divide; 365 &times; 184 = <strong>14.1 days</strong> (rounded to 14 or 14.5 depending on your policy).
            </p>

            <h3>Example 4: Leaver finishes 31 March</h3>
            <p>
              A full-time employee with 28 days leaves on 31 March. They worked 90 days of the holiday year.
            </p>
            <p>
              28 &divide; 365 &times; 90 = <strong>6.9 days</strong>. If they took 10 days of leave, they have been overpaid by 3.1 days. You can deduct this from their final pay if the contract permits it.
            </p>

            <h2>Employees on maternity, paternity, or sick leave</h2>
            <p>
              Holiday entitlement continues to accrue during:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Maternity leave</strong> (all 52 weeks)</li>
              <li><strong>Paternity leave</strong></li>
              <li><strong>Adoption leave</strong></li>
              <li><strong>Sick leave</strong></li>
              <li><strong>Shared parental leave</strong></li>
            </ul>
            <p>
              This means an employee returning from a year of maternity leave will have a full year&apos;s holiday entitlement to use. Many employers allow this to be carried over into the next holiday year to avoid someone taking months of leave back-to-back.
            </p>

            <h2>Contractual vs statutory entitlement</h2>
            <p>
              Many employers offer more than the statutory minimum. If your contracts state 25 days plus bank holidays (33 days total), the first 28 days are statutory and the remaining 5 are contractual. The rules around carry-over and payment in lieu may differ between the statutory and contractual portions, so keep this distinction clear in your policies.
            </p>

            <h2>The accrual method</h2>
            <p>
              Some employers use accrual-based leave rather than giving the full allowance on day one. Under accrual, employees build up leave month by month. For example, an employee with 28 days entitlement accrues 2.33 days per month (28 &divide; 12).
            </p>
            <p>
              This approach is popular for the first year of employment, as it prevents new starters from taking their full allowance and then leaving early.
            </p>

            <h2>Common calculation mistakes</h2>
            <ol className="list-decimal pl-6">
              <li><strong>Not pro-rating bank holidays for part-timers.</strong> A part-time employee working 3 days per week should receive a pro-rata share of bank holidays, not the same number as full-time employees.</li>
              <li><strong>Using working days instead of calendar days for pro-rata.</strong> Using calendar days gives a more accurate result for mid-month starters.</li>
              <li><strong>Forgetting accrual during long-term absence.</strong> Holiday continues to accrue during sick leave and family leave.</li>
              <li><strong>Rounding down instead of up.</strong> Best practice is to round in the employee&apos;s favour to avoid any statutory minimum issues.</li>
            </ol>

            <h2>How Leavely calculates it automatically</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> takes the manual calculation out of holiday entitlement:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Automatic pro-rata:</strong> Set the start date and working pattern, and Leavely calculates the correct entitlement for starters and leavers.</li>
              <li><strong>Part-time support:</strong> Configure any working pattern and Leavely adjusts entitlements and bank holiday allowances automatically.</li>
              <li><strong>Accrual mode:</strong> Choose between upfront allowance or monthly accrual for each leave policy.</li>
              <li><strong>Real-time balances:</strong> Employees always see their current balance, used days, and pending requests in one dashboard.</li>
              <li><strong>Holiday year flexibility:</strong> Set your holiday year to run January to December, April to March, or any custom period.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Stop calculating holiday entitlement manually</h3>
            <p className="text-emerald-100 mb-6">Leavely handles pro-rata, part-time, accrual, and mid-year starters automatically.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK: The Complete Guide &rarr;</Link>
              <Link href="/blog/pro-rata-annual-leave-calculator" className="block text-emerald-600 hover:underline font-medium">How to Calculate Pro Rata Annual Leave UK &rarr;</Link>
              <Link href="/blog/holiday-pay-calculation-uk" className="block text-emerald-600 hover:underline font-medium">Holiday Pay Calculation UK: How to Get It Right &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
