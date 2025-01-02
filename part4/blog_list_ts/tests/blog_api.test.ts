import { test, after, beforeEach } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import assert from 'assert'
import Blog from '../models/blog'
import helper from './test_helper'
import { IBlog } from '../models/blog'
import logger from '../utils/logger'

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((iblog) => new Blog(iblog))
  const savePromises = blogObjects.map((nx) => nx.save())
  await Promise.all(savePromises)
})

test('blogs are returned via the api', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are four blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 4)
})

test('verify the unique identifier property id', async () => {
  const blogsAvailable = await helper.blogsAsInDB()
  // console.log("Blogs Avail ", blogsAvailable)
  const firstId: string = blogsAvailable[0]._id.toString()
  logger.info(['First ID', firstId])

  const response = await api.get('/api/blogs')
  const blogsFromAPI: IBlog[] = response.body
  // Check if id is defined
  blogsFromAPI.forEach((item) => assert(item.id))

  const foundBlog = blogsFromAPI.find((item) => item.id == firstId)
  logger.info(['found Blog', foundBlog])

  // Check if we can find the db blog id from the  API also
  assert(foundBlog)
  assert(foundBlog.id)
  assert.strictEqual(foundBlog.id, firstId)
})

test('post a new blog', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map((r) => r.title)
  assert(contents.includes('Canonical string reduction'))
})

test('blog without likes defaults to zero likes', async () => {
  const newBlog = {
    title: '2024 Link Clearance',
    author: 'Raymond Chen',
    url: 'https://devblogs.microsoft.com/oldnewthing/20241231-01/?p=110698',
    important: true,
  }
  const blogsAtBegin = await helper.blogsInDB()

  const response = await api.post('/api/blogs').send(newBlog).expect(201)
  const newBlogId = response.body.id
  logger.info(['New Blog', newBlogId])
  const blogsAtEnd = await helper.blogsInDB()
  assert.strictEqual(blogsAtEnd.length, blogsAtBegin.length + 1)
  const foundBlog = blogsAtEnd.find((item) => item.id == newBlogId)
  assert.strictEqual(foundBlog?.likes, 0)
})

test('blog without title returns error', async () => {
  const newBlog = {
    author: 'Raymond Chen',
    url: 'https://devblogs.microsoft.com/oldnewthing/20241231-01/?p=110698',
    important: true,
  }
  const blogsAtBegin = await helper.blogsInDB()

  const response = await api.post('/api/blogs').send(newBlog).expect(400)
  logger.info(['New Blog', response.body])
  // check error
  assert.strictEqual(
    response.body.error,
    'Blog validation failed: title: Path `title` is required.',
  )
  const blogsAtEnd = await helper.blogsInDB()
  // check that database is not affected
  assert.strictEqual(blogsAtEnd.length, blogsAtBegin.length)
})

test('blog without URL returns error', async () => {
  const newBlog = {
    title: '2024 Link Clearance',
    author: 'Raymond Chen',
    important: true,
  }
  const blogsAtBegin = await helper.blogsInDB()

  const response = await api.post('/api/blogs').send(newBlog).expect(400)
  logger.info(['New Blog', response.body])
  // check error
  assert.strictEqual(
    response.body.error,
    'Blog validation failed: url: Path `url` is required.',
  )
  // check database is not updated
  const blogsAtEnd = await helper.blogsInDB()
  assert.strictEqual(blogsAtEnd.length, blogsAtBegin.length)
})



after(async () => {
  await mongoose.connection.close()
})
