import { getAllEmployeeBalances } from './actions'
import { PageHeader, EmptyState } from '@/components/shared'
import { BalanceTable } from './balance-table'
import { Users } from 'lucide-react'

export default async function LeaveBalancesPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const { rows, departments, leaveYearLabel } = await getAllEmployeeBalances(tenantSlug)

  return (
    <div>
      <PageHeader
        title="Leave Balances"
        description={`Allowance, used, pending and remaining for ${leaveYearLabel} across every paid leave policy.`}
      />

      {rows.length === 0 ? (
        <EmptyState
          icon={<Users className="h-10 w-10" />}
          title="No balances to show"
          description="There are no active employees with a holiday policy, or you do not have permission to view balances."
        />
      ) : (
        <BalanceTable
          rows={rows}
          departments={departments}
          tenantSlug={tenantSlug}
        />
      )}
    </div>
  )
}
