import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/holiday-pay-during-notice-period-uk`

export const metadata: Metadata = {
  title: 'Holiday Pay During Notice Period UK: Calculation, Rights & Common Mistakes',
  description:
    'How to handle holiday pay during notice periods in the UK. Covers accrued holiday on termination, payment in lieu, employer rights to force leave, garden leave, redundancy, tax treatment, and worked examples.',
  alternates: { canonical: articleUrl },
  keywords: [
    'holiday pay during notice period UK',
    'holiday entitlement during notice',
    'accrued holiday pay on leaving',
    'payment in lieu of holiday UK',
    'can employer force holiday during notice',
    'holiday pay final pay UK',
  ],
  openGraph: {
    title: 'Holiday Pay During Notice Period UK &mdash; Calculation, Rights & Common Mistakes',
    description:
      'Accrued holiday on termination, payment in lieu, employer rights to force leave, garden leave interactions, redundancy, and worked examples for UK employers.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Holiday Pay During Notice Period UK: Calculation, Rights & Common Mistakes',
  description:
    'A comprehensive guide to holiday pay during notice periods in the UK, covering accrued holiday on termination, payment in lieu, employer rights, garden leave, redundancy, tax treatment, and common mistakes.',
  url: articleUrl,
  datePublished: '2026-03-25',
  dateModified: '2026-03-25',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function HolidayPayDuringNoticePeriodArticle() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Leave Calculations</span>
            <span className="text-xs text-gray-400 ml-3">9 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Holiday Pay During Notice Period UK: Calculation, Rights &amp; Common Mistakes
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              One of the trickiest parts of an employee&apos;s departure is getting holiday pay right during the notice period. Whether someone has resigned, been made redundant, or been dismissed, you need to know how much holiday they&apos;ve accrued, what they&apos;ve already taken, whether you can require them to use remaining leave, and what ends up in the final pay packet. Get it wrong and you face underpayment claims, tribunal risk, or unnecessary overspend. This guide walks through every aspect UK employers need to understand.
            </p>

            <h2>Can employees take holiday during their notice period?</h2>
            <p>
              <strong>Yes &mdash; this is a statutory right.</strong> An employee who is working their notice period remains employed in every sense. They continue to accrue annual leave under the <strong>Working Time Regulations 1998</strong>, and they retain the right to request time off just as they would at any other point in the year.
            </p>
            <p>
              The employer can still approve or refuse a holiday request during notice using the normal rules. To refuse, the employer must give <strong>counter-notice</strong> of at least the same length as the leave requested. For example, refusing a 4-day holiday request requires at least 4 days&apos; notice of the refusal.
            </p>
            <p>
              In practice, most employers approve reasonable requests. However, if the departure involves a critical handover, the employer has a legitimate business reason to refuse and can instead offer to pay any untaken leave in lieu at the end of employment.
            </p>

            <h2>Can employers force employees to take holiday during notice?</h2>
            <p>
              <strong>Yes, with proper notice.</strong> This is one of the most commonly misunderstood areas. Under the Working Time Regulations, an employer can <em>require</em> an employee to take annual leave on specific dates. The catch is the <strong>double-notice rule</strong>: the employer must give notice equal to twice the length of the leave being imposed.
            </p>

            <h3>The double-notice rule explained</h3>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Leave imposed</th>
                  <th>Advance notice required</th>
                  <th>Possible in a 4-week notice period?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1 day</td>
                  <td>2 days</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>3 days</td>
                  <td>6 days</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>5 days (1 week)</td>
                  <td>10 days (2 weeks)</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>10 days (2 weeks)</td>
                  <td>20 days (4 weeks)</td>
                  <td>Barely &mdash; must serve notice on day one</td>
                </tr>
                <tr>
                  <td>15 days</td>
                  <td>30 days</td>
                  <td>No &mdash; exceeds 4-week period</td>
                </tr>
              </tbody>
            </table>
            <p>
              If the notice period is too short to satisfy the double-notice rule for all remaining leave, the employer must <strong>pay in lieu</strong> for any days that cannot be imposed. This commonly happens with employees on short (1&ndash;2 week) notice periods who have large accrued balances.
            </p>
            <p>
              Any instruction to take leave during notice must be given <strong>in writing</strong>, specifying the exact dates. Verbal instructions are enforceable in theory but create evidence problems if disputed.
            </p>

            <h2>Calculating accrued but untaken holiday on termination</h2>
            <p>
              When employment ends, the employer must calculate how much leave the employee has earned (accrued) up to their last day, subtract what they&apos;ve already taken, and either pay or deduct the difference. This applies regardless of whether the employee resigned, was dismissed, or was made redundant.
            </p>

            <h3>The accrual formula</h3>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <p className="text-emerald-800 font-mono text-center text-lg mb-4">
                <strong>Accrued entitlement = (Calendar days worked in leave year &divide; 365) &times; Annual entitlement</strong>
              </p>
              <p className="text-emerald-700 text-sm text-center mb-0">
                Then: <strong>Payment in lieu = Accrued entitlement &minus; Leave already taken</strong>
              </p>
            </div>

            <h3>Worked example 1: employee leaves mid-year with untaken leave</h3>
            <p>
              Sarah has 28 days&apos; annual leave per year. Her leave year runs January to December. She resigns and her last day is 30 June (181 days into the leave year). She has taken 8 days of leave so far.
            </p>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Calculation</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Accrued entitlement</td>
                  <td>(181 &divide; 365) &times; 28</td>
                  <td>13.88 days</td>
                </tr>
                <tr>
                  <td>Leave already taken</td>
                  <td>&mdash;</td>
                  <td>8.00 days</td>
                </tr>
                <tr>
                  <td><strong>Payment in lieu owed</strong></td>
                  <td>13.88 &minus; 8.00</td>
                  <td><strong>5.88 days</strong></td>
                </tr>
              </tbody>
            </table>
            <p>
              If Sarah earns &pound;30,000 per year, her daily rate is &pound;30,000 &divide; 260 working days = &pound;115.38. The payment in lieu would be 5.88 &times; &pound;115.38 = <strong>&pound;678.43</strong>.
            </p>

            <h3>Worked example 2: employee has taken more leave than accrued</h3>
            <p>
              James has 25 days&apos; entitlement. His leave year runs April to March. He resigns on 31 July (122 days into the leave year) having already taken 12 days of leave.
            </p>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Calculation</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Accrued entitlement</td>
                  <td>(122 &divide; 365) &times; 25</td>
                  <td>8.36 days</td>
                </tr>
                <tr>
                  <td>Leave already taken</td>
                  <td>&mdash;</td>
                  <td>12.00 days</td>
                </tr>
                <tr>
                  <td><strong>Overpaid by</strong></td>
                  <td>12.00 &minus; 8.36</td>
                  <td><strong>3.64 days</strong></td>
                </tr>
              </tbody>
            </table>
            <p>
              James has been overpaid by 3.64 days of holiday. Whether the employer can recover this depends on the contract &mdash; see the next section.
            </p>

            <h2>Deducting overpaid holiday on termination</h2>
            <p>
              When an employee has taken more leave than they&apos;ve accrued at the point of termination, the employer is left out of pocket. Recovery is <strong>legal but tricky</strong>, and the rules differ depending on whether the employee resigned or was dismissed.
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Contractual clawback clause exists:</strong> if the employment contract includes a clause allowing the employer to deduct overpaid holiday from final pay, the employer can make the deduction. This is the cleanest route and is enforceable under the <strong>Employment Rights Act 1996, s13</strong> (lawful deductions agreed in writing).
              </li>
              <li>
                <strong>No clawback clause:</strong> without a written agreement, deducting from final pay risks an unlawful deduction from wages claim. The employer would need to pursue the overpayment as a civil debt, which is rarely cost-effective for a few days&apos; pay.
              </li>
              <li>
                <strong>Dismissal or redundancy:</strong> even where a clawback clause exists, deducting overpaid holiday from a redundancy payment or dismissal pay packet can be <strong>politically sensitive</strong> and may fuel unfair dismissal claims. Many employers choose to write off small amounts as a goodwill gesture.
              </li>
            </ul>
            <p>
              <strong>Best practice:</strong> always include a holiday clawback clause in employment contracts. It is much easier to waive a right you have than to enforce one you don&apos;t.
            </p>

            <h2>Garden leave and holiday pay</h2>
            <p>
              <strong>Garden leave</strong> is when an employee is instructed not to attend work during their notice period but remains employed and paid. It is not the same as annual leave &mdash; the employee is technically available for work if recalled, whereas a worker on annual leave is not.
            </p>
            <p>
              The critical question is whether <strong>annual leave can run concurrently</strong> with garden leave, effectively reducing the holiday balance the employer must pay out at the end.
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Contract includes a garden leave holiday clause:</strong> many well-drafted contracts state that the employer can require any outstanding annual leave to be taken during garden leave. If this clause exists, the employer can set off holiday against garden leave days, reducing the payment in lieu at termination.
              </li>
              <li>
                <strong>Contract is silent:</strong> the employer can still use the statutory double-notice power to require leave, but this must be done explicitly. Simply placing someone on garden leave does <em>not</em> automatically use up their holiday entitlement.
              </li>
            </ul>
            <p>
              A common mistake is assuming that garden leave &quot;absorbs&quot; annual leave. Unless the contract says so or the employer gives proper notice under the Working Time Regulations, the employee will leave with their full holiday balance outstanding &mdash; and the employer will owe payment in lieu on top of the garden leave pay already given.
            </p>

            <h2>Redundancy and holiday pay</h2>
            <p>
              When employees are made redundant, their holiday pay rights are <strong>exactly the same</strong> as in any other termination. However, redundancy situations often create additional complications:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Consultation periods:</strong> employees continue to accrue leave during the consultation period, even if they are not working. For large-scale redundancies with 45-day consultation periods, this can add several days to the accrued balance.
              </li>
              <li>
                <strong>Trial periods in alternative roles:</strong> if an employee accepts a trial period in an alternative role under s138 of the Employment Rights Act, they continue to accrue leave throughout. If the trial fails and they are ultimately made redundant, the accrual covers the entire period.
              </li>
              <li>
                <strong>Early release:</strong> if an employer pays the employee in lieu of notice rather than requiring them to work it, the employee still accrues leave for the notice period they <em>would have</em> worked. This is often missed in calculations.
              </li>
            </ul>
            <p>
              Redundancy pay itself is separate from holiday pay &mdash; one does not offset the other. The final pay packet must include both the statutory (or enhanced) redundancy payment <em>and</em> any accrued but untaken holiday pay.
            </p>

            <h2>The correct reference period for holiday pay calculation</h2>
            <p>
              For employees with fixed hours and fixed pay, calculating a day&apos;s holiday pay is simple: divide annual salary by the number of working days in the year (typically 260). But for workers with <strong>variable hours, overtime, commission, or regular bonuses</strong>, the employer must use a <strong>52-week reference period</strong>.
            </p>
            <p>
              Under the Working Time Regulations (amended in 2020), the reference period works as follows:
            </p>
            <ol className="list-decimal pl-6">
              <li>Look back at the <strong>52 weeks</strong> immediately before the calculation date (the termination date, in this case).</li>
              <li><strong>Exclude</strong> any weeks in which the worker earned nothing (e.g., unpaid leave, sick leave, furlough).</li>
              <li>If excluding weeks means you don&apos;t have 52 weeks of data, go back further &mdash; up to a maximum of <strong>104 weeks</strong>.</li>
              <li>Average the remaining weeks&apos; pay to arrive at a <strong>week&apos;s pay figure</strong>.</li>
              <li>Divide by the number of days normally worked per week to get a <strong>day&apos;s pay</strong>.</li>
            </ol>

            <h3>What counts as &quot;pay&quot; in the reference period?</h3>
            <p>
              Following the landmark <em>British Gas Trading v Lock</em> and <em>Bear Scotland v Fulton</em> cases, holiday pay must reflect <strong>normal remuneration</strong>, not just basic pay. This includes:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Regular overtime</strong> &mdash; whether compulsory or voluntary, if it is worked regularly enough to be &quot;normal&quot;</li>
              <li><strong>Commission</strong> &mdash; results-based commission that forms part of normal earnings</li>
              <li><strong>Regular bonuses</strong> &mdash; performance or attendance bonuses paid consistently</li>
              <li><strong>Shift allowances</strong> &mdash; premium payments for unsociable hours worked regularly</li>
            </ul>
            <p>
              Purely discretionary one-off bonuses and expenses reimbursements are <strong>not</strong> included. However, the line between &quot;regular&quot; and &quot;discretionary&quot; can be blurry, and tribunals will look at the substance rather than the label.
            </p>

            <h3>Worked example 3: variable-hours worker leaving employment</h3>
            <p>
              Priya works irregular shifts at a hospitality business. Her 52-week average (excluding 4 weeks of unpaid leave) gives a weekly pay figure of &pound;480. She normally works 4 days per week, so her daily rate is &pound;480 &divide; 4 = <strong>&pound;120 per day</strong>.
            </p>
            <p>
              She leaves 200 days into the leave year with 20 days&apos; statutory entitlement. She has taken 7 days.
            </p>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Step</th>
                  <th>Calculation</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Accrued entitlement</td>
                  <td>(200 &divide; 365) &times; 20</td>
                  <td>10.96 days</td>
                </tr>
                <tr>
                  <td>Leave already taken</td>
                  <td>&mdash;</td>
                  <td>7.00 days</td>
                </tr>
                <tr>
                  <td>Payment in lieu (days)</td>
                  <td>10.96 &minus; 7.00</td>
                  <td>3.96 days</td>
                </tr>
                <tr>
                  <td><strong>Payment in lieu (&pound;)</strong></td>
                  <td>3.96 &times; &pound;120</td>
                  <td><strong>&pound;475.20</strong></td>
                </tr>
              </tbody>
            </table>

            <h2>Tax treatment of holiday pay in the final pay packet</h2>
            <p>
              Holiday pay in lieu is treated as <strong>earnings</strong> for tax and National Insurance purposes. It is <em>not</em> a termination payment and does not qualify for the &pound;30,000 tax-free threshold that applies to redundancy payments and compensation for loss of office.
            </p>
            <p>
              This means holiday pay in lieu must be:
            </p>
            <ul className="list-disc pl-6">
              <li>Included in the employee&apos;s final payslip</li>
              <li>Subjected to PAYE income tax at the employee&apos;s marginal rate</li>
              <li>Subjected to employee and employer National Insurance contributions</li>
              <li>Reported on the Full Payment Submission (FPS) to HMRC in the normal way</li>
            </ul>
            <p>
              A common error is to lump holiday pay in lieu together with a redundancy payment and apply the &pound;30,000 exemption to the total. HMRC will challenge this and the employer could face penalties. Keep holiday pay and any termination payment as <strong>separate line items</strong> in the final pay calculation.
            </p>

            <h2>Common employer mistakes</h2>
            <p>
              Based on the most frequent payroll and HR errors we see, here are the pitfalls to avoid:
            </p>
            <ol className="list-decimal pl-6">
              <li>
                <strong>Forgetting that leave accrues during the notice period.</strong> Employees don&apos;t stop accruing on the day they hand in their notice. A 3-month notice period adds roughly a quarter of the annual entitlement to the balance.
              </li>
              <li>
                <strong>Forcing leave without proper notice.</strong> Simply telling an employee &quot;use your remaining leave next week&quot; isn&apos;t enough. You must give written notice of at least twice the length of the leave being imposed.
              </li>
              <li>
                <strong>Assuming garden leave uses up holiday.</strong> Unless the contract explicitly allows it or you give statutory notice, garden leave and annual leave run independently.
              </li>
              <li>
                <strong>Using basic pay only for the reference period calculation.</strong> For variable-hours workers, overtime, commission, and regular bonuses must be included when calculating a day&apos;s holiday pay.
              </li>
              <li>
                <strong>Deducting overpaid holiday without a contractual clause.</strong> Without a written clawback agreement, deducting from final pay is an unlawful deduction from wages.
              </li>
              <li>
                <strong>Applying the &pound;30,000 tax exemption to holiday pay in lieu.</strong> Holiday pay is earnings, not a termination payment. It is fully taxable and NI-able.
              </li>
              <li>
                <strong>Ignoring accrual during redundancy consultation.</strong> Employees accrue leave throughout consultation periods, trial periods, and any notice period paid in lieu.
              </li>
              <li>
                <strong>Rounding down accrued leave.</strong> There is no statutory basis for rounding down. If the calculation produces 13.88 days, the employee is owed 13.88 days. Rounding should be in the employee&apos;s favour or not done at all.
              </li>
            </ol>

            <h2>How Leavely automatically calculates remaining entitlement at termination</h2>
            <p>
              Manually working out accrued leave, used days, payment in lieu, and overpayment clawbacks is time-consuming and error-prone &mdash; especially when you factor in part-time pro-rata calculations, carry-over rules, and variable leave years. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> handles all of it automatically:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Real-time accrual tracking:</strong> Leavely calculates accrued entitlement on any given date, so when an employee gives notice, you can instantly see how much leave they will have earned up to their termination date.
              </li>
              <li>
                <strong>Instant balance visibility:</strong> used, pending, and remaining leave are shown at a glance. No spreadsheets, no manual counting.
              </li>
              <li>
                <strong>Payment in lieu calculation:</strong> Leavely shows the outstanding balance that must be paid in lieu, reducing the risk of under- or over-payment in the final pay packet.
              </li>
              <li>
                <strong>Policy-aware automation:</strong> carry-over limits, pro-rata calculations, bank holidays, and leave year settings are all factored in automatically &mdash; even for part-time employees on non-standard patterns.
              </li>
              <li>
                <strong>Full audit trail:</strong> every leave request, approval, cancellation, and balance adjustment is logged with timestamps and user details, giving you a clear record if any dispute arises after the employee has left.
              </li>
              <li>
                <strong>Team calendar context:</strong> when deciding whether to approve leave during a notice period or require the employee to work, you can see at a glance who else is off and whether coverage is adequate.
              </li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Get termination holiday pay right every time</h3>
            <p className="text-emerald-100 mb-6">Leavely calculates accrued entitlement, remaining balances, and payment in lieu automatically &mdash; no spreadsheets required. Start your 14-day free trial.</p>
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
              <Link href="/blog/annual-leave-during-notice-period-uk" className="block text-emerald-600 hover:underline font-medium">
                Annual Leave During Notice Period UK: Rules for Employers &rarr;
              </Link>
              <Link href="/blog/holiday-pay-calculation-uk" className="block text-emerald-600 hover:underline font-medium">
                Holiday Pay Calculation UK: How to Get It Right &rarr;
              </Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">
                Annual Leave Entitlement UK 2026: The Complete Guide &rarr;
              </Link>
              <Link href="/blog/garden-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Garden Leave UK: What Employers Need to Know &rarr;
              </Link>
              <Link href="/blog/pro-rata-annual-leave-calculator" className="block text-emerald-600 hover:underline font-medium">
                Pro Rata Annual Leave Calculator: Work Out Part-Time Entitlement &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
