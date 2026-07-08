import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/compassionate-leave-uk`

export const metadata: Metadata = {
  title: 'Compassionate Leave UK: Employer Guide (2026)',
  description:
    'Complete guide to compassionate leave and bereavement leave for UK employers. Covers legal rights, typical entitlements, policy templates, and how to handle time off for bereavement sensitively.',
  alternates: { canonical: articleUrl },
  keywords: [
    'compassionate leave UK',
    'bereavement leave UK',
    'compassionate leave entitlement',
    'bereavement leave entitlement UK',
    'compassionate leave policy',
    'time off for bereavement UK',
    'compassionate leave employment law',
    'emergency leave UK',
  ],
  openGraph: {
    title: 'Compassionate Leave UK — Complete Employer Guide 2026',
    description: 'Legal rights, typical entitlements, free policy template, and best practices for compassionate and bereavement leave.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Compassionate Leave UK: Employer Guide',
  description: 'Complete guide to compassionate leave and bereavement leave for UK employers.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function CompassionateLeaveArticle() {
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
            Compassionate Leave UK: Employer Guide
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              When an employee loses a loved one or faces a family emergency, the last thing they should worry about is whether they&apos;re allowed time off. A clear, compassionate leave policy protects your people and your business. This guide covers the legal position, common entitlements, a free policy template, and best practices for UK employers.
            </p>

            <h2>What is compassionate leave?</h2>
            <p>
              <strong>Compassionate leave</strong> (sometimes called bereavement leave) is time off work given to an employee following the death of a close relative or dependant, or in some cases, a serious illness or emergency involving a family member. It allows employees time to grieve, make funeral arrangements, and deal with practical matters without worrying about work.
            </p>
            <p>
              Some employers also extend compassionate leave to cover other difficult life events such as a life-threatening diagnosis of a close family member, a house fire, or a serious accident involving a dependant.
            </p>

            <h2>Is compassionate leave a legal right in the UK?</h2>
            <p>
              There is <strong>no general statutory right</strong> to paid compassionate or bereavement leave in the UK. However, there are two important legal provisions every employer should know:
            </p>

            <h3>1. Time off for dependants (Employment Rights Act 1996)</h3>
            <p>
              Under <strong>Section 57A of the Employment Rights Act 1996</strong>, all employees have the right to take a <strong>reasonable amount of unpaid time off</strong> to deal with emergencies involving a dependant. This includes:
            </p>
            <ul className="list-disc pl-6">
              <li>When a dependant dies.</li>
              <li>When a dependant falls ill, gives birth, or is injured or assaulted.</li>
              <li>To make arrangements for the care of a dependant who is ill or injured.</li>
              <li>To deal with an unexpected disruption to care arrangements (e.g., a childminder failing to turn up).</li>
              <li>To deal with an incident involving a child at school.</li>
            </ul>
            <p>
              A <strong>dependant</strong> is a spouse, civil partner, child, parent, or someone who lives in the same household (not tenants, lodgers, or employees). For illness or injury, it also includes anyone who reasonably relies on the employee for care.
            </p>
            <p>
              Key points: this right is <strong>unpaid</strong>, covers only the time needed to deal with the immediate emergency (typically 1&ndash;2 days), and requires the employee to tell you the reason as soon as reasonably practicable. There is no qualifying period &mdash; it applies from day one of employment.
            </p>

            <h3>2. Parental bereavement leave (Jack&apos;s Law)</h3>
            <p>
              Since April 2020, the <strong>Parental Bereavement (Leave and Pay) Act 2018</strong> (known as Jack&apos;s Law) gives employed parents the right to <strong>2 weeks&apos; leave</strong> following the death of a child under 18 or a stillbirth after 24 weeks of pregnancy. Key details:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Entitlement:</strong> 2 weeks (taken as one block or two separate weeks).</li>
              <li><strong>Pay:</strong> Statutory Parental Bereavement Pay (SPBP) is paid at the same rate as other statutory payments (&pound;184.03/week or 90% of average weekly earnings, whichever is lower, for 2025/26).</li>
              <li><strong>Eligibility for pay:</strong> Must have 26 weeks&apos; continuous service and earn at least the Lower Earnings Limit (&pound;123/week).</li>
              <li><strong>Eligibility for leave:</strong> All employees from day one, regardless of service length.</li>
              <li><strong>Timeframe:</strong> Can be taken at any point within 56 weeks of the child&apos;s death.</li>
            </ul>
            <p>
              Apart from parental bereavement leave, there is no other statutory entitlement to paid bereavement leave in the UK. This is why having a clear company policy is so important.
            </p>

            <h2>Common compassionate leave entitlements</h2>
            <p>
              While the law sets only a minimum, most UK employers offer some form of paid compassionate leave. Based on typical policies:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Death of a spouse, partner, child, or parent:</strong> 3&ndash;5 days paid leave.</li>
              <li><strong>Death of a sibling, grandparent, or grandchild:</strong> 2&ndash;3 days paid leave.</li>
              <li><strong>Death of an in-law, aunt, uncle, or close friend:</strong> 1&ndash;2 days paid leave.</li>
              <li><strong>Serious illness of a close family member:</strong> 1&ndash;3 days paid leave (or case-by-case).</li>
            </ul>
            <p>
              Some employers offer a flat entitlement (e.g., 5 days for all bereavements) to avoid the awkwardness of categorising grief. There is no single &quot;right&quot; answer &mdash; the best policy is the one that works for your culture and workforce.
            </p>

            <h2>What a good compassionate leave policy should include</h2>
            <p>
              A well-drafted policy removes ambiguity and ensures consistency. Your policy should cover:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Scope</strong> &mdash; who qualifies for compassionate leave and in what circumstances (death, serious illness, emergency).</li>
              <li><strong>Entitlement</strong> &mdash; how many days for each category of relationship.</li>
              <li><strong>Paid vs unpaid</strong> &mdash; whether leave is paid at full pay, reduced pay, or unpaid.</li>
              <li><strong>How to request</strong> &mdash; who to notify and how (phone, email, text), including that employees should contact you as soon as reasonably possible.</li>
              <li><strong>Evidence</strong> &mdash; whether you require any documentation (death certificate, funeral notice). Many employers choose not to request evidence for short periods, as it can feel insensitive.</li>
              <li><strong>Extensions</strong> &mdash; how employees can request additional time off if the standard entitlement isn&apos;t enough (e.g., using annual leave or unpaid leave).</li>
              <li><strong>Returning to work</strong> &mdash; what support is available on return (phased return, adjusted duties, access to an Employee Assistance Programme).</li>
              <li><strong>Manager guidance</strong> &mdash; how managers should handle requests sensitively and consistently.</li>
            </ol>

            <h2>Free compassionate leave policy template</h2>
            <div className="rounded-xl bg-gray-50 border p-6 my-6 text-sm">
              <p className="font-bold text-gray-900 mb-4 text-base">Compassionate Leave Policy</p>

              <p className="font-bold text-gray-900 mb-2">1. Purpose</p>
              <p className="mb-4">[Company name] recognises that employees may need time away from work following the death or serious illness of a close relative or dependant. This policy sets out the compassionate leave entitlements available to all employees.</p>

              <p className="font-bold text-gray-900 mb-2">2. Scope</p>
              <p className="mb-4">This policy applies to all employees from their first day of employment, regardless of length of service or contract type.</p>

              <p className="font-bold text-gray-900 mb-2">3. Entitlement</p>
              <p className="mb-1"><strong>Death of a spouse, partner, child, or parent:</strong> Up to 5 days&apos; paid leave.</p>
              <p className="mb-1"><strong>Death of a sibling, grandparent, or grandchild:</strong> Up to 3 days&apos; paid leave.</p>
              <p className="mb-1"><strong>Death of an in-law, aunt, uncle, or close friend:</strong> Up to 2 days&apos; paid leave.</p>
              <p className="mb-4"><strong>Serious illness or emergency involving a dependant:</strong> Up to 2 days&apos; paid leave, assessed case by case.</p>

              <p className="font-bold text-gray-900 mb-2">4. Parental bereavement</p>
              <p className="mb-4">In the event of the death of a child under 18 or a stillbirth after 24 weeks, employees are entitled to 2 weeks&apos; leave in accordance with the Parental Bereavement (Leave and Pay) Act 2018, in addition to the compassionate leave set out above.</p>

              <p className="font-bold text-gray-900 mb-2">5. Requesting leave</p>
              <p className="mb-4">Employees should notify their line manager as soon as reasonably practicable by phone, email, or text. Where possible, an indication of the expected duration of absence should be provided. We understand that this may not always be possible at the time of the initial request.</p>

              <p className="font-bold text-gray-900 mb-2">6. Evidence</p>
              <p className="mb-4">We do not routinely require evidence for compassionate leave of up to 5 days. For extended leave, we may ask for documentation such as a death certificate or funeral notice. Any requests for evidence will be made sensitively.</p>

              <p className="font-bold text-gray-900 mb-2">7. Extensions</p>
              <p className="mb-4">If an employee needs additional time beyond their entitlement, they may request further unpaid leave or use accrued annual leave. All extension requests will be considered sympathetically on a case-by-case basis.</p>

              <p className="font-bold text-gray-900 mb-2">8. Returning to work</p>
              <p className="mb-4">On return, the employee&apos;s line manager will hold a brief, supportive conversation to check on their wellbeing and discuss any adjustments that may help. Access to our Employee Assistance Programme is available at any time.</p>

              <p className="font-bold text-gray-900 mb-2">9. Pay</p>
              <p className="mb-0">Compassionate leave under this policy is paid at the employee&apos;s normal rate of pay. Any additional unpaid leave will be confirmed in writing before it begins.</p>
            </div>
            <p>
              Feel free to adapt this template to your organisation. If you use <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link>, you can set up compassionate leave as a custom leave type with its own allowance and approval workflow.
            </p>

            <h2>How to handle compassionate leave sensitively</h2>
            <p>
              Getting the human side right matters as much as the policy. Here are best practices for managers:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Respond with empathy first</strong> &mdash; when an employee tells you about a bereavement, lead with compassion before discussing logistics. &quot;I&apos;m so sorry for your loss&quot; should come before &quot;when will you be back?&quot;</li>
              <li><strong>Don&apos;t question the grief</strong> &mdash; avoid making judgements about the &quot;closeness&quot; of the relationship. The death of a friend or an estranged parent can be just as devastating as losing an immediate family member.</li>
              <li><strong>Be flexible</strong> &mdash; grief doesn&apos;t follow a timetable. If someone needs an extra day or two, try to accommodate it. The goodwill you create far outweighs the cost.</li>
              <li><strong>Keep it private</strong> &mdash; only share the news with colleagues if the employee gives permission. Some people want their team to know; others do not.</li>
              <li><strong>Check in after return</strong> &mdash; don&apos;t assume everything is fine once they&apos;re back at their desk. A quiet check-in a week or two later shows you care.</li>
              <li><strong>Signpost support</strong> &mdash; remind employees about your Employee Assistance Programme (EAP), counselling services, or charities such as Cruse Bereavement Support.</li>
              <li><strong>Document consistently</strong> &mdash; record all compassionate leave the same way for every employee. This protects you against claims of inconsistency and helps you spot trends.</li>
              <li><strong>Train your managers</strong> &mdash; a manager who handles a bereavement badly can cause lasting damage to trust. Brief all line managers on the policy and on how to have sensitive conversations.</li>
            </ol>

            <h2>Compassionate leave and other types of leave</h2>
            <p>
              Compassionate leave sometimes overlaps with other absence types. Here&apos;s how they relate:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Sick leave</strong> &mdash; if an employee becomes unwell due to grief (e.g., depression, anxiety), this may become a sickness absence. Normal sick leave rules and SSP would then apply.</li>
              <li><strong>Annual leave</strong> &mdash; employees may choose to extend their time off using annual leave. Never pressure someone into using annual leave instead of compassionate leave.</li>
              <li><strong>Time off for dependants</strong> &mdash; the statutory right under the Employment Rights Act 1996 runs alongside any contractual compassionate leave. You cannot force employees to use their statutory entitlement instead of your company policy.</li>
              <li><strong>Parental bereavement leave</strong> &mdash; this is a separate statutory entitlement and should not be deducted from your compassionate leave allowance.</li>
            </ul>

            <h2>How Leavely helps manage compassionate leave</h2>
            <ul className="list-disc pl-6">
              <li><strong>Dedicated leave type</strong> &mdash; set up compassionate leave as a separate category with its own allowance, so it&apos;s tracked independently from annual leave or sick leave.</li>
              <li><strong>Quick approvals</strong> &mdash; managers can approve compassionate leave requests instantly from email or the dashboard.</li>
              <li><strong>Absence records</strong> &mdash; every request is logged with dates, reason, and approval status, creating a complete audit trail.</li>
              <li><strong>Reporting</strong> &mdash; see how much compassionate leave has been taken across your team or company, and spot any patterns.</li>
              <li><strong>Policy flexibility</strong> &mdash; configure different entitlements for different circumstances or employee groups.</li>
              <li><strong>Privacy controls</strong> &mdash; only managers and HR can see the reason for compassionate leave. Team calendars show the employee as &quot;away&quot; without exposing sensitive details.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Track compassionate leave with care and consistency</h3>
            <p className="text-emerald-100 mb-6">Leavely lets you manage compassionate leave as a dedicated leave type with full reporting and privacy controls.</p>
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
              <Link href="/maternity-leave-uk" className="block text-emerald-600 hover:underline font-medium">Maternity Leave UK: SMP 2026/27 Employer Guide &rarr;</Link>
              <Link href="/uk-hr-compliance-small-business" className="block text-emerald-600 hover:underline font-medium">UK HR Compliance Checklist for Small Businesses &rarr;</Link>
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
              <Link href="/blog/return-to-work-interview-questions" className="block text-emerald-600 hover:underline font-medium">Return-to-Work Interview Questions: Free Template &rarr;</Link>
              <Link href="/blog/parental-bereavement-leave-uk" className="block text-emerald-600 hover:underline font-medium">Parental Bereavement Leave UK: Employer&apos;s Guide &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
