'use server'

import { prisma } from '@/lib/db'
import { Prisma } from '@/generated/prisma/client'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast, isAtLeast, canManageEmployeeId } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { syncSeatCount } from '@/lib/stripe'
import { fireAndForget } from '@/lib/cloudflare-ctx'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'
import { captureServerError } from '@/lib/error-capture'

/**
 * Verify the current user has permission to mutate the given employee record.
 * ADMIN+ passes. Plain MANAGER must be the direct manager or have an active
 * ApprovalDelegate — same pattern used by approveLeaveRequest in leave/actions.ts.
 */
async function assertCanManageEmployee(
  tenantId: string,
  membership: { role: 'OWNER' | 'ADMIN' | 'MANAGER' | 'EMPLOYEE' },
  userId: string,
  employee: { managerId: string | null }
): Promise<void> {
  if (isAtLeast(membership, 'ADMIN')) return

  const myEmp = await prisma.employee.findFirst({
    where: { tenantId, userId },
    select: { id: true },
  })
  if (!myEmp) throw new UserError('No employee record found')

  const isDirectManager = employee.managerId === myEmp.id
  if (isDirectManager) return

  if (!employee.managerId) {
    throw new UserError('This employee has no assigned manager. An admin must edit this record.')
  }

  const now = new Date()
  const delegation = await prisma.approvalDelegate.findFirst({
    where: {
      delegateId: myEmp.id,
      managerId: employee.managerId,
      tenantId,
      startDate: { lte: now },
      endDate: { gte: now },
    },
  })
  if (!delegation) throw new UserError('You do not have permission to edit this employee')
}

// ── Working Status ──

const WorkingStatusSchema = z.object({
  workingStatus: z.enum(['office', 'home', 'hybrid', 'away', 'sick', 'leave']),
})

export async function updateWorkingStatus(
  tenantSlug: string,
  employeeId: string,
  data: { workingStatus: string }
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const parsed = WorkingStatusSchema.parse(data)

    const existing = await prisma.employee.findFirst({
      where: { id: employeeId, tenantId: tenant.id },
    })
    if (!existing) throw new UserError('Employee not found')

    // Scope guard. Use canManageEmployeeId (from @/lib/rbac) which has
    // a self-action check, NOT the local assertCanManageEmployee helper
    // which doesn't. The local helper blocks a manager updating their OWN
    // working status because it only checks direct-manager/delegation
    // chains. canManageEmployeeId also returns true for self-action
    // (target.userId === callerUserId). (Codex regression review #2.)
    const allowed = await canManageEmployeeId(
      tenant.id,
      user.userId,
      membership,
      employeeId,
    )
    if (!allowed) {
      throw new UserError('You do not have permission to update this employee\u2019s status')
    }

    await prisma.employee.update({
      where: { id: employeeId },
      data: { workingStatus: parsed.workingStatus },
    })

    await logAudit({
      action: 'employee.working_status_updated',
      entity: 'Employee',
      entityId: employeeId,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { workingStatus: parsed.workingStatus },
    })

    revalidatePath(`/t/${tenantSlug}/employees/${employeeId}`)
  })
}

// ── Personal Info ──

const PersonalInfoSchema = z.object({
  title: z.string().optional(),
  middleName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  ethnicity: z.string().optional(),
  phone: z.string().optional(),
  homePhone: z.string().optional(),
  workPhone: z.string().optional(),
  workExtension: z.string().optional(),
  personalEmail: z.string().email().optional().or(z.literal('')),
  address: z.string().optional(),
})

export async function updatePersonalInfo(
  tenantSlug: string,
  employeeId: string,
  data: z.input<typeof PersonalInfoSchema>
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const parsed = PersonalInfoSchema.parse(data)

    const existing = await prisma.employee.findFirst({
      where: { id: employeeId, tenantId: tenant.id },
    })
    if (!existing) throw new UserError('Employee not found')

    await assertCanManageEmployee(tenant.id, membership, user.userId, existing)

    await prisma.employee.update({
      where: { id: employeeId },
      data: {
        title: parsed.title || null,
        middleName: parsed.middleName || null,
        dateOfBirth: parsed.dateOfBirth ? new Date(parsed.dateOfBirth) : undefined,
        gender: parsed.gender || null,
        ethnicity: parsed.ethnicity || null,
        phone: parsed.phone || null,
        homePhone: parsed.homePhone || null,
        workPhone: parsed.workPhone || null,
        workExtension: parsed.workExtension || null,
        personalEmail: parsed.personalEmail || null,
        address: parsed.address || null,
      },
    })

    await logAudit({
      action: 'employee.personal_info_updated',
      entity: 'Employee',
      entityId: employeeId,
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/employees/${employeeId}`)
  })
}

// ── Own Contact Details (Employee Self-Service) ──

const OwnContactSchema = z.object({
  phone: z.string().optional(),
  personalEmail: z.string().email().optional().or(z.literal('')),
  address: z.string().optional(),
  homePhone: z.string().optional(),
  workPhone: z.string().optional(),
  workExtension: z.string().optional(),
})

export async function updateOwnContactDetails(
  tenantSlug: string,
  data: z.input<typeof OwnContactSchema>
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, user } = await requireTenant(tenantSlug)
    await requireWriteAccess(tenant.id)

    const parsed = OwnContactSchema.parse(data)

    // Find the employee record for the current user
    const employee = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
    })
    if (!employee) throw new UserError('No employee record found for your account')

    await prisma.employee.update({
      where: { id: employee.id },
      data: {
        phone: parsed.phone || null,
        personalEmail: parsed.personalEmail || null,
        address: parsed.address || null,
        homePhone: parsed.homePhone || null,
        workPhone: parsed.workPhone || null,
        workExtension: parsed.workExtension || null,
      },
    })

    await logAudit({
      action: 'employee.own_contact_updated',
      entity: 'Employee',
      entityId: employee.id,
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/employees/${employee.id}`)
  })
}

// ── Employment Info ──

const EmploymentInfoSchema = z.object({
  contractType: z.string().optional(),
  noticePeriod: z.string().optional(),
  probationEndDate: z.string().optional(),
  workingLocation: z.string().optional(),
  jobTitle: z.string().optional(),
  department: z.string().optional(),
})

export async function updateEmploymentInfo(
  tenantSlug: string,
  employeeId: string,
  data: z.input<typeof EmploymentInfoSchema>
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const parsed = EmploymentInfoSchema.parse(data)

    const existing = await prisma.employee.findFirst({
      where: { id: employeeId, tenantId: tenant.id },
    })
    if (!existing) throw new UserError('Employee not found')

    await assertCanManageEmployee(tenant.id, membership, user.userId, existing)

    await prisma.employee.update({
      where: { id: employeeId },
      data: {
        contractType: parsed.contractType || null,
        noticePeriod: parsed.noticePeriod || null,
        probationEndDate: parsed.probationEndDate ? new Date(parsed.probationEndDate) : undefined,
        workingLocation: parsed.workingLocation || null,
        jobTitle: parsed.jobTitle || null,
        department: parsed.department || null,
      },
    })

    await logAudit({
      action: 'employee.employment_info_updated',
      entity: 'Employee',
      entityId: employeeId,
      userId: user.userId,
      tenantId: tenant.id,
    })

    // Revalidate every page that surfaces department / job title — was just
    // the profile, so a department change wasn't reflected on /leave/balances
    // or the /employees directory until the next natural refresh.
    revalidatePath(`/t/${tenantSlug}/employees/${employeeId}`)
    revalidatePath(`/t/${tenantSlug}/employees`)
    revalidatePath(`/t/${tenantSlug}/leave/balances`)
  })
}

// ── Salary Info ──

// (#145) salaryFrequency is now a Postgres enum — only the canonical
// lowercase values are accepted. Anything else trips a Zod error before
// the DB ever sees it.
const SalaryInfoSchema = z.object({
  salary: z.number().nonnegative().optional(),
  salaryFrequency: z.enum(['annual', 'monthly', 'weekly', 'hourly']).optional(),
  payrollNumber: z.string().optional(),
  taxCode: z.string().optional(),
  niNumber: z.string().optional(),
  pensionProvider: z.string().optional(),
  pensionNumber: z.string().optional(),
  bankName: z.string().optional(),
  bankAccountNumber: z.string().optional(),
  bankSortCode: z.string().optional(),
})

export async function updateSalaryInfo(
  tenantSlug: string,
  employeeId: string,
  data: z.input<typeof SalaryInfoSchema>
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'ADMIN')
    await requireWriteAccess(tenant.id)

    const parsed = SalaryInfoSchema.parse(data)

    const existing = await prisma.employee.findFirst({
      where: { id: employeeId, tenantId: tenant.id },
    })
    if (!existing) throw new UserError('Employee not found')

    await prisma.employee.update({
      where: { id: employeeId },
      data: {
        salary: parsed.salary ?? null,
        salaryFrequency: parsed.salaryFrequency ?? null,
        payrollNumber: parsed.payrollNumber || null,
        taxCode: parsed.taxCode || null,
        niNumber: parsed.niNumber || null,
        pensionProvider: parsed.pensionProvider || null,
        pensionNumber: parsed.pensionNumber || null,
        bankName: parsed.bankName || null,
        bankAccountNumber: parsed.bankAccountNumber || null,
        bankSortCode: parsed.bankSortCode || null,
      },
    })

    await logAudit({
      action: 'employee.salary_info_updated',
      entity: 'Employee',
      entityId: employeeId,
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/employees/${employeeId}`)
  })
}

// ── Emergency Contacts ──

const EmergencyContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email().optional().or(z.literal('')),
  isPrimary: z.boolean().default(false),
})

export async function addEmergencyContact(
  tenantSlug: string,
  employeeId: string,
  data: z.input<typeof EmergencyContactSchema>
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const parsed = EmergencyContactSchema.parse(data)

    const existing = await prisma.employee.findFirst({
      where: { id: employeeId, tenantId: tenant.id },
    })
    if (!existing) throw new UserError('Employee not found')

    await assertCanManageEmployee(tenant.id, membership, user.userId, existing)

    const contact = await prisma.emergencyContact.create({
      data: {
        name: parsed.name,
        relationship: parsed.relationship,
        phone: parsed.phone,
        email: parsed.email || null,
        isPrimary: parsed.isPrimary,
        employeeId,
        tenantId: tenant.id,
      },
    })

    await logAudit({
      action: 'emergency_contact.created',
      entity: 'EmergencyContact',
      entityId: contact.id,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { employeeId },
    })

    revalidatePath(`/t/${tenantSlug}/employees/${employeeId}`)
    return { id: contact.id }
  })
}

export async function updateEmergencyContact(
  tenantSlug: string,
  contactId: string,
  data: z.input<typeof EmergencyContactSchema>
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const parsed = EmergencyContactSchema.parse(data)

    const existing = await prisma.emergencyContact.findFirst({
      where: { id: contactId, tenantId: tenant.id },
      include: { employee: { select: { managerId: true } } },
    })
    if (!existing) throw new UserError('Emergency contact not found')

    await assertCanManageEmployee(tenant.id, membership, user.userId, existing.employee)

    await prisma.emergencyContact.update({
      where: { id: contactId },
      data: {
        name: parsed.name,
        relationship: parsed.relationship,
        phone: parsed.phone,
        email: parsed.email || null,
        isPrimary: parsed.isPrimary,
      },
    })

    await logAudit({
      action: 'emergency_contact.updated',
      entity: 'EmergencyContact',
      entityId: contactId,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { employeeId: existing.employeeId },
    })

    revalidatePath(`/t/${tenantSlug}/employees/${existing.employeeId}`)
  })
}

export async function deleteEmergencyContact(
  tenantSlug: string,
  contactId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const existing = await prisma.emergencyContact.findFirst({
      where: { id: contactId, tenantId: tenant.id },
      include: { employee: { select: { managerId: true } } },
    })
    if (!existing) throw new UserError('Emergency contact not found')

    await assertCanManageEmployee(tenant.id, membership, user.userId, existing.employee)

    await prisma.emergencyContact.delete({ where: { id: contactId } })

    await logAudit({
      action: 'emergency_contact.deleted',
      entity: 'EmergencyContact',
      entityId: contactId,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { employeeId: existing.employeeId },
    })

    revalidatePath(`/t/${tenantSlug}/employees/${existing.employeeId}`)
  })
}

// ── Medical Info ──

const MedicalInfoSchema = z.object({
  covidVaccinated: z.string().optional(),
  medicalNotes: z.string().optional(),
})

export async function updateMedicalInfo(
  tenantSlug: string,
  employeeId: string,
  data: z.input<typeof MedicalInfoSchema>
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const parsed = MedicalInfoSchema.parse(data)

    const existing = await prisma.employee.findFirst({
      where: { id: employeeId, tenantId: tenant.id },
    })
    if (!existing) throw new UserError('Employee not found')

    await assertCanManageEmployee(tenant.id, membership, user.userId, existing)

    await prisma.employee.update({
      where: { id: employeeId },
      data: {
        covidVaccinated: parsed.covidVaccinated || null,
        medicalNotes: parsed.medicalNotes || null,
      },
    })

    await logAudit({
      action: 'employee.medical_info_updated',
      entity: 'Employee',
      entityId: employeeId,
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/employees/${employeeId}`)
  })
}

// ── Termination ──

const TerminationSchema = z.object({
  terminationDate: z.string().min(1, 'Termination date is required'),
  terminationReason: z.enum([
    'Resignation',
    'Redundancy',
    'End of contract',
    'Dismissal',
    'Retirement',
    'Other',
  ]),
  exitInterview: z.boolean().default(false),
})

export async function terminateEmployee(
  tenantSlug: string,
  employeeId: string,
  data: z.input<typeof TerminationSchema>
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'ADMIN')
    await requireWriteAccess(tenant.id)

    const parsed = TerminationSchema.parse(data)

    const existing = await prisma.employee.findFirst({
      where: { id: employeeId, tenantId: tenant.id },
    })
    if (!existing) throw new UserError('Employee not found')

    // Wrap the employee status flip + the pending-leave snapshot in a
    // single transaction so a manager approving (or the employee
    // cancelling) one of the pending requests cannot race the rollback
    // loop. Previously the flow was: findMany pending → updateMany
    // pending→CANCELLED → loop and roll back PENDING bucket. Between the
    // findMany and the updateMany, an approve could move a row from
    // PENDING→APPROVED. The updateMany would skip it, but the rollback
    // loop still saw the stale row in its `pendingRequests` list and
    // decremented its 'PENDING' bucket — pending could go negative AND
    // the leave would stay APPROVED for a terminated employee. Fold the
    // status snapshot inside the transaction and use a per-employee
    // advisory lock so any concurrent approve/cancel for this same
    // employee serialises behind us.
    const pendingRequests = await prisma.$transaction(async (tx) => {
      // Per-employee advisory lock — releases on commit/rollback. Same
      // pattern as createLeaveRequest, scoped so other employees in the
      // tenant proceed in parallel. Coerced to int4 via hashtext.
      await tx.$queryRaw(
        Prisma.sql`SELECT pg_advisory_xact_lock(hashtext(${employeeId}))`
      )

      await tx.employee.update({
        where: { id: employeeId },
        data: {
          status: 'INACTIVE',
          terminationDate: new Date(parsed.terminationDate),
          terminationReason: parsed.terminationReason,
          exitInterview: parsed.exitInterview,
        },
      })

      // Snapshot pending requests under the advisory lock so the list we
      // roll back is exactly the list we cancel.
      const pending = await tx.leaveRequest.findMany({
        where: { employeeId, status: 'PENDING' },
        include: { employee: { select: { leaveYearStartMonth: true } } },
      })

      if (pending.length > 0) {
        await tx.leaveRequest.updateMany({
          where: { employeeId, status: 'PENDING' },
          data: { status: 'CANCELLED', decidedBy: user.userId, decidedAt: new Date() },
        })
      }

      return pending
    })

    if (pendingRequests.length > 0) {

      // Decrement pending balance for each cancelled request. Previously
      // failures here were swallowed via `.catch(() => {})`, which meant
      // a terminated employee could keep consuming pending entitlement
      // invisibly if any single balance rollback errored — balances would
      // drift and the remaining-balance / reporting screens would lie.
      // (Codex round 3 #4.)
      //
      // Now we log each failure loudly (Sentry + console) but still
      // continue through the loop so ONE bad request doesn't prevent the
      // other pending requests from being rolled back. The termination
      // itself stays successful because the LeaveRequest status was
      // already flipped to CANCELLED above — the worst case is that an
      // admin has to manually adjust the balance afterwards, which is
      // recoverable. Silent failure is not.
      const { cancelBalance } = await import('../../leave/balance-helpers')
      const { getEmployeeLeaveYearStartMonth } = await import('@/lib/leave-year')
      for (const lr of pendingRequests) {
        const startMonth = getEmployeeLeaveYearStartMonth(lr.employee, tenant)
        try {
          await cancelBalance(
            tenant.id, employeeId, lr.policyId,
            lr.startDate, lr.endDate, startMonth,
            lr.halfDayStart, lr.halfDayEnd, 'PENDING'
          )
        } catch (err) {
          console.error(
            `[terminateEmployee] failed to roll back pending balance for leave ${lr.id} (employee ${employeeId}, tenant ${tenant.id}):`,
            err
          )
          captureServerError(err, {
            where: 'terminate.balance-rollback',
            leaveRequestId: lr.id,
            employeeId,
            tenantId: tenant.id,
          })
        }
      }
    }

    await logAudit({
      action: 'employee.terminated',
      entity: 'Employee',
      entityId: employeeId,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: {
        terminationDate: parsed.terminationDate,
        terminationReason: parsed.terminationReason,
        exitInterview: parsed.exitInterview,
      },
    })

    revalidatePath(`/t/${tenantSlug}/employees/${employeeId}`)
    revalidatePath(`/t/${tenantSlug}/leave`)
    revalidatePath(`/t/${tenantSlug}/dashboard`)

    // Issue #94 — every other employee status mutation (createEmployee,
    // updateEmployee, setEmployeeInactive, CSV import) calls
    // syncSeatCount fire-and-forget. terminateEmployee was the one gap,
    // so tenants were being over-billed on every real termination until
    // someone re-saved the record. Fire-and-forget keeps the termination
    // UX fast; failures are logged but don't roll back the audit row
    // because the seat reconcile is idempotent and the next mutation
    // will catch up.
    fireAndForget(syncSeatCount(tenant.id), 'terminateEmployee.seat-sync')
  })
}

// ── Calculate remaining entitlement ──

export async function calculateRemainingEntitlement(
  tenantSlug: string,
  employeeId: string,
  terminationDateStr: string
) {
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')

  const employee = await prisma.employee.findFirst({
    where: { id: employeeId, tenantId: tenant.id },
    select: { id: true, startDate: true, hoursPerDay: true },
  })
  if (!employee) throw new Error('Employee not found')

  const terminationDate = new Date(terminationDateStr)

  // Get the leave year that contains the termination date
  const leaveYearStartMonth = tenant.leaveYearStartMonth
  const month = terminationDate.getMonth() + 1
  const leaveYear = month >= leaveYearStartMonth
    ? terminationDate.getFullYear()
    : terminationDate.getFullYear() - 1

  // Leave year range
  const yearStart = new Date(leaveYear, leaveYearStartMonth - 1, 1)
  const yearEnd = new Date(leaveYear + 1, leaveYearStartMonth - 1, 0, 23, 59, 59, 999)

  // Calculate months from start of leave year to termination date
  const termMonth = terminationDate.getMonth()
  const termYear = terminationDate.getFullYear()
  const startMonth = yearStart.getMonth()
  const startYr = yearStart.getFullYear()
  let monthsWorked = (termYear - startYr) * 12 + (termMonth - startMonth) + 1
  monthsWorked = Math.max(0, Math.min(12, monthsWorked))

  // Get all leave balances for the employee in this leave year
  const balances = await prisma.leaveBalance.findMany({
    where: {
      employeeId,
      tenantId: tenant.id,
      year: leaveYear,
    },
    include: { policy: true },
  })

  const results = balances.map((b) => {
    const proRataAllowance = Math.round((b.allowance * monthsWorked / 12) * 2) / 2
    const used = b.used + b.pending
    const remaining = Math.max(0, proRataAllowance - used)
    return {
      policyName: b.policy.name,
      fullAllowance: b.allowance,
      proRataAllowance: Math.round(proRataAllowance * 10) / 10,
      used: Math.round(used * 10) / 10,
      remaining: Math.round(remaining * 10) / 10,
      unit: b.policy.unit,
    }
  })

  return {
    leaveYear: `${yearStart.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} - ${yearEnd.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`,
    monthsWorked,
    terminationDate: terminationDateStr,
    entitlements: results,
  }
}
