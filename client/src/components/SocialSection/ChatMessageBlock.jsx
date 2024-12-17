import React, { useState } from "react";
import { FaCheck, FaClipboard, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { SocketDeleteMessage } from "../../event/SocketEvent";
const ChatMessageBlock = ({ message,  index }) => {
  const currentUserId = useSelector((state) => state.user.userInfo._id);
  const isSender = message.sender_id === currentUserId;
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const chats = useSelector((state) => state.chat.chats);
  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content);
    alert("Message copied to clipboard!");
  };

  const handleDeleteMessage = () => {
    SocketDeleteMessage(message.chat_id,message._id);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  // Find the chat containing the current message
  const chat = chats.find((chat) => chat.chat_id === message.chat_id);
  
  // Find the number of users whose unread_messages count is less than the index of the message
  const unreadCount = chat
    ? chat.participants.filter((participant) => {
        const unreadMessages = chat.unread_messages[participant.user_id];
        return unreadMessages !== undefined && unreadMessages <index;
      }).length
    : 0;

  return (

    <div
      className={`relative flex items-start ${
        isSender ? "justify-end" : "justify-start"
      } w-full space-x-4 py-2`}
    >
      {/* Sender's Avatar (Only for received messages) */}
      {!isSender && (
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={chat?.participants.find(
              (p) => p.user_id.toString() === message.sender_id.toString()
            )?.avatar}
            alt={`${
              chat?.participants.find(
                (p) => p.user_id.toString() === message.sender_id.toString()
              )?.username
            }'s avatar`}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`relative flex flex-col space-y-1 max-w-xs p-3 rounded-lg ${
          isSender ? "bg-green-100 text-black" : "bg-gray-200 text-black"
        }`}
      >
        {/* Dropdown for actions */}
        {isSender && (
          <div className="absolute top-0 right-0 -mt-2 -mr-2">
            <button
              onClick={toggleDropdown}
              className="text-sm text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              ⋮
            </button>
            {isDropdownVisible && (
              <div className="absolute right-0 mt-2 w-28 bg-white shadow-md border rounded-lg">
                <button
                  onClick={handleCopyMessage}
                  className="flex items-center justify-start w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                >
                  <FaClipboard className="mr-2" />
                  Copy
                </button>
                <button
                  onClick={handleDeleteMessage}
                  className="flex items-center justify-start w-full px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}

        {/* Sender Name (Only for received messages) */}
        {!isSender && (
          <div className="text-xs font-semibold text-gray-600">
            {chat?.participants.find(
              (p) => p.user_id.toString() === message.sender_id.toString()
            )?.username}
          </div>
        )}

        {/* Message Text */}
        <div className="text-sm">{message.content}</div>

        {/* Timestamp and Read Status */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {isSender && (
            <span className="flex items-center space-x-1">
              {unreadCount > 1 ? (
                <FaCheck className="text-green-500" title="Read" />
              ) : (
                <FaCheck className="text-gray-400" title="Delivered" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessageBlock;
