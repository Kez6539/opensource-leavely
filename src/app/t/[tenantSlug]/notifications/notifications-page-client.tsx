'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CardSection, EmptyState, ConfirmDialog } from '@/components/shared'
import {
  Bell,
  BellOff,
  CheckCheck,
  Trash2,
  ExternalLink,
  Calendar,
  Megaphone,
  AlertCircle,
  Clock,
} from 'lucide-react'
import { markRead, markAllRead, deleteNotification, clearAllNotifications } from './actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'

interface Notification {
  id: string
  type: string
  title: string
  message: string
  link: string | null
  read: boolean
  createdAt: string
}

interface NotificationsPageClientProps {
  tenantSlug: string
  initialNotifications: Notification[]
}

function getNotificationIcon(type: string) {
  switch (type) {
    case 'leave_submitted':
    case 'leave_approved':
    case 'leave_rejected':
    case 'leave_cancelled':
      return <Calendar className="h-4 w-4" />
    case 'sickness_reported':
      return <AlertCircle className="h-4 w-4" />
    case 'announcement':
      return <Megaphone className="h-4 w-4" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

function getNotificationColor(type: string) {
  switch (type) {
    case 'leave_approved':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
    case 'leave_rejected':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    case 'leave_submitted':
    case 'leave_cancelled':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    case 'sickness_reported':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    case 'announcement':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}

function formatTypeLabel(type: string): string {
  return type
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function NotificationsPageClient({
  tenantSlug,
  initialNotifications,
}: NotificationsPageClientProps) {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [clearAllOpen, setClearAllOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const unreadCount = notifications.filter((n) => !n.read).length
  const filtered = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications

  function handleMarkRead(id: string) {
    startTransition(async () => {
      await markRead(tenantSlug, id)
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
      router.refresh()
    })
  }

  function handleMarkAllRead() {
    startTransition(async () => {
      await markAllRead(tenantSlug)
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
      router.refresh()
      toast.success('All notifications marked as read')
    })
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteNotification(tenantSlug, id)
      setNotifications((prev) => prev.filter((n) => n.id !== id))
      router.refresh()
      toast.success('Notification deleted')
    })
  }

  // (#165) Wrap in ConfirmDialog — the previous gating was just
  // `disabled={isPending}`, so an accidental click wiped the entire
  // notification history with no undo.
  function handleClearAll() {
    setClearAllOpen(true)
  }
  function confirmClearAll() {
    startTransition(async () => {
      await clearAllNotifications(tenantSlug)
      setNotifications([])
      setClearAllOpen(false)
      router.refresh()
      toast.success('All notifications cleared')
    })
  }

  return (
    <div className="space-y-4">
      {/* Action bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
            <Badge variant="secondary" className="ml-1.5 text-[10px]">
              {notifications.length}
            </Badge>
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            Unread
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-1.5 text-[10px]">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllRead}
              disabled={isPending}
            >
              <CheckCheck className="h-4 w-4 mr-1.5" />
              Mark all read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              disabled={isPending}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-1.5" />
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Notification list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<BellOff className="h-10 w-10" />}
          title={filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
          description={
            filter === 'unread'
              ? "You're all caught up!"
              : 'Notifications will appear here when there are leave requests, approvals, or announcements.'
          }
        />
      ) : (
        <CardSection>
          <div className="divide-y">
            {filtered.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-3 py-3 first:pt-0 last:pb-0 ${
                  !n.read ? 'bg-primary/[0.02]' : ''
                }`}
              >
                {/* Icon */}
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${getNotificationColor(
                    n.type
                  )}`}
                >
                  {getNotificationIcon(n.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${!n.read ? 'font-semibold' : 'font-medium'}`}>
                          {n.title}
                        </span>
                        {!n.read && (
                          <span className="flex h-2 w-2 shrink-0 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-xs text-muted-foreground/70 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatDate(n.createdAt)}
                        </span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                          {formatTypeLabel(n.type)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {n.link && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <Link href={n.link}>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  )}
                  {!n.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleMarkRead(n.id)}
                      disabled={isPending}
                      title="Mark as read"
                    >
                      <CheckCheck className="h-3.5 w-3.5" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => handleDelete(n.id)}
                    disabled={isPending}
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardSection>
      )}

      <ConfirmDialog
        open={clearAllOpen}
        onOpenChange={setClearAllOpen}
        title="Clear all notifications?"
        description="This will remove every notification for your account. Cannot be undone."
        confirmLabel="Clear all"
        onConfirm={confirmClearAll}
        loading={isPending}
      />
    </div>
  )
}
