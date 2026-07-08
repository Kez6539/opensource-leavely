import { prisma } from '@/lib/db'

type PreferenceKey = 'leaveUpdates' | 'announcements' | 'trialWarnings' | 'marketing'

/**
 * Check if a user has opted in to a specific email type.
 * Returns true if the preference is not set (default: all enabled).
 */
export async function shouldSendEmail(userId: string, key: PreferenceKey): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { emailPreferences: true },
  })
  if (!user) return false
  const prefs = (user.emailPreferences ?? {}) as Record<string, boolean>
  return prefs[key] !== false
}
