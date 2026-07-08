import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/part-time-workers-rights-uk`

export const metadata: Metadata = {
  title: "Part-Time Workers' Rights UK: Leave, Pay & Employer Obligations",
  description:
    "A complete guide to part-time workers' rights in the UK. Covers the Part-Time Workers Regulations 2000, pro-rata leave, bank holiday entitlement, equal treatment, and common areas of discrimination.",
  alternates: { canonical: articleUrl },
  keywords: [
    'part time workers rights UK',
    'part time employee rights',
    'Part-Time Workers Regulations 2000',
    'part time annual leave entitlement',
    'part time worker discrimination',
    'pro rata benefits part time',
  ],
  openGraph: {
    title: "Part-Time Workers' Rights UK — Leave, Pay & Employer Obligations",
    description:
      'Pro-rata leave, equal treatment, bank holiday entitlement, and employer obligations under the Part-Time Workers Regulations 2000.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "Part-Time Workers' Rights UK: Leave, Pay & Employer Obligations",
  description:
    "A comprehensive guide to part-time workers' rights in the UK, covering the Part-Time Workers Regulations 2000, pro-rata leave entitlement, bank holidays, and common areas of discrimination.",
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function PartTimeWorkersRightsArticle() {
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
            <span className="text-xs text-gray-400 ml-3">7 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Part-Time Workers&apos; Rights UK: Leave, Pay &amp; Employer Obligations
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600">

            <p className="text-lg">
              Part-time workers make up a significant proportion of the UK workforce, yet their rights are frequently misunderstood — or worse, overlooked. The <strong>Part-Time Workers (Prevention of Less Favourable Treatment) Regulations 2000</strong> give part-time employees the legal right to be treated no less favourably than comparable full-time colleagues. This guide explains what that means in practice and how employers can stay compliant.
            </p>

            <h2>The Part-Time Workers Regulations 2000</h2>
            <p>
              The <strong>Part-Time Workers (Prevention of Less Favourable Treatment) Regulations 2000</strong> (often called the PTW Regulations) are the cornerstone of part-time worker protection in the UK. The core principle is simple: a part-time worker must not be treated less favourably than a comparable full-time worker, unless the employer can objectively justify the difference.
            </p>
            <p>
              The Regulations apply to all workers — not just employees. This includes agency workers, casual workers, and those on zero-hours contracts who work fewer hours than a comparable full-time colleague.
            </p>
            <p>
              &quot;Less favourable treatment&quot; covers every aspect of the employment relationship, including:
            </p>
            <ul className="list-disc pl-6">
              <li>Pay (same hourly rate)</li>
              <li>Annual leave (pro rata)</li>
              <li>Pension (same access and employer contribution rate)</li>
              <li>Training and development opportunities</li>
              <li>Career development and promotion</li>
              <li>Redundancy selection criteria</li>
              <li>Access to company benefits (sick pay, parental leave, staff discounts)</li>
            </ul>

            <h2>The comparator test</h2>
            <p>
              For a part-time worker to bring a claim of less favourable treatment, they must identify a <strong>comparable full-time worker</strong>. The comparator must:
            </p>
            <ul className="list-disc pl-6">
              <li>Be employed by the <strong>same employer</strong>.</li>
              <li>Work at the <strong>same establishment</strong> (or, if there is no comparator at the same site, at a different establishment of the same employer).</li>
              <li>Be engaged in the <strong>same or broadly similar work</strong>, taking into account qualifications, skills, and experience.</li>
              <li>Have the <strong>same type of contract</strong> (e.g., both permanent, both fixed-term).</li>
            </ul>
            <p>
              If no comparable full-time worker exists, the Regulations do not apply. However, employers should still aim for fair treatment to avoid broader discrimination claims.
            </p>

            <h2>Annual leave entitlement for part-time workers</h2>
            <p>
              Part-time workers are entitled to the same <strong>5.6 weeks</strong> of statutory annual leave as full-time workers — but expressed <strong>pro rata</strong> based on the number of days they work per week.
            </p>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <p className="text-emerald-800 font-mono text-center text-lg mb-4">
                <strong>Pro-rata leave = 5.6 &times; Days worked per week</strong>
              </p>
              <p className="text-emerald-700 text-sm text-center mb-0">
                Example: An employee working 3 days per week is entitled to 5.6 &times; 3 = <strong>16.8 days</strong> of annual leave per year.
              </p>
            </div>
            <p>
              For employees with irregular hours or those who work different days each week, the calculation should be based on <strong>hours</strong> rather than days. Convert the full-time entitlement to hours and then apply the pro-rata fraction.
            </p>
            <p>
              For a detailed walkthrough, see our <Link href="/blog/pro-rata-annual-leave-calculator" className="text-emerald-600 hover:underline font-medium">pro-rata annual leave calculator guide</Link>.
            </p>

            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6 text-center">
              <p className="text-emerald-800 font-semibold mb-2">Free Pro Rata Leave Calculator</p>
              <p className="text-emerald-700 text-sm mb-3">Quickly calculate pro rata annual leave for part-time employees based on their working pattern.</p>
              <Link href="/tools/pro-rata-leave-calculator" className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:underline">
                Try it now <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <h2>Bank holiday entitlement for part-time workers</h2>
            <p>
              Bank holidays are one of the most common sources of confusion — and complaints — when it comes to part-time workers. There are two key points:
            </p>
            <h3>1. Part-timers are entitled to bank holidays pro rata</h3>
            <p>
              If full-time employees receive the 8 bank holidays <strong>on top of</strong> their 20 days of basic leave (totalling 28 days), then part-time workers must receive a pro-rata share of the full 28 days. You cannot simply give part-timers the basic 20 days pro rata and then only grant bank holidays that fall on their working day.
            </p>
            <h3>2. The &quot;bank holiday falls on my day off&quot; problem</h3>
            <p>
              If a bank holiday falls on a day the part-time worker does not work, they are still entitled to the pro-rata benefit. The simplest approach is to include bank holidays within the total leave entitlement and let the employee use them flexibly. For example:
            </p>
            <ul className="list-disc pl-6">
              <li>A full-time worker gets 28 days total (20 + 8 bank holidays).</li>
              <li>A worker doing 3 days per week gets 16.8 days total (28 &times; 3/5).</li>
              <li>They must take any bank holidays that fall on their working day from this balance, but also get the full pro-rata amount regardless of which days the bank holidays land on.</li>
            </ul>
            <p>
              This method is recommended by ACAS and avoids the unfairness of part-time workers who happen to work on Mondays (when most bank holidays fall) getting fewer discretionary leave days.
            </p>

            <h2>Common areas of discrimination</h2>
            <p>
              Even well-intentioned employers can inadvertently discriminate against part-time workers. Watch out for these common pitfalls:
            </p>

            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Area</th>
                  <th>What goes wrong</th>
                  <th>What the law requires</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Training</strong></td>
                  <td>Training sessions only scheduled on days the part-timer doesn&apos;t work.</td>
                  <td>Equal access to training. Offer alternative dates or adjust the schedule.</td>
                </tr>
                <tr>
                  <td><strong>Promotion</strong></td>
                  <td>Part-time workers overlooked for promotion because they are &quot;not fully committed&quot;.</td>
                  <td>Promotion decisions must be based on merit, not hours worked.</td>
                </tr>
                <tr>
                  <td><strong>Redundancy</strong></td>
                  <td>Part-time roles selected for redundancy first, or part-time workers scored lower because of hours.</td>
                  <td>Redundancy selection criteria must not disadvantage part-timers.</td>
                </tr>
                <tr>
                  <td><strong>Overtime</strong></td>
                  <td>Part-timers paid at a lower rate for hours above their contract but below full-time hours.</td>
                  <td>Overtime premiums should apply at the same threshold as for full-time workers.</td>
                </tr>
                <tr>
                  <td><strong>Pension</strong></td>
                  <td>Part-time workers excluded from pension schemes or given a lower employer contribution.</td>
                  <td>Same pension access and contribution rate on a pro-rata basis.</td>
                </tr>
                <tr>
                  <td><strong>Benefits</strong></td>
                  <td>Part-timers excluded from company perks like gym memberships or health insurance.</td>
                  <td>Same access to benefits, pro rata where appropriate.</td>
                </tr>
              </tbody>
            </table>

            <h2>Written statement of reasons</h2>
            <p>
              If a part-time worker believes they are being treated less favourably, they have the right to request a <strong>written statement of reasons</strong> from their employer. The employer must respond within <strong>21 days</strong>.
            </p>
            <p>
              If the employer fails to respond, or provides an evasive or equivocal response, a tribunal may draw an <strong>adverse inference</strong> — in other words, it may assume that the less favourable treatment was because of the worker&apos;s part-time status.
            </p>
            <p>
              Best practice: if a part-time worker raises concerns about unequal treatment, take it seriously and investigate promptly. Document your reasoning and any objective justification for any differences in treatment.
            </p>

            <h2>Objective justification</h2>
            <p>
              An employer <em>can</em> treat a part-time worker differently if the treatment is <strong>objectively justified</strong>. This means the employer must show that the less favourable treatment:
            </p>
            <ul className="list-disc pl-6">
              <li>Achieves a <strong>legitimate business aim</strong> (e.g., cost control, operational efficiency).</li>
              <li>Is <strong>necessary</strong> to achieve that aim.</li>
              <li>Is <strong>proportionate</strong> — the benefit to the business outweighs the disadvantage to the worker.</li>
            </ul>
            <p>
              This is a high bar. &quot;It&apos;s always been done this way&quot; or &quot;it&apos;s too complicated to change&quot; will not satisfy a tribunal. Employers should document their justification thoroughly.
            </p>

            <h2>How Leavely handles part-time workers automatically</h2>
            <p>
              Calculating pro-rata leave, managing bank holiday entitlements, and ensuring equal treatment is one of the most error-prone areas of HR administration. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> automates it all:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Automatic pro-rata calculation</strong> — enter the employee&apos;s working pattern and Leavely calculates their leave entitlement instantly. No formulas, no spreadsheets.</li>
              <li><strong>Bank holiday fairness</strong> — Leavely includes bank holidays in the total pro-rata entitlement, ensuring part-time workers are never short-changed regardless of which days they work.</li>
              <li><strong>Working pattern flexibility</strong> — supports any combination of working days, including irregular patterns and term-time working.</li>
              <li><strong>Mid-year changes</strong> — if an employee changes from full-time to part-time (or vice versa) during the leave year, Leavely calculates a blended entitlement automatically.</li>
              <li><strong>Equal visibility</strong> — part-time employees see their correct balance and can request leave through the same system as full-time colleagues.</li>
              <li><strong>Compliance confidence</strong> — with accurate, auditable calculations, you can demonstrate equal treatment if any question arises.</li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Pro-rata leave calculations, done automatically</h3>
            <p className="text-emerald-100 mb-6">Leavely calculates part-time entitlements, bank holiday pro-rata, and mid-year changes with zero manual work. Start your 14-day free trial.</p>
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
              <Link href="/blog/pro-rata-annual-leave-calculator" className="block text-emerald-600 hover:underline font-medium">
                Pro Rata Annual Leave Calculator: How to Get It Right &rarr;
              </Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">
                Annual Leave Entitlement UK 2026: The Complete Guide &rarr;
              </Link>
              <Link href="/blog/flexible-working-uk" className="block text-emerald-600 hover:underline font-medium">
                Flexible Working UK: Right to Request Guide for Employers &rarr;
              </Link>
              <Link href="/blog/holiday-pay-calculation-uk" className="block text-emerald-600 hover:underline font-medium">
                Holiday Pay Calculation UK: The Complete Guide &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
