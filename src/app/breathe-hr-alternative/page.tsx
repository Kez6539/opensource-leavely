import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronDown, Clock, CreditCard, Shield, X, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingFooter, MarketingNav } from '@/components/marketing-layout'
import { SITE_NAME, SITE_URL } from '@/lib/seo'

const pageUrl = `${SITE_URL}/breathe-hr-alternative`

export const metadata: Metadata = {
  title: 'BreatheHR Alternative UK: Leavely vs BreatheHR (2026)',
  description:
    'Compare Leavely with BreatheHR for UK small businesses. A 1200+ word BreatheHR alternative guide covering leave management, rotas, clock-in, pricing clarity, setup, and feature fit.',
  alternates: { canonical: pageUrl },
  keywords: [
    'BreatheHR alternative',
    'Breathe HR alternative',
    'alternative to BreatheHR',
    'BreatheHR competitor',
    'BreatheHR alternative UK',
    'BreatheHR replacement',
    'switch from BreatheHR',
  ],
  openGraph: {
    title: 'BreatheHR Alternative UK — Leavely',
    description:
      'A practical BreatheHR alternative for UK teams that want leave, sickness, rotas, clock-in, expenses, and performance tools in one simple £8/user/month plan.',
    url: pageUrl,
    type: 'website',
  },
}

type FeatureValue = boolean | string

type ComparisonFeature = {
  feature: string
  leavely: FeatureValue
  breathehr: FeatureValue
}

const registerUrl = '/register?utm_source=website&utm_campaign=breathehr_alternative'

const faqs = [
  {
    q: 'What is the best BreatheHR alternative for UK small businesses?',
    a: 'Leavely is a strong BreatheHR alternative for UK small businesses that mainly want simple leave management, sickness tracking, rotas, clock-in, expenses, and performance reviews without choosing between multiple HR packages. It is priced at £8 per user per month with every Leavely feature included.',
  },
  {
    q: 'How does Leavely pricing compare with BreatheHR?',
    a: 'Leavely uses one transparent price: £8 per user per month, billed monthly, with a 14-day free trial. BreatheHR pricing is typically organised around company size and optional add-ons, so buyers should check BreatheHR directly for the latest package and module prices before deciding.',
  },
  {
    q: 'Can I migrate from BreatheHR to Leavely?',
    a: 'Yes. Most small businesses can set up Leavely, add employees, configure leave year rules, and run it alongside BreatheHR for a short validation period. Because Leavely calculates balances from the leave year and allowance settings, the switch does not need to become a long consultancy project.',
  },
  {
    q: 'Does Leavely replace every BreatheHR feature?',
    a: 'No. BreatheHR is a broader HR platform with employee records, documents, and HR admin workflows. Leavely is the better fit when absence, leave, rotas, clock-in, expenses, and lightweight performance workflows are the operational pain. If you need a full HR database first, compare both products carefully.',
  },
  {
    q: 'Is Leavely suitable for shift-based teams?',
    a: 'Yes. Leavely is built for UK teams that need leave requests to sit next to rota and attendance context. Managers can see who is off, who is scheduled, and where absence could leave a shift exposed before they approve a request.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: `${SITE_NAME} — BreatheHR Alternative`,
      url: pageUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        'Leavely is a BreatheHR alternative for UK teams that need leave management, sickness tracking, rotas, clock-in, expenses, and performance workflows in one simple plan.',
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
    {
      '@type': 'WebPage',
      name: 'BreatheHR Alternative',
      url: pageUrl,
      datePublished: '2026-06-26',
      dateModified: '2026-06-26',
    },
  ],
}

const comparisonFeatures: ComparisonFeature[] = [
  { feature: 'Holiday and annual leave requests', leavely: true, breathehr: true },
  { feature: 'Visual team leave calendar', leavely: true, breathehr: true },
  { feature: 'Automatic allowance and balance tracking', leavely: true, breathehr: true },
  { feature: 'Sickness and absence logging', leavely: true, breathehr: true },
  { feature: 'Bradford Factor visibility', leavely: true, breathehr: 'Check plan' },
  { feature: 'TOIL tracking', leavely: true, breathehr: true },
  { feature: 'UK bank holiday support', leavely: true, breathehr: true },
  { feature: 'Rotas and shift planning', leavely: true, breathehr: 'Add-on or package dependent' },
  { feature: 'Employee clock-in and attendance', leavely: true, breathehr: 'Add-on or package dependent' },
  { feature: 'Expense management', leavely: true, breathehr: 'Add-on or package dependent' },
  { feature: 'Performance reviews', leavely: true, breathehr: true },
  { feature: 'All Leavely features in one plan', leavely: true, breathehr: false },
  { feature: 'Transparent self-serve pricing', leavely: true, breathehr: 'Package dependent' },
  { feature: 'Monthly subscription', leavely: true, breathehr: 'Check terms' },
  { feature: '14-day free trial', leavely: true, breathehr: true },
]

const leavelyHighlights = [
  'One £8/user/month plan with all Leavely features included',
  'Leave, sickness, rotas, clock-in, expenses, and performance in one workspace',
  'Built for UK small businesses that want quick setup and clear day-to-day workflows',
  'No credit card required for the 14-day free trial',
]

const breathehrConsiderations = [
  'Broader HR platform with employee records, documents, and HR administration',
  'Pricing and available modules can depend on company size, package, and optional add-ons',
  'Strong fit when the priority is a wider HR database rather than an operational leave hub',
  'Buyers should confirm the latest package details directly before switching',
]

const articleSections = [
  {
    title: 'Quick verdict',
    paragraphs: [
      'BreatheHR is a known HR platform for UK SMEs, and for many businesses it is a sensible first step away from spreadsheets. It gives teams a central place for people records, holiday requests, absence notes, documents, and everyday HR admin. The reason people search for a BreatheHR alternative is usually not that BreatheHR cannot handle basic HR. The search normally starts when the business wants a simpler operational layer for leave, sickness, shifts, attendance, and manager approvals without turning every decision into a package comparison.',
      'Leavely is built around that narrower and more operational problem. If your team mainly needs to know who is off, who is available, who is scheduled, who clocked in, and whether a leave request will leave a rota exposed, Leavely is designed to keep those answers close together. The product is priced at £8 per user per month with every Leavely feature included, so managers do not need to work out which tier unlocks the workflow they need. That makes Leavely a practical BreatheHR alternative for teams that value speed, transparency, and a focused absence workflow over a broader HR suite.',
    ],
  },
  {
    title: 'Why businesses compare BreatheHR and Leavely',
    paragraphs: [
      'The overlap between the two products is leave and absence management. Both can help move holiday requests out of email threads and spreadsheets. Both can give managers a clearer view of who is away. Both can support a more consistent process for approving requests and recording sickness. The difference is the centre of gravity. BreatheHR is a wider HR system. Leavely is a leave and workforce operations product for small UK teams that need the absence calendar to connect with rotas, clock-in activity, expenses, and lightweight performance conversations.',
      'That distinction matters because small businesses often buy software to solve a painful daily workflow, not to build a perfect HR architecture. A cafe group wants to know whether approving two people on the same Saturday breaks the rota. A dental practice wants sickness notes and leave balances in one place without chasing messages. A care provider wants visibility across shifts before agreeing time off. A small professional services firm wants fewer interruptions, clearer approvals, and a simple record of who is off. Leavely is aimed at those operating rhythms.',
    ],
  },
  {
    title: 'Pricing and buying experience',
    paragraphs: [
      'Pricing clarity is one of the strongest reasons to evaluate Leavely as a BreatheHR alternative. Leavely publishes one price: £8 per user per month. The free trial lasts 14 days and does not require a credit card. There are no Leavely feature tiers to decode. A small team gets the same product shape as a larger team, and the bill scales in a way that is easy to model before anyone speaks to sales.',
      'BreatheHR pricing has historically been arranged around company size and optional product areas. That can be perfectly reasonable for a broader HR suite, but it changes the buying process. Buyers need to confirm which package includes the workflows they care about, whether rota or time features are part of the package they are considering, and how future headcount growth changes the monthly cost. If you need a full HR system, that extra comparison may be worth doing. If your priority is the fastest route to better leave control, a single published price can be easier to defend internally.',
    ],
  },
  {
    title: 'Feature fit for leave and absence',
    paragraphs: [
      'For leave management, the important question is not whether a feature exists somewhere in the product. The important question is whether the feature is available in the workflow where managers make decisions. Leavely puts the team calendar, balances, sick leave, TOIL, bank holidays, approvals, and shift context close together. That reduces the need to check one system for holiday, another for rotas, and a spreadsheet for remaining allowance.',
      'BreatheHR covers core HR and absence features, and that breadth can be useful. For a team that wants employee records, document storage, HR reporting, and people administration in one place, BreatheHR deserves consideration. For a team that is frustrated because leave requests keep colliding with rota gaps, the broader HR database is less important than fast operational visibility. This is where Leavely can feel lighter: the product is designed around the approval moment, not around building a comprehensive HR record for every possible process.',
    ],
  },
  {
    title: 'Rotas, clock-in, and shift coverage',
    paragraphs: [
      'Shift-based teams should be especially careful when comparing BreatheHR alternatives. Leave software that works for a Monday-to-Friday office can still fail in hospitality, retail, healthcare, education support, manufacturing, or care settings. The calendar may show that someone is away, but it may not show whether their absence leaves a shift uncovered or whether another employee has already reached a practical working limit.',
      'Leavely includes rota and clock-in workflows so leave decisions can be made with the right context. A manager can look at availability and absence together instead of reconstructing the picture from separate tools. This is not just a convenience feature. It changes approval quality. Instead of approving time off and discovering the rota gap later, the manager can spot the issue before the approval is sent. For small teams where one missing person can change the day, that visibility is often more valuable than a long list of HR features.',
    ],
  },
  {
    title: 'Implementation and switching',
    paragraphs: [
      'Switching HR systems can sound risky because people data is sensitive and operational continuity matters. The sensible way to move from BreatheHR to Leavely is to keep the switch narrow. Start with the leave year, employee list, allowances, approval rules, and any current booked leave. Then run Leavely alongside the existing process for a short period so managers can check balances and approvals before the team fully moves over.',
      'Leavely is intentionally quick to configure. The goal is not a months-long HR transformation project. The goal is to replace the messy daily workflow: holiday requests in chat, sickness notes in email, rota checks in a separate document, and managers carrying entitlement numbers in their head. Once the team is confident that leave balances, bank holidays, and approval routes are right, the old process can be retired. That makes the switching risk much smaller than a full HR system migration.',
    ],
  },
  {
    title: 'Which product should you choose?',
    paragraphs: [
      'Choose BreatheHR if your main requirement is a broader HR platform and you want employee records, documents, HR admin, and people processes in one system. It is a mature category product and may be a good fit for companies that want a general HR backbone before they optimise individual workflows.',
      'Choose Leavely if the business problem is operational absence control. That means fewer leave clashes, faster approvals, cleaner sickness tracking, clearer rota coverage, simple clock-in context, and a price that is easy to understand before you start. Leavely is not trying to be every HR process at once. It is trying to make the leave and workforce availability workflow easy enough that managers actually use it every day.',
      'For many UK small businesses, that focus is the point. The best BreatheHR alternative is not automatically the product with the longest feature list. It is the product that removes the most admin from the workflow your team repeats every week. If holiday approvals, sickness absence, shift coverage, and employee availability are the pain, Leavely is the cleaner place to start.',
    ],
  },
]

function renderFeatureValue(value: FeatureValue) {
  if (value === true) {
    return <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-500" aria-label="Included" />
  }

  if (value === false) {
    return <X className="mx-auto h-5 w-5 text-gray-300" aria-label="Not included" />
  }

  return <span className="text-xs font-medium text-amber-600">{value}</span>
}

export default function BreatheHRAlternativePage() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/60 via-white to-white" />
          <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-20 md:pb-16 md:pt-28">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
                <Zap className="h-4 w-4" />
                BreatheHR alternative
              </div>
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                BreatheHR Alternative for UK Small Businesses
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500 md:text-xl">
                Compare Leavely with BreatheHR for leave management, sickness tracking, rotas, clock-in,
                expenses, performance workflows, pricing clarity, and day-to-day manager usability.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href={registerUrl}>
                  <Button
                    size="lg"
                    className="h-12 bg-gradient-to-r from-emerald-600 to-teal-600 px-8 text-base font-semibold shadow-lg shadow-emerald-500/25 transition-all hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl hover:shadow-emerald-500/30"
                  >
                    Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/book-a-demo">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-base font-medium">
                    Book a demo
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-gray-400">Free 14-day trial. No credit card required.</p>
              <div className="mt-8 grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                <div className="rounded-lg border bg-white p-4">
                  <p className="text-3xl font-extrabold text-emerald-600">£8</p>
                  <p className="text-sm text-gray-500">per user/month</p>
                </div>
                <div className="rounded-lg border bg-white p-4">
                  <p className="text-3xl font-extrabold text-emerald-600">14 days</p>
                  <p className="text-sm text-gray-500">free trial</p>
                </div>
                <div className="rounded-lg border bg-white p-4">
                  <p className="text-3xl font-extrabold text-emerald-600">All in</p>
                  <p className="text-sm text-gray-500">no Leavely tiers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y bg-gray-50/50">
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 py-16 md:grid-cols-2 md:py-20">
            <div className="rounded-lg border-2 border-emerald-500 bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Leavely</h2>
              </div>
              <p className="mb-1 text-4xl font-extrabold text-gray-900">
                £8<span className="text-lg font-medium text-gray-400">/user/mo</span>
              </p>
              <p className="mb-6 text-sm text-gray-500">One plan with every Leavely feature included.</p>
              <ul className="space-y-3">
                {leavelyHighlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">BreatheHR</h2>
              </div>
              <p className="mb-1 text-4xl font-extrabold text-gray-900">
                Package<span className="text-lg font-medium text-gray-400"> based</span>
              </p>
              <p className="mb-6 text-sm text-gray-500">Confirm current plans and add-ons directly.</p>
              <ul className="space-y-3">
                {breathehrConsiderations.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4 flex-shrink-0 text-gray-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
                Feature table: Leavely vs BreatheHR
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
                Use this table as a practical buying checklist. BreatheHR package details can change, so confirm
                module availability directly before making a final decision.
              </p>
            </div>
            <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
              <div className="grid grid-cols-3 border-b bg-gray-50 px-4 py-4 text-sm font-semibold text-gray-700 md:px-6">
                <span>Feature</span>
                <span className="text-center">Leavely</span>
                <span className="text-center">BreatheHR</span>
              </div>
              {comparisonFeatures.map((row) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-3 border-b px-4 py-3.5 text-sm last:border-b-0 md:px-6"
                >
                  <span className="font-medium text-gray-700">{row.feature}</span>
                  <span className="text-center">{renderFeatureValue(row.leavely)}</span>
                  <span className="text-center">{renderFeatureValue(row.breathehr)}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-gray-400">
              Comparison reflects public product positioning and should be checked against each vendor&apos;s latest
              published terms before purchase.
            </p>
          </div>
        </section>

        <section className="bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Try a focused BreatheHR alternative
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
              Set up Leavely, add your team, configure leave rules, and test approvals before you make a switching
              decision.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={registerUrl}>
                <Button size="lg" className="h-12 bg-white px-8 text-base font-semibold text-emerald-700 shadow-lg hover:bg-gray-50">
                  Start free trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="h-12 border-white/30 px-8 text-base text-white hover:bg-white/10">
                  View pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section>
          <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
            <div className="mb-10 flex items-center gap-3 text-sm font-medium text-emerald-700">
              <Clock className="h-4 w-4" />
              1200+ word comparison guide
            </div>
            <div className="space-y-12">
              {articleSections.map((section) => (
                <section key={section.title}>
                  <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
                    {section.title}
                  </h2>
                  <div className="space-y-5 text-base leading-8 text-gray-600">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </section>

        <section className="border-y bg-gray-50/50">
          <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
            <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-lg border bg-white shadow-sm">
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-left">
                    <span className="pr-4 font-semibold text-gray-900">{faq.q}</span>
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-5 leading-relaxed text-gray-600">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              Start with the workflow your managers repeat every week
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
              Leave requests, sickness records, rotas, and attendance context belong in the same operational view.
              Try Leavely free and see whether a focused tool is the better fit.
            </p>
            <div className="mt-8">
              <Link href={registerUrl}>
                <Button
                  size="lg"
                  className="h-12 bg-gradient-to-r from-emerald-600 to-teal-600 px-8 text-base font-semibold shadow-lg shadow-emerald-500/25 hover:from-emerald-700 hover:to-teal-700"
                >
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
