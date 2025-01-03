import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/user'
import e from 'express'

const loginRouter = e.Router()

loginRouter.post('/', async (request: e.Request, response: e.Response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user?.passwordHash
    ? await bcrypt.compare(password, user.passwordHash)
    : false

  if (!(user && passwordCorrect)) {
    response.status(401).json({
      error: 'invalid username or password',
    })
  } else {
    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET as string)

    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  }
})

export default loginRouter
