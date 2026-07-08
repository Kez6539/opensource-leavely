import { SkeletonBlock } from '@/components/shared'

export default function CompanyLeaveLoading() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border shadow-sm p-4">
        <SkeletonBlock lines={5} />
      </div>
    </div>
  )
}
