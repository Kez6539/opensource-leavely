import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/right-to-work-checks-uk`

export const metadata: Metadata = {
  title: 'Right to Work Checks UK: Employer Guide (2026)',
  description:
    'How to conduct right to work checks in the UK. Acceptable documents, digital verification, penalties for non-compliance, and Home Office guidance for employers.',
  alternates: { canonical: articleUrl },
  keywords: [
    'right to work checks UK',
    'right to work UK employer',
    'how to check right to work',
    'right to work documents UK',
    'right to work verification',
    'employer right to work obligations',
  ],
  openGraph: {
    title: 'Right to Work Checks UK: Employer Guide (2026)',
    description: 'How to conduct right to work checks, acceptable documents, digital checks, and penalties for non-compliance.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Right to Work Checks UK: Employer Guide (2026)',
  description: 'How to conduct right to work checks in the UK for employers.',
  url: articleUrl,
  datePublished: '2026-04-04',
  dateModified: '2026-04-04',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function RightToWorkChecksArticle() {
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
            Right to Work Checks UK: Employer Guide (2026)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Every UK employer has a legal obligation to check that new hires have the right to work in the United Kingdom before they start. Getting this wrong can lead to civil penalties of up to <strong>&pound;60,000 per illegal worker</strong> and, in serious cases, criminal prosecution. This guide explains exactly what you need to do, which documents to accept, and how to use digital verification.
            </p>

            <h2>Why right to work checks matter</h2>
            <p>
              The Immigration, Asylum and Nationality Act 2006 requires employers to verify that every employee has permission to work in the UK. If you employ someone who does not have the right to work, you face civil penalties, criminal sanctions, and reputational damage. Conducting proper checks gives you a <strong>statutory excuse</strong>, which protects you from civil penalties even if it later turns out the person did not have the right to work.
            </p>

            <h2>When to conduct the check</h2>
            <p>
              You must carry out the check <strong>before the employee starts work</strong>. Not on their first day. Not during their first week. Before they do any work at all. For employees with time-limited permission to work, you also need to carry out <strong>follow-up checks</strong> before their permission expires.
            </p>

            <h2>The three-step process</h2>

            <h3>Step 1: Obtain original documents</h3>
            <p>
              Ask the employee to provide original documents from either List A or List B of the Home Office acceptable documents list.
            </p>
            <p><strong>List A documents</strong> (prove permanent right to work):</p>
            <ul className="list-disc pl-6">
              <li>UK or Irish passport (current or expired)</li>
              <li>Certificate of registration or naturalisation as a British citizen</li>
              <li>Permanent residence card or indefinite leave to remain document</li>
              <li>A valid passport showing the holder is a national of an EU country with settled status</li>
            </ul>
            <p><strong>List B documents</strong> (prove time-limited right to work):</p>
            <ul className="list-disc pl-6">
              <li>Current passport with a valid visa or endorsement for the type of work</li>
              <li>Biometric residence permit showing the right to work</li>
              <li>A frontier worker permit</li>
              <li>An immigration status document with a valid endorsement</li>
            </ul>
            <p>
              If the employee provides a List B document, you will need to schedule a follow-up check before their permission expires.
            </p>

            <h3>Step 2: Check the documents</h3>
            <p>
              Examine each document in the presence of the holder. Check that:
            </p>
            <ul className="list-disc pl-6">
              <li>The documents are genuine, original, and unaltered</li>
              <li>The photographs and dates of birth are consistent across documents and match the person</li>
              <li>The expiry dates have not passed</li>
              <li>The person has permission to do the type of work you are offering</li>
              <li>If documents show different names, ask for evidence of the name change (such as a marriage certificate or deed poll)</li>
            </ul>

            <h3>Step 3: Make and retain copies</h3>
            <p>
              Make a clear copy of each document. For passports, copy the front cover and any page with the holder&apos;s photo, nationality, date of birth, signature, date of expiry, biometric details, and endorsements. For other documents, copy the document in full. Record the date you made the check and keep copies for the duration of employment <strong>plus two years</strong>.
            </p>

            <h2>Digital right to work checks</h2>
            <p>
              Since April 2022, the Home Office has mandated that employers use the <strong>Home Office online checking service</strong> to verify the right to work of individuals who hold:
            </p>
            <ul className="list-disc pl-6">
              <li>Biometric residence cards or permits</li>
              <li>EU Settlement Scheme status (settled or pre-settled)</li>
              <li>eVisas</li>
              <li>Frontier worker permits</li>
            </ul>
            <p>
              The employee provides you with a <strong>share code</strong> from the Home Office online service, along with their date of birth. You enter these details at the gov.uk checking service to confirm their right to work. You must save a copy of the online profile as your record.
            </p>
            <p>
              <strong>Identity Document Validation Technology (IDVT)</strong> is also available through certified Identity Service Providers (IDSPs). These services allow British and Irish citizens to verify their identity digitally without presenting physical documents. You must use a certified IDSP listed on the government website.
            </p>

            <h2>Penalties for non-compliance</h2>
            <p>
              The penalties for employing illegal workers were increased significantly in February 2024:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>First breach:</strong> Up to &pound;45,000 per illegal worker</li>
              <li><strong>Repeat breach:</strong> Up to &pound;60,000 per illegal worker</li>
              <li><strong>Criminal offence:</strong> If you knew or had reasonable cause to believe the person did not have the right to work, you could face up to 5 years in prison and an unlimited fine</li>
            </ul>
            <p>
              Conducting checks correctly gives you a statutory excuse, meaning you will not receive a civil penalty even if the employee turns out to be working illegally.
            </p>

            <h2>Common mistakes employers make</h2>
            <ol className="list-decimal pl-6">
              <li><strong>Checking after the start date.</strong> The check must happen before the first day of work, not during onboarding week.</li>
              <li><strong>Accepting photocopies.</strong> You must see original documents (or use the digital service). Photocopies alone are not acceptable.</li>
              <li><strong>Treating people differently.</strong> You must check all employees, regardless of nationality or appearance. Checking only people who &quot;look foreign&quot; is discrimination.</li>
              <li><strong>Forgetting follow-up checks.</strong> If someone has time-limited permission, you must check again before it expires.</li>
              <li><strong>Not keeping records.</strong> Even if you conducted the check, you lose the statutory excuse if you cannot produce evidence.</li>
            </ol>

            <h2>Follow-up checks for time-limited workers</h2>
            <p>
              When an employee&apos;s right to work is time-limited (List B documents), you must conduct a follow-up check before their permission expires. If they have applied to extend their visa but have not received a decision, you can verify their status through the <strong>Employer Checking Service</strong> operated by the Home Office. This service provides a Positive Verification Notice valid for 6 months.
            </p>

            <h2>How Leavely helps with compliance</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> helps you stay on top of onboarding compliance with employee profiles that track key dates and documents:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Employee profiles</strong> store visa expiry dates, right to work check dates, and document references so nothing falls through the cracks.</li>
              <li><strong>Document management</strong> keeps copies of right to work evidence attached to each employee record.</li>
              <li><strong>Onboarding checklists</strong> ensure every new starter goes through the same compliance steps before their first day.</li>
              <li><strong>Audit trail</strong> records when checks were completed and by whom, providing evidence for Home Office inspections.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Stay on top of onboarding compliance</h3>
            <p className="text-emerald-100 mb-6">Leavely tracks right to work checks, visa expiries, and onboarding tasks in one place.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/employee-onboarding-checklist-uk" className="block text-emerald-600 hover:underline font-medium">Employee Onboarding Checklist UK: Complete HR Guide &rarr;</Link>
              <Link href="/blog/employment-contract-template-uk" className="block text-emerald-600 hover:underline font-medium">Employment Contract Template UK: What Must Be Included &rarr;</Link>
              <Link href="/blog/hr-compliance-checklist-uk" className="block text-emerald-600 hover:underline font-medium">HR Compliance Checklist UK: The Complete Audit Guide &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
