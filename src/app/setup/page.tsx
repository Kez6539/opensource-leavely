import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'
import { SetupForm } from './setup-form'

function companyFromEmail(email: string): string {
  const domain = (email.split('@')[1] || '').split('.')[0] || ''
  const generic = new Set(['gmail', 'outlook', 'hotmail', 'yahoo', 'icloud', 'live', 'aol', 'protonmail', 'proton', 'me'])
  if (!domain || generic.has(domain.toLowerCase())) return ''
  return domain.charAt(0).toUpperCase() + domain.slice(1)
}

export const metadata = {
  title: 'Set up your workspace · Leavely',
  // The setup page is reachable only by signed-in users who haven't built a
  // workspace yet — no SEO value, and indexing it would let scanners that
  // do crawl the magic-link target land on a logged-out form.
  robots: { index: false, follow: false },
}

export default async function SetupPage() {
  const session = await getSession()
  if (!session.userId || !session.email) {
    redirect('/login')
  }

  const membership = await prisma.membership.findFirst({
    where: { userId: session.userId },
    include: { tenant: { select: { slug: true, onboardedAt: true } } },
  })
  if (membership) {
    redirect(membership.tenant.onboardedAt
      ? `/t/${membership.tenant.slug}/dashboard`
      : `/t/${membership.tenant.slug}/onboarding`)
  }

  return <SetupForm defaultCompanyName={companyFromEmail(session.email)} />
}
