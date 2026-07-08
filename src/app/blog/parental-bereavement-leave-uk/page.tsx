import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/parental-bereavement-leave-uk`

export const metadata: Metadata = {
  title: 'Parental Bereavement Leave UK (Jack\'s Law): Complete Guide',
  description:
    'Complete guide to parental bereavement leave under Jack\'s Law. Covers eligibility, entitlement, statutory parental bereavement pay (SPBP), notice requirements, and employer obligations.',
  alternates: { canonical: articleUrl },
  keywords: [
    'parental bereavement leave UK',
    'Jacks Law',
    'statutory parental bereavement pay',
    'child bereavement leave',
    'parental bereavement leave entitlement',
    'bereavement leave death of child UK',
  ],
  openGraph: {
    title: 'Parental Bereavement Leave UK (Jack&apos;s Law) — Complete Guide',
    description: 'Eligibility, entitlement, pay, notice requirements, and employer obligations under Jack&apos;s Law.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Parental Bereavement Leave UK (Jack\'s Law): Complete Guide',
  description: 'Complete guide to parental bereavement leave under Jack\'s Law in the UK.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function ParentalBereavementLeaveArticle() {
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
            Parental Bereavement Leave UK (Jack&apos;s Law): Complete Guide
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Losing a child is the most devastating experience a parent can face. Since April 2020, UK law has provided employed parents with a statutory right to time off work following the death of a child. Known as <strong>Jack&apos;s Law</strong>, this legislation ensures bereaved parents have protected time to grieve. This guide explains who qualifies, what the entitlement covers, and how employers should handle it.
            </p>

            <h2>What is Jack&apos;s Law?</h2>
            <p>
              Jack&apos;s Law is the common name for the <strong>Parental Bereavement (Leave and Pay) Act 2018</strong>, which came into force on <strong>6 April 2020</strong>. It was named after Jack Herd, whose mother Lucy campaigned for statutory bereavement leave after Jack drowned in 2010 at the age of 23 months.
            </p>
            <p>
              The law gives employed parents the right to at least <strong>2 weeks&apos; leave</strong> following the death of a child under 18, or a stillbirth after 24 weeks of pregnancy. It is the first time bereaved parents have had a specific statutory right to time off work in the UK.
            </p>

            <h2>Who qualifies for parental bereavement leave?</h2>
            <p>
              The right to parental bereavement leave applies to <strong>employed parents</strong> from their first day of employment &mdash; there is no minimum length of service. The following people qualify:
            </p>
            <ul className="list-disc pl-6">
              <li>The biological mother or father of the child.</li>
              <li>The partner of the child&apos;s mother or father (if they live with the child in an enduring family relationship).</li>
              <li>An adoptive parent (or prospective adoptive parent with whom the child is placed).</li>
              <li>A person with legal parental responsibility for the child.</li>
              <li>The &quot;intended parent&quot; under a surrogacy arrangement.</li>
              <li>A &quot;parent in fact&quot; &mdash; someone who has been caring for the child in their own home for at least 4 consecutive weeks before the death, and is not being paid to do so.</li>
            </ul>
            <p>
              The right applies when a child under 18 dies, or when a baby is stillborn after 24 weeks of pregnancy.
            </p>

            <h2>How much leave are parents entitled to?</h2>
            <p>
              Eligible parents are entitled to <strong>2 weeks&apos; leave</strong>. This can be taken as:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>One block of 2 consecutive weeks</strong>, or</li>
              <li><strong>Two separate blocks of 1 week each</strong>, taken at different times.</li>
            </ul>
            <p>
              A &quot;week&quot; means the same number of days the employee normally works in a week. So if someone works 3 days a week, one week of parental bereavement leave is 3 days.
            </p>

            <h2>When can the leave be taken?</h2>
            <p>
              Parental bereavement leave can be taken at any point within <strong>56 weeks</strong> (just over a year) of the child&apos;s death. This gives parents flexibility to take time off immediately and also later &mdash; for example, around the anniversary or to deal with legal or administrative matters.
            </p>
            <p>
              If the leave is taken within the first 56 days of the death, the employee can begin their leave by giving notice before they are due to start work on their first day of absence. If taken after 56 days, they must give at least one week&apos;s notice.
            </p>

            <h2>Notice requirements</h2>
            <p>
              The notice requirements are deliberately flexible to reflect the nature of the situation:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Within 56 days of the death:</strong> The employee needs only to notify you before they are due to start work. They do not need to give notice in advance. Notice can be given verbally &mdash; it does not need to be in writing.</li>
              <li><strong>After 56 days of the death:</strong> The employee must give at least one week&apos;s notice.</li>
            </ul>
            <p>
              The employee must tell you the date of the child&apos;s death and when they want the leave to begin. They do not need to provide any written evidence or documentation &mdash; <strong>employers cannot require proof of the child&apos;s death</strong>.
            </p>

            <h2>Statutory Parental Bereavement Pay (SPBP)</h2>
            <p>
              Eligible employees can also receive <strong>Statutory Parental Bereavement Pay (SPBP)</strong> during their leave. The rate for 2025/26 is:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>&pound;184.03 per week</strong>, or</li>
              <li><strong>90% of the employee&apos;s average weekly earnings</strong>,</li>
              <li>whichever is <strong>lower</strong>.</li>
            </ul>

            <h3>Eligibility for SPBP</h3>
            <p>
              To qualify for SPBP, the employee must:
            </p>
            <ul className="list-disc pl-6">
              <li>Have at least <strong>26 weeks&apos; continuous employment</strong> ending with the week before the child&apos;s death (the &quot;relevant week&quot;).</li>
              <li>Have average weekly earnings at or above the <strong>Lower Earnings Limit</strong> (&pound;123 per week for 2025/26).</li>
              <li>Still be employed by you on the day the leave begins.</li>
            </ul>
            <p>
              Employees who do not qualify for SPBP (e.g., because they have less than 26 weeks&apos; service) are still entitled to the <strong>2 weeks&apos; unpaid leave</strong>. The right to leave and the right to pay have different qualifying criteria.
            </p>

            <h2>Protection from detriment and dismissal</h2>
            <p>
              Employees who take or seek to take parental bereavement leave are protected from:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Detriment</strong> &mdash; they cannot be subjected to any disadvantage because they took or asked for parental bereavement leave.</li>
              <li><strong>Unfair dismissal</strong> &mdash; dismissing an employee because they took or requested parental bereavement leave is automatically unfair, regardless of their length of service.</li>
            </ul>
            <p>
              These protections are the same as those for maternity, paternity, and shared parental leave.
            </p>

            <h2>How does this relate to compassionate leave?</h2>
            <p>
              Parental bereavement leave is a <strong>statutory entitlement</strong> &mdash; it exists independently of any contractual compassionate leave policy you may have. The two are separate:
            </p>
            <ul className="list-disc pl-6">
              <li>If your compassionate leave policy gives 5 days for the death of a child, the employee is still entitled to 2 weeks&apos; statutory parental bereavement leave <strong>on top of</strong> the contractual entitlement (unless your contract explicitly states otherwise).</li>
              <li>You cannot force an employee to use their statutory parental bereavement leave instead of contractual compassionate leave, or vice versa.</li>
            </ul>
            <p>
              In practice, most employers allow bereaved parents to take both &mdash; the statutory 2 weeks plus any additional contractual compassionate leave. Many also offer enhanced pay (full pay rather than the statutory rate) as part of their bereavement policy.
            </p>

            <h2>Enhanced bereavement policies</h2>
            <p>
              While the statutory minimum is 2 weeks at SPBP rate, many employers choose to go further. An enhanced bereavement policy might include:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Full pay</strong> for the 2-week statutory period (instead of &pound;184.03/week).</li>
              <li><strong>Additional paid leave</strong> beyond the 2 weeks &mdash; some employers offer 4&ndash;6 weeks.</li>
              <li><strong>Flexible return</strong> &mdash; the option to return on reduced hours or with amended duties.</li>
              <li><strong>Counselling support</strong> &mdash; access to an Employee Assistance Programme (EAP) or specialist bereavement counselling.</li>
              <li><strong>Extension to other losses</strong> &mdash; offering similar leave for miscarriage (before 24 weeks), which is not covered by Jack&apos;s Law.</li>
            </ul>

            <h2>Practical steps for employers</h2>
            <ol className="list-decimal pl-6">
              <li><strong>Update your leave policy</strong> &mdash; ensure your policy explicitly references parental bereavement leave and makes clear it is in addition to any contractual compassionate leave.</li>
              <li><strong>Train your managers</strong> &mdash; managers need to know the entitlement exists and how to respond sensitively. They should never ask for proof of the child&apos;s death.</li>
              <li><strong>Respond with compassion first</strong> &mdash; when notified, express sympathy and confirm the leave entitlement. Admin details can wait.</li>
              <li><strong>Process SPBP promptly</strong> &mdash; if the employee qualifies for pay, process it through your normal payroll.</li>
              <li><strong>Respect privacy</strong> &mdash; only share the reason for absence with colleagues if the employee has given permission.</li>
              <li><strong>Support the return</strong> &mdash; offer a phased return, reduced duties, or access to counselling when the employee comes back to work.</li>
              <li><strong>Keep records</strong> &mdash; log the leave for payroll and absence management purposes, but handle records sensitively.</li>
            </ol>

            <h2>How Leavely helps manage bereavement leave</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> supports employers in handling bereavement leave properly:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Dedicated leave type</strong> &mdash; set up parental bereavement leave as a separate category, tracked independently from compassionate leave and annual leave.</li>
              <li><strong>Privacy controls</strong> &mdash; team calendars show the employee as &quot;away&quot; without revealing the reason. Only managers and HR can see the leave type.</li>
              <li><strong>Instant approvals</strong> &mdash; managers can approve bereavement leave immediately from email or the dashboard.</li>
              <li><strong>Audit trail</strong> &mdash; every request is logged with dates and approval status, creating a clear record for compliance.</li>
              <li><strong>Reporting</strong> &mdash; track all bereavement leave across the organisation for policy reviews and reporting.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Handle bereavement leave with sensitivity and compliance</h3>
            <p className="text-emerald-100 mb-6">Leavely lets you track parental bereavement leave as a dedicated leave type with full privacy controls.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/compassionate-leave-uk" className="block text-emerald-600 hover:underline font-medium">Compassionate Leave UK: Employer Guide &rarr;</Link>
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
              <Link href="/blog/unpaid-leave-uk" className="block text-emerald-600 hover:underline font-medium">Unpaid Leave UK: When Employees Can Take It &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
