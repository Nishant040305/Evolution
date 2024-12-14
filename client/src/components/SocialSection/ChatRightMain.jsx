import React, { useState } from 'react';
import ChatRightTop from './ChatRightTop';
import ChatMessageList from './ChatMessageList';
const ChatRightMain = () => {
    return (
        <div className="flex flex-col w-full">
            <ChatRightTop ></ChatRightTop>
            <ChatMessageList ></ChatMessageList>
        </div>
    )
}

export default ChatRightMain;