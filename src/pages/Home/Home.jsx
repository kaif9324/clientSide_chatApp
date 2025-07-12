import React, { useEffect, useState } from 'react'
// import Chat from '../../components/Chat'
import User_list from '../UserList/User_list'
import Header from '../../components/Header'
// import jwt_decode from 'jwt-decode'

function Home() {

 

  return (
    <div className=' h-screen   '>
   <Header/>
   <User_list/>
   
     
    </div>
  )
}

export default Home
