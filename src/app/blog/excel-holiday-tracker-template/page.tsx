import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/excel-holiday-tracker-template`

export const metadata: Metadata = {
  title: 'Free Excel Holiday Tracker Template UK (Download + Better Alternative)',
  description:
    'Free Excel holiday tracker template for UK businesses. Includes a spreadsheet structure you can copy, plus 5 reasons why spreadsheets break and how to upgrade.',
  alternates: { canonical: articleUrl },
  keywords: [
    'excel holiday tracker',
    'holiday tracker spreadsheet',
    'free leave tracker template',
    'excel leave tracker UK',
    'holiday tracker template',
    'staff holiday tracker excel',
    'annual leave spreadsheet UK',
  ],
  openGraph: {
    title: 'Free Excel Holiday Tracker Template UK',
    description: 'A free Excel holiday tracker template, plus why spreadsheets eventually break and what to use instead.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Free Excel Holiday Tracker Template UK (Download + Better Alternative)',
  description: 'Free Excel holiday tracker template for UK businesses.',
  url: articleUrl,
  datePublished: '2026-04-04',
  dateModified: '2026-04-04',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function ExcelHolidayTrackerArticle() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">HR Template</span>
            <span className="text-xs text-gray-400 ml-3">8 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Free Excel Holiday Tracker Template UK (Download + Better Alternative)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              If you have a small team and a tight budget, a spreadsheet is a reasonable way to track staff holidays. Plenty of businesses with five to ten employees manage perfectly well with Excel or Google Sheets. Below is a template structure you can use, followed by an honest look at where spreadsheets start to fail and what to consider when you outgrow them.
            </p>

            <h2>How to set up your Excel holiday tracker</h2>
            <p>
              Here is the basic structure. You can recreate this in Excel or Google Sheets in about 30 minutes.
            </p>

            <h3>Tab 1: Employee list</h3>
            <p>
              Create a simple table with these columns:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Employee name</strong></li>
              <li><strong>Department</strong></li>
              <li><strong>Start date</strong></li>
              <li><strong>Full time or part time</strong> (and contracted hours per week if part time)</li>
              <li><strong>Annual leave entitlement</strong> (in days)</li>
              <li><strong>Carry over from last year</strong></li>
              <li><strong>Total allowance</strong> (entitlement + carry over)</li>
              <li><strong>Days used</strong> (calculated from the calendar tab)</li>
              <li><strong>Days remaining</strong> (total allowance minus days used)</li>
            </ul>

            <h3>Tab 2: Calendar view</h3>
            <p>
              Create a grid with employee names down the left side and dates across the top (one column per day). Use colour coding or letters to mark leave types:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>H</strong> = Annual leave (holiday)</li>
              <li><strong>S</strong> = Sick day</li>
              <li><strong>BH</strong> = Bank holiday</li>
              <li><strong>WFH</strong> = Working from home (optional)</li>
              <li><strong>U</strong> = Unpaid leave</li>
            </ul>
            <p>
              Use conditional formatting so that each leave type shows in a different colour. This gives you a visual calendar showing who is off and when.
            </p>

            <h3>Tab 3: Request log</h3>
            <p>
              Track requests with columns for:
            </p>
            <ul className="list-disc pl-6">
              <li>Employee name</li>
              <li>Leave type</li>
              <li>Start date and end date</li>
              <li>Total days</li>
              <li>Status (pending, approved, rejected)</li>
              <li>Approved by</li>
              <li>Date approved</li>
              <li>Notes</li>
            </ul>

            <h3>Tab 4: Bank holidays</h3>
            <p>
              List all <Link href="/blog/bank-holidays-uk-2026" className="text-emerald-600 hover:underline font-medium">UK bank holidays for 2026</Link> so you can deduct them from entitlements where applicable.
            </p>

            <h2>Tips for making your spreadsheet work</h2>
            <ul className="list-disc pl-6">
              <li>Protect cells that contain formulas so they cannot be accidentally overwritten</li>
              <li>Use data validation to restrict inputs (e.g. only allow H, S, BH, WFH, or U in the calendar)</li>
              <li>Back up the file regularly (or use Google Sheets for automatic version history)</li>
              <li>Decide who can edit the master sheet (ideally one person, usually the office manager or HR)</li>
              <li>Send a monthly summary to each employee showing their remaining balance</li>
            </ul>

            <h2>5 reasons spreadsheets break (and when to switch)</h2>

            <h3>1. Human error</h3>
            <p>
              Spreadsheets are only as reliable as the person updating them. One mistyped formula, one deleted row, one accidental overwrite, and your data is wrong. A CIPD study found that <strong>88% of spreadsheets contain at least one error</strong>. When those errors affect leave balances, you get disputes, overpayments, and employees who think they have more leave than they actually do.
            </p>

            <h3>2. No approval workflow</h3>
            <p>
              A spreadsheet cannot send a notification to a manager asking them to approve a leave request. The typical process is: employee emails manager, manager says yes, someone updates the spreadsheet. Every step is a potential failure point. Requests get lost in inboxes, approvals happen verbally and are forgotten, and the spreadsheet falls out of date.
            </p>

            <h3>3. No real time visibility</h3>
            <p>
              With a spreadsheet, managers cannot see at a glance who is off next week. Employees cannot check their own balance without asking someone. There is no team calendar, no clash detection, and no way to know if approving a request would leave the team understaffed.
            </p>

            <h3>4. No audit trail</h3>
            <p>
              If an employee disputes their balance or claims they were approved leave that was later withdrawn, a spreadsheet gives you no way to prove what happened and when. Google Sheets has version history, but trying to reconstruct events from version diffs is painful and unreliable.
            </p>

            <h3>5. It does not scale</h3>
            <p>
              A spreadsheet that works for 5 people becomes unmanageable at 15. By the time you have 25 or more employees, with part time workers on different entitlements, carry over calculations, multiple departments, and different leave types, the spreadsheet becomes so complex that maintaining it becomes a part time job in itself.
            </p>

            <h2>When to make the switch</h2>
            <p>
              There is no magic number, but consider switching from spreadsheets to dedicated software when:
            </p>
            <ul className="list-disc pl-6">
              <li>You have more than 10 employees</li>
              <li>You have part time workers who need <Link href="/blog/pro-rata-annual-leave-calculator" className="text-emerald-600 hover:underline font-medium">pro rata leave calculations</Link></li>
              <li>Leave requests are getting lost or forgotten</li>
              <li>You have had a dispute over leave balances</li>
              <li>You are spending more than an hour per week maintaining the spreadsheet</li>
              <li>Multiple people need to view and update leave records</li>
            </ul>

            <h2>Why Leavely is the step up from spreadsheets</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> is built for UK businesses that have outgrown spreadsheets but do not need a bloated enterprise HR system:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Self service requests</strong>: employees submit leave requests themselves, no email needed</li>
              <li><strong>One click approvals</strong>: managers approve from email or the app in seconds</li>
              <li><strong>Automatic balance calculations</strong>: including pro rata, carry over, and bank holiday deductions</li>
              <li><strong>Team calendar</strong>: see who is off at a glance, with clash detection built in</li>
              <li><strong>Full audit trail</strong>: every request, approval, and change is logged</li>
              <li><strong>Bradford Factor</strong>: calculated automatically for absence management</li>
              <li><strong>Free for small teams</strong>: Leavely has a free trial so you can test it before committing</li>
            </ul>
            <p>
              Switching takes minutes, not days. You can set up your team, configure your leave policies, and start using Leavely the same afternoon.
            </p>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Outgrown your spreadsheet?</h3>
            <p className="text-emerald-100 mb-6">Leavely replaces your Excel tracker with self service requests, automatic calculations, and a team calendar.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/staff-holiday-tracker-uk" className="block text-emerald-600 hover:underline font-medium">Staff Holiday Tracker UK 2026: Stop Using Spreadsheets &rarr;</Link>
              <Link href="/blog/best-leave-management-software-uk" className="block text-emerald-600 hover:underline font-medium">Best Leave Management Software UK 2026 &rarr;</Link>
              <Link href="/blog/pro-rata-annual-leave-calculator" className="block text-emerald-600 hover:underline font-medium">How to Calculate Pro Rata Annual Leave UK &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
