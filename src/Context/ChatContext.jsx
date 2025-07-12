// /context/ChatContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import socket from "../Socket";
import axios from "axios";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [selectMsgId, setSelectMsgId] = useState(null);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const senderId = localStorage.getItem("senderId");
  const receiverId = localStorage.getItem("receiverId");
  const username = localStorage.getItem("receiverUserName");
// search bar code 
    const [searchValue,setsearchValue]=useState('');

// search bar code end

  useEffect(() => {
    socket.emit("check_user_status", receiverId);
    setMessages([]);

    axios
      .post(`${import.meta.env.VITE_API_URL}/history`, { senderId, receiverId })
      .then((resp) => {
        const normalized = resp.data.map((m) => ({
          _id: m._id,
          sender: m.sender,
          recieverid: m.receiver,
          msg: m.msg,
          time: m.createdAt,
        }));
        setMessages(normalized);
      });

    socket.on("receive_msg", ({ _id, senderid, recieverid, msg, time }) => {
      if (
        (senderid === receiverId && recieverid === senderId) ||
        (senderid === senderId && recieverid === receiverId)
      ) {
        setMessages((prev) => [...prev, { _id, sender: senderid, recieverid, msg, time }]);
      }
    });

    socket.on("messageDeleted", (msgId) => {
      setMessages((prev) => prev.filter((m) => m._id !== msgId));
    });

    socket.on("messageDeletedForMe", (msgId) => {
      setMessages((prev) => prev.filter((m) => m._id !== msgId));
    });

    return () => {
      socket.off("receive_msg");
      socket.off("messageDeleted");
      socket.off("messageDeletedForMe");
    };
  }, []);

  const sendMessage = () => {
    if (msg.trim() !== "") {
      socket.emit("private_message", {
        senderid: senderId,
        recieverid: receiverId,
        msg,
      });
      setMsg("");
    }
  };

  const deleteMsgForEveryone = (msgId) => {
    socket.emit("deleteMsg", msgId);
    setSelectMsgId(null);
  };

  const deleteMsgForMe = (msgId) => {
    socket.emit("deleteForme", {
      msgId,
      userId: senderId,
    });
  };

  return (
    <ChatContext.Provider
      value={{
        selectMsgId,
        setSelectMsgId,
        msg,
        setMsg,
        messages,
        setMessages,
        username,
        senderId,
        receiverId,
        sendMessage,
        deleteMsgForEveryone,
        deleteMsgForMe,
        setsearchValue,
        searchValue
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
