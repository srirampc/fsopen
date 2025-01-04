import { useState, useEffect } from 'react'
import Login from './components/Login.tsx'
import Notification from './components/Notification.tsx'
import blogService from './services/blogs'
import loginService from './services/login'
import { IBlog, IUser, IMessage } from './ifx'
import Logout from './components/Logout.tsx'
import AddBlog from './components/AddBlog.tsx'
import BlogList from './components/BlogList.tsx'

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
    const loggedUserJSON = window.localStorage.getItem(loginService.tokenKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const userContent = () => {
    return (
      <>
        <Logout user={user} setUser={setUser} />
        <AddBlog
          blogs={blogs}
          setBlogs={setBlogs}
          setNotifyMessage={setNotifyMessage}
        />
        <BlogList blogs={blogs} />
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
      {user ? userContent() : <Login user={user} setUser={setUser} />}
    </div>
  )
}

export default App
