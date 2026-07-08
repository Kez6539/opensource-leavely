import type { Metadata } from 'next'
import Link from 'next/link'
import { ArticleShell } from '@/components/perks/article-shell'
import { SITE_URL } from '@/lib/seo'

const slug = 'offer-perks-without-expensive-hr-systems'
const articleUrl = `${SITE_URL}/blog/${slug}`

export const metadata: Metadata = {
  title: 'How to Offer Employee Perks Without Expensive HR Systems (UK 2026)',
  description:
    'A practical UK guide for small businesses that want to offer employee perks without buying an HR platform. Free directories, direct corporate-rate sign-ups and a phased upgrade path.',
  alternates: { canonical: articleUrl },
  openGraph: {
    title: 'How to Offer Employee Perks Without Expensive HR Systems (UK 2026)',
    description: 'UK guide to offering perks without an expensive HR platform.',
    url: articleUrl,
    type: 'article',
  },
}

export default function Article() {
  return (
    <ArticleShell
      slug={slug}
      title="How to Offer Employee Perks Without Expensive HR Systems (UK 2026)"
      category="Strategy"
      readTime="9 min read"
      publishedDate="2026-05-07"
      description="UK guide for small businesses offering perks on a tight budget."
    >
      <p className="text-lg">
        Most perks-platform sales pitches start with the assumption that the right answer is buying a platform. For sub-15-person UK businesses, this is often wrong. The combination of a free public directory, three or four direct corporate-rate sign-ups, and £100/year of founder time produces a perks programme that genuinely works — at zero platform cost. This guide is the playbook for that approach: how to offer real, used employee perks without an HR-software subscription, and the right moment to graduate to a paid platform.
      </p>

      <h2>The four-part free perks stack for UK SMBs</h2>
      <p>
        A credible perks programme without paid platforms has four ingredients:
      </p>
      <ol className="list-decimal pl-6">
        <li><strong>A public discount directory</strong> as the front door — bookmarked by staff, no employer admin.</li>
        <li><strong>Three to five direct corporate-rate sign-ups</strong> with major UK brands.</li>
        <li><strong>A 30-minute Friday round-up</strong> from a manager or founder, recurring weekly.</li>
        <li><strong>An EAP at £25–£50/employee/year</strong> as the wellbeing foundation.</li>
      </ol>
      <p>
        Total cash cost for a 10-person team: around £400/year for the EAP, plus zero for everything else. For comparison, a Perkbox subscription at the same headcount runs £600–£900/year. The free stack is genuinely competitive.
      </p>

      <h2>Step 1: pick a public discount directory as the front door</h2>
      <p>
        Several free public directories cover the UK employee-discount space without requiring employer sign-up:
      </p>
      <ul className="list-disc pl-6">
        <li><strong><Link href="/employee-discounts">Leavely Perks</Link></strong> — public, editorially curated UK employee deals across gym, tech, food, fuel, family, mobile, wellbeing.</li>
        <li><strong>NHS Discounts / Blue Light Card</strong> — sector-specific schemes if your team qualifies.</li>
        <li><strong>Discounts for Teachers</strong> — for education-sector employees.</li>
      </ul>
      <p>
        Pick one as your team&apos;s primary directory. Bookmark it, link it from your team handbook, mention it in onboarding. The whole exercise takes 20 minutes. There is no employer admin, no per-seat cost, and the catalogue is curated rather than overwhelming.
      </p>

      <h2>Step 2: set up three to five direct corporate-rate sign-ups</h2>
      <p>
        The best discounts are not on the discount portals — they are direct corporate schemes set up for free with the merchant. The five worth setting up almost regardless of your business:
      </p>

      <h3>Specsavers Corporate</h3>
      <p>
        Free DSE eyetests for VDU users, plus a contribution towards glasses required for DSE work. Required by UK Health &amp; Safety legislation. £15–£20 per voucher for the employer; free at point of use for the employee. Set up at <em>corporate.specsavers.co.uk</em> — takes about 30 minutes online.
      </p>

      <h3>PureGym Corporate</h3>
      <p>
        20–25% off gym memberships at 350+ UK clubs. No-contract structure. Set up by emailing the PureGym corporate sales team — typically 1–2 days to provision. <Link href="/employee-discounts/gym-fitness">Current PureGym offer</Link>.
      </p>

      <h3>Samsung Employee Purchase Programme (EPP)</h3>
      <p>
        Up to 30% off Samsung Galaxy phones, tablets, TVs and home appliances for verified employees. Set up takes about an hour online; staff sign in with workplace email or a corporate code.
      </p>

      <h3>Caffè Nero Business Account</h3>
      <p>
        For businesses that buy coffee for clients or office moments, plus a partner-discount layer for staff. Easy online setup.
      </p>

      <h3>Compare The Networks (or another mobile broker)</h3>
      <p>
        Negotiated business mobile contracts at wholesale rates. Beats consumer SIM-only plans by 20–35%. See our <Link href="/blog/best-business-mobile-phone-deals-for-employees">business mobile guide</Link>.
      </p>

      <p>
        Five direct sign-ups, set up over a single afternoon, give your team genuine and substantial perks without any subscription cost.
      </p>

      <h2>Step 3: the Friday round-up that doubles adoption</h2>
      <p>
        Free perks fail when nobody remembers they exist. A 30-minute Friday round-up from a manager or founder, recurring weekly, doubles long-term active use. The format that works:
      </p>
      <ul className="list-disc pl-6">
        <li>One sentence of business news.</li>
        <li>One paragraph of recognition (a recent shipment or contribution).</li>
        <li>Three perks links — &quot;the deal of the week from Leavely Perks&quot;, plus two of your direct sign-ups.</li>
      </ul>
      <p>
        This can be drafted by AI in 5 minutes and posted to Slack/Teams/email. The cost is genuinely zero. The effect on perks engagement is consistently the largest single intervention available.
      </p>

      <h2>Step 4: the EAP foundation</h2>
      <p>
        Of the four ingredients, this is the only one with a real cash cost. Spectrum.Life, Health Assured and BHSF all run small-team EAPs starting at around £30–£50/employee/year. For 10 employees, you are looking at £300–£500 for 24/7 confidential mental-health, legal and financial support. It is the highest-impact wellbeing perk — see our <Link href="/blog/employee-wellbeing-perks-that-actually-matter">wellbeing perks guide</Link>.
      </p>

      <h2>What the free stack does not give you</h2>
      <p>
        Honest about the trade-offs. The free perks stack has limitations:
      </p>
      <ul className="list-disc pl-6">
        <li><strong>No co-branded portal.</strong> You cannot tell candidates &quot;we have a Leavely Perks portal&quot; — it is a public site, not a company-branded experience.</li>
        <li><strong>No usage analytics.</strong> You cannot tell which perks are actually used by your team.</li>
        <li><strong>No consolidated billing.</strong> Each direct sign-up is a separate relationship.</li>
        <li><strong>Less broad catalogue.</strong> 100–300 curated retailers vs 1,500+ on the paid platforms.</li>
        <li><strong>No recognition / wellness wrap.</strong> Paid platforms bundle a basic recognition or peer-to-peer thanks tool.</li>
      </ul>
      <p>
        For sub-15-person teams, these trade-offs are usually worth taking. For 25+ employees, they start to bite.
      </p>

      <h2>The right moment to graduate to a paid platform</h2>
      <p>
        Three signals that suggest you are outgrowing the free stack:
      </p>
      <ol className="list-decimal pl-6">
        <li><strong>You have crossed 20 employees.</strong> Catalogue depth and consolidated admin start to matter at this scale.</li>
        <li><strong>You have noticed a gap in interview conversations.</strong> Candidates explicitly ask &quot;do you have a perks platform?&quot; If you hear this twice in a week, the perception value of a paid platform is starting to count.</li>
        <li><strong>You are spending real time on direct-scheme admin.</strong> If managing five direct sign-ups is taking 2+ hours a week, a £600/year Perkbox subscription pays for itself in admin time.</li>
      </ol>
      <p>
        See our <Link href="/blog/best-discount-platforms-for-uk-staff">platform comparison</Link> when the moment is right.
      </p>

      <h2>The free stack at 10 employees: the maths</h2>
      <table>
        <thead>
          <tr><th>Component</th><th>Annual cost</th><th>Time to set up</th></tr>
        </thead>
        <tbody>
          <tr><td>Public directory (Leavely Perks)</td><td>£0</td><td>20 min</td></tr>
          <tr><td>Specsavers Corporate</td><td>~£100 (vouchers as used)</td><td>30 min</td></tr>
          <tr><td>PureGym Corporate</td><td>£0 employer cost</td><td>1 day</td></tr>
          <tr><td>Samsung EPP</td><td>£0</td><td>1 hour</td></tr>
          <tr><td>Caffè Nero Business</td><td>£0</td><td>30 min</td></tr>
          <tr><td>EAP (Spectrum.Life)</td><td>£300–£500</td><td>2 weeks</td></tr>
          <tr><td><strong>Total</strong></td><td><strong>£400–£600</strong></td><td><strong>~1 day spread over 2 weeks</strong></td></tr>
        </tbody>
      </table>
      <p>
        For comparison, Perkbox at 10 employees runs around £600–£900/year. The free stack roughly matches it on direct cost, with arguably better content (the EAP, in particular, is a substantive wellbeing layer the standard SMB perks portal does not have).
      </p>

      <h2>The phased upgrade path</h2>
      <p>
        A sensible UK SMB perks roadmap looks like this:
      </p>
      <ul className="list-disc pl-6">
        <li><strong>0–15 employees</strong> — free directory + 5 direct sign-ups + EAP. £400/year.</li>
        <li><strong>15–30 employees</strong> — add Perkbox or BrightHR Perks. £1,500/year additional.</li>
        <li><strong>30–60 employees</strong> — keep paid platform, add EMI options, increase pension match to 5%. See <Link href="/blog/smes-compete-with-corporate-employee-benefits">SME benefits guide</Link>.</li>
        <li><strong>60+ employees</strong> — consider Reward Gateway tier, formalise wellbeing strategy, add a learning budget.</li>
      </ul>

      <h2>Bottom line</h2>
      <p>
        Sub-15-person UK businesses do not need to pay for a perks platform. A free public directory, a handful of direct corporate-rate sign-ups, an EAP and a Friday round-up produce a perks programme that genuinely works — at a fraction of the cost of a paid platform. Graduate to a platform when scale, candidate-perception and admin time justify it, not before. <Link href="/employee-discounts">Browse the free Leavely Perks directory</Link>.
      </p>
    </ArticleShell>
  )
}
