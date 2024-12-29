require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')
morgan.token('pcontent', function(req, res) {
    return JSON.stringify(req.body)
})

const app = express()
app.use(express.json())
app.use(express.static('dist'))
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :pcontent'))
app.use(morgan('tiny'))
app.use(cors())

app.get('/', (request, response) => {
    response.send('<h1>Hello, world!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person
        .findById(request.params.id)
        .then(note => {
            response.json(note)
        })
        .catch(error => {
            console.log(error)
            response.status(404).end()
        })
})

app.post('/api/persons', (request, response) => {
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
    Person.findOne({ name: body.name })
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
})

app.get('/info', (request, response) => {
    Person.countDocuments().then(npersons => {
        const content = [
            '<p>Phone book has info for ', npersons.toString(), ' people. </p>',
            '<br></br>',
            '<p>', new Date(), ' </p>'
        ]
        response.send(
            content.join('')
        )
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person
        .findByIdAndDelete(request.params.id)
        .then(delPerson => {
            console.log(delPerson)
            return response.status(204).end()
        })
        .catch(error => {
            return response.status(204).end()
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
