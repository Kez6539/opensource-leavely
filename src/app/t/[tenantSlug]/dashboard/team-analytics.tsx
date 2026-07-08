'use client'

import { BarChart3, Users, CalendarClock, TrendingDown } from 'lucide-react'
import Link from 'next/link'
import type { TeamAnalyticsData } from './dashboard-actions'

export function TeamAnalytics({
  data,
  tenantSlug,
}: {
  data: TeamAnalyticsData
  tenantSlug: string
}) {
  const maxDeptCount = Math.max(...data.departmentBreakdown.map(d => d.count), 1)
  const maxSickDays = Math.max(...data.topSickness.map(s => s.days), 1)
  const maxAbsenteeDays = Math.max(...data.topAbsentees.map(a => a.days), 1)

  return (
    <div className="mt-8">
      <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-primary" />
        Team Analytics
      </h2>

      {/* Top row: Absence Rate + Headcount + Upcoming Absences */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Absence Rate Card */}
        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="h-4 w-4 text-red-500" />
            <h3 className="text-sm font-semibold">Absence Rate</h3>
          </div>
          <div className="flex items-baseline gap-1.5 mb-1">
            <span className="text-3xl font-bold">{data.absenceRate}%</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {data.absenceDaysThisMonth} days lost of {data.possibleWorkingDaysThisMonth} possible this month
          </p>
          <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${Math.min(data.absenceRate, 100)}%`,
                backgroundColor: data.absenceRate > 5 ? '#ef4444' : data.absenceRate > 3 ? '#f59e0b' : '#10b981',
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-muted-foreground">0%</span>
            <span className="text-[10px] text-muted-foreground">
              {data.absenceRate <= 3 ? 'Healthy' : data.absenceRate <= 5 ? 'Moderate' : 'High'}
            </span>
          </div>
        </div>

        {/* Headcount Card */}
        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-emerald-500" />
            <h3 className="text-sm font-semibold">Headcount</h3>
          </div>
          <div className="flex items-baseline gap-1.5 mb-3">
            <span className="text-3xl font-bold">{data.headcount}</span>
            <span className="text-sm text-muted-foreground">active employees</span>
          </div>
          <div className="space-y-2">
            {data.departmentBreakdown.slice(0, 6).map(dept => (
              <div key={dept.department}>
                <div className="flex items-center justify-between text-xs mb-0.5">
                  <span className="text-muted-foreground truncate max-w-[60%]">{dept.department}</span>
                  <span className="font-medium">{dept.count}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${(dept.count / maxDeptCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            {data.departmentBreakdown.length > 6 && (
              <p className="text-xs text-muted-foreground">
                +{data.departmentBreakdown.length - 6} more departments
              </p>
            )}
          </div>
        </div>

        {/* Upcoming Absences Card */}
        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <CalendarClock className="h-4 w-4 text-blue-500" />
            <h3 className="text-sm font-semibold">Upcoming Absences</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Business days of approved leave starting in&hellip;</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <span className="block text-2xl font-bold">{data.upcomingAbsences.next7.days}</span>
              <span className="text-xs text-muted-foreground">
                7d · {data.upcomingAbsences.next7.count} {data.upcomingAbsences.next7.count === 1 ? 'req' : 'reqs'}
              </span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold">{data.upcomingAbsences.next14.days}</span>
              <span className="text-xs text-muted-foreground">
                14d · {data.upcomingAbsences.next14.count} {data.upcomingAbsences.next14.count === 1 ? 'req' : 'reqs'}
              </span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-bold">{data.upcomingAbsences.next30.days}</span>
              <span className="text-xs text-muted-foreground">
                30d · {data.upcomingAbsences.next30.count} {data.upcomingAbsences.next30.count === 1 ? 'req' : 'reqs'}
              </span>
            </div>
          </div>
          <Link
            href={`/t/${tenantSlug}/leave/calendar`}
            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline mt-4"
          >
            View calendar
          </Link>
        </div>
      </div>

      {/* Bottom row: Top Sickness + Top Absentees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Top Sickness Card */}
        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-4">Top Sickness</h3>
          <p className="text-xs text-muted-foreground mb-3">Most sick days this year</p>
          {data.topSickness.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">No sickness recorded this year</p>
          ) : (
            <div className="space-y-3">
              {data.topSickness.map((emp, i) => (
                <Link
                  key={emp.employeeId}
                  href={`/t/${tenantSlug}/employees/${emp.employeeId}`}
                  className="flex items-center gap-3 hover:bg-accent rounded-lg p-2 -mx-2 transition-colors"
                >
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs font-bold text-muted-foreground flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-medium truncate">{emp.name}</span>
                      <span className="text-sm text-muted-foreground flex-shrink-0 ml-2">{emp.days} days</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-400 rounded-full transition-all"
                        style={{ width: `${(emp.days / maxSickDays) * 100}%` }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Top Absentees Card */}
        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <h3 className="text-sm font-semibold mb-4">Top Absentees</h3>
          <p className="text-xs text-muted-foreground mb-3">Most absence days this year (includes sickness)</p>
          {data.topAbsentees.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">No absences recorded this year</p>
          ) : (
            <div className="space-y-3">
              {data.topAbsentees.map((emp, i) => (
                <Link
                  key={emp.employeeId}
                  href={`/t/${tenantSlug}/employees/${emp.employeeId}`}
                  className="flex items-center gap-3 hover:bg-accent rounded-lg p-2 -mx-2 transition-colors"
                >
                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs font-bold text-muted-foreground flex-shrink-0">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-sm font-medium truncate">{emp.name}</span>
                      <span className="text-sm text-muted-foreground flex-shrink-0 ml-2">{emp.days} days</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-400 rounded-full transition-all"
                        style={{ width: `${(emp.days / maxAbsenteeDays) * 100}%` }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
