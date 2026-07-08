import { getSession } from './session'
import { prisma } from './db'
import { redirect } from 'next/navigation'

export async function requireSuperAdmin() {
  const session = await getSession()
  if (!session.userId) {
    redirect('/login')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  })

  // Block disabled super-admins. requireUser() destroys the session on
  // disabledAt, but /admin paths can be reached from server actions that
  // call requireSuperAdmin directly without going through requireUser.
  if (!user || !user.isSuperAdmin || user.disabledAt) {
    redirect('/')
  }

  return { user, session }
}
