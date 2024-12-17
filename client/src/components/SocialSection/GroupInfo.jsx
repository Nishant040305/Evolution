import React from "react";
import { X, UserPlus, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteChat } from "../../Store/Chat";
import { SocketAcceptFriendRequest } from "../../event/SocketEvent";
import Chats from "../../scripts/API.Chats";
import {setPresentChat} from '../../Store/Chat';
const GroupInfo = ({
  onClose,
  onAddParticipant,
  toast
}) => {
    const present = useSelector((state) => state.chat.presentChat);
    const chat = useSelector((state) => state.chat.chats);
    const group = chat.find(chat => chat.chat_id===present);
    const userId = useSelector((state) => state.user.userInfo._id);
    const API = new Chats();
    const dispatch = useDispatch();
    const isGroup = group.chat_type==="group";
    const onLeaveGroup = async () => {
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
    <div className="w-full max-w-md bg-white shadow-lg rounded-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          {/* Group Image */}
          <img
            src={group.chat_avatar}
            alt={`${group.chat_name} Icon`}
            className="w-12 h-12 rounded-full object-cover"
          />
          {/* Group Name */}
          <h2 className="text-xl font-semibold">{group.chat_name}</h2>
        </div>
        {/* Close Button */}
        <button onClick={onClose} className="text-gray-500 hover:text-red-500">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Group Info */}
      <div className="p-4 space-y-4">
        {/* Created By */}
        {isGroup && <div>
          <h3 className="text-sm font-medium text-gray-600">Created By</h3>
          <p className="text-lg font-semibold text-gray-800">
            {group.participants.find((member) => member.user_id === group.createdBy)?.username || "Unknown"}
            </p>
        </div>}

        {/* Participants */}
        <div>
        <h3 className="text-sm font-medium text-gray-600 mb-2">Participants</h3>
        <div className="space-y-3">
            {group.participants.map((participant, index) => (
                  <div className="flex items-center justify-between w-full p-2 bg-white border-b border-gray-200 rounded-lg space-x-4">
                    {/* Chat Type Icon (Leftmost) */}
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
                          <img 
                          src={participant.avatar||"https://via.placeholder.com/150"} // Replace with your group chat image path
                          alt="Group"
                          className="w-8 h-8 rounded-full object-cover" // Adjust image size and roundness
                          />
                          
                      </div>
              
              
                    {/* Chat Info */}
                    <div className="flex flex-col ml-3 space-y-1 w-full">
                      {/* Chat Name */}
                      <div className="text-lg font-semibold">{participant.username}</div>
              
                      {/* Last Message (Trimmed) */}
                      <div className="text-gray-600 text-sm">{participant.email}</div>
              
                      
                    </div> 
                    
                  </div>
                
            ))}
        </div>
        </div>

      </div>

      {/* Actions */}
      {isGroup&&<div className="p-4  flex flex-col">
        {/* Add Participant Button */}
        <button
            onClick={onAddParticipant}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-green-600  border-green-600 rounded-md font-medium hover:text-white hover:bg-green-600 transition duration-200"
        >
            <UserPlus className="w-5 h-5" />
            Add Participant
        </button>

        {/* Leave Group Button */}
        <button
            onClick={onLeaveGroup}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-red-600  border-red-600 rounded-md font-medium hover:text-white hover:bg-red-600 transition duration-200"
        >
            <LogOut className="w-5 h-5" />
            Leave Group
        </button>
        </div>}

    </div>
  );
};

export default GroupInfo;
