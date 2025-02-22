import { useAppSelector } from '../hooks'

const Notification = () => {
  const notification = useAppSelector((state) => state.notification)
  if (notification.message) {
    return <div className={notification.className}>{notification.message}</div>
  } else {

    return null
  }

}

export default Notification
