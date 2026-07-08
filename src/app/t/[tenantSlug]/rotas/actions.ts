'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

// --------------- Schemas ---------------

// (#193) Reject reversed date ranges at the schema layer.
const CreateRotaSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required').max(150),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
  })
  .refine((d) => new Date(d.endDate) >= new Date(d.startDate), {
    message: 'End date must be on or after start date',
    path: ['endDate'],
  })

const UpdateRotaSchema = z
  .object({
    name: z.string().trim().min(1).max(150).optional(),
    startDate: z.string().min(1).optional(),
    endDate: z.string().min(1).optional(),
  })
  .refine(
    (d) => !d.startDate || !d.endDate || new Date(d.endDate) >= new Date(d.startDate),
    { message: 'End date must be on or after start date', path: ['endDate'] },
  )

const AddRotaEntrySchema = z.object({
  rotaId: z.string().min(1),
  employeeId: z.string().min(1),
  date: z.string().min(1),
  shiftTemplateId: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  notes: z.string().optional(),
})

const CreateShiftTemplateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  color: z.string().default('#6366f1'),
})

export type CreateRotaData = z.infer<typeof CreateRotaSchema>
export type AddRotaEntryData = z.infer<typeof AddRotaEntrySchema>
export type CreateShiftTemplateData = z.infer<typeof CreateShiftTemplateSchema>

// --------------- Queries ---------------

export async function getRotas(
  tenantSlug: string,
  filters: { status?: string } = {}
) {
  const { tenant } = await requireTenant(tenantSlug)

  const where: Record<string, unknown> = { tenantId: tenant.id }
  if (filters.status && filters.status !== 'ALL') {
    where.status = filters.status
  }

  return prisma.rota.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    include: {
      _count: { select: { entries: true } },
    },
    orderBy: { startDate: 'desc' },
  })
}

export async function getRota(tenantSlug: string, rotaId: string) {
  const { tenant } = await requireTenant(tenantSlug)

  const rota = await prisma.rota.findFirst({
    where: { id: rotaId, tenantId: tenant.id },
    include: {
      entries: {
        include: {
          employee: { select: { id: true, firstName: true, lastName: true } },
          shiftTemplate: true,
        },
        orderBy: { date: 'asc' },
      },
    },
  })
  if (!rota) throw new Error('Rota not found')
  return rota
}

export async function getShiftTemplates(tenantSlug: string) {
  const { tenant } = await requireTenant(tenantSlug)

  return prisma.shiftTemplate.findMany({
    where: { tenantId: tenant.id },
    orderBy: { name: 'asc' },
  })
}

export async function getActiveEmployees(tenantSlug: string) {
  const { tenant } = await requireTenant(tenantSlug)

  return prisma.employee.findMany({
    where: { tenantId: tenant.id, status: 'ACTIVE' },
    select: { id: true, firstName: true, lastName: true, department: true },
    orderBy: { lastName: 'asc' },
  })
}

// --------------- Mutations ---------------

export async function createRota(
  tenantSlug: string,
  data: CreateRotaData
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const parsed = CreateRotaSchema.parse(data)

  const startDate = new Date(parsed.startDate)
  const endDate = new Date(parsed.endDate)

  if (endDate <= startDate) {
    throw new UserError('End date must be after start date')
  }

  const rota = await prisma.rota.create({
    data: {
      name: parsed.name,
      startDate,
      endDate,
      tenantId: tenant.id,
    },
  })

  await logAudit({
    action: 'rota.created',
    entity: 'Rota',
    entityId: rota.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { name: parsed.name },
  })

  revalidatePath(`/t/${tenantSlug}/rotas`)
    return { id: rota.id }
  })
}

export async function updateRota(
  tenantSlug: string,
  rotaId: string,
  data: z.infer<typeof UpdateRotaSchema>
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const parsed = UpdateRotaSchema.parse(data)

  // Verify rota belongs to tenant
  const existing = await prisma.rota.findFirst({
    where: { id: rotaId, tenantId: tenant.id },
  })
  if (!existing) throw new UserError('Rota not found')

  const updateData: Record<string, unknown> = {}
  if (parsed.name) updateData.name = parsed.name
  if (parsed.startDate) updateData.startDate = new Date(parsed.startDate)
  if (parsed.endDate) updateData.endDate = new Date(parsed.endDate)

  // Validate the resulting date order. The previous implementation only
  // checked when BOTH bounds were submitted together, so editing just
  // startDate (or just endDate) could save a rota whose end is before
  // its start and break the weekly view. Compare against the existing
  // row for whichever bound wasn't submitted in this update. (Codex
  // round 6 #5b.)
  const effectiveStart =
    (updateData.startDate as Date | undefined) ?? existing.startDate
  const effectiveEnd =
    (updateData.endDate as Date | undefined) ?? existing.endDate
  if (effectiveEnd <= effectiveStart) {
    throw new UserError('End date must be after start date')
  }

  const rota = await prisma.rota.update({
    where: { id: rotaId },
    data: updateData,
  })

  await logAudit({
    action: 'rota.updated',
    entity: 'Rota',
    entityId: rota.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: updateData,
  })

  revalidatePath(`/t/${tenantSlug}/rotas/${rotaId}`)
  })
}

export async function publishRota(
  tenantSlug: string,
  rotaId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const existing = await prisma.rota.findFirst({
    where: { id: rotaId, tenantId: tenant.id },
  })
  if (!existing) throw new UserError('Rota not found')
  if (existing.status === 'ARCHIVED') throw new UserError('Cannot publish an archived rota')

  const rota = await prisma.rota.update({
    where: { id: rotaId },
    data: { status: 'PUBLISHED' },
  })

  await logAudit({
    action: 'rota.published',
    entity: 'Rota',
    entityId: rota.id,
    userId: user.userId,
    tenantId: tenant.id,
  })

  revalidatePath(`/t/${tenantSlug}/rotas/${rotaId}`)
  revalidatePath(`/t/${tenantSlug}/rotas`)
  })
}

export async function archiveRota(
  tenantSlug: string,
  rotaId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const existing = await prisma.rota.findFirst({
    where: { id: rotaId, tenantId: tenant.id },
  })
  if (!existing) throw new UserError('Rota not found')

  const rota = await prisma.rota.update({
    where: { id: rotaId },
    data: { status: 'ARCHIVED' },
  })

  await logAudit({
    action: 'rota.archived',
    entity: 'Rota',
    entityId: rota.id,
    userId: user.userId,
    tenantId: tenant.id,
  })

  revalidatePath(`/t/${tenantSlug}/rotas/${rotaId}`)
  revalidatePath(`/t/${tenantSlug}/rotas`)
  })
}

export async function addRotaEntry(
  tenantSlug: string,
  data: AddRotaEntryData
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const parsed = AddRotaEntrySchema.parse(data)

  // Verify rota belongs to tenant
  const rota = await prisma.rota.findFirst({
    where: { id: parsed.rotaId, tenantId: tenant.id },
  })
  if (!rota) throw new UserError('Rota not found')

  // Verify employee belongs to tenant
  const employee = await prisma.employee.findFirst({
    where: { id: parsed.employeeId, tenantId: tenant.id },
  })
  if (!employee) throw new UserError('Employee not found')

  // If shiftTemplateId provided, verify it belongs to tenant
  if (parsed.shiftTemplateId) {
    const template = await prisma.shiftTemplate.findFirst({
      where: { id: parsed.shiftTemplateId, tenantId: tenant.id },
    })
    if (!template) throw new UserError('Shift template not found')
  }

  // Validate that the entry date sits within the rota's own start/end
  // window — without this guard managers can add shifts that fall
  // outside the week the rota represents and break the weekly view.
  // (Round 6 #5.)
  const entryDate = new Date(parsed.date)
  if (entryDate < rota.startDate || entryDate > rota.endDate) {
    throw new UserError(
      `This date is outside the rota's range (${rota.startDate.toLocaleDateString('en-GB')}–${rota.endDate.toLocaleDateString('en-GB')}). Pick a date in range.`,
    )
  }

  const dayStart = new Date(entryDate)
  dayStart.setHours(0, 0, 0, 0)
  const dayEnd = new Date(entryDate)
  dayEnd.setHours(23, 59, 59, 999)

  // Check for existing shift on this date IN THE SAME ROTA. Cross-rota
  // clashes are intentionally allowed because tenants may legitimately
  // run parallel rotas for different roles/locations or split AM/PM
  // coverage into separate schedules. The previous round-6 fix blocked
  // ALL cross-rota same-day entries tenant-wide, which Codex's
  // regression review flagged as too broad. (Codex regression #3.)
  const existingShift = await prisma.rotaEntry.findFirst({
    where: {
      rotaId: parsed.rotaId,
      employeeId: parsed.employeeId,
      date: { gte: dayStart, lte: dayEnd },
    },
  })
  if (existingShift) {
    throw new UserError(
      'This employee already has a shift on this date in this rota. Remove the existing shift first.',
    )
  }

  const entry = await prisma.rotaEntry.create({
    data: {
      rotaId: parsed.rotaId,
      employeeId: parsed.employeeId,
      date: new Date(parsed.date),
      shiftTemplateId: parsed.shiftTemplateId || null,
      startTime: parsed.startTime || null,
      endTime: parsed.endTime || null,
      notes: parsed.notes || null,
    },
  })

  await logAudit({
    action: 'rota_entry.created',
    entity: 'RotaEntry',
    entityId: entry.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: {
      rotaId: parsed.rotaId,
      employeeId: parsed.employeeId,
      date: parsed.date,
    },
  })

  revalidatePath(`/t/${tenantSlug}/rotas/${parsed.rotaId}`)
    return { id: entry.id }
  })
}

export async function removeRotaEntry(
  tenantSlug: string,
  entryId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  // Verify entry belongs to a rota in this tenant
  const entry = await prisma.rotaEntry.findFirst({
    where: { id: entryId },
    include: { rota: { select: { tenantId: true, id: true } } },
  })
  if (!entry || entry.rota.tenantId !== tenant.id) {
    throw new UserError('Entry not found')
  }

  await prisma.rotaEntry.delete({ where: { id: entryId } })

  await logAudit({
    action: 'rota_entry.deleted',
    entity: 'RotaEntry',
    entityId: entryId,
    userId: user.userId,
    tenantId: tenant.id,
  })

  revalidatePath(`/t/${tenantSlug}/rotas/${entry.rota.id}`)
  })
}

export async function createShiftTemplate(
  tenantSlug: string,
  data: CreateShiftTemplateData
): Promise<ActionResult<{ id: string }>> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const parsed = CreateShiftTemplateSchema.parse(data)

  const template = await prisma.shiftTemplate.create({
    data: {
      name: parsed.name,
      startTime: parsed.startTime,
      endTime: parsed.endTime,
      color: parsed.color,
      tenantId: tenant.id,
    },
  })

  await logAudit({
    action: 'shift_template.created',
    entity: 'ShiftTemplate',
    entityId: template.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { name: parsed.name },
  })

  revalidatePath(`/t/${tenantSlug}/rotas`)
    return { id: template.id }
  })
}

export async function deleteShiftTemplate(
  tenantSlug: string,
  templateId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const template = await prisma.shiftTemplate.findFirst({
    where: { id: templateId, tenantId: tenant.id },
  })
  if (!template) throw new UserError('Shift template not found')

  await prisma.shiftTemplate.delete({ where: { id: templateId } })

  await logAudit({
    action: 'shift_template.deleted',
    entity: 'ShiftTemplate',
    entityId: templateId,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { name: template.name },
  })

  revalidatePath(`/t/${tenantSlug}/rotas`)
  })
}

export async function checkShiftConflicts(
  tenantSlug: string,
  rotaId: string,
  employeeId: string,
  date: string
) {
  const { tenant } = await requireTenant(tenantSlug)

  const dateObj = new Date(date)
  const startOfDay = new Date(dateObj)
  startOfDay.setHours(0, 0, 0, 0)
  const endOfDay = new Date(dateObj)
  endOfDay.setHours(23, 59, 59, 999)

  // Check for existing shift on this date in this rota
  const existingShift = await prisma.rotaEntry.findFirst({
    where: {
      rotaId,
      employeeId,
      date: { gte: startOfDay, lte: endOfDay },
    },
    include: {
      shiftTemplate: { select: { name: true } },
    },
  })

  // Check for approved leave on this date
  const approvedLeave = await prisma.leaveRequest.findFirst({
    where: {
      employeeId,
      tenantId: tenant.id,
      status: 'APPROVED',
      startDate: { lte: endOfDay },
      endDate: { gte: startOfDay },
    },
    include: {
      policy: { select: { name: true } },
    },
  })

  return {
    hasExistingShift: !!existingShift,
    existingShiftName: existingShift?.shiftTemplate?.name || 'Custom shift',
    hasApprovedLeave: !!approvedLeave,
    leaveType: approvedLeave?.policy?.name || null,
  }
}

export async function copyWeekShifts(
  tenantSlug: string,
  rotaId: string,
  sourceWeekStart: string,
  targetWeekStart: string
): Promise<ActionResult<{ entriesCopied: number }>> {
  return withUserErrors(async () => {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')
  await requireWriteAccess(tenant.id)

  const rota = await prisma.rota.findFirst({
    where: { id: rotaId, tenantId: tenant.id },
  })
  if (!rota) throw new UserError('Rota not found')

  const sourceStart = new Date(sourceWeekStart)
  sourceStart.setHours(0, 0, 0, 0)
  const sourceEnd = new Date(sourceStart)
  sourceEnd.setDate(sourceEnd.getDate() + 6)
  sourceEnd.setHours(23, 59, 59, 999)

  const targetStart = new Date(targetWeekStart)
  targetStart.setHours(0, 0, 0, 0)

  // Get all entries from the source week
  const sourceEntries = await prisma.rotaEntry.findMany({
    where: {
      rotaId,
      date: { gte: sourceStart, lte: sourceEnd },
    },
  })

  if (sourceEntries.length === 0) {
    throw new UserError('No shifts found in the source week to copy')
  }

  // Calculate the day offset from source to target
  const dayOffset = Math.round(
    (targetStart.getTime() - sourceStart.getTime()) / (1000 * 60 * 60 * 24)
  )

  // Create new entries for the target week
  const newEntries = sourceEntries.map((entry) => {
    const newDate = new Date(entry.date)
    newDate.setDate(newDate.getDate() + dayOffset)
    return {
      rotaId,
      employeeId: entry.employeeId,
      shiftTemplateId: entry.shiftTemplateId,
      date: newDate,
      startTime: entry.startTime,
      endTime: entry.endTime,
      notes: entry.notes,
    }
  })

  // Pre-fetch existing entries in the target week range so the copy
  // skips any (employeeId, date) pair that's already filled. The
  // previous blind createMany duplicated shifts when the target week
  // had pre-existing entries — inflating hours totals on the rota
  // summary view. (Round 6 #3.)
  const targetEnd = new Date(targetStart)
  targetEnd.setDate(targetEnd.getDate() + 6)
  targetEnd.setHours(23, 59, 59, 999)
  const existingTarget = await prisma.rotaEntry.findMany({
    where: {
      rotaId,
      date: { gte: targetStart, lte: targetEnd },
    },
    select: { employeeId: true, date: true },
  })
  const filledKeys = new Set(
    existingTarget.map((e) => `${e.employeeId}:${e.date.toISOString().slice(0, 10)}`),
  )
  const dedupedNewEntries = newEntries.filter(
    (e) => !filledKeys.has(`${e.employeeId}:${e.date.toISOString().slice(0, 10)}`),
  )

  if (dedupedNewEntries.length === 0) {
    throw new UserError('Target week already has shifts for every source row — nothing to copy.')
  }

  await prisma.rotaEntry.createMany({ data: dedupedNewEntries })

  await logAudit({
    action: 'rota.week_copied',
    entity: 'Rota',
    entityId: rotaId,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: {
      sourceWeekStart,
      targetWeekStart,
      entriesCopied: dedupedNewEntries.length,
      entriesSkipped: newEntries.length - dedupedNewEntries.length,
    },
  })

  revalidatePath(`/t/${tenantSlug}/rotas/${rotaId}`)
    return { entriesCopied: dedupedNewEntries.length }
  })
}

export async function getLeaveConflicts(
  tenantSlug: string,
  employeeIds: string[],
  startDate: string,
  endDate: string
) {
  const { tenant } = await requireTenant(tenantSlug)

  const start = new Date(startDate)
  start.setHours(0, 0, 0, 0)
  const end = new Date(endDate)
  end.setHours(23, 59, 59, 999)

  const approvedLeave = await prisma.leaveRequest.findMany({
    where: {
      tenantId: tenant.id,
      employeeId: { in: employeeIds },
      status: 'APPROVED',
      startDate: { lte: end },
      endDate: { gte: start },
    },
    select: {
      employeeId: true,
      startDate: true,
      endDate: true,
      policy: { select: { name: true } },
    },
  })

  // Build a map: employeeId -> Set of date keys that have leave
  const leaveMap: Record<string, Record<string, string>> = {}
  for (const leave of approvedLeave) {
    if (!leaveMap[leave.employeeId]) {
      leaveMap[leave.employeeId] = {}
    }
    const current = new Date(leave.startDate)
    const leaveEnd = new Date(leave.endDate)
    while (current <= leaveEnd) {
      const dk = current.toISOString().split('T')[0]
      leaveMap[leave.employeeId][dk] = leave.policy.name
      current.setDate(current.getDate() + 1)
    }
  }

  return leaveMap
}

export async function exportRotaReport(tenantSlug: string, rotaId: string) {
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'MANAGER')

  const rota = await prisma.rota.findFirst({
    where: { id: rotaId, tenantId: tenant.id },
    include: {
      entries: {
        include: {
          employee: { select: { firstName: true, lastName: true } },
          shiftTemplate: { select: { name: true, startTime: true, endTime: true } },
        },
        orderBy: [{ date: 'asc' }, { employee: { lastName: 'asc' } }],
      },
    },
  })

  if (!rota) throw new Error('Rota not found')

  // Build CSV
  const rows = [
    ['Employee', 'Date', 'Shift', 'Start', 'End', 'Notes'],
  ]

  for (const entry of rota.entries) {
    const shiftName = entry.shiftTemplate?.name ?? 'Custom'
    // Fall back to the shift template's start/end times when the entry
    // doesn't have its own times set. The previous version emitted blank
    // Start/End columns for every template-based shift, so the exported
    // CSV was useless for payroll on rotas built from templates.
    // (Codex round 6 #5c.)
    const start = entry.startTime ?? entry.shiftTemplate?.startTime ?? ''
    const end = entry.endTime ?? entry.shiftTemplate?.endTime ?? ''
    rows.push([
      `${entry.employee.firstName} ${entry.employee.lastName}`,
      new Date(entry.date).toLocaleDateString('en-GB'),
      shiftName,
      start,
      end,
      entry.notes ?? '',
    ])
  }

  const csv = rows
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
    .join('\n')

  return csv
}
