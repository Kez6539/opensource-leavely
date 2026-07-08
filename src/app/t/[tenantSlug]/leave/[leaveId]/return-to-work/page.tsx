import { getReturnToWork } from './actions'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/shared/page-header'
import { BackLink } from '@/components/shared/back-link'
import { CardSection } from '@/components/shared/card-section'
import { FieldRow } from '@/components/shared/field-row'
import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { RTWForm } from './rtw-form'
import { ExtendLeaveForm } from './extend-leave-form'
import { calendarDaysBetween, formatLocalDayGB } from '@/lib/business-days'
import { CheckCircle2, Clock } from 'lucide-react'

export default async function ReturnToWorkPage({
  params,
}: {
  params: Promise<{ tenantSlug: string; leaveId: string }>
}) {
  const { tenantSlug, leaveId } = await params
  const { membership } = await requireTenant(tenantSlug)
  const isManagerOrAbove = isAtLeast(membership, 'MANAGER')

  let data
  try {
    data = await getReturnToWork(tenantSlug, leaveId)
  } catch {
    notFound()
  }

  const { leaveRequest, returnToWork } = data
  const isCompleted = !!returnToWork.completedAt

  // Inclusive calendar days via the DST-safe canonical helper (#197) —
  // raw millisecond division could go off-by-one across a UK DST
  // boundary, and the field is labelled "Calendar days" below so it
  // can't be confused with the working-day Duration on the detail page.
  const days = calendarDaysBetween(
    new Date(leaveRequest.startDate),
    new Date(leaveRequest.endDate)
  )

  return (
    <div>
      <BackLink
        href={`/t/${tenantSlug}/leave/${leaveId}`}
        label="Leave Request"
      />
      <PageHeader
        title="Return to Work Interview"
        description={leaveRequest.employeeName}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardSection title="Absence Details">
          <FieldRow label="Employee" value={leaveRequest.employeeName} />
          <FieldRow label="Policy" value={leaveRequest.policyName} />
          <FieldRow
            label="Start Date"
            value={formatLocalDayGB(new Date(leaveRequest.startDate))}
          />
          <FieldRow
            label="End Date"
            value={formatLocalDayGB(new Date(leaveRequest.endDate))}
          />
          <FieldRow
            label="Calendar days"
            value={`${days} day${days !== 1 ? 's' : ''}`}
          />
          <FieldRow label="Reason" value={leaveRequest.reason || '\u2014'} />
        </CardSection>

        <CardSection title="Interview">
          {isCompleted ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">Completed</span>
              </div>
              <FieldRow
                label="Completed"
                // True timestamp (not a stored day) — render in UK time so
                // a near-midnight completion doesn't show the UTC day.
                value={new Date(returnToWork.completedAt!).toLocaleDateString(
                  'en-GB',
                  { timeZone: 'Europe/London' }
                )}
              />
              {returnToWork.conductedByName && (
                <FieldRow
                  label="Conducted by"
                  value={returnToWork.conductedByName}
                />
              )}
              {returnToWork.notes && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    Notes
                  </p>
                  <p className="text-sm whitespace-pre-wrap">
                    {returnToWork.notes}
                  </p>
                </div>
              )}
            </div>
          ) : isManagerOrAbove ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-600">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-medium">Pending</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Complete the return to work interview with the employee. Record
                any notes from the discussion.
              </p>
              <RTWForm tenantSlug={tenantSlug} leaveId={leaveId} />
            </div>
          ) : (
            <div className="flex items-center gap-2 text-amber-600">
              <Clock className="h-5 w-5" />
              <span className="text-sm">
                Return to work interview is pending. A manager will complete
                this.
              </span>
            </div>
          )}
        </CardSection>
      </div>

      {/* Extend leave section for managers when RTW not yet completed */}
      {isManagerOrAbove && !isCompleted && (
        <div className="mt-4">
          <CardSection title="Still Off Sick?">
            <p className="text-sm text-muted-foreground mb-3">
              If the employee is still unwell, extend the absence end date. The balance will be adjusted automatically.
            </p>
            <ExtendLeaveForm
              tenantSlug={tenantSlug}
              leaveId={leaveId}
              currentEndDate={leaveRequest.endDate}
            />
          </CardSection>
        </div>
      )}
    </div>
  )
}
