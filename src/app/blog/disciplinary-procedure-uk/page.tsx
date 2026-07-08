import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/disciplinary-procedure-uk`

export const metadata: Metadata = {
  title: 'Disciplinary Procedure UK: Step-by-Step Employer Guide (2026)',
  description:
    'How to run a fair disciplinary procedure in the UK. ACAS code of practice, investigation, hearings, outcomes, appeals, and common mistakes employers make.',
  alternates: { canonical: articleUrl },
  keywords: [
    'disciplinary procedure UK',
    'disciplinary process UK employer',
    'how to discipline an employee UK',
    'ACAS code of practice',
    'disciplinary hearing UK',
    'workplace disciplinary process',
  ],
  openGraph: {
    title: 'Disciplinary Procedure UK: Step-by-Step Employer Guide (2026)',
    description: 'ACAS code of practice, investigation, hearing, outcomes, appeals, and common mistakes.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Disciplinary Procedure UK: Step-by-Step Employer Guide (2026)',
  description: 'How to run a fair disciplinary procedure in the UK.',
  url: articleUrl,
  datePublished: '2026-04-04',
  dateModified: '2026-04-04',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function DisciplinaryProcedureArticle() {
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
            Disciplinary Procedure UK: Step-by-Step Employer Guide (2026)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Handling disciplinary issues is one of the most stressful parts of managing people. Get the process wrong and you risk an unfair dismissal claim at an employment tribunal. This guide walks you through the <strong>ACAS Code of Practice on Disciplinary and Grievance Procedures</strong>, which tribunals expect every employer to follow.
            </p>

            <h2>What is the ACAS Code of Practice?</h2>
            <p>
              The ACAS Code of Practice sets out the minimum standard for handling disciplinary situations. While it is not law itself, employment tribunals are <strong>required to take it into account</strong> when considering relevant cases. If you fail to follow the Code, a tribunal can increase any compensation award by up to 25%.
            </p>
            <p>The Code applies to disciplinary situations including misconduct and poor performance. It does not apply to redundancy or the non-renewal of fixed-term contracts.</p>

            <h2>When to use a disciplinary procedure</h2>
            <p>Common scenarios that trigger formal action include:</p>
            <ul className="list-disc pl-6">
              <li><strong>Misconduct:</strong> Persistent lateness, unauthorised absence, breaking company rules</li>
              <li><strong>Serious misconduct:</strong> Theft, violence, gross insubordination, fraud</li>
              <li><strong>Poor performance:</strong> Failing to meet agreed standards after support has been provided</li>
            </ul>
            <p>
              For minor issues, an informal conversation is usually more appropriate than jumping straight to formal proceedings. The ACAS Code encourages dealing with issues informally where possible.
            </p>

            <h2>Step-by-step disciplinary process</h2>

            <h3>Step 1: Investigate the facts</h3>
            <p>
              Before any formal action, you must investigate the matter thoroughly. This means gathering evidence, interviewing witnesses, and reviewing any relevant records. The investigation should be carried out by someone who will not be chairing the disciplinary hearing, to maintain impartiality.
            </p>
            <p>Key points during investigation:</p>
            <ul className="list-disc pl-6">
              <li>Keep detailed notes of all conversations and evidence gathered</li>
              <li>Consider whether suspension is necessary (it should not be the default)</li>
              <li>If you do suspend, it should be on full pay and for the shortest time possible</li>
              <li>Do not treat the investigation as a formality with a predetermined outcome</li>
            </ul>

            <h3>Step 2: Notify the employee in writing</h3>
            <p>
              If the investigation reveals a case to answer, write to the employee setting out the allegations. The letter must include enough detail for the employee to understand the case against them and prepare their response. You should also include:
            </p>
            <ul className="list-disc pl-6">
              <li>The date, time, and location of the disciplinary hearing</li>
              <li>Copies of any evidence you intend to rely on</li>
              <li>Their right to be accompanied at the hearing</li>
              <li>The potential outcomes of the hearing</li>
            </ul>
            <p>Give the employee <strong>reasonable time</strong> to prepare. A minimum of 48 hours is generally expected, though complex cases may require more.</p>

            <h3>Step 3: Hold the disciplinary hearing</h3>
            <p>
              The hearing should be chaired by someone with the authority to make decisions. The employee has the <strong>statutory right to be accompanied</strong> by a trade union representative or a work colleague. The companion can address the hearing, confer with the employee, and sum up their case, but they cannot answer questions on the employee&apos;s behalf.
            </p>
            <p>During the hearing:</p>
            <ul className="list-disc pl-6">
              <li>Explain the allegations and go through the evidence</li>
              <li>Allow the employee to respond fully to each point</li>
              <li>Listen to any mitigating factors the employee raises</li>
              <li>Take detailed notes (or have a note-taker present)</li>
              <li>Adjourn if new information comes to light that needs investigating</li>
            </ul>

            <h3>Step 4: Decide the outcome</h3>
            <p>
              After the hearing, take time to consider the evidence before reaching a decision. Do not rush this. The possible outcomes under most disciplinary policies are:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>No action:</strong> The case is not substantiated</li>
              <li><strong>Written warning:</strong> Usually the first formal step, with a review period</li>
              <li><strong>Final written warning:</strong> For serious misconduct or repeated issues</li>
              <li><strong>Dismissal:</strong> For gross misconduct or continued failure after warnings</li>
              <li><strong>Other action:</strong> Demotion, transfer, or loss of seniority (only if the contract allows)</li>
            </ol>
            <p>Communicate the outcome in writing, explaining the reasons, any improvement expected, the timescale, and the consequences of further misconduct.</p>

            <h3>Step 5: Offer the right of appeal</h3>
            <p>
              The employee must be given the right to appeal. Ideally, the appeal should be heard by someone more senior who was not involved in the original decision. The appeal is not a rehearing of the case. It focuses on whether the procedure was followed correctly, whether the decision was reasonable, and any new evidence.
            </p>

            <h2>Gross misconduct and summary dismissal</h2>
            <p>
              In cases of gross misconduct, you may dismiss without notice (summary dismissal). However, you must still follow a fair process. You must still investigate, hold a hearing, and allow an appeal. Examples of gross misconduct typically include:
            </p>
            <ul className="list-disc pl-6">
              <li>Theft, fraud, or dishonesty</li>
              <li>Physical violence or threats</li>
              <li>Serious damage to company property</li>
              <li>Serious breaches of health and safety</li>
              <li>Being under the influence of drugs or alcohol at work</li>
            </ul>

            <h2>Common mistakes that lead to tribunal claims</h2>
            <ol className="list-decimal pl-6">
              <li><strong>Skipping the investigation.</strong> A shoddy or non-existent investigation is the most common reason for unfair dismissal findings.</li>
              <li><strong>Predetermining the outcome.</strong> The decision-maker must approach the hearing with an open mind.</li>
              <li><strong>Inconsistency.</strong> If two employees commit the same offence and one is dismissed while the other receives a warning, the dismissed employee has strong grounds for a claim.</li>
              <li><strong>No right of appeal.</strong> Failing to offer an appeal almost guarantees an increased compensation award.</li>
              <li><strong>Poor record-keeping.</strong> Without notes, evidence, and correspondence, you cannot demonstrate the process was fair.</li>
            </ol>

            <h2>How Leavely supports fair procedures</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> provides the data and audit trail you need when managing disciplinary matters:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Absence records:</strong> Accurate absence data helps you identify patterns and substantiate concerns about attendance.</li>
              <li><strong>Audit trail:</strong> Every leave request, approval, and change is logged with timestamps, giving you reliable evidence.</li>
              <li><strong>Employee profiles:</strong> Store notes, documents, and key dates against each employee record.</li>
              <li><strong>Bradford Factor scores:</strong> Automatically calculated scores highlight absence patterns that may need addressing.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Build a reliable evidence base</h3>
            <p className="text-emerald-100 mb-6">Leavely&apos;s audit trail and absence records support fair, defensible HR decisions.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/acas-early-conciliation-uk" className="block text-emerald-600 hover:underline font-medium">ACAS Early Conciliation: What Employers Need to Know &rarr;</Link>
              <Link href="/blog/absence-management-policy-uk" className="block text-emerald-600 hover:underline font-medium">Absence Management Policy UK: Complete Guide &amp; Template &rarr;</Link>
              <Link href="/blog/sickness-absence-trigger-points-uk" className="block text-emerald-600 hover:underline font-medium">Sickness Absence Trigger Points UK: How to Set Fair Thresholds &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
