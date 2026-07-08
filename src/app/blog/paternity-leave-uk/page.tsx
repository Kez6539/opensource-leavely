import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/paternity-leave-uk`

export const metadata: Metadata = {
  title: 'Paternity Leave UK: Rights, Pay & Employer Guide (2026)',
  description:
    'Complete guide to paternity leave in the UK. Covers entitlement, statutory paternity pay, eligibility, notice requirements, shared parental leave, and employer obligations.',
  alternates: { canonical: articleUrl },
  keywords: [
    'paternity leave UK',
    'paternity pay UK',
    'statutory paternity pay',
    'paternity leave entitlement UK',
    'how long is paternity leave UK',
    'paternity leave rules UK',
    'paternity leave 2026',
    'shared parental leave UK',
  ],
  openGraph: {
    title: 'Paternity Leave UK — Rights, Pay & Employer Guide 2026',
    description:
      'Entitlement, statutory paternity pay, eligibility, notice rules, shared parental leave, and employer obligations explained.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Paternity Leave UK: Rights, Pay & Employer Guide',
  description:
    'Complete guide to paternity leave in the UK for employers and employees.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function PaternityLeaveArticle() {
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
            Paternity Leave UK: Rights, Pay &amp; Employer Guide
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Becoming a parent is life-changing, and UK law gives eligible employees the right to take time off work when their partner has a baby or when a child is placed for adoption. Whether you&apos;re an employer preparing for a team member&apos;s paternity leave or an employee wanting to understand your rights, this guide covers everything you need to know.
            </p>

            <h2>How long is paternity leave in the UK?</h2>
            <p>
              Eligible employees can take either <strong>1 week</strong> or <strong>2 consecutive weeks</strong> of statutory paternity leave. The key rules:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>1 or 2 weeks only</strong> &mdash; you cannot take odd days or split the leave into separate blocks.</li>
              <li><strong>Consecutive weeks</strong> &mdash; if you take 2 weeks, they must run back-to-back.</li>
              <li><strong>A &quot;week&quot;</strong> means the same number of days that the employee normally works in a week (e.g., 3 days for a part-time worker who works 3 days per week).</li>
            </ul>
            <p>
              Paternity leave is a <strong>day-one right</strong> in terms of protection from detriment, but to qualify for the leave itself and statutory pay, employees must meet specific eligibility criteria.
            </p>

            <h2>Who qualifies for paternity leave?</h2>
            <p>
              To be eligible for statutory paternity leave, the employee must:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Be employed continuously</strong> by the same employer for at least <strong>26 weeks</strong> by the end of the 15th week before the expected week of childbirth (known as the &quot;qualifying week&quot;).</li>
              <li>Be the <strong>biological father</strong> of the child, or the <strong>mother&apos;s spouse, civil partner, or partner</strong>.</li>
              <li>Have <strong>responsibility for the child&apos;s upbringing</strong>.</li>
              <li>Be taking time off to <strong>care for the child</strong> or <strong>support the mother/adopter</strong>.</li>
            </ul>

            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <p className="text-emerald-800 font-semibold mb-2">Key point</p>
              <p className="text-emerald-700 mb-0">
                Agency workers, freelancers, and the self-employed do <strong>not</strong> qualify for statutory paternity leave or pay. Only employees with a contract of employment are eligible.
              </p>
            </div>

            <h2>When can paternity leave be taken?</h2>
            <p>
              Paternity leave must be taken within <strong>56 days</strong> (8 weeks) of the birth or adoption placement. The leave can start on:
            </p>
            <ul className="list-disc pl-6">
              <li>The actual date of birth or placement.</li>
              <li>An agreed number of days after the birth or placement.</li>
              <li>An agreed number of days after the expected week of childbirth.</li>
            </ul>
            <p>
              If the baby arrives early, paternity leave can still be taken within 56 days of the actual birth date. If the baby arrives late, the start date may shift, but the 56-day window begins from the actual date of birth.
            </p>

            <h2>Statutory Paternity Pay (SPP)</h2>
            <p>
              Eligible employees receive <strong>Statutory Paternity Pay</strong> for the duration of their paternity leave. The current rate for the 2025/26 tax year:
            </p>

            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <p className="text-emerald-800 font-mono text-center text-lg mb-0">
                <strong>&pound;184.03 per week</strong> or <strong>90% of average weekly earnings</strong> &mdash; whichever is lower
              </p>
            </div>

            <p>To qualify for SPP, the employee must:</p>
            <ul className="list-disc pl-6">
              <li>Meet the 26-week continuous employment requirement.</li>
              <li>Earn at least the <strong>Lower Earnings Limit</strong> (&pound;123 per week for 2025/26).</li>
              <li>Give the correct notice (see below).</li>
              <li>Provide a signed declaration confirming eligibility.</li>
            </ul>

            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Detail</th>
                  <th>Amount / Period</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Weekly SPP rate (2025/26)</td><td>&pound;184.03</td></tr>
                <tr><td>Duration</td><td>1 or 2 weeks</td></tr>
                <tr><td>Paid by</td><td>Employer (reclaimable from HMRC)</td></tr>
                <tr><td>Tax &amp; NI</td><td>Yes &mdash; SPP is taxable</td></tr>
                <tr><td>Minimum earnings</td><td>&pound;123/week (Lower Earnings Limit)</td></tr>
              </tbody>
            </table>

            <h2>How to give notice for paternity leave</h2>
            <p>
              The employee must give notice by the <strong>15th week before the expected week of childbirth</strong> &mdash; that&apos;s roughly the 25th week of pregnancy. The notice must include:
            </p>
            <ol className="list-decimal pl-6">
              <li>The baby&apos;s expected due date (or placement date for adoption).</li>
              <li>Whether the employee wants 1 or 2 weeks of leave.</li>
              <li>When they want the leave to start.</li>
            </ol>
            <p>
              This notice is usually given using <strong>form SC3</strong> (birth) or <strong>form SC4</strong> (adoption), available from HMRC. The employee can change the start date with 28 days&apos; notice.
            </p>

            <h2>Enhanced paternity pay</h2>
            <p>
              While SPP is the legal minimum, many employers choose to offer <strong>enhanced paternity pay</strong> as part of their benefits package. This might include:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Full pay</strong> for the 1 or 2 weeks of paternity leave.</li>
              <li><strong>Topped-up pay</strong> &mdash; SPP plus an employer top-up to reach full salary.</li>
              <li><strong>Additional paid leave</strong> beyond the statutory 2 weeks.</li>
            </ul>
            <p>
              Enhanced paternity pay is entirely at the employer&apos;s discretion. If offered, the terms should be clearly stated in the employment contract or company policy. It&apos;s increasingly common among UK employers competing for talent &mdash; some now offer up to 6 weeks at full pay.
            </p>

            <h2>Shared Parental Leave (SPL)</h2>
            <p>
              Parents who want more flexibility can opt into <strong>Shared Parental Leave</strong>. SPL allows eligible parents to share up to <strong>50 weeks of leave</strong> and <strong>37 weeks of pay</strong> between them. Here&apos;s how it works:
            </p>
            <ul className="list-disc pl-6">
              <li>The mother &quot;curtails&quot; (ends early) her maternity leave and converts the remaining entitlement into SPL.</li>
              <li>Both parents can then take the shared leave in blocks, returning to work in between if they wish.</li>
              <li><strong>Shared Parental Pay (ShPP)</strong> is paid at &pound;184.03/week or 90% of average earnings (whichever is lower) &mdash; the same rate as SPP.</li>
              <li>Both parents must meet eligibility criteria: the &quot;continuity of employment&quot; test and the &quot;employment and earnings&quot; test.</li>
            </ul>
            <p>
              SPL is far more flexible than standard paternity leave &mdash; parents can take leave in up to 3 separate blocks and can even be off at the same time. However, it requires careful planning and coordination with the employer.
            </p>

            <h2>Adoption leave for partners</h2>
            <p>
              When a couple adopt a child, one parent can take <strong>adoption leave</strong> (up to 52 weeks, similar to maternity leave) and the other parent has the same <strong>paternity leave entitlements</strong> as biological fathers. This includes:
            </p>
            <ul className="list-disc pl-6">
              <li>1 or 2 consecutive weeks of paternity leave.</li>
              <li>Statutory Paternity Pay at the same rate.</li>
              <li>The same eligibility and notice requirements.</li>
              <li>The option to use Shared Parental Leave instead.</li>
            </ul>
            <p>
              The paternity leave must be taken within 56 days of the child&apos;s placement date. Notice is given using <strong>form SC4</strong>.
            </p>

            <h2>Employer obligations</h2>
            <p>
              Employers have important legal duties when it comes to paternity leave:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Cannot refuse statutory paternity leave</strong> &mdash; if the employee is eligible, the employer must grant it.</li>
              <li><strong>Protection from detriment</strong> &mdash; employees must not be treated unfairly or suffer any disadvantage because they take or request paternity leave.</li>
              <li><strong>Protection from dismissal</strong> &mdash; dismissing an employee because they took paternity leave is automatically unfair dismissal.</li>
              <li><strong>Right to return</strong> &mdash; the employee has the right to return to the same job on the same terms and conditions.</li>
              <li><strong>Continue benefits</strong> &mdash; contractual benefits (other than pay) continue during paternity leave, including pension contributions, company car, and health insurance.</li>
              <li><strong>Reclaim SPP</strong> &mdash; small employers can reclaim 103% of SPP from HMRC; larger employers can reclaim 92%.</li>
            </ul>

            <h3>What employers should NOT do</h3>
            <ol className="list-decimal pl-6">
              <li>Ask the employee to delay or shorten their paternity leave.</li>
              <li>Treat paternity leave as a &quot;favour&quot; rather than a statutory right.</li>
              <li>Make the employee redundant or restructure their role while they&apos;re on leave.</li>
              <li>Fail to maintain benefits during the leave period.</li>
              <li>Refuse to allow the employee to return to their original role.</li>
            </ol>

            <h2>How Leavely helps manage paternity leave</h2>
            <p>
              Managing paternity leave involves tracking eligibility, notice periods, pay calculations, and return dates &mdash; all of which can be error-prone when done manually. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> simplifies the entire process:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Paternity leave tracking</strong> &mdash; dedicated leave type with correct entitlement (1 or 2 weeks) built in.</li>
              <li><strong>Shared Parental Leave management</strong> &mdash; track SPL blocks, remaining entitlement, and ShPP across both parents.</li>
              <li><strong>Automated notifications</strong> &mdash; managers are alerted when paternity leave is requested, and reminders are sent for key dates.</li>
              <li><strong>Eligibility checks</strong> &mdash; employment start dates are already in the system, making qualification checks instant.</li>
              <li><strong>Audit trail</strong> &mdash; every request, approval, and date change is logged for compliance.</li>
              <li><strong>Visual leave calendar</strong> &mdash; see who&apos;s on paternity leave alongside other absences to plan team coverage.</li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Manage paternity leave without the paperwork</h3>
            <p className="text-emerald-100 mb-6">Leavely tracks paternity leave, shared parental leave, and statutory pay &mdash; all in one place. Try free for 14 days.</p>
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
              <Link href="/blog/maternity-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Maternity Leave UK: Complete Employer Guide &rarr;
              </Link>
              <Link href="/maternity-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Maternity Leave UK: SMP 2026/27 Employer Guide &rarr;
              </Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">
                Annual Leave Entitlement UK 2026: Complete Guide for Employers &rarr;
              </Link>
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">
                How to Create a Leave Policy UK: Free Template &rarr;
              </Link>
              <Link href="/blog/shared-parental-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Shared Parental Leave UK: How It Works for Employers &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
