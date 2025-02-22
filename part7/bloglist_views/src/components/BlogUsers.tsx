import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks.ts'
import { IBlogUser } from '../ifx.ts'
import { initializeBlogUsers } from '../reducers/blogUserReducer.ts'
const BlogUsers = () => {


  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initializeBlogUsers())
  }, [])

  const user = useAppSelector((state) => state.user)
  const blogUsers = useAppSelector((state) => state.blogUsers)


  const userContent = () => {
    return (
      <>
        <h2>Users</h2>
        <div data-testid="user-list-root" id="user-list-root">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th><b>Blogs Created</b></th>
              </tr>
            </thead>
            {[...blogUsers]
              .sort((a, b) => b.blogs.length - a.blogs.length).map((blogUser: IBlogUser) => (
                <tr key={blogUser.id}>
                  <td> {blogUser.name}</td>
                  <td> {blogUser.blogs.length}</td>
                </tr>
              ))}
          </table>
        </div>

      </>
    )
  }


  return (
    <div>
      {user.token ? userContent() : <div></div>}
    </div>
  )

}

export default BlogUsers
