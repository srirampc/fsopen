import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { assert, expect, test, vi } from 'vitest'
import { userEvent } from '@testing-library/user-event'

const usr = {
  username: 'sofia',
  name: 'Sofia Vergara',
  password: 'testpass',
}
const blog = {
  title: 'tile blog',
  author: 'Road A Runner',
  url: 'example.com/tile-blog',
  likes: 9,
  id: 'fake-id',
  user: usr,
}

test('renders author and tile but not url and likes', () => {
  const updateBlog = vi.fn()
  const deleteBlog = vi.fn()
  const { container } = render(
    <Blog
      blog={blog}
      user={usr}
      deleteBlog={deleteBlog}
      updateBlog={updateBlog}
    />,
  )
  const div = container.querySelector('.blog-title-author')
  // div && screen.debug(div)
  assert(div)
  expect(div).toHaveTextContent('tile blog Road A Runner')
  const divDetail = container.querySelector('.blog-detail')
  expect(!divDetail)
  const divUrl = container.querySelector('.blog-url')
  expect(!divUrl)
  const divLikes = container.querySelector('.blog-likes')
  expect(!divLikes)
})

test('renders url and likes when clicked on show', async () => {
  const updateBlog = vi.fn()
  const deleteBlog = vi.fn()
  const user = userEvent.setup()
  const { container } = render(
    <Blog
      blog={blog}
      user={usr}
      deleteBlog={deleteBlog}
      updateBlog={updateBlog}
    />,
  )

  const showButton = screen.getByText('show')
  await user.click(showButton)

  const divDetail = container.querySelector('.blog-detail')
  expect(divDetail)

  const divUrl = container.querySelector('.blog-url')
  expect(divUrl).toHaveTextContent(blog.url)
  const divLikes = container.querySelector('.blog-likes')
  expect(divLikes).toHaveTextContent(blog.likes.toString())
})

test('when like is clicked twice, update called twice', async () => {
  const updateBlog = vi.fn()
  const deleteBlog = vi.fn()
  const user = userEvent.setup()
  const { container } = render(
    <Blog
      blog={blog}
      user={usr}
      deleteBlog={deleteBlog}
      updateBlog={updateBlog}
    />,
  )

  const showButton = screen.getByText('show')
  await user.click(showButton)


  const divLikes = container.querySelector('.blog-likes')
  expect(divLikes).toHaveTextContent(blog.likes.toString())

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(updateBlog.mock.calls).toHaveLength(2)
})
