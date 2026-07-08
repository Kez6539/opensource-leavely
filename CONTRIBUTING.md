# Contributing to Leavely OSS

Thanks for your interest in improving Leavely OSS — an open-source leave and
absence management system for small teams. Contributions of all sizes are welcome.

## Ways to Help

- 🐛 **Bug fixes** — squash issues in leave calculations, approvals, UI, etc.
- 📖 **Documentation** — setup guides, deployment guides, self-hosting notes.
- ✅ **Tests** — especially edge cases in leave/holiday/pro-rata calculations.
- 🌍 **Public holiday regions** — add or correct holiday data for more countries.
- 🧮 **Leave calculation rules** — part-time, pro-rata, carryover edge cases.
- ♿ **Accessibility** — keyboard navigation, ARIA, contrast.
- 🌐 **Translations / localisation**.
- 📅 **Calendar integrations** — Google Calendar, Outlook, iCal.
- 📧 **Email notifications** — templates and delivery.
- 🚀 **Deployment guides** — Docker, Vercel, self-hosted Postgres.

## Getting Started

1. Fork the repo and clone your fork.
2. Install dependencies: `pnpm install` (or `npm install`).
3. Copy `.env.example` to `.env.local` and fill in placeholder values.
4. Run the database migrations and seed: see [README](./README.md).
5. Start the dev server: `pnpm dev`.

## Development Workflow

- Create a feature branch: `git checkout -b feat/your-feature`.
- Keep changes focused and small where possible.
- Run checks before opening a PR:

  ```bash
  pnpm lint      # ESLint
  pnpm test      # Vitest unit tests
  pnpm build     # Type-check + build
  ```

- Write or update tests for any behaviour you change.
- Follow the existing TypeScript strict-mode style.

## Security

**Never commit secrets or real personal data.** Use placeholder values only.
See [SECURITY.md](./SECURITY.md). Run a secret scan before pushing.

## Pull Requests

- Describe what changed and why.
- Reference any related issue.
- Ensure CI passes.
- Be kind and constructive in review.

## Code of Conduct

By participating you agree to abide by our
[Code of Conduct](./CODE_OF_CONDUCT.md).
