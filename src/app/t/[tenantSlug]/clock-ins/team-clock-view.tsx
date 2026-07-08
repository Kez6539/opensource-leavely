'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface TeamEntry {
  employeeId: string
  employeeName: string
  clockIn: string | null
  clockOut: string | null
  breakMinutes: number
  totalHours: number | null
  notes: string | null
  status: string
  isLate: boolean
}

interface TeamClockViewProps {
  entries: TeamEntry[]
  selectedDate: string
}

function StatusBadge({ status, isLate }: { status: string; isLate: boolean }) {
  if (isLate && status !== 'NOT_CLOCKED') {
    return (
      <Badge variant="outline" className="text-xs font-medium gap-1.5 px-2.5 py-0.5 bg-amber-50 border-amber-200/60 text-amber-700">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
        Late
      </Badge>
    )
  }

  const configs: Record<string, { dot: string; bg: string; text: string; label: string }> = {
    IN: { dot: 'bg-emerald-500', bg: 'bg-emerald-50 border-emerald-200/60', text: 'text-emerald-700', label: 'In' },
    OUT: { dot: 'bg-gray-400', bg: 'bg-gray-50 border-gray-200/60', text: 'text-gray-600', label: 'Out' },
    NOT_CLOCKED: { dot: 'bg-gray-300', bg: 'bg-gray-50 border-gray-200/60', text: 'text-gray-500', label: 'Not clocked' },
  }

  const config = configs[status] ?? configs.NOT_CLOCKED

  return (
    <Badge variant="outline" className={cn('text-xs font-medium gap-1.5 px-2.5 py-0.5', config.bg, config.text)}>
      <span className={cn('inline-block h-1.5 w-1.5 rounded-full', config.dot)} />
      {config.label}
    </Badge>
  )
}

export function TeamClockView({ entries, selectedDate }: TeamClockViewProps) {
  const inCount = entries.filter((e) => e.status === 'IN').length
  const outCount = entries.filter((e) => e.status === 'OUT').length
  const notClockedCount = entries.filter((e) => e.status === 'NOT_CLOCKED').length
  const lateCount = entries.filter((e) => e.isLate).length

  return (
    <div>
      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="rounded-lg border bg-card p-3 shadow-sm">
          <p className="text-xs text-muted-foreground font-medium">Clocked In</p>
          <p className="text-xl font-bold text-emerald-600">{inCount}</p>
        </div>
        <div className="rounded-lg border bg-card p-3 shadow-sm">
          <p className="text-xs text-muted-foreground font-medium">Clocked Out</p>
          <p className="text-xl font-bold text-gray-600">{outCount}</p>
        </div>
        <div className="rounded-lg border bg-card p-3 shadow-sm">
          <p className="text-xs text-muted-foreground font-medium">Not Clocked</p>
          <p className="text-xl font-bold text-gray-400">{notClockedCount}</p>
        </div>
        <div className="rounded-lg border bg-card p-3 shadow-sm">
          <p className="text-xs text-muted-foreground font-medium">Late</p>
          <p className="text-xl font-bold text-amber-600">{lateCount}</p>
        </div>
      </div>

      {/* Team table */}
      <div className="rounded-lg border shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Clock In</TableHead>
              <TableHead>Clock Out</TableHead>
              <TableHead>Break (mins)</TableHead>
              <TableHead>Total Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow
                key={entry.employeeId}
                className={cn(
                  'hover:bg-accent/50 transition-colors',
                  entry.isLate && 'bg-amber-50/50'
                )}
              >
                <TableCell className="font-medium">{entry.employeeName}</TableCell>
                <TableCell>
                  <StatusBadge status={entry.status} isLate={entry.isLate} />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {entry.clockIn
                    ? new Date(entry.clockIn).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : '\u2014'}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {entry.clockOut
                    ? new Date(entry.clockOut).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : entry.clockIn
                      ? <span className="text-emerald-600 font-medium">Active</span>
                      : '\u2014'}
                </TableCell>
                <TableCell className="text-sm tabular-nums">
                  {entry.status !== 'NOT_CLOCKED' ? entry.breakMinutes : '\u2014'}
                </TableCell>
                <TableCell className="font-medium tabular-nums">
                  {entry.totalHours !== null ? `${entry.totalHours}h` : '\u2014'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
