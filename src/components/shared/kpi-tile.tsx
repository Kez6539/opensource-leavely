import { ReactNode } from 'react'

interface KpiTileProps {
  label: string
  value: string | number
  icon?: ReactNode
  accent?: string
  iconBg?: string
}

export function KpiTile({ label, value, icon, accent, iconBg }: KpiTileProps) {
  return (
    <div className={`rounded-lg border bg-card p-4 shadow-sm border-l-4 ${accent ?? 'border-l-primary'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold mt-1 tracking-tight">{value}</p>
        </div>
        {icon && (
          <div className={`h-10 w-10 flex items-center justify-center rounded-lg ${iconBg ?? 'bg-primary/10 text-primary'}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
