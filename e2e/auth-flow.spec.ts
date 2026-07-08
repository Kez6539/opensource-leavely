import { test, expect } from '@playwright/test'

test.describe('Auth: Login page UI', () => {
  test('email input exists', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('input[name="email"]')).toBeVisible()
  })

  test('password input exists', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('input[name="password"]')).toBeVisible()
  })

  test('submit button exists', async ({ page }) => {
    await page.goto('/login')
    const submitBtn = page.locator('button[type="submit"]')
    await expect(submitBtn).toBeVisible()
    await expect(submitBtn).toContainText(/sign in/i)
  })

  test('links to register and forgot password exist', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('a[href="/register"]')).toBeVisible()
    await expect(page.locator('a[href="/forgot-password"]')).toBeVisible()
  })
})

test.describe('Auth: Register page UI', () => {
  test('name input exists', async ({ page }) => {
    await page.goto('/register')
    await expect(page.locator('input[name="name"]')).toBeVisible()
  })

  test('company name input exists', async ({ page }) => {
    await page.goto('/register')
    await expect(page.locator('input[name="company"]')).toBeVisible()
  })

  test('email input exists', async ({ page }) => {
    await page.goto('/register')
    await expect(page.locator('input[name="email"]')).toBeVisible()
  })

  test('password input exists', async ({ page }) => {
    await page.goto('/register')
    await expect(page.locator('input[name="password"]')).toBeVisible()
  })

  test('submit button exists', async ({ page }) => {
    await page.goto('/register')
    const submitBtn = page.locator('button[type="submit"]')
    await expect(submitBtn).toBeVisible()
    await expect(submitBtn).toContainText(/create account/i)
  })
})

test.describe('Auth: Forgot password page UI', () => {
  test('email input exists', async ({ page }) => {
    await page.goto('/forgot-password')
    await expect(page.locator('input[name="email"]')).toBeVisible()
  })

  test('heading mentions forgot password', async ({ page }) => {
    await page.goto('/forgot-password')
    await expect(page.locator('h2')).toContainText(/forgot/i)
  })

  test('submit button exists', async ({ page }) => {
    await page.goto('/forgot-password')
    const submitBtn = page.locator('button[type="submit"]')
    await expect(submitBtn).toBeVisible()
  })
})
