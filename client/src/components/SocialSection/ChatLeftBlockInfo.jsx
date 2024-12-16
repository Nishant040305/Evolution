import React from 'react';
import { FaUsers, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {setPresentChat} from '../../Store/Chat';
const ChatLeftBlockInfo = ({ Chat,messageOpen }) => {
  const isGroupChat = Chat.chat_type === 'group'; // Check if it's a group chat
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo._id);
  // Trim last message if it's too long
  const trimmedMessage = Chat.last_message.length > 50 
    ? `${Chat.last_message.substring(0, 50)}...` 
    : Chat.last_message;

  // Get unread messages count (display "99+" if greater than 99)
  const unreadCount = Chat.unread_messages[user] > 99 ? "99+" : Chat.unread_messages[user];

  return (
    <div className="flex items-center justify-between w-full p-2 bg-white border-b border-gray-200 rounded-lg space-x-4"
      onClick={() => {
        messageOpen();
        dispatch(setPresentChat({chatId: Chat.chat_id, userId: user}))
      }}
    >
      {/* Chat Type Icon (Leftmost) */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
        {isGroupChat ? (
            <img 
            src={Chat.chat_avatar} // Replace with your group chat image path
            alt="Group"
            className="w-8 h-8 rounded-full object-cover" // Adjust image size and roundness
            />
        ) : (
            <img 
            src={Chat.chat_avatar} // Replace with your individual user image path
            alt="User"
            className="w-8 h-8 rounded-full object-cover" // Adjust image size and roundness
            />
        )}
        </div>


      {/* Chat Info */}
      <div className="flex flex-col ml-3 space-y-1 w-full">
        {/* Chat Name */}
        <div className="text-lg font-semibold">{Chat.chat_name}</div>

        {/* Last Message (Trimmed) */}
        <div className="text-gray-600 text-sm">{trimmedMessage}</div>

        {/* Last Message Time */}
        <div className="text-gray-400 text-xs">
          {new Date(Chat.last_message_time).toLocaleString()}
        </div>
      </div> 
      {/* Unread Messages Count */}
      {unreadCount > 0 && <div className="relative flex items-center justify-center w-8 h-7 rounded-full bg-red-500">
        <div className="flex items-center justify-center w-full h-full text-white text-xs font-semibold" style={{ fontSize: "10px" }}>
            {unreadCount}
        </div>
    </div>}
    </div>
  );
};

export default ChatLeftBlockInfo;
