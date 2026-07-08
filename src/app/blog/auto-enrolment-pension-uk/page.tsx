import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/auto-enrolment-pension-uk`

export const metadata: Metadata = {
  title: 'Auto Enrolment Pension UK: Employer Guide to Workplace Pensions (2026)',
  description:
    'Auto enrolment pension explained for UK employers. Who qualifies, contribution rates, opt-out rules, penalties, and choosing a pension provider.',
  alternates: { canonical: articleUrl },
  keywords: [
    'auto enrolment pension UK',
    'workplace pension employer',
    'pension auto enrolment',
    'employer pension obligations UK',
    'auto enrolment contributions',
    'workplace pension setup',
  ],
  openGraph: {
    title: 'Auto Enrolment Pension UK: Employer Guide to Workplace Pensions (2026)',
    description: 'Who qualifies, contribution rates, opt-out rules, penalties, and choosing a pension provider.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Auto Enrolment Pension UK: Employer Guide to Workplace Pensions (2026)',
  description: 'Auto enrolment pension explained for UK employers.',
  url: articleUrl,
  datePublished: '2026-04-04',
  dateModified: '2026-04-04',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function AutoEnrolmentPensionArticle() {
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
            Auto Enrolment Pension UK: Employer Guide to Workplace Pensions (2026)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Every UK employer, no matter how small, must provide a workplace pension and automatically enrol eligible employees. The rules have been in force since 2012, but many small businesses still struggle with the details. This guide explains who qualifies, what you must contribute, how opt-outs work, and what happens if you get it wrong.
            </p>

            <h2>What is auto enrolment?</h2>
            <p>
              Auto enrolment is the legal requirement for employers to set up a workplace pension scheme and enrol eligible employees into it. The employer must make contributions alongside the employee&apos;s own contributions. The aim is to ensure that everyone who works builds up pension savings for retirement.
            </p>
            <p>
              It applies to all employers with at least one employee. There are no exemptions based on company size, sector, or turnover.
            </p>

            <h2>Who must be enrolled?</h2>
            <p>
              Employees fall into three categories based on their age and earnings:
            </p>

            <h3>Eligible jobholders (must be enrolled automatically)</h3>
            <ul className="list-disc pl-6">
              <li>Aged between 22 and state pension age</li>
              <li>Earning more than <strong>&pound;10,000 per year</strong> (the earnings trigger)</li>
              <li>Working in the UK</li>
            </ul>
            <p>
              These employees must be enrolled from their first day of employment, or from the day they meet the age and earnings criteria.
            </p>

            <h3>Non-eligible jobholders (can opt in)</h3>
            <ul className="list-disc pl-6">
              <li>Aged 16 to 74</li>
              <li>Earning between &pound;6,240 and &pound;10,000 per year</li>
            </ul>
            <p>
              These workers are not automatically enrolled but have the right to opt in. If they do, the employer must contribute.
            </p>

            <h3>Entitled workers (can join, but no employer contribution required)</h3>
            <ul className="list-disc pl-6">
              <li>Aged 16 to 74</li>
              <li>Earning less than &pound;6,240 per year</li>
            </ul>
            <p>
              These workers can ask to join the pension scheme, but the employer is not required to make contributions.
            </p>

            <h2>Contribution rates</h2>
            <p>
              The minimum contributions are calculated on <strong>qualifying earnings</strong>, which is the band of earnings between &pound;6,240 and &pound;50,270 per year (2025/26 figures, adjusted annually):
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Employer minimum:</strong> 3% of qualifying earnings</li>
              <li><strong>Employee minimum:</strong> 5% of qualifying earnings (including tax relief)</li>
              <li><strong>Total minimum:</strong> 8% of qualifying earnings</li>
            </ul>
            <p>
              Many employers choose to contribute more than the minimum to attract and retain staff. Some use a &quot;salary sacrifice&quot; arrangement, which reduces both employer and employee National Insurance costs.
            </p>

            <h2>How opt-out works</h2>
            <p>
              Employees have the right to opt out of the pension scheme within <strong>one month</strong> of being enrolled. If they opt out within this window, any contributions already deducted are refunded and it is treated as though they were never enrolled.
            </p>
            <p>Important rules around opt-outs:</p>
            <ul className="list-disc pl-6">
              <li>You <strong>must not</strong> encourage or incentivise employees to opt out</li>
              <li>You cannot make opting out a condition of employment</li>
              <li>Employees who opt out must be <strong>re-enrolled</strong> approximately every 3 years (on the re-enrolment date you choose)</li>
              <li>Employees can choose to opt back in at any time, and you must process this within one month</li>
            </ul>

            <h2>Choosing a pension provider</h2>
            <p>
              You need a qualifying pension scheme. The most popular options for small businesses are:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>NEST (National Employment Savings Trust):</strong> Government-backed, accepts all employers, no set-up fees. Charges 1.8% on contributions plus 0.3% annual management charge.</li>
              <li><strong>NOW: Pensions:</strong> No set-up fee, no contribution charge. Flat 0.3% annual management charge.</li>
              <li><strong>The People&apos;s Pension:</strong> No set-up fee, 0.5% annual management charge. Simple administration.</li>
              <li><strong>Smart Pension:</strong> Modern platform with payroll integration. Competitive charges.</li>
            </ul>
            <p>
              When choosing a provider, consider the charges, the ease of administration, integration with your payroll software, and the investment options available to employees.
            </p>

            <h2>Your ongoing duties</h2>
            <p>
              Auto enrolment is not a one-off task. Your ongoing obligations include:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Assess new employees:</strong> Check each new starter against the eligibility criteria</li>
              <li><strong>Process contributions:</strong> Deduct and pay contributions with every payroll run</li>
              <li><strong>Monitor earnings changes:</strong> An employee who crosses the &pound;10,000 threshold must be enrolled</li>
              <li><strong>Re-enrol opt-outs:</strong> Every 3 years, re-enrol anyone who previously opted out</li>
              <li><strong>Keep records:</strong> Maintain records of enrolment, opt-outs, and contributions for 6 years</li>
              <li><strong>Submit a declaration of compliance:</strong> Complete this with The Pensions Regulator within 5 months of your duties start date</li>
            </ul>

            <h2>Penalties for non-compliance</h2>
            <p>
              The Pensions Regulator enforces auto enrolment and can issue:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Fixed penalty notice:</strong> &pound;400 for failing to comply after a warning</li>
              <li><strong>Escalating penalty notice:</strong> &pound;50 per day (1 to 4 employees), &pound;500 per day (5 to 49 employees), &pound;2,500 per day (50 to 249 employees), or &pound;10,000 per day (250+ employees)</li>
              <li><strong>Criminal prosecution:</strong> In serious cases, directors can face criminal charges</li>
            </ul>

            <h2>How Leavely helps with pension tracking</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> helps you keep pension-related employee data organised:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Employee profiles:</strong> Store pension enrolment dates, opt-out dates, and provider details against each employee record.</li>
              <li><strong>Start date tracking:</strong> Automatic tracking of employment start dates helps you identify when new starters need to be enrolled.</li>
              <li><strong>Document storage:</strong> Attach pension correspondence and opt-out forms to employee profiles.</li>
              <li><strong>Onboarding checklists:</strong> Include pension enrolment as a step in your onboarding workflow so it is never missed.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Keep employee records organised</h3>
            <p className="text-emerald-100 mb-6">Leavely stores pension details, start dates, and onboarding tasks alongside leave management.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/small-business-hr-checklist-uk" className="block text-emerald-600 hover:underline font-medium">HR Checklist for Small Businesses UK &rarr;</Link>
              <Link href="/blog/employment-contract-template-uk" className="block text-emerald-600 hover:underline font-medium">Employment Contract Template UK: What Must Be Included &rarr;</Link>
              <Link href="/blog/employee-onboarding-checklist-uk" className="block text-emerald-600 hover:underline font-medium">Employee Onboarding Checklist UK: Complete HR Guide &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
