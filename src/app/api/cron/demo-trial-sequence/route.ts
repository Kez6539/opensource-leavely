import { prisma } from '@/lib/db'
import {
  DEMO_TRIAL_SEQUENCE_EMAIL_1_SENT,
  DEMO_TRIAL_SEQUENCE_EMAIL_2_SENT,
  DEMO_TRIAL_SEQUENCE_EMAIL_3_SENT,
  DEMO_TRIAL_SEQUENCE_PENDING,
} from '@/lib/demo-trial-sequence'
import { sendDemoTrialSequenceEmail } from '@/lib/email'
import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return timingSafeEqual(aBuf, bBuf)
}

function daysAgo(now: Date, days: number): Date {
  return new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
}

function nextStep(source: string): {
  step: 1 | 2 | 3
  nextSource: string
} | null {
  if (source === DEMO_TRIAL_SEQUENCE_PENDING) {
    return { step: 1, nextSource: DEMO_TRIAL_SEQUENCE_EMAIL_1_SENT }
  }
  if (source === DEMO_TRIAL_SEQUENCE_EMAIL_1_SENT) {
    return { step: 2, nextSource: DEMO_TRIAL_SEQUENCE_EMAIL_2_SENT }
  }
  if (source === DEMO_TRIAL_SEQUENCE_EMAIL_2_SENT) {
    return { step: 3, nextSource: DEMO_TRIAL_SEQUENCE_EMAIL_3_SENT }
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
    const candidates = await prisma.signupLead.findMany({
      where: {
        convertedAt: null,
        OR: [
          { source: DEMO_TRIAL_SEQUENCE_PENDING, createdAt: { lte: daysAgo(now, 1) } },
          { source: DEMO_TRIAL_SEQUENCE_EMAIL_1_SENT, createdAt: { lte: daysAgo(now, 3) } },
          { source: DEMO_TRIAL_SEQUENCE_EMAIL_2_SENT, createdAt: { lte: daysAgo(now, 7) } },
        ],
      },
      orderBy: { createdAt: 'asc' },
      take: 100,
    })

    let sent = 0
    let skipped = 0
    let failed = 0
    let converted = 0

    for (const lead of candidates) {
      const transition = nextStep(lead.source)
      if (!transition) {
        skipped++
        continue
      }

      const existingUser = await prisma.user.findUnique({
        where: { email: lead.email },
        select: { memberships: { select: { id: true }, take: 1 } },
      })
      if (existingUser && existingUser.memberships.length > 0) {
        await prisma.signupLead.update({
          where: { id: lead.id },
          data: { convertedAt: now },
        })
        converted++
        continue
      }

      try {
        await sendDemoTrialSequenceEmail(lead.email, transition.step)
        await prisma.signupLead.update({
          where: { id: lead.id },
          data: { source: transition.nextSource },
        })
        sent++
      } catch (err) {
        console.error(`[demo-trial-sequence] failed for lead ${lead.id}:`, err)
        failed++
      }
    }

    return NextResponse.json({
      ok: true,
      considered: candidates.length,
      sent,
      skipped,
      converted,
      failed,
    })
  } catch (err) {
    console.error('[demo-trial-sequence] cron failed:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

