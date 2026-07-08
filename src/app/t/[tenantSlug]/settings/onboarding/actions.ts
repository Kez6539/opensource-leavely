'use server'

import { prisma } from '@/lib/db'
import { requireTenant } from '@/lib/tenant'
import { assertAtLeast } from '@/lib/rbac'
import { logAudit } from '@/lib/audit'
import { requireWriteAccess } from '@/lib/paywall'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function getOnboardingTemplates(tenantSlug: string) {
  // Audit follow-up: ADMIN+ only.
  const { tenant, membership } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  return prisma.onboardingTemplate.findMany({
    where: { tenantId: tenant.id },
    include: { items: { orderBy: { sortOrder: 'asc' } } },
    orderBy: { name: 'asc' },
  })
}

const CreateTemplateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export async function createOnboardingTemplate(tenantSlug: string, data: { name: string }) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)
  const parsed = CreateTemplateSchema.parse(data)

  const template = await prisma.onboardingTemplate.create({
    data: { name: parsed.name, tenantId: tenant.id },
  })

  await logAudit({
    action: 'onboarding_template.created',
    entity: 'OnboardingTemplate',
    entityId: template.id,
    userId: user.userId,
    tenantId: tenant.id,
  })

  revalidatePath(`/t/${tenantSlug}/settings/onboarding`)
  return { success: true, id: template.id }
}

export async function deleteOnboardingTemplate(tenantSlug: string, templateId: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  const existing = await prisma.onboardingTemplate.findFirst({
    where: { id: templateId, tenantId: tenant.id },
  })
  if (!existing) throw new Error('Template not found')

  await prisma.onboardingTemplate.delete({ where: { id: templateId } })

  await logAudit({
    action: 'onboarding_template.deleted',
    entity: 'OnboardingTemplate',
    entityId: templateId,
    userId: user.userId,
    tenantId: tenant.id,
  })

  revalidatePath(`/t/${tenantSlug}/settings/onboarding`)
  return { success: true }
}

const AddItemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  assignTo: z.enum(['HR', 'MANAGER', 'EMPLOYEE', 'IT']).default('HR'),
})

export async function addTemplateItem(
  tenantSlug: string,
  templateId: string,
  data: { title: string; description?: string; assignTo?: 'HR' | 'MANAGER' | 'EMPLOYEE' | 'IT' }
) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)
  const parsed = AddItemSchema.parse(data)

  const template = await prisma.onboardingTemplate.findFirst({
    where: { id: templateId, tenantId: tenant.id },
  })
  if (!template) throw new Error('Template not found')

  const maxOrder = await prisma.onboardingTemplateItem.aggregate({
    where: { templateId },
    _max: { sortOrder: true },
  })

  const item = await prisma.onboardingTemplateItem.create({
    data: {
      templateId,
      title: parsed.title,
      description: parsed.description || null,
      assignTo: parsed.assignTo,
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
    },
  })

  await logAudit({
    action: 'onboarding_template_item.created',
    entity: 'OnboardingTemplateItem',
    entityId: item.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { templateId },
  })

  revalidatePath(`/t/${tenantSlug}/settings/onboarding`)
  return { success: true, id: item.id }
}

export async function deleteTemplateItem(tenantSlug: string, itemId: string) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  const item = await prisma.onboardingTemplateItem.findFirst({
    where: { id: itemId, template: { tenantId: tenant.id } },
  })
  if (!item) throw new Error('Item not found')

  await prisma.onboardingTemplateItem.delete({ where: { id: itemId } })

  await logAudit({
    action: 'onboarding_template_item.deleted',
    entity: 'OnboardingTemplateItem',
    entityId: itemId,
    userId: user.userId,
    tenantId: tenant.id,
  })

  revalidatePath(`/t/${tenantSlug}/settings/onboarding`)
  return { success: true }
}

// ── Starter template library ────────────────────────────────────────
// Curated, opinionated templates so admins can get going in one click
// instead of staring at an empty page. Tweakable after import — the
// items become real OnboardingTemplateItem rows owned by the tenant.

type AssignTo = 'HR' | 'MANAGER' | 'EMPLOYEE' | 'IT'

interface StarterTemplate {
  key: string
  name: string
  description: string
  emoji: string
  items: { title: string; description?: string; assignTo: AssignTo }[]
}

const STARTER_TEMPLATES: StarterTemplate[] = [
  {
    key: 'first-day-essentials',
    name: 'First day essentials',
    description: 'The bare-minimum every new starter needs on day one.',
    emoji: '👋',
    items: [
      { title: 'Send signed contract & offer letter', assignTo: 'HR', description: 'File a copy in the employee record.' },
      { title: 'Collect P45 / starter checklist', assignTo: 'HR' },
      { title: 'Set up payroll details (NI, bank, tax code)', assignTo: 'HR' },
      { title: 'Issue laptop & peripherals', assignTo: 'IT' },
      { title: 'Create email + Slack/Teams account', assignTo: 'IT' },
      { title: 'Building tour & fire exits', assignTo: 'MANAGER' },
      { title: 'Intro coffee with the team', assignTo: 'MANAGER' },
      { title: 'Read the staff handbook', assignTo: 'EMPLOYEE' },
    ],
  },
  {
    key: 'office-based-starter',
    name: 'Office-based starter',
    description: 'For staff working from the office full or part time.',
    emoji: '🏢',
    items: [
      { title: 'Assign desk & locker', assignTo: 'MANAGER' },
      { title: 'Issue door fob / access card', assignTo: 'IT' },
      { title: 'Brief on parking & travel options', assignTo: 'HR' },
      { title: 'Health & safety walkthrough', assignTo: 'HR' },
      { title: 'Add to fire warden roster (if applicable)', assignTo: 'MANAGER' },
      { title: 'Show kitchen, supplies & rotas', assignTo: 'MANAGER' },
      { title: 'Confirm working hours & break policy', assignTo: 'EMPLOYEE' },
    ],
  },
  {
    key: 'remote-starter',
    name: 'Remote starter',
    description: 'For new hires working from home or hybrid.',
    emoji: '💻',
    items: [
      { title: 'Ship laptop, monitor, headset & keyboard', assignTo: 'IT' },
      { title: 'Set up VPN & SSO access', assignTo: 'IT' },
      { title: 'Add to all relevant Slack/Teams channels', assignTo: 'IT' },
      { title: 'Brief on home-working policy & expense claims', assignTo: 'HR' },
      { title: 'Walk through async comms norms', assignTo: 'MANAGER' },
      { title: 'Schedule first-week 1:1s with whole team', assignTo: 'MANAGER' },
      { title: 'Set up weekly team video call', assignTo: 'EMPLOYEE' },
    ],
  },
  {
    key: 'sales-starter',
    name: 'Sales rep starter pack',
    description: 'Get a new rep ringing the phones in week one.',
    emoji: '📞',
    items: [
      { title: 'CRM access + pipeline walkthrough', assignTo: 'IT' },
      { title: 'Dialler / softphone set up & tested', assignTo: 'IT' },
      { title: 'Product training session', assignTo: 'MANAGER' },
      { title: 'Shadow 5 live calls with senior rep', assignTo: 'EMPLOYEE' },
      { title: 'Run through pricing, comms scripts & objection library', assignTo: 'MANAGER' },
      { title: 'Set first 30 / 60 / 90 day targets', assignTo: 'MANAGER' },
      { title: 'Issue commission plan & sign', assignTo: 'HR' },
    ],
  },
  {
    key: 'manager-starter',
    name: 'New manager / team lead',
    description: 'Extra steps when the new starter is leading a team.',
    emoji: '👥',
    items: [
      { title: 'Review headcount, budget & current OKRs', assignTo: 'HR' },
      { title: 'Intro 1:1s with every direct report (week 1)', assignTo: 'EMPLOYEE' },
      { title: 'Grant approval rights in HR system', assignTo: 'IT' },
      { title: 'Brief on company L&D budget & policy', assignTo: 'HR' },
      { title: 'Set up weekly team meeting cadence', assignTo: 'EMPLOYEE' },
      { title: 'Read open performance reviews / development plans', assignTo: 'EMPLOYEE' },
      { title: 'Confirm escalation paths & on-call (if applicable)', assignTo: 'MANAGER' },
    ],
  },
]

export async function getStarterTemplates() {
  return STARTER_TEMPLATES.map((t) => ({
    key: t.key,
    name: t.name,
    description: t.description,
    emoji: t.emoji,
    itemCount: t.items.length,
  }))
}

export async function createTemplateFromStarter(
  tenantSlug: string,
  starterKey: string
) {
  const { tenant, membership, user } = await requireTenant(tenantSlug)
  assertAtLeast(membership, 'ADMIN')
  await requireWriteAccess(tenant.id)

  const starter = STARTER_TEMPLATES.find((t) => t.key === starterKey)
  if (!starter) throw new Error('Starter template not found')

  // Avoid duplicates: if a template with the same name already exists for
  // this tenant, append a counter so we don't shadow the previous import.
  const existingNames = new Set(
    (
      await prisma.onboardingTemplate.findMany({
        where: { tenantId: tenant.id, name: { startsWith: starter.name } },
        select: { name: true },
      })
    ).map((t) => t.name)
  )
  let finalName = starter.name
  let n = 2
  while (existingNames.has(finalName)) {
    finalName = `${starter.name} (${n})`
    n++
  }

  const template = await prisma.onboardingTemplate.create({
    data: {
      tenantId: tenant.id,
      name: finalName,
      items: {
        create: starter.items.map((item, i) => ({
          title: item.title,
          description: item.description ?? null,
          assignTo: item.assignTo,
          sortOrder: i,
        })),
      },
    },
  })

  await logAudit({
    action: 'onboarding_template.created_from_starter',
    entity: 'OnboardingTemplate',
    entityId: template.id,
    userId: user.userId,
    tenantId: tenant.id,
    metadata: { starterKey, itemCount: starter.items.length },
  })

  revalidatePath(`/t/${tenantSlug}/settings/onboarding`)
  return { success: true, id: template.id, name: finalName }
}
