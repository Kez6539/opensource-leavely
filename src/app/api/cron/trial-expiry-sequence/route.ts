import { prisma } from '@/lib/db'
import { sendTrialExpirySequenceEmail } from '@/lib/email'
import { shouldSendEmail } from '@/lib/email-preferences'
import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'

const EMAIL_1_ACTION = 'trial_expiry_sequence.email_1_sent'
const EMAIL_2_ACTION = 'trial_expiry_sequence.email_2_sent'
const EMAIL_3_ACTION = 'trial_expiry_sequence.email_3_sent'

type SequenceAction = typeof EMAIL_1_ACTION | typeof EMAIL_2_ACTION | typeof EMAIL_3_ACTION

type SequenceStep = {
  step: 1 | 2 | 3
  action: SequenceAction
}

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return timingSafeEqual(aBuf, bBuf)
}

function daysAgo(now: Date, days: number): Date {
  return new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
}

function daysFromNow(now: Date, days: number): Date {
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000)
}

function nextDueStep(
  trialEndsAt: Date,
  sentActions: Set<string>,
  now: Date,
): SequenceStep | null {
  if (!sentActions.has(EMAIL_3_ACTION) && trialEndsAt <= daysFromNow(now, 1)) {
    return { step: 3, action: EMAIL_3_ACTION }
  }

  if (
    !sentActions.has(EMAIL_2_ACTION) &&
    trialEndsAt <= daysFromNow(now, 2)
  ) {
    return { step: 2, action: EMAIL_2_ACTION }
  }

  if (!sentActions.has(EMAIL_1_ACTION) && trialEndsAt <= daysFromNow(now, 4)) {
    return { step: 1, action: EMAIL_1_ACTION }
  }

  return null
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  const expected = `Bearer ${process.env.CRON_SECRET}`
  if (!process.env.CRON_SECRET || !authHeader || !safeEqual(authHeader, expected)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = new Date()
    const candidates = await prisma.tenantBilling.findMany({
      where: {
        status: 'TRIALING',
        trialEndsAt: { gte: now, lte: daysFromNow(now, 4) },
        tenant: { is: { createdAt: { lte: daysAgo(now, 10) } } },
      },
      include: {
        tenant: {
          select: {
            id: true,
            slug: true,
            auditLogs: {
              where: {
                action: { in: [EMAIL_1_ACTION, EMAIL_2_ACTION, EMAIL_3_ACTION] },
              },
              select: { action: true },
            },
            memberships: {
              where: { role: 'OWNER' },
              include: { user: { select: { id: true, email: true, name: true } } },
              take: 1,
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
      take: 100,
    })

    let sent = 0
    let skipped = 0
    let failed = 0

    for (const billing of candidates) {
      if (!billing.trialEndsAt) {
        skipped++
        continue
      }

      const tenant = billing.tenant
      const sentActions = new Set(tenant.auditLogs.map((log) => log.action))
      const due = nextDueStep(billing.trialEndsAt, sentActions, now)
      if (!due) {
        skipped++
        continue
      }

      const owner = tenant.memberships[0]?.user
      if (!owner?.email) {
        skipped++
        continue
      }

      const canSend = await shouldSendEmail(owner.id, 'trialWarnings')
      if (!canSend) {
        skipped++
        continue
      }

      try {
        await sendTrialExpirySequenceEmail(
          owner.email,
          owner.name ?? 'there',
          tenant.slug,
          due.step,
        )
        await prisma.auditLog.create({
          data: {
            action: due.action,
            entity: 'Tenant',
            entityId: tenant.id,
            tenantId: tenant.id,
            userId: owner.id,
            metadata: { step: due.step },
          },
        })
        sent++
      } catch (err) {
        console.error(
          `[trial-expiry-sequence] failed for tenant ${tenant.slug} step ${due.step}:`,
          err,
        )
        failed++
      }
    }

    return NextResponse.json({
      ok: true,
      considered: candidates.length,
      sent,
      skipped,
      failed,
    })
  } catch (err) {
    console.error('[trial-expiry-sequence] cron failed:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
