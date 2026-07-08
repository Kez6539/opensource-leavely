'use client'

import { useState } from 'react'
import { CardSection } from '@/components/shared'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface Employee {
  employeeId: string
  employeeName: string
  initials: string
  clockIn: string | null
  clockOut: string | null
  locationName: string | null
  locationId: string | null
  status: 'IN' | 'OUT' | 'NOT_CLOCKED'
}

interface Location {
  id: string
  name: string
}

interface Props {
  data: {
    employees: Employee[]
    locations: Location[]
  }
}

function AvatarCircle({ initials, status }: { initials: string; status: string }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center h-10 w-10 rounded-full text-sm font-semibold text-white shrink-0',
        status === 'IN' && 'bg-emerald-500',
        status === 'OUT' && 'bg-gray-400',
        status === 'NOT_CLOCKED' && 'bg-gray-300'
      )}
    >
      {initials}
    </div>
  )
}

function EmployeeCard({ emp }: { emp: Employee }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/30 transition-colors">
      <AvatarCircle initials={emp.initials} status={emp.status} />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate">{emp.employeeName}</p>
        <div className="flex items-center gap-2 mt-0.5">
          {emp.clockIn && (
            <span className="text-xs text-muted-foreground">
              {new Date(emp.clockIn).toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          )}
          {emp.clockOut && (
            <>
              <span className="text-xs text-muted-foreground">&rarr;</span>
              <span className="text-xs text-muted-foreground">
                {new Date(emp.clockOut).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </>
          )}
          {emp.locationName && (
            <span className="text-xs text-muted-foreground/70 truncate">
              @ {emp.locationName}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function WhosInTab({ data }: Props) {
  const [filterEmployee, setFilterEmployee] = useState<string>('all')
  const [filterLocation, setFilterLocation] = useState<string>('all')

  const filtered = data.employees.filter((emp) => {
    if (filterEmployee !== 'all' && emp.employeeId !== filterEmployee) return false
    if (filterLocation !== 'all') {
      if (emp.locationId !== filterLocation) return false
    }
    return true
  })

  const clockedIn = filtered.filter((e) => e.status === 'IN')
  const clockedOut = filtered.filter((e) => e.status === 'OUT')
  const notClocked = filtered.filter((e) => e.status === 'NOT_CLOCKED')

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <Select value={filterEmployee} onValueChange={setFilterEmployee}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All employees" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All employees</SelectItem>
            {data.employees.map((emp) => (
              <SelectItem key={emp.employeeId} value={emp.employeeId}>
                {emp.employeeName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {data.locations.length > 0 && (
          <Select value={filterLocation} onValueChange={setFilterLocation}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All locations</SelectItem>
              {data.locations.map((loc) => (
                <SelectItem key={loc.id} value={loc.id}>
                  {loc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border bg-emerald-50/50 dark:bg-emerald-500/10 p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{clockedIn.length}</p>
          <p className="text-xs font-medium text-emerald-700/70 mt-0.5">Clocked In</p>
        </div>
        <div className="rounded-lg border bg-blue-50/50 dark:bg-blue-500/10 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{clockedOut.length}</p>
          <p className="text-xs font-medium text-blue-700/70 mt-0.5">Clocked Out</p>
        </div>
        <div className="rounded-lg border bg-gray-50/50 dark:bg-gray-500/10 p-4 text-center">
          <p className="text-2xl font-bold text-gray-500">{notClocked.length}</p>
          <p className="text-xs font-medium text-gray-500/70 mt-0.5">Not Clocked</p>
        </div>
      </div>

      {/* Clocked In section */}
      <CardSection
        title={
          <span className="flex items-center gap-2">
            Clocked In
            <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600 text-xs">
              {clockedIn.length}
            </Badge>
          </span>
        }
      >
        {clockedIn.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No employees currently clocked in.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {clockedIn.map((emp) => (
              <EmployeeCard key={emp.employeeId} emp={emp} />
            ))}
          </div>
        )}
      </CardSection>

      {/* Clocked Out section */}
      <CardSection
        title={
          <span className="flex items-center gap-2">
            Clocked Out
            <Badge variant="secondary" className="text-xs">
              {clockedOut.length}
            </Badge>
          </span>
        }
      >
        {clockedOut.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No employees have clocked out yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {clockedOut.map((emp) => (
              <EmployeeCard key={emp.employeeId} emp={emp} />
            ))}
          </div>
        )}
      </CardSection>

      {/* Not Clocked section */}
      <CardSection
        title={
          <span className="flex items-center gap-2">
            Not Clocked In
            <Badge variant="outline" className="text-xs text-muted-foreground">
              {notClocked.length}
            </Badge>
          </span>
        }
      >
        {notClocked.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">All employees have clocked in.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {notClocked.map((emp) => (
              <EmployeeCard key={emp.employeeId} emp={emp} />
            ))}
          </div>
        )}
      </CardSection>
    </div>
  )
}
