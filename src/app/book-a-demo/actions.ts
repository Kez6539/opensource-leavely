'use server'

import { prisma } from '@/lib/db'
import { escapeHtml } from '@/lib/email'
import { fireAndForget } from '@/lib/cloudflare-ctx'
import { rateLimit, RateLimitError } from '@/lib/rate-limit'
import { Resend } from 'resend'
import { headers } from 'next/headers'
import { z } from 'zod'
import { DEMO_TRIAL_SEQUENCE_PENDING } from '@/lib/demo-trial-sequence'

const DemoLeadSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().min(1, 'Company name is required'),
  email: z.string().email('Please enter a valid business email'),
  phone: z.string().min(1, 'Phone number is required'),
  employeeCount: z.string().min(1, 'Please select number of employees'),
  currentSystem: z.string().optional(),
  industry: z.string().optional(),
  painPoint: z.string().min(1, 'Please select your biggest challenge'),
  painPointOther: z.string().optional(),
})

export type DemoLeadData = z.input<typeof DemoLeadSchema>

function getResend() {
  return new Resend(process.env.RESEND_API_KEY || '')
}

function getFrom() {
  return process.env.EMAIL_FROM || 'Leavely <hello@leavely.online>'
}

export async function submitDemoLead(data: DemoLeadData) {
  const parsed = DemoLeadSchema.parse(data)

  // Same guard as /try and /demo — without it this action is a scriptable
  // relay: each call inserts a row, emails us, and sends a confirmation with
  // attacker-chosen name/company to ANY address, burning sender reputation.
  const h = await headers()
  const ip =
    h.get('cf-connecting-ip') ||
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  try {
    await rateLimit(`demo-lead:ip:${ip}`, 5, 60 * 60 * 1000)
    await rateLimit(`demo-lead:email:${parsed.email}`, 3, 60 * 60 * 1000)
  } catch (e) {
    if (e instanceof RateLimitError) {
      return { success: false as const, error: 'Too many requests. Please try again in an hour.' }
    }
    throw e
  }

  // Save to database
  await prisma.demoLead.create({
    data: {
      name: parsed.name,
      company: parsed.company,
      email: parsed.email,
      phone: parsed.phone,
      employeeCount: parsed.employeeCount,
      currentSystem: parsed.currentSystem || null,
      industry: parsed.industry || null,
      painPoint: parsed.painPoint,
      painPointOther: parsed.painPointOther || null,
    },
  })
  await prisma.signupLead.create({
    data: {
      email: parsed.email.toLowerCase(),
      name: parsed.name,
      company: parsed.company,
      industry: parsed.industry || null,
      source: DEMO_TRIAL_SEQUENCE_PENDING,
    },
  })

  const painPointDisplay = parsed.painPoint === 'Other'
    ? `Other: ${parsed.painPointOther || 'Not specified'}`
    : parsed.painPoint

  // All interpolations escaped to prevent reflected XSS in our own inbox.
  const eName = escapeHtml(parsed.name)
  const eCompany = escapeHtml(parsed.company)
  const eEmail = escapeHtml(parsed.email)
  const ePhone = escapeHtml(parsed.phone)
  const eEmployeeCount = escapeHtml(parsed.employeeCount)
  const eCurrentSystem = escapeHtml(parsed.currentSystem)
  const eIndustry = escapeHtml(parsed.industry)
  const ePainPointDisplay = escapeHtml(painPointDisplay)
  const eEmailAttr = encodeURIComponent(parsed.email)
  const ePhoneAttr = encodeURIComponent(parsed.phone)

  // Email to Keiron. fireAndForget registers the send with waitUntil() —
  // a bare .catch() promise gets cancelled when the Workers isolate
  // returns the response (see src/lib/cloudflare-ctx.ts).
  fireAndForget(getResend().emails.send({
    from: getFrom(),
    to: 'hello@leavely.online',
    subject: `New demo request from ${parsed.name} at ${parsed.company}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;">
    <div style="background:linear-gradient(135deg,#059669,#0d9488);padding:24px 32px;border-radius:16px 16px 0 0;">
      <span style="color:#fff;font-size:20px;font-weight:700;">Leavely</span>
    </div>
    <div style="background:#fff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;">
      <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">New Demo Request</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Name</td><td style="padding:8px 0;color:#111827;font-weight:500;">${eName}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Company</td><td style="padding:8px 0;color:#111827;font-weight:500;">${eCompany}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;color:#111827;font-weight:500;"><a href="mailto:${eEmailAttr}">${eEmail}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;color:#111827;font-weight:500;"><a href="tel:${ePhoneAttr}">${ePhone}</a></td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Employees</td><td style="padding:8px 0;color:#111827;font-weight:500;">${eEmployeeCount}</td></tr>
        ${parsed.currentSystem ? `<tr><td style="padding:8px 0;color:#6b7280;">Current system</td><td style="padding:8px 0;color:#111827;font-weight:500;">${eCurrentSystem}</td></tr>` : ''}
        ${parsed.industry ? `<tr><td style="padding:8px 0;color:#6b7280;">Industry</td><td style="padding:8px 0;color:#111827;font-weight:500;">${eIndustry}</td></tr>` : ''}
        <tr><td style="padding:8px 0;color:#6b7280;">Pain point</td><td style="padding:8px 0;color:#111827;font-weight:500;">${ePainPointDisplay}</td></tr>
      </table>
    </div>
  </div>
</body>
</html>`,
  }), 'demo-lead.notification-email')

  // Confirmation email to prospect
  fireAndForget(getResend().emails.send({
    from: getFrom(),
    to: parsed.email,
    subject: 'Thanks for your interest in Leavely',
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb;">
  <div style="max-width:560px;margin:0 auto;padding:40px 20px;">
    <div style="background:linear-gradient(135deg,#059669,#0d9488);padding:24px 32px;border-radius:16px 16px 0 0;">
      <span style="color:#fff;font-size:20px;font-weight:700;">Leavely</span>
    </div>
    <div style="background:#fff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 16px 16px;">
      <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">Thanks for booking a demo, ${eName}!</h2>
      <p style="color:#6b7280;line-height:1.6;">
        We received your request and will be in touch within 24 hours to arrange a personalised demo of Leavely for ${eCompany}.
      </p>
      <p style="color:#6b7280;line-height:1.6;margin-top:16px;">
        In the meantime, feel free to explore our features at <a href="https://leavely.online/features" style="color:#059669;text-decoration:underline;">leavely.online/features</a>.
      </p>
      <p style="color:#6b7280;line-height:1.6;margin-top:24px;">
        Best regards,<br/>
        The Leavely Team
      </p>
    </div>
    <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:24px;">
      &copy; ${new Date().getFullYear()} Leavely. All rights reserved.
    </p>
  </div>
</body>
</html>`,
  }), 'demo-lead.confirmation-email')

  return { success: true as const }
}
