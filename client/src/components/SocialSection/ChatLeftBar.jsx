import React from 'react';
import ChatLeftBlockTop from './ChatLeftBlockTop';
import ChatLeftBlockInfo from './ChatLeftBlockInfo';

const ChatLeftBar = ({ chats, handleChatSelect }) => {
    console.log(chats);
  return (
    <div className="flex flex-col items-center justify-start ChatLeftBar">
      {/* Left Block Top: This section could be for the header or chat list title */}
      <ChatLeftBlockTop />
      
      {/* Left Block Info: This section lists all chats */}
      <div className="flex flex-col items-center justify-start w-full bg-white shadow-md rounded-lg space-y-4 overflow-y-scroll leftSideChatBar">
        {/* Render chats dynamically */}
        {chats.length > 0 ? (
          chats.map((chat) => (
            <ChatLeftBlockInfo 
              key={chat.chat_id} 
              Chat={chat} 
              handleChatSelect={handleChatSelect} // Pass the select handler for when a chat is clicked
            />
          ))
        ) : (
          <div className="text-gray-500 text-center p-4">No Chats Available</div>
        )}
      </div>
    </div>
  );
};

export default ChatLeftBar;
