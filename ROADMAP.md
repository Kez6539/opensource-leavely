# Roadmap

Leavely OSS is the open-source edition of Leavely — leave and absence
management for small teams. This roadmap is a living document; priorities may
change based on contributor interest.

## ✅ Current (v0.x)

- Multi-tenant leave management (requests, approvals, balances)
- Part-time / pro-rata allowance calculations, half-days, carryover
- Employee directory with CSV import/export
- Visual absence calendar with public holidays
- Sick-leave tracking, return-to-work, Bradford Factor
- Reports (absence, annual leave, lateness, payroll exceptions)
- Audit logging
- Local email/password auth (bcrypt) + optional OAuth
- Demo tenant with fake seed data

## 🔜 Near term

- Simpler self-host path with plain PostgreSQL (fewer cloud dependencies)
- Docker Compose one-command local setup
- More public holiday regions and easier holiday data contributions
- Expanded test coverage for leave-calculation edge cases
- Improved mobile layout and accessibility pass

## 🌱 Later

- Google Calendar / Outlook / iCal integration
- Slack / Microsoft Teams notifications
- Role-based permissions refinements
- Localisation / translations
- Example demo deployment and hosted setup guide

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Good first issues are labelled in the
[issue tracker](https://github.com/Kez6539/opensource-leavely/issues).
