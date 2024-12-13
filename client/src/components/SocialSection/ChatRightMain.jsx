import React, { useState } from 'react';
import ChatRightTop from './ChatRightTop';
import ChatMessageList from './ChatMessageList';
const ChatRightMain = ({ Chat }) => {

    return (
        <div className="flex flex-col w-full">
            <ChatRightTop Chat={Chat}></ChatRightTop>
            <ChatMessageList chatId={Chat.chat_id} senderId={Chat.sender_id}></ChatMessageList>
        </div>
    )
}

export default ChatRightMain;