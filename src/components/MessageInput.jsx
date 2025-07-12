import { useEffect, useRef } from "react";
import { useChat } from "../Context/ChatContext";
import socket from "../Socket";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';

const MessageInput = () => {
  const { msg, setMsg, sendMessage, senderId, receiverId } = useChat();

  const typingtimer = useRef(null);

  const handleTyping = (e) => {
    const value = e.target.value;
    setMsg(value);
    socket.emit("typing", { senderId, receiverId });

    if (value.trim() === "") {
      socket.emit("stop_typing", { senderId, receiverId });
      return;
    }

      // clear old time out
      if(typingtimer.current){
        clearTimeout(typingtimer.current);
      }

      // after 2 sec shows stop typing 
      typingtimer.current = setTimeout(()=>{
        socket.emit("stop_typing",{senderId, receiverId})
      },2000);


  };


  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    socket.emit("stop_typing", { senderId, receiverId });
  };

  
  useEffect(()=>{
    return ()=>{
      socket.emit('stop_typing',{ senderId, receiverId })
    }
  },[senderId, receiverId ])

  return (
    <div className="w-full sticky bottom-0 p-2">
      <form onSubmit={handleSubmit}>
        <div className=" flex border   rounded-2xl  border-red-900 pt-1 pb-1">
        
              <input
            onChange={handleTyping}
            value={msg}
            className=" border-none outline-none  py-1 px-2 border-gray-500 flex-1"
            type="text"
            placeholder="Type a message..."
            
          />
            <div className="  flex items-center justify-end w-full border-red-900">
     <AttachFileIcon className="  w-fit"/>
     <CameraAltIcon className="mx-4"/>
     <MicIcon/>

        
        

          <button
            type="submit"
            className="ml-2 mr-2 bg-blue-500  w-9 h-9  rounded-full text-white"
          >
            <SendIcon/>
          </button>
            </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
