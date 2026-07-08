import { PageHeader } from '@/components/shared/page-header'
import { getDocuments } from './actions'
import { DocumentsList } from './documents-list'

export default async function DocumentsPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const documents = await getDocuments(tenantSlug)

  return (
    <div>
      <PageHeader title="Documents" description="Company documents and files" />
      <DocumentsList documents={documents} tenantSlug={tenantSlug} />
    </div>
  )
}
