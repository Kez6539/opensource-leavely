import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/can-employer-refuse-holiday-request-uk`

export const metadata: Metadata = {
  title: 'Can an Employer Refuse a Holiday Request UK? Your Rights Explained',
  description:
    'Can your employer refuse your holiday request in the UK? Learn the legal position, notice requirements, when employers can and cannot refuse annual leave, and how to handle disputes.',
  alternates: { canonical: articleUrl },
  keywords: [
    'can employer refuse holiday UK',
    'refuse annual leave request',
    'employer refuse holiday',
    'can my boss refuse my holiday',
    'holiday request refused UK',
    'annual leave refusal rights UK',
    'employer reject holiday request',
  ],
  openGraph: {
    title: 'Can an Employer Refuse a Holiday Request UK?',
    description: 'The legal position on refusing annual leave in the UK, and what both employers and employees need to know.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Can an Employer Refuse a Holiday Request UK? Your Rights Explained',
  description: 'The legal position on refusing annual leave in the UK.',
  url: articleUrl,
  datePublished: '2026-04-04',
  dateModified: '2026-04-04',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function RefuseHolidayRequestArticle() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Employment Law</span>
            <span className="text-xs text-gray-400 ml-3">8 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Can an Employer Refuse a Holiday Request UK? Your Rights Explained
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              The short answer is <strong>yes</strong>. UK employers can refuse a holiday request, but there are rules about how and when they can do so. Getting this wrong can lead to grievances, tribunal claims, or simply a demoralised workforce. This guide covers the legal position, the notice requirements, and how to handle refusals fairly.
            </p>

            <h2>What does UK law say?</h2>
            <p>
              Under the <Link href="/blog/working-time-regulations-uk" className="text-emerald-600 hover:underline font-medium">Working Time Regulations 1998</Link>, all workers are entitled to a minimum of <strong>5.6 weeks of paid annual leave</strong> per year (28 days for full time employees, including bank holidays if the employer counts them).
            </p>
            <p>
              The regulations give employers the right to control <strong>when</strong> leave is taken, not <strong>whether</strong> it is taken. This means you can refuse a specific date but you cannot prevent an employee from taking their full entitlement during the leave year.
            </p>

            <h2>Counter notice: the legal mechanism</h2>
            <p>
              The Working Time Regulations set out a notice framework. An employee must give notice equal to <strong>twice the length of leave requested</strong>. For example, one week of leave requires two weeks&apos; notice.
            </p>
            <p>
              If the employer wants to refuse, they must give a <strong>counter notice</strong> equal to the length of leave requested. So to refuse one week of leave, you must give at least one week&apos;s notice of the refusal.
            </p>
            <p>
              In practice, most employment contracts override these default notice periods with their own rules (e.g. &quot;requests must be submitted at least two weeks in advance&quot;). This is perfectly legal as long as the contract does not remove the right to take leave entirely.
            </p>

            <h2>When can you legitimately refuse?</h2>
            <p>
              Employers typically refuse holiday requests for genuine business reasons:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Staffing levels</strong>: too many people already off on the requested dates</li>
              <li><strong>Peak periods</strong>: the business has a known busy season (e.g. retail at Christmas, accounting firms in January)</li>
              <li><strong>Short notice</strong>: the request does not meet the required notice period</li>
              <li><strong>Project deadlines</strong>: a critical deliverable is due and the employee&apos;s role is essential</li>
              <li><strong>Blackout dates</strong>: the company has pre-communicated periods when leave is restricted</li>
            </ul>

            <h2>When can you NOT refuse?</h2>
            <p>
              There are situations where refusing leave is unlawful or extremely risky:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Preventing someone from taking their entitlement</strong>: if an employee has leave remaining and the year is running out, repeatedly refusing is likely unlawful</li>
              <li><strong>Discrimination</strong>: refusing leave for religious holidays while approving similar requests from others could be indirect discrimination under the Equality Act 2010</li>
              <li><strong>Retaliation</strong>: refusing leave because an employee raised a grievance or whistleblowing concern is automatically unfair</li>
              <li><strong>No reason given</strong>: while the law does not explicitly require a reason, failing to give one invites grievances and damages trust</li>
            </ul>

            <h2>Blackout dates and restricted periods</h2>
            <p>
              Many businesses use <Link href="/blog/blackout-dates-leave-management" className="text-emerald-600 hover:underline font-medium">blackout dates</Link> to block leave during known busy periods. This is perfectly legal provided you:
            </p>
            <ul className="list-disc pl-6">
              <li>Communicate the dates clearly in advance (ideally at the start of the leave year)</li>
              <li>Include the policy in employment contracts or the employee handbook</li>
              <li>Apply the restrictions consistently to everyone (or have a clear, fair reason for exceptions)</li>
              <li>Still allow employees to take their full entitlement during the rest of the year</li>
            </ul>

            <h2>What about &quot;first come, first served&quot;?</h2>
            <p>
              Many employers approve leave requests on a first come, first served basis. This is a reasonable approach, but it can create problems:
            </p>
            <ul className="list-disc pl-6">
              <li>Employees without school age children tend to book popular dates earlier, leaving parents unable to take leave during school holidays</li>
              <li>Long serving employees may have better knowledge of the system and book first every year</li>
              <li>It can create a &quot;race to book&quot; mentality that feels stressful and unfair</li>
            </ul>
            <p>
              Consider using a rotation system for popular periods (e.g. alternating who gets Christmas off each year) alongside first come, first served for the rest of the year.
            </p>

            <h2>Handling clashes fairly</h2>
            <p>
              When two employees request the same dates, you need a fair and transparent process:
            </p>
            <ol className="list-decimal pl-6">
              <li>Check who submitted their request first</li>
              <li>Consider whether either employee has a particular need (e.g. a wedding, school holidays for a parent)</li>
              <li>Look at who had priority last time there was a clash</li>
              <li>Discuss with both employees and try to find a compromise</li>
              <li>Document the decision and the reasons</li>
            </ol>
            <p>
              The worst thing you can do is make inconsistent decisions with no explanation. This breeds resentment and grievance claims.
            </p>

            <h2>What should your policy say?</h2>
            <p>
              Your <Link href="/blog/leave-policy-template-uk" className="text-emerald-600 hover:underline font-medium">leave policy</Link> should clearly cover:
            </p>
            <ul className="list-disc pl-6">
              <li>How far in advance requests must be submitted</li>
              <li>The maximum number of people who can be off at the same time (per team or department)</li>
              <li>Any blackout dates or restricted periods</li>
              <li>How clashes are resolved</li>
              <li>How refusals are communicated (in writing, with a reason)</li>
              <li>The right to appeal a refusal</li>
            </ul>

            <h2>Tips for employers</h2>
            <ul className="list-disc pl-6">
              <li><strong>Always explain why</strong>: a short reason (&quot;we already have three team members off that week&quot;) goes a long way</li>
              <li><strong>Suggest alternatives</strong>: if you refuse specific dates, offer alternatives where possible</li>
              <li><strong>Respond quickly</strong>: leaving requests unanswered for weeks is poor practice and prevents employees from making plans</li>
              <li><strong>Keep records</strong>: document every request, approval, and refusal with dates and reasons</li>
              <li><strong>Review patterns</strong>: if you are refusing a lot of requests, you may have a staffing or planning problem rather than a leave problem</li>
            </ul>

            <h2>How Leavely helps manage holiday requests</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> takes the friction out of leave approvals:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Clash detection</strong>: see instantly if approving a request would leave a team understaffed</li>
              <li><strong>Blackout dates</strong>: block leave during busy periods so employees cannot request those dates</li>
              <li><strong>One click approvals</strong>: managers approve or decline from email, Slack, or the app</li>
              <li><strong>Team calendar</strong>: see who is already off before making a decision</li>
              <li><strong>Full audit trail</strong>: every request, approval, and refusal is logged automatically</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Handle holiday requests fairly and fast</h3>
            <p className="text-emerald-100 mb-6">Leavely detects clashes, enforces blackout dates, and gives managers everything they need to decide.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK 2026: The Complete Guide &rarr;</Link>
              <Link href="/blog/blackout-dates-leave-management" className="block text-emerald-600 hover:underline font-medium">Blackout Dates for Leave Management &rarr;</Link>
              <Link href="/blog/leave-clash-detection-software" className="block text-emerald-600 hover:underline font-medium">Leave Clash Detection: How to Prevent Understaffing &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
