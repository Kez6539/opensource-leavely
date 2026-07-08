import { PageHeader } from './page-header'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Generic loading skeleton used by routes that don't need a bespoke
 * loading state. Renders the PageHeader (so the sidebar/topbar layout
 * doesn't shift), then a skeleton grid that approximates a table or
 * card-grid view. (#162, #163)
 *
 * Each route's `loading.tsx` can pass its own title to keep the chrome
 * recognisable while the RSC fetches.
 */
export function GenericPageLoading({ title, description }: { title?: string; description?: string }) {
  return (
    <div>
      {title && <PageHeader title={title} description={description} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 rounded-md" />
        ))}
      </div>
    </div>
  )
}
