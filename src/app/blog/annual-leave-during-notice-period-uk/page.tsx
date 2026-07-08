import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/annual-leave-during-notice-period-uk`

export const metadata: Metadata = {
  title: 'Annual Leave During Notice Period UK: Rules for Employers',
  description:
    'Can employees take holiday during their notice period? Learn the UK rules on annual leave during notice, employer rights to enforce leave, accrued holiday pay, and garden leave interactions.',
  alternates: { canonical: articleUrl },
  keywords: [
    'annual leave during notice period UK',
    'holiday during notice period',
    'can employer refuse holiday during notice',
    'notice period annual leave rules',
    'garden leave vs annual leave',
  ],
  openGraph: {
    title: 'Annual Leave During Notice Period UK — Rules for Employers',
    description:
      'Statutory rights, employer powers, accrued holiday pay, and garden leave interactions explained for UK employers managing notice periods.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Annual Leave During Notice Period UK: Rules for Employers',
  description:
    'A comprehensive guide to annual leave rules during notice periods in the UK, covering statutory rights, employer powers, accrued holiday pay, and garden leave interactions.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function AnnualLeaveNoticePeriodArticle() {
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
            <span className="text-xs text-gray-400 ml-3">6 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Annual Leave During Notice Period UK: Rules for Employers
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              When an employee hands in their resignation — or you issue a dismissal notice — one of the first questions that arises is what happens to their annual leave. Can they take holiday during the notice period? Can you force them to use it up? And what about accrued leave they haven&apos;t taken? This guide explains every angle UK employers need to understand.
            </p>

            <h2>Can employees take annual leave during their notice period?</h2>
            <p>
              <strong>Yes.</strong> An employee&apos;s statutory right to annual leave does not disappear simply because they are working their notice. During the notice period, the employee remains employed and continues to accrue leave in the normal way. They are entitled to request holiday just as they would at any other time.
            </p>
            <p>
              However, the employer retains the right to <strong>approve or refuse</strong> a leave request during notice, subject to the same rules that apply throughout the employment. An employer can refuse a holiday request by giving counter-notice of at least the same length as the leave requested. For example, if the employee requests 3 days off, the employer must give at least 3 days&apos; notice of refusal.
            </p>
            <p>
              In practice, most employers approve reasonable leave requests during notice periods. Refusing without a genuine business reason can damage the relationship and make the handover more difficult than it needs to be.
            </p>

            <h2>Can the employer force an employee to take leave during notice?</h2>
            <p>
              <strong>Yes, but with conditions.</strong> Under the <strong>Working Time Regulations 1998</strong>, an employer can require an employee to take annual leave on specific dates. To do this, the employer must give notice equal to <strong>twice the length of the leave</strong> being imposed.
            </p>
            <p>
              For example, if you want to require an employee to take 5 days of holiday during their notice period, you must give them at least <strong>10 days&apos; notice</strong> of this requirement. If the notice period is only 1 week, there may not be enough time to compel the employee to take more than a couple of days.
            </p>
            <p>
              This power is particularly useful when an employee has a large accrued balance and you want to avoid a significant payment in lieu at the end. However, it must be exercised fairly — compelling an employee to take all their remaining leave during notice when there is important handover work to complete could be seen as unreasonable.
            </p>

            <h3>The double-notice rule in practice</h3>
            <ul className="list-disc pl-6">
              <li><strong>1 day of forced leave</strong> requires 2 days&apos; advance notice from the employer.</li>
              <li><strong>3 days of forced leave</strong> requires 6 days&apos; advance notice.</li>
              <li><strong>1 week of forced leave</strong> requires 2 weeks&apos; advance notice.</li>
            </ul>
            <p>
              If the notice period is too short for the double-notice rule, the employer cannot force the employee to take leave and must instead pay in lieu for any unused entitlement.
            </p>

            <h2>Accrued but unused annual leave: payment in lieu</h2>
            <p>
              When an employee leaves — whether through resignation or dismissal — they are entitled to be <strong>paid in lieu</strong> for any accrued but untaken annual leave. This is a statutory right under the Working Time Regulations and cannot be overridden by contract.
            </p>
            <p>
              The calculation is straightforward: work out how much leave the employee has accrued up to their last day of employment, subtract any leave already taken, and pay the balance.
            </p>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <p className="text-emerald-800 font-mono text-center text-lg mb-4">
                <strong>Accrued leave = (Days worked in leave year &divide; Total days in leave year) &times; Annual entitlement</strong>
              </p>
              <p className="text-emerald-700 text-sm text-center mb-0">
                Example: An employee with 28 days&apos; entitlement leaves 6 months into the leave year having taken 10 days:<br />
                Accrued = (182 &divide; 365) &times; 28 = 13.96 days. Untaken = 13.96 &minus; 10 = <strong>3.96 days paid in lieu</strong>.
              </p>
            </div>
            <p>
              Conversely, if the employee has taken <em>more</em> leave than they have accrued at the point of leaving, the employer may be able to deduct the overpayment from their final pay — but only if a <strong>clawback clause</strong> exists in the employment contract. Without such a clause, recovery is difficult.
            </p>

            <h2>Resignation vs dismissal: does it matter?</h2>
            <p>
              The rules on annual leave during notice are the same regardless of whether the employee resigned or was dismissed. In both cases:
            </p>
            <ul className="list-disc pl-6">
              <li>The employee can request annual leave during the notice period.</li>
              <li>The employer can require the employee to take leave (with double notice).</li>
              <li>Accrued but untaken leave must be paid in lieu on termination.</li>
            </ul>
            <p>
              However, there are practical differences. When an employee resigns, they are typically motivated to use up remaining leave. When an employer dismisses (especially in redundancy), the employer often wants the employee to use their leave balance during notice to minimise the final payment. In either case, the statutory rules remain the same.
            </p>

            <h2>Garden leave and annual leave</h2>
            <p>
              <strong>Garden leave</strong> is when an employee is told not to come into work during their notice period but remains employed and paid. It is commonly used for senior employees, those with access to sensitive information, or those joining a competitor.
            </p>
            <p>
              A key question arises: can annual leave run concurrently with garden leave? The answer depends on the contract:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>If the contract allows it:</strong> many garden leave clauses explicitly state that the employer can require the employee to take any accrued holiday during the garden leave period. If this provision exists, the employer can set off annual leave against the garden leave, reducing the payment in lieu owed at termination.
              </li>
              <li>
                <strong>If the contract is silent:</strong> the employer can still use the statutory power to require leave (with the double-notice rule), but this can be contentious. Best practice is to address this clearly in the contract.
              </li>
            </ul>
            <p>
              Note that garden leave and annual leave are <strong>not the same thing</strong>. An employee on garden leave is still available for work if recalled. An employee on annual leave is not. This distinction matters for Working Time Directive compliance.
            </p>

            <h2>Best practice tips for employers</h2>
            <ol className="list-decimal pl-6">
              <li>
                <strong>Review the leave balance immediately</strong> — as soon as notice is given (by either party), check the employee&apos;s accrued leave balance and decide whether to require them to take some or all of it during notice.
              </li>
              <li>
                <strong>Communicate clearly in writing</strong> — if you are requiring the employee to take leave during notice, confirm this in writing with the exact dates, ensuring you meet the double-notice requirement.
              </li>
              <li>
                <strong>Plan the handover</strong> — balance the desire to reduce payment in lieu against the practical need for the employee to be present for a proper handover.
              </li>
              <li>
                <strong>Include a garden leave clause</strong> — ensure your employment contracts include a clause allowing you to require annual leave to be taken during any period of garden leave.
              </li>
              <li>
                <strong>Include a clawback clause</strong> — protect the business against employees who have taken more leave than they have accrued at the point of departure.
              </li>
              <li>
                <strong>Process the final pay correctly</strong> — calculate payment in lieu accurately, including any variable pay elements that form part of the employee&apos;s normal remuneration.
              </li>
            </ol>

            <h2>How Leavely calculates remaining entitlement automatically</h2>
            <p>
              Working out accrued leave, used days, and payment in lieu manually is error-prone — especially mid-year. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> takes the guesswork out of it:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Real-time accrual tracking</strong> — Leavely calculates accrued entitlement on any given date, so you always know exactly how much leave an employee has earned up to their termination date.</li>
              <li><strong>Instant balance visibility</strong> — see used, pending, and remaining leave at a glance, making it easy to decide whether to require leave during notice.</li>
              <li><strong>Payment in lieu calculation</strong> — Leavely shows the outstanding balance that must be paid in lieu, reducing the risk of under- or over-payment.</li>
              <li><strong>Audit trail</strong> — every leave request, approval, and balance adjustment is logged, giving you a clear record if any dispute arises after the employee has left.</li>
              <li><strong>Policy-aware automation</strong> — your carry-over rules, pro-rata calculations, and leave year settings are all factored in automatically.</li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Get notice period leave calculations right every time</h3>
            <p className="text-emerald-100 mb-6">Leavely calculates accrued entitlement, remaining balances, and payment in lieu automatically. Start your 14-day free trial.</p>
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
              <Link href="/blog/carry-over-annual-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Carry Over Annual Leave UK: Rules Employers Must Know &rarr;
              </Link>
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">
                How to Create a Leave Policy UK: Free Template &amp; Guide &rarr;
              </Link>
              <Link href="/blog/garden-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Garden Leave UK: What Employers Need to Know &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
