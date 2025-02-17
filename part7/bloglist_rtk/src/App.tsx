import { useEffect, useRef } from 'react'
import Login from './components/Login.tsx'
import Notification from './components/Notification.tsx'
import { IHandleTogglable } from './ifx'
import Logout from './components/Logout.tsx'
import AddBlog from './components/AddBlog.tsx'
import BlogList from './components/BlogList.tsx'
import Togglable from './components/Togglable.tsx'
import { useAppDispatch, useAppSelector } from './hooks.ts'
import { initializeBlogs } from './reducers/blogReducer.ts'
import { initializeUser } from './reducers/userReducer.ts'

const App = () => {

  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const addBlogRef = useRef<IHandleTogglable>(null)
  const toggleVisibility = () => {
    addBlogRef.current?.toggleVisibility()
  }

  const userContent = () => {
    return (
      <>
        <Logout />
        <Togglable buttonLabel="add blog" ref={addBlogRef}>
          <AddBlog toggleVisibility={toggleVisibility} />
        </Togglable>
        <BlogList />
      </>
    )
  }

  const loginForm = () => {
    return (
      <Login />
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification />
      {user.token ? userContent() : loginForm()}
    </div>
  )
}

export default App
