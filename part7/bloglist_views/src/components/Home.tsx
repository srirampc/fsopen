import Togglable from './Togglable'
import AddBlog from './AddBlog'
import BlogList from './BlogList'
import { useRef } from 'react'
import { IHandleTogglable } from '../ifx'
import Login from './Login'
import { useAppSelector } from '../hooks'

const Home = () => {
  const addBlogRef = useRef<IHandleTogglable>(null)
  const toggleVisibility = () => {
    addBlogRef.current?.toggleVisibility()
  }
  const loggedInUser = useAppSelector((state) => state.loggedInUser)

  const userContent = () => {
    return (
      <>
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
      {loggedInUser.token ? userContent() : loginForm()}
    </div >
  )
}

export default Home
