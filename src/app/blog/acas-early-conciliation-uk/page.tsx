import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/acas-early-conciliation-uk`

export const metadata: Metadata = {
  title: 'ACAS Early Conciliation: What Employers Need to Know (2026 Guide)',
  description:
    'A complete employer guide to ACAS early conciliation in the UK. Covers the step-by-step process, time limits, COT3 settlement agreements, tribunal costs, common claim types, and how strong HR records protect your business.',
  alternates: { canonical: articleUrl },
  keywords: [
    'ACAS early conciliation',
    'ACAS conciliation employer guide',
    'employment tribunal process UK',
    'ACAS certificate',
    'early conciliation time limit',
    'employment tribunal costs UK',
  ],
  openGraph: {
    title: 'ACAS Early Conciliation &mdash; What Employers Need to Know (2026)',
    description: 'The mandatory pre-tribunal step every UK employer must understand. Process, time limits, costs, and how audit trails protect you.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'ACAS Early Conciliation: What Employers Need to Know',
  description: 'A complete employer guide to ACAS early conciliation in the UK, covering the process, time limits, settlement agreements, tribunal costs, and how good HR records protect your business.',
  url: articleUrl,
  datePublished: '2026-03-25',
  dateModified: '2026-03-25',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function AcasEarlyConciliationArticle() {
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
            ACAS Early Conciliation: What Employers Need to Know (2026 Guide)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              If an employee or former employee believes they&apos;ve been treated unlawfully at work, they can&apos;t simply walk into an employment tribunal. Since 2014, they must first go through <strong>ACAS early conciliation</strong> &mdash; a mandatory step designed to resolve workplace disputes before they reach a hearing. For employers, understanding this process isn&apos;t optional. It&apos;s the difference between settling a dispute quickly and affordably, or spending months and tens of thousands of pounds defending a tribunal claim.
            </p>

            <p>
              This guide covers everything UK employers need to know about ACAS early conciliation in 2026: what it is, how the process works step by step, what a COT3 settlement agreement looks like, what happens if conciliation fails, the real costs of defending a tribunal claim, and how strong HR records &mdash; particularly audit trails for leave and absence decisions &mdash; can protect your business.
            </p>

            <h2>What is ACAS early conciliation?</h2>
            <p>
              <strong>ACAS</strong> (the Advisory, Conciliation and Arbitration Service) is a publicly funded body that helps resolve workplace disputes. <strong>Early conciliation</strong> is the process by which ACAS attempts to help an employer and employee settle a dispute <strong>before</strong> it goes to an employment tribunal.
            </p>
            <p>
              Since <strong>6 April 2014</strong>, early conciliation has been <strong>mandatory</strong>. An individual cannot submit a claim to an employment tribunal unless they have first contacted ACAS and either attempted conciliation or received a certificate confirming the process has been completed. The only exceptions are very narrow &mdash; for example, claims under the Equal Pay Act where a &quot;qualifying period&quot; is involved, or certain types of appeal.
            </p>
            <p>
              The service is <strong>free</strong> for both parties, <strong>confidential</strong>, and <strong>voluntary</strong> in the sense that neither side is forced to reach an agreement. However, the act of contacting ACAS is not voluntary for the claimant &mdash; they must do it before they can proceed to tribunal.
            </p>
            <p>
              <strong>Key point for employers:</strong> ACAS early conciliation is not a legal proceeding. Nothing said during conciliation can be used as evidence at a subsequent tribunal hearing. This confidentiality is what makes it possible for both sides to speak openly and explore settlement without fear of their words being used against them.
            </p>

            <h2>The early conciliation process: step by step</h2>
            <p>
              Understanding the timeline and mechanics is essential. Here&apos;s how ACAS early conciliation works from start to finish:
            </p>

            <h3>Step 1: The employee submits an EC notification</h3>
            <p>
              The process begins when an individual (the prospective claimant) contacts ACAS to notify them of a potential employment tribunal claim. They can do this online via the ACAS website or by phone. This is called an <strong>early conciliation (EC) notification</strong>.
            </p>
            <p>
              The notification includes basic details: the prospective claimant&apos;s name and contact information, the employer&apos;s name and address, and a brief description of the dispute. The claimant does <strong>not</strong> need to have a solicitor or provide detailed legal arguments at this stage.
            </p>

            <h3>Step 2: ACAS contacts the claimant</h3>
            <p>
              Within a few days of receiving the notification, an ACAS conciliator will contact the prospective claimant to discuss the dispute. The conciliator will explain the process, assess whether conciliation is likely to be productive, and ask whether the claimant wants to proceed with conciliation or simply receive a certificate to take their claim to tribunal.
            </p>
            <p>
              If the claimant opts out of conciliation immediately, ACAS issues a certificate straight away (see Step 5). Most claimants, however, agree to attempt conciliation.
            </p>

            <h3>Step 3: ACAS contacts the employer</h3>
            <p>
              This is often the first time the employer learns that a complaint has been made. The ACAS conciliator will call or write to the employer to explain the nature of the dispute and invite them to participate in conciliation. As an employer, <strong>you are not obliged to participate</strong>, but it is almost always in your interest to do so. Refusing to engage means losing the chance to resolve the matter quickly and cheaply.
            </p>
            <p>
              <strong>Important:</strong> The conciliator is neutral. They do not take sides, give legal advice, or make judgments about who is right or wrong. Their role is to facilitate a conversation and help both parties explore whether a settlement is possible.
            </p>

            <h3>Step 4: The conciliation window</h3>
            <p>
              ACAS has an initial period of <strong>up to 6 weeks</strong> (starting from the date the EC notification was received) to attempt conciliation. If both parties are making progress but haven&apos;t reached agreement, the conciliator can <strong>extend</strong> this period by a further <strong>2 weeks</strong>, making the maximum conciliation period <strong>8 weeks</strong> in total.
            </p>
            <p>
              During this window, the conciliator will go back and forth between the parties &mdash; usually by phone. They might discuss the strengths and weaknesses of the potential claim, explore what each side wants, and help both parties understand the risks and costs of going to tribunal. The conciliator may suggest a settlement figure or help structure a deal, but they cannot impose one.
            </p>

            <h3>Step 5: The early conciliation certificate</h3>
            <p>
              At the end of the process, ACAS issues an <strong>early conciliation certificate</strong>. This certificate has a unique reference number that the claimant <strong>must</strong> include on their tribunal claim form (ET1). Without it, the tribunal will reject the claim.
            </p>
            <p>
              A certificate is issued in one of three scenarios:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Settlement reached</strong> &mdash; the parties have agreed terms and signed a COT3 (see below). The matter is closed.</li>
              <li><strong>Conciliation unsuccessful</strong> &mdash; the parties could not reach agreement within the conciliation window. The claimant can now proceed to tribunal.</li>
              <li><strong>Conciliation not attempted</strong> &mdash; the claimant or employer declined to participate. The certificate is issued so the claimant can file a tribunal claim.</li>
            </ul>

            <h2>What happens during conciliation?</h2>
            <p>
              Conciliation is a <strong>confidential, without-prejudice</strong> process. The conciliator typically handles communication between the parties by phone rather than bringing them together in the same room. This keeps things less confrontational and allows each side to speak candidly.
            </p>
            <p>
              The conciliator may:
            </p>
            <ul className="list-disc pl-6">
              <li>Explain the legal framework relevant to the dispute (without giving legal advice).</li>
              <li>Help each party understand the strengths and weaknesses of their position.</li>
              <li>Relay offers and counteroffers between the parties.</li>
              <li>Suggest creative solutions that go beyond financial compensation &mdash; for example, an agreed reference, a change to the employee&apos;s leaving date, or the removal of a warning from their record.</li>
              <li>Help both parties understand the likely costs, time, and stress involved in going to tribunal.</li>
            </ul>
            <p>
              <strong>For employers:</strong> This is your opportunity to resolve a dispute before it becomes public and expensive. Even if you believe the claim has no merit, the cost of engaging with conciliation (zero) is vastly lower than the cost of defending a tribunal claim (see below). Approach it pragmatically.
            </p>

            <h2>Settlement agreements and COT3 forms</h2>
            <p>
              If the parties reach agreement during early conciliation, the terms are recorded on a <strong>COT3 form</strong>. This is a legally binding settlement agreement that is drawn up by the ACAS conciliator and signed by both parties. Once a COT3 is signed, the claimant <strong>cannot</strong> bring a tribunal claim about the same matter &mdash; the dispute is settled permanently.
            </p>
            <p>
              A COT3 typically covers:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Financial terms</strong> &mdash; a lump-sum payment to the claimant. The first &pound;30,000 of compensation for loss of employment is usually tax-free.</li>
              <li><strong>Non-financial terms</strong> &mdash; an agreed reference, removal of warnings or disciplinary records, an agreed announcement about the employee&apos;s departure, return of company property, etc.</li>
              <li><strong>Confidentiality clauses</strong> &mdash; both parties agree not to disclose the terms of the settlement.</li>
              <li><strong>Full and final settlement</strong> &mdash; the claimant waives their right to bring any further claims arising from the same facts.</li>
            </ul>
            <p>
              <strong>COT3 vs settlement agreement:</strong> A COT3 is specifically brokered through ACAS. A separate &quot;settlement agreement&quot; (formerly called a compromise agreement) is a private contract between employer and employee, usually drafted by a solicitor. Both are legally binding, but a COT3 doesn&apos;t require the employee to take independent legal advice &mdash; the ACAS conciliator&apos;s involvement is sufficient. This makes COT3 settlements faster and cheaper to conclude.
            </p>

            <h2>What happens if conciliation fails?</h2>
            <p>
              If ACAS conciliation is unsuccessful &mdash; or if either party declines to participate &mdash; the claimant receives their early conciliation certificate and can proceed to file a claim at the employment tribunal.
            </p>
            <p>
              <strong>Time limits are critical here.</strong> The claimant generally has <strong>1 month</strong> from the date the certificate is issued to submit their tribunal claim (Form ET1). However, the overall time limit for most employment claims is <strong>3 months less 1 day</strong> from the date of the act complained of (e.g., the date of dismissal). The early conciliation process &quot;stops the clock&quot; on this time limit &mdash; the period between submitting the EC notification and receiving the certificate doesn&apos;t count towards the 3-month deadline.
            </p>
            <p>
              <strong>For employers:</strong> This means that even if you believe the time limit has expired, the claimant may still be within time if they contacted ACAS promptly. Always check the dates carefully before assuming a claim is out of time.
            </p>

            <h2>Common claim types that trigger early conciliation</h2>
            <p>
              Early conciliation is required for virtually all individual employment tribunal claims. The most common types of claim that employers face include:
            </p>

            <h3>Unfair dismissal</h3>
            <p>
              The single most common type of employment tribunal claim. An employee with <strong>2+ years&apos; continuous service</strong> can claim unfair dismissal if they were dismissed without a fair reason (conduct, capability, redundancy, illegality, or &quot;some other substantial reason&quot;) or without a fair procedure. Compensation is capped at the lower of 12 months&apos; gross pay or &pound;115,115 (2025/26 figure), plus a basic award based on length of service.
            </p>

            <h3>Discrimination</h3>
            <p>
              Claims under the <strong>Equality Act 2010</strong> covering discrimination based on age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex, and sexual orientation. Unlike unfair dismissal, <strong>there is no qualifying service period</strong> &mdash; even a day-one employee can bring a discrimination claim. Compensation is <strong>uncapped</strong>.
            </p>

            <h3>Holiday pay</h3>
            <p>
              Claims for unpaid or incorrectly calculated <Link href="/blog/holiday-pay-calculation-uk" className="text-emerald-600 hover:underline font-medium">holiday pay</Link> under the Working Time Regulations 1998. These often arise when employers fail to include regular overtime, commission, or other variable pay in the holiday pay calculation. See also our guide on <Link href="/blog/working-time-regulations-uk" className="text-emerald-600 hover:underline font-medium">working time regulations</Link>.
            </p>

            <h3>Redundancy pay</h3>
            <p>
              Claims for unpaid statutory redundancy pay. Employees with 2+ years&apos; service who are made redundant are entitled to a statutory redundancy payment based on their age, length of service, and weekly pay (capped). Claims arise when employers fail to pay, miscalculate the amount, or dispute that a genuine redundancy situation existed.
            </p>

            <h3>Breach of contract</h3>
            <p>
              Claims for notice pay, unpaid wages, or other contractual entitlements. The tribunal can only hear breach of contract claims that arise on termination of employment &mdash; ongoing employment disputes must go to the county court.
            </p>

            <h3>Whistleblowing and detriment claims</h3>
            <p>
              Employees who suffer a detriment because they raised a protected disclosure (whistleblowing) or exercised a statutory right (e.g., requesting <Link href="/blog/flexible-working-uk" className="text-emerald-600 hover:underline font-medium">flexible working</Link>, taking <Link href="/blog/time-off-for-dependants-uk" className="text-emerald-600 hover:underline font-medium">time off for dependants</Link>, or reporting health and safety concerns) can bring tribunal claims. These have no service requirement and compensation is uncapped.
            </p>

            <h2>How to respond as an employer</h2>
            <p>
              When ACAS contacts you about an early conciliation notification, your response can significantly affect the outcome. Here&apos;s what to do:
            </p>

            <ol className="list-decimal pl-6">
              <li><strong>Don&apos;t panic, but don&apos;t ignore it.</strong> An EC notification is not a tribunal claim. It&apos;s a chance to resolve the issue before it escalates. Ignoring ACAS means the claimant gets their certificate and goes straight to tribunal.</li>
              <li><strong>Gather your records immediately.</strong> Pull together everything relevant: the employee&apos;s personnel file, any disciplinary or grievance records, meeting notes, emails, leave records, absence history, return-to-work forms, and any documents related to the decisions being challenged.</li>
              <li><strong>Consider taking legal advice early.</strong> Employment solicitors can advise on the strength of the claim and the likely cost of settlement versus tribunal. Many offer a fixed fee for initial advice on early conciliation matters. The earlier you get advice, the cheaper it tends to be.</li>
              <li><strong>Engage with the conciliator honestly.</strong> The conciliator is not your adversary. Be open about what happened, what your records show, and what outcome you&apos;d consider acceptable. Remember: nothing said during conciliation can be used at tribunal.</li>
              <li><strong>Be realistic about settlement.</strong> Even if you believe you acted correctly, consider the cost of defending the claim at tribunal (see below). A modest settlement now can save you &pound;10,000&ndash;&pound;20,000+ in legal fees and management time. It&apos;s a business decision, not an admission of guilt.</li>
              <li><strong>If you settle, ensure the COT3 covers everything.</strong> Work with the conciliator to make sure the settlement is comprehensive &mdash; full and final settlement of all claims, confidentiality obligations, and any non-financial terms (like an agreed reference).</li>
            </ol>

            <h2>The real costs of defending a tribunal claim</h2>
            <p>
              If early conciliation fails and the claimant proceeds to tribunal, the costs for an employer can be substantial. It&apos;s important to understand what you&apos;re facing:
            </p>

            <table>
              <thead>
                <tr>
                  <th>Cost element</th>
                  <th>Typical range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Legal representation (solicitor or barrister)</td>
                  <td>&pound;8,000&ndash;&pound;25,000+ for a standard claim</td>
                </tr>
                <tr>
                  <td>Management time (preparation, witness statements, hearing attendance)</td>
                  <td>50&ndash;150+ hours across multiple staff</td>
                </tr>
                <tr>
                  <td>Compensation if you lose (unfair dismissal)</td>
                  <td>&pound;5,000&ndash;&pound;115,115</td>
                </tr>
                <tr>
                  <td>Compensation if you lose (discrimination)</td>
                  <td>&pound;1,000&ndash;&pound;unlimited (awards of &pound;50,000+ are common)</td>
                </tr>
                <tr>
                  <td>Reputational damage</td>
                  <td>Tribunal judgments are public. They appear in online searches.</td>
                </tr>
                <tr>
                  <td>Staff morale impact</td>
                  <td>Current employees see how you handle disputes.</td>
                </tr>
              </tbody>
            </table>

            <p>
              <strong>Average total cost</strong> of defending a straightforward unfair dismissal claim from start to final hearing: <strong>&pound;8,000&ndash;&pound;25,000</strong> in legal fees alone, plus management time and any compensation awarded. For discrimination claims, costs can easily exceed &pound;50,000.
            </p>
            <p>
              <strong>The maths is clear:</strong> If a claim can be settled through ACAS early conciliation for a few thousand pounds, it is almost always cheaper than going to tribunal &mdash; even if you would have won. The only exception is where the claim is clearly out of time or has no reasonable prospect of success, and even then, you&apos;ll spend money proving that.
            </p>

            <h2>How good HR records protect you</h2>
            <p>
              Whether you settle during early conciliation or defend at tribunal, the quality of your HR records determines how strong your position is. Good records can mean the difference between a quick, low-cost settlement and a prolonged, expensive legal battle.
            </p>
            <p>
              Here&apos;s what strong records do for you:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Demonstrate fair process.</strong> If you dismissed someone for capability, your records should show a clear trail: the absence pattern, the occupational health referral, the meetings held, the warnings given, the adjustments offered, and the final decision. Without this trail, a tribunal will assume the process was unfair.</li>
              <li><strong>Support your version of events.</strong> Memories fade and witnesses move on. Contemporary written records &mdash; meeting notes, emails, decision logs &mdash; are far more persuasive than someone&apos;s recollection two years later.</li>
              <li><strong>Reduce settlement costs.</strong> When ACAS contacts you and you can immediately produce a comprehensive file showing that you followed a fair procedure, the conciliator can relay this strength to the claimant. Claims settle for less when the claimant understands the evidence against them.</li>
              <li><strong>Deter speculative claims.</strong> Employees who know their employer keeps meticulous records are less likely to bring weak claims in the first place. If your organisation is known for documenting everything, the calculus changes.</li>
            </ul>

            <h3>The records you need</h3>
            <p>
              For every significant HR decision &mdash; particularly those involving leave, absence, disciplinary matters, and dismissal &mdash; you should have:
            </p>
            <ul className="list-disc pl-6">
              <li>Dates and details of all relevant meetings and conversations.</li>
              <li>Copies of all letters and correspondence.</li>
              <li>A record of what the employee was told and when.</li>
              <li>Evidence that you followed your own policies and procedures.</li>
              <li>Records of any adjustments or support offered.</li>
              <li>A clear decision trail showing who decided what and why.</li>
            </ul>

            <h2>Why audit trails for leave and absence decisions matter</h2>
            <p>
              Leave and absence decisions are at the heart of many employment tribunal claims. An employee dismissed for excessive absence will often argue they were treated unfairly. An employee whose holiday request was denied may claim discrimination. A worker whose <Link href="/blog/sick-leave-policy-uk" className="text-emerald-600 hover:underline font-medium">sick leave</Link> triggered a formal process may argue that their <Link href="/blog/disability-leave-adjustments-uk" className="text-emerald-600 hover:underline font-medium">disability-related absence</Link> should have been treated differently.
            </p>
            <p>
              In all of these scenarios, the tribunal will ask: <strong>What did the employer do, when did they do it, and why?</strong> If you can&apos;t answer those questions with documentary evidence, you&apos;re in trouble.
            </p>
            <p>
              A proper audit trail for leave and absence decisions should capture:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Every leave request</strong> &mdash; who requested it, when, what type of leave, and the dates requested.</li>
              <li><strong>Every approval or rejection</strong> &mdash; who made the decision, when, and the reason for any rejection.</li>
              <li><strong>Balance calculations</strong> &mdash; how much leave the employee was entitled to, how much they&apos;d used, and how much remained at the time of each request.</li>
              <li><strong>Policy changes</strong> &mdash; when leave policies were updated and what changed.</li>
              <li><strong>Absence records</strong> &mdash; sickness dates, fit notes received, return-to-work conversations, and any absence management actions taken.</li>
              <li><strong>Bradford Factor scores</strong> &mdash; if you use the <Link href="/blog/bradford-factor-explained" className="text-emerald-600 hover:underline font-medium">Bradford Factor</Link>, the calculations and any exclusions applied for disability-related absence.</li>
            </ul>
            <p>
              Spreadsheets and paper files fail here. They can be edited without a trace, they&apos;re easy to lose, and they don&apos;t capture the &quot;who did what and when&quot; that a tribunal needs to see. Digital systems with <strong>immutable audit logs</strong> are the gold standard.
            </p>

            <h2>How Leavely creates audit trails that protect employers</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> is built with employment law compliance in mind. Every action taken in the system &mdash; every leave request, every approval, every rejection, every policy change &mdash; is automatically recorded in an immutable audit log that cannot be edited or deleted.
            </p>
            <p>
              Here&apos;s how Leavely&apos;s audit trail protects you during ACAS early conciliation and tribunal proceedings:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Automatic timestamped records</strong> &mdash; every action is logged with a timestamp, the user who performed it, and the details of what changed. No manual record-keeping required.</li>
              <li><strong>Complete leave request history</strong> &mdash; the full lifecycle of every leave request is preserved: submission, approval or rejection, the manager who made the decision, and the reason given.</li>
              <li><strong>Absence management documentation</strong> &mdash; sickness records, <Link href="/blog/absence-management-policy-uk" className="text-emerald-600 hover:underline font-medium">absence management</Link> triggers, return-to-work records, and any adjustments made are all captured in one place.</li>
              <li><strong>Bradford Factor calculations with exclusions</strong> &mdash; Leavely calculates Bradford Factor scores automatically and allows you to exclude disability-related absence, creating a defensible record of fair treatment.</li>
              <li><strong>Policy version history</strong> &mdash; when you update a leave policy, the previous version is preserved. You can demonstrate exactly what policy was in force at any given time.</li>
              <li><strong>Role-based access controls</strong> &mdash; your audit log shows exactly who had access to what information and when, supporting GDPR compliance for sensitive employee data.</li>
              <li><strong>Exportable records</strong> &mdash; pull a complete history for any employee at any time. When ACAS calls, you can have a comprehensive file ready within minutes, not days.</li>
            </ul>
            <p>
              The value of this becomes clear in practice. When an ACAS conciliator contacts you about a claim related to leave or absence decisions, you can immediately demonstrate: that you followed a consistent process, that the employee was treated the same as others in comparable situations, that any adjustments or exceptions were properly documented, and that the decision-maker had the right information at the time.
            </p>
            <p>
              <strong>That&apos;s the kind of evidence that settles claims quickly, cheaply, or not at all.</strong>
            </p>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Protect your business with proper audit trails</h3>
            <p className="text-emerald-100 mb-6">Leavely automatically logs every leave decision, policy change, and absence record &mdash; creating the evidence you need when ACAS comes calling. Try it free for 14 days.</p>
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
              <Link href="/blog/hr-compliance-checklist-uk" className="block text-emerald-600 hover:underline font-medium">HR Compliance Checklist UK: What Every Employer Needs &rarr;</Link>
              <Link href="/blog/absence-management-policy-uk" className="block text-emerald-600 hover:underline font-medium">Absence Management Policy UK: Complete Guide &amp; Template &rarr;</Link>
              <Link href="/blog/disability-leave-adjustments-uk" className="block text-emerald-600 hover:underline font-medium">Managing Leave for Employees with Disabilities: UK Employer Guide &rarr;</Link>
              <Link href="/blog/sick-leave-policy-uk" className="block text-emerald-600 hover:underline font-medium">Sick Leave Policy UK: What Employers Must Know &rarr;</Link>
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">Bradford Factor Explained: How to Calculate and Use It &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
