import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login.tsx'
import Notification from './components/Notification.tsx'
import blogService from './services/blogs'
import { IBlog, IUser, IMessage } from './ifx'

const App = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([])
  const [notifyMessage, setNotifyMessage] = useState<IMessage>({
    message: null,
    className: '',
  })
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs as IBlog[]))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showBlogs = () => {
    return (
      <>
        <p> {user?.name} logged in` </p>
        {blogs.map((blog: IBlog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
        message={notifyMessage.message}
        className={notifyMessage.className}
      />
      {user == null ? <Login user={user} setUser={setUser} /> : showBlogs()}
    </div>
  )
}

export default App
