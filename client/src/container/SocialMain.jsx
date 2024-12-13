import React from 'react';
import LeftSocialSideBar from '../components/Navigation/leftSocialSideBar';
import "../style/socialMain.css"
import ChatLeftBlockTop from '../components/SocialSection/ChatLeftBlockTop';
const SocialMain = () => {
  return (
    <div className="social-main flex flex-row">
        <LeftSocialSideBar></LeftSocialSideBar>
    </div>
    );
}

export default SocialMain;