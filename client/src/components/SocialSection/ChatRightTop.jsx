import React, { useState } from 'react';
import { FaUsers, FaUser, FaSearch, FaEllipsisV } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const ChatRightTop = () => {
  const [showPopup, setShowPopup] = useState(false);
  const ChatId = useSelector((state) => state.chat.presentChat);
  const Chat = useSelector((state) => state.chat.chats.find(chat => chat.chat_id === ChatId));
  const togglePopup = () => setShowPopup(!showPopup);
  // Determine if it's a group chat
  const isGroupChat = Chat.chat_type === 'group';

  // Trim participant names for display
  const participantNames = Chat.participants.slice(0, 3).map(p => p.username).join(', ');

  return (
    <div className="flex justify-between items-center w-full p-4 bg-white shadow-md rounded-t-lg">
      {/* Left Section: Group/User Icon */}
      <div className="flex items-center space-x-2">
        <div className="relative w-12 h-12 rounded-full bg-gray-200">
        {isGroupChat ? (
            <img 
            src={Chat.chat_avatar} // Replace with your group chat image path
            alt="Group"
            className="w-10 h-10 rounded-full object-cover" // Adjust image size and roundness
            />
        ) : (
            <img 
            src={Chat.chat_avatar} // Replace with your individual user image path
            alt="User"
            className="w-10 h-10 rounded-full object-cover" // Adjust image size and roundness
            />
        )}
        </div>

        {/* Group/User Name and Participant Names */}
        
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{Chat.chat_name}</div>
          {isGroupChat && (
            <div className="text-sm text-gray-600">{participantNames}</div>
          )}
        </div>
      </div>

      {/* Right Section: Search and Menu */}
      <div className="flex items-center space-x-4">
        {/* Search Icon */}
        <button className="p-2 rounded-full text-gray-500">
          <FaSearch size={20} />
        </button>

        {/* 3 Vertical Dots for Popup */}
        <button onClick={togglePopup} className="p-2 rounded-full text-gray-500">
          <FaEllipsisV size={20} />
        </button>
      </div>

      {/* Popup Menu */}
      {showPopup && (
        <div className="absolute top-16 right-10 bg-white shadow-md rounded-md p-4 w-48">
          {isGroupChat ? (
            <>
              <button className="w-full text-left p-2 text-sm hover:bg-gray-100">Group Info</button>
              <button className="w-full text-left p-2 text-sm hover:bg-gray-100">Exit Group</button>
            </>
          ) : (
            <>
              <button className="w-full text-left p-2 text-sm hover:bg-gray-100">Contact Details</button>
              <button className="w-full text-left p-2 text-sm hover:bg-gray-100">Block</button>
            </>
          )}
          <button className="w-full text-left p-2 text-sm hover:bg-gray-100">Delete Chats</button>
          <button className="w-full text-left p-2 text-sm hover:bg-gray-100">Close Chat</button>
        </div>
      )}
    </div>
  );
};

export default ChatRightTop;
