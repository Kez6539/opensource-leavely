'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import {
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  Home,
  Laptop,
  Plane,
  Thermometer,
  CalendarOff,
  ExternalLink,
  Palmtree,
} from 'lucide-react'
import type { DirectoryEmployee } from './employees-directory'

// ── Avatar Color Utility (same hash as directory) ──

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
  office: { label: 'In Office', icon: <Building2 className="h-3.5 w-3.5" />, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  home: { label: 'Working from Home', icon: <Home className="h-3.5 w-3.5" />, color: 'bg-blue-50 text-blue-700 border-blue-200' },
  hybrid: { label: 'Hybrid', icon: <Laptop className="h-3.5 w-3.5" />, color: 'bg-violet-50 text-violet-700 border-violet-200' },
  away: { label: 'Away', icon: <Plane className="h-3.5 w-3.5" />, color: 'bg-amber-50 text-amber-700 border-amber-200' },
  sick: { label: 'Sick', icon: <Thermometer className="h-3.5 w-3.5" />, color: 'bg-red-50 text-red-700 border-red-200' },
  leave: { label: 'On Leave', icon: <CalendarOff className="h-3.5 w-3.5" />, color: 'bg-gray-50 text-gray-700 border-gray-200' },
}

// ── Length of Service ──

function formatLengthOfService(startDateStr: string): string {
  const start = new Date(startDateStr)
  const now = new Date()
  const diffMs = now.getTime() - start.getTime()
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (days < 30) return `${days} day${days !== 1 ? 's' : ''}`

  const months = Math.floor(days / 30.44)
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''}`

  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  if (remainingMonths === 0) return `${years} year${years !== 1 ? 's' : ''}`
  return `${years} yr${years !== 1 ? 's' : ''}, ${remainingMonths} mo${remainingMonths !== 1 ? 's' : ''}`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// ── Info Row ──

function InfoRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
        {href ? (
          <a href={href} className="text-sm text-primary hover:text-primary/80 transition-colors break-all">
            {value}
          </a>
        ) : (
          <p className="text-sm text-foreground">{value}</p>
        )}
      </div>
    </div>
  )
}

// ── Quick View Dialog ──

interface QuickViewDialogProps {
  employee: DirectoryEmployee | null
  tenantSlug: string
  onClose: () => void
}

export function QuickViewDialog({ employee, tenantSlug, onClose }: QuickViewDialogProps) {
  if (!employee) return null

  const fullName = `${employee.firstName} ${employee.lastName}`
  const avatarColor = getAvatarColor(fullName)
  const status = employee.workingStatus || 'office'
  const statusConfig = WORKING_STATUS_CONFIG[status] || WORKING_STATUS_CONFIG.office

  // Find the annual leave balance (first policy with "annual" or "holiday" in name, or first policy)
  const annualLeave = employee.leaveBalances.find(
    (b) => b.policyName.toLowerCase().includes('annual') || b.policyName.toLowerCase().includes('holiday')
  ) || employee.leaveBalances[0]

  return (
    <Dialog open={!!employee} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">Quick view - {fullName}</DialogTitle>
        </DialogHeader>

        {/* Header with avatar */}
        <div className="flex flex-col items-center text-center -mt-2">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full text-white text-2xl font-bold shadow-lg ring-4 ring-background"
            style={{ backgroundColor: avatarColor }}
          >
            {employee.firstName[0]}{employee.lastName[0]}
          </div>
          <h2 className="text-lg font-bold mt-3">{fullName}</h2>
          {employee.jobTitle && (
            <p className="text-sm text-muted-foreground">{employee.jobTitle}</p>
          )}

          {/* Working status */}
          {employee.status === 'ACTIVE' && employee.workingStatus && (
            <Badge
              variant="outline"
              className={`text-xs font-medium gap-1.5 px-2.5 py-1 mt-2.5 ${statusConfig.color}`}
            >
              {statusConfig.icon}
              {statusConfig.label}
            </Badge>
          )}
        </div>

        {/* Details */}
        <div className="divide-y -mx-1 mt-2">
          {employee.email && (
            <InfoRow
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value={employee.email}
              href={`mailto:${employee.email}`}
            />
          )}

          {employee.phone && (
            <InfoRow
              icon={<Phone className="h-4 w-4" />}
              label="Phone"
              value={employee.phone}
              href={`tel:${employee.phone}`}
            />
          )}

          {employee.department && (
            <InfoRow
              icon={<Building2 className="h-4 w-4" />}
              label="Department"
              value={employee.department}
            />
          )}

          {employee.startDate && (
            <InfoRow
              icon={<Calendar className="h-4 w-4" />}
              label="Start date"
              value={formatDate(employee.startDate)}
            />
          )}

          {employee.startDate && (
            <InfoRow
              icon={<Clock className="h-4 w-4" />}
              label="Length of service"
              value={formatLengthOfService(employee.startDate)}
            />
          )}

          {annualLeave && (
            <InfoRow
              icon={<Palmtree className="h-4 w-4" />}
              label={`${annualLeave.policyName} remaining`}
              value={`${annualLeave.remaining >= 0 ? annualLeave.remaining : 0} days`}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <Button asChild size="sm">
            <Link href={`/t/${tenantSlug}/employees/${employee.id}`}>
              <ExternalLink className="mr-2 h-3.5 w-3.5" />
              View full profile
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
