'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast } from '@/lib/rbac'

interface AuditFilters {
  action?: string
  entity?: string
  userId?: string
  from?: string
  to?: string
  page?: number
  limit?: number
}

function buildWhere(tenantId: string, filters: AuditFilters) {
  const where: Record<string, unknown> = { tenantId }
  if (filters.action) where.action = { contains: filters.action }
  if (filters.entity) where.entity = filters.entity
  if (filters.userId) where.userId = filters.userId
  if (filters.from || filters.to) {
    const range: Record<string, Date> = {}
    if (filters.from) range.gte = new Date(filters.from)
    if (filters.to) {
      const end = new Date(filters.to)
      end.setHours(23, 59, 59, 999)
      range.lte = end
    }
    where.createdAt = range
  }
  return where
}

export async function getAuditLogs(tenantSlug: string, filters: AuditFilters = {}) {
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')

  const page = filters.page || 1
  const limit = Math.min(filters.limit || 50, 100)
  const skip = (page - 1) * limit

  const where = buildWhere(tenant.id, filters)

  const [logs, total, distinctEntities, distinctActions] = await Promise.all([
    prisma.auditLog.findMany({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      where: where as any,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prisma.auditLog.count({ where: where as any }),
    prisma.auditLog.findMany({
      where: { tenantId: tenant.id, entity: { not: null } },
      distinct: ['entity'],
      select: { entity: true },
      orderBy: { entity: 'asc' },
    }),
    prisma.auditLog.findMany({
      where: { tenantId: tenant.id },
      distinct: ['action'],
      select: { action: true },
      orderBy: { action: 'asc' },
    }),
  ])

  return {
    logs: logs.map((l) => ({
      id: l.id,
      action: l.action,
      entity: l.entity,
      entityId: l.entityId,
      metadata: l.metadata,
      userId: l.userId,
      createdAt: l.createdAt.toISOString(),
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
    entityOptions: distinctEntities.map((e) => e.entity!).filter(Boolean),
    actionOptions: distinctActions.map((a) => a.action),
  }
}

export async function exportAuditLogsCsv(tenantSlug: string, filters: AuditFilters = {}) {
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')

  const where = buildWhere(tenant.id, filters)

  const logs = await prisma.auditLog.findMany({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: where as any,
    orderBy: { createdAt: 'desc' },
    take: 10000,
  })

  const escape = (v: unknown) => {
    if (v === null || v === undefined) return ''
    const s = typeof v === 'string' ? v : JSON.stringify(v)
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`
    return s
  }

  const header = ['Time', 'User ID', 'Action', 'Entity', 'Entity ID', 'Metadata']
  const rows = logs.map((l) => [
    l.createdAt.toISOString(),
    l.userId ?? '',
    l.action,
    l.entity ?? '',
    l.entityId ?? '',
    l.metadata ?? '',
  ])
  return [header, ...rows].map((r) => r.map(escape).join(',')).join('\n')
}
