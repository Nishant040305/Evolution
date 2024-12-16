import React, { useState, useEffect } from 'react';
import { FaEllipsisV, FaUserPlus } from 'react-icons/fa';
import ChatSearchBar from '../utility/ChatSearchBar';
import HoverInfoWrapper from '../utility/toolTip';
import { useSelector } from 'react-redux';
import ChatLeftBlockInfo from './ChatLeftBlockInfo';
import { useDispatch } from "react-redux";
import { logout } from "../../Store/userSlice";
import AuthService from "../../scripts/API.Login";
const ChatLeftBlockTop = ({ setChats ,newGroup}) => {
  const [showPopup, setShowPopup] = useState(false);
  const chats = useSelector((state) => state.chat.chats);
  const [selectedButton, setSelectedButton] = useState('All'); // Track selected button
  const [searchQuery, setSearchQuery] = useState('');
  const filterChats = chats;
  const user = useSelector((state) => state.user.userInfo._id);
  const dispatch = useDispatch();

  const togglePopup = () => setShowPopup(!showPopup);

  const handleButtonClick = (button) => {
    setSelectedButton(button); // Set selected button
  };

  // Apply filters and sorting whenever chats, selectedButton, or searchQuery changes
  useEffect(() => {
    const filterAndSortChats = () => {
      let filtered = [...chats];
  
      // Filter based on selected button
      if (selectedButton === 'Group') {
        filtered = filtered.filter(chat => chat.chat_type === 'group');
      } else if (selectedButton === 'Unread') {
        filtered = filtered.filter(chat => chat.unread_messages[user] > 0);
      }
  
      // Filter based on searchQuery
      if (searchQuery) {
        filtered = filtered.filter(chat =>
          chat.chat_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
  
      // Sort chats based on last_message_time (null values go to the end)
      filtered.sort((a, b) => {
        const timeA = a.last_message_time;
        const timeB = b.last_message_time;
  
        if (!timeA && !timeB) return 0; // Both are null, no change
        if (!timeA) return 1; // A is null, put it at the end
        if (!timeB) return -1; // B is null, put it at the end
  
        // Both have times, sort by them (latest first)
        return new Date(timeB) - new Date(timeA);
      });
      setChats(filtered); // Update filtered and sorted chats
    };
  
    filterAndSortChats(); // Run the filter and sort function
  }, [chats, selectedButton, searchQuery]);
  const Logout = async()=>{
    const APT = new AuthService();
    dispatch(logout());
    await APT.logout();
  }
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
            <button className=" text-gray-800 p-2 rounded-full" onClick={()=>newGroup()}>
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
          <button className="block w-full text-left text-sm p-2 hover:bg-gray-100" onClick={()=>newGroup()}>
            New Group
          </button>
          <button className="block w-full text-left text-sm p-2 hover:bg-gray-100" onClick={()=>Logout()}>
            Logout
          </button>
        </div>
      )}

      {/* Search Bar */}
      <ChatSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}></ChatSearchBar>

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
