'use client'

import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared'
import { FolderIllustration } from '@/components/shared/illustrations'
import { Plus } from 'lucide-react'

// Props kept loose on purpose: the page still passes documents + tenantSlug
// but this component ignores them until R2 upload is wired up (#76).
interface Props {
  documents: unknown[]
  tenantSlug: string
}

// TODO(#76): Restore full document list + upload once R2 storage is wired up.
// The previous implementation saved a DB row with a fabricated filePath but
// never uploaded any bytes, so downloads always 404'd. Until an R2 bucket
// binding exists (see follow-up ticket), we hide the broken flow entirely
// rather than shipping it to prospects.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DocumentsList(_props: Props) {
  return (
    <div>
      <div className="flex justify-end mb-4">
        {/* Wrapper span gives the title tooltip a non-disabled target */}
        <span
          className="inline-block"
          title="Document upload coming soon"
          aria-label="Document upload coming soon"
        >
          <Button disabled aria-disabled="true">
            <Plus className="mr-2 h-4 w-4" />
            Upload document
          </Button>
        </span>
      </div>

      <EmptyState
        illustration={<FolderIllustration className="w-36 h-36" />}
        title="Document storage coming soon"
        description="We're wiring up secure document storage. Upload will be enabled once it's ready."
      />
    </div>
  )
}
