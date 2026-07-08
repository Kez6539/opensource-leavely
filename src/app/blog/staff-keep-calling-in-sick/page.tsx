import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/staff-keep-calling-in-sick`

export const metadata: Metadata = {
  title: "Staff Keep Calling in Sick? Here's What to Do (UK Employer Guide)",
  description:
    'Practical steps for UK employers dealing with employees who are frequently off sick. Covers Bradford Factor, trigger points, return-to-work interviews, occupational health, and formal action.',
  alternates: { canonical: articleUrl },
  keywords: [
    'staff calling in sick',
    'employees always off sick',
    'persistent short term absence',
    'staff sickness problem',
    'employee always off sick UK',
    'frequent sickness absence UK',
    'managing staff sickness',
  ],
  openGraph: {
    title: "Staff Keep Calling in Sick? Here's What to Do",
    description: 'A practical guide for UK employers dealing with persistent short term absence.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "Staff Keep Calling in Sick? Here's What to Do (UK Employer Guide)",
  description: 'Practical steps for UK employers dealing with frequent staff sickness.',
  url: articleUrl,
  datePublished: '2026-04-04',
  dateModified: '2026-04-04',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function StaffCallingSickArticle() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Absence Management</span>
            <span className="text-xs text-gray-400 ml-3">9 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Staff Keep Calling in Sick? Here&apos;s What to Do (UK Employer Guide)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Every manager has experienced it. The Monday morning phone call, the vague &quot;not feeling well&quot; text, the pattern you can see but cannot quite prove. Persistent short term absence is one of the most frustrating problems for UK employers, and most small businesses handle it badly. They either ignore it until it becomes unbearable, or overreact and end up at an employment tribunal. This guide walks you through a fair, legal, and effective approach.
            </p>

            <h2>Step 1: Get the data</h2>
            <p>
              Before you do anything, you need facts. Gut feelings and frustration are not enough to take action. Start by pulling together:
            </p>
            <ul className="list-disc pl-6">
              <li>The total number of absence days for the employee over the last 12 months</li>
              <li>The number of separate absence spells (this matters more than total days)</li>
              <li>The reasons given for each absence</li>
              <li>Any day of the week patterns (e.g. Mondays, Fridays, or days after bank holidays)</li>
              <li>The employee&apos;s <Link href="/blog/bradford-factor-explained" className="text-emerald-600 hover:underline font-medium">Bradford Factor score</Link></li>
            </ul>
            <p>
              The Bradford Factor is particularly useful here because it weights frequent, short absences more heavily than occasional longer absences. An employee with 6 single day absences in a year scores 216 (6 &times; 6 &times; 6), while an employee who took one block of 6 days scores just 6 (1 &times; 1 &times; 6). This reflects the reality that many short absences are far more disruptive.
            </p>

            <h2>Step 2: Set clear trigger points</h2>
            <p>
              Your <Link href="/blog/absence-management-policy-uk" className="text-emerald-600 hover:underline font-medium">absence management policy</Link> should define trigger points that prompt action. Common examples:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>3 or more absence spells</strong> in a rolling 12 month period</li>
              <li><strong>8 or more total days absent</strong> in a rolling 12 month period</li>
              <li><strong>Bradford Factor score above 200</strong></li>
              <li><strong>Any identifiable pattern</strong> (e.g. always absent on Mondays or after holidays)</li>
            </ul>
            <p>
              The specific numbers are less important than having them written down and applying them consistently. If you only enforce triggers for some employees and not others, you are exposed to discrimination claims.
            </p>

            <h2>Step 3: Conduct return to work interviews every time</h2>
            <p>
              <Link href="/blog/return-to-work-interview-questions" className="text-emerald-600 hover:underline font-medium">Return to work interviews</Link> are the single most effective tool for reducing casual absence. They should happen after every absence, for every employee, without exception.
            </p>
            <p>
              The interview serves multiple purposes:
            </p>
            <ul className="list-disc pl-6">
              <li>It shows the employee that their absence has been noticed</li>
              <li>It allows you to update your records with the correct reason</li>
              <li>It gives you a chance to ask whether anything at work is contributing</li>
              <li>It provides documentation if you need to take formal action later</li>
            </ul>
            <p>
              Keep the tone supportive but factual. &quot;Welcome back. Can you tell me about your absence?&quot; is enough to start the conversation.
            </p>

            <h2>Step 4: Have an informal conversation when triggers are hit</h2>
            <p>
              When an employee hits a trigger point, invite them for an informal meeting. This is not a disciplinary meeting. It is a welfare and attendance discussion. Cover the following:
            </p>
            <ol className="list-decimal pl-6">
              <li>Share the data: &quot;You&apos;ve had X absence spells totalling Y days in the last 12 months. Your Bradford Factor score is Z.&quot;</li>
              <li>Ask if there is an underlying reason (health condition, personal problems, workplace issues)</li>
              <li>Explain the impact on the team and the business</li>
              <li>Discuss any support you can offer (flexible hours, occupational health referral, Employee Assistance Programme)</li>
              <li>Set a clear expectation for improvement and a review date (typically 3 months)</li>
              <li>Confirm the conversation in writing</li>
            </ol>

            <h2>Step 5: Consider occupational health</h2>
            <p>
              If the employee says their absence is related to a health condition, consider an occupational health referral. This is especially important if the condition could be a disability under the Equality Act 2010 (which includes conditions like depression, anxiety, IBS, or chronic pain).
            </p>
            <p>
              An occupational health assessment will tell you:
            </p>
            <ul className="list-disc pl-6">
              <li>Whether the employee has an underlying medical condition</li>
              <li>Whether their absence level is likely to improve</li>
              <li>What reasonable adjustments the employer could make</li>
              <li>Whether the condition is likely to be considered a disability</li>
            </ul>
            <p>
              Acting on occupational health advice protects you legally and shows that you are being reasonable.
            </p>

            <h2>Step 6: Move to formal action if needed</h2>
            <p>
              If absence does not improve after informal management, you may need to move to the formal stages of your absence management policy. A typical structure is:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Stage 1: First written warning</strong> with targets for improvement over 3 to 6 months</li>
              <li><strong>Stage 2: Final written warning</strong> if absence continues, with a further review period</li>
              <li><strong>Stage 3: Dismissal</strong> on capability grounds if there is no sustained improvement</li>
            </ol>
            <p>
              At every stage, the employee should have the right to be accompanied (by a colleague or trade union representative), and you should be offering support alongside the formal process.
            </p>
            <p>
              <strong>Important:</strong> dismissing for sickness absence is a capability dismissal, not a conduct dismissal. The ACAS Code of Practice on disciplinary and grievance does not strictly apply, but following a fair procedure is still essential to defend any unfair dismissal claim.
            </p>

            <h2>What NOT to do</h2>
            <ul className="list-disc pl-6">
              <li><strong>Do not ignore it.</strong> Hoping it will improve on its own rarely works, and it demoralises the rest of the team.</li>
              <li><strong>Do not make assumptions.</strong> &quot;They&apos;re clearly pulling sickies&quot; might be right, but it might not. Follow the process and let the evidence guide you.</li>
              <li><strong>Do not treat disability related absence the same as general sickness.</strong> If someone has a disability, you must make <Link href="/blog/disability-leave-adjustments-uk" className="text-emerald-600 hover:underline font-medium">reasonable adjustments</Link>, which may include discounting some absence from your trigger calculations.</li>
              <li><strong>Do not skip steps.</strong> Going straight to a final warning because you are frustrated will backfire at a tribunal.</li>
              <li><strong>Do not apply policies inconsistently.</strong> If one employee gets a warning at 3 spells and another gets away with 6, you are vulnerable to discrimination claims.</li>
            </ul>

            <h2>How Leavely flags absence patterns automatically</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> takes the guesswork out of managing persistent absence:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Automatic Bradford Factor</strong> scores updated with every absence record</li>
              <li><strong>Trigger alerts</strong> when an employee crosses your defined thresholds</li>
              <li><strong>Absence history</strong> for each employee with dates, reasons, and duration</li>
              <li><strong>Pattern spotting</strong> that highlights day of the week trends</li>
              <li><strong>Full audit trail</strong> for every absence event, ideal for formal proceedings</li>
            </ul>
            <p>
              When absence is tracked properly, the difficult conversations become easier because the data speaks for itself.
            </p>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Spot absence patterns before they become problems</h3>
            <p className="text-emerald-100 mb-6">Leavely tracks Bradford Factor scores, flags triggers, and gives you a full audit trail for every absence.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">Bradford Factor Explained: How to Calculate and Use It &rarr;</Link>
              <Link href="/blog/how-to-reduce-absenteeism-uk" className="block text-emerald-600 hover:underline font-medium">How to Reduce Absenteeism in the Workplace UK &rarr;</Link>
              <Link href="/blog/absence-management-policy-uk" className="block text-emerald-600 hover:underline font-medium">Absence Management Policy UK: Complete Guide &amp; Template &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
