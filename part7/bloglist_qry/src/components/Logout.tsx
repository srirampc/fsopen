import { useUserDispatch, useUserValue } from '../contexts/UserContext'
import loginService from '../services/login'

const Logout = () => {
  const user = useUserValue()
  const userDispatch = useUserDispatch()
  const handleLogout = () => {
    window.localStorage.removeItem(loginService.tokenKey)
    userDispatch({ type: 'RESET' })
  }

  return (
    <div>
      <form onSubmit={handleLogout}>
        {user?.name} logged in. &nbsp;
        <button type="submit">logout</button>
      </form>
    </div>
  )
}

export default Logout
