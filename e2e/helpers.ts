import type { Page } from '@playwright/test'

const CREDENTIALS: Record<string, { email: string; password: string }> = {
  owner: { email: 'owner@acme.test', password: 'password123' },
  admin: { email: 'admin@acme.test', password: 'password123' },
  manager: { email: 'manager@acme.test', password: 'password123' },
  employee: { email: 'employee@acme.test', password: 'password123' },
}

export async function login(page: Page, email: string, password = 'password123') {
  await page.goto('/login')
  await page.fill('input[name="email"]', email)
  await page.fill('input[name="password"]', password)
  await page.click('button[type="submit"]')
  await page.waitForURL(/\/t\//, { timeout: 10_000 })
}

export async function loginAs(page: Page, role: keyof typeof CREDENTIALS) {
  const creds = CREDENTIALS[role]
  if (!creds) throw new Error(`Unknown role: ${String(role)}`)
  await login(page, creds.email, creds.password)
}
