import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SearchX } from 'lucide-react'
import Link from 'next/link'

export default function TenantNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30">
      <Card className="w-full max-w-sm text-center">
        <CardContent className="pt-8 pb-8 space-y-4">
          <SearchX className="mx-auto h-12 w-12 text-muted-foreground" />
          <h1 className="text-2xl font-semibold">Organisation Not Found</h1>
          <p className="text-sm text-muted-foreground">
            The organisation you&apos;re looking for doesn&apos;t exist or the URL is incorrect.
          </p>
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
