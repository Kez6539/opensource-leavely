'use server'

import { requireTenant } from '@/lib/tenant'
import { assertNotDemo } from '@/lib/paywall'
import { logAudit } from '@/lib/audit'
import { escapeHtml, sendMail } from '@/lib/email'
import { UserError, withUserErrors, type ActionResult } from '@/lib/action-result'

export async function submitFeedback(
  tenantSlug: string,
  category: string,
  message: string
): Promise<ActionResult> {
  return withUserErrors(async () => {
  await assertNotDemo()
  if (!message.trim()) throw new UserError('Message is required')
  if (message.trim().length > 5000) throw new UserError('Message too long (max 5000 characters)')
  if (!['bug', 'feature', 'general'].includes(category)) {
    throw new UserError('Invalid category')
  }

  const { tenant, user } = await requireTenant(tenantSlug)

  const categoryLabels: Record<string, string> = {
    bug: 'Bug Report',
    feature: 'Feature Request',
    general: 'General Feedback',
  }

  // Every user-controlled value is escaped before HTML interpolation —
  // see the audit follow-up in src/lib/email.ts.
  const safe = {
    userName: escapeHtml(user.name ?? 'Unknown'),
    userEmail: escapeHtml(user.email),
    tenantName: escapeHtml(tenant.name),
    category: escapeHtml(categoryLabels[category]),
    message: escapeHtml(message),
  }

  // Routed through the central sendMail() so we get the production
  // RESEND_API_KEY guard, monitored replyTo, plaintext fallback, and
  // sanitised Subject header. The local Resend client this file used to
  // create bypassed all four.
  try {
    await sendMail({
      to: 'hello@leavely.online',
      subject: `[${categoryLabels[category]}] Feedback from ${user.name ?? user.email} (${tenant.name})`,
      html: `
        <h2>${safe.category}</h2>
        <table style="border-collapse:collapse;margin:16px 0;">
          <tr><td style="padding:6px 12px 6px 0;color:#6b7280;font-size:14px;">From</td><td style="padding:6px 0;font-size:14px;font-weight:600;">${safe.userName} (${safe.userEmail})</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#6b7280;font-size:14px;">Company</td><td style="padding:6px 0;font-size:14px;font-weight:600;">${safe.tenantName}</td></tr>
          <tr><td style="padding:6px 12px 6px 0;color:#6b7280;font-size:14px;">Category</td><td style="padding:6px 0;font-size:14px;font-weight:600;">${safe.category}</td></tr>
        </table>
        <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;margin-top:16px;">
          <p style="white-space:pre-wrap;color:#111827;font-size:14px;line-height:1.6;margin:0;">${safe.message}</p>
        </div>
      `,
    })
  } catch (err) {
    console.error('Failed to send feedback email:', err)
  }

  await logAudit({
    action: 'feedback.submitted',
    entity: 'Feedback',
    userId: user.userId,
    tenantId: tenant.id,
    metadata: {
      category,
      categoryLabel: categoryLabels[category],
      message: message.substring(0, 500),
      userName: user.name,
      userEmail: user.email,
      tenantName: tenant.name,
    },
  })

  })
}
