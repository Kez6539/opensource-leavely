import { redirect } from 'next/navigation'
import { PageHeader, BackLink } from '@/components/shared'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { getToilFormOptions } from '../actions'
import { ToilForm } from './toil-form'

export default async function NewToilPage({
  params,
  searchParams,
}: {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ employeeId?: string }>
}) {
  const { tenantSlug } = await params
  const { employeeId } = await searchParams

  // Log overtime is manager-only. Employees who land here directly get sent
  // back to the TOIL overview instead of hitting a 500 from the action guard.
  const { membership } = await requireTenant(tenantSlug)
  if (!isAtLeast(membership, 'MANAGER')) {
    redirect(`/t/${tenantSlug}/toil`)
  }

  const options = await getToilFormOptions(tenantSlug)

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/toil`} label="TOIL" />
      <PageHeader title="Log Overtime" description="Submit overtime hours for TOIL accrual" />
      <ToilForm
        tenantSlug={tenantSlug}
        employees={options.employees}
        defaultEmployeeId={employeeId}
      />
    </div>
  )
}
