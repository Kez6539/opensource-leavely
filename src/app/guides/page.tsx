import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { SITE_URL } from '@/lib/seo'

const url = `${SITE_URL}/guides`

export const metadata: Metadata = {
  title: 'UK Employee Perks & Benefits Guides 2026',
  description:
    'Long-form, independent guides on UK employee perks, discount schemes, retention and benefits strategy. Written for UK SMBs.',
  alternates: { canonical: url },
  openGraph: {
    title: 'UK Employee Perks & Benefits Guides 2026',
    description: 'Long-form, independent guides on UK employee perks and benefits strategy.',
    url,
    type: 'website',
  },
}

const sections = [
  {
    title: 'Building an employee perks scheme',
    posts: [
      { slug: 'best-uk-employee-discount-schemes-for-small-businesses', title: 'Best UK employee discount schemes for small businesses' },
      { slug: 'best-discount-platforms-for-uk-staff', title: 'Best discount platforms for UK staff (2026 review)' },
      { slug: 'offer-perks-without-expensive-hr-systems', title: 'How to offer perks without expensive HR systems' },
      { slug: 'cheap-employee-reward-ideas-for-startups', title: 'Cheap employee reward ideas for startups' },
      { slug: 'smes-compete-with-corporate-employee-benefits', title: 'How SMEs can compete with corporate employee benefits' },
    ],
  },
  {
    title: 'Retention and culture',
    posts: [
      { slug: 'improve-staff-retention-with-employee-perks', title: 'How to improve staff retention with employee perks' },
      { slug: 'how-employee-discounts-improve-retention', title: 'How employee discounts improve retention (the data)' },
      { slug: 'employee-wellbeing-perks-that-actually-matter', title: 'Employee wellbeing perks that actually matter' },
      { slug: 'best-work-from-home-employee-perks', title: 'Best work-from-home employee perks' },
    ],
  },
  {
    title: 'Category deep-dives',
    posts: [
      { slug: 'best-gym-discounts-for-employees-uk', title: 'Best gym discounts for employees in the UK' },
      { slug: 'best-employee-tech-discounts-2026', title: 'Best employee tech discounts in 2026' },
      { slug: 'fuel-and-supermarket-savings-for-employees', title: 'Fuel and supermarket savings for employees' },
      { slug: 'restaurant-discounts-employees-actually-use', title: 'Restaurant discounts employees actually use' },
      { slug: 'best-business-mobile-phone-deals-for-employees', title: 'Best business mobile phone deals for employees' },
      { slug: 'best-hr-software-for-small-businesses', title: 'Best HR software for small businesses (perks-included guide)' },
    ],
  },
]

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingNav />
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-emerald-50 border-b">
          <div className="max-w-6xl mx-auto px-6 py-14 md:py-16">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white border border-blue-200 rounded-full px-3 py-1 text-xs font-semibold text-blue-700 mb-4">
                <BookOpen className="h-3.5 w-3.5" /> Editorial guides
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                UK employee perks &amp; benefits guides
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Long-form, independent writing on building an employee perks scheme, choosing benefits platforms, retention strategy and category deep-dives. No vendor sponsorship — just practical, UK-specific advice for SMBs.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-5">{section.title}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {section.posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group rounded-2xl border border-gray-200 hover:border-emerald-300 hover:shadow-md transition-all p-6 flex flex-col"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">Guide</p>
                      <h3 className="font-bold text-gray-900 mb-3 leading-snug flex-1">{post.title}</h3>
                      <span className="text-sm font-medium text-emerald-700 inline-flex items-center gap-1 group-hover:gap-2 transition-all">Read guide <ArrowRight className="h-3.5 w-3.5" /></span>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Want a perks page for your team?</h3>
            <p className="text-gray-600 mb-5">Leavely customers get a co-branded perks page their staff log into through the leave dashboard. No extra cost, no extra admin.</p>
            <Link href="/register" className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md px-5 py-2.5 rounded-lg">
              Start free trial <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <MarketingFooter />
    </div>
  )
}
