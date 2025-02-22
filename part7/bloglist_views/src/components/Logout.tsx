import { useAppDispatch, useAppSelector } from '../hooks'
import { logoutUser } from '../reducers/userReducer'

const Logout = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)

  return (
    <div>
      <form onSubmit={() => dispatch(logoutUser())}>
        {user.name} logged in. &nbsp;
        <button type="submit">logout</button>
      </form>
    </div>
  )
}

export default Logout
