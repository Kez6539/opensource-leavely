'use client'

import { useState, useTransition, useRef } from 'react'
import { enrollInCourse, completeModule } from '../actions'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CardSection } from '@/components/shared'
import {
  CheckCircle2,
  Circle,
  ChevronRight,
  Clock,
  BookOpen,
  Award,
  Printer,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModuleData {
  id: string
  title: string
  content: string
  sortOrder: number
}

interface EnrollmentData {
  id: string
  progress: number
  totalModules: number
  completedAt: Date | string | null
  lastModuleId: string | null
}

interface CourseData {
  id: string
  title: string
  description: string
  category: string
  duration: number
  modules: ModuleData[]
  enrollment: EnrollmentData | null
  userName: string | null | undefined
}

const CATEGORY_STYLES: Record<string, { label: string; className: string }> = {
  compliance: { label: 'Compliance', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  wellbeing: { label: 'Wellbeing', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  skills: { label: 'Skills', className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  onboarding: { label: 'Onboarding', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300' },
}

function renderContent(content: string) {
  // Simple markdown-like rendering for bold text and line breaks
  const paragraphs = content.split('\n\n')
  return paragraphs.map((paragraph, pIdx) => {
    const trimmed = paragraph.trim()
    if (!trimmed) return null

    // Handle bullet lists
    const lines = trimmed.split('\n')
    const isList = lines.every((l) => l.trim().startsWith('- '))
    if (isList) {
      return (
        <ul key={pIdx} className="list-disc list-outside ml-5 space-y-1.5 mb-4">
          {lines.map((line, lIdx) => (
            <li key={lIdx} className="text-sm leading-relaxed text-foreground/90">
              {renderInline(line.trim().slice(2))}
            </li>
          ))}
        </ul>
      )
    }

    // Handle numbered lists
    const isNumbered = lines.every((l) => /^\d+\.\s/.test(l.trim()))
    if (isNumbered) {
      return (
        <ol key={pIdx} className="list-decimal list-outside ml-5 space-y-1.5 mb-4">
          {lines.map((line, lIdx) => (
            <li key={lIdx} className="text-sm leading-relaxed text-foreground/90">
              {renderInline(line.trim().replace(/^\d+\.\s/, ''))}
            </li>
          ))}
        </ol>
      )
    }

    // Handle headings (bold lines ending with colon or standalone bold)
    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      return (
        <h3 key={pIdx} className="text-base font-semibold mt-5 mb-2 text-foreground">
          {trimmed.slice(2, -2)}
        </h3>
      )
    }

    // Handle mixed content with bullets in the middle
    const hasBullets = lines.some((l) => l.trim().startsWith('- '))
    if (hasBullets) {
      const groups: { type: 'text' | 'bullet'; lines: string[] }[] = []
      for (const line of lines) {
        const isBullet = line.trim().startsWith('- ')
        const lastGroup = groups[groups.length - 1]
        if (lastGroup && lastGroup.type === (isBullet ? 'bullet' : 'text')) {
          lastGroup.lines.push(line)
        } else {
          groups.push({ type: isBullet ? 'bullet' : 'text', lines: [line] })
        }
      }
      return (
        <div key={pIdx}>
          {groups.map((g, gIdx) => {
            if (g.type === 'bullet') {
              return (
                <ul key={gIdx} className="list-disc list-outside ml-5 space-y-1.5 mb-4">
                  {g.lines.map((line, lIdx) => (
                    <li key={lIdx} className="text-sm leading-relaxed text-foreground/90">
                      {renderInline(line.trim().slice(2))}
                    </li>
                  ))}
                </ul>
              )
            }
            return g.lines.map((line, lIdx) => (
              <p key={`${gIdx}-${lIdx}`} className="text-sm leading-relaxed text-foreground/90 mb-4">
                {renderInline(line)}
              </p>
            ))
          })}
        </div>
      )
    }

    return (
      <p key={pIdx} className="text-sm leading-relaxed text-foreground/90 mb-4">
        {renderInline(trimmed)}
      </p>
    )
  })
}

function renderInline(text: string) {
  // Handle **bold** text
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return part
  })
}

export function CourseViewer({
  course,
  tenantSlug,
}: {
  course: CourseData
  tenantSlug: string
}) {
  const [activeModuleIndex, setActiveModuleIndex] = useState(() => {
    if (course.enrollment?.lastModuleId) {
      const idx = course.modules.findIndex(
        (m) => m.id === course.enrollment!.lastModuleId
      )
      return idx >= 0 ? idx : 0
    }
    return 0
  })
  const [enrollment, setEnrollment] = useState(course.enrollment)
  const [isPending, startTransition] = useTransition()
  const [justCompleted, setJustCompleted] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const certificateRef = useRef<HTMLDivElement>(null)

  const activeModule = course.modules[activeModuleIndex]
  const isEnrolled = !!enrollment
  const isModuleCompleted = (index: number) =>
    enrollment ? index < enrollment.progress : false
  const isCurrentModuleCompleted = isModuleCompleted(activeModuleIndex)
  const isCourseComplete = !!enrollment?.completedAt || justCompleted
  const progressPct = enrollment
    ? Math.round((enrollment.progress / enrollment.totalModules) * 100)
    : 0

  const catStyle = CATEGORY_STYLES[course.category] ?? {
    label: course.category,
    className: 'bg-gray-100 text-gray-700',
  }

  function handleEnroll() {
    startTransition(async () => {
      const result = await enrollInCourse(tenantSlug, course.id)
      if (result.ok) {
        setEnrollment({
          id: result.data.enrollmentId,
          progress: 0,
          totalModules: course.modules.length,
          completedAt: null,
          lastModuleId: course.modules[0]?.id ?? null,
        })
      }
    })
  }

  function handleCompleteModule() {
    if (!activeModule) return
    startTransition(async () => {
      const result = await completeModule(tenantSlug, course.id, activeModule.id)
      if (result.ok) {
        const newProgress = Math.max(
          enrollment?.progress ?? 0,
          activeModuleIndex + 1
        )
        setEnrollment((prev) =>
          prev
            ? {
                ...prev,
                progress: newProgress,
                completedAt: result.data.isComplete ? new Date().toISOString() : null,
                lastModuleId:
                  course.modules[activeModuleIndex + 1]?.id ?? activeModule.id,
              }
            : prev
        )
        if (result.data.isComplete) {
          setJustCompleted(true)
        }
      }
    })
  }

  function handleNextModule() {
    if (activeModuleIndex < course.modules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1)
      setSidebarOpen(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handlePrintCertificate() {
    const printWindow = window.open('', '_blank')
    if (!printWindow || !certificateRef.current) return

    const completionDate = enrollment?.completedAt
      ? new Date(enrollment.completedAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Certificate - ${course.title}</title>
        <style>
          @page { margin: 0; size: landscape; }
          body {
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: white;
            font-family: Georgia, 'Times New Roman', Times, serif;
          }
          .certificate {
            width: 900px;
            padding: 60px;
            border: 3px solid #1e40af;
            outline: 1px solid #1e40af;
            outline-offset: 8px;
            text-align: center;
          }
          .certificate h1 {
            font-size: 14px;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: #6b7280;
            margin: 0 0 10px 0;
          }
          .certificate h2 {
            font-size: 36px;
            color: #1e40af;
            margin: 0 0 30px 0;
            font-weight: normal;
          }
          .certificate .awarded {
            font-size: 14px;
            color: #6b7280;
            margin: 0 0 8px 0;
          }
          .certificate .name {
            font-size: 28px;
            color: #111827;
            margin: 0 0 30px 0;
            border-bottom: 2px solid #1e40af;
            display: inline-block;
            padding: 0 40px 8px;
          }
          .certificate .course-title {
            font-size: 14px;
            color: #6b7280;
            margin: 0 0 8px 0;
          }
          .certificate .course-name {
            font-size: 22px;
            color: #111827;
            margin: 0 0 30px 0;
          }
          .certificate .date {
            font-size: 14px;
            color: #6b7280;
          }
          .certificate .leavely {
            margin-top: 30px;
            font-size: 18px;
            color: #1e40af;
            font-weight: bold;
            letter-spacing: 2px;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <h1>Certificate of Completion</h1>
          <h2>Congratulations</h2>
          <p class="awarded">This certificate is awarded to</p>
          <p class="name">${course.userName ?? 'Employee'}</p>
          <p class="course-title">For successfully completing the course</p>
          <p class="course-name">${course.title}</p>
          <p class="date">Completed on ${completionDate}</p>
          <p class="leavely">Leavely</p>
        </div>
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <div>
      {/* Course header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="secondary" className={catStyle.className}>
            {catStyle.label}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {course.duration} min
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <BookOpen className="h-3.5 w-3.5" />
            {course.modules.length} modules
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
      </div>

      {/* Progress bar */}
      {isEnrolled && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>Overall progress</span>
            <span>
              {enrollment!.progress} of {enrollment!.totalModules} modules{' '}
              {isCourseComplete ? '(Complete)' : ''}
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                isCourseComplete ? 'bg-green-500' : 'bg-primary'
              )}
              style={{ width: `${isCourseComplete ? 100 : progressPct}%` }}
            />
          </div>
        </div>
      )}

      {/* Completion banner */}
      {isCourseComplete && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800 p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="rounded-full bg-green-100 dark:bg-green-900/40 p-2.5">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800 dark:text-green-200">
                  Congratulations!
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  You have completed <strong>{course.title}</strong>
                  {enrollment?.completedAt && (
                    <>
                      {' '}on{' '}
                      {new Date(enrollment.completedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </>
                  )}
                  {course.userName && <>, {course.userName}</>}.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrintCertificate}
              className="shrink-0 border-green-300 text-green-700 hover:bg-green-100 dark:border-green-700 dark:text-green-300 dark:hover:bg-green-900/40"
            >
              <Printer className="h-4 w-4 mr-1.5" />
              Download certificate
            </Button>
          </div>
          {/* Hidden certificate ref for printing */}
          <div ref={certificateRef} className="hidden" />
        </div>
      )}

      {/* Enroll prompt */}
      {!isEnrolled && (
        <CardSection className="mb-6 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Enrol in this course to track your progress and earn a completion certificate.
          </p>
          <Button onClick={handleEnroll} disabled={isPending}>
            {isPending ? 'Enrolling...' : 'Start course'}
          </Button>
        </CardSection>
      )}

      {/* Main content area */}
      {isEnrolled && (
        <div className="flex gap-6 relative">
          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed bottom-4 right-4 z-50 rounded-full bg-primary text-primary-foreground p-3 shadow-lg"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Left sidebar: module list */}
          <div
            className={cn(
              'fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:relative lg:bg-transparent lg:backdrop-blur-none lg:inset-auto lg:z-auto',
              sidebarOpen ? 'block' : 'hidden lg:block'
            )}
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className={cn(
                'absolute left-0 top-0 bottom-0 w-72 bg-card border-r shadow-lg lg:shadow-none lg:relative lg:w-64 lg:shrink-0 lg:border lg:rounded-xl overflow-y-auto'
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-2">
                  Modules
                </h2>
                <div className="flex flex-col gap-0.5">
                  {course.modules.map((mod, index) => {
                    const completed = isModuleCompleted(index)
                    const isActive = index === activeModuleIndex
                    return (
                      <button
                        key={mod.id}
                        onClick={() => {
                          setActiveModuleIndex(index)
                          setSidebarOpen(false)
                        }}
                        className={cn(
                          'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors w-full',
                          isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        {completed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 shrink-0" />
                        )}
                        <span className="line-clamp-2">{mod.title}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Module content */}
          <div className="flex-1 min-w-0">
            <CardSection>
              <h2 className="text-xl font-bold mb-1">{activeModule.title}</h2>
              <p className="text-xs text-muted-foreground mb-6">
                Module {activeModuleIndex + 1} of {course.modules.length}
              </p>

              <div className="prose-sm max-w-none">
                {renderContent(activeModule.content)}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8 pt-6 border-t">
                {!isCurrentModuleCompleted && (
                  <Button
                    onClick={handleCompleteModule}
                    disabled={isPending}
                    className="flex-1 sm:flex-initial"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1.5" />
                    {isPending ? 'Saving...' : 'Mark as complete'}
                  </Button>
                )}
                {activeModuleIndex < course.modules.length - 1 && (
                  <Button
                    variant={isCurrentModuleCompleted ? 'default' : 'outline'}
                    onClick={handleNextModule}
                    className="flex-1 sm:flex-initial"
                  >
                    Next module
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
                {isCurrentModuleCompleted &&
                  activeModuleIndex === course.modules.length - 1 &&
                  !isCourseComplete && (
                    <p className="text-sm text-muted-foreground">
                      Complete all previous modules to finish this course.
                    </p>
                  )}
              </div>
            </CardSection>
          </div>
        </div>
      )}
    </div>
  )
}
