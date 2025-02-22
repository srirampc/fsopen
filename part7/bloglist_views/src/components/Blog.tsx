import { Navigate, useParams } from 'react-router-dom'
import { IBlog } from '../ifx'
import { setNotification } from '../reducers/notficationReducer'
import { useAppDispatch, useAppSelector } from '../hooks'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = () => {
  const id = useParams().id
  const blogs = useAppSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)
  const loggedInUser = useAppSelector((state) => state.loggedInUser)
  const dispatch = useAppDispatch()

  const handleLike = (uBlog: IBlog) => {
    const title = uBlog.title
    dispatch(likeBlog(uBlog))
      .then(() => {
        const nMsg = `The blog '${title}' was sucessfully updated in the server`
        dispatch(setNotification({ message: nMsg, className: 'notify' }, 5))
      })
      .catch((error) => {
        const errMessage = error.response
          ? error.response.data.error
          : error.message
        dispatch(setNotification({ message: errMessage, className: 'error' }, 5))
      })
  }

  const handleRemove = (dxBlog: IBlog) => {
    const title = dxBlog.title
    dispatch(deleteBlog(dxBlog))
      .then(() => {
        const nMsg = `The blog '${title}' was sucessfully deleted in the server`
        dispatch(setNotification({ message: nMsg, className: 'notify' }, 5))
      }).catch((error) => {
        const errMessage = error.response
          ? error.response.data.error
          : error.message
        dispatch(setNotification({ message: errMessage, className: 'error' }, 5))
      })
  }

  if (!blog) { return <Navigate replace to="/" /> }

  const removeBlog = () => {
    if (window.confirm(`Confirm removing blog : '${blog.title}' ?`)) {
      handleRemove(blog)
    }
  }

  return (
    <div className="blog">
      <div className="blog-title-author"> {blog.title} {blog.author} </div>
      <div className="blog-detail">
        <div className="blog-url">{blog.url}</div>
        <div className="blog-likes">
          likes : {blog.likes}
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div className="blog-user">
          Added by: {blog.user?.name}
          {blog.user?.username === loggedInUser?.username ? (
            <button onClick={removeBlog}>delete</button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog
