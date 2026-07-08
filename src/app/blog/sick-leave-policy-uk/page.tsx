import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/sick-leave-policy-uk`

export const metadata: Metadata = {
  title: 'Sick Leave Policy UK: What Employers Must Know (2026 Guide)',
  description:
    'Complete guide to sick leave policies for UK employers. Covers SSP rates, fit notes, reporting procedures, Bradford Factor, return-to-work interviews, and managing long-term sickness absence.',
  alternates: { canonical: articleUrl },
  keywords: [
    'sick leave policy UK',
    'sick leave entitlement UK',
    'SSP 2026',
    'statutory sick pay UK',
    'sickness absence policy template',
    'fit note rules UK',
    'managing sick leave UK',
    'sick leave tracker',
    'absence management UK',
  ],
  openGraph: {
    title: 'Sick Leave Policy UK — Complete Employer Guide 2026',
    description: 'SSP rates, fit notes, reporting procedures, Bradford Factor, and how to manage sickness absence.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Sick Leave Policy UK: What Employers Must Know',
  description: 'Complete guide to sick leave policies for UK employers.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function SickLeavePolicyArticle() {
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
            <span className="text-xs text-gray-400 ml-3">9 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Sick Leave Policy UK: What Employers Must Know
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Managing sick leave is one of the trickiest parts of running a UK business. Too lenient and you risk abuse; too strict and you risk discrimination claims. This guide covers everything you need to know about sick leave policies, statutory requirements, and best practices.
            </p>

            <h2>Statutory Sick Pay (SSP) — the legal minimum</h2>
            <p>
              All UK employers must pay <Link href="/blog/statutory-sick-pay-uk" className="text-emerald-600 hover:underline font-medium"><strong>Statutory Sick Pay (SSP)</strong></Link> to eligible employees. The key rules:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Rate:</strong> £116.75 per week (2025/26 rate — check HMRC for current year).</li>
              <li><strong>Duration:</strong> Up to 28 weeks.</li>
              <li><strong>Waiting days:</strong> SSP is not payable for the first 3 &quot;qualifying days&quot; of sickness.</li>
              <li><strong>Eligibility:</strong> Employee must earn at least £123 per week (Lower Earnings Limit) and be off for 4+ consecutive days (including non-working days).</li>
            </ul>
            <p>
              Many employers offer <Link href="/blog/occupational-sick-pay-uk" className="text-emerald-600 hover:underline font-medium">enhanced sick pay above SSP</Link> — this is entirely optional and should be detailed in your sick leave policy or employment contract.
            </p>

            <h2>When is a fit note required?</h2>
            <p>
              For absences of <strong>7 calendar days or fewer</strong>, employees can self-certify — no doctor&apos;s note needed. For absences <strong>longer than 7 days</strong>, employees must provide a fit note (formerly &quot;sick note&quot;) from their GP or hospital.
            </p>
            <p>
              A <Link href="/blog/fit-notes-employer-guide-uk" className="text-emerald-600 hover:underline font-medium">fit note</Link> can say the employee is either &quot;not fit for work&quot; or &quot;may be fit for work&quot; with adjustments (amended duties, altered hours, workplace adaptations, or <Link href="/blog/phased-return-to-work-uk" className="text-emerald-600 hover:underline font-medium">phased return</Link>).
            </p>

            <h2>What your sick leave policy should include</h2>
            <ol className="list-decimal pl-6">
              <li><strong>Notification procedure</strong> — who to contact, by what time, and how (phone, text, email).</li>
              <li><strong>Self-certification</strong> — how to self-certify for short absences (1–7 days).</li>
              <li><strong>Fit note requirements</strong> — when one is needed and where to send it.</li>
              <li><strong>SSP and company sick pay</strong> — what the employee will be paid and for how long.</li>
              <li><strong>Keeping in touch</strong> — how and when the employer will contact the employee during absence.</li>
              <li><strong>Return-to-work interviews</strong> — confirming these happen after every absence.</li>
              <li><strong>Trigger points</strong> — when absence levels will prompt a formal review (e.g., Bradford Factor thresholds).</li>
              <li><strong>Long-term sickness</strong> — what happens after extended absence, referral to occupational health, and capability procedures.</li>
            </ol>

            <h2>Return-to-work interviews</h2>
            <p>
              A return-to-work interview should happen after <strong>every</strong> absence, no matter how short. They serve several purposes:
            </p>
            <ul className="list-disc pl-6">
              <li>Welcome the employee back and check they&apos;re fit to work.</li>
              <li>Identify any underlying issues or workplace factors contributing to absence.</li>
              <li>Discuss any adjustments needed.</li>
              <li>Update the absence record.</li>
              <li>Act as a gentle deterrent against casual absence.</li>
            </ul>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> includes built-in return-to-work forms that attach directly to each absence record, creating a complete digital trail.
            </p>

            <h2>Using the Bradford Factor for sick leave management</h2>
            <p>
              The <Link href="/blog/bradford-factor-explained" className="text-emerald-600 hover:underline font-medium">Bradford Factor</Link> (B = S &times; S &times; D) helps identify patterns of frequent short-term absence. Common trigger points:
            </p>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Score</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>0–49</td><td>No action</td></tr>
                <tr><td>50–124</td><td>Informal conversation</td></tr>
                <tr><td>125–399</td><td>Formal review meeting</td></tr>
                <tr><td>400+</td><td>Written warning / further action</td></tr>
              </tbody>
            </table>
            <p>
              Always consider context — disability-related absences should be excluded under the Equality Act 2010.
            </p>

            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6 text-center">
              <p className="text-emerald-800 font-semibold mb-2">Free Bradford Factor Calculator</p>
              <p className="text-emerald-700 text-sm mb-3">Enter absence spells and total days to instantly calculate a Bradford Factor score with threshold guidance.</p>
              <Link href="/tools/bradford-factor-calculator" className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:underline">
                Try it now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <h2>Managing long-term sickness absence</h2>
            <ol className="list-decimal pl-6">
              <li><strong>Keep in regular contact</strong> — agree a frequency that works for both sides.</li>
              <li><strong>Refer to occupational health</strong> — get professional advice on likely return date and adjustments.</li>
              <li><strong>Consider reasonable adjustments</strong> — amended duties, phased return, different hours.</li>
              <li><strong>Follow a capability process</strong> — if return is unlikely, follow a fair procedure before considering dismissal. Always take legal advice.</li>
              <li><strong>Document everything</strong> — keep records of all contact, medical advice, and decisions.</li>
            </ol>

            <h2>Common mistakes to avoid</h2>
            <ul className="list-disc pl-6">
              <li><strong>Applying Bradford Factor blindly</strong> — always investigate reasons before taking action.</li>
              <li><strong>Not making reasonable adjustments</strong> — failing to accommodate disability-related absence is discrimination.</li>
              <li><strong>Inconsistent treatment</strong> — applying different standards to different employees invites tribunal claims.</li>
              <li><strong>No return-to-work interviews</strong> — skipping these means you miss important information and lose a deterrent.</li>
              <li><strong>Tracking sick leave in spreadsheets</strong> — errors and missed patterns are inevitable. Use dedicated software.</li>
            </ul>

            <h2>How Leavely helps manage sick leave</h2>
            <ul className="list-disc pl-6">
              <li><strong>Sick leave tracking</strong> — separate leave type with its own reporting.</li>
              <li><strong>Bradford Factor automatic</strong> — scores calculated from sick leave records, no manual work.</li>
              <li><strong>Return-to-work forms</strong> — digital RTW interviews attached to each absence.</li>
              <li><strong>Absence history</strong> — complete record per employee for reviews and tribunals.</li>
              <li><strong>Manager notifications</strong> — automatic alerts when sick leave is reported.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Track sick leave and Bradford Factor automatically</h3>
            <p className="text-emerald-100 mb-6">Leavely handles sick leave tracking, return-to-work forms, and Bradford Factor — all in one place.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">Bradford Factor Explained: How to Calculate and Use It &rarr;</Link>
              <Link href="/blog/return-to-work-interview-questions" className="block text-emerald-600 hover:underline font-medium">Return-to-Work Interview Questions: Free Template &rarr;</Link>
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
              <Link href="/blog/phased-return-to-work-uk" className="block text-emerald-600 hover:underline font-medium">Phased Return to Work UK: How to Get It Right &rarr;</Link>
              <Link href="/blog/occupational-sick-pay-uk" className="block text-emerald-600 hover:underline font-medium">Occupational Sick Pay UK: What Employers Need to Know &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
