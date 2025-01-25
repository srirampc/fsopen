import jsonServer from 'json-server'
const server = jsonServer.create()
console.log(server)
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

import e from 'express'
const validator = (
  request: e.Request,
  response: e.Response,
  next: e.NextFunction,
) => {
  console.log()

  const { content } = request.body

  if (request.method === 'POST' && (!content || content.length < 5)) {
    response.status(400).json({
      error: 'too short anecdote, must have length 5 or more',
    })
  } else {
    next()
  }
}

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.use(validator)
server.use(router)

server.listen(3001, () => {
  console.log('JSON Server is running')
})
