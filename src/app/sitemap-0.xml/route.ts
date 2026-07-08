import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/seo'

// Without this handler, Next's catch-all rendered the homepage HTML at
// `/sitemap-0.xml` with `<meta name="robots" content="noindex">` — every
// crawler reference / external link to the old paginated sitemap URL was
// learning the homepage is noindex. 301 the URL to the real sitemap so
// external references heal automatically.
export function GET() {
  return NextResponse.redirect(`${SITE_URL}/sitemap.xml`, 301)
}
