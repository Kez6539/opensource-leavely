import { test, expect } from '@playwright/test'
import { loginAs } from './helpers'

test.describe('Profile & GDPR', () => {
  test('profile page shows employee details', async ({ page }) => {
    await loginAs(page, 'owner')
    await page.goto('/t/acme/profile')
    await expect(page.locator('h1')).toContainText(/profile/i)
    await expect(page.locator('body')).toContainText(/your details/i)
  })

  test('profile edit form works', async ({ page }) => {
    await loginAs(page, 'owner')
    await page.goto('/t/acme/profile')
    const phoneInput = page.locator('input#phone')
    await expect(phoneInput).toBeVisible()
    await phoneInput.fill('07700900123')
    await page.click('button[type="submit"]')
    await expect(page.locator('body')).toContainText(/updated/i, { timeout: 5000 })
  })

  test('GDPR download my data button exists and triggers download', async ({ page }) => {
    await loginAs(page, 'owner')
    await page.goto('/t/acme/profile')

    const downloadBtn = page.locator('button', { hasText: /download my data/i })
    await expect(downloadBtn).toBeVisible()

    const downloadPromise = page.waitForEvent('download', { timeout: 15_000 })
    await downloadBtn.click()
    const download = await downloadPromise
    expect(download.suggestedFilename()).toMatch(/my-data.*\.json/)
  })
})
