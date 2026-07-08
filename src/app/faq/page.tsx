import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { FaqAccordion, type FaqCategory } from './faq-accordion'

/* ---------- FAQ Data ---------- */

const faqCategories: FaqCategory[] = [
  {
    title: 'Getting Started',
    items: [
      {
        question: 'What is Leavely?',
        answer: (
          <>
            Leavely is leave management software designed for UK small and medium-sized
            businesses. It replaces spreadsheets and email chains with a single platform
            where employees request time off, managers approve in one click, and balances
            update automatically. Learn more on our{' '}
            <Link href="/features" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">
              features page
            </Link>.
          </>
        ),
      },
      {
        question: 'How do I sign up?',
        answer: (
          <>
            Visit the{' '}
            <Link href="/register" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">
              registration page
            </Link>
            , enter your name, email, and a password (or sign up with Google). Your
            workspace is created instantly and you can invite your team straight away.
            No credit card is needed.
          </>
        ),
      },
      {
        question: 'Is there a free trial?',
        answer:
          'Yes. Every new workspace gets a full-featured 14-day free trial with no credit card required. You get access to every feature during the trial, and your data is kept when you subscribe.',
      },
      {
        question: 'How long does setup take?',
        answer:
          'Most teams are up and running in under two minutes. Create your workspace, invite employees via email, and start managing leave immediately. UK bank holidays are pre-loaded so there is nothing extra to configure.',
      },
    ],
  },
  {
    title: 'Pricing & Billing',
    items: [
      {
        question: 'How much does Leavely cost?',
        answer: (
          <>
            Leavely costs <strong>£8 per active employee per month</strong>, billed
            monthly. Every feature is included — there are no tiers or hidden fees. See
            full details on the{' '}
            <Link href="/pricing" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">
              pricing page
            </Link>.
          </>
        ),
      },
      {
        question: 'Is there a minimum number of employees?',
        answer:
          'No. Whether you have 2 employees or 200, the per-user price stays the same. You are only billed for active (non-archived) employees each month.',
      },
      {
        question: 'Can I cancel anytime?',
        answer:
          'Absolutely. Cancel from your billing settings at any time. Your access continues until the end of the current billing period — no penalties, no exit fees.',
      },
      {
        question: 'Do you offer annual billing?',
        answer:
          'We offer simple monthly billing — cancel anytime. If your finance team needs an annual invoice for procurement, get in touch and we\'ll arrange one.',
      },
    ],
  },
  {
    title: 'Features',
    items: [
      {
        question: 'What leave types does Leavely support?',
        answer: (
          <>
            Leavely supports unlimited custom leave types including annual leave, sick
            leave, TOIL (time off in lieu), compassionate leave, parental leave, study
            leave, and more. You can create as many{' '}
            <Link href="/features" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">
              custom leave policies
            </Link>{' '}
            as your business needs.
          </>
        ),
      },
      {
        question: 'Does Leavely calculate the Bradford Factor?',
        answer: (
          <>
            Yes. Leavely automatically calculates{' '}
            <Link href="/blog/bradford-factor-explained" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">
              Bradford Factor scores
            </Link>{' '}
            for every employee, helping you identify patterns of frequent short-term
            absence. Scores update in real time as leave is recorded.
          </>
        ),
      },
      {
        question: 'Can I set up custom leave policies?',
        answer:
          'Yes. Create as many leave policies as you need, each with its own allowance, accrual rules, and approval workflow. Assign different policies to different employees or departments.',
      },
      {
        question: 'Does Leavely handle UK bank holidays?',
        answer: (
          <>
            Leavely ships with{' '}
            <Link href="/blog/bank-holidays-uk-2026" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">
              UK bank holidays
            </Link>{' '}
            pre-loaded for England, Scotland, Wales, and Northern Ireland. Holidays are
            automatically excluded from leave balance calculations. You can also add
            custom company-wide leave blocks for shutdown periods.
          </>
        ),
      },
      {
        question: 'Can employees request leave themselves?',
        answer:
          'Yes. Employees log in, pick dates on the leave calendar, and submit a request. Their manager receives an email notification and can approve or decline in a single click. The employee is notified of the outcome instantly.',
      },
    ],
  },
  {
    title: 'Compliance & Security',
    items: [
      {
        question: 'Is Leavely GDPR compliant?',
        answer:
          'Yes. Leavely is fully GDPR compliant. We only collect data necessary to provide the service, we use encryption in transit (TLS) and hashed passwords, and we support data export and deletion requests. Read our privacy policy for full details.',
      },
      {
        question: 'Where is my data stored?',
        answer:
          'Your data is stored on secure, encrypted servers in Europe. We use Neon PostgreSQL (cloud-hosted) with TLS encryption for all connections. Backups are taken automatically.',
      },
      {
        question: 'Does Leavely comply with UK employment law?',
        answer: (
          <>
            Leavely is built with UK employment law in mind. It handles the statutory
            minimum of{' '}
            <Link href="/blog/annual-leave-entitlement-uk" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">
              5.6 weeks annual leave
            </Link>
            , pro-rata calculations for part-time staff, and includes return-to-work forms
            for absence management. While Leavely is a tool, not legal advice, it is
            designed to help you stay compliant. For a wider employer checklist, see our{' '}
            <Link href="/uk-hr-compliance-small-business" className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700">
              UK HR compliance guide for small businesses
            </Link>.
          </>
        ),
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        question: 'How do I get help?',
        answer:
          'Email us at hello@leavely.online and we will get back to you within one working day, usually much sooner. We also publish guides and best-practice articles on our blog.',
      },
      {
        question: 'Do you offer onboarding support?',
        answer:
          'Yes. If you need help getting started, our team can walk you through setup, importing employees, and configuring leave policies. Just reach out after signing up and we will arrange a session.',
      },
    ],
  },
]

/* ---------- Flatten all Q&A for JSON-LD ---------- */

const allQuestions = faqCategories.flatMap((cat) =>
  cat.items.map((item) => ({
    '@type': 'Question' as const,
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer' as const,
      // Strip JSX to plain text for structured data
      text:
        typeof item.answer === 'string'
          ? item.answer
          : (() => {
              // Extract text content from the JSX element for JSON-LD
              const texts: string[] = []
              const extract = (node: React.ReactNode): void => {
                if (typeof node === 'string') {
                  texts.push(node)
                } else if (Array.isArray(node)) {
                  node.forEach(extract)
                } else if (node && typeof node === 'object' && 'props' in node) {
                  const props = node.props as { children?: React.ReactNode }
                  if (props.children) extract(props.children)
                }
              }
              extract(item.answer)
              return texts.join('')
            })(),
    },
  }))
)

/* ---------- JSON-LD ---------- */

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Frequently Asked Questions — Leavely',
      description:
        'Find answers to common questions about Leavely leave management software. Pricing, features, setup, GDPR compliance, and support.',
      url: `${SITE_URL}/faq`,
      isPartOf: { '@type': 'WebSite', name: 'Leavely', url: SITE_URL },
    },
    {
      '@type': 'FAQPage',
      mainEntity: allQuestions,
    },
  ],
}

/* ---------- Metadata ---------- */

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description:
    'Answers to common questions about Leavely leave management software. Learn about pricing, features, setup, GDPR compliance, UK employment law, and support for UK SMBs.',
  alternates: { canonical: `${SITE_URL}/faq` },
  keywords: [
    'leavely FAQ',
    'leave management FAQ',
    'leave management software questions',
    'leavely pricing FAQ',
    'leave tracker help',
    'absence management FAQ',
    'leave management GDPR',
    'leave management UK compliance',
    'leavely support',
    'employee leave tracker FAQ',
  ],
  openGraph: {
    title: 'FAQ — Leavely Leave Management Software',
    description:
      'Got questions about Leavely? Find answers on pricing, features, setup, compliance, and more.',
    url: `${SITE_URL}/faq`,
  },
}

/* ---------- Page ---------- */

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <MarketingNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-white to-white" />
          <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-8 md:pt-28 md:pb-12 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
              Frequently asked
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                questions
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed">
              Everything you need to know about Leavely. Can&apos;t find what you&apos;re
              looking for? Email us at{' '}
              <a
                href="mailto:hello@leavely.online"
                className="text-emerald-600 underline underline-offset-2 hover:text-emerald-700"
              >
                hello@leavely.online
              </a>
              .
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="max-w-3xl mx-auto px-6 pb-20 md:pb-28">
          <FaqAccordion categories={faqCategories} />
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-600" />
          <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Ready to simplify leave management?
            </h2>
            <p className="mt-4 text-lg text-emerald-100">
              Free for 14 days. No credit card. Set up in 2 minutes.
            </p>
            <div className="mt-8">
              <Link href="/register">
                <Button
                  size="lg"
                  className="text-base font-semibold px-8 h-12 bg-white text-emerald-700 hover:bg-gray-50 shadow-lg"
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
