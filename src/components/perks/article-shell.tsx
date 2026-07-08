import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { MarketingNav, MarketingFooter } from '@/components/marketing-layout'
import { AffiliateDisclosure } from '@/components/perks/affiliate-disclosure'
import { SocialShareButtons } from '@/components/shared/social-share-buttons'
import { SITE_URL } from '@/lib/seo'

interface Props {
  slug: string
  title: string
  category: string
  readTime: string
  publishedDate: string
  description: string
  children: React.ReactNode
}

export function ArticleShell({ slug, title, category, readTime, publishedDate, description, children }: Props) {
  const articleUrl = `${SITE_URL}/blog/${slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: articleUrl,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Leavely', url: SITE_URL },
    mainEntityOfPage: articleUrl,
  }

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />
      <main>
        <article className="max-w-3xl mx-auto px-6 py-16">
          <Link href="/guides" className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline font-medium mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to guides
          </Link>

          <div className="mb-8">
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">{category}</span>
            <span className="text-xs text-gray-400 ml-3">{readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">{title}</h1>

          <SocialShareButtons url={articleUrl} title={title} />

          <div className="prose prose-gray max-w-none [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-gray-900 [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-gray-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_li]:text-gray-600 [&_ul]:space-y-2 [&_ol]:space-y-2 [&_table]:w-full [&_table]:border [&_table]:rounded-lg [&_table]:overflow-hidden [&_th]:text-left [&_th]:p-3 [&_th]:bg-gray-50 [&_th]:font-semibold [&_th]:text-gray-700 [&_th]:text-sm [&_td]:p-3 [&_td]:border-t [&_td]:text-gray-600 [&_td]:text-sm [&_strong]:text-gray-900">
            {children}
          </div>

          <div className="mt-12 pt-8 border-t">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Manage leave the easy way</h2>
            <p className="text-sm text-gray-600 mb-4">
              Leavely is{' '}
              <Link href="/leave-management-software-uk" className="text-emerald-600 hover:underline font-medium">leave management software</Link>{' '}
              built for UK businesses — track holidays, sick leave and TOIL in one place from £8/user/month.
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-emerald-600 font-medium">
              <li><Link href="/annual-leave-tracker" className="hover:underline">Annual leave tracker</Link></li>
              <li><Link href="/staff-holiday-planner" className="hover:underline">Staff holiday planner</Link></li>
              <li><Link href="/absence-management-software-uk" className="hover:underline">Absence management software</Link></li>
              <li><Link href="/hr-software-uk" className="hover:underline">HR software UK</Link></li>
            </ul>
          </div>

          <div className="mt-12 pt-8 border-t">
            <AffiliateDisclosure compact />
          </div>
        </article>
      </main>
      <MarketingFooter />
    </div>
  )
}
