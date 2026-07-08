import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/time-off-for-dependants-uk`

export const metadata: Metadata = {
  title: 'Time Off for Dependants UK: Complete Employer Guide (2026)',
  description:
    'Complete guide to time off for dependants in the UK. Covers the Employment Rights Act 1996, who qualifies as a dependant, paid vs unpaid leave, the Carer\u2019s Leave Act 2023, policy templates, and how to manage emergency dependant leave.',
  alternates: { canonical: articleUrl },
  keywords: [
    'time off for dependants UK',
    'emergency leave for dependants',
    'dependant leave rights UK',
    'carer\u2019s leave UK',
    'Employment Rights Act dependants',
    'time off for dependants employment law',
    'emergency dependant leave policy',
    'carer leave act 2023',
  ],
  openGraph: {
    title: 'Time Off for Dependants UK \u2014 Complete Employer Guide 2026',
    description: 'Statutory rights, who counts as a dependant, paid vs unpaid, the new Carer\u2019s Leave Act, policy templates, and best practices.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Time Off for Dependants UK: Complete Employer Guide',
  description: 'Complete guide to time off for dependants in the UK for employers.',
  url: articleUrl,
  datePublished: '2026-03-25',
  dateModified: '2026-03-25',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function TimeOffForDependantsArticle() {
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
            Time Off for Dependants UK: Complete Employer Guide (2026)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              When an employee&apos;s child falls ill, a parent is rushed to hospital, or a childminder fails to turn up, the employee has a statutory right to take time off. As an employer, understanding this right &mdash; and getting it right &mdash; protects your people, keeps you legally compliant, and builds a culture of trust. This guide covers everything UK employers need to know about time off for dependants in 2026, including the newer Carer&apos;s Leave Act 2023 and how to build a policy that works.
            </p>

            <h2>What is time off for dependants?</h2>
            <p>
              <strong>Time off for dependants</strong> is a statutory right under <strong>Section 57A of the Employment Rights Act 1996</strong>. It allows all employees to take a <strong>reasonable amount of time off</strong> during working hours to deal with an emergency or unexpected situation involving a dependant. The right exists so that employees can respond to immediate crises without the fear of losing their job or being disciplined.
            </p>
            <p>
              This is not a general right to take time off to care for someone who is unwell over an extended period. It is specifically designed for <strong>emergencies</strong> &mdash; situations that are sudden, unexpected, and require the employee&apos;s immediate attention. The time off is intended to allow the employee to deal with the immediate crisis and, where necessary, make longer-term care arrangements.
            </p>
            <p>
              Crucially, this is a <strong>day-one right</strong>. There is no qualifying period, no minimum length of service, and it applies to all employees regardless of contract type &mdash; full-time, part-time, or fixed-term.
            </p>

            <h2>Who qualifies as a &quot;dependant&quot;?</h2>
            <p>
              The law defines a <strong>dependant</strong> as any of the following people:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Spouse or civil partner</strong> of the employee.</li>
              <li><strong>Child</strong> of the employee (including adopted children and stepchildren).</li>
              <li><strong>Parent</strong> of the employee.</li>
              <li><strong>A person who lives in the same household as the employee</strong> &mdash; but <strong>not</strong> someone who is a tenant, lodger, boarder, or employee living in the household.</li>
            </ul>
            <p>
              For situations involving illness, injury, or the breakdown of care arrangements, the definition is broader. It also includes:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Any person who reasonably relies on the employee for assistance</strong> when they fall ill or are injured.</li>
              <li><strong>Any person who reasonably relies on the employee to make arrangements for care</strong> in the event of illness or injury.</li>
            </ul>
            <p>
              This wider definition means that an elderly neighbour who depends on the employee for regular care, or an adult sibling with a disability, could also count as a dependant in certain circumstances. However, a flatmate who simply shares the rent &mdash; with no dependency relationship &mdash; would not qualify.
            </p>

            <h2>What situations are covered?</h2>
            <p>
              The Employment Rights Act 1996 sets out specific situations where the right applies. An employee may take time off when:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>A dependant falls ill, gives birth, is injured, or is assaulted</strong> &mdash; this includes both physical and mental illness.</li>
              <li><strong>To make arrangements for the provision of care</strong> for a dependant who is ill or injured &mdash; for example, arranging for a relative to look after a sick child, or finding a care home place for an elderly parent.</li>
              <li><strong>A dependant dies</strong> &mdash; time off to make funeral arrangements or to deal with the immediate aftermath of the death.</li>
              <li><strong>Unexpected disruption or termination of care arrangements</strong> &mdash; for example, a nursery closing unexpectedly, a childminder calling in sick, or a care worker failing to arrive.</li>
              <li><strong>An incident involving the employee&apos;s child during school hours</strong> &mdash; or during the hours of any educational establishment the child attends.</li>
            </ol>
            <p>
              It is important to note that the right does <strong>not</strong> cover planned or foreseeable events. If an employee knows in advance that their childminder is going on holiday, they should arrange alternative care or book annual leave. The right is specifically for <strong>unexpected</strong> situations.
            </p>

            <h2>How much time off is &quot;reasonable&quot;?</h2>
            <p>
              The law does not specify an exact number of days. Instead, it says the employee is entitled to take a <strong>&quot;reasonable&quot; amount of time off</strong>. In practice, employment tribunals have consistently interpreted this as meaning enough time to deal with the immediate emergency and put alternative arrangements in place &mdash; <strong>typically one to two days per incident</strong>.
            </p>
            <p>
              This right is <strong>not</strong> intended to provide ongoing care. If an employee&apos;s parent needs nursing care for several weeks, the employee can take a day or two to arrange that care, but they cannot use this right to provide the care themselves over an extended period. For ongoing caring responsibilities, the newer <strong>Carer&apos;s Leave Act 2023</strong> (covered below) or annual leave and unpaid leave are more appropriate.
            </p>
            <p>
              There is also <strong>no statutory cap</strong> on how many times an employee can exercise this right. If an employee has multiple genuine emergencies throughout the year, they are entitled to take time off for each one. However, if a pattern of frequent absence emerges, it may be worth having a supportive conversation to explore whether the employee needs additional help or a more structured arrangement.
            </p>

            <h2>Paid or unpaid?</h2>
            <p>
              The statutory right to time off for dependants is <strong>unpaid</strong>. There is no legal obligation for employers to pay employees during this leave.
            </p>
            <p>
              That said, many employers choose to pay for a limited number of days &mdash; typically one to three days per year &mdash; as a gesture of goodwill. Some employers pay for all dependant leave. There are strong business reasons for doing so:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Retention</strong> &mdash; employees who feel supported during emergencies are far more likely to stay.</li>
              <li><strong>Honesty</strong> &mdash; if dependant leave is unpaid, employees may call in sick instead (which <em>is</em> paid via SSP or company sick pay), distorting your absence records.</li>
              <li><strong>Goodwill</strong> &mdash; one or two days&apos; pay is a small cost compared to the loyalty it buys.</li>
              <li><strong>Employer brand</strong> &mdash; advertising paid dependant leave in job adverts signals a supportive workplace culture.</li>
            </ul>
            <p>
              Whatever you decide, make your position clear in your policy. Ambiguity leads to inconsistent treatment and potential grievances.
            </p>

            <h2>Notification requirements</h2>
            <p>
              Employees must tell their employer the <strong>reason for the absence</strong> as soon as reasonably practicable. They should also give an indication of <strong>how long they expect to be away</strong>. However, the law recognises that in a genuine emergency, immediate notification may not be possible &mdash; a parent rushing their child to A&amp;E, for example, should not be penalised for not calling the office from the ambulance.
            </p>
            <p>
              Best practice is to accept notification by any means &mdash; phone call, text message, email, or even a message via a colleague. The emphasis should be on getting the information, not on the formality of the process.
            </p>

            <h2>Time off for dependants vs other types of leave</h2>
            <p>
              This statutory right often overlaps with or is confused with other forms of leave. Here&apos;s how they differ:
            </p>

            <table>
              <thead>
                <tr>
                  <th>Leave type</th>
                  <th>Legal basis</th>
                  <th>Duration</th>
                  <th>Paid?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Time off for dependants</strong></td>
                  <td>Employment Rights Act 1996, s.57A</td>
                  <td>Reasonable (1&ndash;2 days per incident)</td>
                  <td>Unpaid (statutory)</td>
                </tr>
                <tr>
                  <td><strong>Compassionate leave</strong></td>
                  <td>No statutory right &mdash; contractual only</td>
                  <td>Typically 3&ndash;5 days</td>
                  <td>Usually paid (company policy)</td>
                </tr>
                <tr>
                  <td><strong>Parental bereavement leave</strong></td>
                  <td>Parental Bereavement Act 2018 (Jack&apos;s Law)</td>
                  <td>2 weeks</td>
                  <td>Statutory pay (SPBP)</td>
                </tr>
                <tr>
                  <td><strong>Carer&apos;s leave</strong></td>
                  <td>Carer&apos;s Leave Act 2023</td>
                  <td>1 week per year</td>
                  <td>Unpaid</td>
                </tr>
                <tr>
                  <td><strong>Parental leave</strong></td>
                  <td>Employment Rights Act 1996, s.76</td>
                  <td>18 weeks per child (up to age 18)</td>
                  <td>Unpaid</td>
                </tr>
              </tbody>
            </table>

            <p>
              <strong>Compassionate leave</strong> is entirely at the employer&apos;s discretion. Many employers offer it for bereavements or serious family illness, but there is no legal obligation. It is good practice to offer compassionate leave <em>in addition</em> to the statutory right to time off for dependants, not as a replacement for it.
            </p>
            <p>
              <strong>Parental leave</strong> is a separate right allowing parents to take up to 18 weeks&apos; unpaid leave per child before the child turns 18. It must usually be taken in blocks of one week and requires 21 days&apos; notice. It is designed for planned childcare needs, not emergencies.
            </p>

            <h2>The Carer&apos;s Leave Act 2023: a new right from April 2024</h2>
            <p>
              The <strong>Carer&apos;s Leave Act 2023</strong> introduced a new statutory right from <strong>6 April 2024</strong>. It gives employees who are caring for a dependant with a <strong>long-term care need</strong> the right to take up to <strong>one week of unpaid leave per year</strong>.
            </p>
            <p>
              Key features of carer&apos;s leave:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Day-one right</strong> &mdash; no qualifying period required.</li>
              <li><strong>Duration:</strong> up to one week (5 working days for full-time employees) in any 12-month period.</li>
              <li><strong>Flexibility:</strong> can be taken as individual days, half-days, or a full week &mdash; it does not have to be taken in one block.</li>
              <li><strong>Unpaid</strong> &mdash; there is no statutory right to pay, although employers can choose to pay.</li>
              <li><strong>No evidence required</strong> &mdash; the employer cannot demand proof of the caring relationship or the dependant&apos;s condition.</li>
              <li><strong>Protection from detriment</strong> &mdash; employees must not be dismissed or disadvantaged for taking or requesting carer&apos;s leave.</li>
            </ul>
            <p>
              A &quot;long-term care need&quot; is defined as:
            </p>
            <ul className="list-disc pl-6">
              <li>A disability within the meaning of the Equality Act 2010.</li>
              <li>An illness or injury (physical or mental) that requires, or is expected to require, care for more than three months.</li>
              <li>Old age.</li>
            </ul>
            <p>
              This is distinct from time off for dependants, which is for emergencies. Carer&apos;s leave can be planned and is for employees who have <strong>ongoing caring responsibilities</strong>. Employees must give notice of at least <strong>twice the length of leave requested</strong> (or three days&apos; notice, whichever is greater). Employers can postpone (but not refuse) carer&apos;s leave if it would cause serious disruption to the business, but must allow it within one month of the original date.
            </p>

            <h2>Common employer mistakes</h2>
            <p>
              Getting dependant leave wrong can lead to employment tribunal claims, grievances, and reputational damage. Here are the most common mistakes employers make:
            </p>
            <ol className="list-decimal pl-6">
              <li>
                <strong>Refusing emergency leave outright</strong> &mdash; you cannot refuse a genuine request for time off for dependants. It is a statutory right, and refusing it or disciplining someone for exercising it is automatically unfair. There is no qualifying period and no discretion to refuse.
              </li>
              <li>
                <strong>Demanding proof immediately</strong> &mdash; while it is reasonable to ask for some confirmation after the event (such as a GP appointment letter), demanding proof before granting time off defeats the purpose of emergency leave. The employee may not have documentation in the middle of a crisis.
              </li>
              <li>
                <strong>Disciplining employees for genuine use</strong> &mdash; including dependant leave in absence triggers (such as Bradford Factor calculations) or disciplinary processes is risky. An employee who is dismissed or subjected to a detriment for exercising their statutory right can bring a claim to the employment tribunal. There is no cap on compensation for such claims.
              </li>
              <li>
                <strong>Treating it as annual leave</strong> &mdash; forcing employees to use annual leave or TOIL for dependant emergencies undermines the statutory right. You can offer annual leave as an option for extended time off beyond the emergency, but you cannot require it.
              </li>
              <li>
                <strong>Applying it inconsistently</strong> &mdash; granting paid dependant leave to one employee but not another (without a clear policy justification) can give rise to discrimination claims, particularly if the inconsistency correlates with a protected characteristic.
              </li>
              <li>
                <strong>Confusing dependant leave with sick leave</strong> &mdash; if a manager records dependant leave as sick leave, it inflates sickness absence figures and may trigger unnecessary absence management processes.
              </li>
              <li>
                <strong>Not training managers</strong> &mdash; frontline managers are often the first point of contact. If they don&apos;t understand the statutory right, they may say the wrong thing &mdash; such as &quot;you&apos;ll need to take it as holiday&quot; or &quot;can&apos;t you get someone else to deal with it?&quot; These responses can lead to grievances and tribunal claims.
              </li>
            </ol>

            <h2>Building your dependant leave policy</h2>
            <p>
              A clear written policy removes ambiguity and ensures consistency. Here are the key sections your policy should include:
            </p>

            <h3>1. Purpose and scope</h3>
            <p>
              State that the policy covers time off for emergencies involving dependants under the Employment Rights Act 1996, and explain that it applies to all employees from day one.
            </p>

            <h3>2. Definition of a dependant</h3>
            <p>
              Set out who qualifies as a dependant, using the statutory definition. Consider whether your policy extends the definition beyond the statutory minimum &mdash; for example, to include close friends or extended family members.
            </p>

            <h3>3. Qualifying situations</h3>
            <p>
              List the circumstances in which time off can be taken, mirroring the statutory provisions: illness, injury, death, breakdown of care arrangements, and school incidents.
            </p>

            <h3>4. Duration</h3>
            <p>
              Explain that the time off is for dealing with the immediate emergency and is typically one to two days. Make clear what happens if the employee needs more time &mdash; can they use annual leave, compassionate leave, or unpaid leave?
            </p>

            <h3>5. Pay</h3>
            <p>
              Be explicit about whether dependant leave is paid or unpaid. If you offer paid leave, state how many days are covered and at what rate. Consider offering a small number of paid days (e.g., three per year) to encourage honest reporting and reduce the temptation to use sick leave instead.
            </p>

            <h3>6. Notification procedure</h3>
            <p>
              Explain how and when the employee should notify their manager. Keep it simple: contact your manager by phone, text, or email as soon as reasonably practicable, stating the reason and expected duration. Do not impose unrealistic notification requirements that conflict with the spirit of emergency leave.
            </p>

            <h3>7. Evidence</h3>
            <p>
              State your approach to evidence. Best practice is to <strong>not</strong> require evidence for short absences (one to two days) but to reserve the right to request documentation for repeated or extended absences. Never require evidence before granting the time off.
            </p>

            <h3>8. Record keeping</h3>
            <p>
              Explain how dependant leave is recorded and emphasise that it is tracked separately from sick leave and annual leave. This is important for accurate absence data and for protecting employees from unfair absence triggers.
            </p>

            <h3>9. Protection from detriment</h3>
            <p>
              Include a clear statement that employees will not be disciplined, dismissed, or otherwise disadvantaged for taking time off for dependants in accordance with the policy and their statutory rights.
            </p>

            <h2>Record keeping and absence tracking</h2>
            <p>
              Accurate record keeping is essential. You need to track dependant leave separately from other absence types for several reasons:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Legal compliance</strong> &mdash; if an employee brings a tribunal claim, you need records showing how you handled their requests.</li>
              <li><strong>Fair absence management</strong> &mdash; dependant leave should not count towards sickness absence triggers or Bradford Factor scores.</li>
              <li><strong>Trend analysis</strong> &mdash; tracking dependant leave separately lets you spot patterns, such as whether certain teams have higher rates (which might indicate workload or culture issues).</li>
              <li><strong>Policy review</strong> &mdash; data on how much dependant leave is taken across the organisation helps you review and refine your policy.</li>
            </ul>
            <p>
              At a minimum, record the <strong>date(s) of absence</strong>, the <strong>reason</strong> (in broad terms &mdash; &quot;dependant illness&quot; rather than medical details), whether it was <strong>paid or unpaid</strong>, and the <strong>approval status</strong>. Store these records in a system that is accessible to HR but respects employee privacy.
            </p>

            <h2>How Leavely tracks emergency and dependant leave</h2>
            <p>
              Managing dependant leave on spreadsheets or through ad-hoc emails makes it easy for requests to fall through the cracks, records to be inconsistent, and statutory rights to be accidentally breached. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> is designed to handle exactly this.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Dedicated leave types</strong> &mdash; set up &quot;Time off for dependants&quot; and &quot;Carer&apos;s leave&quot; as separate leave categories, each with their own allowance and rules. This means dependant leave is never mixed up with sick leave or annual leave in your reports.</li>
              <li><strong>Instant mobile requests</strong> &mdash; employees can submit a dependant leave request from their phone in seconds, even from a hospital waiting room. Managers receive an instant notification and can approve with one tap.</li>
              <li><strong>Automatic tracking against allowance</strong> &mdash; if you offer three paid days per year, Leavely tracks usage automatically and shows the remaining balance. No manual counting required.</li>
              <li><strong>Excluded from absence triggers</strong> &mdash; dependant leave is categorised separately, so it does not inflate Bradford Factor scores or trigger sickness absence warnings.</li>
              <li><strong>Complete audit trail</strong> &mdash; every request, approval, and change is logged with timestamps and user details, giving you a defensible record if questions arise later.</li>
              <li><strong>Privacy controls</strong> &mdash; only managers and HR can see the reason for dependant leave. Team calendars show the employee as &quot;away&quot; without exposing personal details.</li>
              <li><strong>Reporting</strong> &mdash; run reports on dependant leave usage by team, department, or company-wide. Spot trends, review policy effectiveness, and export data for audits.</li>
              <li><strong>Carer&apos;s leave tracking</strong> &mdash; track the new carer&apos;s leave entitlement alongside dependant leave, with separate balances and usage reports.</li>
            </ul>

            <h2>Frequently asked questions</h2>

            <h3>Can an employer refuse time off for dependants?</h3>
            <p>
              No. If the request falls within the statutory definition (an emergency involving a dependant), the employer cannot refuse it. Refusing or penalising an employee for taking this leave is automatically unfair and can lead to a tribunal claim with uncapped compensation.
            </p>

            <h3>Does dependant leave apply to agency workers?</h3>
            <p>
              The statutory right under Section 57A applies to <strong>employees</strong> only, not workers or self-employed contractors. However, many agencies and employers extend this right to agency workers as a matter of good practice.
            </p>

            <h3>Can an employee take time off for a pet?</h3>
            <p>
              No. The statutory definition of a dependant covers only humans. Pets are not dependants under the Employment Rights Act. However, individual employers may choose to allow compassionate leave for the loss of a pet under their own policy.
            </p>

            <h3>What if an employee abuses the right?</h3>
            <p>
              If you suspect an employee is taking time off for non-genuine reasons, address it through a supportive conversation first. If there is clear evidence of abuse, you can take disciplinary action &mdash; but be very careful. The burden of proof is on the employer, and getting it wrong can result in an unfair dismissal claim.
            </p>

            <h3>Does the right cover IVF or fertility treatment?</h3>
            <p>
              Not directly. Time off for dependants covers unexpected emergencies. Planned medical treatments (including fertility treatment) are not emergencies. However, if a dependant experiences complications from IVF that require emergency attention, the right could apply to that specific situation.
            </p>

            <h2>Summary: key points for employers</h2>
            <ul className="list-disc pl-6">
              <li>Time off for dependants is a <strong>day-one statutory right</strong> under the Employment Rights Act 1996.</li>
              <li>It covers <strong>emergencies only</strong> &mdash; not planned or ongoing care needs.</li>
              <li>&quot;Reasonable&quot; time off typically means <strong>one to two days</strong> per incident.</li>
              <li>The statutory right is <strong>unpaid</strong>, but many employers choose to pay for a limited number of days.</li>
              <li>You <strong>cannot refuse</strong> a genuine request or discipline an employee for exercising this right.</li>
              <li>The <strong>Carer&apos;s Leave Act 2023</strong> provides an additional one week of unpaid leave per year for employees with long-term caring responsibilities.</li>
              <li>Track dependant leave <strong>separately</strong> from sick leave and annual leave.</li>
              <li>Train your managers so they respond <strong>appropriately and consistently</strong>.</li>
              <li>Have a <strong>clear written policy</strong> that sets out entitlements, pay, notification requirements, and protections.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Track dependant leave accurately and compliantly</h3>
            <p className="text-emerald-100 mb-6">Leavely lets you manage emergency and dependant leave as dedicated leave types with full reporting, audit trails, and privacy controls.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/compassionate-leave-uk" className="block text-emerald-600 hover:underline font-medium">Compassionate Leave UK: Employer Guide &rarr;</Link>
              <Link href="/blog/sick-leave-policy-uk" className="block text-emerald-600 hover:underline font-medium">Sick Leave Policy UK: What Employers Must Know &rarr;</Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK: The Complete Guide &rarr;</Link>
              <Link href="/blog/parental-bereavement-leave-uk" className="block text-emerald-600 hover:underline font-medium">Parental Bereavement Leave UK: Employer&apos;s Guide &rarr;</Link>
              <Link href="/blog/flexible-working-uk" className="block text-emerald-600 hover:underline font-medium">Flexible Working UK: Complete Employer Guide &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
