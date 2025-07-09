import { useEffect, useRef } from "react";
import { useChat } from "../Context/ChatContext";
import socket from "../Socket";

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
        <div className="flex">
          <input
            onChange={handleTyping}
            value={msg}
            className="border py-1 px-2 border-gray-500 flex-1"
            type="text"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 px-3 py-1 rounded text-white"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
