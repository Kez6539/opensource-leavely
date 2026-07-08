import { ReactNode } from 'react'

export interface CardSectionProps {
  title?: ReactNode
  description?: string
  children: ReactNode
  className?: string
  action?: ReactNode
}

export function CardSection({ title, description, children, className, action }: CardSectionProps) {
  return (
    <div className={`rounded-lg border bg-card p-5 shadow-sm ${className ?? ''}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && (
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            )}
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  )
}
