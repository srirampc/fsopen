import loginService from '../services/login'
import blogService from '../services/blogs'
import { IUser } from '../ifx'
import { useState, FormEvent } from 'react'
import { useNotificationDispatch } from '../contexts/NotificationContext'
import { useUserDispatch } from '../contexts/UserContext'

const Login = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const notifDispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('login envent')
    try {
      const user = (await loginService
        .login({
          username,
          password,
        })
        .catch((error) => {
          const errMessage = error.response
            ? error.response.data.error
            : error.message
          notifDispatch({
            type: 'SET',
            payload: { message: errMessage, className: 'error' }
          })
          setTimeout(() => notifDispatch({ type: 'RESET' }), 5000)
        })) as IUser
      console.log(user)
      window.localStorage.setItem(loginService.tokenKey, JSON.stringify(user))
      if (user.token) {
        blogService.setToken(user.token)
      }
      userDispatch({ type: 'SET', payload: user })
      setUsername(username)
      setPassword(password)
    } catch (error) {
      console.log('Error : ', error)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login
