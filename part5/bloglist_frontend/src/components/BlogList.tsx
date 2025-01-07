import { IBlog, IPropsBlogList } from '../ifx'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogList = (props: IPropsBlogList) => {
  const updateBlog = (uBlog: IBlog) => {
    blogService
      .update(uBlog)
      .then((uxBlog) => {
        const rBlog = uxBlog as IBlog
        console.log('Updated Blog : ', rBlog)
        props.setBlogs(
          props.blogs
            .map((item) => (item.id != uBlog.id ? item : uBlog))
            .sort((a, b) => b.likes - a.likes),
        )
        const nMsg = `The blog ${rBlog.title} was sucessfully updated in the server`
        props.setNotifyMessage({ message: nMsg, className: 'notify' })
        setTimeout(() => {
          props.setNotifyMessage({ message: null, className: '' })
        }, 5000)
      })
      .catch((error) => {
        const errMessage = error.response
          ? error.response.data.error
          : error.message
        props.setNotifyMessage({ message: errMessage, className: 'error' })
        setTimeout(() => {
          props.setNotifyMessage({ message: null, className: '' })
        }, 5000)
      })
  }

  const deleteBlog = (dxBlog: IBlog) => {
    blogService
      .deleteBlog(dxBlog)
      .then(() => {
        console.log('Deleted Blog ')
        props.setBlogs(
          props.blogs
            .filter((item) => item.id != dxBlog.id)
            .sort((a, b) => b.likes - a.likes),
        )
        const nMsg = `The blog ${dxBlog.title} was sucessfully deleted in the server`
        props.setNotifyMessage({ message: nMsg, className: 'notify' })
        setTimeout(() => {
          props.setNotifyMessage({ message: null, className: '' })
        }, 5000)
      })
      .catch((error) => {
        const errMessage = error.response
          ? error.response.data.error
          : error.message
        props.setNotifyMessage({ message: errMessage, className: 'error' })
        setTimeout(() => {
          props.setNotifyMessage({ message: null, className: '' })
        }, 5000)
      })
  }

  return (
    <div>
      {props.blogs.map((blog: IBlog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={props.user}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  )
}

export default BlogList
