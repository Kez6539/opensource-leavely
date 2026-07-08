import { test, expect } from '@playwright/test'

test.describe('Blog: Annual Leave Entitlement UK', () => {
  test('renders h1 with article title', async ({ page }) => {
    await page.goto('/blog/annual-leave-entitlement-uk')
    await expect(page.locator('h1')).toContainText(/annual leave entitlement/i)
  })

  test('related articles section exists', async ({ page }) => {
    await page.goto('/blog/annual-leave-entitlement-uk')
    await expect(page.locator('text=Related articles')).toBeVisible()
    const relatedLinks = page.locator('a[href^="/blog/"]').filter({ hasText: /→/ })
    expect(await relatedLinks.count()).toBeGreaterThanOrEqual(2)
  })
})

test.describe('Blog: Maternity Leave UK', () => {
  test('renders h1 with article title', async ({ page }) => {
    await page.goto('/blog/maternity-leave-uk')
    await expect(page.locator('h1')).toContainText(/maternity leave/i)
  })

  test('CTA box exists', async ({ page }) => {
    await page.goto('/blog/maternity-leave-uk')
    // CTA box is a gradient div with "Start free trial" button
    const ctaBox = page.locator('.bg-gradient-to-r.from-emerald-600').first()
    await expect(ctaBox).toBeVisible()
    await expect(ctaBox.locator('a[href="/register"]')).toBeVisible()
  })
})

test.describe('Blog: Bank Holidays UK 2026', () => {
  test('renders h1 with article title', async ({ page }) => {
    await page.goto('/blog/bank-holidays-uk-2026')
    await expect(page.locator('h1')).toContainText(/bank holidays/i)
  })

  test('table of bank holidays exists', async ({ page }) => {
    await page.goto('/blog/bank-holidays-uk-2026')
    const tables = page.locator('table')
    expect(await tables.count()).toBeGreaterThanOrEqual(1)
  })
})
