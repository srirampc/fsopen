import { Router } from 'express'
import Blog, { IBlog } from '../models/blog'
import logger from '../utils/logger'
import User from '../models/user'

const blogsRouter = Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body: IBlog = request.body
  const user = await User.findById(body.user)

  if (user) {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
      user: user.id,
    })
    const savedBlog = await blog.save()
    console.log(savedBlog)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } else {
    response.status(400).end()
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const note = await Blog.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedNote = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' },
  )
  if (updatedNote) {
    response.json(updatedNote)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const delBlog = await Blog.findByIdAndDelete(request.params.id)
  logger.info(['deleted note', delBlog])
  if (delBlog) {
    const user = await User.findById(delBlog.user)
    if (user) {
      user.blogs = user.blogs.filter((n) => n != delBlog._id)
      await user.save()
      response.status(204).end()
    }
  } else {
    response.status(204).end()
  }
})

export default blogsRouter
