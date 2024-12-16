import React, { useState } from 'react';
import ChatRightTop from './ChatRightTop';
import ChatMessageList from './ChatMessageList';
import GroupInfo from './GroupInfo';
const ChatRightMain = ({onAddParticipant,toast}) => {
    const [showGroupInfo, setShowGroupInfo] = useState(false);
    return (
        <>
        <div className="flex flex-col w-full">
            <div className='relative'>
            <ChatRightTop setShowGroupInfo={setShowGroupInfo} toast={toast}></ChatRightTop>
            </div>
            <ChatMessageList ></ChatMessageList>
        </div>
        {showGroupInfo && <GroupInfo toast={toast} onClose={() => setShowGroupInfo(false)} onAddParticipant={onAddParticipant}></GroupInfo>}
        </>
    )
}

export default ChatRightMain;