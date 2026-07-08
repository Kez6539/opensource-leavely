'use client'

import { useRouter } from 'next/navigation'
import { CardSection } from '@/components/shared'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'

interface HistoryEntry {
  id: string
  employeeName: string
  employeeId: string
  date: string
  clockIn: string
  clockOut: string | null
  breakMinutes: number
  totalHours: number | null
  locationName: string | null
}

interface FilterOption {
  id: string
  name: string
}

interface Props {
  data: {
    entries: HistoryEntry[]
    totalCount: number
    page: number
    totalPages: number
    employees: FilterOption[]
    locations: FilterOption[]
  }
  tenantSlug: string
}

export function HistoryTab({ data, tenantSlug }: Props) {
  const router = useRouter()
  const [employeeFilter, setEmployeeFilter] = useState<string>('all')
  const [locationFilter, setLocationFilter] = useState<string>('all')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  function buildUrl(overrides: Record<string, string | undefined> = {}) {
    const params = new URLSearchParams()
    params.set('tab', 'history')

    const emp = overrides.employee ?? employeeFilter
    const loc = overrides.location ?? locationFilter
    const sd = overrides.startDate ?? startDate
    const ed = overrides.endDate ?? endDate
    const pg = overrides.page ?? '1'

    if (emp && emp !== 'all') params.set('employee', emp)
    if (loc && loc !== 'all') params.set('location', loc)
    if (sd) params.set('startDate', sd)
    if (ed) params.set('endDate', ed)
    if (pg !== '1') params.set('page', pg)

    return `/t/${tenantSlug}/clock-ins?${params.toString()}`
  }

  function applyFilters() {
    router.push(buildUrl())
  }

  function clearFilters() {
    setEmployeeFilter('all')
    setLocationFilter('all')
    setStartDate('')
    setEndDate('')
    router.push(`/t/${tenantSlug}/clock-ins?tab=history`)
  }

  function goToPage(page: number) {
    router.push(buildUrl({ page: page.toString() }))
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <CardSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-end gap-3 lg:flex-wrap">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Employee</label>
            <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="All employees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All employees</SelectItem>
                {data.employees.map((e) => (
                  <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {data.locations.length > 0 && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Location</label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full lg:w-[180px]">
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All locations</SelectItem>
                  {data.locations.map((l) => (
                    <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">From</label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full lg:w-[150px] h-9"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">To</label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full lg:w-[150px] h-9"
            />
          </div>

          <div className="flex gap-2 sm:col-span-2 lg:col-span-1">
            <Button size="sm" onClick={applyFilters} className="flex-1 lg:flex-none">
              Filter
            </Button>
            <Button size="sm" variant="ghost" onClick={clearFilters} className="flex-1 lg:flex-none">
              Clear
            </Button>
          </div>
        </div>
      </CardSection>

      {/* Results */}
      <CardSection>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-muted-foreground">
            {data.totalCount} {data.totalCount === 1 ? 'entry' : 'entries'} found
          </p>
        </div>

        <div className="rounded-lg border shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead>Break (mins)</TableHead>
                <TableHead>Total Hours</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.entries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No clock-in entries found for the selected filters.
                  </TableCell>
                </TableRow>
              ) : (
                data.entries.map((entry) => (
                  <TableRow key={entry.id} className="hover:bg-accent/50 transition-colors">
                    <TableCell className="font-medium">{entry.employeeName}</TableCell>
                    <TableCell className="text-sm">
                      {new Date(entry.date).toLocaleDateString('en-GB', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell className="text-sm tabular-nums">
                      {new Date(entry.clockIn).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>
                    <TableCell className="text-sm tabular-nums">
                      {entry.clockOut
                        ? new Date(entry.clockOut).toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : <span className="text-emerald-600 font-medium">Active</span>
                      }
                    </TableCell>
                    <TableCell className="text-sm tabular-nums">{entry.breakMinutes}</TableCell>
                    <TableCell className="font-medium tabular-nums">
                      {entry.totalHours !== null ? `${entry.totalHours}h` : '\u2014'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {entry.locationName ?? '\u2014'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {data.totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Page {data.page} of {data.totalPages}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={data.page <= 1}
                onClick={() => goToPage(data.page - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={data.page >= data.totalPages}
                onClick={() => goToPage(data.page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardSection>
    </div>
  )
}
