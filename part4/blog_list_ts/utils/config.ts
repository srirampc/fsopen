import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'test'
const MONGODB_BLOGS_URI =
  NODE_ENV === 'test'
    ? process.env.MONGODB_TEST_BLOGS_URI
    : process.env.MONGODB_BLOGS_URI

export default {
  MONGODB_BLOGS_URI,
  PORT,
}
