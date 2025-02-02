import React, { useEffect, useState, useCallback } from 'react';
import LeftSocialSideBar from '../components/Navigation/leftSocialSideBar';
import '../style/socialMain.css';
import ChatLeftBar from '../components/SocialSection/ChatLeftBar';
import FindUser from '../components/SocialSection/FindUser';
import ChatRightMain from '../components/SocialSection/ChatRightMain';
import User from '../scripts/API.User';
import { setChats } from '../Store/Chat';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationPage from '../components/Notification/Notification';
import CreateGroupChat from '../components/SocialSection/createGroupChat';
import AddParticipants from '../components/SocialSection/Addparticipants';
import { useNavigate } from 'react-router-dom';
import ProfilePage from '../pages/Profile_Page';
const SocialMain = () => {
  const [state, setState] = useState(() => {
    return sessionStorage.getItem('state') || 'Profile';
  });

  useEffect(() => {
    sessionStorage.setItem('state', state);
  }, [state]);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [addParticipantModal, setAddParticipantModal] = useState(false);
  const presentChat = useSelector((state) => state.chat.presentChat);
  const navigate = useNavigate();
  const handleAddParticipant = () => {
    setAddParticipantModal(true);
  };
  useEffect(() => {
    if (state === 'Back') {
      navigate('/');
    }
  }, [state]);
  const user = useSelector((state) => state.user.userInfo);
  const messageOpenHandler = useCallback(() => setState('Messages'), []);
  return (
    <div className="social-main flex flex-row">
      <ToastContainer />
      <LeftSocialSideBar setNav={setState} />
      {state === 'Messages' ? (
        addParticipantModal ? (
          <AddParticipants
            onClose={() => setAddParticipantModal(false)}
            toast={toast}
          />
        ) : (
          <ChatLeftBar
            messageOpen={messageOpenHandler}
            newGroup={() => setState('Groups')}
          />
        )
      ) : state === 'Find Users' ? (
        <FindUser toast={toast} />
      ) : state === 'Groups' ? (
        <CreateGroupChat toast={toast} />
      ) : state === 'Profile' ? (
        <ProfilePage profile={user} status={true} />
      ) : (
        <ChatLeftBar
          messageOpen={messageOpenHandler}
          newGroup={() => setState('Groups')}
        ></ChatLeftBar>
      )}

      {/* Display Chat Right Section */}
      {state === 'Notifications' ? (
        <NotificationPage />
      ) : state === 'Messages' ? (
        presentChat ? (
          <ChatRightMain
            toast={toast}
            onAddParticipant={handleAddParticipant}
          />
        ) : (
          <></>
        )
      ) : state === 'Profile' ? (
        <></>
      ) : presentChat ? (
        <ChatRightMain toast={toast} onAddParticipant={handleAddParticipant} />
      ) : (
        <NotificationPage />
      )}
    </div>
  );
};

export default SocialMain;
