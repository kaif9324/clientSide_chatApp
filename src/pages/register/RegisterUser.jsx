import axios from "axios";
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
// import {io} from "socket.io-client";

import Socket from '../../Socket'

function RegisterUser() {
    const navigate = useNavigate();
    const [username,setusername]=useState('');
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    
    const handleSubmit =async(e)=>{
    
          e.preventDefault(); 
        const formData={
            username,
            email,
            password
        }
        try{
          const response=  await axios.post(`${import.meta.env.VITE_API_URL}/chatApp/register`,formData,)
          console.log("server response",response.data);
          console.log("server id",response.data.response._id );
          const senderId = response.data.response._id;
          const senderUsername=response.data.response.username;
          Socket.emit('register',senderId)
          localStorage.setItem('senderId',senderId);
          localStorage.setItem('senderUsername',senderUsername);

          setusername('');

          
          setemail('');
          setpassword('');
          navigate('/userlist')

        }catch(err){
            console.log(err)
        }

        // send data for socket it 
        
        

    }
    
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
          <table className="table-auto border-collapse w-full">
            <tbody>
              <tr>
                <td className="p-2">
                  <label htmlFor="username" className="font-medium">
                    Username:
                  </label>
                </td>
                <td className="p-2">
                  <input
                  value={username}
                    type="text"
                    id="username"
                    name="username"
                    required
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    onChange={(e)=>{setusername(e.target.value)}}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2">
                  <label htmlFor="email" className="font-medium">
                    Email:
                  </label>
                </td>
                <td className="p-2">
                  <input
                  value={email}
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    onChange={(e)=>{setemail(e.target.value)}}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-2">
                  <label htmlFor="password" className="font-medium">
                    Password:
                  </label>
                </td>
                <td className="p-2">
                  <input
                    type="password"
                    value={password}
                    id="password"
                    name="password"
                    required
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    onChange={(e)=>{setpassword(e.target.value)}}
                  />
                </td>
              </tr>
              <tr className="border w-full ">
                <td colSpan="2" className="text-center p-4">
                  <button 
              
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                  >
                    Register
                  </button>

                  <Link  to={'/login'}>
                  <button 
              
                  
                    className="bg-blue-600 text-white px-6 py-2 ml-1  rounded hover:bg-blue-700"
                  >
                    Login
                  </button>
                </Link>
                </td>

              
             
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
}

export default RegisterUser;
