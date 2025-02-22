import { FormEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setNotification } from '../reducers/notficationReducer'
import { loginUser, setPassword, setUserName } from '../reducers/userReducer'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.loggedInUser)
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('login event')
    dispatch(loginUser(user.username, user.password))
      .then(() => {
        navigate('/')
      })
      .catch(
        (error) => {
          console.log('Error : ', error)
          const axerr = error as AxiosError
          if (axerr) {
            const errMessage = axerr.response?.data
              ? (axerr.response.data as { error: string }).error
              : axerr.message
            dispatch(setNotification({ message: errMessage, className: 'error' }, 5))
          }
        }
      )
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid="username"
          type="text"
          value={user.username}
          name="Username"
          onChange={({ target }) => dispatch(setUserName(target.value))}
        />
      </div>
      <div>
        password
        <input
          data-testid="password"
          type="password"
          value={user.password}
          name="Password"
          onChange={({ target }) => dispatch(setPassword(target.value))}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login
