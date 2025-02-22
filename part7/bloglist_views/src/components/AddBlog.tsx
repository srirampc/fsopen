import { ChangeEvent, FormEvent } from 'react'
import { IPropsAddBlog } from '../ifx'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notficationReducer'
import { useAppDispatch, useAppSelector } from '../hooks'
import { resetNewBlog, setAuthor, setLikes, setTitle, setUrl } from '../reducers/newBlogReducer'

const AddBlog = (props: IPropsAddBlog) => {
  const dispatch = useAppDispatch()
  const newBlog = useAppSelector((state) => state.newBlog)

  const addBlog = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.toggleVisibility()
    dispatch(createBlog(newBlog))
      .then(() => {
        dispatch(resetNewBlog())
        const nMsg = `The blog ${newBlog.title} was sucessfully added to the server`
        dispatch(setNotification({ message: nMsg, className: 'notify' }, 5))
      })
      .catch((error) => {
        const errMessage = error.response
          ? error.response.data.error
          : error.message
        dispatch(setNotification({ message: errMessage, className: 'error' }, 5))
      })
  }

  const formChanged = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.id)
    /*eslint indent: ["error", 2, { "SwitchCase": 1 }]*/
    switch (event.target.id) {
      case 'title':
        dispatch(setTitle(event.target.value))
        break
      case 'author':
        dispatch(setAuthor(event.target.value))
        break
      case 'url':
        dispatch(setUrl(event.target.value))
        break
      case 'likes':
        dispatch(setLikes(Number(event.target.value)))
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
