import { IPropsLogout } from '../ifx'
import loginService from '../services/login'

const Logout = (props: IPropsLogout) => {
  const handleLogout = () => {
    window.localStorage.removeItem(loginService.tokenKey)
    props.setUser(null)
  }

  return (
    <div>
      <form onSubmit={handleLogout}>
        {props.user?.name} logged in. &nbsp;
        <button type="submit">logout</button>
      </form>
    </div>
  )
}

export default Logout
