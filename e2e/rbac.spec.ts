import { test, expect } from '@playwright/test'
import { loginAs } from './helpers'

// All routes that an EMPLOYEE-role user should NOT be able to reach
// even via URL-editing. The settings layout server-guard, the
// individual page guards, and the sidebar filter all enforce this —
// if any one of them regresses, this suite catches it.
const ADMIN_ONLY_PATHS = [
  '/settings',
  '/settings/general',
  '/settings/leave-policies',
  '/settings/holidays',
  '/settings/company-leave',
  '/settings/blackout-dates',
  '/settings/announcements',
  '/settings/locations',
  '/settings/onboarding',
  '/settings/users',
  '/settings/billing',
  '/settings/audit-log',
] as const

const MANAGER_ONLY_PATHS = ['/reports', '/rotas'] as const

test.describe('RBAC enforcement', () => {
  test('employee cannot reach any settings page (URL-edit attack)', async ({ page }) => {
    await loginAs(page, 'employee')
    for (const path of ADMIN_ONLY_PATHS) {
      const response = await page.goto(`/t/acme${path}`, { waitUntil: 'domcontentloaded' })
      // The settings layout server-guard redirects to /forbidden;
      // the page should also not contain admin form fields.
      const url = page.url()
      const denied = /forbidden|denied|permission/i.test(await page.content())
      const redirected = !url.includes(path)
      expect(denied || redirected, `Employee accessed ${path}`).toBe(true)
    }
  })

  test('employee cannot reach reports or rotas', async ({ page }) => {
    await loginAs(page, 'employee')
    for (const path of MANAGER_ONLY_PATHS) {
      await page.goto(`/t/acme${path}`)
      const url = page.url()
      const denied = /forbidden|denied|permission/i.test(await page.content())
      const redirected = !url.includes(path)
      expect(denied || redirected, `Employee accessed ${path}`).toBe(true)
    }
  })

  test('employee redirected from /employees list to their own profile', async ({ page }) => {
    await loginAs(page, 'employee')
    await page.goto('/t/acme/employees')
    // Should land on their own employee detail page (or dashboard fallback)
    await expect(page).not.toHaveURL(/\/employees\/?$/)
  })

  test('employee sidebar does NOT include Settings / Reports / Rotas / Employees', async ({ page }) => {
    await loginAs(page, 'employee')
    await page.goto('/t/acme/dashboard')

    // The sidebar nav links — neither the desktop sidebar nor the
    // mobile drawer should include any of these for an EMPLOYEE.
    const nav = page.locator('nav')
    await expect(nav.getByRole('link', { name: /^Settings$/ })).toHaveCount(0)
    await expect(nav.getByRole('link', { name: /^Reports$/ })).toHaveCount(0)
    await expect(nav.getByRole('link', { name: /^Rotas/ })).toHaveCount(0)
    await expect(nav.getByRole('link', { name: /^Employees$/ })).toHaveCount(0)
  })

  test('employee CAN reach Leave / TOIL / Profile / Performance / Documents', async ({ page }) => {
    await loginAs(page, 'employee')
    const allowed = ['/leave', '/leave/new', '/leave/report-sickness', '/toil', '/profile', '/performance', '/documents']
    for (const path of allowed) {
      const response = await page.goto(`/t/acme${path}`)
      expect(response?.status() ?? 0, `Employee blocked from ${path}`).toBeLessThan(400)
      // Should not redirect to /forbidden
      expect(page.url(), `Employee bounced from ${path}`).not.toMatch(/forbidden/)
    }
  })

  test('admin CAN access leave policies settings', async ({ page }) => {
    await loginAs(page, 'admin')
    await page.goto('/t/acme/settings/leave-policies')
    await expect(page.locator('h1, h2')).toContainText(/leave polic/i)
  })

  test('owner can access audit log', async ({ page }) => {
    await loginAs(page, 'owner')
    await page.goto('/t/acme/settings/audit-log')
    await expect(page.locator('h1, h2')).toContainText(/audit/i)
  })

  test('employee can access their own profile', async ({ page }) => {
    await loginAs(page, 'employee')
    await page.goto('/t/acme/profile')
    await expect(page.locator('h1')).toContainText(/profile/i)
  })
})
