'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { CardSection } from '@/components/shared'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ChevronLeft, ChevronRight, Download, Printer } from 'lucide-react'
import { cn } from '@/lib/utils'
import { exportTimesheetsCsv } from '../actions'

interface TimesheetEmployee {
  employeeId: string
  employeeName: string
  days: (number | null)[] // 7 days, Mon=0..Sun=6
  total: number
}

interface Props {
  data: {
    weekStart: string
    employees: TimesheetEmployee[]
  }
  tenantSlug: string
}

const DAY_HEADERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function formatWeekLabel(weekStart: string): string {
  const start = new Date(weekStart)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  return `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} \u2013 ${end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
}

function getHoursClass(hours: number | null): string {
  if (hours === null) return ''
  if (hours >= 7) return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
  if (hours > 0) return 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
  return ''
}

export function TimesheetsTab({ data, tenantSlug }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function navigateWeek(direction: number) {
    const current = new Date(data.weekStart)
    current.setDate(current.getDate() + direction * 7)
    const weekStr = current.toISOString().split('T')[0]
    router.push(`/t/${tenantSlug}/clock-ins?tab=timesheets&week=${weekStr}`)
  }

  function handleExportCsv() {
    startTransition(async () => {
      try {
        const csv = await exportTimesheetsCsv(tenantSlug, data.weekStart)
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `timesheet-${data.weekStart}.csv`
        link.click()
        URL.revokeObjectURL(url)
      } catch {
        // Silently handle error
      }
    })
  }

  function handlePrint() {
    window.print()
  }

  return (
    <div className="space-y-4">
      {/* Week navigation + actions */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigateWeek(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium min-w-[220px] text-center">
            {formatWeekLabel(data.weekStart)}
          </span>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => navigateWeek(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCsv} disabled={isPending}>
            <Download className="h-4 w-4 mr-1" />
            {isPending ? 'Exporting...' : 'Export CSV'}
          </Button>
        </div>
      </div>

      {/* Timesheet grid */}
      <CardSection>
        <div className="rounded-lg border shadow-sm overflow-x-auto print:shadow-none print:border-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-background z-10 min-w-[160px]">Employee</TableHead>
                {DAY_HEADERS.map((day) => (
                  <TableHead key={day} className="text-center min-w-[70px]">{day}</TableHead>
                ))}
                <TableHead className="text-center min-w-[90px] font-semibold">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                    No employees found.
                  </TableCell>
                </TableRow>
              ) : (
                data.employees.map((emp) => (
                  <TableRow key={emp.employeeId} className="hover:bg-accent/50 transition-colors">
                    <TableCell className="font-medium sticky left-0 bg-background z-10">
                      {emp.employeeName}
                    </TableCell>
                    {emp.days.map((hours, i) => (
                      <TableCell
                        key={i}
                        className={cn(
                          'text-center tabular-nums text-sm',
                          getHoursClass(hours)
                        )}
                      >
                        {hours !== null ? `${hours}h` : ''}
                      </TableCell>
                    ))}
                    <TableCell className="text-center font-semibold tabular-nums">
                      {emp.total > 0 ? `${emp.total}h` : ''}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardSection>

      {/* Print-friendly styles */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .print\\:shadow-none,
          .print\\:shadow-none *,
          [data-slot="tabs-content"][data-state="active"],
          [data-slot="tabs-content"][data-state="active"] * {
            visibility: visible;
          }
          [data-slot="tabs-content"][data-state="active"] {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          [data-slot="tabs-list"],
          button { display: none !important; }
        }
      `}</style>
    </div>
  )
}
