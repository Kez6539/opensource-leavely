import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/occupational-sick-pay-uk`

export const metadata: Metadata = {
  title: 'Company Sick Pay UK: Should You Offer More Than SSP?',
  description:
    'Should your business offer company sick pay above SSP? Explore the benefits, common schemes, cost considerations, and how to design an occupational sick pay policy for UK SMBs.',
  alternates: { canonical: articleUrl },
  keywords: [
    'company sick pay UK',
    'occupational sick pay',
    'enhanced sick pay',
    'sick pay above SSP',
    'contractual sick pay UK',
    'sick pay policy UK',
  ],
  openGraph: {
    title: 'Company Sick Pay UK: Should You Offer More Than SSP?',
    description: 'Why offering company sick pay above SSP can benefit your business, and how to design a scheme that works.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Company Sick Pay UK: Should You Offer More Than SSP?',
  description: 'A practical guide to offering occupational sick pay above SSP for UK employers.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function OccupationalSickPayArticle() {
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
            Company Sick Pay UK: Should You Offer More Than SSP?
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              <strong>Statutory Sick Pay (SSP)</strong> is the legal minimum employers must pay to eligible employees who are off sick. But at just <strong>&pound;116.75 per week</strong> (2025/26 rate), it&apos;s barely enough to cover basic expenses. Many employers choose to offer <strong>company sick pay</strong> (also called occupational or contractual sick pay) that goes above and beyond SSP. This guide explores whether it&apos;s worth it and how to design a scheme that works for your business.
            </p>

            <h2>SSP: a quick recap</h2>
            <p>
              Before considering enhanced sick pay, it&apos;s worth understanding the SSP baseline:
            </p>
            <ul className="list-disc pl-6">
              <li>Paid at <strong>&pound;116.75 per week</strong> (2025/26 tax year).</li>
              <li>Payable from the <strong>4th qualifying day</strong> of sickness (the first 3 days are &quot;waiting days&quot; with no pay).</li>
              <li>Lasts for a maximum of <strong>28 weeks</strong>.</li>
              <li>Employee must earn at least the Lower Earnings Limit (&pound;123/week) to qualify.</li>
              <li>Employer can require a fit note from day 8 of absence.</li>
            </ul>
            <p>
              For most employees, SSP alone represents a significant pay cut. A worker earning &pound;30,000 would see their weekly income drop from roughly &pound;577 to &pound;116.75 — an 80% reduction.
            </p>

            <h2>Why offer more than SSP?</h2>

            <h3>1. Recruitment and retention</h3>
            <p>
              Enhanced sick pay is one of the most valued employee benefits, particularly among experienced candidates. In a competitive job market, offering company sick pay can be a deciding factor. Candidates increasingly check benefit packages before accepting offers, and a strong sick pay policy signals that the employer cares about employee wellbeing.
            </p>

            <h3>2. Reduced presenteeism</h3>
            <p>
              When employees can&apos;t afford to be off sick, they come to work ill. Presenteeism costs UK businesses an estimated <strong>&pound;29 billion per year</strong> (CIPD). Sick employees are less productive, make more mistakes, and risk spreading illness to colleagues. A company sick pay scheme gives employees the financial security to recover properly at home.
            </p>

            <h3>3. Employee wellbeing and morale</h3>
            <p>
              Employees who know they won&apos;t face financial hardship if they fall ill report higher job satisfaction and loyalty. Company sick pay is a tangible demonstration that the business values its people.
            </p>

            <h3>4. Faster return to work</h3>
            <p>
              Employees who can afford to rest and recover properly tend to return to work sooner and in better health than those who either struggle through or delay returning due to anxiety about their finances.
            </p>

            <h2>Common company sick pay schemes</h2>
            <p>
              There is no single standard for company sick pay. Schemes vary widely, but the most common structures are:
            </p>

            <h3>Tiered by duration</h3>
            <p>
              The most popular approach is to offer full pay for an initial period, then reduce to half pay, and finally revert to SSP:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Full pay</strong> for the first 4-8 weeks of sickness.</li>
              <li><strong>Half pay</strong> for the next 4-8 weeks.</li>
              <li><strong>SSP only</strong> after the enhanced pay period ends.</li>
            </ul>

            <h3>Tiered by length of service</h3>
            <p>
              Many employers increase sick pay entitlement as employees gain service. For example:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600">
                <thead>
                  <tr>
                    <th>Length of service</th>
                    <th>Full pay</th>
                    <th>Half pay</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Under 1 year</td>
                    <td>SSP only</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>1-3 years</td>
                    <td>4 weeks</td>
                    <td>4 weeks</td>
                  </tr>
                  <tr>
                    <td>3-5 years</td>
                    <td>8 weeks</td>
                    <td>8 weeks</td>
                  </tr>
                  <tr>
                    <td>5+ years</td>
                    <td>12 weeks</td>
                    <td>12 weeks</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Designing your scheme</h2>

            <h3>Waiting days</h3>
            <p>
              SSP has 3 waiting days. You can choose to pay company sick pay from day 1 (removing the waiting days), or apply the same 3-day waiting period. Paying from day 1 is more generous but removes a natural deterrent against short absences.
            </p>

            <h3>Qualifying service</h3>
            <p>
              Many employers require employees to complete a probationary period (typically 3-6 months) before they qualify for company sick pay. During probation, the employee receives SSP only.
            </p>

            <h3>Evidence requirements</h3>
            <p>
              Define when you need medical evidence. Common approaches include self-certification for the first 7 days and a fit note (from a GP or other qualified professional) from day 8 onwards. Some employers require evidence earlier for company sick pay than for SSP.
            </p>

            <h3>Conditions covered</h3>
            <p>
              Consider whether your scheme covers all conditions equally. Some employers exclude cosmetic surgery or injuries sustained through dangerous hobbies. Be cautious — excluding mental health conditions could be discriminatory.
            </p>

            <h2>Cost considerations for SMBs</h2>
            <p>
              Company sick pay is a genuine cost that small businesses need to budget for. The CIPD reports average absence rates of <strong>7.8 days per employee per year</strong>. For a team of 20, offering full pay for sickness could cost significantly more than SSP alone.
            </p>
            <p>
              Practical tips to manage costs:
            </p>
            <ul className="list-disc pl-6">
              <li>Start with a modest scheme and increase entitlements over time as the business grows.</li>
              <li>Use waiting days to reduce the cost of short-term absences.</li>
              <li>Invest in occupational health and early intervention to reduce long-term absence.</li>
              <li>Track absence patterns to identify and address underlying issues.</li>
            </ul>

            <h2>Interaction with SSP</h2>
            <p>
              Company sick pay can <strong>offset</strong> SSP — meaning you pay company sick pay instead of (not on top of) SSP. So if you pay full salary during sickness, that amount includes SSP. You don&apos;t pay full salary plus &pound;116.75 on top. Your policy should state clearly that company sick pay is &quot;inclusive of SSP.&quot;
            </p>

            <h2>Tax implications</h2>
            <p>
              Company sick pay is treated as normal earnings. It is subject to <strong>income tax and National Insurance</strong> through PAYE, just like regular salary. This applies to both the employer and employee. There is no special tax relief for offering enhanced sick pay.
            </p>

            <h2>Long-term sickness and capability</h2>
            <p>
              When an employee exhausts their company sick pay entitlement and remains unable to work, employers need to consider the next steps carefully. This may involve an occupational health referral, reasonable adjustments, a phased return to work, or ultimately a capability process. Always take legal advice before dismissing a long-term sick employee — disability discrimination claims are a significant risk.
            </p>

            <h2>How Leavely tracks different sick pay tiers</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> makes managing company sick pay straightforward, even with tiered entitlements:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Custom leave policies</strong> — set up separate sick pay tiers (full pay, half pay, SSP) and define entitlements by service length.</li>
              <li><strong>Automatic tracking</strong> — Leavely tracks how many sick days each employee has used and which tier they are in.</li>
              <li><strong>Manager visibility</strong> — managers see real-time absence data and receive alerts when employees approach policy thresholds.</li>
              <li><strong>Absence patterns</strong> — spot trends with the team absence calendar and dashboard analytics.</li>
              <li><strong>Audit trail</strong> — every sick leave request, approval, and note is logged for compliance.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Manage sick pay tiers without the spreadsheets</h3>
            <p className="text-emerald-100 mb-6">Leavely tracks company sick pay entitlements, usage, and balances automatically — so you always know where employees stand.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/sick-leave-policy-uk" className="block text-emerald-600 hover:underline font-medium">Sick Leave Policy UK: What Employers Need to Know &rarr;</Link>
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">Bradford Factor Explained: How to Use It Fairly &rarr;</Link>
              <Link href="/blog/absence-management-policy-uk" className="block text-emerald-600 hover:underline font-medium">Absence Management Policy UK: A Practical Guide &rarr;</Link>
              <Link href="/blog/phased-return-to-work-uk" className="block text-emerald-600 hover:underline font-medium">Phased Return to Work UK: How to Get It Right &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
