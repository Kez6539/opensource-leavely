import { prisma } from '@/lib/db'

interface AuditParams {
  action: string
  entity?: string
  entityId?: string
  metadata?: Record<string, unknown>
  userId?: string
  tenantId: string
}

export async function logAudit(params: AuditParams) {
  return prisma.auditLog.create({
    data: {
      action: params.action,
      entity: params.entity,
      entityId: params.entityId,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      metadata: params.metadata ? (params.metadata as any) : undefined,
      userId: params.userId,
      tenantId: params.tenantId,
    },
  })
}
