'use server'

import { prisma } from '@/lib/db'
import { escapeHtml } from '@/lib/email'
import { fireAndForget } from '@/lib/cloudflare-ctx'
import { rateLimit, RateLimitError } from '@/lib/rate-limit'
import { Resend } from 'resend'
import { headers } from 'next/headers'
import { z } from 'zod'

// The /contact form used to be cosmetic: it fired a PostHog event, waited
// 600ms and showed "Message sent!" while discarding the message. This action
// gives it a real backend — persist to ContactMessage, then notify
// hello@leavely.online via Resend (fire-and-forget so a Resend blip doesn't
// fail the submit; the DB row is the source of truth).

const ContactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(200),
  email: z.string().trim().toLowerCase().email('Please enter a valid email').max(200),
  company: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1, 'Message is required').max(5000),
})

export type ContactMessageData = z.input<typeof ContactSchema>

type Result = { ok: true } | { ok: false; error: string }

export async function submitContactMessage(data: ContactMessageData): Promise<Result> {
  const parsed = ContactSchema.safeParse(data)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message || 'Please check the form and try again.' }
  }

  const h = await headers()
  const ip =
    h.get('cf-connecting-ip') ||
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'

  try {
    await rateLimit(`contact:ip:${ip}`, 5, 60 * 60 * 1000)
    await rateLimit(`contact:email:${parsed.data.email}`, 3, 60 * 60 * 1000)
  } catch (e) {
    if (e instanceof RateLimitError) {
      return { ok: false, error: 'Too many messages. Please try again in an hour.' }
    }
    throw e
  }

  await prisma.contactMessage.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      message: parsed.data.message,
    },
  })

  const eName = escapeHtml(parsed.data.name)
  const eEmail = escapeHtml(parsed.data.email)
  const eCompany = escapeHtml(parsed.data.company)
  const eMessage = escapeHtml(parsed.data.message).replace(/\n/g, '<br/>')
  const eEmailAttr = encodeURIComponent(parsed.data.email)

  fireAndForget(
    new Resend(process.env.RESEND_API_KEY || '').emails.send({
      from: process.env.EMAIL_FROM || 'Leavely <hello@leavely.online>',
      to: 'hello@leavely.online',
      replyTo: parsed.data.email,
      subject: `New contact message from ${parsed.data.name}`,
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
      <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">New Contact Message</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;color:#6b7280;width:140px;">Name</td><td style="padding:8px 0;color:#111827;font-weight:500;">${eName}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;color:#111827;font-weight:500;"><a href="mailto:${eEmailAttr}">${eEmail}</a></td></tr>
        ${parsed.data.company ? `<tr><td style="padding:8px 0;color:#6b7280;">Company</td><td style="padding:8px 0;color:#111827;font-weight:500;">${eCompany}</td></tr>` : ''}
      </table>
      <p style="color:#111827;line-height:1.6;margin-top:16px;white-space:pre-wrap;">${eMessage}</p>
    </div>
  </div>
</body>
</html>`,
    }),
    'contact.notify-email',
  )

  return { ok: true }
}
