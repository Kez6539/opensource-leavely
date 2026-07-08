'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast, isAtLeast, getDirectReportIds, canManageEmployeeId } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { syncSeatCount } from '@/lib/stripe'
import { fireAndForget } from '@/lib/cloudflare-ctx'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'
import { trackServerEvent } from '@/lib/server-analytics'

// (#179, #189, #191, #194) Server-side mirror of the client schema. Trims
// + caps every free-form field, validates phone shape, rejects future
// DOBs, and enforces a sane hoursPerDay range. Mismatched bounds between
// client and server used to surface as a 500 instead of a Zod toast.
const PHONE_RE = /^[\d\s+()-]{5,20}$/
const EmployeeSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required').max(100),
  lastName: z.string().trim().min(1, 'Last name is required').max(100),
  email: z.string().trim().toLowerCase().max(200).email().optional().or(z.literal('')),
  jobTitle: z.string().trim().max(150).optional(),
  department: z.string().trim().max(150).optional(),
  startDate: z.string().optional(),
  dateOfBirth: z
    .string()
    .optional()
    .refine((v) => !v || new Date(v) <= new Date(), 'DOB must be in the past'),
  phone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .refine((v) => !v || PHONE_RE.test(v), 'Phone number looks invalid'),
  address: z.string().trim().max(500).optional(),
  emergencyContactName: z.string().trim().max(200).optional(),
  emergencyContactPhone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .refine((v) => !v || PHONE_RE.test(v), 'Phone number looks invalid'),
  managerId: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
  onboardingTemplateId: z.string().optional(),
  leaveYearStartMonth: z.number().min(1).max(12).nullable().optional(),
  hoursPerDay: z.number().positive().max(24).nullable().optional(),
})

export type EmployeeFormData = z.infer<typeof EmployeeSchema>

export async function createEmployee(
  tenantSlug: string,
  formData: EmployeeFormData
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const parsed = EmployeeSchema.parse(formData)

  const employee = await prisma.employee.create({
    data: {
      firstName: parsed.firstName,
      lastName: parsed.lastName,
      email: parsed.email || null,
      jobTitle: parsed.jobTitle || null,
      department: parsed.department || null,
      startDate: parsed.startDate ? new Date(parsed.startDate) : null,
      dateOfBirth: parsed.dateOfBirth ? new Date(parsed.dateOfBirth) : null,
      phone: parsed.phone || null,
      address: parsed.address || null,
      emergencyContactName: parsed.emergencyContactName || null,
      emergencyContactPhone: parsed.emergencyContactPhone || null,
      managerId: parsed.managerId || null,
      status: parsed.status,
      leaveYearStartMonth: parsed.leaveYearStartMonth ?? null,
      hoursPerDay: parsed.hoursPerDay ?? null,
      tenantId: tenant.id,
    },
  })

  await logAudit({
    action: 'employee.created',
    entity: 'Employee',
    entityId: employee.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { firstName: parsed.firstName, lastName: parsed.lastName },
  })
  fireAndForget(
    trackServerEvent('employee_added', {
      distinctId: user.userId,
      tenantId: tenant.id,
      userId: user.userId,
      properties: {
        employee_id: employee.id,
        tenant_slug: tenantSlug,
        employee_status: employee.status,
        has_user_account: Boolean(employee.userId),
        has_manager: Boolean(employee.managerId),
        department: employee.department,
        job_title: employee.jobTitle,
        created_by_role: membership.role,
      },
    }),
    'analytics.employee-added',
  )

  if (parsed.onboardingTemplateId) {
    const template = await prisma.onboardingTemplate.findFirst({
      where: { id: parsed.onboardingTemplateId, tenantId: tenant.id },
      include: { items: { orderBy: { sortOrder: 'asc' } } },
    })
    if (template) {
      await prisma.$transaction(async (tx) => {
        const checklist = await tx.onboardingChecklist.create({
          data: {
            employeeId: employee.id,
            templateId: template.id,
            tenantId: tenant.id,
          },
        })
        if (template.items.length > 0) {
          await tx.onboardingTask.createMany({
            data: template.items.map((item) => ({
              checklistId: checklist.id,
              title: item.title,
              description: item.description,
              assignTo: item.assignTo,
              sortOrder: item.sortOrder,
            })),
          })
        }
        await logAudit({
          action: 'onboarding_checklist.assigned',
          entity: 'OnboardingChecklist',
          entityId: checklist.id,
          userId: user.userId,
          tenantId: tenant.id,
          metadata: { employeeId: employee.id, templateId: template.id },
        })
      })
    }
  }

  revalidatePath(`/t/${tenantSlug}/employees`)

  // Sync seat count to Stripe (fire-and-forget)
  fireAndForget(syncSeatCount(tenant.id), 'employees.seat-sync')

    return { id: employee.id }
  })
}

export async function updateEmployee(
  tenantSlug: string,
  employeeId: string,
  formData: EmployeeFormData
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const parsed = EmployeeSchema.parse(formData)

  // Verify employee belongs to tenant
  const existing = await prisma.employee.findFirst({
    where: { id: employeeId, tenantId: tenant.id },
  })
  if (!existing) throw new UserError('Employee not found')

  // For non-admin managers, verify they are the direct manager or an active delegate
  if (!isAtLeast(membership, 'ADMIN')) {
    const myEmp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    if (!myEmp) throw new UserError('No employee record found')
    const isDirectManager = existing.managerId === myEmp.id
    if (!isDirectManager) {
      if (!existing.managerId) {
        throw new UserError('This employee has no assigned manager. An admin must edit this record.')
      }
      const now = new Date()
      const delegation = await prisma.approvalDelegate.findFirst({
        where: {
          delegateId: myEmp.id,
          managerId: existing.managerId,
          tenantId: tenant.id,
          startDate: { lte: now },
          endDate: { gte: now },
        },
      })
      if (!delegation) throw new UserError('You do not have permission to edit this employee')
    }
  }

  const employee = await prisma.employee.update({
    where: { id: employeeId },
    data: {
      firstName: parsed.firstName,
      lastName: parsed.lastName,
      email: parsed.email || null,
      jobTitle: parsed.jobTitle || null,
      department: parsed.department || null,
      startDate: parsed.startDate ? new Date(parsed.startDate) : null,
      dateOfBirth: parsed.dateOfBirth ? new Date(parsed.dateOfBirth) : null,
      phone: parsed.phone || null,
      address: parsed.address || null,
      emergencyContactName: parsed.emergencyContactName || null,
      emergencyContactPhone: parsed.emergencyContactPhone || null,
      managerId: parsed.managerId || null,
      status: parsed.status,
      leaveYearStartMonth: parsed.leaveYearStartMonth ?? null,
      hoursPerDay: parsed.hoursPerDay ?? null,
    },
  })

  await logAudit({
    action: 'employee.updated',
    entity: 'Employee',
    entityId: employee.id,
    userId: user.userId,
    tenantId: tenant.id,
  })

  // If the active/inactive status changed, push the new seat count to Stripe.
  // Otherwise we'd keep billing for inactive seats until something else
  // happens to trigger a sync.
  if (existing.status !== employee.status) {
    fireAndForget(syncSeatCount(tenant.id), 'employees.seat-sync')
  }

  revalidatePath(`/t/${tenantSlug}/employees`)
  revalidatePath(`/t/${tenantSlug}/employees/${employeeId}`)
  })
}

export async function getEmployee(tenantSlug: string, employeeId: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  // For non-managers, pre-filter to only their own record (don't fetch then check)
  const whereClause: Record<string, unknown> = { id: employeeId, tenantId: tenant.id }
  if (!isAtLeast(membership, 'MANAGER')) {
    whereClause.userId = user.userId
  }

  const employee = await prisma.employee.findFirst({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: whereClause as any,
    include: {
      manager: { select: { id: true, firstName: true, lastName: true } },
      reports: { select: { id: true, firstName: true, lastName: true, jobTitle: true, status: true }, where: { status: 'ACTIVE' } },
      notes: { orderBy: { createdAt: 'desc' } },
      leaveRequests: {
        include: { policy: true },
        orderBy: { startDate: 'desc' },
      },
    },
  })

  if (!employee) throw new Error('Employee not found')

  // Managers (not ADMIN/OWNER) can only view their direct reports (or themselves)
  if (isAtLeast(membership, 'MANAGER') && !isAtLeast(membership, 'ADMIN')) {
    if (employee.userId !== user.userId) {
      const reportIds = await getDirectReportIds(tenant.id, user.userId, membership)
      if (reportIds !== null && !reportIds.includes(employee.id)) {
        throw new Error('You do not have permission to view this employee')
      }
    }
  }

  return employee
}

export async function getActiveEmployees(tenantSlug: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  const where: Record<string, unknown> = { tenantId: tenant.id, status: 'ACTIVE' }

  // Managers (not ADMIN/OWNER) can only see their direct reports + themselves
  if (isAtLeast(membership, 'MANAGER') && !isAtLeast(membership, 'ADMIN')) {
    const reportIds = await getDirectReportIds(tenant.id, user.userId, membership)
    if (reportIds !== null) {
      const myEmp = await prisma.employee.findFirst({
        where: { tenantId: tenant.id, userId: user.userId },
        select: { id: true },
      })
      const visibleIds = myEmp ? [...reportIds, myEmp.id] : reportIds
      where.id = { in: visibleIds }
    }
  }

  return prisma.employee.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    select: { id: true, firstName: true, lastName: true },
    orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
  })
}

export async function addEmployeeNote(
  tenantSlug: string,
  employeeId: string,
  content: string
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  if (!content.trim()) throw new UserError('Note content is required')

  const existing = await prisma.employee.findFirst({
    where: { id: employeeId, tenantId: tenant.id },
  })
  if (!existing) throw new UserError('Employee not found')

  // For non-admin managers, verify they are the direct manager or an active delegate
  if (!isAtLeast(membership, 'ADMIN')) {
    const myEmp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    if (!myEmp) throw new UserError('No employee record found')
    const isDirectManager = existing.managerId === myEmp.id
    if (!isDirectManager) {
      if (!existing.managerId) {
        throw new UserError('This employee has no assigned manager. An admin must add notes for this record.')
      }
      const now = new Date()
      const delegation = await prisma.approvalDelegate.findFirst({
        where: {
          delegateId: myEmp.id,
          managerId: existing.managerId,
          tenantId: tenant.id,
          startDate: { lte: now },
          endDate: { gte: now },
        },
      })
      if (!delegation) throw new UserError('You do not have permission to add notes for this employee')
    }
  }

  const note = await prisma.employeeNote.create({
    data: {
      content: content.trim(),
      employeeId,
      authorId: user.userId,
      tenantId: tenant.id,
    },
  })

  await logAudit({
    action: 'employee_note.created',
    entity: 'EmployeeNote',
    entityId: note.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { employeeId },
  })

    revalidatePath(`/t/${tenantSlug}/employees/${employeeId}`)
    return { id: note.id }
  })
}

export async function deleteEmployeeNote(
  tenantSlug: string,
  noteId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const note = await prisma.employeeNote.findFirst({
      where: { id: noteId, tenantId: tenant.id },
    })
    if (!note) throw new UserError('Note not found')

    // Scope guard: a plain MANAGER may only delete notes for employees they
    // can manage (direct reports / active delegations). Otherwise any
    // MANAGER could delete any note in the tenant by guessing a note id.
    if (!isAtLeast(membership, 'ADMIN')) {
      const allowed = await canManageEmployeeId(tenant.id, user.userId, membership, note.employeeId)
      if (!allowed) throw new UserError('You do not have permission to delete this note')
    }

    await prisma.employeeNote.delete({ where: { id: noteId } })

    await logAudit({
      action: 'employee_note.deleted',
      entity: 'EmployeeNote',
      entityId: noteId,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { employeeId: note.employeeId },
    })

    revalidatePath(`/t/${tenantSlug}/employees/${note.employeeId}`)
  })
}

export async function setEmployeeInactive(
  tenantSlug: string,
  employeeId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const existing = await prisma.employee.findFirst({
      where: { id: employeeId, tenantId: tenant.id },
    })
    if (!existing) throw new UserError('Employee not found')

    // For non-admin managers, verify they are the direct manager or an active delegate.
    // This MUST run before the Stripe seat-count sync below.
    if (!isAtLeast(membership, 'ADMIN')) {
      const myEmp = await prisma.employee.findFirst({
        where: { tenantId: tenant.id, userId: user.userId },
        select: { id: true },
      })
      if (!myEmp) throw new UserError('No employee record found')
      const isDirectManager = existing.managerId === myEmp.id
      if (!isDirectManager) {
        if (!existing.managerId) {
          throw new UserError('This employee has no assigned manager. An admin must deactivate this record.')
        }
        const now = new Date()
        const delegation = await prisma.approvalDelegate.findFirst({
          where: {
            delegateId: myEmp.id,
            managerId: existing.managerId,
            tenantId: tenant.id,
            startDate: { lte: now },
            endDate: { gte: now },
          },
        })
        if (!delegation) throw new UserError('You do not have permission to deactivate this employee')
      }
    }

    await prisma.employee.update({
      where: { id: employeeId },
      data: { status: 'INACTIVE' },
    })

    await logAudit({
      action: 'employee.deactivated',
      entity: 'Employee',
      entityId: employeeId,
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/employees`)

    // Sync seat count to Stripe (fire-and-forget)
    fireAndForget(syncSeatCount(tenant.id), 'employees.seat-sync')
  })
}

export async function getOnboardingTemplatesList(tenantSlug: string) {
  const { tenant } = await requireTenant(tenantSlug)
  return prisma.onboardingTemplate.findMany({
    where: { tenantId: tenant.id },
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })
}

export async function assignOnboardingChecklist(
  tenantSlug: string,
  employeeId: string,
  templateId: string
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const employee = await prisma.employee.findFirst({
      where: { id: employeeId, tenantId: tenant.id },
    })
    if (!employee) throw new UserError('Employee not found')

    const existingChecklist = await prisma.onboardingChecklist.findFirst({
      where: { employeeId, tenantId: tenant.id },
    })
    if (existingChecklist) throw new UserError('Employee already has an onboarding checklist assigned')

    const template = await prisma.onboardingTemplate.findFirst({
      where: { id: templateId, tenantId: tenant.id },
      include: { items: { orderBy: { sortOrder: 'asc' } } },
    })
    if (!template) throw new UserError('Template not found')

    const checklist = await prisma.onboardingChecklist.create({
      data: {
        employeeId,
        templateId: template.id,
        tenantId: tenant.id,
      },
    })

    if (template.items.length > 0) {
      await prisma.onboardingTask.createMany({
        data: template.items.map((item) => ({
          checklistId: checklist.id,
          title: item.title,
          description: item.description,
          assignTo: item.assignTo,
          sortOrder: item.sortOrder,
        })),
      })
    }

    await logAudit({
      action: 'onboarding_checklist.assigned',
      entity: 'OnboardingChecklist',
      entityId: checklist.id,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { employeeId, templateId },
    })

    revalidatePath(`/t/${tenantSlug}/employees/${employeeId}`)
    return { id: checklist.id }
  })
}

export async function getEmployeeChecklist(tenantSlug: string, employeeId: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  // Scope guard. ADMIN+ → any. MANAGER → only direct reports /
  // delegates / themselves. EMPLOYEE → only their own. Without this
  // any tenant employee could enumerate any colleague's onboarding
  // checklist (task titles, completion state, assigned-to roles)
  // via direct Server Action call. (Round 6.5 follow-up.)
  const allowedView = await canManageEmployeeId(
    tenant.id,
    user.userId,
    membership,
    employeeId,
  )
  if (!allowedView) return null

  const checklist = await prisma.onboardingChecklist.findFirst({
    where: { employeeId, tenantId: tenant.id },
    include: {
      tasks: { orderBy: { sortOrder: 'asc' } },
    },
    orderBy: { createdAt: 'desc' },
  })

  if (!checklist) return null

  return {
    id: checklist.id,
    tasks: checklist.tasks.map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      assignTo: t.assignTo,
      completedAt: t.completedAt ? t.completedAt.toISOString() : null,
      sortOrder: t.sortOrder,
    })),
  }
}

export async function completeOnboardingTask(
  tenantSlug: string,
  taskId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const task = await prisma.onboardingTask.findFirst({
      where: { id: taskId, checklist: { tenantId: tenant.id } },
      include: { checklist: { select: { employeeId: true } } },
    })
    if (!task) throw new UserError('Task not found')

    if (!isAtLeast(membership, 'ADMIN')) {
      const allowed = await canManageEmployeeId(tenant.id, user.userId, membership, task.checklist.employeeId)
      if (!allowed) throw new UserError("You do not have permission to modify this employee's onboarding")
    }

    await prisma.onboardingTask.update({
      where: { id: taskId },
      data: { completedAt: new Date(), completedBy: user.userId },
    })

    revalidatePath(`/t/${tenantSlug}/employees/${task.checklist.employeeId}`)
    revalidatePath(`/t/${tenantSlug}/dashboard`)
  })
}

export async function uncompleteOnboardingTask(
  tenantSlug: string,
  taskId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const task = await prisma.onboardingTask.findFirst({
      where: { id: taskId, checklist: { tenantId: tenant.id } },
      include: { checklist: { select: { employeeId: true } } },
    })
    if (!task) throw new UserError('Task not found')

    if (!isAtLeast(membership, 'ADMIN')) {
      const allowed = await canManageEmployeeId(tenant.id, user.userId, membership, task.checklist.employeeId)
      if (!allowed) throw new UserError("You do not have permission to modify this employee's onboarding")
    }

    await prisma.onboardingTask.update({
      where: { id: taskId },
      data: { completedAt: null, completedBy: null },
    })

    revalidatePath(`/t/${tenantSlug}/employees/${task.checklist.employeeId}`)
    revalidatePath(`/t/${tenantSlug}/dashboard`)
  })
}

// ── Working Pattern ──

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export type WorkingPatternDay = {
  dayOfWeek: number
  dayName: string
  isWorkingDay: boolean
  startTime: string | null
  endTime: string | null
}

function defaultPattern(): WorkingPatternDay[] {
  return Array.from({ length: 7 }, (_, i) => ({
    dayOfWeek: i,
    dayName: DAY_NAMES[i],
    isWorkingDay: i >= 1 && i <= 5, // Mon-Fri
    startTime: i >= 1 && i <= 5 ? '09:00' : null,
    endTime: i >= 1 && i <= 5 ? '17:00' : null,
  }))
}

export async function getWorkingPattern(
  tenantSlug: string,
  employeeId: string
): Promise<WorkingPatternDay[]> {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  // Verify employee belongs to tenant
  const emp = await prisma.employee.findFirst({
    where: { id: employeeId, tenantId: tenant.id },
  })
  if (!emp) throw new Error('Employee not found')

  // Self-access is always allowed. Otherwise require MANAGER+ with
  // a direct-report or active delegation (ADMIN+ see everything).
  const isSelf = emp.userId === user.userId
  if (!isSelf) {
    assertAtLeast(membership, 'MANAGER')
    if (!isAtLeast(membership, 'ADMIN')) {
      const myEmp = await prisma.employee.findFirst({
        where: { tenantId: tenant.id, userId: user.userId },
        select: { id: true },
      })
      if (!myEmp) throw new Error('No employee record found')
      const isDirectManager = emp.managerId === myEmp.id
      if (!isDirectManager) {
        if (!emp.managerId) {
          throw new Error('You do not have permission to view this working pattern')
        }
        const now = new Date()
        const delegation = await prisma.approvalDelegate.findFirst({
          where: {
            delegateId: myEmp.id,
            managerId: emp.managerId,
            tenantId: tenant.id,
            startDate: { lte: now },
            endDate: { gte: now },
          },
        })
        if (!delegation) throw new Error('You do not have permission to view this working pattern')
      }
    }
  }

  const rows = await prisma.workingTimePattern.findMany({
    where: { employeeId },
    orderBy: { dayOfWeek: 'asc' },
  })

  if (rows.length === 0) return defaultPattern()

  // Build full 7-day array, filling in any missing days
  const byDay = new Map(rows.map((r) => [r.dayOfWeek, r]))
  return Array.from({ length: 7 }, (_, i) => {
    const row = byDay.get(i)
    if (row) {
      return {
        dayOfWeek: row.dayOfWeek,
        dayName: DAY_NAMES[row.dayOfWeek],
        isWorkingDay: row.isWorkingDay,
        startTime: row.startTime,
        endTime: row.endTime,
      }
    }
    return {
      dayOfWeek: i,
      dayName: DAY_NAMES[i],
      isWorkingDay: i >= 1 && i <= 5,
      startTime: i >= 1 && i <= 5 ? '09:00' : null,
      endTime: i >= 1 && i <= 5 ? '17:00' : null,
    }
  })
}

// HH:MM 24-hour. Empty string allowed; null allowed; nothing else.
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/
const WorkingPatternInputSchema = z
  .array(
    z
      .object({
        dayOfWeek: z.number().int().min(0).max(6),
        isWorkingDay: z.boolean(),
        startTime: z
          .string()
          .nullable()
          .optional()
          .refine((v) => !v || TIME_RE.test(v), 'Start time must be HH:MM'),
        endTime: z
          .string()
          .nullable()
          .optional()
          .refine((v) => !v || TIME_RE.test(v), 'End time must be HH:MM'),
      })
      // If both bounds are set on a working day, end must be after start.
      // Without this an admin could save start=18:00, end=09:00 and the
      // hours-per-day calculation downstream silently goes negative.
      .refine(
        (d) => {
          if (!d.isWorkingDay) return true
          if (!d.startTime || !d.endTime) return true
          return d.endTime > d.startTime
        },
        { message: 'End time must be after start time', path: ['endTime'] },
      ),
  )
  .max(7, 'Working pattern has at most 7 days')

export async function updateWorkingPattern(
  tenantSlug: string,
  employeeId: string,
  pattern: { dayOfWeek: number; isWorkingDay: boolean; startTime?: string | null; endTime?: string | null }[]
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'ADMIN')
    await requireWriteAccess(tenant.id)

    const parsed = WorkingPatternInputSchema.parse(pattern)

    // Verify employee belongs to tenant
    const emp = await prisma.employee.findFirst({
      where: { id: employeeId, tenantId: tenant.id },
    })
    if (!emp) throw new UserError('Employee not found')

    // Upsert all 7 days
    await Promise.all(
      parsed.map((day) =>
        prisma.workingTimePattern.upsert({
          where: {
            employeeId_dayOfWeek: { employeeId, dayOfWeek: day.dayOfWeek },
          },
          update: {
            isWorkingDay: day.isWorkingDay,
            startTime: day.startTime || null,
            endTime: day.endTime || null,
          },
          create: {
            employeeId,
            dayOfWeek: day.dayOfWeek,
            isWorkingDay: day.isWorkingDay,
            startTime: day.startTime || null,
            endTime: day.endTime || null,
          },
        })
      )
    )

    await logAudit({
      action: 'working_pattern.updated',
      entity: 'Employee',
      entityId: employeeId,
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/employees/${employeeId}`)
    revalidatePath(`/t/${tenantSlug}/employees/${employeeId}/edit`)
  })
}

export async function getEmployeesForExport(tenantSlug: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  // Build employee filter for manager hierarchy
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

  const employees = await prisma.employee.findMany({
    where: empWhere,
    orderBy: { lastName: 'asc' },
  })

  return employees.map(e => ({
    firstName: e.firstName,
    lastName: e.lastName,
    email: e.email || '',
    jobTitle: e.jobTitle || '',
    department: e.department || '',
    status: e.status,
    startDate: e.startDate ? e.startDate.toISOString().split('T')[0] : '',
    phone: e.phone || '',
  }))
}

// ── CSV Import ──

export type CsvEmployeeRow = {
  firstName: string
  lastName: string
  email: string
  jobTitle: string
  department: string
  startDate: string
  phone: string
}

export type ImportResult = {
  imported: number
  skipped: number
  errors: { row: number; message: string }[]
}

export async function importEmployeesFromCsv(
  tenantSlug: string,
  rows: CsvEmployeeRow[]
): Promise<ImportResult> {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  // Hard cap on the number of rows we process per call. Without this
  // an admin (or anyone with admin role) could submit 10k+ rows and
  // exhaust the Hyperdrive connection pool / take the worker over its
  // CPU budget. 1000 rows is comfortably above the realistic CSV
  // import size for an SMB; bigger imports should be batched.
  if (!Array.isArray(rows)) {
    throw new Error('CSV rows must be an array')
  }
  if (rows.length > 1000) {
    throw new Error(`CSV import is limited to 1,000 rows per request. You sent ${rows.length}.`)
  }

  // Fetch existing employee emails for duplicate detection
  const existingEmployees = await prisma.employee.findMany({
    where: { tenantId: tenant.id, email: { not: null } },
    select: { email: true },
  })
  const existingEmails = new Set(
    existingEmployees.map((e) => e.email!.toLowerCase())
  )

  const result: ImportResult = { imported: 0, skipped: 0, errors: [] }

  // Validate every row first; collect the rows that pass into a single
  // createMany payload. Previously this loop did one round-trip per row
  // (~30-60ms on Neon serverless × 1000 rows = well over the Workers
  // 30s wall-clock limit). createMany lands all valid rows in a single
  // INSERT, so even a max-size import is one round trip.
  //
  // Each entry carries its ORIGINAL CSV row number alongside the data so
  // that if a chunked createMany fails and we fall back to per-row
  // inserts, the error messages quote the line number the user actually
  // sees in their spreadsheet (not the post-validation index).
  const toInsert: {
    rowNum: number
    data: {
      firstName: string
      lastName: string
      email: string | null
      jobTitle: string | null
      department: string | null
      startDate: Date | null
      phone: string | null
      tenantId: string
    }
  }[] = []

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const rowNum = i + 1

    // Validate required fields
    if (!row.firstName?.trim()) {
      result.errors.push({ row: rowNum, message: 'First name is required' })
      continue
    }
    if (!row.lastName?.trim()) {
      result.errors.push({ row: rowNum, message: 'Last name is required' })
      continue
    }

    // Validate email format if provided
    const email = row.email?.trim() || null
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        result.errors.push({ row: rowNum, message: `Invalid email: ${email}` })
        continue
      }
      // Skip duplicates against existing employees AND within-batch dupes.
      if (existingEmails.has(email.toLowerCase())) {
        result.skipped++
        continue
      }
      // Track within-batch dupes ahead of insert so the next row sees it.
      existingEmails.add(email.toLowerCase())
    }

    // Validate start date if provided
    let startDate: Date | null = null
    if (row.startDate?.trim()) {
      startDate = new Date(row.startDate.trim())
      if (isNaN(startDate.getTime())) {
        result.errors.push({ row: rowNum, message: `Invalid date: ${row.startDate}` })
        continue
      }
    }

    toInsert.push({
      rowNum,
      data: {
        firstName: row.firstName.trim(),
        lastName: row.lastName.trim(),
        email,
        jobTitle: row.jobTitle?.trim() || null,
        department: row.department?.trim() || null,
        startDate,
        phone: row.phone?.trim() || null,
        tenantId: tenant.id,
      },
    })
  }

  // Chunk to keep individual statements under typical Postgres parameter
  // limits and to avoid one bad row poisoning a 1000-row insert. 100 rows
  // × ~8 cols = 800 params, well inside the 32k limit.
  const CHUNK_SIZE = 100
  for (let i = 0; i < toInsert.length; i += CHUNK_SIZE) {
    const chunk = toInsert.slice(i, i + CHUNK_SIZE)
    try {
      const created = await prisma.employee.createMany({
        data: chunk.map((e) => e.data),
        skipDuplicates: true,
      })
      result.imported += created.count
      // createMany.count is the number actually inserted after
      // skipDuplicates filtering; treat the difference as skipped so the
      // total imported + skipped + errors still adds to rows processed.
      const skippedThisChunk = chunk.length - created.count
      if (skippedThisChunk > 0) result.skipped += skippedThisChunk
    } catch (err) {
      // If the chunk fails outright, fall back to per-row inserts so a
      // single bad row doesn't lose 99 valid ones.
      console.error('[csv-import] createMany chunk failed, falling back to per-row:', err)
      for (const entry of chunk) {
        try {
          await prisma.employee.create({ data: entry.data })
          result.imported++
        } catch (rowErr) {
          result.errors.push({
            // Use the original CSV row number (1-indexed by user), not the
            // post-validation array index — admins look up the failed row
            // in their source spreadsheet.
            row: entry.rowNum,
            message: rowErr instanceof Error ? rowErr.message : 'Unknown error',
          })
        }
      }
    }
  }

  if (result.imported > 0) {
    await logAudit({
      action: 'employees.csv_imported',
      entity: 'Employee',
      userId: user.userId,
      tenantId: tenant.id,
      metadata: {
        imported: result.imported,
        skipped: result.skipped,
        errors: result.errors.length,
      },
    })
    fireAndForget(
      trackServerEvent('employee_added', {
        distinctId: user.userId,
        tenantId: tenant.id,
        userId: user.userId,
        properties: {
          tenant_slug: tenantSlug,
          created_by_role: membership.role,
          source: 'employees_csv_import',
          imported_count: result.imported,
          skipped_count: result.skipped,
          error_count: result.errors.length,
        },
      }),
      'analytics.employee-added',
    )

    revalidatePath(`/t/${tenantSlug}/employees`)

    // Sync seat count to Stripe (fire-and-forget)
    fireAndForget(syncSeatCount(tenant.id), 'employees.seat-sync')
  }

  return result
}
