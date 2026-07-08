'use server'

import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'
import { redirect } from 'next/navigation'
import { PRICE_PER_SEAT_GBP } from '@/lib/plans'

function generateCode(name: string): string {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .slice(0, 12)
  const suffix = Math.random().toString(36).slice(2, 6)
  return `${base}-${suffix}`
}

export async function registerPartner(_prev: { error: string }, formData: FormData) {
  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const company = (formData.get('company') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim()

  if (!name || !email) {
    return { error: 'Name and email are required' }
  }

  // Check if partner already exists
  const existing = await prisma.partner.findUnique({ where: { email } })
  if (existing) {
    return { error: 'A partner account with this email already exists. Please sign in.' }
  }

  // Check if user account exists, or create one
  let user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    // We'll create a user account — they can set a password later or use OAuth
    user = await prisma.user.create({
      data: { email, name, authProvider: 'CREDENTIALS' },
    })
  }

  const referralCode = generateCode(company || name)

  await prisma.partner.create({
    data: {
      name,
      email,
      company: company || null,
      phone: phone || null,
      referralCode,
      userId: user.id,
    },
  })

  // Log them in
  const session = await getSession()
  session.userId = user.id
  session.email = user.email
  session.name = user.name ?? undefined
  session.loggedInAt = Date.now()
  await session.save()

  redirect('/partners/dashboard')
}

export async function getPartnerDashboard() {
  const session = await getSession()
  if (!session.userId) redirect('/login')

  const partner = await prisma.partner.findFirst({
    where: { userId: session.userId },
  })

  if (!partner) redirect('/partners/register')

  // Get referred tenants with billing info
  const referrals = await prisma.tenant.findMany({
    where: { referredBy: partner.id },
    include: {
      billing: { select: { status: true, planKey: true } },
      _count: { select: { employees: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  // Get commissions
  const commissions = await prisma.commission.findMany({
    where: { partnerId: partner.id },
    orderBy: { createdAt: 'desc' },
    take: 24,
  })

  // (#142) Commission.amount is now Prisma.Decimal — `sum + c.amount` would
  // string-concatenate or throw TS errors depending on the call site.
  // Number()-wrap on the way in. Two-decimal money is well within the safe
  // integer range so the precision loss is bounded by the column itself.
  const totalEarned = commissions.reduce((sum, c) => sum + Number(c.amount), 0)
  const totalPending = commissions.filter((c) => c.status === 'pending').reduce((sum, c) => sum + Number(c.amount), 0)
  const totalPaid = commissions.filter((c) => c.status === 'paid').reduce((sum, c) => sum + Number(c.amount), 0)

  // Calculate current monthly revenue from active referred clients
  const activeReferrals = referrals.filter((r) => r.billing?.status === 'ACTIVE')
  const monthlyRevenue = activeReferrals.reduce((sum, r) => sum + r._count.employees * PRICE_PER_SEAT_GBP, 0)
  const monthlyCommission = monthlyRevenue * partner.commissionRate

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://leavely.online'

  return {
    partner: {
      name: partner.name,
      email: partner.email,
      company: partner.company,
      referralCode: partner.referralCode,
      referralLink: `${baseUrl}/register?ref=${partner.referralCode}`,
      commissionRate: partner.commissionRate,
      status: partner.status,
    },
    stats: {
      totalReferrals: referrals.length,
      activeClients: activeReferrals.length,
      monthlyRevenue,
      monthlyCommission,
      totalEarned,
      totalPending,
      totalPaid,
    },
    referrals: referrals.map((r) => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      status: r.billing?.status ?? 'TRIALING',
      employees: r._count.employees,
      createdAt: r.createdAt.toISOString(),
    })),
    commissions: commissions.map((c) => ({
      id: c.id,
      amount: Number(c.amount),
      revenue: Number(c.revenue),
      period: c.period,
      status: c.status,
      paidAt: c.paidAt?.toISOString() ?? null,
    })),
  }
}
