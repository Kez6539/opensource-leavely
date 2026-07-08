import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/agency-worker-holiday-rights-uk`

export const metadata: Metadata = {
  title: 'Agency Worker Holiday Rights UK: Pay & The 12-Week Rule',
  description:
    'A complete guide to agency worker holiday rights in the UK. Covers the Agency Workers Regulations 2010, the 12-week qualifying period, rolled-up holiday pay, entitlement from day 1, and employer obligations.',
  alternates: { canonical: articleUrl },
  keywords: [
    'agency worker holiday rights UK',
    'agency worker regulations holiday',
    'agency worker holiday pay',
    '12 week rule agency workers',
    'rolled up holiday pay UK',
    'temp worker holiday entitlement',
  ],
  openGraph: {
    title: 'Agency Worker Holiday Rights UK &mdash; Entitlement, Pay & The 12-Week Rule',
    description:
      'Holiday entitlement from day 1, the 12-week equal treatment rule, rolled-up holiday pay changes, and how to track agency worker leave compliantly.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Agency Worker Holiday Rights UK: Entitlement, Pay & The 12-Week Rule',
  description:
    'A comprehensive guide to agency worker holiday rights in the UK, covering the Agency Workers Regulations 2010, 12-week qualifying period, rolled-up holiday pay, and employer obligations for hirers and agencies.',
  url: articleUrl,
  datePublished: '2026-03-25',
  dateModified: '2026-03-25',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function AgencyWorkerHolidayRightsArticle() {
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
            Agency Worker Holiday Rights UK: Entitlement, Pay &amp; The 12-Week Rule
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Agency workers are one of the most flexible parts of the UK labour market &mdash; yet their holiday rights are frequently misunderstood by hirers, agencies, and the workers themselves. The <strong>Agency Workers Regulations 2010</strong> (AWR) set out the legal framework, but holiday entitlement actually starts from <strong>day one</strong> of an assignment, not after 12 weeks. This guide explains exactly what agency workers are entitled to, who is responsible for paying it, and how recent changes to rolled-up holiday pay affect both agencies and hirers.
            </p>

            <h2>What are the Agency Workers Regulations 2010?</h2>
            <p>
              The <strong>Agency Workers Regulations 2010</strong> (AWR) came into force on 1 October 2011 and are the primary piece of legislation protecting agency workers in the UK. Their core purpose is to ensure that agency workers receive <strong>equal treatment</strong> with directly employed staff after a qualifying period &mdash; but certain basic rights, including holiday entitlement, apply from the very first day.
            </p>
            <p>
              The AWR define an &quot;agency worker&quot; as someone who has a contract with a temporary work agency (the &quot;agency&quot;) and is supplied to work temporarily under the supervision and direction of a &quot;hirer&quot; (the end client). The Regulations create a triangular relationship between three parties:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>The agency worker</strong> &mdash; the individual doing the work.</li>
              <li><strong>The temporary work agency</strong> &mdash; the business that finds the worker assignments and typically pays them.</li>
              <li><strong>The hirer</strong> &mdash; the end client that supervises and directs the worker&apos;s day-to-day tasks.</li>
            </ul>
            <p>
              The AWR sit alongside the <Link href="/blog/working-time-regulations-uk" className="text-emerald-600 hover:underline font-medium">Working Time Regulations 1998</Link>, which provide the baseline statutory holiday entitlement of 5.6 weeks for all workers &mdash; including agency workers &mdash; from day one.
            </p>

            <h2>Holiday entitlement from day 1</h2>
            <p>
              One of the most common misconceptions about agency worker holiday rights is that workers must complete the 12-week qualifying period before they become entitled to any holiday. <strong>This is wrong.</strong>
            </p>
            <p>
              Under the <strong>Working Time Regulations 1998</strong>, all workers &mdash; including agency workers &mdash; are entitled to <strong>5.6 weeks</strong> (28 days for someone working 5 days per week) of paid annual leave from the first day of employment. This is a statutory minimum that cannot be contracted out of, and it applies regardless of whether the worker has reached the 12-week qualifying period under the AWR.
            </p>
            <p>
              For agency workers who work irregular hours or are on short assignments, the entitlement is calculated on a <strong>pro-rata basis</strong>. The simplest method is to express it as 12.07% of hours worked &mdash; this percentage represents 5.6 weeks divided by the remaining 46.4 working weeks in the year.
            </p>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <p className="text-emerald-800 font-mono text-center text-lg mb-4">
                <strong>Holiday accrual = Hours worked &times; 12.07%</strong>
              </p>
              <p className="text-emerald-700 text-sm text-center mb-0">
                Example: An agency worker who works 200 hours in a quarter accrues 200 &times; 0.1207 = <strong>24.14 hours</strong> of paid holiday.
              </p>
            </div>
            <p>
              For a detailed breakdown of how to calculate holiday for workers with variable hours, see our <Link href="/blog/holiday-pay-calculation-uk" className="text-emerald-600 hover:underline font-medium">holiday pay calculation guide</Link>.
            </p>

            <h2>The 12-week qualifying period &mdash; equal treatment rights</h2>
            <p>
              While holiday entitlement starts from day one, the broader <strong>equal treatment</strong> rights under the AWR only kick in after the agency worker has completed <strong>12 calendar weeks</strong> in the same role with the same hirer. After this point, the worker is entitled to the same basic working and employment conditions as if they had been recruited directly by the hirer.
            </p>
            <p>
              Equal treatment covers:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Pay</strong> &mdash; the same basic pay, overtime rates, and shift allowances as a comparable direct employee.</li>
              <li><strong>Working time</strong> &mdash; the same limits on working hours, rest breaks, and night work.</li>
              <li><strong>Annual leave</strong> &mdash; if the hirer offers more than the statutory 5.6 weeks to direct staff, the agency worker must receive the same enhanced entitlement after 12 weeks.</li>
              <li><strong>Access to collective facilities</strong> &mdash; canteens, childcare, transport, etc.</li>
              <li><strong>Information about vacancies</strong> &mdash; the worker must be told about permanent job openings at the hirer.</li>
            </ul>
            <h3>How the 12 weeks are counted</h3>
            <p>
              The qualifying period is measured in <strong>calendar weeks</strong>, not working days or hours. A week counts if the agency worker does <strong>any work</strong> during that week for the same hirer in the same role. The clock does not reset for short breaks &mdash; a break of up to 6 weeks will &quot;pause&quot; the clock rather than restart it. However, a break of more than 6 weeks (except for certain protected reasons such as sickness, jury service, or maternity) will reset the count to zero.
            </p>
            <p>
              Certain breaks are treated as if the worker continued working and do not pause or reset the clock. These include:
            </p>
            <ul className="list-disc pl-6">
              <li>Sickness or injury (up to 28 weeks).</li>
              <li>Annual leave taken by the worker.</li>
              <li>Closure of the hirer&apos;s workplace (e.g., factory shutdown, Christmas closure).</li>
              <li>Jury service.</li>
              <li>A strike or lockout at the hirer&apos;s premises.</li>
              <li>Pregnancy, maternity, and adoption leave.</li>
            </ul>
            <p>
              Some hirers have historically tried to avoid triggering the 12-week threshold by rotating agency workers between different roles or moving them to a different team. The Regulations specifically prohibit this: if the <strong>most likely reason</strong> for restructuring the arrangement is to prevent the worker from qualifying for equal treatment, the 12-week clock is not reset.
            </p>

            <h2>Who is responsible &mdash; the agency or the hirer?</h2>
            <p>
              The division of responsibility between the agency and the hirer is one of the trickiest aspects of the AWR. In general:
            </p>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Obligation</th>
                  <th>Responsible party</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Paying holiday pay</strong></td>
                  <td>The agency (as the contractual employer)</td>
                </tr>
                <tr>
                  <td><strong>Providing equal treatment information</strong></td>
                  <td>The hirer (must tell the agency what comparable direct employees receive)</td>
                </tr>
                <tr>
                  <td><strong>Access to collective facilities</strong></td>
                  <td>The hirer (from day 1)</td>
                </tr>
                <tr>
                  <td><strong>Vacancy information</strong></td>
                  <td>The hirer (from day 1)</td>
                </tr>
                <tr>
                  <td><strong>Determining pay after 12 weeks</strong></td>
                  <td>Shared &mdash; the hirer provides pay data, the agency implements it</td>
                </tr>
                <tr>
                  <td><strong>Record-keeping for holiday</strong></td>
                  <td>The agency (but hirers should keep their own records too)</td>
                </tr>
              </tbody>
            </table>
            <p>
              If an agency worker brings a tribunal claim for breach of the equal treatment provisions, the <strong>agency</strong> is the primary respondent. However, the hirer can be joined as a party if they failed to provide the necessary information about comparable employees&apos; terms.
            </p>
            <p>
              In practice, hirers should not assume that the agency is handling everything correctly. <strong>Both parties have obligations</strong>, and hirers that fail to provide accurate pay comparator data can find themselves liable.
            </p>

            <h2>Rolled-up holiday pay &mdash; is it legal?</h2>
            <p>
              <strong>Rolled-up holiday pay</strong> is the practice of including a holiday pay element within the worker&apos;s regular pay, rather than paying them separately when they take time off. Historically, this was considered unlawful by the courts because it was seen as discouraging workers from actually taking their leave.
            </p>
            <p>
              However, <strong>from 1 January 2024</strong>, following amendments introduced by the Employment Rights (Amendment, Revocation and Transitional Provision) Regulations 2023, rolled-up holiday pay is now <strong>explicitly lawful</strong> for irregular-hours workers and part-year workers. This is particularly relevant for agency workers, who frequently fall into these categories.
            </p>
            <h3>How rolled-up holiday pay works</h3>
            <p>
              When an agency applies rolled-up holiday pay, the worker receives an additional <strong>12.07%</strong> on top of their basic pay in every pay period. This percentage represents the statutory holiday entitlement (5.6 weeks out of a 52-week year). For example:
            </p>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <p className="text-emerald-800 font-mono text-center text-lg mb-4">
                <strong>Rolled-up pay = Basic rate &times; 1.1207</strong>
              </p>
              <p className="text-emerald-700 text-sm text-center mb-0">
                Example: &pound;12.00/hour basic &rarr; &pound;12.00 &times; 1.1207 = <strong>&pound;13.45/hour</strong> inclusive of holiday pay.
              </p>
            </div>
            <p>
              When the worker takes holiday, they are not paid again &mdash; they have already received the holiday pay element in their regular wages. The agency <strong>must</strong> clearly itemise the holiday pay element on the worker&apos;s payslip so the worker can see what they are receiving.
            </p>
            <h3>Important caveats</h3>
            <ul className="list-disc pl-6">
              <li>Rolled-up holiday pay is only lawful for <strong>irregular-hours</strong> and <strong>part-year</strong> workers. For regular-hours workers on fixed schedules, the traditional approach (paying when leave is taken) still applies.</li>
              <li>Even with rolled-up holiday pay, the worker still has the <strong>right to take time off</strong>. The employer cannot refuse leave requests simply because the holiday pay has already been paid.</li>
              <li>The holiday pay element must be <strong>clearly shown</strong> on the payslip as a separate line item.</li>
              <li>Rolled-up holiday pay does not affect any <strong>enhanced holiday entitlement</strong> that becomes available after the 12-week qualifying period.</li>
            </ul>

            <h2>How to calculate holiday pay for agency workers</h2>
            <p>
              Calculating holiday pay for agency workers can be more complex than for permanent staff, particularly when the worker has variable earnings. The rules depend on whether the worker has completed the 12-week qualifying period.
            </p>
            <h3>Before 12 weeks: statutory holiday pay</h3>
            <p>
              Before the 12-week threshold, holiday pay is calculated based on the worker&apos;s <strong>average weekly earnings</strong> over a reference period. Since April 2020, the statutory reference period is the <strong>previous 52 weeks</strong> in which the worker was paid (ignoring weeks with no pay). If the worker has been employed for fewer than 52 weeks, use the number of complete weeks they have worked.
            </p>
            <p>
              The calculation should include:
            </p>
            <ul className="list-disc pl-6">
              <li>Basic pay.</li>
              <li>Regular overtime (both guaranteed and non-guaranteed, if it forms a regular pattern).</li>
              <li>Commission and performance bonuses that are intrinsically linked to the work performed.</li>
            </ul>
            <h3>After 12 weeks: equal treatment pay</h3>
            <p>
              Once the agency worker qualifies for equal treatment, their holiday pay must reflect what a comparable direct employee of the hirer would receive. If the hirer pays direct staff a higher rate, or includes additional elements (such as shift premiums) in their holiday pay calculation, the agency worker must receive the same.
            </p>
            <p>
              The hirer is obliged to provide the agency with the necessary pay information for comparable roles. If the hirer fails to do so, they may share liability for any underpayment.
            </p>

            <h2>Agency workers vs fixed-term employees vs self-employed contractors</h2>
            <p>
              Understanding the distinction between these three categories is essential, because each has different holiday rights:
            </p>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Holiday entitlement</th>
                  <th>AWR apply?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Agency worker</strong></td>
                  <td>5.6 weeks from day 1; equal treatment after 12 weeks</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td><strong>Fixed-term employee</strong></td>
                  <td>5.6 weeks from day 1; same rights as permanent employees from day 1</td>
                  <td>No (covered by Fixed-Term Employees Regulations 2002)</td>
                </tr>
                <tr>
                  <td><strong>Self-employed contractor</strong></td>
                  <td>No statutory holiday entitlement</td>
                  <td>No</td>
                </tr>
              </tbody>
            </table>
            <p>
              The key distinction is the <strong>triangular relationship</strong>. An agency worker is supplied by an agency to a hirer and works under the hirer&apos;s supervision but is paid by the agency. A fixed-term employee has a direct contract with the employer, while a genuinely self-employed contractor is in business on their own account.
            </p>
            <p>
              Misclassification is a common problem. If someone is labelled as &quot;self-employed&quot; but in practice works under the hirer&apos;s direction, is paid through an agency, and has no real autonomy over how the work is done, they may in fact be an agency worker entitled to full AWR protections. Tribunals look at the <strong>reality of the arrangement</strong>, not just the label on the contract.
            </p>

            <h2>The Swedish derogation &mdash; abolished in 2020</h2>
            <p>
              Before April 2020, agencies could use a mechanism known as the <strong>Swedish derogation</strong> (or &quot;pay between assignments&quot; contract) to opt out of the equal treatment provisions on pay. Under these contracts, the agency agreed to pay the worker a minimum amount between assignments, and in exchange, the worker gave up their right to equal pay after 12 weeks.
            </p>
            <p>
              The Swedish derogation was <strong>abolished on 6 April 2020</strong> by the Agency Workers (Amendment) Regulations 2019, following the Taylor Review&apos;s recommendation that it was being used to undermine workers&apos; rights. Any Swedish derogation clauses in existing contracts became void on that date.
            </p>
            <p>
              If you are still working under a contract that references a Swedish derogation, that clause is no longer enforceable. You are entitled to full equal treatment after 12 weeks in the same role.
            </p>

            <h2>Common problems: agencies not paying holiday</h2>
            <p>
              Despite clear legal requirements, agency workers frequently encounter problems with their holiday rights. The most common issues include:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Being told they have no holiday entitlement</strong> &mdash; some agencies (particularly smaller or less scrupulous ones) tell workers they are &quot;self-employed&quot; and therefore not entitled to holiday. If the worker is genuinely supplied by an agency and works under a hirer&apos;s supervision, this is almost certainly wrong.</li>
              <li><strong>Holiday pay not being itemised</strong> &mdash; where rolled-up holiday pay is used, the worker may not realise that part of their hourly rate is holiday pay because it is not shown separately on the payslip. This is now a legal requirement.</li>
              <li><strong>Being discouraged from taking leave</strong> &mdash; even with rolled-up holiday pay, workers have the right to take time off. An agency cannot penalise a worker for requesting leave or refuse to offer them future assignments because they took holiday.</li>
              <li><strong>Incorrect calculation of holiday pay</strong> &mdash; failing to include overtime, commission, or other regular payments in the holiday pay calculation.</li>
              <li><strong>The 12-week clock being manipulated</strong> &mdash; moving workers between roles or introducing artificial breaks to prevent them reaching the qualifying period. This is specifically prohibited by the Regulations.</li>
              <li><strong>No information about comparable pay</strong> &mdash; the hirer failing to provide the agency with data about what directly employed staff in comparable roles earn, making it impossible for the agency to calculate the correct post-12-week pay.</li>
            </ul>
            <p>
              Agency workers who believe their rights are being breached can raise a grievance with the agency, contact <strong>ACAS</strong> for early conciliation, or bring a claim to an <strong>employment tribunal</strong>. Claims must normally be brought within 3 months less 1 day of the alleged breach.
            </p>

            <h2>Record-keeping obligations</h2>
            <p>
              Accurate record-keeping is essential for both agencies and hirers to demonstrate compliance with the AWR and the Working Time Regulations.
            </p>
            <h3>Agency obligations</h3>
            <ul className="list-disc pl-6">
              <li>Records of holiday accrued and taken by each worker.</li>
              <li>Payslips showing the holiday pay element (especially if using rolled-up holiday pay).</li>
              <li>Records of the 12-week qualifying period for each assignment.</li>
              <li>Correspondence with the hirer regarding comparable employee pay data.</li>
              <li>Evidence that equal treatment was applied after the qualifying period.</li>
            </ul>
            <h3>Hirer obligations</h3>
            <ul className="list-disc pl-6">
              <li>Information provided to the agency about comparable employees&apos; terms and conditions.</li>
              <li>Records of when agency workers started and finished assignments.</li>
              <li>Documentation of any breaks in assignments and the reasons for them.</li>
              <li>Evidence that access to collective facilities was provided from day one.</li>
            </ul>
            <p>
              Both parties should retain records for at least <strong>6 years</strong> (the standard limitation period for breach of contract claims), though tribunal claims under the AWR have a shorter 3-month time limit.
            </p>

            <h2>Multiple assignment tracking</h2>
            <p>
              Many agency workers take on multiple assignments &mdash; sometimes with different hirers simultaneously, sometimes with the same hirer across different roles. Tracking the 12-week qualifying period and holiday accrual across multiple assignments adds significant complexity.
            </p>
            <p>
              Key points to remember:
            </p>
            <ul className="list-disc pl-6">
              <li>The 12-week clock is <strong>specific to each hirer and role combination</strong>. Working for Hirer A does not count towards the qualifying period with Hirer B.</li>
              <li>If a worker returns to the <strong>same hirer in the same role</strong> after a break of 6 weeks or less, the clock continues from where it left off.</li>
              <li>Holiday entitlement accrues across <strong>all assignments</strong>, not just the current one. An agency worker who completes one 4-week assignment and then starts another has already accrued holiday during the first assignment.</li>
              <li>If the worker has multiple concurrent assignments (e.g., working for Hirer A on Mondays and Hirer B on Tuesdays), holiday accrues separately for each assignment based on the hours worked.</li>
            </ul>
            <p>
              For agencies managing large numbers of workers across multiple clients, manual tracking in spreadsheets quickly becomes unmanageable and error-prone. This is where purpose-built leave management software becomes essential.
            </p>

            <h2>How Leavely helps businesses track agency and temp staff leave</h2>
            <p>
              Managing leave for agency and temporary workers alongside permanent staff is one of the most common pain points for HR teams, particularly in industries with high agency usage such as warehousing, manufacturing, hospitality, and healthcare. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> provides the tools to handle this complexity without spreadsheets or guesswork:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Separate leave policies for agency staff</strong> &mdash; create dedicated leave policies for agency and temp workers with different accrual rules, entitlements, and carry-over settings, keeping them distinct from permanent employee policies.</li>
              <li><strong>Automatic pro-rata accrual</strong> &mdash; Leavely calculates holiday entitlement based on hours or days worked, applying the 12.07% accrual rate automatically for irregular-hours workers.</li>
              <li><strong>12-week qualifying period tracking</strong> &mdash; track when each agency worker hits the 12-week threshold so you can review and update their entitlements in line with equal treatment requirements.</li>
              <li><strong>Multi-assignment visibility</strong> &mdash; see all assignments and leave balances for each worker in a single view, making it easy to track accrual across different placements.</li>
              <li><strong>Rolled-up holiday pay records</strong> &mdash; maintain clear records of holiday pay elements for payslip compliance, with exportable reports for your payroll provider.</li>
              <li><strong>Team calendar integration</strong> &mdash; agency workers appear alongside permanent staff on the team calendar, so managers can see who is off and plan coverage accordingly.</li>
              <li><strong>Audit trail</strong> &mdash; every leave request, approval, and balance change is logged, giving you a complete compliance record if questions arise.</li>
            </ul>
            <p>
              Whether you are an agency managing hundreds of temporary workers or a hirer that regularly brings in agency staff, Leavely ensures that holiday entitlements are calculated correctly, tracked transparently, and fully compliant with the AWR and Working Time Regulations.
            </p>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Track agency worker leave with confidence</h3>
            <p className="text-emerald-100 mb-6">Leavely calculates pro-rata accrual, tracks the 12-week qualifying period, and keeps agency staff leave separate from permanent employees. Start your 14-day free trial.</p>
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
                Annual Leave Entitlement UK 2026: The Complete Guide &rarr;
              </Link>
              <Link href="/blog/holiday-pay-calculation-uk" className="block text-emerald-600 hover:underline font-medium">
                Holiday Pay Calculation UK: The Complete Guide &rarr;
              </Link>
              <Link href="/blog/part-time-workers-rights-uk" className="block text-emerald-600 hover:underline font-medium">
                Part-Time Workers&apos; Rights UK: Leave, Pay &amp; Employer Obligations &rarr;
              </Link>
              <Link href="/blog/working-time-regulations-uk" className="block text-emerald-600 hover:underline font-medium">
                Working Time Regulations UK: Hours, Breaks &amp; Annual Leave &rarr;
              </Link>
              <Link href="/blog/pro-rata-annual-leave-calculator" className="block text-emerald-600 hover:underline font-medium">
                Pro Rata Annual Leave Calculator: How to Get It Right &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
