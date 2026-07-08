'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Pencil, Mail, Building2, Home, Laptop, Plane, Thermometer, CalendarOff } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { updateWorkingStatus } from '../actions'

const AVATAR_COLORS = [
  'from-indigo-500 to-purple-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-cyan-500 to-blue-600',
  'from-violet-500 to-purple-600',
]

function getAvatarGradient(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

const WORKING_STATUS_CONFIG: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  office: {
    label: 'In Office',
    icon: <Building2 className="h-3 w-3" />,
    color:
      'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800',
  },
  home: {
    label: 'Working from Home',
    icon: <Home className="h-3 w-3" />,
    color:
      'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800',
  },
  hybrid: {
    label: 'Hybrid',
    icon: <Laptop className="h-3 w-3" />,
    color:
      'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950/30 dark:text-violet-300 dark:border-violet-800',
  },
  away: {
    label: 'Away',
    icon: <Plane className="h-3 w-3" />,
    color:
      'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800',
  },
  sick: {
    label: 'Sick',
    icon: <Thermometer className="h-3 w-3" />,
    color:
      'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800',
  },
  leave: {
    label: 'On Leave',
    icon: <CalendarOff className="h-3 w-3" />,
    color:
      'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/40 dark:text-gray-300 dark:border-gray-700',
  },
}

const STATUS_OPTIONS = ['office', 'home', 'hybrid', 'away', 'sick', 'leave'] as const

interface ProfileHeaderProps {
  tenantSlug: string
  employeeId: string
  firstName: string
  lastName: string
  email: string | null
  jobTitle: string | null
  department: string | null
  workingStatus: string | null
  canManage: boolean
}

export function ProfileHeader({
  tenantSlug,
  employeeId,
  firstName,
  lastName,
  email,
  jobTitle,
  department,
  workingStatus,
  canManage,
}: ProfileHeaderProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const fullName = `${firstName} ${lastName}`
  const gradient = getAvatarGradient(fullName)
  const status = workingStatus || 'office'
  const statusConfig = WORKING_STATUS_CONFIG[status] || WORKING_STATUS_CONFIG.office

  async function handleStatusChange(newStatus: string) {
    setIsUpdating(true)
    try {
      const result = await updateWorkingStatus(tenantSlug, employeeId, { workingStatus: newStatus })
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      router.refresh()
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to update status')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="rounded-xl border bg-card p-6 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Avatar */}
        <div className="relative group">
          <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-white text-2xl font-bold shadow-lg ring-4 ring-white dark:ring-gray-800`}>
            {firstName[0]}{lastName[0]}
          </div>
          {canManage && (
            <Link
              href={`/t/${tenantSlug}/employees/${employeeId}/edit`}
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-gray-800 border shadow-sm transition-opacity md:opacity-0 md:group-hover:opacity-100"
              aria-label="Edit profile picture"
            >
              <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
            </Link>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold tracking-tight">{fullName}</h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-muted-foreground">
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Mail className="h-3.5 w-3.5" />
                {email}
              </a>
            )}
            {jobTitle && <span>{jobTitle}</span>}
            {department && (
              <span className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5" />
                {department}
              </span>
            )}
          </div>

          {/* Working status */}
          <div className="flex items-center gap-2 mt-3">
            <Badge
              variant="outline"
              className={`text-xs font-medium gap-1.5 px-2.5 py-1 ${statusConfig.color}`}
            >
              {statusConfig.icon}
              {statusConfig.label}
            </Badge>
            {canManage && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="xs"
                    disabled={isUpdating}
                    className="text-xs text-muted-foreground"
                  >
                    {isUpdating ? 'Updating...' : 'Change'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="min-w-[160px]">
                  {STATUS_OPTIONS.map((opt) => {
                    const cfg = WORKING_STATUS_CONFIG[opt]
                    return (
                      <DropdownMenuItem
                        key={opt}
                        onClick={() => handleStatusChange(opt)}
                        className="gap-2"
                      >
                        {cfg.icon}
                        {cfg.label}
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Edit button */}
        {canManage && (
          <Link href={`/t/${tenantSlug}/employees/${employeeId}/edit`} className="shrink-0">
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Edit profile
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
