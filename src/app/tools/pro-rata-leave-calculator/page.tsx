import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { ProRataCalculator } from './calculator'

const pageUrl = `${SITE_URL}/tools/pro-rata-leave-calculator`

export const metadata: Metadata = {
  title: 'Free Pro Rata Annual Leave Calculator UK (2026)',
  description:
    'Calculate pro rata annual leave entitlement for part-time employees and mid-year starters in the UK. Free interactive calculator with statutory minimum checks, reference tables, and UK employment law guidance.',
  alternates: { canonical: pageUrl },
  keywords: [
    'pro rata annual leave calculator',
    'pro rata annual leave calculator UK',
    'pro rata holiday entitlement calculator',
    'part time annual leave calculator',
    'pro rata leave calculator',
    'annual leave calculator part time',
    'holiday entitlement calculator UK',
    'pro rata holiday calculator',
    'mid year starter leave calculator',
    'part time holiday entitlement UK',
    'statutory annual leave calculator',
    'pro rata entitlement calculator',
  ],
  openGraph: {
    title: 'Free Pro Rata Annual Leave Calculator UK | Leavely',
    description:
      'Instantly calculate pro rata leave for part-time staff and mid-year starters. Checks statutory minimums automatically.',
    url: pageUrl,
    type: 'website',
    siteName: 'Leavely',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Pro Rata Annual Leave Calculator',
  description:
    'Free interactive calculator for pro rata annual leave entitlement in the UK. Supports part-time workers and mid-year starters with statutory minimum checks.',
  url: pageUrl,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
  },
  author: {
    '@type': 'Organization',
    name: 'Leavely',
    url: SITE_URL,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Leavely',
    url: SITE_URL,
  },
}

export default function ProRataLeaveCalculatorPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MarketingNav />

      <main>
        {/* Hero section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 py-16 sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <span className="inline-block text-xs font-semibold text-emerald-200 bg-white/10 px-3 py-1 rounded-full mb-4">
              Free HR Tool
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Pro Rata Annual Leave Calculator
            </h1>
            <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
              Instantly calculate annual leave entitlement for part-time employees and mid-year starters.
              Checks against UK statutory minimums automatically.
            </p>
          </div>
        </section>

        {/* Calculator section */}
        <section className="max-w-3xl mx-auto px-6 py-12 -mt-8 relative z-10">
          <ProRataCalculator />
        </section>

        {/* Educational content */}
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <h2>How pro rata annual leave works in the UK</h2>
            <p>
              In the UK, all workers are legally entitled to <strong>5.6 weeks of paid annual leave</strong> per year under the Working Time Regulations 1998. For a full-time employee working 5 days a week, that equates to <strong>28 days</strong> (including bank holidays).
            </p>
            <p>
              When an employee works fewer than 5 days a week, or joins part-way through a leave year, their entitlement must be calculated <strong>pro rata</strong> &mdash; meaning in proportion to the amount they work compared to a full-time equivalent.
            </p>

            <h2>The pro rata formula</h2>
            <p>For employees with a fixed weekly work pattern, the calculation is straightforward:</p>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6 not-prose">
              <p className="text-emerald-800 font-mono text-center text-lg font-semibold">
                Pro rata entitlement = (days per week &divide; 5) &times; full-time allowance
              </p>
            </div>
            <p>
              For example, an employee working 3 days a week with a full-time allowance of 28 days would receive: (3 &divide; 5) &times; 28 = <strong>16.8 days</strong>.
            </p>

            <h3>Mid-year starters</h3>
            <p>
              When an employee starts part-way through the leave year, you need to further pro-rate their entitlement based on the portion of the year remaining:
            </p>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6 not-prose">
              <p className="text-emerald-800 font-mono text-center text-lg font-semibold">
                Remaining entitlement = pro rata entitlement &times; (remaining days &divide; total days in leave year)
              </p>
            </div>
            <p>
              For example, a part-time employee (3 days/week) who starts on 1 July with a Jan&ndash;Dec leave year would receive: 16.8 &times; (184 &divide; 365) = <strong>approximately 8.5 days</strong>.
            </p>

            <h2>Statutory minimum entitlement</h2>
            <p>
              The UK statutory minimum is <strong>5.6 weeks</strong> of paid leave per year, capped at a maximum of <strong>28 days</strong>. For part-time workers, the statutory minimum is:
            </p>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6 not-prose">
              <p className="text-emerald-800 font-mono text-center text-lg font-semibold">
                Statutory minimum = days per week &times; 5.6 (capped at 28)
              </p>
            </div>
            <p>
              The cap at 28 days means that employees working 6 or 7 days a week still receive a maximum of 28 days&apos; statutory leave, even though 6 &times; 5.6 = 33.6.
            </p>
            <p>
              Our calculator checks whether your company&apos;s allowance meets the statutory minimum. If you offer more than the statutory entitlement (which many employers do), the higher amount applies.
            </p>

            <h2>Bank holidays and pro rata leave</h2>
            <p>
              A common misconception is that bank holidays are separate from annual leave. In UK law, the 28-day statutory minimum <strong>includes</strong> bank holidays. Employers can choose to:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Include bank holidays</strong> in the 28-day entitlement &mdash; meaning employees get 20 days to choose + 8 fixed bank holidays.</li>
              <li><strong>Offer bank holidays on top</strong> of a base allowance &mdash; e.g. 25 days + 8 bank holidays = 33 days total. This is above the statutory minimum.</li>
            </ul>
            <p>
              Part-time workers are entitled to bank holidays <strong>pro rata</strong>, even if the bank holiday doesn&apos;t fall on one of their normal working days. They can take the time off on an alternative day or have it added to their leave balance.
            </p>

            <h2>Irregular hours and zero-hours contracts</h2>
            <p>
              For workers without a fixed weekly pattern (such as zero-hours contracts or casual workers), calculating pro rata leave in &ldquo;days&rdquo; isn&apos;t practical. Instead, use the <strong>12.07% accrual method</strong>:
            </p>
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-5 my-6 not-prose">
              <p className="text-gray-800 font-mono text-center text-base font-semibold">
                Holiday hours = total hours worked &times; 12.07%
              </p>
              <p className="text-center text-xs text-gray-500 mt-2">
                12.07% comes from 5.6 weeks &divide; 46.4 working weeks (52 &minus; 5.6)
              </p>
            </div>
            <p>
              From 1 January 2024, the Employment Rights (Amendment, Revocation and Transitional Provision) Regulations 2023 introduced a new accrual method for irregular hours and part-year workers, formalising the 12.07% approach.
            </p>

            <h2>Rounding pro rata leave</h2>
            <p>
              There is no legal requirement to round leave entitlement up or down. However, employers should be aware that:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Rounding down risks non-compliance</strong> &mdash; if rounding down takes the entitlement below the statutory minimum, this is unlawful.</li>
              <li><strong>Rounding up is safest</strong> &mdash; many employers round up to the nearest half or whole day to keep things simple and stay clearly above the minimum.</li>
              <li><strong>Use exact figures where possible</strong> &mdash; leave management software can track fractional days, removing the need to round at all.</li>
            </ul>

            <h2>Common mistakes employers make</h2>
            <ol className="list-decimal pl-6">
              <li><strong>Using the wrong base figure</strong> &mdash; if your company offers 33 days (25 + 8 bank holidays) for full-time staff, you must pro-rate from 33, not 28.</li>
              <li><strong>Forgetting mid-year starters</strong> &mdash; new joiners part-way through the leave year need their entitlement adjusted for the remaining period.</li>
              <li><strong>Treating bank holidays separately for part-timers</strong> &mdash; part-time staff must receive bank holidays pro rata, even if their working days don&apos;t fall on bank holidays.</li>
              <li><strong>Using days when hours vary</strong> &mdash; if an employee works different hours on different days, calculating in hours is more accurate and fairer.</li>
              <li><strong>Not recalculating when patterns change</strong> &mdash; if an employee moves from 3 to 4 days per week mid-year, their leave balance needs adjusting.</li>
            </ol>

            <h2>Part-Time Workers (Prevention of Less Favourable Treatment) Regulations 2000</h2>
            <p>
              Under these regulations, part-time workers have the right not to be treated less favourably than comparable full-time workers. This extends to annual leave: a part-time worker must receive the same <em>proportion</em> of leave as a full-time colleague. If full-time staff receive more than the statutory minimum, part-time staff must receive the same rate pro rata.
            </p>

            <h2>Let Leavely handle pro rata calculations</h2>
            <p>
              Manually calculating pro rata leave is error-prone, especially when you have employees with different work patterns, mid-year starters, and varying allowances. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> automates the entire process:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Automatic pro rata entitlement</strong> based on each employee&apos;s work pattern</li>
              <li><strong>Mid-year starter adjustments</strong> calculated from the actual start date</li>
              <li><strong>Bank holiday pro-rating</strong> handled correctly for all work patterns</li>
              <li><strong>Real-time balance tracking</strong> that updates as leave is booked, approved, or cancelled</li>
              <li><strong>Statutory compliance checks</strong> to ensure every employee meets the legal minimum</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Stop calculating leave manually</h3>
            <p className="text-emerald-100 mb-6">
              Leavely handles pro rata calculations, part-time entitlements, and mid-year starters automatically. Try it free for 14 days.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Related links */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related resources</h3>
            <div className="space-y-3">
              <Link href="/blog/pro-rata-annual-leave-calculator" className="block text-emerald-600 hover:underline font-medium">
                How to Calculate Pro Rata Annual Leave UK: Formulas &amp; Examples &rarr;
              </Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">
                Annual Leave Entitlement UK 2026: The Complete Guide &rarr;
              </Link>
              <Link href="/blog/part-time-workers-rights-uk" className="block text-emerald-600 hover:underline font-medium">
                Part-Time Workers&apos; Rights UK: Leave, Pay &amp; Employer Obligations &rarr;
              </Link>
              <Link href="/blog/holiday-pay-calculation-uk" className="block text-emerald-600 hover:underline font-medium">
                Holiday Pay Calculation UK: Complete Employer Guide &rarr;
              </Link>
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">
                Bradford Factor Explained: How to Calculate &amp; Use It &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
