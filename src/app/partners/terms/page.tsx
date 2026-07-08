import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/components/shared/logo'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Partner Programme Terms — Leavely',
  description: 'Terms and conditions for the Leavely Partner Programme.',
  alternates: { canonical: `${SITE_URL}/partners/terms` },
}

export default function PartnerTermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center">
          <Link href="/">
            <Logo className="h-32" />
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Partner Programme Terms</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: 23 March 2026</p>

        <div className="prose prose-gray max-w-none text-[15px] leading-relaxed space-y-8">
          <section>
            <h2 className="text-lg font-bold">1. Overview</h2>
            <p>
              The Leavely Partner Programme (&ldquo;Programme&rdquo;) allows approved partners (&ldquo;Partners&rdquo;)
              to earn recurring commission by referring new paying customers (&ldquo;Referred Clients&rdquo;) to Leavely.
              By registering as a Partner, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold">2. Commission</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Partners earn <strong>40% recurring commission</strong> on the monthly subscription fee paid by each Referred Client.</li>
              <li>Commission is calculated on the net amount received by Leavely (excluding VAT and refunds).</li>
              <li>Commission accrues monthly and is payable once the balance exceeds &pound;50.</li>
              <li>Leavely reserves the right to adjust commission rates with 30 days&apos; written notice.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold">3. Referral Eligibility</h2>
            <p>A referral is valid only when all of the following conditions are met:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The Referred Client signs up using the Partner&apos;s unique referral link.</li>
              <li>The Referred Client is a <strong>new customer</strong> who has never previously held a Leavely account.</li>
              <li>The Referred Client completes their free trial and converts to a paid subscription.</li>
              <li>The referral is <strong>genuine and arm&apos;s length</strong> — see Section 4.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold">4. Prohibited Conduct &amp; Self-Referral</h2>
            <p>The following are strictly prohibited and will result in commission forfeiture, account suspension, and potential clawback of previously paid commissions:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Self-referral:</strong> Partners may not refer themselves, their own company, or any entity they own, control, or are employed by.</li>
              <li><strong>Related-party referral:</strong> Partners may not refer family members, business partners, or entities sharing the same email domain as the Partner.</li>
              <li><strong>Fake accounts:</strong> Creating fictitious accounts or encouraging signups with no genuine intent to use Leavely.</li>
              <li><strong>Misleading promotion:</strong> Making false claims about Leavely&apos;s features, pricing, or capabilities.</li>
              <li><strong>Paid advertising on Leavely brand terms:</strong> Running ads that bid on &ldquo;Leavely&rdquo; or related trademarks without written permission.</li>
              <li><strong>Spam:</strong> Sending unsolicited bulk emails, messages, or communications to promote referral links.</li>
            </ul>
            <p className="mt-3">
              Leavely automatically blocks self-referrals where the Partner and signup email share the same domain. Additional checks may be performed manually.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold">5. Commission Clawback</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>If a Referred Client cancels within the first 60 days, any commission paid for that client may be clawed back.</li>
              <li>If a referral is later determined to be fraudulent or in breach of these terms, all associated commission will be forfeited.</li>
              <li>Leavely may deduct clawed-back amounts from future commission payments.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold">6. Payment</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Commission is tracked in your Partner Dashboard and paid monthly via bank transfer.</li>
              <li>Payments are made within 30 days of the end of each calendar month.</li>
              <li>Partners are responsible for their own tax obligations on commission earned.</li>
              <li>Leavely may request a valid invoice before processing payment.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold">7. Termination</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Either party may terminate the partnership with 30 days&apos; written notice.</li>
              <li>Leavely may suspend or terminate a Partner account immediately for breach of these terms.</li>
              <li>Upon termination, no further commission accrues. Outstanding balances above &pound;50 will be paid within 60 days.</li>
              <li>Existing Referred Clients remain Leavely customers and are not affected by termination.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold">8. Relationship</h2>
            <p>
              Partners are independent contractors, not employees, agents, or representatives of Leavely.
              Nothing in these terms creates a joint venture, franchise, or employment relationship.
              Partners must not present themselves as acting on behalf of Leavely.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold">9. Liability</h2>
            <p>
              Leavely&apos;s total liability under this Programme is limited to the commission earned by the Partner
              in the 12 months preceding any claim. Leavely is not liable for indirect, incidental, or
              consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold">10. Changes to Terms</h2>
            <p>
              Leavely may update these terms at any time. Partners will be notified by email at least 14 days
              before changes take effect. Continued participation after the effective date constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold">11. Governing Law</h2>
            <p>
              These terms are governed by the laws of England and Wales. Any disputes will be subject to the
              exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section className="border-t pt-6 mt-10">
            <p className="text-sm text-muted-foreground">
              Questions about the Partner Programme? Email us at{' '}
              <a href="mailto:hello@leavely.online" className="text-purple-600 hover:underline">hello@leavely.online</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
