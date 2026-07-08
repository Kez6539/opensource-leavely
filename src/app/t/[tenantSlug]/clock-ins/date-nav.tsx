'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DateNavProps {
  tenantSlug: string
  currentDate: string // yyyy-mm-dd
}

export function DateNav({ tenantSlug, currentDate }: DateNavProps) {
  const router = useRouter()

  const navigate = (dateStr: string) => {
    router.push(`/t/${tenantSlug}/clock-ins?date=${dateStr}`)
  }

  const prev = () => {
    const d = new Date(currentDate)
    d.setDate(d.getDate() - 1)
    navigate(d.toISOString().split('T')[0])
  }

  const next = () => {
    const d = new Date(currentDate)
    d.setDate(d.getDate() + 1)
    navigate(d.toISOString().split('T')[0])
  }

  const formatted = new Date(currentDate).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={prev} className="h-8 w-8">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium min-w-[200px] text-center">{formatted}</span>
        <Input
          type="date"
          value={currentDate}
          onChange={(e) => e.target.value && navigate(e.target.value)}
          className="w-[140px] h-8 text-sm"
        />
      </div>
      <Button variant="outline" size="icon" onClick={next} className="h-8 w-8">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
