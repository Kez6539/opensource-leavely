import { test, expect } from '@playwright/test'

test.describe('Comparison: Leavely vs Timetastic', () => {
  test('h1 mentions "Timetastic"', async ({ page }) => {
    await page.goto('/compare/timetastic')
    await expect(page.locator('h1')).toContainText(/timetastic/i)
  })

  test('comparison table exists with feature rows', async ({ page }) => {
    await page.goto('/compare/timetastic')
    const table = page.locator('table')
    await expect(table).toBeVisible()
    // Table should have header columns for Leavely and Timetastic
    await expect(table.locator('th', { hasText: 'Leavely' })).toBeVisible()
    await expect(table.locator('th', { hasText: 'Timetastic' })).toBeVisible()
    // Should have multiple feature rows
    const rows = table.locator('tbody tr')
    expect(await rows.count()).toBeGreaterThanOrEqual(5)
  })
})

test.describe('Comparison: Leavely vs BrightHR', () => {
  test('h1 mentions "BrightHR"', async ({ page }) => {
    await page.goto('/compare/brighthr')
    await expect(page.locator('h1')).toContainText(/brighthr/i)
  })

  test('comparison table exists', async ({ page }) => {
    await page.goto('/compare/brighthr')
    const table = page.locator('table')
    await expect(table).toBeVisible()
    await expect(table.locator('th', { hasText: 'Leavely' })).toBeVisible()
    await expect(table.locator('th', { hasText: 'BrightHR' })).toBeVisible()
  })
})
