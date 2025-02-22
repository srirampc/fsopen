import { createContext, useReducer, useContext, Dispatch } from 'react'
import { IUser } from '../ifx'


type IUserAction =
    | { type: 'SET'; payload: IUser }
    | { type: 'RESET' }

interface IProps {
    children?: React.ReactNode
}

const initialState = { username: '', password: '' }

const userReducer = (state = initialState, action: IUserAction) => {
  console.log('Reducer : ', state, action)
  switch (action.type) {
  case 'SET':
    return action.payload ? action.payload : action.payload
  case 'RESET':
    return initialState
  default:
    return state
  }
}

const UserContext = createContext<{
    state: IUser
    dispatch: Dispatch<IUserAction>
}>({ state: initialState, dispatch: () => null })

export const UserContextProvider = (props: IProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch.state
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch.dispatch
}

export default UserContext
