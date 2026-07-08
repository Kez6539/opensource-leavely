import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/employment-contract-template-uk`

export const metadata: Metadata = {
  title: 'Employment Contract Template UK: What Must Be Included (2026)',
  description:
    'What must be included in a UK employment contract. Written statement of terms from day one, key clauses, holiday entitlement, notice periods, and probation.',
  alternates: { canonical: articleUrl },
  keywords: [
    'employment contract template UK',
    'written statement of terms',
    'employment contract UK',
    'contract of employment template',
    'employment contract clauses UK',
    'written statement of particulars',
  ],
  openGraph: {
    title: 'Employment Contract Template UK: What Must Be Included (2026)',
    description: 'Legal requirements for UK employment contracts, key clauses, and what to include from day one.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Employment Contract Template UK: What Must Be Included (2026)',
  description: 'What must be included in a UK employment contract from day one.',
  url: articleUrl,
  datePublished: '2026-04-04',
  dateModified: '2026-04-04',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function EmploymentContractArticle() {
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
            Employment Contract Template UK: What Must Be Included (2026)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Since April 2020, every employee and worker in the UK must receive a <strong>written statement of employment particulars on or before their first day of work</strong>. Previously, employers had two months to provide this. Now it must be ready from day one. This guide explains what you are legally required to include and what additional clauses protect your business.
            </p>

            <h2>Written statement vs employment contract</h2>
            <p>
              Technically, a written statement and an employment contract are not the same thing. An employment contract exists the moment someone accepts a job offer, whether it is written down or not. The <strong>written statement of employment particulars</strong> is the legal document that sets out the key terms.
            </p>
            <p>
              In practice, most employers combine both into a single document: the employment contract. This is the recommended approach, as it gives both parties clarity and reduces disputes.
            </p>

            <h2>What must be included on day one</h2>
            <p>
              The Employment Rights Act 1996 (as amended) requires the following to be provided on or before the first day of work:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Names:</strong> The employer&apos;s name and the employee&apos;s name</li>
              <li><strong>Start date:</strong> The date employment begins, and the date continuous employment began (if different)</li>
              <li><strong>Job title or description:</strong> A brief description of the role</li>
              <li><strong>Pay:</strong> How much the employee will be paid, how often, and the method of payment</li>
              <li><strong>Hours of work:</strong> Normal working hours, including which days, and whether hours may vary</li>
              <li><strong>Holiday entitlement:</strong> The amount of paid leave (including whether bank holidays are included) and how it is calculated</li>
              <li><strong>Place of work:</strong> Where the employee will work, or a statement that they may work in various locations</li>
              <li><strong>Sick leave and pay:</strong> Terms relating to sickness absence and sick pay</li>
              <li><strong>Other paid leave:</strong> Details of any other paid leave (e.g., maternity, paternity)</li>
              <li><strong>Notice periods:</strong> How much notice the employer and employee must give to end the contract</li>
              <li><strong>Probationary period:</strong> Any probation period and its conditions</li>
              <li><strong>Training:</strong> Any mandatory training the employee must complete, and whether the employer will pay for it</li>
            </ul>

            <h2>What must be provided within two months</h2>
            <p>
              Some additional information can be provided in a supplementary document within the first two months of employment:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Pension:</strong> Details of any pension scheme</li>
              <li><strong>Collective agreements:</strong> Details of any agreements with trade unions that affect terms</li>
              <li><strong>Disciplinary and grievance procedures:</strong> Who to contact and the process to follow</li>
              <li><strong>Non-compulsory training:</strong> Any training provided that is not mandatory</li>
            </ul>

            <h2>Key clauses to include for protection</h2>
            <p>
              Beyond the legal minimum, experienced employers include additional clauses to protect the business:
            </p>

            <h3>Confidentiality clause</h3>
            <p>
              Prevents the employee from sharing sensitive business information during and after employment. This should cover client lists, pricing, trade secrets, and business strategies.
            </p>

            <h3>Restrictive covenants</h3>
            <p>
              These limit what an employee can do after leaving, such as working for a competitor or soliciting your clients. Restrictive covenants must be reasonable in scope and duration to be enforceable. Typically, 6 to 12 months is considered reasonable, depending on the seniority of the role.
            </p>

            <h3>Garden leave clause</h3>
            <p>
              Allows you to require an employee to stay at home during their notice period while still being paid. This protects the business by keeping the employee away from clients, colleagues, and sensitive information.
            </p>

            <h3>Clawback clause</h3>
            <p>
              If you pay for training or provide a signing bonus, a clawback clause requires the employee to repay some or all of the cost if they leave within a specified period.
            </p>

            <h3>TOIL and overtime</h3>
            <p>
              If overtime is expected, state whether it is paid or if time off in lieu is offered. Specify the approval process and any caps on TOIL accrual.
            </p>

            <h2>The holiday entitlement section</h2>
            <p>
              This is one of the most commonly disputed parts of a contract. Be specific about:
            </p>
            <ul className="list-disc pl-6">
              <li>The total number of days (e.g., 25 days plus 8 bank holidays)</li>
              <li>Whether bank holidays are included in the total or additional</li>
              <li>The holiday year (e.g., January to December or date of joining)</li>
              <li>Carry-over rules and any limits</li>
              <li>How entitlement is calculated for part-time workers</li>
              <li>The notice period for requesting leave (e.g., twice the number of days requested)</li>
              <li>What happens to unused leave when someone leaves</li>
            </ul>

            <h2>Probation periods</h2>
            <p>
              A probation period is not a legal requirement, but it is common practice. Most employers set a probation period of 3 to 6 months. During this time, the employee may have a shorter notice period (typically 1 week rather than the standard notice). Be clear about:
            </p>
            <ul className="list-disc pl-6">
              <li>The length of the probation period</li>
              <li>Whether it can be extended and under what circumstances</li>
              <li>The notice period during probation</li>
              <li>What happens at the end (e.g., automatic confirmation or formal review)</li>
            </ul>

            <h2>Notice periods</h2>
            <p>
              The statutory minimum notice periods are:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Less than 1 month&apos;s service:</strong> No statutory minimum</li>
              <li><strong>1 month to 2 years:</strong> 1 week</li>
              <li><strong>2 to 12 years:</strong> 1 week per year of service</li>
              <li><strong>12+ years:</strong> 12 weeks</li>
            </ul>
            <p>
              Contracts often specify longer notice periods, especially for senior roles. A common approach is 1 month for most employees and 3 months for management positions.
            </p>

            <h2>How Leavely helps manage contract details</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> keeps all the key details from your employment contracts in one place:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Employee profiles:</strong> Store start dates, notice periods, probation end dates, and working patterns for every team member.</li>
              <li><strong>Leave policies:</strong> Configure holiday entitlement, carry-over limits, and accrual rules that match your contract terms exactly.</li>
              <li><strong>Document storage:</strong> Attach signed contracts and policy documents to each employee record.</li>
              <li><strong>Onboarding workflow:</strong> Ensure every new starter receives and signs their contract before day one.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Track every contract detail in one place</h3>
            <p className="text-emerald-100 mb-6">Leavely stores employee profiles, leave policies, and documents so nothing gets missed.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/employee-handbook-uk" className="block text-emerald-600 hover:underline font-medium">Employee Handbook UK: What to Include &rarr;</Link>
              <Link href="/blog/right-to-work-checks-uk" className="block text-emerald-600 hover:underline font-medium">Right to Work Checks UK: Employer Guide &rarr;</Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK: The Complete Guide &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
