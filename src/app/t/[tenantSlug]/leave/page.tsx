import { getLeaveRequests } from './actions'
import { formatLocalDayGB } from '@/lib/business-days'
import { PageHeader, StatusBadge, EmptyState } from '@/components/shared'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, CalendarDays, FileWarning, FileCheck, Thermometer } from 'lucide-react'
import { LeaveFilters } from './leave-filters'
import { ExportLeaveButton } from './export-button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

function formatDays(days: number): string {
  if (days === 0) return '-'
  const rounded = Number.isInteger(days) ? days.toString() : days.toFixed(1)
  return `${rounded} ${days === 1 ? 'day' : 'days'}`
}

export default async function LeavePage({
  params,
  searchParams,
}: {
  params: Promise<{ tenantSlug: string }>
  searchParams: Promise<{ status?: string }>
}) {
  const { tenantSlug } = await params
  const { status } = await searchParams
  const requests = await getLeaveRequests(tenantSlug, { status })

  return (
    <div data-tour="leave-requests">
      <PageHeader
        title="Leave Requests"
        description="Manage time-off requests"
        action={
          <div className="flex flex-wrap gap-2">
            <ExportLeaveButton tenantSlug={tenantSlug} />
            <Link href={`/t/${tenantSlug}/leave/calendar`}>
              <Button variant="outline">
                <CalendarDays className="mr-2 h-4 w-4" />
                Calendar
              </Button>
            </Link>
            <Link href={`/t/${tenantSlug}/leave/report-sickness`}>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Thermometer className="mr-2 h-4 w-4" />
                Report sickness
              </Button>
            </Link>
            <Link href={`/t/${tenantSlug}/leave/new`}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {/* (#200) Unified verb. */}
                Book leave
              </Button>
            </Link>
          </div>
        }
      />

      <LeaveFilters currentStatus={status} tenantSlug={tenantSlug} />

      {requests.length === 0 ? (
        <EmptyState
          icon={<CalendarDays className="h-10 w-10" />}
          title="No leave requests"
          description={status ? 'Try changing the filter.' : 'No leave requests have been submitted yet.'}
          action={!status ? (
            <Link href={`/t/${tenantSlug}/leave/new`}>
              <Button size="lg">Submit a leave request</Button>
            </Link>
          ) : undefined}
        />
      ) : (() => {
        // Group requests into actionable buckets so the list isn't one
        // long undifferentiated wall. A busy tenant can hit the 200-row
        // cap in `getLeaveRequests`, and managers only need pending +
        // current/upcoming at a glance. When a status filter is set we
        // respect that and render one flat section (no grouping).
        type R = (typeof requests)[number]
        const todayMidnight = new Date()
        todayMidnight.setHours(0, 0, 0, 0)
        const pending: R[] = []
        const currentAndUpcoming: R[] = []
        const past: R[] = []
        for (const r of requests) {
          if (r.status === 'PENDING') {
            pending.push(r)
          } else if (r.status === 'APPROVED' && new Date(r.endDate) >= todayMidnight) {
            currentAndUpcoming.push(r)
          } else {
            past.push(r)
          }
        }
        // Pending and current lists read best oldest-first (nearest
        // action/date first). Past stays newest-first (the server query
        // default) so the most recent history is at the top.
        pending.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        currentAndUpcoming.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

        type Group = { key: string; title: string; rows: R[]; defaultOpen: boolean; tone?: 'pending' | 'normal' }
        const groups: Group[] = status
          ? [{ key: 'filtered', title: `Showing ${requests.length}`, rows: requests, defaultOpen: true, tone: 'normal' }]
          : [
              { key: 'pending', title: 'Awaiting approval', rows: pending, defaultOpen: true, tone: 'pending' },
              { key: 'current', title: 'Current & upcoming', rows: currentAndUpcoming, defaultOpen: true, tone: 'normal' },
              { key: 'past', title: 'Past', rows: past, defaultOpen: false, tone: 'normal' },
            ]

        const renderMobileCard = (r: R) => {
          // Canonical count computed server-side in getLeaveRequests —
          // same maths as the balance deduction (holidays + pattern).
          const days = r.daysCount
          return (
            <Link
              key={r.id}
              href={`/t/${tenantSlug}/leave/${r.id}`}
              className="block rounded-lg border bg-card p-4 shadow-sm hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">
                    {r.employee.firstName} {r.employee.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{r.policy.name}</p>
                </div>
                <StatusBadge status={r.status} />
              </div>
              <div className="text-xs text-muted-foreground">
                {formatLocalDayGB(new Date(r.startDate))}
                {r.halfDayStart && <span className="opacity-70"> (half day)</span>}
                {' – '}
                {formatLocalDayGB(new Date(r.endDate))}
                {r.halfDayEnd && <span className="opacity-70"> (half day)</span>}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-medium tabular-nums">{formatDays(days)}</span>
                <div className="flex items-center gap-1">
                  {r.fitNoteRequired && !r.fitNoteUrl && (
                    <>
                      <FileWarning className="h-4 w-4 text-red-500" role="img" aria-label="Fit note outstanding" />
                      <span className="sr-only">Fit note outstanding</span>
                    </>
                  )}
                  {r.fitNoteRequired && r.fitNoteUrl && (
                    <>
                      <FileCheck className="h-4 w-4 text-emerald-500" role="img" aria-label="Fit note provided" />
                      <span className="sr-only">Fit note provided</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          )
        }

        const renderDesktopTable = (rows: R[]) => (
          <div className="rounded-lg border shadow-sm overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Policy</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead className="text-right">Days</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-10">Fit Note</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => {
                  const days = r.daysCount
                  return (
                    <TableRow key={r.id} className="hover:bg-accent/50 transition-colors">
                      <TableCell className="font-medium">
                        {r.employee.firstName} {r.employee.lastName}
                      </TableCell>
                      <TableCell>{r.policy.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {formatLocalDayGB(new Date(r.startDate))}
                        {r.halfDayStart && <span className="text-xs text-muted-foreground/70"> (half day)</span>}
                        {' – '}
                        {formatLocalDayGB(new Date(r.endDate))}
                        {r.halfDayEnd && <span className="text-xs text-muted-foreground/70"> (half day)</span>}
                      </TableCell>
                      <TableCell className="text-right tabular-nums text-sm">
                        {formatDays(days)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={r.status} />
                      </TableCell>
                      <TableCell>
                        {r.fitNoteRequired && !r.fitNoteUrl && (
                          <>
                            <FileWarning className="h-4 w-4 text-red-500" role="img" aria-label="Fit note outstanding" />
                            <span className="sr-only">Fit note outstanding</span>
                          </>
                        )}
                        {r.fitNoteRequired && r.fitNoteUrl && (
                          <>
                            <FileCheck className="h-4 w-4 text-emerald-500" role="img" aria-label="Fit note provided" />
                            <span className="sr-only">Fit note provided</span>
                          </>
                        )}
                      </TableCell>
                      <TableCell>
                        <Link href={`/t/${tenantSlug}/leave/${r.id}`}>
                          <Button variant="ghost" size="sm">View</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )

        return (
          <div className="space-y-5">
            {groups.map((g) => {
              if (g.rows.length === 0) return null
              if (status) {
                return (
                  <div key={g.key}>
                    <p className="text-xs text-muted-foreground mb-2">
                      Showing {g.rows.length} {g.rows.length === 1 ? 'request' : 'requests'}
                    </p>
                    <div className="md:hidden space-y-3">{g.rows.map(renderMobileCard)}</div>
                    <div className="hidden md:block">{renderDesktopTable(g.rows)}</div>
                  </div>
                )
              }
              return (
                <details key={g.key} open={g.defaultOpen} className="group" data-tour={g.key === 'pending' ? 'approve-leave' : undefined}>
                  <summary className="cursor-pointer select-none mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    <span>{g.title}</span>
                    <span
                      className={
                        g.tone === 'pending'
                          ? 'rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 px-2 py-0.5 text-[11px] font-semibold normal-case tracking-normal'
                          : 'rounded-full bg-muted text-muted-foreground px-2 py-0.5 text-[11px] font-semibold normal-case tracking-normal'
                      }
                    >
                      {g.rows.length}
                    </span>
                  </summary>
                  <div className="md:hidden space-y-3">{g.rows.map(renderMobileCard)}</div>
                  <div className="hidden md:block">{renderDesktopTable(g.rows)}</div>
                </details>
              )
            })}
          </div>
        )
      })()}
    </div>
  )
}
