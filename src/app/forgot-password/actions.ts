'use server'

import { prisma } from '@/lib/db'
import { sendPasswordResetEmail, appBaseUrl } from '@/lib/email'
import { rateLimit, RateLimitError } from '@/lib/rate-limit'
import { captureServerError } from '@/lib/error-capture'
import crypto from 'crypto'

export async function forgotPasswordAction(
  _prev: { error: string; success: boolean },
  formData: FormData
) {
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  if (!email) {
    return { error: 'Email is required', success: false }
  }

  try {
    await rateLimit('reset:' + email, 3, 300_000)
  } catch (e) {
    if (e instanceof RateLimitError) {
      return { error: e.message, success: false }
    }
    throw e
  }

  const user = await prisma.user.findUnique({ where: { email } })

  // Always show success to prevent email enumeration
  if (!user || !user.passwordHash) {
    return { error: '', success: true }
  }

  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

  await prisma.passwordReset.create({
    data: { token, userId: user.id, expiresAt },
  })

  const resetUrl = `${appBaseUrl()}/reset-password?token=${token}`

  // Log send failures rather than swallowing them silently. The user still
  // gets the generic "check your email" screen (so we don't leak whether the
  // address exists), but now ops can tell when Resend is down from the
  // server logs + Sentry instead of investigating after the fact.
  try {
    await sendPasswordResetEmail(email, resetUrl)
  } catch (err) {
    console.error('[forgot-password] sendPasswordResetEmail failed:', err)
    captureServerError(err, { where: 'forgot-password.send', email })
  }

  return { error: '', success: true }
}
