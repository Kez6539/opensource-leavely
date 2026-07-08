import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingFooter } from '@/components/marketing-layout'
import { Logo } from '@/components/shared/logo'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/expense-management-small-business-uk`

export const metadata: Metadata = {
  title: 'Expense Management for Small Business UK: Complete 2026 Guide',
  description:
    'How to manage employee expenses in a UK small business. HMRC rules, expense policies, receipt requirements, approval workflows, and the best expense management tools for SMBs.',
  alternates: { canonical: articleUrl },
  keywords: [
    'expense management small business uk',
    'employee expense tracking',
    'expense claim software uk',
    'small business expense app',
    'manage staff expenses',
    'HMRC expense rules',
    'employee expense policy uk',
    'expense approval software',
  ],
  openGraph: {
    title: 'Expense Management for Small Business UK: Complete 2026 Guide',
    description:
      'HMRC rules, policy templates, and the best expense management tools for UK small businesses.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Expense Management for Small Business UK: Complete 2026 Guide',
  description:
    'How to manage employee expenses in a UK small business. HMRC rules, expense policies, and the best tools for SMBs.',
  url: articleUrl,
  datePublished: '2026-03-15',
  dateModified: '2026-03-15',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What expenses can employees claim in the UK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Employees can claim expenses that are incurred wholly, exclusively, and necessarily for business purposes. Common claimable expenses include travel (mileage, train fares, parking), accommodation for overnight business trips, subsistence (meals while travelling), client entertainment, home office costs, professional subscriptions, and work-related training.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long must you keep expense receipts for HMRC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HMRC requires businesses to keep records for at least 6 years after the end of the tax year they relate to. This includes receipts, invoices, and any documentation supporting expense claims. Digital copies are accepted provided they are legible and stored securely.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need expense management software for a small team?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can manage expenses with spreadsheets if you have fewer than 5 employees making occasional claims. Beyond that, software saves significant time on approvals, receipt storage, reporting, and HMRC compliance. Tools like Leavely include expense management from £8/user/month alongside leave, rotas, and performance.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the HMRC mileage rate for 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The approved HMRC mileage rate for cars is 45p per mile for the first 10,000 business miles in a tax year, and 25p per mile thereafter. Motorcycles are 24p per mile, and bicycles are 20p per mile. These rates have remained unchanged since 2012.',
      },
    },
  ],
}

export default function ExpenseManagementArticle() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Software Guide</span>
            <span className="text-xs text-gray-400 ml-3">11 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Expense Management for Small Business UK: Complete 2026 Guide
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Employee expenses are one of those business processes that starts simple and gradually becomes a headache. A few receipts in a folder, a spreadsheet on a shared drive, and emails with &quot;can you approve this?&quot; in the subject line. It works until it doesn&apos;t — and when HMRC comes asking questions, &quot;it was in an email somewhere&quot; isn&apos;t an acceptable answer.
            </p>
            <p>
              This guide covers everything UK small businesses need to know about expense management in 2026: HMRC rules, policy design, digital vs paper claims, and the best tools for automating the whole process.
            </p>

            <h2>Why SMBs need proper expense management</h2>
            <p>
              If your employees ever spend money on behalf of the business — whether it&apos;s train tickets, client lunches, software subscriptions, or mileage — you need a system to track, approve, and reimburse those costs. Here&apos;s why it matters:
            </p>

            <h3>HMRC compliance</h3>
            <p>
              HMRC requires businesses to keep records of all expenses for at least <strong>6 years</strong>. If you can&apos;t produce receipts and approval records during an audit, you risk penalties, disallowed claims, and additional tax assessments. A proper system ensures every claim is documented and stored.
            </p>

            <h3>Time savings</h3>
            <p>
              Manual expense processing is slow. Employees fill out forms, attach receipts, email managers, wait for approval, then wait again for reimbursement. Finance teams re-enter data into spreadsheets. A study by the Global Business Travel Association found the average expense report takes <strong>20 minutes to complete</strong> and <strong>18 minutes to process</strong>. Multiply that by dozens of claims per month and the cost adds up quickly.
            </p>

            <h3>Fraud prevention</h3>
            <p>
              Without clear policies and approval workflows, expense fraud can creep in — inflated receipts, personal purchases disguised as business expenses, or duplicate claims. Even honest mistakes are common when the process is informal. Structured approvals and receipt requirements catch problems early.
            </p>

            <h3>Cash flow visibility</h3>
            <p>
              Knowing what your team is spending — and on what — helps you budget accurately. Real-time expense tracking shows you total outstanding claims, spending by category, and trends over time.
            </p>

            <h2>HMRC rules for employee expenses</h2>
            <p>
              Understanding what HMRC allows (and requires) is the foundation of good expense management. Here are the key rules for UK businesses:
            </p>

            <h3>The &quot;wholly, exclusively, and necessarily&quot; test</h3>
            <p>
              For an expense to be tax-deductible (and not a taxable benefit), it must be incurred <strong>wholly, exclusively, and necessarily</strong> in the performance of the employee&apos;s duties. This is HMRC&apos;s golden rule. A train ticket for a client meeting passes the test. A new suit for work does not — even if the employer requires formal dress.
            </p>

            <h3>Common allowable expenses</h3>
            <ul className="list-disc pl-6">
              <li><strong>Travel</strong> — train fares, bus fares, mileage (45p/mile for the first 10,000 miles, 25p/mile after), parking, congestion charges, and tolls for business journeys. Commuting to your normal workplace is <em>not</em> claimable.</li>
              <li><strong>Accommodation</strong> — hotel costs for overnight business trips away from the employee&apos;s normal workplace.</li>
              <li><strong>Subsistence</strong> — meals and drinks while travelling on business. HMRC benchmark rates apply for overseas travel.</li>
              <li><strong>Client entertainment</strong> — meals, events, and hospitality for clients. Note: client entertainment is <em>not</em> tax-deductible for corporation tax, but can be reimbursed tax-free to the employee.</li>
              <li><strong>Professional subscriptions</strong> — fees to HMRC-approved professional bodies relevant to the employee&apos;s role.</li>
              <li><strong>Home office costs</strong> — up to £6/week (or £26/month) without receipts, or actual costs with evidence.</li>
              <li><strong>Equipment and supplies</strong> — work-related tools, stationery, or equipment not provided by the employer.</li>
            </ul>

            <h3>Record keeping requirements</h3>
            <p>
              HMRC expects businesses to retain:
            </p>
            <ul className="list-disc pl-6">
              <li>Original receipts or digital copies for every claim.</li>
              <li>A description of the business purpose for each expense.</li>
              <li>Date, amount, and VAT where applicable.</li>
              <li>Evidence of approval (who approved it and when).</li>
              <li>Records must be kept for <strong>6 years</strong> after the end of the relevant tax year.</li>
            </ul>

            <h3>P11D reporting</h3>
            <p>
              If you reimburse expenses that don&apos;t meet the &quot;wholly, exclusively, and necessarily&quot; test, or provide benefits in kind, you must report them on the employee&apos;s <strong>P11D form</strong> by 6 July following the tax year. Alternatively, you can apply for a <strong>PAYE Settlement Agreement (PSA)</strong> to pay the tax on behalf of the employee, or register for <strong>payrolling benefits</strong> to handle it through regular payroll.
            </p>

            <h2>How to set up an expense policy</h2>
            <p>
              A clear expense policy protects your business and removes ambiguity for employees. Here&apos;s what to include:
            </p>

            <h3>Define expense categories</h3>
            <p>
              Group expenses into clear categories so claims are consistent and reportable:
            </p>
            <ul className="list-disc pl-6">
              <li>Travel (mileage, public transport, taxis, parking)</li>
              <li>Accommodation</li>
              <li>Meals and subsistence</li>
              <li>Client entertainment</li>
              <li>Office supplies and equipment</li>
              <li>Software and subscriptions</li>
              <li>Training and conferences</li>
              <li>Other (with mandatory description)</li>
            </ul>

            <h3>Set approval limits</h3>
            <p>
              Define who can approve what:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Under £50</strong> — line manager approval.</li>
              <li><strong>£50–£250</strong> — department head or senior manager.</li>
              <li><strong>Over £250</strong> — director or finance team approval.</li>
              <li><strong>Pre-approval required</strong> for travel, accommodation, and any expense over a threshold you set.</li>
            </ul>

            <h3>Receipt requirements</h3>
            <p>
              Make it non-negotiable: <strong>no receipt, no reimbursement</strong>. Specify that receipts must show the date, vendor, amount, and VAT. Digital photos or scans are acceptable — there&apos;s no HMRC requirement for paper originals.
            </p>

            <h3>Submission deadlines</h3>
            <p>
              Set a clear deadline for submitting claims — for example, within 30 days of the expense being incurred, or by the 5th of the following month. Late claims should require exceptional approval.
            </p>

            <h3>Reimbursement timeline</h3>
            <p>
              Tell employees when they&apos;ll be reimbursed. Common approaches include:
            </p>
            <ul className="list-disc pl-6">
              <li>Next payroll run after approval.</li>
              <li>Monthly expense payment cycle (e.g. expenses approved by the 20th are paid on the 28th).</li>
              <li>Ad-hoc reimbursement within 5 working days of approval (for larger amounts).</li>
            </ul>

            <h2>Digital vs paper expense claims</h2>
            <p>
              The shift from paper to digital expense management is well underway, and for good reason:
            </p>

            <div className="overflow-x-auto not-prose my-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 border font-semibold text-gray-900">Factor</th>
                    <th className="text-left p-3 border font-semibold text-gray-900">Paper claims</th>
                    <th className="text-left p-3 border font-semibold text-gray-900">Digital claims</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border font-medium">Submission</td>
                    <td className="p-3 border">Physical form + attached receipts</td>
                    <td className="p-3 border">Online form, photo of receipt</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Approval speed</td>
                    <td className="p-3 border">Days to weeks (physical routing)</td>
                    <td className="p-3 border">Minutes to hours (notification-based)</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Storage</td>
                    <td className="p-3 border">Filing cabinets (6+ years)</td>
                    <td className="p-3 border">Cloud storage, searchable</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Audit trail</td>
                    <td className="p-3 border">Manual logs, signatures</td>
                    <td className="p-3 border">Automatic timestamps and user tracking</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Reporting</td>
                    <td className="p-3 border">Manual spreadsheet compilation</td>
                    <td className="p-3 border">Real-time dashboards and exports</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-medium">Lost receipts</td>
                    <td className="p-3 border">Common, hard to recover</td>
                    <td className="p-3 border">Rare — stored immediately on upload</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              HMRC accepts digital records as long as they are legible, complete, and stored securely. There is no requirement to keep paper originals if you have adequate digital copies.
            </p>

            <h2>Best expense management tools for UK SMBs</h2>
            <p>
              Here are the top options for small businesses in 2026:
            </p>

            <h3>1. Leavely — Best for all-in-one HR + expenses</h3>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> now includes a dedicated <strong>Expenses</strong> module alongside leave management, rotas, and performance tracking. It&apos;s built for UK SMBs who want to manage their people in one platform without juggling multiple subscriptions.
            </p>
            <p>
              Employees submit expense claims with a description, amount, category, and receipt upload. Claims go to their manager for approval. Managers can <strong>approve or reject</strong> with one click, and approved claims can be marked as <strong>paid</strong> once reimbursed. The full history — submitted, approved, rejected, paid — is visible to both employee and manager.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Pricing:</strong> £8/user/month — expenses, leave, rotas, and performance all included.</li>
              <li><strong>Free trial:</strong> 14 days, no credit card.</li>
              <li><strong>Pros:</strong> All-in-one platform; simple approval workflow; category tracking; receipt upload; clear status tracking.</li>
              <li><strong>Cons:</strong> No corporate card integration; no OCR receipt scanning (yet); no mileage calculator.</li>
            </ul>

            <h3>2. Pleo</h3>
            <p>
              Pleo provides company cards (Visa) with built-in expense management. Employees pay with the card, snap a photo of the receipt, and the expense is automatically categorised and submitted. It&apos;s popular with tech startups and remote teams.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Pricing:</strong> Free plan (up to 3 users); Starter from £35/month flat + £5/user; Pro from £89/month + £5/user.</li>
              <li><strong>Pros:</strong> Corporate cards with spending limits; automatic receipt matching; real-time spending visibility; Xero/QuickBooks integration.</li>
              <li><strong>Cons:</strong> Requires issuing company cards; more expensive than software-only solutions; not ideal for businesses that primarily reimburse personal spend.</li>
            </ul>

            <h3>3. Dext (formerly Receipt Bank)</h3>
            <p>
              Dext is a receipt capture and bookkeeping tool that uses OCR to extract data from receipts and invoices. It integrates tightly with accounting software like Xero, Sage, and QuickBooks.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Pricing:</strong> From £24/month for up to 4 users (Essential); £36/month for Growing; custom pricing for larger teams.</li>
              <li><strong>Pros:</strong> Excellent OCR accuracy; deep accounting integrations; auto-publish to accounting software; handles supplier invoices too.</li>
              <li><strong>Cons:</strong> Primarily a bookkeeping tool, not an HR platform; no leave or rota features; per-business pricing rather than per-user.</li>
            </ul>

            <h3>4. Moss (formerly Spendesk)</h3>
            <p>
              Moss combines corporate cards, invoice management, and expense reimbursement in one platform. It&apos;s aimed at mid-sized businesses with more complex spending workflows.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Pricing:</strong> Custom pricing based on company size. Typically from £6/user/month.</li>
              <li><strong>Pros:</strong> Physical and virtual cards; real-time budget tracking; approval workflows; good for multi-department businesses.</li>
              <li><strong>Cons:</strong> Overkill for very small teams; pricing is not transparent; setup takes longer than simpler tools.</li>
            </ul>

            <h3>5. Expensify</h3>
            <p>
              Expensify is a well-known expense management tool offering SmartScan receipt capture, automatic mileage tracking, and integrations with most accounting platforms.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Pricing:</strong> From $5/user/month (approximately £4/user). Pricing in USD.</li>
              <li><strong>Pros:</strong> SmartScan OCR is fast; automatic mileage tracking via GPS; corporate card reconciliation; widely used.</li>
              <li><strong>Cons:</strong> US-focused — GBP support but no UK tax-specific features; pricing in dollars; can feel complex for small teams.</li>
            </ul>

            <h2>How Leavely handles expenses</h2>
            <p>
              Leavely&apos;s expense module is designed to be straightforward for both employees and managers. Here&apos;s how it works:
            </p>

            <h3>Submitting a claim</h3>
            <p>
              Employees go to the Expenses section and click <strong>New Claim</strong>. They fill in:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Description</strong> — what the expense was for (e.g. &quot;Train to Manchester client meeting&quot;).</li>
              <li><strong>Amount</strong> — the total in GBP.</li>
              <li><strong>Category</strong> — selected from your configured categories (travel, accommodation, meals, etc.).</li>
              <li><strong>Receipt</strong> — upload a photo or PDF of the receipt.</li>
            </ul>
            <p>
              The claim is created with a <strong>Pending</strong> status and the employee&apos;s manager is notified.
            </p>

            <h3>Manager approval</h3>
            <p>
              Managers see all pending claims from their team in one view. They can review the description, amount, category, and attached receipt, then <strong>Approve</strong> or <strong>Reject</strong> with a single click. Rejected claims can include a reason so the employee knows what to fix.
            </p>

            <h3>Tracking and payment</h3>
            <p>
              Approved claims move to an <strong>Approved</strong> status. Once reimbursed (through payroll or bank transfer), an admin marks the claim as <strong>Paid</strong>. The full lifecycle — Pending, Approved, Rejected, Paid — is visible on each claim with timestamps.
            </p>

            <h3>Reporting</h3>
            <p>
              Managers and admins can view expense summaries by employee, category, and time period. This makes it easy to spot trends, prepare for payroll, and maintain records for HMRC.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose my-6">
              {[
                'Simple claim submission',
                'One-click approvals',
                'Category tracking',
                'Receipt upload (photo/PDF)',
                'Full status lifecycle',
                'Manager dashboard view',
                '£8/user/month — everything included',
                '14-day free trial, no card',
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <h2>Setting up expense management: a practical checklist</h2>
            <p>
              If you&apos;re moving from informal expense handling to a proper system, here&apos;s a step-by-step approach:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Write your expense policy</strong> — define categories, limits, receipt requirements, and deadlines. Keep it to 1–2 pages.</li>
              <li><strong>Choose your tool</strong> — pick software that fits your team size and budget. For most UK SMBs, an all-in-one platform like <Link href="/" className="text-emerald-600 hover:underline">Leavely</Link> is the most efficient choice.</li>
              <li><strong>Configure categories</strong> — set up your expense categories in the tool to match your policy.</li>
              <li><strong>Set up approval workflows</strong> — assign managers as approvers for their direct reports.</li>
              <li><strong>Communicate the policy</strong> — share the policy with all employees and walk through the submission process.</li>
              <li><strong>Run a test cycle</strong> — have a few employees submit test claims to make sure the workflow works before going live.</li>
              <li><strong>Review monthly</strong> — check expense reports monthly for the first quarter to catch any policy gaps or misunderstandings.</li>
            </ol>

            <h2>Frequently asked questions</h2>

            <h3>What expenses can employees claim in the UK?</h3>
            <p>
              Employees can claim expenses incurred wholly, exclusively, and necessarily for business purposes. Common claimable expenses include travel (mileage, train fares, parking), accommodation for overnight business trips, subsistence (meals while travelling), client entertainment, home office costs, professional subscriptions, and work-related training.
            </p>

            <h3>How long must you keep expense receipts for HMRC?</h3>
            <p>
              HMRC requires businesses to keep records for at least <strong>6 years</strong> after the end of the tax year they relate to. This includes receipts, invoices, and any documentation supporting expense claims. Digital copies are accepted provided they are legible and stored securely.
            </p>

            <h3>Do I need expense management software for a small team?</h3>
            <p>
              You can manage expenses with spreadsheets if you have fewer than 5 employees making occasional claims. Beyond that, software saves significant time on approvals, receipt storage, reporting, and HMRC compliance. Tools like <Link href="/pricing" className="text-emerald-600 hover:underline">Leavely</Link> include expense management from £8/user/month alongside leave, rotas, and performance.
            </p>

            <h3>What is the HMRC mileage rate for 2026?</h3>
            <p>
              The approved HMRC mileage rate for cars is <strong>45p per mile</strong> for the first 10,000 business miles in a tax year, and <strong>25p per mile</strong> thereafter. Motorcycles are 24p per mile, and bicycles are 20p per mile. These rates have remained unchanged since 2012.
            </p>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Try Leavely free for 14 days</h3>
            <p className="text-emerald-100 mb-6">Expense management, leave tracking, rotas, and performance — all in one platform. No credit card.</p>
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
              <Link href="/blog/hr-software-small-business-uk" className="block text-emerald-600 hover:underline font-medium">HR Software for Small Businesses UK &rarr;</Link>
              <Link href="/blog/best-leave-management-software-uk" className="block text-emerald-600 hover:underline font-medium">Best Leave Management Software UK 2026 &rarr;</Link>
              <Link href="/blog/best-rota-software-uk" className="block text-emerald-600 hover:underline font-medium">Best Rota Software UK 2026: Top 8 Tools Compared &rarr;</Link>
              <Link href="/blog/leave-management-for-startups" className="block text-emerald-600 hover:underline font-medium">Leave Management for UK Startups &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
