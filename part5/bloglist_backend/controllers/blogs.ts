import { Router } from 'express'
import Blog, { IBlog } from '../models/blog'
import logger from '../utils/logger'
import User from '../models/user'
import express from 'express'
import { BlogRequest } from '../utils/middleware'

const blogsRouter = Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request: express.Request, response) => {
  const body: IBlog = request.body
  const req = request as BlogRequest
  // console.log('Token at post', req.user)
  if (!req.user) {
    response.status(401).json({ error: 'token invalid' })
  } else {
    const user = await User.findById(req.user)
    if (user) {
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: user.id,
      })
      const savedBlog = await blog.save()
      // console.log("Saved Blog", savedBlog)
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
    } else {
      response.status(400).json({ error: 'user token invalid' })
    }
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

blogsRouter.put(
  '/:id',
  async (request: express.Request, response: express.Response) => {
    const updBlog = await Blog.findById(request.params.id)
    const req = request as BlogRequest
    console.log('Token at post', req.user, updBlog?.user?.toString())
    if (!updBlog || !updBlog.user) {
      response.status(401).json({ error: 'blog id invalid' })
    } else if (req.user != updBlog.user.toString()) {
      response.status(401).json({ error: 'token invalid' })
    } else {
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
    }
  },
)

blogsRouter.delete(
  '/:id',
  async (request: express.Request, response: express.Response) => {
    const delBlog = await Blog.findById(request.params.id)
    const req = request as BlogRequest
    console.log('Token at post', req.user, delBlog?.user?.toString())
    if (!delBlog || !delBlog.user) {
      response.status(401).json({ error: 'blog id invalid' })
    } else if (req.user != delBlog.user.toString()) {
      response.status(401).json({ error: 'token invalid' })
    } else {
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
    }
  },
)

export default blogsRouter
