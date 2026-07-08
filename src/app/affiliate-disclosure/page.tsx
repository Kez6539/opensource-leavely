import type { Metadata } from 'next'
import Link from 'next/link'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'

const url = `${SITE_URL}/affiliate-disclosure`

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'How Leavely Perks earns money: affiliate commissions from partner merchants and editorial independence policy.',
  alternates: { canonical: url },
}

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav />
      <main>
        <article className="max-w-3xl mx-auto px-6 py-16 prose prose-gray [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_strong]:text-gray-900">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-3">Leavely Perks</p>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">Affiliate disclosure</h1>
          <p className="text-sm text-gray-500 mb-10">Last updated: 7 May 2026</p>

          <p className="text-lg">
            Leavely Perks is a free, public directory of UK employee discounts, perks and benefits. We do not charge employees or employers to access it. To keep the lights on, some of the links on the perks pages, category pages and editorial guides are affiliate links.
          </p>

          <h2>What is an affiliate link?</h2>
          <p>
            An affiliate link is an outbound link to a merchant&apos;s website that includes a tracking parameter identifying us as the referrer. If you click an affiliate link and complete a purchase, the merchant pays us a small commission. <strong>This never costs you more.</strong> The price you pay is identical whether you arrive at the merchant through one of our links, a Google search or by typing the merchant&apos;s URL directly into your browser.
          </p>

          <h2>Which networks do we work with?</h2>
          <p>We use, or are in the process of partnering with, several mainstream UK affiliate networks:</p>
          <ul className="list-disc pl-6">
            <li><strong>Skimlinks</strong> — automatically rewrites outbound merchant links across editorial content into their affiliate equivalents.</li>
            <li><strong>Awin</strong> — direct merchant programmes with UK retailers across most categories.</li>
            <li><strong>CJ Affiliate</strong> — global affiliate network covering tech, travel and finance brands.</li>
            <li><strong>Impact</strong> — partner programmes for app, subscription and SaaS brands.</li>
            <li><strong>Rakuten Advertising</strong> — premium retail and travel partnerships.</li>
            <li><strong>Direct merchant agreements</strong> — bespoke arrangements with individual brands not run through a network.</li>
          </ul>

          <h2>How we choose what to feature</h2>
          <p>
            We only feature deals we genuinely believe represent good value for UK employees. Every offer is editorially reviewed before publication and is reviewed again at least once a quarter. <Link href="/editorial-guidelines" className="text-emerald-600 hover:underline font-medium">Our editorial guidelines</Link> are public, and we do not accept paid placements — a merchant cannot buy their way onto Leavely Perks. If a partner offers an unusually high commission but we do not consider the deal good for employees, we do not feature it.
          </p>

          <h2>Identifying affiliate links</h2>
          <p>
            Outbound links to merchants are identified in two ways:
          </p>
          <ul className="list-disc pl-6">
            <li>The link uses <code>rel=&quot;sponsored noopener noreferrer&quot;</code> as required by Google&apos;s webmaster guidelines.</li>
            <li>An affiliate disclosure banner appears prominently on every page where affiliate links are present, including the homepage of the perks section and on individual offer pages.</li>
          </ul>

          <h2>Editorial independence</h2>
          <p>
            Our editorial team makes inclusion and ranking decisions independently of our commercial team. A merchant offering a higher commission rate does not earn higher placement. Reviews and category guides are not shared with merchants for approval before publication.
          </p>
          <p>
            From time to time we link to <strong>our own</strong> services — for example, Leavely&apos;s leave-management software, or business mobile plans from our sister company <em>Compare The Networks</em>. Where this happens we say so explicitly in the offer description.
          </p>

          <h2>Cookies and tracking</h2>
          <p>
            Affiliate networks set cookies on your browser when you click through to a merchant. These cookies record the referral so the merchant can attribute a sale back to us. They do not give us, or the merchant, your name, email or any other personally identifying information. You can disable them via your browser&apos;s privacy settings without affecting the price you pay at the merchant.
          </p>
          <p>
            For full details on the data we hold and how we use it, see our <Link href="/privacy" className="text-emerald-600 hover:underline font-medium">privacy policy</Link>.
          </p>

          <h2>Questions?</h2>
          <p>
            If you have a concern about a specific offer, an undeclared partnership or any aspect of how we run the directory, email <Link href="mailto:editorial@leavely.online" className="text-emerald-600 hover:underline font-medium">editorial@leavely.online</Link>. We respond within five working days.
          </p>
        </article>
      </main>
      <MarketingFooter />
    </div>
  )
}
