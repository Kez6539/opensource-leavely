import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/shift-worker-holiday-entitlement-uk`

export const metadata: Metadata = {
  title: 'Shift Worker Holiday Entitlement UK: How to Calculate It (2026)',
  description:
    'Complete guide to shift worker holiday entitlement in the UK. Covers rotating shifts, night shifts, 12.07% accrual, hours-based vs days-based methods, zero-hour contracts, and the Harpur Trust v Brazel ruling.',
  alternates: { canonical: articleUrl },
  keywords: [
    'shift worker holiday entitlement UK',
    'holiday accrual shift workers',
    '12.07% holiday calculation',
    'night shift holiday entitlement',
    'rotating shift holiday calculation',
    'variable hours holiday UK',
  ],
  openGraph: {
    title: 'Shift Worker Holiday Entitlement UK — How to Calculate Leave for Irregular Hours',
    description:
      'Rotating shifts, night shifts, 12.07% accrual, hours-based calculations, and zero-hour contracts explained.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Shift Worker Holiday Entitlement UK: How to Calculate Leave for Irregular Hours',
  description: 'A comprehensive guide to calculating holiday entitlement for shift workers in the UK, covering rotating patterns, night shifts, the 12.07% accrual method, zero-hour contracts, and the Harpur Trust v Brazel ruling.',
  url: articleUrl,
  datePublished: '2026-03-25',
  dateModified: '2026-03-25',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function ShiftWorkerHolidayEntitlementArticle() {
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
            <span className="text-xs text-gray-400 ml-3">11 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Shift Worker Holiday Entitlement UK: How to Calculate Leave for Irregular Hours
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Calculating holiday entitlement for shift workers is one of the most error-prone areas of UK employment law. Unlike a standard 9-to-5 employee, shift workers may rotate between days and nights, work irregular hours from week to week, or follow patterns that don&apos;t map neatly onto calendar days. Get it wrong and you risk underpayment claims, tribunal cases, and significant back-pay liabilities. This guide explains exactly how to calculate leave for shift workers in the UK &mdash; with worked examples, tables, and practical advice for 2026.
            </p>

            <h2>The legal basis: 5.6 weeks of statutory leave</h2>
            <p>
              Every worker in the UK &mdash; including shift workers, night workers, and those on zero-hour contracts &mdash; is entitled to a minimum of <strong>5.6 weeks</strong> of paid annual leave per year. This right comes from the <strong>Working Time Regulations 1998</strong> (WTR), which implement the EU Working Time Directive into UK law.
            </p>
            <p>
              For a standard full-time worker on a 5-day week, 5.6 weeks translates to 28 days (5 &times; 5.6). But that 28-day figure is only a convenient shorthand &mdash; the statute is written in <strong>weeks</strong>, not days. This distinction is critical for shift workers, because their &quot;week&quot; may look nothing like a standard Monday-to-Friday pattern.
            </p>
            <p>
              Employers can include the eight UK bank holidays within the 5.6-week entitlement, but they are not required to give bank holidays on top of it. The statutory minimum is 5.6 weeks in total. Any additional leave above this is a contractual benefit, not a legal requirement.
            </p>

            <h2>Why shift workers are complicated</h2>
            <p>
              For a Monday-to-Friday office worker, leave management is straightforward: one day of leave equals one day of entitlement used. But shift workers introduce several complications that make standard calculations unreliable:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Rotating patterns:</strong> A worker on a 3-on, 4-off pattern works different days each week. Their &quot;working week&quot; doesn&apos;t align with a calendar week.</li>
              <li><strong>Variable shift lengths:</strong> Shifts might be 8, 10, or 12 hours long. A &quot;day off&quot; could represent 8 hours or 12 hours of leave.</li>
              <li><strong>Night shifts straddling midnight:</strong> A shift from 10pm to 6am spans two calendar dates. Which &quot;day&quot; is the worker taking leave from?</li>
              <li><strong>Irregular hours week to week:</strong> Some workers don&apos;t have a fixed pattern at all &mdash; their hours vary based on rotas published a week or two in advance.</li>
              <li><strong>Seasonal variation:</strong> Hospitality and retail workers may work significantly more hours in summer or over Christmas than during quieter periods.</li>
            </ul>
            <p>
              Because of these complexities, many employers get shift worker holiday calculations wrong &mdash; often unintentionally. The two most common approaches are <strong>hours-based accrual</strong> and <strong>days-based accrual</strong>, and choosing the wrong method (or applying it incorrectly) is where problems begin.
            </p>

            <h2>Hours-based vs days-based accrual</h2>
            <p>
              There are two main methods for tracking and calculating holiday entitlement for shift workers. Each has its advantages and pitfalls.
            </p>

            <h3>Days-based accrual</h3>
            <p>
              Under this method, entitlement is expressed in <strong>days</strong>. A worker who works 5 days per week gets 28 days. A worker who works 3 days per week gets 16.8 days (3 &times; 5.6). When the worker takes a day off, one day of entitlement is deducted regardless of how long their shift was.
            </p>
            <p>
              This works well for workers whose shifts are all the same length. If every shift is 8 hours, then each day of leave represents the same amount of time. However, it becomes unfair when shift lengths vary. A worker who takes leave on a 12-hour shift day uses one day of entitlement, but a colleague who takes leave on a 6-hour shift day also uses one day &mdash; despite the first worker &quot;losing&quot; twice as many hours.
            </p>

            <h3>Hours-based accrual</h3>
            <p>
              Under this method, entitlement is expressed in <strong>hours</strong>. The worker&apos;s annual hours are multiplied by 5.6/46.4 (or equivalently, by 12.07%) to calculate their total holiday hours. When they take time off, the actual hours of the missed shift are deducted from their balance.
            </p>
            <p>
              This is fairer for workers with variable shift lengths because every hour of leave is treated equally. A worker taking leave on a 12-hour shift uses 12 hours, and a worker taking leave on a 6-hour shift uses 6 hours. The hours-based method is widely considered best practice for shift workers and is the approach recommended by ACAS.
            </p>

            <h2>The 12.07% accrual method explained</h2>
            <p>
              The 12.07% method is the standard approach for calculating holiday accrual for variable-hours workers, including shift workers. Here is how it works:
            </p>
            <p>
              A full-time worker works 52 weeks per year minus 5.6 weeks of holiday, leaving <strong>46.4 working weeks</strong>. The ratio of holiday to working time is therefore 5.6 / 46.4 = <strong>0.1207</strong>, or <strong>12.07%</strong>.
            </p>
            <p>
              To calculate a worker&apos;s holiday entitlement in hours, multiply their total hours worked by 12.07%. For example:
            </p>
            <ul className="list-disc pl-6">
              <li>A worker who works 1,500 hours per year accrues 1,500 &times; 0.1207 = <strong>181.05 hours</strong> of holiday.</li>
              <li>A worker who works 40 hours in a month accrues 40 &times; 0.1207 = <strong>4.83 hours</strong> of holiday that month.</li>
            </ul>
            <p>
              This method is particularly useful for workers whose hours are genuinely unpredictable &mdash; agency workers, zero-hour contract staff, and those on irregular rota patterns. It ensures that holiday accrual is precisely proportional to hours worked, which is fair and legally defensible.
            </p>
            <p>
              <strong>When to use 12.07%:</strong> This method is ideal for irregular hours workers and part-year workers. Since January 2024, it has also been the basis for <strong>rolled-up holiday pay</strong>, where employers add 12.07% to the worker&apos;s hourly rate in lieu of separate holiday pay. Rolled-up holiday pay is now expressly legal for irregular hours and part-year workers under the Employment Rights (Amendment, Revocation and Transitional Provision) Regulations 2023.
            </p>
            <p>
              <strong>When not to use 12.07%:</strong> For workers with fixed, regular hours (even if those hours involve shifts), it is simpler and often more appropriate to calculate entitlement based on their known weekly pattern. The 12.07% method is not wrong for these workers, but it can create unnecessary complexity.
            </p>

            <h2>Worked examples</h2>
            <p>
              The following examples illustrate how to calculate holiday entitlement for three common shift worker scenarios.
            </p>

            <h3>Example 1: NHS nurse on 12-hour shifts (3 on, 4 off)</h3>
            <p>
              Sarah is a nurse working 12-hour shifts in a repeating 3-on, 4-off pattern. Her pattern repeats every 7 days: she works 3 shifts (36 hours) and then has 4 days off.
            </p>
            <p>
              <strong>Using hours-based accrual:</strong>
            </p>
            <p>
              Sarah works 36 hours per week on average. Over 46.4 working weeks, she works 36 &times; 46.4 = 1,670.4 hours. Her holiday entitlement is 36 &times; 5.6 = <strong>201.6 hours</strong> per year.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Calculation</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Weekly hours</td>
                  <td>36 hours (3 &times; 12)</td>
                </tr>
                <tr>
                  <td>Annual working hours (46.4 weeks)</td>
                  <td>1,670.4 hours</td>
                </tr>
                <tr>
                  <td>Holiday entitlement (hours)</td>
                  <td>201.6 hours (36 &times; 5.6)</td>
                </tr>
                <tr>
                  <td>Holiday entitlement (shifts)</td>
                  <td>16.8 shifts (201.6 / 12)</td>
                </tr>
                <tr>
                  <td>Each shift of leave uses</td>
                  <td>12 hours from balance</td>
                </tr>
              </tbody>
            </table>

            <p>
              When Sarah books a day off, 12 hours are deducted from her 201.6-hour balance. She can take the equivalent of 16.8 full shifts off per year. If she takes a half shift (6 hours), only 6 hours are deducted &mdash; which is why the hours-based method is fairer than counting shifts as whole &quot;days.&quot;
            </p>

            <h3>Example 2: Hotel receptionist on rotating shifts</h3>
            <p>
              James is a hotel receptionist whose shift pattern rotates over a 4-week cycle. His hours vary week to week:
            </p>

            <table>
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Shifts</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Week 1</td>
                  <td>5 &times; 8-hour day shifts</td>
                  <td>40 hours</td>
                </tr>
                <tr>
                  <td>Week 2</td>
                  <td>4 &times; 10-hour evening shifts</td>
                  <td>40 hours</td>
                </tr>
                <tr>
                  <td>Week 3</td>
                  <td>3 &times; 12-hour night shifts</td>
                  <td>36 hours</td>
                </tr>
                <tr>
                  <td>Week 4</td>
                  <td>4 &times; 8-hour day shifts</td>
                  <td>32 hours</td>
                </tr>
                <tr>
                  <td><strong>4-week average</strong></td>
                  <td>&mdash;</td>
                  <td><strong>37 hours/week</strong></td>
                </tr>
              </tbody>
            </table>

            <p>
              <strong>Using hours-based accrual:</strong>
            </p>
            <p>
              James&apos;s average weekly hours are (40 + 40 + 36 + 32) / 4 = 37 hours. His annual holiday entitlement is 37 &times; 5.6 = <strong>207.2 hours</strong>.
            </p>
            <p>
              If James takes leave during Week 1, each day off costs him 8 hours. If he takes leave during Week 3, each night shift costs him 12 hours. The hours-based system ensures this difference is properly reflected. Using a days-based system, taking one day off in Week 3 would cost the same as one day off in Week 1 &mdash; even though the actual time off is 50% more.
            </p>

            <h3>Example 3: Warehouse worker on permanent nights</h3>
            <p>
              Maria works permanent night shifts at a distribution centre: 4 nights per week, 10 hours per shift (10pm to 8am), Monday to Thursday nights.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Calculation</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Weekly hours</td>
                  <td>40 hours (4 &times; 10)</td>
                </tr>
                <tr>
                  <td>Working days per week</td>
                  <td>4 nights</td>
                </tr>
                <tr>
                  <td>Holiday entitlement (days)</td>
                  <td>22.4 days (4 &times; 5.6)</td>
                </tr>
                <tr>
                  <td>Holiday entitlement (hours)</td>
                  <td>224 hours (40 &times; 5.6)</td>
                </tr>
                <tr>
                  <td>Each night of leave uses</td>
                  <td>10 hours from balance</td>
                </tr>
              </tbody>
            </table>

            <p>
              Because Maria&apos;s shifts are all the same length (10 hours), either the days-based or hours-based method produces a fair result. She gets 22.4 nights of leave per year, or 224 hours. The methods are equivalent when shift lengths are uniform.
            </p>

            <h2>Bank holidays and shift workers: common pitfalls</h2>
            <p>
              Bank holidays are one of the most misunderstood areas of shift worker leave. Here are the key points employers need to understand:
            </p>
            <p>
              <strong>There is no automatic right to bank holidays off.</strong> The Working Time Regulations give workers 5.6 weeks of leave. Employers <em>can</em> include bank holidays within that entitlement, meaning a worker required to work on a bank holiday is not automatically entitled to an extra day off &mdash; as long as their total annual leave still meets the 5.6-week minimum.
            </p>
            <p>
              <strong>Shift workers who never work on bank holidays gain an advantage.</strong> Consider two workers, both entitled to 28 days of leave. Worker A is a Monday-to-Friday employee whose 28 days include 8 bank holidays &mdash; leaving 20 days to choose. Worker B works weekends only and never works on a bank holiday. If Worker B still receives 28 days plus the benefit of never working bank holidays, they effectively receive more discretionary leave than Worker A. To avoid this inequality, many employers provide a <strong>pro-rata bank holiday entitlement</strong> based on working patterns.
            </p>
            <p>
              <strong>Shift workers who always work bank holidays may be disadvantaged.</strong> Conversely, if an employer includes bank holidays in the 28-day entitlement but the shift worker is always rostered to work on those days, they have no opportunity to benefit from the bank holidays unless they specifically request them off &mdash; which uses their own leave. Fair treatment means either giving bank holiday workers an equivalent number of alternative days off or ensuring they can take bank holidays without reducing their discretionary leave.
            </p>
            <p>
              The simplest approach for shift workers is to <strong>separate bank holidays from annual leave entirely</strong> and give all workers a clean 5.6-week entitlement in hours (or shifts), then handle bank holidays through additional rota rules or separate entitlements.
            </p>

            <h2>Night shift workers: which &quot;day&quot; counts?</h2>
            <p>
              A recurring practical question with night shift workers is: if a shift runs from 10pm on Monday to 6am on Tuesday, which day does the worker need to book off?
            </p>
            <p>
              There is no single statutory rule that defines this. Most employers adopt one of two conventions:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Start-date convention:</strong> The shift is treated as belonging to the day it starts. A Monday-night shift (10pm Monday to 6am Tuesday) is a &quot;Monday&quot; for leave purposes. This is the most common approach.</li>
              <li><strong>Majority-hours convention:</strong> The shift belongs to the day where the majority of hours fall. A 10pm-to-6am shift has 2 hours on the start date and 6 hours on the end date, so it would be treated as a &quot;Tuesday.&quot;</li>
            </ul>
            <p>
              Either approach is acceptable, but the employer must be <strong>consistent</strong> and communicate the policy clearly. Problems arise when different managers apply different rules, or when the policy is not documented. Workers need to know which date to book in order to be absent from a particular night shift.
            </p>
            <p>
              For <strong>hours-based systems</strong>, this issue largely disappears. The worker books the shift off, 10 hours (or whatever the shift length is) are deducted from their balance, and it doesn&apos;t matter which calendar date the absence is assigned to &mdash; the hours are tracked accurately regardless.
            </p>

            <h2>The Harpur Trust v Brazel ruling (2022) and its impact</h2>
            <p>
              The Supreme Court&apos;s decision in <em>Harpur Trust v Brazel</em> [2022] UKSC 21 is one of the most significant holiday pay rulings in recent years, and it has direct implications for shift workers with irregular or part-year working patterns.
            </p>
            <p>
              Mrs Brazel was a music teacher employed on a permanent contract but only working during school term times &mdash; roughly 32 weeks per year. Her employer calculated her holiday pay by taking her total annual earnings and multiplying by 12.07%, arguing that this pro-rated her entitlement in line with the proportion of the year she actually worked.
            </p>
            <p>
              The Supreme Court ruled that this approach was <strong>wrong</strong>. The correct method for calculating holiday entitlement for part-year workers is:
            </p>
            <ol className="list-decimal pl-6">
              <li>The worker is entitled to <strong>5.6 weeks</strong> of paid holiday, regardless of how many weeks per year they work.</li>
              <li>Each week&apos;s holiday pay is calculated using the <strong>52-week reference period</strong> &mdash; the average weekly pay over the last 52 weeks in which the worker was paid (skipping unpaid weeks and looking back up to 104 weeks).</li>
              <li>The 12.07% method <strong>must not be used</strong> to reduce a part-year worker&apos;s entitlement below 5.6 weeks.</li>
            </ol>
            <p>
              The practical effect is that part-year workers receive proportionally <strong>more</strong> holiday pay relative to their total earnings than full-year workers. For a worker employed for 32 weeks per year, 5.6 weeks of holiday represents 17.5% of their working time, not 12.07%.
            </p>
            <p>
              <strong>Impact on shift workers:</strong> Shift workers who work irregular patterns across the year &mdash; for example, seasonal hospitality workers or agency staff with gaps between assignments &mdash; may qualify as part-year workers. For these workers, the Brazel ruling means you cannot simply apply 12.07% to their total hours and call it done. You must check whether they are a &quot;part-year worker&quot; and, if so, use the 52-week reference period method to calculate each week&apos;s holiday pay.
            </p>
            <p>
              However, the government responded to the Brazel ruling by introducing new legislation from January 2024 that allows rolled-up holiday pay at 12.07% for <strong>irregular hours workers</strong> and <strong>part-year workers</strong> &mdash; effectively providing a legislative workaround for the ruling&apos;s consequences. Employers using rolled-up holiday pay for eligible workers can lawfully apply the 12.07% uplift, provided it is shown as a separate line on the payslip.
            </p>

            <h2>Common employer mistakes with shift worker leave</h2>
            <p>
              Based on the patterns we see across UK businesses, these are the most frequent errors:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Using a days-based system for variable-length shifts:</strong> If shift lengths vary, a days-based system over- or under-counts leave. Switch to hours-based accrual.</li>
              <li><strong>Calculating entitlement on a fixed 28-day basis:</strong> The 28-day figure only applies to workers on a 5-day week. A worker on 4 days per week gets 22.4 days; a worker on 6 days per week gets 33.6 days. Always multiply the number of working days per week by 5.6.</li>
              <li><strong>Ignoring the night shift date question:</strong> Failing to set a clear, documented policy on which date a straddling night shift belongs to leads to booking errors and disputes.</li>
              <li><strong>Treating bank holidays inconsistently:</strong> Giving Monday-to-Friday staff bank holidays on top of their leave while including them in shift workers&apos; entitlement creates a two-tier system that may breach the Part-Time Workers Regulations.</li>
              <li><strong>Applying 12.07% incorrectly after Brazel:</strong> The 12.07% method is valid for rolled-up holiday pay for irregular hours and part-year workers (post-January 2024), but it cannot be used to reduce a part-year worker&apos;s entitlement below 5.6 weeks where rolled-up pay is not being used.</li>
              <li><strong>Not accounting for shift premiums in holiday pay:</strong> If a worker regularly receives night shift premiums, unsocial hours payments, or overtime, these must be included in their holiday pay calculation using the 52-week reference period.</li>
              <li><strong>Failing to track accrual for variable-hours workers:</strong> Without a system that tracks hours worked and holiday accrued in real time, it is easy to lose accuracy over the course of a year &mdash; particularly for workers whose hours fluctuate significantly.</li>
            </ul>

            <h2>Zero-hour contract holiday calculations</h2>
            <p>
              Zero-hour contract workers &mdash; common in hospitality, retail, care, and event industries &mdash; are legally entitled to the same 5.6 weeks of paid annual leave as any other worker. The challenge is calculating what 5.6 weeks means when there is no guaranteed weekly pattern.
            </p>
            <p>
              The most practical method for zero-hour workers is the <strong>12.07% accrual approach</strong>. For every hour worked, the worker accrues 0.1207 hours of paid holiday. This can be tracked cumulatively and the worker can then take paid time off from their accrued balance.
            </p>
            <p>
              Alternatively, since January 2024, employers can use <strong>rolled-up holiday pay</strong> for zero-hour workers (who are classified as irregular hours workers). This means adding 12.07% to their hourly rate as a separate line on each payslip. The worker then takes their leave unpaid, having already received the holiday pay element with each pay period.
            </p>
            <p>
              For example, a zero-hour worker paid &pound;12.00 per hour would receive:
            </p>

            <table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Basic hourly rate</td>
                  <td>&pound;12.00</td>
                </tr>
                <tr>
                  <td>Holiday pay uplift (12.07%)</td>
                  <td>&pound;1.45</td>
                </tr>
                <tr>
                  <td>Total hourly rate</td>
                  <td>&pound;13.45</td>
                </tr>
              </tbody>
            </table>

            <p>
              The &pound;1.45 holiday pay element must be shown as a <strong>separate line</strong> on the payslip. The worker should still be encouraged to take their leave &mdash; the purpose of annual leave legislation is to protect workers&apos; health by ensuring they take time off, not simply to provide extra pay.
            </p>
            <p>
              One common mistake with zero-hour workers is calculating holiday pay based only on the most recent weeks of work. If the worker has had a quiet period, their holiday pay will be artificially low. The <strong>52-week reference period</strong> (skipping unpaid weeks, looking back up to 104 weeks) must be used to calculate each week&apos;s holiday pay when they take time off using the accrual method.
            </p>

            <h2>How Leavely handles shift-based accrual automatically</h2>
            <p>
              Managing holiday entitlement for shift workers with spreadsheets or basic HR systems is a recipe for errors. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> is designed to handle the complexity of shift-based leave calculation automatically:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Hours-based entitlement tracking:</strong> Configure each employee&apos;s working pattern &mdash; whether it&apos;s fixed shifts, rotating patterns, or variable hours &mdash; and Leavely calculates their statutory entitlement in hours. When leave is booked, the actual shift hours are deducted from their balance.</li>
              <li><strong>Automatic accrual for variable-hours workers:</strong> For workers on zero-hour or irregular contracts, Leavely applies the 12.07% accrual method and tracks their balance in real time as hours are logged.</li>
              <li><strong>Night shift handling:</strong> Define your night shift convention (start-date or majority-hours) and Leavely applies it consistently across all bookings, eliminating ambiguity.</li>
              <li><strong>Bank holiday fairness:</strong> Configure how bank holidays interact with shift worker entitlements &mdash; whether they are included in the annual allowance, given as additional days, or handled via rota-based rules.</li>
              <li><strong>Pro-rata calculations for mid-year starters and leavers:</strong> When a shift worker joins or leaves partway through the year, Leavely automatically pro-rates their entitlement and calculates any holiday owed or to be reclaimed.</li>
              <li><strong>Compliance-ready reporting:</strong> Generate reports showing accrual, usage, and balances for each worker &mdash; useful for payroll, audits, and defending against underpayment claims.</li>
            </ul>
            <p>
              Whether you have 5 employees or 500, getting shift worker holiday entitlement right protects your business from legal risk and ensures your workers receive the leave they are entitled to. Leavely takes the manual calculation out of the equation and gives both managers and employees confidence that balances are always accurate.
            </p>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Stop struggling with shift worker leave calculations</h3>
            <p className="text-emerald-100 mb-6">Leavely handles hours-based accrual, rotating patterns, and night shifts automatically &mdash; so every balance is always right.</p>
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
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">
                Annual Leave Entitlement UK 2026: Complete Guide for Employers &rarr;
              </Link>
              <Link href="/blog/pro-rata-annual-leave-calculator" className="block text-emerald-600 hover:underline font-medium">
                Pro Rata Annual Leave Calculator UK: How to Work It Out &rarr;
              </Link>
              <Link href="/blog/holiday-pay-calculation-uk" className="block text-emerald-600 hover:underline font-medium">
                Holiday Pay Calculation UK: How to Get It Right &rarr;
              </Link>
              <Link href="/blog/working-time-regulations-uk" className="block text-emerald-600 hover:underline font-medium">
                Working Time Regulations UK: What Employers Need to Know &rarr;
              </Link>
              <Link href="/blog/part-time-workers-rights-uk" className="block text-emerald-600 hover:underline font-medium">
                Part-Time Workers&apos; Rights UK: Leave, Pay &amp; Employer Obligations &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
