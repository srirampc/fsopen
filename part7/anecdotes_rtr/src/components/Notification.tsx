import { INotificationProps } from '../ifx'

const Notification = (props: INotificationProps) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    width: '580px',
  }
  if (props.notification) return <div style={style}>{props.notification}</div>
}

export default Notification
