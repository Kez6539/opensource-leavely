# Leavely OSS

> Open-source leave and absence management for small teams.

Leavely OSS is a self-hostable, multi-tenant leave and absence management
platform for small businesses, contractors and distributed teams. It helps
teams manage annual leave, sickness, approvals, public holidays, part-time
allowance calculations, rotas, expenses and basic HR audit trails — something
clearer than a spreadsheet but lighter than a full enterprise HR platform.

This is the public, open-source edition of [Leavely](https://leavely.online).

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

## Security Notice

This repository is the public open-source version of Leavely. It must **not**
contain production secrets, real database credentials, Neon/Supabase keys, or
real employee/customer data.

Use `.env.example` as a template and keep real secrets in `.env.local` /
`.dev.vars`, which are git-ignored. Before committing, run a secret scanner —
see [SECURITY.md](./SECURITY.md). To report a vulnerability, **do not open a
public issue**; follow the process in [SECURITY.md](./SECURITY.md).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Server Actions, RSC) |
| Language | TypeScript (strict mode) |
| Database | Neon PostgreSQL (serverless) |
| ORM | Prisma 7 with PrismaNeon WebSocket adapter |
| Connection Pool | Cloudflare Hyperdrive (production) |
| Styling | Tailwind CSS 4, shadcn/ui, Radix UI, Lucide icons |
| Auth | iron-session + bcryptjs + Arctic (Google/LinkedIn OAuth) |
| Email | Resend |
| Payments | Stripe (checkout, portal, webhooks) |
| Hosting | Cloudflare Workers via opennextjs-cloudflare |
| Forms | React Hook Form + Zod validation |

## Features

- **Leave Management** — requests, approvals, balances, carryover, half-days
- **Employee Directory** — profiles, departments, CSV import/export
- **Visual Calendar** — who's off, public holidays, company leave blocks, department filter
- **QR Clock-In** — location-based clock-in with GPS verification (care homes, field workers)
- **Reports** — absence, annual leave, lateness, payroll exceptions, Bradford Factor
- **Team Analytics** — KPI dashboard with absence rate, headcount, top absentees
- **Rotas** — shift scheduling and management
- **Expenses** — expense claims and approvals
- **TOIL** — time off in lieu tracking
- **Performance** — goals, reviews, and tracking
- **Sick Leave** — Bradford Factor monitoring, fit notes, return-to-work interviews
- **In-App Notifications** — bell icon, notification centre, email + in-app
- **Billing** — Stripe per-seat billing with 14-day free trial
- **Multi-Tenant** — organisations with unique slugs, tenant switcher
- **RBAC** — Owner > Admin > Manager > Employee
- **Onboarding Wizard** — 4-step guided setup
- **Audit Log** — full action trail
- **Industry Add-Ons** — care homes (QR clock-in, visit logging), construction, cleaning, security

## Screenshots

> 📸 Screenshots coming soon. Drop images into `docs/screenshots/` and they'll
> render below. A live demo is available at
> [leavely.online/demo](https://leavely.online/demo) (logs in as a demo owner).

<!--
![Dashboard](docs/screenshots/dashboard.png)
![Team calendar](docs/screenshots/calendar.png)
![Leave request](docs/screenshots/leave-request.png)
-->

## Setup

```bash
pnpm install
cp .env.example .env    # add your Neon DATABASE_URL, SESSION_SECRET, etc.
npx prisma generate
npx prisma db push      # or pnpm prisma:migrate for migration-based approach
pnpm prisma:seed        # seed demo data
pnpm dev
```

## Environment Variables

| Variable | Required | Description |
|---|:---:|---|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string |
| `SESSION_SECRET` | Yes | iron-session password (32+ chars) |
| `GOOGLE_CLIENT_ID` | No | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth |
| `LINKEDIN_CLIENT_ID` | No | LinkedIn OAuth |
| `LINKEDIN_CLIENT_SECRET` | No | LinkedIn OAuth |
| `STRIPE_SECRET_KEY` | No | Stripe API key |
| `STRIPE_PRICE_ID` | No | Stripe per-seat price ID |
| `STRIPE_WEBHOOK_SECRET` | No | Stripe webhook signature |
| `RESEND_API_KEY` | No | Resend email API key |
| `NEXT_PUBLIC_CRISP_WEBSITE_ID` | No | Crisp website ID for pre-sale and trial chat widgets |

## Demo Users

After seeding (password: `password123`):

| User | Email | Role |
|---|---|---|
| Alice Johnson | owner@acme.test | OWNER |
| Bob Chen | admin@acme.test | ADMIN |
| Carol Williams | manager@acme.test | MANAGER |
| Dave Kumar | employee@acme.test | EMPLOYEE |

## Commands

```bash
pnpm dev              # Dev server
pnpm build            # Production build
pnpm run deploy       # Build + patch WASM + deploy to Cloudflare
pnpm test             # Run tests
npx prisma generate   # Regenerate Prisma client
npx prisma db push    # Push schema changes to DB
pnpm prisma:seed      # Seed demo data
npx tsc --noEmit      # Type-check
```

## Deployment

Deployed to Cloudflare Workers. The deploy script builds Next.js, patches WASM loading for the Cloudflare runtime (Prisma requires this), and pushes to Workers.

```bash
pnpm run deploy
```

You can also self-host on any platform that runs Next.js with a PostgreSQL
database. Cloudflare-specific deployment notes are in [docs/CLOUDFLARE.md](./docs/CLOUDFLARE.md).

## Contributing

Contributions are welcome — bug fixes, tests, docs, public holiday regions,
integrations and more. See [CONTRIBUTING.md](./CONTRIBUTING.md) and the
[ROADMAP.md](./ROADMAP.md). Please follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Licence

[MIT](./LICENSE) © 2026 Keiron Edginton

## Disclaimer

Leavely OSS is provided "as is" without warranty. It is not a substitute for
professional HR, legal or payroll advice. You are responsible for ensuring your
own use complies with applicable employment law and data-protection regulations
(e.g. UK GDPR).
