'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { defaultCourses } from './course-data'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

// ---------------------------------------------------------------------------
// Seed default courses if none exist for the tenant
// ---------------------------------------------------------------------------

// Track which tenants have been seeded this process lifetime
const seededTenants = new Set<string>()

// Intentionally NOT exported. Functions exported from a 'use server'
// file become public Server Actions; making this internal keeps the
// idempotent default-seed callable from getCourses() (server-side
// import below) but invisible to the client. Only used as a getCourses()
// side-effect.
async function seedDefaultCourses(tenantId: string) {
  // Skip DB check if we already seeded this tenant in this process
  if (seededTenants.has(tenantId)) return

  const existing = await prisma.course.count({
    where: { tenantId },
  })
  if (existing > 0) {
    seededTenants.add(tenantId)
    return
  }

  for (const courseData of defaultCourses) {
    await prisma.course.create({
      data: {
        title: courseData.title,
        description: courseData.description,
        category: courseData.category,
        duration: courseData.duration,
        tenantId,
        modules: {
          create: courseData.modules.map((m) => ({
            title: m.title,
            content: m.content,
            sortOrder: m.sortOrder,
          })),
        },
      },
    })
  }
  seededTenants.add(tenantId)
}

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export async function getCourses(tenantSlug: string) {
  const { tenant, user } = await requireTenant(tenantSlug)

  // Seed courses on first access
  await seedDefaultCourses(tenant.id)

  const courses = await prisma.course.findMany({
    where: { tenantId: tenant.id, isActive: true },
    include: {
      modules: { select: { id: true }, orderBy: { sortOrder: 'asc' } },
      enrollments: {
        where: { userId: user.userId, tenantId: tenant.id },
        take: 1,
      },
    },
    orderBy: { createdAt: 'asc' },
  })

  return courses.map((course) => {
    const enrollment = course.enrollments[0] ?? null
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      category: course.category,
      duration: course.duration,
      moduleCount: course.modules.length,
      enrollment: enrollment
        ? {
            id: enrollment.id,
            progress: enrollment.progress,
            totalModules: enrollment.totalModules,
            completedAt: enrollment.completedAt,
            lastModuleId: enrollment.lastModuleId,
          }
        : null,
    }
  })
}

export async function getCourseDetail(tenantSlug: string, courseId: string) {
  const { tenant, user } = await requireTenant(tenantSlug)

  const course = await prisma.course.findFirst({
    where: { id: courseId, tenantId: tenant.id, isActive: true },
    include: {
      modules: { orderBy: { sortOrder: 'asc' } },
      enrollments: {
        where: { userId: user.userId, tenantId: tenant.id },
        take: 1,
      },
    },
  })

  if (!course) throw new Error('Course not found')

  const enrollment = course.enrollments[0] ?? null

  return {
    id: course.id,
    title: course.title,
    description: course.description,
    category: course.category,
    duration: course.duration,
    modules: course.modules.map((m) => ({
      id: m.id,
      title: m.title,
      content: m.content,
      sortOrder: m.sortOrder,
    })),
    enrollment: enrollment
      ? {
          id: enrollment.id,
          progress: enrollment.progress,
          totalModules: enrollment.totalModules,
          completedAt: enrollment.completedAt,
          lastModuleId: enrollment.lastModuleId,
        }
      : null,
    userName: user.name,
  }
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

export async function enrollInCourse(
  tenantSlug: string,
  courseId: string
): Promise<ActionResult<{ enrollmentId: string }>> {
  return withUserErrors(async () => {
    const { tenant, user } = await requireTenant(tenantSlug)
    await requireWriteAccess(tenant.id)

    const course = await prisma.course.findFirst({
      where: { id: courseId, tenantId: tenant.id, isActive: true },
      include: { modules: { select: { id: true } } },
    })
    if (!course) throw new UserError('Course not found')

    // Check if already enrolled
    const existing = await prisma.courseEnrollment.findUnique({
      where: {
        courseId_userId_tenantId: {
          courseId,
          userId: user.userId,
          tenantId: tenant.id,
        },
      },
    })
    if (existing) return { enrollmentId: existing.id }

    const firstModule = course.modules[0]

    const enrollment = await prisma.courseEnrollment.create({
      data: {
        courseId,
        userId: user.userId,
        tenantId: tenant.id,
        totalModules: course.modules.length,
        progress: 0,
        lastModuleId: firstModule?.id ?? null,
      },
    })

    await logAudit({
      action: 'course.enrolled',
      entity: 'CourseEnrollment',
      entityId: enrollment.id,
      userId: user.userId,
      tenantId: tenant.id,
      metadata: { courseId, courseTitle: course.title },
    })

    revalidatePath(`/t/${tenantSlug}/learning`)
    revalidatePath(`/t/${tenantSlug}/learning/${courseId}`)
    return { enrollmentId: enrollment.id }
  })
}

export async function completeModule(
  tenantSlug: string,
  courseId: string,
  moduleId: string
): Promise<ActionResult<{ isComplete: boolean }>> {
  return withUserErrors(async () => {
    const { tenant, user } = await requireTenant(tenantSlug)
    await requireWriteAccess(tenant.id)

    const course = await prisma.course.findFirst({
      where: { id: courseId, tenantId: tenant.id, isActive: true },
      include: { modules: { orderBy: { sortOrder: 'asc' } } },
    })
    if (!course) throw new UserError('Course not found')

    // Find the module index
    const moduleIndex = course.modules.findIndex((m) => m.id === moduleId)
    if (moduleIndex === -1) throw new UserError('Module not found')

    // Get or create enrollment
    let enrollment = await prisma.courseEnrollment.findUnique({
      where: {
        courseId_userId_tenantId: {
          courseId,
          userId: user.userId,
          tenantId: tenant.id,
        },
      },
    })

    if (!enrollment) {
      enrollment = await prisma.courseEnrollment.create({
        data: {
          courseId,
          userId: user.userId,
          tenantId: tenant.id,
          totalModules: course.modules.length,
          progress: 0,
          lastModuleId: moduleId,
        },
      })
    }

    // The new progress is the module index + 1 (if greater than current progress)
    const newProgress = Math.max(enrollment.progress, moduleIndex + 1)
    const isComplete = newProgress >= course.modules.length

    // Determine next module for lastModuleId
    const nextModule = course.modules[moduleIndex + 1]

    await prisma.courseEnrollment.update({
      where: { id: enrollment.id },
      data: {
        progress: newProgress,
        lastModuleId: nextModule?.id ?? moduleId,
        completedAt: isComplete && !enrollment.completedAt ? new Date() : enrollment.completedAt,
      },
    })

    if (isComplete) {
      await logAudit({
        action: 'course.completed',
        entity: 'CourseEnrollment',
        entityId: enrollment.id,
        userId: user.userId,
        tenantId: tenant.id,
        metadata: { courseId, courseTitle: course.title },
      })
    }

    revalidatePath(`/t/${tenantSlug}/learning`)
    revalidatePath(`/t/${tenantSlug}/learning/${courseId}`)
    return { isComplete }
  })
}
