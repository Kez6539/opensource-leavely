import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/garden-leave-uk`

export const metadata: Metadata = {
  title: 'Garden Leave UK: How It Works & What Employers Need to Know',
  description:
    'What is garden leave and when should you use it? Covers contractual requirements, employee rights during garden leave, annual leave interaction, restrictive covenants, and practical tips.',
  alternates: { canonical: articleUrl },
  keywords: [
    'garden leave UK',
    'garden leave employment law',
    'gardening leave',
    'garden leave clause',
    'garden leave notice period',
    'garden leave vs paid leave',
  ],
  openGraph: {
    title: 'Garden Leave UK: How It Works & What Employers Need to Know',
    description: 'A practical guide to garden leave for UK employers — when to use it, legal requirements, and how to manage it properly.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Garden Leave UK: How It Works & What Employers Need to Know',
  description: 'Complete guide to garden leave for UK employers.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function GardenLeaveArticle() {
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
            Garden Leave UK: How It Works &amp; What Employers Need to Know
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              <strong>Garden leave</strong> (sometimes called &quot;gardening leave&quot;) is a period during an employee&apos;s notice period where they are instructed to stay away from the workplace while remaining employed and on full pay. The employee is still bound by their contract but has no duties to perform. It&apos;s a powerful tool for protecting your business — but it needs to be handled correctly.
            </p>

            <h2>What is garden leave?</h2>
            <p>
              When an employee resigns or is given notice, the employer may decide that it&apos;s in the business&apos;s interests to keep that person away from the office during their notice period. The employee remains employed, receives their normal salary and benefits, but does not attend work or carry out any duties.
            </p>
            <p>
              The term &quot;garden leave&quot; comes from the idea that the employee is at home with nothing to do except tend to their garden. In practice, the employee is simply kept away from colleagues, clients, systems, and confidential information.
            </p>

            <h2>When is garden leave used?</h2>
            <p>
              Garden leave is most commonly used in situations where there is a risk to the business if the departing employee continues to work during their notice period. Typical scenarios include:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Joining a competitor</strong> — preventing the employee from accessing up-to-date confidential information, client lists, or strategic plans before starting with a rival.</li>
              <li><strong>Client relationships</strong> — stopping the employee from using the notice period to poach clients or divert business to their new employer.</li>
              <li><strong>Team stability</strong> — preventing a departing senior employee from unsettling the team or recruiting colleagues to leave.</li>
              <li><strong>Sensitive projects</strong> — removing the employee from involvement in projects that could benefit a competitor.</li>
              <li><strong>Redundancy situations</strong> — where the employee&apos;s role no longer exists and there is no meaningful work for them to do.</li>
            </ul>

            <h2>You need a contractual right</h2>
            <p>
              The most important thing to know about garden leave is that you generally need an <strong>express contractual clause</strong> giving you the right to place an employee on garden leave. Without such a clause, imposing garden leave could be a breach of contract.
            </p>
            <p>
              This is because employees have an <strong>implied right to work</strong> — particularly in roles where skills need to be maintained, or where the employee&apos;s reputation depends on continued practice (e.g., doctors, journalists, traders). If you prevent someone from working without a contractual right to do so, they could argue constructive dismissal.
            </p>
            <p>
              A well-drafted garden leave clause typically gives the employer the right to:
            </p>
            <ul className="list-disc pl-6">
              <li>Require the employee to stay away from the workplace.</li>
              <li>Withdraw duties and responsibilities.</li>
              <li>Restrict contact with clients, suppliers, and colleagues.</li>
              <li>Require the return of company property (laptop, phone, access cards).</li>
              <li>Require the employee to remain available during working hours if needed.</li>
            </ul>

            <h2>Employee rights during garden leave</h2>
            <p>
              An employee on garden leave remains fully employed. This means they are entitled to:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Full pay</strong> — their normal salary continues throughout the garden leave period.</li>
              <li><strong>All contractual benefits</strong> — including private healthcare, car allowance, and any other benefits specified in their contract.</li>
              <li><strong>Pension contributions</strong> — employer pension contributions continue as normal.</li>
              <li><strong>Holiday accrual</strong> — annual leave continues to accrue during garden leave, just as it would during any other period of employment.</li>
            </ul>
            <p>
              The employee also remains bound by all contractual obligations, including confidentiality, good faith, and the duty not to work for another employer during the notice period.
            </p>

            <h2>Garden leave and annual leave</h2>
            <p>
              One of the most common questions employers ask is whether they can require an employee on garden leave to <strong>take accrued but untaken annual leave</strong> during the garden leave period. The answer is generally <strong>yes</strong>, provided:
            </p>
            <ul className="list-disc pl-6">
              <li>The employment contract or garden leave clause permits it.</li>
              <li>The employer gives proper notice — at least twice the length of the leave to be taken (e.g., 4 days&apos; notice for 2 days&apos; leave), unless the contract specifies otherwise.</li>
              <li>The employee has sufficient accrued leave.</li>
            </ul>
            <p>
              This can be beneficial because it avoids the employer having to make a payment in lieu of untaken holiday when employment ends. For detailed guidance on annual leave during notice periods, see our <Link href="/blog/annual-leave-during-notice-period-uk" className="text-emerald-600 hover:underline font-medium">annual leave during notice period guide</Link>.
            </p>

            <h2>Restrictive covenants and garden leave</h2>
            <p>
              Garden leave and post-termination restrictive covenants (such as non-compete or non-solicitation clauses) serve a similar purpose — protecting the business from competitive harm. Courts may take the garden leave period into account when assessing whether post-termination restrictions are reasonable.
            </p>
            <p>
              For example, if an employee has a 6-month non-compete clause and serves 3 months on garden leave, a court might consider the <strong>combined</strong> period of restriction when judging whether the non-compete is enforceable. Some employers draft their contracts so that the garden leave period counts towards any post-termination restriction. This makes the overall restriction more likely to be upheld as reasonable.
            </p>

            <h2>Practical tips for employers</h2>
            <ol className="list-decimal pl-6">
              <li><strong>Include a garden leave clause in all contracts</strong> — especially for senior roles, client-facing roles, and anyone with access to sensitive information. It&apos;s much easier to include it from the start than to try to impose it later.</li>
              <li><strong>Act quickly</strong> — when an employee resigns, decide promptly whether garden leave is appropriate. The longer they remain in the workplace, the less effective garden leave becomes.</li>
              <li><strong>Communicate clearly</strong> — write to the employee confirming the terms of garden leave: start date, end date, ongoing obligations, requirement to return property, and what they can and cannot do.</li>
              <li><strong>Recover property and access</strong> — collect company equipment, revoke system access, and change relevant passwords on the day garden leave starts.</li>
              <li><strong>Stay in touch</strong> — maintain periodic contact with the employee during garden leave. This reinforces that the employment relationship continues and helps with any handover queries.</li>
              <li><strong>Pay on time</strong> — continue paying salary and benefits on the normal pay dates. Failing to pay could give the employee grounds to terminate the contract and argue the restrictions no longer apply.</li>
            </ol>

            <h2>How Leavely manages garden leave records</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> makes it easy to track garden leave alongside other absence types:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Dedicated leave type</strong> — set up &quot;Garden Leave&quot; as a custom absence category, keeping it separate from annual leave and other absence types.</li>
              <li><strong>Date tracking</strong> — record the exact start and end dates of garden leave with full visibility for HR and management.</li>
              <li><strong>Holiday interaction</strong> — Leavely calculates accrued annual leave and tracks any leave taken during the garden leave period, preventing overpayment on termination.</li>
              <li><strong>Audit trail</strong> — every garden leave record is logged with timestamps, approvals, and notes for future reference.</li>
              <li><strong>Team calendar</strong> — garden leave appears on the team absence calendar, so managers can plan around the employee&apos;s absence.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Handle garden leave with confidence</h3>
            <p className="text-emerald-100 mb-6">Leavely tracks garden leave, annual leave accrual, and every other absence type — all in one platform.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/annual-leave-during-notice-period-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave During Notice Period: What Are the Rules? &rarr;</Link>
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK 2026: The Complete Guide &rarr;</Link>
              <Link href="/blog/holiday-pay-calculation-uk" className="block text-emerald-600 hover:underline font-medium">Holiday Pay Calculation UK: The Complete Guide &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
