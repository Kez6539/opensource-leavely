import { PageHeader, BackLink, EmptyState } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { CalendarDays, Plus } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { prisma } from '@/lib/db'
import { toLocalDayKey } from '@/lib/business-days'
import { getFormOptions } from '../actions'
import { LeaveRequestForm } from './leave-request-form'

export default async function NewLeaveRequestPage({
  params,
  searchParams,
}: {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ employeeId?: string; type?: string }>
}) {
  const { tenantSlug } = await params
  const { employeeId, type } = await searchParams
  const { membership, tenant } = await requireTenant(tenantSlug)

  // Hard redirect: customers kept hitting /leave/new?type=sickness
  // because the absence-tab link used to point here. Sickness has its
  // own dedicated form. Forward the employeeId so the prefill still
  // works on the destination.
  if (type === 'sickness') {
    const qs = employeeId ? `?employeeId=${employeeId}` : ''
    redirect(`/t/${tenantSlug}/leave/report-sickness${qs}`)
  }

  const options = await getFormOptions(tenantSlug)

  // Auto-select policy by type (e.g. ?type=holiday)
  const defaultPolicyId = type
    ? options.policies.find(p => p.name.toLowerCase().includes(type.toLowerCase()))?.id
    : undefined

  // Empty state: tenants with no bookable leave policies (only system
  // sickness/lateness). Without this, the form rendered an empty
  // dropdown and submission silently failed with "Selected leave
  // policy does not exist". Now we tell admins to create one and link
  // straight to settings.
  if (options.policies.length === 0) {
    const isAdmin = isAtLeast(membership, 'ADMIN')
    return (
      <div>
        <BackLink href={`/t/${tenantSlug}/leave`} label="Leave Requests" />
        <PageHeader title="Book leave" description="Submit a leave request for approval" />
        <EmptyState
          icon={<CalendarDays className="h-10 w-10" />}
          title="No leave policies set up yet"
          description={
            isAdmin
              ? "Create a leave policy (e.g. Annual Holiday) before booking leave. Sickness and lateness already exist as built-in policies."
              : "Your administrator hasn't set up any bookable leave policies yet. Ask them to create one (e.g. Annual Holiday)."
          }
          action={
            isAdmin ? (
              <Link href={`/t/${tenantSlug}/settings/leave-policies`}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create leave policy
                </Button>
              </Link>
            ) : undefined
          }
        />
      </div>
    )
  }

  // Fetch holidays + working patterns once so the form's duration preview
  // matches what the server will compute. Window: 2 years forward from
  // today, matching the schema bound on createLeaveRequest.startDate. We
  // honour `tenant.deductBankHolidays` — when ON, holidays count toward
  // leave (don't subtract them from the preview). (Round 5 follow-up.)
  const previewWindowEnd = new Date()
  previewWindowEnd.setFullYear(previewWindowEnd.getFullYear() + 2)
  const visibleEmployeeIds = options.employees.map((e) => e.id)
  const [holidayRows, patternRows] = await Promise.all([
    tenant.deductBankHolidays
      ? Promise.resolve([] as { date: Date }[])
      : prisma.publicHoliday.findMany({
          where: { tenantId: tenant.id, date: { lte: previewWindowEnd } },
          select: { date: true },
        }),
    visibleEmployeeIds.length > 0
      ? prisma.workingTimePattern.findMany({
          where: { employeeId: { in: visibleEmployeeIds } },
          select: { employeeId: true, dayOfWeek: true, isWorkingDay: true },
        })
      : Promise.resolve([] as { employeeId: string; dayOfWeek: number; isWorkingDay: boolean }[]),
  ])
  const holidayKeys = Array.from(new Set(holidayRows.map((h) => toLocalDayKey(h.date))))
  // Build a map of employeeId → array of working day-of-week numbers (0-6).
  // Empty array (no pattern set) means "use the default Mon-Fri" — the form
  // distinguishes empty from missing so it can fall back without re-querying.
  const workingPatterns: Record<string, number[]> = {}
  for (const p of patternRows) {
    if (!p.isWorkingDay) continue
    const list = workingPatterns[p.employeeId] ?? []
    list.push(p.dayOfWeek)
    workingPatterns[p.employeeId] = list
  }

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/leave`} label="Leave Requests" />
      {/* (#200) Title and description aligned with the unified
          "Book leave" verb used everywhere else in the app. */}
      <PageHeader title="Book leave" description="Submit a leave request for approval" />
      <LeaveRequestForm
        tenantSlug={tenantSlug}
        employees={options.employees}
        policies={options.policies}
        defaultEmployeeId={employeeId}
        defaultPolicyId={defaultPolicyId}
        holidayKeys={holidayKeys}
        workingPatterns={workingPatterns}
      />
    </div>
  )
}
