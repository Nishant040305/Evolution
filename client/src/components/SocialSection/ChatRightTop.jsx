import React, { useState } from 'react';
import { FaUsers, FaUser, FaSearch, FaEllipsisV } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setPresentChat ,deleteChat} from '../../Store/Chat';
import Chats from '../../scripts/API.Chats';
import { SocketAcceptFriendRequest } from '../../event/SocketEvent';
const ChatRightTop = ({setShowGroupInfo,toast}) => {
  const [showPopup, setShowPopup] = useState(false);
  const ChatId = useSelector((state) => state.chat.presentChat);
  const Chat = useSelector((state) => state.chat.chats.find(chat => chat.chat_id === ChatId));
  const togglePopup = () => setShowPopup(!showPopup);
  // Determine if it's a group chat
  const isGroupChat = Chat?.chat_type === 'group';
  const API = new Chats();
  const present = useSelector((state) => state.chat.presentChat);
  const userId = useSelector((state) => state.user.userInfo._id);
  // Trim participant names for display
  const participantNames = Chat?.participants.slice(0, 3).map(p => p.username).join(', ');
  const dispatch = useDispatch();
  const ExitGroup = async () => {
        try {
          const response = await API.leaveGroupChat(present);
          if (response.success) {
              SocketAcceptFriendRequest(response.data);
            dispatch(setPresentChat({chatId:null,userId:userId}));
            dispatch(deleteChat(present));
            toast.success("User Exit Group");
          } else {
            toast.error("Failed to remove user from group chat");
          }
        } catch (error) {
          console.error("Error removing user from group chat:", error);
          toast.error("Failed to remove user from group chat");
        }
      };
  return (
    <div className="flex justify-between items-center w-full p-4 bg-white shadow-md rounded-t-lg">
      {/* Left Section: Group/User Icon */}
      <div className="flex items-center space-x-2" onClick={()=>setShowGroupInfo(true)}>
        <div className="relative w-12 h-12 rounded-full bg-gray-200">
        {isGroupChat ? (
            <img 
            src={Chat?.chat_avatar} // Replace with your group chat image path
            alt="Group"
            className="w-10 h-10 rounded-full object-cover" // Adjust image size and roundness
            />
        ) : (
            <img 
            src={Chat?.chat_avatar} // Replace with your individual user image path
            alt="User"
            className="w-10 h-10 rounded-full object-cover" // Adjust image size and roundness
            />
        )}
        </div>

        {/* Group/User Name and Participant Names */}
        
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{Chat?.chat_name}</div>
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
        <div className="absolute top-16 right-10 bg-white shadow-md rounded-md p-4 w-48 z-50">
          {isGroupChat ? (
            <>
              <button className="w-full text-left p-2 text-sm hover:bg-gray-100" onClick={()=>{
                setShowGroupInfo(true);
                setShowPopup(false);
              }
                }>Group Info</button>
              <button className="w-full text-left p-2 text-sm hover:bg-gray-100" onClick={()=>ExitGroup()}>Exit Group</button>
            </>
          ) : (
            <>
              <button className="w-full text-left p-2 text-sm hover:bg-gray-100" onClick={()=>{
                                setShowGroupInfo(true);
                                setShowPopup(false);
                
              }}>Contact Details</button>
              {/* <button className="w-full text-left p-2 text-sm hover:bg-gray-100">Block</button> */}
            </>
          )}
          <button className="w-full text-left p-2 text-sm hover:bg-gray-100" onClick={()=>dispatch(setPresentChat({chatId: null, userId: null}))}>Close Chat</button>
        </div>
      )}
    </div>
  );
};

export default ChatRightTop;
