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

    if (typingtimer.current) {
      clearTimeout(typingtimer.current);
    }

    typingtimer.current = setTimeout(() => {
      socket.emit("stop_typing", { senderId, receiverId });
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    socket.emit("stop_typing", { senderId, receiverId });
  };

  useEffect(() => {
    return () => {
      socket.emit("stop_typing", { senderId, receiverId });
    };
  }, [senderId, receiverId]);

  return (
    <div className="w-full sticky bottom-0 bg-white px-2 py-2 border-t">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-2 shadow-sm gap-2 max-w-full overflow-hidden">

          {/* Input */}
          <input
            onChange={handleTyping}
            value={msg}
            className="flex-1 bg-transparent text-sm border-none outline-none placeholder:text-gray-500"
            type="text"
            placeholder="Type a message..."
          />

          {/* Action icons */}
          <button type="button" className="text-gray-600">
            <AttachFileIcon fontSize="small" />
          </button>
          <button type="button" className="text-gray-600">
            <CameraAltIcon fontSize="small" />
          </button>
          <button type="button" className="text-gray-600">
            <MicIcon fontSize="small" />
          </button>

          {/* Send button */}
          <button
            type="submit"
            className="w-7 h-7 px-1 md:w-8 md:h-8 bg-blue-500 text-white flex items-center justify-center rounded-full"
          >
            <SendIcon fontSize="small" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
