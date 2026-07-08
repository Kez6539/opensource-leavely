import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/bank-holidays-uk-2026`

export const metadata: Metadata = {
  title: 'UK Bank Holidays 2026: Complete List for Employers',
  description:
    'Full list of 2026 UK bank holidays for England, Wales, Scotland, and Northern Ireland. Includes employer guidance on statutory leave, part-time workers, and a preview of 2027 dates.',
  alternates: { canonical: articleUrl },
  keywords: [
    'bank holidays 2026 UK',
    'UK bank holidays 2026',
    'bank holiday dates 2026',
    'public holidays UK 2026',
    'bank holidays England 2026',
    'bank holidays Scotland 2026',
    'bank holidays 2026 and 2027',
  ],
  openGraph: {
    title: 'UK Bank Holidays 2026 — Complete List for Employers',
    description:
      'Every 2026 bank holiday for England, Wales, Scotland, and Northern Ireland in one place, plus employer guidance.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'UK Bank Holidays 2026: Complete List for Employers',
  description:
    'Full list of 2026 UK bank holidays for England, Wales, Scotland, and Northern Ireland with employer guidance on statutory leave, part-time workers, and 2027 preview.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function BankHolidays2026Article() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Reference</span>
            <span className="text-xs text-gray-400 ml-3">5 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            UK Bank Holidays 2026: Complete List for Employers
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Planning staffing, payroll, and leave for 2026? Here is every UK bank holiday date you need, broken down by region, along with practical guidance for employers on statutory entitlement, part-time workers, and how to keep your leave calendar accurate.
            </p>

            <h2>England &amp; Wales bank holidays 2026</h2>
            <p>
              England and Wales share <strong>8 bank holidays</strong> in 2026. Note that Boxing Day (26 December) falls on a Saturday, so the substitute bank holiday moves to <strong>Monday 28 December</strong>.
            </p>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Holiday</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1 January</td><td>Thursday</td><td>New Year&apos;s Day</td></tr>
                <tr><td>3 April</td><td>Friday</td><td>Good Friday</td></tr>
                <tr><td>6 April</td><td>Monday</td><td>Easter Monday</td></tr>
                <tr><td>4 May</td><td>Monday</td><td>Early May Bank Holiday</td></tr>
                <tr><td>25 May</td><td>Monday</td><td>Spring Bank Holiday</td></tr>
                <tr><td>31 August</td><td>Monday</td><td>Summer Bank Holiday</td></tr>
                <tr><td>25 December</td><td>Friday</td><td>Christmas Day</td></tr>
                <tr><td>28 December</td><td>Monday</td><td>Boxing Day (substitute)</td></tr>
              </tbody>
            </table>

            <h2>Scotland bank holidays 2026</h2>
            <p>
              Scotland has <strong>9 bank holidays</strong> in 2026. The key differences from England &amp; Wales are: Scotland observes <strong>2 January</strong> as a bank holiday, does <strong>not</strong> observe Easter Monday, and has <strong>St Andrew&apos;s Day</strong> on 30 November.
            </p>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Holiday</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1 January</td><td>Thursday</td><td>New Year&apos;s Day</td></tr>
                <tr><td>2 January</td><td>Friday</td><td>2nd January</td></tr>
                <tr><td>3 April</td><td>Friday</td><td>Good Friday</td></tr>
                <tr><td>4 May</td><td>Monday</td><td>Early May Bank Holiday</td></tr>
                <tr><td>25 May</td><td>Monday</td><td>Spring Bank Holiday</td></tr>
                <tr><td>3 August</td><td>Monday</td><td>Summer Bank Holiday</td></tr>
                <tr><td>30 November</td><td>Monday</td><td>St Andrew&apos;s Day</td></tr>
                <tr><td>25 December</td><td>Friday</td><td>Christmas Day</td></tr>
                <tr><td>28 December</td><td>Monday</td><td>Boxing Day (substitute)</td></tr>
              </tbody>
            </table>

            <h2>Northern Ireland bank holidays 2026</h2>
            <p>
              Northern Ireland has <strong>10 bank holidays</strong> in 2026 &mdash; the most of any UK region. It shares most dates with England &amp; Wales but adds <strong>St Patrick&apos;s Day</strong> (17 March) and the <strong>Battle of the Boyne</strong> (13 July).
            </p>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Holiday</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1 January</td><td>Thursday</td><td>New Year&apos;s Day</td></tr>
                <tr><td>17 March</td><td>Tuesday</td><td>St Patrick&apos;s Day</td></tr>
                <tr><td>3 April</td><td>Friday</td><td>Good Friday</td></tr>
                <tr><td>6 April</td><td>Monday</td><td>Easter Monday</td></tr>
                <tr><td>4 May</td><td>Monday</td><td>Early May Bank Holiday</td></tr>
                <tr><td>25 May</td><td>Monday</td><td>Spring Bank Holiday</td></tr>
                <tr><td>13 July</td><td>Monday</td><td>Battle of the Boyne (Orangemen&apos;s Day)</td></tr>
                <tr><td>31 August</td><td>Monday</td><td>Summer Bank Holiday</td></tr>
                <tr><td>25 December</td><td>Friday</td><td>Christmas Day</td></tr>
                <tr><td>28 December</td><td>Monday</td><td>Boxing Day (substitute)</td></tr>
              </tbody>
            </table>

            <h2>Regional comparison at a glance</h2>
            <p>
              The table below shows which bank holidays apply in each region so you can quickly spot the differences.
            </p>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Holiday</th>
                  <th>England &amp; Wales</th>
                  <th>Scotland</th>
                  <th>N. Ireland</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1 Jan &mdash; New Year&apos;s Day</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
                <tr><td>2 Jan &mdash; 2nd January</td><td>&mdash;</td><td>Yes</td><td>&mdash;</td></tr>
                <tr><td>17 Mar &mdash; St Patrick&apos;s Day</td><td>&mdash;</td><td>&mdash;</td><td>Yes</td></tr>
                <tr><td>3 Apr &mdash; Good Friday</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
                <tr><td>6 Apr &mdash; Easter Monday</td><td>Yes</td><td>&mdash;</td><td>Yes</td></tr>
                <tr><td>4 May &mdash; Early May Bank Holiday</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
                <tr><td>25 May &mdash; Spring Bank Holiday</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
                <tr><td>13 Jul &mdash; Battle of the Boyne</td><td>&mdash;</td><td>&mdash;</td><td>Yes</td></tr>
                <tr><td>3 Aug &mdash; Summer Bank Holiday (Scotland)</td><td>&mdash;</td><td>Yes</td><td>&mdash;</td></tr>
                <tr><td>31 Aug &mdash; Summer Bank Holiday</td><td>Yes</td><td>&mdash;</td><td>Yes</td></tr>
                <tr><td>30 Nov &mdash; St Andrew&apos;s Day</td><td>&mdash;</td><td>Yes</td><td>&mdash;</td></tr>
                <tr><td>25 Dec &mdash; Christmas Day</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
                <tr><td>28 Dec &mdash; Boxing Day (substitute)</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
              </tbody>
            </table>
            <p>
              <strong>Totals:</strong> England &amp; Wales = 8 &bull; Scotland = 9 &bull; Northern Ireland = 10
            </p>

            <h2>Are bank holidays included in the 28-day statutory minimum?</h2>
            <p>
              Yes. Under the <strong>Working Time Regulations 1998</strong>, all UK workers are entitled to <strong>5.6 weeks</strong> (28 days for a full-time employee) of paid annual leave. There is no separate legal right to bank holidays on top of that &mdash; the 28 days <strong>can</strong> include bank holidays.
            </p>
            <p>
              In practice, most employers give bank holidays as paid days off and treat them as part of the 28-day entitlement. That typically leaves <strong>20 discretionary days + 8 bank holidays = 28 days</strong>. However, some employers offer bank holidays <em>in addition to</em> 28 days as a benefit &mdash; this is entirely at the employer&apos;s discretion.
            </p>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <p className="text-emerald-800 mb-0">
                <strong>Key point:</strong> There is no legal obligation to give employees the day off on a bank holiday. The obligation is to provide 5.6 weeks of paid leave per year. How you allocate those days is a contractual matter.
              </p>
            </div>

            <h2>Part-time workers and bank holidays</h2>
            <p>
              Part-time employees are entitled to the same <strong>5.6 weeks</strong> of leave, calculated <strong>pro rata</strong>. This includes their share of bank holidays &mdash; even if a bank holiday doesn&apos;t fall on one of their working days.
            </p>
            <p>For example:</p>
            <div className="rounded-xl bg-gray-50 border p-5 my-4">
              <p className="mb-1"><strong>Employee works 3 days per week (Mon, Tue, Wed)</strong></p>
              <p className="mb-1">Pro rata entitlement: 3 &times; 5.6 = <strong>16.8 days</strong></p>
              <p className="mb-1">Most bank holidays fall on a Monday, so they naturally get those off.</p>
              <p className="mb-0">For bank holidays that fall on days they don&apos;t work (e.g. Christmas Day on a Friday), the employer should either give an alternative day off or include the equivalent in their overall allowance.</p>
            </div>
            <p>
              The simplest approach is to give part-time staff a total pro-rata entitlement (including a pro-rata share of bank holidays) and let them book all days &mdash; including bank holidays that fall on their working days &mdash; from that single allowance.
            </p>

            <h2>Best practice for employers</h2>
            <ul className="list-disc pl-6">
              <li><strong>Add all 2026 bank holidays to your leave calendar now</strong> &mdash; don&apos;t wait until the week before each holiday to remember.</li>
              <li><strong>Plan coverage early</strong> &mdash; bank holidays that fall mid-week (like New Year&apos;s Day on a Thursday) often trigger &quot;bridge day&quot; leave requests. Anticipate this and agree cover in advance.</li>
              <li><strong>Communicate your policy clearly</strong> &mdash; make sure employment contracts or your staff handbook states whether bank holidays are included in, or additional to, the 28-day entitlement.</li>
              <li><strong>Handle regional differences</strong> &mdash; if you have employees in Scotland or Northern Ireland, they may be entitled to different bank holidays. Ensure your system supports regional variants.</li>
              <li><strong>Review part-time entitlements</strong> &mdash; double-check that part-time workers receive a fair pro-rata share of bank holiday allowance.</li>
              <li><strong>Consider enhanced offerings</strong> &mdash; offering bank holidays as extra paid leave (above the 28-day minimum) is a popular employee benefit that costs relatively little.</li>
            </ul>

            <h2>Preview: 2027 bank holidays (England &amp; Wales)</h2>
            <p>
              Planning ahead? Here are the provisional 2027 bank holiday dates for England and Wales:
            </p>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Holiday</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1 January</td><td>Friday</td><td>New Year&apos;s Day</td></tr>
                <tr><td>26 March</td><td>Friday</td><td>Good Friday</td></tr>
                <tr><td>29 March</td><td>Monday</td><td>Easter Monday</td></tr>
                <tr><td>3 May</td><td>Monday</td><td>Early May Bank Holiday</td></tr>
                <tr><td>31 May</td><td>Monday</td><td>Spring Bank Holiday</td></tr>
                <tr><td>30 August</td><td>Monday</td><td>Summer Bank Holiday</td></tr>
                <tr><td>27 December</td><td>Monday</td><td>Christmas Day (substitute)</td></tr>
                <tr><td>28 December</td><td>Tuesday</td><td>Boxing Day (substitute)</td></tr>
              </tbody>
            </table>
            <p>
              Note: Christmas Day 2027 falls on a Saturday, so the substitute bank holiday moves to Monday 27 December. Boxing Day falls on a Sunday, with the substitute on Tuesday 28 December.
            </p>

            <h2>How Leavely helps with bank holidays</h2>
            <p>
              Managing bank holidays manually &mdash; especially across multiple UK regions &mdash; is tedious and error-prone. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> takes the hassle out of it:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>UK bank holidays pre-loaded</strong> &mdash; England &amp; Wales, Scotland, and Northern Ireland dates are built in. No manual entry needed.</li>
              <li><strong>Automatic deduction</strong> &mdash; when a bank holiday falls on a working day, it&apos;s automatically deducted from leave balances (if your policy includes bank holidays in the entitlement).</li>
              <li><strong>Regional variants</strong> &mdash; assign the correct bank holiday region to each employee so Scottish and Northern Irish staff see the right dates.</li>
              <li><strong>Part-time calculations built in</strong> &mdash; pro-rata entitlements are calculated correctly, including bank holiday allowances.</li>
              <li><strong>Visual leave calendar</strong> &mdash; bank holidays appear on the team calendar so managers can plan coverage at a glance.</li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Get every bank holiday right, automatically</h3>
            <p className="text-emerald-100 mb-6">Try Leavely free for 14 days &mdash; UK bank holidays pre-loaded, regional variants, and automatic leave deductions.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Related */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK 2026: The Complete Guide &rarr;</Link>
              <Link href="/blog/pro-rata-annual-leave-calculator" className="block text-emerald-600 hover:underline font-medium">How to Calculate Pro Rata Annual Leave UK &rarr;</Link>
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
              <Link href="/blog/holiday-pay-calculation-uk" className="block text-emerald-600 hover:underline font-medium">Holiday Pay Calculation UK: The Complete Guide &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
