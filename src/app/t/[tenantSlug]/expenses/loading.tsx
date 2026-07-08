import { PageHeader, SkeletonBlock } from '@/components/shared'

export default function ExpensesLoading() {
  return (
    <div>
      <PageHeader title="Expenses" description="Submit and track expense claims" />
      <div className="rounded-xl border shadow-sm p-4">
        <SkeletonBlock lines={5} />
      </div>
    </div>
  )
}
