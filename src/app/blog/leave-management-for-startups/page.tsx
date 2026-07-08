import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/leave-management-for-startups`

export const metadata: Metadata = {
  title: 'Leave Management for UK Startups: What You Need from Day One',
  description:
    'A practical guide for UK startup founders on leave management. Covers minimum legal requirements, common mistakes, when to move from spreadsheets to software, and how to scale your leave policies as you grow.',
  alternates: { canonical: articleUrl },
  keywords: [
    'leave management startups UK',
    'startup leave policy UK',
    'annual leave small business',
    'holiday tracking startup',
    'leave management software small business',
    'startup HR UK',
    'employee leave small business UK',
    'absence management startup',
  ],
  openGraph: {
    title: 'Leave Management for UK Startups: What You Need from Day One',
    description:
      'Everything UK startup founders need to know about managing employee leave from their first hire to their fiftieth.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Leave Management for UK Startups: What You Need from Day One',
  description:
    'Practical guide for UK startup founders on leave management. Minimum legal requirements, common mistakes, when to adopt software, and scaling leave policies.',
  url: articleUrl,
  datePublished: '2026-03-13',
  dateModified: '2026-03-13',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function LeaveManagementStartupsArticle() {
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
            Leave Management for UK Startups: What You Need from Day One
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              When you are building a startup, leave management probably ranks somewhere below &quot;product-market fit&quot; and &quot;not running out of money&quot; on your priority list. That is understandable. But getting it wrong from the start creates legal risk, payroll headaches, and resentful employees &mdash; all things that slow you down when you need speed most. Here is the minimum you need to get right and how to scale it as you grow.
            </p>

            <h2>The legal minimum: what every UK startup must provide</h2>
            <p>
              From the day you hire your first employee, you are bound by the <Link href="/blog/working-time-regulations-uk" className="text-emerald-600 hover:underline font-medium">Working Time Regulations 1998</Link>. The key requirements:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>5.6 weeks</strong> of paid annual leave per year (28 days for a full-time employee). This <em>can</em> include <Link href="/blog/bank-holidays-uk-2026" className="text-emerald-600 hover:underline font-medium">bank holidays</Link>.</li>
              <li><strong>Statutory sick pay (SSP)</strong> for employees who are off sick for 4+ consecutive days &mdash; currently &pound;116.75 per week (2025/26 rate).</li>
              <li><strong><Link href="/blog/maternity-leave-uk" className="text-emerald-600 hover:underline font-medium">Maternity</Link>, <Link href="/blog/paternity-leave-uk" className="text-emerald-600 hover:underline font-medium">paternity</Link>, <Link href="/blog/shared-parental-leave-uk" className="text-emerald-600 hover:underline font-medium">shared parental</Link>, and <Link href="/blog/adoption-leave-uk" className="text-emerald-600 hover:underline font-medium">adoption leave</Link></strong> &mdash; statutory entitlements apply regardless of company size.</li>
              <li><strong><Link href="/blog/parental-bereavement-leave-uk" className="text-emerald-600 hover:underline font-medium">Parental bereavement leave</Link></strong> &mdash; 2 weeks from day one of employment.</li>
            </ul>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <p className="text-emerald-800 mb-0">
                <strong>Founders beware:</strong> The 28-day minimum applies to <em>workers</em>, not just employees. If you have contractors who are legally &quot;workers&quot; (common in startups), they are entitled to paid leave too. Misclassification is one of the most expensive mistakes a startup can make.
              </p>
            </div>

            <h2>The 5 most common leave mistakes startups make</h2>
            <h3>1. No written leave policy</h3>
            <p>
              Even a two-person startup should have a basic <Link href="/blog/leave-policy-template-uk" className="text-emerald-600 hover:underline font-medium">leave policy</Link>. Without one, every leave request becomes a negotiation. Write down your rules &mdash; even a single page is enough &mdash; and include them in employment contracts or your staff handbook.
            </p>
            <h3>2. Not tracking leave at all</h3>
            <p>
              &quot;We are only five people, I just remember who is off.&quot; This works until it does not &mdash; usually around the time someone accuses you of approving their colleague&apos;s leave but not theirs, or an employee leaves and you owe them untaken <Link href="/blog/holiday-pay-calculation-uk" className="text-emerald-600 hover:underline font-medium">holiday pay</Link>.
            </p>
            <h3>3. Ignoring part-time and flexible workers</h3>
            <p>
              Startups often hire people on varied contracts: 3 days a week, compressed hours, term-time only. Each requires a different <Link href="/blog/pro-rata-annual-leave-calculator" className="text-emerald-600 hover:underline font-medium">pro-rata calculation</Link>, and getting it wrong means either overpaying or underpaying leave &mdash; both of which are problems.
            </p>
            <h3>4. No absence management process</h3>
            <p>
              When someone is off sick repeatedly, many startup founders either ignore it (too awkward) or overreact (too heavy-handed). A simple <Link href="/blog/sick-leave-policy-uk" className="text-emerald-600 hover:underline font-medium">sick leave policy</Link> with clear triggers (e.g. a <Link href="/blog/return-to-work-interview-questions" className="text-emerald-600 hover:underline font-medium">return-to-work conversation</Link> after every absence) gives you a fair, consistent framework.
            </p>
            <h3>5. Forgetting about leave when someone resigns</h3>
            <p>
              When an employee hands in their notice, you must calculate and pay any <Link href="/blog/annual-leave-during-notice-period-uk" className="text-emerald-600 hover:underline font-medium">accrued but untaken leave</Link>. If you have not been tracking balances, this calculation becomes guesswork &mdash; and guesswork invites disputes.
            </p>

            <h2>Spreadsheets vs software: when to make the switch</h2>
            <p>
              A Google Sheet can genuinely work for a team of 2&ndash;5 people. Beyond that, the cracks appear fast:
            </p>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Team size</th>
                  <th>Approach</th>
                  <th>Why</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>1&ndash;5</strong></td><td>Spreadsheet + written policy</td><td>Low volume; founder can manage manually</td></tr>
                <tr><td><strong>6&ndash;15</strong></td><td>Dedicated leave management tool</td><td>Multiple leave types, part-timers, coverage planning needed</td></tr>
                <tr><td><strong>15+</strong></td><td>Leave management tool with integrations</td><td>Payroll sync, reporting, audit trail, manager self-service essential</td></tr>
              </tbody>
            </table>
            <p>
              The tipping point for most startups is <strong>around 8&ndash;10 employees</strong>. At that point, the founder or office manager is spending several hours per month on leave admin, errors creep in, and the lack of a team calendar causes scheduling conflicts.
            </p>

            <h2>What to look for in leave management software</h2>
            <p>
              Not all tools are built for startups. Here is what matters most when you are small and growing:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Quick setup</strong> &mdash; you should be live in under 30 minutes, not three weeks of &quot;implementation.&quot;</li>
              <li><strong>Per-seat pricing</strong> &mdash; pay for the team you have today, not the team you hope to have next year. Avoid platforms with minimum seat counts or annual commitments.</li>
              <li><strong>UK-specific</strong> &mdash; bank holidays, statutory leave types, and <Link href="/blog/working-time-regulations-uk" className="text-emerald-600 hover:underline font-medium">Working Time Regulations</Link> compliance should be built in, not bolted on.</li>
              <li><strong>Self-service</strong> &mdash; employees should be able to check their balance and submit requests without asking anyone. Managers should approve with one click.</li>
              <li><strong>Team calendar</strong> &mdash; a visual view of who is off when, so you can spot clashes before they happen.</li>
              <li><strong>Scales with you</strong> &mdash; adding new employees, leave types, and policies should take minutes, not a support ticket.</li>
            </ul>

            <h2>Building a leave policy that scales</h2>
            <p>
              Your first leave policy does not need to be complex. Start with the basics and add layers as you grow:
            </p>
            <h3>Stage 1: Foundation (1&ndash;10 employees)</h3>
            <ul className="list-disc pl-6">
              <li>Standard <Link href="/blog/annual-leave-entitlement-uk" className="text-emerald-600 hover:underline font-medium">annual leave entitlement</Link> (e.g. 25 days + bank holidays).</li>
              <li><Link href="/blog/sick-leave-policy-uk" className="text-emerald-600 hover:underline font-medium">Sick leave policy</Link> with SSP and return-to-work process.</li>
              <li>Clear request and approval process.</li>
            </ul>
            <h3>Stage 2: Growing (10&ndash;30 employees)</h3>
            <ul className="list-disc pl-6">
              <li>Add <Link href="/blog/compassionate-leave-uk" className="text-emerald-600 hover:underline font-medium">compassionate leave</Link>, <Link href="/blog/study-leave-policy-uk" className="text-emerald-600 hover:underline font-medium">study leave</Link>, and <Link href="/blog/toil-policy-uk" className="text-emerald-600 hover:underline font-medium">TOIL</Link> policies.</li>
              <li>Introduce manager-level approval workflows.</li>
              <li>Define <Link href="/blog/carry-over-annual-leave-uk" className="text-emerald-600 hover:underline font-medium">carry-over rules</Link>.</li>
              <li>Consider enhanced maternity/paternity pay as a retention tool.</li>
            </ul>
            <h3>Stage 3: Scaling (30+ employees)</h3>
            <ul className="list-disc pl-6">
              <li>Long-service leave increases (e.g. extra day per year of service).</li>
              <li><Link href="/blog/sabbatical-leave-uk" className="text-emerald-600 hover:underline font-medium">Sabbatical policy</Link> for tenured employees.</li>
              <li><Link href="/blog/duvet-days-policy" className="text-emerald-600 hover:underline font-medium">Duvet days</Link> or mental health days as a wellbeing benefit.</li>
              <li>Audit trail and reporting for compliance and board-level visibility.</li>
            </ul>

            <h2>A note on startup culture and leave</h2>
            <p>
              Startup culture can inadvertently discourage people from taking leave. When everyone is working hard and the mission feels urgent, booking two weeks in the Algarve can feel like letting the team down. This is a cultural problem that founders must actively counter:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Model the behaviour you want</strong> &mdash; if founders take their leave, everyone else will feel comfortable doing the same.</li>
              <li><strong>Do not celebrate &quot;hustle culture&quot;</strong> &mdash; praising people for never taking a day off sends the wrong message.</li>
              <li><strong>Make leave visible</strong> &mdash; a shared team calendar normalises time off and helps with planning.</li>
            </ul>

            <h2>How Leavely is built for startups</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> was designed from the ground up for growing UK teams. Here is why startups choose it:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Live in 10 minutes</strong> &mdash; add your team, set your policy, and you are done. No onboarding calls or implementation projects.</li>
              <li><strong>From &pound;8/user/month</strong> &mdash; true per-seat pricing with a 14-day free trial. No minimums.</li>
              <li><strong>UK bank holidays built in</strong> &mdash; England &amp; Wales, Scotland, and Northern Ireland variants included.</li>
              <li><strong>All statutory leave types</strong> &mdash; annual leave, sick leave, maternity, paternity, shared parental, and more, pre-configured for UK law.</li>
              <li><strong>Grows with you</strong> &mdash; add employees, policies, and leave types as your team scales, with no migration needed.</li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Get leave management right from day one</h3>
            <p className="text-emerald-100 mb-6">Try Leavely free for 14 days &mdash; built for UK startups, from your first hire to your fiftieth.</p>
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
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK 2026: The Complete Guide &rarr;</Link>
              <Link href="/blog/best-leave-management-software-uk" className="block text-emerald-600 hover:underline font-medium">Best Leave Management Software UK: 2026 Comparison &rarr;</Link>
              <Link href="/blog/hr-software-small-business-uk" className="block text-emerald-600 hover:underline font-medium">HR Software for Small Business UK: What You Actually Need &rarr;</Link>
              <Link href="/blog/accrual-based-leave-uk" className="block text-emerald-600 hover:underline font-medium">Accrual-Based Leave UK: Monthly vs Upfront Allowance &rarr;</Link>
              <Link href="/blog/approval-delegation-leave-management" className="block text-emerald-600 hover:underline font-medium">Leave Approval Delegation: Keep Approvals Moving &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
