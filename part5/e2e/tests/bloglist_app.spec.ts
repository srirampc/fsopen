import pwr from '@playwright/test'
import { test, expect } from '@playwright/test'

pwr.describe('test notes app', () => {
  pwr.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Sofia Vergara',
        username: 'sofia',
        password: 'root',
      },
    })

    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    // Expect a title "to contain" a substring.
    const locator = await page.getByRole('heading', { name: 'blogs' })
    await expect(locator).toBeVisible()
    await expect(
      page.getByText(
        'Blogs app, Full Stack Open, University of Helsinki 2025',
      ),
    ).toBeVisible()
  })
})
