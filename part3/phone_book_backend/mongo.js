require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_PHONEBOOK_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 2) {
  Person.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note)
    })
    mongoose.connection.close()
  })
  return 0
}

if (process.argv.length < 4) {
  console.log('Not enough arguments: provide name and number')
  return 0
}
const person_name = process.argv[2]
const person_number = process.argv[3]
const person = new Person({
  name: person_name,
  number: person_number,
})

person.save().then((result) => {
  console.log(`Added ${person_name} ${person_number} to PhoneBook`)
  mongoose.connection.close()
})
