const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleWare = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_BLOGS_URI
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
app.use(middleWare.unknownEndpoint)

module.exports = app
