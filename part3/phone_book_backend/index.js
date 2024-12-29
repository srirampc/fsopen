const express = require('express')
var morgan = require('morgan')
const cors = require('cors')

persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

morgan.token('pcontent', function (req, res) {
    return JSON.stringify(req.body)
})

const app = express()
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :pcontent'))
app.use(cors())

app.get('/', (request, response) => {
    response.send('<h1>Hello, world!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.send(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const generateId = () => {
    const randomId = getRandomInt(10000000)
    return String(randomId)
}

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
    const r_person = persons.find(p => p.name === body.name)
    if (r_person && r_person.name == body.name) {
        console.log(r_person)
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)
    console.log(person)
    response.json(person)
})



app.get('/info', (request, response) => {
    const npersons = persons.length
    const content = [
        '<p>Phone book has info for ', npersons.toString(), ' people. </p>',
        '<br></br>',
        '<p>', new Date(), ' </p>'
    ]
    number
    response.send(
        content.join('')
    )
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(note => note.id !== id)
    response.status(204).end()
})

const PORT =  process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  })
