import { useState, useEffect, useRef } from 'react'
import Login from './components/Login.tsx'
import Notification from './components/Notification.tsx'
import blogService from './services/blogs'
import loginService from './services/login'
import { IBlog, IUser, IMessage, IHandleTogglable } from './ifx'
import Logout from './components/Logout.tsx'
import AddBlog from './components/AddBlog.tsx'
import BlogList from './components/BlogList.tsx'
import Togglable from './components/Togglable.tsx'

const App = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([])
  const [notifyMessage, setNotifyMessage] = useState<IMessage>({
    message: null,
    className: '',
  })
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const inBlogs = blogs as IBlog[]
      inBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(inBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loginService.tokenKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlogRef = useRef<IHandleTogglable>(null)
  const updateUI = () => {
    addBlogRef.current?.toggleVisibility()
  }
  const userContent = () => {
    return (
      <>
        <Logout user={user} setUser={setUser} />
        <Togglable buttonLabel="add blog" ref={addBlogRef}>
          <AddBlog
            blogs={blogs}
            user={user}
            setBlogs={setBlogs}
            setNotifyMessage={setNotifyMessage}
            updateUI={updateUI}
          />
        </Togglable>
        <BlogList
          blogs={blogs}
          setBlogs={setBlogs}
          user={user}
          setNotifyMessage={setNotifyMessage}
        />
      </>
    )
  }

  const showLoginForm = () => {
    return (
      <Login
        user={user}
        setUser={setUser}
        setNotifyMessage={setNotifyMessage}
      />
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification
        message={notifyMessage.message}
        className={notifyMessage.className}
      />
      {user ? userContent() : showLoginForm()}
    </div>
  )
}

export default App
