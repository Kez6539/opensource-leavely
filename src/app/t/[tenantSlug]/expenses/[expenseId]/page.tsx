import { getExpenseClaim } from '../actions'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/shared/page-header'
import { BackLink } from '@/components/shared/back-link'
import { CardSection } from '@/components/shared/card-section'
import { FieldRow } from '@/components/shared/field-row'
import { StatusBadge } from '@/components/shared/status-badge'
import { ExpenseActions } from '../expense-action-buttons'
import { ReceiptViewer } from '../receipt-viewer'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { prisma } from '@/lib/db'
import { ExternalLink, Paperclip } from 'lucide-react'

const CATEGORY_LABELS: Record<string, string> = {
  TRAVEL: 'Travel',
  MEALS: 'Meals',
  EQUIPMENT: 'Equipment',
  ACCOMMODATION: 'Accommodation',
  TRAINING: 'Training',
  OTHER: 'Other',
}

export default async function ExpenseDetailPage({
  params,
}: {
  params: Promise<{ tenantSlug: string; expenseId: string }>
}) {
  const { tenantSlug, expenseId } = await params
  let claim
  try {
    claim = await getExpenseClaim(tenantSlug, expenseId)
  } catch {
    notFound()
  }

  const { tenant, membership, user } = await requireTenant(tenantSlug)
  const isManagerOrAbove = isAtLeast(membership, 'MANAGER')
  const isAdmin = isAtLeast(membership, 'ADMIN')

  // Determine permissions
  const currentEmp = await prisma.employee.findFirst({
    where: { tenantId: tenant.id, userId: user.userId },
    select: { id: true },
  })
  const isOwner = currentEmp?.id === claim.employeeId
  // Delete only ever applies to PENDING claims — the action rejects
  // approved/rejected/paid ones with "Cannot delete a {status} claim"
  // (see deleteExpenseClaim in actions.ts). The previous expression
  // showed the Delete button to any manager/admin regardless of status,
  // creating a dead-end destructive control on already-decided claims.
  // (Codex round 6 #14.)
  const canDelete = claim.status === 'PENDING' && (isOwner || isManagerOrAbove)

  // Get approver name if approved
  let approverName: string | null = null
  if (claim.approvedById) {
    const approver = await prisma.user.findUnique({
      where: { id: claim.approvedById },
      select: { name: true, email: true },
    })
    approverName = approver?.name || approver?.email || null
  }

  const hasUploadedReceipt = !!claim.receiptData
  const hasReceiptUrl = !!claim.receiptUrl

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/expenses`} label="Expenses" />
      <PageHeader
        title="Expense Claim"
        description={`${claim.employee.firstName} ${claim.employee.lastName}`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardSection title="Details">
          <FieldRow label="Description" value={claim.description} />
          <FieldRow
            label="Amount"
            value={new Intl.NumberFormat('en-GB', {
              style: 'currency',
              currency: claim.currency,
            }).format(Number(claim.amount))}
          />
          <FieldRow label="Category" value={CATEGORY_LABELS[claim.category] ?? claim.category} />
          <FieldRow
            label="Date"
            value={new Date(claim.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          />
          <FieldRow label="Status" value={<StatusBadge status={claim.status} />} />
          {hasUploadedReceipt && (
            <FieldRow
              label="Receipt"
              value={
                <ReceiptViewer
                  expenseId={expenseId}
                  filename={claim.receiptFilename || 'receipt'}
                  mimeType={claim.receiptMimeType || 'application/octet-stream'}
                />
              }
            />
          )}
          {hasReceiptUrl && !hasUploadedReceipt && (
            <FieldRow
              label="Receipt"
              value={
                <a
                  href={claim.receiptUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  View receipt
                  <ExternalLink className="h-3 w-3" />
                </a>
              }
            />
          )}
          {claim.notes && <FieldRow label="Notes" value={claim.notes} />}
          <FieldRow
            label="Submitted"
            value={new Date(claim.createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          />
          {approverName && (
            <FieldRow label="Approved by" value={approverName} />
          )}
          {claim.approvedAt && (
            <FieldRow
              label="Approved on"
              value={new Date(claim.approvedAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            />
          )}
        </CardSection>

        {/* Actions panel */}
        {(claim.status === 'PENDING' || claim.status === 'APPROVED' || canDelete) && (
          <CardSection title="Actions">
            {claim.status === 'PENDING' && isManagerOrAbove && (
              <p className="text-sm text-muted-foreground mb-4">
                Review and approve or reject this expense claim.
              </p>
            )}
            {claim.status === 'APPROVED' && isAdmin && (
              <p className="text-sm text-muted-foreground mb-4">
                This claim has been approved. Mark it as paid once reimbursed.
              </p>
            )}
            {claim.status === 'PENDING' && !isManagerOrAbove && isOwner && (
              <p className="text-sm text-muted-foreground mb-4">
                Your expense claim is awaiting approval. You can delete it while it is pending.
              </p>
            )}
            <ExpenseActions
              tenantSlug={tenantSlug}
              expenseId={expenseId}
              status={claim.status}
              showApproveReject={isManagerOrAbove && claim.status === 'PENDING'}
              showMarkPaid={isAdmin && claim.status === 'APPROVED'}
              showDelete={canDelete}
            />
          </CardSection>
        )}
      </div>
    </div>
  )
}
