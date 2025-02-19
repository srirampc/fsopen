import { ChangeEvent, useState, FormEvent } from 'react'
import blogService from '../services/blogs'
import { IBlog, IPropsAddBlog } from '../ifx'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

const emptyBlog = {
  title: '',
  author: '',
  url: '',
  likes: 0,
}

const AddBlog = (props: IPropsAddBlog) => {
  const [newBlog, setNewBlog] = useState<IBlog>(emptyBlog)
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog: IBlog) => {
      const blogs: IBlog[] | undefined = queryClient.getQueryData([
        'blogs',
      ])
      if (blogs) {
        queryClient.setQueryData(
          ['blogs'],
          blogs.concat(newBlog),
        )
      }
      console.log(newBlog)
      const nMsg = `The blog ${newBlog.title} was sucessfully added to the server`
      dispatch({
        type: 'SET',
        payload: { message: nMsg, className: 'notify' },
      })
      setTimeout(() => dispatch({ type: 'RESET' }), 5000)
    },
    onError: (error) => {
      const axerr = error as AxiosError
      const errMessage = axerr.response
        ? (axerr.response.data as { error: string }).error
        : error.message
      dispatch({
        type: 'SET',
        payload: { message: errMessage, className: 'error' }
      })
      setTimeout(() => dispatch({ type: 'RESET' }), 5000)
    }
  })

  const addBlog = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.updateUI()
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
    }
    createBlogMutation.mutate(blogObject)
  }

  const formChanged = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.id)
    /*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/
    switch (event.target.id) {
      case 'title':
        setNewBlog({ ...newBlog, title: event.target.value })
        break
      case 'author':
        setNewBlog({ ...newBlog, author: event.target.value })
        break
      case 'url':
        setNewBlog({ ...newBlog, url: event.target.value })
        break
      case 'likes':
        setNewBlog({ ...newBlog, likes: Number(event.target.value) })
        break
      default:
        break
    }
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            value={newBlog.title}
            onChange={formChanged}
            placeholder="title-text"
          />
        </div>
        <div>
          author:
          <input
            id="author"
            value={newBlog.author}
            onChange={formChanged}
            placeholder="author-text"
          />
        </div>
        <div>
          url:
          <input
            id="url"
            value={newBlog.url}
            onChange={formChanged}
            placeholder="url-text"
          />
        </div>
        <div>
          likes:
          <input
            id="likes"
            value={newBlog.likes}
            onChange={formChanged}
            placeholder="likes-text"
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default AddBlog
