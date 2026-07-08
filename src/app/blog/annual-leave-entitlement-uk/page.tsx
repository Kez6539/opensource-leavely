import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingFooter } from '@/components/marketing-layout'
import { Logo } from '@/components/shared/logo'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/annual-leave-entitlement-uk`

export const metadata: Metadata = {
  title: 'Annual Leave Entitlement UK 2026: Complete Guide for Employers',
  description:
    'How much annual leave are UK employees entitled to? 5.6 weeks statutory minimum, part-time pro-rata calculation, bank holiday rules, carry-over, and common employer mistakes explained.',
  alternates: { canonical: articleUrl },
  keywords: [
    'annual leave entitlement UK',
    'statutory annual leave UK',
    'how much annual leave UK',
    'holiday entitlement UK 2026',
    'annual leave calculator UK',
    'part time annual leave entitlement',
    'bank holidays annual leave',
    'carry over annual leave UK',
    'annual leave pro rata calculation',
  ],
  openGraph: {
    title: 'Annual Leave Entitlement UK 2026 — The Complete Guide',
    description:
      '5.6 weeks statutory minimum, part-time calculations, bank holidays, carry-over rules — everything UK employers need to know.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Annual Leave Entitlement in the UK: The Complete Guide for 2026',
  description:
    'Everything you need to know about statutory annual leave in the UK — how to calculate it, part-time pro-rata, bank holidays, carry-over rules, and common employer mistakes.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function AnnualLeaveArticle() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">HR Guide</span>
            <span className="text-xs text-gray-400 ml-3">8 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Annual Leave Entitlement in the UK: The Complete Guide for 2026
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Understanding annual leave entitlement is one of the most common questions UK employers and employees face. Whether you&apos;re running a small business or managing HR for a growing team, getting leave entitlement right is both a legal requirement and essential for employee wellbeing.
            </p>

            <h2>How much annual leave are UK employees entitled to?</h2>
            <p>
              Under the <strong>Working Time Regulations 1998</strong>, almost all workers in the UK are entitled to a minimum of <strong>5.6 weeks</strong> of paid annual leave per year. For someone working a standard 5-day week, this equals <strong>28 days</strong> (including bank holidays).
            </p>
            <p>
              This is the <strong>statutory minimum</strong> — employers can offer more, but never less. Many employers choose to offer additional days as a benefit, particularly for senior roles or <Link href="/blog/length-of-service-entitlement-uk" className="text-emerald-600 hover:underline font-medium">long-serving employees</Link>.
            </p>

            <h2>Can bank holidays be included in the 28 days?</h2>
            <p>
              Yes. There is no legal requirement to give bank holidays as <em>additional</em> leave. Most employers in the UK include the 8 bank holidays within the 28-day statutory entitlement, leaving employees with 20 days of &quot;flexible&quot; annual leave plus 8 bank holidays.
            </p>
            <p>
              However, this is entirely up to the employer. Some businesses offer 28 days <em>plus</em> bank holidays, while others include bank holidays within the 28-day total.
            </p>

            <h2>How to calculate annual leave for part-time employees</h2>
            <p>
              <Link href="/blog/part-time-workers-rights-uk" className="text-emerald-600 hover:underline font-medium">Part-time employees</Link> are entitled to the same <strong>5.6 weeks</strong> of leave, but calculated <strong>pro rata</strong> based on the number of days they work per week.
            </p>
            <p>The formula is simple:</p>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <p className="text-emerald-800 font-mono text-center text-lg mb-0">
                <strong>Days worked per week × 5.6 = annual leave entitlement</strong>
              </p>
            </div>

            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6 text-center">
              <p className="text-emerald-800 font-semibold mb-2">Free Pro Rata Leave Calculator</p>
              <p className="text-emerald-700 text-sm mb-3">Quickly calculate pro rata annual leave for part-time employees based on their working pattern.</p>
              <Link href="/tools/pro-rata-leave-calculator" className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:underline">
                Try it now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Days worked per week</th>
                  <th>Annual leave entitlement</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>5 days</td><td>28 days</td></tr>
                <tr><td>4 days</td><td>22.4 days</td></tr>
                <tr><td>3 days</td><td>16.8 days</td></tr>
                <tr><td>2 days</td><td>11.2 days</td></tr>
                <tr><td>1 day</td><td>5.6 days</td></tr>
              </tbody>
            </table>

            <h2>Annual leave for irregular hours and shift workers</h2>
            <p>
              For employees who work irregular hours or don&apos;t have fixed weekly patterns, annual leave is calculated as <strong>12.07% of hours worked</strong>. This figure comes from 5.6 weeks ÷ 46.4 working weeks (52 weeks minus 5.6 weeks of leave). Many employers use <Link href="/blog/accrual-based-leave-uk" className="text-emerald-600 hover:underline font-medium">accrual-based leave</Link> to build up entitlement gradually for these workers.
            </p>

            <h2>Annual leave carry-over rules</h2>
            <p>
              By default, the Working Time Regulations allow employees to <Link href="/blog/carry-over-annual-leave-uk" className="text-emerald-600 hover:underline font-medium">carry over up to <strong>1.6 weeks</strong></Link> (8 days for a full-time worker) of unused leave into the next leave year — but only if the employment contract or workplace agreement allows it.
            </p>
            <p>Key carry-over scenarios:</p>
            <ul className="list-disc pl-6">
              <li><strong>Sickness:</strong> Employees who couldn&apos;t take leave due to long-term sickness can carry over up to 4 weeks (20 days) into the next leave year.</li>
              <li><strong>Maternity/paternity leave:</strong> Untaken leave during family leave can be carried over.</li>
              <li><strong>Employer prevented leave:</strong> If the employer prevented the worker from taking leave, the full amount can be carried over.</li>
            </ul>

            <h2>When does the leave year start?</h2>
            <p>
              The leave year is defined in the employment contract. If no start date is specified, it defaults to:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>1 January</strong> for employees who started before 1 October 1998</li>
              <li><strong>The anniversary of the employee&apos;s start date</strong> for all other employees</li>
            </ul>
            <p>Most UK businesses choose to run the leave year from 1 January to 31 December, or 1 April to 31 March (aligning with the tax year).</p>

            <h2>Common mistakes employers make</h2>
            <ol className="list-decimal pl-6">
              <li><strong>Not including bank holidays in the calculation</strong> — forgetting that bank holidays count towards the 28-day minimum, leading to over-entitlement.</li>
              <li><strong>Getting pro-rata wrong for part-timers</strong> — using incorrect formulas or rounding down instead of up.</li>
              <li><strong>Not tracking leave balances</strong> — relying on spreadsheets that quickly become outdated, causing disputes.</li>
              <li><strong>&quot;Use it or lose it&quot; policies without contract backing</strong> — you can&apos;t enforce a use-it-or-lose-it policy unless it&apos;s in the contract.</li>
              <li><strong>Paying in lieu instead of giving actual time off</strong> — rolled-up holiday pay is not permitted except at termination.</li>
            </ol>

            <h2>How Leavely helps manage annual leave</h2>
            <p>
              Tracking annual leave entitlement manually — with spreadsheets, emails, or paper forms — is error-prone and time-consuming. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> automates the entire process:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Automatic balance calculation</strong> — allowances, used days, and remaining leave are always accurate.</li>
              <li><strong>Part-time pro-rata built in</strong> — set the work pattern and Leavely handles the maths.</li>
              <li><strong>UK bank holidays pre-loaded</strong> — no manual entry needed.</li>
              <li><strong>Visual leave calendar</strong> — see who&apos;s off at a glance and spot coverage gaps.</li>
              <li><strong>One-click approvals</strong> — managers approve or decline in seconds.</li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Stop tracking leave in spreadsheets</h3>
            <p className="text-emerald-100 mb-6">Try Leavely free for 14 days — automatic balances, one-click approvals, and a visual calendar.</p>
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
              <Link href="/blog/pro-rata-annual-leave-calculator" className="block text-emerald-600 hover:underline font-medium">How to Calculate Pro Rata Annual Leave UK &rarr;</Link>
              <Link href="/part-time-worker-leave-entitlement" className="block text-emerald-600 hover:underline font-medium">Part-Time Worker Leave Entitlement UK: Pro-Rata Guide &rarr;</Link>
              <Link href="/uk-hr-compliance-small-business" className="block text-emerald-600 hover:underline font-medium">UK HR Compliance Checklist for Small Businesses &rarr;</Link>
              <Link href="/blog/carry-over-annual-leave-uk" className="block text-emerald-600 hover:underline font-medium">Carry Over Annual Leave UK: Rules Employers Must Know &rarr;</Link>
              <Link href="/blog/bank-holidays-uk-2026" className="block text-emerald-600 hover:underline font-medium">UK Bank Holidays 2026: Complete List for Employers &rarr;</Link>
              <Link href="/blog/holiday-pay-calculation-uk" className="block text-emerald-600 hover:underline font-medium">Holiday Pay Calculation UK: The Complete Guide &rarr;</Link>
              <Link href="/blog/part-time-workers-rights-uk" className="block text-emerald-600 hover:underline font-medium">Part-Time Workers&apos; Rights UK: Leave, Pay &amp; Obligations &rarr;</Link>
              <Link href="/blog/length-of-service-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Length of Service Entitlement: Extra Holiday for Long-Serving Staff &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
