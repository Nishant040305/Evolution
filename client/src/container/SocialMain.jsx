import React from 'react';
import LeftSocialSideBar from '../components/Navigation/leftSocialSideBar';
import "../style/socialMain.css"
import ChatLeftBar from '../components/SocialSection/ChatLeftBar';
import ChatRightMain from '../components/SocialSection/ChatRightMain';
const SocialMain = () => {
    const fakeChatData={
        chat_id: "chat_id_5",
        chat_name: "Individual Chat with Bob",
        chat_type: "individual", // Individual chat
        last_message: "Got the report, thanks!",
        avatar:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        last_message_time: "2024-12-13T10:30:00Z",
        unread_messages:5,
        participants: [
          {
            user_id: "user_id_1",
            username: "John",
            avatar: "path_to_avatar1.jpg"
          },
          {
            user_id: "user_id_4",
            username: "Bob",
            avatar: "path_to_avatar4.jpg"
          }
        ]
      }
  return (
    <div className="social-main flex flex-row">
        <LeftSocialSideBar></LeftSocialSideBar>
        <ChatLeftBar></ChatLeftBar>
        <ChatRightMain Chat={fakeChatData}></ChatRightMain>
    </div>
    );
}

export default SocialMain;