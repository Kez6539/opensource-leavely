import { PageHeader, SkeletonBlock } from '@/components/shared'

export default function DocumentsLoading() {
  return (
    <div>
      <PageHeader title="Documents" description="Manage your documents" />
      <div className="rounded-xl border shadow-sm p-4">
        <SkeletonBlock lines={5} />
      </div>
    </div>
  )
}
