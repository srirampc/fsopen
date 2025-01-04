import express from 'express'
import User, { IUser } from '../models/user'
import bcrypt from 'bcrypt'

const usersRouter = express.Router()

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password }: IUser = request.body
  if (username.length < 4 || !password || password.length < 4) {
    response.status(401).json({error: 'username/password should be atleast 3 chars long'})
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
})

export default usersRouter
