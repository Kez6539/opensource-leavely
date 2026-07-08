import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { redirect } from 'next/navigation'
import { PageHeader, BackLink } from '@/components/shared'
import { CreateRotaForm } from './create-rota-form'

export default async function NewRotaPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const { membership } = await requireTenant(tenantSlug)

  if (!isAtLeast(membership, 'MANAGER')) {
    redirect(`/t/${tenantSlug}/rotas`)
  }

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/rotas`} label="Rotas & Shifts" />
      <PageHeader
        title="Create Rota"
        description="Set up a new rota for your team"
      />
      <CreateRotaForm tenantSlug={tenantSlug} />
    </div>
  )
}
