require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_BLOGS_URI = process.env.MONGODB_BLOGS_URI

module.exports = {
  MONGODB_BLOGS_URI,
  PORT,
}
