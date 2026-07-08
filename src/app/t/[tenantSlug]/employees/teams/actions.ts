'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

// ── List teams with member counts ──
export async function getTeams(tenantSlug: string) {
  // MANAGER+ — teams are an organizational/HR view. Plain employees
  // shouldn't enumerate the whole team list with manager names and
  // member counts via direct Server Action call. (Round 6 follow-up.)
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  return prisma.team.findMany({
    where: { tenantId: tenant.id },
    include: {
      manager: { select: { id: true, firstName: true, lastName: true } },
      _count: { select: { members: true } },
    },
    orderBy: { name: 'asc' },
  })
}

// ── Create team (MANAGER+) ──
export async function createTeam(
  tenantSlug: string,
  name: string,
  managerId?: string | null
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    if (!name.trim()) throw new UserError('Team name is required')

    const team = await prisma.team.create({
      data: {
        name: name.trim(),
        managerId: managerId || null,
        tenantId: tenant.id,
      },
    })

    await logAudit({
      action: 'team.created',
      entity: 'Team',
      entityId: team.id,
      metadata: { name, managerId },
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/employees/teams`)
    return { id: team.id }
  })
}

// ── Get team detail with members ──
export async function getTeamDetail(tenantSlug: string, teamId: string) {
  // MANAGER+ — see getTeams. Detail leaks emails, departments, and
  // job titles for every member, which is sensitive when the tenant
  // has hideEmployeeList enabled.
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  const team = await prisma.team.findFirst({
    where: { id: teamId, tenantId: tenant.id },
    include: {
      manager: { select: { id: true, firstName: true, lastName: true, jobTitle: true } },
      members: {
        include: {
          employee: {
            select: { id: true, firstName: true, lastName: true, jobTitle: true, department: true, email: true },
          },
        },
        orderBy: { employee: { firstName: 'asc' } },
      },
    },
  })

  if (!team) throw new Error('Team not found')
  return team
}

// ── Add team member (MANAGER+) ──
export async function addTeamMember(
  tenantSlug: string,
  teamId: string,
  employeeId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    // Verify team belongs to tenant
    const team = await prisma.team.findFirst({
      where: { id: teamId, tenantId: tenant.id },
    })
    if (!team) throw new UserError('Team not found')

    // Verify employee belongs to tenant
    const employee = await prisma.employee.findFirst({
      where: { id: employeeId, tenantId: tenant.id },
    })
    if (!employee) throw new UserError('Employee not found')

    const member = await prisma.teamMember.create({
      data: { teamId, employeeId },
    })

    await logAudit({
      action: 'team.member_added',
      entity: 'TeamMember',
      entityId: member.id,
      metadata: { teamId, employeeId, teamName: team.name, employeeName: `${employee.firstName} ${employee.lastName}` },
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/employees/teams/${teamId}`)
  })
}

// ── Remove team member (MANAGER+) ──
export async function removeTeamMember(
  tenantSlug: string,
  teamId: string,
  employeeId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const team = await prisma.team.findFirst({
      where: { id: teamId, tenantId: tenant.id },
    })
    if (!team) throw new UserError('Team not found')

    await prisma.teamMember.deleteMany({
      where: { teamId, employeeId },
    })

    await logAudit({
      action: 'team.member_removed',
      entity: 'TeamMember',
      metadata: { teamId, employeeId, teamName: team.name },
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/employees/teams/${teamId}`)
  })
}

// ── Update team (MANAGER+) ──
export async function updateTeam(
  tenantSlug: string,
  teamId: string,
  data: { name?: string; managerId?: string | null }
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const existing = await prisma.team.findFirst({
      where: { id: teamId, tenantId: tenant.id },
    })
    if (!existing) throw new UserError('Team not found')

    await prisma.team.update({
      where: { id: teamId },
      data: {
        ...(data.name !== undefined ? { name: data.name } : {}),
        ...(data.managerId !== undefined ? { managerId: data.managerId || null } : {}),
      },
    })

    await logAudit({
      action: 'team.updated',
      entity: 'Team',
      entityId: teamId,
      metadata: data,
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/employees/teams/${teamId}`)
    revalidatePath(`/t/${tenantSlug}/employees/teams`)
  })
}

// ── Delete team (ADMIN+) ──
export async function deleteTeam(
  tenantSlug: string,
  teamId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'ADMIN')
    await requireWriteAccess(tenant.id)

    const team = await prisma.team.findFirst({
      where: { id: teamId, tenantId: tenant.id },
    })
    if (!team) throw new UserError('Team not found')

    await prisma.team.delete({ where: { id: teamId } })

    await logAudit({
      action: 'team.deleted',
      entity: 'Team',
      entityId: teamId,
      metadata: { name: team.name },
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/employees/teams`)
  })
}

// ── Get employees for dropdown (not in a given team) ──
export async function getAvailableEmployees(tenantSlug: string, teamId?: string) {
  // MANAGER+ — this is the "add member" picker dropdown. Without the
  // role check any tenant employee could enumerate the full active
  // employee list via direct Server Action call. Same anti-pattern as
  // the round-6 getExpenseFormOptions removal.
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  const where: Record<string, unknown> = {
    tenantId: tenant.id,
    status: 'ACTIVE',
  }

  if (teamId) {
    // Exclude employees already in this team
    const existingMembers = await prisma.teamMember.findMany({
      where: { teamId },
      select: { employeeId: true },
    })
    const existingIds = existingMembers.map((m) => m.employeeId)
    if (existingIds.length > 0) {
      where.id = { notIn: existingIds }
    }
  }

  return prisma.employee.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    select: { id: true, firstName: true, lastName: true, jobTitle: true },
    orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
  })
}
