import { cn } from '@/lib/utils'

interface FormErrorBannerProps {
  message: string | null | undefined
  className?: string
}

/**
 * Inline error banner used by forms to surface server/validation errors.
 * Dark-mode variants ensure the banner stays legible in both themes.
 */
export function FormErrorBanner({ message, className }: FormErrorBannerProps) {
  if (!message) return null
  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700',
        'dark:border-red-800 dark:bg-red-950/30 dark:text-red-300',
        className,
      )}
    >
      {message}
    </div>
  )
}
