'use client'

import { useState, useTransition } from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getNotifications, markAllRead, markRead } from '@/app/t/[tenantSlug]/notifications/actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Notification {
  id: string
  type: string
  title: string
  message: string
  link: string | null
  read: boolean
  createdAt: Date
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

interface NotificationBellProps {
  tenantSlug: string
  initialCount: number
}

export function NotificationBell({ tenantSlug, initialCount }: NotificationBellProps) {
  const [count, setCount] = useState(initialCount)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loaded, setLoaded] = useState(false)
  const [, startTransition] = useTransition()
  const router = useRouter()

  function handleOpen(open: boolean) {
    if (open && !loaded) {
      startTransition(async () => {
        const data = await getNotifications(tenantSlug)
        setNotifications(data as Notification[])
        setLoaded(true)
      })
    }
  }

  function handleMarkAllRead() {
    startTransition(async () => {
      await markAllRead(tenantSlug)
      setCount(0)
      setNotifications(prev => prev.map(n => ({ ...n, read: true })))
      router.refresh()
    })
  }

  function handleClick(n: Notification) {
    if (!n.read) {
      startTransition(async () => {
        await markRead(tenantSlug, n.id)
        setCount(prev => Math.max(0, prev - 1))
        setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))
      })
    }
  }

  return (
    <DropdownMenu onOpenChange={handleOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {count > 9 ? '9+' : count}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-sm font-semibold">Notifications</span>
          {count > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-xs text-primary hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>
        <DropdownMenuSeparator />
        {notifications.length === 0 && loaded && (
          <div className="px-3 py-6 text-center text-sm text-muted-foreground">
            No notifications yet
          </div>
        )}
        {!loaded && (
          <div className="px-3 py-6 text-center text-sm text-muted-foreground">
            Loading...
          </div>
        )}
        {notifications.map((n) => (
          <DropdownMenuItem key={n.id} asChild className="cursor-pointer">
            {n.link ? (
              <Link
                href={n.link}
                onClick={() => handleClick(n)}
                className={`flex flex-col gap-0.5 px-3 py-2 ${!n.read ? 'bg-primary/5' : ''}`}
              >
                <span className="text-sm font-medium">{n.title}</span>
                <span className="text-xs text-muted-foreground line-clamp-2">{n.message}</span>
                <span className="text-xs text-muted-foreground/60">{timeAgo(n.createdAt)}</span>
              </Link>
            ) : (
              <div
                onClick={() => handleClick(n)}
                className={`flex flex-col gap-0.5 px-3 py-2 ${!n.read ? 'bg-primary/5' : ''}`}
              >
                <span className="text-sm font-medium">{n.title}</span>
                <span className="text-xs text-muted-foreground line-clamp-2">{n.message}</span>
                <span className="text-xs text-muted-foreground/60">{timeAgo(n.createdAt)}</span>
              </div>
            )}
          </DropdownMenuItem>
        ))}
        {loaded && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer justify-center">
              <Link
                href={`/t/${tenantSlug}/notifications`}
                className="text-xs text-primary font-medium"
              >
                View all notifications
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
