import { PageHeader } from '@/components/shared'
import { guides } from './guide-content'
import { HelpSearchFilter } from './help-search-filter'

export default async function HelpPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params

  const managerGuides = guides.filter((g) => g.category === 'manager' || g.category === 'both')
  const employeeGuides = guides.filter((g) => g.category === 'employee' || g.category === 'both')

  return (
    <div>
      <PageHeader
        title="Help Centre"
        description="Guides and walkthroughs to help you get the most out of Leavely."
      />

      <HelpSearchFilter
        tenantSlug={tenantSlug}
        managerGuides={managerGuides.map((g) => ({
          slug: g.slug,
          title: g.title,
          description: g.description,
          category: g.category,
        }))}
        employeeGuides={employeeGuides.map((g) => ({
          slug: g.slug,
          title: g.title,
          description: g.description,
          category: g.category,
        }))}
      />
    </div>
  )
}
