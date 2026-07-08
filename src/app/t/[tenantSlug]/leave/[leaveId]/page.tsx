import { getLeaveRequest, getConvertibleLeavePolicies } from '../actions'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/shared/page-header'
import { BackLink } from '@/components/shared/back-link'
import { CardSection } from '@/components/shared/card-section'
import { FieldRow } from '@/components/shared/field-row'
import { StatusBadge } from '@/components/shared/status-badge'
import { LeaveActions } from './leave-actions'
import { EditDatesDialog } from './edit-dates-dialog'
import { ConvertSicknessDialog } from './convert-sickness-dialog'
import { FitNoteForm } from './fit-note-form'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { prisma } from '@/lib/db'
import { countBusinessDays, toLocalDayKey } from '@/lib/business-days'
import { FileWarning, FileCheck, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'
import Link from 'next/link'

export default async function LeaveDetailPage({
  params,
}: {
  params: Promise<{ tenantSlug: string; leaveId: string }>
}) {
  const { tenantSlug, leaveId } = await params
  let leaveRequest
  try {
    leaveRequest = await getLeaveRequest(tenantSlug, leaveId)
  } catch {
    notFound()
  }

  const { tenant, membership, user } = await requireTenant(tenantSlug)
  const isManagerOrAbove = isAtLeast(membership, 'MANAGER')

  // Non-managers can only view their own leave requests
  if (!isManagerOrAbove) {
    const currentEmp = await prisma.employee.findFirst({
      where: { tenantId: tenant.id, userId: user.userId },
      select: { id: true },
    })
    if (!currentEmp || currentEmp.id !== leaveRequest.employeeId) {
      notFound()
    }
  }

  // Determine if current user can cancel this request
  let canCancel = false
  if (leaveRequest.status === 'PENDING' || leaveRequest.status === 'APPROVED') {
    if (isManagerOrAbove) {
      canCancel = true
    } else {
      const currentEmp = await prisma.employee.findFirst({
        where: { tenantId: tenant.id, userId: user.userId },
      })
      if (currentEmp && currentEmp.id === leaveRequest.employeeId) {
        // If preventLeaveCancellation is on, employees can't cancel approved leave
        if (tenant.preventLeaveCancellation && leaveRequest.status === 'APPROVED') {
          canCancel = false
        } else {
          canCancel = true
        }
      }
    }
  }

  // Duration must mirror calculateLeaveDays (balance-helpers) exactly so
  // the number shown here equals what was deducted from the balance:
  //   1) Holiday exclusion is GATED on tenant.deductBankHolidays — when
  //      the tenant counts bank holidays as leave days, the balance
  //      deducts them, so the duration must include them too. The
  //      previous unconditional exclusion under-counted for those
  //      tenants.
  //   2) The employee's working pattern is passed through — a part-timer
  //      booking Mon–Fri costs (and must display) only their pattern
  //      days, not 5.
  let holidaySet = new Set<string>()
  if (!tenant.deductBankHolidays) {
    const publicHolidays = await prisma.publicHoliday.findMany({
      where: {
        tenantId: tenant.id,
        date: { gte: leaveRequest.startDate, lte: leaveRequest.endDate },
      },
    })
    holidaySet = new Set(publicHolidays.map((h) => toLocalDayKey(h.date)))
  }
  const workingPattern = await prisma.workingTimePattern.findMany({
    where: { employeeId: leaveRequest.employeeId },
    select: { dayOfWeek: true, isWorkingDay: true },
  })
  const workingDays =
    workingPattern.length > 0
      ? new Set(workingPattern.filter((p) => p.isWorkingDay).map((p) => p.dayOfWeek))
      : undefined
  const days = countBusinessDays(
    leaveRequest.startDate,
    leaveRequest.endDate,
    holidaySet,
    leaveRequest.halfDayStart,
    leaveRequest.halfDayEnd,
    workingDays
  )
  // Hours-aware duration display. Hours-based policies show "16 hours"
  // not "2 days" because the underlying balance is debited in hours and
  // the existing FieldRow used to lie. Defaults to 7.5 if the employee
  // has no hoursPerDay set, matching the rest of the codebase.
  const isHoursPolicy = leaveRequest.policy.unit === 'hours'
  const hoursPerDay = (leaveRequest.employee as { hoursPerDay?: number | null }).hoursPerDay ?? 7.5
  const durationLabel = isHoursPolicy
    ? `${Number((days * hoursPerDay).toFixed(1))} hour${days * hoursPerDay !== 1 ? 's' : ''}`
    : `${days} day${days !== 1 ? 's' : ''}`

  // (#196) Determine leave type from the structural isSystemType flag,
  // not by guessing from the policy name (which a tenant can rename).
  const isLatenessRecord = leaveRequest.policy.isSystemType === 'lateness'

  // Fetch RTW data for sick leave
  const isSickLeave = leaveRequest.policy.isSystemType === 'sickness'
  // List of non-system policies a manager can convert this sickness into.
  // Loaded only when needed (manager + active sickness) so we don't fetch
  // it for every leave detail view.
  let convertiblePolicies: { id: string; name: string; unit: string }[] = []
  if (isSickLeave && leaveRequest.status === 'APPROVED' && isManagerOrAbove) {
    convertiblePolicies = await getConvertibleLeavePolicies(tenantSlug)
  }
  let rtwData: { completedAt: Date | null; notes: string | null; conductedByName: string | null } | null = null
  if (isSickLeave && leaveRequest.status === 'APPROVED') {
    const rtw = await prisma.returnToWork.findUnique({
      where: { leaveRequestId: leaveRequest.id },
    })
    if (rtw) {
      let conductedByName: string | null = null
      if (rtw.conductedById) {
        const conductor = await prisma.user.findUnique({
          where: { id: rtw.conductedById },
          select: { name: true, email: true },
        })
        conductedByName = conductor?.name || conductor?.email || null
      }
      rtwData = { completedAt: rtw.completedAt, notes: rtw.notes, conductedByName }
    }
  }
  const shouldShowApprovalConversionPrompt = isManagerOrAbove
    && leaveRequest.status === 'PENDING'
    && (await prisma.tenantBilling.findUnique({
      where: { tenantId: tenant.id },
      select: { status: true },
    }))?.status === 'TRIALING'

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/leave`} label="Leave Requests" />
      <PageHeader
        title={isLatenessRecord ? 'Lateness Record' : 'Leave Request'}
        description={`${leaveRequest.employee.firstName} ${leaveRequest.employee.lastName}`}
      />

      {/* Fit note banner for sick leave > 7 days */}
      {leaveRequest.fitNoteRequired && (
        <div className={`rounded-lg border p-4 mb-4 flex items-start gap-3 ${
          leaveRequest.fitNoteUrl
            ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800'
            : 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800'
        }`}>
          {leaveRequest.fitNoteUrl ? (
            <>
              <FileCheck className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">Fit note link</p>
                <a
                  href={leaveRequest.fitNoteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-emerald-600 hover:underline dark:text-emerald-400 break-all"
                >
                  {leaveRequest.fitNoteUrl}
                </a>
              </div>
            </>
          ) : (
            <>
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  Fit note required &mdash; this absence exceeds 7 days
                </p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                  Fit note outstanding. Paste a link (e.g. Google Drive, Dropbox, OneDrive) to the fit note document.
                </p>
                {(isManagerOrAbove || canCancel) && (
                  <FitNoteForm tenantSlug={tenantSlug} leaveId={leaveId} />
                )}
              </div>
            </>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardSection title="Summary">
          <FieldRow label="Employee" value={`${leaveRequest.employee.firstName} ${leaveRequest.employee.lastName}`} />
          <FieldRow label="Policy" value={leaveRequest.policy.name} />
          <FieldRow label="Start Date" value={`${new Date(leaveRequest.startDate).toLocaleDateString('en-GB')}${leaveRequest.halfDayStart ? ' (half day)' : ''}`} />
          <FieldRow label="End Date" value={`${new Date(leaveRequest.endDate).toLocaleDateString('en-GB')}${leaveRequest.halfDayEnd ? ' (half day)' : ''}`} />
          {isLatenessRecord && leaveRequest.latenessDuration ? (
            <FieldRow label="Lateness Duration" value={leaveRequest.latenessDuration} />
          ) : (
            <FieldRow label="Duration" value={durationLabel} />
          )}
          <FieldRow label="Reason" value={leaveRequest.reason || '—'} />
          <FieldRow label="Status" value={<StatusBadge status={leaveRequest.status} />} />
          {leaveRequest.status === 'REJECTED' && leaveRequest.declineReason && (
            <FieldRow label="Decline Reason" value={leaveRequest.declineReason} />
          )}
          {leaveRequest.decidedAt && (
            <FieldRow label="Decided" value={new Date(leaveRequest.decidedAt).toLocaleDateString('en-GB')} />
          )}
        </CardSection>

        {(leaveRequest.status === 'PENDING' || canCancel) && (
          <CardSection title="Actions">
            {leaveRequest.status === 'PENDING' && isManagerOrAbove && (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Approve or reject this leave request.
                </p>
                <div className="mb-3">
                  <EditDatesDialog
                    tenantSlug={tenantSlug}
                    leaveId={leaveId}
                    currentStartDate={leaveRequest.startDate.toISOString()}
                    currentEndDate={leaveRequest.endDate.toISOString()}
                  />
                </div>
                <LeaveActions
                  tenantSlug={tenantSlug}
                  leaveId={leaveId}
                  showApproveReject
                  showCancel={canCancel}
                  conversionPromptEnabled={shouldShowApprovalConversionPrompt}
                />
              </>
            )}
            {leaveRequest.status === 'PENDING' && !isManagerOrAbove && canCancel && (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  You can cancel this pending request.
                </p>
                <LeaveActions
                  tenantSlug={tenantSlug}
                  leaveId={leaveId}
                  showApproveReject={false}
                  showCancel
                />
              </>
            )}
            {leaveRequest.status === 'APPROVED' && canCancel && (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  {isManagerOrAbove
                    ? 'Edit, extend, or cancel this approved leave request.'
                    : 'Cancel this approved leave request. The balance will be restored.'}
                </p>
                {isManagerOrAbove && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    <EditDatesDialog
                      tenantSlug={tenantSlug}
                      leaveId={leaveId}
                      currentStartDate={leaveRequest.startDate.toISOString()}
                      currentEndDate={leaveRequest.endDate.toISOString()}
                    />
                    {isSickLeave && convertiblePolicies.length > 0 && (
                      <ConvertSicknessDialog
                        tenantSlug={tenantSlug}
                        leaveId={leaveId}
                        employeeName={`${leaveRequest.employee.firstName} ${leaveRequest.employee.lastName}`}
                        policies={convertiblePolicies}
                      />
                    )}
                  </div>
                )}
                {/*
                  Extend used to be gated on `isSickLeave` (a substring of
                  `policy.isSystemType === 'sickness'`). That hid the button
                  entirely for any tenant whose sickness policy predated the
                  isSystemType column or hadn't been auto-tagged yet — the
                  symptom Keiron hit was "I know Chris is off sick tomorrow
                  and it didn't let me extend it". Extend is useful for any
                  approved leave (not just sickness) — the server-side
                  balance gate already prevents over-allocation for non
                  sickness policies (extendLeaveRequest checks per-leave-year
                  balance for !isSickPolicy), so the UX limit was a foot-gun
                  with no payoff.
                */}
                <LeaveActions
                  tenantSlug={tenantSlug}
                  leaveId={leaveId}
                  showApproveReject={false}
                  showCancel
                  showExtend={isManagerOrAbove}
                  currentEndDate={leaveRequest.endDate.toISOString()}
                />
              </>
            )}
          </CardSection>
        )}
      </div>

      {/* Return to Work section for sick leave */}
      {isSickLeave && leaveRequest.status === 'APPROVED' && (
        <div className="mt-4">
          <CardSection title="Return to Work Interview">
            {rtwData?.completedAt ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    RTW completed on {new Date(rtwData.completedAt).toLocaleDateString('en-GB')}
                    {rtwData.conductedByName ? ` by ${rtwData.conductedByName}` : ''}
                  </span>
                </div>
                {rtwData.notes && (
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap ml-7">{rtwData.notes}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-600">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm font-medium">Return to work interview required</span>
                </div>
                {isManagerOrAbove && (
                  <Link
                    href={`/t/${tenantSlug}/leave/${leaveId}/return-to-work`}
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Complete interview
                  </Link>
                )}
              </div>
            )}
          </CardSection>
        </div>
      )}
    </div>
  )
}
