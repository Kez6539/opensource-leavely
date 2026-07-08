'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast, isAtLeast, getDirectReportIds } from '@/lib/rbac'
import {
  getLeaveYear,
  formatLeaveYearLabel,
  getEmployeeLeaveYearStartMonth,
  getAccruedAllowance,
} from '@/lib/leave-year'
import { ensureBalances } from '../balance-helpers'

export interface EmployeeBalanceRow {
  employeeId: string
  employeeName: string
  department: string
  policyId: string
  policyName: string
  allowance: number
  used: number
  pending: number
  remaining: number
  remainingPct: number
}

export interface AllEmployeeBalancesResult {
  rows: EmployeeBalanceRow[]
  departments: string[]
  leaveYearLabel: string
}

export async function getAllEmployeeBalances(
  tenantSlug: string
): Promise<AllEmployeeBalancesResult> {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  const tenantId = tenant.id
  // Note: this is the *tenant-default* leave year used for the page header
  // label only. Per-employee balance lookups below use the EMPLOYEE-level
  // leave year (employee.leaveYearStartMonth ?? tenant default) so staff
  // with custom leave years see the right year's row. (Round 5 #2.)
  const tenantYear = getLeaveYear(tenant.leaveYearStartMonth, new Date())
  const leaveYearLabel = formatLeaveYearLabel(tenant.leaveYearStartMonth, tenantYear)

  // Determine which employees this user can see
  let employeeFilter: { tenantId: string; status: 'ACTIVE'; id?: { in: string[] } } = {
    tenantId,
    status: 'ACTIVE' as const,
  }

  if (!isAtLeast(membership, 'ADMIN')) {
    // MANAGER: only direct reports
    const reportIds = await getDirectReportIds(tenantId, user.userId, membership)
    if (reportIds !== null) {
      employeeFilter = { ...employeeFilter, id: { in: reportIds } }
    }
  }

  // Fetch employees and ALL non-system holiday policies. The previous
  // implementation did a `findFirst` keyed on createdAt, so tenants with
  // Annual Leave + Study Leave + Parental Leave only ever saw the oldest
  // policy on this page. TOIL is excluded by isSystemType so renamed
  // TOIL policies don't slip through (was previously matched on the
  // literal substring 'TOIL').
  const [employees, holidayPolicies] = await Promise.all([
    prisma.employee.findMany({
      where: employeeFilter,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        department: true,
        leaveYearStartMonth: true,
      },
      orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
    }),
    prisma.leavePolicy.findMany({
      where: {
        tenantId,
        isSystemType: null,
      },
      orderBy: { createdAt: 'asc' },
    }),
  ])

  const departments = [...new Set(employees.map((e) => e.department || 'Unassigned'))].sort()

  if (holidayPolicies.length === 0 || employees.length === 0) {
    return { rows: [], departments, leaveYearLabel }
  }

  // Per-employee leave year + ensureBalances. Employees with custom leave
  // years (e.g. an October-start employee in a January-default tenant)
  // need their own year resolved before we look up balances, otherwise we
  // fetch the wrong row.
  const empYears = new Map<string, number>()
  await Promise.all(
    employees.map(async (emp) => {
      const startMonth = getEmployeeLeaveYearStartMonth(emp, tenant)
      const empYear = getLeaveYear(startMonth, new Date())
      empYears.set(emp.id, empYear)
      await ensureBalances(tenantId, emp.id, empYear, startMonth)
    })
  )

  const policyIds = holidayPolicies.map((p) => p.id)

  // Fetch all balances for every non-system policy in a single round-trip.
  // We can't filter by year because different employees might be in
  // different leave years; instead pull all years that any employee in
  // scope cares about.
  const yearsInScope = Array.from(new Set(empYears.values()))
  const balances = await prisma.leaveBalance.findMany({
    where: {
      tenantId,
      policyId: { in: policyIds },
      year: { in: yearsInScope },
      employeeId: { in: employees.map((e) => e.id) },
    },
    include: { policy: { select: { accrualType: true } } },
  })

  // Key balances by (employeeId, policyId, year)
  const balanceMap = new Map<string, typeof balances[number]>()
  for (const b of balances) {
    balanceMap.set(`${b.employeeId}:${b.policyId}:${b.year}`, b)
  }

  // Emit one row per (employee, policy). The consumer (BalanceTable) groups
  // by policy so each leave type gets its own sub-table.
  const rows: EmployeeBalanceRow[] = []
  for (const policy of holidayPolicies) {
    for (const emp of employees) {
      const empYear = empYears.get(emp.id) ?? tenantYear
      const bal = balanceMap.get(`${emp.id}:${policy.id}:${empYear}`)
      const allowance = bal?.allowance ?? 0
      const used = bal?.used ?? 0
      const pending = bal?.pending ?? 0
      // For monthly-accrual policies the upper bound the employee can
      // spend right now is the accrued-to-date amount, NOT the full
      // year's allowance. Without this projection the page used to show
      // someone on a monthly accrual plan with "25 remaining" in March
      // when they'd only accrued ~6 days. Match getEmployeeBalances'
      // semantics so the leave balances page agrees with the employee
      // profile and the dashboard My Summary tile. (Round 5 #2.)
      const accrualType = bal?.policy?.accrualType ?? null
      const startMonth = getEmployeeLeaveYearStartMonth(emp, tenant)
      const upperBound =
        accrualType === 'monthly'
          ? getAccruedAllowance('monthly', allowance, startMonth, empYear)
          : allowance
      const remaining = upperBound - used - pending
      const remainingPct = upperBound > 0 ? Math.round((remaining / upperBound) * 100) : 0

      rows.push({
        employeeId: emp.id,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        department: emp.department || 'Unassigned',
        policyId: policy.id,
        policyName: policy.name,
        allowance: Math.round(upperBound * 10) / 10,
        used: Math.round(used * 10) / 10,
        pending: Math.round(pending * 10) / 10,
        remaining: Math.round(remaining * 10) / 10,
        remainingPct,
      })
    }
  }

  return { rows, departments, leaveYearLabel }
}
