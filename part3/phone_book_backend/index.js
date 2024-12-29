require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')
morgan.token('pcontent', function (req, res) {
  return JSON.stringify(req.body)
})

const app = express()
app.use(express.static('dist'))
app.use(express.json())
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :pcontent'))
app.use(cors())
app.use(morgan('combined'))

app.get('/api', (request, response) => {
  const mainPage = [
    '<h1>Phone Book App</h1>',
    '<ul>',
    '<li><a href="/api/persons">/api/persons</a> : GET/POST</li>',
    '<li><a href="/api/persons/{id}">/api/persons/{id}</a> : GET/PUT/DELETE</li>',
    '</ul>',
  ]
  response.send(mainPage.join(''))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((note) => {
      response.json(note)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'Name is missing',
    })
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'Number is missing',
    })
  }
  Person.findOne({ name: body.name })
    .then((foundPerson) => {
      console.log(foundPerson)
      if (foundPerson) {
        return response.status(400).json({
          error: `Name must be unique : ${foundPerson.name} is already in the Phone Book.`,
        })
      }
      const person = new Person({
        name: body.name,
        number: body.number,
      })

      person
        .save()
        .then((savedPerson) => {
          console.log(savedPerson)
          response.json(savedPerson)
        })
        .catch((error) => next(error))
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.get('/info', (request, response, next) => {
  Person.countDocuments()
    .then((npersons) => {
      const content = [
        '<p>Phone book has info for ',
        npersons.toString(),
        ' people. </p>',
        '<br></br>',
        '<p>',
        new Date(),
        ' </p>',
      ]
      response.send(content.join(''))
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((delPerson) => {
      console.log(delPerson)
      return response.status(204).end()
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error('Error ', error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

//  Last error to be handled
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
