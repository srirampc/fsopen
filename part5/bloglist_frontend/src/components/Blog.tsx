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
        <div>
          {props.blog.url}
          <br />
          likes : {props.blog.likes}
          <button onClick={addLikes}> like </button>
          <br />
          Added by: {props.blog.user?.name}
          {props.blog.user?.username === props.user?.username ? (
            <button onClick={removeBlog}>delete</button>
          ) : (
            <></>
          )}
        </div>
      </>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {props.blog.title} {props.blog.author}
      </div>
      {!showDetail && <button onClick={toggleShow}>show</button>}
      {showDetail && <button onClick={toggleShow}>hide</button>}
      {showDetail && blogDetail()}
    </div>
  )
}

export default Blog
