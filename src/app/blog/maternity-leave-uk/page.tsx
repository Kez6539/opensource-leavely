import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/maternity-leave-uk`

export const metadata: Metadata = {
  title: 'Maternity Leave UK: Complete Employer Guide (2026)',
  description:
    'Everything UK employers need to know about maternity leave. Covers 52-week entitlement, SMP rates, eligibility, Maternity Allowance, KIT days, employee rights, and enhanced maternity pay.',
  alternates: { canonical: articleUrl },
  keywords: [
    'maternity leave UK',
    'maternity pay UK',
    'statutory maternity pay',
    'SMP 2026',
    'maternity leave entitlement UK',
    'maternity leave policy',
    'how long is maternity leave UK',
    'maternity leave rights UK',
  ],
  openGraph: {
    title: 'Maternity Leave UK — Complete Employer Guide 2026',
    description:
      '52-week entitlement, SMP rates, KIT days, employee rights, and how to manage maternity leave as a UK employer.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Maternity Leave UK: Complete Employer Guide',
  description: 'Everything UK employers need to know about maternity leave entitlement, statutory maternity pay, KIT days, and employee rights.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function MaternityLeaveArticle() {
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
            <span className="text-xs text-gray-400 ml-3">10 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Maternity Leave UK: Complete Employer Guide
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Maternity leave is one of the most significant periods of absence an employer will manage. Getting it right matters — not just legally, but for employee retention and trust. This guide covers everything UK employers need to know about maternity leave entitlement, statutory maternity pay, key dates, and the rights employees are protected by.
            </p>

            <h2>How long is maternity leave in the UK?</h2>
            <p>
              All pregnant employees in the UK are entitled to up to <strong>52 weeks</strong> of maternity leave, regardless of how long they&apos;ve worked for the employer or how many hours they work. This is split into two halves:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Ordinary Maternity Leave (OML)</strong> — the first 26 weeks.</li>
              <li><strong>Additional Maternity Leave (AML)</strong> — the next 26 weeks, which follows on immediately from OML.</li>
            </ul>
            <p>
              There is no qualifying period for maternity leave itself — it is a day-one right. However, there <em>is</em> a qualifying period for Statutory Maternity Pay (covered below).
            </p>
            <p>
              <strong>Compulsory maternity leave:</strong> employees must take a minimum of <strong>2 weeks</strong> off after the birth (or <strong>4 weeks</strong> for factory workers). This is a legal requirement and cannot be waived.
            </p>

            <h2>Statutory Maternity Pay (SMP)</h2>
            <p>
              Statutory Maternity Pay is the legal minimum pay an employer must provide during maternity leave. SMP is paid for up to <strong>39 weeks</strong> and is structured in two stages:
            </p>

            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Duration</th>
                  <th>Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>First 6 weeks</td>
                  <td>Weeks 1–6</td>
                  <td>90% of average weekly earnings (no cap)</td>
                </tr>
                <tr>
                  <td>Next 33 weeks</td>
                  <td>Weeks 7–39</td>
                  <td>&pound;184.03 per week or 90% of average weekly earnings — whichever is lower</td>
                </tr>
                <tr>
                  <td>Final 13 weeks</td>
                  <td>Weeks 40–52</td>
                  <td>Unpaid</td>
                </tr>
              </tbody>
            </table>
            <p>
              The &pound;184.03 rate is the 2025/26 figure. Check <strong>HMRC</strong> for the current year&apos;s rate, as it is reviewed annually each April.
            </p>
            <p>
              SMP is paid by the employer through normal payroll and is subject to tax and National Insurance in the usual way. Most employers can reclaim 92% of SMP from HMRC (or 103% if you qualify for Small Employers&apos; Relief).
            </p>

            <h2>SMP eligibility — who qualifies?</h2>
            <p>
              Not every employee automatically qualifies for SMP. To be eligible, the employee must meet <strong>both</strong> of the following conditions:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Continuous employment:</strong> at least <strong>26 weeks</strong> of continuous service with the same employer by the end of the <strong>15th week before the expected week of childbirth</strong> (known as the &quot;qualifying week&quot;).</li>
              <li><strong>Earnings threshold:</strong> average weekly earnings of at least <strong>&pound;123</strong> per week (the Lower Earnings Limit for National Insurance) in the 8-week &quot;relevant period&quot; before the qualifying week.</li>
            </ul>
            <p>
              If an employee does not qualify for SMP, you must issue an <strong>SMP1 form</strong> explaining why. The employee may then be able to claim Maternity Allowance instead.
            </p>

            <h2>Maternity Allowance</h2>
            <p>
              Maternity Allowance is a government benefit for women who do not qualify for SMP — typically because they haven&apos;t been with their employer long enough, are self-employed, or have recently changed jobs.
            </p>
            <p>
              To qualify, the individual must have been employed or self-employed for at least <strong>26 weeks in the 66 weeks before the due date</strong> and earned at least &pound;30 per week in at least 13 of those weeks.
            </p>
            <p>
              Maternity Allowance is paid at &pound;184.03 per week or 90% of average weekly earnings (whichever is lower) for up to 39 weeks. It is claimed directly from Jobcentre Plus, not through the employer.
            </p>

            <h2>Key dates and timelines</h2>
            <p>
              There are several critical dates both employers and employees need to be aware of:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Notification deadline:</strong> the employee must notify the employer of their pregnancy by the <strong>15th week before the expected week of childbirth</strong> (roughly the 25th week of pregnancy). They must confirm the due date and when they want maternity leave to start.</li>
              <li><strong>MATB1 certificate:</strong> a medical certificate issued by a doctor or midwife, usually available from <strong>20 weeks of pregnancy</strong>. The employer needs this to process SMP.</li>
              <li><strong>Earliest start date:</strong> maternity leave can start no earlier than <strong>11 weeks before the expected week of childbirth</strong>.</li>
              <li><strong>Automatic trigger:</strong> if the employee is off work for a pregnancy-related illness in the 4 weeks before the due date, maternity leave starts automatically.</li>
              <li><strong>Employer response:</strong> within 28 days of receiving the employee&apos;s notification, the employer must write back confirming the expected return date.</li>
            </ul>

            <h2>Keeping in touch (KIT) days</h2>
            <p>
              During maternity leave, an employee can work up to <strong>10 Keeping in Touch (KIT) days</strong> without bringing their maternity leave to an end. These are entirely voluntary — neither the employer nor the employee can insist on them.
            </p>
            <p>
              KIT days can be used for training, team meetings, planning for the return, or any other work activity. Any work done on a single day counts as one KIT day, even if it&apos;s only a few hours.
            </p>
            <p>
              Payment for KIT days should be agreed between the employer and employee. If no agreement is in place, the employee is entitled to at least the national minimum wage for hours worked. SMP is not affected by KIT days — the employee receives their KIT day pay <em>on top of</em> SMP for that week.
            </p>

            <h2>Employee rights during maternity leave</h2>
            <p>
              Employees on maternity leave are protected by a range of rights that employers must respect:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Holiday continues to accrue:</strong> annual leave entitlement builds up throughout the entire 52 weeks of maternity leave, including any bank holidays. This is a common source of additional leave to manage on return.</li>
              <li><strong>Pension contributions continue:</strong> employer pension contributions must continue during any period where SMP or contractual maternity pay is being paid.</li>
              <li><strong>Right to return — first 26 weeks:</strong> if the employee returns during or at the end of Ordinary Maternity Leave, they have the right to return to <strong>the same job</strong> on the same terms and conditions.</li>
              <li><strong>Right to return — after 26 weeks:</strong> if they return during or at the end of Additional Maternity Leave, they are entitled to return to the same job or, if that is not reasonably practicable, a <strong>suitable alternative role</strong> on terms no less favourable.</li>
              <li><strong>Protection from dismissal:</strong> dismissing or selecting an employee for redundancy because of pregnancy or maternity leave is automatically unfair and discriminatory.</li>
              <li><strong>Redundancy priority:</strong> if a genuine redundancy situation arises during maternity leave, the employee must be offered any suitable alternative vacancy in preference to other employees.</li>
            </ul>

            <h2>Enhanced maternity pay</h2>
            <p>
              Many employers choose to offer maternity pay above the statutory minimum — known as <strong>enhanced</strong> or <strong>contractual</strong> maternity pay. Common examples include:
            </p>
            <ul className="list-disc pl-6">
              <li>Full pay for the first 12 or 16 weeks, then SMP for the remaining weeks.</li>
              <li>Full pay for 6 weeks followed by half pay plus SMP for 12 weeks.</li>
              <li>Matching the first 6 weeks at 90% and then paying a flat amount above the SMP rate for a set number of weeks.</li>
            </ul>
            <p>
              Enhanced maternity pay is a powerful retention tool and demonstrates a genuine commitment to supporting working parents. Whatever your policy, make sure it is clearly documented and consistently applied.
            </p>
            <p>
              Some employers include a &quot;clawback&quot; clause, requiring employees to repay some or all of the enhanced pay if they do not return to work for a minimum period after maternity leave. This must be clearly set out in the policy or contract.
            </p>

            <h2>How Leavely helps manage maternity leave</h2>
            <p>
              Managing maternity leave involves tracking overlapping dates, pay periods, KIT days, and accruing holiday — a lot of moving parts. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> makes it straightforward:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Maternity leave tracking</strong> — record the full maternity leave period with clear start and expected return dates visible on the team calendar.</li>
              <li><strong>KIT day logging</strong> — track each KIT day used out of the 10-day allowance, so nothing slips through the cracks.</li>
              <li><strong>Automatic holiday accrual</strong> — Leavely continues to accrue annual leave during maternity leave, so the balance is accurate when the employee returns.</li>
              <li><strong>Return date visibility</strong> — managers and HR can see upcoming return dates at a glance and plan cover accordingly.</li>
              <li><strong>Policy configuration</strong> — set up your maternity leave policy (including any enhanced pay) once, and Leavely applies it consistently to every case.</li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Manage maternity leave with confidence</h3>
            <p className="text-emerald-100 mb-6">Leavely tracks maternity leave, KIT days, holiday accrual, and return dates — so nothing falls through the gaps.</p>
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
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">
                How to Create a Leave Policy UK: Free Template &amp; Guide &rarr;
              </Link>
              <Link href="/blog/shared-parental-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Shared Parental Leave UK: How It Works for Employers &rarr;
              </Link>
              <Link href="/blog/adoption-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Adoption Leave UK: Employer&apos;s Complete Guide &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
