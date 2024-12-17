import React, { useEffect, useState } from 'react';
import LeftSocialSideBar from '../components/Navigation/leftSocialSideBar';
import "../style/socialMain.css";
import ChatLeftBar from '../components/SocialSection/ChatLeftBar';
import FindUser from '../components/SocialSection/FindUser';
import ChatRightMain from '../components/SocialSection/ChatRightMain';
import User from '../scripts/API.User';
import { setChats} from '../Store/Chat';
import { useSelector,useDispatch } from 'react-redux';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationPage from '../components/Notification/Notification';
import CreateGroupChat from '../components/SocialSection/createGroupChat';
import AddParticipants from '../components/SocialSection/Addparticipants';
import { useNavigate } from 'react-router-dom';
const SocialMain = () => {
  const [state, setState] = useState("Messages");
  const [loading, setLoading] = useState(true); // To manage loading state
  const API = new User();
  const [addParticipantModal, setAddParticipantModal] = useState(false);
  const presentChat = useSelector((state) => state.chat.presentChat);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await API.getChatsData();
        if (response.success) {
          dispatch(setChats(response.data));
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
  useEffect(()=>{
    if(state==="Back")
    {
      navigate('/')
    }
  },[state])
  return (
    <div className="social-main flex flex-row">
    <ToastContainer />
      <LeftSocialSideBar setNav={setState} />
      {state === "Messages" ? (
        addParticipantModal ? (
          <AddParticipants onClose={() => setAddParticipantModal(false)} toast={toast} />
        ) : (
          <ChatLeftBar messageOpen={()=>setState('Messages')} newGroup={()=>setState('Groups')} />
        ) 
      ) :state==="Find Users"?  
      (<FindUser toast ={toast}/>):
      state==="Groups"?
      <CreateGroupChat toast={toast}/>
      :<ChatLeftBar messageOpen={()=>setState('Messages')} newGroup={()=>setState("Groups")}/>}
      
      
      {/* Display Chat Right Section */}
      {
      state === "Notifications" ? (
        <NotificationPage />
      ) : (
        state === "Messages" ? (
          presentChat ? (
            <ChatRightMain toast={toast} onAddParticipant={handleAddParticipant} />
          ) : loading ? (
            <div className="loading-state">Loading chats...</div> // Display loading state while chats are loading
          ) : (
            <></>
          )
        ) : (
          <ChatRightMain toast={toast} onAddParticipant={handleAddParticipant} />
        )
      )
    }
    </div>
  );
};

export default SocialMain;
