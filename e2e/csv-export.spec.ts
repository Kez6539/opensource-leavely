import { test, expect } from '@playwright/test'
import { loginAs } from './helpers'

test.describe('CSV export', () => {
  test('employees page has export button for managers', async ({ page }) => {
    await loginAs(page, 'owner')
    await page.goto('/t/acme/employees')
    const exportBtn = page.locator('button', { hasText: /export/i })
    await expect(exportBtn).toBeVisible()
  })

  test('leave page has export button for managers', async ({ page }) => {
    await loginAs(page, 'owner')
    await page.goto('/t/acme/leave')
    const exportBtn = page.locator('button', { hasText: /export/i })
    await expect(exportBtn).toBeVisible()
  })

  test('employee export triggers download', async ({ page }) => {
    await loginAs(page, 'owner')
    await page.goto('/t/acme/employees')

    const downloadPromise = page.waitForEvent('download', { timeout: 15_000 })
    await page.locator('button', { hasText: /export/i }).click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toMatch(/employees.*\.csv/)
  })
})
