'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast, getDirectReportIds } from '@/lib/rbac'

export interface SearchResult {
  id: string
  firstName: string
  lastName: string
  department: string | null
  jobTitle: string | null
}

export async function searchEmployees(
  tenantSlug: string,
  query: string
): Promise<SearchResult[]> {
  const trimmed = query.trim()
  if (!trimmed) return []

  const { tenant, membership, user } = await requireTenant(tenantSlug)

  // Build the base text-search conditions (OR across multiple fields)
  const searchConditions = [
    { firstName: { contains: trimmed, mode: 'insensitive' as const } },
    { lastName: { contains: trimmed, mode: 'insensitive' as const } },
    { email: { contains: trimmed, mode: 'insensitive' as const } },
    { department: { contains: trimmed, mode: 'insensitive' as const } },
    { jobTitle: { contains: trimmed, mode: 'insensitive' as const } },
  ]

  // EMPLOYEE: only themselves
  if (!isAtLeast(membership, 'MANAGER')) {
    const myEmp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true, firstName: true, lastName: true, department: true, jobTitle: true },
    })
    if (!myEmp) return []
    // Check if the employee matches the query
    const lower = trimmed.toLowerCase()
    const matches =
      myEmp.firstName.toLowerCase().includes(lower) ||
      myEmp.lastName.toLowerCase().includes(lower) ||
      (myEmp.department?.toLowerCase().includes(lower) ?? false) ||
      (myEmp.jobTitle?.toLowerCase().includes(lower) ?? false)
    return matches ? [myEmp] : []
  }

  // MANAGER: only direct reports
  if (isAtLeast(membership, 'MANAGER') && !isAtLeast(membership, 'ADMIN')) {
    const reportIds = await getDirectReportIds(tenant.id, user.userId, membership)
    if (reportIds !== null) {
      return prisma.employee.findMany({
        where: {
          tenantId: tenant.id,
          id: { in: reportIds },
          OR: searchConditions,
        },
        select: { id: true, firstName: true, lastName: true, department: true, jobTitle: true },
        take: 8,
      })
    }
  }

  // ADMIN / OWNER: all employees
  return prisma.employee.findMany({
    where: {
      tenantId: tenant.id,
      OR: searchConditions,
    },
    select: { id: true, firstName: true, lastName: true, department: true, jobTitle: true },
    take: 8,
  })
}
