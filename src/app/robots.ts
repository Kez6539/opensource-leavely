import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /book-a-demo intentionally NOT disallowed — it's a public lead-gen
        // landing page in the sitemap with index,follow meta. Including it
        // here gave Google three conflicting signals.
        disallow: ['/t/', '/admin/', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
