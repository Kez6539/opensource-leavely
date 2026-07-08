import { getCourses } from './actions'
import { PageHeader } from '@/components/shared'
import { GraduationCap, Clock, BookOpen, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LearningFilters } from './learning-filters'

const CATEGORY_STYLES: Record<string, { label: string; className: string }> = {
  compliance: { label: 'Compliance', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  wellbeing: { label: 'Wellbeing', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  skills: { label: 'Skills', className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  onboarding: { label: 'Onboarding', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
}

export default async function LearningPage({
  params,
  searchParams,
}: {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ category?: string }>
}) {
  const { tenantSlug } = await params
  const { category } = await searchParams
  const courses = await getCourses(tenantSlug)

  const filtered = category && category !== 'all'
    ? courses.filter((c) => c.category === category)
    : courses

  const completedCount = courses.filter((c) => c.enrollment?.completedAt).length
  const totalCount = courses.length

  return (
    <div>
      <PageHeader
        title="Learning"
        description="Develop your skills and stay compliant with our training courses"
        action={
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <span>
              <strong className="text-foreground">{completedCount}</strong> of{' '}
              <strong className="text-foreground">{totalCount}</strong> courses completed
            </span>
          </div>
        }
      />

      <LearningFilters currentCategory={category} tenantSlug={tenantSlug} />

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <GraduationCap className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">No courses found</p>
          <p className="text-sm text-muted-foreground mt-1">Try changing the filter to see more courses.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => {
            const catStyle = CATEGORY_STYLES[course.category] ?? {
              label: course.category,
              className: 'bg-gray-100 text-gray-700',
            }
            const isEnrolled = !!course.enrollment
            const isComplete = !!course.enrollment?.completedAt
            const progressPct =
              course.enrollment
                ? Math.round((course.enrollment.progress / course.enrollment.totalModules) * 100)
                : 0

            return (
              <div
                key={course.id}
                className="group rounded-xl border bg-card shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="p-5 flex-1 flex flex-col">
                  {/* Category badge */}
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className={catStyle.className}>
                      {catStyle.label}
                    </Badge>
                    {isComplete && (
                      <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Completed
                      </span>
                    )}
                  </div>

                  {/* Title and description */}
                  <h3 className="text-base font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                    {course.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {course.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {course.moduleCount} modules
                    </span>
                  </div>

                  {/* Progress bar (if enrolled) */}
                  {isEnrolled && !isComplete && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                        <span>Progress</span>
                        <span>{progressPct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-300"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action button */}
                  <Link href={`/t/${tenantSlug}/learning/${course.id}`}>
                    <Button
                      variant={isComplete ? 'outline' : 'default'}
                      className="w-full"
                      size="sm"
                    >
                      {isComplete
                        ? 'Review course'
                        : isEnrolled
                          ? 'Continue'
                          : 'Start course'}
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
