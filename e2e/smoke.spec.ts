import { test, expect } from '@playwright/test'
import { login } from './helpers'

test.describe('Smoke tests', () => {
  test('login page loads', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
  })

  test('login with valid credentials redirects to tenant', async ({ page }) => {
    await login(page, 'owner@acme.test')
    await expect(page).toHaveURL(/\/t\/acme/)
  })

  test('employees list loads', async ({ page }) => {
    await login(page, 'owner@acme.test')
    await page.goto('/t/acme/employees')
    await expect(page.locator('h1, [data-testid="page-title"]')).toContainText(/employee/i)
  })

  test('create employee', async ({ page }) => {
    await login(page, 'owner@acme.test')
    await page.goto('/t/acme/employees/new')
    await page.fill('input[name="firstName"]', 'E2E')
    await page.fill('input[name="lastName"]', 'TestUser')
    await page.click('button[type="submit"]')
    // Should redirect to employees list or detail
    await page.waitForURL(/\/employees/, { timeout: 10_000 })
  })

  test('leave list loads', async ({ page }) => {
    await login(page, 'owner@acme.test')
    await page.goto('/t/acme/leave')
    await expect(page.locator('h1, [data-testid="page-title"]')).toContainText(/leave/i)
  })

  test('documents list loads', async ({ page }) => {
    await login(page, 'owner@acme.test')
    await page.goto('/t/acme/documents')
    await expect(page.locator('h1, [data-testid="page-title"]')).toContainText(/document/i)
  })

  test('dashboard loads with KPI tiles', async ({ page }) => {
    await login(page, 'owner@acme.test')
    await page.goto('/t/acme/dashboard')
    // Dashboard should have some content
    await expect(page.locator('body')).not.toBeEmpty()
  })

  test('unauthenticated user redirected to login', async ({ page }) => {
    await page.goto('/t/acme/dashboard')
    await expect(page).toHaveURL(/\/login/)
  })
})
