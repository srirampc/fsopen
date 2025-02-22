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
  const user = useAppSelector((state) => state.user)

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
      {user.token ? userContent() : loginForm()}
    </div >
  )
}

export default Home
