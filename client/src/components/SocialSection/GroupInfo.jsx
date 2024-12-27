import React, { useState, useRef } from "react";
import { X, UserPlus, LogOut, Edit } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteChat } from "../../Store/Chat";
import { setPresentChat } from "../../Store/Chat";
import { SocketAcceptFriendRequest, SocketRefreshGroupChatIcon, SocketRefreshGroupChatName } from "../../event/SocketEvent";
import server from "../../server.json";
import Chats from "../../scripts/API.Chats";
import {Camera} from "lucide-react";
const GroupInfo = ({ onClose, onAddParticipant, toast }) => {
  const present = useSelector((state) => state.chat.presentChat);
  const chat = useSelector((state) => state.chat.chats);
  const group = chat.find((chat) => chat.chat_id === present);
  const userId = useSelector((state) => state.user.userInfo._id);
  const API = new Chats();
  const dispatch = useDispatch();
  const isGroup = group.chat_type === "group";

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingIcon, setIsEditingIcon] = useState(false);
  const [newGroupName, setNewGroupName] = useState(group.chat_name);
  const [newGroupIcon, setNewGroupIcon] = useState({ image: "", file: null });
  const fileInputRef = useRef(null);

  const BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;

  // Handle group name update
  const updateGroupName = async () => {
    try {
      const response = await API.editGroupChatName(present, newGroupName);
      if (response.success) {
        SocketRefreshGroupChatName(present);
      }
      toast.success("Group name updated successfully.");
      setIsEditingName(false);
    } catch (error) {
      console.error("Failed to update group name:", error);
      toast.error("Failed to update group name.");
    }
  };

  // Handle group icon upload
  const uploadGroupIcon = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${BACKWEB}${server.Image.ImageUpload}`,
        formData
      );

      if (response.status === 200 && response.data.url) {
        return response.data.url;
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error("Failed to upload group icon.");
      return null;
    }
  };

  // Update group icon after successful upload
  const updateGroupIcon = async () => {
    if (!newGroupIcon.file) return;

    try {
      const imageUrl = await uploadGroupIcon(newGroupIcon.file);
      if (!imageUrl) return;  
      const response = await API.editGroupChatIcon(present, imageUrl);
      if (response.success) {
        SocketRefreshGroupChatIcon(present);
        toast.success("Group icon updated successfully.");
        setNewGroupIcon({ image: "", file: null });
        setIsEditingIcon(false);
      }
    } catch (error) {
      console.error("Failed to update group icon:", error);
      toast.error("Failed to update group icon.");
    }
  };

  // Handle image file selection
  const handleGroupIconChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!validImageTypes.includes(file.type)) {
      toast.error("Please upload a JPG or PNG image.");
      return;
    }

    const maxSizeInBytes = 1024 * 200;
    if (file.size > maxSizeInBytes) {
      toast.error("Image must be under 200KB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setNewGroupIcon({ file, image: reader.result });
    };
    reader.readAsDataURL(file);
  };
  // Handle leaving the group
  const onLeaveGroup = async () => {
    try {
      const response = await API.leaveGroupChat(present);
      if (response.success) {
        SocketAcceptFriendRequest(response.data);
        dispatch(setPresentChat({ chatId: null, userId: userId }));
        dispatch(deleteChat(present));
        toast.success("You left the group.");
      } else {
        toast.error("Failed to leave the group.");
      }
    } catch (error) {
      console.error("Error leaving the group:", error);
      toast.error("Failed to leave the group.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-lg rounded-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          {/* Group Image */}
          <div className="relative">
            <img
              src={newGroupIcon?.image || group.chat_avatar}
              alt={`${group.chat_name} Icon`}
              className="w-12 h-12 rounded-full object-cover cursor-pointer"
              onClick={() => setIsEditingIcon(isGroup)}
            />
            {isGroup && <Edit
              className="absolute bottom-0 right-0 w-4 h-4 bg-white rounded-full p-1 text-gray-500 cursor-pointer"
              onClick={() => setIsEditingIcon(isGroup)}
            />}
          </div>
          {/* Group Name */}
          {isGroup&&isEditingName ? (
            <input
              type="text"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              onBlur={updateGroupName}
              className="border-b-2 border-indigo-500 outline-none text-xl font-semibold"
            />
          ) : (
            <h2
              className="text-xl font-semibold cursor-pointer"
              onClick={() => setIsEditingName(true)}
            >
              {group.chat_name}
            </h2>
          )}
        </div>
        {/* Close Button */}
        <button onClick={onClose} className="text-gray-500 hover:text-red-500">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Group Info */}
      <div className="p-4 space-y-4">
        {isGroup && (
          <div>
            <h3 className="text-sm font-medium text-gray-600">Created By</h3>
            <p className="text-lg font-semibold text-gray-800">
              {group.participants.find(
                (member) => member.user_id === group.createdBy
              )?.username || "Unknown"}
            </p>
          </div>
        )}

        {/* Participants */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Participants
          </h3>
          <div className="space-y-3">
            {group.participants.map((participant) => (
              <div
                key={participant.user_id}
                className="flex items-center justify-between w-full p-2 bg-white border-b border-gray-200 rounded-lg space-x-4"
              >
                <img
                  src={participant.avatar || "https://via.placeholder.com/150"}
                  alt={participant.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col ml-3 space-y-1 w-full">
                  <div className="text-lg font-semibold">
                    {participant.username}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {participant.email}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      {isGroup && (
        <div className="p-4 flex flex-col">
          <button
            onClick={onAddParticipant}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-green-600 border-green-600 rounded-md font-medium hover:text-white hover:bg-green-600 transition duration-200"
          >
            <UserPlus className="w-5 h-5" />
            Add Participant
          </button>
          <button
            onClick={onLeaveGroup}
            className="flex items-center justify-center w-full gap-2 px-4 py-3 text-red-600 border-red-600 rounded-md font-medium hover:text-white hover:bg-red-600 transition duration-200"
          >
            <LogOut className="w-5 h-5" />
            Leave Group
          </button>
        </div>
      )}

      {/* Edit Icon Modal */}
      {isEditingIcon && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h2 className="text-lg font-semibold mb-4 text-center">Update Group Icon</h2>

      {/* Image Upload Section */}
      <div className="relative group mx-auto w-24 h-24">
        {/* Camera Icon or Preview */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-full overflow-hidden cursor-pointer">
          {newGroupIcon.image ? (
            <img
              src={newGroupIcon.image}
              alt="Group Icon Preview"
              className="object-cover w-full h-full"
            />
          ) : (
            <Camera className="text-gray-500 w-8 h-8" />
          )}
        </div>

        {/* Change Icon Overlay */}
        <label
          htmlFor="icon-upload"
          className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm font-medium rounded-full transition-opacity cursor-pointer"
        >
          Change Icon
        </label>
        <input
          id="icon-upload"
          type="file"
          accept="image/*"
          onChange={handleGroupIconChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      {/* Preview Text */}
      <p className="text-center text-gray-500 text-sm mt-2">
        {newGroupIcon.file ? newGroupIcon.file.name : "No file selected"}
      </p>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6 gap-2">
        <button
          onClick={() => setIsEditingIcon(false)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={updateGroupIcon}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}    </div>
  );
};

export default GroupInfo;
