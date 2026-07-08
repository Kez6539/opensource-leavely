'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast, isAtLeast } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

// NOTE: the upload schema (zod, MIME allowlist, 10MB cap) used to live here
// for the metadata-only `uploadDocument` action that has since been disabled
// (see comment in uploadDocument below). When the storage backend is wired,
// reinstate the schema along with the file-bytes field and the actual
// persistence call.

export async function getDocuments(tenantSlug: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = { tenantId: tenant.id }

  // Non-managers can only see their own documents or company-wide ones (no employeeId)
  if (!isAtLeast(membership, 'MANAGER')) {
    const emp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    where.OR = [
      { employeeId: null },
      ...(emp ? [{ employeeId: emp.id }] : []),
    ]
  }

  return prisma.document.findMany({
    where,
    orderBy: [{ category: 'asc' }, { name: 'asc' }],
  })
}

export async function uploadDocument(
  _tenantSlug: string,
  _data: { name: string; category: string; mimeType: string; size: number }
): Promise<ActionResult<{ id: string }>> {
  // Document upload was metadata-only — the action never received the file
  // bytes and the matching download route tried to read from
  // `process.cwd()/uploads`, which doesn't exist on Cloudflare Workers, so
  // the feature has never worked end to end. Rather than leave a foot-gun
  // that creates phantom rows during sales demos, the action is disabled
  // until a real storage backend is wired (R2 + presigned URLs, or
  // base64-in-DB like ExpenseClaim.receiptData). The sidebar entry has been
  // hidden too. Re-enable by accepting a `dataBase64` field, persisting it
  // to a new column on Document, and pointing the download route at the
  // same column.
  return {
    ok: false,
    error:
      'Document storage is not yet available in this build. The feature is being rebuilt — nothing was uploaded.',
  }
}

export async function deleteDocument(
  tenantSlug: string,
  documentId: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
    const { tenant, membership, user } = await requireTenant(tenantSlug)
    assertAtLeast(membership, 'MANAGER')
    await requireWriteAccess(tenant.id)

    const doc = await prisma.document.findFirst({
      where: { id: documentId, tenantId: tenant.id },
    })
    if (!doc) throw new UserError('Document not found')

    await prisma.document.delete({ where: { id: documentId } })

    await logAudit({
      action: 'document.deleted',
      entity: 'Document',
      entityId: documentId,
      userId: user.userId,
      tenantId: tenant.id,
    })

    revalidatePath(`/t/${tenantSlug}/documents`)
  })
}
