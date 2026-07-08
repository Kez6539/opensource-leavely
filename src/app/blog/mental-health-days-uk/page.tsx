import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/mental-health-days-uk`

export const metadata: Metadata = {
  title: 'Mental Health Days at Work UK: Should Employers Offer Them?',
  description:
    'Should UK employers offer dedicated mental health days? Explore the legal position, the difference between sick leave and mental health days, policy design tips, and how to train managers.',
  alternates: { canonical: articleUrl },
  keywords: [
    'mental health days UK',
    'mental health days at work',
    'mental health leave UK',
    'mental health day off work UK',
    'mental health policy employers UK',
    'wellbeing days UK',
    'duvet days mental health',
    'stress leave UK employer',
  ],
  openGraph: {
    title: 'Mental Health Days at Work UK: Should Employers Offer Them?',
    description:
      'The case for and against dedicated mental health days, plus practical guidance for UK employers on policy design and legal considerations.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Mental Health Days at Work UK: Should Employers Offer Them?',
  description:
    'Should UK employers offer dedicated mental health days? Explore the legal position, sick leave vs mental health days, policy design, and manager training.',
  url: articleUrl,
  datePublished: '2026-03-13',
  dateModified: '2026-03-13',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function MentalHealthDaysArticle() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">People Strategy</span>
            <span className="text-xs text-gray-400 ml-3">7 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Mental Health Days at Work UK: Should Employers Offer Them?
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              The conversation around mental health at work has shifted dramatically. What was once a taboo subject is now front and centre of UK workplace policy. A growing number of employers are introducing dedicated &quot;mental health days&quot; &mdash; but what does that actually mean, is it legally distinct from sick leave, and should your business offer them?
            </p>

            <h2>What is a mental health day?</h2>
            <p>
              A mental health day is a day off work specifically intended for an employee to rest, recharge, and attend to their psychological wellbeing. Unlike a traditional sick day &mdash; which typically implies a physical or mental illness that prevents work &mdash; a mental health day is more <strong>preventative</strong>. The idea is to take a break <em>before</em> burnout, stress, or anxiety escalate into something more serious.
            </p>
            <p>
              Some employers frame these as standalone &quot;wellbeing days&quot; or <Link href="/blog/duvet-days-policy" className="text-emerald-600 hover:underline font-medium">duvet days</Link>. Others build them into a broader <Link href="/blog/employee-wellbeing-strategy" className="text-emerald-600 hover:underline font-medium">employee wellbeing strategy</Link>. The label matters less than the intent: giving people permission to prioritise their mental health without stigma.
            </p>

            <h2>The legal position in the UK</h2>
            <p>
              There is no specific UK law that requires employers to offer dedicated mental health days. However, several legal obligations are relevant:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Health and Safety at Work Act 1974</strong> &mdash; employers must ensure, so far as is reasonably practicable, the health (including mental health) and safety of employees.</li>
              <li><strong>Equality Act 2010</strong> &mdash; if an employee has a mental health condition that meets the definition of a disability, the employer has a duty to make reasonable adjustments. This could include allowing additional time off.</li>
              <li><strong>Statutory sick pay (SSP)</strong> &mdash; employees who are off work due to mental ill health are entitled to SSP on the same basis as any other illness, provided they meet the qualifying conditions.</li>
            </ul>
            <p>
              In short: you are not legally required to offer branded &quot;mental health days,&quot; but you <em>are</em> legally required to take mental health seriously as part of your duty of care.
            </p>

            <h2>Sick leave vs mental health days: what is the difference?</h2>
            <p>
              This is where many employers get confused. Here is a clear breakdown:
            </p>
            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>Sick leave</th>
                  <th>Mental health day</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>Trigger</strong></td><td>Employee is unwell and unable to work</td><td>Employee needs a proactive break for wellbeing</td></tr>
                <tr><td><strong>Legal status</strong></td><td>Statutory right (SSP after 4 days)</td><td>No statutory right; employer benefit</td></tr>
                <tr><td><strong>Notice</strong></td><td>Usually same-day notification</td><td>Varies by policy; some allow same-day, others require advance booking</td></tr>
                <tr><td><strong>Impact on absence records</strong></td><td>Recorded as sickness absence; may trigger <Link href="/blog/bradford-factor-explained" className="text-emerald-600 hover:underline font-medium">Bradford Factor</Link> review</td><td>Should <strong>not</strong> count as sickness absence</td></tr>
                <tr><td><strong>Return process</strong></td><td>May require <Link href="/blog/return-to-work-interview-questions" className="text-emerald-600 hover:underline font-medium">return-to-work interview</Link></td><td>Typically no formal return process</td></tr>
              </tbody>
            </table>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <p className="text-emerald-800 mb-0">
                <strong>Key point:</strong> If you introduce mental health days, keep them separate from your <Link href="/blog/sick-leave-policy-uk" className="text-emerald-600 hover:underline font-medium">sick leave policy</Link>. Mixing the two risks inflating sickness absence statistics and triggering absence management procedures unfairly.
              </p>
            </div>

            <h2>The case for offering mental health days</h2>
            <p>
              The statistics paint a compelling picture. Mental health conditions are the leading cause of sickness absence in the UK, accounting for over 50% of all working days lost. The Health and Safety Executive (HSE) reports that work-related stress, depression, and anxiety cost British businesses billions each year. Offering dedicated mental health days can:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Reduce long-term absence</strong> &mdash; a single preventative day off now can prevent weeks of stress-related sick leave later.</li>
              <li><strong>Improve retention</strong> &mdash; employees who feel their employer genuinely cares about their wellbeing are significantly more likely to stay.</li>
              <li><strong>Reduce presenteeism</strong> &mdash; people coming to work while mentally unwell are less productive and more error-prone than if they had taken a day to reset.</li>
              <li><strong>Normalise the conversation</strong> &mdash; having a formal policy signals that mental health is taken as seriously as physical health.</li>
              <li><strong>Attract talent</strong> &mdash; wellbeing benefits are increasingly a deciding factor for candidates, particularly among younger workers.</li>
            </ul>

            <h2>The case against (and how to address concerns)</h2>
            <p>
              Some employers worry that mental health days will be abused &mdash; essentially becoming &quot;free holidays.&quot; Others are concerned about the cost. Here is how to address these concerns:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>&quot;People will abuse it&quot;</strong> &mdash; research consistently shows that when employers offer wellbeing days, overall absence actually <em>decreases</em>. Trust your people. If a specific individual is misusing the policy, address it through your normal performance management process.</li>
              <li><strong>&quot;We cannot afford it&quot;</strong> &mdash; most employers offer 1&ndash;3 mental health days per year. Compare that to the average cost of a long-term mental health absence (28+ days), which CIPD estimates at thousands of pounds per case. Prevention is cheaper than cure.</li>
              <li><strong>&quot;It is hard to manage&quot;</strong> &mdash; this is where the right tools help. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> lets you create a separate &quot;Mental Health Day&quot; leave type so usage is tracked without mixing it into sick leave records.</li>
            </ul>

            <h2>How to design a mental health day policy</h2>
            <p>
              If you decide to offer mental health days, here is a framework for a clear, practical policy:
            </p>
            <h3>1. Define the entitlement</h3>
            <p>
              Most UK employers offering this benefit provide <strong>1&ndash;3 days per year</strong>, on top of the standard <Link href="/blog/annual-leave-entitlement-uk" className="text-emerald-600 hover:underline font-medium">annual leave entitlement</Link>. Some make them &quot;use it or lose it&quot; (no <Link href="/blog/carry-over-annual-leave-uk" className="text-emerald-600 hover:underline font-medium">carry-over</Link>) to encourage employees to actually take them.
            </p>
            <h3>2. Set the process</h3>
            <p>
              Keep the process simple. Many employers allow same-day requests with a brief notification to the line manager. Requiring a medical certificate or detailed reason defeats the purpose. A simple &quot;I am taking a mental health day&quot; should suffice.
            </p>
            <h3>3. Separate from sick leave</h3>
            <p>
              Create a distinct leave category. Mental health days should not trigger absence management reviews, <Link href="/blog/bradford-factor-explained" className="text-emerald-600 hover:underline font-medium">Bradford Factor calculations</Link>, or <Link href="/blog/return-to-work-interview-questions" className="text-emerald-600 hover:underline font-medium">return-to-work interviews</Link>.
            </p>
            <h3>4. Train your managers</h3>
            <p>
              A policy is only as good as the people implementing it. Train managers to:
            </p>
            <ul className="list-disc pl-6">
              <li>Respond supportively, not sceptically, when someone requests a mental health day.</li>
              <li>Recognise early signs of stress and proactively suggest a break.</li>
              <li>Know when to signpost to additional support (EAP, occupational health, GP).</li>
              <li>Keep the conversation confidential.</li>
            </ul>
            <h3>5. Review and iterate</h3>
            <p>
              Track usage (anonymously) and review the policy annually. Are people using the days? Has overall sickness absence changed? Use data to refine your approach.
            </p>

            <h2>How Leavely supports mental health leave</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> makes it easy to introduce mental health days alongside your existing leave types:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Custom leave types</strong> &mdash; create a &quot;Mental Health Day&quot; category with its own allowance, separate from annual leave and sick leave.</li>
              <li><strong>Privacy by design</strong> &mdash; team calendar shows the employee is off, but not the leave type, protecting confidentiality.</li>
              <li><strong>Simple requests</strong> &mdash; employees can book a mental health day from their phone in seconds, with no lengthy forms.</li>
              <li><strong>Reporting</strong> &mdash; track overall usage trends (anonymised) to measure the impact of your wellbeing initiatives.</li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Support your team&apos;s mental health</h3>
            <p className="text-emerald-100 mb-6">Try Leavely free for 14 days &mdash; custom leave types, privacy controls, and wellbeing reporting included.</p>
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
              <Link href="/blog/employee-wellbeing-strategy" className="block text-emerald-600 hover:underline font-medium">Employee Wellbeing Strategy: A Practical Guide &rarr;</Link>
              <Link href="/blog/sick-leave-policy-uk" className="block text-emerald-600 hover:underline font-medium">Sick Leave Policy UK: Complete Employer Guide &rarr;</Link>
              <Link href="/blog/duvet-days-policy" className="block text-emerald-600 hover:underline font-medium">Duvet Days Policy: Should Your Business Offer Them? &rarr;</Link>
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">Bradford Factor Explained: How to Use It Fairly &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
