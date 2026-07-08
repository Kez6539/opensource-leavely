import { requireTenant } from '@/lib/tenant'
import { isAtLeast, getDirectReportIds } from '@/lib/rbac'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { PageHeader } from '@/components/shared'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { EmployeesDirectory } from './employees-directory'
import { calculateBradfordFactorBatch, type BradfordResult } from './bradford-factor'
import { ExportEmployeesButton } from './export-button'
import { ImportCsvButton } from './import-csv-button'
import { getLeaveYear, getEmployeeLeaveYearStartMonth } from '@/lib/leave-year'
import { EmployeesPageTabs } from './employees-page-tabs'

export default async function EmployeesPage({
  params,
  searchParams,
}: {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ tab?: string }>
}) {
  const { tenantSlug } = await params
  const { tab } = await searchParams
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  const canManage = isAtLeast(membership, 'MANAGER')

  // Hannah's bug: an EMPLOYEE could see the full employee directory
  // (everyone's name, job title, department) on tenants where the
  // optional `hideEmployeeList` toggle was off. EMPLOYEEs should never
  // see other people's records — that was a privacy leak. Now EMPLOYEEs
  // are unconditionally redirected to their own profile (or to the
  // dashboard if their account isn't linked to an Employee row).
  if (!isAtLeast(membership, 'MANAGER')) {
    const myEmployee = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    if (myEmployee) {
      redirect(`/t/${tenantSlug}/employees/${myEmployee.id}`)
    } else {
      redirect(`/t/${tenantSlug}/dashboard`)
    }
  }

  // Build employee filter — managers (not ADMIN/OWNER) only see direct reports + self
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const empWhere: any = { tenantId: tenant.id }
  if (isAtLeast(membership, 'MANAGER') && !isAtLeast(membership, 'ADMIN')) {
    const reportIds = await getDirectReportIds(tenant.id, user.userId, membership)
    if (reportIds !== null) {
      const myEmp = await prisma.employee.findFirst({
        where: { tenantId: tenant.id, userId: user.userId },
        select: { id: true },
      })
      const visibleIds = myEmp ? [...reportIds, myEmp.id] : reportIds
      empWhere.id = { in: visibleIds }
    }
  }

  // Fetch employees for the directory (filtered by hierarchy for managers)
  const [employees, departments, teams] = await Promise.all([
    prisma.employee.findMany({
      where: empWhere,
      orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
    }),
    prisma.employee.findMany({
      where: { tenantId: tenant.id, department: { not: null } },
      select: { department: true },
      distinct: ['department'],
      orderBy: { department: 'asc' },
    }),
    prisma.team.findMany({
      where: { tenantId: tenant.id },
      include: {
        manager: { select: { id: true, firstName: true, lastName: true } },
        _count: { select: { members: true } },
      },
      orderBy: { name: 'asc' },
    }),
  ])
  const departmentList = departments.map((d) => d.department!).filter(Boolean)

  // Bradford scores for managers
  let bradfordScores: Record<string, BradfordResult> | undefined
  if (canManage && employees.length > 0) {
    const scoresMap = await calculateBradfordFactorBatch(
      tenant.id,
      employees.map((e) => e.id)
    )
    bradfordScores = Object.fromEntries(scoresMap)
  }

  // Fetch leave balance summaries for all employees (annual leave remaining)
  const leaveYear = getLeaveYear(tenant.leaveYearStartMonth, new Date())
  const allBalances = await prisma.leaveBalance.findMany({
    where: {
      tenantId: tenant.id,
      year: leaveYear,
    },
    include: { policy: { select: { name: true } } },
  })

  // Build a map: employeeId -> { policyName, remaining }[]
  const leaveBalanceMap: Record<string, { policyName: string; remaining: number }[]> = {}
  for (const b of allBalances) {
    if (!leaveBalanceMap[b.employeeId]) {
      leaveBalanceMap[b.employeeId] = []
    }
    leaveBalanceMap[b.employeeId].push({
      policyName: b.policy.name,
      remaining: b.allowance - b.used - b.pending,
    })
  }

  // Determine privacy settings enforcement
  const isEmployee = !isAtLeast(membership, 'MANAGER')
  const hideEmails = tenant.hideEmployeeEmails && isEmployee
  const hideStatus = !tenant.showWorkingStatus

  // Serialize employee data for the client component
  const serializedEmployees = employees.map((e) => ({
    id: e.id,
    firstName: e.firstName,
    lastName: e.lastName,
    email: hideEmails ? null : e.email,
    jobTitle: e.jobTitle,
    department: e.department,
    status: e.status,
    phone: e.phone,
    startDate: e.startDate ? e.startDate.toISOString() : null,
    workingStatus: hideStatus ? null : e.workingStatus,
    leaveBalances: leaveBalanceMap[e.id] || [],
  }))

  // Serialize teams for the client component
  const serializedTeams = teams.map((t) => ({
    id: t.id,
    name: t.name,
    managerName: t.manager ? `${t.manager.firstName} ${t.manager.lastName}` : null,
    memberCount: t._count.members,
  }))

  const activeCount = employees.filter((e) => e.status === 'ACTIVE').length

  return (
    <div>
      <PageHeader
        title="Employees"
        description={`${activeCount} active team ${activeCount === 1 ? 'member' : 'members'}`}
        action={
          <div className="flex gap-2">
            {canManage && <ImportCsvButton tenantSlug={tenantSlug} />}
            {canManage && <ExportEmployeesButton tenantSlug={tenantSlug} />}
            <Link href={`/t/${tenantSlug}/employees/new`}>
              <Button data-tour="add-employee">
                <Plus className="mr-2 h-4 w-4" />
                Add employee
              </Button>
            </Link>
          </div>
        }
      />
      <EmployeesPageTabs
        tenantSlug={tenantSlug}
        currentTab={tab || 'directory'}
        teams={serializedTeams}
        directoryContent={
          <EmployeesDirectory
            employees={serializedEmployees}
            tenantSlug={tenantSlug}
            departments={departmentList}
            bradfordScores={bradfordScores}
            showWorkingStatus={!hideStatus}
          />
        }
      />
    </div>
  )
}
