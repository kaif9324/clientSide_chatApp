import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import socket from "../Socket";
import { useChat } from "../Context/ChatContext";
import axios from "axios";
import FormateLastSeen from "../Utlility/FormateLastSeen";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
function ChatHeader() {
  const [userStatus, setUserStatus] = useState({});
  const [typingStatus, settypingStatus] = useState({});
  const { username, senderId, receiverId } = useChat();

  useEffect(() => {
    if (!receiverId) return;

    const initialStatus = async () => {
      try {
        const resp = await axios.get(
          `${import.meta.env.VITE_API_URL}/chatApp/status/${receiverId}`
        );
        const { online, lastSeen } = resp.data;
        setUserStatus((prev) => ({
          ...prev,
          [receiverId]: { online, lastSeen },
        }));
      } catch (err) {
        console.log("Initial status fetch error:", err);
      }
    };

    // Listen for user status updates
    socket.on("userStatusUpdate", ({ userId, online, lastSeen }) => {
      setUserStatus((prev) => ({
        ...prev,
        [userId]: { online, lastSeen },
      }));
    });

    socket.on('disconnectuser',({userid,online,lastSeen})=>{
      setUserStatus((prev)=>({
        ...prev,
        [userid]:{online,lastSeen}

      }))

    })

    // Listen for typing events
    socket.on("show_typing", ({ senderId }) => {
      settypingStatus((prev) => ({ ...prev, [senderId]: true }));
    });

    socket.on("hide_typing", ({ senderId }) => {
      settypingStatus((prev) => ({ ...prev, [senderId]: false }));
    });

    initialStatus(); // Fetch initial online status and last seen

    return () => {
      // Proper cleanup
      socket.off("userStatusUpdate");
      socket.off("show_typing");
      socket.off("hide_typing");
      socket.off('disconnectuser');
    };
  }, [receiverId]);

  const getReceiverStatus = (receiverid) => {
    if (typingStatus[receiverid]) return "typing...";

    const status = userStatus[receiverid];
    if (!status) return "🔘 Unknown";


    return status.online
      ? "🟢 Online"
      : `Last Seen at ${FormateLastSeen(status.lastSeen)}`;
  };

  return (
    <div className="">
      <div className="p-2 md:text-black bg-blue-600">
        <div className="p-2  md:text-black bg-blue-600">
          <h1 className="w-full text-2xl font-bold uppercase flex justify-between">
            {username}

            <div className="text-white flex justify-between  w-32 items-center">
             <VideocamIcon/>
             <CallIcon/>
             <MoreVertIcon/>

            </div>
         
          </h1>
          <div className="w-72 text-white">
   <p >{getReceiverStatus(receiverId)}</p>
          </div>
       
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
