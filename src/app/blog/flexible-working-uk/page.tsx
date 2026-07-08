import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/flexible-working-uk`

export const metadata: Metadata = {
  title: 'Flexible Working UK: Right to Request Guide for Employers (2026)',
  description:
    'Everything UK employers need to know about flexible working requests. Day-one rights, types of flexible working, employer obligations, statutory grounds for refusal, and impact on leave entitlement.',
  alternates: { canonical: articleUrl },
  keywords: [
    'flexible working UK',
    'right to request flexible working',
    'flexible working request',
    'flexible working law UK 2026',
    'Employment Relations Act flexible working',
    'compressed hours UK',
  ],
  openGraph: {
    title: 'Flexible Working UK — Right to Request Guide for Employers (2026)',
    description:
      'Day-one rights, types of flexible working, employer obligations, grounds for refusal, and how flexible working affects annual leave entitlement.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Flexible Working UK: Right to Request Guide for Employers (2026)',
  description:
    'A comprehensive guide to the right to request flexible working in the UK, covering day-one rights, types of arrangements, employer obligations, and impact on leave entitlement.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function FlexibleWorkingArticle() {
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
            <span className="text-xs text-gray-400 ml-3">8 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Flexible Working UK: Right to Request Guide for Employers (2026)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600">

            <p className="text-lg">
              Flexible working is no longer a perk — it&apos;s a statutory right. Since April 2024, every employee in the UK has the right to request flexible working from <strong>day one</strong> of their employment, with no qualifying period. For employers, understanding how to handle these requests fairly and lawfully is essential. This guide covers everything you need to know.
            </p>

            <h2>What changed in April 2024?</h2>
            <p>
              The <strong>Employment Relations (Flexible Working) Act 2023</strong> introduced significant changes to the right to request flexible working. Prior to April 2024, employees needed 26 weeks&apos; continuous service before they could make a request. That qualifying period has been <strong>removed entirely</strong>.
            </p>
            <p>
              The key changes are:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Day-one right:</strong> employees can make a flexible working request from their first day of employment.</li>
              <li><strong>Two requests per year:</strong> employees can now make up to <strong>2 statutory requests</strong> in any 12-month period, up from 1 previously.</li>
              <li><strong>Faster response required:</strong> employers must respond within <strong>2 months</strong> (previously 3 months), including any appeal process.</li>
              <li><strong>Consultation required:</strong> employers must <strong>consult with the employee</strong> before refusing a request. A blanket refusal without discussion is no longer acceptable.</li>
              <li><strong>No business case from employee:</strong> the employee is no longer required to explain the impact of their request on the employer or suggest how it could be managed.</li>
            </ul>

            <h2>Types of flexible working</h2>
            <p>
              Flexible working is not just about working from home. The law covers a wide range of arrangements:
            </p>

            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Arrangement</th>
                  <th>What it means</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Part-time</strong></td>
                  <td>Working fewer hours than the standard full-time contract (e.g., 3 days per week instead of 5).</td>
                </tr>
                <tr>
                  <td><strong>Compressed hours</strong></td>
                  <td>Working the same total hours but over fewer days (e.g., a 4-day week with longer days).</td>
                </tr>
                <tr>
                  <td><strong>Flexitime</strong></td>
                  <td>The employee chooses their start and finish times, usually around core hours (e.g., 10am&ndash;3pm).</td>
                </tr>
                <tr>
                  <td><strong>Job sharing</strong></td>
                  <td>Two employees share the responsibilities of one full-time role.</td>
                </tr>
                <tr>
                  <td><strong>Remote / hybrid</strong></td>
                  <td>Working from home, another location, or a mix of office and remote.</td>
                </tr>
                <tr>
                  <td><strong>Annualised hours</strong></td>
                  <td>Total annual hours are fixed, but the employee works different hours each week depending on demand.</td>
                </tr>
                <tr>
                  <td><strong>Staggered hours</strong></td>
                  <td>Different start, break, and finish times from other employees.</td>
                </tr>
                <tr>
                  <td><strong>Term-time working</strong></td>
                  <td>The employee works only during school terms and takes unpaid leave during school holidays.</td>
                </tr>
              </tbody>
            </table>

            <h2>Employer obligations: how to handle a request</h2>
            <p>
              When an employee submits a statutory flexible working request, employers must follow a clear process:
            </p>
            <ol className="list-decimal pl-6">
              <li>
                <strong>Acknowledge receipt</strong> — confirm you have received the request in writing. There is no statutory deadline for acknowledgement, but best practice is within 5 working days.
              </li>
              <li>
                <strong>Arrange a consultation meeting</strong> — you must discuss the request with the employee before making a decision. This is a new legal requirement since April 2024. The meeting should explore the request in detail, consider alternatives if the exact request cannot be accommodated, and give the employee a fair hearing.
              </li>
              <li>
                <strong>Make a decision within 2 months</strong> — the entire process, including any appeal, must be completed within 2 months of the request date (unless you agree a longer period with the employee).
              </li>
              <li>
                <strong>Communicate the outcome in writing</strong> — if approved, confirm the new working arrangement and the start date. If refused, you must state which of the 8 statutory grounds applies and provide a clear explanation.
              </li>
            </ol>

            <h2>The 8 statutory grounds for refusal</h2>
            <p>
              An employer can only refuse a flexible working request for one or more of these <strong>8 reasons</strong> set out in the Employment Rights Act 1996:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Burden of additional costs</strong> — the change would impose costs the business cannot reasonably absorb.</li>
              <li><strong>Detrimental effect on ability to meet customer demand</strong> — service levels would suffer.</li>
              <li><strong>Inability to reorganise work among existing staff</strong> — the work cannot be redistributed.</li>
              <li><strong>Inability to recruit additional staff</strong> — it is not feasible to hire to cover the gap.</li>
              <li><strong>Detrimental impact on quality</strong> — the quality of output or service would decline.</li>
              <li><strong>Detrimental impact on performance</strong> — business or team performance would be harmed.</li>
              <li><strong>Insufficiency of work during the periods the employee proposes to work</strong> — there is not enough work at the times they want to work.</li>
              <li><strong>Planned structural changes</strong> — the business is planning changes that conflict with the request.</li>
            </ol>
            <p>
              These grounds are deliberately broad, but an employer must be able to <strong>demonstrate</strong> that the ground genuinely applies. A vague or unexplained refusal is likely to fail at tribunal.
            </p>

            <h2>Impact on annual leave entitlement</h2>
            <p>
              When a flexible working request results in a change of hours, the employee&apos;s annual leave entitlement may need to be adjusted <strong>pro rata</strong>. This is one of the most commonly mishandled aspects of flexible working.
            </p>
            <p>
              The statutory minimum of <strong>5.6 weeks</strong> remains the same regardless of hours. However, if the employee moves from 5 days to 3 days per week, they are entitled to 5.6 &times; 3 = <strong>16.8 days</strong> of annual leave (rather than 28 days). Each &quot;day&quot; of leave represents a day they would otherwise have worked.
            </p>
            <p>
              For employees moving to compressed hours (e.g., 4 longer days), the entitlement stays at 5.6 weeks but is expressed in <strong>fewer, longer days</strong>. An employee working 4 &times; 10-hour days gets 5.6 &times; 4 = 22.4 days of leave, but each day is 10 hours.
            </p>
            <p>
              It is critical to recalculate and communicate the new leave entitlement whenever working patterns change. Failure to do so leads to disputes and potential underpayment.
            </p>

            <h2>Common mistakes employers make</h2>
            <ul className="list-disc pl-6">
              <li>
                <strong>Refusing without consulting</strong> — since April 2024, you <em>must</em> hold a consultation meeting before refusing. Skipping this step makes the refusal procedurally unfair.
              </li>
              <li>
                <strong>Missing the 2-month deadline</strong> — if you fail to respond within 2 months, the employee can make a complaint to an employment tribunal.
              </li>
              <li>
                <strong>Using grounds that don&apos;t apply</strong> — citing &quot;burden of additional costs&quot; when the request is simply to change start times (which has no cost impact) will not stand up at tribunal.
              </li>
              <li>
                <strong>Treating requests differently based on reason</strong> — you cannot approve a request for childcare but refuse an identical request for a hobby. The reason the employee wants flexible working is irrelevant.
              </li>
              <li>
                <strong>Forgetting to adjust leave entitlement</strong> — when hours change, leave must be recalculated pro rata. Many employers forget this, leading to incorrect balances.
              </li>
              <li>
                <strong>Not documenting the process</strong> — if a refusal is challenged at tribunal, you need evidence that you consulted, considered alternatives, and applied a valid statutory ground.
              </li>
            </ul>

            <h2>How Leavely adjusts balances when working patterns change</h2>
            <p>
              Recalculating leave entitlement manually every time someone changes their working pattern is time-consuming and error-prone. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> handles this automatically:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Working pattern configuration</strong> — set each employee&apos;s working days (e.g., Monday to Wednesday) and Leavely instantly recalculates their pro-rata leave entitlement.</li>
              <li><strong>Mid-year pattern changes</strong> — if an employee switches from full-time to part-time partway through the year, Leavely calculates a blended entitlement covering both periods.</li>
              <li><strong>Compressed hours support</strong> — configure longer working days and fewer days per week. Leavely adjusts the leave balance so each &quot;day&quot; of leave correctly reflects the employee&apos;s actual working day length.</li>
              <li><strong>Real-time balance updates</strong> — employees and managers see the correct balance immediately after a pattern change, with no manual recalculation required.</li>
              <li><strong>Policy-level rules</strong> — set pro-rata rules at the policy level so they apply consistently across all employees on the same leave type.</li>
              <li><strong>Audit trail</strong> — every pattern change and its impact on leave balances is logged for compliance and dispute resolution.</li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Flexible working changes? Leave balances update automatically</h3>
            <p className="text-emerald-100 mb-6">Leavely recalculates pro-rata entitlement whenever working patterns change. No spreadsheets, no errors. Start your 14-day free trial.</p>
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
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">
                Annual Leave Entitlement UK 2026: The Complete Guide &rarr;
              </Link>
              <Link href="/blog/pro-rata-annual-leave-calculator" className="block text-emerald-600 hover:underline font-medium">
                Pro Rata Annual Leave Calculator: How to Get It Right &rarr;
              </Link>
              <Link href="/blog/part-time-workers-rights-uk" className="block text-emerald-600 hover:underline font-medium">
                Part-Time Workers&apos; Rights UK: Leave, Pay &amp; Employer Obligations &rarr;
              </Link>
              <Link href="/blog/managing-remote-workers-leave" className="block text-emerald-600 hover:underline font-medium">
                Managing Remote Workers&apos; Leave: A Practical Guide &rarr;
              </Link>
              <Link href="/blog/approval-delegation-leave-management" className="block text-emerald-600 hover:underline font-medium">
                Leave Approval Delegation: Keep Approvals Moving When Managers Are Away &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
