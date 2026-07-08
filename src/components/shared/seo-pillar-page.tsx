import Link from 'next/link'
import { ArrowLeft, ArrowRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingFooter, MarketingNav } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'

export type PillarTable = {
  headers: [string, string]
  rows: Array<[string, string]>
}

export type PillarSection = {
  title: string
  intro?: string
  bullets?: string[]
  subsections?: Array<{
    title: string
    body: string
    bullets?: string[]
  }>
  table?: PillarTable
  callout?: {
    title: string
    body: string
  }
  links?: Array<{
    href: string
    label: string
  }>
}

export type PillarFaq = {
  question: string
  answer: string
}

export type PillarPageProps = {
  badge: string
  title: string
  description: string
  path: string
  readTime: string
  published: string
  modified: string
  sections: PillarSection[]
  faqs: PillarFaq[]
  cta: {
    title: string
    body: string
    href?: string
  }
  template?: {
    href: string
    title: string
    description: string
  }
  related: Array<{
    href: string
    label: string
  }>
}

function renderText(text: string) {
  return text
}

export function SeoPillarPage({
  badge,
  title,
  description,
  path,
  readTime,
  published,
  modified,
  sections,
  faqs,
  cta,
  template,
  related,
}: PillarPageProps) {
  const pageUrl = `${SITE_URL}${path}`
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: pageUrl,
    datePublished: published,
    dateModified: modified,
    author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
    mainEntityOfPage: pageUrl,
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <MarketingNav />

      <main>
        <article className="max-w-3xl mx-auto px-6 py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline font-medium mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          <div className="mb-8">
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              {badge}
            </span>
            <span className="text-xs text-gray-400 ml-3">{readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            {title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            {description}
          </p>

          {template ? (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="font-bold text-emerald-900 mb-1">
                    {template.title}
                  </p>
                  <p className="text-sm text-emerald-700 mb-0">
                    {template.description}
                  </p>
                </div>
                <a
                  href={template.href}
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </div>
            </div>
          ) : null}

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">
            {sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.intro ? <p>{renderText(section.intro)}</p> : null}
                {section.bullets ? (
                  <ul className="list-disc pl-6">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{renderText(bullet)}</li>
                    ))}
                  </ul>
                ) : null}
                {section.subsections?.map((subsection) => (
                  <div key={subsection.title}>
                    <h3>{subsection.title}</h3>
                    <p>{renderText(subsection.body)}</p>
                    {subsection.bullets ? (
                      <ul className="list-disc pl-6">
                        {subsection.bullets.map((bullet) => (
                          <li key={bullet}>{renderText(bullet)}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
                {section.table ? (
                  <table className="rounded-lg border overflow-hidden">
                    <thead>
                      <tr>
                        <th>{section.table.headers[0]}</th>
                        <th>{section.table.headers[1]}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={`${row[0]}-${row[1]}`}>
                          <td>{row[0]}</td>
                          <td>{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}
                {section.callout ? (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
                    <p className="text-emerald-800 font-semibold mb-2">
                      {section.callout.title}
                    </p>
                    <p className="text-emerald-700 mb-0">
                      {section.callout.body}
                    </p>
                  </div>
                ) : null}
                {section.links ? (
                  <div className="rounded-xl bg-gray-50 border p-6 my-6">
                    <p className="font-semibold text-gray-900 mb-3">
                      Useful next reads
                    </p>
                    <div className="space-y-2">
                      {section.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block text-emerald-600 hover:underline font-medium"
                        >
                          {link.label} &rarr;
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </section>
            ))}

            <section>
              <h2>Frequently asked questions</h2>
              <div className="space-y-4 not-prose">
                {faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="rounded-xl border bg-white p-5"
                  >
                    <summary className="cursor-pointer font-semibold text-gray-900">
                      {faq.question}
                    </summary>
                    <p className="mt-3 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">{cta.title}</h3>
            <p className="text-emerald-100 mb-6">{cta.body}</p>
            <Link href={cta.href ?? '/register'}>
              <Button
                size="lg"
                className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg"
              >
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              {related.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-emerald-600 hover:underline font-medium"
                >
                  {link.label} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
