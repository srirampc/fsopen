import { useAppDispatch, useAppSelector } from '../hooks'
import { logoutUser } from '../reducers/userReducer'

const Logout = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.loggedInUser)

  return (
    <>
      {user.name} logged in. &nbsp;
      <button onClick={() => dispatch(logoutUser())}>logout</button>
    </>
  )
}

export default Logout
