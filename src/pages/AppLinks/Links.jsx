import React from 'react'
import { Link } from 'react-router-dom'

function Links() {
  return (
    <div>
        <nav>
            <Link to={'/'}>Register</Link>
            <Link to={'/home'}>Home</Link>
            <Link to={"/login"}>Login</Link>
            <Link to ={"/chatApp"}>ChatApp</Link>
            <Link to ={"/userlist"}>userlist</Link>
           
        </nav>
      
    </div>
  )
}

export default Links
