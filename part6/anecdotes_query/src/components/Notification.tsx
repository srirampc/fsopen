const Notification = ({notification}: {notification: string}) => {
  // const notification = useAppSelector((state) => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    width: '580px',
  }
  if (notification) return <div style={style}>{notification}</div>
}

export default Notification
