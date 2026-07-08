import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/switch-from-brighthr`

export const metadata: Metadata = {
  title: 'How to Switch from BrightHR: Migration Guide for UK Businesses (2026)',
  description:
    'Step-by-step guide to switching from BrightHR to a better alternative. Covers data export, migration steps, feature comparison, cost savings, and a complete switching checklist.',
  alternates: { canonical: articleUrl },
  keywords: [
    'switch from brighthr',
    'brighthr alternative',
    'leave brighthr',
    'cancel brighthr',
    'brighthr too expensive',
    'migrate from brighthr',
  ],
  openGraph: {
    title: 'How to Switch from BrightHR — Migration Guide for UK Businesses (2026)',
    description: 'Complete guide to migrating from BrightHR. Data export, step-by-step migration, feature comparison, and cost savings.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Switch from BrightHR: Migration Guide for UK Businesses (2026)',
  description: 'Step-by-step guide to switching from BrightHR to a better alternative.',
  url: articleUrl,
  datePublished: '2026-03-15',
  dateModified: '2026-03-15',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function SwitchFromBrightHRArticle() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Software Guide</span>
            <span className="text-xs text-gray-400 ml-3">12 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            How to Switch from BrightHR: Migration Guide for UK Businesses (2026)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              BrightHR is one of the most recognisable HR software brands in the UK, but recognisable doesn&apos;t always mean right. If you&apos;re reading this, you&apos;ve probably already decided that BrightHR isn&apos;t working for your business &mdash; and you&apos;re looking for a way out. This guide walks you through the entire process: why businesses are leaving, what to check before you switch, and a step-by-step migration plan that gets you live on a new platform in a single afternoon.
            </p>

            <h2>Why businesses are switching from BrightHR</h2>
            <p>
              We speak to businesses every week who are looking for a <Link href="/compare/brighthr" className="text-emerald-600 hover:underline font-medium">BrightHR alternative</Link>. The reasons fall into a few consistent patterns:
            </p>

            <h3>1. Cost creep</h3>
            <p>
              BrightHR&apos;s pricing has increased significantly over the past few years. What started as a reasonable per-user cost has grown &mdash; especially once you factor in add-ons. Features like document storage, e-signatures, and shift scheduling are often locked behind higher tiers or sold as extras. For a 20-person business, the bill can easily reach &pound;300&ndash;400/month when you add up the modules you actually need.
            </p>

            <h3>2. Features locked behind tiers</h3>
            <p>
              BrightHR uses a tiered pricing model where core features are gatekept. Need Bradford Factor tracking? That&apos;s a higher plan. Want to send documents for e-signature? Upgrade again. Many businesses sign up for the base plan, only to discover that the features they assumed were included require a more expensive subscription.
            </p>

            <h3>3. Slow or unhelpful support</h3>
            <p>
              A recurring complaint from BrightHR customers is the difficulty of getting timely support. Phone queues, chatbot runarounds, and delayed email responses are common frustrations &mdash; especially when you&apos;re dealing with something time-sensitive like a payroll deadline or a compliance question.
            </p>

            <h3>4. Clunky interface</h3>
            <p>
              While BrightHR has improved its UI over the years, many users still find it cluttered and unintuitive. Common tasks like approving leave, running reports, or finding an employee&apos;s remaining balance take more clicks than they should. For a tool that&apos;s supposed to save time, a clunky interface defeats the purpose.
            </p>

            <h3>5. Contract lock-in</h3>
            <p>
              Some BrightHR plans come with annual contracts that auto-renew. If you miss the cancellation window, you&apos;re locked in for another 12 months. This is a particularly sore point for small businesses that need flexibility.
            </p>

            <h2>What to consider before switching</h2>
            <p>
              Before you cancel anything, take a step back and plan. A smooth switch comes down to three things:
            </p>

            <h3>Data export</h3>
            <p>
              Your employee records, leave balances, absence history, and documents all live inside BrightHR. You need to get that data out before you leave. BrightHR allows you to export employee data as CSV files from the admin panel. Do this first &mdash; and save multiple copies.
            </p>
            <p>
              Key data to export:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Employee directory</strong> &mdash; names, email addresses, start dates, job titles, departments</li>
              <li><strong>Leave balances</strong> &mdash; current remaining allowance per employee, per leave type</li>
              <li><strong>Absence history</strong> &mdash; sickness records and Bradford Factor scores (if you use them)</li>
              <li><strong>Documents</strong> &mdash; download any contracts, policies, or signed documents stored in BrightHR</li>
            </ul>

            <h3>Contract terms</h3>
            <p>
              Check your BrightHR contract for:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Notice period</strong> &mdash; most plans require 30 days&apos; written notice before renewal</li>
              <li><strong>Renewal date</strong> &mdash; if you&apos;re on an annual plan, note when it renews so you don&apos;t get charged for another year</li>
              <li><strong>Cancellation method</strong> &mdash; some plans require cancellation by email or phone, not just clicking a button</li>
            </ul>

            <h3>Employee communication</h3>
            <p>
              Give your team advance notice. Nobody likes logging in on Monday to find a completely different system with no warning. A simple email or team message works: &quot;We&apos;re switching our leave management system next week. Here&apos;s your login link. It takes 2 minutes to get set up.&quot;
            </p>

            <h2>Step-by-step migration guide</h2>
            <p>
              Here&apos;s how to switch from BrightHR to <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> in seven steps. The whole process takes 1&ndash;2 hours for most businesses.
            </p>

            <h3>Step 1: Export your data from BrightHR</h3>
            <p>
              Log into BrightHR as an admin. Navigate to the employee list and export all employee data as a CSV file. Then go to the leave section and export current leave balances. If you use document storage, download all files. Save everything to a folder on your computer &mdash; you&apos;ll need it in step 3.
            </p>

            <h3>Step 2: Set up your Leavely account</h3>
            <p>
              Go to <Link href="/register" className="text-emerald-600 hover:underline font-medium">leavely.online/register</Link> and create your account. The 14-day free trial starts immediately &mdash; no credit card required. Enter your company name, pick a URL slug, and you&apos;re in. Setup takes under 2 minutes.
            </p>

            <h3>Step 3: Import employees</h3>
            <p>
              Add your employees to Leavely. For small teams (under 20), you can add them manually &mdash; it takes about 30 seconds per person. Enter their name, email, start date, department, and role. For larger teams, contact our support team and we&apos;ll help you with a bulk CSV import.
            </p>

            <h3>Step 4: Configure leave policies &amp; public holidays</h3>
            <p>
              Leavely comes with UK bank holidays pre-loaded for England &amp; Wales, Scotland, and Northern Ireland &mdash; just pick your region. Then set up your <Link href="/blog/leave-policy-template-uk" className="text-emerald-600 hover:underline font-medium">leave policies</Link>: annual leave allowance, sick leave, TOIL, compassionate leave, and any custom types your business uses. Set the current year&apos;s starting balances to match what employees have remaining in BrightHR.
            </p>

            <h3>Step 5: Set up rotas &amp; shifts</h3>
            <p>
              If you use BrightHR&apos;s rota feature, recreate your shift patterns in Leavely. Define your shift types, assign employees, and set the schedule. Leavely&apos;s rota view shows the whole team at a glance, making it easy to spot coverage gaps.
            </p>

            <h3>Step 6: Train your team (takes 5 minutes)</h3>
            <p>
              Send invite emails to your employees. When they log in, they&apos;ll see their leave balance, team calendar, and a button to request time off. There&apos;s no training manual needed &mdash; the interface is self-explanatory. Most teams are fully up and running within 5 minutes of receiving their invite.
            </p>

            <h3>Step 7: Cancel BrightHR</h3>
            <p>
              Once you&apos;re confident everything is working in Leavely (we recommend running both systems for a week as a safety net), cancel your BrightHR subscription. Send written notice according to your contract terms. Keep your exported data backups for at least 6 months.
            </p>

            <h2>Feature comparison: BrightHR vs Leavely</h2>
            <p>
              Here&apos;s what you get with each platform. Everything listed under Leavely is included at &pound;8/user/month &mdash; no tiers, no add-ons, no surprises.
            </p>

            <div className="overflow-x-auto [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600">
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>BrightHR</th>
                    <th>Leavely</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Annual leave management</td>
                    <td>All plans</td>
                    <td>Included</td>
                  </tr>
                  <tr>
                    <td>Sick leave tracking</td>
                    <td>All plans</td>
                    <td>Included</td>
                  </tr>
                  <tr>
                    <td>Bradford Factor</td>
                    <td>Higher tiers only</td>
                    <td>Included</td>
                  </tr>
                  <tr>
                    <td>TOIL tracking</td>
                    <td>Higher tiers only</td>
                    <td>Included</td>
                  </tr>
                  <tr>
                    <td>Team calendar</td>
                    <td>All plans</td>
                    <td>Included</td>
                  </tr>
                  <tr>
                    <td>Self-service requests</td>
                    <td>All plans</td>
                    <td>Included</td>
                  </tr>
                  <tr>
                    <td>Document storage</td>
                    <td>Add-on / higher tier</td>
                    <td>Included</td>
                  </tr>
                  <tr>
                    <td>Return-to-work forms</td>
                    <td>Higher tiers only</td>
                    <td>Included</td>
                  </tr>
                  <tr>
                    <td>Onboarding checklists</td>
                    <td>Higher tiers only</td>
                    <td>Included</td>
                  </tr>
                  <tr>
                    <td>Shift &amp; rota management</td>
                    <td>Add-on</td>
                    <td>Included</td>
                  </tr>
                  <tr>
                    <td>UK bank holidays</td>
                    <td>All plans</td>
                    <td>Included</td>
                  </tr>
                  <tr>
                    <td>Pro-rata leave calculations</td>
                    <td>All plans</td>
                    <td>Included</td>
                  </tr>
                  <tr>
                    <td>Absence reports</td>
                    <td>Higher tiers only</td>
                    <td>Included</td>
                  </tr>
                  <tr>
                    <td>Audit trail</td>
                    <td>Higher tiers only</td>
                    <td>Included</td>
                  </tr>
                  <tr>
                    <td>Free trial</td>
                    <td>Demo only</td>
                    <td>14 days, no card</td>
                  </tr>
                  <tr>
                    <td>Contract</td>
                    <td>Annual (auto-renew)</td>
                    <td>Monthly, cancel anytime</td>
                  </tr>
                  <tr>
                    <td>Pricing</td>
                    <td>From &pound;5/user + add-ons</td>
                    <td>&pound;8/user, everything included</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Cost savings: real examples</h2>
            <p>
              Let&apos;s look at what switching from BrightHR to Leavely actually saves. These examples assume you need leave management, Bradford Factor, document storage, and absence reporting &mdash; features BrightHR charges extra for.
            </p>

            <h3>10 employees</h3>
            <div className="overflow-x-auto [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>BrightHR (est.)</th>
                    <th>Leavely</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Monthly cost</td>
                    <td>&pound;150&ndash;200</td>
                    <td>&pound;80</td>
                  </tr>
                  <tr>
                    <td>Annual cost</td>
                    <td>&pound;1,800&ndash;2,400</td>
                    <td>&pound;960</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-emerald-600">Annual saving</td>
                    <td colSpan={2} className="font-semibold text-emerald-600">&pound;840&ndash;1,440</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>25 employees</h3>
            <div className="overflow-x-auto [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>BrightHR (est.)</th>
                    <th>Leavely</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Monthly cost</td>
                    <td>&pound;375&ndash;500</td>
                    <td>&pound;200</td>
                  </tr>
                  <tr>
                    <td>Annual cost</td>
                    <td>&pound;4,500&ndash;6,000</td>
                    <td>&pound;2,400</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-emerald-600">Annual saving</td>
                    <td colSpan={2} className="font-semibold text-emerald-600">&pound;2,100&ndash;3,600</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3>50 employees</h3>
            <div className="overflow-x-auto [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>BrightHR (est.)</th>
                    <th>Leavely</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Monthly cost</td>
                    <td>&pound;750&ndash;1,000</td>
                    <td>&pound;400</td>
                  </tr>
                  <tr>
                    <td>Annual cost</td>
                    <td>&pound;9,000&ndash;12,000</td>
                    <td>&pound;4,800</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-emerald-600">Annual saving</td>
                    <td colSpan={2} className="font-semibold text-emerald-600">&pound;4,200&ndash;7,200</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Your switching checklist</h2>
            <p>
              Use this checklist to make sure you don&apos;t miss anything. Print it out or save it &mdash; tick off each item as you go.
            </p>

            <div className="rounded-xl border-2 border-emerald-100 bg-emerald-50/30 p-6 my-8">
              <h3 className="text-lg font-bold text-gray-900 mt-0 mb-4">BrightHR to Leavely &mdash; Switching Checklist</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Before you start</p>
                  <ul className="list-none pl-0 space-y-1.5">
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Check your BrightHR contract renewal date</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Note the cancellation notice period (usually 30 days)</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Export employee directory (CSV)</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Export leave balances for all employees</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Export sickness/absence records</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Download all stored documents</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Take screenshots of current leave policies &amp; settings</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Set up Leavely</p>
                  <ul className="list-none pl-0 space-y-1.5">
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Create your Leavely account (14-day free trial)</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Add employees and set starting leave balances</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Configure leave policies (annual, sick, TOIL, etc.)</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Select your UK bank holiday region</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Set up departments and reporting lines</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Upload any company documents</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Go live</p>
                  <ul className="list-none pl-0 space-y-1.5">
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Send invite emails to all employees</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Communicate the switch to your team (email/Slack/Teams)</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Run both systems in parallel for 1 week</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Verify leave balances match</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Cancel BrightHR (in writing, per contract terms)</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5">&#9744;</span> Archive your BrightHR data exports (keep 6+ months)</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2>Frequently asked questions</h2>

            <h3>Can I export my data from BrightHR?</h3>
            <p>
              Yes. BrightHR allows admins to export employee data, leave records, and absence history as CSV files. Log into the admin panel, go to the relevant section, and use the export/download option. We recommend exporting everything before you cancel &mdash; once your account is closed, you may lose access to historical data.
            </p>

            <h3>How long does migration take?</h3>
            <p>
              For most businesses with 10&ndash;50 employees, the entire migration takes 1&ndash;2 hours. The bulk of the time is spent adding employees and configuring leave policies. If you have a large team (50+), allow half a day and contact our support team for help with bulk import.
            </p>

            <h3>Do I lose my employee records?</h3>
            <p>
              Not if you export them first. BrightHR lets you download employee data as CSV, and any documents you&apos;ve uploaded can be downloaded individually. Once you&apos;ve imported your team into Leavely, all records are stored securely in your new account. We recommend keeping your BrightHR exports as a backup for at least 6 months.
            </p>

            <h3>What about leave requests that are already approved?</h3>
            <p>
              When you set up Leavely, you enter each employee&apos;s current remaining balance. This automatically accounts for any leave already taken or approved. For future-dated approved requests, simply re-enter them in Leavely &mdash; it takes a few seconds each.
            </p>

            <h3>Can I switch mid-year?</h3>
            <p>
              Absolutely. You can switch at any point in the leave year. Just make sure you export accurate current balances from BrightHR and enter them as starting balances in Leavely. The system will track everything from that point forward.
            </p>

            <h3>Is Leavely really &pound;8/user/month for everything?</h3>
            <p>
              Yes. One plan, one price. Leave management, absence tracking, <Link href="/blog/bradford-factor-explained" className="text-emerald-600 hover:underline font-medium">Bradford Factor</Link>, document storage, onboarding checklists, team calendar, reporting, and audit trail &mdash; all included. No tiers, no add-ons, no hidden fees. See our <Link href="/pricing" className="text-emerald-600 hover:underline font-medium">pricing page</Link> for full details.
            </p>

            <h3>What if I&apos;m still in a BrightHR contract?</h3>
            <p>
              You can set up Leavely and run it alongside BrightHR during your remaining contract period. This gives you time to test everything and train your team before you fully switch. Since Leavely&apos;s free trial is 14 days and there&apos;s no annual lock-in, you can start whenever you&apos;re ready.
            </p>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Ready to switch from BrightHR?</h3>
            <p className="text-emerald-100 mb-6">Start your free 14-day trial. No credit card required. Set up in 2 minutes.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/compare/brighthr" className="block text-emerald-600 hover:underline font-medium">BrightHR vs Leavely: Full Comparison &rarr;</Link>
              <Link href="/blog/best-leave-management-software-uk" className="block text-emerald-600 hover:underline font-medium">Best Leave Management Software UK 2026 &rarr;</Link>
              <Link href="/blog/hr-software-small-business-uk" className="block text-emerald-600 hover:underline font-medium">HR Software for Small Businesses UK &rarr;</Link>
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
