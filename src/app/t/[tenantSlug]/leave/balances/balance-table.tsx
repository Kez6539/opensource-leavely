'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { EmployeeBalanceRow } from './actions'

type SortKey = 'employeeName' | 'department' | 'allowance' | 'used' | 'pending' | 'remaining' | 'remainingPct'
type SortDir = 'asc' | 'desc'

interface BalanceTableProps {
  rows: EmployeeBalanceRow[]
  departments: string[]
  tenantSlug: string
}

function PercentageBar({ pct }: { pct: number }) {
  const clampedPct = Math.max(0, Math.min(100, pct))
  const color =
    clampedPct > 50
      ? 'bg-emerald-500'
      : clampedPct > 25
        ? 'bg-amber-500'
        : 'bg-red-500'

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden min-w-[60px]">
        <div
          className={cn('h-full rounded-full transition-all', color)}
          style={{ width: `${clampedPct}%` }}
        />
      </div>
      <span
        className={cn(
          'text-xs font-medium tabular-nums w-10 text-right',
          clampedPct > 50
            ? 'text-emerald-600'
            : clampedPct > 25
              ? 'text-amber-600'
              : 'text-red-600'
        )}
      >
        {pct}%
      </span>
    </div>
  )
}

function SortIcon({ column, sortKey, sortDir }: { column: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (column !== sortKey) {
    return <ArrowUpDown className="h-3 w-3 ml-1 opacity-40" />
  }
  return sortDir === 'asc' ? (
    <ArrowUp className="h-3 w-3 ml-1" />
  ) : (
    <ArrowDown className="h-3 w-3 ml-1" />
  )
}

interface PolicySectionProps {
  policyId: string
  policyName: string
  rows: EmployeeBalanceRow[]
  tenantSlug: string
  sortKey: SortKey
  sortDir: SortDir
  onSort: (key: SortKey) => void
  showPolicyHeader: boolean
}

function PolicySection({
  policyName,
  rows,
  tenantSlug,
  sortKey,
  sortDir,
  onSort,
  showPolicyHeader,
}: PolicySectionProps) {
  return (
    <div className="mb-6">
      {showPolicyHeader && (
        <h3 className="text-sm font-semibold text-foreground mb-2">{policyName}</h3>
      )}
      <div className="rounded-lg border shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <button
                  type="button"
                  className="inline-flex items-center hover:text-foreground transition-colors"
                  onClick={() => onSort('employeeName')}
                >
                  Employee
                  <SortIcon column="employeeName" sortKey={sortKey} sortDir={sortDir} />
                </button>
              </TableHead>
              <TableHead>
                <button
                  type="button"
                  className="inline-flex items-center hover:text-foreground transition-colors"
                  onClick={() => onSort('department')}
                >
                  Department
                  <SortIcon column="department" sortKey={sortKey} sortDir={sortDir} />
                </button>
              </TableHead>
              <TableHead className="text-right">
                <button
                  type="button"
                  className="inline-flex items-center hover:text-foreground transition-colors ml-auto"
                  onClick={() => onSort('allowance')}
                >
                  Allowance
                  <SortIcon column="allowance" sortKey={sortKey} sortDir={sortDir} />
                </button>
              </TableHead>
              <TableHead className="text-right">
                <button
                  type="button"
                  className="inline-flex items-center hover:text-foreground transition-colors ml-auto"
                  onClick={() => onSort('used')}
                >
                  Used
                  <SortIcon column="used" sortKey={sortKey} sortDir={sortDir} />
                </button>
              </TableHead>
              <TableHead className="text-right">
                <button
                  type="button"
                  className="inline-flex items-center hover:text-foreground transition-colors ml-auto"
                  onClick={() => onSort('pending')}
                >
                  Pending
                  <SortIcon column="pending" sortKey={sortKey} sortDir={sortDir} />
                </button>
              </TableHead>
              <TableHead className="text-right">
                <button
                  type="button"
                  className="inline-flex items-center hover:text-foreground transition-colors ml-auto"
                  onClick={() => onSort('remaining')}
                >
                  Remaining
                  <SortIcon column="remaining" sortKey={sortKey} sortDir={sortDir} />
                </button>
              </TableHead>
              <TableHead className="w-[160px]">
                <button
                  type="button"
                  className="inline-flex items-center hover:text-foreground transition-colors"
                  onClick={() => onSort('remainingPct')}
                >
                  Balance
                  <SortIcon column="remainingPct" sortKey={sortKey} sortDir={sortDir} />
                </button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                  No employees found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={`${row.policyId}:${row.employeeId}`} className="hover:bg-accent/50 transition-colors">
                  <TableCell className="font-medium">
                    <Link
                      href={`/t/${tenantSlug}/employees/${row.employeeId}`}
                      className="text-primary hover:underline"
                    >
                      {row.employeeName}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{row.department}</TableCell>
                  <TableCell className="text-right tabular-nums">{row.allowance}</TableCell>
                  <TableCell className="text-right tabular-nums">{row.used}</TableCell>
                  <TableCell className="text-right tabular-nums">{row.pending}</TableCell>
                  <TableCell className="text-right tabular-nums font-medium">{row.remaining}</TableCell>
                  <TableCell>
                    <PercentageBar pct={row.remainingPct} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export function BalanceTable({ rows, departments, tenantSlug }: BalanceTableProps) {
  const [departmentFilter, setDepartmentFilter] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('remainingPct')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  // Group rows by policy, preserving server-side ordering so the primary
  // policy (oldest by createdAt) stays at the top.
  const policyGroups = useMemo(() => {
    const groups: { policyId: string; policyName: string; rows: EmployeeBalanceRow[] }[] = []
    const index = new Map<string, number>()
    for (const row of rows) {
      const existing = index.get(row.policyId)
      if (existing === undefined) {
        index.set(row.policyId, groups.length)
        groups.push({ policyId: row.policyId, policyName: row.policyName, rows: [row] })
      } else {
        groups[existing].rows.push(row)
      }
    }
    return groups
  }, [rows])

  const filteredAndSortedGroups = useMemo(() => {
    return policyGroups.map((group) => {
      let filtered = group.rows
      if (departmentFilter !== 'all') {
        filtered = filtered.filter((r) => r.department === departmentFilter)
      }
      const sorted = [...filtered].sort((a, b) => {
        const aVal = a[sortKey]
        const bVal = b[sortKey]
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortDir === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal)
        }
        return sortDir === 'asc'
          ? (aVal as number) - (bVal as number)
          : (bVal as number) - (aVal as number)
      })
      return { ...group, rows: sorted }
    })
  }, [policyGroups, departmentFilter, sortKey, sortDir])

  const totalFilteredRows = filteredAndSortedGroups.reduce((n, g) => n + g.rows.length, 0)
  const hasMultiplePolicies = filteredAndSortedGroups.length > 1

  return (
    <div>
      {/* Department filter */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-muted-foreground">Filter by department:</span>
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All departments" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {departmentFilter !== 'all' && (
          <span className="text-xs text-muted-foreground">
            {totalFilteredRows} row{totalFilteredRows !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* One table per non-system policy. Show the policy header only when
          multiple policies exist so single-policy tenants get the same tidy
          view as before. */}
      {filteredAndSortedGroups.map((group) => (
        <PolicySection
          key={group.policyId}
          policyId={group.policyId}
          policyName={group.policyName}
          rows={group.rows}
          tenantSlug={tenantSlug}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={handleSort}
          showPolicyHeader={hasMultiplePolicies}
        />
      ))}

      {totalFilteredRows > 0 && (
        <p className="text-xs text-muted-foreground mt-3">
          Sorted by {sortKey === 'remainingPct' ? 'balance %' : sortKey} (
          {sortDir === 'asc' ? 'ascending' : 'descending'}).
        </p>
      )}
    </div>
  )
}
