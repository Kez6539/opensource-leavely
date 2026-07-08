import { getToilAccruals, getAllToilBalances, getMyToilBalance } from './actions'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { PageHeader, StatusBadge, EmptyState, CardSection } from '@/components/shared'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Clock } from 'lucide-react'
import { ToilFilters } from './toil-filters'
import { ToilApproveButton, ToilRejectButton } from './toil-actions-buttons'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default async function ToilPage({
  params,
  searchParams,
}: {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ status?: string }>
}) {
  const { tenantSlug } = await params
  const { status } = await searchParams
  const { membership } = await requireTenant(tenantSlug)
  const canManage = isAtLeast(membership, 'MANAGER')
  const canApprove = canManage

  // Employees see their own TOIL accruals + balance only; managers see the team view.
  // Calling getAllToilBalances with an EMPLOYEE role throws, so we branch here.
  const accruals = await getToilAccruals(tenantSlug, { status })
  const balances = canManage ? await getAllToilBalances(tenantSlug) : []
  const myBalance = canManage ? null : await getMyToilBalance(tenantSlug)

  return (
    <div>
      <PageHeader
        title="TOIL (Time Off In Lieu)"
        description={
          canManage
            ? 'Track overtime hours and TOIL balances'
            : 'Your overtime hours and TOIL balance'
        }
        action={
          canManage ? (
            <Link href={`/t/${tenantSlug}/toil/new`}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Log overtime
              </Button>
            </Link>
          ) : undefined
        }
      />

      {/* Personal TOIL balance for employees */}
      {!canManage && myBalance && (
        <CardSection title="My TOIL Balance" className="mb-6">
          <div className="flex items-center justify-between rounded-md border p-4">
            <div>
              <p className="text-sm font-medium">{myBalance.employeeName}</p>
              <p className="text-xs text-muted-foreground">
                {myBalance.accrued}h accrued &middot; {myBalance.used}h used
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{myBalance.remaining}h</p>
              <p className="text-xs text-muted-foreground">remaining</p>
            </div>
          </div>
        </CardSection>
      )}

      {/* TOIL Balances summary */}
      {balances.length > 0 && (
        <CardSection title="TOIL Balances" className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {balances.map((b) => (
              <div key={b.employeeId} className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <p className="text-sm font-medium">{b.employeeName}</p>
                  <p className="text-xs text-muted-foreground">
                    {b.accrued}h accrued &middot; {b.used}h used
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{b.remaining}h</p>
                  <p className="text-xs text-muted-foreground">remaining</p>
                </div>
              </div>
            ))}
          </div>
        </CardSection>
      )}

      {/* Filters */}
      <ToilFilters currentStatus={status} tenantSlug={tenantSlug} />

      {/* Accruals table */}
      {accruals.length === 0 ? (
        <EmptyState
          icon={<Clock className="h-10 w-10" />}
          title={status ? 'No TOIL records match this filter' : 'No overtime logged yet'}
          description={
            status
              ? 'Try changing the filter or clearing it to see all records.'
              : 'Managers can log overtime for team members from here. Each entry adds to the employee\'s TOIL balance, which they can later book as time off in lieu.'
          }
          action={(!status && canManage) ? (
            <Link href={`/t/${tenantSlug}/toil/new`}>
              <Button size="lg">Log overtime</Button>
            </Link>
          ) : undefined}
        />
      ) : (
        <div className="rounded-lg border shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
                {canApprove && <TableHead className="w-20">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {accruals.map((a) => (
                <TableRow key={a.id} className="hover:bg-accent/50 transition-colors">
                  <TableCell className="font-medium">
                    {a.employee.firstName} {a.employee.lastName}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(a.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>{a.hours}h</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                    {a.reason || '\u2014'}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={a.status} />
                  </TableCell>
                  {canApprove && (
                    <TableCell>
                      {a.status === 'PENDING' && (
                        <div className="flex gap-1">
                          <ToilApproveButton tenantSlug={tenantSlug} accrualId={a.id} />
                          <ToilRejectButton tenantSlug={tenantSlug} accrualId={a.id} />
                        </div>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
