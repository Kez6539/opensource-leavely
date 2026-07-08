import Link from 'next/link'
import type { Metadata } from 'next'
import { MarketingFooter, MarketingNav } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Terms of Service — Leavely Leave Management Software',
  description:
    'Terms of Service for Leavely leave management software. 14-day free trial, £8/user/month, cancel anytime. Governed by the laws of England and Wales.',
  alternates: { canonical: `${SITE_URL}/terms` },
  openGraph: {
    title: 'Terms of Service',
    description:
      'Leavely terms: 14-day free trial, simple per-seat pricing, cancel anytime.',
  },
}

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-sm text-gray-400 mb-8">Last updated: 23 March 2026</p>

            <div className="prose prose-gray prose-sm max-w-none [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_li]:text-gray-600 [&_ul]:space-y-1">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Leavely (&ldquo;the Service&rdquo;), operated by Xtraphones UK Ltd
              (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), you agree to be bound by these
              Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, you may not use the Service.
              These Terms apply to all users, including administrators, employees, and any person accessing
              the Service on behalf of an organisation.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              Leavely is a cloud-based, multi-tenant leave management platform that allows organisations
              to manage employee time off, track leave balances, and streamline approval workflows. Each
              organisation (&ldquo;Tenant&rdquo;) operates in an isolated workspace. Tenants cannot access
              another Tenant&apos;s data.
            </p>

            <h2>3. Account Responsibilities</h2>
            <p>When you create an account, you agree to:</p>
            <ul className="list-disc pl-6">
              <li>Provide accurate, current, and complete information</li>
              <li>Keep your login credentials secure and confidential</li>
              <li>Notify us immediately of any unauthorised access to your account</li>
              <li>Be responsible for all activity under your account</li>
              <li>Ensure that all users you invite comply with these Terms</li>
            </ul>
            <p>
              Organisation owners are responsible for managing their workspace, including inviting
              and removing team members, and ensuring appropriate access controls are in place.
            </p>

            <h2>4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6">
              <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
              <li>Attempt to gain unauthorised access to our systems or other users&apos; accounts</li>
              <li>Interfere with, disrupt, or place undue load on the Service or its infrastructure</li>
              <li>Upload malicious content, code, viruses, or harmful data</li>
              <li>Impersonate another person or organisation</li>
              <li>Use the Service to store data unrelated to leave and workforce management</li>
              <li>Reverse-engineer, decompile, or attempt to extract the source code of the Service</li>
              <li>Use automated tools (bots, scrapers) to access the Service without our written consent</li>
              <li>Resell, sublicense, or redistribute access to the Service unless authorised under a Partner agreement</li>
            </ul>

            <h2>5. Subscriptions and Payments</h2>
            <p>
              Leavely offers a <strong>14-day free trial</strong> with full access to all features. No credit card
              is required to start a trial. After the trial, continued use requires a paid subscription.
            </p>
            <p>
              Pricing is <strong>&pound;8 per active employee per month</strong> (or equivalent in your local
              currency), billed monthly via Stripe. Your monthly charge is calculated based on the number
              of active employees in your workspace at the time of billing.
            </p>
            <p>
              We may change our pricing with at least 30 days&apos; written notice. Price changes do not
              apply retroactively and will take effect at your next billing cycle after the notice period.
            </p>
            <p>
              You can cancel your subscription at any time through the billing settings or by contacting us.
              Cancellation takes effect at the end of the current billing period. After cancellation, your
              workspace enters read-only mode &mdash; you can view and export your data but cannot create
              or modify records.
            </p>

            <h2>6. Refund Policy</h2>
            <p>
              As the Service operates on a monthly billing cycle with no long-term commitment, refunds are
              generally not offered. However, we may consider refund requests in the following circumstances:
            </p>
            <ul className="list-disc pl-6">
              <li>A billing error on our part (e.g. double charge)</li>
              <li>A material service outage lasting more than 48 continuous hours</li>
              <li>Exceptional circumstances at our sole discretion</li>
            </ul>
            <p>
              Refund requests must be submitted within 14 days of the charge to{' '}
              <a href="mailto:hello@leavely.online" className="text-emerald-600 hover:underline font-medium">hello@leavely.online</a>.
            </p>

            <h2>7. Data Ownership and Portability</h2>
            <p>
              <strong>Your data is yours.</strong> You retain full ownership of all data you upload to or
              create within Leavely. We do not claim any intellectual property rights over your content.
            </p>
            <p>
              You may export your data at any time while your account is active or in read-only mode.
              We use your data only as described in our{' '}
              <Link href="/privacy" className="text-emerald-600 hover:underline font-medium">
                Privacy Policy
              </Link>
              .
            </p>
            <p>
              Upon written request after account closure, we will permanently delete your data within
              30 days, unless we are required by law to retain it.
            </p>

            <h2>8. Data Processing and Privacy</h2>
            <p>
              Leavely processes personal data (employee names, email addresses, leave records) on behalf
              of your organisation. For the purposes of UK GDPR and the Data Protection Act 2018:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>You</strong> (the organisation) are the <strong>Data Controller</strong> &mdash; you decide what data to input and how it is used within your organisation.</li>
              <li><strong>We</strong> (Leavely / Xtraphones UK Ltd) are the <strong>Data Processor</strong> &mdash; we process data on your behalf according to your instructions and these Terms.</li>
            </ul>
            <p>
              By using the Service, you confirm that you have a lawful basis for processing the personal
              data of your employees and that you have provided appropriate privacy notices to them.
            </p>
            <p>
              Full details of how we handle personal data are set out in our{' '}
              <Link href="/privacy" className="text-emerald-600 hover:underline font-medium">
                Privacy Policy
              </Link>
              . If you require a formal Data Processing Agreement (DPA), please contact us at{' '}
              <a href="mailto:hello@leavely.online" className="text-emerald-600 hover:underline font-medium">hello@leavely.online</a>.
            </p>

            <h2>9. Intellectual Property</h2>
            <p>
              The Service, including its design, code, features, documentation, trademarks, logos, and
              all related intellectual property, is owned by Xtraphones UK Ltd and is protected by copyright,
              trademark, and other intellectual property laws.
            </p>
            <p>
              We grant you a limited, non-exclusive, non-transferable, revocable licence to use the Service
              for your internal business purposes in accordance with these Terms. This licence does not
              include the right to:
            </p>
            <ul className="list-disc pl-6">
              <li>Copy, modify, or create derivative works of the Service</li>
              <li>Use our trademarks or branding without written permission</li>
              <li>Sublicense or transfer your access to a third party</li>
            </ul>

            <h2>10. Service Availability</h2>
            <p>
              We strive to keep Leavely available at all times but do not guarantee uninterrupted or
              error-free access. The Service is provided on an &ldquo;as available&rdquo; basis. We may
              perform scheduled maintenance with reasonable advance notice where possible.
            </p>
            <p>
              We are not liable for any downtime, data loss, or service interruptions caused by factors
              outside our reasonable control, including but not limited to internet outages, third-party
              service failures, cyberattacks, or force majeure events.
            </p>

            <h2>11. Disclaimer of Warranties</h2>
            <p>
              <strong>The Service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
              warranties of any kind</strong>, whether express, implied, or statutory, including but not
              limited to implied warranties of merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
            <p>
              Without limiting the foregoing, we do not warrant that:
            </p>
            <ul className="list-disc pl-6">
              <li>Leave calculations, holiday entitlement figures, or balances generated by the Service are accurate for your specific legal or contractual obligations</li>
              <li>The Service will meet all of your requirements</li>
              <li>The Service will be uninterrupted, timely, secure, or free of errors</li>
            </ul>
            <p>
              <strong>You are responsible for verifying</strong> that leave calculations, statutory entitlements,
              and balances comply with your applicable employment laws, contracts, and policies. Leavely is
              a management tool, not legal or HR compliance advice.
            </p>

            <h2>12. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Xtraphones UK Ltd and its directors, employees,
              and affiliates shall not be liable for:
            </p>
            <ul className="list-disc pl-6">
              <li>Any indirect, incidental, special, consequential, or punitive damages</li>
              <li>Any loss of profits, revenue, data, business opportunities, or goodwill</li>
              <li>Any damages arising from your reliance on the Service&apos;s calculations or outputs</li>
              <li>Any unauthorised access to or alteration of your data</li>
            </ul>
            <p>
              Our total aggregate liability for any and all claims arising from or related to the Service
              shall not exceed the total amount you paid us in the <strong>12 months</strong> immediately
              preceding the event giving rise to the claim. If you have not paid anything, our liability
              is limited to &pound;100.
            </p>

            <h2>13. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Xtraphones UK Ltd and its directors,
              officers, employees, and agents from and against any claims, liabilities, damages, losses,
              and expenses (including reasonable legal fees) arising from:
            </p>
            <ul className="list-disc pl-6">
              <li>Your use of the Service in violation of these Terms</li>
              <li>Your breach of any applicable law or regulation</li>
              <li>Any data you input into the Service that infringes a third party&apos;s rights</li>
              <li>Any claim by your employees or third parties relating to how you use the Service</li>
              <li>Your failure to comply with data protection obligations as a Data Controller</li>
            </ul>

            <h2>14. Termination</h2>
            <p>
              You may close your account at any time through settings or by contacting us. We may suspend
              or terminate your access if:
            </p>
            <ul className="list-disc pl-6">
              <li>You violate these Terms</li>
              <li>Your account has been inactive for more than 12 months</li>
              <li>You fail to pay outstanding subscription fees</li>
              <li>We are required to do so by law</li>
            </ul>
            <p>
              Upon termination, your workspace enters read-only mode for 30 days, during which you can
              export your data. After 30 days, we may permanently delete your data unless required by
              law to retain it.
            </p>

            <h2>15. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. We will notify you of material changes by
              email or by posting a notice on the platform at least 14 days before changes take effect.
              Continued use of the Service after the effective date constitutes acceptance of the updated Terms.
            </p>

            <h2>16. International Use</h2>
            <p>
              Leavely is available to users worldwide. If you are using the Service from outside the
              United Kingdom, you are responsible for compliance with your local laws. We make no
              representation that the Service is appropriate or available for use in all jurisdictions.
            </p>
            <p>
              For users in the United States: you agree that any dispute arising from these Terms or
              the Service shall be resolved through binding arbitration in accordance with the rules of
              the London Court of International Arbitration (LCIA), except where prohibited by law. You
              waive any right to participate in a class action lawsuit or class-wide arbitration.
            </p>

            <h2>17. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining
              provisions shall continue in full force and effect. The invalid provision shall be modified
              to the minimum extent necessary to make it valid and enforceable.
            </p>

            <h2>18. Entire Agreement</h2>
            <p>
              These Terms, together with our{' '}
              <Link href="/privacy" className="text-emerald-600 hover:underline font-medium">
                Privacy Policy
              </Link>
              {' '}and any applicable{' '}
              <Link href="/partners/terms" className="text-emerald-600 hover:underline font-medium">
                Partner Programme Terms
              </Link>
              , constitute the entire agreement between you and Xtraphones UK Ltd regarding the use of
              the Service. They supersede all prior agreements, understandings, and representations.
            </p>

            <h2>19. Governing Law</h2>
            <p>
              These Terms are governed by the laws of England and Wales. Subject to Section 16
              (International Use), any disputes shall be subject to the exclusive jurisdiction of
              the courts of England and Wales.
            </p>

            <h2>20. Contact Us</h2>
            <p>If you have questions about these Terms, please contact us:</p>
            <ul className="list-none pl-0 space-y-1">
              <li><strong>Email:</strong>{' '}
                <a href="mailto:hello@leavely.online" className="text-emerald-600 hover:underline font-medium">
                  hello@leavely.online
                </a>
              </li>
              <li><strong>Company:</strong> Xtraphones UK Ltd</li>
            </ul>
            </div>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </>
  )
}
