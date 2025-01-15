import { Page } from '@playwright/test'

const loginWith = async (page: Page, username: string, password: string) => {
  await page.getByTestId('username').first().fill(username)
  await page.getByTestId('password').last().fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (
  page: Page,
  title: string,
  author: string,
  url: string,
  likes: string,
) => {
  await page.getByRole('button', { name: 'add blog' }).click()
  await page.getByPlaceholder('title-text').fill(title)
  await page.getByPlaceholder('author-text').fill(author)
  await page.getByPlaceholder('url-text').fill(url)
  await page.getByPlaceholder('likes-text').fill(likes)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${title} ${author}`).waitFor()
}

export { loginWith, createBlog }
