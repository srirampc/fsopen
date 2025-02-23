import { Navigate, useParams } from 'react-router-dom'
import { IBlog, IComment } from '../ifx'
import { setNotification } from '../reducers/notficationReducer'
import { useAppDispatch, useAppSelector } from '../hooks'
import { likeBlog, deleteBlog, addBlogComment } from '../reducers/blogReducer'
import { SyntheticEvent, useState } from 'react'

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

  const [comment, setComment] = useState<string>('')

  if (!blog) { return <Navigate replace to="/" /> }

  const addComment = (event: SyntheticEvent) => {
    event.preventDefault()
    console.log('Add comment', comment)
    dispatch(addBlogComment(blog, comment))
      .then(() => {
        setComment('')
      })
  }

  const updateComment = (event: SyntheticEvent) => {
    const ctarget = event.target as typeof event.target & { value: string }
    setComment(ctarget.value)
  }

  const showComments = () => {
    return (
      <div className="blog-comments">
        <h3> Comments : </h3>
        <div>
          <form onSubmit={addComment}>
            <input id="comment" value={comment} onChange={updateComment} />
            <button type="submit">add comment</button>
          </form>
        </div>
        <ul>
          {blog.comments?.map((cmt: IComment) => <li key={cmt.id}>{cmt.text}</li>)}
        </ul>
      </div>
    )
  }

  const removeBlog = () => {
    if (window.confirm(`Confirm removing blog : '${blog.title}' ?`)) {
      handleRemove(blog)
    }
  }
  console.log('Blog', blog)

  return (
    <>
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
            {loggedInUser && blog.user?.username === loggedInUser?.username && (
              <button onClick={removeBlog}>delete</button>
            )}
          </div>
        </div>
      </div>
      {blog.comments && showComments()}
    </>
  )
}

export default Blog
