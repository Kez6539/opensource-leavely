import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/leave-policy-template-uk`

export const metadata: Metadata = {
  title: 'How to Create a Leave Policy UK: Free Template & Guide (2026)',
  description:
    'Step-by-step guide to writing a leave policy for your UK business. Covers statutory entitlement, leave types, approval process, carry-over rules, and a free template you can use today.',
  alternates: { canonical: articleUrl },
  keywords: [
    'leave policy template UK',
    'annual leave policy template',
    'how to create a leave policy',
    'leave policy for small business UK',
    'holiday policy template UK',
    'employee leave policy example',
    'absence policy template UK',
    'time off policy UK',
  ],
  openGraph: {
    title: 'How to Create a Leave Policy UK — Free Template & Guide',
    description: 'Step-by-step guide with a free leave policy template for UK businesses.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Create a Leave Policy UK: Free Template & Guide',
  description: 'Step-by-step guide to writing a leave policy for your UK business.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function LeavePolicyArticle() {
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
            <span className="text-xs text-gray-400 ml-3">10 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            How to Create a Leave Policy for Your UK Business: Template & Guide
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Every UK employer needs a clear leave policy. It sets expectations, reduces disputes, and ensures you meet your legal obligations under the Working Time Regulations 1998. This guide walks you through creating one from scratch, with a template you can adapt for your business.
            </p>

            <h2>Why you need a written leave policy</h2>
            <p>Without a formal policy, you risk:</p>
            <ul className="list-disc pl-6">
              <li><strong>Inconsistent decisions</strong> — managers approving leave differently across teams.</li>
              <li><strong>Legal disputes</strong> — employees challenging leave decisions with no documented process.</li>
              <li><strong>Understaffing</strong> — too many people off at the same time with no booking rules.</li>
              <li><strong>Carry-over confusion</strong> — unclear rules about what happens to unused leave.</li>
            </ul>

            <h2>What your leave policy should cover</h2>

            <h3>1. Annual leave entitlement</h3>
            <p>
              State the statutory minimum (5.6 weeks / 28 days for full-time) and any additional days your company offers. Clarify whether bank holidays are included in or additional to the entitlement.
            </p>

            <h3>2. Leave year</h3>
            <p>
              Define when the leave year starts and ends. Common choices are January–December or April–March (aligning with the tax year). State how entitlement is calculated for employees who join mid-year.
            </p>

            <h3>3. How to request leave</h3>
            <p>
              Describe the process: how far in advance requests must be made, who approves them, and how employees submit requests (email, HR system, or leave management software like <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link>).
            </p>

            <h3>4. Approval rules</h3>
            <p>
              Set guidelines for when leave can be refused — for example, during <Link href="/blog/blackout-dates-leave-management" className="text-emerald-600 hover:underline font-medium">busy periods</Link>, if too many people are already off, or if insufficient notice was given. Many employers set a <Link href="/blog/minimum-notice-period-leave-requests" className="text-emerald-600 hover:underline font-medium">minimum notice period</Link> for leave requests, with the statutory default being twice the length of the leave requested (e.g., 2 days&apos; notice for 1 day off).
            </p>

            <h3>5. Carry-over rules</h3>
            <p>
              State whether unused leave can be carried over, and if so, how much and by when. The <Link href="/blog/carry-over-annual-leave-uk" className="text-emerald-600 hover:underline font-medium">statutory allowance permits up to 1.6 weeks (8 days)</Link> to be carried over if agreed. Many employers adopt a &quot;use it or lose it&quot; approach for anything above the statutory carry-over.
            </p>

            <h3>6. Leave types</h3>
            <p>List every type of leave your company offers:</p>
            <ul className="list-disc pl-6">
              <li><strong>Annual leave</strong> (holiday)</li>
              <li><strong>Sick leave</strong> — include your reporting process and SSP details.</li>
              <li><strong>Compassionate leave</strong> — bereavement, family emergencies.</li>
              <li><strong>Parental leave</strong> — maternity, paternity, shared parental, adoption.</li>
              <li><strong>TOIL</strong> (time off in lieu) — if employees can earn time back for overtime.</li>
              <li><strong>Unpaid leave</strong> — when it&apos;s available and how to request it.</li>
              <li><strong>Study leave</strong> — if applicable.</li>
            </ul>

            <h3>7. Sickness absence process</h3>
            <p>
              Define how employees report sick (who to contact, by when), when a doctor&apos;s note (fit note) is required (after 7 consecutive days), and your return-to-work interview process.
            </p>

            <h3>8. Company shutdown periods</h3>
            <p>
              If your business closes for Christmas or other periods, state this clearly. Explain whether shutdown days are deducted from the employee&apos;s annual leave allowance.
            </p>

            <h2>Free leave policy template</h2>
            <div className="rounded-xl bg-gray-50 border p-6 my-6 text-sm">
              <p className="font-bold text-gray-900 mb-3 text-base">Leave Policy — [Company Name]</p>
              <p className="mb-2"><strong>Effective date:</strong> [Date]</p>
              <p className="mb-4"><strong>Applies to:</strong> All employees of [Company Name]</p>

              <p className="font-bold text-gray-900 mb-2">1. Annual Leave Entitlement</p>
              <p className="mb-4">Full-time employees are entitled to [28/25+8 bank holidays] days of paid annual leave per year. Part-time employees receive a pro-rata entitlement based on their contracted hours. The leave year runs from [1 January] to [31 December].</p>

              <p className="font-bold text-gray-900 mb-2">2. Requesting Leave</p>
              <p className="mb-4">Leave requests must be submitted at least [X days/weeks] in advance via [method]. Your line manager will respond within [X working days]. Requests may be declined if too many team members are already absent or during peak business periods.</p>

              <p className="font-bold text-gray-900 mb-2">3. Carry-Over</p>
              <p className="mb-4">Up to [X] days of unused annual leave may be carried over to the next leave year, and must be used by [date]. Any leave not taken or carried over will be forfeited.</p>

              <p className="font-bold text-gray-900 mb-2">4. Sickness Absence</p>
              <p className="mb-4">If you are unable to attend work due to illness, you must notify [your manager/HR] by [time] on the first day of absence. A fit note is required for absences lasting more than 7 consecutive days. A return-to-work interview will be conducted after every absence.</p>

              <p className="font-bold text-gray-900 mb-2">5. Other Leave Types</p>
              <p className="mb-4">The company also provides: compassionate leave (up to [X] days), parental leave (as per statutory entitlement), and unpaid leave (at management discretion). TOIL may be agreed with your line manager for pre-approved overtime.</p>

              <p className="font-bold text-gray-900 mb-2">6. Company Shutdowns</p>
              <p className="mb-0">The company closes for [X days] over Christmas. These days will be deducted from your annual leave allowance. You will be notified of the exact dates by [date] each year.</p>
            </div>

            <h2>How to enforce your leave policy consistently</h2>
            <ol className="list-decimal pl-6">
              <li><strong>Use leave management software</strong> — manual tracking leads to errors and inconsistency. Tools like <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> automate balances, approvals, and policy enforcement.</li>
              <li><strong>Train managers</strong> — ensure all managers understand the policy and apply it consistently.</li>
              <li><strong>Include it in onboarding</strong> — every new starter should read and acknowledge the leave policy.</li>
              <li><strong>Review annually</strong> — update the policy each year to reflect changes in legislation or company practice.</li>
            </ol>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Enforce your leave policy automatically</h3>
            <p className="text-emerald-100 mb-6">Leavely tracks balances, enforces policies, and handles approvals — so your leave policy actually works.</p>
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
              <Link href="/blog/sick-leave-policy-uk" className="block text-emerald-600 hover:underline font-medium">Sick Leave Policy UK: What Employers Must Know &rarr;</Link>
              <Link href="/blog/toil-policy-uk" className="block text-emerald-600 hover:underline font-medium">TOIL Policy UK: Time Off in Lieu Explained &rarr;</Link>
              <Link href="/blog/absence-management-policy-uk" className="block text-emerald-600 hover:underline font-medium">Absence Management Policy UK: Complete Guide &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
