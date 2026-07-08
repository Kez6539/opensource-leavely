'use client'

import { useState } from 'react'
import { KpiTile } from '@/components/shared/kpi-tile'
import { CardSection } from '@/components/shared/card-section'
import { StatusBadge } from '@/components/shared/status-badge'
import { Clock, CheckCircle2, XCircle, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ToilAccrualItem {
  id: string
  date: string
  hours: number
  reason: string | null
  status: string
  createdAt: string
}

interface OvertimeTabProps {
  tenantSlug: string
  employeeId: string
  toilAccruals: ToilAccrualItem[]
  toilBalance: {
    accrued: number
    used: number
    remaining: number
  }
  canManage: boolean
}

function formatDateGB(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function OvertimeTab({
  tenantSlug,
  employeeId,
  toilAccruals,
  toilBalance,
  canManage,
}: OvertimeTabProps) {
  const [statusFilter, setStatusFilter] = useState<string>('ALL')

  const filtered = statusFilter === 'ALL'
    ? toilAccruals
    : toilAccruals.filter((a) => a.status === statusFilter)

  const pendingCount = toilAccruals.filter((a) => a.status === 'PENDING').length
  const approvedCount = toilAccruals.filter((a) => a.status === 'APPROVED').length

  return (
    <div className="space-y-6">
      {/* Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <KpiTile
          label="Total Accrued"
          value={`${toilBalance.accrued.toFixed(1)}h`}
          icon={<Timer className="h-5 w-5" />}
          accent="border-l-indigo-500"
          iconBg="bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600"
        />
        <KpiTile
          label="Used"
          value={`${toilBalance.used.toFixed(1)}h`}
          icon={<CheckCircle2 className="h-5 w-5" />}
          accent="border-l-emerald-500"
          iconBg="bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600"
        />
        <KpiTile
          label="Remaining"
          value={`${toilBalance.remaining.toFixed(1)}h`}
          icon={<Clock className="h-5 w-5" />}
          accent="border-l-amber-500"
          iconBg="bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600"
        />
        <KpiTile
          label="Pending"
          value={pendingCount}
          icon={<XCircle className="h-5 w-5" />}
          accent="border-l-gray-400"
          iconBg="bg-gradient-to-br from-gray-100 to-gray-50 text-gray-600"
        />
      </div>

      {/* Actions */}
      {canManage && (
        <div>
          <Link href={`/t/${tenantSlug}/toil/new?employeeId=${employeeId}`}>
            <Button size="sm">
              <Clock className="mr-2 h-4 w-4" />
              Log overtime / TOIL
            </Button>
          </Link>
        </div>
      )}

      {/* Filter */}
      <CardSection title="TOIL Accruals">
        <div className="flex gap-2 mb-4">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((s) => (
            <Button
              key={s}
              variant={statusFilter === s ? 'default' : 'outline'}
              size="xs"
              onClick={() => setStatusFilter(s)}
            >
              {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
              {s === 'PENDING' && pendingCount > 0 && (
                <span className="ml-1 bg-amber-200 text-amber-800 rounded-full px-1.5 text-[10px]">{pendingCount}</span>
              )}
            </Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">No TOIL accruals found</p>
        ) : (
          <div className="space-y-2">
            {filtered.map((a) => (
              <div key={a.id} className="flex items-center justify-between gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{a.hours}h overtime</span>
                    <StatusBadge status={a.status} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {formatDateGB(a.date)}
                    {a.reason && <> &mdash; {a.reason}</>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {toilAccruals.length > 0 && (
          <div className="mt-4 pt-3 border-t text-xs text-muted-foreground">
            <span className="font-medium">Summary:</span> {approvedCount} approved, {pendingCount} pending, {toilAccruals.length - approvedCount - pendingCount} rejected
          </div>
        )}
      </CardSection>
    </div>
  )
}
