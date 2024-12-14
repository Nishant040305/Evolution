import React, { useState } from 'react';
import { FaEllipsisV, FaUserPlus } from 'react-icons/fa';
import ChatSearchBar from '../utility/ChatSearchBar';
import HoverInfoWrapper from '../utility/toolTip';

const ChatLeftBlockTop = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedButton, setSelectedButton] = useState('All'); // Track selected button

  const togglePopup = () => setShowPopup(!showPopup);

  const handleButtonClick = (button) => {
    setSelectedButton(button); // Set selected button
  };

  return (
    <div className="flex flex-col items-center justify-start w-full relative">
      {/* Top Title Section */}
      <div className="flex justify-between items-center w-full px-4 py-2">
        <div>
          <div className="text-xl font-bold">Chats</div>
        </div>

        {/* Create Group Icon and 3 dots */}
        <div className="flex items-center space-x-4">
            <HoverInfoWrapper info="new group" position="bottom">
                <button className=" text-gray-800 p-2 rounded-full">
                    <FaUserPlus size={20} />
                </button>
            </HoverInfoWrapper>
          <button onClick={togglePopup} className="p-2 rounded-full">
            <FaEllipsisV size={20} />
          </button>
        </div>
      </div>

      {/* Popup for New Group and Logout */}
      {showPopup && (
        <div className="absolute top-16 right-10 bg-white shadow-md rounded-md p-3 w-48 z-50">
          <button className="block w-full text-left text-sm p-2 hover:bg-gray-100">
            New Group
          </button>
          <button className="block w-full text-left text-sm p-2 hover:bg-gray-100">
            Logout
          </button>
        </div>
      )}

      {/* Search Bar */}
      <ChatSearchBar></ChatSearchBar>

      {/* Button Options (Unread, Group, All) */}
      <div className="w-full flex justify-around px-4 py-2">
      <button
          onClick={() => handleButtonClick('All')}
          className={`text-sm px-4 py-2 rounded-md ${selectedButton === 'All' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-slate-400 hover:text-indigo-50'}`}
        >
          All
        </button>
        <button
          onClick={() => handleButtonClick('Unread')}
          className={`text-sm px-4 py-2 rounded-md ${selectedButton === 'Unread' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-slate-400 hover:text-indigo-50'}`}
        >
          Unread
        </button>
        <button
          onClick={() => handleButtonClick('Group')}
          className={`text-sm px-4 py-2 rounded-md ${selectedButton === 'Group' ? 'bg-indigo-500 text-white' : 'text-gray-600 hover:bg-slate-400 hover:text-indigo-50'}`}
        >
          Group
        </button>
        
      </div>
    </div>
  );
};

export default ChatLeftBlockTop;
