import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Zap,
  Star,
  Target,
  Users,
  BarChart3,
  ClipboardCheck,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL, SITE_NAME } from '@/lib/seo'

const pageUrl = `${SITE_URL}/performance-review-software-uk`

export const metadata: Metadata = {
  title: 'Performance Review Software UK: Run Review Cycles with Ease (2026)',
  description:
    'Performance review software for UK teams. Create review cycles, auto-assign reviewers, track strengths and improvements with 1-5 star ratings. Part of Leavely at £8/user/month.',
  alternates: { canonical: pageUrl },
  keywords: [
    'performance review software UK',
    'employee review software',
    'performance management software UK',
    'staff appraisal software',
    'employee performance review tool',
    'performance review system UK',
  ],
  openGraph: {
    title: 'Performance Review Software UK — Leavely',
    description:
      'Run review cycles, track goals, and manage staff appraisals. Part of Leavely at £8/user/month.',
    url: pageUrl,
    type: 'website',
  },
}

const faqs = [
  {
    q: 'How do review cycles work in Leavely?',
    a: 'You create a review cycle with a name, date range, and select which employees are included. Leavely automatically assigns reviewers based on reporting structure. Reviewers complete their assessments online with star ratings, written feedback on strengths and areas for improvement, and overall recommendations. You can track completion progress from a dashboard.',
  },
  {
    q: 'Can I track goals alongside performance reviews?',
    a: 'Yes. Leavely includes goal tracking where you can set objectives for each employee, assign deadlines, and track progress. Goals can be linked to review cycles so you can assess performance against agreed objectives during the review period.',
  },
  {
    q: 'What does the rating system look like?',
    a: 'Leavely uses a 1 to 5 star rating system. Reviewers rate employees across multiple criteria that you define (e.g. quality of work, communication, reliability). Each criterion gets a star rating and optional written comments. The overall score is calculated automatically.',
  },
  {
    q: 'Is performance review software included in the £8/user/month price?',
    a: 'Yes. Performance reviews and goal tracking are included in the standard Leavely plan at £8 per user per month. There are no add-on fees. You also get leave management, rota planning, time tracking, expenses, and onboarding in the same price.',
  },
  {
    q: 'Can employees see their own review results?',
    a: 'Yes. Once a review is published, the employee can see their ratings, written feedback, and any goals that were set during the review. This creates transparency and gives employees a clear understanding of expectations going forward.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — Performance Review Software UK`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      datePublished: '2026-04-05',
      description:
        'Performance review software for UK businesses. Create review cycles, auto-assign reviewers, and track employee performance with star ratings and goal tracking.',
      offers: {
        '@type': 'Offer',
        price: '8.00',
        priceCurrency: 'GBP',
        priceValidUntil: '2027-12-31',
        availability: 'https://schema.org/InStock',
        description: 'Per user per month, billed monthly. 14-day free trial included.',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ],
}

const features = [
  {
    icon: ClipboardCheck,
    title: 'Review cycles',
    description: 'Create quarterly, biannual, or annual review cycles. Select which employees are included, set deadlines, and let Leavely handle the rest. Track completion from a single dashboard.',
  },
  {
    icon: Users,
    title: 'Auto-assign reviewers',
    description: 'Leavely assigns reviewers based on your reporting structure. Managers automatically review their direct reports. You can also add secondary reviewers or peer reviews.',
  },
  {
    icon: Star,
    title: '1 to 5 star ratings',
    description: 'Define your own review criteria and rate employees on a clear 1 to 5 star scale. Each criterion includes space for written comments on strengths and areas for improvement.',
  },
  {
    icon: Target,
    title: 'Goal tracking',
    description: 'Set objectives for each employee with deadlines and milestones. Track progress throughout the year and review goal completion during performance cycles.',
  },
  {
    icon: BarChart3,
    title: 'Completion progress',
    description: 'See at a glance how many reviews have been completed, who still needs to submit theirs, and send reminders to reviewers who are behind schedule.',
  },
  {
    icon: TrendingUp,
    title: 'Performance history',
    description: 'Every review is stored and accessible. Track how an employee s performance has changed over time. Identify trends, spot improvements, and make informed decisions about development.',
  },
]

export default function PerformanceReviewSoftwareUKPage() {
  const registerUrl = '/register?utm_source=website&utm_campaign=performance_review_software_uk'

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/60 via-white to-white" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-emerald-100/40 to-teal-100/30 rounded-full blur-3xl" />

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-sm text-emerald-700 font-medium mb-6">
                <Zap className="h-4 w-4" />
                Performance review software
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                Performance Review Software
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  for UK Teams
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Run structured review cycles without the spreadsheet chaos. Create cycles, auto-assign reviewers based on your org structure, collect feedback with star ratings, and track goal completion. All part of Leavely alongside leave management, rotas, and expenses at £8 per user per month.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href={registerUrl}>
                  <Button size="lg" className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30">
                    Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/book-a-demo">
                  <Button variant="outline" size="lg" className="text-base font-medium px-8 h-12">
                    Book a demo
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-400">Free 14-day trial. No credit card required.</p>
              <div className="flex items-center gap-6 justify-center mt-6">
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">£8</p>
                  <p className="text-sm text-gray-500">per user/month</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">Reviews</p>
                  <p className="text-sm text-gray-500">+ goals included</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-emerald-600">Part of</p>
                  <p className="text-sm text-gray-500">full HR platform</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Everything you need to run effective reviews
              </h2>
              <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
                No more Word documents and email chains. Structured review cycles that managers actually complete.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-2xl border bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-500 leading-relaxed text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why not standalone */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Why performance reviews work better inside your HR platform
            </h2>
            <div className="space-y-6">
              {[
                { title: 'Context from attendance and leave data', description: 'When reviewing someone s performance, it helps to see their attendance patterns, sick leave history, and TOIL balances. Leavely puts this data alongside the review so managers have the full picture, not just a star rating.' },
                { title: 'Goals connect to day-to-day work', description: 'Goals set during a review cycle are visible to the employee throughout the year, not buried in a document they will never open again. They can update progress, and managers can check in without scheduling a separate meeting.' },
                { title: 'One tool your team already uses', description: 'If your team already uses Leavely for leave requests and rotas, adding performance reviews means zero extra logins, zero extra training, and zero extra cost. It is already in the tool they open every day.' },
                { title: 'No extra cost, no extra software', description: 'Standalone performance review tools like Lattice or 15Five cost £8 to £15 per user per month on their own. With Leavely, performance reviews are included in the £8 per user price alongside every other HR feature.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Run your next review cycle with Leavely
            </h2>
            <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
              Set up a review cycle in minutes. Auto-assign reviewers. Track completion. All included at £8 per user per month.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={registerUrl}>
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg text-base px-8 h-12">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-base px-8 h-12">
                  View pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              How review cycles work in Leavely
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '1', title: 'Create cycle', description: 'Name your cycle, set dates, and choose which employees are included.' },
                { step: '2', title: 'Auto-assign', description: 'Reviewers are assigned automatically based on your reporting structure.' },
                { step: '3', title: 'Collect feedback', description: 'Reviewers rate performance, note strengths, and suggest improvements.' },
                { step: '4', title: 'Publish results', description: 'Share results with employees and set goals for the next period.' },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-extrabold text-emerald-600">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-50/50 border-y">
          <div className="max-w-3xl mx-auto px-6 py-20 md:py-28">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight text-center mb-12">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-2xl border bg-white shadow-sm">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-left">
                    <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                    <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section>
          <div className="max-w-4xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Try Leavely free for 14 days
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
              Performance reviews, goal tracking, leave management, and more. All for £8 per user per month. No credit card needed.
            </p>
            <div className="mt-8">
              <Link href={registerUrl}>
                <Button size="lg" className="text-base font-semibold px-8 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  )
}
