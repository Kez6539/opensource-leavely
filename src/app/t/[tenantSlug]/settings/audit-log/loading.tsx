import { PageHeader, SkeletonBlock } from '@/components/shared'

export default function AuditLogLoading() {
  return (
    <div className="space-y-6">
      <PageHeader title="Audit Log" description="Loading..." />
      <div className="rounded-lg border p-4">
        <SkeletonBlock lines={10} />
      </div>
    </div>
  )
}
