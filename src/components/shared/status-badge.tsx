import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const statusConfig: Record<string, { dot: string; bg: string; text: string }> = {
  PENDING: {
    dot: 'bg-amber-500',
    bg: 'bg-amber-50 border-amber-200/60 dark:bg-amber-950/30 dark:border-amber-800',
    text: 'text-amber-700 dark:text-amber-300',
  },
  APPROVED: {
    dot: 'bg-emerald-500',
    bg: 'bg-emerald-50 border-emerald-200/60 dark:bg-emerald-950/30 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  REJECTED: {
    dot: 'bg-red-500',
    bg: 'bg-red-50 border-red-200/60 dark:bg-red-950/30 dark:border-red-800',
    text: 'text-red-700 dark:text-red-300',
  },
  CANCELLED: {
    dot: 'bg-gray-400',
    bg: 'bg-gray-50 border-gray-200/60 dark:bg-gray-900/40 dark:border-gray-700',
    text: 'text-gray-600 dark:text-gray-300',
  },
  ACTIVE: {
    dot: 'bg-emerald-500',
    bg: 'bg-emerald-50 border-emerald-200/60 dark:bg-emerald-950/30 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  INACTIVE: {
    dot: 'bg-gray-400',
    bg: 'bg-gray-50 border-gray-200/60 dark:bg-gray-900/40 dark:border-gray-700',
    text: 'text-gray-600 dark:text-gray-300',
  },
  TRIALING: {
    dot: 'bg-blue-500',
    bg: 'bg-blue-50 border-blue-200/60 dark:bg-blue-950/30 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-300',
  },
  PAST_DUE: {
    dot: 'bg-orange-500',
    bg: 'bg-orange-50 border-orange-200/60 dark:bg-orange-950/30 dark:border-orange-800',
    text: 'text-orange-700 dark:text-orange-300',
  },
  CANCELED: {
    dot: 'bg-red-500',
    bg: 'bg-red-50 border-red-200/60 dark:bg-red-950/30 dark:border-red-800',
    text: 'text-red-700 dark:text-red-300',
  },
  OWNER: {
    dot: 'bg-purple-500',
    bg: 'bg-purple-50 border-purple-200/60 dark:bg-purple-950/30 dark:border-purple-800',
    text: 'text-purple-700 dark:text-purple-300',
  },
  ADMIN: {
    dot: 'bg-blue-500',
    bg: 'bg-blue-50 border-blue-200/60 dark:bg-blue-950/30 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-300',
  },
  MANAGER: {
    dot: 'bg-indigo-500',
    bg: 'bg-indigo-50 border-indigo-200/60 dark:bg-indigo-950/30 dark:border-indigo-800',
    text: 'text-indigo-700 dark:text-indigo-300',
  },
  EMPLOYEE: {
    dot: 'bg-gray-400',
    bg: 'bg-gray-50 border-gray-200/60 dark:bg-gray-900/40 dark:border-gray-700',
    text: 'text-gray-600 dark:text-gray-300',
  },
  DRAFT: {
    dot: 'bg-amber-500',
    bg: 'bg-amber-50 border-amber-200/60 dark:bg-amber-950/30 dark:border-amber-800',
    text: 'text-amber-700 dark:text-amber-300',
  },
  PUBLISHED: {
    dot: 'bg-emerald-500',
    bg: 'bg-emerald-50 border-emerald-200/60 dark:bg-emerald-950/30 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  ARCHIVED: {
    dot: 'bg-gray-400',
    bg: 'bg-gray-50 border-gray-200/60 dark:bg-gray-900/40 dark:border-gray-700',
    text: 'text-gray-600 dark:text-gray-300',
  },
  NOT_STARTED: {
    dot: 'bg-gray-400',
    bg: 'bg-gray-50 border-gray-200/60 dark:bg-gray-900/40 dark:border-gray-700',
    text: 'text-gray-600 dark:text-gray-300',
  },
  ON_TRACK: {
    dot: 'bg-blue-500',
    bg: 'bg-blue-50 border-blue-200/60 dark:bg-blue-950/30 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-300',
  },
  OVERDUE: {
    dot: 'bg-red-500',
    bg: 'bg-red-50 border-red-200/60 dark:bg-red-950/30 dark:border-red-800',
    text: 'text-red-700 dark:text-red-300',
  },
  COMPLETED: {
    dot: 'bg-emerald-500',
    bg: 'bg-emerald-50 border-emerald-200/60 dark:bg-emerald-950/30 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  PAID: {
    dot: 'bg-blue-500',
    bg: 'bg-blue-50 border-blue-200/60 dark:bg-blue-950/30 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-300',
  },
}

const fallback = {
  dot: 'bg-gray-400',
  bg: 'bg-gray-50 border-gray-200/60 dark:bg-gray-900/40 dark:border-gray-700',
  text: 'text-gray-600 dark:text-gray-300',
}

function formatLabel(status: string) {
  return status
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/^./, (c) => c.toUpperCase())
}

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] ?? fallback
  return (
    <Badge variant="outline" className={cn('text-xs font-medium gap-1.5 px-2.5 py-0.5', config.bg, config.text)}>
      <span className={cn('inline-block h-1.5 w-1.5 rounded-full', config.dot)} />
      {formatLabel(status)}
    </Badge>
  )
}
