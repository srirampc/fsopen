import { createContext, useReducer, useContext, Dispatch } from 'react'

interface INotification {
  message: string
  className: string
}

type IAction =
  | { type: 'SET'; payload: INotification }
  | { type: 'RESET' }

interface IProps {
  children?: React.ReactNode
}

const initialState = { message: '', className: '' }

const notificationReducer = (state = initialState, action: IAction) => {
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

const NotificationContext = createContext<{
  state: INotification
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
  return notificationAndDispatch.state
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch.dispatch
}

export default NotificationContext
