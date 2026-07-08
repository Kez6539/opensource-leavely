import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingFooter } from '@/components/marketing-layout'
import { Logo } from '@/components/shared/logo'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/small-charity-staff-management`

export const metadata: Metadata = {
  title: 'Staff Management for Small Charities: A Practical Guide (2026)',
  description:
    'How to manage staff in a small charity with 5-50 employees. Leave tracking, absence monitoring, GDPR compliance, and affordable HR tools to replace spreadsheets.',
  alternates: { canonical: articleUrl },
  keywords: [
    'small charity staff management',
    'charity people management',
    'small charity HR',
    'managing staff in a charity',
    'charity leave tracking',
    'charity GDPR compliance',
    'charity staff management software',
    'charity HR software',
  ],
  openGraph: {
    title: 'Staff Management for Small Charities: A Practical Guide (2026)',
    description:
      'Practical HR guide for small charities: leave policies, absence monitoring, GDPR compliance, and affordable software that replaces manual processes.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Staff Management for Small Charities: A Practical Guide (2026)',
  description:
    'How to manage staff in a small charity with 5-50 employees. Leave tracking, absence monitoring, GDPR compliance, and affordable HR tools to replace spreadsheets.',
  url: articleUrl,
  datePublished: '2026-03-26',
  dateModified: '2026-03-26',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function SmallCharityStaffManagementArticle() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header>
        <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo />
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/features"><Button variant="ghost" size="sm" className="text-sm font-medium">Features</Button></Link>
              <Link href="/pricing"><Button variant="ghost" size="sm" className="text-sm font-medium">Pricing</Button></Link>
              <Link href="/register">
                <Button size="sm" className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-500/20">Start free trial</Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <article className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline font-medium mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          <div className="mb-8">
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Charity HR</span>
            <span className="text-xs text-gray-400 ml-3">8 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Staff Management for Small Charities: A Practical Guide (2026)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Managing people in a small charity is unlike managing people anywhere else. You&apos;re working with limited budgets, mission-driven staff, and often no dedicated HR function. The CEO might also be the HR manager, the office manager, and the person who fixes the printer.
            </p>

            <p>
              But having a small team doesn&apos;t mean you can afford to be informal about staff management. In fact, small charities are <em>more</em> vulnerable to the consequences of poor HR practices — because the loss of even one employee can be devastating, and a tribunal claim can threaten the organisation&apos;s survival.
            </p>

            <p>
              This guide covers the practical steps that charities with 5 to 50 staff need to take in 2026, with a focus on what actually matters rather than theoretical HR frameworks.
            </p>

            <h2>The most common pitfalls</h2>
            <p>
              After working with hundreds of small organisations, these are the HR mistakes we see most often in charities:
            </p>

            <h3>1. No formal leave policy</h3>
            <p>
              &quot;Everyone just knows how it works&quot; is fine until someone doesn&apos;t. Without a written leave policy, you&apos;ll inevitably end up treating employees inconsistently — which creates resentment at best and discrimination claims at worst.
            </p>
            <p>
              Every charity, no matter how small, needs a written policy covering:
            </p>
            <ul className="list-disc pl-6">
              <li>Annual leave entitlement (statutory minimum is 5.6 weeks, including bank holidays)</li>
              <li>How to request leave and how far in advance</li>
              <li>Approval process and who has authority</li>
              <li>Rules on carry-over, notice periods, and blackout dates</li>
              <li>Sick leave notification and certification requirements</li>
            </ul>

            <h3>2. Spreadsheet tracking</h3>
            <p>
              Excel spreadsheets are where leave management goes to die. The problems are well-documented:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Version control</strong> — which spreadsheet is the current one? The one on the shared drive? Sarah&apos;s desktop copy? The one emailed to the board last month?</li>
              <li><strong>Calculation errors</strong> — pro-rata leave, carry-over, and part-time calculations are error-prone when done manually.</li>
              <li><strong>No audit trail</strong> — if a dispute arises, you can&apos;t prove what was approved and when.</li>
              <li><strong>No self-service</strong> — every leave request requires an email chain, adding to the admin burden.</li>
              <li><strong>GDPR risk</strong> — a spreadsheet with employee sickness records on a shared drive is a data protection incident waiting to happen.</li>
            </ul>

            <h3>3. No audit trail</h3>
            <p>
              Charities are accountable to regulators, funders, and trustees. If you can&apos;t demonstrate that leave decisions were made fairly and consistently, you&apos;re exposed — both legally and reputationally. A timestamped, searchable audit trail isn&apos;t a nice-to-have; it&apos;s essential.
            </p>

            <h2>What small charities actually need</h2>
            <p>
              You don&apos;t need a full enterprise HRIS. You need four things, and you need them to work well:
            </p>

            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-emerald-800 font-semibold mb-1">Leave tracking</p>
                  <p className="text-emerald-700 mb-0">Balances, requests, approvals, calendar visibility — for annual leave, sick leave, TOIL, and any custom types.</p>
                </div>
                <div>
                  <p className="text-emerald-800 font-semibold mb-1">Absence monitoring</p>
                  <p className="text-emerald-700 mb-0">Bradford Factor scores, return-to-work records, pattern identification — done automatically, not manually.</p>
                </div>
                <div>
                  <p className="text-emerald-800 font-semibold mb-1">Document storage</p>
                  <p className="text-emerald-700 mb-0">Contracts, policies, fit notes, and return-to-work forms — stored securely with access controls.</p>
                </div>
                <div>
                  <p className="text-emerald-800 font-semibold mb-1">Audit trail</p>
                  <p className="text-emerald-700 mb-0">Every action logged with who did what and when — essential for funder accountability and tribunal defence.</p>
                </div>
              </div>
            </div>

            <h2>GDPR compliance for small charities</h2>
            <p>
              Small charities are subject to exactly the same <strong>data protection obligations</strong> as large corporations. The ICO does not give exemptions based on size or charitable status. Here&apos;s what you need to get right when handling staff data:
            </p>

            <h3>Lawful basis for processing</h3>
            <p>
              For employee data, your lawful basis is typically &quot;contractual necessity&quot; (you need to process leave records to fulfil the employment contract) and &quot;legal obligation&quot; (you&apos;re required to keep certain records by employment law). You do not generally need consent to process employee leave data, but you do need to tell employees what you&apos;re collecting and why.
            </p>

            <h3>Special category data</h3>
            <p>
              Sickness records are <strong>special category data</strong> under UK GDPR because they relate to health. This means you need additional safeguards:
            </p>
            <ul className="list-disc pl-6">
              <li>Access must be restricted to those who genuinely need it (typically line managers and HR)</li>
              <li>Data must be stored securely — a password-protected spreadsheet on a shared drive does not meet this standard</li>
              <li>Retention periods must be defined and enforced — typically 6 years after employment ends</li>
              <li>You must have a privacy notice for employees that covers health data processing</li>
            </ul>

            <h3>Data subject access requests</h3>
            <p>
              Any employee can request a copy of all personal data you hold about them, including leave records, sickness notes, and absence management correspondence. You have 30 days to respond. If your records are scattered across spreadsheets, emails, and filing cabinets, responding to a DSAR becomes a time-consuming nightmare.
            </p>

            <div className="rounded-xl bg-amber-50 border border-amber-200 p-6 my-6">
              <p className="text-amber-800 font-semibold mb-2">ICO enforcement against charities</p>
              <p className="text-amber-700 text-sm mb-0">
                The ICO has issued fines and enforcement notices against charities for data protection failures. In 2025, several organisations faced action for inadequate security of staff health records. Being a charity is not a defence — the ICO considers the nature and sensitivity of the data, not the employer&apos;s legal structure.
              </p>
            </div>

            <h2>Building a positive workplace culture on a budget</h2>
            <p>
              Small charities can&apos;t compete with the private sector on salary. But they can compete — and win — on culture. Here are practical, low-cost strategies that genuinely reduce turnover and absence:
            </p>

            <ol className="list-decimal pl-6">
              <li>
                <strong>Offer genuine flexibility</strong> — not a policy that technically allows flexible working but culturally discourages it. If the role can be done from home two days a week, say so in the job advert. <Link href="/blog/flexible-working-uk" className="text-emerald-600 hover:underline font-medium">Flexible working</Link> is the single most valued benefit for charity staff after pension.
              </li>
              <li>
                <strong>Be transparent about pay</strong> — charity staff accept lower salaries when they understand why. Publish pay bands, explain how decisions are made, and benchmark against sector norms.
              </li>
              <li>
                <strong>Invest in wellbeing</strong> — this doesn&apos;t mean expensive wellness programmes. It means sensible workloads, managers who check in regularly, and a culture where taking a <Link href="/blog/mental-health-days-uk" className="text-emerald-600 hover:underline font-medium">mental health day</Link> isn&apos;t stigmatised.
              </li>
              <li>
                <strong>Give people autonomy</strong> — mission-driven staff want to feel trusted. Micromanagement is the fastest way to lose your best people.
              </li>
              <li>
                <strong>Make leave easy to take</strong> — if requesting leave involves three emails, a paper form, and chasing a manager for approval, people will resent the process. Self-service leave requests with one-click approval remove this friction entirely.
              </li>
              <li>
                <strong>Recognise contributions</strong> — a thank-you in the team meeting, a mention in the newsletter, or a half-day off after a major project completion costs nothing but matters enormously.
              </li>
            </ol>

            <h2>How affordable software replaces manual processes</h2>
            <p>
              The biggest objection we hear from small charities is cost. &quot;We can&apos;t afford HR software&quot; is understandable when every pound is accountable to donors and funders. But the reality is that <strong>manual processes cost more</strong> — they just hide the cost in manager time, errors, and compliance risk.
            </p>
            <p>
              Consider what a typical small charity spends on manual leave management:
            </p>

            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Time per month</th>
                  <th>Annual cost (at &pound;18/hr)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Processing leave requests via email</td>
                  <td>3 hours</td>
                  <td>&pound;648</td>
                </tr>
                <tr>
                  <td>Updating spreadsheets and balances</td>
                  <td>2 hours</td>
                  <td>&pound;432</td>
                </tr>
                <tr>
                  <td>Chasing managers for approvals</td>
                  <td>1 hour</td>
                  <td>&pound;216</td>
                </tr>
                <tr>
                  <td>Resolving balance disputes</td>
                  <td>1 hour</td>
                  <td>&pound;216</td>
                </tr>
                <tr>
                  <td>Preparing absence reports</td>
                  <td>1.5 hours</td>
                  <td>&pound;324</td>
                </tr>
                <tr>
                  <td className="font-semibold">Total</td>
                  <td className="font-semibold">8.5 hours</td>
                  <td className="font-semibold">&pound;1,836</td>
                </tr>
              </tbody>
            </table>

            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> costs <strong>&pound;4/user/month for charities</strong> — that&apos;s &pound;960/year for a team of 20. Less than half the hidden cost of manual management, with better accuracy, instant self-service, and full GDPR compliance built in.
            </p>

            <h3>What Leavely provides for small charities</h3>
            <ul className="list-disc pl-6">
              <li><strong>Self-service leave requests</strong> — employees submit requests from their phone or laptop. Managers approve with one click. No email chains.</li>
              <li><strong>Automatic balance calculation</strong> — including pro-rata for part-time staff, accrual for casual workers, and carry-over rules.</li>
              <li><strong>Bradford Factor monitoring</strong> — calculated automatically from sick leave records, with configurable trigger points.</li>
              <li><strong>Team calendar</strong> — see who&apos;s off at a glance. Prevent clashes before they happen.</li>
              <li><strong>Document storage</strong> — upload fit notes, contracts, and policies. Access-controlled and GDPR-compliant.</li>
              <li><strong>Audit log</strong> — every action recorded with timestamp and user. Ready for funder reporting or tribunal evidence.</li>
              <li><strong>Custom leave types</strong> — TOIL, <Link href="/blog/compassionate-leave-uk" className="text-emerald-600 hover:underline font-medium">compassionate leave</Link>, <Link href="/blog/study-leave-policy-uk" className="text-emerald-600 hover:underline font-medium">study leave</Link>, volunteering days — whatever your charity needs.</li>
              <li><strong>No setup fee, no contract</strong> — pay monthly, cancel anytime. 14-day free trial with full access.</li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Built for small charities</h3>
            <p className="text-emerald-100 mb-6">Leave tracking, absence monitoring, and GDPR-compliant document storage — from &pound;4/user/month. Try free for 14 days.</p>
            <Link href="/charities">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                See charity pricing <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Related */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/volunteer-vs-employee-leave-rights-uk" className="block text-emerald-600 hover:underline font-medium">Volunteers vs Employees: Leave Rights Explained (UK 2026) &rarr;</Link>
              <Link href="/blog/charity-absence-management" className="block text-emerald-600 hover:underline font-medium">Absence Management for Charities: Reducing Costs Without Losing Compassion &rarr;</Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK 2026: The Complete Guide &rarr;</Link>
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">Bradford Factor Explained: How to Calculate & Use It &rarr;</Link>
              <Link href="/blog/absence-management-policy-uk" className="block text-emerald-600 hover:underline font-medium">Absence Management Policy UK: Complete Guide &rarr;</Link>
              <Link href="/blog/flexible-working-uk" className="block text-emerald-600 hover:underline font-medium">Flexible Working UK: Rights & Employer Obligations &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
