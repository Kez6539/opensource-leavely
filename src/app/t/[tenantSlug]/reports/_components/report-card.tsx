import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface ReportCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

export function ReportCard({ icon: Icon, title, description, href }: ReportCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="rounded-lg border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/30 group-hover:bg-accent/30">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {description}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50 group-hover:text-primary transition-colors mt-0.5" />
        </div>
        <div className="mt-4 pt-3 border-t">
          <span className="text-xs font-medium text-primary group-hover:underline">
            Generate new report
          </span>
        </div>
      </div>
    </Link>
  )
}
