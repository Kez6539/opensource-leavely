import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/unpaid-leave-uk`

export const metadata: Metadata = {
  title: 'Unpaid Leave UK: Employer Guide to Rules & Policies',
  description:
    'A comprehensive guide to unpaid leave in the UK. Covers statutory unpaid leave types (parental leave, time off for dependants, public duties), discretionary unpaid leave, impact on benefits, and creating an unpaid leave policy.',
  alternates: { canonical: articleUrl },
  keywords: [
    'unpaid leave UK',
    'unpaid leave employment law UK',
    'can an employer refuse unpaid leave',
    'time off for dependants',
    'unpaid leave policy',
    'unpaid parental leave UK',
  ],
  openGraph: {
    title: 'Unpaid Leave UK — Employer Guide to Rules & Policies',
    description:
      'Statutory unpaid leave types, discretionary leave, impact on benefits, and how to build an unpaid leave policy.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Unpaid Leave UK: Employer Guide to Rules & Policies',
  description: 'A comprehensive guide to unpaid leave in the UK covering statutory types, discretionary leave, impact on benefits, and policy creation.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function UnpaidLeaveArticle() {
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
            Unpaid Leave UK: Employer Guide to Rules &amp; Policies
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Unpaid leave is one of those areas of employment law where there is often a gap between what employees expect and what they are actually entitled to. There is no general legal right to take unpaid leave in the UK — but there are several specific statutory rights, and most employers also offer discretionary unpaid leave in certain circumstances. This guide explains the rules, the statutory entitlements, and how to create a clear policy.
            </p>

            <h2>Is there a right to unpaid leave in the UK?</h2>
            <p>
              No. There is <strong>no general right</strong> to take unpaid leave from work in the UK. An employee cannot simply decide to take time off without pay and expect the employer to agree. However, there are several specific <strong>statutory rights</strong> to unpaid time off, and employers may also grant unpaid leave on a discretionary basis.
            </p>
            <p>
              The distinction matters because an employer <strong>can refuse</strong> a general request for unpaid leave (it is entirely at their discretion), but they <strong>cannot refuse</strong> statutory unpaid leave where the employee meets the qualifying criteria.
            </p>

            <h2>Statutory unpaid leave: time off for dependants</h2>
            <p>
              Under Section 57A of the Employment Rights Act 1996, all employees have a <strong>day-one right</strong> to take a &quot;reasonable&quot; amount of unpaid time off to deal with an emergency involving a dependant. There is no qualifying period.
            </p>
            <p>
              A dependant includes a spouse, civil partner, child, parent, or anyone who lives in the same household (other than a lodger or tenant). It can also include someone who reasonably relies on the employee for care.
            </p>

            <h3>What counts as an emergency?</h3>
            <ul className="list-disc pl-6">
              <li>A dependant falls ill, is injured, or is assaulted.</li>
              <li>A dependant gives birth (this is about being present for the emergency, not about paternity leave).</li>
              <li>Arrangements for the care of a dependant break down unexpectedly — for example, a childminder cancels at short notice.</li>
              <li>An incident involving the employee&apos;s child at school.</li>
              <li>A dependant dies (though many employers offer paid compassionate leave for bereavements).</li>
            </ul>
            <p>
              The right is to deal with the <strong>immediate emergency</strong>, not to provide ongoing care. Typically this means one or two days — enough to arrange alternative care or deal with the crisis. There is no set maximum, but the time off must be &quot;reasonable&quot; in the circumstances.
            </p>
            <p>
              The employee must tell the employer <strong>as soon as reasonably practicable</strong> why they are absent and how long they expect to be away. Refusing this statutory right or subjecting an employee to a detriment for taking it is unlawful.
            </p>

            <h2>Statutory unpaid leave: parental leave</h2>
            <p>
              Employees with at least <strong>one year&apos;s continuous service</strong> are entitled to <strong>18 weeks of unpaid parental leave</strong> per child, which can be taken up until the child&apos;s <strong>18th birthday</strong>. This is a separate entitlement from maternity, paternity, or shared parental leave.
            </p>
            <p>
              The default rules (which apply unless there is a collective or workforce agreement in place) are:
            </p>
            <ul className="list-disc pl-6">
              <li>A maximum of <strong>4 weeks per child per year</strong>.</li>
              <li>Leave must be taken in blocks of <strong>one week</strong> (unless the child is disabled, in which case single days are permitted).</li>
              <li>The employee must give <strong>21 days&apos; notice</strong>.</li>
              <li>The employer can <strong>postpone</strong> the leave for up to 6 months if it would cause significant disruption to the business — but they cannot refuse it outright (except in the case of postponement, and they cannot postpone leave requested immediately after the birth or adoption of a child).</li>
            </ul>
            <p>
              The 18-week entitlement is per child, not per employer. If an employee has already taken 10 weeks of parental leave with a previous employer, they have 8 weeks remaining with their current employer.
            </p>

            <h2>Statutory unpaid leave: time off for public duties</h2>
            <p>
              Employees who hold certain public positions are entitled to a <strong>reasonable amount of unpaid time off</strong> to carry out those duties. The employer does not have to pay them, but must allow the time off. Qualifying positions include:
            </p>
            <ul className="list-disc pl-6">
              <li>Magistrate (Justice of the Peace).</li>
              <li>Local councillor.</li>
              <li>Member of a statutory tribunal (e.g., employment tribunal).</li>
              <li>Governor of a school or further education institution.</li>
              <li>Member of a health authority, NHS trust, or other public body.</li>
              <li>Trade union representative (for duties and training).</li>
            </ul>
            <p>
              What counts as &quot;reasonable&quot; depends on how much time is needed, how much the employee has already taken, and the impact on the employer&apos;s business. There is no set number of days — it is assessed case by case.
            </p>

            <h2>Discretionary unpaid leave</h2>
            <p>
              Beyond the statutory entitlements above, any other unpaid leave is entirely at the <strong>employer&apos;s discretion</strong>. Common scenarios where employers may grant discretionary unpaid leave include:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Extended travel or sabbaticals</strong> — an employee wants to travel for several weeks or months.</li>
              <li><strong>Study or training</strong> — time off for courses or qualifications not directly related to the job.</li>
              <li><strong>Personal reasons</strong> — moving house, dealing with family situations, or pursuing personal projects.</li>
              <li><strong>Religious observance</strong> — time off for religious holidays not covered by annual leave (note: employers should consider indirect discrimination if they routinely refuse).</li>
              <li><strong>Exhausted annual leave</strong> — the employee has used all their paid holiday and requests additional time off.</li>
            </ul>
            <p>
              There is no legal obligation to say yes. However, employers should be <strong>consistent and fair</strong> in how they handle requests to avoid claims of discrimination or unfair treatment.
            </p>

            <h2>Impact on benefits, pension, and continuity</h2>
            <p>
              Taking unpaid leave has several practical consequences that both employers and employees should understand:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Continuity of employment</strong> — statutory unpaid leave (parental leave, time off for dependants) does <strong>not</strong> break continuity of employment. Discretionary unpaid leave also typically does not break continuity, provided the employment contract remains in force.</li>
              <li><strong>Annual leave accrual</strong> — during statutory parental leave, the employee continues to accrue annual leave. During discretionary unpaid leave, accrual depends on the terms of the agreement — many employers stop accrual during extended unpaid absence.</li>
              <li><strong>Pension contributions</strong> — no pay means no employer or employee pension contributions during the unpaid period (unless the contract states otherwise).</li>
              <li><strong>Benefits</strong> — company benefits such as private healthcare or life insurance may continue depending on the policy terms. Check with your provider.</li>
              <li><strong>National Insurance</strong> — no NI contributions are due during periods of nil pay, which could create gaps in the employee&apos;s NI record if the unpaid leave is extended.</li>
            </ul>

            <h2>Creating an unpaid leave policy</h2>
            <p>
              Having a clear unpaid leave policy avoids confusion and ensures consistent treatment. A good policy should cover:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Scope:</strong> who can apply, and in what circumstances unpaid leave may be considered.</li>
              <li><strong>Notice period:</strong> how much notice the employee must give (e.g., at least 2 weeks for discretionary requests).</li>
              <li><strong>Maximum duration:</strong> any limits on how long unpaid leave can last.</li>
              <li><strong>Approval process:</strong> who approves requests (line manager, HR, or both).</li>
              <li><strong>Impact on pay and benefits:</strong> what happens to salary, pension, holiday accrual, and other benefits during the absence.</li>
              <li><strong>Return to work:</strong> any expectations about confirming the return date and the role available on return.</li>
              <li><strong>Statutory rights:</strong> a clear statement that statutory unpaid leave (parental leave, time off for dependants) is separate and governed by law.</li>
            </ul>

            <h2>How Leavely tracks unpaid leave</h2>
            <p>
              Tracking unpaid leave manually can quickly become messy — especially when you need to distinguish between statutory and discretionary unpaid leave, manage accrual implications, and maintain accurate records for payroll. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> handles it all:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Separate leave types</strong> — configure unpaid parental leave, time off for dependants, and discretionary unpaid leave as distinct leave categories, each with their own rules.</li>
              <li><strong>Request and approval workflow</strong> — employees submit unpaid leave requests through Leavely, and managers approve or decline with a clear audit trail.</li>
              <li><strong>Accrual control</strong> — choose whether annual leave continues to accrue during each type of unpaid leave.</li>
              <li><strong>Calendar integration</strong> — unpaid leave appears on the team calendar alongside all other absence types, so coverage gaps are immediately visible.</li>
              <li><strong>Payroll reporting</strong> — generate reports showing unpaid leave periods for payroll processing, ensuring deductions are accurate.</li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Track every type of leave in one place</h3>
            <p className="text-emerald-100 mb-6">From statutory parental leave to discretionary unpaid days — Leavely keeps it organised, compliant, and visible to your whole team.</p>
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
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">
                How to Create a Leave Policy UK: Free Template &amp; Guide &rarr;
              </Link>
              <Link href="/blog/compassionate-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Compassionate Leave UK: What Employers Need to Know &rarr;
              </Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">
                Annual Leave Entitlement UK 2026: Complete Guide for Employers &rarr;
              </Link>
              <Link href="/blog/jury-service-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Jury Service Leave UK: Employer&apos;s Guide &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
