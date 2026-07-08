import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/redundancy-annual-leave-uk`

export const metadata: Metadata = {
  title: 'Annual Leave and Redundancy UK: Payment, Accrual & Employee Rights',
  description:
    'Everything UK employers need to know about annual leave during redundancy. Covers holiday accrual during notice, payment in lieu, forcing leave, consultation periods, pro-rata calculations, tax treatment, garden leave, and worked examples.',
  alternates: { canonical: articleUrl },
  keywords: [
    'annual leave redundancy UK',
    'holiday pay redundancy',
    'accrued holiday redundancy',
    'redundancy notice period holiday',
    'payment in lieu holiday redundancy',
  ],
  openGraph: {
    title: 'Annual Leave and Redundancy UK &mdash; Payment, Accrual & Employee Rights',
    description:
      'Holiday accrual during redundancy notice, payment in lieu, forcing leave during notice, consultation period entitlement, pro-rata calculations, tax treatment, and worked examples for UK employers.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Annual Leave and Redundancy UK: Payment, Accrual & Employee Rights',
  description:
    'A comprehensive guide to annual leave rights during redundancy in the UK, covering holiday accrual during notice periods, payment in lieu, forcing leave, consultation periods, pro-rata entitlement, tax treatment, garden leave interactions, and common employer mistakes.',
  url: articleUrl,
  datePublished: '2026-03-25',
  dateModified: '2026-03-25',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function RedundancyAnnualLeaveArticle() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Employment Law</span>
            <span className="text-xs text-gray-400 ml-3">10 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Annual Leave and Redundancy UK: Payment, Accrual &amp; Employee Rights
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Redundancy is stressful enough without getting holiday pay wrong. When employees are made redundant in the UK, they retain full rights to accrued annual leave &mdash; and the rules around accrual, payment in lieu, and forced leave during the notice period catch many employers off guard. Miscalculations can trigger underpayment claims, tribunal cases, or simply erode trust at an already difficult time. This guide covers everything UK employers need to know about annual leave and redundancy, including worked examples with tables, tax treatment, and common pitfalls to avoid.
            </p>

            <h2>Holiday accrual during the redundancy notice period</h2>
            <p>
              An employee who has been given notice of redundancy remains fully employed until their termination date. That means they <strong>continue to accrue annual leave</strong> throughout the entire notice period, whether they are working it, on garden leave, or being paid in lieu of notice (PILON).
            </p>
            <p>
              Under the <strong>Working Time Regulations 1998</strong>, statutory holiday entitlement accrues from the first day of the leave year and continues until employment ends. Redundancy does not pause or freeze accrual. This applies to:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Statutory notice:</strong> the minimum notice required by law (one week per year of service, capped at 12 weeks)</li>
              <li><strong>Contractual notice:</strong> any longer notice period set out in the employment contract</li>
              <li><strong>Payment in lieu of notice (PILON):</strong> even where the employer pays the employee to leave immediately rather than working their notice, leave accrues for the notice period that <em>would have</em> been served &mdash; this is one of the most commonly missed calculations</li>
            </ul>

            <h3>How much extra leave does the notice period add?</h3>
            <p>
              For an employee with 28 days&apos; entitlement, each week of the notice period adds roughly 0.54 days of accrued leave (28 &divide; 52). Over a 12-week statutory notice period, that&apos;s an additional <strong>6.46 days</strong> of accrued holiday. If you forget to include notice-period accrual, you could underpay by almost a full week of holiday pay.
            </p>

            <h2>Payment in lieu of untaken holiday on redundancy</h2>
            <p>
              When employment ends by redundancy, any <strong>accrued but untaken annual leave must be paid out</strong> in the final pay packet. This is a legal requirement under Regulation 14 of the Working Time Regulations 1998 &mdash; no contract clause is needed.
            </p>
            <p>
              Payment in lieu covers:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Statutory leave</strong> (5.6 weeks / 28 days for full-time workers) &mdash; must always be paid out</li>
              <li><strong>Contractual leave</strong> (any entitlement above the 28-day statutory minimum) &mdash; payable only if the contract provides for it, though most do</li>
              <li><strong>Carried-over leave</strong> from a previous year &mdash; included if the employee had a valid reason for not taking it (such as long-term sickness) and the carry-over was permitted under the employer&apos;s policy</li>
            </ul>
            <p>
              The payment must reflect what the employee would have received had they taken the leave as time off. For workers with variable pay, overtime, commission, or regular bonuses, the employer must use the <strong>52-week reference period</strong> to calculate a week&apos;s pay.
            </p>

            <h2>Can an employer force holiday during the redundancy notice period?</h2>
            <p>
              <strong>Yes, but only with proper notice.</strong> Under the Working Time Regulations, an employer has the power to require an employee to take annual leave on specific dates. To do this, the employer must give advance notice equal to <strong>twice the length of the leave being imposed</strong> &mdash; the so-called double-notice rule.
            </p>

            <h3>Double-notice rule in a redundancy context</h3>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Leave imposed</th>
                  <th>Advance notice required</th>
                  <th>Feasible in an 8-week notice period?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2 days</td>
                  <td>4 days</td>
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
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>15 days (3 weeks)</td>
                  <td>30 days (6 weeks)</td>
                  <td>Tight &mdash; must serve notice on day one</td>
                </tr>
                <tr>
                  <td>20 days (4 weeks)</td>
                  <td>40 days (8 weeks)</td>
                  <td>Only just &mdash; and leaves no working days</td>
                </tr>
              </tbody>
            </table>
            <p>
              Where the notice period is too short to satisfy the double-notice requirement for the employee&apos;s entire remaining balance, the employer <strong>must pay in lieu</strong> for the days that cannot be imposed. In redundancy situations with short notice, this is extremely common.
            </p>
            <p>
              There is also a <strong>practical consideration</strong>: forcing someone to use up all their remaining leave during a redundancy notice period can feel punitive. If the employee is already upset about losing their job, requiring them to &quot;waste&quot; their holiday rather than receiving payment can fuel grievances or even constructive dismissal claims if handled insensitively.
            </p>

            <h2>Holiday entitlement during the consultation period</h2>
            <p>
              When an employer is proposing redundancies, a formal <strong>consultation period</strong> is legally required in many situations. The length depends on the number of redundancies:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>20&ndash;99 redundancies:</strong> minimum 30-day consultation period</li>
              <li><strong>100+ redundancies:</strong> minimum 45-day consultation period</li>
              <li><strong>Fewer than 20:</strong> no minimum period, but individual consultation is still expected</li>
            </ul>
            <p>
              Throughout the consultation period, employees remain employed and <strong>continue to accrue annual leave</strong>. Even if their workload is reduced or they are not required to attend the workplace, accrual does not stop.
            </p>
            <p>
              For large-scale redundancies with a 45-day consultation period followed by a 12-week notice period, the combined time can be nearly four months. An employee with 28 days&apos; entitlement accrues approximately <strong>9.3 days</strong> of additional leave over that period. This can be a significant and unexpected cost if not factored into the redundancy budget.
            </p>

            <h2>Calculating pro-rata entitlement on redundancy</h2>
            <p>
              The formula for calculating how much leave an employee has accrued up to their termination date is straightforward:
            </p>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <p className="text-emerald-800 font-mono text-center text-lg mb-4">
                <strong>Accrued entitlement = (Calendar days from start of leave year to termination date &divide; 365) &times; Annual entitlement</strong>
              </p>
              <p className="text-emerald-700 text-sm text-center mb-0">
                Then: <strong>Payment in lieu = Accrued entitlement &minus; Leave already taken</strong>
              </p>
            </div>

            <h3>Worked example 1: full-time employee made redundant mid-year</h3>
            <p>
              Emma has 28 days&apos; annual leave per year. Her leave year runs January to December. She is made redundant with a termination date of 31 August (243 days into the leave year). She has taken 12 days of leave so far.
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
                  <td>(243 &divide; 365) &times; 28</td>
                  <td>18.63 days</td>
                </tr>
                <tr>
                  <td>Leave already taken</td>
                  <td>&mdash;</td>
                  <td>12.00 days</td>
                </tr>
                <tr>
                  <td><strong>Payment in lieu owed</strong></td>
                  <td>18.63 &minus; 12.00</td>
                  <td><strong>6.63 days</strong></td>
                </tr>
              </tbody>
            </table>
            <p>
              If Emma earns &pound;32,000 per year, her daily rate is &pound;32,000 &divide; 260 working days = &pound;123.08. The payment in lieu would be 6.63 &times; &pound;123.08 = <strong>&pound;816.02</strong>.
            </p>

            <h3>Worked example 2: employee with PILON (payment in lieu of notice)</h3>
            <p>
              Tom has 25 days&apos; entitlement and a leave year running April to March. He is informed of redundancy on 15 September (168 days into the leave year). His contractual notice period is 8 weeks, but the employer pays him in lieu of notice rather than requiring him to work it. His effective termination date for leave accrual purposes is therefore 10 November (224 days into the leave year). He has taken 9 days of leave.
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
                  <td>Accrued entitlement (to end of notional notice)</td>
                  <td>(224 &divide; 365) &times; 25</td>
                  <td>15.34 days</td>
                </tr>
                <tr>
                  <td>Leave already taken</td>
                  <td>&mdash;</td>
                  <td>9.00 days</td>
                </tr>
                <tr>
                  <td><strong>Payment in lieu owed</strong></td>
                  <td>15.34 &minus; 9.00</td>
                  <td><strong>6.34 days</strong></td>
                </tr>
              </tbody>
            </table>
            <p>
              <strong>Key point:</strong> if the employer had only calculated accrual to 15 September (168 days), the accrued entitlement would have been 11.51 days &mdash; and the payment in lieu would have been just 2.51 days. The 8-week notice period adds almost 4 extra days of holiday pay. Missing this is one of the most common errors in redundancy calculations.
            </p>

            <h3>Worked example 3: part-time employee with pro-rata entitlement</h3>
            <p>
              Rachel works 3 days per week and has a pro-rata entitlement of 16.8 days (28 &times; 3/5). Her leave year runs January to December and she is made redundant on 30 April (120 days into the leave year). She has taken 4 days of leave.
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
                  <td>(120 &divide; 365) &times; 16.8</td>
                  <td>5.52 days</td>
                </tr>
                <tr>
                  <td>Leave already taken</td>
                  <td>&mdash;</td>
                  <td>4.00 days</td>
                </tr>
                <tr>
                  <td><strong>Payment in lieu owed</strong></td>
                  <td>5.52 &minus; 4.00</td>
                  <td><strong>1.52 days</strong></td>
                </tr>
              </tbody>
            </table>
            <p>
              For part-time workers, the daily rate must reflect their actual working pattern. If Rachel earns &pound;24,000 (pro-rata), her daily rate is &pound;24,000 &divide; 156 working days (3 days &times; 52 weeks) = &pound;153.85. The payment in lieu would be 1.52 &times; &pound;153.85 = <strong>&pound;233.85</strong>.
            </p>

            <h2>Tax treatment of holiday pay on redundancy</h2>
            <p>
              This is an area where employers frequently make costly mistakes. <strong>Holiday pay in lieu is treated as earnings</strong> &mdash; it is not a termination payment and does not qualify for the &pound;30,000 tax-free exemption that applies to statutory redundancy pay and compensation for loss of office.
            </p>
            <p>
              Holiday pay in lieu must be:
            </p>
            <ul className="list-disc pl-6">
              <li>Included in the employee&apos;s final payslip as <strong>taxable earnings</strong></li>
              <li>Subject to PAYE income tax at the employee&apos;s marginal rate</li>
              <li>Subject to employee and employer <strong>National Insurance contributions</strong></li>
              <li>Reported on the Full Payment Submission (FPS) to HMRC</li>
            </ul>

            <h3>What about the &pound;30,000 exemption?</h3>
            <p>
              Statutory redundancy pay is exempt from income tax and NICs up to &pound;30,000. Enhanced (contractual) redundancy pay may also fall within the exemption, depending on its nature. However, <strong>holiday pay in lieu is always fully taxable</strong>, even when it is paid alongside a redundancy payment.
            </p>
            <p>
              A common error is to lump holiday pay, notice pay, and redundancy pay together and apply the &pound;30,000 threshold to the total. HMRC will challenge this, and the employer could face penalties and interest. Keep these as <strong>separate line items</strong> in the final pay calculation:
            </p>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Payment type</th>
                  <th>Tax treatment</th>
                  <th>NICs treatment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Holiday pay in lieu</td>
                  <td>Fully taxable (PAYE)</td>
                  <td>Fully liable</td>
                </tr>
                <tr>
                  <td>Payment in lieu of notice (contractual PILON)</td>
                  <td>Fully taxable (PAYE)</td>
                  <td>Fully liable</td>
                </tr>
                <tr>
                  <td>Payment in lieu of notice (non-contractual PILON)</td>
                  <td>Taxable via post-employment notice pay rules</td>
                  <td>Liable via post-employment notice pay rules</td>
                </tr>
                <tr>
                  <td>Statutory redundancy pay</td>
                  <td>Exempt (within &pound;30,000)</td>
                  <td>Exempt</td>
                </tr>
                <tr>
                  <td>Enhanced redundancy pay</td>
                  <td>Exempt (within &pound;30,000 total)</td>
                  <td>Exempt (within &pound;30,000 total)</td>
                </tr>
              </tbody>
            </table>

            <h2>Redundancy and garden leave</h2>
            <p>
              <strong>Garden leave</strong> is where an employee is told not to attend work during their notice period but remains employed and paid. It is commonly used in redundancy situations where there are concerns about data security, client relationships, or morale.
            </p>
            <p>
              The key question is whether <strong>annual leave can run concurrently</strong> with garden leave, effectively reducing the holiday balance the employer needs to pay out:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Contract includes a garden leave holiday clause:</strong> many well-drafted contracts state that the employer may require outstanding annual leave to be taken during garden leave. If this clause exists, the employer can set off holiday against garden leave days, reducing the payment in lieu at termination.
              </li>
              <li>
                <strong>Contract is silent:</strong> the employer can use the statutory double-notice power to require leave during garden leave, but this must be done <strong>explicitly in writing</strong>. Simply placing someone on garden leave does <em>not</em> automatically use up holiday.
              </li>
            </ul>
            <p>
              <strong>Important:</strong> even with a contractual clause, the employee must have a genuine opportunity to rest and enjoy the leave. If the employer is simultaneously requiring the employee to be available for handover queries, respond to emails, or attend meetings during &quot;garden leave,&quot; a tribunal could find that the leave was not genuinely taken &mdash; and the employer would still owe payment in lieu.
            </p>

            <h2>What happens if the employee has taken more leave than they&apos;ve accrued?</h2>
            <p>
              If an employee is made redundant partway through the leave year and has already taken more holiday than their pro-rata accrual, they have been <strong>overpaid</strong>. Whether the employer can recover this depends on the contract:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Clawback clause exists:</strong> if the employment contract includes a clause allowing the employer to deduct overpaid holiday from final pay, the employer can make the deduction lawfully under the Employment Rights Act 1996, s13.
              </li>
              <li>
                <strong>No clawback clause:</strong> deducting from final pay without a written agreement is an unlawful deduction from wages. The employer would need to pursue recovery as a civil debt.
              </li>
              <li>
                <strong>Practical reality in redundancy:</strong> even where a clawback clause exists, many employers choose <strong>not to deduct</strong> overpaid holiday from a redundancy pay packet. Doing so can feel punitive, may fuel unfair dismissal claims, and the amounts involved are usually small relative to the overall cost of the redundancy exercise.
              </li>
            </ul>

            <h2>Common employer mistakes with holiday and redundancy</h2>
            <p>
              Based on the most frequent payroll and HR errors in redundancy situations, here are the pitfalls every employer should avoid:
            </p>
            <ol className="list-decimal pl-6">
              <li>
                <strong>Forgetting that leave accrues during the notice period.</strong> Whether the employee works their notice, is on garden leave, or receives PILON, holiday continues to accrue until the effective termination date. A 12-week notice period adds roughly 6.5 days for a full-time employee with 28 days&apos; entitlement.
              </li>
              <li>
                <strong>Ignoring accrual during the consultation period.</strong> Employees accrue leave throughout the 30- or 45-day consultation period. For large-scale redundancies, this can add several days per employee &mdash; a significant cost across the workforce.
              </li>
              <li>
                <strong>Calculating accrual only to the date notice was given, not the termination date.</strong> If you tell an employee on 1 June that they are being made redundant and their notice expires on 31 August, accrual runs to 31 August, not 1 June.
              </li>
              <li>
                <strong>Assuming garden leave absorbs holiday automatically.</strong> Unless the contract explicitly provides for this or the employer gives proper statutory notice, garden leave and annual leave run independently.
              </li>
              <li>
                <strong>Forcing leave without giving double notice.</strong> Telling an employee to take their remaining 10 days requires at least 20 days&apos; advance notice. Getting this wrong means the employee can refuse, and the employer must pay in lieu instead.
              </li>
              <li>
                <strong>Applying the &pound;30,000 tax exemption to holiday pay.</strong> Holiday pay in lieu is earnings, not a termination payment. It must be taxed through PAYE and is liable for National Insurance contributions.
              </li>
              <li>
                <strong>Using basic pay only for variable-hours workers.</strong> For employees with overtime, commission, or regular bonuses, holiday pay must reflect normal remuneration using the 52-week reference period.
              </li>
              <li>
                <strong>Rounding down accrued entitlement.</strong> There is no statutory basis for rounding down. If the calculation produces 6.63 days, the employee is owed 6.63 days. Any rounding should be in the employee&apos;s favour.
              </li>
              <li>
                <strong>Deducting overpaid holiday without a contractual right.</strong> Without a written clawback clause, deducting from final pay is an unlawful deduction from wages &mdash; regardless of how obvious the overpayment may seem.
              </li>
              <li>
                <strong>Failing to separate payment types in the final pay packet.</strong> Redundancy pay, notice pay, and holiday pay in lieu must each be calculated and reported separately to HMRC. Combining them creates tax errors and compliance risk.
              </li>
            </ol>

            <h2>How Leavely calculates remaining entitlement on redundancy</h2>
            <p>
              Manually calculating accrued leave, used days, payment in lieu, and clawback amounts across a redundancy exercise is time-consuming and error-prone &mdash; especially when you factor in part-time pro-rata calculations, carry-over rules, PILON adjustments, and variable leave years. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> handles all of it automatically:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Real-time accrual tracking:</strong> Leavely calculates accrued entitlement on any given date. When you begin a redundancy process, you can instantly see how much leave each affected employee will have earned up to their projected termination date &mdash; including notice-period accrual.
              </li>
              <li>
                <strong>Instant balance visibility:</strong> used, pending, and remaining leave are shown at a glance for every employee. No spreadsheets, no manual counting, no guesswork during a stressful process.
              </li>
              <li>
                <strong>Payment in lieu calculation:</strong> Leavely shows the outstanding balance that must be paid in lieu, so payroll can process final payments accurately without separate manual calculations.
              </li>
              <li>
                <strong>Part-time and variable pattern support:</strong> pro-rata entitlements for part-time workers, compressed hours, and non-standard patterns are calculated automatically. No more fumbling with spreadsheet formulas during a redundancy exercise.
              </li>
              <li>
                <strong>Policy-aware automation:</strong> carry-over limits, bank holidays, and company leave blocks are all factored in &mdash; so the figures you see already account for every policy rule your organisation has set up.
              </li>
              <li>
                <strong>Full audit trail:</strong> every leave request, approval, cancellation, and balance adjustment is logged with timestamps and user details. If a departing employee disputes their holiday pay, you have a clear, defensible record.
              </li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Get redundancy holiday pay right every time</h3>
            <p className="text-emerald-100 mb-6">Leavely calculates accrued entitlement, remaining balances, and payment in lieu automatically &mdash; even across complex redundancy exercises. Start your 14-day free trial.</p>
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
              <Link href="/blog/holiday-pay-during-notice-period-uk" className="block text-emerald-600 hover:underline font-medium">
                Holiday Pay During Notice Period UK: Calculation, Rights &amp; Common Mistakes &rarr;
              </Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">
                Annual Leave Entitlement UK 2026: The Complete Guide &rarr;
              </Link>
              <Link href="/blog/holiday-pay-calculation-uk" className="block text-emerald-600 hover:underline font-medium">
                Holiday Pay Calculation UK: How to Get It Right &rarr;
              </Link>
              <Link href="/blog/garden-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Garden Leave UK: What Employers Need to Know &rarr;
              </Link>
              <Link href="/blog/annual-leave-during-notice-period-uk" className="block text-emerald-600 hover:underline font-medium">
                Annual Leave During Notice Period UK: Rules for Employers &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
