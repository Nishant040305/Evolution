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
const SocialMain = () => {
  const [state, setState] = useState("Messages");
  const chats = useSelector((state) => state.chat.chats);
  const [loading, setLoading] = useState(true); // To manage loading state
  const API = new User();
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

  return (
    <div className="social-main flex flex-row">
    <ToastContainer />
      <LeftSocialSideBar setNav={setState} />
      {state === "Messages" ? (
        <ChatLeftBar/>
      ) :
      (<FindUser toast ={toast}/>)
      }
      
      {/* Display Chat Right Section */}
      {state==="Notifications"?
      <NotificationPage/>
      :
      presentChat ? (
        <ChatRightMain />
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
