import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { NextRequest } from 'next/server'

// Mock prisma — only the models the invoice.payment_failed path touches.
vi.mock('@/lib/db', () => ({
  prisma: {
    processedStripeEvent: {
      create: vi.fn(),
      delete: vi.fn(),
    },
    tenantBilling: {
      findFirst: vi.fn(),
      update: vi.fn(),
    },
    membership: {
      findFirst: vi.fn(),
    },
  },
}))

vi.mock('@/lib/stripe', () => ({
  getStripe: vi.fn(),
}))

vi.mock('@/lib/audit', () => ({
  logAudit: vi.fn(),
}))

vi.mock('@/lib/email', () => ({
  sendPaymentFailedEmail: vi.fn(),
  sendTrialExpiringEmail: vi.fn(),
}))

vi.mock('@/lib/signup-notify', () => ({
  notifyFounderOfSignupOnce: vi.fn(),
}))

import { POST } from '../route'
import { prisma } from '@/lib/db'
import { getStripe } from '@/lib/stripe'
import { logAudit } from '@/lib/audit'
import { sendPaymentFailedEmail } from '@/lib/email'

const mockCreateEvent = prisma.processedStripeEvent.create as ReturnType<typeof vi.fn>
const mockDeleteEvent = prisma.processedStripeEvent.delete as ReturnType<typeof vi.fn>
const mockBillingFindFirst = prisma.tenantBilling.findFirst as ReturnType<typeof vi.fn>
const mockBillingUpdate = prisma.tenantBilling.update as ReturnType<typeof vi.fn>
const mockMembershipFindFirst = prisma.membership.findFirst as ReturnType<typeof vi.fn>
const mockGetStripe = getStripe as ReturnType<typeof vi.fn>
const mockLogAudit = logAudit as ReturnType<typeof vi.fn>
const mockSendPaymentFailedEmail = sendPaymentFailedEmail as ReturnType<typeof vi.fn>

const EVENT_ID = 'evt_test_pf_1'

function makePaymentFailedEvent() {
  return {
    id: EVENT_ID,
    type: 'invoice.payment_failed',
    data: {
      object: {
        id: 'in_test_1',
        customer: 'cus_test_1',
        attempt_count: 2,
      },
    },
  }
}

/** Minimal stand-in for NextRequest — the handler only uses .text() and .headers.get(). */
function makeRequest(): NextRequest {
  return {
    text: async () => '{}',
    headers: { get: (k: string) => (k === 'stripe-signature' ? 'sig_test' : null) },
  } as unknown as NextRequest
}

describe('stripe webhook — invoice.payment_failed', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test'
    mockGetStripe.mockReturnValue({
      webhooks: { constructEvent: vi.fn(() => makePaymentFailedEvent()) },
      // The handler re-fetches the invoice to guard against stale
      // redeliveries; default to "still open" so the dunning path runs.
      invoices: { retrieve: vi.fn(async () => ({ id: 'in_test_1', status: 'open' })) },
    })
    mockCreateEvent.mockResolvedValue({ eventId: EVENT_ID })
    mockBillingFindFirst.mockResolvedValue({
      id: 'bil_1',
      tenantId: 'ten_1',
      status: 'ACTIVE',
      tenant: { slug: 'acme' },
    })
    mockBillingUpdate.mockResolvedValue({})
    mockMembershipFindFirst.mockResolvedValue({
      user: { email: 'owner@acme.test', name: 'Alice' },
    })
    mockLogAudit.mockResolvedValue({})
    mockDeleteEvent.mockResolvedValue({})
  })

  it('marks PAST_DUE, audits, and emails the owner on the happy path', async () => {
    mockSendPaymentFailedEmail.mockResolvedValue(undefined)

    const res = await POST(makeRequest())

    expect(res.status).toBe(200)
    expect(mockBillingUpdate).toHaveBeenCalledWith({
      where: { id: 'bil_1' },
      data: { status: 'PAST_DUE' },
    })
    expect(mockSendPaymentFailedEmail).toHaveBeenCalledWith('owner@acme.test', 'Alice', 'acme', 2)
    expect(mockLogAudit).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'billing.payment_failed' })
    )
    // Idempotency row must stay put — Stripe redelivery should dedup.
    expect(mockDeleteEvent).not.toHaveBeenCalled()
  })

  it('on email-send failure: audits the failure, releases the idempotency row, and returns 500 so Stripe retries', async () => {
    mockSendPaymentFailedEmail.mockRejectedValue(new Error('resend down'))

    const res = await POST(makeRequest())

    // Non-2xx → Stripe will redeliver the event.
    expect(res.status).toBe(500)
    // The failure is visible in the audit trail with enough context to act on.
    expect(mockLogAudit).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'billing.webhook_email_failed',
        tenantId: 'ten_1',
        metadata: expect.objectContaining({
          eventId: EVENT_ID,
          invoiceId: 'in_test_1',
          error: 'resend down',
        }),
      })
    )
    // The idempotency row is deleted so the redelivery is NOT dedup-blocked
    // and the email send is re-attempted.
    expect(mockDeleteEvent).toHaveBeenCalledWith({ where: { eventId: EVENT_ID } })
  })

  it('skips the PAST_DUE downgrade and dunning email when the invoice has since been paid', async () => {
    // Scenario: the email-failure rethrow made Stripe redeliver this event
    // hours later, and Smart Retries recovered the payment in the window —
    // invoice.payment_succeeded already set ACTIVE. The redelivered
    // payment_failed must NOT downgrade the recovered tenant or send a
    // stale "payment failed" email.
    mockGetStripe.mockReturnValue({
      webhooks: { constructEvent: vi.fn(() => makePaymentFailedEvent()) },
      invoices: { retrieve: vi.fn(async () => ({ id: 'in_test_1', status: 'paid' })) },
    })

    const res = await POST(makeRequest())

    expect(res.status).toBe(200)
    expect(mockBillingUpdate).not.toHaveBeenCalled()
    expect(mockSendPaymentFailedEmail).not.toHaveBeenCalled()
    expect(mockLogAudit).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'billing.payment_failed_skipped' })
    )
    expect(mockDeleteEvent).not.toHaveBeenCalled()
  })

  it('still runs the dunning path when the invoice re-fetch fails (fail-open)', async () => {
    mockGetStripe.mockReturnValue({
      webhooks: { constructEvent: vi.fn(() => makePaymentFailedEvent()) },
      invoices: { retrieve: vi.fn(async () => { throw new Error('stripe down') }) },
    })
    mockSendPaymentFailedEmail.mockResolvedValue(undefined)

    const res = await POST(makeRequest())

    expect(res.status).toBe(200)
    expect(mockBillingUpdate).toHaveBeenCalledWith({
      where: { id: 'bil_1' },
      data: { status: 'PAST_DUE' },
    })
    expect(mockSendPaymentFailedEmail).toHaveBeenCalled()
  })

  it('duplicate event delivery is still dedup-blocked when processing succeeded', async () => {
    mockCreateEvent.mockRejectedValue(new Error('Unique constraint failed (P2002)'))

    const res = await POST(makeRequest())
    const body = (await res.json()) as { duplicate?: boolean }

    expect(res.status).toBe(200)
    expect(body.duplicate).toBe(true)
    expect(mockSendPaymentFailedEmail).not.toHaveBeenCalled()
    expect(mockBillingUpdate).not.toHaveBeenCalled()
  })
})
