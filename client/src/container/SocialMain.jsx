import React, { useEffect, useState } from 'react';
import LeftSocialSideBar from '../components/Navigation/leftSocialSideBar';
import "../style/socialMain.css";
import ChatLeftBar from '../components/SocialSection/ChatLeftBar';
import FindUser from '../components/SocialSection/FindUser';
import ChatRightMain from '../components/SocialSection/ChatRightMain';
import User from '../scripts/API.User';
const SocialMain = () => {
  const [state, setState] = useState("Messages");
  const [chats, setChats] = useState([]);
  const [presentChat, setPresentChat] = useState(null);
  const [loading, setLoading] = useState(true); // To manage loading state
  const API = new User();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await API.getChatsData();
        if (response.success) {
          setChats(response.data);
          console.log(response.data);
        } else {
          console.error("Error fetching chats:", response.error);
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoading(false); // Stop loading when the fetch completes
      }
    };

    fetchChats();
  }, []);

  const handleChatSelect = (chatId) => {
    // Set the selected chat
    const selectedChat = chats.find(chat => chat.chat_id === chatId);
    setPresentChat(selectedChat);
  };

  return (
    <div className="social-main flex flex-row">
      <LeftSocialSideBar setNav={setState} />
      {state === "Messages" ? (
        <ChatLeftBar chats={chats} setChats={setChats} handleChatSelect={handleChatSelect} />
      ) : (
        <FindUser />
      )}
      
      {/* Display Chat Right Section */}
      {presentChat ? (
        <ChatRightMain Chat={presentChat} />
      ) : (
        loading ? (
          <div className="loading-state">Loading chats...</div> // Display loading state while chats are loading
        ) : (
            <></>
        )
      )}
    </div>
  );
};

export default SocialMain;
