import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks.ts'
import { IBlogUser } from '../ifx.ts'
import { initializeBlogUsers } from '../reducers/blogUserReducer.ts'
import { Link } from 'react-router-dom'

const BlogUsers = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initializeBlogUsers())
  }, [])
  const blogUsers = useAppSelector((state) => state.blogUsers)

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
          <tbody>
            {[...blogUsers]
              .sort((a, b) => b.blogs.length - a.blogs.length).map((blogUser: IBlogUser) => (
                <tr key={blogUser.id}>
                  <td> <Link to={`/users/${blogUser.id}`}> {blogUser.name} </Link></td>
                  <td> {blogUser.blogs.length}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default BlogUsers
