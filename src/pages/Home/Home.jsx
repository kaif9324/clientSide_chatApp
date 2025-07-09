import React, { useEffect, useState } from 'react'
// import Chat from '../../components/Chat'
import User_list from '../UserList/User_list'
// import jwt_decode from 'jwt-decode'

function Home() {

 

  return (
    <div className=' h-screen  border border-black
    '>
      <h1>My app {}</h1>
      {/* <h1>this is home page</h1> */}
      <div className=''>
      {/* <Chat/> */}
    
      <User_list token={token} />
      </div>
     
    </div>
  )
}

export default Home
