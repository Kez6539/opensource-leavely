import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingFooter } from '@/components/marketing-layout'
import { Logo } from '@/components/shared/logo'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/charity-hr-software-uk`

export const metadata: Metadata = {
  title: 'Best HR Software for UK Charities (2026 Guide)',
  description:
    'Compare the best HR software for UK charities in 2026. Covers Leavely, BrightHR, Breathe HR, CharlieHR, and Bob — with pricing, features, and charity discounts.',
  alternates: { canonical: articleUrl },
  keywords: [
    'charity HR software',
    'HR software for charities UK',
    'best HR system for charities',
    'charity people management',
    'charity HR system',
    'affordable HR software charities',
    'nonprofit HR software UK',
    'charity staff management software',
  ],
  openGraph: {
    title: 'Best HR Software for UK Charities (2026 Guide)',
    description:
      'Compare the top HR software options for UK charities. Features, pricing, and which platforms offer charity discounts.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Best HR Software for UK Charities (2026 Guide)',
  description:
    'A comparison of the best HR software for UK charities, including features, pricing, and charity discounts.',
  url: articleUrl,
  datePublished: '2026-03-26',
  dateModified: '2026-03-26',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function CharityHrSoftwareArticle() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header>
        <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <Logo />
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/features"><Button variant="ghost" size="sm" className="text-sm font-medium">Features</Button></Link>
              <Link href="/pricing"><Button variant="ghost" size="sm" className="text-sm font-medium">Pricing</Button></Link>
              <Link href="/register">
                <Button size="sm" className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-500/20">Start free trial</Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <article className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline font-medium mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          <div className="mb-8">
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Charity HR</span>
            <span className="text-xs text-gray-400 ml-3">8 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Best HR Software for UK Charities (2026 Guide)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_strong]:text-gray-900">

            <p className="text-lg">
              Finding the right <strong>HR software for a UK charity</strong> isn&apos;t straightforward. Most HR platforms are designed for commercial businesses with dedicated HR teams and healthy budgets. Charities need something different &mdash; affordable, easy to use without specialist training, and built to handle the complexities of a mixed workforce.
            </p>

            <p>
              In this guide, we compare five HR software options available to UK charities in 2026, covering features, pricing, and which platforms genuinely understand the charity sector.
            </p>

            <h2>What charities need from HR software</h2>

            <p>
              Before comparing platforms, it&apos;s worth understanding what makes charity HR different from the commercial sector:
            </p>

            <ul className="list-disc pl-6">
              <li><strong>Affordability is non-negotiable</strong> &mdash; every pound spent on software is a pound not spent on your mission. Trustees and funders scrutinise overhead costs closely.</li>
              <li><strong>Simplicity matters</strong> &mdash; the person managing HR is often the CEO, office manager, or a trustee volunteer. They need software they can learn in minutes, not days.</li>
              <li><strong>Part-time and irregular contracts are the norm</strong> &mdash; charities rely heavily on part-time staff, zero-hours workers, and term-time contracts. HR software must handle pro-rated entitlements correctly.</li>
              <li><strong>UK employment law compliance</strong> &mdash; the platform must calculate statutory leave, SSP, and other entitlements according to UK law, not US or generic international standards.</li>
              <li><strong>GDPR compliance</strong> &mdash; charities hold sensitive employee data and must comply with UK GDPR. Your HR software should store data in the UK or EU, with proper access controls.</li>
              <li><strong>Scalability on a budget</strong> &mdash; a charity of 5 staff today might grow to 20 with a new grant. Pricing should scale linearly without requiring an expensive tier upgrade.</li>
            </ul>

            <h2>The 5 best HR software options for UK charities</h2>

            <p>
              We&apos;ve evaluated these platforms based on features relevant to charities, ease of use, pricing transparency, and whether they offer charity-specific pricing or support.
            </p>

            <h3>1. Leavely</h3>

            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6">
              <p className="text-emerald-800 font-semibold mb-2">Best for: Leave management with charity discount</p>
              <p className="text-emerald-700 text-sm mb-1"><strong>Standard price:</strong> &pound;8 per employee/month</p>
              <p className="text-emerald-700 text-sm mb-1"><strong>Charity price:</strong> &pound;4 per employee/month (50% discount)</p>
              <p className="text-emerald-700 text-sm mb-0"><strong>Free trial:</strong> 14 days, no credit card required</p>
            </div>

            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> is a UK-built leave management platform designed specifically for small and medium-sized organisations. It focuses on doing one thing exceptionally well &mdash; managing employee leave &mdash; rather than trying to be an all-in-one HR suite.
            </p>

            <p>
              <strong>Key features for charities:</strong>
            </p>

            <ul className="list-disc pl-6">
              <li>Automatic pro-rating for part-time and irregular contracts</li>
              <li>Multiple leave types (annual, sick, compassionate, study, TOIL)</li>
              <li><Link href="/blog/bradford-factor-explained" className="text-emerald-600 hover:underline font-medium">Bradford Factor</Link> calculated automatically for every employee</li>
              <li>Self-service portal &mdash; staff submit requests, managers approve with one click</li>
              <li>Team calendar showing who&apos;s off at a glance</li>
              <li>Bank holiday management built for the UK</li>
              <li>Audit trail for governance and funder reporting</li>
              <li>Data stored in the UK, fully GDPR-compliant</li>
            </ul>

            <p>
              The 50% charity discount makes Leavely one of the most affordable options on the market. For a charity with 10 employees, that&apos;s &pound;40/month &mdash; less than the cost of a single hour of an HR consultant&apos;s time.
            </p>

            <p>
              <strong>Limitations:</strong> Leavely is focused on leave management, not full HR. If you need payroll, recruitment, or performance reviews in the same platform, you&apos;ll need a separate tool for those functions.
            </p>

            <h3>2. BrightHR</h3>

            <div className="rounded-xl bg-gray-50 border border-gray-200 p-6 my-6">
              <p className="text-gray-800 font-semibold mb-2">Best for: All-in-one HR with legal support</p>
              <p className="text-gray-700 text-sm mb-1"><strong>Price:</strong> From &pound;5.60 per employee/month (billed annually)</p>
              <p className="text-gray-700 text-sm mb-0"><strong>Charity discount:</strong> Not advertised</p>
            </div>

            <p>
              BrightHR is a comprehensive HR platform owned by Peninsula Group. It includes leave management, shift scheduling, document storage, and access to employment law advice via their BrightAdvice service.
            </p>

            <p>
              <strong>Pros:</strong> Wide feature set, 24/7 employment law helpline, well-established company. <strong>Cons:</strong> Requires annual commitment, pricing tiers can be confusing, some features locked behind higher plans. No specific charity pricing is advertised, and the platform is designed primarily for commercial SMBs.
            </p>

            <h3>3. Breathe HR</h3>

            <div className="rounded-xl bg-gray-50 border border-gray-200 p-6 my-6">
              <p className="text-gray-800 font-semibold mb-2">Best for: Simple core HR for small teams</p>
              <p className="text-gray-700 text-sm mb-1"><strong>Price:</strong> From &pound;13/month (up to 10 employees)</p>
              <p className="text-gray-700 text-sm mb-0"><strong>Charity discount:</strong> 15% for registered charities</p>
            </div>

            <p>
              Breathe is a popular UK-based HR platform for small businesses. It covers core HR functions including leave management, sickness tracking, document storage, and basic reporting. The interface is clean and easy to navigate.
            </p>

            <p>
              <strong>Pros:</strong> Good UK focus, simple interface, charity discount available, solid document management. <strong>Cons:</strong> More expensive per head for very small teams, some features (like performance management) require higher tiers. The leave management functionality, while adequate, isn&apos;t as deep as a dedicated leave tool.
            </p>

            <h3>4. CharlieHR</h3>

            <div className="rounded-xl bg-gray-50 border border-gray-200 p-6 my-6">
              <p className="text-gray-800 font-semibold mb-2">Best for: Modern interface with onboarding focus</p>
              <p className="text-gray-700 text-sm mb-1"><strong>Price:</strong> From &pound;5 per employee/month</p>
              <p className="text-gray-700 text-sm mb-0"><strong>Charity discount:</strong> Not advertised</p>
            </div>

            <p>
              CharlieHR positions itself as the HR platform for small businesses that want a modern, friendly experience. It covers time off, onboarding, team engagement, and perks management.
            </p>

            <p>
              <strong>Pros:</strong> Attractive interface, strong onboarding workflows, good integrations with Slack and other tools. <strong>Cons:</strong> Minimum spend can be high for very small charities, no specific charity pricing, some charity-relevant features (like term-time contract handling) aren&apos;t well supported. More suited to tech startups than traditional charity structures.
            </p>

            <h3>5. Bob (HiBob)</h3>

            <div className="rounded-xl bg-gray-50 border border-gray-200 p-6 my-6">
              <p className="text-gray-800 font-semibold mb-2">Best for: Larger charities with 50+ staff</p>
              <p className="text-gray-700 text-sm mb-1"><strong>Price:</strong> Custom pricing (typically from &pound;7+ per employee/month)</p>
              <p className="text-gray-700 text-sm mb-0"><strong>Charity discount:</strong> Available on request for qualifying nonprofits</p>
            </div>

            <p>
              Bob (by HiBob) is a feature-rich HR platform built for mid-size and growing organisations. It includes leave management, performance reviews, compensation benchmarking, onboarding, culture tools, and analytics.
            </p>

            <p>
              <strong>Pros:</strong> Very comprehensive, excellent reporting and analytics, good for multi-site charities, strong culture and engagement features. <strong>Cons:</strong> Expensive for small teams, requires a demo and custom quote (no self-service signup), feature-heavy interface can be overwhelming for a small charity that just needs leave tracking.
            </p>

            <h2>Comparison at a glance</h2>

            <table className="rounded-lg border overflow-hidden">
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>From (per user/mo)</th>
                  <th>Charity discount</th>
                  <th>UK-focused</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Leavely</strong></td>
                  <td>&pound;4 (charity rate)</td>
                  <td className="text-emerald-600 font-semibold">50%</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>BrightHR</td>
                  <td>&pound;5.60</td>
                  <td>Not advertised</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Breathe HR</td>
                  <td>&pound;1.30 (10-user plan)</td>
                  <td>15%</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>CharlieHR</td>
                  <td>&pound;5</td>
                  <td>Not advertised</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Bob</td>
                  <td>&pound;7+ (custom)</td>
                  <td>On request</td>
                  <td>Global</td>
                </tr>
              </tbody>
            </table>

            <h2>Compliance considerations for charities</h2>

            <p>
              Whichever platform you choose, make sure it supports these compliance requirements:
            </p>

            <h3>UK GDPR</h3>
            <p>
              Your HR software will hold personal data including names, addresses, dates of birth, salary information, sickness records, and potentially sensitive data about disabilities or health conditions. Under UK GDPR, you must:
            </p>

            <ul className="list-disc pl-6">
              <li>Have a lawful basis for processing (employment contract fulfils this for employees).</li>
              <li>Store data securely with appropriate access controls.</li>
              <li>Be able to respond to subject access requests (SARs) within one month.</li>
              <li>Delete data when it&apos;s no longer needed (most HR data should be retained for 6 years after employment ends).</li>
            </ul>

            <p>
              Choose a platform that stores data in the UK or EU, offers role-based access controls, and can export data easily for SAR responses.
            </p>

            <h3>Employment law compliance</h3>
            <p>
              The platform should calculate statutory entitlements correctly, including:
            </p>

            <ul className="list-disc pl-6">
              <li>5.6 weeks&apos; annual leave for full-time workers, pro-rated for part-time.</li>
              <li>Correct handling of bank holidays (included in or additional to the 5.6 weeks).</li>
              <li>Carry-over rules compliant with the Working Time Regulations and post-pandemic amendments.</li>
              <li>SSP qualification and tracking.</li>
            </ul>

            <h3>Charity Commission reporting</h3>
            <p>
              While the Charity Commission doesn&apos;t mandate specific HR software, good governance requires that charities can demonstrate fair and lawful treatment of staff. An audit trail of leave requests, approvals, and policy changes is invaluable during regulatory reviews or trustee reporting.
            </p>

            <h2>How to choose the right platform</h2>

            <p>
              Ask yourself these questions:
            </p>

            <ol className="list-decimal pl-6">
              <li><strong>What&apos;s your primary pain point?</strong> If it&apos;s leave management, a focused tool like Leavely will serve you better (and cheaper) than a full HR suite.</li>
              <li><strong>How many paid staff do you have?</strong> Per-user pricing matters more when you have 5 staff than when you have 50.</li>
              <li><strong>Do you need payroll integration?</strong> If your payroll is handled externally (common in charities), you may not need a platform that includes it.</li>
              <li><strong>Who will administer it?</strong> If it&apos;s a non-HR person, simplicity should be your top priority.</li>
              <li><strong>Is there a charity discount?</strong> Ask directly &mdash; some platforms offer discounts that aren&apos;t advertised on their website.</li>
            </ol>

            <h2>Getting started</h2>

            <p>
              Most platforms offer free trials, so take advantage of them. Sign up for 2-3 platforms, add a few test employees, and see which one feels right for your team. Pay attention to:
            </p>

            <ul className="list-disc pl-6">
              <li>How long it takes to set up from scratch.</li>
              <li>Whether part-time entitlements are calculated correctly.</li>
              <li>How intuitive the request/approval process is.</li>
              <li>Whether the reporting features meet your governance needs.</li>
              <li>How responsive the support team is to charity-specific questions.</li>
            </ul>

            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 my-6 text-center">
              <p className="text-emerald-800 font-semibold mb-2">Try Leavely free for 14 days</p>
              <p className="text-emerald-700 text-sm mb-3">Purpose-built leave management for UK charities. 50% discount, no setup fees, no credit card required.</p>
              <Link href="/charities" className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:underline">
                See charity pricing <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <h2>Key takeaways</h2>

            <ul className="list-disc pl-6">
              <li>Charity HR software should be affordable, simple, and UK-compliant &mdash; not a scaled-down version of an enterprise platform.</li>
              <li>If leave management is your main need, a dedicated tool like Leavely (with its 50% charity discount) is more cost-effective than a full HR suite.</li>
              <li>For broader HR needs on a small team, Breathe HR offers a good balance of features and charity pricing.</li>
              <li>Larger charities with 50+ staff may benefit from the comprehensive features of Bob or BrightHR.</li>
              <li>Always verify UK GDPR compliance, correct statutory calculations, and audit trail capabilities before committing.</li>
              <li>Take advantage of free trials &mdash; the right software should be obvious within a few days of use.</li>
            </ul>

          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">50% off for UK charities</h3>
            <p className="text-emerald-100 mb-6">Leavely makes leave management simple and affordable for charities. Start your free 14-day trial.</p>
            <Link href="/charities">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                See charity pricing <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Related */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/leave-management-for-charities-uk" className="block text-emerald-600 hover:underline font-medium">Leave Management for UK Charities: A Complete Guide &rarr;</Link>
              <Link href="/blog/hr-software-small-business-uk" className="block text-emerald-600 hover:underline font-medium">Best HR Software for UK Small Businesses &rarr;</Link>
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">Bradford Factor Explained: How to Calculate &amp; Use It &rarr;</Link>
              <Link href="/blog/annual-leave-entitlement-uk" className="block text-emerald-600 hover:underline font-medium">Annual Leave Entitlement UK 2026: The Complete Guide &rarr;</Link>
              <Link href="/blog/best-leave-management-software-uk" className="block text-emerald-600 hover:underline font-medium">Best Leave Management Software UK (2026) &rarr;</Link>
              <Link href="/blog/absence-management-policy-uk" className="block text-emerald-600 hover:underline font-medium">Absence Management Policy UK: Complete Guide &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
