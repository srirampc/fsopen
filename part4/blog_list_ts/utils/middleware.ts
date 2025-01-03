import e from 'express'
import logger from './logger'
import jwt from 'jsonwebtoken'

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
  console.error('ERROR: ', error.message)

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

export interface BlogRequest extends e.Request {
  token: string
  user?: string
}

const tokenExtractor = (
  request: e.Request,
  response: e.Response,
  next: e.NextFunction,
) => {
  // code that extracts the token
  const req = request as BlogRequest
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    const token = authorization.replace('Bearer ', '')
    req.token = token
    // console.log('Req Token : ', req.token)
  }

  next()
}

const userExtractor = (
  request: e.Request,
  response: e.Response,
  next: e.NextFunction,
) => {
  const req = request as BlogRequest
  const decodedToken = jwt.verify(req.token, process.env.SECRET as string)
  console.log('Token at user', decodedToken)
  if (typeof decodedToken != 'string' && decodedToken.id) {
    req.user = decodedToken.id
  }

  next()
}

export default {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
