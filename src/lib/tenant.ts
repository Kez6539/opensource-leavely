import { cache } from 'react'
import { prisma } from '@/lib/db'
import { requireUser } from '@/lib/session'

// Wrapped in React `cache()` so a single server render that calls
// requireTenant() multiple times (dashboard fans out to 5+ actions, each of
// which re-validates the tenant) only performs one DB round trip. `cache()`
// keys by argument list and dedupes per-request, which is exactly the scope
// we want here — it does NOT cache across requests.
export const requireTenant = cache(async (tenantSlug: string) => {
  const { userId, email, name, isSuperAdmin } = await requireUser()

  // Single query: fetch tenant with the user's membership included.
  //
  // We `select` every scalar field EXCEPT `logoDataUri`. The logo is a
  // base64 data URI capped at ~80KB and is needed by only two call sites
  // (the AppShell sidebar header and the general-settings form). Pulling
  // it into the shared requireTenant() — which a single dashboard render
  // fans out to 7+ times — meant shipping ~80KB per call for data almost
  // no caller reads. Logo consumers now fetch it explicitly. Keep this
  // list in sync with new scalar fields on the Tenant model.
  const tenant = await prisma.tenant.findUnique({
    where: { slug: tenantSlug },
    select: {
      id: true,
      name: true,
      slug: true,
      country: true,
      leaveYearStartMonth: true,
      clockInEnabled: true,
      onboardingStep: true,
      onboardedAt: true,
      signupNotifiedAt: true,
      referredBy: true,
      createdAt: true,
      updatedAt: true,
      deductBankHolidays: true,
      hideEmployeeEmails: true,
      hideEmployeeList: true,
      preventLeaveCancellation: true,
      showWorkingStatus: true,
      notifyProbationEnding: true,
      notifyProbationDays: true,
      notifyWorkAnniversaries: true,
      notifyBirthdays: true,
      notifyDocumentExpiry: true,
      notifyDocumentExpiryDays: true,
      clockInRequireLocation: true,
      clockInAutoClockOut: true,
      clockInAutoClockOutTime: true,
      clockInMinBreak: true,
      clockInAllowManualEntry: true,
      memberships: {
        where: { userId },
        take: 1,
      },
    },
  })

  if (!tenant) {
    throw new Error('TENANT_NOT_FOUND')
  }

  const membership = tenant.memberships[0]
  if (!membership) {
    throw new Error('FORBIDDEN')
  }

  // Strip memberships from tenant to keep the return shape clean
  const { memberships, ...tenantData } = tenant
  void memberships

  return {
    tenant: tenantData,
    membership,
    user: { userId, email, name, isSuperAdmin },
  }
})
