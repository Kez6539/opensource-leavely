import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/shared-parental-leave-uk`

export const metadata: Metadata = {
  title: 'Shared Parental Leave UK: How It Works (2026 Guide)',
  description:
    'A complete guide to Shared Parental Leave (SPL) in the UK. Covers eligibility, how to opt in, ShPP rates, notice requirements, SPLIT days, booking leave in blocks, and employer rights.',
  alternates: { canonical: articleUrl },
  keywords: [
    'shared parental leave UK',
    'SPL UK',
    'shared parental pay',
    'ShPP',
    'shared parental leave eligibility',
    'how does shared parental leave work',
  ],
  openGraph: {
    title: 'Shared Parental Leave UK — How It Works (2026 Guide)',
    description:
      'Eligibility, ShPP rates, notice requirements, SPLIT days, and how to manage SPL as a UK employer.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Shared Parental Leave UK: How It Works',
  description: 'A complete guide to Shared Parental Leave in the UK covering eligibility, ShPP rates, notice periods, SPLIT days, and employer rights.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function SharedParentalLeaveArticle() {
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
            <span className="text-xs text-gray-400 ml-3">9 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Shared Parental Leave UK: How It Works
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Shared Parental Leave (SPL) gives eligible parents far more flexibility in how they share time off after a baby is born or a child is placed for adoption. Instead of one parent taking the full entitlement, SPL allows parents to split up to 50 weeks of leave and up to 37 weeks of pay between them. Despite being available since 2015, SPL remains one of the most misunderstood areas of UK employment law. This guide explains how it works in practice.
            </p>

            <h2>What is Shared Parental Leave?</h2>
            <p>
              Shared Parental Leave is a statutory right that allows eligible mothers (or adopters) to end their maternity (or adoption) leave early and share the remaining leave and pay with their partner. It was introduced in December 2014 for births and adoptions on or after 5 April 2015.
            </p>
            <p>
              The key principle is simple: the mother or primary adopter &quot;curtails&quot; their maternity or adoption leave, and the unused balance becomes available as Shared Parental Leave. Both parents can then take that leave in blocks, either at the same time or at different times.
            </p>
            <p>
              SPL is separate from the two-week paternity leave entitlement. The partner can take paternity leave <strong>and</strong> SPL, but paternity leave must be taken first.
            </p>

            <h2>Eligibility: who qualifies for SPL?</h2>
            <p>
              Both parents must meet certain criteria for SPL to be available. The requirements differ slightly depending on whether the person is taking the leave or is the &quot;other parent.&quot;
            </p>

            <h3>The mother or primary adopter must:</h3>
            <ul className="list-disc pl-6">
              <li>Be entitled to maternity or adoption leave, <strong>or</strong> statutory maternity/adoption pay or Maternity Allowance.</li>
              <li>Have given a binding curtailment notice to end their maternity or adoption leave (or pay period) early.</li>
              <li>Still have at least one week of unexpired maternity or adoption leave remaining.</li>
            </ul>

            <h3>The partner must:</h3>
            <ul className="list-disc pl-6">
              <li>Have at least <strong>26 weeks&apos; continuous employment</strong> with their employer by the end of the 15th week before the expected week of childbirth.</li>
              <li>Still be employed by that employer at the start of each block of SPL.</li>
              <li>The other parent must have worked for at least <strong>26 weeks in the 66 weeks</strong> before the due date and earned at least &pound;30 per week in at least 13 of those weeks.</li>
            </ul>
            <p>
              Both parents must give the correct notices and declarations to their respective employers. If one parent does not meet the eligibility criteria, neither parent can take SPL.
            </p>

            <h2>How to opt in: curtailing maternity leave</h2>
            <p>
              SPL does not happen automatically. The mother must take a deliberate step to curtail (end early) her maternity leave. She does this by submitting a <strong>curtailment notice</strong> to her employer, specifying the date her maternity leave will end.
            </p>
            <p>
              The curtailment notice is binding — once submitted, it generally cannot be withdrawn. The only exceptions are if the curtailment notice was given before the birth and the mother withdraws it within <strong>6 weeks of the birth</strong>, or if the partner dies.
            </p>
            <p>
              The mother must take at least <strong>2 weeks of compulsory maternity leave</strong> after the birth before SPL can begin. In practice, many mothers take the initial 6 weeks at the higher pay rate (90% of earnings) before switching to SPL.
            </p>

            <h2>Shared Parental Pay (ShPP)</h2>
            <p>
              Statutory Shared Parental Pay (ShPP) is the pay element that accompanies SPL. The total available is whatever remains of the 39 weeks of statutory maternity pay after the mother curtails her pay.
            </p>
            <p>
              For example, if the mother takes 10 weeks of SMP and then curtails, up to <strong>29 weeks of ShPP</strong> become available to share between both parents.
            </p>
            <p>
              The ShPP rate for 2025/26 is <strong>&pound;184.03 per week</strong> or 90% of average weekly earnings, whichever is lower. This is the same flat rate as SMP (weeks 7 to 39). ShPP is paid by each parent&apos;s own employer and processed through their normal payroll.
            </p>
            <p>
              To qualify for ShPP, the parent must meet the same 26-week continuous employment and Lower Earnings Limit (&pound;123 per week) requirements as for SMP.
            </p>

            <h2>Notice requirements</h2>
            <p>
              The notice process for SPL is more involved than for ordinary maternity or paternity leave. Both parents must give their employers:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Notice of entitlement and intention:</strong> submitted at least <strong>8 weeks</strong> before the first block of SPL is due to start. This notice sets out the expected due date, how much leave and pay each parent intends to take, and an indication (non-binding) of when they plan to take it.</li>
              <li><strong>Period of leave notice:</strong> a separate, binding notice requesting specific dates for each block of SPL. This must also be given at least <strong>8 weeks</strong> before the leave is due to start.</li>
              <li><strong>Declarations:</strong> each parent must sign a declaration confirming the other parent meets the eligibility criteria and consenting to the leave arrangement.</li>
            </ul>
            <p>
              Each parent can submit up to <strong>3 period of leave notices</strong>. Variations to existing bookings (changing dates or cancelling) each count as one of the three notices.
            </p>

            <h2>Booking leave: continuous vs discontinuous blocks</h2>
            <p>
              SPL can be taken in blocks rather than all at once, which is one of its biggest advantages over maternity leave. There are two types of booking:
            </p>

            <h3>Continuous leave</h3>
            <p>
              A single unbroken block of leave — for example, 8 weeks off in one go. The employer <strong>must</strong> agree to a continuous leave request. They cannot refuse it.
            </p>

            <h3>Discontinuous leave</h3>
            <p>
              Multiple blocks of leave with gaps of work in between — for example, 3 weeks off, 2 weeks at work, then 3 weeks off. The employer has the <strong>right to refuse</strong> a discontinuous leave request.
            </p>
            <p>
              If the employer refuses discontinuous leave, they have 14 days to discuss alternatives with the employee. If no agreement is reached, the employee can either take the total amount of leave requested as a single continuous block (starting on the date of the first period requested) or withdraw the notice entirely.
            </p>
            <p>
              Both parents can take SPL at the same time. For example, both could take 4 weeks off together after the birth — this uses 4 weeks from each parent&apos;s allocation.
            </p>

            <h2>SPLIT days (Shared Parental Leave In Touch days)</h2>
            <p>
              Similar to KIT days during maternity leave, each parent on SPL can work up to <strong>20 Shared Parental Leave In Touch (SPLIT) days</strong> without ending their leave. These are separate from and in addition to the 10 KIT days available during maternity leave.
            </p>
            <p>
              SPLIT days are entirely voluntary — neither the employer nor the employee can insist on them. They can be used for training, team days, handovers, or any work activity. Payment for SPLIT days should be agreed between the employer and employee.
            </p>
            <p>
              If the mother has already used some or all of her 10 KIT days during maternity leave, she still gets a fresh allocation of 20 SPLIT days when she moves onto SPL.
            </p>

            <h2>Employer&apos;s right to request evidence</h2>
            <p>
              Within 14 days of receiving the notice of entitlement, the employer can request:
            </p>
            <ul className="list-disc pl-6">
              <li>A copy of the child&apos;s birth certificate (or a declaration of the date and place of birth if the certificate is not yet available).</li>
              <li>The name and business address of the other parent&apos;s employer (or a declaration that they have no employer).</li>
            </ul>
            <p>
              The employee must provide this evidence within 14 days. Failure to do so means the employer does not have to grant the SPL request.
            </p>

            <h2>How Leavely tracks Shared Parental Leave</h2>
            <p>
              SPL involves multiple notices, overlapping entitlements between parents, and flexible booking patterns — making it one of the most complex leave types for HR teams to manage manually. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> simplifies the process:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>SPL leave type</strong> — configure Shared Parental Leave as a distinct leave type with its own allowance, so it&apos;s tracked separately from maternity and paternity leave.</li>
              <li><strong>Block booking</strong> — employees can request multiple blocks of SPL, and managers can approve or decline each block individually.</li>
              <li><strong>SPLIT day tracking</strong> — log each SPLIT day against the 20-day allowance so both the employee and manager know how many remain.</li>
              <li><strong>Calendar visibility</strong> — all SPL periods appear on the team calendar, making it easy to plan cover and avoid clashes.</li>
              <li><strong>Automatic holiday accrual</strong> — annual leave continues to accrue during SPL, and Leavely calculates the balance automatically.</li>
              <li><strong>Audit trail</strong> — every notice, approval, and change is recorded for compliance.</li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Take the complexity out of Shared Parental Leave</h3>
            <p className="text-emerald-100 mb-6">Leavely tracks SPL blocks, SPLIT days, and holiday accrual automatically — so you stay compliant without the spreadsheets.</p>
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
                Maternity Leave UK: Complete Employer Guide (2026) &rarr;
              </Link>
              <Link href="/blog/paternity-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Paternity Leave UK: What Employers Need to Know &rarr;
              </Link>
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">
                How to Create a Leave Policy UK: Free Template &amp; Guide &rarr;
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
