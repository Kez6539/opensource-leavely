import { requireTenant } from '@/lib/tenant'
import { isAtLeast } from '@/lib/rbac'
import { redirect } from 'next/navigation'
import { PageHeader } from '@/components/shared'
import { ReportCard } from './_components/report-card'
import {
  BarChart3,
  CalendarX,
  CalendarCheck,
  User,
  Users,
  Clock,
  Award,
  Timer,
  PoundSterling,
  Info,
  Thermometer,
  TrendingDown,
  MapPin,
  CalendarClock,
  Receipt,
  FileWarning,
} from 'lucide-react'

const REPORTS = [
  {
    slug: 'absence',
    title: 'Absence',
    description: 'Detailed breakdown of absences per employee over a given period.',
    icon: CalendarX,
  },
  {
    slug: 'annual-leave-summary',
    title: 'Annual leave summary',
    description: 'Leave taken, pending and remaining for each employee this year.',
    icon: CalendarCheck,
  },
  {
    slug: 'employee-details',
    title: 'Employee details',
    description: 'Full details for a specific employee including role, department and manager.',
    icon: User,
  },
  {
    slug: 'employee-information',
    title: 'Employee information',
    description: 'Personal and contract information for all employees.',
    icon: Users,
  },
  {
    slug: 'lateness',
    title: 'Lateness',
    description: 'Track lateness records across employees over a selected period.',
    icon: Clock,
  },
  {
    slug: 'length-of-service',
    title: 'Length of service',
    description: 'Calculate tenure for each employee from their start date to today.',
    icon: Award,
  },
  {
    slug: 'overtime',
    title: 'Overtime',
    description: 'TOIL and overtime requests logged by employees over a period.',
    icon: Timer,
  },
  {
    slug: 'payroll-exceptions',
    title: 'Payroll exceptions',
    description: 'Sickness and other absence records that may affect payroll.',
    icon: PoundSterling,
  },
  {
    slug: 'sickness',
    title: 'Sickness',
    description: 'Total sick days, occurrences, Bradford Factor and longest absence per employee.',
    icon: Thermometer,
  },
  {
    slug: 'turnover-retention',
    title: 'Turnover & Retention',
    description: 'Headcount changes, turnover rate, average service length and department breakdown.',
    icon: TrendingDown,
  },
  {
    slug: 'working-status',
    title: 'Working status',
    description: 'Current working status for all employees: who is in the office, WFH, away or on leave today.',
    icon: MapPin,
  },
  {
    slug: 'rota',
    title: 'Rota',
    description: 'Scheduled hours per employee over a date range with shift counts and average hours per day.',
    icon: CalendarClock,
  },
  {
    slug: 'expenses',
    title: 'Expenses',
    description: 'Expense claims over a period: total claimed, approved and paid per employee with category breakdown.',
    icon: Receipt,
  },
  {
    slug: 'document-expiry',
    title: 'Document expiry',
    description: 'Employees with probation end dates and fixed-term contracts that may need attention.',
    icon: FileWarning,
  },
] as const

export default async function ReportsPage({
  params,
}: {
  params: Promise<{ tenantSlug: string }>
}) {
  const { tenantSlug } = await params
  const { membership } = await requireTenant(tenantSlug)

  if (!isAtLeast(membership, 'MANAGER')) {
    redirect(`/t/${tenantSlug}/forbidden`)
  }

  return (
    <div>
      <PageHeader
        title="Reports"
        description="Generate and export HR reports"
        action={
          <div className="flex items-center gap-2 text-muted-foreground" data-tour="reports-header">
            <BarChart3 className="h-5 w-5" />
          </div>
        }
      />

      {/* Beta info banner */}
      <div className="mb-8 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
        <Info className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
            Custom reports (beta)
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
            Generate reports across your organisation with date range and employee filters. Export any report to CSV for payroll, compliance or record keeping.
          </p>
        </div>
      </div>

      {/* Report cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-tour="reports-grid">
        {REPORTS.map((report) => (
          <ReportCard
            key={report.slug}
            icon={report.icon}
            title={report.title}
            description={report.description}
            href={`/t/${tenantSlug}/reports/${report.slug}`}
          />
        ))}
      </div>
    </div>
  )
}
