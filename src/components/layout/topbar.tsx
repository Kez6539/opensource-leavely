'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarNav } from './sidebar-nav'
import { TenantSwitcher, TenantOption } from './tenant-switcher'
import { AddTimeOffDialog } from './add-time-off-dialog'
import { NotificationBell } from './notification-bell'
import { Menu, LogOut, User, Shield, Search, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'
import { searchEmployees, SearchResult } from './search-actions'
import { FeedbackDialog } from './feedback-dialog'

interface TopbarProps {
  tenantName: string
  tenantSlug: string
  userName?: string
  role?: string
  userTenants?: TenantOption[]
  isSuperAdmin?: boolean
  clockInEnabled?: boolean
  unreadCount?: number
}

function formatDate() {
  const now = new Date()
  const day = now.toLocaleDateString('en-GB', { weekday: 'short' })
  const date = now.getDate()
  const suffix = date === 1 || date === 21 || date === 31 ? 'st' : date === 2 || date === 22 ? 'nd' : date === 3 || date === 23 ? 'rd' : 'th'
  const month = now.toLocaleDateString('en-GB', { month: 'short' })
  const year = now.getFullYear()
  return `${day} ${date}${suffix} ${month} ${year}`
}

export function Topbar({ tenantName, tenantSlug, userName, role, userTenants, isSuperAdmin, clockInEnabled, unreadCount }: TopbarProps) {
  const [open, setOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const tenants = userTenants ?? [{ slug: tenantSlug, name: tenantName }]

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const doSearch = useCallback(
    async (q: string) => {
      if (!q.trim()) {
        setResults([])
        setShowDropdown(false)
        return
      }
      setLoading(true)
      try {
        const data = await searchEmployees(tenantSlug, q)
        setResults(data)
        setShowDropdown(true)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    },
    [tenantSlug]
  )

  // Clean up debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  const handleChange = (value: string) => {
    setQuery(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => doSearch(value), 300)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowDropdown(false)
      setQuery('')
    }
  }

  // Close dropdown on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.03)]">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-sidebar">
          <div className="px-5 pt-6 pb-4 border-b border-sidebar-border">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white font-bold text-sm">
                L
              </div>
              <span className="font-semibold text-sm text-sidebar-foreground tracking-tight">Leavely</span>
            </div>
            <TenantSwitcher currentSlug={tenantSlug} tenants={tenants} />
          </div>
          <SidebarNav tenantSlug={tenantSlug} role={role} isSuperAdmin={isSuperAdmin} clockInEnabled={clockInEnabled} onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Left: company name + date */}
      <div className="hidden md:flex items-center gap-3">
        {tenants.length > 1 ? (
          <TenantSwitcher currentSlug={tenantSlug} tenants={tenants} />
        ) : (
          <span className="text-sm font-semibold text-foreground">{tenantName}</span>
        )}
        <span className="text-sm text-muted-foreground">{formatDate()}</span>
      </div>

      {/* Centre: search (desktop only) */}
      <div className="hidden sm:flex flex-1 justify-center max-w-sm mx-auto">
        <div className="relative w-full" ref={containerRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            className="pl-9 h-9 bg-muted/50 border-0 focus-visible:ring-1"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (results.length > 0) setShowDropdown(true) }}
          />
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border rounded-md shadow-lg z-50 max-h-80 overflow-auto">
              {loading && (
                <div className="px-4 py-3 text-sm text-muted-foreground">Searching...</div>
              )}
              {!loading && results.length === 0 && query.trim() && (
                <div className="px-4 py-3 text-sm text-muted-foreground">No employees found</div>
              )}
              {!loading && results.map((emp) => (
                <Link
                  key={emp.id}
                  href={`/t/${tenantSlug}/employees/${emp.id}`}
                  className="flex flex-col gap-0.5 px-4 py-2.5 hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => { setShowDropdown(false); setQuery('') }}
                >
                  <span className="text-sm font-medium text-foreground">
                    {emp.firstName} {emp.lastName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {[emp.department, emp.jobTitle].filter(Boolean).join(' · ') || 'No department or title'}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile: spacer to push right-side actions to edge */}
      <div className="flex-1 sm:hidden" />

      {/* Mobile search button — opens full-screen overlay */}
      <Sheet open={mobileSearchOpen} onOpenChange={setMobileSearchOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="sm:hidden" aria-label="Search employees">
            <Search className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="h-full w-full p-0 sm:hidden">
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 border-b p-4">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <Input
                autoFocus
                placeholder="Search employees..."
                className="h-10 border-0 focus-visible:ring-0 shadow-none px-0"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="flex-1 overflow-auto">
              {loading && (
                <div className="px-4 py-3 text-sm text-muted-foreground">Searching...</div>
              )}
              {!loading && results.length === 0 && query.trim() && (
                <div className="px-4 py-3 text-sm text-muted-foreground">No employees found</div>
              )}
              {!loading && results.length === 0 && !query.trim() && (
                <div className="px-4 py-3 text-sm text-muted-foreground">Start typing to search employees...</div>
              )}
              {!loading && results.map((emp) => (
                <Link
                  key={emp.id}
                  href={`/t/${tenantSlug}/employees/${emp.id}`}
                  className="flex flex-col gap-0.5 px-4 py-3 border-b hover:bg-accent transition-colors"
                  onClick={() => { setMobileSearchOpen(false); setQuery('') }}
                >
                  <span className="text-sm font-medium text-foreground">
                    {emp.firstName} {emp.lastName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {[emp.department, emp.jobTitle].filter(Boolean).join(' · ') || 'No department or title'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Right: CTA + user menu */}
      <div className="flex items-center gap-3">
        <Link
          href={`/t/${tenantSlug}/changelog`}
          className="inline-flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title="What's New"
        >
          <Sparkles className="h-4 w-4" />
          <span className="sr-only">What&apos;s New</span>
        </Link>
        <FeedbackDialog tenantSlug={tenantSlug} />
        <NotificationBell tenantSlug={tenantSlug} initialCount={unreadCount ?? 0} />
        <AddTimeOffDialog tenantSlug={tenantSlug} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-accent">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {userName?.charAt(0)?.toUpperCase() ?? 'U'}
              </div>
              <span className="text-sm font-medium hidden sm:inline">{userName ?? 'User'}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled className="text-xs text-muted-foreground">
              Signed in as {userName}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/t/${tenantSlug}/profile`}>
                <User className="h-4 w-4 mr-2" />
                My Profile
              </Link>
            </DropdownMenuItem>
            {isSuperAdmin && (
              <DropdownMenuItem asChild>
                <Link href="/admin">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin Panel
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => { import('@/app/login/logout-action').then(m => m.logoutAction()) }}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
