import { IBlog } from '../ifx'
import Blog from './Blog'
import { setNotification } from '../reducers/notficationReducer'
import { useAppDispatch, useAppSelector } from '../hooks'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useAppDispatch()
  const blogs = useAppSelector((state) => state.blogs)

  const handleLike = (uBlog: IBlog) => {
    const title = uBlog.title
    dispatch(likeBlog(uBlog)).then(() => {
      const nMsg = `The blog ${title} was sucessfully updated in the server`
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
    dispatch(deleteBlog(dxBlog)).then(() => {
      const nMsg = `The blog ${title} was sucessfully deleted in the server`
      dispatch(setNotification({ message: nMsg, className: 'notify' }, 5))
    }).catch((error) => {
      const errMessage = error.response
        ? error.response.data.error
        : error.message
      dispatch(setNotification({ message: errMessage, className: 'error' }, 5))
    })
  }

  return (
    <div data-testid="blog-list-root" id="blog-list-root">
      {[...blogs]
        .sort((a, b) => b.likes - a.likes).map((blog: IBlog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
          />
        ))}
    </div>
  )
}

export default BlogList
