import { Resend } from 'resend'

let _resend: Resend | null = null
function getResend() {
  if (!_resend) {
    // Fail loudly in production if the key is missing. The `|| ''` fallback
    // would otherwise create a Resend client that silently 401s on every
    // send — discovered weeks later when a real user requests a password
    // reset and never gets the email.
    if (process.env.NODE_ENV === 'production' && !process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is required in production')
    }
    _resend = new Resend(process.env.RESEND_API_KEY || 'resend_dev_placeholder')
  }
  return _resend
}

function getFrom() {
  return process.env.EMAIL_FROM || 'Leavely <hello@leavely.online>'
}

// Every transactional email now routes replies to a monitored inbox. Without
// this, bounces and "please unsubscribe" replies dead-letter into noreply@,
// and users who hit Reply in Gmail get a silent black hole.
const REPLY_TO = 'support@leavely.online'

/**
 * Escape user-controlled text for safe interpolation into HTML email
 * templates. Without this, an attacker who can set their own employee
 * name, tenant name, policy name, leave reason, or feedback message can
 * inject `<script>` / `<img onerror>` / `<style>` into the rendered
 * email body — stored XSS in whatever client opens the message.
 *
 * Audit follow-up: this is the post-validation gap that Sweep 3 missed.
 * Zod hardens the *shape* of input but doesn't make a string HTML-safe.
 */
export function escapeHtml(value: string | null | undefined): string {
  if (value == null) return ''
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/**
 * Produce a reasonable plaintext fallback for an HTML email body. Resend
 * (and every other ESP) pushes deliverability scores up when a multipart
 * alternative is present, and plain-text clients (Apple Mail's accessibility
 * mode, terminal MUAs, scrapers) can't read our HTML blocks.
 *
 * This is deliberately a dumb stripper — our templates are short and
 * hand-written, so we don't need the full `html-to-text` dependency. It:
 *   - replaces `<br>`, `</p>`, `</tr>`, `</div>`, headings with newlines
 *   - turns `<a href="X">label</a>` into `label (X)`
 *   - drops remaining tags
 *   - decodes the small set of entities we actually use
 *   - collapses runs of whitespace
 */
export function htmlToPlainText(html: string): string {
  return html
    // Pull anchor hrefs up next to their label text.
    .replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => {
      const text = String(label).replace(/<[^>]+>/g, '').trim()
      return text ? `${text} (${href})` : href
    })
    // Block-level elements become line breaks.
    .replace(/<(br|\/p|\/div|\/h[1-6]|\/li|\/tr)[^>]*>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    // Strip the remaining tags.
    .replace(/<[^>]+>/g, '')
    // Decode the entities we actually emit.
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&pound;/g, '£')
    .replace(/&copy;/g, '(c)')
    .replace(/&middot;/g, '·')
    // Collapse whitespace runs but preserve paragraph breaks.
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
}

function layout(content: string) {
  const baseUrl = appBaseUrl()
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f4f5f7;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f5f7;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid #e5e7eb;">
              <span style="display:inline-block;color:#059669;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Leavely</span>
              <span style="display:inline-block;color:#6b7280;font-size:13px;font-weight:500;margin-left:10px;border-left:1px solid #e5e7eb;padding-left:10px;">Leave management, made simple</span>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;color:#111827;font-size:15px;line-height:1.6;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #e5e7eb;background:#f9fafb;color:#6b7280;font-size:12px;line-height:1.5;">
              You&rsquo;re receiving this because you have an account with Leavely.<br/>
              <a href="${baseUrl}" style="color:#059669;text-decoration:none;font-weight:600;">${baseUrl.replace(/^https?:\/\//, '')}</a>
              &nbsp;&middot;&nbsp; &copy; ${new Date().getFullYear()} Leavely. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function button(href: string, label: string, color: string = '#059669') {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px auto;">
    <tr>
      <td align="center" style="border-radius:8px;background:${color};">
        <a href="${href}" style="display:inline-block;padding:13px 28px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:8px;">${label}</a>
      </td>
    </tr>
  </table>`
}

function detailCard(rows: { label: string; value: string }[]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:20px 0;">
    ${rows.map((r, i) => `
      <tr>
        <td style="padding:12px 16px;${i > 0 ? 'border-top:1px solid #e5e7eb;' : ''}width:120px;color:#6b7280;font-size:13px;font-weight:500;">${r.label}</td>
        <td style="padding:12px 16px;${i > 0 ? 'border-top:1px solid #e5e7eb;' : ''}color:#111827;font-size:14px;font-weight:600;">${r.value}</td>
      </tr>
    `).join('')}
  </table>`
}

/**
 * Canonical app base URL. Used for absolute links in transactional emails,
 * push notifications, cron-generated URLs, etc. Kept in one place so we don't
 * scatter `'https://leavely.online'` fallbacks across the codebase.
 *
 * Exported so every caller — email templates, leave actions, cron jobs — uses
 * the same resolution chain instead of inlining a bespoke fallback.
 */
export function appBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.CF_PAGES_URL ||
    'https://leavely.online'
  )
}

/**
 * Strip CR/LF (and any control characters) from an email header value.
 *
 * Every send-* helper in this file interpolates user-controlled values
 * (employeeName, tenantName, companyName, leave dates, policy names) into
 * Subject: headers via template literals. Zod trims/bounds the *length* of
 * those strings but does NOT strip embedded `\r` / `\n` — and RFC 5322
 * headers terminate on CRLF. A hostile user with control over any of those
 * fields can therefore inject arbitrary additional headers (BCC:, Content-
 * Type:, Return-Path:, etc.) by planting a CRLF followed by their header
 * name. This is classic header injection and it's been live since the first
 * email helper shipped — Sweep 2 only stripped CRLF from the feedback
 * subject, leaving the other ~8 subject interpolation sites exposed.
 *
 * Applied centrally in sendMail() so every caller is protected by default.
 * Also collapses horizontal whitespace runs so a pasted tab-separated name
 * doesn't produce a grotty multi-space subject in the recipient's inbox.
 */
export function sanitizeHeader(value: string): string {
  return String(value)
    // Strip any CR/LF/NUL/vertical tab that could terminate the header.
    .replace(/[\r\n\u0000-\u001f\u007f]+/g, ' ')
    // Collapse runs of whitespace (incl. the substitutions above) to a single space.
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Thin wrapper around Resend's `emails.send` that every helper in this file
 * should use. It enforces four things we were previously doing inconsistently:
 *   1. A monitored `reply_to` address so humans can reply.
 *   2. A plaintext alternative derived from the HTML (deliverability + a11y).
 *   3. The canonical `from` and logging.
 *   4. CRLF/control-character sanitisation of the Subject header so user-
 *      controlled values can't inject extra headers.
 */
export async function sendMail(opts: { to: string; subject: string; html: string }) {
  return getResend().emails.send({
    from: getFrom(),
    to: opts.to,
    replyTo: REPLY_TO,
    subject: sanitizeHeader(opts.subject),
    html: opts.html,
    text: htmlToPlainText(opts.html),
  })
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  await sendMail({
    to,
    subject: 'Reset your Leavely password',
    html: layout(`
      <h1 style="margin:0 0 16px;color:#111827;font-size:22px;font-weight:700;">Reset your password</h1>
      <p style="margin:0 0 12px;color:#374151;">
        We received a request to reset your password. Click the button below to choose a new one. This link expires in 1 hour.
      </p>
      ${button(resetUrl, 'Reset password')}
      <p style="margin:0;color:#6b7280;font-size:13px;">
        If you didn&rsquo;t request this, you can safely ignore this email.
      </p>
    `),
  })
}

export async function sendMagicLinkEmail(to: string, magicUrl: string, isNewAccount: boolean) {
  await sendMail({
    to,
    subject: isNewAccount ? 'Finish setting up Leavely' : 'Your Leavely sign-in link',
    html: layout(`
      <h1 style="margin:0 0 16px;color:#111827;font-size:22px;font-weight:700;">
        ${isNewAccount ? 'Welcome to Leavely' : 'Sign in to Leavely'}
      </h1>
      <p style="margin:0 0 12px;color:#374151;">
        ${isNewAccount
          ? 'Click below to finish setting up your workspace. No password needed.'
          : 'Click below to sign in. This link expires in 20 minutes.'}
      </p>
      ${button(magicUrl, isNewAccount ? 'Set up my workspace' : 'Sign me in')}
      <p style="margin:0;color:#6b7280;font-size:13px;">
        If you didn&rsquo;t ask for this, you can ignore it and we won&rsquo;t create anything.
      </p>
    `),
  })
}

export async function sendDemoTrialSequenceEmail(to: string, step: 1 | 2 | 3) {
  const trialUrl = `${appBaseUrl()}/try?src=demo_sequence&pe=${encodeURIComponent(to)}`
  const bookCallUrl =
    'mailto:hello@leavely.online?subject=Leavely%20trial%20setup%20help&body=Hi%20Keiron%2C%20I%20looked%20at%20the%20Leavely%20demo%20and%20could%20use%20a%20hand%20getting%20started.'

  const variants: Record<1 | 2 | 3, { subject: string; html: string }> = {
    1: {
      subject: 'Want to try Leavely with your own team?',
      html: layout(`
        <h1 style="margin:0 0 16px;color:#111827;font-size:22px;font-weight:700;">Pick up where the demo left off</h1>
        <p style="margin:0 0 12px;color:#374151;">
          You had a look around the Leavely demo. The fastest next step is a free workspace with your own team data, your own leave year, and UK bank holidays already loaded.
        </p>
        <p style="margin:0 0 12px;color:#374151;">
          It takes about 2 minutes to start, there&rsquo;s no card required, and the trial includes leave, sickness, TOIL, clock-in, expenses and reports.
        </p>
        ${button(trialUrl, 'Start my 14-day trial')}
        <p style="margin:0;color:#6b7280;font-size:13px;">
          Prefer help? Reply to this email and it comes straight to us.
        </p>
      `),
    },
    2: {
      subject: 'Still using a spreadsheet for staff leave?',
      html: layout(`
        <h1 style="margin:0 0 16px;color:#111827;font-size:22px;font-weight:700;">A calmer way to manage leave</h1>
        <p style="margin:0 0 12px;color:#374151;">
          Most teams come to Leavely because holiday requests are split between spreadsheets, email, WhatsApp and memory. That works until two people ask for the same week off, sickness needs tracking, or balances stop matching.
        </p>
        <p style="margin:0 0 12px;color:#374151;">
          In your trial you can invite a few people, approve a request, check the shared calendar, and see whether it fits before paying anything.
        </p>
        ${button(trialUrl, 'Try it with my team')}
        <p style="margin:0;color:#6b7280;font-size:13px;">
          If you want a 15-minute walkthrough instead, <a href="${bookCallUrl}" style="color:#059669;text-decoration:none;font-weight:600;">send a quick note</a>.
        </p>
      `),
    },
    3: {
      subject: 'Last nudge from the Leavely demo',
      html: layout(`
        <h1 style="margin:0 0 16px;color:#111827;font-size:22px;font-weight:700;">Worth trying before the next holiday clash?</h1>
        <p style="margin:0 0 12px;color:#374151;">
          One last note after your demo visit. If leave admin is still living in a spreadsheet, Leavely gives you a proper team calendar, one-click approvals, automatic balances, sickness tracking and simple reports for &pound;8 per active user per month.
        </p>
        <p style="margin:0 0 12px;color:#374151;">
          Your 14-day trial is free, full access, and you can export your data any time.
        </p>
        ${button(trialUrl, 'Start free trial')}
        <p style="margin:0;color:#6b7280;font-size:13px;">
          No worries if now is not the right time. You can always come back to the demo from the website.
        </p>
      `),
    },
  }

  const variant = variants[step]
  await sendMail({
    to,
    subject: variant.subject,
    html: variant.html,
  })
}

export async function sendTrialOnboardingSequenceEmail(
  to: string,
  userName: string,
  tenantSlug: string,
  step: 1 | 2 | 3,
) {
  const dashboardUrl = `${appBaseUrl()}/t/${tenantSlug}/dashboard`
  const onboardingUrl = `${appBaseUrl()}/t/${tenantSlug}/onboarding`
  const employeesUrl = `${appBaseUrl()}/t/${tenantSlug}/employees`
  const calendarUrl = `${appBaseUrl()}/t/${tenantSlug}/calendar`
  const reportsUrl = `${appBaseUrl()}/t/${tenantSlug}/reports`
  const leaveUrl = `${appBaseUrl()}/t/${tenantSlug}/leave`
  const rawGreeting = userName?.split(' ')[0] || 'there'
  const greeting = escapeHtml(rawGreeting)
  const bookCallUrl =
    'mailto:hello@leavely.online?subject=Leavely%20setup%20call&body=Hi%20Keiron%2C%20could%20we%20book%2015%20mins%20to%20get%20Leavely%20set%20up%3F'
  const replyUrl = 'mailto:hello@leavely.online?subject=Help%20setting%20up%20Leavely'

  const variants: Record<1 | 2 | 3, { subject: string; html: string }> = {
    1: {
      subject: `Welcome to Leavely, ${rawGreeting}`,
      html: layout(`
        <h2 style="margin:0 0 12px;color:#111827;font-size:22px;">Welcome to Leavely, ${greeting}</h2>
        <p style="color:#374151;line-height:1.6;margin:0 0 12px;">
          Cheers for giving Leavely a go. I built this after years of running my own team and getting tired of holiday requests on WhatsApp and spreadsheets &mdash; so I really hope it saves you the same headache.
        </p>
        <p style="color:#374151;line-height:1.6;margin:0 0 16px;">
          You&rsquo;ve got <strong style="color:#059669;">14 days free</strong>, full access, no card needed. The quick win for day 1 is finishing the setup wizard so your leave year, bank holidays and first employee records are ready before the first request comes in.
        </p>

        ${button(onboardingUrl, 'Finish setting up your workspace')}

        <h3 style="margin:32px 0 12px;color:#111827;font-size:16px;font-weight:700;">Common first questions</h3>
        <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <div style="padding:14px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;">
            <p style="margin:0;color:#111827;font-size:14px;font-weight:600;">How long does setup take?</p>
            <p style="margin:6px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">About 2 minutes. Pick your country, answer 4 questions, invite your team. Bank holidays auto-load.</p>
          </div>
          <div style="padding:14px 16px;border-bottom:1px solid #e5e7eb;">
            <p style="margin:0;color:#111827;font-size:14px;font-weight:600;">What happens after the 14 days?</p>
            <p style="margin:6px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">&pound;8 per active user per month. We&rsquo;ll email a few days before the trial ends &mdash; nothing charges until you add a card.</p>
          </div>
          <div style="padding:14px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;">
            <p style="margin:0;color:#111827;font-size:14px;font-weight:600;">Can I import from Timetastic or spreadsheets?</p>
            <p style="margin:6px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">Yes &mdash; drop a CSV with firstName, lastName and email into the wizard. Or invite people one by one. Or skip and add them later.</p>
          </div>
          <div style="padding:14px 16px;">
            <p style="margin:0;color:#111827;font-size:14px;font-weight:600;">Can I cancel?</p>
            <p style="margin:6px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">Any time. Export your data first if you want &mdash; there&rsquo;s a one-click CSV export on every list.</p>
          </div>
        </div>

        <h3 style="margin:32px 0 12px;color:#111827;font-size:16px;font-weight:700;">Stuck? I&rsquo;ll help.</h3>
        <p style="color:#374151;line-height:1.6;margin:0 0 16px;">
          Hit reply to this email and it goes straight to me. Or grab 15 minutes if you&rsquo;d rather walk through it together &mdash; I do these calls personally:
        </p>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 20px;">
          <tr>
            <td align="center" style="border-radius:8px;background:#ffffff;border:1px solid #d1d5db;padding:0;">
              <a href="${bookCallUrl}" style="display:inline-block;padding:11px 22px;color:#111827;font-size:14px;font-weight:600;text-decoration:none;">Book a 15-min setup call</a>
            </td>
            <td style="width:8px;"></td>
            <td align="center" style="border-radius:8px;background:#ffffff;border:1px solid #d1d5db;padding:0;">
              <a href="${replyUrl}" style="display:inline-block;padding:11px 22px;color:#111827;font-size:14px;font-weight:600;text-decoration:none;">Email me directly</a>
            </td>
          </tr>
        </table>

        <p style="color:#6b7280;font-size:13px;line-height:1.5;margin:24px 0 4px;">
          Thanks again, and enjoy your weekends back.
        </p>
        <p style="color:#111827;font-size:14px;font-weight:600;margin:0;">Keiron</p>
        <p style="color:#9ca3af;font-size:12px;margin:2px 0 0;">Founder, Leavely</p>
      `),
    },
    2: {
      subject: 'Day 3: try the feature that replaces the spreadsheet',
      html: layout(`
        <h2 style="margin:0 0 12px;color:#111827;font-size:22px;">Run one leave request end to end</h2>
        <p style="margin:0 0 12px;color:#374151;">Hi ${greeting},</p>
        <p style="margin:0 0 16px;color:#374151;">
          By day 3, the best feature to test is the full approval flow. Add one real employee, submit one leave request, approve it as a manager, and check the calendar and balance update afterwards.
        </p>

        <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin:0 0 20px;">
          <div style="padding:14px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;">
            <p style="margin:0;color:#111827;font-size:14px;font-weight:700;">1. Add or invite one employee</p>
            <p style="margin:6px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">Import a CSV or add a few employees manually so balances and the shared calendar mean something.</p>
          </div>
          <div style="padding:14px 16px;border-bottom:1px solid #e5e7eb;">
            <p style="margin:0;color:#111827;font-size:14px;font-weight:700;">2. Submit and approve a leave request</p>
            <p style="margin:6px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">Check the employee view, manager approval, email notification and automatic balance update.</p>
          </div>
          <div style="padding:14px 16px;background:#f9fafb;">
            <p style="margin:0;color:#111827;font-size:14px;font-weight:700;">3. Open the calendar and reports</p>
            <p style="margin:6px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">Spot clashes, sickness patterns and remaining allowance without chasing managers for updates.</p>
          </div>
        </div>

        ${button(dashboardUrl, 'Open my Leavely workspace')}

        <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
          Quick links: <a href="${employeesUrl}" style="color:#059669;text-decoration:none;font-weight:600;">employees</a>,
          <a href="${leaveUrl}" style="color:#059669;text-decoration:none;font-weight:600;">leave requests</a>,
          <a href="${calendarUrl}" style="color:#059669;text-decoration:none;font-weight:600;">calendar</a>,
          and <a href="${reportsUrl}" style="color:#059669;text-decoration:none;font-weight:600;">reports</a>.
        </p>
      `),
    },
    3: {
      subject: 'Day 7: is Leavely paying for itself yet?',
      html: layout(`
        <h2 style="margin:0 0 12px;color:#111827;font-size:22px;">A simple ROI check for your trial</h2>
        <p style="margin:0 0 12px;color:#374151;">Hi ${greeting},</p>
        <p style="margin:0 0 16px;color:#374151;">
          By day 7, you should have enough signal to decide whether Leavely saves more admin time than it costs. For most small teams, the maths is less about software and more about the hours lost to chasing requests, updating spreadsheets and fixing balance mistakes.
        </p>

        <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin:0 0 20px;">
          <div style="padding:14px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;">
            <p style="margin:0;color:#111827;font-size:14px;font-weight:700;">A 12-person team usually has 250+ leave admin touches a year</p>
            <p style="margin:6px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">Requests, approvals, calendar updates, balance checks and sickness notes add up quickly when they sit across spreadsheets, email and chat.</p>
          </div>
          <div style="padding:14px 16px;border-bottom:1px solid #e5e7eb;">
            <p style="margin:0;color:#111827;font-size:14px;font-weight:700;">Saving one hour per month covers a small team</p>
            <p style="margin:6px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">Leavely is &pound;8 per active user per month. If it removes one messy admin session, the trial is already pointing in the right direction.</p>
          </div>
          <div style="padding:14px 16px;background:#f9fafb;">
            <p style="margin:0;color:#111827;font-size:14px;font-weight:700;">The strongest proof is your own data</p>
            <p style="margin:6px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">Open reports, compare balances against your old sheet, and check whether approvals now happen without someone manually updating three places.</p>
          </div>
        </div>

        ${button(reportsUrl, 'Check my trial ROI')}

        <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
          If the value is unclear, reply with your team size and current leave process and I&rsquo;ll help you sanity-check the numbers.
        </p>
      `),
    },
  }

  const variant = variants[step]
  await sendMail({
    to,
    subject: variant.subject,
    html: variant.html,
  })
}

export async function sendLeaveApprovedEmail(
  to: string,
  employeeName: string,
  dates: string,
  policyName: string,
  leaveUrl?: string
) {
  // Audit follow-up: escape every user-controlled string before it hits
  // the HTML template. Tenant-renamed policies, employee names with
  // angle brackets, and dates from form input all reach this function.
  const safe = {
    employeeName: escapeHtml(employeeName || 'there'),
    dates: escapeHtml(dates),
    policyName: escapeHtml(policyName),
  }
  // Deliberately keep the policy name OUT of the subject. Some tenants use
  // sensitive policy names ("Bereavement", "IVF leave", "Mental health day")
  // that shouldn't leak into phone lock-screen previews or shared inboxes.
  // The body keeps the full context for the recipient.
  await sendMail({
    to,
    subject: `Leave approved for ${dates}`,
    html: layout(`
      <h1 style="margin:0 0 8px;color:#111827;font-size:22px;font-weight:700;">Leave approved</h1>
      <p style="margin:0 0 4px;color:#374151;">Hi ${safe.employeeName},</p>
      <p style="margin:0 0 8px;color:#374151;">Good news &mdash; your leave request has been approved.</p>
      ${detailCard([
        { label: 'Type', value: safe.policyName },
        { label: 'Dates', value: safe.dates },
        { label: 'Status', value: 'Approved' },
      ])}
      ${leaveUrl ? button(leaveUrl, 'View request') : ''}
      <p style="margin:0;color:#6b7280;font-size:13px;">Have a great time off.</p>
    `),
  })
}

export async function sendLeaveRejectedEmail(
  to: string,
  employeeName: string,
  dates: string,
  policyName: string,
  reason?: string,
  leaveUrl?: string
) {
  // Audit follow-up: escape user-controlled strings.
  const safe = {
    employeeName: escapeHtml(employeeName || 'there'),
    dates: escapeHtml(dates),
    policyName: escapeHtml(policyName),
    reason: reason ? escapeHtml(reason) : undefined,
  }
  await sendMail({
    to,
    subject: `Leave declined for ${dates}`,
    html: layout(`
      <h1 style="margin:0 0 8px;color:#111827;font-size:22px;font-weight:700;">Leave declined</h1>
      <p style="margin:0 0 4px;color:#374151;">Hi ${safe.employeeName},</p>
      <p style="margin:0 0 8px;color:#374151;">Your leave request has been declined.</p>
      ${detailCard([
        { label: 'Type', value: safe.policyName },
        { label: 'Dates', value: safe.dates },
        { label: 'Status', value: 'Declined' },
        ...(safe.reason ? [{ label: 'Reason', value: safe.reason }] : []),
      ])}
      ${leaveUrl ? button(leaveUrl, 'View request', '#dc2626') : ''}
      <p style="margin:0;color:#6b7280;font-size:13px;">Please contact your manager if you have any questions.</p>
    `),
  })
}

export async function sendNewLeaveRequestEmail(
  to: string,
  managerName: string,
  employeeName: string,
  dates: string,
  policyName: string,
  leaveUrl?: string
) {
  const url = leaveUrl || appBaseUrl()
  // Audit follow-up: escape user-controlled strings.
  const safe = {
    managerName: escapeHtml(managerName || 'there'),
    employeeName: escapeHtml(employeeName),
    dates: escapeHtml(dates),
    policyName: escapeHtml(policyName),
  }
  // Subject omits the policy name on purpose — see sendLeaveApprovedEmail for
  // the reasoning. Employee name is fine (managers already know it).
  await sendMail({
    to,
    subject: `New leave request from ${employeeName}`,
    html: layout(`
      <h1 style="margin:0 0 8px;color:#111827;font-size:22px;font-weight:700;">New leave request</h1>
      <p style="margin:0 0 4px;color:#374151;">Hi ${safe.managerName},</p>
      <p style="margin:0 0 8px;color:#374151;"><strong>${safe.employeeName}</strong> has submitted a new request that needs your review.</p>
      ${detailCard([
        { label: 'Employee', value: safe.employeeName },
        { label: 'Type', value: safe.policyName },
        { label: 'Dates', value: safe.dates },
        { label: 'Status', value: 'Awaiting approval' },
      ])}
      ${button(url, 'Review request')}
      <p style="margin:0;color:#6b7280;font-size:13px;">You can approve or decline this request from your Leavely dashboard.</p>
    `),
  })
}

export async function sendWelcomeEmail(to: string, userName: string, tenantSlug: string) {
  await sendTrialOnboardingSequenceEmail(to, userName, tenantSlug, 1)
}

export async function sendNewSignupNotification(userName: string, companyName: string, userEmail: string) {
  // Audit follow-up: a hostile signup with a `<script>` payload in the
  // company name would otherwise reach the founders' inbox unescaped.
  const safe = {
    userName: escapeHtml(userName || '(no name)'),
    companyName: escapeHtml(companyName),
    userEmail: escapeHtml(userEmail),
  }
  const adminUrl = `${appBaseUrl()}/admin/tenants`
  // Pre-filled welcome reply makes it one click for Keiron to send a
  // personal "thanks for signing up" — biggest activation lever for
  // tiny SMB SaaS.
  const replyUrl = `mailto:${userEmail}?subject=${encodeURIComponent(`Hi ${userName?.split(' ')[0] || 'there'} — welcome to Leavely`)}&body=${encodeURIComponent(`Hi ${userName?.split(' ')[0] || 'there'},\n\nThanks for trying Leavely — really appreciate it. Quick personal hello: I'm Keiron, the founder. If you'd like a 15-minute walk-through to get set up I'd be happy to jump on a call.\n\nEither way, hit reply if you get stuck on anything.\n\nCheers,\nKeiron`)}`
  await sendMail({
    to: 'hello@leavely.online',
    subject: `🎉 New signup: ${companyName}`,
    html: layout(`
      <p style="margin:0 0 4px;color:#059669;font-size:13px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">Activation alert</p>
      <h2 style="margin:0 0 4px;color:#111827;font-size:22px;">${safe.companyName} just signed up</h2>
      <p style="margin:0 0 20px;color:#6b7280;font-size:14px;">Worth a personal hello in the next hour — early replies materially lift activation.</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;margin:0 0 24px;">
        <tr>
          <td style="padding:14px 16px;width:120px;color:#6b7280;font-size:13px;font-weight:500;">Name</td>
          <td style="padding:14px 16px;color:#111827;font-size:14px;font-weight:600;">${safe.userName}</td>
        </tr>
        <tr>
          <td style="padding:14px 16px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:13px;font-weight:500;">Company</td>
          <td style="padding:14px 16px;border-top:1px solid #e5e7eb;color:#111827;font-size:14px;font-weight:600;">${safe.companyName}</td>
        </tr>
        <tr>
          <td style="padding:14px 16px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:13px;font-weight:500;">Email</td>
          <td style="padding:14px 16px;border-top:1px solid #e5e7eb;color:#111827;font-size:14px;font-weight:600;">
            <a href="mailto:${safe.userEmail}" style="color:#059669;text-decoration:none;">${safe.userEmail}</a>
          </td>
        </tr>
      </table>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
        <tr>
          <td align="center" style="border-radius:8px;background:#059669;">
            <a href="${replyUrl}" style="display:inline-block;padding:13px 22px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;">✉️ Send a personal welcome</a>
          </td>
          <td style="width:10px;"></td>
          <td align="center" style="border-radius:8px;background:#ffffff;border:1px solid #d1d5db;">
            <a href="${adminUrl}" style="display:inline-block;padding:12px 22px;color:#111827;font-size:14px;font-weight:600;text-decoration:none;">View in admin</a>
          </td>
        </tr>
      </table>
    `),
  })
}

export async function sendTrialMilestoneRiskAlert(params: {
  companyName: string
  tenantSlug: string
  ownerName: string
  ownerEmail: string
  trialAgeHours: number
  missingMilestones: string[]
  completedMilestones: string[]
}) {
  const safe = {
    companyName: escapeHtml(params.companyName),
    ownerName: escapeHtml(params.ownerName || '(no name)'),
    ownerEmail: escapeHtml(params.ownerEmail),
    tenantSlug: escapeHtml(params.tenantSlug),
  }
  const adminUrl = `${appBaseUrl()}/admin/tenants`
  const workspaceUrl = `${appBaseUrl()}/t/${params.tenantSlug}/dashboard`
  const replyUrl = `mailto:${params.ownerEmail}?subject=${encodeURIComponent('Need help finishing Leavely setup?')}&body=${encodeURIComponent(`Hi ${params.ownerName?.split(' ')[0] || 'there'},\n\nI noticed you started a Leavely trial but may not have had a chance to test the full leave workflow yet.\n\nWould a quick setup hand be useful?\n\nCheers,\nKeiron`)}`
  const missing = params.missingMilestones.map((milestone) => escapeHtml(milestone)).join(', ')
  const completed =
    params.completedMilestones.length > 0
      ? params.completedMilestones.map((milestone) => escapeHtml(milestone)).join(', ')
      : 'None yet'

  await sendMail({
    to: 'hello@leavely.online',
    subject: `At-risk trial: ${params.companyName}`,
    html: layout(`
      <p style="margin:0 0 4px;color:#dc2626;font-size:13px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">Trial risk alert</p>
      <h2 style="margin:0 0 4px;color:#111827;font-size:22px;">${safe.companyName} is missing activation milestones</h2>
      <p style="margin:0 0 20px;color:#6b7280;font-size:14px;">
        This trial is ${Math.round(params.trialAgeHours)} hours old and has not completed the full setup-request-approval-calendar path.
      </p>

      ${detailCard([
        { label: 'Company', value: safe.companyName },
        { label: 'Owner', value: `${safe.ownerName} (${safe.ownerEmail})` },
        { label: 'Workspace', value: safe.tenantSlug },
        { label: 'Missing', value: missing },
        { label: 'Completed', value: completed },
      ])}

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
        <tr>
          <td align="center" style="border-radius:8px;background:#059669;">
            <a href="${replyUrl}" style="display:inline-block;padding:13px 22px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;">Send setup nudge</a>
          </td>
          <td style="width:10px;"></td>
          <td align="center" style="border-radius:8px;background:#ffffff;border:1px solid #d1d5db;">
            <a href="${workspaceUrl}" style="display:inline-block;padding:12px 22px;color:#111827;font-size:14px;font-weight:600;text-decoration:none;">Open workspace</a>
          </td>
          <td style="width:10px;"></td>
          <td align="center" style="border-radius:8px;background:#ffffff;border:1px solid #d1d5db;">
            <a href="${adminUrl}" style="display:inline-block;padding:12px 22px;color:#111827;font-size:14px;font-weight:600;text-decoration:none;">Admin</a>
          </td>
        </tr>
      </table>
    `),
  })
}

/**
 * Send an invitation email. Callers may pass either the full accept URL
 * (`/invite/<token>`) as `inviteUrlOrToken`, or just the raw token for
 * backward compatibility with older call sites.
 *
 * The old positional signature used to take `(to, inviterName, tenantName,
 * role, token)`. That meant `createInvite` had no easy way to include the URL
 * it had already built, so we accept both shapes.
 */
export async function sendInviteEmail(
  to: string,
  inviterName: string,
  tenantName: string,
  role: string,
  inviteUrlOrToken: string
) {
  const acceptUrl = inviteUrlOrToken.startsWith('http')
    ? inviteUrlOrToken
    : `${appBaseUrl()}/invite/${inviteUrlOrToken}`

  // Audit follow-up: escape user-controlled strings.
  const safe = {
    inviterName: escapeHtml(inviterName || 'A Leavely admin'),
    tenantName: escapeHtml(tenantName),
    role: escapeHtml(role),
  }

  await sendMail({
    to,
    subject: `You've been invited to join ${tenantName} on Leavely`,
    html: layout(`
      <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">You&rsquo;re invited!</h2>
      <p style="color:#6b7280;line-height:1.6;">
        ${safe.inviterName} has invited you to join <strong>${safe.tenantName}</strong> as <strong>${safe.role}</strong> on Leavely &mdash; the simple way to manage team leave.
      </p>
      ${button(acceptUrl, 'Accept invitation')}
      <p style="color:#9ca3af;font-size:13px;">
        If you don&rsquo;t have an account yet, you&rsquo;ll be asked to create one first. This invite link will expire in 7 days.
      </p>
    `),
  })
}

export interface PendingRequestSummary {
  employeeName: string
  dates: string
  policyName: string
}

export async function sendPendingApprovalReminderEmail(
  managerEmail: string,
  managerName: string,
  pendingRequests: PendingRequestSummary[],
  tenantSlug: string
) {
  const leaveUrl = `${appBaseUrl()}/t/${tenantSlug}/leave`
  const count = pendingRequests.length

  // Audit follow-up: escape every per-row field — these are the
  // employee names, dates and policy names that managers see in their
  // approval reminder, all user-controllable.
  const safeManagerName = escapeHtml(managerName || 'there')
  const requestRows = pendingRequests
    .map(
      (r) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:14px;color:#111827;">${escapeHtml(r.employeeName)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:14px;color:#6b7280;">${escapeHtml(r.dates)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-size:14px;color:#6b7280;">${escapeHtml(r.policyName)}</td>
        </tr>`
    )
    .join('')

  await sendMail({
    to: managerEmail,
    subject: `You have ${count} pending leave request${count === 1 ? '' : 's'}`,
    html: layout(`
      <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">Pending Leave Requests</h2>
      <p style="color:#6b7280;line-height:1.6;">
        Hi ${safeManagerName}, you have <strong>${count}</strong> pending leave request${count === 1 ? '' : 's'} awaiting your review.
      </p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;">
        <thead>
          <tr style="background:#f9fafb;">
            <th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:#6b7280;border-bottom:1px solid #e5e7eb;">Employee</th>
            <th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:#6b7280;border-bottom:1px solid #e5e7eb;">Dates</th>
            <th style="padding:8px 12px;text-align:left;font-size:12px;font-weight:600;color:#6b7280;border-bottom:1px solid #e5e7eb;">Type</th>
          </tr>
        </thead>
        <tbody>
          ${requestRows}
        </tbody>
      </table>
      ${button(leaveUrl, 'Review requests')}
    `),
  })
}

/**
 * Sent from the Stripe `invoice.payment_failed` webhook to the tenant's
 * OWNER. Intentionally plain HTML (no marketing) + text fallback so it slips
 * past anti-spam filters even when the from-domain isn't warmed up.
 * Added for issue #98 — do not refactor existing templates.
 */
export async function sendPaymentFailedEmail(
  to: string,
  ownerName: string,
  tenantSlug: string,
  attemptCount: number = 1
) {
  const baseUrl = appBaseUrl()
  const billingUrl = `${baseUrl}/t/${tenantSlug}/settings/billing`

  // Audit follow-up: escape owner name.
  const safeOwnerName = escapeHtml(ownerName)
  const html = layout(`
    <h1 style="margin:0 0 16px;color:#b91c1c;font-size:22px;font-weight:700;">Payment failed</h1>
    <p style="margin:0 0 12px;color:#374151;">Hi ${safeOwnerName},</p>
    <p style="margin:0 0 12px;color:#374151;">
      We tried to charge your card for your Leavely subscription and it didn&rsquo;t go through
      (attempt #${attemptCount}). Your account has been marked <strong>Past Due</strong>.
    </p>
    <p style="margin:0 0 12px;color:#374151;">
      Stripe will retry automatically over the next few days, but the fastest fix is to update
      your card details now so your team isn&rsquo;t locked out.
    </p>
    ${button(billingUrl, 'Update payment method', '#dc2626')}
    <p style="margin:0;color:#6b7280;font-size:13px;">
      If you think this is a mistake, reply to this email and we&rsquo;ll take a look.
    </p>
  `)

  // Route through sendMail() so this billing email gets the same treatment
  // as every other transactional: monitored replyTo (so a confused customer
  // replying to "your payment failed" lands in a monitored inbox instead
  // of the black hole), sanitised Subject header, and a plaintext fallback
  // derived from the HTML for deliverability. The previous direct
  // getResend().emails.send() call silently bypassed all three.
  await sendMail({
    to,
    subject: 'Action required: Leavely payment failed',
    html,
  })
}

/**
 * Sent from the Stripe `customer.subscription.trial_will_end` webhook — Stripe
 * fires this 3 days before the trial ends. Added for issue #100. Kept as a
 * thin wrapper around a fresh template so it doesn't collide with
 * sendTrialExpiryEmail (which is called from the in-app banner).
 */
export async function sendTrialExpiringEmail(
  to: string,
  ownerName: string,
  tenantSlug: string,
  daysRemaining: number
) {
  const baseUrl = appBaseUrl()
  const billingUrl = `${baseUrl}/t/${tenantSlug}/settings/billing`

  // Audit follow-up: escape owner name.
  const safeTrialOwner = escapeHtml(ownerName)
  const html = layout(`
    <h1 style="margin:0 0 16px;color:#111827;font-size:22px;font-weight:700;">Your trial ends in ${daysRemaining} day${daysRemaining === 1 ? '' : 's'}</h1>
    <p style="margin:0 0 12px;color:#374151;">Hi ${safeTrialOwner},</p>
    <p style="margin:0 0 12px;color:#374151;">
      Your Leavely free trial ends in <strong>${daysRemaining} day${daysRemaining === 1 ? '' : 's'}</strong>.
      To keep full access &mdash; submitting leave, approving requests, inviting teammates &mdash;
      add a card now and we&rsquo;ll switch you straight to a paid subscription when the trial
      runs out.
    </p>
    ${button(billingUrl, 'Subscribe now')}
    <p style="margin:0;color:#6b7280;font-size:13px;">
      Not ready to subscribe? No problem &mdash; your data stays safe, the app just goes
      read-only until you do.
    </p>
  `)

  // Route through sendMail() so the billing email gets monitored replyTo,
  // sanitised Subject and a plaintext fallback. Previously called
  // getResend().emails.send() directly, bypassing all three.
  await sendMail({
    to,
    subject: `Your Leavely trial ends in ${daysRemaining} day${daysRemaining === 1 ? '' : 's'}`,
    html,
  })
}

export async function sendTrialExpiryEmail(to: string, ownerName: string, tenantSlug: string, daysLeft: number) {
  const billingUrl = `${appBaseUrl()}/t/${tenantSlug}/settings/billing`
  const safeOwner = escapeHtml(ownerName || 'there')

  await sendMail({
    to,
    subject: `Your Leavely trial ends in ${daysLeft} day${daysLeft === 1 ? '' : 's'}`,
    html: layout(`
      <h2 style="margin:0 0 16px;color:#111827;font-size:20px;">Your trial is ending soon</h2>
      <p style="color:#6b7280;line-height:1.6;">
        Hi ${safeOwner}, your Leavely trial ends in <strong>${daysLeft} day${daysLeft === 1 ? '' : 's'}</strong>.
        After that, your account will switch to read-only mode &mdash; you won&rsquo;t be able to submit or approve leave requests.
      </p>
      <p style="color:#6b7280;line-height:1.6;">
        Subscribe now to keep everything running smoothly. It&rsquo;s just &pound;8 per employee per month.
      </p>
      ${button(billingUrl, 'Subscribe now')}
    `),
  })
}

export async function sendTrialExpirySequenceEmail(
  to: string,
  ownerName: string,
  tenantSlug: string,
  step: 1 | 2 | 3,
) {
  const baseUrl = appBaseUrl()
  const dashboardUrl = `${baseUrl}/t/${tenantSlug}/dashboard`
  const billingUrl = `${baseUrl}/t/${tenantSlug}/settings/billing`
  const employeesUrl = `${baseUrl}/t/${tenantSlug}/employees`
  const reportsUrl = `${baseUrl}/t/${tenantSlug}/reports`
  const rawGreeting = ownerName?.split(' ')[0] || 'there'
  const greeting = escapeHtml(rawGreeting)
  const replyUrl = 'mailto:hello@leavely.online?subject=Leavely%20trial%20question'

  const variants: Record<1 | 2 | 3, { subject: string; html: string }> = {
    1: {
      subject: '4 days left in your Leavely trial',
      html: layout(`
        <h2 style="margin:0 0 12px;color:#111827;font-size:22px;">Your trial is in the decision window</h2>
        <p style="margin:0 0 12px;color:#374151;">Hi ${greeting},</p>
        <p style="margin:0 0 16px;color:#374151;">
          You are on day 10 of your Leavely trial. The best next step is to check whether the core workflow is ready for real use: team members in, leave rules matching, and at least one request tested end to end.
        </p>
        <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin:0 0 20px;">
          <div style="padding:14px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;">
            <p style="margin:0;color:#111827;font-size:14px;font-weight:700;">1. Invite or import the team</p>
            <p style="margin:6px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">A trial is easiest to judge when balances and the calendar reflect real people.</p>
          </div>
          <div style="padding:14px 16px;border-bottom:1px solid #e5e7eb;">
            <p style="margin:0;color:#111827;font-size:14px;font-weight:700;">2. Submit and approve leave</p>
            <p style="margin:6px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">Check manager approval, employee notification and automatic balance updates.</p>
          </div>
          <div style="padding:14px 16px;background:#f9fafb;">
            <p style="margin:0;color:#111827;font-size:14px;font-weight:700;">3. Compare reports with your current process</p>
            <p style="margin:6px 0 0;color:#6b7280;font-size:13px;line-height:1.5;">If the numbers match and the admin is lighter, moving over is low-risk.</p>
          </div>
        </div>
        ${button(dashboardUrl, 'Open my trial workspace')}
        <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
          Quick links: <a href="${employeesUrl}" style="color:#059669;text-decoration:none;font-weight:600;">employees</a> and <a href="${reportsUrl}" style="color:#059669;text-decoration:none;font-weight:600;">reports</a>.
        </p>
      `),
    },
    2: {
      subject: '2 days left: keep Leavely running',
      html: layout(`
        <h2 style="margin:0 0 12px;color:#111827;font-size:22px;">Two days left in your trial</h2>
        <p style="margin:0 0 12px;color:#374151;">Hi ${greeting},</p>
        <p style="margin:0 0 16px;color:#374151;">
          Your Leavely trial is almost finished. To keep full access for leave requests, approvals, sickness tracking, TOIL, reports and team records, add billing before the trial ends.
        </p>
        <p style="margin:0 0 16px;color:#374151;">
          Pricing is simple: <strong>&pound;8 per active user per month</strong>, with every feature included and no annual contract.
        </p>
        ${button(billingUrl, 'Add billing details')}
        <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
          Not sure yet? <a href="${replyUrl}" style="color:#059669;text-decoration:none;font-weight:600;">Reply with your question</a> and it comes straight to us.
        </p>
      `),
    },
    3: {
      subject: 'Your Leavely trial ends today',
      html: layout(`
        <h2 style="margin:0 0 12px;color:#111827;font-size:22px;">Your trial ends today</h2>
        <p style="margin:0 0 12px;color:#374151;">Hi ${greeting},</p>
        <p style="margin:0 0 16px;color:#374151;">
          Today is day 14 of your Leavely trial. Add billing now to keep your workspace active for the team without interruption.
        </p>
        <p style="margin:0 0 16px;color:#374151;">
          If you do not subscribe, your workspace will switch to read-only after the trial ends. Your data stays safe, but the team will not be able to submit or approve leave until billing is active.
        </p>
        ${button(billingUrl, 'Subscribe and keep access')}
        <p style="margin:0;color:#6b7280;font-size:13px;line-height:1.5;">
          If timing is the issue, reply to this email and we can help you work out the cleanest next step.
        </p>
      `),
    },
  }

  const variant = variants[step]
  await sendMail({
    to,
    subject: variant.subject,
    html: variant.html,
  })
}

/**
 * Notify an employee that their APPROVED leave was extended by a manager.
 * Mirrors the approved/declined emails but with an "extended" framing so the
 * recipient isn't confused about the double notification.
 */
export async function sendLeaveExtendedEmail(
  to: string,
  employeeName: string,
  previousDates: string,
  newDates: string,
  policyName: string,
  leaveUrl?: string
) {
  const safe = {
    employeeName: escapeHtml(employeeName || 'there'),
    previousDates: escapeHtml(previousDates),
    newDates: escapeHtml(newDates),
    policyName: escapeHtml(policyName),
  }
  await sendMail({
    to,
    subject: `Your leave has been extended to ${newDates}`,
    html: layout(`
      <h1 style="margin:0 0 8px;color:#111827;font-size:22px;font-weight:700;">Leave extended</h1>
      <p style="margin:0 0 4px;color:#374151;">Hi ${safe.employeeName},</p>
      <p style="margin:0 0 8px;color:#374151;">Your manager has extended your approved leave.</p>
      ${detailCard([
        { label: 'Type', value: safe.policyName },
        { label: 'Previous', value: safe.previousDates },
        { label: 'New', value: safe.newDates },
        { label: 'Status', value: 'Approved' },
      ])}
      ${leaveUrl ? button(leaveUrl, 'View request') : ''}
      <p style="margin:0;color:#6b7280;font-size:13px;">If you didn&rsquo;t expect this change, speak to your manager.</p>
    `),
  })
}

/**
 * Notify an employee that a manager has changed the start/end dates on
 * an existing leave request (via editLeaveRequestDates — distinct from
 * extendLeaveRequest, which bumps only the end date). Without this the
 * employee's approved leave silently moves to new dates and they only
 * discover it next time they open the app, at which point they've
 * potentially already booked travel on the original dates.
 */
export async function sendLeaveDatesUpdatedEmail(
  to: string,
  employeeName: string,
  previousDates: string,
  newDates: string,
  policyName: string,
  leaveUrl?: string
) {
  const safe = {
    employeeName: escapeHtml(employeeName || 'there'),
    previousDates: escapeHtml(previousDates),
    newDates: escapeHtml(newDates),
    policyName: escapeHtml(policyName),
  }
  await sendMail({
    to,
    subject: `Your leave dates have been updated to ${newDates}`,
    html: layout(`
      <h1 style="margin:0 0 8px;color:#111827;font-size:22px;font-weight:700;">Leave dates updated</h1>
      <p style="margin:0 0 4px;color:#374151;">Hi ${safe.employeeName},</p>
      <p style="margin:0 0 8px;color:#374151;">Your manager has changed the dates on one of your leave requests.</p>
      ${detailCard([
        { label: 'Type', value: safe.policyName },
        { label: 'Previous', value: safe.previousDates },
        { label: 'New', value: safe.newDates },
      ])}
      ${leaveUrl ? button(leaveUrl, 'View request') : ''}
      <p style="margin:0;color:#6b7280;font-size:13px;">If you didn&rsquo;t expect this change, speak to your manager before making any travel plans around the original dates.</p>
    `),
  })
}

/**
 * Notify an employee that one of their leave requests was cancelled by
 * someone else (a manager or admin). Callers should skip this when the
 * employee themselves cancelled — they already know.
 */
export async function sendLeaveCancelledEmail(
  to: string,
  employeeName: string,
  dates: string,
  policyName: string,
  cancelledByName: string,
  leaveUrl?: string
) {
  const safe = {
    employeeName: escapeHtml(employeeName || 'there'),
    dates: escapeHtml(dates),
    policyName: escapeHtml(policyName),
    cancelledByName: escapeHtml(cancelledByName || 'Your manager'),
  }
  await sendMail({
    to,
    subject: `Your leave for ${dates} has been cancelled`,
    html: layout(`
      <h1 style="margin:0 0 8px;color:#111827;font-size:22px;font-weight:700;">Leave cancelled</h1>
      <p style="margin:0 0 4px;color:#374151;">Hi ${safe.employeeName},</p>
      <p style="margin:0 0 8px;color:#374151;">${safe.cancelledByName} has cancelled one of your leave requests.</p>
      ${detailCard([
        { label: 'Type', value: safe.policyName },
        { label: 'Dates', value: safe.dates },
        { label: 'Status', value: 'Cancelled' },
      ])}
      ${leaveUrl ? button(leaveUrl, 'View request', '#dc2626') : ''}
      <p style="margin:0;color:#6b7280;font-size:13px;">If this was a mistake, please contact your manager.</p>
    `),
  })
}
