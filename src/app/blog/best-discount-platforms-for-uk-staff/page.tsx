import type { Metadata } from 'next'
import Link from 'next/link'
import { ArticleShell } from '@/components/perks/article-shell'
import { SITE_URL } from '@/lib/seo'

const slug = 'best-discount-platforms-for-uk-staff'
const articleUrl = `${SITE_URL}/blog/${slug}`

export const metadata: Metadata = {
  title: 'Best Discount Platforms for UK Staff (2026 Comparison)',
  description:
    'A practical UK comparison of staff discount platforms — Perkbox, Reward Gateway, BrightHR Perks, Boostworks, Edenred, MyStaffShop and free alternatives. Pricing, catalogue depth and implementation.',
  alternates: { canonical: articleUrl },
  openGraph: {
    title: 'Best Discount Platforms for UK Staff (2026)',
    description: 'UK comparison of staff discount platforms.',
    url: articleUrl,
    type: 'article',
  },
}

export default function Article() {
  return (
    <ArticleShell
      slug={slug}
      title="Best Discount Platforms for UK Staff (2026 Comparison)"
      category="Platforms"
      readTime="11 min read"
      publishedDate="2026-05-07"
      description="UK comparison of staff discount platforms."
    >
      <p className="text-lg">
        Pick the wrong UK staff discount platform and you will pay £6 per employee per month for a portal nobody opens. Pick the right one and the cashback alone covers the platform fee three times over. Six platforms genuinely compete for the UK SMB and mid-market staff-discount business in 2026, plus a handful of free directories. This is the comparison no platform vendor will run because half of them lose: who has the best catalogue, who has the cleanest implementation, and where the free alternatives are good enough.
      </p>

      <h2>The shortlist of UK staff discount platforms</h2>
      <p>
        Six paid platforms make the serious shortlist:
      </p>
      <ul className="list-disc pl-6">
        <li><strong>Perkbox</strong> — SMB market leader, broad catalogue, wellness layer included.</li>
        <li><strong>Reward Gateway / Boostworks</strong> — enterprise-grade, deepest catalogue, premium pricing.</li>
        <li><strong>BrightHR Perks</strong> — bundled with BrightHR&apos;s HR software.</li>
        <li><strong>Edenred</strong> — strong on benefits-administration heritage, particularly childcare/meal vouchers.</li>
        <li><strong>Pluxee (formerly Sodexo)</strong> — enterprise-leaning, polished, particularly strong cinema and travel partner offers.</li>
        <li><strong>MyStaffShop / Each Person</strong> — SMB-friendly, mid-tier price.</li>
      </ul>
      <p>
        Plus two free directories worth knowing:
      </p>
      <ul className="list-disc pl-6">
        <li><strong>Leavely Perks</strong> (this site) — public editorial directory, no employer sign-up needed.</li>
        <li><strong>Discounts for Carers / Blue Light Card</strong> — sector-specific schemes.</li>
      </ul>

      <h2>Side-by-side comparison</h2>
      <table>
        <thead>
          <tr><th>Platform</th><th>Price (per user/mo)</th><th>Min seats</th><th>Catalogue depth</th><th>Wellness layer</th></tr>
        </thead>
        <tbody>
          <tr><td>Perkbox</td><td>£5–£7</td><td>~10</td><td>High</td><td>Yes</td></tr>
          <tr><td>Reward Gateway</td><td>£8–£12+</td><td>50+</td><td>Highest</td><td>Yes</td></tr>
          <tr><td>BrightHR Perks</td><td>Bundled</td><td>HR sub required</td><td>Medium-High</td><td>Limited</td></tr>
          <tr><td>Edenred</td><td>£3–£8</td><td>10+</td><td>Medium</td><td>No</td></tr>
          <tr><td>Pluxee</td><td>Enquiry-only</td><td>~50</td><td>High</td><td>Yes</td></tr>
          <tr><td>MyStaffShop</td><td>£2–£4</td><td>~10</td><td>Medium</td><td>No</td></tr>
          <tr><td>Leavely Perks</td><td>£0</td><td>None</td><td>Curated</td><td>Indirect</td></tr>
        </tbody>
      </table>
      <p>
        Pricing is approximate and varies by negotiation. All paid platforms run sector-specific discounting.
      </p>

      <h2>Which platform wins on which metric</h2>

      <h3>Catalogue depth</h3>
      <p>
        Reward Gateway has the deepest UK retailer catalogue by margin. Around 1,500+ retailers, including most major UK supermarkets, fuel chains, fashion brands, restaurants and entertainment partners. Perkbox is roughly 60–70% of Reward Gateway&apos;s catalogue depth at half the price — a strong cost-per-retailer ratio. BrightHR Perks is broadly equivalent to Perkbox in catalogue depth.
      </p>
      <p>
        Free directories like Leavely Perks are editorially curated rather than exhaustive — typically 100–300 carefully-selected retailers across the categories employees actually use, rather than thousands of long-tail brands.
      </p>

      <h3>Cashback rates</h3>
      <p>
        Reward Gateway leads on supermarket cashback (typically 4–6% vs 2–4% on competitor platforms) because it negotiates centrally at scale. For a household spending £4,400/year on groceries, that 2–3 percentage point difference is £100+/year per employee. At 50+ headcount, this difference alone often justifies the higher Reward Gateway platform fee.
      </p>

      <h3>Mobile app and UX</h3>
      <p>
        Perkbox has the best-rated mobile app of the paid platforms. Reward Gateway is a close second but the UI feels more enterprise-leaning. Pluxee is polished but heavier. Edenred and MyStaffShop are functional but unremarkable.
      </p>

      <h3>Wellness and recognition layers</h3>
      <p>
        Perkbox bundles a meditation/learning app and a peer-to-peer recognition tool. Reward Gateway has a deeper recognition module (Reward Gateway Recognition) and integrates with employee-of-the-month and milestone reward flows. BrightHR has a basic recognition layer.
      </p>

      <h3>Implementation effort</h3>
      <p>
        BrightHR Perks is the easiest to roll out — if you are already a BrightHR HR-software customer, the perks layer activates inside the existing portal. Perkbox has a self-serve sign-up that takes around an hour. Reward Gateway, Pluxee and Edenred all involve a sales call, contracting cycle and 2–4 weeks of implementation. MyStaffShop is closer to Perkbox in self-serve speed.
      </p>

      <h2>Total cost of ownership: 50 employees, three years</h2>
      <table>
        <thead>
          <tr><th>Platform</th><th>3-year platform cost</th><th>Estimated employee savings (3yr)</th><th>Net to employees</th></tr>
        </thead>
        <tbody>
          <tr><td>Perkbox</td><td>£10,800</td><td>£75,000</td><td>+£64,200</td></tr>
          <tr><td>Reward Gateway</td><td>£18,000</td><td>£135,000</td><td>+£117,000</td></tr>
          <tr><td>BrightHR Perks</td><td>Bundled</td><td>£60,000</td><td>+£60,000 to employer cost-net</td></tr>
          <tr><td>MyStaffShop</td><td>£5,400</td><td>£45,000</td><td>+£39,600</td></tr>
          <tr><td>Leavely Perks (free)</td><td>£0</td><td>£35,000</td><td>+£35,000</td></tr>
        </tbody>
      </table>
      <p>
        Employee-savings figures are estimates based on average UK staff use rates of around 50% and average savings per active user. Real numbers vary widely — measurement-discipline is important to assess actual ROI.
      </p>

      <h2>Free alternatives — when do they win?</h2>
      <p>
        Free directories like <Link href="/employee-discounts">Leavely Perks</Link> win for businesses where:
      </p>
      <ul className="list-disc pl-6">
        <li>Headcount is below 10–15 (sub-platform-minimum scale).</li>
        <li>Budget is genuinely zero.</li>
        <li>Employees are tech-savvy enough to navigate a public directory rather than expect a corporate-branded portal.</li>
        <li>Leadership wants to assess the appetite for perks before paying for a platform.</li>
      </ul>
      <p>
        The trade-off is real: no co-branded experience, no usage analytics, no consolidated billing, and no formal employer/scheme membership. For sub-15-employee businesses, the trade-off is rarely worth £900+/year in platform fees.
      </p>

      <h2>The best fit by business type</h2>

      <h3>Tech startup, 10–30 employees</h3>
      <p>
        <strong>Perkbox</strong>. The catalogue and UX are right for the demographic; the price is sustainable. Layer in an EAP and you have a credible benefits package.
      </p>

      <h3>Care home or hospitality, 25–100 employees</h3>
      <p>
        <strong>Reward Gateway or BrightHR Perks</strong>. Cashback rates on supermarkets, fuel and family days out matter most for these workforces, and Reward Gateway leads on those. BrightHR Perks if the HR-advice-line bundle is also valuable.
      </p>

      <h3>Charity, education or NHS-adjacent</h3>
      <p>
        <strong>Sector-specific schemes</strong> (Blue Light Card, Discounts for Teachers) supplement whichever paid platform you pick. Sector discounts on the platforms themselves often bring effective per-employee cost below £4/month.
      </p>

      <h3>Professional services / law / accountancy, 25–75 employees</h3>
      <p>
        <strong>Reward Gateway or Pluxee</strong>. The slightly more enterprise-feeling experience suits the demographic, and cinema/travel partner offers (Pluxee) are particularly strong for professional-services workforces.
      </p>

      <h3>Sub-10-employee SMB</h3>
      <p>
        <strong>Leavely Perks (free)</strong> plus a few direct corporate-rate sign-ups (Specsavers Corporate, PureGym Corporate, a Samsung EPP). Add a paid platform when headcount and budget justify it.
      </p>

      <h2>Implementation pitfalls to avoid</h2>
      <ul className="list-disc pl-6">
        <li><strong>Buying for breadth over depth.</strong> 1,500 retailers in the catalogue does not matter if 12 are used. Buy on top-100 retailer overlap with your team&apos;s spending.</li>
        <li><strong>Not promoting after launch.</strong> Adoption decays sharply after week 4. Schedule a Friday round-up forever, not just at launch.</li>
        <li><strong>Underweighting the wellbeing layer.</strong> The retention case for perks rests heavily on the wellbeing categories — a discount-only portal misses half the value. See our <Link href="/blog/employee-wellbeing-perks-that-actually-matter">wellbeing perks guide</Link>.</li>
        <li><strong>Not measuring use.</strong> You cannot assess platform ROI without month-on-month adoption data. Every paid platform reports it; ask before signing.</li>
      </ul>

      <h2>Bottom line</h2>
      <p>
        For most UK SMBs the right answer is Perkbox at £6/user/month, with sector-specific schemes layered in for free where applicable. Reward Gateway becomes the right answer at 50+ employees where the cashback differential pays for the higher fee. BrightHR Perks wins if you are already paying for BrightHR HR. Free directories like <Link href="/employee-discounts">Leavely Perks</Link> are credible for sub-15-employee teams. <Link href="/blog/best-uk-employee-discount-schemes-for-small-businesses">See the SMB-specific scheme review</Link>.
      </p>
    </ArticleShell>
  )
}
