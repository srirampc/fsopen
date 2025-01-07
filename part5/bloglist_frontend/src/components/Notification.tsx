import { IPropsNotification } from '../ifx'

const Notification = ({ message, className }: IPropsNotification) => {
  if (message === null) {
    return null
  }

  return <div className={className}>{message}</div>
}

export default Notification
