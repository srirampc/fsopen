import Blog from '../models/blog'
import { IBlog } from '../models/blog'

const initialBlogs: IBlog[] = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

//  {
//    title: 'Canonical string reduction',
//    author: 'Edsger W. Dijkstra',
//    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
//    likes: 12,
//  },
//  {
//    title: 'TDD harms architecture',
//    author: 'Robert C. Martin',
//    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
//    likes: 0,
//  },

const blogsAsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'xyz',
    url: 'https://example.com/blog-1',
  })
  const savedBlog = await blog.save()
  const savedBlogId = savedBlog._id
  await savedBlog.deleteOne()
  return savedBlogId
}

export default {
  initialBlogs,
  nonExistingId,
  blogsAsInDB,
  blogsInDB,
}
