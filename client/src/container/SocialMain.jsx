import React from 'react';
import LeftSocialSideBar from '../components/Navigation/leftSocialSideBar';
import "../style/socialMain.css"
import ChatLeftBar from '../components/SocialSection/ChatLeftBar';
const SocialMain = () => {
  return (
    <div className="social-main flex flex-row">
        <LeftSocialSideBar></LeftSocialSideBar>
        <ChatLeftBar></ChatLeftBar>
    </div>
    );
}

export default SocialMain;