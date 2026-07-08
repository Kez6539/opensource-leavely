import { PageHeader, BackLink } from '@/components/shared'
import { getLeaveCalendarData } from '../actions'
import { LeaveCalendar } from './leave-calendar'

export default async function LeaveCalendarPage({
  params,
  searchParams,
}: {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ year?: string; month?: string }>
}) {
  const { tenantSlug } = await params
  const sp = await searchParams
  const now = new Date()
  const parsedYear = sp.year ? parseInt(sp.year, 10) : NaN
  const parsedMonth = sp.month ? parseInt(sp.month, 10) : NaN
  const year = !isNaN(parsedYear) && parsedYear > 2000 && parsedYear < 2100 ? parsedYear : now.getFullYear()
  const month = !isNaN(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12 ? parsedMonth : now.getMonth() + 1

  const data = await getLeaveCalendarData(tenantSlug, year, month)

  return (
    <div>
      <BackLink href={`/t/${tenantSlug}/leave`} label="Leave Requests" />
      <PageHeader title="Leave Calendar" description="Monthly overview of approved absences" />
      <LeaveCalendar data={data.leaveRequests} companyLeaves={data.companyLeaves} publicHolidays={data.publicHolidays} year={year} month={month} tenantSlug={tenantSlug} />
    </div>
  )
}
