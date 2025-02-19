import { useState } from 'react'
import { IBlog, IPropsBlog } from '../ifx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import blogService from '../services/blogs'

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

  const queryClient = useQueryClient()
  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updBlog: IBlog) => {
      // queryClient.invalidateQueries({ queryKey: ['notes'] })
      const blogs: IBlog[] | undefined = queryClient.getQueryData([
        'blogs',
      ])
      if (blogs) {
        queryClient.setQueryData(
          ['blogs'],
          blogs.map((itx) => (itx.id === updBlog.id ? updBlog : itx)),
        )
      }
    },
  })

  const dispatch = useNotificationDispatch()
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      console.log('Props Blog', props.blog)
      // queryClient.invalidateQueries({ queryKey: ['notes'] })
      const blogs: IBlog[] | undefined = queryClient.getQueryData([
        'blogs',
      ])
      if (blogs) {
        queryClient.setQueryData(
          ['blogs'],
          blogs.filter((itx) => (itx.id !== props.blog.id)),
        )
      }

      const title = props.blog.title
      const nMsg = `The blog ${title} was sucessfully deleted from the server`
      dispatch({
        type: 'SET',
        payload: { message: nMsg, className: 'notify' },
      })
      setTimeout(() => dispatch({ type: 'RESET' }), 5000)

    },
  })


  const addLikes = () => {
    console.log('vote', props.blog)
    updateBlogMutation.mutate({ ...props.blog, likes: props.blog.likes + 1 })
  }

  const removeBlog = () => {
    if (window.confirm(`Confirm removing blog : '${props.blog.title}' ?`)) {
      deleteBlogMutation.mutate(props.blog)
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
