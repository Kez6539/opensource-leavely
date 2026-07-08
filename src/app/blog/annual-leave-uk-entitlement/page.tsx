import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/annual-leave-uk-entitlement`

export const metadata: Metadata = {
  title: 'Annual Leave UK Entitlement: The Complete 2026 Employer Guide',
  description: 'Everything UK employers need to know about annual leave entitlement, from the 5.6 week statutory minimum to part-time calculations, bank holidays and carry over.',
  alternates: { canonical: articleUrl },
  keywords: [
    'annual leave uk entitlement',
    'statutory holiday entitlement uk',
    'holiday pay calculation uk',
    'working time regulations 1998',
    'part time holiday entitlement',
    'bank holiday entitlement uk',
    'pro rata holiday calculation',
  ],
  openGraph: {
    title: 'Annual Leave UK Entitlement: The Complete 2026 Employer Guide',
    description: 'Everything UK employers need to know about annual leave entitlement, from the 5.6 week statutory minimum to part-time calculations, bank holidays and carry over.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Annual Leave UK Entitlement: The Complete 2026 Employer Guide',
  description: 'Everything UK employers need to know about annual leave entitlement, from the 5.6 week statutory minimum to part-time calculations, bank holidays and carry over.',
  url: articleUrl,
  datePublished: '2026-06-22',
  dateModified: '2026-06-22',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function AnnualLeaveUkEntitlementPage() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">EMPLOYMENT LAW</span>
            <span className="text-xs text-gray-400 ml-3">11 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Annual Leave UK Entitlement: The Complete 2026 Employer Guide
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p>
              I had a call last week from an SMB owner in Leeds who&apos;d just been threatened with a tribunal claim. The reason? He&apos;d been giving his four part-time staff 20 days&apos; holiday a year because, in his words, &quot;that&apos;s what the full-timers get pro rata.&quot; What he&apos;d actually done was strip them of nearly half their statutory entitlement, because he&apos;d forgotten that the 28 day figure he kept reading about includes the eight bank holidays his team don&apos;t work but are still entitled to be paid for.
            </p>

            <p>
              This is the most common annual leave mistake I see in small UK businesses. Not malice. Not even ignorance. Just a misunderstanding of how the Working Time Regulations 1998 actually translate into days, pay and obligations. If you employ anyone in the UK, getting this right is non-negotiable, and the cost of getting it wrong runs from underpaid wages claims to unlimited tribunal damages.
            </p>

            <p>
              Here&apos;s what the law actually requires, how to calculate it accurately for every worker type, and the operational issues that cause most disputes.
            </p>

            <h2>The statutory baseline: 5.6 weeks</h2>

            <p>
              Under regulation 13 and 13A of the Working Time Regulations 1998, every &quot;worker&quot; in the UK is entitled to a minimum of <strong>5.6 weeks&apos; paid annual leave per year</strong>. Note the word &quot;worker&quot; not &quot;employee&quot;. This includes employees, agency staff, casual workers, zero-hours workers and most gig economy contractors. The only people excluded are the genuinely self-employed.
            </p>

            <p>
              The 5.6 weeks is expressed in weeks, not days, for a reason. It scales with the working pattern. For someone working five days a week, 5.6 weeks equals 28 days. For someone working three days a week, it equals 16.8 days. The weekly figure is the constant. The daily figure depends on the contract.
            </p>

            <p>
              The 28 day figure is also a cap on the statutory minimum. An employer is not required to give more than 28 days even if a worker does a six day week. Anything above 28 days is contractual, not statutory.
            </p>

            <h3>Composition of the 5.6 weeks</h3>

            <p>
              The 5.6 weeks comes from two layers of legislation:
            </p>

            <ul>
              <li><strong>4 weeks</strong> under regulation 13 (the EU derived &quot;Euro leave&quot;)</li>
              <li><strong>1.6 weeks</strong> under regulation 13A (the additional UK leave introduced in 2007 and 2009)</li>
            </ul>

            <p>
              The distinction still matters in 2026 because the rules on carry over, pay calculation and what counts as &quot;normal pay&quot; differ between the two layers. More on that below.
            </p>

            <h2>Bank holidays: not automatic, not separate</h2>

            <p>
              There is no statutory right to take bank holidays off. There&apos;s also no statutory right to be paid extra for working them. The eight bank holidays in England and Wales (nine in Scotland, ten in Northern Ireland) are not separate from the 5.6 weeks. They can be included within it.
            </p>

            <p>
              In practice, the vast majority of UK SMBs include bank holidays within the 28 day figure. A typical full-time contract reads: &quot;Your annual leave entitlement is 28 days per year, inclusive of the eight statutory bank holidays in England and Wales.&quot; That leaves the employee with 20 days of discretionary leave to book themselves.
            </p>

            <p>
              Some employers offer &quot;28 days plus bank holidays&quot;, which is 36 days in total. That&apos;s a contractual enhancement, not a legal requirement. Whichever approach you take, the contract must be unambiguous. Disputes about whether bank holidays are &quot;on top of&quot; or &quot;included in&quot; the entitlement are one of the most common claims I see.
            </p>

            <h2>Pro rata calculations for part-time workers</h2>

            <p>
              This is where the Leeds employer I mentioned went wrong. Part-time workers are entitled to the same 5.6 weeks as full-timers, just expressed in their own working pattern. Under the Part-time Workers (Prevention of Less Favourable Treatment) Regulations 2000, they cannot be treated less favourably than comparable full-time staff.
            </p>

            <p>
              The correct calculation is: <strong>days worked per week &times; 5.6 = annual leave entitlement in days</strong>.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Days worked per week</th>
                  <th>Annual leave entitlement (days)</th>
                  <th>Equivalent in weeks</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>5</td><td>28</td><td>5.6</td></tr>
                <tr><td>4</td><td>22.4</td><td>5.6</td></tr>
                <tr><td>3</td><td>16.8</td><td>5.6</td></tr>
                <tr><td>2</td><td>11.2</td><td>5.6</td></tr>
                <tr><td>1</td><td>5.6</td><td>5.6</td></tr>
              </tbody>
            </table>

            <p>
              Round up, never down. Rounding down breaches the regulations.
            </p>

            <h3>Bank holidays and part-time workers</h3>

            <p>
              If your full-time contract is &quot;20 days plus bank holidays&quot;, a part-time worker who never works Mondays is at a disadvantage, because most UK bank holidays fall on Mondays. You have two legally compliant options:
            </p>

            <ol>
              <li>Pro rata the bank holiday allowance based on full-time equivalent, so they get extra leave to compensate</li>
              <li>Use the &quot;all inclusive&quot; method (5.6 weeks total) which automatically delivers the correct entitlement regardless of working pattern</li>
            </ol>

            <p>
              For most SMBs, the second approach is cleaner and harder to get wrong. We&apos;ve written more on this in our <Link href="/blog/annual-leave-entitlement-uk" className="text-emerald-600 hover:underline font-medium">annual leave entitlement UK</Link> guide.
            </p>

            <h2>Irregular hours and zero-hours workers</h2>

            <p>
              The Employment Rights (Amendment, Revocation and Transitional Provision) Regulations 2023 brought in a new method for calculating leave for &quot;irregular hours&quot; and &quot;part-year&quot; workers. From leave years starting on or after 1 April 2024, employers can use the <strong>12.07% accrual method</strong> for these workers.
            </p>

            <p>
              The maths: 5.6 weeks &divide; 46.4 working weeks per year = 12.07%. So for every hour worked, an irregular hours worker accrues 12.07% of an hour in paid holiday. A worker who completes 100 hours in a month accrues 12.07 hours of holiday.
            </p>

            <p>
              The 2024 regulations also reintroduced &quot;rolled-up holiday pay&quot; for irregular hours and part-year workers only. This means you can include holiday pay as a separate, clearly itemised line on each payslip rather than paying it when leave is actually taken. It must be marked clearly and paid at the same time as the worker&apos;s regular wages. For everyone else, rolled-up holiday pay is still unlawful following Robinson-Steele v RD Retail Services (2006).
            </p>

            <h2>Holiday pay: what &quot;a week&apos;s pay&quot; actually means</h2>

            <p>
              Holiday pay sounds simple. Pay the worker what they&apos;d normally earn. In practice, this is one of the most litigated areas of UK employment law over the past decade, and the rules differ depending on which slice of the 5.6 weeks the worker is taking.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Leave type</th>
                  <th>What counts as pay</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>First 4 weeks (reg 13)</td>
                  <td>Normal remuneration: basic pay plus regular overtime, commission, bonuses, allowances</td>
                </tr>
                <tr>
                  <td>Additional 1.6 weeks (reg 13A)</td>
                  <td>Basic contractual pay only (in most cases)</td>
                </tr>
              </tbody>
            </table>

            <p>
              The cases that established this, Bear Scotland v Fulton, British Gas v Lock and Dudley MBC v Willetts, all confirm that regular non-guaranteed overtime, commission and contractual allowances must be included in the calculation of holiday pay for the first four weeks. If you only pay basic salary during leave, and your staff regularly earn commission or overtime, you are underpaying.
            </p>

            <p>
              For workers with variable pay, the reference period is now <strong>52 weeks</strong> (up from 12 weeks in April 2020 under the Employment Rights Act 1996, as amended). You take the average weekly pay over the last 52 weeks in which the worker earned something, ignoring weeks with no pay.
            </p>

            <h2>When does annual leave accrue?</h2>

            <p>
              For workers with fixed hours, the entitlement accrues from day one of employment but during the first year of employment, an employer can require leave to be taken as it accrues, at a rate of 1/12th per month (regulation 15A).
            </p>

            <p>
              So someone starting on 1 January with a 28 day entitlement can only book 2.33 days in January, 4.66 by end of February, and so on. After year one, the full entitlement is available from the start of the leave year.
            </p>

            <p>
              For irregular hours workers under the 2024 regulations, leave accrues on the last day of each pay period based on hours actually worked.
            </p>

            <h2>Carry over: the rules that catch employers out</h2>

            <p>
              The default position under the Working Time Regulations is that the 4 weeks of regulation 13 leave <strong>cannot</strong> be carried over. Use it or lose it within the leave year. The 1.6 weeks of regulation 13A leave can be carried over by agreement for up to one leave year.
            </p>

            <p>
              However, case law and the 2024 amendments have created important exceptions:
            </p>

            <ul>
              <li><strong>Sickness:</strong> A worker on long-term sick leave who cannot take their holiday can carry over up to 4 weeks for 18 months from the end of the leave year (King v Sash Window Workshop principles, now codified)</li>
              <li><strong>Family leave:</strong> Maternity, paternity, adoption and shared parental leave allow full carry over of all 5.6 weeks</li>
              <li><strong>Employer prevention:</strong> If you fail to give the worker a reasonable opportunity to take leave, or fail to tell them they&apos;ll lose it, they can carry it over indefinitely until employment ends</li>
            </ul>

            <p>
              That last point is the one that bites SMBs. You cannot just say nothing and assume unused leave evaporates on 31 December. You have to actively notify workers of their remaining balance and encourage them to take it. We cover this in detail in our <Link href="/blog/carry-over-annual-leave-uk" className="text-emerald-600 hover:underline font-medium">guide to carry over annual leave</Link>.
            </p>

            <h2>Leave during notice periods and on termination</h2>

            <p>
              When employment ends, workers are entitled to be paid for any accrued but untaken statutory leave. The formula in regulation 14 is:
            </p>

            <p>
              <strong>(A &times; B) &minus; C</strong>, where A is total annual entitlement, B is the proportion of the leave year worked, and C is the leave already taken.
            </p>

            <p>
              You can require workers to use up accrued leave during their notice period by giving notice of at least twice the length of the leave you require them to take. You can also pay in lieu of accrued leave on termination, and this is the only time payment in lieu of statutory leave is permitted.
            </p>

            <h2>The real cost of getting it wrong</h2>

            <p>
              Average UK absence runs at approximately 7.8 days per employee per year according to recent CIPD data. Annual leave runs at around 27 days. That means leave and absence combined account for roughly 13% of your total working time. Mistakes compound quickly.
            </p>

            <p>
              I worked with a 22-person agency last year who&apos;d underpaid holiday on commission for three years. The back pay claim, once we&apos;d done the calculations, came to just over &pound;47,000 across the team. Tribunal claims for unlawful deduction from wages can go back two years (since the Deduction from Wages (Limitation) Regulations 2014). Before that limitation, it could be the whole employment period.
            </p>

            <p>
              Spreadsheets do not catch this. They roll over the same flawed formula every year. The first time most SMBs find out is when an employee leaves and asks why their final payslip looks light.
            </p>

            <h2>How Leavely helps</h2>

            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> calculates statutory entitlement correctly for every worker type from the moment you add them. Full time, part time, zero hours, mid-year joiners, contract changes, all handled automatically against the Working Time Regulations. Bank holidays are tracked separately or inclusively depending on your policy. Carry over rules, including the regulation 13 versus 13A distinction, are enforced at the platform level so nobody accidentally banks unlawful leave.
            </p>

            <p>
              Managers see real-time balances, approve requests in two clicks, and get automatic alerts when staff have unused leave heading into year end. Employees self-serve through a simple dashboard, eliminating most of the &quot;how much do I have left?&quot; emails that clog up HR inboxes. It&apos;s &pound;8 per user per month with every feature included, and there&apos;s a 14-day free trial with no credit card required.
            </p>

            <p>
              See how it compares in our roundup of the <Link href="/blog/best-leave-management-software-uk" className="text-emerald-600 hover:underline font-medium">best leave management software for UK businesses</Link>, or read about <Link href="/blog/staff-holiday-tracker-uk" className="text-emerald-600 hover:underline font-medium">staff holiday trackers</Link> if you&apos;re moving off a spreadsheet.
            </p>

            <h2>Frequently asked questions</h2>

            <h3>What is the minimum annual leave entitlement in the UK?</h3>
            <p>
              The statutory minimum is 5.6 weeks of paid leave per year, which equates to 28 days for a five-day-a-week worker. This is capped at 28 days even if someone works six or seven days a week. Bank holidays can be counted within this figure.
            </p>

            <h3>Do part-time workers get bank holidays?</h3>
            <p>
              They get the pro rata equivalent. If your policy is &quot;20 days plus 8 bank holidays&quot;, a three-day-a-week worker should receive 16.8 days holiday plus 4.8 days in lieu of bank holidays (pro rata of 8). Failing to pro rata bank holidays for part-timers usually breaches the Part-time Workers Regulations 2000.
            </p>

            <h3>Can I refuse a holiday request?</h3>
            <p>
              Yes, provided you give counter-notice at least the same length as the leave being requested. So if an employee asks for 5 days off, you must refuse within 5 working days of the request. You cannot refuse leave such that the worker can never use their statutory entitlement.
            </p>

            <h3>What happens if an employee falls sick during annual leave?</h3>
            <p>
              They can convert the sick days to sick leave (with appropriate evidence) and reclaim those days as annual leave to take later. This was established in Pereda v Madrid Movilidad (2009). Your <Link href="/blog/sick-leave-policy-uk" className="text-emerald-600 hover:underline font-medium">sick leave policy</Link> should cover the notification process.
            </p>

            <h3>Can I pay an employee instead of giving them leave?</h3>
            <p>
              Not while they&apos;re still employed. The 5.6 weeks of statutory leave must be taken as actual time off. Payment in lieu is only permitted on termination of employment, for accrued but untaken statutory leave.
            </p>

            <h3>How do I calculate holiday for someone who started mid-year?</h3>
            <p>
              Multiply their annual entitlement by the fraction of the leave year remaining. For a worker joining on 1 July with a 28 day entitlement and a January to December leave year, they accrue 28 &times; (6/12) = 14 days for that first year. Round up to the next half day if there&apos;s any fraction.
            </p>

            <h3>What records do I need to keep?</h3>
            <p>
              Under regulation 9 of the Working Time Regulations, you must keep &quot;adequate records&quot; to demonstrate compliance, kept for at least two years. ACAS guidance recommends records of dates leave was taken, payment made, and remaining balance. A digital <Link href="/blog/employee-self-service-hr" className="text-emerald-600 hover:underline font-medium">self-service HR system</Link> handles this automatically.
            </p>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Stop guessing at holiday entitlement</h3>
            <p className="text-emerald-100 mb-6">Leavely calculates statutory leave correctly for every worker type, every time. 14-day free trial, no card needed.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">
                UK Annual Leave Entitlement Explained &rarr;
              </Link>
              <Link href="/blog/carry-over-annual-leave-uk" className="block text-emerald-600 hover:underline font-medium">
                Carrying Over Annual Leave: What UK Employers Must Know &rarr;
              </Link>
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">
                The Bradford Factor Explained for UK Employers &rarr;
              </Link>
              <Link href="/blog/hr-software-small-business-uk" className="block text-emerald-600 hover:underline font-medium">
                HR Software for Small Businesses in the UK &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}