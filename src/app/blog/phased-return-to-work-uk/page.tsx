import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/phased-return-to-work-uk`

export const metadata: Metadata = {
  title: 'Phased Return to Work UK: How to Manage It Properly',
  description:
    'Complete guide to managing a phased return to work in the UK. Covers fit notes, reasonable adjustments, pay during phased returns, sample plans, and employer obligations under the Equality Act.',
  alternates: { canonical: articleUrl },
  keywords: [
    'phased return to work UK',
    'phased return to work after illness',
    'phased return to work plan',
    'gradual return to work',
    'fit note phased return',
    'reasonable adjustments return to work',
  ],
  openGraph: {
    title: 'Phased Return to Work UK — How to Manage It Properly',
    description: 'Fit notes, reasonable adjustments, pay, sample plans, and employer obligations for phased returns to work.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Phased Return to Work UK: How to Manage It Properly',
  description: 'Complete guide to managing a phased return to work in the UK.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function PhasedReturnToWorkArticle() {
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
            <span className="text-xs text-gray-400 ml-3">7 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Phased Return to Work UK: How to Manage It Properly
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              When an employee has been off work for weeks or months due to illness, surgery, or a mental health condition, jumping straight back to full-time hours rarely works. A phased return to work gives them time to rebuild capacity gradually &mdash; and gives you a structured way to support them. This guide covers what a phased return involves, when it&apos;s appropriate, how to handle pay, and how to create a plan that works.
            </p>

            <h2>What is a phased return to work?</h2>
            <p>
              A <strong>phased return to work</strong> is a gradual reintroduction to the workplace after a period of absence. Instead of returning to full hours and full duties immediately, the employee works reduced hours, lighter duties, or both &mdash; increasing gradually over a set period until they&apos;re back to their normal working pattern.
            </p>
            <p>
              A typical phased return lasts between 2 and 6 weeks, though it can be longer depending on the circumstances. The key principle is that it&apos;s planned, time-limited, and reviewed regularly.
            </p>

            <h2>When is a phased return appropriate?</h2>
            <p>
              A phased return is commonly used after:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Long-term sickness absence</strong> &mdash; any absence lasting 4 weeks or more.</li>
              <li><strong>Surgery or serious injury</strong> &mdash; where physical capacity is reduced during recovery.</li>
              <li><strong>Mental health conditions</strong> &mdash; such as stress, anxiety, depression, or burnout.</li>
              <li><strong>Disability-related absence</strong> &mdash; where the Equality Act 2010 may require reasonable adjustments.</li>
              <li><strong>Cancer treatment or chronic illness</strong> &mdash; where ongoing treatment affects energy and concentration.</li>
              <li><strong>Pregnancy-related illness</strong> &mdash; where the employee returns before or after maternity leave.</li>
            </ul>
            <p>
              Not every absence requires a phased return. For short-term sickness (a few days with flu, for example), a normal return-to-work interview is usually sufficient.
            </p>

            <h2>The GP fit note and phased returns</h2>
            <p>
              A GP or hospital doctor can recommend a phased return on a <strong>fit note</strong> (previously called a sick note). Since 2010, fit notes have included a &quot;may be fit for work taking account of the following advice&quot; option, which allows the doctor to suggest:
            </p>
            <ul className="list-disc pl-6">
              <li>A phased return to work.</li>
              <li>Altered hours.</li>
              <li>Amended duties.</li>
              <li>Workplace adaptations.</li>
            </ul>
            <p>
              If a fit note recommends a phased return, you should <strong>consider it seriously</strong>. You&apos;re not legally obliged to follow every recommendation on a fit note, but ignoring it without good reason could expose you to claims &mdash; particularly if the employee has a disability under the Equality Act.
            </p>
            <p>
              If you genuinely cannot accommodate the suggested adjustments (e.g., the role cannot be done part-time), you should discuss alternatives with the employee and document your reasoning.
            </p>

            <h2>Is there a legal right to a phased return?</h2>
            <p>
              There is <strong>no general legal right</strong> to a phased return to work in the UK. However, the Equality Act 2010 changes the picture significantly for employees with a disability.
            </p>
            <p>
              Under the Equality Act, employers have a duty to make <strong>reasonable adjustments</strong> for employees with a disability (a physical or mental impairment that has a substantial and long-term adverse effect on their ability to carry out normal day-to-day activities). A phased return can be a reasonable adjustment.
            </p>
            <p>
              &quot;Long-term&quot; means the condition has lasted, or is likely to last, 12 months or more. Conditions such as cancer, HIV, and multiple sclerosis are automatically treated as disabilities from the point of diagnosis.
            </p>
            <p>
              Even where the Equality Act doesn&apos;t apply, refusing a phased return without good reason is poor practice. Tribunals often look unfavourably on employers who push people back too quickly and then dismiss them for poor performance or further absence.
            </p>

            <h2>Creating a phased return to work plan</h2>
            <p>
              A good plan is written, agreed by both parties, and reviewed regularly. It should include:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Start date and expected duration</strong> &mdash; typically 2&ndash;6 weeks, with a target date for full return.</li>
              <li><strong>Working hours for each phase</strong> &mdash; a week-by-week schedule showing the gradual increase.</li>
              <li><strong>Duties</strong> &mdash; any tasks that are temporarily modified, removed, or reassigned.</li>
              <li><strong>Review dates</strong> &mdash; scheduled check-ins (usually weekly) to assess progress.</li>
              <li><strong>Who the employee reports to</strong> &mdash; and who to contact if they&apos;re struggling.</li>
              <li><strong>Pay arrangements</strong> &mdash; whether full pay, pro-rata, or SSP applies during the phased period.</li>
              <li><strong>What happens if the plan isn&apos;t working</strong> &mdash; options for extending, adjusting, or considering alternatives.</li>
            </ol>

            <h3>Example phased return schedule</h3>
            <div className="rounded-xl bg-gray-50 border p-6 my-6 text-sm">
              <p className="font-bold text-gray-900 mb-4 text-base">4-Week Phased Return Plan</p>
              <div className="overflow-x-auto [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600">
                <table>
                  <thead>
                    <tr>
                      <th>Week</th>
                      <th>Hours</th>
                      <th>Pattern</th>
                      <th>Duties</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Week 1</td>
                      <td>50% (18.5 hrs)</td>
                      <td>Mon&ndash;Wed mornings</td>
                      <td>Light duties, no client-facing work</td>
                    </tr>
                    <tr>
                      <td>Week 2</td>
                      <td>60% (22 hrs)</td>
                      <td>Mon&ndash;Thu, shorter days</td>
                      <td>Normal duties, limited meetings</td>
                    </tr>
                    <tr>
                      <td>Week 3</td>
                      <td>80% (30 hrs)</td>
                      <td>Mon&ndash;Fri, shorter days</td>
                      <td>Full duties, reduced workload</td>
                    </tr>
                    <tr>
                      <td>Week 4</td>
                      <td>100% (37.5 hrs)</td>
                      <td>Normal pattern</td>
                      <td>Full duties</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h2>Pay during a phased return</h2>
            <p>
              This is one of the most common questions &mdash; and the answer depends on your contract and policy. There are three main approaches:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Full pay for the phased period</strong> &mdash; the employee receives their normal salary even though they&apos;re working reduced hours. This is the most supportive approach and is common in larger organisations or where the phased return is short (2&ndash;3 weeks).</li>
              <li><strong>Pro-rata pay</strong> &mdash; the employee is paid only for the hours they actually work. If they work 50% of their normal hours in week one, they receive 50% of their salary for that week.</li>
              <li><strong>SSP for non-worked hours</strong> &mdash; some employers pay the employee their normal rate for hours worked and SSP for the hours they would normally have worked but didn&apos;t. This only applies if the employee is still within their SSP entitlement period (28 qualifying weeks).</li>
            </ul>
            <p>
              Check your employment contracts and sickness absence policy. If they&apos;re silent on phased return pay, you have flexibility &mdash; but be consistent across the organisation. Whatever you decide, confirm it in writing before the phased return begins.
            </p>

            <h2>Monitoring progress during a phased return</h2>
            <p>
              Regular check-ins are essential. At each review, discuss:
            </p>
            <ul className="list-disc pl-6">
              <li>How the employee is feeling physically and mentally.</li>
              <li>Whether the current hours and duties feel manageable.</li>
              <li>Any concerns about increasing hours in the next phase.</li>
              <li>Whether any further adjustments are needed (equipment, workspace, workload).</li>
              <li>Whether the plan is on track or needs extending.</li>
            </ul>
            <p>
              Document these conversations. If the situation later results in a capability process or dismissal, a clear record of the support you provided is crucial evidence.
            </p>

            <h2>What if the employee can&apos;t return to full duties?</h2>
            <p>
              Sometimes a phased return reveals that the employee cannot sustain full hours or full duties in their current role. At this point, you should:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Extend the phased return</strong> &mdash; if there&apos;s a reasonable prospect of further improvement, give them more time.</li>
              <li><strong>Consider permanent adjustments</strong> &mdash; reduced hours, amended duties, or a change of role may be a reasonable adjustment under the Equality Act.</li>
              <li><strong>Seek occupational health advice</strong> &mdash; a referral to an occupational health provider can give you an objective medical view on the employee&apos;s capacity and prognosis.</li>
              <li><strong>Explore redeployment</strong> &mdash; if the employee cannot do their current role, consider whether there&apos;s a suitable alternative role available.</li>
              <li><strong>Capability process</strong> &mdash; as a last resort, if no adjustments can make the role workable and no alternative role exists, you may need to follow a fair capability process. Always take legal advice before dismissing an employee on health grounds.</li>
            </ol>

            <h2>Common mistakes to avoid</h2>
            <ul className="list-disc pl-6">
              <li><strong>No written plan</strong> &mdash; verbal agreements lead to misunderstandings. Always put the plan in writing.</li>
              <li><strong>Rushing the timeline</strong> &mdash; pushing someone back to full hours too quickly often leads to another absence.</li>
              <li><strong>Ignoring the fit note</strong> &mdash; if a GP recommends a phased return, take it seriously.</li>
              <li><strong>Inconsistent approach</strong> &mdash; offering a phased return to one employee but not another in similar circumstances can lead to discrimination claims.</li>
              <li><strong>Not reviewing</strong> &mdash; a plan without regular reviews is just a piece of paper.</li>
              <li><strong>Forgetting about pay</strong> &mdash; confirm pay arrangements upfront to avoid disputes.</li>
            </ul>

            <h2>How Leavely helps you manage phased returns</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> makes phased returns easier to track and manage:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Adjusted leave balances</strong> &mdash; pro-rata leave allowances automatically for employees on reduced hours during a phased return.</li>
              <li><strong>Absence timeline</strong> &mdash; see the full history of an employee&apos;s absence, including the phased return period, in one place.</li>
              <li><strong>Return-to-work forms</strong> &mdash; digital RTW interview forms capture the conversation and store it against the employee&apos;s record.</li>
              <li><strong>Bradford Factor tracking</strong> &mdash; monitor absence patterns before and after the phased return to spot early warning signs.</li>
              <li><strong>Manager notifications</strong> &mdash; automatic reminders for scheduled review meetings during the phased return.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Track phased returns and absence patterns in one place</h3>
            <p className="text-emerald-100 mb-6">Leavely gives you full visibility of sickness absence, phased returns, and Bradford Factor scores.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/return-to-work-interview-questions" className="block text-emerald-600 hover:underline font-medium">Return-to-Work Interview Questions: Free Template &rarr;</Link>
              <Link href="/blog/sick-leave-policy-uk" className="block text-emerald-600 hover:underline font-medium">Sick Leave Policy UK: What Employers Must Know &rarr;</Link>
              <Link href="/blog/absence-management-policy-uk" className="block text-emerald-600 hover:underline font-medium">Absence Management Policy UK: Complete Guide &rarr;</Link>
              <Link href="/blog/occupational-sick-pay-uk" className="block text-emerald-600 hover:underline font-medium">Occupational Sick Pay UK: What Employers Need to Know &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
