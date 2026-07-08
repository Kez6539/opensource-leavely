import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/salon-staff-management-uk`

export const metadata: Metadata = {
  title: 'Salon Staff Management UK: Leave, Rotas and HR for Salons',
  description:
    'How to manage salon staff effectively. Covers leave for part-time and self-employed workers, rota planning, school holiday fairness, and HR tips for hair and beauty salons.',
  alternates: { canonical: articleUrl },
  keywords: [
    'salon staff management',
    'hair salon staff rota',
    'beauty salon HR',
    'salon employee management',
    'salon staff holidays',
    'salon rota planning',
    'beauty salon staff leave',
  ],
  openGraph: {
    title: 'Salon Staff Management UK: Leave, Rotas and HR for Salons',
    description: 'How to manage salon staff effectively, including leave, rotas, and HR for hair and beauty salons.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Salon Staff Management UK: Leave, Rotas and HR for Salons',
  description: 'How to manage salon staff effectively, including leave, rotas, and HR for hair and beauty salons.',
  url: articleUrl,
  datePublished: '2026-04-04',
  dateModified: '2026-04-04',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function SalonStaffManagementArticle() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />

      <main>
        <article className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline font-medium mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          <div className="mb-8">
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Industry Guide</span>
            <span className="text-xs text-gray-400 ml-3">8 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Salon Staff Management UK: Leave, Rotas and HR for Salons
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Managing staff in a hair or beauty salon comes with challenges that most HR guides never cover. You are juggling employed stylists, self-employed chair renters, part time workers, apprentices, and reception staff. Client bookings are tied to individual stylists, so when someone is off, you lose that revenue. This guide covers how to get salon staff management right, from leave policies to rota planning.
            </p>

            <h2>The employed vs self-employed mix</h2>
            <p>
              Many salons operate with a mix of employed staff and self-employed chair renters. This creates a split in how you handle leave and HR. Employed staff have statutory rights to paid annual leave (5.6 weeks per year for full time workers). Self-employed renters manage their own time off and are not entitled to paid leave from you.
            </p>
            <p>The important thing is to get the classification right. HMRC takes employment status seriously, and if someone you class as self-employed is actually working like an employee (set hours, using your tools, taking direction from you), you could face a tax bill and employment tribunal claims. Make sure chair renters genuinely control their own schedule, use their own products where possible, and invoice you for chair rental.</p>

            <h3>What this means for leave management</h3>
            <ul className="list-disc pl-6">
              <li><strong>Employed staff:</strong> Track their annual leave, approve requests, ensure minimum staffing.</li>
              <li><strong>Self-employed renters:</strong> Ask them to notify you of planned absences (for diary management), but you cannot dictate when they take time off.</li>
              <li><strong>Apprentices:</strong> They have the same leave entitlements as other employees. Remember to account for college days when calculating working patterns.</li>
            </ul>

            <h2>Rota planning for salons</h2>
            <p>
              Salon rotas need to balance client demand with staff availability. Saturdays are typically the busiest day, and you need your strongest team working. Late night openings (common on Thursdays) require specific cover. Here are practical tips:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Publish rotas at least two weeks ahead.</strong> Staff need to plan their lives around shifts. Last minute changes cause resentment and no shows.</li>
              <li><strong>Rotate Saturday working fairly.</strong> If you have staff who work every Saturday, make sure they get compensating days off during the week. Rotate Saturday shifts if possible.</li>
              <li><strong>Build in overlap time.</strong> Client handovers and colour processing mean you need stylists to overlap, not just swap at shift boundaries.</li>
              <li><strong>Track time properly.</strong> Salon staff often arrive early to set up and stay late to clean. If this is expected, it counts as working time and should be reflected in their hours.</li>
            </ol>

            <h2>Peak time restrictions</h2>
            <p>
              Salons have predictable busy periods: Saturdays, the weeks before Christmas, prom season, and wedding season (May to September). It is reasonable to restrict leave during these times, but you need to be transparent about it.
            </p>
            <p>Include peak time restrictions in your staff handbook and employment contracts. A typical salon leave policy might state that no annual leave is available on Saturdays between November and January, or that a maximum of one stylist can be off on any Saturday. Whatever your rule, make sure it is written down and applied consistently.</p>

            <h2>School holiday fairness</h2>
            <p>
              This is one of the biggest sources of tension in salons. Staff with children need school holiday weeks off, but these are also your busiest periods. Staff without children feel it is unfair if parents always get priority.
            </p>
            <p>A fair approach:</p>
            <ul className="list-disc pl-6">
              <li>Allocate school holiday weeks on a rotating basis. Parents get first pick one year, non-parents the next.</li>
              <li>Split the summer holidays. Instead of one person taking two consecutive weeks in August, alternate weeks between staff members.</li>
              <li>Publish the holiday allocation early. Ideally in January for the whole year, so everyone can plan.</li>
              <li>Be clear that having children does not automatically grant priority. This would be discriminatory against staff without dependants.</li>
            </ul>

            <h2>Handling last minute sickness</h2>
            <p>
              When a stylist calls in sick, you have a problem. Their clients are booked in and expecting to see them specifically. You need a clear process:
            </p>
            <ol className="list-decimal pl-6">
              <li>Staff must notify you as early as possible (ideally before the salon opens).</li>
              <li>Reception contacts affected clients immediately to offer rebooking or an alternative stylist.</li>
              <li>If another stylist can take on the clients, adjust the rota accordingly.</li>
              <li>Track sickness absence so you can spot patterns. The Bradford Factor is useful here, as it highlights frequent short absences that disrupt the salon more than occasional longer ones.</li>
            </ol>

            <h2>Part time staff and pro rata leave</h2>
            <p>
              Salons rely heavily on part time workers. A stylist who works three days a week is entitled to 16.8 days of annual leave (3 days x 5.6 weeks). If they work different hours on different days, it is simpler to calculate leave in hours.
            </p>
            <p>
              For example, a stylist working 24 hours per week is entitled to 134.4 hours of annual leave per year (24 x 5.6). This avoids arguments about whether a &quot;day off&quot; means a 4 hour Tuesday or an 8 hour Saturday.
            </p>

            <h2>Tips for better salon staff management</h2>
            <ul className="list-disc pl-6">
              <li><strong>Get contracts right.</strong> Every employed staff member should have a written contract covering hours, leave entitlement, notice period, and any peak time restrictions.</li>
              <li><strong>Hold regular one to ones.</strong> A quick monthly chat catches issues early, whether it is burnout, disputes between staff, or someone thinking about leaving.</li>
              <li><strong>Invest in training.</strong> Skilled staff are harder to replace. Fund external training courses and give study leave where possible.</li>
              <li><strong>Use a leave tracking tool.</strong> Spreadsheets and wall planners work until they do not. Once you have more than five or six staff, a digital system saves hours of admin each month.</li>
            </ul>

            <h2>How Leavely helps salons</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> is designed for small UK teams, making it ideal for salons. Here is what it offers:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Leave and rotas together.</strong> See who is on leave and who is working in a single calendar view.</li>
              <li><strong>Clash detection.</strong> The system warns you if approving a leave request would drop you below minimum staffing, so you never accidentally leave the salon short.</li>
              <li><strong>Blackout dates.</strong> Block leave during your busiest periods with a few clicks.</li>
              <li><strong>Hours based tracking.</strong> Perfect for salons with mixed shift patterns and part time staff.</li>
              <li><strong>Mobile friendly.</strong> Staff submit requests from their phone and managers approve in seconds.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Manage salon leave and rotas in one place</h3>
            <p className="text-emerald-100 mb-6">Leavely handles leave requests, clash detection, and blackout dates for salons of all sizes.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/best-rota-software-uk" className="block text-emerald-600 hover:underline font-medium">Best Rota Software UK 2026: Top Scheduling Tools &rarr;</Link>
              <Link href="/blog/part-time-workers-rights-uk" className="block text-emerald-600 hover:underline font-medium">Part-Time Workers&apos; Rights UK: Leave, Pay &amp; Obligations &rarr;</Link>
              <Link href="/blog/bradford-factor-explained" className="block text-emerald-600 hover:underline font-medium">Bradford Factor Explained: How to Calculate and Use It &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
