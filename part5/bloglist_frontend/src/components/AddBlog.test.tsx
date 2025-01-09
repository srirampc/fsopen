import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import AddBlog from './AddBlog'
import { assert, expect, test, vi } from 'vitest'
import { userEvent } from '@testing-library/user-event'

const blogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
]

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

test('when AddBlog is clicked twice, update called twice', async () => {
  const setBlogs = vi.fn()
  const setNotifyMessage = vi.fn()
  const updateUI = vi.fn()
  const user = userEvent.setup()
  const { container } = render(
    <AddBlog
      blogs={blogs}
      setBlogs={setBlogs}
      setNotifyMessage={setNotifyMessage}
      updateUI={updateUI}
    />,
  )

  const inTitle = screen.getByPlaceholderText('title-text')
  await user.type(inTitle, blog.title)
  const inAuthor = screen.getByPlaceholderText('author-text')
  await user.type(inAuthor, blog.author)
  const inUrl = screen.getByPlaceholderText('url-text')
  await user.type(inUrl, blog.likes.toString())
  const inLikes = screen.getByPlaceholderText('likes-text')
  await user.type(inLikes, blog.likes.toString())

  const createButton = screen.getByText('create')
  await user.click(createButton)

  screen.debug(container)

  console.log(setNotifyMessage.mock.calls)

  expect(setBlogs.mock.calls).toHaveLength(0)
  expect(setNotifyMessage.mock.calls).toHaveLength(1)
})
