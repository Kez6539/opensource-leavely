import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/statutory-parental-bereavement-pay`

export const metadata: Metadata = {
  title: 'Statutory Parental Bereavement Pay: A Complete Guide for UK Employers',
  description: 'Everything UK employers need to know about statutory parental bereavement pay, eligibility criteria, calculation methods, and legal requirements under the Parental Bereavement Act 2018.',
  alternates: { canonical: articleUrl },
  keywords: [
    'statutory parental bereavement pay',
    'parental bereavement leave UK',
    'SPBP payment rates',
    'bereavement leave entitlement',
    'Jack&apos;s Law UK',
    'parental bereavement act 2018',
    'child bereavement leave'
  ],
  openGraph: {
    title: 'Statutory Parental Bereavement Pay: A Complete Guide for UK Employers',
    description: 'Everything UK employers need to know about statutory parental bereavement pay, eligibility criteria, calculation methods, and legal requirements under the Parental Bereavement Act 2018.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Statutory Parental Bereavement Pay: A Complete Guide for UK Employers',
  description: 'Everything UK employers need to know about statutory parental bereavement pay, eligibility criteria, calculation methods, and legal requirements under the Parental Bereavement Act 2018.',
  url: articleUrl,
  datePublished: '2026-04-13',
  dateModified: '2026-04-13',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function StatutoryParentalBereavementPayGuide() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">LEAVE ENTITLEMENTS</span>
            <span className="text-xs text-gray-400 ml-3">12 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Statutory Parental Bereavement Pay: A Complete Guide for UK Employers
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p>
              Last month, I received a call from a distraught HR manager. One of their employees had just lost a child and she wasn&apos;t sure about the company&apos;s legal obligations. She&apos;d heard about Jack&apos;s Law but didn&apos;t know the specifics. What pay was the employee entitled to? How long could they take off? What documentation was needed?
            </p>

            <p>
              These situations are heartbreaking. They&apos;re also legally complex. Since April 2020, the Parental Bereavement (Leave and Pay) Act 2018 has provided specific rights to bereaved parents across the UK. Yet many SMB employers remain unclear about their responsibilities under this legislation.
            </p>

            <h2>Understanding Statutory Parental Bereavement Pay (SPBP)</h2>

            <p>
              Statutory Parental Bereavement Pay provides financial support to eligible employees who have lost a child under 18 years old or suffered a stillbirth after 24 weeks of pregnancy. This statutory right exists alongside any contractual bereavement leave your organisation might offer.
            </p>

            <p>
              The legislation, commonly known as Jack&apos;s Law, came into force on 6 April 2020. It ensures bereaved parents receive both time away from work and financial support during an incredibly difficult period. As an employer, you have specific legal obligations you must fulfil.
            </p>

            <h3>Key eligibility criteria for SPBP</h3>

            <p>
              To qualify for Statutory Parental Bereavement Pay, employees must meet several criteria. First, they must be employed continuously by you for at least 26 weeks up to the week before the child&apos;s death. They must also remain employed by you on the day the child dies.
            </p>

            <p>
              Additionally, their average weekly earnings must be at least &pound;123 (the lower earnings limit for National Insurance contributions) in the eight weeks before the child&apos;s death. The employee must provide proper notice, though requirements vary depending on when they take the leave.
            </p>

            <h2>Who qualifies as a bereaved parent?</h2>

            <p>
              The definition extends beyond biological parents. The legislation recognises various parental relationships, acknowledging that family structures vary significantly.
            </p>

            <p>
              Eligible individuals include:
            </p>

            <ul>
              <li>Biological parents of the child</li>
              <li>Adoptive parents</li>
              <li>Individuals who lived with the child and had responsibility for them for at least four weeks before death</li>
              <li>Legal guardians</li>
              <li>Partners of the child&apos;s parent who lived with the child in an enduring family relationship</li>
              <li>Intended parents under a surrogacy arrangement</li>
              <li>Parents of a child who was stillborn after 24 weeks of pregnancy</li>
            </ul>

            <p>
              This broad definition ensures support reaches those who need it most, regardless of legal technicalities around parenthood.
            </p>

            <h2>Current SPBP rates and calculation methods</h2>

            <p>
              As of April 2024, Statutory Parental Bereavement Pay is paid at &pound;184.03 per week or 90% of average weekly earnings, whichever is lower. This mirrors the rates for other statutory payments like Statutory Maternity Pay and Statutory Paternity Pay.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Payment element</th>
                  <th>Current rate (2024/25)</th>
                  <th>Calculation method</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Weekly SPBP rate</td>
                  <td>&pound;184.03</td>
                  <td>Fixed statutory amount</td>
                </tr>
                <tr>
                  <td>Alternative calculation</td>
                  <td>90% of average weekly earnings</td>
                  <td>If less than &pound;184.03</td>
                </tr>
                <tr>
                  <td>Maximum payment period</td>
                  <td>2 weeks</td>
                  <td>Can be taken separately</td>
                </tr>
                <tr>
                  <td>Lower earnings limit</td>
                  <td>&pound;123 per week</td>
                  <td>Minimum to qualify</td>
                </tr>
              </tbody>
            </table>

            <p>
              To calculate average weekly earnings, you&apos;ll need to look at the eight-week period before the child&apos;s death. Include all earnings subject to National Insurance contributions, including bonuses and overtime. Divide the total by eight to get the average.
            </p>

            <h2>How parental bereavement leave works</h2>

            <p>
              Bereaved parents are entitled to two weeks of leave, which can be taken as a single block or as two separate one-week periods. This flexibility recognises that grief doesn&apos;t follow a predictable timeline.
            </p>

            <p>
              The leave must be taken within 56 weeks of the child&apos;s death. This extended timeframe acknowledges that immediate leave might not always be possible or desired. Some parents need time to process their loss before taking extended leave.
            </p>

            <h3>Notice requirements for employers</h3>

            <p>
              Notice requirements depend on when the employee takes their leave. For leave starting within the first 56 days after death, employees must notify you before their normal start time on the first day of absence. They can do this by phone, email, or any other reasonable method.
            </p>

            <p>
              For leave taken after 56 days, employees must give at least one week&apos;s notice. This allows you time to arrange cover and manage workload. Remember, these are minimum requirements. You can always be more flexible if circumstances allow.
            </p>

            <h2>Processing SPBP claims: A step-by-step guide</h2>

            <p>
              When an employee notifies you of a bereavement, your immediate response sets the tone. Express genuine condolences. Avoid immediately discussing administrative requirements unless the employee raises them.
            </p>

            <p>
              Within 28 days of their leave starting, the employee should provide written notice including:
            </p>

            <ul>
              <li>Their name</li>
              <li>The date of the child&apos;s death</li>
              <li>The date they want parental bereavement leave and pay to start</li>
              <li>Whether they&apos;re taking one or two weeks</li>
              <li>The child&apos;s relationship to them</li>
            </ul>

            <p>
              You cannot request evidence of the child&apos;s death. The legislation specifically prohibits this to avoid adding distress during an already difficult time. Trust your employees unless you have reasonable grounds to believe they&apos;re being dishonest.
            </p>

            <h3>Payment timelines and HMRC reclaims</h3>

            <p>
              Pay SPBP on the same date you&apos;d normally pay wages. If an employee usually receives monthly pay on the 25th, pay their SPBP on that date too. Don&apos;t delay payment while waiting to reclaim from HMRC.
            </p>

            <p>
              You can reclaim 92% of SPBP payments from HMRC (or 103% if you&apos;re a small employer with National Insurance contributions of &pound;45,000 or less in the previous tax year). Reclaim through your regular PAYE submissions, reducing your National Insurance liability.
            </p>

            <h2>Common SPBP scenarios and solutions</h2>

            <p>
              Real workplace situations rarely fit neatly into legislative frameworks. Here are scenarios I&apos;ve encountered and practical solutions.
            </p>

            <h3>Multiple bereavements</h3>

            <p>
              If an employee loses more than one child, they&apos;re entitled to separate leave and pay for each child. This applies even if the deaths occur simultaneously, such as in an accident. Each child&apos;s death triggers independent entitlements.
            </p>

            <h3>Employees on family-related leave</h3>

            <p>
              Employees already on maternity, paternity, or adoption leave when bereavement occurs can interrupt that leave to take parental bereavement leave. The original leave resumes afterwards. This prevents parents losing other statutory entitlements due to tragedy.
            </p>

            <h3>Fixed-term contracts ending</h3>

            <p>
              If a fixed-term contract ends during parental bereavement leave, SPBP continues until the leave period ends. You cannot terminate payments simply because the contract expires. Factor this into workforce planning.
            </p>

            <h2>Legal obligations and compliance requirements</h2>

            <p>
              Your legal duties under the Parental Bereavement Act 2018 are non-negotiable. Failure to provide statutory leave or pay can result in employment tribunal claims, HMRC penalties, and reputational damage.
            </p>

            <p>
              Key compliance requirements include:
            </p>

            <ul>
              <li>Providing two weeks&apos; leave to eligible employees</li>
              <li>Paying SPBP at the correct rate and time</li>
              <li>Maintaining accurate records for HMRC</li>
              <li>Not requiring evidence of the child&apos;s death</li>
              <li>Protecting employees from detriment for taking leave</li>
              <li>Allowing employees to return to the same job after leave</li>
            </ul>

            <p>
              Keep detailed records of all parental bereavement leave and payments. HMRC can request evidence going back three years. Document notification dates, leave taken, payments made, and calculation methods used.
            </p>

            <h2>Supporting bereaved employees beyond statutory requirements</h2>

            <p>
              While statutory provisions provide a foundation, they represent minimum standards. Progressive employers recognise that supporting bereaved parents requires more than legal compliance.
            </p>

            <p>
              Consider offering enhanced bereavement pay at full salary. Many employers top up statutory payments, recognising that financial stress compounds emotional trauma. Even small businesses can often afford two weeks at full pay when tragedy strikes.
            </p>

            <p>
              Flexible return-to-work arrangements help employees readjust. Phased returns, temporary reduced hours, or working from home can ease the transition. Remember, grief doesn&apos;t end after two weeks. Ongoing flexibility demonstrates genuine care.
            </p>

            <h3>Creating a bereavement policy</h3>

            <p>
              A clear bereavement policy helps managers respond consistently and compassionately. Include your stance on parental bereavement leave, going beyond statutory minimums where possible. Address practical matters like registering deaths, funeral arrangements, and estate administration.
            </p>

            <p>
              Train line managers on policy application and emotional support. They&apos;re often the first point of contact and need confidence handling sensitive conversations. Consider partnering with employee assistance programmes for professional counselling services.
            </p>

            <h2>Managing workplace absence and record keeping</h2>

            <p>
              Accurate record keeping protects both employer and employee. Document all bereavement-related absences separately from sick leave or annual leave. This ensures correct payment and prevents future disputes.
            </p>

            <p>
              For businesses managing multiple types of leave, manual tracking becomes complex. Spreadsheets work initially but quickly become unwieldy as your team grows. Modern <Link href="/blog/staff-holiday-tracker-uk" className="text-emerald-600 hover:underline font-medium">staff holiday tracking systems</Link> can automatically calculate entitlements and maintain audit trails.
            </p>

            <h3>How Leavely helps with bereavement leave management</h3>

            <p>
              Leavely&apos;s leave management system includes specific provisions for parental bereavement leave, keeping it separate from other absence types. The platform automatically calculates SPBP entitlements based on employment dates and earnings data you&apos;ve already entered.
            </p>

            <p>
              When employees request bereavement leave through Leavely, the system guides them through required information while maintaining sensitivity. Managers receive notifications but aren&apos;t bombarded with unnecessary details during a difficult time. All records are securely stored for HMRC compliance, with reports available at the click of a button.
            </p>

            <p>
              At &pound;8 per user per month, Leavely provides peace of mind that you&apos;re meeting legal obligations while supporting employees through tragedy. The 14-day free trial lets you explore features without commitment, and no credit card is required to start.
            </p>

            <h2>Recent changes and future developments</h2>

            <p>
              The government regularly reviews statutory payment rates, typically increasing them each April in line with inflation. Stay informed about rate changes through HMRC updates or <Link href="/blog/hr-software-small-business-uk" className="text-emerald-600 hover:underline font-medium">HR software that automatically updates</Link>.
            </p>

            <p>
              Some campaigners advocate extending parental bereavement rights to pregnancy losses before 24 weeks. While not currently covered by Jack&apos;s Law, progressive employers often provide compassionate leave for early pregnancy loss, recognising the emotional impact.
            </p>

            <h2>Frequently asked questions about SPBP</h2>

            <h3>Can employees take parental bereavement leave if they weren&apos;t living with the child?</h3>

            <p>
              Yes, biological and adoptive parents qualify regardless of living arrangements. The law recognises that parental bonds exist independently of residence. Non-resident parents have identical entitlements to resident parents.
            </p>

            <h3>What happens if an employee is already off sick when bereavement occurs?</h3>

            <p>
              Employees can switch from sick leave to parental bereavement leave if they meet eligibility criteria. This ensures they receive appropriate support and protects their sick leave entitlement for future use. Notify HMRC of the change through your regular reporting.
            </p>

            <h3>Do zero-hours contract workers qualify for SPBP?</h3>

            <p>
              Zero-hours workers may qualify if they meet the continuous employment and earnings criteria. Calculate their average earnings over the eight-week reference period. Include all weeks, even those without work, when calculating the average.
            </p>

            <h3>Can employers refuse parental bereavement leave requests?</h3>

            <p>
              No, you cannot refuse leave to eligible employees who provide proper notice. This is a day-one statutory right that doesn&apos;t depend on length of service for the leave itself (though pay requires 26 weeks&apos; service). Refusing leave could result in tribunal claims.
            </p>

            <h3>How does SPBP interact with company sick pay schemes?</h3>

            <p>
              SPBP is separate from sick pay. Employees shouldn&apos;t use sick leave entitlements for bereavement. If your company sick pay scheme is more generous than SPBP, you might choose to pay the higher amount, but you cannot require employees to use sick leave instead of bereavement leave.
            </p>

            <h3>What records must employers keep for HMRC?</h3>

            <p>
              Maintain records of dates of child&apos;s death (as notified by employee), leave dates, SPBP payments made, calculations showing how amounts were determined, and employee declarations. Keep records for at least three years. Digital <Link href="/blog/best-leave-management-software-uk" className="text-emerald-600 hover:underline font-medium">leave management software</Link> can automate this record keeping.
            </p>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Simplify leave management during difficult times</h3>
            <p className="text-emerald-100 mb-6">Handle bereavement leave sensitively while ensuring full legal compliance. Try Leavely free for 14 days.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/sick-leave-policy-uk" className="block text-emerald-600 hover:underline font-medium">
                Creating an Effective Sick Leave Policy for UK Businesses &rarr;
              </Link>
              <Link href="/blog/flexible-working-uk" className="block text-emerald-600 hover:underline font-medium">
                Flexible Working Rights in the UK: A Complete Guide &rarr;
              </Link>
              <Link href="/blog/employee-self-service-hr" className="block text-emerald-600 hover:underline font-medium">
                Benefits of Employee Self-Service HR Systems &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}