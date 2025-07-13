import { useChat } from "../Context/ChatContext";

const ChatMessages = () => {
  const {
    messages,
    senderId,
    selectMsgId,
    setSelectMsgId,
    deleteMsgForEveryone,
    deleteMsgForMe,
  } = useChat();

  return (
    <div className="p-5 h-full overflow-y-auto">
      <div className="mt-4">
        {messages.map((val) => {
          const Mymessage = val.sender === senderId;
          return (
            <div
              key={val._id}
              className={`flex items-center mb-1 ${
                Mymessage ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`relative p-2 rounded-lg max-w-[60%] ${
                  Mymessage
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-black mr-auto"
                }`}
              >
                {selectMsgId === val._id && (
                  <>
                    {Mymessage ? (
                      <>
                        <button
                          className="absolute top-[-50px] right-0 bg-red-600 text-white text-xs px-2 py-1 rounded"
                          onClick={() => deleteMsgForMe(val._id)}
                        >
                          Delete for me
                        </button>
                        <button
                          className="absolute top-0 right-0 bg-red-600 text-white text-xs px-2 py-1 rounded"
                          onClick={() => deleteMsgForEveryone(val._id)}
                        >
                          Delete for everyone
                        </button>
                      </>
                    ) : (
                      <button
                        className="absolute top-[-50px] right-0 bg-red-600 text-white text-xs px-2 py-1 rounded"
                        onClick={() => deleteMsgForMe(val._id)}
                      >
                        Delete for me
                      </button>
                    )}
                  </>
                )}
<div className="w-auto">
  <p onClick={() => setSelectMsgId(val._id)} className=" text-xs md:text-[15px]">{val.msg}</p>
                <p className="text-xs  text-end">{new Date(val.time).toLocaleTimeString()}</p>
</div>
              
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatMessages;
