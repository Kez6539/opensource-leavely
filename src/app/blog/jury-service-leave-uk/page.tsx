import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/jury-service-leave-uk`

export const metadata: Metadata = {
  title: 'Jury Service Leave UK: Employer Rights & Obligations',
  description:
    'What are your obligations when an employee is called for jury service? Covers pay, time off, deferral, annual leave impact, and how to manage jury duty absence in the UK.',
  alternates: { canonical: articleUrl },
  keywords: [
    'jury service leave UK',
    'time off for jury service',
    'jury duty employer obligations UK',
    'jury service pay',
    'can employer refuse jury service',
  ],
  openGraph: {
    title: 'Jury Service Leave UK: Employer Rights & Obligations',
    description: 'Everything UK employers need to know about jury service leave — obligations, pay, deferral, and managing the absence.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Jury Service Leave UK: Employer Rights & Obligations',
  description: 'A guide for UK employers on managing jury service leave.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function JuryServiceLeaveArticle() {
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
            <span className="text-xs text-gray-400 ml-3">5 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Jury Service Leave UK: Employer Rights &amp; Obligations
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              When one of your employees receives a jury summons, you need to handle it correctly. Jury service is a civic duty protected by law, and employers who obstruct it can face serious consequences. This guide explains your obligations, what you need to pay (if anything), and how to manage the absence smoothly.
            </p>

            <h2>The legal obligation to allow time off</h2>
            <p>
              Under the <strong>Juries Act 1974</strong>, every employer in England and Wales must allow an employee to attend jury service when summoned. It is a <strong>criminal offence</strong> to try to prevent an employee from attending. This applies regardless of how inconvenient the timing may be for the business.
            </p>
            <p>
              In Scotland, jury service is governed by the Law Reform (Miscellaneous Provisions) (Scotland) Act 1980, with similar obligations on employers. In Northern Ireland, the Juries (Northern Ireland) Order 1996 applies.
            </p>

            <h2>How long does jury service last?</h2>
            <p>
              Jury service in England and Wales typically lasts for <strong>2 weeks (10 working days)</strong>. However, employees may be selected for longer trials that can last weeks or even months. The court will inform the employee of the expected duration in the summons or at the start of service.
            </p>
            <p>
              In practice, some jurors are released early if they are not selected for a trial, while others may serve for the full period or beyond. Employers should plan for the full 2-week period as a minimum.
            </p>

            <h2>Pay during jury service</h2>
            <p>
              There is <strong>no legal requirement</strong> for employers to pay employees during jury service. However, many employers choose to continue paying — either as full pay or a top-up above the court allowance. Common approaches include:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Full pay</strong> — the employer pays normal salary throughout. This is the most employee-friendly approach and is common in larger organisations.</li>
              <li><strong>Top-up pay</strong> — the employer pays the difference between the court allowance and the employee&apos;s normal salary.</li>
              <li><strong>No pay</strong> — the employee claims the loss of earnings allowance directly from the court.</li>
            </ul>

            <h3>Court allowances</h3>
            <p>
              Employees who are not paid by their employer during jury service can claim allowances from the court, including:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Loss of earnings</strong> — up to &pound;64.95 per day for the first 10 days, and up to &pound;129.91 per day after that (rates subject to change).</li>
              <li><strong>Travel expenses</strong> — the cost of travelling to and from court.</li>
              <li><strong>Subsistence</strong> — a daily allowance for food and drink if serving away from home.</li>
            </ul>
            <p>
              Your policy should make clear what the employee will be paid and what they need to claim from the court themselves.
            </p>

            <h2>Can the employer refuse or defer jury service?</h2>
            <p>
              An employer <strong>cannot refuse</strong> an employee&apos;s jury service. However, either the employee or the employer can apply to the court for a <strong>deferral</strong> (postponement to a later date) or, in rare cases, <strong>excusal</strong> (complete exemption).
            </p>
            <p>
              Grounds for deferral include:
            </p>
            <ul className="list-disc pl-6">
              <li>The employee is the only person who can perform a critical role during a busy period.</li>
              <li>Pre-booked holidays that cannot be changed.</li>
              <li>Exams or professional qualifications with fixed dates.</li>
              <li>A colleague is already on jury service at the same time, leaving the team severely short-staffed.</li>
            </ul>
            <p>
              Deferral is usually granted once, but the court is not obliged to agree. Applications should be made promptly after the summons is received.
            </p>

            <h2>Impact on annual leave</h2>
            <p>
              Jury service should <strong>not be deducted from annual leave</strong>. It is a separate category of absence. Requiring employees to use their holiday entitlement for jury service would be unfair and could expose the employer to claims. Annual leave continues to accrue during jury service as normal.
            </p>

            <h2>Impact on other employment terms</h2>
            <p>
              An employee on jury service retains all their employment rights, including:
            </p>
            <ul className="list-disc pl-6">
              <li>Continuity of service is unbroken.</li>
              <li>Pension contributions should continue as normal (check your scheme rules).</li>
              <li>The employee should not suffer any detriment — no demotion, no loss of promotion opportunity, and no dismissal because of jury service.</li>
              <li>Dismissing an employee for attending jury service is likely to be automatically unfair dismissal.</li>
            </ul>

            <h2>What to tell employees</h2>
            <p>
              When an employee receives a jury summons, make sure they know:
            </p>
            <ol className="list-decimal pl-6">
              <li>They must inform their manager as soon as possible after receiving the summons.</li>
              <li>Whether the company pays during jury service (full pay, top-up, or no pay).</li>
              <li>How to claim the court loss of earnings allowance (if applicable).</li>
              <li>That they should return to work on any days when the court releases them early or does not require their attendance.</li>
              <li>That jury service absence will not count against them in any absence management process.</li>
            </ol>

            <h2>Record keeping</h2>
            <p>
              Keep a record of the jury service dates, any correspondence with the court, and how the absence was handled. This provides an audit trail in case of any future dispute or tribunal claim.
            </p>

            <h2>How Leavely tracks jury service</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> lets you manage jury service as a distinct leave type, keeping it separate from annual leave and sick leave:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Custom leave type</strong> — set up &quot;Jury Service&quot; as a dedicated absence category with its own tracking.</li>
              <li><strong>No impact on allowances</strong> — jury service does not reduce the employee&apos;s annual leave balance.</li>
              <li><strong>Calendar visibility</strong> — the team calendar shows jury service alongside other absences, helping with resource planning.</li>
              <li><strong>Audit trail</strong> — all jury service records are logged with dates, approvals, and notes.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Track every type of leave in one place</h3>
            <p className="text-emerald-100 mb-6">Jury service, annual leave, sick leave, TOIL — Leavely handles them all with separate tracking and a unified calendar.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/unpaid-leave-uk" className="block text-emerald-600 hover:underline font-medium">Unpaid Leave UK: When Employees Can Take It &rarr;</Link>
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
              <Link href="/blog/compassionate-leave-uk" className="block text-emerald-600 hover:underline font-medium">Compassionate Leave UK: What Employers Must Know &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
