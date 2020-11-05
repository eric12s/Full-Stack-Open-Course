import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  let notificationStyle = {
    color: notification.color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (notification.color === 'white')
    notificationStyle = { visibility: 'hidden' }

  if (notification.content === null) {
    return null
  }

  return (
    <div className="container" style={notificationStyle}>
      {notification.content}
    </div>
  )
}

export default Notification