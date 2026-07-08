import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/carry-over-annual-leave-uk`

export const metadata: Metadata = {
  title: 'Carry Over Annual Leave UK: Rules Employers Must Know (2026)',
  description:
    'Can employees carry over annual leave in the UK? Learn the rules on unused holiday carry-over, use it or lose it policies, maternity and sickness exceptions, and payment in lieu.',
  alternates: { canonical: articleUrl },
  keywords: [
    'carry over annual leave UK',
    'annual leave carry over rules UK',
    'unused holiday carry over',
    'can you carry over annual leave UK',
    'holiday carry over employment law',
    'use it or lose it annual leave UK',
    'annual leave carry forward UK',
  ],
  openGraph: {
    title: 'Carry Over Annual Leave UK — Rules Employers Must Know',
    description:
      'Statutory carry-over rules, maternity and sickness exceptions, use it or lose it policies, and payment in lieu explained for UK employers.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Carry Over Annual Leave UK: Rules Employers Must Know',
  description:
    'A comprehensive guide to annual leave carry-over rules in the UK, including statutory entitlements, maternity and sickness exceptions, use it or lose it policies, and payment in lieu calculations.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function CarryOverAnnualLeaveArticle() {
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
            Carry Over Annual Leave UK: Rules Employers Must Know
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              What happens when employees don&apos;t use all their annual leave before the year ends? Carry-over rules are one of the trickiest areas of UK employment law. Get them wrong, and you could face tribunal claims. This guide explains exactly what the law says, when carry-over is mandatory, and how to build a policy that protects your business.
            </p>

            <h2>What the law says about carrying over annual leave</h2>
            <p>
              UK annual leave is governed by the <strong>Working Time Regulations 1998</strong>. The statutory minimum of 5.6 weeks (28 days for full-time employees) is actually made up of two distinct portions, and each has different carry-over rules:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>4 weeks (20 days)</strong> — derived from the EU Working Time Directive. This portion has <strong>limited carry-over rights</strong>. In principle, it should be taken in the leave year it relates to. However, courts have ruled that it <em>must</em> be carried over in certain circumstances (sickness, maternity, or where the employer prevented the employee from taking it).
              </li>
              <li>
                <strong>1.6 weeks (8 days)</strong> — the additional UK statutory top-up. This portion <strong>can</strong> be subject to a &quot;use it or lose it&quot; policy. There is no automatic right to carry it over unless the employment contract or a workplace agreement says otherwise.
              </li>
            </ul>
            <p>
              This distinction matters. An employer can lawfully apply &quot;use it or lose it&quot; to the 1.6-week top-up, but cannot do so for the 4-week EU-derived portion if the employee was genuinely unable to take it.
            </p>

            <h2>When carry-over IS required by law</h2>
            <p>
              Regardless of your company policy, there are situations where the law <strong>requires</strong> you to allow carry-over of the 4-week EU-derived leave:
            </p>

            <h3>1. Maternity and parental leave</h3>
            <p>
              Employees on maternity, adoption, or shared parental leave continue to accrue annual leave throughout their absence. Since they cannot take holiday while on statutory leave, any untaken leave <strong>must</strong> be carried over. There is no cap on how much can carry over in this situation.
            </p>
            <p>
              It is good practice to encourage employees to take accrued leave before or after their maternity period to avoid large carry-over balances building up.
            </p>

            <h3>2. Long-term sickness</h3>
            <p>
              The landmark case <strong>Plumb v Duncan Print Group (2015)</strong> confirmed that employees who are off sick and unable to take their holiday can carry over up to <strong>4 weeks (20 days)</strong> of unused leave into the following leave year. This applies to the EU-derived 4-week portion only.
            </p>
            <p>
              The carried-over leave from sickness must be used within <strong>18 months</strong> of the end of the leave year in which it accrued. After 18 months, it expires. This time limit was confirmed by the Court of Justice of the EU and adopted into UK case law.
            </p>

            <h3>3. Employer prevented the employee from taking leave</h3>
            <p>
              If an employer refused leave requests, discouraged employees from taking time off, or failed to give employees a reasonable opportunity to use their holiday, the full untaken amount <strong>must</strong> carry over. Employers have a duty to actively encourage employees to take their leave and to warn them that it will be lost if not taken.
            </p>

            <h2>Common carry-over policies</h2>
            <p>
              Most UK employers set their own carry-over rules for any leave above the protected 4-week minimum. Here are the most common approaches:
            </p>

            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Policy type</th>
                  <th>How it works</th>
                  <th>Best for</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>No carry-over</strong></td>
                  <td>All unused leave is forfeited at year-end (only lawful for the 1.6-week top-up)</td>
                  <td>Businesses that want to encourage leave usage</td>
                </tr>
                <tr>
                  <td><strong>Up to 5 days</strong></td>
                  <td>Employees can carry over a maximum of 5 days, to be used by a set deadline</td>
                  <td>Most SMBs — balances flexibility with control</td>
                </tr>
                <tr>
                  <td><strong>Up to 8 days with deadline</strong></td>
                  <td>The full 1.6-week top-up carries over but must be used by 31 March (or another date)</td>
                  <td>Larger organisations with January–December leave years</td>
                </tr>
                <tr>
                  <td><strong>Unlimited carry-over</strong></td>
                  <td>All unused leave rolls forward indefinitely</td>
                  <td>Rare — can create large liabilities on the balance sheet</td>
                </tr>
              </tbody>
            </table>

            <p>
              Whichever policy you choose, it <strong>must be clearly stated</strong> in the employment contract or staff handbook. Employees should be reminded of deadlines well in advance.
            </p>

            <h2>Use it or lose it policies: what&apos;s lawful?</h2>
            <p>
              A &quot;use it or lose it&quot; policy can be applied to the <strong>1.6-week statutory top-up</strong> (8 days for full-time employees) without issue, provided it is written into the contract.
            </p>
            <p>
              However, applying &quot;use it or lose it&quot; to the <strong>4-week EU-derived portion</strong> is risky if:
            </p>
            <ul className="list-disc pl-6">
              <li>The employee was on long-term sick leave and physically unable to take holiday.</li>
              <li>The employee was on maternity or parental leave.</li>
              <li>The employer refused or discouraged leave requests.</li>
              <li>The employer did not actively encourage the employee to take their leave or warn them it would be lost.</li>
            </ul>
            <p>
              In practice, if an employee was fit, available to work, and had a genuine opportunity to take their leave, the 4-week portion can also be forfeited. But employers carry the burden of proof — you must be able to show that you encouraged the employee to take their leave and gave clear warning that it would expire.
            </p>

            <h2>What happens to unused leave when someone leaves?</h2>
            <p>
              When an employee&apos;s employment ends (whether by resignation, redundancy, or dismissal), they are entitled to be <strong>paid in lieu</strong> for any accrued but untaken annual leave. This applies to both the 4-week and 1.6-week portions.
            </p>
            <p>
              Conversely, if an employee has taken <em>more</em> leave than they have accrued at the point of termination, the employer can deduct the overpayment from their final pay — but only if the employment contract allows it.
            </p>

            <h3>Payment in lieu calculation</h3>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <p className="text-emerald-800 font-mono text-center text-lg mb-4">
                <strong>Holiday pay in lieu = (Annual salary &divide; 52 &divide; Days per week) &times; Untaken days</strong>
              </p>
              <p className="text-emerald-700 text-sm text-center mb-0">
                Example: An employee earning &pound;30,000/year who works 5 days/week and has 4 untaken days:<br />
                (&pound;30,000 &divide; 52 &divide; 5) &times; 4 = <strong>&pound;461.54</strong>
              </p>
            </div>
            <p>
              For employees with variable pay (commission, regular overtime, shift allowances), the calculation must reflect their <strong>normal remuneration</strong> — not just basic pay. This was established in the <em>Bear Scotland v Fulton</em> and <em>Lock v British Gas</em> rulings.
            </p>

            <h2>Best practice tips for managing carry-over</h2>
            <ol className="list-decimal pl-6">
              <li>
                <strong>Write it down</strong> — include your carry-over rules in the employment contract and staff handbook. Ambiguity favours the employee in tribunal.
              </li>
              <li>
                <strong>Set a use-by deadline</strong> — if you allow carry-over, require carried-over days to be used within 3 months of the new leave year (e.g., by 31 March for a January start).
              </li>
              <li>
                <strong>Send reminders before year-end</strong> — notify employees 8 weeks and 4 weeks before the leave year ends if they have unused days. This also strengthens your position if leave is later forfeited.
              </li>
              <li>
                <strong>Track maternity and sickness separately</strong> — these carry-over rights are statutory and cannot be overridden. Keep clear records.
              </li>
              <li>
                <strong>Monitor leave balances monthly</strong> — don&apos;t wait until December to discover half the team has 15 unused days. Consider using <Link href="/blog/accrual-based-leave-uk" className="text-emerald-600 hover:underline font-medium">accrual-based leave</Link> to prevent large balances building up in the first place.
              </li>
              <li>
                <strong>Encourage managers to prompt their teams</strong> — managers should regularly review their team&apos;s leave usage and encourage time off, especially in Q3 and Q4.
              </li>
              <li>
                <strong>Avoid creating a culture that discourages leave</strong> — if employees feel unable to take time off, you lose both the wellbeing benefit and the legal protection of a use-it-or-lose-it policy.
              </li>
            </ol>

            <h2>How Leavely helps manage carry-over</h2>
            <p>
              Manually tracking carry-over in spreadsheets is a recipe for errors and disputes. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> automates the entire process:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Automatic carry-over rules</strong> — set a maximum carry-over allowance per leave policy, and Leavely calculates carried-over balances at year-end with no manual work.</li>
              <li><strong>Deadline enforcement</strong> — define a use-by date for carried-over days. Leavely automatically expires unused carry-over after the deadline passes.</li>
              <li><strong>Real-time balance visibility</strong> — employees and managers can see their current balance, including any carried-over days, at any time.</li>
              <li><strong>Year-end notifications</strong> — Leavely alerts employees before the leave year ends if they have unused days at risk of being lost, giving them time to book time off.</li>
              <li><strong>Maternity and sickness tracking</strong> — separate leave types ensure statutory carry-over obligations are met automatically.</li>
              <li><strong>Audit trail</strong> — every carry-over calculation is logged, giving you a clear record if a dispute arises.</li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Automate your carry-over rules</h3>
            <p className="text-emerald-100 mb-6">Leavely handles carry-over limits, deadlines, and year-end balances automatically. Start your 14-day free trial.</p>
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
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">
                How to Create a Leave Policy UK: Free Template & Guide &rarr;
              </Link>
              <Link href="/blog/holiday-pay-calculation-uk" className="block text-emerald-600 hover:underline font-medium">
                Holiday Pay Calculation UK: The Complete Guide &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
