import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/managing-long-term-sickness-uk`

export const metadata: Metadata = {
  title: 'Managing Long Term Sickness Absence UK: Employer Guide (2026)',
  description:
    'How to manage long term sickness absence in the UK. Keeping in touch, occupational health referrals, reasonable adjustments, phased returns, and when dismissal is fair.',
  alternates: { canonical: articleUrl },
  keywords: [
    'managing long term sickness UK',
    'long term sick leave UK',
    'long term absence management',
    'employee off sick long term',
    'long term sickness employer guide',
    'managing long term absence UK',
  ],
  openGraph: {
    title: 'Managing Long Term Sickness Absence UK: Employer Guide (2026)',
    description: 'Keeping in touch, occupational health, reasonable adjustments, phased return, and when dismissal is fair.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Managing Long Term Sickness Absence UK: Employer Guide (2026)',
  description: 'How to manage long term sickness absence in the UK.',
  url: articleUrl,
  datePublished: '2026-04-04',
  dateModified: '2026-04-04',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function ManagingLongTermSicknessArticle() {
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
            Managing Long Term Sickness Absence UK: Employer Guide (2026)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Long-term sickness is one of the most challenging situations for employers to manage. You want to support your employee, but you also need to keep the business running. Getting the balance wrong can lead to employment tribunal claims, damaged team morale, or an employee who feels abandoned. This guide explains the practical steps to handle long-term absence fairly and legally.
            </p>

            <h2>What counts as long-term sickness?</h2>
            <p>
              There is no legal definition, but most employers and insurers consider absence of <strong>4 weeks or more</strong> to be long-term sickness. Common causes include musculoskeletal conditions (back pain, joint problems), mental health conditions (depression, anxiety, stress), surgery and recovery, cancer treatment, and chronic illness flare-ups.
            </p>

            <h2>Keeping in touch during absence</h2>
            <p>
              Maintaining regular, supportive contact with the employee is essential. This is not about pressuring them to return. It is about making sure they feel valued and informed.
            </p>
            <p>Best practices for keeping in touch:</p>
            <ul className="list-disc pl-6">
              <li><strong>Agree the contact method:</strong> Some employees prefer phone calls, others prefer email or text. Ask them what works best.</li>
              <li><strong>Set a frequency:</strong> Weekly or fortnightly contact is usually appropriate. Less frequent and the employee feels forgotten. More frequent and it feels intrusive.</li>
              <li><strong>Assign one contact person:</strong> Usually their line manager or an HR contact. Avoid multiple people calling at different times.</li>
              <li><strong>Share workplace news:</strong> Keep them informed about team changes, social events, and company updates so they still feel connected.</li>
              <li><strong>Document every contact:</strong> Record the date, method, and a brief summary of the conversation.</li>
            </ul>

            <h2>Obtaining medical information</h2>

            <h3>Fit notes</h3>
            <p>
              Employees can self-certify for the first 7 calendar days of sickness. After that, they need a fit note from a GP or hospital doctor. The fit note may say the employee is &quot;not fit for work&quot; or &quot;may be fit for work&quot; with adjustments. If the fit note suggests adjustments, you should consider them carefully.
            </p>

            <h3>Occupational health referral</h3>
            <p>
              For long-term cases, a fit note alone is rarely sufficient. An occupational health (OH) assessment provides a much more detailed picture. The OH professional will advise on:
            </p>
            <ul className="list-disc pl-6">
              <li>The likely duration of the absence</li>
              <li>Whether the condition is likely to be covered by the Equality Act 2010</li>
              <li>What adjustments could support a return to work</li>
              <li>Whether a phased return is appropriate</li>
              <li>Whether the employee is likely to be able to return to their role at all</li>
            </ul>
            <p>
              You need the employee&apos;s consent to make an OH referral. Most employees agree when the purpose is explained clearly. An OH report is not a diagnosis. It is workplace-focused advice for the employer.
            </p>

            <h2>Reasonable adjustments and the Equality Act</h2>
            <p>
              If the employee&apos;s condition meets the definition of a disability under the Equality Act 2010, you have a duty to make reasonable adjustments. A condition qualifies as a disability if it has a <strong>substantial and long-term adverse effect</strong> on the person&apos;s ability to carry out normal day-to-day activities. &quot;Long-term&quot; means it has lasted, or is likely to last, 12 months or more.
            </p>
            <p>Examples of reasonable adjustments:</p>
            <ul className="list-disc pl-6">
              <li>Phased return with reduced hours, building up gradually</li>
              <li>Temporary reallocation of certain duties</li>
              <li>Changes to working hours or location</li>
              <li>Providing specialist equipment</li>
              <li>Allowing additional time off for medical appointments</li>
              <li>Adjusting absence trigger points (not counting disability-related absence in the same way as general sickness)</li>
            </ul>

            <h2>Planning a phased return to work</h2>
            <p>
              A phased return means the employee comes back on reduced hours or duties, gradually increasing over a set period (usually 4 to 8 weeks). This is often recommended by occupational health or mentioned on a fit note.
            </p>
            <p>Key decisions to make:</p>
            <ul className="list-disc pl-6">
              <li><strong>Duration:</strong> How long will the phased return last? Set a clear end date.</li>
              <li><strong>Hours:</strong> What hours will they work each week, and how will these increase?</li>
              <li><strong>Duties:</strong> Are there any duties they should avoid initially?</li>
              <li><strong>Pay:</strong> Will they receive full pay or pay proportional to hours worked? There is no legal requirement to pay full pay during a phased return, but many employers do.</li>
              <li><strong>Review points:</strong> Schedule regular check-ins to assess progress.</li>
            </ul>

            <h2>When can you dismiss for long-term sickness?</h2>
            <p>
              Dismissal for long-term sickness can be fair, but only if you have followed a proper process. A tribunal will consider whether:
            </p>
            <ol className="list-decimal pl-6">
              <li>You obtained up-to-date medical evidence (usually an OH report)</li>
              <li>You consulted with the employee about their condition and prognosis</li>
              <li>You considered and implemented reasonable adjustments</li>
              <li>You explored alternative roles if the employee cannot return to their original job</li>
              <li>The business genuinely cannot sustain the absence any longer</li>
              <li>You followed a fair procedure, including the right to be accompanied and the right to appeal</li>
            </ol>
            <p>
              There is no fixed period after which dismissal becomes automatically fair. It depends on the circumstances: the nature of the role, the size of the organisation, the impact on the team, and the medical prognosis.
            </p>

            <h2>SSP and company sick pay</h2>
            <p>
              Statutory Sick Pay (SSP) is paid for up to 28 weeks at &pound;116.75 per week (2025/26 rate). After SSP ends, the employee may be able to claim Employment and Support Allowance (ESA) or Universal Credit. If you offer company sick pay, your policy should state how long it lasts and how it interacts with SSP.
            </p>

            <h2>Return-to-work interviews</h2>
            <p>
              When the employee returns, conduct a return-to-work interview. This is a brief, supportive conversation covering:
            </p>
            <ul className="list-disc pl-6">
              <li>How they are feeling</li>
              <li>Whether any workplace adjustments are needed</li>
              <li>Updating them on changes during their absence</li>
              <li>Confirming any phased return arrangements</li>
            </ul>

            <h2>How Leavely helps manage long-term absence</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> gives you the tools to manage long-term sickness properly:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Fit note tracking:</strong> Record fit note dates, recommendations, and expiry dates against the employee&apos;s absence record.</li>
              <li><strong>Return-to-work interviews:</strong> Log RTW conversations with dates and notes, creating an audit trail.</li>
              <li><strong>Absence patterns:</strong> See total days absent, frequency, and Bradford Factor scores at a glance.</li>
              <li><strong>Document storage:</strong> Attach OH reports, fit notes, and correspondence to the employee profile.</li>
              <li><strong>Trigger point alerts:</strong> Get notified when absence reaches your policy thresholds so you can take timely action.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Track long-term absence with confidence</h3>
            <p className="text-emerald-100 mb-6">Leavely tracks fit notes, RTW interviews, and absence patterns so you can manage long-term sickness fairly.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/sickness-absence-trigger-points-uk" className="block text-emerald-600 hover:underline font-medium">Sickness Absence Trigger Points UK: How to Set Fair Thresholds &rarr;</Link>
              <Link href="/blog/phased-return-to-work-uk" className="block text-emerald-600 hover:underline font-medium">Phased Return to Work UK: How to Manage It Properly &rarr;</Link>
              <Link href="/blog/fit-notes-employer-guide-uk" className="block text-emerald-600 hover:underline font-medium">Fit Notes UK: Complete Employer Guide &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
