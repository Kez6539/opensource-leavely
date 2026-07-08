import { prisma } from '@/lib/db'
import { sendTrialOnboardingSequenceEmail } from '@/lib/email'
import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'

const EMAIL_2_ACTION = 'trial_onboarding.email_2_sent'
const EMAIL_3_ACTION = 'trial_onboarding.email_3_sent'

type SequenceStep = {
  step: 2 | 3
  action: typeof EMAIL_2_ACTION | typeof EMAIL_3_ACTION
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

function nextDueStep(
  tenantCreatedAt: Date,
  sentActions: Set<string>,
  now: Date,
): SequenceStep | null {
  if (!sentActions.has(EMAIL_2_ACTION) && tenantCreatedAt <= daysAgo(now, 2)) {
    return { step: 2, action: EMAIL_2_ACTION }
  }

  if (
    sentActions.has(EMAIL_2_ACTION) &&
    !sentActions.has(EMAIL_3_ACTION) &&
    tenantCreatedAt <= daysAgo(now, 6)
  ) {
    return { step: 3, action: EMAIL_3_ACTION }
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
        trialEndsAt: { gte: now },
        tenant: { is: { createdAt: { lte: daysAgo(now, 2) } } },
      },
      include: {
        tenant: {
          select: {
            id: true,
            slug: true,
            createdAt: true,
            auditLogs: {
              where: { action: { in: [EMAIL_2_ACTION, EMAIL_3_ACTION] } },
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
      const tenant = billing.tenant
      const sentActions = new Set(tenant.auditLogs.map((log) => log.action))
      const due = nextDueStep(tenant.createdAt, sentActions, now)
      if (!due) {
        skipped++
        continue
      }

      const owner = tenant.memberships[0]?.user
      if (!owner?.email) {
        skipped++
        continue
      }

      try {
        await sendTrialOnboardingSequenceEmail(
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
          `[trial-onboarding-sequence] failed for tenant ${tenant.slug} step ${due.step}:`,
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
    console.error('[trial-onboarding-sequence] cron failed:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
