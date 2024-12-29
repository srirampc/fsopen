require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')
morgan.token('pcontent', function(req, res) {
    return JSON.stringify(req.body)
})

const app = express()
app.use(express.static('dist'))
app.use(express.json())
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :pcontent'))
app.use(cors())
app.use(morgan('combined'))

app.get('/', (request, response) => {
    response.send('<h1>Hello, world!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person
        .findById(request.params.id)
        .then(note => {
            response.json(note)
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    Person
        .findOne({ name: body.name })
        .then(foundPerson => {
            console.log(foundPerson)
            if (foundPerson) {
                return response.status(400).json({
                    error: 'name must be unique'
                })
            } else {
                const person = new Person({
                    name: body.name,
                    number: body.number,
                })

                person.save().then(savedPerson => {
                    console.log(savedPerson)
                    response.json(savedPerson)
                })
            }
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number,
    }

    Person
        .findByIdAndUpdate(request.params.id, person, {new: true})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})



app.get('/info', (request, response, next) => {
    Person
        .countDocuments()
        .then(npersons => {
            const content = [
                '<p>Phone book has info for ', npersons.toString(), ' people. </p>',
                '<br></br>',
                '<p>', new Date(), ' </p>'
            ]
            response.send(
                content.join('')
            )
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person
        .findByIdAndDelete(request.params.id)
        .then(delPerson => {
            console.log(delPerson)
            return response.status(204).end()
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

//  Last error to be handled
app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
