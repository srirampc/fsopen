import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks.ts'
import { IBlogUser } from '../ifx.ts'
import { initializeBlogUsers } from '../reducers/blogUserReducer.ts'
import { Link, Navigate } from 'react-router-dom'

const BlogUsers = () => {
  const dispatch = useAppDispatch()
  useEffect(() => { dispatch(initializeBlogUsers()) }, [])

  const loggedInUser = useAppSelector((state) => state.loggedInUser)
  const blogUsers = useAppSelector((state) => state.blogUsers)

  if (loggedInUser.token) {
    return (
      <>
        <h2>Users</h2>
        <div data-testid="user-list-root" id="user-list-root">
          <table>
            <thead>
              <tr>
                <th></th>
                <th><b>Blogs Created</b></th>
              </tr>
            </thead>
            {[...blogUsers]
              .sort((a, b) => b.blogs.length - a.blogs.length).map((blogUser: IBlogUser) => (
                <tr key={blogUser.id}>
                  <td> <Link to={`/users/${blogUser.id}`}> {blogUser.name} </Link></td>
                  <td> {blogUser.blogs.length}</td>
                </tr>
              ))}
          </table>
        </div>
      </>
    )
  } else {
    <Navigate replace to='/' />
  }
}

export default BlogUsers
