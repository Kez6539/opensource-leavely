import { timingSafeEqual } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { DEMO_TENANT_SLUG } from '@/lib/demo-seed'
import { sendTrialMilestoneRiskAlert } from '@/lib/email'
import { trackServerEvent } from '@/lib/server-analytics'

const ALERT_ACTION = 'trial_milestones.at_risk_alert_sent'

// Demo / seeded test tenants are permanently TRIALING and never "activate",
// so they would otherwise generate an at-risk alert on every reset-demo cycle.
// We skip the shared demo tenant by slug and any owner on a *.test domain
// (owner@acme.test, superadmin@leavely.test, etc.) so real trials still alert.
function isTestEmail(email: string): boolean {
  return /\.test$/i.test(email.trim())
}

const MILESTONES = [
  {
    key: 'account_setup',
    action: 'trial_milestone.account_setup',
    label: 'Account setup',
  },
  {
    key: 'first_leave_request',
    action: 'trial_milestone.first_leave_request',
    label: 'First leave request',
  },
  {
    key: 'first_approval',
    action: 'trial_milestone.first_approval',
    label: 'First approval',
  },
  {
    key: 'calendar_view',
    action: 'trial_milestone.calendar_view',
    label: 'Calendar view',
  },
] as const

type Milestone = (typeof MILESTONES)[number]
type MilestoneKey = Milestone['key']
type MilestoneState = Record<MilestoneKey, Date | null>

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return timingSafeEqual(aBuf, bBuf)
}

function hoursAgo(now: Date, hours: number): Date {
  return new Date(now.getTime() - hours * 60 * 60 * 1000)
}

function trialAgeHours(createdAt: Date, now: Date): number {
  return Math.max(0, Math.floor((now.getTime() - createdAt.getTime()) / (60 * 60 * 1000)))
}

async function getMilestoneState(tenantId: string, onboardedAt: Date | null): Promise<MilestoneState> {
  const [firstLeaveRequest, firstApproval, calendarView] = await Promise.all([
    prisma.leaveRequest.findFirst({
      where: { tenantId },
      orderBy: { createdAt: 'asc' },
      select: { createdAt: true },
    }),
    prisma.leaveRequest.findFirst({
      where: { tenantId, status: 'APPROVED', decidedAt: { not: null } },
      orderBy: { decidedAt: 'asc' },
      select: { decidedAt: true },
    }),
    prisma.auditLog.findFirst({
      where: { tenantId, action: 'trial_milestone.calendar_view' },
      orderBy: { createdAt: 'asc' },
      select: { createdAt: true },
    }),
  ])

  return {
    account_setup: onboardedAt,
    first_leave_request: firstLeaveRequest?.createdAt ?? null,
    first_approval: firstApproval?.decidedAt ?? null,
    calendar_view: calendarView?.createdAt ?? null,
  }
}

async function recordCompletedMilestones(input: {
  tenantId: string
  tenantSlug: string
  ownerUserId?: string
  existingActions: Set<string>
  state: MilestoneState
}) {
  let recorded = 0

  for (const milestone of MILESTONES) {
    const occurredAt = input.state[milestone.key]
    if (!occurredAt || input.existingActions.has(milestone.action)) continue

    await prisma.auditLog.create({
      data: {
        action: milestone.action,
        entity: 'Tenant',
        entityId: input.tenantId,
        tenantId: input.tenantId,
        userId: input.ownerUserId,
        metadata: {
          milestone: milestone.key,
          occurredAt: occurredAt.toISOString(),
          source: 'trial-milestones-cron',
        },
      },
    })
    await trackServerEvent('trial_milestone_completed', {
      distinctId: input.ownerUserId ?? input.tenantId,
      tenantId: input.tenantId,
      userId: input.ownerUserId,
      properties: {
        tenant_slug: input.tenantSlug,
        milestone: milestone.key,
        occurred_at: occurredAt.toISOString(),
        source: 'trial-milestones-cron',
      },
    })
    input.existingActions.add(milestone.action)
    recorded++
  }

  return recorded
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
        tenant: {
          is: {
            createdAt: { lte: hoursAgo(now, 48) },
            // Never nag about the shared demo tenant — it's perpetually
            // trialing and gets wiped/reseeded by the reset-demo cron.
            slug: { not: DEMO_TENANT_SLUG },
          },
        },
      },
      include: {
        tenant: {
          select: {
            id: true,
            name: true,
            slug: true,
            createdAt: true,
            onboardedAt: true,
            auditLogs: {
              where: {
                action: { in: [...MILESTONES.map((milestone) => milestone.action), ALERT_ACTION] },
              },
              select: { action: true },
            },
            memberships: {
              where: { role: 'OWNER' },
              orderBy: { createdAt: 'asc' },
              take: 1,
              include: { user: { select: { id: true, email: true, name: true } } },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
      take: 100,
    })

    let milestonesRecorded = 0
    let alertsSent = 0
    let skipped = 0
    let failed = 0

    for (const billing of candidates) {
      const tenant = billing.tenant
      const owner = tenant.memberships[0]?.user
      const existingActions = new Set(tenant.auditLogs.map((log) => log.action))

      try {
        const state = await getMilestoneState(tenant.id, tenant.onboardedAt)
        milestonesRecorded += await recordCompletedMilestones({
          tenantId: tenant.id,
          tenantSlug: tenant.slug,
          ownerUserId: owner?.id,
          existingActions,
          state,
        })

        const missingMilestones = MILESTONES.filter((milestone) => !state[milestone.key])
        if (missingMilestones.length === 0 || existingActions.has(ALERT_ACTION)) {
          skipped++
          continue
        }

        if (!owner?.email || isTestEmail(owner.email)) {
          // No owner to email, or a seeded test account (*.test) we don't chase.
          skipped++
          continue
        }

        const completedMilestones = MILESTONES.filter((milestone) => state[milestone.key])
        const ageHours = trialAgeHours(tenant.createdAt, now)
        await sendTrialMilestoneRiskAlert({
          companyName: tenant.name,
          tenantSlug: tenant.slug,
          ownerName: owner.name ?? 'there',
          ownerEmail: owner.email,
          trialAgeHours: ageHours,
          missingMilestones: missingMilestones.map((milestone) => milestone.label),
          completedMilestones: completedMilestones.map((milestone) => milestone.label),
        })
        await prisma.auditLog.create({
          data: {
            action: ALERT_ACTION,
            entity: 'Tenant',
            entityId: tenant.id,
            tenantId: tenant.id,
            userId: owner.id,
            metadata: {
              trialAgeHours: ageHours,
              missingMilestones: missingMilestones.map((milestone) => milestone.key),
              completedMilestones: completedMilestones.map((milestone) => milestone.key),
            },
          },
        })
        await trackServerEvent('trial_at_risk', {
          distinctId: owner.id,
          tenantId: tenant.id,
          userId: owner.id,
          properties: {
            tenant_slug: tenant.slug,
            trial_age_hours: ageHours,
            missing_milestones: missingMilestones.map((milestone) => milestone.key),
            completed_milestones: completedMilestones.map((milestone) => milestone.key),
          },
        })
        existingActions.add(ALERT_ACTION)
        alertsSent++
      } catch (err) {
        console.error(`[trial-milestones] failed for tenant ${tenant.slug}:`, err)
        failed++
      }
    }

    return NextResponse.json({
      ok: true,
      considered: candidates.length,
      milestonesRecorded,
      alertsSent,
      skipped,
      failed,
    })
  } catch (err) {
    console.error('[trial-milestones] cron failed:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
