import { useSelector } from 'react-redux'
import { AppState } from '../ifx'

const Notification = () => {
  const notification = useSelector<AppState, string>(
    (state) => state.notification,
  )
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  if (notification.length > 0) return <div style={style}>{notification}</div>
}

export default Notification
