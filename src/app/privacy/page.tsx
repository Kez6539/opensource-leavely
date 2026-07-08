import Link from 'next/link'
import type { Metadata } from 'next'
import { MarketingFooter, MarketingNav } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Privacy Policy — How Leavely Protects Your Data',
  description:
    'Learn how Leavely handles your data. GDPR-compliant leave management software with encryption, minimal cookies, and full data portability. UK and EEA rights supported.',
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    title: 'Privacy Policy',
    description:
      'GDPR-compliant leave management. See how Leavely protects your employee data.',
  },
}

export default function PrivacyPage() {
  return (
    <>
      <MarketingNav />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline font-medium mb-8"
          >
            &larr; Back to home
          </Link>

          <div className="rounded-2xl border bg-white shadow-xl shadow-black/5 p-8 md:p-12">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-400 mb-8">Last updated: 2 April 2026</p>

            <div className="prose prose-gray prose-sm max-w-none [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_li]:text-gray-600 [&_ul]:space-y-1">
            <h2>1. Who We Are</h2>
            <p>
              Leavely is a leave management platform that helps teams track time off, manage
              balances, and streamline approvals. When we refer to &quot;Leavely&quot;,
              &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;, we mean the operator of this
              service.
            </p>

            <h2>2. Data We Collect</h2>
            <p>We collect the following information when you use Leavely:</p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Account information:</strong> name, email address, and hashed password when
                you register, or profile data provided by your OAuth provider (Google or Microsoft).
              </li>
              <li>
                <strong>Organisation data:</strong> company name, team members, departments, and
                roles you create within your workspace.
              </li>
              <li>
                <strong>Leave records:</strong> leave requests, approvals, balances, and calendar
                data.
              </li>
              <li>
                <strong>Payment information:</strong> billing details processed securely by Stripe.
                We do not store your full card number.
              </li>
              <li>
                <strong>Usage data:</strong> pages visited, features used, and technical information
                such as browser type and IP address.
              </li>
            </ul>

            <h2>3. How We Use Your Data</h2>
            <p>We use your data to:</p>
            <ul className="list-disc pl-6">
              <li>Provide and operate the Leavely service</li>
              <li>Process leave requests and maintain balances</li>
              <li>Send transactional emails (e.g. leave approvals, password resets)</li>
              <li>Process payments and manage subscriptions</li>
              <li>Improve and secure the platform</li>
            </ul>

            <h2>4. Third-Party Services</h2>
            <p>We use the following third-party services to operate Leavely:</p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Neon</strong> &mdash; PostgreSQL database hosting
              </li>
              <li>
                <strong>Resend</strong> &mdash; transactional email delivery
              </li>
              <li>
                <strong>Stripe</strong> &mdash; payment processing
              </li>
              <li>
                <strong>Cloudflare</strong> &mdash; hosting, CDN, and DDoS protection
              </li>
              <li>
                <strong>PostHog</strong> &mdash; product analytics (session recordings, feature usage).
                Data is processed in the EU. PostHog helps us understand how users interact with
                Leavely so we can improve the product.
              </li>
            </ul>
            <p>
              Each provider processes data in accordance with their own privacy policies. We only
              share the minimum data necessary for each service to function.
            </p>

            <h2>5. Cookies</h2>
            <p>
              Leavely uses the following cookies:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Session cookie</strong> (strictly necessary) &mdash; keeps you signed in.
                Does not track you across websites.
              </li>
              <li>
                <strong>Analytics cookies</strong> (PostHog) &mdash; help us understand how Leavely
                is used so we can improve the product. These cookies do not track you across other
                websites and are not used for advertising. You can opt out of analytics via your
                browser settings or by using a cookie-blocking extension.
              </li>
            </ul>
            <p>
              We do not use advertising cookies or share data with ad networks.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain your data for as long as your account is active. If you delete your account
              or request data removal, we will delete your personal data within 30 days, except
              where we are legally required to retain it.
            </p>

            <h2>7. Your Rights (GDPR)</h2>
            <p>If you are in the UK or EEA, you have the right to:</p>
            <ul className="list-disc pl-6">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Request a portable copy of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the details below.
            </p>

            <h2>8. Data Security</h2>
            <p>
              We take appropriate technical and organisational measures to protect your data,
              including encryption in transit (TLS), hashed passwords, and access controls.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. We will notify you of significant changes
              by email or by posting a notice on the platform.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have questions about this privacy policy or your data, please contact us at{' '}
              <a
                href="mailto:hello@leavely.online"
                className="text-emerald-600 hover:underline font-medium"
              >
                hello@leavely.online
              </a>
              .
            </p>
            </div>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </>
  )
}
