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

app.use(cors())
app.use(express.json())

// Add middleware
app.use(morgan('combined'))
app.use('/api/blogs', blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
