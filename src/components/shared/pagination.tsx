import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  searchParams?: Record<string, string | undefined>
}

export function Pagination({ currentPage, totalPages, basePath, searchParams }: PaginationProps) {
  function buildHref(page: number) {
    const params = new URLSearchParams()
    if (searchParams) {
      for (const [key, value] of Object.entries(searchParams)) {
        if (value) params.set(key, value)
      }
    }
    params.set('page', String(page))
    return `${basePath}?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-center gap-2 text-sm">
      {currentPage > 1 ? (
        <Button variant="outline" size="sm" asChild>
          <Link href={buildHref(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
      )}
      <span className="px-3 py-1 text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Button variant="outline" size="sm" asChild>
          <Link href={buildHref(currentPage + 1)}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      )}
    </div>
  )
}
