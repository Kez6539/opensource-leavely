import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/hr-compliance-checklist-uk`

export const metadata: Metadata = {
  title: 'HR Compliance Checklist UK 2026: The Complete Audit Guide for Small Businesses',
  description:
    'Complete HR compliance checklist for UK small businesses covering employment contracts, right to work checks, leave management, pay and payroll, health and safety, GDPR, equality, disciplinary procedures, working time, and termination. Includes penalties table and downloadable checklist.',
  alternates: { canonical: articleUrl },
  keywords: [
    'HR compliance checklist UK',
    'HR audit checklist UK',
    'employment law checklist UK',
    'small business HR compliance',
    'HR requirements UK',
    'HR legal requirements UK employer',
  ],
  openGraph: {
    title: 'HR Compliance Checklist UK 2026 &mdash; The Complete Audit Guide for Small Businesses',
    description: 'Complete HR compliance checklist for UK SMBs with penalties table, audit guide, and downloadable checklist format.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'HR Compliance Checklist UK 2026: The Complete Audit Guide for Small Businesses',
  description: 'Complete HR compliance checklist for UK small businesses covering all key areas of employment law.',
  url: articleUrl,
  datePublished: '2026-03-25',
  dateModified: '2026-03-25',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function HrComplianceChecklistArticle() {
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
            <span className="text-xs text-gray-400 ml-3">11 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            HR Compliance Checklist UK 2026: The Complete Audit Guide for Small Businesses
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Employment tribunals awarded a record &pound;1.7 million in a single unfair dismissal case in 2025. The average cost of defending an employment tribunal claim &mdash; even if you win &mdash; is &pound;8,500 in legal fees alone. For small businesses, a single compliance failure can be financially devastating. Yet most UK SMBs don&apos;t have a dedicated HR team, and employment law changes every year. This guide gives you a complete, practical HR compliance checklist covering every area of UK employment law that small businesses need to get right in 2026.
            </p>

            <h2>Why HR compliance matters for small businesses</h2>
            <p>
              HR compliance isn&apos;t just about avoiding fines &mdash; although the fines are significant. It&apos;s about protecting your business, your employees, and your reputation. Here&apos;s what&apos;s at stake:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Financial penalties</strong> &mdash; HMRC, the Health and Safety Executive, and the Information Commissioner&apos;s Office all have the power to impose substantial fines. Right to work violations alone carry penalties of up to &pound;60,000 per illegal worker.</li>
              <li><strong>Tribunal claims</strong> &mdash; employees can bring claims for unfair dismissal, discrimination, unpaid wages, holiday pay, and more. Tribunal awards are uncapped for discrimination claims.</li>
              <li><strong>Reputational damage</strong> &mdash; tribunal judgments are published publicly. A discrimination or unfair dismissal ruling can damage your employer brand and make it harder to recruit.</li>
              <li><strong>Operational disruption</strong> &mdash; responding to tribunal claims, investigations, and enforcement actions consumes management time that should be spent running the business.</li>
              <li><strong>Employee morale</strong> &mdash; inconsistent or unfair treatment erodes trust. Compliance isn&apos;t the ceiling &mdash; it&apos;s the floor. Get it right, and you build a foundation for a positive workplace culture.</li>
            </ul>
            <p>
              The good news is that most compliance failures are preventable. They happen because small businesses don&apos;t know the rules, not because they deliberately break them. This checklist closes that knowledge gap.
            </p>

            <h2>The essential HR compliance checklist</h2>
            <p>
              We&apos;ve organised this checklist into ten categories. Work through each section and tick off every item. If you find gaps, prioritise them by risk &mdash; areas with the highest penalties or the greatest likelihood of a claim should be addressed first.
            </p>

            <h3>1. Employment contracts and written statements</h3>
            <p>
              Since April 2020, all employees and workers are legally entitled to a written statement of their main employment terms on or before their first day of work. This is not optional &mdash; it&apos;s a day-one right.
            </p>
            <div className="rounded-xl border-2 border-emerald-100 bg-emerald-50/30 p-6 my-6">
              <ul className="list-none pl-0 space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Every employee has a written statement of terms</strong> &mdash; issued on or before day one of employment.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Statement includes all required particulars</strong> &mdash; employer name, employee name, start date, job title, pay, hours, holiday entitlement, notice periods, probation period, place of work, and any collective agreements.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Wider written statement provided within two months</strong> &mdash; covering sick leave procedures, pension details, disciplinary and grievance procedures, and any training requirements.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Contracts are up to date</strong> &mdash; any changes to terms have been agreed in writing with the employee and documented.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Contracts reflect current legislation</strong> &mdash; reviewed annually to ensure they comply with any changes in employment law.</li>
              </ul>
            </div>
            <p>
              <strong>Risk:</strong> If you don&apos;t provide a written statement, an employee can bring a claim to an employment tribunal. The tribunal can award two to four weeks&apos; pay as compensation, and this can be added on top of any other successful claim.
            </p>

            <h3>2. Right to work checks</h3>
            <p>
              Every employer must verify that every employee has the legal right to work in the UK before they start work. This applies to British citizens, EU nationals, and everyone else. No exceptions.
            </p>
            <div className="rounded-xl border-2 border-emerald-100 bg-emerald-50/30 p-6 my-6">
              <ul className="list-none pl-0 space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Right to work checks completed for every employee</strong> &mdash; before their first day of work, not on it.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Original documents verified</strong> &mdash; passport, biometric residence permit, or share code checked via the Home Office online service.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Dated copies retained</strong> &mdash; clear copies of documents stored securely, with the date of check recorded.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Follow-up checks scheduled</strong> &mdash; for employees with time-limited permission to work, follow-up checks are diarised before the expiry date.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Consistent process for all</strong> &mdash; the same check is applied to every candidate, regardless of nationality, to avoid discrimination claims.</li>
              </ul>
            </div>
            <p>
              <strong>Risk:</strong> Civil penalties of up to &pound;60,000 per illegal worker (increased from &pound;45,000 in 2024). Criminal prosecution is possible for repeat offenders, with unlimited fines and up to five years&apos; imprisonment.
            </p>

            <h3>3. Leave and absence management</h3>
            <p>
              UK employees have statutory rights to various types of leave. Getting this wrong is one of the most common areas of non-compliance &mdash; and one of the easiest to fix with the right systems.
            </p>
            <div className="rounded-xl border-2 border-emerald-100 bg-emerald-50/30 p-6 my-6">
              <ul className="list-none pl-0 space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Annual leave meets statutory minimum</strong> &mdash; 5.6 weeks (28 days for full-time) including bank holidays. <Link href="/blog/annual-leave-entitlement-uk" className="text-emerald-600 hover:underline font-medium">Pro-rated for part-time workers</Link>.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Leave records are accurate and up to date</strong> &mdash; accrual, usage, and remaining balance tracked for every employee.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Sick leave procedures documented</strong> &mdash; employees know how and when to report absence, and you have a clear return-to-work process.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Statutory Sick Pay (SSP) paid correctly</strong> &mdash; currently &pound;116.75 per week for up to 28 weeks, from day four of absence.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Maternity, paternity, and shared parental leave policies in place</strong> &mdash; statutory entitlements communicated to all employees.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Parental bereavement leave compliant</strong> &mdash; two weeks&apos; statutory leave for employees who lose a child under 18.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Time off for dependants honoured</strong> &mdash; reasonable unpaid time off for emergencies involving dependants.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Holiday pay calculated correctly</strong> &mdash; based on normal remuneration including regular overtime and commission, not just basic pay.</li>
              </ul>
            </div>
            <p>
              <strong>Risk:</strong> Underpaying holiday pay or denying statutory leave entitlements can result in tribunal claims for unlawful deduction from wages. In 2025, the average holiday pay tribunal award was &pound;3,200, but claims can be much higher for systematic underpayments.
            </p>

            <h3>4. Pay and payroll compliance</h3>
            <p>
              Getting pay wrong exposes you to HMRC enforcement, employee claims, and reputational damage. Payroll compliance goes beyond simply paying the right amount &mdash; it covers how you pay, what you report, and what you provide to employees.
            </p>
            <div className="rounded-xl border-2 border-emerald-100 bg-emerald-50/30 p-6 my-6">
              <ul className="list-none pl-0 space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>National Minimum Wage / National Living Wage paid correctly</strong> &mdash; verified for every employee based on their age bracket. 2026/27 NLW rate for 21+: &pound;12.50/hour.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Payslips provided on or before payday</strong> &mdash; itemised payslips are a legal requirement for all employees and workers, including variable-hours staff.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Payslips include hours for hourly-paid workers</strong> &mdash; since April 2019, payslips for variable-hours employees must show the number of hours worked.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Pension auto-enrolment in place</strong> &mdash; eligible employees enrolled within the required timeframe with minimum contributions (5% employee, 3% employer).</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Gender pay gap reported (if applicable)</strong> &mdash; employers with 250+ employees must publish gender pay gap data annually.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>RTI submissions made on time</strong> &mdash; Real Time Information reports submitted to HMRC on or before each payday.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>No unlawful deductions from wages</strong> &mdash; deductions only made where authorised by statute, contract, or written employee consent.</li>
              </ul>
            </div>
            <p>
              <strong>Risk:</strong> HMRC can issue penalties of up to 200% of arrears for National Minimum Wage underpayments, plus &pound;20,000 per worker. Employers who underpay are also named and shamed publicly.
            </p>

            <h3>5. Health and safety</h3>
            <p>
              Every employer has a legal duty to ensure the health, safety, and welfare of their employees at work. The Health and Safety at Work etc. Act 1974 is the cornerstone legislation, supported by numerous regulations covering specific risks.
            </p>
            <div className="rounded-xl border-2 border-emerald-100 bg-emerald-50/30 p-6 my-6">
              <ul className="list-none pl-0 space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Risk assessments completed and documented</strong> &mdash; covering all significant workplace hazards. Reviewed regularly and after any incident.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Written health and safety policy</strong> &mdash; required if you employ five or more people. Must be brought to employees&apos; attention.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Display Screen Equipment (DSE) assessments</strong> &mdash; for employees who use computers regularly. Includes provision of eye tests and corrective lenses if needed for DSE work.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>First aid provisions in place</strong> &mdash; adequate first aid equipment, facilities, and trained first aiders. All employees informed of arrangements.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Fire safety measures</strong> &mdash; fire risk assessment completed, fire exits clearly marked, extinguishers maintained, evacuation drills conducted.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Accident and incident reporting</strong> &mdash; accident book maintained. RIDDOR-reportable incidents reported to the HSE within the required timeframe.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Remote/home worker assessments</strong> &mdash; DSE and workstation assessments for employees working from home regularly.</li>
              </ul>
            </div>
            <p>
              <strong>Risk:</strong> HSE can issue improvement and prohibition notices, and prosecute for serious breaches. Fines for health and safety offences are based on the organisation&apos;s turnover and can reach millions of pounds. Directors can face personal liability including imprisonment for the most serious failures.
            </p>

            <h3>6. Data protection and GDPR</h3>
            <p>
              You hold significant amounts of personal data about your employees &mdash; names, addresses, bank details, health information, performance data, and more. The UK GDPR and Data Protection Act 2018 require you to handle this data lawfully, fairly, and transparently.
            </p>
            <div className="rounded-xl border-2 border-emerald-100 bg-emerald-50/30 p-6 my-6">
              <ul className="list-none pl-0 space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Employee privacy notice issued</strong> &mdash; explains what personal data you collect, why, the legal basis, who you share it with, how long you keep it, and employees&apos; rights.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Lawful basis identified for all processing</strong> &mdash; most employment data processing relies on contract, legal obligation, or legitimate interest &mdash; not consent.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Special category data handled correctly</strong> &mdash; health data, trade union membership, and similar require additional safeguards and a specific condition for processing.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Data retention schedule in place</strong> &mdash; you know how long you keep employee records and delete them when no longer needed. HMRC requires payroll records for 6 years.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Subject access requests (SARs) handled within one month</strong> &mdash; employees have the right to request copies of their personal data. You must respond within 30 days.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>ICO registration current</strong> &mdash; most organisations that process personal data must register with the Information Commissioner&apos;s Office (annual fee from &pound;40).</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Data breach procedure in place</strong> &mdash; reportable breaches must be notified to the ICO within 72 hours.</li>
              </ul>
            </div>
            <p>
              <strong>Risk:</strong> The ICO can impose fines of up to &pound;17.5 million or 4% of annual global turnover (whichever is higher) for serious breaches. In practice, SMB fines are much lower, but enforcement actions are increasing and the reputational damage from a data breach can be severe.
            </p>

            <h3>7. Discrimination and equality</h3>
            <p>
              The Equality Act 2010 protects employees from discrimination based on nine protected characteristics: age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation. Compliance isn&apos;t just about avoiding obvious discrimination &mdash; it covers indirect discrimination, harassment, victimisation, and the duty to make reasonable adjustments.
            </p>
            <div className="rounded-xl border-2 border-emerald-100 bg-emerald-50/30 p-6 my-6">
              <ul className="list-none pl-0 space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Equal opportunities policy in place</strong> &mdash; covering recruitment, promotion, training, pay, and dismissal.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Anti-harassment and bullying policy</strong> &mdash; clear definitions, reporting procedures, and consequences. Communicated to all staff.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Reasonable adjustments made for disabled employees</strong> &mdash; duty to make adjustments that remove or reduce disadvantages. This is an ongoing obligation, not a one-off assessment.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Recruitment process is non-discriminatory</strong> &mdash; job adverts, shortlisting criteria, and interview questions don&apos;t directly or indirectly discriminate.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Equal pay audit conducted</strong> &mdash; men and women doing equal work receive equal pay. Review pay structures for any unjustified differences.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Managers trained on equality obligations</strong> &mdash; line managers understand what constitutes discrimination, harassment, and victimisation.</li>
              </ul>
            </div>
            <p>
              <strong>Risk:</strong> Discrimination claims have no cap on compensation. Tribunal awards regularly exceed &pound;100,000 for serious cases, and the highest awards run into millions. The employer is vicariously liable for acts of discrimination by employees unless they can show they took all reasonable steps to prevent it.
            </p>

            <h3>8. Disciplinary and grievance procedures</h3>
            <p>
              The ACAS Code of Practice on disciplinary and grievance procedures isn&apos;t legally binding, but tribunals are required to take it into account. Failing to follow it can result in a 25% uplift to any tribunal award.
            </p>
            <div className="rounded-xl border-2 border-emerald-100 bg-emerald-50/30 p-6 my-6">
              <ul className="list-none pl-0 space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Written disciplinary procedure in place</strong> &mdash; following the ACAS Code: investigation, notification, hearing, decision, appeal.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Written grievance procedure in place</strong> &mdash; employees know how to raise a formal grievance, and you have a process for investigating and responding.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Right to be accompanied</strong> &mdash; employees are informed of their right to be accompanied by a trade union representative or colleague at disciplinary and grievance hearings.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Investigations conducted fairly</strong> &mdash; gather evidence objectively before making any decisions. Don&apos;t pre-judge the outcome.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Decisions documented and communicated in writing</strong> &mdash; including the reasons for the decision and the employee&apos;s right of appeal.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Records retained</strong> &mdash; disciplinary and grievance records kept on file for the appropriate retention period.</li>
              </ul>
            </div>
            <p>
              <strong>Risk:</strong> An unreasonable failure to follow the ACAS Code can result in a 25% increase to any tribunal compensation. Poor disciplinary processes are also the most common cause of unfair dismissal claims.
            </p>

            <h3>9. Working time compliance</h3>
            <p>
              The <Link href="/blog/working-time-regulations-uk" className="text-emerald-600 hover:underline font-medium">Working Time Regulations 1998</Link> set limits on working hours and establish rights to rest breaks, daily rest, and weekly rest. These rules protect employee wellbeing and health.
            </p>
            <div className="rounded-xl border-2 border-emerald-100 bg-emerald-50/30 p-6 my-6">
              <ul className="list-none pl-0 space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>48-hour weekly limit observed</strong> &mdash; average working time must not exceed 48 hours per week, calculated over a 17-week reference period.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Opt-out agreements in place where needed</strong> &mdash; if any employee works more than 48 hours per week, they must have signed a voluntary written opt-out. They can withdraw it with notice.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Rest breaks provided</strong> &mdash; 20 minutes uninterrupted break when the working day exceeds 6 hours.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Daily rest period of 11 hours</strong> &mdash; between finishing work one day and starting the next.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Weekly rest period of 24 hours</strong> &mdash; an uninterrupted 24-hour period in each 7-day period (or 48 hours in 14 days).</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Night worker limits observed</strong> &mdash; night workers must not work more than 8 hours in any 24-hour period on average. Free health assessments must be offered.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Working time records maintained</strong> &mdash; you must keep records sufficient to show compliance with the regulations for at least two years.</li>
              </ul>
            </div>
            <p>
              <strong>Risk:</strong> Failure to comply with working time regulations is a criminal offence. Employers can be fined, and individual managers can face personal prosecution. Employees can also bring tribunal claims for denied rest breaks.
            </p>

            <h3>10. Termination and redundancy</h3>
            <p>
              How you end the employment relationship matters as much as how you start it. Getting termination wrong is the most common trigger for employment tribunal claims.
            </p>
            <div className="rounded-xl border-2 border-emerald-100 bg-emerald-50/30 p-6 my-6">
              <ul className="list-none pl-0 space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Correct notice periods given</strong> &mdash; statutory minimum is one week per year of service (up to 12 weeks). Contract may specify longer.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Fair dismissal process followed</strong> &mdash; valid reason (conduct, capability, redundancy, statutory illegality, or SOSR) plus fair procedure. Employees with 2+ years&apos; service have full unfair dismissal protection.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Redundancy procedure is lawful</strong> &mdash; genuine business reason, fair selection criteria, individual consultation, consideration of alternatives, and right of appeal.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Collective consultation for 20+ redundancies</strong> &mdash; if making 20 or more employees redundant within 90 days, you must consult with employee representatives for a minimum of 30 days (45 days for 100+ redundancies).</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Statutory redundancy pay calculated correctly</strong> &mdash; half a week&apos;s pay per year of service under 22, one week&apos;s pay per year aged 22&ndash;40, one and a half weeks&apos; pay per year aged 41+. Weekly pay capped at &pound;700 (2026/27).</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Final pay and accrued holiday paid</strong> &mdash; untaken statutory holiday must be paid on termination. Overpayments can only be deducted if contractually authorised.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>References handled carefully</strong> &mdash; no legal obligation to provide a reference (except in regulated industries), but any reference given must be accurate and fair.</li>
              </ul>
            </div>
            <p>
              <strong>Risk:</strong> The maximum compensatory award for unfair dismissal is the lower of one year&apos;s salary or &pound;115,115 (2026/27), plus a basic award of up to &pound;21,000. Discrimination-related dismissals have no cap. Failure to collectively consult can result in a protective award of up to 90 days&apos; pay per employee.
            </p>

            <h2>Common penalties at a glance</h2>
            <p>
              Here&apos;s a summary of the key penalties UK employers face for non-compliance:
            </p>
            <div className="overflow-x-auto my-6">
              <table className="border rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <th>Compliance area</th>
                    <th>Maximum penalty</th>
                    <th>Enforced by</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>No written statement of terms</strong></td>
                    <td>2&ndash;4 weeks&apos; pay (tribunal award)</td>
                    <td>Employment Tribunal</td>
                  </tr>
                  <tr>
                    <td><strong>Illegal worker (no right to work check)</strong></td>
                    <td>&pound;60,000 per worker</td>
                    <td>Home Office</td>
                  </tr>
                  <tr>
                    <td><strong>National Minimum Wage underpayment</strong></td>
                    <td>200% of arrears + &pound;20,000 per worker</td>
                    <td>HMRC</td>
                  </tr>
                  <tr>
                    <td><strong>Pension auto-enrolment failure</strong></td>
                    <td>&pound;50,000/day (escalating penalties)</td>
                    <td>The Pensions Regulator</td>
                  </tr>
                  <tr>
                    <td><strong>GDPR / data protection breach</strong></td>
                    <td>&pound;17.5 million or 4% of turnover</td>
                    <td>ICO</td>
                  </tr>
                  <tr>
                    <td><strong>Discrimination (tribunal award)</strong></td>
                    <td>Uncapped</td>
                    <td>Employment Tribunal</td>
                  </tr>
                  <tr>
                    <td><strong>Unfair dismissal (compensatory award)</strong></td>
                    <td>&pound;115,115 or one year&apos;s salary</td>
                    <td>Employment Tribunal</td>
                  </tr>
                  <tr>
                    <td><strong>Health and safety breach</strong></td>
                    <td>Unlimited fine + imprisonment</td>
                    <td>HSE / local authority</td>
                  </tr>
                  <tr>
                    <td><strong>Failure to collectively consult (redundancy)</strong></td>
                    <td>90 days&apos; pay per employee</td>
                    <td>Employment Tribunal</td>
                  </tr>
                  <tr>
                    <td><strong>Working time breach</strong></td>
                    <td>Criminal prosecution + fines</td>
                    <td>HSE</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>How to conduct your own HR compliance audit</h2>
            <p>
              Use this checklist as the basis for a self-audit. Here&apos;s a practical approach:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Schedule it</strong> &mdash; block out half a day. HR compliance audits should be done at least annually, and ideally every six months.</li>
              <li><strong>Gather your documents</strong> &mdash; employment contracts, policies, payroll records, right to work copies, risk assessments, training records, and any disciplinary or grievance files.</li>
              <li><strong>Work through each section</strong> &mdash; use the checklist above. For each item, mark it as compliant, partially compliant, or non-compliant.</li>
              <li><strong>Prioritise by risk</strong> &mdash; address non-compliant items first. Focus on areas with the highest penalties (right to work, NMW, health and safety) and the highest likelihood of a claim (contracts, disciplinary procedures, leave).</li>
              <li><strong>Create an action plan</strong> &mdash; for each gap, assign someone to fix it, set a deadline, and track progress.</li>
              <li><strong>Document everything</strong> &mdash; keep a record of your audit, findings, and actions taken. This demonstrates due diligence if you&apos;re ever investigated or face a tribunal claim.</li>
              <li><strong>Review and repeat</strong> &mdash; employment law changes regularly. Set a calendar reminder to repeat the audit at your chosen frequency.</li>
            </ol>

            <h2>How Leavely helps with leave compliance</h2>
            <p>
              Leave and absence management is one of the most common areas of HR non-compliance. Mistakes happen when businesses track leave on spreadsheets, manually calculate pro-rata entitlements, or lose track of who&apos;s taken what. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> eliminates these risks by automating the entire process:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Accurate entitlement calculation</strong> &mdash; Leavely automatically calculates <Link href="/blog/annual-leave-entitlement-uk" className="text-emerald-600 hover:underline font-medium">annual leave entitlement</Link> including pro-rata for part-time and mid-year starters. No manual maths, no errors.</li>
              <li><strong>Real-time leave balances</strong> &mdash; employees and managers can see up-to-date leave balances at any time. No more guessing or waiting for HR to check a spreadsheet.</li>
              <li><strong>Statutory leave tracking</strong> &mdash; track all leave types including annual leave, sick leave, maternity, paternity, <Link href="/blog/compassionate-leave-uk" className="text-emerald-600 hover:underline font-medium">compassionate leave</Link>, and <Link href="/blog/time-off-for-dependants-uk" className="text-emerald-600 hover:underline font-medium">time off for dependants</Link>.</li>
              <li><strong>Bank holiday management</strong> &mdash; automatically account for UK bank holidays in leave calculations so entitlements are always correct.</li>
              <li><strong>Audit trail</strong> &mdash; every leave request, approval, and cancellation is logged with timestamps. If you&apos;re ever audited or face a tribunal claim, you have a complete record.</li>
              <li><strong>Policy enforcement</strong> &mdash; set up your <Link href="/blog/leave-policy-template-uk" className="text-emerald-600 hover:underline font-medium">leave policies</Link> once and Leavely enforces them consistently. No more ad-hoc decisions that create inconsistency and risk.</li>
              <li><strong>Absence monitoring</strong> &mdash; track <Link href="/blog/absence-management-policy-uk" className="text-emerald-600 hover:underline font-medium">absence patterns</Link> to identify issues early, including Bradford Factor scoring for sickness absence.</li>
            </ul>
            <p>
              At &pound;8 per user per month with a 14-day free trial, Leavely costs less than a single hour of employment law advice &mdash; and it works 24/7.
            </p>

            <h2>Frequently asked questions</h2>

            <h3>How often should I conduct an HR compliance audit?</h3>
            <p>
              At minimum, once a year. Ideally every six months, and always after significant changes &mdash; new legislation, business restructuring, or rapid headcount growth. An annual audit aligned with the start of the tax year (April) is a good default.
            </p>

            <h3>Do I need an HR department to be compliant?</h3>
            <p>
              No. Many small businesses with fewer than 50 employees manage HR compliance without a dedicated HR person. What you need are the right policies, procedures, and systems. Tools like Leavely handle leave compliance automatically, and resources like the ACAS website provide free guidance on employment law.
            </p>

            <h3>What&apos;s the most common compliance failure for small businesses?</h3>
            <p>
              Missing or incomplete employment contracts. Many small businesses issue an offer letter but never follow up with a full written statement of terms. This is a legal requirement from day one and is often the first thing a tribunal checks when a claim is brought.
            </p>

            <h3>Can I use this checklist as evidence of compliance?</h3>
            <p>
              A completed checklist demonstrates that you&apos;ve reviewed your obligations and taken steps to comply. It&apos;s not a substitute for legal advice, but it shows due diligence. Keep dated copies of completed audits in your HR records.
            </p>

            <h3>What changed in UK employment law in 2026?</h3>
            <p>
              Key changes for 2026 include increased National Minimum Wage rates, higher right to work penalties, updates to the statutory redundancy pay cap, and continued enforcement focus on holiday pay calculations following the landmark Supreme Court rulings on regular overtime and commission. Always check the latest rates and thresholds at the start of each tax year.
            </p>

            <h3>Where can I get free HR compliance advice?</h3>
            <p>
              ACAS (Advisory, Conciliation and Arbitration Service) provides free, impartial advice on all aspects of employment law. Their website has template policies, guidance notes, and a helpline. The HSE website covers health and safety obligations. GOV.UK has the latest rates for NMW, SSP, and statutory redundancy pay.
            </p>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Leave compliance, sorted</h3>
            <p className="text-emerald-100 mb-6">Leavely automates leave tracking, entitlement calculations, and policy enforcement so you&apos;re always compliant. Try it free for 14 days.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/employee-handbook-uk" className="block text-emerald-600 hover:underline font-medium">Employee Handbook UK: Complete Guide &rarr;</Link>
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
              <Link href="/blog/absence-management-policy-uk" className="block text-emerald-600 hover:underline font-medium">Absence Management Policy UK: Complete Guide &rarr;</Link>
              <Link href="/blog/working-time-regulations-uk" className="block text-emerald-600 hover:underline font-medium">Working Time Regulations UK: Complete Guide &rarr;</Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK: The Complete Guide &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
