/**
 * PostHog analytics helpers — typed conversion events for the signup funnel.
 *
 * Funnel: Landing → Pricing → Register → Onboarding → Active (paying)
 *
 * PostHog auto-captures $pageview on every navigation, so we only need
 * custom events at business-critical conversion points.
 */

type PostHogClient = typeof import('posthog-js').default

export type ConversionAttribution = {
  utmCampaign?: string | null
  utmSource?: string | null
  utmMedium?: string | null
  utmContent?: string | null
  gclid?: string | null
}

let posthogImport: Promise<PostHogClient> | null = null

function loadPostHog() {
  if (!posthogImport) {
    posthogImport = import('posthog-js').then(({ default: posthog }) => posthog)
  }

  return posthogImport
}

function capture(event: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return

  void loadPostHog().then((posthog) => {
    if (posthog.__loaded) {
      posthog.capture(event, properties)
    }
  })
}

function attributionProperties(attribution?: ConversionAttribution): Record<string, string> {
  const properties: Record<string, string> = {}
  if (!attribution) return properties
  if (attribution.utmCampaign) properties.utm_campaign = attribution.utmCampaign
  if (attribution.utmSource) properties.utm_source = attribution.utmSource
  if (attribution.utmMedium) properties.utm_medium = attribution.utmMedium
  if (attribution.utmContent) properties.utm_content = attribution.utmContent
  if (attribution.gclid) properties.gclid = attribution.gclid
  return properties
}

/* ── CTA clicks (any "Get started" / "Start free" button) ─────────── */
export function trackCtaClicked(cta: string, page: string) {
  capture('cta_clicked', { cta, page })
}

/* ── Pricing calculator interaction ────────────────────────────────── */
export function trackPricingCalculatorUsed(employees: number, monthlyCost: number) {
  capture('pricing_calculator_used', { employees, monthly_cost: monthlyCost })
}

export function trackRoiCalculatorUsed(properties: {
  employees: number
  monthlyHoursSaved: number
  monthlyNetSaving: number
}) {
  capture('roi_calculator_used', {
    employees: properties.employees,
    monthly_hours_saved: properties.monthlyHoursSaved,
    monthly_net_saving: properties.monthlyNetSaving,
  })
}

/* ── Registration ──────────────────────────────────────────────────── */
export function trackRegistrationStarted(
  method: 'email' | 'google' | 'linkedin' | 'microsoft',
  attribution?: ConversionAttribution,
) {
  capture('registration_started', { method, ...attributionProperties(attribution) })
}

export function trackRegistrationCompleted(tenantSlug: string, method: 'email' | 'google' | 'linkedin' | 'microsoft') {
  capture('registration_completed', { tenant_slug: tenantSlug, method })
}

export function trackOAuthFailed(provider: 'google' | 'linkedin', intent: 'login' | 'register', reason: string) {
  capture('oauth_failed', { provider, intent, reason })
}

/* ── Lead captured (email blur on register form) ───────────────────── */
export function trackLeadCaptured(page: string, attribution?: ConversionAttribution) {
  capture('lead_captured', { page, ...attributionProperties(attribution) })
}

/* ── Demo ──────────────────────────────────────────────────────────── */
export function trackDemoVisit(source: string, attribution?: ConversionAttribution) {
  const properties = { source, ...attributionProperties(attribution) }
  capture('visit_demo', properties)
  capture('demo_visit', properties)
}

export function trackDemoStarted() {
  capture('demo_started')
}

export function trackTrialClicked(source: string, method: 'email' | 'auto', attribution?: ConversionAttribution) {
  capture('click_trial', { source, method, ...attributionProperties(attribution) })
}

export function trackTrialStart(source: string, method: 'email' | 'auto', attribution?: ConversionAttribution) {
  capture('trial_start', { source, method, ...attributionProperties(attribution) })
}

/* ── Contact form ──────────────────────────────────────────────────── */
export function trackContactSubmitted() {
  capture('contact_form_submitted')
}

/* ── Onboarding steps ─────────────────────────────────────────────── */
export function trackOnboardingStep(step: number, stepName: string) {
  capture('onboarding_step_completed', { step, step_name: stepName })
}

export function trackWizardStep(step: number, stepName: string, tenantSlug: string) {
  if (step === 1) {
    capture('wizard_step_1', {
      step,
      step_name: stepName,
      tenant_slug: tenantSlug,
    })
  }

  capture(`wizard_step${step}`, {
    step,
    step_name: stepName,
    tenant_slug: tenantSlug,
  })
}

export function trackOnboardingCompleted(tenantSlug: string, employeeCount: number) {
  capture('onboarding_completed', { tenant_slug: tenantSlug, employee_count: employeeCount })
}

/* ── Subscription / payment ────────────────────────────────────────── */
export function trackSubscriptionStarted(tenantSlug: string, plan: string, seats: number) {
  capture('subscription_started', { tenant_slug: tenantSlug, plan, seats })
}

/* ── In-app conversion prompts ─────────────────────────────────────── */
export function trackConversionPromptShown(moment: string, tenantSlug: string) {
  capture('conversion_prompt_shown', { moment, tenant_slug: tenantSlug })
}

export function trackConversionPromptClicked(moment: string, tenantSlug: string) {
  capture('conversion_prompt_clicked', { moment, tenant_slug: tenantSlug })
}

/* ── Industry page viewed (for attribution) ────────────────────────── */
export function trackIndustryPageViewed(industry: string) {
  capture('industry_page_viewed', { industry })
}

/**
 * Capture a thrown error to PostHog (client-side). PostHog supports error
 * tracking via the `$exception` event. Use this in client error boundaries
 * and in `.catch()` handlers for fire-and-forget client-side calls.
 *
 * For server-side error capture see `src/lib/error-capture.ts`.
 */
export function captureError(error: unknown, context?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const message = error instanceof Error ? error.message : String(error)
  const stack = error instanceof Error ? error.stack : undefined

  void loadPostHog().then((posthog) => {
    if (!posthog.__loaded) return

    posthog.capture('$exception', {
      $exception_message: message,
      $exception_type: error instanceof Error ? error.name : 'UnknownError',
      $exception_stack_trace_raw: stack,
      ...context,
    })
  })
}
