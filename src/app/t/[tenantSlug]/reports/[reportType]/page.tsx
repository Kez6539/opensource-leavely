import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { redirect, notFound } from 'next/navigation'
import { PageHeader, EmptyState } from '@/components/shared'
import { BackLink } from '@/components/shared'
import { ReportFilters } from '../_components/report-filters'
import { ReportTable } from '../_components/report-table'
import { ExportButton } from '../_components/export-button'
import { generateReport, getEmployeesForFilter } from '../actions'
import { Badge } from '@/components/ui/badge'
import { ConversionPrompt } from '@/components/shared/conversion-prompt'
import { prisma } from '@/lib/db'
import {
  CalendarX,
  CalendarCheck,
  User,
  Users,
  Clock,
  Award,
  Timer,
  PoundSterling,
  Thermometer,
  TrendingDown,
  MapPin,
  CalendarClock,
  Receipt,
  FileWarning,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const REPORT_META: Record<
  string,
  { title: string; description: string; icon: LucideIcon; showEmployeeFilter: boolean }
> = {
  absence: {
    title: 'Absence Report',
    description: 'Breakdown of absences per employee',
    icon: CalendarX,
    showEmployeeFilter: true,
  },
  'annual-leave-summary': {
    title: 'Annual Leave Summary',
    description: 'Leave taken, pending and remaining per employee',
    icon: CalendarCheck,
    showEmployeeFilter: true,
  },
  'employee-details': {
    title: 'Employee Details',
    description: 'Complete information for a specific employee',
    icon: User,
    showEmployeeFilter: true,
  },
  'employee-information': {
    title: 'Employee Information',
    description: 'Personal and contract information for all employees',
    icon: Users,
    showEmployeeFilter: true,
  },
  lateness: {
    title: 'Lateness Report',
    description: 'Lateness tracking over a period',
    icon: Clock,
    showEmployeeFilter: true,
  },
  'length-of-service': {
    title: 'Length of Service',
    description: 'Tenure calculation for each employee',
    icon: Award,
    showEmployeeFilter: true,
  },
  overtime: {
    title: 'Overtime Report',
    description: 'TOIL and overtime requests',
    icon: Timer,
    showEmployeeFilter: true,
  },
  'payroll-exceptions': {
    title: 'Payroll Exceptions',
    description: 'Absence records relevant to payroll',
    icon: PoundSterling,
    showEmployeeFilter: true,
  },
  sickness: {
    title: 'Sickness Report',
    description: 'Sick days, occurrences, Bradford Factor per employee',
    icon: Thermometer,
    showEmployeeFilter: true,
  },
  'turnover-retention': {
    title: 'Turnover & Retention',
    description: 'Headcount, turnover rate and department breakdown',
    icon: TrendingDown,
    showEmployeeFilter: false,
  },
  'working-status': {
    title: 'Working Status',
    description: 'Current working status for all employees',
    icon: MapPin,
    showEmployeeFilter: true,
  },
  rota: {
    title: 'Rota Report',
    description: 'Scheduled hours per employee over a date range',
    icon: CalendarClock,
    showEmployeeFilter: true,
  },
  expenses: {
    title: 'Expenses Report',
    description: 'Expense claims over a period per employee',
    icon: Receipt,
    showEmployeeFilter: true,
  },
  'document-expiry': {
    title: 'Document Expiry',
    description: 'Employees with probation end dates and contract flags',
    icon: FileWarning,
    showEmployeeFilter: true,
  },
}

export default async function ReportTypePage({
  params,
  searchParams,
}: {
  params: Promise<{ tenantSlug: string; reportType: string }>
  searchParams: Promise<{ startDate?: string; endDate?: string; employeeId?: string }>
}) {
  const { tenantSlug, reportType } = await params
  const filters = await searchParams
  const { tenant, membership } = await requireTenant(tenantSlug)

  if (!isAtLeast(membership, 'MANAGER')) {
    redirect(`/t/${tenantSlug}/forbidden`)
  }

  const meta = REPORT_META[reportType]
  if (!meta) notFound()

  const Icon = meta.icon
  const hasFilters = !!(filters.startDate || filters.endDate || filters.employeeId)

  // Only run the report if user has applied filters (or for reports that don't need dates)
  const dateIndependentReports = ['employee-details', 'employee-information', 'length-of-service', 'working-status', 'document-expiry']
  const shouldAutoRun = dateIndependentReports.includes(reportType) || hasFilters

  const [employees, reportData] = await Promise.all([
    getEmployeesForFilter(tenantSlug),
    shouldAutoRun
      ? generateReport(tenantSlug, reportType, filters)
      : Promise.resolve(null),
  ])
  const billing = await prisma.tenantBilling.findUnique({
    where: { tenantId: tenant.id },
    select: { status: true },
  })
  const showReportConversionPrompt = billing?.status === 'TRIALING' && !!reportData

  return (
    <div>
      <ConversionPrompt
        tenantSlug={tenantSlug}
        moment="first-report-view"
        enabled={showReportConversionPrompt}
        autoOpen
      />

      <BackLink href={`/t/${tenantSlug}/reports`} label="Back to Reports" />

      <PageHeader
        title={meta.title}
        description={meta.description}
        action={
          <div className="flex items-center gap-3">
            {reportData && reportData.rows.length > 0 && (
              <ExportButton
                tenantSlug={tenantSlug}
                reportType={reportType}
                filters={filters}
              />
            )}
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
          </div>
        }
      />

      <ReportFilters
        employees={employees}
        tenantSlug={tenantSlug}
        reportType={reportType}
        showEmployeeFilter={meta.showEmployeeFilter}
      />

      {reportData ? (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="text-xs">
              {reportData.rows.length} {reportData.rows.length === 1 ? 'record' : 'records'}
            </Badge>
            {filters.startDate && (
              <span className="text-xs text-muted-foreground">
                From {new Date(filters.startDate).toLocaleDateString('en-GB')}
              </span>
            )}
            {filters.endDate && (
              <span className="text-xs text-muted-foreground">
                to {new Date(filters.endDate).toLocaleDateString('en-GB')}
              </span>
            )}
          </div>
          <ReportTable
            columns={reportData.columns}
            rows={reportData.rows}
            emptyMessage={`No data found for this ${meta.title.toLowerCase()} report. Try adjusting the date range or filters.`}
          />
        </div>
      ) : (
        // (#205) Use the shared EmptyState component instead of a bespoke
        // centered-card layout.
        <EmptyState
          icon={<Icon className="h-10 w-10" />}
          title="Select a date range to generate this report"
          description="Use the filters above to set a start date, end date and optionally choose a specific employee."
        />
      )}
    </div>
  )
}
