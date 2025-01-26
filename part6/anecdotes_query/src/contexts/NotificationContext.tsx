import { createContext, useReducer, useContext, Dispatch } from 'react'

interface IAction {
  type: 'SET' | 'RESET'
  payload?: string
}

interface IState {
  notification: string
}

interface IProps {
  children?: React.ReactNode
}

const initialState = { notification: '' }

const notificationReducer = (state: IState = initialState, action: IAction) => {
  console.log('Reducer : ', state, action)
  switch (action.type) {
    case 'SET':
      return { notification: action.payload ? action.payload : '' }
    case 'RESET':
      return { notification: '' }
    default:
      return state
  }
}

const NotificationContext = createContext<{
  state: IState
  dispatch: Dispatch<IAction>
}>({ state: initialState, dispatch: () => null })

export const NotificationContextProvider = (props: IProps) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch.state.notification
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch.dispatch
}

export default NotificationContext
