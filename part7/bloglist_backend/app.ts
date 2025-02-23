import 'express-async-errors'
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import cors from 'cors'
const app = express()
import blogsRouter from './controllers/blogs'
import logger from './utils/logger'
import config from './utils/config'
import middleware from './utils/middleware'
import usersRouter from './controllers/users'
import loginRouter from './controllers/login'
import testingRouter from './controllers/testing'
import commentsRouter from './controllers/comments'

const mongoUrl = config.MONGODB_BLOGS_URI ? config.MONGODB_BLOGS_URI : 'NODB'
mongoose
  .connect(mongoUrl)
  .then((result) => {
    logger.info([
      'Connected to Mongo DB :',
      `[${result.connection.host}:${result.connection.port.toString()}]`,
    ])
  })
  .catch((error) => {
    logger.error([`Error connecting to MongoDB : ${error.message}`])
  })

// Add middleware
app.use(cors())
app.use(express.json())

app.use(morgan('combined'))
app.use(middleware.tokenExtractor)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/comments', middleware.userExtractor, commentsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV == 'test') {
  app.use('/api/testing', testingRouter)
}
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
