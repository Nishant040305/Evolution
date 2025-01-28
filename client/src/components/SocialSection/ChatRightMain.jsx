import React, { useState } from 'react';
import ChatRightTop from './ChatRightTop';
import ChatMessageList from './ChatMessageList';
import GroupInfo from './GroupInfo';
const ChatRightMain = ({ onAddParticipant, toast, mode }) => {
  const [showGroupInfo, setShowGroupInfo] = useState(false);
  return (
    <>
    {mode!=="disable"?<>
      <div className="flex flex-col w-full">
        <div className="relative">
          <ChatRightTop
            mode={mode}
            setShowGroupInfo={setShowGroupInfo}
            toast={toast}
          ></ChatRightTop>
        </div>
        <ChatMessageList></ChatMessageList>
      </div>
      {showGroupInfo && (
        <GroupInfo
          toast={toast}
          onClose={() => setShowGroupInfo(false)}
          onAddParticipant={onAddParticipant}
        ></GroupInfo>
      )}
      </>:<ChatMessageList mode={mode}></ChatMessageList>}
    </>
  );
};

export default ChatRightMain;
