import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingFooter } from '@/components/marketing-layout'
import { Logo } from '@/components/shared/logo'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/bradford-factor-explained`

export const metadata: Metadata = {
  title: 'Bradford Factor Explained: How to Calculate & Use It (2026 Guide)',
  description:
    'What is the Bradford Factor? Learn the formula (S × S × D), how to calculate scores, trigger point thresholds, and how UK employers use it to manage short-term absences fairly.',
  alternates: { canonical: articleUrl },
  keywords: [
    'Bradford Factor',
    'Bradford Factor calculator',
    'Bradford Factor explained',
    'Bradford Factor formula',
    'Bradford Factor score',
    'Bradford Factor trigger points',
    'absence management Bradford Factor',
    'short-term absence management UK',
    'Bradford Factor thresholds',
  ],
  openGraph: {
    title: 'Bradford Factor Explained — Formula, Scores & How to Use It',
    description:
      'The Bradford Factor formula (S × S × D), score thresholds, and how UK employers use it to manage absence patterns.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Bradford Factor Explained: How to Calculate and Use It',
  description:
    'Learn what the Bradford Factor is, how to calculate it, what scores mean, and how UK employers use it to manage short-term absences fairly.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function BradfordFactorArticle() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Absence Management</span>
            <span className="text-xs text-gray-400 ml-3">6 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Bradford Factor Explained: How to Calculate and Use It
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              The <strong>Bradford Factor</strong> is a formula used by HR departments across the UK to measure the impact of employee absences. It&apos;s designed to highlight patterns of frequent, short-term absences — which are typically more disruptive to a business than longer, planned absences.
            </p>

            <h2>The Bradford Factor formula</h2>
            <p>The formula is straightforward:</p>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <p className="text-emerald-800 font-mono text-center text-xl mb-0">
                <strong>B = S × S × D</strong>
              </p>
              <div className="text-center text-sm text-emerald-700 mt-2">
                <p className="mb-0">B = Bradford Factor score</p>
                <p className="mb-0">S = number of separate absence <em>spells</em> (instances)</p>
                <p className="mb-0">D = total number of <em>days</em> absent</p>
              </div>
            </div>
            <p>
              The key insight is that <strong>S is squared</strong>. This means frequent short absences produce a much higher score than a single long absence — even when the total days absent are the same.
            </p>

            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6 text-center">
              <p className="text-emerald-800 font-semibold mb-2">Free Bradford Factor Calculator</p>
              <p className="text-emerald-700 text-sm mb-3">Enter absence spells and total days to instantly calculate a Bradford Factor score with threshold guidance.</p>
              <Link href="/tools/bradford-factor-calculator" className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:underline">
                Try it now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <h2>Bradford Factor examples</h2>
            <p>Consider two employees who have both been absent for 10 days in a year:</p>

            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Absences (S)</th>
                  <th>Total days (D)</th>
                  <th>Bradford Factor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Alice — 1 long absence</td>
                  <td>1</td>
                  <td>10</td>
                  <td><strong>1 × 1 × 10 = 10</strong></td>
                </tr>
                <tr>
                  <td>Bob — 10 single-day absences</td>
                  <td>10</td>
                  <td>10</td>
                  <td><strong>10 × 10 × 10 = 1,000</strong></td>
                </tr>
              </tbody>
            </table>

            <p>
              Alice scores 10, Bob scores 1,000 — despite both taking 10 days off. The Bradford Factor highlights that Bob&apos;s pattern of frequent single-day absences is far more disruptive to business operations.
            </p>

            <h2>Bradford Factor trigger point thresholds</h2>
            <p>
              There are no legally mandated trigger points — each organisation sets its own. However, these thresholds are commonly used across UK businesses:
            </p>

            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Score</th>
                  <th>Level</th>
                  <th>Typical action</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>0–49</td><td className="text-emerald-600 font-semibold">Low</td><td>No action required</td></tr>
                <tr><td>50–124</td><td className="text-amber-600 font-semibold">Medium</td><td>Informal discussion with manager</td></tr>
                <tr><td>125–399</td><td className="text-orange-600 font-semibold">High</td><td>Formal review meeting</td></tr>
                <tr><td>400–649</td><td className="text-red-600 font-semibold">Very high</td><td>Written warning</td></tr>
                <tr><td>650+</td><td className="text-red-700 font-semibold">Critical</td><td>Final warning or disciplinary</td></tr>
              </tbody>
            </table>

            <h2>Advantages of the Bradford Factor</h2>
            <ul className="list-disc pl-6">
              <li><strong>Objective measurement</strong> — removes subjectivity from absence discussions.</li>
              <li><strong>Highlights patterns</strong> — identifies employees with frequent short-term absences that disrupt team productivity.</li>
              <li><strong>Simple to calculate</strong> — the formula is straightforward and easy to explain to employees.</li>
              <li><strong>Widely recognised</strong> — most UK employees and unions understand the Bradford Factor.</li>
            </ul>

            <h2>Limitations and criticisms</h2>
            <ul className="list-disc pl-6">
              <li><strong>Disability discrimination risk</strong> — employees with chronic conditions may have frequent short absences that inflate their score. Employers must make <Link href="/blog/disability-leave-adjustments-uk" className="text-emerald-600 hover:underline font-medium">reasonable adjustments</Link> under the Equality Act 2010.</li>
              <li><strong>Doesn&apos;t distinguish reasons</strong> — a genuine illness and a suspicious Monday absence both count the same.</li>
              <li><strong>Can discourage reporting</strong> — employees may come to work ill to avoid triggering thresholds, spreading illness to colleagues.</li>
              <li><strong>Should not be used alone</strong> — the Bradford Factor should be one tool among many, not the sole basis for disciplinary action.</li>
            </ul>

            <h2>Best practices for using the Bradford Factor</h2>
            <ol className="list-decimal pl-6">
              <li><strong>Document your policy</strong> — include the Bradford Factor and trigger points in your <Link href="/blog/absence-management-policy-uk" className="text-emerald-600 hover:underline font-medium">absence management policy</Link>. Make sure all employees understand how it works.</li>
              <li><strong>Apply it consistently</strong> — use the same thresholds and process for everyone to avoid discrimination claims.</li>
              <li><strong>Consider context</strong> — always investigate the reasons behind high scores before taking action.</li>
              <li><strong>Exclude protected absences</strong> — disability-related absences, maternity leave, and other protected absences should be excluded from the calculation.</li>
              <li><strong>Use a rolling 12-month period</strong> — calculate scores over the last 12 months, not the calendar year.</li>
              <li><strong>Automate the calculation</strong> — manual tracking is error-prone. Use leave management software to calculate scores automatically.</li>
            </ol>

            <h2>How Leavely calculates the Bradford Factor automatically</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> automatically calculates the Bradford Factor for every employee based on their sick leave records. On each employee&apos;s profile, managers can see:
            </p>
            <ul className="list-disc pl-6">
              <li>Current Bradford Factor score (rolling 12 months)</li>
              <li>Number of separate absence spells</li>
              <li>Total days absent</li>
              <li>Full sick leave history with dates</li>
            </ul>
            <p>
              No spreadsheets, no manual counting — the score updates automatically as leave records are added.
            </p>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Automate Bradford Factor tracking</h3>
            <p className="text-emerald-100 mb-6">Leavely calculates Bradford Factor scores automatically. Try it free for 14 days.</p>
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
              <Link href="/blog/sick-leave-policy-uk" className="block text-emerald-600 hover:underline font-medium">Sick Leave Policy UK: What Employers Must Know &rarr;</Link>
              <Link href="/blog/return-to-work-interview-questions" className="block text-emerald-600 hover:underline font-medium">Return-to-Work Interview Questions: Free Template &rarr;</Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK 2026: The Complete Guide &rarr;</Link>
              <Link href="/blog/absence-management-policy-uk" className="block text-emerald-600 hover:underline font-medium">Absence Management Policy UK: Complete Guide &rarr;</Link>
              <Link href="/tools/bradford-factor-calculator" className="block text-emerald-600 hover:underline font-medium">Bradford Factor Calculator: Free Online Tool &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
