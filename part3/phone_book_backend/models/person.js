const mongoose = require('mongoose')

const url = process.env.MONGODB_PHONEBOOK_URI

mongoose.set('strictQuery', false)
mongoose
  .connect(url)
  .then((result) => {
    console.log(
      'Connected to MongoDB : ',
      [
        result.connection.host.toString(),
        ':',
        result.connection.port.toString(),
      ].join(''),
    )
  })
  .catch((error) => {
    console.log('error connecting to MongoDB : ', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d\d\d?-\d+$/.test(v)
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Phone number should be of the format 'prefix-suffix' where prefix is either 2 or 3 digit number and suffix is a number of minimum 5 digits`,
    },
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
