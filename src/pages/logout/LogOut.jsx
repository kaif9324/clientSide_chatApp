import React, { useEffect } from 'react'
import socket from '../../Socket'
import { useNavigate } from 'react-router-dom'


function LogOut() {

  const navigate = useNavigate()
  useEffect(() => {
    // Ensure the socket is connected
    if (!socket.connected) {
      socket.connect()
    }

    // Emit logout event
    socket.emit('logout');

    //   Listen for disconnect from server 
    socket.on('disconnect', () => {
      console.log('disconnected from server');

      // Clear local storage
      localStorage.removeItem('senderUsername')
      localStorage.removeItem('senderId')
      localStorage.removeItem("token");

      socket.disconnect()

      navigate('/login')

    })



  }, [])

  return (
    <div>
      <h1>logging out...</h1>
    </div>
  )
}

export default LogOut
