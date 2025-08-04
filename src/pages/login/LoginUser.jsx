import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'
import socket from "../../Socket";



function LoginUser() {
  const navigat = useNavigate();
  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // submit handler


  const login_handleSubmit = async (e) => {
    e.preventDefault();

    setPasswordError("");
    setemailError("");
   

    try {
      const login_form = {
        email: loginEmail,
        password: loginPassword,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/chatApp/login`,
        login_form
      );
    
      const token = response.data.token
      localStorage.setItem("token", response.data.token);
      socket.auth = {token}
    if(socket.connected){
      socket.disconnect() // disconnect the previouse socket connection
    }
    socket.connect();

      const TokenData = jwtDecode(token)
      // console.log(TokenData)
      // console.log(TokenData.userdata.username)

    localStorage.setItem('senderId',TokenData.userdata.id);
     localStorage.setItem('senderUsername',TokenData.userdata.username);

      alert("login sucessfully");

      // console.log("login user", response.data);


      setloginEmail("");
      setloginPassword("");
      
      navigat('/home')
    } catch (error) {
      console.log(error);

      // showing error mesg for email and password 
      const errordata = error.response?.data;
      if (errordata.field == "email") {
        setemailError(errordata.msg);
      } else if (errordata.field == "password") {
        setPasswordError(errordata.msg);
      } else {
        alert("login failed");
      }
    }

 
  };
  return (
    <div>  
    
      <div className="flex justify-center items-center min-h-screen ">
        <form
          onSubmit={login_handleSubmit}
          className=" bg-transparent  shadow-black  hover:shadow-gray-600  shadow-2xl p-6 rounded-xl"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-white  tracking-[25px] uppercase   border-b border-yellow-300 pb-2">Login</h2>
          <table className="table-auto border-collapse w-full">
            <tbody>
              <tr>
                <td className="p-2">
                  <label htmlFor="email" className="font-medium text-white">
                    Email:
                  </label>
                </td>
                <td className="p-2">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginEmail}
                    required
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    onChange={(e) => {
                      setloginEmail(e.target.value);
                    }}
                  />
                  {emailError && (
                    <p className="text-red-600 mt-1 text-sm border text-left">
                      {emailError}
                    </p>
                  )}
                </td>
              </tr>

              <tr>
                <td className="p-2">
                  <label htmlFor="password" className="font-medium text-white">
                    Password:
                  </label>
                </td>
                <td className="p-2">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginPassword}
                    required
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                    onChange={(e) => {
                      setloginPassword(e.target.value);
                    }}
                  />
                  {passwordError && (
                    <p className="text-red-600 mt-1 text-left text-sm">
                      {passwordError}
                    </p>
                  )}
                </td>
              </tr>
              <tr>
                <td></td>
                <td colSpan="2" className="text-center p-4">
                  <button
                    type="submit"
                    className="text-white px-6 py-2 ml-1  rounded  shadow-inner     shadow-white hover:shadow-yellow-400"
                  >
                    login
                  </button>

        
                          <Link  to={'/'}>
                          <button 
                            className=" text-white px-6 py-2 ml-1  rounded  shadow-inner     shadow-white hover:shadow-yellow-400 "
                          >
                            Register
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

export default LoginUser;
