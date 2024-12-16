import React, { useEffect, useState } from 'react';
import LeftSocialSideBar from '../components/Navigation/leftSocialSideBar';
import "../style/socialMain.css";
import ChatLeftBar from '../components/SocialSection/ChatLeftBar';
import FindUser from '../components/SocialSection/FindUser';
import ChatRightMain from '../components/SocialSection/ChatRightMain';
import User from '../scripts/API.User';
import { setChats,setPresentChat } from '../Store/Chat';
import { useSelector,useDispatch } from 'react-redux';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationPage from '../components/Notification/Notification';
import CreateGroupChat from '../components/SocialSection/createGroupChat';
import AddParticipants from '../components/SocialSection/Addparticipants';
const SocialMain = () => {
  const [state, setState] = useState("Messages");
  const chats = useSelector((state) => state.chat.chats);
  const [loading, setLoading] = useState(true); // To manage loading state
  const API = new User();
  const [addParticipantModal, setAddParticipantModal] = useState(false);
  const presentChat = useSelector((state) => state.chat.presentChat);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await API.getChatsData();
        if (response.success) {
          dispatch(setChats(response.data));
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
  const handleAddParticipant = () => {
    setAddParticipantModal(true);
  }
  const handleLeaveGroup = async (chatId) => {
    try {
      const response = await API.deleteUserFromGroupChat(chatId, [user._id]);
      if (response.success) {
        dispatch(setPresentChat({ chatId, userId: user._id }));
        toast.success("User removed successfully");
      } else {
        toast.error("Failed to remove user from group chat");
      }
    } catch (error) {
      console.error("Error removing user from group chat:", error);
      toast.error("Failed to remove user from group chat");
    }
  };
  return (
    <div className="social-main flex flex-row">
    <ToastContainer />
      <LeftSocialSideBar setNav={setState} />
      {state === "Messages" ? (
        addParticipantModal ? (
          <AddParticipants onClose={() => setAddParticipantModal(false)} toast={toast} />
        ) : (
          <ChatLeftBar />
        ) 
      ) :state==="Find Users"?  
      (<FindUser toast ={toast}/>):
      state==="Groups"?
      <CreateGroupChat toast={toast}/>
      :<ChatLeftBar/>}
      
      
      {/* Display Chat Right Section */}
      {state==="Notifications"?
      <NotificationPage/>
      :
      state==="Messages"?presentChat ? (
      <ChatRightMain onAddParticipant={handleAddParticipant} onLeaveGroup={handleLeaveGroup}/>
    ) : (loading ? (<div className="loading-state">Loading chats...</div> // Display loading state while chats are loadin
      ) : (
            <></> 
        )):
      <NotificationPage/>}
    </div>
  );
};

export default SocialMain;
