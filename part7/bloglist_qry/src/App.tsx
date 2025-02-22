import { useEffect, useRef } from 'react'
import Login from './components/Login.tsx'
import Notification from './components/Notification.tsx'
import blogService from './services/blogs'
import loginService from './services/login'
import { IUser, IHandleTogglable } from './ifx'
import Logout from './components/Logout.tsx'
import AddBlog from './components/AddBlog.tsx'
import BlogList from './components/BlogList.tsx'
import Togglable from './components/Togglable.tsx'
import { useUserDispatch, useUserValue } from './contexts/UserContext.tsx'

const App = () => {
  const userDispatch = useUserDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loginService.tokenKey)
    console.log('logged in', loggedUserJSON)
    if (loggedUserJSON) {
      console.log('logged in 2', loggedUserJSON, loggedUserJSON !== undefined)
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET', payload: user as IUser })
      blogService.setToken(user.token)
    }
  }, [])

  const user = useUserValue()
  const addBlogRef = useRef<IHandleTogglable>(null)
  const toggleUI = () => {
    addBlogRef.current?.toggleVisibility()
  }
  const userContent = () => {
    return (
      <>
        <Logout />
        <Togglable buttonLabel="add blog" ref={addBlogRef}>
          <AddBlog toggleUI={toggleUI} />
        </Togglable>
        <BlogList />
      </>
    )
  }

  const loginForm = () => <Login />

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      {user.username ? userContent() : loginForm()}
    </div>
  )
}

export default App
