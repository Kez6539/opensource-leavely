'use client'

import { Employee, EmployeeStatus } from '@/generated/prisma/client'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { toast } from 'sonner'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { StatusBadge, EmptyState, Pagination } from '@/components/shared'
import { TeamIllustration } from '@/components/shared/illustrations'
import { MoreHorizontal, Users, Pencil, UserX } from 'lucide-react'

const AVATAR_COLORS = [
  'bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500',
  'bg-purple-500', 'bg-cyan-500', 'bg-orange-500', 'bg-teal-500',
]

function getAvatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}
import Link from 'next/link'
import { setEmployeeInactive } from './actions'

interface Props {
  employees: Employee[]
  tenantSlug: string
  departments: string[]
  filters: { search?: string; status?: string; department?: string }
  bradfordScores?: Record<string, { score: number; riskColor: string }>
  currentPage?: number
  totalPages?: number
}

export function EmployeesTable({ employees, tenantSlug, departments, filters, bradfordScores, currentPage, totalPages }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== 'ALL') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`)
      })
    },
    [router, pathname, searchParams]
  )

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        <Input
          placeholder="Search employees..."
          defaultValue={filters.search ?? ''}
          className="max-w-xs h-9"
          onChange={(e) => {
            const val = e.target.value
            // debounce-ish: update on blur or enter
            if (val !== (filters.search ?? '')) {
              updateFilter('search', val)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              updateFilter('search', (e.target as HTMLInputElement).value)
            }
          }}
        />
        <Select
          defaultValue={filters.status ?? 'ALL'}
          onValueChange={(v) => updateFilter('status', v)}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All statuses</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="INACTIVE">Inactive</SelectItem>
          </SelectContent>
        </Select>
        {departments.length > 0 && (
          <Select
            defaultValue={filters.department ?? 'ALL'}
            onValueChange={(v) => updateFilter('department', v)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All departments</SelectItem>
              {departments.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {employees.length === 0 ? (
        <EmptyState
          illustration={!(filters.search || filters.status || filters.department) ? <TeamIllustration className="w-44 h-44" /> : undefined}
          icon={(filters.search || filters.status || filters.department) ? <Users className="h-10 w-10" /> : undefined}
          title="No employees found"
          description={
            filters.search || filters.status || filters.department
              ? 'Try adjusting your filters.'
              : 'Get started by adding your first team member.'
          }
          action={
            !filters.search && !filters.status && !filters.department ? (
              <Link href={`/t/${tenantSlug}/employees/new`}>
                <Button size="lg" className="shadow-md shadow-primary/20">Add your first employee</Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="rounded-xl border shadow-sm overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Job title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                {bradfordScores && <TableHead>Bradford</TableHead>}
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => (
                <TableRow
                  key={emp.id}
                  className="hover:bg-accent/50 transition-colors duration-150"
                >
                  <TableCell>
                    <Link
                      href={`/t/${tenantSlug}/employees/${emp.id}`}
                      className="flex items-center gap-3 -my-2 -ml-2 py-2 pl-2 pr-4 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold ${getAvatarColor(emp.firstName + emp.lastName)}`}>
                        {emp.firstName[0]}{emp.lastName[0]}
                      </div>
                      <span className="font-medium">{emp.firstName} {emp.lastName}</span>
                    </Link>
                  </TableCell>
                  <TableCell>{emp.jobTitle ?? '—'}</TableCell>
                  <TableCell>{emp.department ?? '—'}</TableCell>
                  <TableCell>
                    <StatusBadge status={emp.status} />
                  </TableCell>
                  {bradfordScores && (
                    <TableCell>
                      {bradfordScores[emp.id] ? (
                        <span className={`font-medium ${bradfordScores[emp.id].riskColor}`}>
                          {bradfordScores[emp.id].score}
                        </span>
                      ) : (
                        '—'
                      )}
                    </TableCell>
                  )}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" aria-label={`Actions for ${emp.firstName} ${emp.lastName}`}>
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open employee actions menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/t/${tenantSlug}/employees/${emp.id}/edit`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        {emp.status === 'ACTIVE' && (
                          <DropdownMenuItem
                            onClick={async () => {
                              const result = await setEmployeeInactive(tenantSlug, emp.id)
                              if (!result.ok) {
                                // (#150) Use the rest-of-app toast pattern
                                // instead of a 1995-era native alert.
                                toast.error(result.error)
                                return
                              }
                              toast.success('Employee marked inactive')
                              router.refresh()
                            }}
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            Set inactive
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {currentPage && totalPages && totalPages > 1 && (
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={pathname}
            searchParams={{
              search: filters.search,
              status: filters.status,
              department: filters.department,
            }}
          />
        </div>
      )}
    </div>
  )
}
