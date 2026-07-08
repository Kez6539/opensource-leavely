import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/employment-law-changes-2026-uk`

export const metadata: Metadata = {
  title: 'UK Employment Law Changes 2026: What Employers Need to Know',
  description:
    'Key UK employment law changes for 2026 including the Employment Rights Bill, neonatal care leave, flexible working day-one right, harassment duty, fire and rehire restrictions, and the Tips Act.',
  alternates: { canonical: articleUrl },
  keywords: [
    'employment law changes 2026 UK',
    'new employment law UK 2026',
    'HR law changes 2026',
    'employment rights bill 2026',
    'UK employment law update 2026',
    'new HR legislation 2026',
    'employment law reform UK',
  ],
  openGraph: {
    title: 'UK Employment Law Changes 2026: What Employers Need to Know',
    description: 'A summary of the key employment law changes affecting UK employers in 2026.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'UK Employment Law Changes 2026: What Employers Need to Know',
  description: 'Key employment law changes for UK employers in 2026.',
  url: articleUrl,
  datePublished: '2026-04-04',
  dateModified: '2026-04-04',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function EmploymentLawChanges2026Article() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Employment Law</span>
            <span className="text-xs text-gray-400 ml-3">10 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            UK Employment Law Changes 2026: What Employers Need to Know
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              2026 is a significant year for UK employment law. The Employment Rights Bill, introduced in late 2024, is now being implemented in stages. Several new rights and obligations are coming into force, and employers need to be ready. This guide summarises the key changes that affect how you manage your people, with a focus on what you need to do now.
            </p>

            <h2>1. Flexible working: day one right (already in force)</h2>
            <p>
              Since April 2024, employees have had the right to <Link href="/blog/flexible-working-uk" className="text-emerald-600 hover:underline font-medium">request flexible working from day one</Link> of employment. Previously, employees needed 26 weeks of service before they could make a request. Key changes:
            </p>
            <ul className="list-disc pl-6">
              <li>Employees can now make <strong>two requests per year</strong> (up from one)</li>
              <li>Employers must respond within <strong>two months</strong> (down from three)</li>
              <li>Employers must <strong>consult with the employee</strong> before refusing a request</li>
              <li>The employee no longer needs to explain the impact of the request on the business</li>
            </ul>
            <p>
              <strong>What to do:</strong> review your flexible working policy to ensure it reflects the new rules. Train managers on how to handle requests fairly and within the two month deadline.
            </p>

            <h2>2. Neonatal care leave (new for 2025/2026)</h2>
            <p>
              The Neonatal Care (Leave and Pay) Act 2023 introduces a new right to <strong>up to 12 weeks of paid leave</strong> for parents whose babies are admitted to neonatal care within 28 days of birth and who spend 7 or more continuous days in hospital.
            </p>
            <p>
              This is in addition to existing maternity and paternity leave. The statutory pay rate will be set at the same level as other statutory family pay rates.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Who qualifies:</strong> employed parents and intended parents in surrogacy and adoption situations</li>
              <li><strong>When it applies:</strong> from the first day of employment (no qualifying period)</li>
              <li><strong>How it works:</strong> leave can be taken in non consecutive weeks and must be taken within 68 weeks of birth</li>
            </ul>
            <p>
              <strong>What to do:</strong> update your family leave policies and employee handbook. Configure your leave management system to include neonatal care leave as a leave type.
            </p>

            <h2>3. Employer duty to prevent sexual harassment</h2>
            <p>
              The Worker Protection (Amendment of Equality Act 2010) Act 2023 created a new <strong>proactive duty on employers to take reasonable steps to prevent sexual harassment</strong>. This replaced the previous position where employers were only liable if harassment had occurred and they had failed to act.
            </p>
            <p>
              Employment tribunals can now <strong>uplift compensation by up to 25%</strong> if an employer has breached this duty.
            </p>
            <ul className="list-disc pl-6">
              <li>Employers must carry out risk assessments for harassment</li>
              <li>Anti harassment policies must be up to date and actively communicated</li>
              <li>Training must be provided to all staff, not just managers</li>
              <li>Reporting mechanisms must be clear and accessible</li>
            </ul>
            <p>
              <strong>What to do:</strong> review your anti harassment policy, conduct a risk assessment, and schedule training. The Equality and Human Rights Commission (EHRC) has published guidance on what &quot;reasonable steps&quot; means in practice.
            </p>

            <h2>4. Fire and rehire restrictions</h2>
            <p>
              The Employment Rights Bill introduces restrictions on the controversial practice of &quot;fire and rehire,&quot; where employers dismiss employees and offer to rehire them on worse terms. Under the new rules:
            </p>
            <ul className="list-disc pl-6">
              <li>Dismissing an employee for refusing to accept a change to their terms will be <strong>automatically unfair</strong> unless the business can demonstrate financial difficulties that threaten its survival</li>
              <li>The threshold for justifying fire and rehire is much higher than before</li>
              <li>Employers must demonstrate that they have exhausted all other options</li>
            </ul>
            <p>
              <strong>What to do:</strong> if you are considering changes to employment terms, take legal advice. The new rules make it much harder to force through changes using dismissal as a tactic.
            </p>

            <h2>5. Statutory Sick Pay reform</h2>
            <p>
              The Employment Rights Bill proposes changes to <Link href="/blog/statutory-sick-pay-uk" className="text-emerald-600 hover:underline font-medium">Statutory Sick Pay (SSP)</Link>:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Removal of the 3 waiting days</strong>: SSP would be payable from day one of sickness (currently it starts on the fourth day)</li>
              <li><strong>Removal of the Lower Earnings Limit</strong>: all workers would qualify for SSP, not just those earning above the threshold</li>
              <li>A percentage of earnings would apply for lower paid workers (to avoid SSP exceeding their normal pay)</li>
            </ul>
            <p>
              These changes are expected to come into force during 2026, but the exact timing may depend on parliamentary progress.
            </p>
            <p>
              <strong>What to do:</strong> budget for the additional cost of paying SSP from day one. Update your absence management and payroll systems when the changes are confirmed.
            </p>

            <h2>6. Tips Act: allocation of tips</h2>
            <p>
              The Employment (Allocation of Tips) Act 2023 requires employers to distribute tips, gratuities, and service charges to workers in a <strong>fair and transparent way</strong>. Key requirements:
            </p>
            <ul className="list-disc pl-6">
              <li>Employers must have a written policy on how tips are allocated</li>
              <li>All qualifying tips must be distributed to workers by the end of the month following the month they were received</li>
              <li>Employers cannot deduct administration costs from tips</li>
              <li>Workers can request a copy of tipping records</li>
            </ul>
            <p>
              <strong>What to do:</strong> if your business receives tips (hospitality, hairdressing, delivery services), create a written tipping policy and ensure your payroll process distributes tips on time.
            </p>

            <h2>7. Right to switch off (proposed)</h2>
            <p>
              The Employment Rights Bill includes a proposed <strong>right to switch off</strong>, giving employees the right to disconnect from work communications outside of normal working hours. While the details are still being finalised, the direction of travel is clear:
            </p>
            <ul className="list-disc pl-6">
              <li>Employers will likely need a policy on out of hours contact</li>
              <li>Employees should not be penalised for not responding outside working hours</li>
              <li>Genuine emergencies may be exempt, but routine emails and messages would not be</li>
            </ul>
            <p>
              <strong>What to do:</strong> even before this becomes law, consider adopting a policy on out of hours communication. It is good practice and supports employee wellbeing.
            </p>

            <h2>8. Zero hours contract reforms (proposed)</h2>
            <p>
              The Bill proposes reforms to <Link href="/blog/zero-hour-contract-holiday-uk" className="text-emerald-600 hover:underline font-medium">zero hours contracts</Link>:
            </p>
            <ul className="list-disc pl-6">
              <li>Workers on zero hours contracts would have the right to request a <strong>guaranteed hours contract</strong> after a qualifying period</li>
              <li>The guaranteed hours would be based on the average hours worked during the reference period</li>
              <li>Employers would need to give reasonable notice of shifts and compensate for cancelled shifts</li>
            </ul>
            <p>
              <strong>What to do:</strong> review your use of zero hours contracts. If workers are consistently working regular hours, consider offering them guaranteed hours proactively.
            </p>

            <h2>9. Single enforcement body</h2>
            <p>
              The government plans to create a single enforcement body, the <strong>Fair Work Agency</strong>, which will combine the functions of HMRC&apos;s national minimum wage enforcement, the Employment Agency Standards Inspectorate, and the Gangmasters and Labour Abuse Authority. This will give a single body the power to:
            </p>
            <ul className="list-disc pl-6">
              <li>Enforce minimum wage, holiday pay, and sick pay obligations</li>
              <li>Investigate complaints from workers</li>
              <li>Issue penalties for non compliance</li>
            </ul>
            <p>
              <strong>What to do:</strong> ensure your pay and leave practices are compliant. With a single enforcement body, investigations are likely to be more coordinated and effective.
            </p>

            <h2>How Leavely keeps you compliant</h2>
            <p>
              Employment law changes often affect leave entitlements, policies, and record keeping. <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> helps you stay on top of it:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Configurable leave types</strong> so you can add neonatal care leave and other new entitlements</li>
              <li><strong>Policy templates</strong> that reflect current UK law</li>
              <li><strong>Automatic calculations</strong> for entitlements, pro rata adjustments, and carry over</li>
              <li><strong>Audit trail</strong> that provides evidence of compliance if you are ever investigated</li>
              <li><strong>Regular updates</strong> to keep the platform aligned with legislative changes</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Stay compliant as the law changes</h3>
            <p className="text-emerald-100 mb-6">Leavely keeps your leave policies up to date with UK employment law, so you do not have to worry.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/flexible-working-uk" className="block text-emerald-600 hover:underline font-medium">Flexible Working UK: Right to Request Guide for Employers &rarr;</Link>
              <Link href="/blog/statutory-sick-pay-uk" className="block text-emerald-600 hover:underline font-medium">Statutory Sick Pay UK 2026: Complete Employer Guide &rarr;</Link>
              <Link href="/blog/hr-compliance-checklist-uk" className="block text-emerald-600 hover:underline font-medium">HR Compliance Checklist UK 2026: The Complete Audit Guide &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
