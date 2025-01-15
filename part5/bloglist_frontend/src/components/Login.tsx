import loginService from '../services/login'
import blogService from '../services/blogs'
import { IUser, IPropsLogin } from '../ifx'
import { useState, FormEvent } from 'react'

const Login = (props: IPropsLogin) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
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
          props.setNotifyMessage({ message: errMessage, className: 'error' })
          setTimeout(() => {
            props.setNotifyMessage({ message: null, className: '' })
          }, 5000)
        })) as IUser
      console.log(user)
      window.localStorage.setItem(loginService.tokenKey, JSON.stringify(user))
      if (user.token) {
        blogService.setToken(user.token)
      }
      props.setUser(user)
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
