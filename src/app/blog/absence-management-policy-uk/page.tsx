import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/absence-management-policy-uk`

export const metadata: Metadata = {
  title: 'Absence Management Policy UK: Complete Guide & Template',
  description:
    'How to create an effective absence management policy for UK employers. Covers reporting procedures, trigger points, Bradford Factor, occupational health referrals, formal stages, reasonable adjustments, and a free template outline.',
  alternates: { canonical: articleUrl },
  keywords: [
    'absence management policy UK',
    'absence management procedure',
    'managing employee absence',
    'absence policy template UK',
    'sickness absence management',
    'absence management best practice',
  ],
  openGraph: {
    title: 'Absence Management Policy UK — Complete Guide & Template',
    description:
      'Reporting procedures, trigger points, Bradford Factor, formal stages, and a free absence management policy template for UK employers.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Absence Management Policy UK: Complete Guide & Template',
  description: 'How to create an effective absence management policy covering reporting procedures, trigger points, Bradford Factor, occupational health, and formal capability process.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function AbsenceManagementArticle() {
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
            <span className="text-xs text-gray-400 ml-3">10 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Absence Management Policy UK: Complete Guide &amp; Template
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Employee absence costs UK businesses an estimated &pound;29 billion per year, and the average worker takes 7.8 days of sickness absence annually. Without a clear absence management policy, employers struggle to distinguish between genuine illness and patterns of concern, manage long-term absence effectively, or take fair disciplinary action when needed. This guide explains how to build a robust absence management policy and manage absence fairly and lawfully.
            </p>

            <h2>Why you need an absence management policy</h2>
            <p>
              An absence management policy is not just a piece of HR paperwork — it is a practical tool that protects both the business and the employee. A well-written policy:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Sets clear expectations</strong> — employees know exactly how to report absence, what evidence is required, and what happens at each stage.</li>
              <li><strong>Ensures consistency</strong> — managers follow the same process for every absence, reducing the risk of unfair treatment or discrimination claims.</li>
              <li><strong>Supports early intervention</strong> — trigger points identify patterns before they escalate, allowing the employer to offer support or investigate.</li>
              <li><strong>Provides a legal framework</strong> — if the employer needs to take formal action (up to and including dismissal for capability), a documented policy demonstrates a fair process, which is essential for defending employment tribunal claims.</li>
              <li><strong>Promotes wellbeing</strong> — a good policy is not just about discipline. It also signals that the employer takes employee health seriously and will provide reasonable support.</li>
            </ul>

            <h2>Types of absence</h2>
            <p>
              Before diving into the policy framework, it helps to understand the main categories of absence:
            </p>

            <h3>Authorised vs unauthorised</h3>
            <ul className="list-disc pl-6">
              <li><strong>Authorised absence</strong> — the employee has followed the correct reporting procedures. This includes sickness, annual leave, parental leave, and any other approved absence.</li>
              <li><strong>Unauthorised absence</strong> — the employee is absent without following the reporting procedure or without approval. This is a conduct issue and should be dealt with under the disciplinary policy, not the absence management policy.</li>
            </ul>

            <h3>Short-term vs long-term</h3>
            <ul className="list-disc pl-6">
              <li><strong>Short-term absence</strong> — typically defined as any absence of up to 4 weeks (or 28 calendar days). This includes one-off sick days, minor illnesses, and short-term conditions. The concern here is usually about <strong>frequency and patterns</strong>.</li>
              <li><strong>Long-term absence</strong> — any single absence lasting more than 4 weeks. This often involves more serious health conditions and requires a different management approach, including regular contact, occupational health referrals, and phased returns.</li>
            </ul>

            <h2>Key components of an absence management policy</h2>

            <h3>1. Reporting procedures</h3>
            <p>
              Your policy should clearly state how employees must report absence. A typical reporting procedure includes:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Who to contact:</strong> the employee&apos;s line manager (not a colleague or HR, unless the manager is unavailable).</li>
              <li><strong>When:</strong> before the start of their shift or working day, or as soon as reasonably practicable.</li>
              <li><strong>How:</strong> by telephone (not text or email, as speaking to someone allows the manager to assess the situation and offer support).</li>
              <li><strong>What to say:</strong> the reason for absence, expected duration, and any work that needs to be covered.</li>
              <li><strong>Ongoing contact:</strong> for absences lasting more than one day, when and how the employee should provide updates.</li>
            </ul>

            <h3>2. Evidence requirements</h3>
            <ul className="list-disc pl-6">
              <li><strong>Days 1 to 7:</strong> the employee can self-certify their absence. Many employers use a self-certification form on return.</li>
              <li><strong>Day 8 onwards:</strong> a <strong>fit note</strong> (Statement of Fitness for Work) from a GP or hospital doctor is required. Fit notes can state that the employee is either &quot;not fit for work&quot; or &quot;may be fit for work&quot; with adjustments.</li>
              <li><strong>Ongoing absence:</strong> subsequent fit notes should be provided to cover the full period of absence, with no gaps.</li>
            </ul>

            <h3>3. Trigger points</h3>
            <p>
              Trigger points are thresholds that prompt a formal review of an employee&apos;s absence record. They provide an objective, consistent framework for deciding when to move from informal monitoring to formal action. Common trigger points include:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Number of absences:</strong> for example, 3 separate occasions of absence in a rolling 12-month period.</li>
              <li><strong>Total days lost:</strong> for example, 8 or more days of absence in a rolling 12-month period.</li>
              <li><strong>Patterns:</strong> for example, absences frequently falling on Mondays, Fridays, or around bank holidays.</li>
              <li><strong>Bradford Factor score:</strong> a formula that weights frequent short-term absences more heavily than single long-term absences (see below).</li>
            </ul>
            <p>
              Hitting a trigger point does not automatically mean disciplinary action — it means the manager should have a conversation with the employee to understand the reasons and explore what support can be offered.
            </p>

            <h3>4. Return-to-work interviews</h3>
            <p>
              A return-to-work interview should be conducted <strong>every time</strong> an employee returns from any period of sickness absence, no matter how short. This is one of the single most effective tools for managing absence. It:
            </p>
            <ul className="list-disc pl-6">
              <li>Welcomes the employee back and shows the employer cares.</li>
              <li>Gives the manager an opportunity to check whether the employee is genuinely fit to return.</li>
              <li>Identifies any workplace factors contributing to the absence.</li>
              <li>Creates a record of the absence and any agreed follow-up actions.</li>
              <li>Acts as a deterrent against non-genuine absence — employees know their absence will be discussed.</li>
            </ul>

            <h2>The Bradford Factor</h2>
            <p>
              The <Link href="/blog/bradford-factor-explained" className="text-emerald-600 hover:underline font-medium">Bradford Factor</Link> is a widely used formula that scores an employee&apos;s absence record by giving disproportionate weight to frequent, short-term absences. The formula is:
            </p>
            <p>
              <strong>B = S &times; S &times; D</strong>
            </p>
            <p>
              Where <strong>S</strong> is the number of separate spells of absence and <strong>D</strong> is the total number of days absent, both measured over a rolling 12-month period.
            </p>
            <p>
              For example, one absence of 10 days scores 1 &times; 1 &times; 10 = <strong>10</strong>. But 10 single-day absences score 10 &times; 10 &times; 10 = <strong>1,000</strong>. The logic is that frequent short-term absences are more disruptive to a business than a single continuous absence.
            </p>
            <p>
              Typical trigger thresholds might be 50 (informal discussion), 200 (first formal warning), 500 (final warning), and 1,000 (consideration of dismissal) — but these should be set based on your organisation&apos;s context and industry norms.
            </p>
            <p>
              <strong>Important:</strong> the Bradford Factor is a tool, not a decision-maker. Disability-related absence must be considered separately under the Equality Act 2010, and employers should always look at the individual circumstances before taking formal action.
            </p>

            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6 text-center">
              <p className="text-emerald-800 font-semibold mb-2">Free Bradford Factor Calculator</p>
              <p className="text-emerald-700 text-sm mb-3">Enter absence spells and total days to instantly calculate a Bradford Factor score with threshold guidance.</p>
              <Link href="/tools/bradford-factor-calculator" className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:underline">
                Try it now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <h2>Occupational health referrals</h2>
            <p>
              For long-term or complex health conditions, an occupational health (OH) referral provides an independent medical assessment of the employee&apos;s fitness for work and any adjustments that might help them return. An OH referral is appropriate when:
            </p>
            <ul className="list-disc pl-6">
              <li>The absence has lasted (or is expected to last) more than 4 weeks.</li>
              <li>The employee has a recurring condition that is causing frequent short-term absences.</li>
              <li>The fit note suggests the employee &quot;may be fit for work&quot; with adjustments, and you need guidance on what adjustments are reasonable.</li>
              <li>You suspect a disability under the Equality Act 2010 and need to understand your duty to make reasonable adjustments.</li>
              <li>The employee&apos;s own GP is providing limited or unclear information.</li>
            </ul>
            <p>
              The OH report can advise on likely return timescales, recommended adjustments (such as phased return, modified duties, or workplace changes), and whether the condition is likely to be considered a disability under the Equality Act.
            </p>

            <h2>Reasonable adjustments</h2>
            <p>
              Under the Equality Act 2010, employers have a duty to make <strong>reasonable adjustments</strong> for employees with a disability. A disability is defined as a physical or mental impairment that has a substantial and long-term (12 months or more) adverse effect on the person&apos;s ability to carry out normal day-to-day activities.
            </p>
            <p>
              Reasonable adjustments might include:
            </p>
            <ul className="list-disc pl-6">
              <li>Phased return to work (gradually increasing hours).</li>
              <li>Temporary or permanent changes to duties.</li>
              <li>Flexible working hours or the ability to work from home.</li>
              <li>Provision of specialist equipment or software.</li>
              <li>Time off for medical appointments.</li>
              <li>Discounting disability-related absence from trigger point calculations.</li>
            </ul>
            <p>
              Failure to make reasonable adjustments where there is a duty to do so is a form of disability discrimination. This is one of the most common pitfalls in absence management — applying trigger points and formal processes to disability-related absence without considering adjustments.
            </p>

            <h2>The formal capability process</h2>
            <p>
              If an employee&apos;s absence remains at unacceptable levels despite support and intervention, the employer may need to move to a formal capability process. This is typically structured in stages:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Stage 1 — first formal absence review meeting:</strong> the employee is invited to a formal meeting to discuss their absence record, any underlying causes, and what support has been provided. If attendance does not improve, a first written warning is issued with a review period (typically 6 to 12 months).</li>
              <li><strong>Stage 2 — second formal meeting:</strong> if the triggers are hit again during the review period, a second meeting is held and a final written warning may be issued.</li>
              <li><strong>Stage 3 — final meeting:</strong> if attendance still does not improve, a final meeting is held where dismissal on the grounds of capability may be considered.</li>
              <li><strong>Appeal:</strong> the employee must have the right to appeal at each stage.</li>
            </ul>
            <p>
              At every stage, the employer should consider whether there are underlying health issues, whether reasonable adjustments have been made, and whether the process has been applied consistently. Dismissal for capability (persistent short-term absence) is lawful, but only if the employer can demonstrate a fair process was followed.
            </p>

            <h2>Free template outline</h2>
            <p>
              Your absence management policy should include the following sections as a minimum:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Purpose and scope</strong> — who the policy applies to and its objectives.</li>
              <li><strong>Reporting absence</strong> — who, when, how, and what information to provide.</li>
              <li><strong>Evidence requirements</strong> — self-certification (days 1-7) and fit notes (day 8+).</li>
              <li><strong>Return-to-work interviews</strong> — when they happen and what they cover.</li>
              <li><strong>Trigger points</strong> — the specific thresholds that prompt a review (days, occasions, Bradford Factor score).</li>
              <li><strong>Informal stage</strong> — initial conversation, support offered, monitoring period.</li>
              <li><strong>Formal stages</strong> — first review, second review, final review, with timescales and outcomes at each stage.</li>
              <li><strong>Long-term absence process</strong> — regular contact, OH referrals, reasonable adjustments, return planning.</li>
              <li><strong>Appeal process</strong> — how to appeal a formal outcome.</li>
              <li><strong>Disability and reasonable adjustments</strong> — the employer&apos;s obligations under the Equality Act.</li>
              <li><strong>Confidentiality</strong> — how medical information will be handled.</li>
              <li><strong>Review</strong> — when the policy will next be reviewed.</li>
            </ol>

            <h2>How Leavely supports absence management</h2>
            <p>
              Managing absence effectively requires accurate data, timely alerts, and consistent processes. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> brings all of this together:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Absence recording</strong> — employees log sickness and other absence through a simple request flow, creating an automatic record with dates, reasons, and manager approvals.</li>
              <li><strong>Bradford Factor calculation</strong> — Leavely automatically calculates each employee&apos;s Bradford Factor score and highlights when trigger points are reached.</li>
              <li><strong>Trigger point alerts</strong> — managers receive notifications when an employee hits a trigger threshold, prompting timely action.</li>
              <li><strong>Return-to-work tracking</strong> — record return-to-work interviews and any agreed actions directly in the system.</li>
              <li><strong>Absence reports</strong> — generate team-level and company-level absence reports showing trends, hotspots, and Bradford Factor scores.</li>
              <li><strong>Leave type separation</strong> — distinguish between sickness, unpaid leave, compassionate leave, and other absence types for accurate reporting.</li>
              <li><strong>Audit trail</strong> — every absence event is logged with timestamps and user actions, providing a defensible record if formal action is needed.</li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Get absence under control</h3>
            <p className="text-emerald-100 mb-6">Leavely tracks absence, calculates Bradford Factor scores, and alerts managers when triggers are hit — so you can act early and stay fair.</p>
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
              <Link href="/blog/sick-leave-policy-uk" className="block text-emerald-600 hover:underline font-medium">
                Sick Leave Policy UK: What Employers Must Know &rarr;
              </Link>
              <Link href="/sick-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Sick Leave UK: SSP 2026/27 Employer Guide &rarr;
              </Link>
              <Link href="/uk-hr-compliance-small-business" className="block text-emerald-600 hover:underline font-medium">
                UK HR Compliance Checklist for Small Businesses &rarr;
              </Link>
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">
                Bradford Factor Explained: How to Calculate &amp; Use It &rarr;
              </Link>
              <Link href="/blog/return-to-work-interview-questions" className="block text-emerald-600 hover:underline font-medium">
                Return to Work Interview Questions: Manager&apos;s Guide &rarr;
              </Link>
              <Link href="/blog/occupational-sick-pay-uk" className="block text-emerald-600 hover:underline font-medium">
                Occupational Sick Pay UK: What Employers Need to Know &rarr;
              </Link>
              <Link href="/blog/leave-clash-detection-software" className="block text-emerald-600 hover:underline font-medium">
                Leave Clash Detection: How to Prevent Understaffing &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
