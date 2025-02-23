import { Router } from 'express'
import express from 'express'
import Comment, { IComment } from '../models/comment'
import Blog from '../models/blog'
import { BlogRequest } from '../utils/middleware'

const commentsRouter = Router()

commentsRouter.get('/', async (request, response) => {
    const comments = await Comment.find({}).populate('blog', {
        title: 1,
        author: 1,
        url: 1,
        likes: 1,
    })
    response.json(comments)
})

commentsRouter.post('/', async (request: express.Request, response) => {
    const body: IComment = request.body
    const req = request as BlogRequest
    console.log('Token at post', req.user)
    const blog = await Blog.findById(body.blog)
    if (blog) {
        const comment = new Comment({
            text: body.text,
            blog: body.blog
        })
        const savedComment = await comment.save()
        console.log("Saved Blog", savedComment)
        blog.comments = blog.comments.concat(savedComment._id)
        await blog.save()
        const returnComment = await savedComment.populate('blog', {
            title: 1,
            author: 1,
            url: 1,
            likes: 1,
        })
        response.status(201).json(returnComment)
    } else {
        response.status(400).json({ error: 'blog not found' })
    }
})

export default commentsRouter
