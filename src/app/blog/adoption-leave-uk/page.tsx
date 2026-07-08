import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/adoption-leave-uk`

export const metadata: Metadata = {
  title: 'Adoption Leave UK: Entitlement, Pay & Employer Guide (2026)',
  description:
    'Everything UK employers need to know about adoption leave. Covers 52-week entitlement, SAP rates, eligibility, notification requirements, fostering to adopt, surrogacy, KIT days, and employee rights.',
  alternates: { canonical: articleUrl },
  keywords: [
    'adoption leave UK',
    'adoption pay UK',
    'statutory adoption pay',
    'adoption leave entitlement',
    'adoption leave rights UK',
    'surrogacy leave UK',
  ],
  openGraph: {
    title: 'Adoption Leave UK — Entitlement, Pay & Employer Guide (2026)',
    description:
      '52-week entitlement, SAP rates, eligibility, fostering to adopt, surrogacy, KIT days, and employer obligations for adoption leave in the UK.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Adoption Leave UK: Entitlement, Pay & Employer Guide (2026)',
  description:
    'A comprehensive guide to adoption leave in the UK, covering entitlement, statutory adoption pay, eligibility, notification requirements, fostering to adopt, surrogacy, and KIT days.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function AdoptionLeaveArticle() {
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
            Adoption Leave UK: Entitlement, Pay &amp; Employer Guide (2026)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600">

            <p className="text-lg">
              Adoption leave mirrors maternity leave in many respects, but it has its own rules, timelines, and eligibility criteria that employers must understand. Whether your employee is adopting through an agency, fostering to adopt, or becoming a parent through surrogacy, this guide covers the full picture for UK employers.
            </p>

            <h2>Who qualifies for adoption leave?</h2>
            <p>
              Statutory adoption leave is available to an employee who has been <strong>matched with a child</strong> for adoption through a UK adoption agency. The key eligibility rules are:
            </p>
            <ul className="list-disc pl-6">
              <li>The employee must be <strong>newly matched</strong> with a child through an approved UK or overseas adoption agency.</li>
              <li>Only <strong>one member of a couple</strong> can take adoption leave. If both partners are employed, they must choose who takes adoption leave — the other partner may be eligible for <Link href="/blog/paternity-leave-uk" className="text-emerald-600 hover:underline font-medium">paternity leave</Link> or <Link href="/blog/shared-parental-leave-uk" className="text-emerald-600 hover:underline font-medium">shared parental leave</Link> instead.</li>
              <li>Adoption leave is a <strong>day-one right</strong> — there is no minimum length of service required to take the leave itself (though there is a qualifying period for pay, covered below).</li>
              <li>The right does <strong>not</strong> apply to step-parent adoptions, where a person adopts their partner&apos;s child.</li>
            </ul>

            <h2>How long is adoption leave?</h2>
            <p>
              Eligible employees are entitled to up to <strong>52 weeks</strong> of adoption leave, structured identically to maternity leave:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Ordinary Adoption Leave (OAL)</strong> — the first 26 weeks.</li>
              <li><strong>Additional Adoption Leave (AAL)</strong> — the following 26 weeks, which begins immediately after OAL ends.</li>
            </ul>
            <p>
              Adoption leave can start on the <strong>date of placement</strong> (when the child begins living with the adopter) or up to <strong>14 days before</strong> the expected date of placement. The employee chooses the start date and must notify the employer in advance.
            </p>

            <h2>Statutory Adoption Pay (SAP)</h2>
            <p>
              Statutory Adoption Pay follows the same structure and rates as Statutory Maternity Pay:
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
                  <td>Weeks 1&ndash;6</td>
                  <td>90% of average weekly earnings (no cap)</td>
                </tr>
                <tr>
                  <td>Next 33 weeks</td>
                  <td>Weeks 7&ndash;39</td>
                  <td>&pound;184.03 per week or 90% of average weekly earnings &mdash; whichever is lower</td>
                </tr>
                <tr>
                  <td>Final 13 weeks</td>
                  <td>Weeks 40&ndash;52</td>
                  <td>Unpaid</td>
                </tr>
              </tbody>
            </table>
            <p>
              The &pound;184.03 rate is the 2025/26 figure. SAP is reviewed each April. As with SMP, most employers can reclaim 92% of SAP from HMRC (or 103% if eligible for Small Employers&apos; Relief).
            </p>

            <h3>SAP eligibility</h3>
            <p>
              To qualify for Statutory Adoption Pay, the employee must meet <strong>both</strong> conditions:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>26 weeks&apos; continuous service</strong> with the employer by the end of the week they are matched with the child (the &quot;matching week&quot;).</li>
              <li><strong>Average weekly earnings</strong> of at least &pound;123 (the Lower Earnings Limit) in the 8-week relevant period before the matching week.</li>
            </ul>
            <p>
              If the employee does not qualify for SAP, the employer must provide an <strong>SAP1 form</strong> explaining why, so the employee can explore alternative support.
            </p>

            <h2>Notification requirements</h2>
            <p>
              The employee must notify the employer of their intention to take adoption leave within <strong>7 days</strong> of being matched with a child (or as soon as reasonably practicable). The notification must include:
            </p>
            <ul className="list-disc pl-6">
              <li>The <strong>date the child is expected to be placed</strong> with them.</li>
              <li>The <strong>date they want adoption leave to start</strong>.</li>
            </ul>
            <p>
              The employer can request a <strong>matching certificate</strong> from the adoption agency as evidence. Within <strong>28 days</strong> of the employee&apos;s notification, the employer must respond in writing confirming the expected end date of the adoption leave.
            </p>
            <p>
              The employee can change their start date by giving <strong>28 days&apos; notice</strong> of the new date.
            </p>

            <h2>Time off for adoption appointments</h2>
            <p>
              Before the child is placed, employees have a statutory right to time off to attend adoption appointments:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Primary adopter:</strong> entitled to time off for up to <strong>5 adoption appointments</strong>. This time off is <strong>paid</strong>.</li>
              <li><strong>Secondary adopter (partner):</strong> entitled to time off for up to <strong>2 adoption appointments</strong>. This time off is <strong>unpaid</strong>.</li>
            </ul>
            <p>
              Each appointment can last up to 6.5 hours (including travel and waiting time). The employer can ask for evidence of the appointment, such as a letter from the adoption agency.
            </p>

            <h2>Fostering to adopt</h2>
            <p>
              In &quot;fostering to adopt&quot; arrangements (also called &quot;early permanence placements&quot;), a child is placed with approved foster carers who are also approved adopters. The child lives with the family as foster carers initially, and adoption follows later if appropriate.
            </p>
            <p>
              Employees in fostering-to-adopt arrangements are entitled to <strong>the same adoption leave and pay</strong> as those in standard adoptions. The leave can start from the date the child is placed with the employee as a foster carer, not from the later date when the adoption order is made.
            </p>
            <p>
              This is an important distinction — employers should not require employees to wait until the adoption is formally confirmed before allowing leave to begin.
            </p>

            <h2>Surrogacy and parental orders</h2>
            <p>
              Since 2015, intended parents in a surrogacy arrangement who meet the conditions for a <strong>parental order</strong> are eligible for adoption leave and pay. The intended parent who will take adoption leave must:
            </p>
            <ul className="list-disc pl-6">
              <li>Have applied or intend to apply for a parental order under the <strong>Human Fertilisation and Embryology Act 2008</strong>.</li>
              <li>Expect the parental order to be granted.</li>
            </ul>
            <p>
              The other intended parent may be eligible for paternity leave or shared parental leave. This is an evolving area of law, and employers should take care to treat surrogacy arrangements with the same respect and support as other routes to parenthood.
            </p>

            <h2>Keeping in Touch (KIT) days</h2>
            <p>
              During adoption leave, the employee can work up to <strong>10 Keeping in Touch (KIT) days</strong> without ending their adoption leave. As with maternity leave KIT days:
            </p>
            <ul className="list-disc pl-6">
              <li>They are entirely <strong>voluntary</strong> — neither side can insist.</li>
              <li>Any work on a day counts as one KIT day, even if it is only a few hours.</li>
              <li>Payment must be agreed between the employer and employee. At minimum, the employee is entitled to national minimum wage for hours worked.</li>
              <li>SAP is <strong>not affected</strong> — KIT day pay is additional to any SAP received for that week.</li>
            </ul>
            <p>
              KIT days are useful for training, team updates, handover planning, or easing back into work before the formal return date.
            </p>

            <h2>Employee rights during adoption leave</h2>
            <p>
              Employees on adoption leave have the same protections as those on maternity leave:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Annual leave continues to accrue</strong> throughout all 52 weeks of adoption leave, including bank holidays.</li>
              <li><strong>Pension contributions</strong> must continue during any paid period of adoption leave.</li>
              <li><strong>Right to return (first 26 weeks)</strong> — the employee has the right to return to the <strong>same job</strong> on the same terms.</li>
              <li><strong>Right to return (after 26 weeks)</strong> — the employee can return to the same job or, if not reasonably practicable, a <strong>suitable alternative</strong> on terms no less favourable.</li>
              <li><strong>Protection from detriment and dismissal</strong> — dismissing or subjecting an employee to detriment because they took adoption leave is automatically unfair.</li>
              <li><strong>Redundancy priority</strong> — if a genuine redundancy arises during adoption leave, the employee must be offered any suitable alternative vacancy ahead of other employees.</li>
            </ul>

            <h2>How Leavely tracks adoption leave</h2>
            <p>
              Adoption leave involves overlapping dates, pay periods, KIT days, and accruing annual leave — just like maternity leave. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> makes it straightforward to manage:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Adoption leave tracking</strong> — record the full adoption leave period with clear start and expected return dates visible on the team calendar.</li>
              <li><strong>KIT day logging</strong> — track each KIT day used out of the 10-day allowance, so nothing is missed or exceeded.</li>
              <li><strong>Automatic holiday accrual</strong> — Leavely continues to accrue annual leave during adoption leave, so the balance is accurate when the employee returns.</li>
              <li><strong>Return date visibility</strong> — managers can see upcoming return dates and plan cover or handover accordingly.</li>
              <li><strong>Policy configuration</strong> — set up your adoption leave policy (including any enhanced pay) once, and Leavely applies it consistently across all cases.</li>
              <li><strong>Shared parental leave integration</strong> — if the employee opts into shared parental leave, Leavely tracks the transition seamlessly.</li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Manage adoption leave with confidence</h3>
            <p className="text-emerald-100 mb-6">Leavely tracks adoption leave, KIT days, holiday accrual, and return dates automatically. Start your 14-day free trial.</p>
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
              <Link href="/blog/maternity-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Maternity Leave UK: Complete Employer Guide &rarr;
              </Link>
              <Link href="/blog/paternity-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Paternity Leave UK: Entitlement, Pay &amp; Employer Guide &rarr;
              </Link>
              <Link href="/blog/shared-parental-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Shared Parental Leave UK: How It Works for Employers &rarr;
              </Link>
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">
                How to Create a Leave Policy UK: Free Template &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
