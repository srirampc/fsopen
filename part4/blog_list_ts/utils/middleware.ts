import e from 'express'
import logger from './logger'

const requestLogger = (
  request: e.Request,
  response: e.Response,
  next: e.NextFunction,
) => {
  logger.info(['Method: ', request.method])
  logger.info(['Path  : ', request.path])
  logger.info(['Body  : ', request.body])
  logger.info(['---'])
  next()
}

const unknownEndpoint = (request: e.Request, response: e.Response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (
  error: Error,
  request: e.Request,
  response: e.Response,
  next: e.NextFunction,
) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message })
  } else if (
    error.name == 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    response.status(400).json({ error: 'expected `username` to be unique' })
  } else {
    next(error)
  }
}

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}
