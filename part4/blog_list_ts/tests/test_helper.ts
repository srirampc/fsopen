import Blog from '../models/blog'
import { IBlog } from '../models/blog'
import User, { IUser } from '../models/user'
import bcrypt from 'bcrypt'

const blogTestUsers: IUser[] = [
  {
    username: 'jenil',
    name: 'Jennifer Lawrence',
    blogs: [],
    passwordHash: '$2b$10$UPiYfCJzsaPLypfjKIXNUexMju1CE6ghde7wC0B8EDZS',
  },
  {
    username: 'sofia',
    name: 'Sofia Vergara',
    blogs: [],
    passwordHash:
      '$2b$10$rEVHZ3eTmKwSy0iKUSqcyeiyXNAn5keqhTn2s5iGQyIz9IXUnVJd.',
  },
]

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

const rootUser: IUser = {
  username: 'root',
  name: 'Superuser',
  blogs: [],
}

const uapiTestUsers: IUser[] = [
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    blogs: [],
  },
  rootUser,
]

const findTestBlogsUser = async (idx = 0) => {
  const firstUser = await User.findOne({
    username: blogTestUsers[idx].username,
  })
  // console.log("First User", firstUser)
  return firstUser?._id ? firstUser._id.toString() : 'missing-user'
}

const blogsAsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const nonExistingBlogId = async () => {
  const userId = await findTestBlogsUser()
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'xyz',
    url: 'https://example.com/blog-1',
    user: userId
  })
  const savedBlog = await blog.save()
  const savedBlogId = savedBlog._id
  await savedBlog.deleteOne()
  return savedBlogId
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((usr) => usr.toJSON())
}

const nonExistingUserId = async () => {
  const passwordHash = await bcrypt.hash('testpass', 10)
  const note = new User({
    username: 'willremovethissoon',
    name: 'xyz',
    passwordHash,
  })
  await note.save()
  await note.deleteOne()
  return note._id.toString()
}

const findOrCreateUser = async (ux: IUser) => {
  const usr = await User.findOne({ username: ux.username })
  if (usr) {
    return usr
  } else {
    const newUser = new User(ux)
    const usr = await newUser.save()
    return usr
  }
}

const findAndDeleteUser = async (ux: IUser) => {
  const usr = await User.findOne({ username: ux.username })
  if (usr) {
    return User.findByIdAndDelete(usr)
  }
}

export default {
  initialBlogs,
  blogTestUsers,
  rootUser,
  uapiTestUsers,
  findTestBlogsUser,
  blogsAsInDB,
  blogsInDB,
  nonExistingBlogId,
  usersInDb,
  nonExistingUserId,
  findOrCreateUser,
  findAndDeleteUser
}
