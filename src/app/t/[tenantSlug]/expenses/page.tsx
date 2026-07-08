import { getExpenseClaims, getExpenseStats } from './actions'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { PageHeader, StatusBadge, EmptyState } from '@/components/shared'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Receipt } from 'lucide-react'
import { ExpenseFilters } from './expense-filters'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const CATEGORY_LABELS: Record<string, string> = {
  TRAVEL: 'Travel',
  MEALS: 'Meals',
  EQUIPMENT: 'Equipment',
  ACCOMMODATION: 'Accommodation',
  TRAINING: 'Training',
  OTHER: 'Other',
}

export default async function ExpensesPage({
  params,
  searchParams,
}: {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ status?: string; view?: string }>
}) {
  const { tenantSlug } = await params
  const { status, view } = await searchParams
  const { membership } = await requireTenant(tenantSlug)
  const canApprove = isAtLeast(membership, 'MANAGER')
  const isAdmin = isAtLeast(membership, 'ADMIN')

  const effectiveView = view ?? 'my'

  const [claims, stats] = await Promise.all([
    getExpenseClaims(tenantSlug, { status, view: effectiveView }),
    canApprove ? getExpenseStats(tenantSlug) : null,
  ])

  return (
    <div>
      <PageHeader
        title="Expenses"
        description="Submit and track expense claims"
        action={
          <Link href={`/t/${tenantSlug}/expenses/new`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New claim
            </Button>
          </Link>
        }
      />

      {/* Stats cards for managers */}
      {stats && canApprove && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <p className="text-xs text-muted-foreground font-medium">Pending Approval</p>
            <p className="text-2xl font-bold mt-1">{stats.pendingCount}</p>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <p className="text-xs text-muted-foreground font-medium">Approved (Unpaid)</p>
            <p className="text-2xl font-bold mt-1">{stats.approvedCount}</p>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <p className="text-xs text-muted-foreground font-medium">Total Paid</p>
            <p className="text-2xl font-bold mt-1">
              {new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(
                parseFloat(stats.totalPaid)
              )}
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <ExpenseFilters
        currentStatus={status}
        currentView={effectiveView}
        tenantSlug={tenantSlug}
        canApprove={canApprove}
      />

      {/* Expense claims table */}
      {claims.length === 0 ? (
        <EmptyState
          icon={<Receipt className="h-10 w-10" />}
          title={status ? 'No expense claims match this filter' : 'No expense claims yet'}
          description={
            status
              ? 'Try changing the filter or clearing it to see all claims.'
              : 'Submit your first expense claim — receipts can be uploaded as PDF or image and approved by your manager.'
          }
          action={
            !status ? (
              <Link href={`/t/${tenantSlug}/expenses/new`}>
                <Button size="lg">Submit an expense</Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="rounded-lg border shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {(effectiveView === 'all' && canApprove) && <TableHead>Employee</TableHead>}
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map((claim) => (
                <TableRow key={claim.id} className="hover:bg-accent/50 transition-colors">
                  {(effectiveView === 'all' && canApprove) && (
                    <TableCell className="font-medium">
                      {claim.employee.firstName} {claim.employee.lastName}
                    </TableCell>
                  )}
                  <TableCell className="font-medium max-w-[250px] truncate">
                    {claim.description}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {CATEGORY_LABELS[claim.category] ?? claim.category}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(claim.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {new Intl.NumberFormat('en-GB', {
                      style: 'currency',
                      currency: claim.currency,
                    }).format(Number(claim.amount))}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={claim.status} />
                  </TableCell>
                  <TableCell>
                    <Link href={`/t/${tenantSlug}/expenses/${claim.id}`}>
                      <Button variant="ghost" size="sm">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
