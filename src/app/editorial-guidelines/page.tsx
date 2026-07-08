import type { Metadata } from 'next'
import Link from 'next/link'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'

const url = `${SITE_URL}/editorial-guidelines`

export const metadata: Metadata = {
  title: 'Editorial Guidelines',
  description: 'Leavely editorial guidelines — how we choose what to feature, our independence policy and our standards for accuracy, fairness and corrections.',
  alternates: { canonical: url },
}

export default function EditorialGuidelinesPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav />
      <main>
        <article className="max-w-3xl mx-auto px-6 py-16 prose prose-gray [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_strong]:text-gray-900">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-3">Editorial</p>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">Editorial guidelines</h1>
          <p className="text-sm text-gray-500 mb-10">Last updated: 7 May 2026</p>

          <p className="text-lg">
            These guidelines govern everything published under Leavely&apos;s editorial banner — the perks directory, category guides, blog and any partner-facing content marked &quot;Editorial&quot;.
          </p>

          <h2>1. Independence</h2>
          <p>
            Editorial decisions are made independently of our commercial team. A merchant cannot pay for placement, ranking or favourable treatment. Editorial staff do not have visibility of commission rates when deciding what to feature.
          </p>

          <h2>2. Accuracy</h2>
          <p>
            Every claim of fact in our content is checked against a primary source — the merchant&apos;s own website, the affiliate network feed or government guidance for legal/compliance points. Where a claim is opinion, we mark it as such.
          </p>
          <h3>Numerical claims</h3>
          <p>
            Discounts, percentages, prices and dates are checked against the merchant&apos;s own listing at the time of publication. Where a deal is volatile (e.g. flash sales) we note this in the listing.
          </p>
          <h3>Legal and HR claims</h3>
          <p>
            Statements about UK employment law, tax treatment of benefits, or HMRC guidance are checked against gov.uk, Acas or HMRC source documents. We do not provide legal advice — readers with specific situations should consult a qualified solicitor or HR professional.
          </p>

          <h2>3. Fairness</h2>
          <p>
            Comparison content is structured to be fair. We do not cherry-pick metrics that favour our own services. Where a competitor outperforms us on a relevant metric, we say so. Where we have a clear preference, we explain why.
          </p>

          <h2>4. Corrections policy</h2>
          <p>
            If we publish something inaccurate, we correct it. Material corrections (those that change the substance of a claim) are flagged at the bottom of the article with a dated correction note. Trivial corrections (typos, formatting) are made silently.
          </p>
          <p>
            To request a correction, email <Link href="mailto:editorial@leavely.online" className="text-emerald-600 hover:underline font-medium">editorial@leavely.online</Link>. We aim to respond within 48 hours and to publish corrections within five working days of confirmation.
          </p>

          <h2>5. Disclosure</h2>
          <p>
            Affiliate links are disclosed prominently on every page where they appear. Any non-affiliate commercial relationship — sponsored content, paid review, brand partnership — would be marked clearly as such; we do not currently publish any of these.
          </p>

          <h2>6. Sourcing of content</h2>
          <p>
            All Leavely editorial content is original and human-edited. We use AI tools as research and drafting aids — the same way most modern publishers do — but every published piece is reviewed and edited by a human editor before going live. We do not publish AI-generated content unedited.
          </p>

          <h2>7. Tone and language</h2>
          <p>
            We write in plain UK English for an SMB owner-operator and HR audience. We avoid:
          </p>
          <ul className="list-disc pl-6">
            <li>Hyperbolic sales language (&quot;amazing&quot;, &quot;unbelievable&quot;, &quot;the only X you need&quot;)</li>
            <li>Sponsored-content tropes pretending to be impartial</li>
            <li>US-centric terms where a UK term exists</li>
          </ul>

          <h2>8. Inclusion and ranking</h2>
          <p>
            Inclusion in the perks directory is decided against three criteria: genuine value to the reader, reputable merchant, employee-friendly terms. Ranking within a category is editorial — based on the editor&apos;s judgement of which deals are best, not on commission rate.
          </p>

          <h2>9. Comments and contact</h2>
          <p>
            We welcome reader feedback. The fastest route is email: <Link href="mailto:editorial@leavely.online" className="text-emerald-600 hover:underline font-medium">editorial@leavely.online</Link>.
          </p>
        </article>
      </main>
      <MarketingFooter />
    </div>
  )
}
