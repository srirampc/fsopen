const Notification = ({notifyMessage}) => {
    console.log("Notification : ", notifyMessage)
    const [message, messageClass] = notifyMessage
    if (message == null) {
        return null
    }

    return (
        <div className={messageClass}>
            {message}
        </div>
    )
}

export default Notification

