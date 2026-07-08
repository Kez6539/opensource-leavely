import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/disability-leave-adjustments-uk`

export const metadata: Metadata = {
  title: 'Managing Leave for Employees with Disabilities: UK Employer Guide (2026)',
  description:
    'How UK employers should manage disability-related leave under the Equality Act 2010. Covers reasonable adjustments, separating disability absence from general sickness, Bradford Factor exclusions, occupational health referrals, Access to Work, and tribunal risks.',
  alternates: { canonical: articleUrl },
  keywords: [
    'disability leave UK',
    'reasonable adjustments leave',
    'Equality Act disability absence',
    'disability-related sickness absence',
    'managing disabled employees leave',
    'disability discrimination leave',
    'Bradford Factor disability',
    'Access to Work scheme',
    'occupational health referral disability',
  ],
  openGraph: {
    title: 'Managing Leave for Employees with Disabilities — UK Employer Guide',
    description: 'Reasonable adjustments, disability-related absence tracking, Bradford Factor exclusions, and how to avoid tribunal claims under the Equality Act 2010.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Managing Leave for Employees with Disabilities: UK Employer Guide',
  description: 'How UK employers should manage disability-related leave under the Equality Act 2010, including reasonable adjustments, absence tracking, and tribunal risks.',
  url: articleUrl,
  datePublished: '2026-03-25',
  dateModified: '2026-03-25',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function DisabilityLeaveAdjustmentsArticle() {
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
            Managing Leave for Employees with Disabilities: UK Employer Guide
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Employees with disabilities are more likely to need time off work &mdash; whether for medical appointments, flare-ups of chronic conditions, or recovery from treatment. For UK employers, getting this right isn&apos;t just good practice &mdash; it&apos;s a legal obligation under the <strong>Equality Act 2010</strong>. Mishandling disability-related absence is one of the most common routes to an employment tribunal, and compensation for disability discrimination is <strong>uncapped</strong>.
            </p>

            <p>
              This guide covers everything you need to know: what counts as a disability, how to make reasonable adjustments to leave policies, when to separate disability absence from general sickness, why the Bradford Factor can be dangerous, and how to protect both your employees and your business.
            </p>

            <h2>The Equality Act 2010: what counts as a disability?</h2>
            <p>
              Under the <strong>Equality Act 2010</strong>, a person has a disability if they have a physical or mental impairment that has a <strong>substantial</strong> and <strong>long-term</strong> adverse effect on their ability to carry out <strong>normal day-to-day activities</strong>.
            </p>
            <p>
              Let&apos;s break that down:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Substantial</strong> &mdash; more than minor or trivial. It doesn&apos;t have to be severe; it just has to be more than a slight inconvenience.</li>
              <li><strong>Long-term</strong> &mdash; has lasted or is likely to last <strong>12 months or more</strong>, or is likely to recur. A condition that comes and goes (like MS or epilepsy) still counts if the effects are long-term overall.</li>
              <li><strong>Normal day-to-day activities</strong> &mdash; things like walking, eating, washing, reading, socialising, or using a computer. This is a deliberately broad test.</li>
            </ul>
            <p>
              <strong>Important:</strong> The effect of the impairment must be assessed <strong>without treatment</strong>. If someone&apos;s diabetes is well-controlled with insulin, you still consider how it would affect them without the medication. The only exception is corrected eyesight (glasses or contact lenses).
            </p>
            <p>
              Some conditions are automatically treated as disabilities without needing to meet the definition above:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Cancer</strong> (from the point of diagnosis)</li>
              <li><strong>HIV infection</strong> (from the point of diagnosis)</li>
              <li><strong>Multiple sclerosis</strong> (from the point of diagnosis)</li>
              <li><strong>Certified visual impairment</strong></li>
            </ul>
            <p>
              In practice, the definition captures far more conditions than many employers realise. Depression, anxiety, ADHD, autism, diabetes, Crohn&apos;s disease, fibromyalgia, chronic fatigue syndrome, and many musculoskeletal conditions can all qualify. If you&apos;re unsure whether an employee&apos;s condition counts, <strong>treat it as a disability and make adjustments</strong>. It&apos;s far safer than guessing wrong.
            </p>

            <h2>Your duty to make reasonable adjustments for leave</h2>
            <p>
              Section 20 of the Equality Act 2010 imposes a duty on employers to make <strong>reasonable adjustments</strong> when a provision, criterion, or practice (PCP) puts a disabled employee at a substantial disadvantage compared to non-disabled employees. Your standard leave and absence policies are PCPs &mdash; and they can absolutely disadvantage disabled employees.
            </p>
            <p>
              Reasonable adjustments to leave policies might include:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Additional paid or unpaid sick leave</strong> beyond your standard entitlement, to accommodate disability-related absence.</li>
              <li><strong>Flexible leave arrangements</strong> &mdash; allowing time off for medical appointments, treatment sessions, or therapy without requiring employees to use annual leave.</li>
              <li><strong>Phased return to work</strong> &mdash; allowing a gradual increase in hours or duties after a period of disability-related absence. See our full guide on <Link href="/blog/phased-return-to-work-uk" className="text-emerald-600 hover:underline font-medium">phased returns to work</Link>.</li>
              <li><strong>Modified trigger points</strong> &mdash; adjusting or disabling absence management triggers (like the Bradford Factor) for disability-related absences.</li>
              <li><strong>Working from home</strong> on days when the employee&apos;s condition makes commuting or office work difficult.</li>
              <li><strong>Adjusted hours</strong> &mdash; allowing later starts, earlier finishes, or split shifts to accommodate medication schedules or fatigue patterns.</li>
            </ul>
            <p>
              The word &quot;reasonable&quot; is doing a lot of work here. What&apos;s reasonable depends on the size and resources of your business, the cost of the adjustment, how practical it is, and how effective it would be. A large employer with 500 staff will be expected to do more than a small business with 10. But even small employers must show they genuinely considered adjustments &mdash; simply saying &quot;we can&apos;t afford it&quot; without evidence won&apos;t hold up at tribunal.
            </p>

            <h2>Disability-related absence vs general sickness</h2>
            <p>
              This is one of the most critical distinctions in UK employment law, and one that many employers get wrong. <strong>Disability-related absence</strong> and <strong>general sickness absence</strong> should be tracked and managed separately.
            </p>
            <p>
              Why? Because treating them identically means your standard absence management procedures &mdash; trigger points, warnings, capability reviews &mdash; will disproportionately affect disabled employees. That&apos;s indirect disability discrimination under the Equality Act.
            </p>

            <h3>What qualifies as disability-related absence?</h3>
            <ul className="list-disc pl-6">
              <li>Time off due to the disability itself (e.g., a flare-up of Crohn&apos;s disease, a depressive episode).</li>
              <li>Absence for medical treatment related to the disability (e.g., chemotherapy, physiotherapy sessions, mental health therapy).</li>
              <li>Recovery time after surgery or procedures connected to the disability.</li>
              <li>Absence caused by side effects of medication taken for the disability.</li>
              <li>Time off for disability assessments, reviews, or occupational health appointments.</li>
            </ul>

            <h3>What is general sickness absence?</h3>
            <ul className="list-disc pl-6">
              <li>A cold, flu, or stomach bug unrelated to the disability.</li>
              <li>A sports injury.</li>
              <li>Any illness or condition that has no connection to the employee&apos;s disability.</li>
            </ul>
            <p>
              <strong>Practical example:</strong> An employee with multiple sclerosis takes 3 days off with a flu bug and 8 days off during an MS relapse. The 3 flu days are general sickness. The 8 MS days are disability-related absence. These should be recorded in separate categories and only the 3 flu days should count towards your standard absence triggers.
            </p>

            <h2>When the Bradford Factor should NOT apply</h2>
            <p>
              The <Link href="/blog/bradford-factor-explained" className="text-emerald-600 hover:underline font-medium">Bradford Factor</Link> is a widely used tool for flagging frequent short-term absences. The formula (S &times; S &times; D) heavily penalises employees with multiple short absences &mdash; exactly the pattern you&apos;d expect from someone with a chronic or fluctuating disability.
            </p>
            <p>
              <strong>Applying the Bradford Factor to disability-related absence is extremely risky.</strong> Here&apos;s why:
            </p>
            <ul className="list-disc pl-6">
              <li>An employee with epilepsy who has 6 single-day absences due to seizures would score <strong>6 &times; 6 &times; 6 = 216</strong> &mdash; well above most trigger points.</li>
              <li>An employee with Crohn&apos;s disease who has 4 absences of 2 days each would score <strong>4 &times; 4 &times; 8 = 128</strong>.</li>
              <li>Triggering a formal review or warning based on these scores would be <strong>disability discrimination</strong> unless you&apos;ve excluded disability-related absences from the calculation.</li>
            </ul>
            <p>
              Best practice is clear: <strong>exclude all disability-related absence from Bradford Factor calculations</strong>. Track it separately, manage it through your reasonable adjustments process, and never use it as grounds for disciplinary action.
            </p>
            <p>
              This is one of the key limitations of the Bradford Factor that ACAS and employment lawyers consistently highlight. If you use it, you must build in exceptions for disability-related absence, pregnancy-related absence, and any other protected category.
            </p>

            <h2>Occupational health referrals</h2>
            <p>
              An occupational health (OH) referral is one of the most valuable tools available to employers managing disability-related absence. OH professionals can provide a medical assessment that&apos;s specifically focused on the employee&apos;s ability to work &mdash; unlike a GP fit note, which deals with general fitness.
            </p>
            <p>
              <strong>When to refer to occupational health:</strong>
            </p>
            <ul className="list-disc pl-6">
              <li>When an employee discloses a disability or long-term health condition.</li>
              <li>When you suspect an underlying condition is causing frequent absences.</li>
              <li>When an employee has been off sick for an extended period and a return to work is being planned.</li>
              <li>When you need advice on what reasonable adjustments to make.</li>
              <li>When you&apos;re considering capability proceedings and need medical evidence.</li>
            </ul>
            <p>
              <strong>What to include in the referral:</strong>
            </p>
            <ol className="list-decimal pl-6">
              <li>The employee&apos;s job role and key duties.</li>
              <li>Their absence history (with dates and reasons).</li>
              <li>Any adjustments already in place.</li>
              <li>Specific questions you want answered &mdash; for example: &quot;Is the employee&apos;s condition likely to meet the definition of disability under the Equality Act?&quot;, &quot;What adjustments would enable them to attend work more regularly?&quot;, &quot;When is a return to full duties likely?&quot;</li>
            </ol>
            <p>
              <strong>Employee consent is required.</strong> You cannot force an employee to attend an occupational health appointment, but you can explain that the referral is to support them, not to build a case against them. If they refuse, you can only make decisions based on the information available &mdash; note this in writing.
            </p>
            <p>
              The OH report will typically confirm whether the Equality Act applies, recommend specific adjustments, estimate a return-to-work timeline, and advise on ongoing support. This report is <strong>gold dust</strong> if you ever face a tribunal claim &mdash; it shows you took the employee&apos;s condition seriously and sought professional advice.
            </p>

            <h2>The Access to Work scheme</h2>
            <p>
              <strong>Access to Work</strong> is a UK government scheme that provides grants to cover the extra costs of working with a disability or health condition. Many employers &mdash; and employees &mdash; don&apos;t know it exists, which means significant financial support goes unclaimed.
            </p>
            <p>
              Access to Work can fund:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Specialist equipment</strong> &mdash; ergonomic chairs, screen readers, adapted keyboards, hearing loops.</li>
              <li><strong>Support workers</strong> &mdash; including British Sign Language interpreters, job coaches, and mental health support workers.</li>
              <li><strong>Travel costs</strong> &mdash; if the employee can&apos;t use public transport because of their disability, Access to Work can fund taxi fares or a support worker to accompany them.</li>
              <li><strong>Mental health support</strong> &mdash; the scheme funds up to 9 months of workplace mental health support through approved providers.</li>
              <li><strong>Communication support</strong> &mdash; for employees who are deaf or have hearing loss.</li>
            </ul>
            <p>
              The grant is paid to the employer (or the employee if self-employed) and can cover up to <strong>&pound;66,000 per year</strong> in support costs. For small employers, there&apos;s typically no cost-sharing requirement &mdash; the grant covers 100% of approved costs.
            </p>
            <p>
              <strong>How to apply:</strong> The employee applies directly through the DWP. They&apos;ll need their National Insurance number, workplace details, and information about their condition. An Access to Work assessor will then visit the workplace (or conduct a remote assessment) and recommend support. As an employer, your role is to cooperate with the assessment and implement the funded adjustments.
            </p>
            <p>
              <strong>Practical tip:</strong> Proactively tell employees about Access to Work during onboarding or when a disability is disclosed. Many employees don&apos;t know they can apply, and the support can dramatically reduce both absence and the cost of adjustments to the employer.
            </p>

            <h2>Employment tribunal risks</h2>
            <p>
              Getting disability-related absence wrong can be extremely expensive. Here are the main tribunal claims you risk:
            </p>

            <h3>Discrimination arising from disability (Section 15)</h3>
            <p>
              This is the most common disability discrimination claim related to absence. Under Section 15 of the Equality Act, it is discrimination to treat someone unfavourably <strong>because of something arising in consequence of their disability</strong>. Absence arising from a disability is the textbook example.
            </p>
            <p>
              If you give an employee a formal warning, reduce their pay, deny a promotion, or dismiss them because of disability-related absence, that is likely Section 15 discrimination &mdash; unless you can show the treatment was a <strong>proportionate means of achieving a legitimate aim</strong>. This is a high bar to clear.
            </p>

            <h3>Failure to make reasonable adjustments (Section 20)</h3>
            <p>
              If you apply the same absence policy to disabled and non-disabled employees without any adjustments, and that policy disadvantages the disabled employee, you&apos;ve likely failed in your duty to make reasonable adjustments. Typical failures include:
            </p>
            <ul className="list-disc pl-6">
              <li>Applying the same Bradford Factor trigger points to everyone.</li>
              <li>Refusing to extend sick pay entitlement for disability-related absence.</li>
              <li>Requiring employees to use annual leave for medical appointments.</li>
              <li>Not considering a phased return to work after disability-related absence.</li>
            </ul>

            <h3>Indirect disability discrimination (Section 19)</h3>
            <p>
              A policy that applies equally to everyone but puts disabled employees at a particular disadvantage can be indirect discrimination. For example, a blanket &quot;three absences in 12 months triggers a formal review&quot; policy disproportionately affects employees with fluctuating conditions.
            </p>

            <h3>Compensation is uncapped</h3>
            <p>
              Unlike unfair dismissal claims (where compensation is capped at the lower of 12 months&apos; pay or &pound;115,115 in 2025/26), <strong>disability discrimination compensation has no cap</strong>. Awards include:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Financial losses</strong> &mdash; past and future loss of earnings, pension loss, benefits.</li>
              <li><strong>Injury to feelings</strong> &mdash; typically &pound;1,100 to &pound;56,200 depending on severity (Vento bands).</li>
              <li><strong>Aggravated damages</strong> &mdash; if the employer&apos;s conduct was particularly egregious.</li>
              <li><strong>Interest</strong> &mdash; on both financial losses and injury to feelings.</li>
            </ul>
            <p>
              Awards of &pound;50,000+ for disability discrimination are not uncommon, and six-figure awards occur regularly. The reputational damage and legal costs add to the total impact.
            </p>

            <h2>Practical examples</h2>
            <p>
              Let&apos;s look at how these principles work in practice:
            </p>

            <h3>Example 1: Employee with depression</h3>
            <p>
              Sarah has clinical depression and takes 2&ndash;3 days off every few weeks during depressive episodes. Her Bradford Factor score hits 450. Under your standard policy, this triggers a written warning.
            </p>
            <p>
              <strong>Wrong approach:</strong> Issue the written warning based on the Bradford Factor score.
            </p>
            <p>
              <strong>Right approach:</strong> Exclude Sarah&apos;s depression-related absences from the Bradford Factor. Refer her to occupational health. Discuss reasonable adjustments &mdash; perhaps working from home during difficult days, flexible start times to accommodate medication effects, or a temporary reduction in workload. Record all discussions and adjustments offered.
            </p>

            <h3>Example 2: Employee with diabetes</h3>
            <p>
              James has Type 1 diabetes. He needs time off for quarterly hospital appointments and occasionally has days where his blood sugar levels make it unsafe to drive to work.
            </p>
            <p>
              <strong>Wrong approach:</strong> Require James to use annual leave for hospital appointments and count his diabetes-related sick days in the same pot as general sickness.
            </p>
            <p>
              <strong>Right approach:</strong> Allow James paid time off for diabetes-related medical appointments as a reasonable adjustment. Track his diabetes-related absences separately from general sickness. Consider whether working from home on difficult blood sugar days is feasible. Tell James about the Access to Work scheme.
            </p>

            <h3>Example 3: Employee with a musculoskeletal condition</h3>
            <p>
              Priya has chronic back pain that qualifies as a disability. She has had 15 days off over 5 separate absences in the last 6 months. Her manager wants to start a capability procedure.
            </p>
            <p>
              <strong>Wrong approach:</strong> Begin capability proceedings based on total absence figures.
            </p>
            <p>
              <strong>Right approach:</strong> Separate Priya&apos;s disability-related absences from any general sickness. Refer to occupational health for advice on adjustments &mdash; perhaps an ergonomic workstation assessment, a standing desk, or permission to work from home during flare-ups. Apply for Access to Work funding for equipment. Only consider capability proceedings if, after all reasonable adjustments are in place, the absence level remains unsustainable &mdash; and even then, seek legal advice first.
            </p>

            <h2>Building a disability-inclusive absence policy</h2>
            <p>
              Your <Link href="/blog/absence-management-policy-uk" className="text-emerald-600 hover:underline font-medium">absence management policy</Link> should explicitly address disability-related absence. Here&apos;s what to include:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>A clear statement</strong> that disability-related absence will be recorded separately from general sickness absence.</li>
              <li><strong>Confirmation that the Bradford Factor</strong> (or any other absence trigger mechanism) will not include disability-related absence.</li>
              <li><strong>A process for identifying disability-related absence</strong> &mdash; typically through an occupational health referral or a conversation with the employee.</li>
              <li><strong>Details of how reasonable adjustments are considered</strong> &mdash; who is responsible, what the process is, and how decisions are recorded.</li>
              <li><strong>Information about Access to Work</strong> and how employees can apply.</li>
              <li><strong>A commitment to confidentiality</strong> &mdash; disability information is special category data under UK GDPR and must be handled with care.</li>
              <li><strong>Regular policy reviews</strong> &mdash; adjustments should be reviewed periodically to ensure they&apos;re still effective.</li>
            </ol>
            <p>
              <strong>Key point:</strong> Don&apos;t wait until you have an employee with a disability to write this policy. Having it in place before issues arise demonstrates good faith and makes it much easier to respond quickly and consistently.
            </p>

            <h2>Manager training is essential</h2>
            <p>
              Your absence policy is only as good as the managers who implement it. Front-line managers are the ones having return-to-work conversations, deciding whether to escalate absence concerns, and making day-to-day decisions about adjustments. If they don&apos;t understand disability law, they can inadvertently create tribunal risk.
            </p>
            <p>
              At a minimum, train managers on:
            </p>
            <ul className="list-disc pl-6">
              <li>The definition of disability under the Equality Act (it&apos;s broader than most people think).</li>
              <li>The duty to make reasonable adjustments and what &quot;reasonable&quot; means in practice.</li>
              <li>How to have supportive conversations about disability and absence.</li>
              <li>When to refer to occupational health and how to write a referral.</li>
              <li>The difference between disability-related and general sickness absence.</li>
              <li>Why the Bradford Factor must exclude disability-related absence.</li>
              <li>Confidentiality obligations around health information.</li>
            </ul>

            <h2>How Leavely helps track disability-related absence separately</h2>
            <p>
              One of the biggest practical challenges in managing disability-related absence is <strong>keeping it separate from general sickness</strong> in your records. When everything is lumped together in a spreadsheet or a basic HR system, it&apos;s easy for disability-related absence to trigger standard absence management processes &mdash; creating exactly the discrimination risk you&apos;re trying to avoid.
            </p>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> solves this by giving you the tools to manage disability-related absence properly:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Separate absence categories</strong> &mdash; create distinct leave types for disability-related absence, keeping it visually and analytically separate from general sickness.</li>
              <li><strong>Bradford Factor exclusions</strong> &mdash; Leavely&apos;s automatic Bradford Factor calculation can exclude disability-related absences, so scores only reflect general sickness patterns.</li>
              <li><strong>Confidential records</strong> &mdash; role-based access controls mean only authorised personnel can see disability-related absence data, helping you meet your GDPR obligations for special category data.</li>
              <li><strong>Adjustment tracking</strong> &mdash; record reasonable adjustments alongside the employee&apos;s profile, creating an audit trail that demonstrates your compliance.</li>
              <li><strong>Reporting and analytics</strong> &mdash; generate reports on disability-related absence separately from general sickness, giving you accurate data for workforce planning without conflating the two.</li>
              <li><strong>Return-to-work forms</strong> &mdash; built-in digital forms that capture the conversation and any agreed adjustments, creating the documentation you&apos;d need if a decision were ever challenged.</li>
            </ul>
            <p>
              Getting the admin right isn&apos;t glamorous, but it&apos;s the foundation of legal compliance. When disability-related absence is tracked separately, your managers get accurate data, your Bradford Factor scores are fair, and you have the evidence to show a tribunal that you took your obligations seriously.
            </p>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Track disability-related absence separately</h3>
            <p className="text-emerald-100 mb-6">Leavely helps you manage disability-related leave properly &mdash; separate categories, Bradford Factor exclusions, and confidential records. Try it free for 14 days.</p>
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
              <Link href="/blog/sick-leave-policy-uk" className="block text-emerald-600 hover:underline font-medium">Sick Leave Policy UK: What Employers Must Know &rarr;</Link>
              <Link href="/blog/statutory-sick-pay-uk" className="block text-emerald-600 hover:underline font-medium">Statutory Sick Pay UK: Complete Employer Guide &rarr;</Link>
              <Link href="/blog/phased-return-to-work-uk" className="block text-emerald-600 hover:underline font-medium">Phased Return to Work UK: How to Manage It Properly &rarr;</Link>
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">Bradford Factor Explained: How to Calculate and Use It &rarr;</Link>
              <Link href="/blog/absence-management-policy-uk" className="block text-emerald-600 hover:underline font-medium">Absence Management Policy UK: Complete Guide &amp; Template &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
