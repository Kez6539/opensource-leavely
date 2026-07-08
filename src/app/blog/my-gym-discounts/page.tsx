import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/my-gym-discounts`

export const metadata: Metadata = {
  title: 'My Gym Discounts: A UK HR Guide to Employee Wellbeing Perks',
  description: 'How UK SMBs can offer gym discounts as part of a wellbeing strategy. Tax treatment, salary sacrifice rules, provider comparison and practical setup advice.',
  alternates: { canonical: articleUrl },
  keywords: [
    'my gym discounts',
    'employee gym discounts UK',
    'corporate gym membership UK',
    'employee wellbeing benefits',
    'gym benefit salary sacrifice',
    'staff wellness perks UK',
    'employee benefits SMB',
  ],
  openGraph: {
    title: 'My Gym Discounts: A UK HR Guide to Employee Wellbeing Perks',
    description: 'How UK SMBs can offer gym discounts as part of a wellbeing strategy. Tax treatment, salary sacrifice rules, provider comparison and practical setup advice.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'My Gym Discounts: A UK HR Guide to Employee Wellbeing Perks',
  description: 'How UK SMBs can offer gym discounts as part of a wellbeing strategy. Tax treatment, salary sacrifice rules, provider comparison and practical setup advice.',
  url: articleUrl,
  datePublished: '2026-06-08',
  dateModified: '2026-06-08',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function MyGymDiscountsPage() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">EMPLOYEE BENEFITS</span>
            <span className="text-xs text-gray-400 ml-3">11 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            My Gym Discounts: A UK HR Guide to Setting Up Employee Wellness Perks
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p>
              Last month an operations director at a 40-person logistics firm rang me in a slight panic. She&apos;d promised her CEO a &quot;gym discount scheme&quot; as part of the new wellbeing package, told finance it would be free, and then discovered her employees were asking whether the company would pay, whether it would show on their payslip, and whether they had to use a specific gym chain. She&apos;d budgeted nothing, designed nothing, and the launch date was a fortnight away.
            </p>
            <p>
              This is the &quot;my gym discounts&quot; problem in miniature. Employees search the phrase because they want to know what their employer&apos;s perk actually gets them. HR teams promise the perk because it sounds cheap and modern. Almost nobody, on either side, understands the tax position, the salary sacrifice rules, or the difference between a genuine corporate rate and a glorified marketing flyer.
            </p>
            <p>
              This guide is for the HR manager or business owner trying to design something that actually works. I&apos;ll cover how UK gym discount schemes are structured, what HMRC says about benefits in kind, the salary sacrifice rules that changed in 2017, how to compare the main providers, and how to communicate the scheme so employees actually use it. There&apos;s a worked cost example, a provider comparison table, and the questions employees ask most often.
            </p>

            <h2>What &quot;my gym discounts&quot; actually means</h2>
            <p>
              When an employee logs into a benefits portal and sees &quot;my gym discounts&quot;, they could be looking at one of four very different things. The legal, tax, and practical implications vary significantly between them.
            </p>
            <ul>
              <li><strong>A negotiated corporate rate.</strong> The employer has an agreement with a chain (PureGym, Nuffield Health, Bannatyne, Virgin Active and so on) for a percentage off the standard membership. The employee pays the gym directly. The employer pays nothing.</li>
              <li><strong>A salary sacrifice gym scheme.</strong> The employee gives up part of their gross salary in exchange for paid membership. This sounds tax efficient but, since April 2017, almost no gym schemes actually deliver tax savings.</li>
              <li><strong>An employer-paid membership.</strong> The company pays for the gym entirely. This is a taxable benefit in kind and must go on a P11D or be payrolled.</li>
              <li><strong>A platform-based discount aggregator.</strong> Services like Perkbox, Reward Gateway, Vivup or Heka offer discount catalogues that include gym brands. The employer pays a per-user subscription.</li>
            </ul>
            <p>
              Each of these has a different price tag, a different administrative burden, and a different conversation with payroll. Picking the wrong one is how schemes either bankrupt the wellbeing budget or get ignored by employees within three months.
            </p>

            <h2>The tax position: what HMRC actually says</h2>
            <p>
              The single biggest mistake I see is treating gym membership as a tax-free perk. It isn&apos;t, with one narrow exception. Under the Income Tax (Earnings and Pensions) Act 2003, any benefit provided to an employee by reason of their employment is taxable unless a specific exemption applies.
            </p>
            <p>
              The exemption people sometimes cite is section 261 ITEPA, which covers recreational benefits provided on the employer&apos;s premises. If you have an on-site gym available to all staff, the cost is exempt. A subsidised membership at an external gym chain is not exempt and is fully taxable as a benefit in kind.
            </p>
            <p>
              The Optional Remuneration Arrangements (OpRA) rules introduced in April 2017 also closed off most of the salary sacrifice planning that used to exist around gym memberships. Where an employee gives up salary in exchange for a gym benefit, the taxable value is now the higher of the salary given up or the cash equivalent of the benefit. In practical terms, salary sacrifice no longer saves the employee or employer any income tax or National Insurance on gym membership. It only saves money if the corporate rate negotiated with the gym is genuinely lower than what the employee could get themselves.
            </p>
            <p>
              The clean answer: a discount-only scheme (employee pays the gym, gets a corporate rate) creates no tax issue at all and no P11D reporting. Anything where the employer pays or part-pays the membership is taxable and needs payrolling or P11D treatment.
            </p>

            <h2>What gym schemes actually cost</h2>
            <p>
              Let&apos;s put real numbers on this. Imagine a 50-employee business considering three options. Take-up assumed at 30% (which is generous, the realistic figure for most employee benefit schemes sits between 15% and 25%).
            </p>

            <table>
              <thead>
                <tr>
                  <th>Option</th>
                  <th>Annual cost to employer</th>
                  <th>Cost per employee using it</th>
                  <th>Tax treatment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Negotiated corporate rate (employee pays)</td>
                  <td>&pound;0</td>
                  <td>&pound;0</td>
                  <td>No BIK, no reporting</td>
                </tr>
                <tr>
                  <td>Benefits platform subscription</td>
                  <td>&pound;3,000 to &pound;9,000</td>
                  <td>&pound;60 to &pound;180</td>
                  <td>No BIK on discounts; platform fee is a business expense</td>
                </tr>
                <tr>
                  <td>Employer pays 50% of gym membership</td>
                  <td>&pound;5,400 (15 staff x &pound;30/month x 12)</td>
                  <td>&pound;360</td>
                  <td>BIK, payrolled or P11D, Class 1A NI of &pound;745</td>
                </tr>
                <tr>
                  <td>Employer pays 100% of gym membership</td>
                  <td>&pound;10,800</td>
                  <td>&pound;720</td>
                  <td>BIK, payrolled or P11D, Class 1A NI of &pound;1,490</td>
                </tr>
              </tbody>
            </table>

            <p>
              The numbers explain why most UK SMBs land on either a free corporate rate scheme or a platform subscription. Direct payment of gym memberships looks generous on paper but the combined cost of the benefit, employer Class 1A National Insurance at 13.8%, and the admin burden rarely justifies it unless gym access is core to the business identity.
            </p>

            <h2>Comparing the main UK providers</h2>
            <p>
              The market for &quot;my gym discounts&quot; schemes has consolidated. Most SMBs end up choosing between a direct relationship with a national gym chain and one of the established benefits platforms. Here&apos;s a quick comparison based on what I see HR teams actually using.
            </p>

            <table>
              <thead>
                <tr>
                  <th>Provider type</th>
                  <th>Typical discount</th>
                  <th>Cost to employer</th>
                  <th>Best for</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>PureGym corporate</td>
                  <td>Up to 25% off standard rate</td>
                  <td>Free (minimum staff numbers apply)</td>
                  <td>Budget-conscious teams, multi-site businesses</td>
                </tr>
                <tr>
                  <td>Nuffield Health corporate</td>
                  <td>10% to 20% off plus health checks</td>
                  <td>Free for the discount tier</td>
                  <td>Office-based teams wanting health screening</td>
                </tr>
                <tr>
                  <td>Hussle (formerly PayasUgym)</td>
                  <td>Multi-gym pass, varying discounts</td>
                  <td>Free or low-cost B2B option</td>
                  <td>Hybrid teams across multiple locations</td>
                </tr>
                <tr>
                  <td>Perkbox / Reward Gateway / Vivup</td>
                  <td>Bundled discounts across gyms plus retail</td>
                  <td>&pound;5 to &pound;15 per user per month</td>
                  <td>Businesses wanting a full perks catalogue</td>
                </tr>
                <tr>
                  <td>GymFlex (Sodexo)</td>
                  <td>Salary sacrifice gym membership</td>
                  <td>Admin fee per employee</td>
                  <td>Larger employers with established sacrifice schemes</td>
                </tr>
              </tbody>
            </table>

            <p>
              A piece of practical advice: don&apos;t pay for a benefits platform just to deliver gym discounts. The cost-per-user maths only works if employees also engage with the cinema vouchers, supermarket discounts, retail offers and wellbeing content. If gym access is the only thing you actually want, a direct corporate agreement is almost always better value.
            </p>

            <h2>Why gym schemes flop (and how to stop yours from joining them)</h2>
            <p>
              I&apos;ve audited dozens of employee benefits in the last few years. Gym schemes are consistently the most expensive per active user because uptake is so low. The typical pattern: a flurry of sign-ups in the first month, half drop off by month four, and by the end of year one fewer than 10% of the workforce are using it.
            </p>
            <p>
              The reasons are predictable.
            </p>
            <ul>
              <li><strong>Location mismatch.</strong> A national chain discount is useless if the nearest branch is 40 minutes from the office or the employee&apos;s home.</li>
              <li><strong>Wrong demographic.</strong> Younger workforces prefer flexible multi-gym passes. Older workforces often value health screenings, swimming pools or classes more than weights.</li>
              <li><strong>Poor communication.</strong> The scheme launches with a single email, then disappears from internal communications. New starters never hear about it.</li>
              <li><strong>Friction at sign-up.</strong> If employees have to email HR for a code, ring the gym, prove employment, and wait three days, most give up.</li>
              <li><strong>No alignment with wider wellbeing.</strong> A gym discount in isolation doesn&apos;t move the dial. Combined with mental health support, flexible hours, and proper leave management, it does.</li>
            </ul>
            <p>
              The last point is the one HR leaders underestimate. Wellbeing isn&apos;t a perk catalogue. It&apos;s a system. Employees with proper holiday entitlement they actually take, sensible workloads, and the ability to flex their hours are the ones who use gym memberships. Employees burning out on excessive overtime never set foot in the place.
            </p>

            <h2>How a gym scheme fits into a proper wellbeing strategy</h2>
            <p>
              The CIPD&apos;s annual Health and Wellbeing at Work survey consistently shows that physical health interventions only work when they sit alongside time-off practices, mental health support, and good line management. ACAS guidance on managing workplace wellbeing makes the same point. A gym discount is a tactical perk, not a strategy.
            </p>
            <p>
              The average UK absence rate is approximately 7.8 days per employee per year, and the Chartered Institute of Personnel and Development estimates that around 22% of absence is stress-related. If your wellbeing budget can only do one thing, fixing how leave and workload are managed will produce a bigger return than any gym scheme. Read our guides on <Link href="/blog/sick-leave-policy-uk" className="text-emerald-600 hover:underline font-medium">sick leave policy</Link> and the <Link href="/blog/bradford-factor-explained" className="text-emerald-600 hover:underline font-medium">Bradford Factor</Link> for the absence management side.
            </p>
            <p>
              That said, when the basics are in place, a well-run gym scheme genuinely helps. The trick is to position it as part of a wider package: <Link href="/blog/flexible-working-uk" className="text-emerald-600 hover:underline font-medium">flexible working</Link>, generous and properly tracked <Link href="/blog/annual-leave-entitlement-uk" className="text-emerald-600 hover:underline font-medium">annual leave</Link>, sensible <Link href="/blog/carry-over-annual-leave-uk" className="text-emerald-600 hover:underline font-medium">carry-over rules</Link>, and access to gym discounts as the icing.
            </p>

            <h2>Setting up your scheme: a practical checklist</h2>
            <p>
              If you&apos;re building this from scratch, work through these steps in order. Skipping any of them tends to cause problems later.
            </p>
            <ol>
              <li><strong>Survey staff first.</strong> Ask whether they currently belong to a gym, which chain, and what would make them join one. A 10-minute survey saves thousands of pounds in wrong-fit contracts.</li>
              <li><strong>Decide the model.</strong> Free corporate rate, paid platform, or employer-funded. Confirm the tax treatment with your accountant before promising anything.</li>
              <li><strong>Negotiate properly.</strong> Most national chains have tiered corporate schemes. A 50-employee business should not be paying the same rate as a 5-employee business.</li>
              <li><strong>Document the policy.</strong> Eligibility, joining process, what happens when employees leave, and whether the discount survives probation. Get this into the staff handbook.</li>
              <li><strong>Brief payroll.</strong> If there&apos;s any element of employer contribution or salary sacrifice, payroll needs to know exactly how it&apos;s being processed.</li>
              <li><strong>Communicate on a schedule.</strong> Launch announcement, follow-up at month one, reminder in January (peak gym sign-up season), and inclusion in the new-starter induction pack.</li>
              <li><strong>Measure uptake quarterly.</strong> If after six months fewer than 15% of staff are using it, change provider or change the model.</li>
            </ol>

            <h2>How Leavely helps</h2>
            <p>
              Leavely is a UK leave management platform built for SMBs. We don&apos;t sell gym discounts, but we do solve the part of the wellbeing puzzle that has to come first: making sure employees can take their leave, that managers can see capacity at a glance, and that absence patterns are visible rather than buried in a shared spreadsheet.
            </p>
            <p>
              The reason this matters for any gym or wellbeing scheme is straightforward. If your <Link href="/blog/staff-holiday-tracker-uk" className="text-emerald-600 hover:underline font-medium">holiday tracking</Link> is chaotic, employees don&apos;t take their full entitlement, presenteeism creeps in, and no amount of discounted PureGym membership compensates. Leavely gives you proper visibility on annual leave, sickness, and other absence types, with <Link href="/blog/employee-self-service-hr" className="text-emerald-600 hover:underline font-medium">employee self-service</Link> so requests don&apos;t clog up email.
            </p>
            <p>
              Pricing is straightforward: &pound;8 per user per month for all features, with a 14-day free trial and no credit card required. If you&apos;re reviewing your benefits stack and want to start with the foundation, see our overviews of <Link href="/blog/hr-software-small-business-uk" className="text-emerald-600 hover:underline font-medium">HR software for small businesses</Link> and the <Link href="/blog/best-leave-management-software-uk" className="text-emerald-600 hover:underline font-medium">best leave management software in the UK</Link>.
            </p>

            <h2>Frequently asked questions</h2>

            <h3>Are gym memberships paid by an employer taxable in the UK?</h3>
            <p>
              Yes, in almost all cases. Where the employer pays or contributes to an external gym membership, the value is a benefit in kind under ITEPA 2003. It must be reported on a P11D or processed through payrolled benefits, and the employer pays Class 1A National Insurance at 13.8%. The only common exemption is an on-site gym facility available to all employees under section 261 ITEPA.
            </p>

            <h3>Does salary sacrifice still work for gym memberships?</h3>
            <p>
              Not in any meaningful sense since April 2017. The Optional Remuneration Arrangements rules mean the taxable value is the higher of the salary given up or the benefit&apos;s cash equivalent, so the income tax and NI savings have effectively been removed. Salary sacrifice is now only worth using if the employer&apos;s negotiated corporate rate is genuinely cheaper than the public membership price.
            </p>

            <h3>What&apos;s the cheapest way to offer gym discounts?</h3>
            <p>
              A direct corporate agreement with a national chain like PureGym, Nuffield Health or Bannatyne is usually free for the employer. The employee pays the gym, gets a percentage off the standard rate, and there&apos;s no tax reporting required. This is the lowest cost, lowest admin option and works well for most SMBs.
            </p>

            <h3>Do I need to put the scheme in employment contracts?</h3>
            <p>
              No, a discretionary benefit shouldn&apos;t go in contracts because that makes it a contractual entitlement you can&apos;t withdraw. Put the details in the staff handbook with clear language stating the scheme is non-contractual and can be amended or withdrawn at the employer&apos;s discretion. This is standard practice for all discretionary benefits.
            </p>

            <h3>What take-up should I expect from a gym discount scheme?</h3>
            <p>
              Realistic uptake for a typical SMB sits between 15% and 25% of eligible employees. Anything above 30% is exceptional and usually reflects a young, urban workforce with the gym chain within walking distance of the office. If you&apos;re forecasting 50% uptake to justify the cost, the numbers won&apos;t land.
            </p>

            <h3>Should we offer gym discounts or invest in leave and flexibility instead?</h3>
            <p>
              If the choice is binary, leave and flexibility win every time. Stress-related absence accounts for around 22% of UK sickness days and is driven by workload, not lack of gym access. Get proper leave management, flexible working policies, and absence reporting in place first. Add a gym discount scheme once the foundations are working, where it complements the wider package rather than carrying it.
            </p>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Build the foundation before the perks</h3>
            <p className="text-emerald-100 mb-6">Leavely makes leave, sickness and absence visible so your wellbeing strategy actually works. &pound;8 per user, 14-day free trial, no card required.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/flexible-working-uk" className="block text-emerald-600 hover:underline font-medium">
                Flexible Working in the UK: A Practical Guide for SMBs &rarr;
              </Link>
              <Link href="/blog/sick-leave-policy-uk" className="block text-emerald-600 hover:underline font-medium">
                Writing a Sick Leave Policy That Actually Works &rarr;
              </Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">
                UK Annual Leave Entitlement: The Complete Guide &rarr;
              </Link>
              <Link href="/blog/employee-self-service-hr" className="block text-emerald-600 hover:underline font-medium">
                Why Employee Self-Service Changes HR for Small Teams &rarr;
              </Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}