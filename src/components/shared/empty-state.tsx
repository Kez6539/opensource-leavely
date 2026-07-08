import { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  illustration?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, illustration, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {illustration ? (
        <div className="mb-6">{illustration}</div>
      ) : icon ? (
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 text-indigo-400 shadow-sm">
          {icon}
        </div>
      ) : null}
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-2 max-w-sm">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
