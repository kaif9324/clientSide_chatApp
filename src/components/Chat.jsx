import ChatHeader from "../components/ChatHeader";
import ChatMessages from "../components/ChatMessages";
import MessageInput from "../components/MessageInput";
import { ChatProvider } from "../Context/ChatContext";

const Chat = () => {
  return (
    <ChatProvider>
      <div className="md:bg-black h-screen flex items-center justify-center">
        <div className="md:bg-white w-full md:w-3/4 h-screen border border-red-700 flex flex-col">
          <ChatHeader />
          <ChatMessages />
          <MessageInput />
        </div>
      </div>
    </ChatProvider>
  );
};

export default Chat;
