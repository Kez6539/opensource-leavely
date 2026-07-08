import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock prisma
vi.mock('@/lib/db', () => ({
  prisma: {
    tenantBilling: {
      findUnique: vi.fn(),
    },
  },
}))

// Mock the session so requireWriteAccess's demo write-guard (assertNotDemo)
// has a session to read. Default to a non-demo session; individual tests
// override isDemo where they need to exercise the demo branch.
const mockSession: { isDemo?: boolean } = { isDemo: false }
vi.mock('@/lib/session', () => ({
  getSession: vi.fn(async () => mockSession),
}))

import {
  getPaywallStatus,
  requireWriteAccess,
  assertNotDemo,
  DemoReadOnlyError,
  SubscriptionRequiredError,
} from '../paywall'
import { UserError } from '@/lib/action-result'
import { prisma } from '@/lib/db'

const mockFindUnique = prisma.tenantBilling.findUnique as ReturnType<typeof vi.fn>

describe('paywall', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockSession.isDemo = false
  })

  describe('getPaywallStatus', () => {
    it('returns readonly when no billing record (fail-closed)', async () => {
      mockFindUnique.mockResolvedValue(null)
      // Intentionally fail-closed since 19c1f12 — every signup flow
      // creates a TenantBilling row, so a missing row means legacy /
      // manual / corrupted data and should not get silent free access.
      expect(await getPaywallStatus('t1')).toBe('readonly')
    })

    it('returns active for ACTIVE status', async () => {
      mockFindUnique.mockResolvedValue({ status: 'ACTIVE' })
      expect(await getPaywallStatus('t1')).toBe('active')
    })

    it('returns active for TRIALING status', async () => {
      mockFindUnique.mockResolvedValue({ status: 'TRIALING' })
      expect(await getPaywallStatus('t1')).toBe('active')
    })

    it('returns past_due for PAST_DUE status', async () => {
      mockFindUnique.mockResolvedValue({ status: 'PAST_DUE' })
      expect(await getPaywallStatus('t1')).toBe('past_due')
    })

    it('returns readonly for CANCELED status', async () => {
      mockFindUnique.mockResolvedValue({ status: 'CANCELED' })
      expect(await getPaywallStatus('t1')).toBe('readonly')
    })

    it('returns readonly for INCOMPLETE status', async () => {
      mockFindUnique.mockResolvedValue({ status: 'INCOMPLETE' })
      expect(await getPaywallStatus('t1')).toBe('readonly')
    })
  })

  describe('requireWriteAccess', () => {
    it('does not throw for active tenant', async () => {
      mockFindUnique.mockResolvedValue({ status: 'ACTIVE' })
      await expect(requireWriteAccess('t1')).resolves.toBeUndefined()
    })

    it('does not throw for past_due tenant', async () => {
      mockFindUnique.mockResolvedValue({ status: 'PAST_DUE' })
      await expect(requireWriteAccess('t1')).resolves.toBeUndefined()
    })

    it('throws SubscriptionRequiredError (digest SUBSCRIPTION_REQUIRED) for canceled tenant', async () => {
      mockFindUnique.mockResolvedValue({ status: 'CANCELED' })
      const err = await requireWriteAccess('t1').then(
        () => null,
        (e) => e
      )
      expect(err).toBeInstanceOf(SubscriptionRequiredError)
      // UserError subclass → withUserErrors-wrapped actions surface the
      // friendly message as a structured result instead of crashing.
      expect(err).toBeInstanceOf(UserError)
      // Sentinel survives Next's prod message-masking via error.digest.
      expect(err.digest).toBe('SUBSCRIPTION_REQUIRED')
      expect(err.message).toMatch(/trial has ended|subscription is inactive/)
    })

    it('throws DemoReadOnlyError (digest DEMO_READONLY) for a demo session even on an active tenant', async () => {
      mockSession.isDemo = true
      mockFindUnique.mockResolvedValue({ status: 'ACTIVE' })
      const err = await requireWriteAccess('t1').then(
        () => null,
        (e) => e
      )
      expect(err).toBeInstanceOf(DemoReadOnlyError)
      expect(err.digest).toBe('DEMO_READONLY')
    })
  })

  describe('assertNotDemo', () => {
    it('resolves for a non-demo session', async () => {
      mockSession.isDemo = false
      await expect(assertNotDemo()).resolves.toBeUndefined()
    })

    it('throws DemoReadOnlyError with a friendly message for a demo session', async () => {
      mockSession.isDemo = true
      const err = await assertNotDemo().then(
        () => null,
        (e) => e
      )
      expect(err).toBeInstanceOf(DemoReadOnlyError)
      expect(err).toBeInstanceOf(UserError)
      expect(err.digest).toBe('DEMO_READONLY')
      expect(err.message).toContain('demo workspace')
    })
  })
})
