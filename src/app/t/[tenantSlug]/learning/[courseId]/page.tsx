import { getCourseDetail } from '../actions'
import { BackLink } from '@/components/shared'
import { CourseViewer } from './course-viewer'

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ tenantSlug: string; courseId: string }>
}) {
  const { tenantSlug, courseId } = await params
  const course = await getCourseDetail(tenantSlug, courseId)

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/learning`} label="Back to courses" />
      <CourseViewer course={course} tenantSlug={tenantSlug} />
    </div>
  )
}
