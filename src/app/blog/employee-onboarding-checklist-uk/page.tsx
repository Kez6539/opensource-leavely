import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/employee-onboarding-checklist-uk`

export const metadata: Metadata = {
  title: 'Employee Onboarding Checklist UK 2026: Complete HR Guide + Free Template',
  description:
    'Complete UK employee onboarding checklist covering legal requirements, day-one tasks, first-week goals, and 90-day milestones. Includes right to work checks, HMRC starter checklist, pension auto-enrolment, and a free downloadable template.',
  alternates: { canonical: articleUrl },
  keywords: [
    'employee onboarding checklist uk',
    'new starter checklist',
    'onboarding process uk',
    'new employee checklist hr',
    'first day checklist new employee uk',
  ],
  openGraph: {
    title: 'Employee Onboarding Checklist UK 2026 — Complete HR Guide + Free Template',
    description: 'Complete UK onboarding checklist with legal requirements, day-one tasks, and 90-day milestones.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Employee Onboarding Checklist UK 2026: Complete HR Guide + Free Template',
  description: 'Complete UK employee onboarding checklist covering legal requirements and practical steps.',
  url: articleUrl,
  datePublished: '2026-03-15',
  dateModified: '2026-03-15',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function EmployeeOnboardingChecklistArticle() {
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
            Employee Onboarding Checklist UK 2026: Complete HR Guide + Free Template
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Getting onboarding right is one of the highest-impact things you can do as an employer. Research consistently shows that employees who experience structured onboarding are 69% more likely to stay with the company for at least three years. Yet most UK small businesses wing it &mdash; a quick handshake, a stack of paperwork, and a &quot;just ask if you need anything.&quot; This guide gives you a complete, practical onboarding checklist that covers every legal requirement and every step from pre-start through the first 90 days.
            </p>

            <h2>Why onboarding matters</h2>
            <p>
              Poor onboarding doesn&apos;t just leave new employees feeling lost &mdash; it directly impacts your business:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Retention</strong> &mdash; 20% of employee turnover happens within the first 45 days. A structured onboarding process dramatically reduces early attrition.</li>
              <li><strong>Productivity</strong> &mdash; employees who are onboarded properly reach full productivity up to 50% faster than those who aren&apos;t.</li>
              <li><strong>Engagement</strong> &mdash; first impressions set the tone. A chaotic first week signals to the new hire that the company is disorganised &mdash; and that impression sticks.</li>
              <li><strong>Compliance</strong> &mdash; UK employment law requires specific actions during onboarding (right to work checks, written statement of terms, pension enrolment). Missing these creates legal risk.</li>
              <li><strong>Cost</strong> &mdash; replacing an employee costs 6&ndash;9 months&apos; salary on average. Spending a few hours on proper onboarding is the cheapest retention strategy that exists.</li>
            </ul>

            <h2>Legal requirements for UK onboarding</h2>
            <p>
              Before we get to the practical checklist, here are the legal obligations you <strong>must</strong> fulfil when onboarding a new employee in the UK:
            </p>

            <h3>Right to work check</h3>
            <p>
              You must verify that every new employee has the legal right to work in the UK <strong>before their first day of work</strong>. This applies to all employees, regardless of nationality. You need to see original documents (passport, visa, biometric residence permit, etc.), check they&apos;re genuine, and keep a dated copy. Since 2022, you can also use the Home Office online checking service for employees with a share code. Failure to conduct right to work checks can result in a civil penalty of up to &pound;60,000 per illegal worker (2026 rates).
            </p>

            <h3>HMRC starter checklist (or P45)</h3>
            <p>
              The new employee must provide either a P45 from their previous employer or complete an HMRC Starter Checklist (which replaced the P46). This determines their tax code and ensures they&apos;re taxed correctly from their first pay. You must submit this information to HMRC via your payroll system before their first payday.
            </p>

            <h3>Written statement of employment terms</h3>
            <p>
              Since April 2020, all employees and workers are entitled to a written statement of their main terms on or before their first day of work &mdash; not within two months as was previously the case. This statement must include: employer and employee names, start date, job title/description, pay details, hours, holiday entitlement, notice periods, and probation period. A separate wider written statement covering sick leave, pensions, and other policies must be provided within two months.
            </p>

            <h3>Pension auto-enrolment</h3>
            <p>
              If the new employee is aged 22 or over and earns more than &pound;10,000/year (2026/27 threshold), you must auto-enrol them into a workplace pension. You must do this from their first day of employment &mdash; but you have a choice of whether to backdate to day one or use a postponement period of up to 3 months. You must write to the employee within 6 weeks of their start date to inform them about auto-enrolment.
            </p>

            <h3>Other legal requirements</h3>
            <ul className="list-disc pl-6">
              <li><strong>National Minimum Wage</strong> &mdash; ensure the employee is being paid at least the current NMW/NLW rate for their age bracket.</li>
              <li><strong>Working time opt-out</strong> &mdash; if you need the employee to work more than 48 hours per week, they must sign an <Link href="/blog/working-time-regulations-uk" className="text-emerald-600 hover:underline font-medium">opt-out agreement</Link> voluntarily.</li>
              <li><strong>Health and safety</strong> &mdash; you must provide information about fire exits, first aiders, and any role-specific hazards.</li>
              <li><strong>Data privacy</strong> &mdash; inform the employee about how their personal data will be processed (your privacy notice).</li>
            </ul>

            <h2>Complete onboarding checklist</h2>
            <p>
              Here&apos;s the full checklist, broken into phases. Use this as a template for your own onboarding process.
            </p>

            <h3>Before day one (pre-boarding)</h3>
            <p>
              The best onboarding starts before the employee walks through the door. Use the time between offer acceptance and start date to get everything ready:
            </p>
            <div className="rounded-xl border-2 border-emerald-100 bg-emerald-50/30 p-6 my-6">
              <ul className="list-none pl-0 space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Send the employment contract</strong> &mdash; include the written statement of terms. Get it signed and returned before day one.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Conduct right to work check</strong> &mdash; verify documents and store dated copies.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Set up IT accounts</strong> &mdash; email, Slack/Teams, HR system, any tools they&apos;ll need on day one.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Order equipment</strong> &mdash; laptop, monitor, phone, desk setup (especially for remote/hybrid workers).</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Prepare their workspace</strong> &mdash; desk, chair, stationery, welcome pack if you have one.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Send a welcome email</strong> &mdash; include start time, location/directions, dress code, who to ask for, and what to bring (ID, bank details).</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Assign a buddy</strong> &mdash; pair them with a friendly colleague who can answer the day-to-day questions managers often forget about.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Notify the team</strong> &mdash; let existing employees know who&apos;s joining, their role, and when they start.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Prepare the first-week schedule</strong> &mdash; block out training sessions, introductions, and 1:1 time with their manager.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Add to payroll</strong> &mdash; ensure they&apos;re set up for their first payday.</li>
              </ul>
            </div>

            <h3>Day one</h3>
            <p>
              First impressions are everything. Day one should be structured but not overwhelming:
            </p>
            <div className="rounded-xl border-2 border-emerald-100 bg-emerald-50/30 p-6 my-6">
              <ul className="list-none pl-0 space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Welcome and introductions</strong> &mdash; greet them personally. Don&apos;t leave them waiting in reception.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Office/site tour</strong> &mdash; toilets, kitchen, fire exits, meeting rooms, first aiders.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Complete HR paperwork</strong> &mdash; P45 or HMRC Starter Checklist, bank details for payroll, emergency contact details, next-of-kin form.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Health &amp; safety briefing</strong> &mdash; fire procedures, first aid locations, any role-specific safety information.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>IT setup</strong> &mdash; laptop, email, system logins, VPN (if remote/hybrid). Test everything works.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Set up HR system access</strong> &mdash; send Leavely invite so they can see their leave balance and team calendar from day one.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Share the employee handbook</strong> &mdash; covering leave policies, sickness procedures, <Link href="/blog/flexible-working-uk" className="text-emerald-600 hover:underline font-medium">flexible working</Link>, and company expectations.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Introduce their buddy</strong> &mdash; make sure the buddy has time blocked out to be available.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Lunch with the team</strong> &mdash; don&apos;t let them eat alone. Even something simple goes a long way.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>End-of-day check-in</strong> &mdash; 10 minutes with their manager to answer questions and confirm the plan for tomorrow.</li>
              </ul>
            </div>

            <h3>Week one</h3>
            <p>
              The first week is about orientation, building relationships, and getting the foundations right:
            </p>
            <div className="rounded-xl border-2 border-emerald-100 bg-emerald-50/30 p-6 my-6">
              <ul className="list-none pl-0 space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Role-specific training</strong> &mdash; core systems, processes, and tools they need for their job.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Team meetings</strong> &mdash; include them in regular team standups, retrospectives, or planning sessions.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>1:1 with line manager</strong> &mdash; discuss role expectations, immediate priorities, and how they prefer to receive feedback.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Complete mandatory e-learning</strong> &mdash; GDPR, health &amp; safety, anti-bribery, equality &amp; diversity (whatever applies to your business).</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Cross-department introductions</strong> &mdash; short meetings with key people in other teams they&apos;ll interact with.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Pension auto-enrolment letter</strong> &mdash; if eligible, send the auto-enrolment notification.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>End-of-week check-in</strong> &mdash; how was their first week? Any blockers? Anything they need?</li>
              </ul>
            </div>

            <h3>First month</h3>
            <p>
              By the end of month one, the new employee should be settling into their role and contributing:
            </p>
            <div className="rounded-xl border-2 border-emerald-100 bg-emerald-50/30 p-6 my-6">
              <ul className="list-none pl-0 space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Set probation goals</strong> &mdash; agree clear, measurable objectives for the probation period.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Weekly 1:1s with manager</strong> &mdash; short, regular check-ins to track progress and address concerns early.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Provide early feedback</strong> &mdash; don&apos;t wait until the probation review. Positive and constructive feedback early on helps the employee adjust.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Check they have everything they need</strong> &mdash; tools, access, training, clarity on their role.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Buddy check-in</strong> &mdash; is the buddy relationship working? Does the new starter feel supported?</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Confirm payroll is correct</strong> &mdash; check their first payslip together. Payroll errors in month one erode trust fast.</li>
              </ul>
            </div>

            <h3>First 90 days</h3>
            <p>
              The 90-day mark is a critical milestone. This is where onboarding transitions into ongoing performance management:
            </p>
            <div className="rounded-xl border-2 border-emerald-100 bg-emerald-50/30 p-6 my-6">
              <ul className="list-none pl-0 space-y-1.5">
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Probation review meeting</strong> &mdash; formal review against the objectives set in month one. Document the outcome.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Probation sign-off (or extension)</strong> &mdash; confirm successful completion of probation in writing. If performance isn&apos;t where it needs to be, extend the probation with clear improvement targets.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Gather feedback</strong> &mdash; ask the new employee about their onboarding experience. What worked? What could be improved? Use this to refine the process for future hires.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Set ongoing objectives</strong> &mdash; transition from probation goals to regular performance objectives.</li>
                <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> <strong>Review <Link href="/blog/annual-leave-entitlement-uk" className="text-emerald-600 hover:underline font-medium">leave entitlement</Link></strong> &mdash; confirm the employee understands their leave allowance, how to book time off, and any carry-over rules.</li>
              </ul>
            </div>

            <h2>How to digitise onboarding</h2>
            <p>
              Paper checklists and email chains break for the same reasons spreadsheets break for leave tracking &mdash; they get lost, they&apos;re not updated, and there&apos;s no visibility. When onboarding involves multiple people (HR, IT, the line manager, the employee themselves), a paper checklist can&apos;t tell you what&apos;s been completed and what&apos;s still outstanding.
            </p>
            <p>
              A digital onboarding system solves this by:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Creating templates</strong> &mdash; define a standard checklist once, then apply it to every new hire. Customise per role if needed.</li>
              <li><strong>Assigning tasks to specific people</strong> &mdash; IT sets up the laptop, HR prepares the contract, the manager books the 1:1. Everyone knows what they&apos;re responsible for.</li>
              <li><strong>Tracking progress in real time</strong> &mdash; at any point, you can see what&apos;s done and what&apos;s outstanding. No chasing required.</li>
              <li><strong>Setting deadlines and reminders</strong> &mdash; automated nudges for overdue tasks mean nothing falls through the cracks.</li>
              <li><strong>Keeping a record</strong> &mdash; every completed task is logged with a timestamp and who completed it. Useful for compliance and audits.</li>
            </ul>

            <h2>How Leavely&apos;s onboarding feature works</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> includes onboarding checklists as part of its standard &pound;8/user/month plan. Here&apos;s how it works:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Create a template</strong> &mdash; build your onboarding checklist with tasks grouped by phase (pre-boarding, day one, week one, etc.). Assign each task to a role: HR, manager, IT, or the employee themselves.</li>
              <li><strong>Apply to a new hire</strong> &mdash; when you add a new employee, apply the onboarding template. Tasks are automatically assigned to the right people with due dates relative to the start date.</li>
              <li><strong>Track progress</strong> &mdash; a dashboard shows the status of every onboarding in progress. See at a glance which tasks are complete, pending, or overdue.</li>
              <li><strong>Automated reminders</strong> &mdash; Leavely sends email reminders for upcoming and overdue tasks. No manual chasing.</li>
              <li><strong>Employee self-service</strong> &mdash; the new employee logs in and sees their own onboarding tasks: submit bank details, read the handbook, complete e-learning, etc.</li>
              <li><strong>Audit trail</strong> &mdash; every task completion is logged. You have a complete, timestamped record of the onboarding process for every employee.</li>
            </ol>
            <p>
              The onboarding feature works alongside Leavely&apos;s core <Link href="/features" className="text-emerald-600 hover:underline font-medium">leave management</Link>, so the new employee is automatically set up with their leave allowance, added to the team calendar, and ready to book time off from day one.
            </p>

            <h2>Common onboarding mistakes</h2>
            <p>
              Even with a checklist, these mistakes trip up businesses regularly:
            </p>

            <h3>1. Information overload on day one</h3>
            <p>
              Dumping every policy, process, and piece of training on the new hire in their first day is overwhelming and counterproductive. Spread it out. Day one should cover the essentials: introductions, workspace, IT access, and safety. Everything else can wait.
            </p>

            <h3>2. No structured first week</h3>
            <p>
              &quot;Just shadow Sarah for a few days&quot; is not a plan. The new employee needs a clear schedule with defined activities, meetings, and training sessions. Leaving them to figure it out signals that you don&apos;t value their time or development.
            </p>

            <h3>3. Skipping the right to work check</h3>
            <p>
              This is a legal requirement, not a nice-to-have. The check must be completed <strong>before</strong> the employee starts work. Not on day one &mdash; before day one. Getting this wrong exposes you to fines of up to &pound;60,000 per worker.
            </p>

            <h3>4. No contract before day one</h3>
            <p>
              Since 2020, employees must receive a written statement of terms on or before their start date. Sending the contract &quot;when HR gets around to it&quot; is non-compliant. Prepare and send it as soon as the offer is accepted.
            </p>

            <h3>5. Forgetting about remote/hybrid workers</h3>
            <p>
              If the new hire is remote or hybrid, onboarding requires extra thought. Equipment must arrive before day one. Video calls replace office tours. The buddy system becomes even more important. Don&apos;t just replicate the in-office experience over Zoom &mdash; redesign it for remote.
            </p>

            <h3>6. No check-ins after week one</h3>
            <p>
              Onboarding doesn&apos;t end after the first week. The first 90 days are critical. Regular 1:1s, feedback, and probation reviews keep the new employee on track and prevent small problems from becoming big ones.
            </p>

            <h3>7. Not asking for feedback</h3>
            <p>
              New employees see your business with fresh eyes. Ask them what worked and what didn&apos;t in their onboarding. This feedback is gold for improving the process for future hires.
            </p>

            <h2>Frequently asked questions</h2>

            <h3>When should onboarding start?</h3>
            <p>
              Before day one. The period between offer acceptance and start date (sometimes called &quot;pre-boarding&quot;) is your opportunity to get admin out of the way so the first day can focus on people and culture, not paperwork.
            </p>

            <h3>How long should onboarding last?</h3>
            <p>
              At minimum, 90 days. The first day and first week are intensive, but structured onboarding should continue through the probation period. Many successful businesses extend onboarding touchpoints to 6 months for senior or complex roles.
            </p>

            <h3>What about probation periods?</h3>
            <p>
              Probation periods are not a legal requirement in the UK, but they&apos;re standard practice. Typical lengths are 3 or 6 months. During probation, you can usually give shorter notice to end employment &mdash; but you must still follow a fair process. Document everything: objectives, feedback, and the final review outcome.
            </p>

            <h3>Do I need a different checklist for different roles?</h3>
            <p>
              The core checklist (legal requirements, IT, HR paperwork) is the same for everyone. But role-specific training, introductions, and objectives will vary. Create a base template and customise it per department or role.
            </p>

            <h3>What&apos;s the biggest onboarding mistake employers make?</h3>
            <p>
              Treating onboarding as paperwork. The legal and administrative tasks are important, but they&apos;re table stakes. The real value of onboarding is making the new employee feel welcome, connected, and set up for success. If they walk away from week one thinking &quot;I&apos;m just a number here,&quot; no amount of compliance checklists will save the situation.
            </p>

            <h3>Can Leavely handle onboarding for all team sizes?</h3>
            <p>
              Yes. Leavely&apos;s onboarding checklists work for teams of any size, from 5 to 500+. The template system means you set up the process once and apply it consistently to every new hire. See <Link href="/pricing" className="text-emerald-600 hover:underline font-medium">pricing</Link> for details.
            </p>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Onboarding checklists, built in</h3>
            <p className="text-emerald-100 mb-6">Leavely includes onboarding templates, task assignment, and tracking at no extra cost. Try it free for 14 days.</p>
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
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
              <Link href="/blog/hr-software-small-business-uk" className="block text-emerald-600 hover:underline font-medium">HR Software for Small Businesses UK &rarr;</Link>
              <Link href="/blog/absence-management-policy-uk" className="block text-emerald-600 hover:underline font-medium">Absence Management Policy UK: Complete Guide &rarr;</Link>
              <Link href="/blog/employee-self-service-hr" className="block text-emerald-600 hover:underline font-medium">Employee Self-Service in HR Software: Reduce Admin &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
