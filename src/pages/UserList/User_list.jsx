import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import socket from '../../Socket'

function User_list() {
  const navigate = useNavigate();
  const [userlist, setUserlist] = useState([]);
  const [senderId, setSenderId] = useState(null);
  const [senderUsername, setSenderUsername] = useState('');

  useEffect(() => {
    const getAllUser = async () => {
      const storedSenderId = localStorage.getItem('senderId');
      const storedSenderUsername = localStorage.getItem('senderUsername');
      console.log(storedSenderUsername,storedSenderId)
      const token = localStorage.getItem('token')
     

      setSenderId(storedSenderId);
      setSenderUsername(storedSenderUsername);


      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/chatApp/userlist`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
        });
        console.log(response.data);
        setUserlist(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllUser();
  }, []);

  const handleSendID = (userid, username) => {
    console.log("Clicked User:", userid,username);
    console.log("Sender Id:", senderId);
    localStorage.setItem('receiverId',userid)
    localStorage.setItem('receiverUserName',username)
    navigate('/chatApp')
    // navigate('/chatApp', {
    //   state: {
    //     senderId: senderId,
    //     receiverId: userid,
    //     username: username
    //   }
    // });


  };

  return (
    <div>
      <h2 className='text-lg font-bold m-4'>You are: {senderUsername}</h2>

      <div>
        {userlist
          .filter(user => user._id !== senderId) // ✅ exclude logged-in user
          .map((user, index) => (
            <div
              key={user._id}
              onClick={() => handleSendID(user._id, user.username)}
              className='flex m-5 flex-1 cursor-pointer'
            >
              <div className='h-12 w-12 border rounded-full'>
                <img src="" alt="" />
              </div>

              <div className='ml-3'>
                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>{user._id}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default User_list;
