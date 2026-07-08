import { PageHeader } from '@/components/shared/page-header'
import { BackLink } from '@/components/shared/back-link'
import { EmployeeForm } from '../employee-form'
import { getActiveEmployees, getOnboardingTemplatesList } from '../actions'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'

export default async function NewEmployeePage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const [managers, onboardingTemplates] = await Promise.all([
    getActiveEmployees(tenantSlug),
    getOnboardingTemplatesList(tenantSlug),
  ])

  const { membership } = await requireTenant(tenantSlug)
  const showLeaveYearOverride = isAtLeast(membership, 'ADMIN')

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/employees`} label="Employees" />
      <PageHeader title="Add Employee" description="Create a new team member" />
      <EmployeeForm tenantSlug={tenantSlug} managers={managers} onboardingTemplates={onboardingTemplates} showLeaveYearOverride={showLeaveYearOverride} />
    </div>
  )
}
