import { useEffect } from 'react'
import Notification from './components/Notification.tsx'
import { initializeBlogs } from './reducers/blogReducer.ts'
import { initializeUser } from './reducers/userReducer.ts'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './hooks.ts'
import Home from './components/Home.tsx'
import Logout from './components/Logout.tsx'
import BlogUsers from './components/BlogUsers.tsx'
import BlogUser from './components/BlogUser.tsx'
import Blog from './components/Blog.tsx'
import BlogList from './components/BlogList.tsx'

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => { dispatch(initializeBlogs()) }, [])
  useEffect(() => { dispatch(initializeUser()) }, [])

  const user = useAppSelector((state) => state.loggedInUser)
  const padding = { padding: 5 }
  const navBar = () => {
    return (
      <div className='nav-bar'>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user.token && <Logout />}
      </div>
    )
  }

  return (
    <>
      <Router>
        {navBar()}
        <h1>blogs app</h1>
        <Notification />
        <Routes>
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users/:id" element={<BlogUser />} />
          <Route path="/users" element={<BlogUsers />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
