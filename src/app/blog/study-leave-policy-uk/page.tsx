import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/study-leave-policy-uk`

export const metadata: Metadata = {
  title: 'Study Leave UK: Employer Guide to Time Off for Training',
  description:
    'Everything UK employers need to know about study leave — statutory rights, creating a policy, paid vs unpaid, clawback clauses, types of training covered, and tracking study leave.',
  alternates: { canonical: articleUrl },
  keywords: [
    'study leave UK',
    'study leave policy',
    'time off for training UK',
    'training leave entitlement UK',
    'study leave employment law',
    'exam leave UK',
  ],
  openGraph: {
    title: 'Study Leave UK: Employer Guide to Time Off for Training',
    description: 'A practical guide to study leave policies for UK employers — legal rights, policy design, and clawback clauses.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Study Leave UK: Employer Guide to Time Off for Training',
  description: 'Everything UK employers need to know about study leave and time off for training.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function StudyLeaveArticle() {
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
            Study Leave UK: Employer Guide to Time Off for Training
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Should you give employees time off to study? Many UK employers offer study leave as a benefit to support professional development, but the legal picture is more nuanced than most people realise. This guide covers the statutory position, how to design a study leave policy, and practical considerations around paid vs unpaid leave, clawback clauses, and tracking.
            </p>

            <h2>Is there a legal right to study leave in the UK?</h2>
            <p>
              There is <strong>no general statutory right</strong> to study leave for most UK employees. However, there are two important exceptions:
            </p>

            <h3>Young workers (16-17 year olds)</h3>
            <p>
              Under section 63A of the Employment Rights Act 1996, employees aged 16-17 who have not achieved a prescribed standard of education or training have the right to <strong>reasonable paid time off</strong> during working hours to pursue relevant education or training. This is a statutory entitlement that employers cannot refuse.
            </p>

            <h3>Right to request time off for study or training</h3>
            <p>
              Under section 63D of the Employment Rights Act 1996, employees with <strong>at least 26 weeks&apos; continuous service</strong> have the right to <strong>request</strong> time off for study or training. This is a right to request, not a right to receive — the employer can refuse the request on specified business grounds, including:
            </p>
            <ul className="list-disc pl-6">
              <li>The proposed training would not improve the employee&apos;s effectiveness at work</li>
              <li>The burden of additional costs would be too great</li>
              <li>The training would have a detrimental effect on performance</li>
              <li>Inability to reorganise work among existing staff</li>
              <li>Inability to recruit additional staff to cover</li>
              <li>There would be insufficient work during the proposed study periods</li>
              <li>There are planned structural changes during the proposed period</li>
            </ul>
            <p>
              Importantly, this right only applies to employers with <strong>250 or more employees</strong>, so most SMBs are not covered by this provision.
            </p>

            <h2>Types of training and qualifications</h2>
            <p>Study leave can cover a wide range of learning activities:</p>

            <h3>Professional qualifications</h3>
            <p>
              Accountancy exams (ACCA, ACA, CIMA), legal qualifications (SQE), HR qualifications (CIPD), project management (PRINCE2, PMP), and other professional body certifications. These are the most common reason for study leave requests.
            </p>

            <h3>Mandatory training</h3>
            <p>
              Some roles require ongoing training to maintain professional registration or comply with regulations — for example, medical professionals, financial advisers, and health and safety officers. Time off for mandatory training should normally be <strong>paid and treated as working time</strong>.
            </p>

            <h3>Continuing Professional Development (CPD)</h3>
            <p>
              Many professional bodies require members to complete a minimum number of CPD hours each year. While CPD can often be fitted around work, some activities (conferences, courses, workshops) may require time away from the office.
            </p>

            <h3>Apprenticeships</h3>
            <p>
              Apprentices have a statutory right to <strong>paid time off for off-the-job training</strong>, which must amount to at least 20% of their working hours. This is a legal requirement under the apprenticeship funding rules.
            </p>

            <h2>Paid vs unpaid study leave</h2>
            <p>There is no legal requirement to pay for study leave (except for the young worker and apprenticeship provisions above). Common approaches include:</p>
            <ul className="list-disc pl-6">
              <li><strong>Fully paid exam days</strong> — many employers offer paid time off on the day of an exam itself, even if study days are unpaid.</li>
              <li><strong>Paid study days pro-rata</strong> — e.g., 1 paid study day per exam, or 2 days per module.</li>
              <li><strong>Unpaid study leave</strong> — the employee takes the time off but doesn&apos;t receive pay. They may use annual leave instead.</li>
              <li><strong>Hybrid approach</strong> — paid leave for employer-mandated qualifications, unpaid for employee-initiated ones.</li>
            </ul>

            <h2>Designing a study leave policy</h2>

            <h3>Eligibility</h3>
            <p>
              Define who qualifies. Common criteria include a minimum period of employment (e.g., completion of probation), the qualification being relevant to their role or career development within the business, and line manager approval.
            </p>

            <h3>How many days</h3>
            <p>
              Set a clear allowance. Examples: up to <strong>5 paid study days per year</strong> for approved qualifications, or 1 day per exam plus 1 preparation day. Be specific to avoid ambiguity.
            </p>

            <h3>Evidence requirements</h3>
            <p>
              Require employees to provide evidence that they&apos;re enrolled on a course and have exam dates confirmed. This prevents the benefit being used for study that never materialises. Common evidence includes a course confirmation letter, exam timetable, or enrolment receipt.
            </p>

            <h3>Clawback clause</h3>
            <p>
              If your business funds the qualification (course fees, exam fees, or paid study time), include a <strong>clawback clause</strong> requiring the employee to repay some or all of the costs if they leave within a specified period — typically 12 to 24 months after completing the qualification. This protects your investment. Common structures:
            </p>
            <ul className="list-disc pl-6">
              <li>100% repayment if leaving within 12 months of completion</li>
              <li>50% repayment if leaving between 12 and 24 months</li>
              <li>No repayment after 24 months</li>
            </ul>
            <p>Clawback clauses must be <strong>agreed in advance</strong> and documented in writing. They are enforceable provided they are reasonable and the employee was given clear notice.</p>

            <h3>Supported qualifications</h3>
            <p>
              Specify which qualifications the business will support. This can be a named list (e.g., &quot;CIPD, ACCA, and PRINCE2&quot;) or a broader statement (e.g., &quot;professional qualifications relevant to the employee&apos;s role, as agreed with their line manager&quot;).
            </p>

            <h2>Tax implications of funded training</h2>
            <p>
              Under HMRC rules, employer-funded training is <strong>generally tax-free for the employee</strong> provided it is work-related. This includes course fees, exam fees, books, and travel to training venues. The training must be undertaken to:
            </p>
            <ul className="list-disc pl-6">
              <li>Maintain or improve skills needed in the employee&apos;s current role, or</li>
              <li>Prepare the employee for a change of role or responsibilities within the business.</li>
            </ul>
            <p>
              If the training is not work-related (e.g., a personal interest course with no connection to the employee&apos;s role), it may be treated as a <strong>taxable benefit in kind</strong>. In practice, most employer-funded professional qualifications fall within the tax-free exemption.
            </p>

            <h2>Study leave and annual leave</h2>
            <p>
              Clarify in your policy whether study leave is <strong>in addition to</strong> annual leave or whether employees are expected to use their holiday entitlement for study days. Best practice is to keep study leave separate from annual leave — this reinforces that the business values development and prevents employees from feeling they&apos;re sacrificing their holidays.
            </p>

            <h2>How Leavely tracks study leave</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> lets you set up <strong>study leave as a custom leave type</strong> with its own rules, so it&apos;s tracked separately from annual leave and sick leave:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Custom allowance</strong> — set the number of study days each employee is entitled to per year.</li>
              <li><strong>Approval workflow</strong> — route study leave requests to the relevant manager for approval.</li>
              <li><strong>Separate balances</strong> — employees see their study leave balance alongside their other leave types, so there&apos;s no confusion.</li>
              <li><strong>Reporting</strong> — see who&apos;s using study leave, how many days have been taken across the business, and plan around exam seasons.</li>
              <li><strong>Calendar integration</strong> — study leave appears on the team calendar, giving colleagues visibility of who&apos;s away for exams.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Track study leave alongside all your absence types</h3>
            <p className="text-emerald-100 mb-6">Leavely makes it easy to create custom leave types with separate allowances, approvals, and reporting.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
              <Link href="/blog/unpaid-leave-uk" className="block text-emerald-600 hover:underline font-medium">Unpaid Leave UK: Employer Rights and Obligations &rarr;</Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK 2026: Complete Guide &rarr;</Link>
              <Link href="/blog/sabbatical-leave-uk" className="block text-emerald-600 hover:underline font-medium">Sabbatical Leave UK: How It Works and What to Offer &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
