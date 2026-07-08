import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/hybrid-working-policy-uk`

export const metadata: Metadata = {
  title: 'Hybrid Working Policy UK: How to Create One That Works (2026)',
  description:
    'How to create a hybrid working policy for your UK business. Covers legal requirements, what to include, managing leave for hybrid workers, core hours, and equipment.',
  alternates: { canonical: articleUrl },
  keywords: [
    'hybrid working policy UK',
    'hybrid working policy template',
    'hybrid working arrangements UK',
    'work from home policy UK',
    'hybrid working guidelines',
    'hybrid work policy template UK',
    'managing hybrid workers UK',
  ],
  openGraph: {
    title: 'Hybrid Working Policy UK: How to Create One That Works',
    description: 'Everything UK employers need to know about creating a hybrid working policy that is fair, legal, and effective.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Hybrid Working Policy UK: How to Create One That Works (2026)',
  description: 'How to create a hybrid working policy for UK businesses.',
  url: articleUrl,
  datePublished: '2026-04-04',
  dateModified: '2026-04-04',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function HybridWorkingPolicyArticle() {
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
            Hybrid Working Policy UK: How to Create One That Works (2026)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Hybrid working is now the norm for millions of UK workers. The CIPD reports that over <strong>40% of UK employees</strong> work in a hybrid pattern, splitting their time between the office and home. Yet many businesses still do not have a written policy. This creates confusion, inconsistency, and legal risk. A good hybrid working policy protects your business and gives your team clarity.
            </p>

            <h2>The legal position in 2026</h2>
            <p>
              Since April 2024, employees in the UK have had a <Link href="/blog/flexible-working-uk" className="text-emerald-600 hover:underline font-medium">day one right to request flexible working</Link>, which includes hybrid working arrangements. Employers must deal with requests in a reasonable manner and can only refuse for one of eight statutory business reasons:
            </p>
            <ul className="list-disc pl-6">
              <li>Burden of additional costs</li>
              <li>Detrimental effect on the ability to meet customer demand</li>
              <li>Inability to reorganise work among existing staff</li>
              <li>Inability to recruit additional staff</li>
              <li>Detrimental impact on quality</li>
              <li>Detrimental impact on performance</li>
              <li>Insufficiency of work during the periods the employee proposes to work</li>
              <li>Planned structural changes</li>
            </ul>
            <p>
              There is no legal requirement to offer hybrid working, but refusing every request without genuine reasons puts you at risk of tribunal claims.
            </p>

            <h2>What your hybrid working policy should include</h2>

            <h3>1. Scope and eligibility</h3>
            <p>
              Define which roles are eligible for hybrid working and which are not. Be honest: a receptionist cannot work from home, and that is a legitimate business reason. Avoid blanket statements like &quot;all employees are eligible&quot; unless that is genuinely the case.
            </p>

            <h3>2. Working pattern</h3>
            <p>
              Specify the expected split between office and home. Common models include:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Fixed days</strong>: e.g. office on Tuesday, Wednesday, Thursday; home on Monday and Friday</li>
              <li><strong>Minimum office days</strong>: e.g. at least 3 days per week in the office, with flexibility on which days</li>
              <li><strong>Team led</strong>: each team agrees their own pattern, subject to manager approval</li>
              <li><strong>Fully flexible</strong>: employees choose where to work day by day</li>
            </ul>
            <p>
              Fixed days work best for businesses that need predictable staffing. Flexible models work best for knowledge workers with minimal in person requirements.
            </p>

            <h3>3. Core hours and availability</h3>
            <p>
              Define when employees must be available, regardless of location. For example, &quot;all hybrid employees must be available between 10am and 3pm on working days.&quot; Outside of core hours, employees can flex their start and end times.
            </p>
            <p>
              This is particularly important for customer facing roles or teams that collaborate across time zones.
            </p>

            <h3>4. Communication expectations</h3>
            <p>
              Set clear expectations for:
            </p>
            <ul className="list-disc pl-6">
              <li>Response times for emails and messages</li>
              <li>Attendance at meetings (camera on or off?)</li>
              <li>How to flag that you are unavailable (status messages, calendar blocks)</li>
              <li>Which tools to use for different types of communication (e.g. Slack for quick questions, email for formal matters)</li>
            </ul>

            <h3>5. Leave and absence management</h3>
            <p>
              Managing <Link href="/blog/managing-remote-workers-leave" className="text-emerald-600 hover:underline font-medium">leave for hybrid and remote workers</Link> can be tricky. Your policy should clarify:
            </p>
            <ul className="list-disc pl-6">
              <li>Leave is still requested and approved through the normal process, regardless of location</li>
              <li>Working from home is not a substitute for taking leave when unwell</li>
              <li>Employees must not work during annual leave, even if they have a laptop at home</li>
              <li>Sickness absence must be reported in the same way whether the employee was due in the office or working from home</li>
            </ul>

            <h3>6. Equipment and expenses</h3>
            <p>
              Decide what the company provides for home workers:
            </p>
            <ul className="list-disc pl-6">
              <li>Laptop, monitor, keyboard, mouse</li>
              <li>Office chair or desk (or a contribution toward the cost)</li>
              <li>Broadband costs (some employers contribute, others do not)</li>
              <li>Stationery and printing</li>
            </ul>
            <p>
              Employers have a duty of care under the Health and Safety at Work Act 1974, even for home workers. This means you should carry out a home workstation assessment, at minimum a self assessment checklist.
            </p>

            <h3>7. Data security</h3>
            <p>
              Working from home creates data security risks. Your policy should cover:
            </p>
            <ul className="list-disc pl-6">
              <li>Use of company devices only (no personal laptops for work)</li>
              <li>VPN requirements</li>
              <li>Locking screens when away from the desk</li>
              <li>Secure storage of physical documents</li>
              <li>Rules about working in public places (e.g. coffee shops)</li>
            </ul>

            <h3>8. Performance management</h3>
            <p>
              Hybrid working should be measured by output, not by hours at a desk. Your policy should make clear that:
            </p>
            <ul className="list-disc pl-6">
              <li>Performance expectations are the same regardless of location</li>
              <li>Managers should not favour office based employees over remote workers (known as &quot;proximity bias&quot;)</li>
              <li>Regular one to one meetings should happen to maintain connection</li>
              <li>The hybrid arrangement will be reviewed periodically (e.g. every 6 months)</li>
            </ul>

            <h3>9. Right to revoke</h3>
            <p>
              Include a clause that allows the business to change or revoke hybrid working arrangements with reasonable notice if business needs change. This gives you flexibility without locking the company into permanent remote work.
            </p>

            <h2>Common mistakes</h2>
            <ul className="list-disc pl-6">
              <li><strong>No written policy</strong>: ad hoc arrangements create inconsistency and resentment</li>
              <li><strong>Unequal treatment</strong>: allowing hybrid work for some roles but not others without clear justification is a discrimination risk</li>
              <li><strong>Micromanagement</strong>: monitoring keystrokes or requiring employees to be on camera all day destroys trust</li>
              <li><strong>Ignoring wellbeing</strong>: remote workers can feel isolated, so regular check ins and social events are important</li>
              <li><strong>Not updating contracts</strong>: if the hybrid arrangement is permanent, consider updating the written statement of terms</li>
            </ul>

            <h2>How Leavely supports hybrid teams</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> is designed for the way UK businesses actually work today:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Team calendar</strong> shows who is off and who is in, so hybrid scheduling is clear at a glance</li>
              <li><strong>Leave requests from anywhere</strong> via the web app, with no office presence required</li>
              <li><strong>Department level views</strong> so managers can see coverage across hybrid teams</li>
              <li><strong>Clash detection</strong> to prevent understaffing on office days</li>
              <li><strong>iCal sync</strong> so leave appears in Google Calendar and Outlook alongside meeting schedules</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Manage leave across hybrid teams</h3>
            <p className="text-emerald-100 mb-6">Leavely gives every team member visibility of who is off, wherever they are working.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/flexible-working-uk" className="block text-emerald-600 hover:underline font-medium">Flexible Working UK: Right to Request Guide for Employers &rarr;</Link>
              <Link href="/blog/managing-remote-workers-leave" className="block text-emerald-600 hover:underline font-medium">Managing Leave for Remote Workers: UK Employer Guide &rarr;</Link>
              <Link href="/blog/employee-wellbeing-strategy" className="block text-emerald-600 hover:underline font-medium">Employee Wellbeing Strategy UK: A Practical Guide for SMBs &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
