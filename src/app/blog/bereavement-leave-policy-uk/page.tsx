import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/bereavement-leave-policy-uk`

export const metadata: Metadata = {
  title: 'Bereavement Leave Policy UK: Free Template, Legal Rights & Best Practice (2026)',
  description:
    'Complete guide to bereavement leave in the UK. Covers legal rights, Jack&apos;s Law, free policy template, paid vs unpaid leave, cultural considerations, and how to support grieving employees.',
  alternates: { canonical: articleUrl },
  keywords: [
    'bereavement leave policy UK',
    'bereavement leave entitlement UK',
    'bereavement leave template',
    'Jack\'s Law bereavement',
    'parental bereavement leave UK',
    'paid bereavement leave UK',
    'funeral leave UK',
  ],
  openGraph: {
    title: 'Bereavement Leave Policy UK — Free Template, Legal Rights & Best Practice',
    description: 'Legal rights, free policy template, and best practices for bereavement leave in the UK. Includes Jack\'s Law, manager guidance, and cultural considerations.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Bereavement Leave Policy UK: Free Template, Legal Rights & Best Practice',
  description: 'Complete guide to bereavement leave in the UK covering legal rights, free policy template, and best practices for employers.',
  url: articleUrl,
  datePublished: '2026-03-25',
  dateModified: '2026-03-25',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function BereavementLeavePolicyArticle() {
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
            Bereavement Leave Policy UK: Free Template, Legal Rights &amp; Best Practice
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Losing someone you love is one of the hardest experiences in life. For employers, having a clear bereavement leave policy isn&apos;t just good practice &mdash; it&apos;s a fundamental part of treating your people with dignity. Yet many UK businesses still don&apos;t have a written policy in place, leaving managers to make ad-hoc decisions and employees unsure of their rights. This guide covers the legal position, what most employers offer, a free policy template you can adopt today, and practical advice for supporting bereaved employees through their return to work.
            </p>

            <h2>Is there a legal right to bereavement leave in the UK?</h2>
            <p>
              The short answer is: <strong>not for general bereavements</strong>. There is no statutory right in the UK to paid or unpaid bereavement leave when an employee loses a spouse, parent, sibling, grandparent, or friend. The only specific statutory entitlement is <strong>parental bereavement leave</strong>, which applies when a parent loses a child under 18.
            </p>
            <p>
              That said, employees do have a statutory right to <strong>time off for dependants</strong> in emergencies, which can include making arrangements following a death. And many employers choose to go well beyond the legal minimum by offering contractual bereavement leave as part of their benefits package.
            </p>
            <p>
              Let&apos;s look at each of these in detail.
            </p>

            <h2>Parental Bereavement Leave: Jack&apos;s Law explained</h2>
            <p>
              The <strong>Parental Bereavement (Leave and Pay) Act 2018</strong>, commonly known as <strong>Jack&apos;s Law</strong>, came into force on 6 April 2020. It was named in memory of Jack Herd, whose mother Lucy campaigned for statutory bereavement rights after losing her son in a drowning accident.
            </p>
            <p>
              Jack&apos;s Law gives bereaved parents the following entitlements:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Leave:</strong> 2 weeks&apos; leave, which can be taken as a single two-week block or as two separate weeks at any point within 56 weeks of the child&apos;s death.</li>
              <li><strong>Eligibility for leave:</strong> All employees are eligible from day one of employment. There is no qualifying period.</li>
              <li><strong>Pay:</strong> Statutory Parental Bereavement Pay (SPBP) is available at &pound;184.03 per week or 90% of the employee&apos;s average weekly earnings, whichever is lower (2025/26 rates).</li>
              <li><strong>Eligibility for pay:</strong> The employee must have at least 26 weeks&apos; continuous service by the week before the child&apos;s death, and earn at least the Lower Earnings Limit (&pound;123 per week).</li>
              <li><strong>Scope:</strong> Applies to the death of a child under 18, or a stillbirth after 24 weeks of pregnancy.</li>
              <li><strong>Who qualifies:</strong> Biological parents, adoptive parents, intended parents in a surrogacy arrangement, foster parents, and partners of any of these who live with the child in an enduring family relationship.</li>
              <li><strong>Protection:</strong> Employees are protected from dismissal or detriment for taking or seeking to take parental bereavement leave.</li>
            </ul>
            <p>
              Jack&apos;s Law represented a significant step forward, but it only covers one specific &mdash; and thankfully rare &mdash; type of bereavement. For all other losses, employees must rely on their employer&apos;s goodwill or contractual policy.
            </p>

            <h2>Time off for dependants: the emergency right</h2>
            <p>
              Under <strong>Section 57A of the Employment Rights Act 1996</strong>, all employees have the right to take a <strong>reasonable amount of unpaid time off</strong> to deal with emergencies involving a dependant. This includes situations where a dependant dies. Key points:
            </p>
            <ul className="list-disc pl-6">
              <li>The right is <strong>unpaid</strong> &mdash; there is no statutory obligation to pay employees for this time.</li>
              <li>It covers only the time needed to deal with the <strong>immediate emergency</strong> &mdash; typically 1&ndash;2 days to make funeral arrangements or deal with urgent practicalities.</li>
              <li>A <strong>dependant</strong> is defined as a spouse, civil partner, child, parent, or someone who lives in the same household (excluding tenants, lodgers, or employees).</li>
              <li>The right applies from <strong>day one</strong> of employment with no qualifying period.</li>
              <li>Employees must tell their employer the reason for their absence <strong>as soon as reasonably practicable</strong>.</li>
            </ul>
            <p>
              This right is not a substitute for bereavement leave. It&apos;s designed for dealing with the immediate practical aftermath, not for grieving. If a parent dies on a Tuesday, this right might cover Wednesday and Thursday to register the death and contact the funeral director &mdash; but it wouldn&apos;t cover the weeks of grief that follow. That&apos;s why a proper bereavement leave policy is so important.
            </p>

            <h2>Bereavement leave vs compassionate leave: what&apos;s the difference?</h2>
            <p>
              These terms are often used interchangeably, but there is a subtle distinction:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Bereavement leave</strong> specifically refers to time off following a death.</li>
              <li><strong>Compassionate leave</strong> is a broader term that can also cover serious illness of a family member, a life-threatening diagnosis, a house fire, or other traumatic events.</li>
            </ul>
            <p>
              In practice, many employers use a single <strong>compassionate leave policy</strong> that covers both bereavements and other serious personal emergencies. Others prefer separate policies so they can offer different entitlements for each. Either approach works &mdash; the important thing is that your policy is clear, written down, and communicated to all employees.
            </p>

            <h2>What do most UK employers offer?</h2>
            <p>
              While there&apos;s no legal requirement (beyond Jack&apos;s Law and time off for dependants), the vast majority of UK employers offer some form of paid bereavement leave. Based on CIPD data and typical HR practice:
            </p>
            <table>
              <thead>
                <tr>
                  <th>Relationship</th>
                  <th>Typical entitlement</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Spouse, partner, or child</td>
                  <td>5 days&apos; paid leave</td>
                </tr>
                <tr>
                  <td>Parent</td>
                  <td>3&ndash;5 days&apos; paid leave</td>
                </tr>
                <tr>
                  <td>Sibling</td>
                  <td>3 days&apos; paid leave</td>
                </tr>
                <tr>
                  <td>Grandparent or grandchild</td>
                  <td>2&ndash;3 days&apos; paid leave</td>
                </tr>
                <tr>
                  <td>In-law (parent, sibling)</td>
                  <td>2&ndash;3 days&apos; paid leave</td>
                </tr>
                <tr>
                  <td>Aunt, uncle, cousin</td>
                  <td>1&ndash;2 days&apos; paid leave</td>
                </tr>
                <tr>
                  <td>Close friend</td>
                  <td>1 day&apos;s paid leave (or funeral day only)</td>
                </tr>
              </tbody>
            </table>
            <p>
              Some progressive employers offer a flat entitlement &mdash; for example, 5 days for any bereavement &mdash; to avoid the uncomfortable process of ranking grief by relationship. This approach is simpler to administer and avoids difficult conversations about who &quot;counts&quot; as close enough.
            </p>

            <h3>Paid vs unpaid bereavement leave</h3>
            <p>
              Most employers pay bereavement leave at the employee&apos;s normal rate. However, there is no legal obligation to do so (except for SPBP under Jack&apos;s Law). When deciding whether to offer paid leave, consider:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Retention:</strong> Paid bereavement leave is a relatively low-cost benefit that generates enormous goodwill. Employees remember how they were treated during their worst moments.</li>
              <li><strong>Equity:</strong> Unpaid bereavement leave disproportionately affects lower-paid employees who can&apos;t afford to take time off without pay.</li>
              <li><strong>Budget:</strong> For a small business, 3&ndash;5 days&apos; paid leave per bereavement is a manageable cost that arises infrequently.</li>
              <li><strong>Reputation:</strong> In an era of Glassdoor reviews and employer branding, a mean-spirited approach to bereavement leave can damage your ability to attract talent.</li>
            </ul>

            <h2>Who should be covered by your policy?</h2>
            <p>
              One of the trickiest parts of drafting a bereavement leave policy is deciding which relationships should qualify. Here are the categories to consider:
            </p>

            <h3>Immediate family</h3>
            <p>
              Almost all policies cover spouse or partner, children (including stepchildren and adopted children), and parents. These are the relationships where the greatest entitlement is typically offered.
            </p>

            <h3>Extended family</h3>
            <p>
              Siblings, grandparents, grandchildren, in-laws, aunts, uncles, and cousins are commonly included with a shorter entitlement. Consider whether step-relatives and half-siblings should be explicitly mentioned.
            </p>

            <h3>Close friends and other significant people</h3>
            <p>
              This is where policies often become vague. Not everyone has a traditional family structure. Some employees may be closer to a long-standing friend, a mentor, or a chosen family member than to a biological relative. Consider offering at least one day&apos;s leave for the funeral of a close friend, or giving managers discretion to approve bereavement leave for significant relationships that fall outside the standard list.
            </p>

            <h3>Pets</h3>
            <p>
              An increasing number of employees consider their pets to be family members. While it would be unusual to offer formal bereavement leave for pets, some employers allow a day&apos;s leave at the manager&apos;s discretion. Others suggest using annual leave or working from home. If you decide not to include pets, do so respectfully &mdash; dismissing the grief someone feels after losing a pet can damage trust.
            </p>

            <h2>Cultural and religious considerations</h2>
            <p>
              Grief and mourning practices vary significantly across cultures and religions. A good bereavement leave policy should be sensitive to these differences:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Timing of funerals:</strong> In Islam and Judaism, burial typically takes place within 24&ndash;48 hours of death. Your policy should allow employees to take leave at short notice.</li>
              <li><strong>Mourning periods:</strong> Hindu mourning traditions last 13 days. Jewish shiva lasts 7 days. Muslim mourning (iddah) for a spouse can last 4 months and 10 days. Consider whether your entitlement accommodates extended mourning with a mix of paid and unpaid leave.</li>
              <li><strong>Travel:</strong> Employees with family overseas may need additional time to travel for funerals. Consider allowing extra unpaid leave or annual leave in these circumstances.</li>
              <li><strong>Rituals and ceremonies:</strong> Some cultures have memorial services at set intervals (e.g., 40 days, 1 year). Consider allowing time off for these, even if it falls outside the initial bereavement period.</li>
            </ul>
            <p>
              The key principle is <strong>flexibility</strong>. You don&apos;t need to become an expert in every cultural tradition, but you should be willing to listen and accommodate where reasonably possible.
            </p>

            <h2>Free bereavement leave policy template</h2>
            <p>
              Below is a template you can adapt for your organisation. It covers the key sections every policy should include.
            </p>
            <div className="rounded-xl bg-gray-50 border p-6 my-6 text-sm">
              <p className="font-bold text-gray-900 mb-4 text-base">Bereavement Leave Policy</p>

              <p className="font-bold text-gray-900 mb-2">1. Purpose</p>
              <p className="mb-4">[Company name] recognises that the death of a family member or close friend is an extremely distressing experience. This policy sets out the bereavement leave entitlements available to all employees to allow time for grieving, making funeral arrangements, and dealing with practical matters.</p>

              <p className="font-bold text-gray-900 mb-2">2. Scope</p>
              <p className="mb-4">This policy applies to all employees from their first day of employment, regardless of length of service, contract type, or working pattern. Part-time employees receive the same number of days (not pro-rated).</p>

              <p className="font-bold text-gray-900 mb-2">3. Entitlement</p>
              <p className="mb-1"><strong>Death of a spouse, partner, or child:</strong> Up to 5 days&apos; paid leave.</p>
              <p className="mb-1"><strong>Death of a parent or sibling:</strong> Up to 5 days&apos; paid leave.</p>
              <p className="mb-1"><strong>Death of a grandparent, grandchild, or in-law:</strong> Up to 3 days&apos; paid leave.</p>
              <p className="mb-1"><strong>Death of an aunt, uncle, cousin, or close friend:</strong> Up to 2 days&apos; paid leave.</p>
              <p className="mb-4"><strong>Other bereavements:</strong> Up to 1 day&apos;s paid leave at the manager&apos;s discretion.</p>

              <p className="font-bold text-gray-900 mb-2">4. Parental bereavement</p>
              <p className="mb-4">In the event of the death of a child under 18 or a stillbirth after 24 weeks of pregnancy, employees are entitled to 2 weeks&apos; statutory parental bereavement leave under Jack&apos;s Law. This is in addition to the compassionate leave entitlement above. Eligible employees may also receive Statutory Parental Bereavement Pay (SPBP).</p>

              <p className="font-bold text-gray-900 mb-2">5. Pay</p>
              <p className="mb-4">Bereavement leave under this policy is paid at the employee&apos;s normal rate of pay. Any additional unpaid leave agreed under section 7 will be confirmed in writing.</p>

              <p className="font-bold text-gray-900 mb-2">6. Requesting leave</p>
              <p className="mb-4">Employees should notify their line manager as soon as reasonably practicable by phone, email, or text message. We understand that employees may not be in a position to make formal requests at the time of a bereavement. A colleague or family member may notify the manager on the employee&apos;s behalf. Where possible, an indication of the expected return date should be provided, but this is not required at the time of the initial notification.</p>

              <p className="font-bold text-gray-900 mb-2">7. Extensions</p>
              <p className="mb-4">If an employee needs additional time beyond the standard entitlement, they may request further time off. Options include additional unpaid leave, use of accrued annual leave, or a combination of both. All extension requests will be considered sympathetically on a case-by-case basis. We recognise that cultural and religious mourning practices may require extended periods of absence.</p>

              <p className="font-bold text-gray-900 mb-2">8. Evidence</p>
              <p className="mb-4">We do not routinely require evidence for bereavement leave. In cases of extended leave, we may sensitively request documentation such as a death certificate or funeral notice. We will never request evidence at the time of the initial notification.</p>

              <p className="font-bold text-gray-900 mb-2">9. Returning to work</p>
              <p className="mb-4">On return, the employee&apos;s line manager will hold a brief, supportive return-to-work conversation to check on their wellbeing and discuss any adjustments that may help, such as a phased return, temporary reduction in workload, or flexible working. Access to our Employee Assistance Programme (EAP) is available at any time. There is no expectation to &quot;be over it&quot; by the time you return.</p>

              <p className="font-bold text-gray-900 mb-2">10. Confidentiality</p>
              <p className="mb-0">The reason for a bereavement absence will only be shared with colleagues if the employee gives their explicit consent. Team calendars and absence records will show the employee as &quot;away&quot; without specifying the reason.</p>
            </div>
            <p>
              Feel free to adapt this template to suit your organisation&apos;s culture and size. If you use <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link>, you can set up bereavement leave as a dedicated leave type with its own allowance, approval workflow, and privacy controls.
            </p>

            <h2>Returning to work after bereavement</h2>
            <p>
              Coming back to work after losing someone is difficult. Grief doesn&apos;t have a fixed timeline, and employees may experience waves of emotion weeks or months after the death. Here&apos;s how to support a smooth return:
            </p>

            <h3>Phased return</h3>
            <p>
              Consider offering a phased return where the employee works reduced hours or days for the first week or two. This is particularly important after a significant loss such as a spouse or child. A phased return helps the employee readjust without being overwhelmed by a full workload from day one.
            </p>

            <h3>Adjusted duties</h3>
            <p>
              If the employee&apos;s role involves emotionally demanding work (e.g., customer-facing roles, care work, counselling), consider temporarily adjusting their responsibilities. A bereaved employee who normally handles complaints may struggle with emotionally charged interactions in the weeks after a loss.
            </p>

            <h3>Ongoing check-ins</h3>
            <p>
              Don&apos;t limit your support to the first day back. Schedule informal check-ins at one week, one month, and three months after the return. Anniversaries, birthdays, and holidays can trigger renewed grief &mdash; a sensitive manager will be aware of these dates and check in proactively.
            </p>

            <h3>Employee Assistance Programme (EAP)</h3>
            <p>
              Remind employees about any counselling or support services available to them. Many EAPs offer bereavement-specific counselling that can help employees process their grief. Make sure the information is easily accessible and regularly communicated, not buried in a staff handbook.
            </p>

            <h2>Manager guidance: having sensitive conversations</h2>
            <p>
              Many managers feel uncomfortable discussing bereavement because they&apos;re worried about saying the wrong thing. Here are practical guidelines:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Lead with empathy</strong> &mdash; when an employee tells you about a death, respond with compassion first. &quot;I&apos;m so sorry for your loss&quot; should come before any discussion about cover, handovers, or return dates.</li>
              <li><strong>Don&apos;t minimise the loss</strong> &mdash; avoid phrases like &quot;at least they lived a long life&quot; or &quot;you&apos;ll get through this.&quot; These are well-intentioned but can feel dismissive. Simply acknowledging the pain is more helpful.</li>
              <li><strong>Don&apos;t compare grief</strong> &mdash; never imply that one loss is &quot;worse&quot; than another. The death of an elderly parent can be just as devastating as any other loss. Grief is not a competition.</li>
              <li><strong>Take care of logistics</strong> &mdash; offer to handle the practical side. &quot;Don&apos;t worry about your workload &mdash; I&apos;ll sort out cover. Just focus on what you need right now.&quot;</li>
              <li><strong>Respect privacy</strong> &mdash; ask the employee what they&apos;d like colleagues to know, and respect their wishes. Some people want the team to be informed; others prefer to keep it private.</li>
              <li><strong>Be flexible on the return</strong> &mdash; if the employee isn&apos;t ready to come back after the standard entitlement, work with them to find a solution rather than applying pressure.</li>
              <li><strong>Follow up after return</strong> &mdash; a brief, private check-in a week or two after they return shows genuine care. Don&apos;t pretend nothing happened, but don&apos;t force the conversation either. &quot;I just wanted to check how you&apos;re doing&quot; is enough.</li>
              <li><strong>Know when to escalate</strong> &mdash; if an employee is showing signs of prolonged or complicated grief (inability to function, withdrawal, significant changes in behaviour), sensitively suggest professional support through your EAP or GP.</li>
            </ol>

            <h2>Common employer mistakes</h2>
            <p>
              Even well-meaning employers can get bereavement leave wrong. Here are the most common pitfalls to avoid:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>No written policy</strong> &mdash; relying on &quot;we&apos;ll deal with it when it happens&quot; leads to inconsistency. One employee gets five days; another in the same situation gets two. This creates resentment and potential discrimination claims.</li>
              <li><strong>Demanding evidence too early</strong> &mdash; asking a newly bereaved employee for a death certificate on day one is insensitive. Wait until after the immediate period of grief.</li>
              <li><strong>Forcing employees to use annual leave</strong> &mdash; requiring employees to use their holiday entitlement for bereavement sends a terrible message. Bereavement leave should be separate from annual leave.</li>
              <li><strong>Rigid relationship categories</strong> &mdash; a policy that only covers &quot;immediate family&quot; may exclude an employee who was raised by their grandparent, or who considers a stepparent as their primary parent. Build in some managerial discretion.</li>
              <li><strong>Ignoring cultural differences</strong> &mdash; a blanket &quot;3 days for all bereavements&quot; may be inadequate for employees whose cultural or religious practices require extended mourning periods.</li>
              <li><strong>No follow-up</strong> &mdash; assuming the employee is fine because they came back to work is a mistake. Grief is a long process, and ongoing support is essential.</li>
              <li><strong>Inconsistent application</strong> &mdash; applying the policy differently based on seniority, popularity, or the manager&apos;s personal judgement undermines trust and can lead to discrimination claims.</li>
              <li><strong>Treating it as a performance issue</strong> &mdash; if an employee&apos;s performance dips after a bereavement, address it with compassion and support, not a performance improvement plan.</li>
            </ul>

            <h2>How Leavely tracks bereavement and compassionate leave</h2>
            <p>
              Managing bereavement leave sensitively means having the right systems in place. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> makes it straightforward:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Dedicated leave types</strong> &mdash; set up bereavement leave and compassionate leave as separate categories, each with their own allowances, so they&apos;re tracked independently from annual leave and sick leave.</li>
              <li><strong>Instant approvals</strong> &mdash; managers can approve bereavement leave requests immediately from email, mobile, or the dashboard. No need for the employee to fill in lengthy forms during a difficult time.</li>
              <li><strong>Privacy controls</strong> &mdash; only managers and HR can see the reason for bereavement leave. Team calendars show the employee as &quot;away&quot; without exposing sensitive personal details.</li>
              <li><strong>Complete audit trail</strong> &mdash; every request is logged with dates, leave type, and approval status, ensuring consistent treatment and providing documentation if questions arise later.</li>
              <li><strong>Flexible configuration</strong> &mdash; configure different entitlements for different relationship categories or leave different policies for different employee groups.</li>
              <li><strong>Reporting</strong> &mdash; see usage patterns across your organisation to ensure your policy is adequate and being applied fairly.</li>
            </ul>

            <h2>Frequently asked questions</h2>

            <h3>How many days&apos; bereavement leave are employees entitled to in the UK?</h3>
            <p>
              There is no general statutory entitlement to bereavement leave in the UK, except for parental bereavement leave (2 weeks under Jack&apos;s Law). Most employers offer 3&ndash;5 days&apos; paid leave for immediate family and 1&ndash;3 days for other relationships, but this is a contractual benefit, not a legal right.
            </p>

            <h3>Do I have to pay employees during bereavement leave?</h3>
            <p>
              There is no legal obligation to pay employees during bereavement leave (except for SPBP under Jack&apos;s Law). However, the vast majority of UK employers offer paid bereavement leave as a standard benefit. The cost is relatively low and the impact on employee loyalty and morale is significant.
            </p>

            <h3>Can an employee be dismissed for taking bereavement leave?</h3>
            <p>
              Dismissing an employee for taking reasonable bereavement leave would likely be found to be unfair dismissal (if the employee has 2 years&apos; service) and could give rise to discrimination claims if the bereavement is linked to a protected characteristic (e.g., cultural mourning practices). For parental bereavement leave, there is specific statutory protection against dismissal or detriment.
            </p>

            <h3>Should bereavement leave cover miscarriage?</h3>
            <p>
              Jack&apos;s Law covers stillbirths after 24 weeks of pregnancy but does not cover miscarriage. However, many progressive employers now include miscarriage in their bereavement leave policy, recognising the profound grief that pregnancy loss at any stage can cause. Some also extend this to partners of employees who experience miscarriage.
            </p>

            <h3>Is funeral leave the same as bereavement leave?</h3>
            <p>
              &quot;Funeral leave&quot; is sometimes used informally to describe time off for attending a funeral, particularly for more distant relationships. It&apos;s not a separate legal concept. Most bereavement leave policies include time for the funeral as part of the overall entitlement.
            </p>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Handle bereavement leave with compassion and consistency</h3>
            <p className="text-emerald-100 mb-6">Leavely lets you manage bereavement leave as a dedicated leave type with instant approvals, privacy controls, and full reporting.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/compassionate-leave-uk" className="block text-emerald-600 hover:underline font-medium">Compassionate Leave UK: Employer Guide &rarr;</Link>
              <Link href="/blog/parental-bereavement-leave-uk" className="block text-emerald-600 hover:underline font-medium">Parental Bereavement Leave UK: Employer&apos;s Guide &rarr;</Link>
              <Link href="/blog/time-off-for-dependants-uk" className="block text-emerald-600 hover:underline font-medium">Time Off for Dependants UK: Your Legal Obligations &rarr;</Link>
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
              <Link href="/blog/employee-wellbeing-strategy" className="block text-emerald-600 hover:underline font-medium">Employee Wellbeing Strategy: A Practical Guide &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
