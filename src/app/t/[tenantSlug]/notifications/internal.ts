// NOT a 'use server' module. Functions here are intentionally internal —
// they are only callable from server-side imports, NOT from the browser.
//
// Why this exists: Next.js exposes EVERY function exported from a file
// that starts with `'use server'` as a Server Action callable from the
// client. createNotification used to live in the same file as the
// user-facing actions, which meant any authenticated browser could call
// `createNotification(targetTenantId, anyUserId, anyType, anyTitle,
// anyMessage, anyLink)` and inject phishing-style notifications onto any
// user in any tenant. By moving it here we keep it server-only without
// having to add per-call auth that the legitimate callers (notify-on-
// approve, notify-on-cancel, etc) don't need.
//
// (Round 5 follow-up — same anti-pattern as the getExpenseReceipt fix
// in round 4 commit 7a30654.)

import { prisma } from '@/lib/db'

export async function createNotification(
  tenantId: string,
  userId: string,
  type: string,
  title: string,
  message: string,
  link?: string,
) {
  return prisma.notification.create({
    data: { tenantId, userId, type, title, message, link },
  })
}
