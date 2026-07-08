import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/return-to-work-interview-questions`

export const metadata: Metadata = {
  title: 'Return-to-Work Interview Questions: Free Template for UK Employers',
  description:
    'Free return-to-work interview template with questions for UK employers. Why RTW interviews matter, what to ask, what to document, and how to handle sensitive conversations after employee absence.',
  alternates: { canonical: articleUrl },
  keywords: [
    'return to work interview questions',
    'return to work form template',
    'RTW interview template',
    'return to work interview template UK',
    'return to work questions after sickness',
    'back to work interview questions',
    'return to work form',
    'return to work interview best practice',
  ],
  openGraph: {
    title: 'Return-to-Work Interview Questions — Free Template',
    description: 'Free RTW interview template with questions, best practices, and tips for UK employers.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Return-to-Work Interview Questions: Free Template for UK Employers',
  description: 'Free return-to-work interview template with questions for UK employers.',
  url: articleUrl,
  datePublished: '2026-03-12',
  dateModified: '2026-03-12',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function RTWArticle() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">HR Template</span>
            <span className="text-xs text-gray-400 ml-3">6 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Return-to-Work Interview Questions: Free Template for UK Employers
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              A return-to-work (RTW) interview is a short conversation between a manager and an employee after any period of absence. Done well, they show employees you care, help identify underlying issues, and act as a natural deterrent against casual absence. Here&apos;s a complete guide with a free template.
            </p>

            <h2>Why return-to-work interviews matter</h2>
            <ul className="list-disc pl-6">
              <li><strong>Reduce absence rates</strong> — CIPD research consistently shows that RTW interviews are the single most effective tool for managing short-term absence.</li>
              <li><strong>Identify patterns</strong> — spot recurring issues like work-related stress, bullying, or chronic health conditions.</li>
              <li><strong>Demonstrate duty of care</strong> — show employees you&apos;re genuinely concerned about their wellbeing.</li>
              <li><strong>Create a record</strong> — build documentation that supports any future formal action if needed.</li>
              <li><strong>Deterrent effect</strong> — knowing there&apos;s a conversation on return naturally discourages non-genuine absence.</li>
            </ul>

            <h2>When to conduct a return-to-work interview</h2>
            <p>
              <strong>After every absence</strong> — whether it&apos;s one day or one month. Consistency is key. If you only do RTW interviews for longer absences, you lose the deterrent effect for short-term casual absence.
            </p>
            <p>
              Hold the interview on the employee&apos;s <strong>first day back</strong>, ideally within the first hour. Keep it short — 10 to 15 minutes is usually sufficient.
            </p>

            <h2>Free return-to-work interview template</h2>
            <div className="rounded-xl bg-gray-50 border p-6 my-6 text-sm">
              <p className="font-bold text-gray-900 mb-4 text-base">Return-to-Work Interview Form</p>

              <p className="mb-1"><strong>Employee name:</strong> ________________________________</p>
              <p className="mb-1"><strong>Manager name:</strong> ________________________________</p>
              <p className="mb-1"><strong>Date of interview:</strong> ________________________________</p>
              <p className="mb-1"><strong>Date(s) of absence:</strong> ________________________________</p>
              <p className="mb-4"><strong>Total days absent:</strong> ________________________________</p>

              <p className="font-bold text-gray-900 mb-2">Questions</p>

              <p className="mb-3"><strong>1. Welcome back.</strong> How are you feeling today? Are you fit to be back at work?</p>

              <p className="mb-3"><strong>2. What was the reason for your absence?</strong><br/>
              <span className="text-xs text-gray-400">(Note: employees are not obliged to give specific medical details, but you can ask for a general reason.)</span></p>

              <p className="mb-3"><strong>3. Did you see a GP or receive any medical treatment?</strong><br/>
              <span className="text-xs text-gray-400">(If absent for 7+ days, check if a fit note was provided.)</span></p>

              <p className="mb-3"><strong>4. Is this related to a previous absence or an ongoing condition?</strong></p>

              <p className="mb-3"><strong>5. Is there anything at work that contributed to or affected your absence?</strong><br/>
              <span className="text-xs text-gray-400">(Workload, stress, workplace relationships, physical environment.)</span></p>

              <p className="mb-3"><strong>6. Is there anything we can do to support you or prevent a recurrence?</strong><br/>
              <span className="text-xs text-gray-400">(Reasonable adjustments, workload changes, phased return.)</span></p>

              <p className="mb-3"><strong>7. Are there any updates you need on what happened while you were away?</strong></p>

              <p className="mb-3"><strong>8. Is there anything else you&apos;d like to discuss?</strong></p>

              <p className="font-bold text-gray-900 mt-6 mb-2">Manager notes</p>
              <p className="mb-3">________________________________<br/>________________________________<br/>________________________________</p>

              <p className="font-bold text-gray-900 mb-2">Actions agreed</p>
              <p className="mb-3">________________________________<br/>________________________________</p>

              <p className="mb-1"><strong>Employee signature:</strong> ________________ <strong>Date:</strong> ________</p>
              <p className="mb-0"><strong>Manager signature:</strong> ________________ <strong>Date:</strong> ________</p>
            </div>

            <h2>Best practices for RTW interviews</h2>
            <ol className="list-decimal pl-6">
              <li><strong>Be supportive, not interrogative</strong> — this is a welfare check, not a disciplinary meeting.</li>
              <li><strong>Be consistent</strong> — do them for every absence, for every employee. No exceptions.</li>
              <li><strong>Hold them privately</strong> — never in front of colleagues.</li>
              <li><strong>Keep notes</strong> — document the conversation and any actions agreed.</li>
              <li><strong>Don&apos;t ask for specific diagnoses</strong> — you can ask the general reason but cannot demand medical details.</li>
              <li><strong>Consider the Equality Act</strong> — if absence is disability-related, you must consider reasonable adjustments.</li>
              <li><strong>Follow up on actions</strong> — if you agreed to make changes, make sure they happen.</li>
            </ol>

            <h2>What not to do</h2>
            <ul className="list-disc pl-6">
              <li>Don&apos;t treat the interview as a telling-off.</li>
              <li>Don&apos;t accuse the employee of faking illness.</li>
              <li>Don&apos;t discuss absence in front of the team.</li>
              <li>Don&apos;t skip RTW interviews for &quot;good&quot; employees — consistency matters.</li>
              <li>Don&apos;t use paper forms that get lost — digitise the process.</li>
            </ul>

            <h2>Digitise your RTW process with Leavely</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> has built-in return-to-work forms that attach directly to each absence record. Managers complete the form within the app, and it&apos;s saved to the employee&apos;s profile with a full audit trail. No paper forms, no lost documents, no inconsistency.
            </p>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Digital return-to-work forms, built in</h3>
            <p className="text-emerald-100 mb-6">Leavely includes RTW interview forms attached to every absence — complete, searchable, and audit-ready.</p>
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
              <Link href="/sick-leave-uk" className="block text-emerald-600 hover:underline font-medium">Sick Leave UK: SSP 2026/27 Employer Guide &rarr;</Link>
              <Link href="/employee-onboarding-uk" className="block text-emerald-600 hover:underline font-medium">Employee Onboarding UK: Checklist for Small Businesses &rarr;</Link>
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">Bradford Factor Explained: How to Calculate and Use It &rarr;</Link>
              <Link href="/blog/leave-policy-template-uk" className="block text-emerald-600 hover:underline font-medium">How to Create a Leave Policy UK: Free Template &rarr;</Link>
              <Link href="/blog/phased-return-to-work-uk" className="block text-emerald-600 hover:underline font-medium">Phased Return to Work UK: How to Get It Right &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
