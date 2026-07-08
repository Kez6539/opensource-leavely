import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/sickness-absence-trigger-points-uk`

export const metadata: Metadata = {
  title: 'Sickness Absence Trigger Points UK: How to Set Fair Thresholds',
  description:
    'How to set fair sickness absence trigger points. Common thresholds, Bradford Factor scores, informal vs formal stages, and disability considerations for UK employers.',
  alternates: { canonical: articleUrl },
  keywords: [
    'sickness absence trigger points',
    'absence trigger points UK',
    'absence management triggers',
    'Bradford Factor trigger points',
    'absence trigger thresholds',
    'sickness absence policy triggers',
  ],
  openGraph: {
    title: 'Sickness Absence Trigger Points UK: How to Set Fair Thresholds',
    description: 'Common thresholds, Bradford Factor scores, informal vs formal stages, and disability considerations.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Sickness Absence Trigger Points UK: How to Set Fair Thresholds',
  description: 'How to set fair sickness absence trigger points for UK employers.',
  url: articleUrl,
  datePublished: '2026-04-04',
  dateModified: '2026-04-04',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function SicknessAbsenceTriggerPointsArticle() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Absence Management</span>
            <span className="text-xs text-gray-400 ml-3">9 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Sickness Absence Trigger Points UK: How to Set Fair Thresholds
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Trigger points are predefined thresholds that prompt a management action when an employee&apos;s sickness absence reaches a certain level. Used correctly, they provide a fair, consistent framework for managing absence. Used poorly, they become a blunt instrument that penalises people with genuine health problems. This guide explains how to set triggers that are both effective and legally safe.
            </p>

            <h2>What are absence trigger points?</h2>
            <p>
              A trigger point is a threshold written into your absence management policy. When an employee&apos;s absence hits the trigger, it prompts a specific action. Typically this means a conversation between the employee and their manager, which may be informal at first and progress to formal stages if absence continues.
            </p>
            <p>
              The purpose is not to punish people for being ill. It is to ensure that absence is discussed, support is offered, and patterns are addressed before they become unmanageable.
            </p>

            <h2>Common trigger point thresholds</h2>
            <p>
              There is no legally prescribed threshold. Employers set their own based on what is reasonable for their business. The most common approaches are:
            </p>

            <h3>Frequency-based triggers</h3>
            <p>
              These count the <strong>number of separate absence occasions</strong> in a rolling 12-month period, regardless of how long each absence lasted.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Informal stage:</strong> 3 occasions in 12 months</li>
              <li><strong>Formal stage 1:</strong> 4 occasions in 12 months</li>
              <li><strong>Formal stage 2:</strong> 5 occasions in 12 months</li>
              <li><strong>Final stage:</strong> 6 or more occasions in 12 months</li>
            </ul>
            <p>
              Frequency-based triggers are effective at identifying patterns of short, repeated absences (such as regular Monday sickness), which often indicate underlying issues.
            </p>

            <h3>Duration-based triggers</h3>
            <p>
              These count the <strong>total number of days absent</strong> in a rolling 12-month period.
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Informal stage:</strong> 8 to 10 days in 12 months</li>
              <li><strong>Formal stage 1:</strong> 15 days in 12 months</li>
              <li><strong>Formal stage 2:</strong> 20 days in 12 months</li>
            </ul>
            <p>
              Duration-based triggers catch sustained absence but may miss patterns of frequent short absences.
            </p>

            <h3>Combined triggers</h3>
            <p>
              Many employers use <strong>both</strong> frequency and duration triggers. For example: 3 occasions <strong>or</strong> 10 days in any rolling 12-month period, whichever is reached first. This approach catches both types of absence pattern.
            </p>

            <h2>Using the Bradford Factor as a trigger</h2>
            <p>
              The <strong>Bradford Factor</strong> is a formula that weights frequent short absences more heavily than a single long absence. The formula is:
            </p>
            <p><strong>B = S &times; S &times; D</strong></p>
            <p>Where S is the number of separate absence spells and D is the total days absent in a rolling 12-month period.</p>

            <h3>Worked examples</h3>
            <ul className="list-disc pl-6">
              <li>1 absence of 10 days: 1 &times; 1 &times; 10 = <strong>10</strong></li>
              <li>5 absences of 2 days each: 5 &times; 5 &times; 10 = <strong>250</strong></li>
              <li>10 absences of 1 day each: 10 &times; 10 &times; 10 = <strong>1,000</strong></li>
            </ul>
            <p>
              This illustrates why the Bradford Factor is useful. Ten single-day absences are far more disruptive than one ten-day absence, because each instance requires cover arrangements, handovers, and catch-up time.
            </p>

            <h3>Common Bradford Factor trigger levels</h3>
            <ul className="list-disc pl-6">
              <li><strong>0 to 50:</strong> No concern</li>
              <li><strong>51 to 124:</strong> Informal discussion</li>
              <li><strong>125 to 399:</strong> Formal stage 1 (written warning)</li>
              <li><strong>400 to 649:</strong> Formal stage 2 (final written warning)</li>
              <li><strong>650+:</strong> Consideration of dismissal</li>
            </ul>
            <p>
              These are typical thresholds, not legal requirements. You can adjust them to suit your business and sector.
            </p>

            <h2>Informal vs formal stages</h2>

            <h3>Informal stage</h3>
            <p>
              When a trigger is first hit, the response should be an informal, supportive conversation. The manager should:
            </p>
            <ul className="list-disc pl-6">
              <li>Express concern for the employee&apos;s wellbeing</li>
              <li>Discuss the absence pattern and any underlying causes</li>
              <li>Explore whether workplace factors are contributing</li>
              <li>Offer support (occupational health, EAP, flexible working)</li>
              <li>Explain that continued absence at this level will move to a formal process</li>
            </ul>
            <p>
              Keep a brief written record of the conversation and any agreed actions.
            </p>

            <h3>Formal stages</h3>
            <p>
              If absence continues, the formal process mirrors a disciplinary procedure but framed as capability rather than conduct. Each formal stage should include:
            </p>
            <ul className="list-disc pl-6">
              <li>Written notification of the meeting and the right to be accompanied</li>
              <li>A review of the absence record and any medical evidence</li>
              <li>An opportunity for the employee to explain</li>
              <li>A clear outcome (improvement target, review date, consequences of no improvement)</li>
              <li>A right of appeal</li>
            </ul>

            <h2>Disability considerations</h2>
            <p>
              This is where trigger points can create legal risk. If an employee has a disability under the Equality Act 2010, applying trigger points rigidly could amount to <strong>discrimination arising from disability</strong>.
            </p>
            <p>To protect your business:</p>
            <ul className="list-disc pl-6">
              <li><strong>Separate disability-related absence:</strong> Consider not counting absence caused by a disability towards the trigger thresholds, or applying higher thresholds.</li>
              <li><strong>Consider reasonable adjustments:</strong> Adjusting trigger points is itself a reasonable adjustment that a tribunal would expect you to consider.</li>
              <li><strong>Get occupational health advice:</strong> Before taking formal action against someone with a known health condition, get professional guidance.</li>
              <li><strong>Apply discretion:</strong> The policy should state that triggers prompt a review, not an automatic sanction. Managers must consider individual circumstances.</li>
            </ul>

            <h2>Best practices for fair trigger points</h2>
            <ol className="list-decimal pl-6">
              <li><strong>Write them into your policy.</strong> Triggers should be clearly documented so employees know what to expect.</li>
              <li><strong>Use rolling 12-month periods.</strong> This prevents old absences from counting indefinitely while still capturing recent patterns.</li>
              <li><strong>Triggers prompt a review, not automatic sanctions.</strong> Every case should be considered on its merits.</li>
              <li><strong>Train managers.</strong> Managers need to understand how to conduct supportive conversations and when to escalate.</li>
              <li><strong>Review thresholds annually.</strong> Compare your triggers against actual absence data. If 80% of your workforce is hitting the informal trigger, it may be set too low.</li>
              <li><strong>Communicate the purpose.</strong> Employees are more likely to accept trigger points if they understand they exist to support, not to punish.</li>
            </ol>

            <h2>How Leavely calculates and flags triggers automatically</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> takes the manual work out of absence monitoring:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Automatic Bradford Factor:</strong> Leavely calculates each employee&apos;s Bradford Factor score in real time as absence data is recorded.</li>
              <li><strong>Trigger alerts:</strong> Set your own trigger thresholds and receive notifications when employees reach them.</li>
              <li><strong>Absence dashboards:</strong> See frequency, duration, and patterns at a glance for individuals and teams.</li>
              <li><strong>Return-to-work logging:</strong> Record RTW interview notes directly against the absence record.</li>
              <li><strong>Audit trail:</strong> Every absence entry, approval, and management action is logged with timestamps for compliance evidence.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Automate absence trigger monitoring</h3>
            <p className="text-emerald-100 mb-6">Leavely calculates Bradford Factor scores and flags triggers automatically, so you never miss a pattern.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">Bradford Factor Explained: How to Calculate and Use It &rarr;</Link>
              <Link href="/blog/managing-long-term-sickness-uk" className="block text-emerald-600 hover:underline font-medium">Managing Long Term Sickness Absence UK: Employer Guide &rarr;</Link>
              <Link href="/blog/absence-management-policy-uk" className="block text-emerald-600 hover:underline font-medium">Absence Management Policy UK: Complete Guide &amp; Template &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
