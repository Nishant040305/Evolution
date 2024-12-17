import React, { useEffect, useState } from "react";
import GroupInfo from "./CreateGroupChatTop";
import UserInfo from "./SelectUserForGroupChat";
import { useSelector } from "react-redux";
import axios from "axios";
import server from "../../server.json";
import Chats from "../../scripts/API.Chats";
import { SocketAcceptFriendRequest } from "../../event/SocketEvent";
const CreateGroupChat = ({toast}) => {
  const [groupName, setGroupName] = useState("");
  const [groupIcon, setGroupIcon] = useState({image:"",file:""});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupImage,setGroupImage] = useState(null);
  // Redux states
  const chats = useSelector((state) => state.chat.chats);
  const API = new Chats();
  const userId = useSelector((state) => state.user.userInfo._id);
  // Toggle user selection
  const toggleSelect = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  // Create group logic
  const createGroup = async() => {
    if (!groupName || selectedUsers.length === 0) {
      toast.error("Please provide a group name and select at least one member.");
      return;
    }
    if (!groupIcon.file) {
        const response = await API.createGroupChat(groupName,selectedUsers);
        if(response.data){
            SocketAcceptFriendRequest(response.data);
            toast.success("Group chat created successfully");
            setGroupName("");   
            setSelectedUsers([]);
        }
        return;
    }
    let image = null;
    const BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
    try {
      const formData = new FormData();
      formData.append("file", groupIcon.file);

      const response = await axios.post(
        `${BACKWEB}${server.Image.ImageUpload}`, // Adjust endpoint
        formData,
        
      );

      if (response.status === 200 && response.data.url) {
        image = response.data.url;
        setGroupIcon({ image: "", file: "" });
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload group icon.");
      return;
    }
  

    // TODO: Call your API or Redux action here
    const chat = await API.createGroupChat(groupName,selectedUsers,image);
    if(chat.data){
        SocketAcceptFriendRequest(chat.data);
        toast.success("Group chat created successfully");
        setGroupName("");
        setSelectedUsers([]);
    }
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Extract individual users from chats
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

    setUsers(Object.values(uniqueUsers));
  }, [chats, userId]);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
      {/* Group Info Component */}
      <GroupInfo
        groupName={groupName}
        setGroupName={setGroupName}
        imageToUpload={groupIcon}
        setImageToUpload={setGroupIcon}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        createGroup={createGroup}
        toast = {toast}
      />

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

export default CreateGroupChat;
