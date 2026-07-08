import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/duvet-days-policy`

export const metadata: Metadata = {
  title: 'Duvet Days: Should Your Business Offer Them? (UK Guide)',
  description:
    'What are duvet days, how do they work, and should your UK business offer them? Covers policy setup, pros and cons, legal position, and how to track duvet days.',
  alternates: { canonical: articleUrl },
  keywords: [
    'duvet days',
    'duvet day policy',
    'mental health days UK',
    'duvet days employment law',
    'wellbeing days off',
    'duvet day meaning',
  ],
  openGraph: {
    title: 'Duvet Days: Should Your Business Offer Them?',
    description: 'A practical UK guide to duvet day policies — what they are, how to set one up, and how to track them.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Duvet Days: Should Your Business Offer Them? (UK Guide)',
  description: 'What are duvet days, how do they work, and should your UK business offer them?',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function DuvetDaysArticle() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">People Strategy</span>
            <span className="text-xs text-gray-400 ml-3">5 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Duvet Days: Should Your Business Offer Them?
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              A <strong>duvet day</strong> is an unplanned day off that an employee can take at short notice without giving a reason. Unlike sick leave, there&apos;s no requirement to be ill. Unlike annual leave, there&apos;s no need to book it in advance. The employee simply contacts their manager on the morning of the day and takes the time off. It&apos;s a perk that&apos;s growing in popularity across UK businesses, particularly in sectors competing for talent.
            </p>

            <h2>What exactly is a duvet day?</h2>
            <p>
              The concept originated in the late 1990s and the name says it all — it&apos;s a day when an employee can stay under the duvet instead of coming to work. Duvet days sit in a grey area between annual leave and sick leave. They&apos;re a <strong>separate category of paid leave</strong>, offered as a contractual benefit by the employer.
            </p>
            <p>
              Typically, businesses offer between <strong>1 and 3 duvet days per year</strong>. They operate on a first-come, first-served basis, meaning if too many people on the same team request a duvet day on the same morning, only some may be approved.
            </p>

            <h2>How do duvet days work?</h2>
            <ul className="list-disc pl-6">
              <li><strong>No advance notice needed</strong> — the employee contacts their manager on the morning of the day, usually before their normal start time.</li>
              <li><strong>No reason required</strong> — the whole point is that the employee doesn&apos;t need to justify the absence.</li>
              <li><strong>First come, first served</strong> — if minimum staffing levels are at risk, the manager can decline the request.</li>
              <li><strong>Separate from sick leave</strong> — duvet days don&apos;t count towards sickness records or trigger Bradford Factor thresholds.</li>
              <li><strong>Separate from annual leave</strong> — they come from a distinct allowance and don&apos;t reduce the employee&apos;s holiday entitlement.</li>
              <li><strong>Usually can&apos;t be carried over</strong> — unused duvet days expire at the end of the leave year.</li>
            </ul>

            <h2>The benefits of offering duvet days</h2>

            <h3>1. Reduces fake sick calls</h3>
            <p>
              Let&apos;s be honest — some sick days aren&apos;t genuine. When employees feel they have no legitimate way to take a mental break, they call in sick. Duvet days give people an honest alternative, which can actually <strong>reduce overall absence rates</strong>.
            </p>

            <h3>2. Supports mental health</h3>
            <p>
              Sometimes people just need a day. They might be feeling overwhelmed, dealing with a personal issue, or simply running on empty. A duvet day provides a pressure valve without the stigma of calling in sick or the guilt of &quot;wasting&quot; annual leave.
            </p>

            <h3>3. Boosts morale and trust</h3>
            <p>
              Offering duvet days sends a message: <strong>&quot;We trust you to manage your own wellbeing.&quot;</strong> That trust builds loyalty and engagement. Employees feel valued rather than monitored.
            </p>

            <h3>4. Modern employer brand</h3>
            <p>
              In a competitive job market, duvet days are a low-cost perk that makes your business stand out. They&apos;re particularly attractive to younger workers who value flexibility and work-life balance.
            </p>

            <h2>The risks and downsides</h2>

            <h3>Potential for abuse</h3>
            <p>
              With only 1-3 days per year, the scope for abuse is limited. However, if duvet days are taken on Mondays and Fridays to extend weekends, or always on the same day as a particular colleague, it may indicate a pattern worth addressing.
            </p>

            <h3>Coverage issues</h3>
            <p>
              Because duvet days are unplanned, they can cause staffing problems. Small teams are particularly vulnerable. This is why your policy should include a minimum-staffing clause allowing managers to decline requests when necessary.
            </p>

            <h3>Cost</h3>
            <p>
              Duvet days are paid days off, so there is a cost. But if they genuinely reduce short-term sickness absence, the net effect on productivity may be positive.
            </p>

            <h2>Setting up a duvet day policy</h2>
            <p>If you decide to offer duvet days, your policy should cover the following:</p>

            <h3>Number of days</h3>
            <p>Most businesses offer <strong>1 to 3 duvet days per year</strong>. Start with 1 or 2 and see how it goes.</p>

            <h3>Notice period</h3>
            <p>Require employees to notify their manager <strong>before their normal start time</strong> on the day. A quick message via your usual communication channel is sufficient.</p>

            <h3>Blackout dates</h3>
            <p>Consider excluding certain dates — month-end for finance teams, product launch days, or periods when the business is particularly busy.</p>

            <h3>No carry-over</h3>
            <p>Duvet days should <strong>not be carried over</strong> to the next leave year. They&apos;re a use-it-or-lose-it benefit. This prevents accumulation and keeps the perk manageable.</p>

            <h3>Tracking</h3>
            <p>Even though duvet days are informal in spirit, they need to be <strong>tracked like any other absence type</strong>. Without tracking, you won&apos;t know if someone has used their allocation, and you&apos;ll have no data to assess whether the policy is working.</p>

            <h2>The legal position</h2>
            <p>
              Duvet days have <strong>no basis in UK employment law</strong>. They are not a statutory entitlement — they&apos;re a contractual benefit offered at the employer&apos;s discretion. This means:
            </p>
            <ul className="list-disc pl-6">
              <li>You can set whatever rules you like around them.</li>
              <li>You can withdraw the benefit (with reasonable notice and consultation).</li>
              <li>They should be documented in your employee handbook or leave policy to avoid ambiguity.</li>
              <li>They do <strong>not</strong> count towards the statutory 5.6 weeks of annual leave.</li>
            </ul>

            <h2>Alternatives to duvet days</h2>
            <p>If duvet days don&apos;t feel right for your business, consider these alternatives:</p>
            <ul className="list-disc pl-6">
              <li><strong>Mental health days</strong> — similar concept but framed around wellbeing, which some employers prefer.</li>
              <li><strong>Flexible hours</strong> — let employees start late or finish early when they need to recharge.</li>
              <li><strong>Wellbeing allowance</strong> — a budget for gym memberships, therapy, or other wellbeing activities.</li>
              <li><strong>Additional annual leave</strong> — simply add 1-2 extra days to the standard holiday allowance.</li>
            </ul>

            <h2>How Leavely tracks duvet days</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> lets you create <strong>custom leave types</strong>, so you can set up a &quot;Duvet Day&quot; category with its own allowance, rules, and approval workflow:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Custom allowance</strong> — set 1, 2, or 3 duvet days per employee per year.</li>
              <li><strong>Real-time balances</strong> — employees can see how many duvet days they have remaining.</li>
              <li><strong>Same-day requests</strong> — submit a request from a phone in seconds.</li>
              <li><strong>Manager notifications</strong> — instant alerts so managers can approve or decline quickly.</li>
              <li><strong>Reporting</strong> — see usage patterns across teams to assess whether the policy is working.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Track duvet days alongside all your leave types</h3>
            <p className="text-emerald-100 mb-6">Leavely lets you create custom leave categories with their own allowances, rules, and approval workflows.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/sick-leave-policy-uk" className="block text-emerald-600 hover:underline font-medium">Sick Leave Policy UK: What Employers Must Know &rarr;</Link>
              <Link href="/blog/employee-wellbeing-strategy" className="block text-emerald-600 hover:underline font-medium">Employee Wellbeing Strategy: A Practical Guide &rarr;</Link>
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK 2026: The Complete Guide &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
