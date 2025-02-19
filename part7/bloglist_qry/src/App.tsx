import { useState, useEffect, useRef } from 'react'
import Login from './components/Login.tsx'
import Notification from './components/Notification.tsx'
import blogService from './services/blogs'
import loginService from './services/login'
import { IUser, IHandleTogglable } from './ifx'
import Logout from './components/Logout.tsx'
import AddBlog from './components/AddBlog.tsx'
import BlogList from './components/BlogList.tsx'
import Togglable from './components/Togglable.tsx'

const App = () => {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loginService.tokenKey)
    console.log('logged in', loggedUserJSON)
    if (loggedUserJSON) {
      console.log('logged in 2', loggedUserJSON, loggedUserJSON !== undefined)
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
          <AddBlog user={user} updateUI={updateUI} />
        </Togglable>
        <BlogList user={user} />
      </>
    )
  }

  const loginForm = () => <Login user={user} setUser={setUser} />

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      {user ? userContent() : loginForm()}
    </div>
  )
}

export default App
