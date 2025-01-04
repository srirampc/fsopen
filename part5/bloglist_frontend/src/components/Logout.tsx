import { IPropsLogout } from '../ifx'
import loginService from '../services/login'

const Logout = (props: IPropsLogout) => {
  const handleLogout = () => {
    window.localStorage.removeItem(loginService.tokenKey)
    props.setUser(null)
  }

  return (
    <div>
      <p>{props.user?.name} logged in`. </p>
      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>
    </div>
  )
}

export default Logout
