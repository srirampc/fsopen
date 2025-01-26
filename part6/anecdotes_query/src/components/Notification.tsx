import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = () => {
  // const notification = useAppSelector((state) => state.notification)
  const notification = useNotificationValue()
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    width: '580px',
  }
  if (notification) return <div style={style}>{notification}</div>
}

export default Notification
