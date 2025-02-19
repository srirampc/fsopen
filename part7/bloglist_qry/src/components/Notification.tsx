import { useNotificationValue } from '../contexts/NotificationContext'

const Notification = () => {
  const nx = useNotificationValue()
  if (nx.message) return <div className={nx.className}>{nx.message}</div>
}

export default Notification
