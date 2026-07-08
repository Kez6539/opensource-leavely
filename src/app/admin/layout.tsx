import { requireSuperAdmin } from '@/lib/admin'
import Link from 'next/link'
import { ReactNode } from 'react'
import { LayoutDashboard, Building2, Users, LogOut, Handshake } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/tenants', label: 'Tenants', icon: Building2 },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/partners', label: 'Partners', icon: Handshake },
]

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireSuperAdmin()

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 border-r bg-gray-50/50 flex flex-col">
        <div className="px-4 py-5 border-b">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 text-white font-bold text-sm">
              A
            </div>
            <span className="font-semibold text-sm">Admin Panel</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Back to app
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
