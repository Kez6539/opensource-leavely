import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/blackout-dates-leave-management`

export const metadata: Metadata = {
  title: 'Blackout Dates for Leave Management: Block Leave During Busy Periods',
  description:
    'How to use blackout dates to restrict leave during busy periods. Covers UK legal position, when to use leave embargoes, communication best practices, and automatic enforcement.',
  alternates: { canonical: articleUrl },
  keywords: [
    'blackout dates leave',
    'restricted leave periods',
    'leave embargo',
    'block leave during busy periods',
    'leave blackout policy',
    'leave restriction dates',
    'holiday blackout periods',
    'leave embargo UK',
    'restricted holiday periods',
    'leave management blackout dates',
  ],
  openGraph: {
    title: 'Blackout Dates for Leave Management: Block Leave During Busy Periods',
    description: 'How to use blackout dates to restrict leave during peak periods while staying legally compliant.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Blackout Dates for Leave Management: Block Leave During Busy Periods',
  description: 'Complete guide to leave blackout dates for UK employers.',
  url: articleUrl,
  datePublished: '2026-04-01',
  dateModified: '2026-04-01',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function BlackoutDatesArticle() {
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
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Feature Guide</span>
            <span className="text-xs text-gray-400 ml-3">9 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Blackout Dates for Leave Management: Block Leave During Busy Periods
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Every business has peak periods where losing staff to annual leave would be disruptive or even damaging. <strong>Blackout dates</strong> (also called leave embargoes or restricted leave periods) are specific dates when the organisation restricts or blocks employee leave requests. Used correctly, they protect the business during critical times. Used badly, they breed resentment. This guide covers what blackout dates are, when to use them, and the UK legal position.
            </p>

            <h2>What are blackout dates?</h2>
            <p>
              Blackout dates are periods defined by the employer during which employees cannot book annual leave (or where leave requests will only be approved in exceptional circumstances). They&apos;re typically set in advance for predictable busy periods and communicated to staff at the start of the leave year.
            </p>
            <p>
              Blackout dates are not the same as <strong>company shutdowns</strong>. A shutdown forces everyone to take leave at the same time (e.g., the business closes between Christmas and New Year). Blackout dates are the opposite &mdash; they require everyone to be <em>available</em> during that period.
            </p>

            <h2>When should you use blackout dates?</h2>
            <p>
              Blackout dates make sense when the business has predictable, high-demand periods where understaffing would cause measurable harm. Common examples include:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Quarter-end and year-end close</strong> &mdash; accounting and finance teams often need all hands on deck during reporting periods. Month-end close, annual audits, and tax filing deadlines are prime blackout candidates.</li>
              <li><strong>Retail peak seasons</strong> &mdash; the Christmas rush (November through early January), Black Friday, and summer sales are obvious blackout periods for retail businesses.</li>
              <li><strong>Hospitality high season</strong> &mdash; hotels, restaurants, and event venues may restrict leave during bank holiday weekends, summer months, or the December festive period.</li>
              <li><strong>Audit and inspection windows</strong> &mdash; regulated industries (finance, healthcare, construction) may need full attendance during scheduled audits or regulatory inspections.</li>
              <li><strong>Product launches and go-live dates</strong> &mdash; technology and project-based businesses may set blackout dates around major releases or client deliverables.</li>
              <li><strong>School term periods</strong> &mdash; education sector staff typically cannot take leave during term time.</li>
            </ul>

            <h2>Can you legally refuse annual leave in the UK?</h2>
            <p>
              Yes. Under the <strong>Employment Rights Act 1996</strong> (specifically the Working Time Regulations 1998, regulation 15), an employer <em>can</em> refuse a leave request or require an employee to take leave on specific dates, provided they give adequate notice.
            </p>
            <p>
              The rules are straightforward:
            </p>
            <ul className="list-disc pl-6">
              <li>To <strong>refuse leave</strong>, the employer must give notice equal to at least the length of the leave requested. For example, to refuse a one-week holiday, you must give at least one week&apos;s notice of the refusal.</li>
              <li>To <strong>require leave on specific dates</strong>, the employer must give notice of at least twice the length of the leave period. To require someone to take one week off, you need two weeks&apos; notice.</li>
              <li>The employee must still be able to take their <strong>full statutory entitlement</strong> (5.6 weeks per year) at some point during the leave year. You cannot use blackout dates to prevent an employee from ever using their holiday.</li>
            </ul>
            <p>
              In practice, this means blackout dates are perfectly lawful as long as:
            </p>
            <ol className="list-decimal pl-6">
              <li>You communicate them with reasonable notice (ideally at the start of the leave year).</li>
              <li>The blackout periods don&apos;t collectively prevent employees from taking their statutory entitlement.</li>
              <li>You apply the policy consistently &mdash; don&apos;t allow some employees to take leave during blackout periods without a fair reason.</li>
            </ol>

            <h2>How to communicate blackout dates effectively</h2>
            <p>
              The biggest source of friction around blackout dates is poor communication. Employees who discover restrictions only when their request is rejected feel blindsided and unfairly treated. Here&apos;s how to get it right:
            </p>

            <h3>1. Announce blackout dates at the start of the leave year</h3>
            <p>
              Publish the year&apos;s blackout dates as early as possible &mdash; ideally when the new leave year begins. This gives employees time to plan around them.
            </p>

            <h3>2. Explain the business reason</h3>
            <p>
              Don&apos;t just say &quot;no leave in December.&quot; Explain <em>why</em>: &quot;Our retail sales triple in December and we need full staffing to meet customer demand.&quot; People are much more likely to accept restrictions when they understand the reasoning.
            </p>

            <h3>3. Include blackout dates in your leave policy</h3>
            <p>
              Your written leave policy should reference the concept of blackout dates, even if the specific dates change each year. This sets the expectation that restricted periods are a normal part of the leave framework.
            </p>

            <h3>4. Show blackout dates where people book leave</h3>
            <p>
              If blackout dates are visible on the leave booking form, employees self-select away from those dates. This is far better than the negative experience of submitting a request and having it rejected days later.
            </p>

            <h3>5. Allow exceptions for genuine emergencies</h3>
            <p>
              A rigid &quot;no leave, no exceptions&quot; approach during blackout periods can backfire. Genuine emergencies happen. Build in a process for exceptional approval by senior management.
            </p>

            <h2>Common mistakes with blackout dates</h2>
            <ol className="list-decimal pl-6">
              <li><strong>Too many blackout periods</strong> &mdash; if half the year is blacked out, the policy loses credibility and employees feel their leave entitlement is being undermined. Keep blackout dates genuinely exceptional.</li>
              <li><strong>Inconsistent enforcement</strong> &mdash; if managers quietly approve leave for some people during blackout periods but not others, you invite grievances and potential discrimination claims.</li>
              <li><strong>Late communication</strong> &mdash; announcing a blackout period two weeks before it starts, after people have already made plans, causes unnecessary conflict.</li>
              <li><strong>No alternative options</strong> &mdash; if December is blacked out, make sure January and February are genuinely available. Employees need to feel their leave entitlement is real.</li>
              <li><strong>Blanket application</strong> &mdash; not all departments need the same blackout dates. Finance might need everyone during quarter-end, but the engineering team may be unaffected. Apply blackout dates by department where appropriate.</li>
            </ol>

            <h2>How Leavely implements blackout dates</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> makes it easy to set up and enforce blackout dates without the administrative overhead:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Admin blackout date settings</strong> &mdash; administrators can define blackout periods in the settings panel, specifying the date range, affected departments, and whether the restriction is a hard block or a soft warning.</li>
              <li><strong>Automatic enforcement on the booking form</strong> &mdash; when an employee selects dates that fall within a blackout period, the form clearly shows the restriction with an explanation. Hard blocks prevent submission; soft warnings allow the request but flag it for the manager.</li>
              <li><strong>Calendar visibility</strong> &mdash; blackout dates appear on the team leave calendar as shaded zones, so employees can see restricted periods at a glance when planning their time off.</li>
              <li><strong>Department-level control</strong> &mdash; blackout dates can be applied to specific departments rather than the whole organisation, giving you the granularity most businesses need.</li>
              <li><strong>Exception handling</strong> &mdash; managers can override blackout restrictions for individual requests when exceptional circumstances warrant it, with the override logged in the audit trail.</li>
            </ul>

            <h2>Blackout dates vs. leave caps</h2>
            <p>
              Blackout dates are a binary restriction: leave is either blocked or not during a specific period. An alternative approach is <strong>leave caps</strong> &mdash; limiting the number of people who can be off simultaneously rather than blocking leave entirely. For example, allowing up to 2 out of 8 team members to take leave during December.
            </p>
            <p>
              Leave caps are more flexible and feel fairer to employees. They work well when some absence is tolerable but you need to maintain a minimum staffing level. Blackout dates are better when you genuinely need <em>everyone</em> available &mdash; for example, during a one-week audit or a three-day product launch.
            </p>
            <p>
              The best approach for most businesses is a combination: hard blackout dates for truly critical periods (a few days per year) and leave caps for extended busy seasons.
            </p>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Enforce blackout dates automatically</h3>
            <p className="text-emerald-100 mb-6">Leavely blocks or warns employees when they try to book leave during restricted periods. No manual policing needed.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/leave-clash-detection-software" className="block text-emerald-600 hover:underline font-medium">Leave Clash Detection: How to Prevent Understaffing &rarr;</Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK 2026: The Complete Guide &rarr;</Link>
              <Link href="/blog/christmas-shutdown-leave-uk" className="block text-emerald-600 hover:underline font-medium">Christmas Shutdown Leave UK: What Employers Need to Know &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
