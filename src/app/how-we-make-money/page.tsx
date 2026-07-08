import type { Metadata } from 'next'
import Link from 'next/link'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'

const url = `${SITE_URL}/how-we-make-money`

export const metadata: Metadata = {
  title: 'How We Make Money',
  description: 'A transparent breakdown of how Leavely funds the perks directory: leave-management subscriptions and affiliate commissions, with editorial independence policy.',
  alternates: { canonical: url },
}

export default function HowWeMakeMoneyPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav />
      <main>
        <article className="max-w-3xl mx-auto px-6 py-16 prose prose-gray [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_strong]:text-gray-900">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-3">Transparency</p>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">How we make money</h1>
          <p className="text-sm text-gray-500 mb-10">Last updated: 7 May 2026</p>

          <p className="text-lg">
            We think any publication recommending products and services should be open about how the lights stay on. Leavely is funded by two distinct revenue streams. Neither one influences our editorial decisions.
          </p>

          <h2>1. Leave-management software subscriptions</h2>
          <p>
            Our primary product is Leavely, a leave-management SaaS platform for UK SMBs. We charge employers £8 per active user per month after a 14-day free trial. This is the majority of our revenue, and it is paid by employers — not employees — for software access.
          </p>
          <p>
            Sector-specific discounts of 25–50% apply for charities, education, NHS, social enterprises and startups. <Link href="/pricing" className="text-emerald-600 hover:underline font-medium">See pricing</Link>.
          </p>

          <h2>2. Affiliate commissions on the perks directory</h2>
          <p>
            Leavely Perks — the public directory of UK employee discounts on this site — is funded by affiliate commissions from partner merchants. When a reader clicks through to a merchant via one of our links and completes a purchase, the merchant pays us a small fee. <strong>This never costs the reader more than they would otherwise pay.</strong>
          </p>
          <p>Affiliate commission typically ranges from:</p>
          <ul className="list-disc pl-6">
            <li>1–4% of basket value on supermarkets, fuel and household categories</li>
            <li>3–8% on tech and electronics</li>
            <li>5–15% on subscription services (gym apps, meal kits, software trials)</li>
            <li>2–10% on travel bookings</li>
            <li>Flat fees of £5–£40 on financial products like business banking, energy switching and insurance</li>
          </ul>
          <p>
            Commission rates vary by network and merchant. We never disclose specific rates per merchant because the contracts typically prohibit it, but the ranges above are representative.
          </p>

          <h2>What we do not do</h2>
          <ul className="list-disc pl-6">
            <li><strong>We do not accept paid placement.</strong> A merchant cannot buy their way onto Leavely Perks, into a featured slot or higher in category rankings.</li>
            <li><strong>We do not accept gifts or hospitality</strong> from merchants in exchange for coverage. Standard launch press samples for review are accepted, but they do not commit us to writing positively or at all.</li>
            <li><strong>We do not let merchants approve copy.</strong> Reviews, category guides and offer write-ups are not shared with merchants for sign-off before publication.</li>
            <li><strong>We do not sell reader data.</strong> We never pass personally identifying information to a merchant or affiliate network. The networks set referral cookies that record the click — that is the extent of the data exchange.</li>
          </ul>

          <h2>Conflicts of interest</h2>
          <p>
            From time to time we link to <strong>our own services</strong>:
          </p>
          <ul className="list-disc pl-6">
            <li>Leavely&apos;s leave-management software (this site)</li>
            <li>Compare The Networks — a sister company, also owned by the same parent business, operating in UK business mobile and broadband</li>
          </ul>
          <p>
            Where a piece of editorial content links to one of our own services, we say so explicitly in the offer description. We hold ourselves to the same value bar — we will not feature our own services in a comparison if a competing third-party offer is genuinely better for the reader.
          </p>

          <h2>Editorial independence</h2>
          <p>
            The editorial team is small and is organisationally separate from the commercial team. Editorial decisions are not informed by commission rate or commercial relationship. <Link href="/editorial-guidelines" className="text-emerald-600 hover:underline font-medium">Read the full editorial guidelines</Link>.
          </p>

          <h2>Questions</h2>
          <p>
            If you have a question about a specific affiliate relationship, an undeclared partnership or anything else covered on this page, email <Link href="mailto:editorial@leavely.online" className="text-emerald-600 hover:underline font-medium">editorial@leavely.online</Link>. We respond within five working days.
          </p>
        </article>
      </main>
      <MarketingFooter />
    </div>
  )
}
