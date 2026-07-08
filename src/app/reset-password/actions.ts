'use server'

import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function resetPasswordAction(
  _prev: { error: string },
  formData: FormData
) {
  const token = formData.get('token') as string
  const password = formData.get('password') as string
  const confirm = formData.get('confirm') as string

  if (!token) {
    return { error: 'Invalid reset link' }
  }

  if (!password || password.length < 8) {
    return { error: 'Password must be at least 8 characters' }
  }
  // (#184) Confirm-password match is enforced server-side as well as in the
  // form. A typo in either field would otherwise lock the user out of their
  // account with no way to retry from the same reset token.
  if (password !== confirm) {
    return { error: 'Passwords do not match' }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  // Atomic claim + TTL guard in one statement. Previously we read the row,
  // checked expiry, then ran a separate updateMany to mark it used — leaving
  // a window where two reset attempts could both pass the checks and both
  // update the password (the second silently winning). By folding the checks
  // into the updateMany's `where`, the DB itself enforces one-shot semantics:
  // if the token is missing, already used, or expired, count === 0 and we
  // bail before touching the user row.
  const now = new Date()
  const claimed = await prisma.$transaction(async (tx) => {
    const result = await tx.passwordReset.updateMany({
      where: {
        token,
        usedAt: null,
        expiresAt: { gt: now },
      },
      data: { usedAt: now },
    })
    if (result.count === 0) return null

    // Look up the reset row (by unique token) so we have the userId. We
    // could return it from updateMany, but Prisma's updateMany doesn't
    // surface affected rows, and splitting the queries is fine now that the
    // guard has already fired.
    const reset = await tx.passwordReset.findUnique({
      where: { token },
      select: { userId: true },
    })
    if (!reset) return null

    // (#171) Stamp passwordChangedAt so any iron-session cookie issued
    // before this moment is rejected by requireUser(). Without this, a
    // stolen cookie outlives the password reset.
    await tx.user.update({
      where: { id: reset.userId },
      data: { passwordHash, passwordChangedAt: now },
    })
    return reset
  })

  if (!claimed) {
    return { error: 'This reset link is invalid, expired, or has already been used. Please request a new one.' }
  }

  redirect('/login?success=password_reset')
}
