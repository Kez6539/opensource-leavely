'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, RotateCcw } from 'lucide-react'

interface Employee {
  id: string
  firstName: string
  lastName: string
}

interface ReportFiltersProps {
  employees: Employee[]
  tenantSlug: string
  reportType: string
  showEmployeeFilter?: boolean
}

export function ReportFilters({
  employees,
  tenantSlug,
  reportType,
  showEmployeeFilter = true,
}: ReportFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [startDate, setStartDate] = useState(
    searchParams.get('startDate') || ''
  )
  const [endDate, setEndDate] = useState(
    searchParams.get('endDate') || ''
  )
  const [employeeId, setEmployeeId] = useState(
    searchParams.get('employeeId') || 'all'
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (startDate) params.set('startDate', startDate)
    if (endDate) params.set('endDate', endDate)
    if (employeeId && employeeId !== 'all') params.set('employeeId', employeeId)
    router.push(`/t/${tenantSlug}/reports/${reportType}?${params.toString()}`)
  }

  function handleReset() {
    setStartDate('')
    setEndDate('')
    setEmployeeId('all')
    router.push(`/t/${tenantSlug}/reports/${reportType}`)
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border bg-card p-5 shadow-sm mb-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="startDate" className="text-xs font-medium">
            Start date
          </Label>
          <Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-40"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="endDate" className="text-xs font-medium">
            End date
          </Label>
          <Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-40"
          />
        </div>
        {showEmployeeFilter && (
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-medium">Employee</Label>
            <Select value={employeeId} onValueChange={setEmployeeId}>
              <SelectTrigger className="w-52">
                <SelectValue placeholder="All employees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All employees</SelectItem>
                {employees.map((emp) => (
                  <SelectItem key={emp.id} value={emp.id}>
                    {emp.firstName} {emp.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="flex gap-2">
          <Button type="submit" size="sm">
            <Search className="mr-2 h-4 w-4" />
            Generate
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </form>
  )
}
