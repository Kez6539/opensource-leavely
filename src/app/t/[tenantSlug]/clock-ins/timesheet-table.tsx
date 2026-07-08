'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { BreakInput } from './break-input'

interface TimesheetEntry {
  id: string
  date: string
  clockIn: string
  clockOut: string | null
  breakMinutes: number
  totalHours: number | null
  notes: string | null
}

interface TimesheetTableProps {
  entries: TimesheetEntry[]
  tenantSlug: string
}

export function TimesheetTable({ entries, tenantSlug }: TimesheetTableProps) {
  if (entries.length === 0) {
    return (
      <p className="text-sm text-muted-foreground py-6 text-center">
        No clock entries this week.
      </p>
    )
  }

  const totalWeekHours = entries.reduce((acc, e) => acc + (e.totalHours ?? 0), 0)

  return (
    <div className="rounded-lg border shadow-sm overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Clock In</TableHead>
            <TableHead>Clock Out</TableHead>
            <TableHead>Break (mins)</TableHead>
            <TableHead>Total Hours</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id} className="hover:bg-accent/50 transition-colors">
              <TableCell className="font-medium">
                {new Date(entry.date).toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                })}
              </TableCell>
              <TableCell>
                {new Date(entry.clockIn).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </TableCell>
              <TableCell>
                {entry.clockOut
                  ? new Date(entry.clockOut).toLocaleTimeString('en-GB', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : <span className="text-emerald-600 font-medium">Active</span>}
              </TableCell>
              <TableCell>
                <BreakInput
                  entryId={entry.id}
                  tenantSlug={tenantSlug}
                  currentMinutes={entry.breakMinutes}
                />
              </TableCell>
              <TableCell className="font-medium tabular-nums">
                {entry.totalHours !== null ? `${entry.totalHours}h` : '\u2014'}
              </TableCell>
            </TableRow>
          ))}
          {/* Totals row */}
          <TableRow className="bg-muted/50 font-semibold">
            <TableCell colSpan={4} className="text-right">
              Week Total
            </TableCell>
            <TableCell className="tabular-nums">
              {Math.round(totalWeekHours * 100) / 100}h
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
