# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Leavely OSS, please **do not open a
public GitHub issue**. Instead, report it privately:

- Use GitHub's [private security advisory](https://github.com/Kez6539/opensource-leavely/security/advisories/new) feature, **or**
- Email the maintainer directly.

Please include enough detail to reproduce the issue. We aim to acknowledge
reports within 5 working days and to provide a remediation timeline after triage.

When reporting, **do not include**:

- Real secrets, API keys, database URLs or passwords
- Real employee, customer or personal data
- Production screenshots containing sensitive information

## Supported Versions

This project is early-stage. Security fixes are applied to the latest `main`
branch. Pin a specific commit or release if you self-host in production.

| Version | Supported |
|---------|-----------|
| `main`  | ✅        |
| older   | ❌        |

## Secret Hygiene

This is the public, open-source edition of Leavely. It must never contain
production secrets, real database credentials or real personal data.

- All environment variables live in `.env` / `.env.local` / `.dev.vars`, which
  are git-ignored. Only `.env.example` and `.dev.vars.example` (placeholders)
  are committed.
- Passwords are hashed with bcrypt; plaintext passwords are never stored or logged.
- Before committing, run a secret scanner:

  ```bash
  # gitleaks
  gitleaks detect --source . --no-banner

  # or trufflehog
  trufflehog filesystem .
  ```

If you believe a secret has been committed, rotate it immediately and open a
private advisory.

## Responsible Disclosure

We ask that you give us a reasonable opportunity to remediate an issue before
any public disclosure. We will credit reporters who wish to be acknowledged.
