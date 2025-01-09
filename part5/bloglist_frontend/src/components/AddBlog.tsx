import { ChangeEvent, useState, FormEvent } from 'react'
import blogService from '../services/blogs'
import { IBlog, IPropsAddBlog } from '../ifx'

const emptyBlog = {
  title: '',
  author: '',
  url: '',
  likes: 0,
}

const AddBlog = (props: IPropsAddBlog) => {
  const [newBlog, setNewBlog] = useState<IBlog>(emptyBlog)

  const createBlog = () => {
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
    }
    blogService
      .create(blogObject)
      .then((addedBlog) => {
        setNewBlog(emptyBlog)
        const rxBlog = addedBlog as IBlog
        const nMsg = `The blog ${rxBlog.title} was sucessfully added to the server`
        props.setBlogs(props.blogs.concat(rxBlog))
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

  const addBlog = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.updateUI()
    // console.log('button clicked', event.target)
    createBlog()
    // const foundBlog = props.blogs.find((item) => item.name == newPerson.name)
    // if (foundBlog == undefined) {
    // } else {
    //     updateBlog(foundBlog)
    // }
  }

  const formChanged = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.id)
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
