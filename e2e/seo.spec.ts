import { test, expect } from '@playwright/test'

test.describe('SEO: Homepage', () => {
  test('has a title tag', async ({ page }) => {
    await page.goto('/')
    const title = await page.title()
    expect(title).toBeTruthy()
    expect(title.toLowerCase()).toContain('leavely')
  })

  test('has a meta description', async ({ page }) => {
    await page.goto('/')
    const metaDesc = page.locator('meta[name="description"]')
    await expect(metaDesc).toHaveAttribute('content', /.+/)
  })

  test('has a canonical link', async ({ page }) => {
    await page.goto('/')
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute('href', /leavely/)
  })

  test('has og:title meta tag', async ({ page }) => {
    await page.goto('/')
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', /.+/)
  })

  test('has JSON-LD structured data', async ({ page }) => {
    await page.goto('/')
    const jsonLd = page.locator('script[type="application/ld+json"]')
    expect(await jsonLd.count()).toBeGreaterThanOrEqual(1)
    const content = await jsonLd.first().textContent()
    expect(content).toBeTruthy()
    const parsed = JSON.parse(content!)
    expect(parsed['@context']).toBe('https://schema.org')
  })
})

test.describe('SEO: /sitemap.xml', () => {
  test('returns XML with URLs', async ({ request }) => {
    const response = await request.get('/sitemap.xml')
    expect(response.status()).toBe(200)
    const body = await response.text()
    expect(body).toContain('<urlset')
    expect(body).toContain('<url>')
    expect(body).toContain('<loc>')
  })
})

test.describe('SEO: /robots.txt', () => {
  test('returns text with Sitemap directive', async ({ request }) => {
    const response = await request.get('/robots.txt')
    expect(response.status()).toBe(200)
    const body = await response.text()
    expect(body).toContain('Sitemap:')
    expect(body).toContain('User-agent:')
  })
})

test.describe('SEO: Blog article', () => {
  test('has canonical URL', async ({ page }) => {
    await page.goto('/blog/annual-leave-entitlement-uk')
    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveAttribute(
      'href',
      /annual-leave-entitlement-uk/
    )
  })

  test('has JSON-LD Article schema', async ({ page }) => {
    await page.goto('/blog/annual-leave-entitlement-uk')
    const jsonLd = page.locator('script[type="application/ld+json"]')
    expect(await jsonLd.count()).toBeGreaterThanOrEqual(1)
    const content = await jsonLd.first().textContent()
    expect(content).toBeTruthy()
    const parsed = JSON.parse(content!)
    expect(parsed['@type']).toBe('Article')
    expect(parsed.headline).toBeTruthy()
    expect(parsed.url).toContain('annual-leave-entitlement-uk')
  })
})
