import React, { useState } from 'react';
import ChatRightTop from './ChatRightTop';
import ChatMessageList from './ChatMessageList';
import GroupInfo from './GroupInfo';
const ChatRightMain = ({onAddParticipant,onLeaveGroup}) => {
    const [showGroupInfo, setShowGroupInfo] = useState(false);
    return (
        <>
        <div className="flex flex-col w-full">
            <div className='relative'>
            <ChatRightTop setShowGroupInfo={setShowGroupInfo}></ChatRightTop>
            </div>
            <ChatMessageList ></ChatMessageList>
        </div>
        {showGroupInfo && <GroupInfo onClose={() => setShowGroupInfo(false)} onAddParticipant={onAddParticipant} onLeaveGroup={onLeaveGroup}></GroupInfo>}
        </>
    )
}

export default ChatRightMain;