import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/employee-wellbeing-strategy`

export const metadata: Metadata = {
  title: 'Employee Wellbeing Strategy UK: A Practical Guide for SMBs',
  description:
    'How to build an employee wellbeing strategy for your UK business. Covers mental health, physical wellbeing, financial wellbeing, HSE Management Standards, quick wins for SMBs, and measuring impact.',
  alternates: { canonical: articleUrl },
  keywords: [
    'employee wellbeing strategy',
    'employee wellbeing UK',
    'workplace wellbeing',
    'mental health at work UK',
    'staff wellbeing policy',
    'employee wellness programme UK',
  ],
  openGraph: {
    title: 'Employee Wellbeing Strategy UK — A Practical Guide for SMBs',
    description: 'Build a wellbeing strategy that actually works for your UK small business.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Employee Wellbeing Strategy UK: A Practical Guide for SMBs',
  description: 'How to build an employee wellbeing strategy for your UK business.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function EmployeeWellbeingStrategyArticle() {
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
            <span className="text-xs text-gray-400 ml-3">8 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Employee Wellbeing Strategy UK: A Practical Guide for SMBs
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Employee wellbeing isn&apos;t a buzzword &mdash; it&apos;s a business essential. In the UK, stress, anxiety, and depression account for over half of all working days lost to ill health. For small and medium-sized businesses, where every person counts, poor wellbeing hits even harder. This guide shows you how to build a practical wellbeing strategy that works for your team and your budget.
            </p>

            <h2>Why wellbeing matters for your business</h2>
            <p>
              The numbers speak for themselves. According to the Health and Safety Executive (HSE), <strong>17.1 million working days</strong> were lost to work-related stress, depression, and anxiety in the most recent reporting period. But the cost goes beyond sick days:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Presenteeism</strong> &mdash; employees who are physically at work but mentally unwell are estimated to cost UK employers more than absenteeism itself.</li>
              <li><strong>Staff turnover</strong> &mdash; people leave jobs that make them unhappy. Replacing an employee costs 6&ndash;9 months of their salary when you factor in recruitment, training, and lost productivity.</li>
              <li><strong>Employer brand</strong> &mdash; in a tight labour market, candidates look at how companies treat their people. Glassdoor reviews and word of mouth matter.</li>
              <li><strong>Legal risk</strong> &mdash; employers have a legal duty of care under the Health and Safety at Work Act 1974. Ignoring mental health can lead to personal injury claims, tribunal cases, and HSE enforcement.</li>
            </ul>
            <p>
              For SMBs, a single long-term sickness absence can disrupt an entire team. Investing in prevention is far cheaper than dealing with the consequences.
            </p>

            <h2>HSE Management Standards: your legal framework</h2>
            <p>
              The HSE&apos;s <strong>Management Standards</strong> provide a practical framework for managing work-related stress. They cover six key areas that affect employee wellbeing:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Demands</strong> &mdash; workload, work patterns, and the work environment. Are employees expected to do more than they can manage?</li>
              <li><strong>Control</strong> &mdash; how much say employees have in how they do their work. Autonomy reduces stress.</li>
              <li><strong>Support</strong> &mdash; the encouragement, resources, and sponsorship provided by the organisation and line managers.</li>
              <li><strong>Relationships</strong> &mdash; promoting positive working relationships and dealing with unacceptable behaviour (bullying, harassment).</li>
              <li><strong>Role</strong> &mdash; whether people understand their role within the organisation and whether the organisation avoids conflicting roles.</li>
              <li><strong>Change</strong> &mdash; how organisational change is managed and communicated.</li>
            </ol>
            <p>
              You don&apos;t need a formal stress policy to start. Simply assessing your business against these six areas will reveal where the pressure points are.
            </p>

            <h2>Physical wellbeing</h2>
            <p>
              Physical health is the foundation of overall wellbeing. For SMBs, physical wellbeing initiatives don&apos;t need to be expensive:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Workstation assessments</strong> &mdash; ensure desks, chairs, and monitors are set up correctly. Poor ergonomics cause musculoskeletal problems, which are the second largest cause of sickness absence in the UK.</li>
              <li><strong>Encourage movement</strong> &mdash; walking meetings, standing desks, lunchtime walks. Sitting for extended periods is linked to a range of health problems.</li>
              <li><strong>Health checks</strong> &mdash; some employers offer annual health checks or flu vaccinations. Even signposting NHS health checks is helpful.</li>
              <li><strong>Healthy food options</strong> &mdash; if you provide food or snacks, include healthy choices. It sounds simple, but it sends a signal.</li>
              <li><strong>Cycle-to-work schemes</strong> &mdash; salary sacrifice cycle schemes are cost-neutral for employers and encourage physical activity.</li>
            </ul>

            <h2>Mental wellbeing</h2>
            <p>
              Mental health is the area where employers can make the biggest difference &mdash; and where they most often fall short. Practical steps include:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Stress risk assessments</strong> &mdash; the HSE requires employers to assess the risk of work-related stress. Use their Management Standards approach or a simple survey to identify hotspots.</li>
              <li><strong>Employee Assistance Programme (EAP)</strong> &mdash; EAPs provide confidential counselling, legal advice, and financial guidance. They typically cost &pound;5&ndash;15 per employee per year &mdash; one of the best-value wellbeing investments you can make.</li>
              <li><strong>Mental health first aiders</strong> &mdash; train one or two team members in Mental Health First Aid. The course costs around &pound;300 per person and equips them to spot early signs and signpost support.</li>
              <li><strong>Workload management</strong> &mdash; the most common cause of work-related stress is unmanageable workload. Regular 1:1s where managers ask &quot;how are you coping?&quot; make a real difference.</li>
              <li><strong>Normalise the conversation</strong> &mdash; talk about mental health openly. When senior leaders share their own experiences, it gives everyone permission to be honest.</li>
              <li><strong>Flexible working</strong> &mdash; the ability to adjust hours or work from home when needed reduces pressure on employees managing health conditions, caring responsibilities, or personal difficulties.</li>
            </ul>

            <h2>Financial wellbeing</h2>
            <p>
              Financial stress affects mental health, productivity, and focus. Employers can help without spending much:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Fair pay</strong> &mdash; pay at least the Real Living Wage (&pound;12.60/hour outside London, &pound;13.85 in London as of 2025). It&apos;s an easy way to demonstrate that you value your people.</li>
              <li><strong>Pension auto-enrolment</strong> &mdash; you&apos;re legally required to offer it, but going beyond the minimum (3% employer contribution) shows commitment.</li>
              <li><strong>Salary sacrifice schemes</strong> &mdash; cycle-to-work, childcare vouchers, and pension salary sacrifice reduce tax and NI for both employee and employer.</li>
              <li><strong>Financial education</strong> &mdash; signpost free resources like MoneyHelper (the government&apos;s money guidance service) or invite a financial adviser to run a workshop.</li>
              <li><strong>Timely pay</strong> &mdash; pay on time, every time. It sounds obvious, but payroll errors or delays cause disproportionate stress.</li>
            </ul>

            <h2>Social wellbeing</h2>
            <p>
              Humans are social creatures. Connection at work protects against isolation, improves collaboration, and builds resilience:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Team activities</strong> &mdash; regular team lunches, socials, or volunteer days build bonds. They don&apos;t need to be expensive &mdash; a monthly team breakfast costs very little.</li>
              <li><strong>Flexible working</strong> &mdash; flexibility helps parents, carers, and anyone managing personal commitments. Since April 2024, employees have the right to request flexible working from day one.</li>
              <li><strong>Inclusion</strong> &mdash; ensure everyone feels they belong, regardless of background, identity, or working pattern. Remote and part-time workers are particularly at risk of feeling excluded.</li>
              <li><strong>Onboarding</strong> &mdash; a good onboarding experience sets the tone. Assign a buddy, introduce the new hire properly, and check in regularly during their first few months.</li>
              <li><strong>Recognition</strong> &mdash; a simple &quot;thank you&quot; or public acknowledgment of good work costs nothing but has a measurable impact on engagement and wellbeing.</li>
            </ul>

            <h2>Measuring wellbeing</h2>
            <p>
              You can&apos;t manage what you don&apos;t measure. Here are practical ways to track wellbeing in your organisation:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Staff surveys</strong> &mdash; anonymous pulse surveys (even 5 questions) give you a snapshot of how people are feeling. Run them quarterly.</li>
              <li><strong>Absence data</strong> &mdash; track sickness absence rates and patterns. Rising absence is often the first sign of a wellbeing problem.</li>
              <li><strong>Bradford Factor scores</strong> &mdash; frequent short-term absences (high Bradford Factor) can indicate stress, disengagement, or an underlying health issue.</li>
              <li><strong>Turnover rates</strong> &mdash; high turnover, especially in specific teams, suggests a systemic problem.</li>
              <li><strong>Exit interviews</strong> &mdash; ask leavers what they would change. People are often more honest on the way out.</li>
              <li><strong>Return-to-work conversations</strong> &mdash; RTW interviews after every absence give you qualitative data about what&apos;s driving sickness.</li>
            </ul>

            <h2>10 quick wins for SMBs</h2>
            <p>
              You don&apos;t need a big budget to make a difference. Here are 10 practical, low-cost actions you can take this month:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Set up an EAP</strong> &mdash; costs as little as &pound;5/employee/year and gives everyone access to confidential support.</li>
              <li><strong>Introduce flexible working</strong> &mdash; even one day a week of remote work or adjusted hours makes a difference.</li>
              <li><strong>Run a 5-question pulse survey</strong> &mdash; use a free tool like Google Forms. Ask about workload, support, and morale.</li>
              <li><strong>Train a mental health first aider</strong> &mdash; one trained person can change the culture of your entire team.</li>
              <li><strong>Hold walking meetings</strong> &mdash; get people moving and thinking at the same time.</li>
              <li><strong>Review workloads in 1:1s</strong> &mdash; make &quot;how are you coping with your workload?&quot; a standard question.</li>
              <li><strong>Recognise good work publicly</strong> &mdash; a shout-out in a team meeting costs nothing.</li>
              <li><strong>Check workstation setups</strong> &mdash; ask the HSE&apos;s online workstation assessment tool. It&apos;s free.</li>
              <li><strong>Share mental health resources</strong> &mdash; pin the Mind, Samaritans, and SHOUT helpline numbers on your notice board or intranet.</li>
              <li><strong>Track absence properly</strong> &mdash; move from spreadsheets to software so you can spot patterns early.</li>
            </ol>

            <h2>The role of leave management in wellbeing</h2>
            <p>
              Leave management might not seem like a wellbeing initiative, but it plays a surprisingly important role:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Taking leave reduces burnout</strong> &mdash; employees who use their full annual leave entitlement are less likely to burn out. If people aren&apos;t taking leave, that&apos;s a red flag.</li>
              <li><strong>Fair leave policies build trust</strong> &mdash; clear, consistent policies that are applied equally make people feel valued and respected.</li>
              <li><strong>Absence data reveals problems</strong> &mdash; rising sickness absence, frequent Monday/Friday absences, or clustering in specific teams can signal stress, bullying, or poor management.</li>
              <li><strong>Return-to-work conversations</strong> &mdash; well-handled RTW interviews show employees you care about their health, not just their output.</li>
            </ul>

            <h2>How Leavely supports employee wellbeing</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> helps you connect the dots between absence data and employee wellbeing:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Absence pattern detection</strong> &mdash; spot trends like rising sickness absence, frequent short-term absences, or employees not taking enough annual leave.</li>
              <li><strong>Bradford Factor as an early warning</strong> &mdash; automatic Bradford Factor calculation flags employees who may need support before the situation escalates.</li>
              <li><strong>Return-to-work forms</strong> &mdash; digital RTW interview templates ensure managers ask the right questions and document the conversation.</li>
              <li><strong>Leave balance visibility</strong> &mdash; employees can see their own balances, reducing uncertainty and encouraging them to take the leave they&apos;re entitled to.</li>
              <li><strong>Team calendar</strong> &mdash; managers can see at a glance who&apos;s off, making it easier to distribute workload fairly and avoid overburdening remaining team members.</li>
              <li><strong>Custom leave types</strong> &mdash; set up wellbeing days, volunteer days, or mental health days as dedicated leave types to encourage their use.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Use absence data to support employee wellbeing</h3>
            <p className="text-emerald-100 mb-6">Leavely helps you spot absence patterns early and take action before small problems become big ones.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/sick-leave-policy-uk" className="block text-emerald-600 hover:underline font-medium">Sick Leave Policy UK: What Employers Must Know &rarr;</Link>
              <Link href="/blog/absence-management-policy-uk" className="block text-emerald-600 hover:underline font-medium">Absence Management Policy UK: Complete Guide &rarr;</Link>
              <Link href="/blog/flexible-working-uk" className="block text-emerald-600 hover:underline font-medium">Flexible Working UK: Rights and Employer Guide &rarr;</Link>
              <Link href="/blog/duvet-days-policy" className="block text-emerald-600 hover:underline font-medium">Duvet Days Policy: Should Your Business Offer Them? &rarr;</Link>
              <Link href="/blog/length-of-service-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Length of Service Entitlement: Extra Holiday for Loyalty &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
