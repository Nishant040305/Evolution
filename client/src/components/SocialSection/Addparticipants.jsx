import React, { useEffect, useState } from "react";
import ChatSearchBar from "../utility/ChatSearchBar";
import UserInfo from "./SelectUserForGroupChat";
import { useSelector } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5"; // Close Icon
import Chats from "../../scripts/API.Chats";
import { SocketAcceptFriendRequest } from "../../event/SocketEvent";

const AddParticipants = ({ toast, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const chats = useSelector((state) => state.chat.chats);
  const presentChatId = useSelector((state) => state.chat.presentChat);
  const userId = useSelector((state) => state.user.userInfo._id);
  const API = new Chats();

  // Find the current group
  const group = chats.find((chat) => chat.chat_id === presentChatId);

  // Toggle user selection
  const toggleSelect = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  // Filter out users already in the group
  useEffect(() => {
    if (!chats || chats.length === 0) return;

    const uniqueUsers = {};
    chats.forEach((chat) => {
      if (chat.chat_type === "personal" && chat.participants.length === 2) {
        const otherUserId =
          chat.participants[0].user_id === userId
            ? chat.participants[1].user_id
            : chat.participants[0].user_id;

        // Avoid adding duplicate users
        if (!uniqueUsers[otherUserId]) {
          uniqueUsers[otherUserId] = {
            id: otherUserId,
            name: chat.chat_name || "Unknown",
            avatar: chat.chat_avatar || "/default-avatar.png",
          };
        }
      }
    });

    // Exclude users already in the group
    const groupParticipants = new Set(
      group?.participants?.map((participant) => participant.user_id) || []
    );

    setUsers(
      Object.values(uniqueUsers).filter(
        (user) => !groupParticipants.has(user.id)
      )
    );
  }, [chats, group, userId]);

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addParticipants = async () => {
    if (selectedUsers.length === 0) {
      toast.error("Please select at least one user to add.");
      return;
    }

    try {
      const response = await API.addUserToGroupChat(group.chat_id, selectedUsers);
      if (response.success) {
        SocketAcceptFriendRequest(response.data);
        toast.success("Participants added successfully!");
        setSelectedUsers([]);
        onClose();
      } else {
        toast.error("Failed to add participants.");
      }
    } catch (error) {
      console.error("Error adding participants:", error);
      toast.error("An error occurred while adding participants.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full p-4 border-b">
        <h2 className="text-lg font-semibold">Add Participants</h2>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close"
        >
          <IoClose size={24} />
        </button>
      </div>

      {/* Group Info */}
      <div className="flex items-center space-x-4 p-4">
        <img
          src={group?.chat_avatar || "/default-group-avatar.png"}
          alt="Group Icon"
          className="w-12 h-12 rounded-full"
        />
        <div className="text-lg font-semibold">{group?.chat_name}</div>
      </div>

      {/* Search Bar */}
      <ChatSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Add Participants Button */}
      <button
        onClick={addParticipants}
        className="flex items-center mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
      >
        <FaUserPlus className="mr-2" />
        Add Participants
      </button>

      {/* User List */}
      <div className="max-h-64 overflow-y-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserInfo
              key={user.id}
              user={user}
              isSelected={selectedUsers.includes(user.id)}
              toggleSelect={toggleSelect}
            />
          ))
        ) : (
          <div className="text-gray-500 text-center p-4">
            No users found or available.
          </div>
        )}
      </div>
    </div>
  );
};

export default AddParticipants;
