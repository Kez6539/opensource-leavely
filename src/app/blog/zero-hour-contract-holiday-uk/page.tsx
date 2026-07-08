import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/zero-hour-contract-holiday-uk`

export const metadata: Metadata = {
  title: 'Zero-Hour Contract Holiday Entitlement UK: Complete Calculation Guide (2026)',
  description:
    'Complete guide to zero-hour contract holiday entitlement in the UK. Covers the 12.07% accrual method, rolled-up holiday pay, Harpur Trust v Brazel, worked examples, bank holidays, and the Employment Rights Bill 2024.',
  alternates: { canonical: articleUrl },
  keywords: [
    'zero hour contract holiday entitlement',
    'zero hour contract holiday pay',
    '12.07% holiday calculation',
    'zero hour workers holiday rights UK',
    'casual worker holiday pay',
  ],
  openGraph: {
    title: 'Zero-Hour Contract Holiday Entitlement UK &mdash; Complete Calculation Guide',
    description:
      'The 12.07% accrual method, rolled-up holiday pay, Harpur Trust v Brazel, worked examples, and common employer mistakes explained.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Zero-Hour Contract Holiday Entitlement UK: Complete Calculation Guide',
  description: 'A comprehensive guide to calculating holiday entitlement for zero-hour contract workers in the UK, covering the 12.07% accrual method, rolled-up holiday pay, the Harpur Trust v Brazel ruling, bank holidays, and the Employment Rights Bill 2024.',
  url: articleUrl,
  datePublished: '2026-03-25',
  dateModified: '2026-03-25',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function ZeroHourContractHolidayArticle() {
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
            <span className="text-xs text-gray-400 ml-3">10 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Zero-Hour Contract Holiday Entitlement UK: Complete Calculation Guide
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              One of the most persistent myths in UK employment law is that zero-hour contract workers are not entitled to paid holiday. They absolutely are. Every worker in the UK &mdash; regardless of their contract type, hours worked, or regularity of shifts &mdash; has a statutory right to <strong>5.6 weeks</strong> of paid annual leave per year. This guide explains exactly how to calculate holiday entitlement for zero-hour contract workers, with step-by-step examples, worked tables, and practical advice for employers in 2026.
            </p>

            <h2>The legal right: 5.6 weeks for every worker</h2>
            <p>
              The <strong>Working Time Regulations 1998</strong> (WTR) grant every worker in the UK a minimum of 5.6 weeks of paid annual leave per year. This right applies to full-time employees, part-time employees, agency workers, and &mdash; crucially &mdash; zero-hour contract workers. The key word in the legislation is <strong>&quot;worker,&quot;</strong> not &quot;employee.&quot; A worker is anyone who has a contract to perform work personally for another party, and zero-hour contract staff almost always meet this definition.
            </p>
            <p>
              For a standard full-time worker on a 5-day week, 5.6 weeks translates to 28 days (5 &times; 5.6). But that 28-day figure is a convenient shorthand &mdash; the statute is expressed in <strong>weeks</strong>, not days. For zero-hour workers who have no fixed weekly pattern, the concept of &quot;28 days&quot; is meaningless. Instead, their entitlement must be calculated based on the hours they actually work, using the <strong>12.07% accrual method</strong>.
            </p>
            <p>
              Employers can include the eight UK bank holidays within the 5.6-week statutory minimum, but are not obliged to provide bank holidays as additional leave on top of it. The 5.6-week entitlement is the total statutory minimum, regardless of how bank holidays are treated.
            </p>

            <h2>The 12.07% accrual method: step by step</h2>
            <p>
              The 12.07% method is the standard approach for calculating holiday accrual when a worker&apos;s hours are variable or unpredictable. Here is the logic behind it:
            </p>
            <p>
              A full-time worker works 52 weeks per year. Subtract the 5.6 weeks of statutory holiday and you get <strong>46.4 working weeks</strong>. The ratio of holiday to working time is 5.6 &divide; 46.4 = <strong>0.1207</strong>, or <strong>12.07%</strong>. This means that for every hour a zero-hour worker works, they accrue 0.1207 hours of paid holiday.
            </p>
            <p>
              In practice, the calculation works as follows:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Track all hours worked</strong> during the accrual period (weekly, monthly, or annually).</li>
              <li><strong>Multiply total hours worked by 12.07%</strong> (or 0.1207) to get the holiday hours accrued.</li>
              <li><strong>Maintain a running balance</strong> of accrued holiday hours, deducting hours when the worker takes paid time off.</li>
            </ol>
            <p>
              For example, if a zero-hour worker works 20 hours in a given week, they accrue 20 &times; 0.1207 = <strong>2.41 hours</strong> of paid holiday that week. Over a month where they work 80 hours total, they accrue 80 &times; 0.1207 = <strong>9.66 hours</strong> of holiday.
            </p>

            <h3>Worked example 1: Hospitality worker with variable hours</h3>
            <p>
              Sam works as a bartender on a zero-hour contract. His hours vary week to week depending on how busy the pub is. Over the course of the leave year, Sam&apos;s hours look like this:
            </p>

            <table>
              <thead>
                <tr>
                  <th>Quarter</th>
                  <th>Hours worked</th>
                  <th>Holiday accrued (12.07%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Q1 (Jan&ndash;Mar)</td>
                  <td>180 hours</td>
                  <td>21.73 hours</td>
                </tr>
                <tr>
                  <td>Q2 (Apr&ndash;Jun)</td>
                  <td>240 hours</td>
                  <td>28.97 hours</td>
                </tr>
                <tr>
                  <td>Q3 (Jul&ndash;Sep)</td>
                  <td>320 hours</td>
                  <td>38.62 hours</td>
                </tr>
                <tr>
                  <td>Q4 (Oct&ndash;Dec)</td>
                  <td>260 hours</td>
                  <td>31.38 hours</td>
                </tr>
                <tr>
                  <td><strong>Annual total</strong></td>
                  <td><strong>1,000 hours</strong></td>
                  <td><strong>120.70 hours</strong></td>
                </tr>
              </tbody>
            </table>

            <p>
              Sam&apos;s total annual holiday entitlement is 1,000 &times; 0.1207 = <strong>120.70 hours</strong>. If Sam typically works 8-hour shifts, this is roughly equivalent to 15 shifts of paid holiday across the year. Notice how the accrual is higher in busier quarters &mdash; this is the beauty of the 12.07% method: it is precisely proportional to hours actually worked.
            </p>

            <h3>Worked example 2: Retail worker on a short-hours contract</h3>
            <p>
              Priya works on a zero-hour contract at a clothing retailer. She averages about 12 hours per week, working three 4-hour shifts. Over a full year she works approximately 557 hours (12 hours &times; 46.4 working weeks).
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
                  <td>Average weekly hours</td>
                  <td>12 hours</td>
                </tr>
                <tr>
                  <td>Annual hours worked (46.4 weeks)</td>
                  <td>556.8 hours</td>
                </tr>
                <tr>
                  <td>Holiday accrual (12.07%)</td>
                  <td>67.21 hours</td>
                </tr>
                <tr>
                  <td>Equivalent in 4-hour shifts</td>
                  <td>16.8 shifts</td>
                </tr>
                <tr>
                  <td>Each shift of leave uses</td>
                  <td>4 hours from balance</td>
                </tr>
              </tbody>
            </table>

            <p>
              When Priya takes a day off, 4 hours are deducted from her 67.21-hour balance. She can take approximately 16.8 shifts of paid holiday across the year &mdash; which is consistent with the statutory 5.6 weeks (3 shifts per week &times; 5.6 = 16.8 shifts).
            </p>

            <h2>Rolled-up holiday pay: legal since January 2024</h2>
            <p>
              For years, rolled-up holiday pay &mdash; where the employer adds a percentage uplift to the worker&apos;s hourly rate instead of providing separate paid time off &mdash; existed in a legal grey area. Many employers used it, but it was technically unlawful because workers were not being given the opportunity to take <em>paid</em> leave; instead, their holiday pay was rolled into their regular wages and leave was taken unpaid.
            </p>
            <p>
              That changed on <strong>1 January 2024</strong>. The <strong>Employment Rights (Amendment, Revocation and Transitional Provision) Regulations 2023</strong> expressly legalised rolled-up holiday pay for two categories of worker:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Irregular hours workers</strong> &mdash; those whose paid hours are wholly or mostly variable across each pay period (which includes most zero-hour contract workers).</li>
              <li><strong>Part-year workers</strong> &mdash; those who work only part of the year and have periods of at least a week where they are not required to work and are not paid.</li>
            </ul>
            <p>
              Under rolled-up holiday pay, the employer adds <strong>12.07%</strong> to the worker&apos;s hourly rate and pays it with every pay period. The worker then takes their leave unpaid, having already received the holiday pay element.
            </p>

            <h3>How rolled-up holiday pay works in practice</h3>
            <p>
              Consider a zero-hour contract worker paid &pound;12.00 per hour. Under rolled-up holiday pay:
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
                  <td>Total hourly rate paid</td>
                  <td>&pound;13.45</td>
                </tr>
              </tbody>
            </table>

            <p>
              There are several requirements employers must follow when using rolled-up holiday pay:
            </p>
            <ul className="list-disc pl-6">
              <li>The holiday pay element must be shown as a <strong>separate line</strong> on the payslip &mdash; it cannot be bundled invisibly into the hourly rate.</li>
              <li>The worker must still be <strong>allowed and encouraged to take leave</strong>. The purpose of holiday legislation is to protect workers&apos; health by ensuring they rest, not simply to provide extra money.</li>
              <li>Rolled-up holiday pay is only available for irregular hours and part-year workers. Standard employees on fixed contracts cannot have their holiday pay rolled up.</li>
              <li>The 12.07% uplift applies to the worker&apos;s <strong>total remuneration</strong>, not just basic pay. Regular overtime, commission, and shift premiums must be included in the calculation.</li>
            </ul>

            <h3>Accrual method vs rolled-up pay: which should you use?</h3>
            <p>
              Both approaches are now lawful for zero-hour contract workers. The choice depends on practical considerations:
            </p>

            <table>
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>Accrual method</th>
                  <th>Rolled-up holiday pay</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Worker takes paid time off?</td>
                  <td>Yes &mdash; leave is paid from accrued balance</td>
                  <td>No &mdash; leave is unpaid (pay already received)</td>
                </tr>
                <tr>
                  <td>Admin complexity</td>
                  <td>Higher &mdash; must track accrual balances</td>
                  <td>Lower &mdash; uplift added to each pay run</td>
                </tr>
                <tr>
                  <td>Encourages rest?</td>
                  <td>Yes &mdash; workers have a visible balance to use</td>
                  <td>Risk workers won&apos;t take time off</td>
                </tr>
                <tr>
                  <td>Payment on termination</td>
                  <td>Must pay out accrued, untaken leave</td>
                  <td>Already paid &mdash; no additional liability</td>
                </tr>
                <tr>
                  <td>Payslip requirements</td>
                  <td>Standard payslip</td>
                  <td>Must show holiday pay as separate line</td>
                </tr>
              </tbody>
            </table>

            <p>
              Many employers prefer rolled-up holiday pay for its simplicity, but it comes with a risk: workers who never take leave may burn out or bring claims that they were discouraged from exercising their holiday rights. Best practice is to use rolled-up pay <em>and</em> actively monitor whether workers are taking adequate time off.
            </p>

            <h2>Harpur Trust v Brazel: what it means for zero-hour workers</h2>
            <p>
              The Supreme Court&apos;s landmark decision in <em>Harpur Trust v Brazel</em> [2022] UKSC 21 has significant implications for zero-hour and part-year workers. Mrs Brazel was a music teacher employed on a permanent contract but only working during school term times &mdash; approximately 32 weeks per year. Her employer calculated her holiday pay using the 12.07% method, arguing that it correctly pro-rated her entitlement.
            </p>
            <p>
              The Supreme Court disagreed. It ruled that:
            </p>
            <ol className="list-decimal pl-6">
              <li>Every worker is entitled to <strong>5.6 weeks</strong> of paid holiday, regardless of how many weeks per year they actually work.</li>
              <li>Each week&apos;s holiday pay must be calculated using the <strong>52-week reference period</strong> &mdash; the average weekly pay over the last 52 weeks in which the worker was paid (skipping unpaid weeks and looking back up to 104 weeks).</li>
              <li>The 12.07% method <strong>must not be used to reduce</strong> a part-year worker&apos;s entitlement below 5.6 weeks.</li>
            </ol>
            <p>
              For a worker employed for only 32 weeks per year, 5.6 weeks of holiday represents 17.5% of their working time &mdash; not 12.07%. The Brazel ruling therefore meant that part-year workers received proportionally <strong>more</strong> holiday pay relative to their total earnings than full-year workers.
            </p>
            <p>
              <strong>The government&apos;s response:</strong> The January 2024 regulations effectively provide a legislative workaround for Brazel. Employers can now use rolled-up holiday pay at 12.07% for irregular hours and part-year workers, which avoids the Brazel problem entirely. If you are not using rolled-up holiday pay, you must still apply the 52-week reference period method for calculating each week&apos;s holiday pay &mdash; and you cannot reduce the worker&apos;s total entitlement below 5.6 weeks.
            </p>
            <p>
              For zero-hour contract workers specifically, Brazel matters most when using the accrual method without rolled-up pay. In these cases, you should check whether the worker could be classified as a &quot;part-year worker&quot; (someone with identifiable periods of non-working time), and if so, ensure their holiday pay rate is calculated using the 52-week reference period rather than a simple 12.07% of their hourly rate.
            </p>

            <h2>Common employer mistakes with zero-hour holiday</h2>
            <p>
              Despite the legal position being clear, many employers still make costly errors when it comes to zero-hour contract holiday entitlement. Here are the most common mistakes we see:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Denying holiday altogether:</strong> Some employers believe that zero-hour workers are not entitled to paid holiday because they have &quot;no guaranteed hours.&quot; This is wrong. The right to 5.6 weeks of leave applies to all workers, regardless of contract type. An employment tribunal will award back-pay plus potential compensation for this error.</li>
              <li><strong>Not tracking accrual:</strong> Without a system that records hours worked and holiday accrued, employers lose visibility of their liability. By year-end, a zero-hour worker may have accrued several days of untaken holiday that the employer did not budget for.</li>
              <li><strong>Using 12.07% on basic pay only:</strong> If a zero-hour worker regularly receives tips, commission, overtime premiums, or other regular payments, these must be included in the holiday pay calculation. The 52-week reference period captures all regular remuneration, not just the base hourly rate.</li>
              <li><strong>Failing to show rolled-up pay on payslips:</strong> If using rolled-up holiday pay, the 12.07% uplift must appear as a separate, identifiable line on the payslip. Simply paying a higher hourly rate without transparency is not compliant.</li>
              <li><strong>Discouraging workers from taking leave:</strong> Some employers use rolled-up holiday pay as a way to avoid ever granting time off. While the pay element is satisfied, workers who never take leave may bring claims that their right to rest was undermined. ACAS recommends employers actively encourage zero-hour staff to take their accrued leave.</li>
              <li><strong>Not paying out accrued leave on termination:</strong> When a zero-hour worker&apos;s contract ends (or simply when shifts stop being offered), any accrued but untaken holiday must be paid out in their final pay. This obligation applies even if the worker was on rolled-up pay but has untaken leave from before the switch.</li>
              <li><strong>Applying the wrong reference period for holiday pay:</strong> Holiday pay for zero-hour workers must be based on the 52-week reference period (looking back up to 104 weeks for unpaid weeks). Using only the most recent week or month underestimates the worker&apos;s entitlement during quiet periods.</li>
            </ul>

            <h2>Accrued but untaken leave on termination</h2>
            <p>
              When a zero-hour worker&apos;s employment ends &mdash; whether through dismissal, resignation, or simply the employer ceasing to offer shifts &mdash; any accrued but untaken holiday must be paid out. Under Regulation 14 of the Working Time Regulations, a worker is entitled to a payment in lieu of any statutory leave that has been accrued but not taken at the date of termination.
            </p>
            <p>
              The calculation is straightforward using the accrual method:
            </p>
            <ol className="list-decimal pl-6">
              <li>Calculate total hours worked in the current leave year up to the termination date.</li>
              <li>Multiply by 12.07% to determine total accrued holiday hours.</li>
              <li>Subtract any holiday hours already taken.</li>
              <li>Pay the remaining hours at the worker&apos;s average hourly rate (using the 52-week reference period).</li>
            </ol>

            <h3>Worked example: Termination payment</h3>
            <p>
              Tom works on a zero-hour contract at a care home. His leave year runs from April to March. He is told in November that no further shifts are available. Up to that point he has worked 640 hours and taken 24 hours of paid holiday.
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
                  <td>Hours worked (Apr&ndash;Nov)</td>
                  <td>640 hours</td>
                </tr>
                <tr>
                  <td>Holiday accrued (640 &times; 12.07%)</td>
                  <td>77.25 hours</td>
                </tr>
                <tr>
                  <td>Holiday already taken</td>
                  <td>24 hours</td>
                </tr>
                <tr>
                  <td>Untaken holiday owed</td>
                  <td>53.25 hours</td>
                </tr>
                <tr>
                  <td>Average hourly rate (52-week ref period)</td>
                  <td>&pound;11.44</td>
                </tr>
                <tr>
                  <td><strong>Termination payment due</strong></td>
                  <td><strong>&pound;609.18</strong></td>
                </tr>
              </tbody>
            </table>

            <p>
              If the employer has been using rolled-up holiday pay throughout the engagement, the worker has already been paid for their holiday hours and no additional payment is due &mdash; provided the rolled-up payments were correctly calculated and shown on payslips. However, if the employer switched to rolled-up pay partway through the year, any accrual from the earlier period that was not taken must still be paid out.
            </p>

            <h2>Zero-hour contracts and bank holidays</h2>
            <p>
              Bank holidays are a frequent source of confusion for zero-hour contract workers. The key points employers need to understand:
            </p>
            <p>
              <strong>There is no separate right to bank holidays.</strong> The 5.6-week statutory minimum can include bank holidays. An employer may choose to designate bank holidays as part of the entitlement or provide them in addition &mdash; but the law only requires 5.6 weeks in total.
            </p>
            <p>
              <strong>Zero-hour workers may or may not work on bank holidays.</strong> If a zero-hour worker is not offered shifts on bank holidays, they effectively receive the benefit of those days off without using any accrued leave. Conversely, if they work on bank holidays, those hours contribute to their holiday accrual in the normal way (12.07% of hours worked). There is no automatic entitlement to enhanced pay for bank holiday work unless the contract specifies it.
            </p>
            <p>
              <strong>Fairness between worker types matters.</strong> If an employer gives permanent staff bank holidays as additional paid leave but does not offer equivalent benefits to zero-hour workers, this could constitute less favourable treatment. Under the <strong>Part-Time Workers (Prevention of Less Favourable Treatment) Regulations 2000</strong>, a zero-hour worker who is treated less favourably than a comparable full-time worker may have grounds for a claim. The safest approach is to ensure that all workers receive 5.6 weeks of total leave inclusive of bank holidays, with any additional bank holiday benefits applied consistently.
            </p>

            <h2>The Employment Rights Bill 2024: what&apos;s changing</h2>
            <p>
              The <strong>Employment Rights Bill 2024</strong>, introduced to Parliament in October 2024, proposes significant changes that will affect zero-hour contract workers. While the Bill is still progressing through Parliament, several provisions are expected to become law and employers should begin preparing now:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Right to guaranteed hours:</strong> Zero-hour contract workers who regularly work a certain pattern of hours will have the right to be offered a contract reflecting those hours. This does not abolish zero-hour contracts but gives workers the option to move to guaranteed hours after a qualifying period.</li>
              <li><strong>Right to reasonable notice of shifts:</strong> Employers will be required to give reasonable notice of shifts and shift cancellations. Workers will be entitled to compensation if shifts are cancelled or curtailed at short notice.</li>
              <li><strong>Day-one rights:</strong> Several employment rights that currently require a qualifying period &mdash; including protection from unfair dismissal &mdash; will become day-one rights. While holiday entitlement is already a day-one right, the broader protections will benefit zero-hour workers who are often the most vulnerable to dismissal.</li>
              <li><strong>Strengthened enforcement:</strong> A new Fair Work Agency will be established with powers to enforce holiday pay and other employment rights, making it easier for workers to recover unpaid holiday pay without resorting to an employment tribunal.</li>
            </ul>
            <p>
              For holiday entitlement specifically, the Bill&apos;s guaranteed-hours provisions may simplify calculations for some workers. If a zero-hour worker moves to a guaranteed-hours contract, their holiday entitlement can be calculated using the standard formula (weekly hours &times; 5.6) rather than the 12.07% accrual method. Employers should review their zero-hour workforce and identify workers who might request guaranteed hours once the legislation takes effect.
            </p>

            <h2>How Leavely auto-calculates accrual for variable-hours staff</h2>
            <p>
              Calculating holiday entitlement for zero-hour workers by hand &mdash; or worse, on a spreadsheet &mdash; is slow, error-prone, and leaves employers exposed to underpayment claims. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> automates the entire process for variable-hours staff:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Automatic 12.07% accrual:</strong> Log hours worked for each zero-hour employee and Leavely instantly calculates their accrued holiday balance. The running total updates in real time, so managers and workers always know exactly how much leave is available.</li>
              <li><strong>Rolled-up holiday pay tracking:</strong> If you use rolled-up holiday pay, Leavely tracks the 12.07% uplift alongside each pay period and flags any discrepancies. Payslip-ready reports make it easy to show the holiday pay element as a separate line.</li>
              <li><strong>52-week reference period calculations:</strong> When a worker takes leave under the accrual method, Leavely automatically calculates their holiday pay rate using the 52-week reference period &mdash; skipping unpaid weeks and looking back up to 104 weeks, exactly as the regulations require.</li>
              <li><strong>Termination pay-out calculations:</strong> When a zero-hour worker&apos;s contract ends, Leavely calculates the accrued-but-untaken holiday owed and generates the figures needed for their final pay.</li>
              <li><strong>Bank holiday handling:</strong> Configure how bank holidays interact with zero-hour workers&apos; entitlements &mdash; whether included in the statutory minimum, given as additional allowance, or handled on a shift-by-shift basis.</li>
              <li><strong>Compliance alerts:</strong> Leavely flags workers who have not taken leave in a defined period, helping employers demonstrate that they actively encourage rest &mdash; an important safeguard when using rolled-up holiday pay.</li>
              <li><strong>Multi-contract support:</strong> For workers who hold zero-hour contracts with multiple departments or locations within the same organisation, Leavely consolidates their hours and accrual into a single, accurate balance.</li>
            </ul>
            <p>
              Whether you have a handful of casual workers or hundreds of zero-hour staff across multiple sites, Leavely removes the guesswork from holiday calculations. Every balance is accurate, every payslip is compliant, and every termination payment is calculated correctly &mdash; protecting your business from costly tribunal claims and back-pay liabilities.
            </p>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Stop guessing at zero-hour holiday accrual</h3>
            <p className="text-emerald-100 mb-6">Leavely auto-calculates the 12.07% accrual for every variable-hours worker &mdash; so balances are always accurate and compliant.</p>
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
              <Link href="/blog/holiday-pay-calculation-uk" className="block text-emerald-600 hover:underline font-medium">
                Holiday Pay Calculation UK: How to Get It Right &rarr;
              </Link>
              <Link href="/blog/shift-worker-holiday-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">
                Shift Worker Holiday Entitlement UK: How to Calculate Leave for Irregular Hours &rarr;
              </Link>
              <Link href="/blog/part-time-workers-rights-uk" className="block text-emerald-600 hover:underline font-medium">
                Part-Time Workers&apos; Rights UK: Leave, Pay &amp; Employer Obligations &rarr;
              </Link>
              <Link href="/blog/agency-worker-holiday-rights-uk" className="block text-emerald-600 hover:underline font-medium">
                Agency Worker Holiday Rights UK: Complete Guide &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
