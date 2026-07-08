import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/law-on-bereavement-leave`

export const metadata: Metadata = {
  title: 'UK Law on Bereavement Leave: Statutory Rights and Employer Obligations',
  description: 'Complete guide to UK bereavement leave law including Jack&apos;s Law, statutory entitlements, employer obligations, and practical HR guidance for supporting bereaved employees.',
  alternates: { canonical: articleUrl },
  keywords: [
    'law on bereavement leave',
    'bereavement leave uk',
    'compassionate leave uk law',
    'jacks law bereavement',
    'statutory bereavement leave',
    'parental bereavement leave',
    'bereavement leave entitlement'
  ],
  openGraph: {
    title: 'UK Law on Bereavement Leave: Statutory Rights and Employer Obligations',
    description: 'Complete guide to UK bereavement leave law including Jack&apos;s Law, statutory entitlements, employer obligations, and practical HR guidance for supporting bereaved employees.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'UK Law on Bereavement Leave: Statutory Rights and Employer Obligations',
  description: 'Complete guide to UK bereavement leave law including Jack&apos;s Law, statutory entitlements, employer obligations, and practical HR guidance for supporting bereaved employees.',
  url: articleUrl,
  datePublished: '2026-04-13',
  dateModified: '2026-04-13',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function LawOnBereavementLeave() {
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
            <span className="text-xs text-gray-400 ml-3">12 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            UK Law on Bereavement Leave: Your Complete Guide to Statutory Rights and Employer Obligations
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p>Sarah from HR rang me last week. Her employee had just lost their three-year-old son in a car accident. &ldquo;I know about Jack&apos;s Law,&rdquo; she said, &ldquo;but I&apos;m not sure if the stepfather qualifies for statutory leave. And what about the grandparents who live with them?&rdquo;</p>

            <p>These conversations happen more often than you&apos;d think. Every HR manager will face bereavement leave requests, yet many struggle with the legal framework. The law changed significantly in 2020, but misconceptions persist.</p>

            <p>UK bereavement leave law isn&apos;t just about statutory minimums. It&apos;s about understanding your legal obligations whilst supporting employees through their darkest moments. Get it wrong and you face tribunal claims, damaged morale, and reputational harm.</p>

            <h2>Current UK Bereavement Leave Legislation</h2>

            <p>The UK has no general statutory right to bereavement leave. Surprised? Most managers are. Unlike <Link href="/blog/annual-leave-entitlement-uk" className="text-emerald-600 hover:underline font-medium">annual leave entitlement</Link>, which guarantees 5.6 weeks for full-time workers, bereavement leave depends entirely on specific circumstances and relationships.</p>

            <p>The Parental Bereavement Leave and Pay Act 2018, known as Jack&apos;s Law, created the first statutory bereavement entitlement in UK employment law. It came into force on 6 April 2020 and applies only to parents who lose a child under 18.</p>

            <p>Before Jack&apos;s Law, employees relied on three options:</p>

            <ul>
              <li>Time off for dependants under Section 57A of the Employment Rights Act 1996</li>
              <li>Contractual compassionate leave policies</li>
              <li>Using annual leave or unpaid absence</li>
            </ul>

            <p>The Employment Rights Act 1996 provides a right to &ldquo;reasonable&rdquo; unpaid time off to deal with emergencies involving dependants. This covers making funeral arrangements but doesn&apos;t extend to grieving time. ACAS guidance suggests one or two days might be reasonable, though this varies by circumstance.</p>

            <h2>Jack&apos;s Law Explained: Parental Bereavement Rights</h2>

            <p>Jack&apos;s Law transformed bereavement rights for bereaved parents. Named after Jack Herd, whose mother Lucy campaigned for statutory leave after losing her son, it provides the most generous bereavement entitlement in UK law.</p>

            <h3>Who Qualifies Under Jack&apos;s Law?</h3>

            <p>Eligibility extends beyond biological parents. The following qualify for parental bereavement leave:</p>

            <ul>
              <li>Biological parents</li>
              <li>Adoptive parents</li>
              <li>Employees who lived with the child for at least 4 weeks before death</li>
              <li>Legal guardians</li>
              <li>Foster parents (if the child was living with them)</li>
              <li>Parents of stillborn children after 24 weeks of pregnancy</li>
            </ul>

            <p>Partners of primary caregivers qualify if they lived with the child. This includes step-parents, provided they meet the residency requirement.</p>

            <h3>Statutory Entitlements</h3>

            <p>Qualifying employees receive:</p>

            <ul>
              <li><strong>Two weeks&apos; leave</strong> from day one of employment</li>
              <li><strong>Statutory Parental Bereavement Pay</strong> of &pound;172.48 per week (or 90% of average weekly earnings if lower) for employees with 26 weeks&apos; continuous service</li>
              <li><strong>Flexible timing</strong> - leave can be taken as a single two-week block, two separate weeks, or within 56 weeks of the child&apos;s death</li>
            </ul>

            <p>The 56-week window recognises that grief doesn&apos;t follow employment law timescales. Parents might need time for inquests, anniversaries, or when grief unexpectedly overwhelms them months later.</p>

            <h2>General Bereavement Leave: Time Off for Dependants</h2>

            <p>Most bereavement situations fall outside Jack&apos;s Law. When employees lose parents, siblings, or grandparents, different rules apply.</p>

            <p>Section 57A of the Employment Rights Act 1996 provides the statutory framework. Employees can take reasonable unpaid time off to:</p>

            <ul>
              <li>Arrange or attend a funeral</li>
              <li>Deal with immediate consequences of a dependant&apos;s death</li>
            </ul>

            <p>The Act defines dependants as:</p>

            <ul>
              <li>Spouses and civil partners</li>
              <li>Children</li>
              <li>Parents</li>
              <li>Anyone living in the same household (except tenants or lodgers)</li>
              <li>Anyone who reasonably relies on the employee</li>
            </ul>

            <p>Grandparents, siblings, and close friends don&apos;t automatically qualify unless they lived with the employee or relied on them for care. This catches many HR managers off-guard.</p>

            <h3>What Constitutes &ldquo;Reasonable&rdquo; Time Off?</h3>

            <p>The law deliberately avoids defining &ldquo;reasonable&rdquo;. Employment tribunals consider:</p>

            <ul>
              <li>The relationship with the deceased</li>
              <li>Funeral arrangements and location</li>
              <li>Cultural or religious requirements</li>
              <li>Whether the employee is executing the will</li>
              <li>Care responsibilities for other dependants</li>
            </ul>

            <p>ACAS suggests one or two days for immediate arrangements, though complex estates or overseas funerals might justify more. Remember, this covers practical arrangements, not grieving time.</p>

            <h2>Compassionate Leave vs Bereavement Leave: Understanding the Difference</h2>

            <p>Many employers use these terms interchangeably. They shouldn&apos;t. Understanding the distinction helps create clearer policies.</p>

            <p><strong>Bereavement leave</strong> specifically addresses death-related absence. It covers funeral attendance, estate administration, and immediate grief support.</p>

            <p><strong>Compassionate leave</strong> encompasses broader emergencies. Serious illness, domestic crises, or family emergencies might trigger compassionate leave without involving death.</p>

            <p>Neither has statutory definitions outside Jack&apos;s Law. Contractual policies determine scope, duration, and pay. Well-drafted policies separate these categories, preventing confusion when employees face different crises.</p>

            <h2>Employer Obligations and Best Practice</h2>

            <p>Legal compliance forms the foundation, but good employers go further. Your obligations depend on whether Jack&apos;s Law applies and your contractual policies.</p>

            <h3>Statutory Obligations</h3>

            <table>
              <thead>
                <tr>
                  <th>Situation</th>
                  <th>Legal Requirement</th>
                  <th>Pay Obligation</th>
                  <th>Notice Required</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Child bereavement (Jack&apos;s Law)</td>
                  <td>2 weeks&apos; leave</td>
                  <td>SPBP if eligible</td>
                  <td>ASAP, before leave starts</td>
                </tr>
                <tr>
                  <td>Dependant emergency</td>
                  <td>Reasonable time off</td>
                  <td>None (unpaid)</td>
                  <td>ASAP, stating reason and duration</td>
                </tr>
                <tr>
                  <td>Non-dependant bereavement</td>
                  <td>None</td>
                  <td>None</td>
                  <td>Per company policy</td>
                </tr>
              </tbody>
            </table>

            <p>Refusing statutory entitlements constitutes automatic unfair dismissal. Employees don&apos;t need qualifying service periods for time off rights, though parental bereavement pay requires 26 weeks&apos; employment.</p>

            <h3>Creating Supportive Bereavement Policies</h3>

            <p>Progressive employers exceed statutory minimums. Consider these elements when drafting policies:</p>

            <ul>
              <li><strong>Extended relationships</strong> - Include grandparents, siblings, close friends</li>
              <li><strong>Paid leave</strong> - Offering 3-5 days&apos; paid leave shows genuine support</li>
              <li><strong>Flexibility</strong> - Allow split days for funerals, memorials, and estate matters</li>
              <li><strong>Cultural sensitivity</strong> - Recognise different mourning periods and practices</li>
              <li><strong>Miscarriage support</strong> - Cover pregnancy loss before 24 weeks</li>
            </ul>

            <p>The best policies balance compassion with operational needs. Clear frameworks help managers make consistent decisions during emotional situations.</p>

            <h2>Common Bereavement Leave Scenarios and Solutions</h2>

            <p>Real situations rarely fit neat legal categories. Here&apos;s how to handle common challenges:</p>

            <h3>Scenario 1: Multiple Bereavements</h3>

            <p>An employee loses both parents within six months. Statutory entitlements don&apos;t stack, but reasonable employers provide support for each bereavement. Document decisions to ensure consistency.</p>

            <h3>Scenario 2: Extended Grief Impact</h3>

            <p>An employee returns after bereavement leave but struggles with performance. Consider:</p>

            <ul>
              <li>Phased returns</li>
              <li>Temporary adjusted duties</li>
              <li>Employee assistance programmes</li>
              <li>Unpaid leave extensions</li>
            </ul>

            <p>Link this support to your <Link href="/blog/sick-leave-policy-uk" className="text-emerald-600 hover:underline font-medium">sick leave policy</Link> if grief impacts mental health.</p>

            <h3>Scenario 3: Overseas Funerals</h3>

            <p>International funerals require more time. Two days might cover a UK funeral but not travelling to Australia. Consider:</p>

            <ul>
              <li>Additional unpaid leave</li>
              <li>Annual leave combinations</li>
              <li>Remote working arrangements</li>
            </ul>

            <h3>Scenario 4: Probationary Period Bereavement</h3>

            <p>New employees have full statutory rights from day one. Withholding bereavement leave during probation breaches employment law and damages trust. Apply policies consistently regardless of service length.</p>

            <h2>The Business Case for Generous Bereavement Support</h2>

            <p>Supporting bereaved employees isn&apos;t just morally right. It makes business sense. Research by the Chartered Institute of Personnel and Development shows that employees who receive good bereavement support are 3.5 times more likely to stay with their employer.</p>

            <p>Poor bereavement handling costs more than generous policies. Consider these impacts:</p>

            <ul>
              <li><strong>Productivity loss</strong> - Grief affects concentration for 6-12 months</li>
              <li><strong>Absence costs</strong> - Unsupported employees take more sick leave</li>
              <li><strong>Turnover expense</strong> - Replacing employees costs 50-200% of annual salary</li>
              <li><strong>Team morale</strong> - Colleagues judge employers by crisis responses</li>
              <li><strong>Reputation risk</strong> - Poor handling spreads through social media</li>
            </ul>

            <p>A comprehensive bereavement policy costs approximately &pound;150 per employee annually (based on 1.5 occurrences per 100 employees taking 3 days&apos; paid leave). Compare this to recruitment costs averaging &pound;3,000-&pound;5,000 per position.</p>

            <h2>International Comparisons: How UK Law Measures Up</h2>

            <p>The UK&apos;s bereavement provisions lag behind many developed nations:</p>

            <table>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Statutory Entitlement</th>
                  <th>Paid/Unpaid</th>
                  <th>Coverage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>UK</td>
                  <td>2 weeks (child only)</td>
                  <td>Paid if eligible</td>
                  <td>Parents only</td>
                </tr>
                <tr>
                  <td>France</td>
                  <td>3-5 days</td>
                  <td>Paid</td>
                  <td>All close family</td>
                </tr>
                <tr>
                  <td>Canada</td>
                  <td>Up to 10 days</td>
                  <td>3 days paid</td>
                  <td>Immediate family</td>
                </tr>
                <tr>
                  <td>New Zealand</td>
                  <td>3 days</td>
                  <td>Paid</td>
                  <td>Close family</td>
                </tr>
                <tr>
                  <td>Australia</td>
                  <td>2 days</td>
                  <td>Paid</td>
                  <td>Immediate family</td>
                </tr>
              </tbody>
            </table>

            <p>This comparison highlights why progressive UK employers create enhanced policies. Matching international standards helps attract global talent and demonstrates corporate values.</p>

            <h2>Future Developments in UK Bereavement Law</h2>

            <p>Parliamentary discussions suggest potential expansions to bereavement rights. The Bereavement Leave Bill, though unsuccessful in 2023, proposed:</p>

            <ul>
              <li>Two weeks&apos; leave for all close family bereavements</li>
              <li>Statutory pay for immediate family losses</li>
              <li>Recognition of grandparents and siblings</li>
            </ul>

            <p>Growing awareness of pregnancy loss also drives change. Several MPs support extending Jack&apos;s Law to cover miscarriage before 24 weeks. New Zealand&apos;s 2021 legislation providing miscarriage leave influences UK debates.</p>

            <p>Employment lawyers predict incremental changes rather than comprehensive reform. Employers implementing generous policies now position themselves ahead of likely legislative changes.</p>

            <h2>Managing Bereavement Leave Administration</h2>

            <p>Effective administration balances empathy with proper documentation. Grieving employees shouldn&apos;t face bureaucratic hurdles, but employers need appropriate records.</p>

            <h3>Essential Documentation</h3>

            <p>Record keeping requirements vary by leave type:</p>

            <ul>
              <li><strong>Parental bereavement</strong> - Death certificate, stillbirth certificate, or written declaration</li>
              <li><strong>Dependant emergency</strong> - Written notification of relationship and timeframe</li>
              <li><strong>Contractual leave</strong> - Follow policy requirements</li>
            </ul>

            <p>Never demand immediate proof. Allow reasonable time for documentation, recognising that death certificates take time to obtain.</p>

            <h3>Communication Protocols</h3>

            <p>Develop clear communication frameworks:</p>

            <ul>
              <li>Single point of contact during absence</li>
              <li>No work contact unless employee initiates</li>
              <li>Graduated return-to-work planning</li>
              <li>Team communication (with employee consent)</li>
            </ul>

            <h3>How Leavely Helps With Bereavement Leave Management</h3>

            <p>Managing bereavement leave sensitively whilst maintaining proper records challenges every HR team. Leavely&apos;s leave management system handles the administrative burden, letting you focus on supporting employees.</p>

            <p>The platform automatically calculates statutory entitlements based on employment dates and relationship categories. Managers receive gentle prompts about policy provisions without chasing grieving employees for information. Custom leave types accommodate your enhanced bereavement policies beyond statutory minimums.</p>

            <p>At &pound;8 per user monthly, Leavely costs less than one hour of management time spent calculating entitlements and tracking various bereavement situations across your workforce.</p>

            <h2>FAQs About UK Bereavement Leave Law</h2>

            <h3>Do grandparents get bereavement leave when a grandchild dies?</h3>

            <p>Grandparents don&apos;t qualify for statutory parental bereavement leave under Jack&apos;s Law unless they were legal guardians or the child lived with them. However, if the grandparent was the primary carer or the child depended on them, they might qualify for emergency dependant leave. Many employers include grandchildren in enhanced bereavement policies.</p>

            <h3>Can employers refuse bereavement leave requests?</h3>

            <p>Employers cannot refuse statutory entitlements. This includes parental bereavement leave under Jack&apos;s Law and reasonable time off for dependant emergencies. Refusing these constitutes automatic unfair dismissal regardless of service length. For non-statutory situations, employers can refuse based on operational needs, though this risks damaging employee relations and morale.</p>

            <h3>How much notice must employees give for bereavement leave?</h3>

            <p>For statutory leave, employees must notify employers as soon as reasonably practicable. Jack&apos;s Law requires notification before the leave starts where possible, stating the date of death and intended leave dates. For dependant emergencies, employees should explain the situation and expected absence duration. Contractual policies might specify different notice requirements for non-statutory leave.</p>

            <h3>Does bereavement leave count towards Bradford Factor calculations?</h3>

            <p>Statutory bereavement leave shouldn&apos;t count towards <Link href="/blog/bradford-factor-explained" className="text-emerald-600 hover:underline font-medium">Bradford Factor</Link> scores or absence management procedures. Including it would likely constitute discrimination or detrimental treatment. Most employers exclude all bereavement leave from absence metrics, recognising that penalising grief undermines employee wellbeing and trust.</p>

            <h3>Can employees carry over unused bereavement leave?</h3>

            <p>Parental bereavement leave must be taken within 56 weeks of the child&apos;s death and cannot carry over beyond this period. Unlike <Link href="/blog/carry-over-annual-leave-uk" className="text-emerald-600 hover:underline font-medium">annual leave carry over</Link>, bereavement leave addresses specific events and timeframes. Contractual bereavement allowances typically don&apos;t accumulate year-to-year.</p>

            <h3>What happens if an employee is already on leave when bereavement occurs?</h3>

            <p>Employees can interrupt other leave types for bereavement. If someone experiences a qualifying bereavement during annual leave or sickness absence, they can switch to bereavement leave. This preserves their other entitlements and may provide better financial support, especially if your bereavement leave offers full pay whilst sick pay operates at reduced rates.</p>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Simplify Leave Management for Your Team</h3>
            <p className="text-emerald-100 mb-6">Handle bereavement leave sensitively whilst maintaining accurate records. Try Leavely free for 14 days.</p>
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
                Creating an Effective UK Sick Leave Policy &rarr;
              </Link>
              <Link href="/blog/flexible-working-uk" className="block text-emerald-600 hover:underline font-medium">
                Guide to Flexible Working Requests in the UK &rarr;
              </Link>
              <Link href="/blog/hr-software-small-business-uk" className="block text-emerald-600 hover:underline font-medium">
                Choosing HR Software for UK Small Businesses &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}