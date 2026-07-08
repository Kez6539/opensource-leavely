import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/working-time-regulations-uk`

export const metadata: Metadata = {
  title: 'Working Time Regulations UK: Employer Guide (2026)',
  description:
    'Complete employer guide to UK Working Time Regulations 1998. 48-hour weekly limit, rest breaks, opt-out agreements, night work, record keeping, and annual leave entitlement.',
  alternates: { canonical: articleUrl },
  keywords: [
    'working time regulations UK',
    'working time directive',
    '48 hour week UK',
    'rest breaks employment law',
    'working hours UK law',
    'opt out working time regulations',
  ],
  openGraph: {
    title: 'Working Time Regulations UK: Employer Guide (2026)',
    description: 'Everything UK employers need to know about the Working Time Regulations 1998 — hours limits, rest breaks, opt-outs, and compliance.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Working Time Regulations UK: Employer Guide (2026)',
  description: 'Complete employer guide to UK Working Time Regulations 1998.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function WorkingTimeRegulationsArticle() {
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
            Working Time Regulations UK: Employer Guide (2026)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              The <strong>Working Time Regulations 1998</strong> (WTR) implement the EU Working Time Directive into UK law. They set limits on weekly working hours, guarantee rest breaks, and establish minimum annual leave entitlements. Even after Brexit, these regulations remain fully in force. Every UK employer needs to understand them — breaching WTR can lead to enforcement action from the HSE and claims at employment tribunal.
            </p>

            <h2>The 48-hour weekly limit</h2>
            <p>
              Under the WTR, workers must not work more than an average of <strong>48 hours per week</strong>. This is calculated over a <strong>17-week reference period</strong> by default. Some sectors (such as healthcare or security) may use a 26-week reference period where agreed through a collective or workforce agreement.
            </p>
            <p>
              The 48-hour limit includes overtime but does not include time spent travelling to and from work (unless travelling is part of the job, such as a delivery driver). Paid and unpaid overtime both count towards the limit.
            </p>

            <h2>Opt-out agreements</h2>
            <p>
              Workers in the UK can voluntarily agree to work more than 48 hours per week by signing an <strong>opt-out agreement</strong>. Key rules around opt-outs:
            </p>
            <ul className="list-disc pl-6">
              <li>The opt-out must be <strong>voluntary</strong> — employers cannot require it as a condition of employment or subject workers to detriment for refusing.</li>
              <li>It must be in <strong>writing</strong> and signed by the worker.</li>
              <li>The worker can <strong>withdraw the opt-out</strong> at any time by giving notice (the agreement can specify a notice period of up to 3 months, or 7 days if no period is stated).</li>
              <li>Employers should keep records of who has opted out.</li>
              <li>Even with an opt-out, employers still have a <strong>duty of care</strong> — allowing excessive hours that harm health could be negligent.</li>
            </ul>

            <h2>Rest breaks during the working day</h2>
            <p>
              Adult workers (aged 18+) are entitled to an uninterrupted rest break of at least <strong>20 minutes</strong> if their daily working time exceeds <strong>6 hours</strong>. The break should be taken during the shift, not at the beginning or end. Workers are entitled to spend the break away from their workstation.
            </p>
            <p>
              There is no legal requirement to pay for rest breaks unless the employment contract says otherwise. Many employers do pay for breaks as a matter of custom or contract.
            </p>

            <h2>Daily rest</h2>
            <p>
              Workers are entitled to a minimum of <strong>11 consecutive hours</strong> of rest in each 24-hour period. For example, if a worker finishes at 10pm, they should not start again until 9am the next day.
            </p>

            <h2>Weekly rest</h2>
            <p>
              Workers are entitled to either:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>24 hours</strong> of uninterrupted rest in each 7-day period, or</li>
              <li><strong>48 hours</strong> of uninterrupted rest in each 14-day period.</li>
            </ul>
            <p>
              Employers can choose which pattern to apply. In practice, most workers get at least one full day off per week.
            </p>

            <h2>Night work limits</h2>
            <p>
              Night workers (those who regularly work at least 3 hours during the night period, typically 11pm to 6am) must not work more than an average of <strong>8 hours in each 24-hour period</strong>, calculated over a 17-week reference period.
            </p>
            <p>
              If the night work involves special hazards or heavy physical or mental strain, the 8-hour limit is <strong>absolute</strong> — not an average. Employers must also offer night workers a free health assessment before they start and at regular intervals afterwards.
            </p>

            <h2>Record keeping obligations</h2>
            <p>
              Employers must keep <strong>adequate records</strong> to demonstrate compliance with the WTR. This includes:
            </p>
            <ul className="list-disc pl-6">
              <li>Records showing that workers are not exceeding the 48-hour weekly limit (or have signed opt-outs).</li>
              <li>Records of night workers&apos; hours.</li>
              <li>Evidence that health assessments have been offered to night workers.</li>
              <li>Records must be kept for <strong>2 years</strong>.</li>
            </ul>
            <p>
              The regulations do not specify the format of records, but they must be sufficient for the HSE or a tribunal to verify compliance if challenged.
            </p>

            <h2>Annual leave under the WTR</h2>
            <p>
              The Working Time Regulations also establish the statutory minimum for <strong>annual leave</strong>. All workers are entitled to <strong>5.6 weeks</strong> of paid annual leave per year (28 days for a full-time worker on a 5-day week). This can include public bank holidays.
            </p>
            <p>
              Leave begins accruing from day one of employment. Part-time workers receive the same 5.6 weeks but pro-rated to their working pattern. For detailed guidance on calculating entitlements, see our <Link href="/blog/annual-leave-entitlement-uk" className="text-emerald-600 hover:underline font-medium">annual leave entitlement guide</Link>.
            </p>

            <h2>Young workers (16-17 year olds)</h2>
            <p>
              Young workers have <strong>enhanced protections</strong> under the WTR:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Maximum 8 hours per day</strong> and <strong>40 hours per week</strong> — with no opt-out available.</li>
              <li><strong>30-minute rest break</strong> if working more than 4.5 hours (compared to 20 minutes after 6 hours for adults).</li>
              <li><strong>12 hours daily rest</strong> (compared to 11 for adults).</li>
              <li><strong>48 hours weekly rest</strong> — they must have 2 consecutive days off per week.</li>
              <li>Young workers should generally not work between <strong>10pm and 6am</strong> (or 11pm and 7am in some sectors).</li>
            </ul>

            <h2>Enforcement</h2>
            <p>
              The <strong>Health and Safety Executive (HSE)</strong> enforces the limits on working hours, night work, and health assessments. Employers who fail to comply can face enforcement notices and, in serious cases, prosecution.
            </p>
            <p>
              Workers can bring claims to an <strong>employment tribunal</strong> if they are denied rest breaks or annual leave, or if they suffer detriment for refusing to exceed the 48-hour limit. Claims must generally be brought within 3 months of the alleged breach.
            </p>

            <h2>How Leavely helps with WTR compliance</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> makes it straightforward to stay compliant with the Working Time Regulations:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Annual leave tracking</strong> — automatically calculates statutory entitlements, handles pro-rata for part-timers, and prevents over-booking.</li>
              <li><strong>TOIL and overtime visibility</strong> — if you offer time off in lieu, Leavely tracks accrued hours alongside leave balances so you can spot when workers are approaching limits.</li>
              <li><strong>Absence calendar</strong> — team-wide view of leave and working patterns helps managers identify rest break compliance issues.</li>
              <li><strong>Full audit trail</strong> — every leave request, approval, and balance change is logged for 2+ years, giving you the records you need if challenged.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Stay compliant with working time rules</h3>
            <p className="text-emerald-100 mb-6">Leavely tracks leave, overtime, and balances so you can demonstrate WTR compliance with confidence.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK 2026: The Complete Guide &rarr;</Link>
              <Link href="/blog/toil-policy-uk" className="block text-emerald-600 hover:underline font-medium">TOIL Policy UK: Time Off in Lieu Explained &rarr;</Link>
              <Link href="/blog/flexible-working-uk" className="block text-emerald-600 hover:underline font-medium">Flexible Working UK: Employer&apos;s Guide to the New Rules &rarr;</Link>
              <Link href="/blog/bank-holidays-uk-2026" className="block text-emerald-600 hover:underline font-medium">UK Bank Holidays 2026: Complete List for Employers &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
