import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import RegisterUser from './pages/register/RegisterUser'
import LoginUser from './pages/login/LoginUser'
import Profiless from './pages/profile/Profiless'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Chat from './components/Chat'
import User_list from './pages/UserList/User_list'
import Home from './pages/Home/Home'
import LogOut from './pages/logout/LogOut'
import socket from './Socket'





function App() {

 useEffect(()=>{
  const token = localStorage.getItem('token')
  if(token){
    socket.auth={token}
    socket.connect()
  }

 },[])
  return (
    <>
   

   <Routes>
    <Route path='/' element={<RegisterUser/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/login' element={<LoginUser/>}/>
    <Route path='/chatApp' element={<Chat/>}/>
    <Route path='/userlist' element={<User_list/>}/>
    <Route path='/logout' element={<LogOut/>}/>

   </Routes>
  
    </>
  )
}

export default App
