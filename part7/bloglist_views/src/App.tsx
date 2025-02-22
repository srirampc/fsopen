import { useEffect } from 'react'
import Notification from './components/Notification.tsx'
import { initializeBlogs } from './reducers/blogReducer.ts'
import { initializeUser } from './reducers/userReducer.ts'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './hooks.ts'
import Home from './components/Home.tsx'
import Logout from './components/Logout.tsx'
import BlogUsers from './components/BlogUsers.tsx'

const App = () => {

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const padding = {
    padding: 5
  }
  const user = useAppSelector((state) => state.user)

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/users">users</Link>
        </div>
        <h1>blogs</h1>
        <Notification />
        {user.token ? <Logout /> : <Navigate replace to="/" />}
        <Routes>
          <Route path="/users" element={<BlogUsers />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
