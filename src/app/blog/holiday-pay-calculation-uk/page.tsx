import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/holiday-pay-calculation-uk`

export const metadata: Metadata = {
  title: 'Holiday Pay Calculation UK: How to Get It Right (2026 Guide)',
  description:
    'Learn how to calculate holiday pay correctly in the UK. Covers fixed hours, variable hours, overtime, commission, the 52-week reference period, rolled-up holiday pay, and common mistakes.',
  alternates: { canonical: articleUrl },
  keywords: [
    'holiday pay calculation UK',
    'how to calculate holiday pay',
    'holiday pay UK',
    'statutory holiday pay',
    'holiday pay for part time workers',
    'holiday pay on overtime',
    'rolled up holiday pay',
  ],
  openGraph: {
    title: 'Holiday Pay Calculation UK — How to Get It Right (2026)',
    description:
      'Fixed hours, variable hours, overtime, commission, 52-week reference period, and rolled-up holiday pay explained.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Holiday Pay Calculation UK: How to Get It Right',
  description: 'A complete guide to calculating holiday pay correctly in the UK, covering fixed and variable hours, overtime, the 52-week reference period, and rolled-up holiday pay.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function HolidayPayCalculationArticle() {
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
            <span className="text-xs text-gray-400 ml-3">8 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Holiday Pay Calculation UK: How to Get It Right
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Getting holiday pay wrong is one of the most common payroll errors in UK businesses — and it can lead to underpayment claims, tribunal cases, and back-pay liabilities running into years. The rules have changed significantly in recent years, particularly around variable-hours workers and rolled-up holiday pay. This guide explains exactly how to calculate holiday pay correctly in 2026.
            </p>

            <h2>The basic rule: a week&apos;s pay for a week&apos;s holiday</h2>
            <p>
              The fundamental principle of holiday pay in the UK is straightforward: when a worker takes a week of annual leave, they should receive a <strong>week&apos;s normal pay</strong>. The purpose is to ensure workers are not financially penalised for taking time off, which would discourage them from using their entitlement.
            </p>
            <p>
              The complexity arises when you need to define what &quot;normal pay&quot; means for workers whose earnings vary from week to week — those on irregular hours, overtime, commission, or shift patterns.
            </p>

            <h2>Calculating holiday pay for fixed-hours workers</h2>
            <p>
              For employees who work the same number of hours every week on a fixed salary, the calculation is simple. Their holiday pay is their <strong>normal weekly pay</strong> — exactly what they would have earned if they had been at work.
            </p>
            <p>
              For example, an employee earning &pound;30,000 per year on a standard 37.5-hour week receives &pound;576.92 per week (before deductions). When they take a week&apos;s holiday, they receive &pound;576.92. No additional calculation is needed.
            </p>
            <p>
              Part-time workers on fixed hours follow the same principle. A worker on 20 hours per week at &pound;12 per hour receives &pound;240 per week of holiday.
            </p>

            <h2>Calculating holiday pay for variable-hours workers</h2>
            <p>
              This is where most employers make mistakes. When a worker&apos;s pay varies — because of overtime, commission, bonuses, or irregular shift patterns — you must use a <strong>reference period</strong> to calculate their average weekly earnings.
            </p>

            <h3>The 52-week reference period</h3>
            <p>
              Since April 2020, the reference period for calculating average weekly pay is <strong>52 weeks</strong> (previously 12 weeks). You look back at the last 52 weeks in which the worker was paid and calculate their average weekly earnings across that period.
            </p>
            <p>
              If there are weeks in which the worker received no pay (for example, because they were on unpaid leave or there was no work available), you skip those weeks and go back further until you have 52 paid weeks. The look-back is capped at <strong>104 weeks</strong>.
            </p>
            <p>
              This change was significant because the old 12-week period could produce misleading results — for example, a worker with a seasonal pattern might have their holiday pay calculated during their quietest period.
            </p>

            <h2>What counts towards holiday pay?</h2>
            <p>
              Following a series of landmark court cases, the definition of what must be included in holiday pay has expanded considerably. As of 2026, holiday pay must include:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Basic pay</strong> — the worker&apos;s standard contractual pay.</li>
              <li><strong>Regular overtime</strong> — overtime that is worked regularly, whether it is compulsory, voluntary but regularly worked, or guaranteed. If the worker regularly works overtime, it must be reflected in their holiday pay (following <em>Bear Scotland v Fulton</em>).</li>
              <li><strong>Commission</strong> — results-based commission that is intrinsically linked to the worker&apos;s role (following <em>Lock v British Gas</em>).</li>
              <li><strong>Regular bonuses</strong> — bonuses that are paid regularly enough to be considered part of normal remuneration.</li>
              <li><strong>Regular allowances</strong> — for example, shift premiums or travel time payments that are consistently part of the worker&apos;s pay.</li>
            </ul>
            <p>
              The key test from <em>Harpur Trust v Brazel</em> (2022) confirmed that holiday pay for part-year workers (such as term-time staff) must not be pro-rated down. A part-year worker is entitled to 5.6 weeks of holiday pay based on their average weekly earnings when they actually work, not spread across the full year. This ruling significantly increased holiday pay costs for employers with part-year staff.
            </p>

            <h2>Rolled-up holiday pay</h2>
            <p>
              Rolled-up holiday pay is the practice of including an uplift in a worker&apos;s hourly or weekly rate to cover holiday pay, instead of paying them separately when they take time off. Historically this was considered unlawful by the courts, but the law changed in <strong>January 2024</strong>.
            </p>
            <p>
              The Employment Rights (Amendment, Revocation and Transitional Provision) Regulations 2023 made rolled-up holiday pay <strong>expressly legal</strong> for two categories of worker:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Irregular hours workers</strong> — those whose paid hours vary wholly or mostly from pay period to pay period.</li>
              <li><strong>Part-year workers</strong> — those who work only part of the year and have periods of at least a week where they are not required to work and are not paid.</li>
            </ul>
            <p>
              When using rolled-up holiday pay, the employer must add a <strong>12.07% uplift</strong> to the worker&apos;s pay (representing 5.6 weeks divided by 46.4 working weeks). This must be shown as a <strong>separate, identifiable line item</strong> on the payslip. The worker then takes their holiday unpaid, having already received the holiday pay element in each pay period.
            </p>
            <p>
              Rolled-up holiday pay is <strong>not permitted</strong> for workers on regular, fixed hours. For those workers, the standard method of paying holiday when it is taken still applies.
            </p>

            <h2>Common mistakes to avoid</h2>
            <p>
              Holiday pay errors are widespread. Here are the mistakes we see most often:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Using basic pay only:</strong> failing to include regular overtime, commission, or bonuses in the calculation. This is the single biggest source of underpayment claims.</li>
              <li><strong>Using the old 12-week reference period:</strong> the reference period changed to 52 weeks in April 2020. Still using 12 weeks will produce inaccurate results.</li>
              <li><strong>Pro-rating part-year workers:</strong> following <em>Harpur Trust v Brazel</em>, you cannot pro-rate holiday entitlement or pay for part-year workers. Their 5.6 weeks is based on average earnings in weeks actually worked.</li>
              <li><strong>Paying only the minimum wage for holiday:</strong> holiday pay must reflect what the worker would normally earn, not just the national minimum wage.</li>
              <li><strong>Not showing rolled-up pay on payslips:</strong> if you use rolled-up holiday pay, it must be a visible, separate line item. Bundling it invisibly into the hourly rate is not compliant.</li>
              <li><strong>Applying rolled-up pay to regular-hours workers:</strong> rolled-up holiday pay is only legal for irregular hours and part-year workers.</li>
            </ul>

            <h2>Holiday pay for part-time workers</h2>
            <p>
              Part-time workers are entitled to the <strong>same pro-rata holiday entitlement</strong> as full-time workers. For statutory purposes, this means 5.6 weeks of paid holiday per year, regardless of how many days or hours they work per week.
            </p>
            <p>
              For example, a worker on 3 days per week gets 3 &times; 5.6 = 16.8 days of statutory holiday. Their holiday pay for each day is their normal day&apos;s pay. If they earn &pound;100 per day, each day of holiday is paid at &pound;100.
            </p>
            <p>
              The key principle is that part-time workers must not be treated less favourably than comparable full-time workers, in line with the Part-Time Workers (Prevention of Less Favourable Treatment) Regulations 2000.
            </p>

            <h2>How Leavely auto-calculates holiday pay</h2>
            <p>
              Manual holiday pay calculations are error-prone and time-consuming, especially for variable-hours workers. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> takes the guesswork out of it:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Automatic entitlement calculation</strong> — set each employee&apos;s working pattern and Leavely calculates their statutory and contractual holiday entitlement, including pro-rata for part-time and part-year workers.</li>
              <li><strong>Real-time balance tracking</strong> — employees and managers can see up-to-date holiday balances at any time, reducing queries and disputes.</li>
              <li><strong>Policy configuration</strong> — define your holiday pay rules (including whether you use rolled-up pay for eligible workers) and Leavely applies them consistently.</li>
              <li><strong>Carry-over rules</strong> — configure how much unused holiday can carry over, with automatic enforcement at year-end.</li>
              <li><strong>Reporting</strong> — generate holiday reports showing usage, balances, and accrual for audit and payroll purposes.</li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Stop guessing on holiday pay</h3>
            <p className="text-emerald-100 mb-6">Leavely calculates entitlements, tracks balances, and applies your policies automatically — so holiday pay is always right.</p>
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
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">
                Annual Leave Entitlement UK 2026: Complete Guide for Employers &rarr;
              </Link>
              <Link href="/blog/pro-rata-annual-leave-calculator" className="block text-emerald-600 hover:underline font-medium">
                Pro Rata Annual Leave Calculator UK: How to Work It Out &rarr;
              </Link>
              <Link href="/blog/carry-over-annual-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Carry Over Annual Leave UK: Rules Employers Must Follow &rarr;
              </Link>
              <Link href="/blog/part-time-workers-rights-uk" className="block text-emerald-600 hover:underline font-medium">
                Part-Time Workers&apos; Rights UK: Leave, Pay &amp; Employer Obligations &rarr;
              </Link>
              <Link href="/blog/accrual-based-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Accrual-Based Leave UK: Monthly vs Upfront Holiday Allowance &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
