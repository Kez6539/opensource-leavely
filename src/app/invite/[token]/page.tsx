import { getInviteByToken } from './actions'
import { notFound } from 'next/navigation'
import { InviteAcceptButton } from './accept-button'
import { InviteSignupForm } from './invite-signup-form'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Users, CheckCircle2, Clock } from 'lucide-react'
import Link from 'next/link'
import { getSession } from '@/lib/session'

export default async function InvitePage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const invite = await getInviteByToken(token)

  if (!invite) notFound()

  // Already-used invite
  if (invite.used) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/30">
        <Card className="w-full max-w-sm text-center">
          <CardContent className="pt-8 pb-8">
            <CheckCircle2 className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-xl font-semibold mb-2">Invite Already Used</h1>
            <p className="text-sm text-muted-foreground">This invite has already been accepted.</p>
            <Link href="/login" className="text-sm text-primary hover:underline mt-4 inline-block">
              Sign in
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Expired invite
  if (invite.expired) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/30">
        <Card className="w-full max-w-sm text-center">
          <CardContent className="pt-8 pb-8">
            <Clock className="h-10 w-10 mx-auto text-amber-500 mb-4" />
            <h1 className="text-xl font-semibold mb-2">Invite Expired</h1>
            <p className="text-sm text-muted-foreground">
              This invite link has expired. Please ask an admin at{' '}
              <strong>{invite.tenant.name}</strong> to send you a new one.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // If the user isn't logged in, render an inline signup form so they can
  // create an account and join in one step (instead of dead-ending at the
  // accept button which calls requireUser() and throws).
  const session = await getSession()
  if (!session.userId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-muted/30">
        <Card className="w-full max-w-sm">
          <CardHeader className="pb-2 text-center">
            <Users className="h-10 w-10 mx-auto text-primary mb-2" />
            <h1 className="text-xl font-semibold">You&apos;ve been invited</h1>
            <p className="text-sm text-muted-foreground">
              Join <strong>{invite.tenant.name}</strong> as {invite.role.toLowerCase()}
            </p>
          </CardHeader>
          <CardContent>
            <InviteSignupForm token={token} inviteEmail={invite.email} />
            <p className="text-center text-xs text-muted-foreground mt-4">
              Already have an account?{' '}
              <Link href={`/login?redirect=/invite/${token}`} className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-sm text-center">
        <CardHeader className="pb-2">
          <Users className="h-10 w-10 mx-auto text-primary mb-2" />
          <h1 className="text-xl font-semibold">You&apos;ve been invited</h1>
          <p className="text-sm text-muted-foreground">
            Join <strong>{invite.tenant.name}</strong> as {invite.role.toLowerCase()}
          </p>
        </CardHeader>
        <CardContent>
          <InviteAcceptButton token={token} />
        </CardContent>
      </Card>
    </div>
  )
}
