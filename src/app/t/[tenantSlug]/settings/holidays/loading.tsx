import { SkeletonBlock } from '@/components/shared'

export default function HolidaysLoading() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border shadow-sm p-4">
        <SkeletonBlock lines={8} />
      </div>
    </div>
  )
}
