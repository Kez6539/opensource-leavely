'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatusBadge, EmptyState } from '@/components/shared'
import { TeamIllustration } from '@/components/shared/illustrations'
import {
  ChevronDown,
  ChevronRight,
  Eye,
  Users,
  Search,
  Building2,
  Home,
  Laptop,
  Plane,
  Thermometer,
  CalendarOff,
  ArrowUpDown,
} from 'lucide-react'
import { QuickViewDialog } from './quick-view-dialog'

// ── Types ──

export interface DirectoryEmployee {
  id: string
  firstName: string
  lastName: string
  email: string | null
  jobTitle: string | null
  department: string | null
  status: string
  phone: string | null
  startDate: string | null
  workingStatus: string | null
  leaveBalances: { policyName: string; remaining: number }[]
}

interface Props {
  employees: DirectoryEmployee[]
  tenantSlug: string
  departments: string[]
  bradfordScores?: Record<string, { score: number; riskColor: string }>
  showWorkingStatus?: boolean
}

// ── Avatar Color Utility ──

function getAvatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash % 360)
  return `hsl(${hue}, 60%, 45%)`
}

// ── Working Status Config ──

const WORKING_STATUS_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  office: { label: 'In Office', icon: <Building2 className="h-3 w-3" />, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  home: { label: 'WFH', icon: <Home className="h-3 w-3" />, color: 'bg-blue-50 text-blue-700 border-blue-200' },
  hybrid: { label: 'Hybrid', icon: <Laptop className="h-3 w-3" />, color: 'bg-violet-50 text-violet-700 border-violet-200' },
  away: { label: 'Away', icon: <Plane className="h-3 w-3" />, color: 'bg-amber-50 text-amber-700 border-amber-200' },
  sick: { label: 'Sick', icon: <Thermometer className="h-3 w-3" />, color: 'bg-red-50 text-red-700 border-red-200' },
  leave: { label: 'On Leave', icon: <CalendarOff className="h-3 w-3" />, color: 'bg-gray-50 text-gray-700 border-gray-200' },
}

// ── Sort Options ──

type SortOption = 'first-az' | 'first-za' | 'start-newest' | 'start-oldest'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'first-az', label: 'First name A-Z' },
  { value: 'first-za', label: 'First name Z-A' },
  { value: 'start-newest', label: 'Start date (newest)' },
  { value: 'start-oldest', label: 'Start date (oldest)' },
]

function sortEmployees(employees: DirectoryEmployee[], sort: SortOption): DirectoryEmployee[] {
  return [...employees].sort((a, b) => {
    switch (sort) {
      case 'first-az':
        return a.firstName.localeCompare(b.firstName) || a.lastName.localeCompare(b.lastName)
      case 'first-za':
        return b.firstName.localeCompare(a.firstName) || b.lastName.localeCompare(a.lastName)
      case 'start-newest': {
        const da = a.startDate ? new Date(a.startDate).getTime() : 0
        const db = b.startDate ? new Date(b.startDate).getTime() : 0
        return db - da
      }
      case 'start-oldest': {
        const da = a.startDate ? new Date(a.startDate).getTime() : Infinity
        const db = b.startDate ? new Date(b.startDate).getTime() : Infinity
        return da - db
      }
    }
  })
}

// ── Department Section ──

function DepartmentSection({
  title,
  count,
  employees,
  tenantSlug,
  defaultOpen,
  onQuickView,
  showWorkingStatus = true,
}: {
  title: string
  count: number
  employees: DirectoryEmployee[]
  tenantSlug: string
  defaultOpen: boolean
  onQuickView: (emp: DirectoryEmployee) => void
  showWorkingStatus?: boolean
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full text-left group mb-3"
      >
        <div className="flex items-center justify-center h-6 w-6 rounded-md bg-muted/60 group-hover:bg-muted transition-colors">
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <span className="text-xs text-muted-foreground font-medium bg-muted/60 px-2 py-0.5 rounded-full">
          {count}
        </span>
      </button>

      {isOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((emp) => (
            <EmployeeCard
              key={emp.id}
              employee={emp}
              tenantSlug={tenantSlug}
              onQuickView={() => onQuickView(emp)}
              showWorkingStatus={showWorkingStatus}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Employee Card ──

function EmployeeCard({
  employee,
  tenantSlug,
  onQuickView,
  showWorkingStatus = true,
}: {
  employee: DirectoryEmployee
  tenantSlug: string
  onQuickView: () => void
  showWorkingStatus?: boolean
}) {
  const fullName = `${employee.firstName} ${employee.lastName}`
  const avatarColor = getAvatarColor(fullName)
  const status = employee.workingStatus || 'office'
  const statusConfig = WORKING_STATUS_CONFIG[status] || WORKING_STATUS_CONFIG.office

  return (
    <div className="group relative rounded-xl border bg-card p-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200">
      {/* Quick view button (always visible on touch, hover-reveal on desktop) */}
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onQuickView()
        }}
        className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-muted/80 text-muted-foreground md:bg-muted/0 md:text-muted-foreground/0 md:group-hover:bg-muted/80 md:group-hover:text-muted-foreground hover:!bg-primary hover:!text-primary-foreground transition-all duration-200"
        title="Quick view"
        aria-label="Quick view employee"
      >
        <Eye className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-3.5">
        {/* Avatar */}
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold shadow-sm"
          style={{ backgroundColor: avatarColor }}
        >
          {employee.firstName[0]}{employee.lastName[0]}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pr-6">
          <p className="font-semibold text-sm text-foreground truncate">{fullName}</p>
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {employee.jobTitle || 'No job title'}
          </p>
        </div>
      </div>

      {/* Working status badge */}
      {employee.status === 'ACTIVE' && showWorkingStatus && (
        <div className="mt-3">
          <Badge
            variant="outline"
            className={`text-[11px] font-medium gap-1 px-2 py-0.5 ${statusConfig.color}`}
          >
            {statusConfig.icon}
            {statusConfig.label}
          </Badge>
        </div>
      )}

      {employee.status === 'INACTIVE' && (
        <div className="mt-3">
          <StatusBadge status="INACTIVE" />
        </div>
      )}

      {/* View profile link */}
      <div className="mt-3 pt-3 border-t">
        <Link
          href={`/t/${tenantSlug}/employees/${employee.id}`}
          className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View full profile
        </Link>
      </div>
    </div>
  )
}

// ── Main Directory Component ──

export function EmployeesDirectory({ employees, tenantSlug, departments, bradfordScores, showWorkingStatus = true }: Props) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ACTIVE')
  const [departmentFilter, setDepartmentFilter] = useState<string>('ALL')
  const [sort, setSort] = useState<SortOption>('first-az')
  const [quickViewEmployee, setQuickViewEmployee] = useState<DirectoryEmployee | null>(null)

  // Filter employees
  const filtered = useMemo(() => {
    let result = employees

    // Status filter
    if (statusFilter !== 'ALL') {
      result = result.filter((e) => e.status === statusFilter)
    }

    // Department filter
    if (departmentFilter !== 'ALL') {
      if (departmentFilter === '_NONE') {
        result = result.filter((e) => !e.department)
      } else {
        result = result.filter((e) => e.department === departmentFilter)
      }
    }

    // Search
    if (search.trim()) {
      const q = search.toLowerCase().trim()
      result = result.filter(
        (e) =>
          e.firstName.toLowerCase().includes(q) ||
          e.lastName.toLowerCase().includes(q) ||
          `${e.firstName} ${e.lastName}`.toLowerCase().includes(q) ||
          (e.email && e.email.toLowerCase().includes(q)) ||
          (e.jobTitle && e.jobTitle.toLowerCase().includes(q))
      )
    }

    return result
  }, [employees, statusFilter, departmentFilter, search])

  // Sort
  const sorted = useMemo(() => sortEmployees(filtered, sort), [filtered, sort])

  // Group by department (only for active employees when showing "ACTIVE" or "ALL")
  const { activeGroups, inactiveEmployees } = useMemo(() => {
    const active = sorted.filter((e) => e.status === 'ACTIVE')
    const inactive = sorted.filter((e) => e.status === 'INACTIVE')

    // Group active employees by department
    const deptMap = new Map<string, DirectoryEmployee[]>()
    for (const emp of active) {
      const dept = emp.department || '_NO_DEPARTMENT'
      if (!deptMap.has(dept)) deptMap.set(dept, [])
      deptMap.get(dept)!.push(emp)
    }

    // Sort department groups: named departments alphabetically, "No department" last
    const groups: { name: string; employees: DirectoryEmployee[] }[] = []
    const sortedDepts = [...deptMap.keys()].sort((a, b) => {
      if (a === '_NO_DEPARTMENT') return 1
      if (b === '_NO_DEPARTMENT') return -1
      return a.localeCompare(b)
    })
    for (const dept of sortedDepts) {
      groups.push({
        name: dept === '_NO_DEPARTMENT' ? 'No department' : dept,
        employees: deptMap.get(dept)!,
      })
    }

    return { activeGroups: groups, inactiveEmployees: inactive }
  }, [sorted])

  const handleQuickView = useCallback((emp: DirectoryEmployee) => {
    setQuickViewEmployee(emp)
  }, [])

  const hasFilters = search || statusFilter !== 'ACTIVE' || departmentFilter !== 'ALL'
  const totalActive = employees.filter((e) => e.status === 'ACTIVE').length
  const totalInactive = employees.filter((e) => e.status === 'INACTIVE').length

  return (
    <div>
      {/* Filters bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search name, job title, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 h-9">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All statuses</SelectItem>
            <SelectItem value="ACTIVE">Active ({totalActive})</SelectItem>
            <SelectItem value="INACTIVE">Inactive ({totalInactive})</SelectItem>
          </SelectContent>
        </Select>

        {departments.length > 0 && (
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-44 h-9">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All departments</SelectItem>
              <SelectItem value="_NONE">No department</SelectItem>
              {departments.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
          <SelectTrigger className="w-44 h-9">
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground"
            onClick={() => {
              setSearch('')
              setStatusFilter('ACTIVE')
              setDepartmentFilter('ALL')
              setSort('first-az')
            }}
          >
            Clear filters
          </Button>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-muted-foreground">
          Showing {sorted.length} employee{sorted.length !== 1 ? 's' : ''}
          {hasFilters ? ' (filtered)' : ''}
        </p>
      </div>

      {/* Empty state */}
      {sorted.length === 0 ? (
        <EmptyState
          illustration={!hasFilters ? <TeamIllustration className="w-44 h-44" /> : undefined}
          icon={hasFilters ? <Users className="h-10 w-10" /> : undefined}
          title="No employees found"
          description={
            hasFilters
              ? 'Try adjusting your filters or search terms.'
              : 'Get started by adding your first team member.'
          }
          action={
            !hasFilters ? (
              <Link href={`/t/${tenantSlug}/employees/new`}>
                <Button size="lg" className="shadow-md shadow-primary/20">
                  Add your first employee
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <>
          {/* Active employees grouped by department */}
          {activeGroups.map((group) => (
            <DepartmentSection
              key={group.name}
              title={group.name}
              count={group.employees.length}
              employees={group.employees}
              tenantSlug={tenantSlug}
              defaultOpen={true}
              onQuickView={handleQuickView}
              showWorkingStatus={showWorkingStatus}
            />
          ))}

          {/* Inactive employees */}
          {inactiveEmployees.length > 0 && statusFilter !== 'ACTIVE' && (
            <DepartmentSection
              title="Terminated / Inactive"
              count={inactiveEmployees.length}
              employees={inactiveEmployees}
              tenantSlug={tenantSlug}
              defaultOpen={false}
              onQuickView={handleQuickView}
              showWorkingStatus={showWorkingStatus}
            />
          )}
        </>
      )}

      {/* Quick View Dialog */}
      <QuickViewDialog
        employee={quickViewEmployee}
        tenantSlug={tenantSlug}
        onClose={() => setQuickViewEmployee(null)}
      />
    </div>
  )
}
