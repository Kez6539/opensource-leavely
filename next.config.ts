import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client', '.prisma/client', '@prisma/adapter-neon', '@neondatabase/serverless'],
  async redirects() {
    // SEO consolidation (2026-05-21 audit): /compare/{x} and
    // /{x}-alternative were ranking for the same intent. Settle on
    // `/{x}-alternative` because that's the exact keyword users search for
    // (and Google was picking one and burying the other). The /compare/{x}
    // page files still exist on disk — the redirect short-circuits before
    // routing, and the next pruning pass can delete them.
    const competitorAlternatives = [
      'breathe-hr',
      'brighthr',
      'charlie-hr',
      'factorial',
      'hibob',
      'natural-hr',
      'personio',
      'sage-hr',
      'timetastic',
      'whosoff',
    ]
    const consolidatedBlogPosts = [
      ['small-business-hr-checklist-uk', 'hr-compliance-checklist-uk'],
      ['auto-enrolment-pension-uk', 'hr-compliance-checklist-uk'],
      ['managing-long-term-sickness-uk', 'sick-leave-policy-uk'],
      ['sickness-absence-trigger-points-uk', 'absence-management-policy-uk'],
      ['how-to-reduce-absenteeism-uk', 'absence-management-policy-uk'],
      ['can-employer-refuse-holiday-request-uk', 'annual-leave-entitlement-uk'],
      ['how-much-does-absence-cost-uk-employers', 'absence-management-policy-uk'],
      ['staff-keep-calling-in-sick', 'return-to-work-interview-questions'],
      ['hybrid-working-policy-uk', 'flexible-working-uk'],
      ['employee-turnover-uk', 'employee-wellbeing-strategy'],
      ['excel-holiday-tracker-template', 'staff-holiday-tracker-uk'],
      ['employment-law-changes-2026-uk', 'hr-compliance-checklist-uk'],
      ['leave-management-dental-practices-uk', '/healthcare'],
      ['salon-staff-management-uk', '/retail'],
      ['pub-restaurant-staff-rota-uk', '/hospitality'],
      ['accountancy-firm-leave-management', '/professional-services'],
      ['recruitment-agency-staff-management', '/professional-services'],
      ['gp-surgery-staff-leave-uk', '/healthcare'],
      ['warehouse-staff-management-uk', '/retail'],
      ['law-firm-leave-management-uk', '/professional-services'],
    ] as const
    return [
      { source: '/signup', destination: '/register', permanent: true },
      ...competitorAlternatives.map((slug) => ({
        source: `/compare/${slug}`,
        destination: `/${slug}-alternative`,
        permanent: true,
      })),
      ...consolidatedBlogPosts.map(([source, destination]) => ({
        source: `/blog/${source}`,
        destination: destination.startsWith('/') ? destination : `/blog/${destination}`,
        permanent: true,
      })),
    ]
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }
    return config
  },
}

if (process.env.NODE_ENV === 'development') {
  import('@opennextjs/cloudflare').then(({ initOpenNextCloudflareForDev }) => {
    initOpenNextCloudflareForDev()
  })
}

export default nextConfig
