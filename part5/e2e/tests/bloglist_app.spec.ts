import pwr from '@playwright/test'
import { test, expect } from '@playwright/test'
import { createBlog, loginWith } from './helper'

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
    await request.post('/api/users', {
      data: {
        name: 'Jenifer Garner',
        username: 'jenig',
        password: 'root',
      },
    })
    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {
    // Expect a title "to contain" a substring.
    const locator = await page.getByRole('heading', { name: 'blogs' })
    await expect(locator).toBeVisible()
    await expect(
      page.getByText('Blogs app, Full Stack Open, University of Helsinki 2025'),
    ).toBeVisible()
    await expect(page.getByTestId('username').first()).toBeVisible()
    await expect(page.getByTestId('password').last()).toBeVisible()
  })

  pwr.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'sofia', 'root')
      await expect(page.getByText('Sofia Vergara logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'sofia', 'blah')
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('invalid username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Sofia Vergara logged in')).not.toBeVisible()
    })
  })

  pwr.describe('When logged in', () => {
    pwr.beforeEach(async ({ page }) => {
      await loginWith(page, 'sofia', 'root')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'my blog', 'Sofia V', 'example.com/my-blog', '3')
      await expect(page.getByText('my blog Sofia V')).toBeVisible()
    })

    pwr.describe('and like/delete a note exists', () => {
      pwr.beforeEach(async ({ page }) => {
        await createBlog(
          page,
          'my blog part 2',
          'Sofia V',
          'example.com/my-blog-part-2',
          '5',
        )
      })
      test('blog can be liked', async ({ page }) => {
        const blogElement = await page.getByText('my blog part 2 Sofia V')
        const nextElement = await blogElement.locator('..')
        await nextElement.getByRole('button', { name: 'show' }).click()
        await expect(
          nextElement.getByText('example.com/my-blog-part-2'),
        ).toBeVisible()
        await nextElement.getByRole('button', { name: 'like' }).click()
        await expect(nextElement.getByText('likes : 6')).toBeVisible()
      })

      test('blog can be deleted', async ({ page }) => {
        page.on('dialog', (dialog) => dialog.accept())
        const blogElement = await page.getByText('my blog part 2 Sofia V')
        const nextElement = await blogElement.locator('..')
        await nextElement.getByRole('button', { name: 'show' }).click()
        await expect(nextElement.getByText('Added by: ')).toBeVisible()
        await page.getByRole('button', { name: 'delete' }).click()
        await expect(page.getByText('my blog part 2 Sofia V')).not.toBeVisible()
      })

      test('only loggedin user can delete', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
        await loginWith(page, 'jenig', 'root')
        const blogElement = await page.getByText('my blog part 2 Sofia V')
        const nextElement = await blogElement.locator('..')
        await nextElement.getByRole('button', { name: 'show' }).click()
        await expect(
          page.getByRole('button', { name: 'delete' }),
        ).not.toBeVisible()
      })
    })

    pwr.describe('display by order of likes', () => {
      pwr.beforeEach(async ({ page }) => {
        await createBlog(
          page,
          'our future',
          'Bill G',
          'example.com/our-future',
          '5',
        )
        await createBlog(
          page,
          'next year',
          'Bob M',
          'example.com/next-year',
          '15',
        )
        await createBlog(
          page,
          'final goodbye',
          'Paul A',
          'example.com/final-good-bye',
          '9',
        )
      })

      test('display sorted when added', async ({ page }) => {
        await expect(
          page.locator('//*[@id="blog-list-root"]/div[1]'),
        ).toContainText('next year Bob M')
        await expect(
          page.locator('//*[@id="blog-list-root"]/div[2]'),
        ).toContainText('final goodbye Paul A')
        await expect(
          page.locator('//*[@id="blog-list-root"]/div[3]'),
        ).toContainText('our future Bill G')
      })

      test('display sorted after login', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'jenig', 'root')
        await expect(
          page.locator('//*[@id="blog-list-root"]/div[1]'),
        ).toContainText('next year Bob M')
        await expect(
          page.locator('//*[@id="blog-list-root"]/div[2]'),
        ).toContainText('final goodbye Paul A')
        await expect(
          page.locator('//*[@id="blog-list-root"]/div[3]'),
        ).toContainText('our future Bill G')
      })
    })
  })
})
