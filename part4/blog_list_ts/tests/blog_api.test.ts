import { test, after, describe, before } from 'node:test'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'
import assert from 'assert'
import Blog from '../models/blog'
import helper from './test_helper'
import { IBlog } from '../models/blog'
import logger from '../utils/logger'
import dash from 'lodash'

const api = supertest(app)
before(async () => {
  // Delete blogs
  await Blog.deleteMany({})

  // user id create only if not found
  const testUserIds = (
    await Promise.all(
      helper.blogTestUsers.map((ux) => {
        return helper.findOrCreateUser(ux)
      }),
    )
  ).map((ux) => (ux ? ux.id : ''))

  //
  await Blog.insertMany(
    dash.zipWith(
      helper.initialBlogs,
      testUserIds.concat(testUserIds),
      (blog, uid) => {
        return { ...blog, user: uid }
      },
    ),
  )
})

describe('when there are blogs in the databse', () => {
  // beforeEach(async () => {
  //   await Blog.deleteMany({})
  //   // await Blog.insertMany(helper.initialBlogs)
  //
  //   const blogObjects = helper.initialBlogs.map((iblog) => new Blog(iblog))
  //   const savePromises = blogObjects.map((nx) => nx.save())
  //   await Promise.all(savePromises)
  // })

  test('all blogs are returned as JSON via api/blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, 4)
  })

  test('verify that blog has `id` property and it matches `_id` in database', async () => {
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

  describe('view a specific blog', () => {
    test('view a specific blog with a valid id succeeds', async () => {
      const blogsAtStart = await helper.blogsInDB()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('view fails with statuscode 404 if a blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingBlogId()

      await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
    })

    test('view fails with statuscode 400 when id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api.get(`/api/blogs/${invalidId}`).expect(400)
    })
  })

  describe('addition of a new blog via post', () => {
    test('post a new blog with valid details succeeds', async () => {
      const userId = await helper.findTestBlogsUser()
      const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        user: userId
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

    test('post a blog without no `likes` entry defaults to zero likes', async () => {
      const userId = await helper.findTestBlogsUser(1)
      const newBlog = {
        title: '2024 Link Clearance',
        author: 'Raymond Chen',
        url: 'https://devblogs.microsoft.com/oldnewthing/20241231-01/?p=110698',
        important: true,
        user: userId
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

    test('post a blog with no `title` returns 400 status', async () => {
      const userId = await helper.findTestBlogsUser(1)
      const newBlog = {
        author: 'Raymond Chen',
        url: 'https://devblogs.microsoft.com/oldnewthing/20241231-01/?p=110698',
        important: true,
        user: userId
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

    test('post blog with no `url` returns 400 status', async () => {
      const userId = await helper.findTestBlogsUser()
      const newBlog = {
        title: '2024 Link Clearance',
        author: 'Raymond Chen',
        important: true,
        user: userId
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
  })

  describe('update of a blog', () => {
    test('update existing blog successfully', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const blogToUpdate = blogsAtStart[1]
      const likesAtStart = blogToUpdate.likes
      blogToUpdate.likes += 10
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
      const blogsAtEnd = await helper.blogsInDB()
      const updatedBlog = blogsAtEnd.find((item) => item.id == blogToUpdate.id)
      assert(updatedBlog)
      assert.strictEqual(updatedBlog.likes, likesAtStart + 10)
    })

    test('update fails with statuscode 404 if a blog does not exist', async () => {
      const userId = await helper.findTestBlogsUser()
      const validNonexistingId = await helper.nonExistingBlogId()

      await api
        .put(`/api/blogs/${validNonexistingId}`)
        .send({
          title: 'Test Blog',
          author: 'Test Author',
          url: 'http://example.com/test-blog-1',
          likes: 1,
          user: userId
        })
        .expect(404)
    })

    test('update fails with statuscode 400 when id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
      const userId = await helper.findTestBlogsUser(1)

      await api
        .put(`/api/blogs/${invalidId}`)
        .send({
          title: 'Test Blog',
          author: 'Test Author',
          url: 'http://example.com/test-blog-1',
          likes: 1,
          user: userId
        })
        .expect(400)
    })
  })

  describe('deletion of a blog', () => {
    test('existing blog can be deleted successfully with status 204', async () => {
      const blogsAtStart = await helper.blogsInDB()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
      const blogsAtEnd = await helper.blogsInDB()

      const blogIds = blogsAtEnd.map((r) => r.id)
      assert(!blogIds.includes(blogToDelete.id))

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })
  })
})

after(async () => {
  await Blog.deleteMany({})
  await Promise.all(
    helper.blogTestUsers.map((ux) => {
      return helper.findAndDeleteUser(ux)
    }),
  )
  await mongoose.connection.close()
})
