import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/toil-policy-uk`

export const metadata: Metadata = {
  title: 'TOIL Policy UK: Time Off in Lieu Explained (2026 Guide)',
  description:
    'What is TOIL (time off in lieu)? How it works in UK employment law, how to create a TOIL policy, tracking TOIL hours, common pitfalls, and best practices for employers.',
  alternates: { canonical: articleUrl },
  keywords: [
    'TOIL policy UK',
    'time off in lieu UK',
    'TOIL meaning',
    'TOIL explained',
    'time off in lieu policy template',
    'TOIL tracker',
    'TOIL employment law UK',
    'time in lieu rules UK',
    'overtime time off in lieu',
  ],
  openGraph: {
    title: 'TOIL Policy UK — Time Off in Lieu Explained',
    description: 'What is TOIL, how it works in UK law, and how to create a TOIL policy for your business.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'TOIL Policy UK: Time Off in Lieu Explained',
  description: 'Complete guide to time off in lieu (TOIL) for UK employers.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function TOILArticle() {
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
            TOIL Policy UK: Time Off in Lieu Explained
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              <strong>TOIL</strong> stands for <strong>Time Off in Lieu</strong>. It means giving employees paid time off instead of overtime pay when they work extra hours. It&apos;s a popular arrangement in UK businesses, but without a clear policy it can quickly become messy. This guide explains how TOIL works, the legal position, and how to manage it properly.
            </p>

            <h2>How does TOIL work?</h2>
            <p>The concept is simple:</p>
            <ol className="list-decimal pl-6">
              <li>An employee works extra hours beyond their contract (e.g., stays late to finish a project).</li>
              <li>Instead of being paid overtime, they &quot;bank&quot; those hours as TOIL.</li>
              <li>They take the equivalent time off at a later date.</li>
            </ol>
            <p>
              For example, if an employee works 3 extra hours on a Tuesday evening, they can take 3 hours off later that week or the following week.
            </p>

            <h2>Is TOIL a legal requirement?</h2>
            <p>
              No. There is <strong>no legal requirement</strong> in the UK to offer TOIL or to pay overtime. The only legal requirement is that:
            </p>
            <ul className="list-disc pl-6">
              <li>The employee&apos;s average pay must not fall below the <strong>National Minimum Wage</strong> when extra hours are included.</li>
              <li>The employee must not work more than an average of <strong>48 hours per week</strong> (unless they&apos;ve opted out of the Working Time Regulations).</li>
            </ul>
            <p>TOIL is an arrangement between employer and employee — it should be documented in a policy or employment contract.</p>

            <h2>What your TOIL policy should cover</h2>

            <h3>1. Eligibility</h3>
            <p>Define who can accrue TOIL. Typically salaried employees — not those already paid overtime rates.</p>

            <h3>2. Pre-approval requirement</h3>
            <p>
              State that overtime must be <strong>pre-approved by a manager</strong> before it qualifies for TOIL. This prevents employees unilaterally deciding to work late and banking hours.
            </p>

            <h3>3. How TOIL is accrued</h3>
            <p>Clarify the rate: is it hour-for-hour (most common) or a different ratio? Some companies offer 1.5× for weekend work, but hour-for-hour is standard.</p>

            <h3>4. Maximum TOIL balance</h3>
            <p>Set a cap — e.g., a maximum of 16 hours (2 days) of banked TOIL at any time. This prevents employees accumulating weeks of TOIL.</p>

            <h3>5. When TOIL must be used</h3>
            <p>
              Set a deadline — e.g., TOIL must be used within 3 months of being earned. State that unused TOIL is not carried over and is not paid out.
            </p>

            <h3>6. How to request TOIL</h3>
            <p>TOIL should be requested and approved through the same process as annual leave.</p>

            <h3>7. What happens when someone leaves</h3>
            <p>State whether unused TOIL is paid out on termination or forfeited. Most employers pay it out.</p>

            <h2>TOIL vs overtime pay — which is better?</h2>
            <ul className="list-disc pl-6">
              <li><strong>TOIL benefits employers</strong> — no additional payroll cost, just time shifted.</li>
              <li><strong>TOIL benefits employees</strong> — flexibility to take time off when they need it.</li>
              <li><strong>Overtime pay is simpler</strong> — no tracking of banked hours, no expiry dates to manage.</li>
              <li><strong>TOIL requires tracking</strong> — without a system, disputes over banked hours are common.</li>
            </ul>

            <h2>Common TOIL pitfalls</h2>
            <ol className="list-decimal pl-6">
              <li><strong>No pre-approval</strong> — employees working late without authorisation and expecting TOIL.</li>
              <li><strong>No cap</strong> — an employee banks 40 hours of TOIL and wants two weeks off.</li>
              <li><strong>No expiry</strong> — TOIL builds up indefinitely, creating a liability.</li>
              <li><strong>Tracking in spreadsheets</strong> — errors, disputes, and no audit trail.</li>
              <li><strong>Minimum wage breach</strong> — if extra hours push average pay below NMW, you have a legal problem.</li>
            </ol>

            <h2>How Leavely handles TOIL</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> has a dedicated TOIL module that tracks time off in lieu alongside regular leave:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Earn and use TOIL</strong> — employees log overtime, managers approve, TOIL balance updates automatically.</li>
              <li><strong>Visible balances</strong> — employees see their TOIL balance alongside annual leave.</li>
              <li><strong>Approval workflow</strong> — same one-click approval process as annual leave.</li>
              <li><strong>Full audit trail</strong> — every TOIL accrual and usage is logged.</li>
              <li><strong>Calendar integration</strong> — TOIL appears on the team leave calendar like any other absence.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Track TOIL alongside regular leave</h3>
            <p className="text-emerald-100 mb-6">Leavely manages TOIL accrual, balances, and approvals — no spreadsheets needed.</p>
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
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK 2026: The Complete Guide &rarr;</Link>
              <Link href="/blog/working-time-regulations-uk" className="block text-emerald-600 hover:underline font-medium">Working Time Regulations UK: What Employers Must Know &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
