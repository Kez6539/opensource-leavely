import { PageHeader, BackLink } from '@/components/shared'
import { ExpenseForm } from './expense-form'

export default async function NewExpensePage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/expenses`} label="Expenses" />
      <PageHeader title="New Expense Claim" description="Submit a new expense for reimbursement" />
      <ExpenseForm tenantSlug={tenantSlug} />
    </div>
  )
}
