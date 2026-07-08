import { PageHeader, BackLink } from '@/components/shared'
import { ReportSicknessForm } from './report-sickness-form'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { prisma } from '@/lib/db'

export default async function ReportSicknessPage({
  params,
  searchParams,
}: {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ employeeId?: string }>
}) {
  const { tenantSlug } = await params
  const { employeeId: queryEmployeeId } = await searchParams
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  const canReportForOthers = isAtLeast(membership, 'MANAGER')

  // Managers can pick any active employee. Everyone else only ever logs against
  // themselves, so we just need their own employee id (if any) for the default.
  const employees = canReportForOthers
    ? await prisma.employee.findMany({
        where: { tenantId: tenant.id, status: 'ACTIVE' },
        select: { id: true, firstName: true, lastName: true, userId: true },
        orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
      })
    : []

  const ownEmployee = await prisma.employee.findFirst({
    where: { tenantId: tenant.id, userId: user.userId },
    select: { id: true },
  })

  // Live bug fix: managers landing here from "Report sickness" on an
  // employee profile arrive with `?employeeId=<emp>`. Honour it as the
  // pre-selected employee, but only if the caller is allowed to report
  // for others AND the requested employee actually belongs to this
  // tenant (defence against an URL-edited cross-tenant ID).
  let prefilledEmployeeId: string | undefined = ownEmployee?.id
  if (canReportForOthers && queryEmployeeId) {
    const allowed = employees.some((e) => e.id === queryEmployeeId)
    if (allowed) prefilledEmployeeId = queryEmployeeId
  }

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/leave`} label="Leave Requests" />
      <PageHeader
        title="Report Sickness"
        description={
          canReportForOthers
            ? 'Log a sickness absence for yourself or a member of staff. It will be auto-approved immediately.'
            : 'Report your own sickness absence. This will be auto-approved immediately.'
        }
      />
      <ReportSicknessForm
        tenantSlug={tenantSlug}
        canReportForOthers={canReportForOthers}
        employees={employees}
        defaultEmployeeId={prefilledEmployeeId}
      />
    </div>
  )
}
