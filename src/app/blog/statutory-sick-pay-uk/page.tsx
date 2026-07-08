import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/statutory-sick-pay-uk`

export const metadata: Metadata = {
  title: 'Statutory Sick Pay (SSP) UK 2026: Complete Employer Guide',
  description:
    'Everything UK employers need to know about Statutory Sick Pay (SSP) in 2026. Covers SSP rates, eligibility, waiting days, calculation for part-time workers, Bradford Factor, and how to automate SSP tracking.',
  alternates: { canonical: articleUrl },
  keywords: [
    'statutory sick pay UK',
    'SSP rates 2026',
    'SSP eligibility',
    'SSP calculation',
    'employer SSP guide',
    'SSP waiting days',
    'SSP vs company sick pay',
    'statutory sick pay entitlement',
    'SSP for part-time workers',
    'SSP record keeping',
  ],
  openGraph: {
    title: 'Statutory Sick Pay (SSP) UK 2026 — Complete Employer Guide',
    description: 'SSP rates, eligibility, waiting days, calculation, and how to automate SSP tracking for your business.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Statutory Sick Pay (SSP) UK 2026: Complete Employer Guide',
  description: 'Everything UK employers need to know about Statutory Sick Pay (SSP) in 2026.',
  url: articleUrl,
  datePublished: '2026-03-25',
  dateModified: '2026-03-25',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function StatutorySickPayArticle() {
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
            <span className="text-xs text-gray-400 ml-3">12 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Statutory Sick Pay (SSP) UK 2026: Complete Employer Guide
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Statutory Sick Pay (SSP) is the legal minimum amount UK employers must pay employees who are too ill to work. Getting SSP wrong can lead to HMRC penalties, employee disputes, and costly tribunal claims. This guide covers everything you need to know &mdash; from current rates and eligibility rules to calculating SSP for part-time workers and automating the entire process.
            </p>

            <h2>What is Statutory Sick Pay (SSP)?</h2>
            <p>
              SSP is a government-mandated payment that employers must make to employees who are off work due to illness or injury. It was introduced under the Social Security Contributions and Benefits Act 1992 and is administered by HMRC. Unlike benefits such as Universal Credit, SSP is paid by the employer &mdash; not the state &mdash; directly through the normal payroll.
            </p>
            <p>
              The key principle behind SSP is straightforward: if an employee is too unwell to carry out their duties, they should receive a minimum level of income while they recover. Employers cannot opt out of paying SSP. It applies regardless of company size, industry, or whether you offer any additional sick pay on top.
            </p>
            <p>
              SSP is separate from any <strong>contractual sick pay</strong> (also called company or occupational sick pay) that you may offer. Many employers choose to pay more than SSP, but the statutory rate is the legal floor &mdash; you must pay at least this amount to every eligible employee.
            </p>

            <h2>SSP rates for 2025/26</h2>
            <p>
              The current SSP rate for the 2025/26 tax year is <strong>&pound;116.75 per week</strong>. This rate is set by the government and typically reviewed each April. SSP is paid for the days an employee would normally work (known as <strong>qualifying days</strong>), and the weekly rate is divided across those days.
            </p>
            <p>
              For example, if an employee works five days per week, their daily SSP rate would be &pound;116.75 &divide; 5 = <strong>&pound;23.35 per day</strong>. If they work three days per week, the daily rate would be &pound;116.75 &divide; 3 = <strong>&pound;38.92 per day</strong>. The total weekly amount remains the same regardless of the number of qualifying days.
            </p>
            <p>
              SSP is subject to normal tax and National Insurance deductions. It counts as earnings for income tax purposes and should be processed through your standard payroll.
            </p>

            <h2>SSP eligibility: who qualifies?</h2>
            <p>
              Not every worker is entitled to SSP. To qualify, an employee must meet <strong>all</strong> of the following criteria:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Be classified as an employee</strong> &mdash; SSP does not apply to self-employed individuals, agency workers paid by the agency, or contractors working under a contract for services.</li>
              <li><strong>Have done some work under their contract</strong> &mdash; employees who fall sick before starting any work are not eligible.</li>
              <li><strong>Earn at least the Lower Earnings Limit (LEL)</strong> &mdash; currently &pound;123 per week (gross average earnings over the previous 8 weeks). Employees earning below this threshold do not qualify for SSP.</li>
              <li><strong>Be off sick for 4 or more consecutive days</strong> &mdash; this includes weekends, bank holidays, and any other non-working days. A single day of illness, or even two or three days, does not trigger an SSP entitlement.</li>
              <li><strong>Have notified the employer of their absence</strong> &mdash; within the deadline set in your sick leave policy (or within 7 days if you haven&apos;t specified one).</li>
              <li><strong>Have provided evidence of incapacity</strong> &mdash; self-certification for the first 7 days, then a fit note from a GP for absences beyond 7 calendar days.</li>
            </ul>
            <p>
              If an employee does not qualify for SSP, you must issue them an <strong>SSP1 form</strong> within 7 days of their first sick day. This form explains why they are not entitled and directs them to apply for Employment and Support Allowance (ESA) or Universal Credit instead.
            </p>

            <h2>The 3 waiting days rule</h2>
            <p>
              One of the most commonly misunderstood aspects of SSP is the <strong>waiting days</strong> rule. SSP is not payable from day one of an employee&apos;s sickness absence. Instead, there are 3 &quot;waiting days&quot; at the start of every period of incapacity for work (PIW), during which no SSP is paid.
            </p>
            <p>
              Waiting days only count on days the employee would normally work (qualifying days). So if an employee falls ill on a Friday and their qualifying days are Monday to Friday, the waiting days would be Friday, the following Monday, and Tuesday &mdash; with SSP beginning from Wednesday.
            </p>
            <p>
              However, there is an important exception: if an employee has two separate periods of sickness within <strong>8 weeks</strong> of each other, they are &quot;linked&quot; into a single PIW. In a linked PIW, the waiting days from the first absence carry over &mdash; meaning the employee may start receiving SSP immediately when the second absence begins.
            </p>
            <p>
              This linking rule is designed to prevent employees from being unfairly penalised for recurring bouts of the same illness. It also means employers need to track absence history carefully to determine whether waiting days have already been served.
            </p>

            <h2>How long does SSP last?</h2>
            <p>
              SSP is payable for a maximum of <strong>28 weeks</strong> in any single period of incapacity for work (or linked periods). After 28 weeks, the employer&apos;s obligation to pay SSP ends. At that point, the employee may be entitled to claim Employment and Support Allowance (ESA) or Universal Credit from the Department for Work and Pensions.
            </p>
            <p>
              You must send the employee an <strong>SSP1 form</strong> at least 4 weeks before their SSP entitlement is due to run out, so they have time to arrange alternative benefits. If the employee&apos;s contract ends before the 28 weeks are up, you must still issue the SSP1 and transfer liability accordingly.
            </p>

            <h2>SSP vs contractual and enhanced sick pay</h2>
            <p>
              Many UK employers offer sick pay above the statutory minimum. This is known as <strong>contractual sick pay</strong>, <strong>company sick pay</strong>, or <strong>occupational sick pay</strong>. There is no legal requirement to offer enhanced sick pay, but many employers do so to attract and retain talent, reduce financial stress during illness, and encourage employees to take proper time to recover rather than returning to work too early.
            </p>
            <p>
              Typical enhanced schemes might offer:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Full pay for a set period</strong> &mdash; for example, full pay for the first 4 weeks of sickness, then half pay for the next 4 weeks, then SSP only.</li>
              <li><strong>Service-linked entitlement</strong> &mdash; more generous sick pay for employees with longer service (e.g., 6 weeks full pay after 2 years&apos; service, 12 weeks after 5 years).</li>
              <li><strong>Day-one payment</strong> &mdash; paying from the first day of absence with no waiting days, even though SSP doesn&apos;t start until day 4.</li>
            </ul>
            <p>
              If you offer contractual sick pay, SSP is included within it &mdash; not paid on top. For example, if your scheme offers &pound;300 per week and the SSP rate is &pound;116.75, you pay &pound;300 total (not &pound;416.75). The SSP portion is simply the part that satisfies your statutory obligation.
            </p>
            <p>
              Your sick pay arrangements must be clearly set out in the employee&apos;s written statement of employment particulars (sometimes called a &quot;section 1 statement&quot;) or in a separate policy document. For more detail, see our guide to <Link href="/blog/occupational-sick-pay-uk" className="text-emerald-600 hover:underline font-medium">Occupational Sick Pay UK</Link>.
            </p>

            <h2>When SSP does not apply</h2>
            <p>
              There are several situations where an employee is <strong>not</strong> entitled to SSP:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Earnings below the LEL</strong> &mdash; if average weekly earnings are below &pound;123 per week.</li>
              <li><strong>Self-employed workers</strong> &mdash; SSP applies only to employees, not sole traders or partners.</li>
              <li><strong>Already received 28 weeks of SSP</strong> &mdash; the entitlement is exhausted for that PIW.</li>
              <li><strong>Employees on maternity, paternity, or adoption leave</strong> &mdash; SSP cannot be paid concurrently with statutory maternity pay (SMP) or other family leave payments.</li>
              <li><strong>Employees within a trade dispute</strong> &mdash; those on strike are not entitled to SSP on the first day of their absence if the stoppage started before the sickness.</li>
              <li><strong>Employees in legal custody</strong> &mdash; SSP is not payable while an employee is in prison or held in legal custody.</li>
              <li><strong>New employees who have not yet started work</strong> &mdash; if the employee falls ill before their first day of work under the contract.</li>
              <li><strong>Employees outside the EU/EEA</strong> &mdash; when the employer is not liable to pay employer&apos;s Class 1 NICs.</li>
            </ul>
            <p>
              In all these cases, you must issue the employee an <strong>SSP1 form</strong> so they can explore other options such as ESA or Universal Credit.
            </p>

            <h2>How to calculate SSP for part-time and irregular hours workers</h2>
            <p>
              Calculating SSP for employees who don&apos;t work a standard Monday-to-Friday pattern requires extra care. The key concept is <strong>qualifying days</strong> &mdash; the days on which SSP can be paid.
            </p>

            <h3>Step 1: Identify qualifying days</h3>
            <p>
              Qualifying days are the days an employee is contracted to work. For a part-time employee who works Monday, Wednesday, and Friday, those three days are the qualifying days. If no qualifying days are agreed, HMRC defaults to Wednesday through Saturday.
            </p>

            <h3>Step 2: Calculate the daily rate</h3>
            <p>
              Divide the weekly SSP rate (&pound;116.75) by the number of qualifying days. For a 3-day-per-week employee: &pound;116.75 &divide; 3 = &pound;38.92 per qualifying day.
            </p>

            <h3>Step 3: Apply waiting days</h3>
            <p>
              Count 3 qualifying days as waiting days before SSP becomes payable. If our Monday/Wednesday/Friday employee falls ill on a Wednesday, the waiting days are Wednesday, Friday, and the following Monday. SSP starts on the following Wednesday.
            </p>

            <h3>Step 4: Pay SSP for qualifying days only</h3>
            <p>
              After the waiting days, pay the daily SSP rate for each qualifying day the employee remains off sick. Keep in mind that the 4-consecutive-day rule counts <strong>all</strong> days (including weekends and non-working days), not just qualifying days. So even if an employee only works 2 days a week, a Thursday-to-Sunday illness counts as 4 consecutive days and triggers SSP eligibility.
            </p>

            <h3>Irregular hours and zero-hours contracts</h3>
            <p>
              For employees with irregular hours or zero-hours contracts, determining qualifying days can be more complex. HMRC advises looking at the pattern of work over the previous 8 weeks to establish which days the employee would normally have worked. If no regular pattern exists, the default qualifying days (Wednesday to Saturday) apply.
            </p>

            <h2>Record-keeping requirements</h2>
            <p>
              UK employers must keep SSP records for <strong>at least 3 years</strong> after the end of the tax year to which they relate. While HMRC no longer prescribes a specific format, your records should include:
            </p>
            <ul className="list-disc pl-6">
              <li>Dates of each period of sickness absence.</li>
              <li>The qualifying days for each employee.</li>
              <li>Dates SSP was paid and the amounts.</li>
              <li>Any dates within the PIW that SSP was <strong>not</strong> paid, with reasons (e.g., waiting days, earnings below LEL).</li>
              <li>Evidence of incapacity &mdash; self-certification statements and fit notes.</li>
              <li>Any SSP1 forms issued.</li>
              <li>Records of linked PIWs.</li>
            </ul>
            <p>
              Poor record-keeping is one of the most common reasons employers face HMRC compliance reviews. Using spreadsheets to track SSP is risky because formulae can be overwritten, files can be lost, and there is no audit trail. Dedicated HR software provides a much safer solution.
            </p>

            <h2>Dealing with employees who abuse sick leave</h2>
            <p>
              Occasional sickness absence is a normal part of employment. However, patterns of absence &mdash; particularly frequent short-term absences around weekends, holidays, or after specific events &mdash; can indicate misuse of <Link href="/blog/sick-leave-policy-uk" className="text-emerald-600 hover:underline font-medium">sick leave</Link>. Addressing suspected abuse requires a careful, fair, and well-documented approach.
            </p>

            <h3>Warning signs of sick leave abuse</h3>
            <ul className="list-disc pl-6">
              <li>Frequent single-day or two-day absences, particularly on Mondays or Fridays.</li>
              <li>Absences that consistently fall before or after annual leave or bank holidays.</li>
              <li>Social media posts showing activities inconsistent with claimed illness.</li>
              <li>A pattern of sickness absence coinciding with denied leave requests.</li>
              <li>Colleagues reporting that the employee was not genuinely unwell.</li>
            </ul>

            <h3>What employers can do</h3>
            <ol className="list-decimal pl-6">
              <li><strong>Conduct return-to-work interviews</strong> &mdash; these are the single most effective deterrent against casual absence. When employees know they will be asked about their illness face-to-face, frivolous absences tend to decrease. See our guide to <Link href="/blog/return-to-work-interview-questions" className="text-emerald-600 hover:underline font-medium">return-to-work interview questions</Link>.</li>
              <li><strong>Use trigger points</strong> &mdash; set clear absence thresholds (e.g., 3 spells in 3 months or 8 days total in 12 months) that automatically prompt a formal conversation.</li>
              <li><strong>Monitor Bradford Factor scores</strong> &mdash; the Bradford Factor is specifically designed to highlight frequent short-term absence patterns.</li>
              <li><strong>Investigate fairly</strong> &mdash; before taking disciplinary action, hold an investigation meeting. Give the employee the chance to explain. There may be an underlying health condition that requires reasonable adjustments under the Equality Act 2010.</li>
              <li><strong>Follow a formal process</strong> &mdash; if abuse is confirmed, follow your disciplinary procedure. This typically involves a verbal warning, written warning, final written warning, and ultimately dismissal for gross misconduct in serious cases (such as working for another employer while claiming to be sick).</li>
            </ol>
            <p>
              It is critical that you apply your absence management policy <strong>consistently</strong> across all employees. Treating different employees differently for similar absence patterns is a fast track to a discrimination or unfair treatment claim.
            </p>

            <h2>SSP and the Bradford Factor</h2>
            <p>
              The <Link href="/blog/bradford-factor-explained" className="text-emerald-600 hover:underline font-medium">Bradford Factor</Link> is a widely used formula that helps employers measure the impact of absence: <strong>B = S &times; S &times; D</strong>, where S is the number of separate absence spells and D is the total number of days absent.
            </p>
            <p>
              The Bradford Factor is particularly useful alongside SSP tracking because it highlights the difference between a single long-term absence (which is often unavoidable) and frequent short-term absences (which are more disruptive and potentially indicative of misuse).
            </p>
            <p>
              Consider two employees who each take 10 days off in a year:
            </p>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Spells (S)</th>
                  <th>Days (D)</th>
                  <th>Bradford Score</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Employee A &mdash; 1 absence of 10 days</td><td>1</td><td>10</td><td>10</td></tr>
                <tr><td>Employee B &mdash; 10 single-day absences</td><td>10</td><td>10</td><td>1,000</td></tr>
              </tbody>
            </table>
            <p>
              Employee B&apos;s score is 100 times higher, reflecting the far greater operational disruption caused by frequent, unpredictable absences. The Bradford Factor helps managers focus their attention on the patterns that cause the most harm, while avoiding unfairly penalising employees with genuine long-term health conditions.
            </p>
            <p>
              When using the Bradford Factor alongside SSP, remember to <strong>exclude disability-related absences</strong> from the calculation where the Equality Act 2010 applies. Failing to do so could constitute indirect discrimination. Always consider the reasons behind the absence before taking any action based on a Bradford Factor score.
            </p>

            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6 text-center">
              <p className="text-emerald-800 font-semibold mb-2">Free Bradford Factor Calculator</p>
              <p className="text-emerald-700 text-sm mb-3">Enter absence spells and total days to instantly calculate a Bradford Factor score with threshold guidance.</p>
              <Link href="/tools/bradford-factor-calculator" className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:underline">
                Try it now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <h2>SSP recovery schemes for small employers</h2>
            <p>
              Historically, small employers could reclaim some or all of their SSP costs through the <strong>Percentage Threshold Scheme (PTS)</strong>. This scheme was abolished in 2014, and at the time of writing there is <strong>no general SSP recovery scheme</strong> available to employers.
            </p>
            <p>
              The only recent exception was during the COVID-19 pandemic (2020&ndash;2021), when the government introduced the <strong>Coronavirus Statutory Sick Pay Rebate Scheme</strong>. This allowed employers with fewer than 250 employees to reclaim up to 2 weeks of SSP per employee for COVID-related absences. This scheme has since closed.
            </p>
            <p>
              For small businesses, the inability to reclaim SSP costs makes it even more important to manage absence proactively. Every unnecessary day of SSP is a direct cost to your business. Strategies to reduce this burden include:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Strong absence policies</strong> &mdash; a clear, well-communicated <Link href="/blog/sick-leave-policy-uk" className="text-emerald-600 hover:underline font-medium">sick leave policy</Link> sets expectations from day one.</li>
              <li><strong>Return-to-work interviews</strong> &mdash; proven to reduce short-term absence by up to 30%.</li>
              <li><strong>Early intervention</strong> &mdash; addressing absence patterns before they become entrenched.</li>
              <li><strong>Phased returns</strong> &mdash; a <Link href="/blog/phased-return-to-work-uk" className="text-emerald-600 hover:underline font-medium">phased return to work</Link> can help employees come back sooner and more sustainably than waiting for full fitness.</li>
              <li><strong>Wellbeing programmes</strong> &mdash; investing in employee health and mental wellbeing reduces sickness absence over time.</li>
              <li><strong>Group income protection insurance</strong> &mdash; some insurers offer policies that cover enhanced sick pay costs, removing the financial burden from the employer.</li>
            </ul>

            <h2>SSP and fit notes: what employers need to know</h2>
            <p>
              For the first 7 calendar days of sickness, employees can <strong>self-certify</strong> their absence. This typically involves filling out a form (SC2) confirming they were unwell and the dates of their absence. Many employers use their own self-certification form as part of their absence management process.
            </p>
            <p>
              For absences lasting <strong>more than 7 calendar days</strong>, the employee must provide a fit note from their GP, hospital doctor, or other approved healthcare professional. Since July 2022, fit notes can also be issued by registered nurses, occupational therapists, pharmacists, and physiotherapists.
            </p>
            <p>
              A fit note can advise that the employee is either:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>&quot;Not fit for work&quot;</strong> &mdash; the employee should not work at all.</li>
              <li><strong>&quot;May be fit for work&quot;</strong> &mdash; the employee could work if certain adjustments are made, such as amended duties, altered hours, workplace adaptations, or a <Link href="/blog/phased-return-to-work-uk" className="text-emerald-600 hover:underline font-medium">phased return</Link>.</li>
            </ul>
            <p>
              If a fit note says &quot;may be fit for work&quot; and you <strong>cannot</strong> provide the suggested adjustments, you must treat the employee as &quot;not fit for work&quot; and continue paying SSP. You cannot withhold SSP simply because the doctor suggested adjustments that you choose not to implement.
            </p>

            <h2>SSP and long-term sickness</h2>
            <p>
              When an employee&apos;s illness extends beyond a few weeks, managing SSP becomes part of a wider absence management challenge. Key considerations include:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Regular welfare contact</strong> &mdash; maintain reasonable contact to show support and stay informed about the likely return date. Agree on the frequency and method of contact in advance.</li>
              <li><strong>Occupational health referral</strong> &mdash; consider referring the employee to an occupational health professional for an independent assessment of their fitness to work and any adjustments that might help.</li>
              <li><strong>Reasonable adjustments</strong> &mdash; if the illness amounts to a disability under the Equality Act 2010, you have a legal duty to make reasonable adjustments.</li>
              <li><strong>SSP1 form</strong> &mdash; issue this at least 4 weeks before SSP runs out at 28 weeks.</li>
              <li><strong>Capability process</strong> &mdash; if the employee is unlikely to return, you may need to consider a capability-based dismissal. This must follow a fair procedure and is only a last resort after all other options have been exhausted.</li>
            </ul>

            <h2>Common SSP mistakes employers make</h2>
            <p>
              Even experienced employers can get SSP wrong. Here are the most frequent errors:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Not paying SSP because the employee didn&apos;t provide a fit note</strong> &mdash; for the first 7 days, no fit note is required. You cannot withhold SSP for the first week because the employee didn&apos;t see a doctor.</li>
              <li><strong>Forgetting the 8-week linking rule</strong> &mdash; two separate absences within 8 weeks form a single PIW. Waiting days may not need to be served again.</li>
              <li><strong>Calculating average earnings incorrectly</strong> &mdash; the LEL test uses the 8-week period ending on the last normal pay day before the start of the absence, not the most recent pay period alone.</li>
              <li><strong>Stopping SSP when the employee&apos;s contract ends</strong> &mdash; if an employee leaves or is dismissed during a PIW, you may still be liable for SSP until the PIW ends or 28 weeks expire.</li>
              <li><strong>Not issuing SSP1 forms</strong> &mdash; failing to provide an SSP1 when SSP is refused or is about to end is a compliance breach.</li>
              <li><strong>Treating SSP as separate from contractual sick pay</strong> &mdash; if your sick pay scheme pays more than SSP, the SSP element is included within it, not paid on top.</li>
              <li><strong>Ignoring part-time qualifying days</strong> &mdash; SSP must be calculated based on the employee&apos;s actual working pattern, not assumed to be Monday to Friday.</li>
            </ol>

            <h2>How Leavely automates SSP tracking</h2>
            <p>
              Managing SSP manually is time-consuming and error-prone. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> automates the key elements of SSP administration so you can stay compliant without the spreadsheet headaches.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Automatic sick leave tracking</strong> &mdash; every sickness absence is logged with start and end dates, creating a complete history for each employee.</li>
              <li><strong>Bradford Factor calculation</strong> &mdash; scores are calculated automatically from absence records, with configurable trigger-point alerts for managers.</li>
              <li><strong>Return-to-work forms</strong> &mdash; digital RTW interview forms are attached directly to each absence record, creating a paperless audit trail.</li>
              <li><strong>Absence pattern alerts</strong> &mdash; managers are notified when employees hit absence thresholds, so early intervention happens before problems escalate.</li>
              <li><strong>Complete absence history</strong> &mdash; per-employee records that satisfy HMRC&apos;s 3-year retention requirement, accessible any time for audits or tribunal defence.</li>
              <li><strong>Leave policy configuration</strong> &mdash; set up your sick leave entitlements, enhanced pay rules, and qualifying day patterns once, and Leavely applies them automatically.</li>
              <li><strong>Manager and HR dashboards</strong> &mdash; see who is off, Bradford Factor scores, and absence trends at a glance.</li>
            </ul>
            <p>
              By removing manual calculations and spreadsheet risks, Leavely helps you pay SSP correctly, spot absence patterns early, and maintain the records you need if HMRC ever comes knocking.
            </p>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Automate SSP tracking and absence management</h3>
            <p className="text-emerald-100 mb-6">Leavely handles sick leave tracking, Bradford Factor, return-to-work forms, and SSP record-keeping &mdash; all in one place.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/sick-leave-policy-uk" className="block text-emerald-600 hover:underline font-medium">Sick Leave Policy UK: What Employers Must Know &rarr;</Link>
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">Bradford Factor Explained: How to Calculate and Use It &rarr;</Link>
              <Link href="/blog/return-to-work-interview-questions" className="block text-emerald-600 hover:underline font-medium">Return-to-Work Interview Questions: Free Template &rarr;</Link>
              <Link href="/blog/occupational-sick-pay-uk" className="block text-emerald-600 hover:underline font-medium">Occupational Sick Pay UK: What Employers Need to Know &rarr;</Link>
              <Link href="/blog/phased-return-to-work-uk" className="block text-emerald-600 hover:underline font-medium">Phased Return to Work UK: How to Get It Right &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
