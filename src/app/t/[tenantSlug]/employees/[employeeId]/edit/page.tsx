import { PageHeader } from '@/components/shared/page-header'
import { BackLink } from '@/components/shared/back-link'
import { getEmployee, getActiveEmployees, getWorkingPattern } from '../../actions'
import { EmployeeForm } from '../../employee-form'
import { WorkingPatternEditor } from '../../working-pattern-editor'
import { notFound } from 'next/navigation'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ tenantSlug: string; employeeId: string }>
}) {
  const { tenantSlug, employeeId } = await params
  let employee
  let allManagers
  try {
    ;[employee, allManagers] = await Promise.all([
      getEmployee(tenantSlug, employeeId),
      getActiveEmployees(tenantSlug),
    ])
  } catch {
    notFound()
  }

  // Check if user is ADMIN or OWNER to show admin-only sections
  const { membership } = await requireTenant(tenantSlug)
  const isAdmin = isAtLeast(membership, 'ADMIN')

  // Exclude self from manager list
  const managers = allManagers.filter((m) => m.id !== employeeId)

  // Load working pattern for admin users
  const workingPattern = isAdmin ? await getWorkingPattern(tenantSlug, employeeId) : null

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/employees/${employeeId}`} label="Employee" />
      <PageHeader title="Edit Employee" description={`${employee.firstName} ${employee.lastName}`} />
      <div className="max-w-2xl space-y-6">
        <EmployeeForm
          tenantSlug={tenantSlug}
          employeeId={employeeId}
          managers={managers}
          showLeaveYearOverride={isAdmin}
          defaultValues={{
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email || '',
            jobTitle: employee.jobTitle || '',
            department: employee.department || '',
            startDate: employee.startDate ? employee.startDate.toISOString().split('T')[0] : '',
            dateOfBirth: employee.dateOfBirth ? employee.dateOfBirth.toISOString().split('T')[0] : '',
            phone: employee.phone || '',
            address: employee.address || '',
            emergencyContactName: employee.emergencyContactName || '',
            emergencyContactPhone: employee.emergencyContactPhone || '',
            managerId: employee.managerId || '',
            status: employee.status,
            leaveYearStartMonth: employee.leaveYearStartMonth ? String(employee.leaveYearStartMonth) : '',
            hoursPerDay: employee.hoursPerDay != null ? String(employee.hoursPerDay) : '',
          }}
        />
        {isAdmin && workingPattern && (
          <WorkingPatternEditor
            tenantSlug={tenantSlug}
            employeeId={employeeId}
            initialPattern={workingPattern}
          />
        )}
      </div>
    </div>
  )
}
