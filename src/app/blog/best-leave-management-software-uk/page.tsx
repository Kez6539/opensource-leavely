import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingFooter } from '@/components/marketing-layout'
import { Logo } from '@/components/shared/logo'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/best-leave-management-software-uk`

export const metadata: Metadata = {
  title: 'Best Leave Management Software UK 2026: What to Look For',
  description:
    'A practical guide to choosing leave management software for your UK business. Key features to look for, pricing considerations, spreadsheet vs software comparison, and what makes a great leave tracker.',
  alternates: { canonical: articleUrl },
  keywords: [
    'best leave management software UK',
    'leave management software comparison',
    'leave management software for small business',
    'best holiday tracker software UK',
    'employee leave tracker UK',
    'leave management system UK 2026',
    'absence management software UK',
    'HR software for small business UK',
  ],
  openGraph: {
    title: 'Best Leave Management Software UK 2026',
    description:
      'What to look for when choosing leave management software. Features, pricing, and how to pick the right tool for your UK business.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best Leave Management Software UK 2026: What to Look For',
  description:
    'A practical guide to choosing leave management software for your UK business.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function BestSoftwareArticle() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Software Guide</span>
            <span className="text-xs text-gray-400 ml-3">7 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Best Leave Management Software UK 2026: What to Look For
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              If you&apos;re still tracking employee leave with spreadsheets, shared calendars, or email threads, you&apos;re not alone — but you&apos;re making your life harder than it needs to be. Dedicated leave management software saves time, reduces errors, and keeps your team happy. Here&apos;s what to look for when choosing one.
            </p>

            <h2>Why switch from spreadsheets to leave management software?</h2>
            <p>
              Spreadsheets work when you have 3–5 employees. Beyond that, they become a liability:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Manual errors</strong> — wrong formulas, forgotten updates, and overwritten cells cause balance disputes.</li>
              <li><strong>No self-service</strong> — employees can&apos;t check their own balance or submit requests without emailing HR.</li>
              <li><strong>No approval workflow</strong> — managers approve via email with no audit trail.</li>
              <li><strong>No calendar view</strong> — you can&apos;t see at a glance who&apos;s off and when.</li>
              <li><strong>No compliance tracking</strong> — no Bradford Factor, no return-to-work forms, no audit log.</li>
            </ul>
            <p>
              Leave management software solves all of these problems for a few pounds per employee per month.
            </p>

            <h2>Essential features to look for</h2>
            <p>Not all leave management tools are created equal. Here are the features that matter most for UK businesses:</p>

            <h3>1. Visual leave calendar</h3>
            <p>
              A team calendar showing who&apos;s off and when is the most valuable feature. It lets managers spot coverage gaps, avoid scheduling conflicts, and plan around holidays. Look for colour-coded leave types and department filtering.
            </p>

            <h3>2. Self-service leave requests</h3>
            <p>
              <Link href="/blog/employee-self-service-hr" className="text-emerald-600 hover:underline font-medium">Employee self-service</Link> means staff can check their balance, submit a leave request, and see its status — all without emailing HR. This saves everyone time and reduces back-and-forth.
            </p>

            <h3>3. One-click approvals</h3>
            <p>
              Managers should be able to approve or decline requests in a single click, ideally from an email notification or mobile device. Multi-step approval workflows add complexity most SMBs don&apos;t need.
            </p>

            <h3>4. Automatic balance tracking</h3>
            <p>
              The software should automatically calculate allowances, used days, pending requests, and remaining balance. No manual adjustments, no formulas to maintain.
            </p>

            <h3>5. UK bank holidays</h3>
            <p>
              Pre-loaded bank holidays for England, Scotland, Wales, and Northern Ireland save setup time and ensure leave calculations are accurate around public holidays.
            </p>

            <h3>6. Custom leave policies</h3>
            <p>
              Beyond annual leave and sick leave, you may need TOIL, compassionate leave, study leave, or other custom types. The software should support unlimited leave types with configurable allowances.
            </p>

            <h3>7. Bradford Factor and absence analytics</h3>
            <p>
              Automatic <Link href="/blog/bradford-factor-explained" className="text-emerald-600 hover:underline font-medium">Bradford Factor</Link> calculation helps you identify absence patterns early. Look for tools that calculate it from sick leave data without manual input.
            </p>

            <h3>8. Role-based access control</h3>
            <p>
              Different roles need different access. Owners see everything, managers see their team, employees see only their own data. Good software enforces this automatically.
            </p>

            <h3>9. GDPR compliance</h3>
            <p>
              Any software handling employee data must be GDPR compliant. Check for encryption, data export capabilities, deletion rights, and clear privacy policies.
            </p>

            <h3>10. Easy setup and onboarding</h3>
            <p>
              You shouldn&apos;t need a consultant or a 2-hour training session to get started. The best tools let you set up in minutes and invite your team immediately.
            </p>

            <h2>Pricing: what to expect</h2>
            <p>
              Most leave management software in the UK charges per user per month. Typical pricing ranges:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Budget tools:</strong> £2–£5/user/month — basic leave tracking, limited features.</li>
              <li><strong>Mid-range tools:</strong> £5–£10/user/month — full feature set, good for SMBs.</li>
              <li><strong>Enterprise tools:</strong> £10–£20+/user/month — advanced HR suite, payroll integration, custom workflows.</li>
            </ul>
            <p>
              For most UK SMBs with 5–200 employees, a mid-range tool offers the best value. Avoid tools that gate essential features (like Bradford Factor or TOIL) behind premium tiers.
            </p>

            <h2>Red flags to watch for</h2>
            <ul className="list-disc pl-6">
              <li><strong>Credit card required for trial</strong> — legitimate tools let you try before you buy.</li>
              <li><strong>Annual contracts only</strong> — monthly billing gives you flexibility.</li>
              <li><strong>Feature tiers</strong> — paying more for basic features like leave types or reporting.</li>
              <li><strong>No UK bank holidays</strong> — surprisingly common in tools built for US or global markets.</li>
              <li><strong>Complex setup</strong> — if the demo takes 30 minutes, imagine the setup.</li>
            </ul>

            <h2>Why Leavely is built for UK businesses</h2>
            <p>
              <Link href="/leave-management-software-uk" className="text-emerald-600 hover:underline font-medium">Leavely&apos;s leave management software</Link> was designed from the ground up for UK SMBs. Here&apos;s what sets it apart:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-prose my-6">
              {[
                '£8/user/month — all features',
                '14-day free trial, no card',
                'UK bank holidays pre-loaded',
                'Bradford Factor automatic',
                'TOIL tracking included',
                'Set up in 2 minutes',
                'One-click approvals',
                'Visual leave calendar',
                'Role-based access control',
                'GDPR compliant',
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Try Leavely free for 14 days</h3>
            <p className="text-emerald-100 mb-6">All features included. No credit card. Set up in 2 minutes.</p>
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
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK 2026: The Complete Guide &rarr;</Link>
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">Bradford Factor Explained: How to Calculate and Use It &rarr;</Link>
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
              <Link href="/blog/toil-policy-uk" className="block text-emerald-600 hover:underline font-medium">TOIL Policy UK: Time Off in Lieu Explained &rarr;</Link>
              <Link href="/compare" className="block text-emerald-600 hover:underline font-medium">Compare Leavely vs Other Leave Management Tools &rarr;</Link>
              <Link href="/blog/staff-holiday-tracker-uk" className="block text-emerald-600 hover:underline font-medium">Staff Holiday Tracker UK: Stop Using Spreadsheets &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
