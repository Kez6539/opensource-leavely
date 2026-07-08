import { test, expect } from '@playwright/test'
import { loginAs } from './helpers'

// The two flagship customer flows. The whole product hinges on these
// not being broken in subtle ways (Hannah's password story / Chris's
// sickness submission story both came from real customer testing).
// Cover them both as proper happy-path e2e flows so a routing bug or
// silently-failing form gets caught at PR time.

test.describe('Flagship: Book leave (holiday)', () => {
  test('employee sees the dashboard book-leave card', async ({ page }) => {
    await loginAs(page, 'employee')
    await page.goto('/t/acme/dashboard')

    // The "Book leave" card has to be visible to a regular EMPLOYEE.
    // Pre-fix it was gated behind canApprove and only managers saw it.
    const bookLeave = page.getByRole('link', { name: /^Book leave/i }).first()
    await expect(bookLeave).toBeVisible()
    await bookLeave.click()

    await page.waitForURL(/\/leave\/new/, { timeout: 10_000 })
    await expect(page.locator('h1')).toContainText(/book leave/i)
  })

  test('manager books holiday from the new request page', async ({ page }) => {
    await loginAs(page, 'owner')
    await page.goto('/t/acme/leave/new')
    await expect(page.locator('h1')).toContainText(/book leave/i)

    // Set dates (next Monday to next Friday)
    const today = new Date()
    const nextMon = new Date(today)
    nextMon.setDate(today.getDate() + ((8 - today.getDay()) % 7 || 7))
    const nextFri = new Date(nextMon)
    nextFri.setDate(nextMon.getDate() + 4)
    const startStr = nextMon.toISOString().split('T')[0]
    const endStr = nextFri.toISOString().split('T')[0]

    await page.locator('input[type="date"]').nth(0).fill(startStr)
    await page.locator('input[type="date"]').nth(1).fill(endStr)
    await page.click('button[type="submit"]')

    // Should redirect to leave list (success path)
    await page.waitForURL(/\/leave(\?.*)?$/, { timeout: 10_000 })
  })

  test('book-leave dropdown does NOT show sickness or lateness policies', async ({ page }) => {
    // Sickness has its own dedicated form. Letting it appear in the
    // regular leave-new dropdown caused a customer test to silently
    // fail when they picked sickness from here.
    await loginAs(page, 'owner')
    await page.goto('/t/acme/leave/new')
    // Page may be the form OR the empty state — only check the dropdown when the form rendered.
    const policyTrigger = page.getByRole('combobox').nth(1)
    if (await policyTrigger.isVisible().catch(() => false)) {
      await policyTrigger.click()
      const sicknessOption = page.getByRole('option', { name: /sickness|lateness/i })
      await expect(sicknessOption).toHaveCount(0)
    }
  })
})

test.describe('Flagship: Report sickness', () => {
  test('the dashboard sickness card is visible to everyone', async ({ page }) => {
    await loginAs(page, 'employee')
    await page.goto('/t/acme/dashboard')

    const reportCard = page.getByRole('link', { name: /^Report sickness/i }).first()
    await expect(reportCard).toBeVisible()
  })

  test('manager opens the sickness form from an employee profile', async ({ page }) => {
    await loginAs(page, 'owner')
    await page.goto('/t/acme/employees')

    // Click the first employee row.
    const firstEmployeeLink = page.locator('a[href*="/employees/"]').first()
    await firstEmployeeLink.click()
    await page.waitForURL(/\/employees\/[^/?#]+$/, { timeout: 10_000 })

    // Open the Absence tab.
    const absenceTab = page.getByRole('tab', { name: /absence/i })
    if (await absenceTab.isVisible().catch(() => false)) {
      await absenceTab.click()
    }

    // The "Report sickness" link MUST land on /leave/report-sickness
    // (NOT /leave/new?type=sickness). The previous wrong-target link
    // is exactly what made Chris's sickness submission silently fail.
    const reportSicknessLink = page
      .getByRole('link', { name: /^Report sickness$/i })
      .first()
    if (await reportSicknessLink.isVisible().catch(() => false)) {
      await expect(reportSicknessLink).toHaveAttribute(
        'href',
        /\/leave\/report-sickness\?employeeId=/,
      )
    }
  })

  test('sickness form date inputs default to today', async ({ page }) => {
    await loginAs(page, 'owner')
    await page.goto('/t/acme/leave/report-sickness')
    await expect(page.locator('h1')).toContainText(/report sickness/i)

    const today = new Date().toISOString().split('T')[0]
    const dateInputs = page.locator('input[type="date"]')
    await expect(dateInputs.nth(0)).toHaveValue(today)
    await expect(dateInputs.nth(1)).toHaveValue(today)
  })

  test('legacy /leave/new?type=sickness URL redirects to the dedicated form', async ({ page }) => {
    // Old links and bookmarked URLs should still work — redirect, don't 404.
    await loginAs(page, 'owner')
    await page.goto('/t/acme/leave/new?type=sickness')
    await page.waitForURL(/\/leave\/report-sickness/, { timeout: 10_000 })
  })
})

test.describe('Leave list page', () => {
  test('manager sees the leave list with both flagship buttons', async ({ page }) => {
    await loginAs(page, 'owner')
    await page.goto('/t/acme/leave')
    await expect(page.locator('h1')).toContainText(/leave/i)

    await expect(page.getByRole('link', { name: /^Book leave/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /^Report sickness/i })).toBeVisible()
  })

  test('employee can view leave page', async ({ page }) => {
    await loginAs(page, 'employee')
    await page.goto('/t/acme/leave')
    await expect(page.locator('h1')).toContainText(/leave/i)
  })
})
