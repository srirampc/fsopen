import { useState } from 'react'
import { IPropsBlog } from '../ifx'

const Blog = (props: IPropsBlog) => {
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleShow = () => {
    setShowDetail(!showDetail)
  }

  const addLikes = () => {
    props.updateBlog({
      ...props.blog,
      likes: props.blog.likes + 1,
    })
  }

  const removeBlog = () => {
    if (window.confirm(`Confirm removing blog : '${props.blog.title}' ?`)) {
      props.deleteBlog(props.blog)
    }
  }

  const blogDetail = () => {
    return (
      <>
        <div className="blog-detail">
          <div className="blog-url">{props.blog.url}</div>
          <div className="blog-likes">
            likes : {props.blog.likes}
            <button onClick={addLikes}>like</button>
          </div>
          <div className="blog-user">
            Added by: {props.blog.user?.name}
            {props.blog.user?.username === props.user?.username ? (
              <button onClick={removeBlog}>delete</button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </>
    )
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="blog-title-author">
        {props.blog.title} {props.blog.author}
      </div>
      {!showDetail && <button onClick={toggleShow}>show</button>}
      {showDetail && <button onClick={toggleShow}>hide</button>}
      {showDetail && blogDetail()}
    </div>
  )
}

export default Blog
