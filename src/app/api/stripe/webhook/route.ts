import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getStripe } from '@/lib/stripe'
import { logAudit } from '@/lib/audit'
import { PLAN_KEY, resolvePlanKeyFromPriceId } from '@/lib/plans'
import { sendPaymentFailedEmail, sendTrialExpiringEmail } from '@/lib/email'
import { notifyFounderOfSignupOnce } from '@/lib/signup-notify'
import type Stripe from 'stripe'

/**
 * Map a Stripe subscription status string to our BillingStatus enum.
 * Kept local to the webhook — other call sites drive status from DB writes,
 * not Stripe payloads.
 */
function mapSubscriptionStatus(status: string): 'ACTIVE' | 'TRIALING' | 'PAST_DUE' | 'CANCELED' | 'INCOMPLETE' {
  const map: Record<string, 'ACTIVE' | 'TRIALING' | 'PAST_DUE' | 'CANCELED' | 'INCOMPLETE'> = {
    active: 'ACTIVE',
    trialing: 'TRIALING',
    past_due: 'PAST_DUE',
    canceled: 'CANCELED',
    incomplete: 'INCOMPLETE',
    incomplete_expired: 'INCOMPLETE',
    unpaid: 'PAST_DUE',
  }
  // Fail closed: any Stripe status string we don't recognise (e.g. a new
  // `paused` status added later) maps to INCOMPLETE so the tenant lands in
  // read-only paywall until we update the map. The old `?? 'ACTIVE'` silently
  // granted write access on unknown statuses, which is the wrong default.
  return map[status] ?? 'INCOMPLETE'
}

/**
 * Narrow a Stripe customer reference to a string ID. Stripe's types allow
 * `string | Customer | DeletedCustomer | null` but for our billing ops we
 * always want the ID. Throws loudly so a null customer on a session/invoice
 * can't silently write the literal "null" into TenantBilling (issue #105).
 */
function customerIdOf(
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null,
  context: string
): string {
  if (typeof customer === 'string') return customer
  if (customer && 'id' in customer && typeof customer.id === 'string') return customer.id
  throw new Error(`[stripe webhook] ${context}: missing customer id on payload`)
}

/**
 * Find the OWNER membership for a tenant and return the contact email so we
 * can notify them about billing events. Returns null if there's no OWNER yet
 * (shouldn't happen in practice — every tenant is created with one — but we
 * fail soft rather than crash the webhook handler).
 */
async function getOwnerEmail(tenantId: string): Promise<{ email: string; name: string | null } | null> {
  const owner = await prisma.membership.findFirst({
    where: { tenantId, role: 'OWNER' },
    include: { user: { select: { email: true, name: true } } },
  })
  if (!owner) return null
  return { email: owner.user.email, name: owner.user.name }
}

export async function POST(req: NextRequest) {
  const stripe = getStripe()
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not configured')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Idempotency gate — issue #70. Stripe retries on any non-2xx / timeout /
  // network drop, and will happily redeliver the same event minutes, hours,
  // or (on rare backfills) days later. Writing `event.id` as the PK of
  // ProcessedStripeEvent turns the second delivery into a cheap P2002 that
  // we swallow and return 200 for, so audit rows / payment state are not
  // double-applied. Must happen BEFORE any other DB writes.
  try {
    await prisma.processedStripeEvent.create({ data: { eventId: event.id } })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    // Prisma's P2002 unique-constraint error message contains the
    // constraint name. We match loosely so the check works whether the
    // driver throws a PrismaClientKnownRequestError or a plain Error.
    if (msg.includes('P2002') || msg.includes('Unique constraint')) {
      console.log(`[stripe webhook] skipping already-processed event ${event.id}`)
      return NextResponse.json({ received: true, duplicate: true })
    }
    // Any other error on the idempotency insert is a hard failure — don't
    // process the event blind, ask Stripe to retry.
    console.error('[stripe webhook] failed to record event id:', err)
    return NextResponse.json({ error: 'Failed to persist event id' }, { status: 500 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const tenantId = session.metadata?.tenantId
        if (tenantId && session.subscription) {
          const subscriptionId = typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription.id
          const customerId = customerIdOf(session.customer, 'checkout.session.completed')

          // Issue #101 — pull the subscription details in one round trip so
          // we can populate planKey + currentPeriodEnd + clear trialEndsAt
          // in a single update. Previously we relied on the sibling
          // `customer.subscription.created` event arriving afterwards; if
          // that event was filtered out or dropped, the tenant stayed
          // ACTIVE with a stale trial timestamp.
          //
          // CRITICAL: if the retrieve FAILS (transient Stripe outage / rate
          // limit / network blip) we MUST NOT write partial billing state
          // and MUST NOT nullify trialEndsAt. A just-paid customer could
          // end up ACTIVE without a subscription id, or with their trial
          // cleared and no sub to fall back to, and the
          // `customer.subscription.updated` sibling event may never arrive
          // if we've already 200'd the checkout.session.completed event.
          // Return 500 so Stripe retries (idempotency guard at the top
          // deletes the processed-event row on throw so the retry re-runs
          // fresh, not as a duplicate).
          let sub: Stripe.Subscription
          try {
            sub = await stripe.subscriptions.retrieve(subscriptionId)
          } catch (err) {
            console.error('[stripe webhook] failed to retrieve subscription after checkout:', err)
            throw new Error('RETRIEVE_SUBSCRIPTION_FAILED')
          }

          const priceId = sub.items.data[0]?.price.id ?? null
          const resolvedPlanKey = resolvePlanKeyFromPriceId(priceId)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const currentPeriodEndTs = (sub as any).current_period_end
          const currentPeriodEnd =
            typeof currentPeriodEndTs === 'number' && Number.isFinite(currentPeriodEndTs)
              ? new Date(currentPeriodEndTs * 1000)
              : undefined

          await prisma.tenantBilling.update({
            where: { tenantId },
            data: {
              stripeSubId: subscriptionId,
              stripeCustomerId: customerId,
              status: mapSubscriptionStatus(sub.status),
              planKey: resolvedPlanKey ?? undefined, // preserve existing if unknown
              currentPeriodEnd,
              trialEndsAt: null, // paid checkout completed — in-app trial is over
            },
          })
          await logAudit({
            action: 'billing.checkout_completed',
            entity: 'TenantBilling',
            tenantId,
            metadata: {
              subscriptionId,
              priceId,
              resolvedPlanKey,
            },
          })

          // Entering card details is the second of the two "real human"
          // gates that release the founder's signup notification. Safe to
          // call after completeOnboarding has already fired — the row's
          // signupNotifiedAt flag makes this idempotent.
          await notifyFounderOfSignupOnce(tenantId)
        }
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        const customerId = customerIdOf(sub.customer, event.type)
        // Prefer matching by subscription id so a stale update event for a
        // PRIOR sub on the same customer doesn't overwrite the live row.
        // (Codex round 4 #7.)
        const billing =
          (await prisma.tenantBilling.findFirst({
            where: { stripeSubId: sub.id },
          })) ||
          (await prisma.tenantBilling.findFirst({
            where: { stripeCustomerId: customerId },
          }))
        // If we matched by customer but the row is already on a DIFFERENT
        // (newer) subscription, ignore the stale event so we don't drag
        // status backwards.
        if (
          billing &&
          billing.stripeSubId &&
          billing.stripeSubId !== sub.id &&
          // Allow the upgrade path: create event for a NEW sub when the row
          // currently points at an old/canceled one. We detect this by the
          // current sub being a non-active state on the row.
          billing.status !== 'CANCELED'
        ) {
          console.warn(
            `[stripe webhook] ${event.type} for stale sub ${sub.id} ignored — tenant ${billing.tenantId} now on ${billing.stripeSubId}`
          )
          break
        }
        if (billing) {
          const item = sub.items.data[0]
          const quantity = item?.quantity ?? undefined
          const priceId = item?.price.id ?? null
          const resolvedPlanKey = resolvePlanKeyFromPriceId(priceId)

          // Issue #95 — detect seat drift between Stripe and our employee
          // count. We intentionally DO NOT auto-correct here; we just log
          // a warning so we can review drift before Pack Y flips the
          // feature flag to reconcile. Stripe Portal seat edits should be
          // rare (MVP) but silently overwriting them loses data.
          if (typeof quantity === 'number') {
            const activeEmployees = await prisma.employee.count({
              where: { tenantId: billing.tenantId, status: 'ACTIVE' },
            })
            if (quantity !== activeEmployees) {
              console.warn(
                `[stripe webhook] seat drift detected for tenant ${billing.tenantId}: ` +
                  `stripe.quantity=${quantity}, active_employees=${activeEmployees}`
              )
              await logAudit({
                action: 'billing.seat_drift_detected',
                entity: 'TenantBilling',
                entityId: billing.id,
                tenantId: billing.tenantId,
                metadata: {
                  subscriptionId: sub.id,
                  stripeQuantity: quantity,
                  activeEmployeeCount: activeEmployees,
                  source: 'stripe_webhook',
                },
              })
            }
          }

          // Guard against a null/undefined current_period_end. Stripe's TS
          // types say it's always a number on active subs, but older
          // statuses (incomplete, incomplete_expired) and portal edits can
          // omit it; `new Date(undefined * 1000)` → Invalid Date → Prisma
          // throws → Stripe retries forever. Preserve the existing value
          // if the payload doesn't give us a fresh one.
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const nextPeriodEndTs = (sub as any).current_period_end
          const nextPeriodEnd =
            typeof nextPeriodEndTs === 'number' && Number.isFinite(nextPeriodEndTs)
              ? new Date(nextPeriodEndTs * 1000)
              : billing.currentPeriodEnd ?? undefined

          await prisma.tenantBilling.update({
            where: { id: billing.id },
            data: {
              stripeSubId: sub.id,
              status: mapSubscriptionStatus(sub.status),
              currentPeriodEnd: nextPeriodEnd,
              trialEndsAt: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
              // Issue #99 — reconcile planKey against the actual price on
              // the Stripe subscription item. Fall back to the existing
              // planKey (or PLAN_KEY as a last resort) when the price ID
              // isn't one we recognise, so we never overwrite with null.
              planKey: resolvedPlanKey ?? billing.planKey ?? PLAN_KEY,
            },
          })
          await logAudit({
            action: `billing.subscription_${event.type.split('.').pop()}`,
            entity: 'TenantBilling',
            entityId: billing.id,
            tenantId: billing.tenantId,
            metadata: { status: sub.status, subscriptionId: sub.id, quantity, priceId, resolvedPlanKey },
          })
        }
        break
      }

      case 'customer.subscription.trial_will_end': {
        // Issue #100 — Stripe fires this 3 days before the trial ends, which
        // is our cue to nudge the owner to add a card. In-app banner only
        // fires if they actively open the app inside that window.
        const sub = event.data.object as Stripe.Subscription
        const customerId = customerIdOf(sub.customer, 'customer.subscription.trial_will_end')
        const billing = await prisma.tenantBilling.findFirst({
          where: { stripeCustomerId: customerId },
          include: { tenant: { select: { slug: true } } },
        })
        if (billing) {
          const owner = await getOwnerEmail(billing.tenantId)
          if (owner) {
            const daysRemaining = sub.trial_end
              ? Math.max(1, Math.ceil((sub.trial_end * 1000 - Date.now()) / (1000 * 60 * 60 * 24)))
              : 3
            // Audit BEFORE the email send. The opposite order can double-mail
            // the owner: if logAudit threw after a successful send, the
            // top-level catch would delete the processedStripeEvent row,
            // Stripe would retry the same event, and the email would go out
            // again. With the audit row written first, a logAudit failure
            // (rare) means no email yet — the retry is correct. An email
            // failure is swallowed locally so the audit row stays put.
            // (Codex round 4 #11.)
            await logAudit({
              action: 'billing.trial_will_end_emailed',
              entity: 'TenantBilling',
              entityId: billing.id,
              tenantId: billing.tenantId,
              metadata: { daysRemaining },
            })
            try {
              await sendTrialExpiringEmail(
                owner.email,
                owner.name ?? 'there',
                billing.tenant.slug,
                daysRemaining
              )
            } catch (err) {
              console.error('[stripe webhook] failed to send trial_will_end email:', err)
            }
          }
        }
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        const customerId = customerIdOf(sub.customer, 'customer.subscription.deleted')
        // Prefer matching on the actual subscription id so we never cancel
        // the wrong row when a tenant has had multiple subscriptions on the
        // same Stripe customer (cancel + re-subscribe, plan migration,
        // dunning recovery). The customerId match is only a fallback for
        // tenants whose stripeSubId hasn't been populated yet (very early
        // checkout edge case). Without this, an out-of-order delete event
        // for an OLD subscription could cancel a tenant who has since
        // started a NEW one. (Codex round 4 #7.)
        const billing =
          (await prisma.tenantBilling.findFirst({
            where: { stripeSubId: sub.id },
          })) ||
          (await prisma.tenantBilling.findFirst({
            where: { stripeCustomerId: customerId, stripeSubId: null },
          }))
        if (billing) {
          // Defensive: only flip to CANCELED if we matched on the live sub
          // OR there's no live sub on file. If the row points at a
          // DIFFERENT (newer) sub, swallow the stale event.
          if (billing.stripeSubId && billing.stripeSubId !== sub.id) {
            console.warn(
              `[stripe webhook] subscription_deleted for stale sub ${sub.id} ignored — tenant ${billing.tenantId} now on ${billing.stripeSubId}`
            )
            break
          }
          await prisma.tenantBilling.update({
            where: { id: billing.id },
            data: { status: 'CANCELED', stripeSubId: null },
          })
          await logAudit({
            action: 'billing.subscription_deleted',
            entity: 'TenantBilling',
            entityId: billing.id,
            tenantId: billing.tenantId,
            metadata: { subscriptionId: sub.id },
          })
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = customerIdOf(invoice.customer, 'invoice.payment_succeeded')
        const billing = await prisma.tenantBilling.findFirst({
          where: { stripeCustomerId: customerId },
        })
        if (billing) {
          // Stripe re-delivers events on its own retry schedule, and ordering
          // is NOT guaranteed across event types. A common landmine is
          // `customer.subscription.deleted` arriving before a stale
          // `invoice.payment_succeeded` (a final-period proration, dunning
          // recovery, or a Stripe replay) — blindly forcing status=ACTIVE
          // here would resurrect a tenant we'd already cancelled. Only
          // promote to ACTIVE from billing states that legitimately become
          // active on a successful payment (TRIALING, PAST_DUE, or already
          // ACTIVE — idempotent). For CANCELED / INCOMPLETE we still log
          // the payment for accounting but never flip the tenant back into
          // a paying state — the next subscription.created/updated event
          // is the source of truth for that.
          const promoteToActive =
            billing.status === 'TRIALING' ||
            billing.status === 'PAST_DUE' ||
            billing.status === 'ACTIVE'
          if (promoteToActive) {
            await prisma.tenantBilling.update({
              where: { id: billing.id },
              data: { status: 'ACTIVE' },
            })
          } else {
            console.warn(
              `[stripe webhook] payment_succeeded for tenant ${billing.tenantId} ignored — current status=${billing.status} (event ${event.id}, invoice ${invoice.id})`
            )
          }
          await logAudit({
            action: 'billing.payment_succeeded',
            entity: 'TenantBilling',
            entityId: billing.id,
            tenantId: billing.tenantId,
            metadata: {
              invoiceId: invoice.id,
              amount: invoice.amount_paid,
              previousStatus: billing.status,
              promoted: promoteToActive,
            },
          })
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        const customerId = customerIdOf(invoice.customer, 'invoice.payment_failed')
        const billing = await prisma.tenantBilling.findFirst({
          where: { stripeCustomerId: customerId },
          include: { tenant: { select: { slug: true } } },
        })
        if (billing) {
          // Guard against stale redeliveries. The email-failure rethrow below
          // makes Stripe redeliver this whole event hours-to-days later; if
          // Smart Retries recovered the payment in that window (or events
          // arrive out of order), invoice.payment_succeeded has already set
          // ACTIVE — and an unconditional PAST_DUE set here would downgrade a
          // recovered tenant AND email them that a payment failed after it
          // succeeded. The payment_succeeded handler only promotes from
          // TRIALING/PAST_DUE/ACTIVE, so the wrong status would stick for up
          // to a month. Re-fetch the invoice from Stripe (authoritative) and
          // skip the downgrade + dunning email if it's since been paid.
          let invoiceNow: Stripe.Invoice | null = null
          try {
            invoiceNow = invoice.id ? await stripe.invoices.retrieve(invoice.id) : null
          } catch (err) {
            // If the lookup fails, fall through with the event payload —
            // better an occasional redundant dunning email than none at all.
            console.error('[stripe webhook] payment_failed invoice re-fetch failed:', err)
          }
          if (invoiceNow && (invoiceNow.status === 'paid' || invoiceNow.status === 'void')) {
            console.warn(
              `[stripe webhook] payment_failed for tenant ${billing.tenantId} skipped — invoice ${invoice.id} is now ${invoiceNow.status} (event ${event.id})`
            )
            await logAudit({
              action: 'billing.payment_failed_skipped',
              entity: 'TenantBilling',
              entityId: billing.id,
              tenantId: billing.tenantId,
              metadata: { invoiceId: invoice.id, invoiceStatus: invoiceNow.status, eventId: event.id },
            })
            break
          }

          await prisma.tenantBilling.update({
            where: { id: billing.id },
            data: { status: 'PAST_DUE' },
          })

          // Issue #98 — email the owner so they actually know their card
          // failed. Audit BEFORE send so a logAudit failure can't delete
          // the processedStripeEvent row and trigger a Stripe retry that
          // re-emails the owner. See trial_will_end above. (Codex round
          // 4 #11.)
          await logAudit({
            action: 'billing.payment_failed',
            entity: 'TenantBilling',
            entityId: billing.id,
            tenantId: billing.tenantId,
            metadata: { invoiceId: invoice.id, attemptCount: invoice.attempt_count },
          })
          const owner = await getOwnerEmail(billing.tenantId)
          if (owner) {
            try {
              await sendPaymentFailedEmail(
                owner.email,
                owner.name ?? 'there',
                billing.tenant.slug,
                invoice.attempt_count ?? 1
              )
            } catch (err) {
              // Do NOT swallow this. If we 200 with the email unsent, the
              // processedStripeEvent row blocks Stripe's redelivery at the
              // idempotency gate and the owner is NEVER told their payment
              // failed (they only find out via the PAST_DUE banner, if they
              // log in). Audit the failure for visibility, then rethrow so
              // the top-level catch deletes the idempotency row and returns
              // 500 — Stripe retries and the email is re-attempted. The
              // re-run is safe: the PAST_DUE update is an idempotent set and
              // the duplicate billing.payment_failed audit row just records
              // the redelivery.
              console.error('[stripe webhook] failed to send payment_failed email:', err)
              await logAudit({
                action: 'billing.webhook_email_failed',
                entity: 'TenantBilling',
                entityId: billing.id,
                tenantId: billing.tenantId,
                metadata: {
                  eventId: event.id,
                  invoiceId: invoice.id,
                  email: 'payment_failed',
                  error: err instanceof Error ? err.message : String(err),
                },
              })
              throw new Error('PAYMENT_FAILED_EMAIL_SEND_FAILED')
            }
          }
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook processing error:', err)
    // Best-effort: delete the idempotency row so Stripe's retry actually
    // gets a fresh run. If this delete fails we'll swallow silently —
    // worst case we lose one retry attempt and need to replay manually.
    try {
      await prisma.processedStripeEvent.delete({ where: { eventId: event.id } })
    } catch {
      /* ignore — the next Stripe retry will no-op via the idempotency gate */
    }
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
