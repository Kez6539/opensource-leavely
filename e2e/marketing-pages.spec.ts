import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('renders hero with h1 containing "leave management"', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText(/leave management/i)
  })

  test('nav links exist for Features, Pricing, Blog, Sign in', async ({ page }) => {
    await page.goto('/')
    const nav = page.locator('nav')
    await expect(nav.locator('a[href="/features"]')).toBeVisible()
    await expect(nav.locator('a[href="/pricing"]')).toBeVisible()
    await expect(nav.locator('a[href="/blog"]')).toBeVisible()
    await expect(nav.locator('a[href="/login"]')).toBeVisible()
  })

  test('CTA buttons link to register', async ({ page }) => {
    await page.goto('/')
    const ctaLinks = page.locator('a[href="/register"]')
    await expect(ctaLinks.first()).toBeVisible()
    expect(await ctaLinks.count()).toBeGreaterThanOrEqual(2)
  })

  test('feature cards render in the features section', async ({ page }) => {
    await page.goto('/')
    // The homepage has 6 feature cards with titles like "Leave Calendar", "One-Click Approvals", etc.
    const featureSection = page.locator('#features')
    await expect(featureSection).toBeVisible()
    const featureCards = featureSection.locator('.rounded-2xl.border')
    expect(await featureCards.count()).toBeGreaterThanOrEqual(6)
  })
})

test.describe('Features page', () => {
  test('renders h1 with "leave management features"', async ({ page }) => {
    await page.goto('/features')
    await expect(page.locator('h1')).toContainText(/leave management features/i)
  })

  test('feature cards render', async ({ page }) => {
    await page.goto('/features')
    // Core features section has 6 cards, advanced features has 8
    const featureCards = page.locator('main .rounded-2xl.border, main .rounded-xl.border')
    expect(await featureCards.count()).toBeGreaterThanOrEqual(6)
  })
})

test.describe('Pricing page', () => {
  test('renders h1 with "pricing"', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.locator('h1')).toContainText(/pricing/i)
  })

  test('price of "£8" is visible', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.locator('text=£8')).toBeVisible()
  })

  test('CTA button links to register', async ({ page }) => {
    await page.goto('/pricing')
    const ctaLinks = page.locator('a[href="/register"]')
    await expect(ctaLinks.first()).toBeVisible()
  })
})

test.describe('Blog index', () => {
  test('renders h1 "Blog"', async ({ page }) => {
    await page.goto('/blog')
    await expect(page.locator('h1')).toHaveText('Blog')
  })

  test('at least 10 article links render', async ({ page }) => {
    await page.goto('/blog')
    const articleLinks = page.locator('a[href^="/blog/"]')
    expect(await articleLinks.count()).toBeGreaterThanOrEqual(10)
  })
})

test.describe('Compare hub', () => {
  test('renders h1 mentioning comparisons', async ({ page }) => {
    await page.goto('/compare')
    await expect(page.locator('h1')).toContainText(/compares/i)
  })

  test('competitor cards render', async ({ page }) => {
    await page.goto('/compare')
    // 5 competitors: Timetastic, BrightHR, Breathe HR, Charlie HR, WhosOff
    const competitorCards = page.locator('a[href^="/compare/"]')
    expect(await competitorCards.count()).toBeGreaterThanOrEqual(5)
  })
})

test.describe('Login page', () => {
  test('email and password form fields exist', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
  })
})

test.describe('Register page', () => {
  test('registration form fields exist', async ({ page }) => {
    await page.goto('/register')
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="company"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
  })
})

test.describe('Privacy page', () => {
  test('renders h1 "Privacy Policy"', async ({ page }) => {
    await page.goto('/privacy')
    await expect(page.locator('h1')).toHaveText('Privacy Policy')
  })

  test('content loads with sections', async ({ page }) => {
    await page.goto('/privacy')
    await expect(page.locator('text=Who We Are')).toBeVisible()
    await expect(page.locator('text=Data We Collect')).toBeVisible()
  })
})

test.describe('Terms page', () => {
  test('renders h1 "Terms of Service"', async ({ page }) => {
    await page.goto('/terms')
    await expect(page.locator('h1')).toHaveText('Terms of Service')
  })

  test('content loads with sections', async ({ page }) => {
    await page.goto('/terms')
    await expect(page.locator('text=Acceptance of Terms')).toBeVisible()
    await expect(page.locator('text=Subscriptions and Payments')).toBeVisible()
  })
})
