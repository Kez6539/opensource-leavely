'use server'

import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'
import { logAudit } from '@/lib/audit'
import { rateLimit, RateLimitError } from '@/lib/rate-limit'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function loginAction(_prev: { error: string }, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const redirectTo = formData.get('redirect') as string | null

  if (!email || !password) {
    return { error: 'Email and password are required' }
  }

  try {
    await rateLimit('login:' + email, 5, 60_000)
  } catch (e) {
    if (e instanceof RateLimitError) {
      return { error: 'Too many attempts. Please try again later.' }
    }
    throw e
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return { error: 'Invalid email or password' }
  }

  // OAuth-only users cannot log in with password. Use a generic message that
  // doesn't leak which provider the account is linked to (info disclosure).
  if (!user.passwordHash) {
    return { error: 'This account uses social sign-in. Please use one of the social sign-in buttons.' }
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    return { error: 'Invalid email or password' }
  }

  if (user.disabledAt) {
    return { error: 'This account has been disabled. Please contact your administrator.' }
  }

  const session = await getSession()
  session.userId = user.id
  session.email = user.email
  session.name = user.name ?? undefined
  session.isSuperAdmin = user.isSuperAdmin
  session.isDemo = false
  session.loggedInAt = Date.now()
  await session.save()

  // Best-effort: stamp last-login so super admin can see activity. Failures
  // are non-fatal — never block a user's login on a write to this column.
  prisma.user
    .update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })
    .catch((err) => console.error('[login] failed to stamp lastLoginAt:', err))

  // Find first tenant membership to redirect to
  const membership = await prisma.membership.findFirst({
    where: { userId: user.id },
    include: { tenant: true },
  })

  if (membership) {
    await logAudit({
      action: 'user.login',
      entity: 'User',
      entityId: user.id,
      tenantId: membership.tenantId,
      userId: user.id,
    })
    // Support redirect parameter (e.g. from QR clock-in). Must be a same-origin
    // path. `startsWith('/')` alone is not enough — `//evil.com` also passes
    // and the browser interprets a protocol-relative URL as off-site, so we'd
    // be a one-hop open redirect. Reject any path that starts with `//` or
    // contains a scheme.
    if (
      redirectTo &&
      redirectTo.startsWith('/') &&
      !redirectTo.startsWith('//') &&
      !redirectTo.includes('\\')
    ) {
      redirect(redirectTo)
    }
    redirect(`/t/${membership.tenant.slug}/dashboard`)
  }

  // Superadmin with no tenant membership goes to admin panel
  if (user.isSuperAdmin) {
    redirect('/admin')
  }

  redirect('/')
}
