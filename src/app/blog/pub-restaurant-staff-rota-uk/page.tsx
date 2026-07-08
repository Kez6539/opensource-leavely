import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'

const articleUrl = `${SITE_URL}/blog/pub-restaurant-staff-rota-uk`

export const metadata: Metadata = {
  title: 'Staff Rota for Pubs and Restaurants UK: Planning Guide (2026)',
  description:
    'How to plan staff rotas for pubs and restaurants. Covers split shifts, bank holiday pay, seasonal demand, zero-hour contract holiday rights, and minimum staffing.',
  alternates: { canonical: articleUrl },
  keywords: [
    'pub staff rota',
    'restaurant staff scheduling UK',
    'hospitality rota planning',
    'pub staff management',
    'restaurant shift planning',
    'hospitality staff leave',
    'pub bank holiday pay',
  ],
  openGraph: {
    title: 'Staff Rota for Pubs and Restaurants UK: Planning Guide (2026)',
    description: 'How to plan staff rotas for pubs and restaurants, covering split shifts, bank holiday pay, and seasonal demand.',
    url: articleUrl,
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Staff Rota for Pubs and Restaurants UK: Planning Guide (2026)',
  description: 'How to plan staff rotas for pubs and restaurants, covering split shifts, bank holiday pay, and seasonal demand.',
  url: articleUrl,
  datePublished: '2026-04-04',
  dateModified: '2026-04-04',
  author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
  mainEntityOfPage: articleUrl,
}

export default function PubRestaurantRotaArticle() {
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
            <span className="text-xs text-gray-400 ml-3">9 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Staff Rota for Pubs and Restaurants UK: Planning Guide (2026)
          </h1>

          <SocialShareButtons url={articleUrl} title={jsonLd.headline} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_strong]:text-gray-900">

            <p className="text-lg">
              Rota planning in hospitality is one of the most time consuming management tasks in any industry. Between split shifts, variable demand, bank holidays, and a workforce that often includes zero hour contract workers, getting the rota right each week requires careful thought. This guide covers the practical realities of staff scheduling for pubs and restaurants in the UK.
            </p>

            <h2>Split shifts and the law</h2>
            <p>
              Split shifts are common in hospitality. A typical restaurant might need staff from 11am to 2pm for lunch service, then again from 5pm to 10pm for dinner. That three hour gap in the middle raises questions about pay and working time.
            </p>
            <p>Under the Working Time Regulations 1998, adult workers are entitled to an 11 hour rest period between working days. A split shift counts as a single working day, so the 11 hour rest applies between the end of the evening shift and the start of the next day&apos;s shift. If the evening shift finishes at 11pm, the earliest the worker can start the next day is 10am.</p>
            <p>There is no legal requirement to pay staff during the gap between split shifts. However, if employees are required to stay on site or remain &quot;on call&quot; during the break, that time may count as working time and would need to be paid at least at the National Minimum Wage.</p>

            <h2>Bank holiday pay for hospitality staff</h2>
            <p>
              Bank holidays are among the busiest days for pubs and restaurants. Unlike office based businesses, you need more staff on bank holidays, not fewer. This creates confusion around pay.
            </p>
            <p>Here are the key facts:</p>
            <ul className="list-disc pl-6">
              <li><strong>No automatic right to extra pay.</strong> There is no UK law requiring enhanced pay (time and a half, double time) for bank holiday working. Any enhancement is at the employer&apos;s discretion and should be stated in the employment contract.</li>
              <li><strong>Bank holidays count towards the 28 day statutory entitlement.</strong> If your staff work on bank holidays, those days are normal working days. They still get 28 days total, but they take them at other times.</li>
              <li><strong>If you close on bank holidays,</strong> you can require staff to use their annual leave for those days, provided you give proper notice (at least twice the length of the leave).</li>
            </ul>

            <h3>Practical tip</h3>
            <p>
              Many pubs and restaurants offer a day off in lieu for working a bank holiday, even if there is no contractual obligation. This is a retention tool. Hospitality has notoriously high turnover, and small gestures like this matter.
            </p>

            <h2>Managing seasonal demand</h2>
            <p>
              Pubs and restaurants have predictable busy and quiet seasons. Summer beer gardens, Christmas parties, Valentine&apos;s Day, and local events all affect demand. Your rota should reflect this:
            </p>
            <ol className="list-decimal pl-6">
              <li><strong>Plan seasonal rotas in advance.</strong> By October, you should know your Christmas staffing requirements. By March, plan for summer.</li>
              <li><strong>Use bank and casual staff.</strong> Build a reliable pool of people who can pick up extra shifts during busy periods. Keep their details updated and reach out early.</li>
              <li><strong>Restrict leave during peak periods.</strong> It is reasonable to limit annual leave during your busiest weeks (Christmas Eve through New Year, bank holiday weekends). State this clearly in contracts.</li>
              <li><strong>Offer incentives for peak working.</strong> Voluntary overtime, enhanced pay, or extra time off in lieu can encourage staff to work the difficult shifts willingly.</li>
            </ol>

            <h2>Zero hour contract workers and holiday rights</h2>
            <p>
              Many pubs and restaurants use zero hour contracts for casual staff. These workers have the same basic holiday rights as everyone else: 5.6 weeks per year. The difference is in how you calculate it.
            </p>
            <p>For zero hour workers, holiday accrues based on hours worked. The standard calculation uses 12.07% of hours worked. So if a casual bar worker works 100 hours in a month, they accrue 12.07 hours of paid holiday.</p>
            <p>You have two options for paying holiday to zero hour staff:</p>
            <ul className="list-disc pl-6">
              <li><strong>Accrued leave.</strong> Track hours worked, accrue holiday, and let them take paid days off. This is the cleaner approach.</li>
              <li><strong>Rolled up holiday pay.</strong> Add 12.07% to their hourly rate so every payment includes holiday pay. This means they are not entitled to paid time off separately. Since the 2024 amendments to the Working Time Regulations, rolled up holiday pay is explicitly lawful for irregular hours workers.</li>
            </ul>

            <h2>Minimum staffing levels</h2>
            <p>
              Every pub and restaurant has minimum staffing requirements that vary by service. A quiet Tuesday lunch might need two staff. A Saturday evening with 80 covers needs seven. Map out your minimum staffing for each service period:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Front of house:</strong> How many servers per cover? A common ratio is one server per 15 to 20 covers.</li>
              <li><strong>Kitchen:</strong> How many chefs per service? This depends on your menu complexity.</li>
              <li><strong>Bar:</strong> How many bartenders for a Friday night vs a Monday afternoon?</li>
              <li><strong>Management:</strong> Do you need a manager on site for every service?</li>
            </ul>
            <p>Once you have these numbers, use them as the baseline for your rota. Never approve leave that would take you below minimum staffing for a scheduled service.</p>

            <h2>Common rota mistakes in hospitality</h2>
            <ol className="list-decimal pl-6">
              <li><strong>Publishing the rota too late.</strong> Staff need at least a week&apos;s notice, ideally two. Last minute rotas cause frustration and no shows.</li>
              <li><strong>Over reliance on a few key staff.</strong> If your head chef works every Friday and Saturday and then calls in sick, you are in trouble. Cross train and share the load.</li>
              <li><strong>Ignoring rest break rules.</strong> Workers over 18 are entitled to a 20 minute break if they work more than 6 hours. Under 18s get 30 minutes for shifts over 4.5 hours.</li>
              <li><strong>Not tracking working time.</strong> The UK government has indicated it will eventually require employers to record daily working hours. Start now, especially for staff on multiple jobs.</li>
              <li><strong>Forgetting holiday accrual for casuals.</strong> Just because someone is on a zero hour contract does not mean they do not accrue leave.</li>
            </ol>

            <h2>How Leavely helps pubs and restaurants</h2>
            <p>
              <Link href="/" className="text-emerald-600 hover:underline font-medium">Leavely</Link> is purpose built for small UK teams, and it handles the specific challenges of hospitality:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Rota and leave in one view.</strong> See who is on shift and who is on leave in a single calendar, so you never double book or under staff.</li>
              <li><strong>Clash detection by role.</strong> Set minimum cover levels for kitchen, bar, and front of house. The system warns you before you approve a request that would leave you short.</li>
              <li><strong>Blackout dates.</strong> Block Christmas week, bank holiday weekends, and local events with a few clicks.</li>
              <li><strong>Zero hour holiday tracking.</strong> Automatically calculate accrued leave for casual workers based on hours logged.</li>
              <li><strong>Mobile access.</strong> Staff can check the rota, request leave, and swap shifts from their phone.</li>
            </ul>

          </div>

          <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Rota planning and leave tracking in one tool</h3>
            <p className="text-emerald-100 mb-6">Leavely helps pubs and restaurants manage rotas, track holiday, and prevent understaffing.</p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-50 font-semibold shadow-lg">
                Start free trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold text-gray-900 mb-4">Related articles</h3>
            <div className="space-y-3">
              <Link href="/blog/zero-hour-contract-holiday-uk" className="block text-emerald-600 hover:underline font-medium">Zero-Hour Contract Holiday Entitlement UK &rarr;</Link>
              <Link href="/blog/bank-holidays-uk-2026" className="block text-emerald-600 hover:underline font-medium">UK Bank Holidays 2026: Complete List for Employers &rarr;</Link>
              <Link href="/blog/best-rota-software-uk" className="block text-emerald-600 hover:underline font-medium">Best Rota Software UK 2026: Top Scheduling Tools &rarr;</Link>
            </div>
          </div>
        </article>
      </main>

      <MarketingFooter />
    </div>
  )
}
