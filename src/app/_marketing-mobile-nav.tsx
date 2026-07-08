'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

/**
 * Marketing mobile navigation — a hamburger that opens a sheet with
 * Features / Pricing / Compare / Blog / Sign in / Start free trial links.
 * Rendered only on <md screens, both by the landing page nav in
 * `src/app/page.tsx` and the shared `MarketingNav` in
 * `src/components/marketing-layout.tsx`.
 */
export function MarketingMobileNav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open navigation menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        {/* Radix requires a DialogTitle for screen-reader users; hide it
            visually so the marketing drawer still looks clean. */}
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Menu</SheetTitle>
          </VisuallyHidden>
        </SheetHeader>
        <nav className="flex flex-col gap-2 pt-8" aria-label="Mobile navigation">
          <Link
            href="/features"
            className="px-3 py-3 text-base font-medium rounded-md hover:bg-accent transition-colors"
            onClick={close}
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="px-3 py-3 text-base font-medium rounded-md hover:bg-accent transition-colors"
            onClick={close}
          >
            Pricing
          </Link>
          <Link
            href="/compare"
            className="px-3 py-3 text-base font-medium rounded-md hover:bg-accent transition-colors"
            onClick={close}
          >
            Compare
          </Link>
          <Link
            href="/blog"
            className="px-3 py-3 text-base font-medium rounded-md hover:bg-accent transition-colors"
            onClick={close}
          >
            Blog
          </Link>
          <div className="mt-4 border-t pt-4 flex flex-col gap-2">
            {/* Sign in was missing from the mobile drawer — returning
                customers on phones could only find login by scrolling to
                the footer. */}
            <Link
              href="/login"
              className="px-3 py-3 text-base font-medium rounded-md hover:bg-accent transition-colors"
              onClick={close}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="px-3 py-3 text-base font-semibold rounded-md bg-emerald-600 text-white text-center hover:bg-emerald-700 transition-colors"
              onClick={close}
            >
              Start free trial
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
