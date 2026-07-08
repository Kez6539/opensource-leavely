import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/fit-notes-employer-guide-uk`

export const metadata: Metadata = {
  title: 'Fit Notes UK: The Complete Employer Guide (2026)',
  description:
    'Everything UK employers need to know about fit notes (statement of fitness for work). Covers self-certification, who can issue fit notes, adjustments, digital fit notes, SSP, and long-term sickness.',
  alternates: { canonical: articleUrl },
  keywords: [
    'fit notes UK',
    'statement of fitness for work',
    'fit note employer guide',
    'sick note rules UK',
    'fit note adjustments',
    'fit note vs sick note',
    'digital fit notes UK',
    'self certification sick leave',
  ],
  openGraph: {
    title: 'Fit Notes UK — Complete Employer Guide 2026',
    description: 'Self-certification, who issues fit notes, adjustments, digital fit notes, SSP, and managing long-term sickness.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Fit Notes (Statement of Fitness for Work): Complete UK Employer Guide',
  description: 'Everything UK employers need to know about fit notes, self-certification, adjustments, and managing sickness absence.',
  url: articleUrl,
  datePublished: '2026-03-25',
  dateModified: '2026-03-25',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function FitNotesEmployerGuideArticle() {
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
            <span className="text-xs text-gray-400 ml-3">9 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Fit Notes (Statement of Fitness for Work): Complete UK Employer Guide
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              If you manage people in the UK, you&apos;ll deal with fit notes sooner or later. Whether it&apos;s a week-long cold or months of long-term sickness, understanding how fit notes work &mdash; and what your obligations are as an employer &mdash; is essential. This guide covers everything from self-certification to digital fit notes, adjustments, SSP, and dismissal considerations.
            </p>

            <h2>What is a fit note?</h2>
            <p>
              A <strong>fit note</strong> &mdash; formally called a <strong>Statement of Fitness for Work</strong> &mdash; is a medical document issued by a healthcare professional that advises whether an employee is fit or unfit for work. Fit notes replaced the old &quot;sick note&quot; system in April 2010.
            </p>
            <p>
              The key change was philosophical. Under the old system, a doctor simply declared someone &quot;sick&quot; and off work. The fit note system shifted the focus to what an employee <strong>can</strong> do, not just what they can&apos;t. This was designed to reduce the number of people stuck on long-term sickness absence when they could have returned to work with reasonable adjustments.
            </p>
            <p>
              Fit notes are used across the UK &mdash; England, Scotland, Wales, and Northern Ireland &mdash; and apply to all employees regardless of contract type, hours worked, or length of service.
            </p>

            <h2>When is a fit note needed?</h2>
            <p>
              An employee only needs a fit note after <strong>7 consecutive calendar days</strong> of sickness absence. This includes weekends, bank holidays, and any days they wouldn&apos;t normally work. The 7-day count starts from the first day of illness, not the first working day missed.
            </p>
            <p>
              For absences of 7 days or fewer, employees <strong>self-certify</strong> their absence. No doctor&apos;s note is required. Most employers ask employees to complete a self-certification form on their return, recording the dates of absence and the reason for sickness.
            </p>
            <p>
              <strong>Important:</strong> You cannot require an employee to provide a fit note for absences of 7 days or fewer. While you can ask them to fill in a self-certification form, insisting on a GP appointment for a short absence is unreasonable and could put unnecessary pressure on both the employee and the NHS.
            </p>

            <h2>Self-certification: the first 7 days</h2>
            <p>
              During the first 7 calendar days of sickness, the employee self-certifies. In practice, this means:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>The employee notifies you of their absence</strong> following your sickness reporting procedure (phone call, text, email &mdash; whatever your policy states).</li>
              <li><strong>On their return</strong>, they complete a self-certification form (sometimes called an SC2 form) confirming the dates and reason for absence.</li>
              <li><strong>You record the absence</strong> in your HR system or absence tracker.</li>
            </ul>
            <p>
              Self-certification doesn&apos;t require any medical evidence. The employee simply states the reason for their absence in their own words. If you suspect abuse &mdash; for example, repeated Monday absences &mdash; the appropriate response is a return-to-work interview and absence monitoring, not demanding a doctor&apos;s note.
            </p>

            <h2>Who can issue fit notes?</h2>
            <p>
              Until July 2022, only GPs and hospital doctors could issue fit notes. The rules were expanded significantly, and the following healthcare professionals can now sign a fit note:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>GPs</strong> (general practitioners)</li>
              <li><strong>Hospital doctors</strong></li>
              <li><strong>Registered nurses</strong></li>
              <li><strong>Occupational therapists</strong></li>
              <li><strong>Pharmacists</strong></li>
              <li><strong>Physiotherapists</strong></li>
            </ul>
            <p>
              This expansion was introduced to reduce pressure on GPs, who were spending a significant portion of their time issuing fit notes. It also means employees can sometimes get a fit note faster &mdash; for example, a physiotherapist treating a musculoskeletal condition can issue one directly without the employee needing a separate GP appointment.
            </p>
            <p>
              <strong>Note:</strong> The healthcare professional must be involved in the patient&apos;s care. A random pharmacist cannot issue a fit note for a condition they haven&apos;t assessed.
            </p>

            <h2>The two fit note options</h2>
            <p>
              A fit note can only contain one of two assessments:
            </p>

            <h3>1. &quot;Not fit for work&quot;</h3>
            <p>
              This means the healthcare professional advises that the employee should not work at all during the period stated on the fit note. As an employer, you should treat this as medical advice that the employee cannot attend work. The employee remains off sick, and SSP continues to apply if they&apos;re eligible.
            </p>

            <h3>2. &quot;May be fit for work&quot; with adjustments</h3>
            <p>
              This is where the fit note system really differs from the old sick note. The healthcare professional is saying the employee <strong>could</strong> return to work if certain adjustments are made. This doesn&apos;t mean the employee must return &mdash; it means you should have a conversation about whether the suggested adjustments are feasible.
            </p>
            <p>
              If you <strong>can</strong> accommodate the adjustments, the employee returns to work under the modified arrangements. If you <strong>cannot</strong> accommodate them, the fit note is treated as a &quot;not fit for work&quot; note, and the employee stays off sick.
            </p>

            <h2>The 4 types of adjustments</h2>
            <p>
              When a fit note says &quot;may be fit for work,&quot; the healthcare professional will recommend one or more of these four adjustments:
            </p>

            <h3>1. Phased return to work</h3>
            <p>
              A gradual increase in working hours or days over a set period. For example, the employee might start with 3 days a week for the first fortnight, then move to 4 days, then back to full-time. This is common after operations, mental health conditions, or long-term illness. See our detailed guide on <Link href="/blog/phased-return-to-work-uk" className="text-emerald-600 hover:underline font-medium">phased returns to work</Link>.
            </p>

            <h3>2. Amended duties</h3>
            <p>
              Temporarily changing the employee&apos;s responsibilities to avoid tasks that would aggravate their condition. For example, removing heavy lifting for someone recovering from back surgery, or reducing client-facing work for someone with anxiety.
            </p>

            <h3>3. Altered hours</h3>
            <p>
              Changing the employee&apos;s working hours rather than their total days. This might mean starting later, finishing earlier, or avoiding shift patterns that conflict with medication schedules. It could also mean moving from night shifts to day shifts temporarily.
            </p>

            <h3>4. Workplace adaptations</h3>
            <p>
              Physical or environmental changes to the workplace. Examples include providing an ergonomic chair for back problems, moving a desk to a quieter area for someone with concentration difficulties, allowing remote working, or installing a screen reader for visual impairment.
            </p>

            <h2>What employers MUST do with a &quot;may be fit&quot; note</h2>
            <p>
              When you receive a fit note with adjustments, you have legal obligations:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Discuss the adjustments with the employee.</strong> Have an open conversation about what the healthcare professional has recommended and whether you can make it work.</li>
              <li><strong>Genuinely consider whether the adjustments are feasible.</strong> You cannot simply reject them without proper consideration.</li>
              <li><strong>Make reasonable adjustments where possible.</strong> Under the <strong>Equality Act 2010</strong>, if the employee&apos;s condition amounts to a disability, you have a legal duty to make reasonable adjustments. Failing to do so is discrimination.</li>
              <li><strong>Document your decision.</strong> Whether you accommodate the adjustments or not, record your reasoning. If you later face a tribunal claim, this evidence is crucial.</li>
              <li><strong>If you can&apos;t accommodate the adjustments</strong>, explain why to the employee and treat the fit note as &quot;not fit for work.&quot; The employee remains on sick leave.</li>
            </ol>
            <p>
              <strong>Equality Act 2010 warning:</strong> A condition counts as a disability if it has a substantial and long-term adverse effect on the person&apos;s ability to carry out normal day-to-day activities. &quot;Long-term&quot; means 12 months or more, or likely to last that long. Many conditions you might not immediately think of as disabilities &mdash; depression, anxiety, diabetes, cancer, MS &mdash; are covered. If in doubt, treat the condition as a disability and make adjustments.
            </p>

            <h2>What if you disagree with a fit note?</h2>
            <p>
              Employers sometimes feel a fit note doesn&apos;t reflect reality &mdash; perhaps the employee seems well enough to work, or the recommended adjustments seem excessive. Here&apos;s what you can and cannot do:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>You cannot override a fit note.</strong> It is medical advice. You cannot force an employee to return to work if their fit note says &quot;not fit for work.&quot;</li>
              <li><strong>You can request a second opinion.</strong> You can ask the employee to see an occupational health professional at your expense. Their report may provide more detailed, work-specific advice.</li>
              <li><strong>You can ask the employee&apos;s consent to contact their GP.</strong> With the employee&apos;s written permission, you can write to their healthcare professional for clarification. However, the GP is under no obligation to change their assessment.</li>
              <li><strong>You can use your own occupational health service.</strong> An occupational health assessment can give you a more detailed view of the employee&apos;s capabilities and likely return date.</li>
            </ul>
            <p>
              <strong>Never</strong> pressure an employee to return to work against medical advice. This could result in a personal injury claim if their condition worsens, as well as potential tribunal claims for disability discrimination.
            </p>

            <h2>Digital fit notes</h2>
            <p>
              Since April 2022, fit notes have been issued digitally rather than on paper. Here&apos;s how the new system works:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>The healthcare professional creates the fit note electronically</strong> using their clinical system (e.g., EMIS, SystmOne, or hospital software).</li>
              <li><strong>The patient receives it digitally</strong> &mdash; typically via the NHS App, email, or as a printed copy from the practice.</li>
              <li><strong>Digital fit notes are legally valid</strong> without a wet signature. They contain a unique identification number that employers can use for verification.</li>
              <li><strong>Employees can forward the digital fit note</strong> to their employer by email, upload it to an HR system, or provide a printed copy.</li>
            </ul>
            <p>
              The shift to digital fit notes has several advantages for employers: they&apos;re harder to forge, easier to store, and can be uploaded directly into absence management software like <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link>.
            </p>
            <p>
              <strong>Practical tip:</strong> Update your sickness absence policy to reflect digital fit notes. Specify how employees should submit them (email, HR portal upload, etc.) and confirm that digital copies are accepted without needing a paper original.
            </p>

            <h2>Fit notes and Statutory Sick Pay (SSP)</h2>
            <p>
              Fit notes and SSP are closely connected but serve different purposes. A fit note is medical evidence of incapacity; SSP is the statutory payment during sickness absence.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Days 1&ndash;3:</strong> These are &quot;waiting days&quot; &mdash; SSP is not payable. The employee self-certifies.</li>
              <li><strong>Days 4&ndash;7:</strong> SSP becomes payable (if the employee earns at least &pound;123/week). The employee still self-certifies.</li>
              <li><strong>Day 8 onwards:</strong> SSP continues, but the employee now needs a fit note as medical evidence.</li>
            </ul>
            <p>
              The current SSP rate is <strong>&pound;116.75 per week</strong> (2025/26 tax year). SSP is paid for up to 28 weeks. After that, the employee may be able to claim Employment and Support Allowance (ESA) from the DWP.
            </p>
            <p>
              <strong>Key point:</strong> You need a fit note to continue paying SSP beyond 7 days. If an employee doesn&apos;t provide one, you can stop SSP &mdash; but you should give them reasonable time to obtain one and document your communications.
            </p>

            <h2>Can you dismiss someone who keeps getting fit notes?</h2>
            <p>
              This is one of the most difficult situations for UK employers. An employee who is repeatedly or continuously absent with fit notes is still protected by employment law. However, dismissal for long-term sickness <strong>is</strong> possible if you follow the correct procedure.
            </p>

            <h3>Capability procedure for long-term sickness</h3>
            <ol className="list-decimal pl-6">
              <li><strong>Maintain regular contact.</strong> Keep in touch with the employee throughout their absence. Agree a frequency (e.g., fortnightly calls) that works for both parties.</li>
              <li><strong>Obtain medical evidence.</strong> Refer the employee to occupational health to get a professional assessment of their condition, likely return date, and any adjustments that could help.</li>
              <li><strong>Consider reasonable adjustments.</strong> Have you explored phased returns, amended duties, altered hours, or workplace adaptations? Document everything you&apos;ve tried or considered.</li>
              <li><strong>Hold a formal meeting.</strong> If the absence continues and the medical evidence suggests the employee is unlikely to return in a reasonable timeframe, invite them to a formal capability meeting. They have the right to be accompanied.</li>
              <li><strong>Make a decision.</strong> Consider the medical evidence, the employee&apos;s length of service, the impact on the business, whether a return is likely, and whether you&apos;ve exhausted all adjustments.</li>
              <li><strong>Offer an appeal.</strong> If you decide to dismiss, the employee must have the right to appeal.</li>
            </ol>
            <p>
              <strong>Unfair dismissal risk:</strong> Dismissing someone on long-term sick leave without following a fair procedure is likely to be found unfair at tribunal. If the condition is a disability under the Equality Act, it could also be discriminatory &mdash; which has <strong>no cap on compensation</strong>.
            </p>

            <h3>Frequent short-term absences</h3>
            <p>
              Repeated short-term absences are handled differently from a single long-term absence. Typically:
            </p>
            <ul className="list-disc pl-6">
              <li>Use absence monitoring tools like the <Link href="/blog/bradford-factor-explained" className="text-emerald-600 hover:underline font-medium">Bradford Factor</Link> to identify patterns.</li>
              <li>Hold <Link href="/blog/return-to-work-interview-questions" className="text-emerald-600 hover:underline font-medium">return-to-work interviews</Link> after every absence.</li>
              <li>Investigate underlying causes &mdash; workplace stress, disability, caring responsibilities.</li>
              <li>Follow your absence management policy&apos;s trigger points and escalation process.</li>
              <li>Consider occupational health referral if there&apos;s a pattern or suspected underlying condition.</li>
            </ul>

            <h2>Record-keeping: storing fit notes and GDPR</h2>
            <p>
              Fit notes contain sensitive health data, which is a <strong>special category</strong> under UK GDPR. You must handle them carefully:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Lawful basis:</strong> You can process fit note data under &quot;employment obligations&quot; (Article 6(1)(b) and Article 9(2)(b) of UK GDPR). You need this data to manage sickness absence, calculate SSP, and meet your legal obligations.</li>
              <li><strong>Storage:</strong> Keep fit notes securely &mdash; digitally in an access-controlled system, or physically in a locked cabinet. Only authorised personnel (HR, line managers with a need to know) should have access.</li>
              <li><strong>Retention:</strong> There&apos;s no single rule, but HMRC recommends keeping SSP records for at least 3 years. Many employers keep absence records for 6 years (the limitation period for most civil claims). Longer retention may be justified for pension or injury claims.</li>
              <li><strong>Data minimisation:</strong> Only record what you need. You don&apos;t need to share the specific medical condition with everyone &mdash; a line manager may only need to know &quot;off sick, expected back on [date]&quot; rather than the diagnosis.</li>
              <li><strong>Employee access:</strong> Under UK GDPR, employees have the right to access their personal data, including copies of fit notes you hold. You must respond to subject access requests within one month.</li>
            </ul>

            <h2>Common fit note mistakes employers make</h2>
            <ul className="list-disc pl-6">
              <li><strong>Demanding a fit note before 7 days.</strong> You cannot require medical evidence for absences of 7 calendar days or fewer.</li>
              <li><strong>Ignoring &quot;may be fit&quot; recommendations.</strong> If a fit note suggests adjustments, you must genuinely consider them &mdash; especially if the condition is a disability.</li>
              <li><strong>Treating fit notes as absolute.</strong> A &quot;may be fit&quot; note is an invitation to discuss adjustments, not a guarantee the employee will return.</li>
              <li><strong>Not recording fit note details.</strong> Every fit note should be logged with dates, assessment type, recommended adjustments, and your response.</li>
              <li><strong>Storing fit notes insecurely.</strong> Leaving paper fit notes on desks or in unlocked drawers breaches GDPR. Use a secure digital system.</li>
              <li><strong>Forgetting to update your policy for digital fit notes.</strong> Since 2022, fit notes are digital by default. Make sure your absence policy reflects this.</li>
            </ul>

            <h2>Fit note vs sick note: what changed?</h2>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Old &quot;sick note&quot; (pre-2010)</th>
                  <th>Fit note (2010 onwards)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Binary: &quot;sick&quot; or &quot;not sick&quot;</td><td>Two options: &quot;not fit&quot; or &quot;may be fit with adjustments&quot;</td></tr>
                <tr><td>Focus on incapacity</td><td>Focus on what the employee can do</td></tr>
                <tr><td>Paper only</td><td>Digital by default since 2022</td></tr>
                <tr><td>GPs and hospital doctors only</td><td>GPs, nurses, pharmacists, physiotherapists, occupational therapists</td></tr>
                <tr><td>No adjustment recommendations</td><td>4 specific adjustment types recommended</td></tr>
                <tr><td>Wet signature required</td><td>Electronic signature valid</td></tr>
              </tbody>
            </table>

            <h2>How Leavely helps track fit notes alongside absence records</h2>
            <p>
              Managing fit notes manually &mdash; paper copies in filing cabinets, Excel spreadsheets, or email threads &mdash; creates gaps, security risks, and missed follow-ups. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> brings everything together:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Absence tracking with fit note integration</strong> &mdash; log fit notes directly against each sickness absence record, including dates, assessment type, and recommended adjustments.</li>
              <li><strong>Automatic Bradford Factor calculation</strong> &mdash; scores are calculated from your absence data in real-time, highlighting patterns before they become problems.</li>
              <li><strong>Return-to-work forms</strong> &mdash; built-in digital RTW interviews that attach to each absence, creating a complete audit trail.</li>
              <li><strong>Secure storage</strong> &mdash; all health data stored securely with role-based access controls, helping you meet GDPR requirements.</li>
              <li><strong>Manager notifications</strong> &mdash; automatic alerts when sickness absence is reported, so nothing falls through the cracks.</li>
              <li><strong>Reporting and analytics</strong> &mdash; spot trends across teams, departments, or the whole organisation to inform your absence management strategy.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Track fit notes and sickness absence in one place</h3>
            <p className="text-emerald-100 mb-6">Leavely handles absence tracking, fit note records, Bradford Factor, and return-to-work interviews &mdash; all in one platform.</p>
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
              <Link href="/blog/statutory-sick-pay-uk" className="block text-emerald-600 hover:underline font-medium">Statutory Sick Pay UK: Rates, Rules &amp; Employer Guide &rarr;</Link>
              <Link href="/blog/return-to-work-interview-questions" className="block text-emerald-600 hover:underline font-medium">Return-to-Work Interview Questions: Free Template for UK Employers &rarr;</Link>
              <Link href="/blog/phased-return-to-work-uk" className="block text-emerald-600 hover:underline font-medium">Phased Return to Work UK: How to Manage It Properly &rarr;</Link>
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">Bradford Factor Explained: How to Calculate and Use It &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
