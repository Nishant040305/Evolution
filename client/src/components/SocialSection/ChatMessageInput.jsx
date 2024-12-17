import React, { useState } from 'react';
import { FaPaperPlane, FaSmile, FaPaperclip } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react'; // Install using `npm install emoji-picker-react`
import { useSelector } from 'react-redux';
import { socket } from '../../scripts/socket'; // Assume you have a socket instance imported
import { connectRooms } from '../../event/connectRooms';
import { useSocketRecieveMessage } from '../../event/recieveMessage';
import { SocketSendMessage } from '../../event/SocketEvent';
// import { useSocketConnect } from '../../hooks/SocketConnect'; // Use the custom hook for socket connection
const ChatMessageInput = () => {
  const Chat = useSelector((state) => state.chat.presentChat);
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const senderId = useSelector((state) => state.user.userInfo._id);

  const handleSendMessage = () => {
    if (!message.trim() ) return; // Don't send if message is empty or not connected to socket
    const newMessage = {
      chatId: Chat,
      senderId: senderId,
      content: message,
      type: 'text',
    };

    // Emit the message using socket
    SocketSendMessage(Chat,senderId,message,'text');

    // Clear the input field
    setMessage('');
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newMessage = {
        chatId: Chat.chat_id,
        senderId: senderId,
        content: file.name, // Or send the actual file if API supports it
        type: 'file',
      };

      // Emit the file message using socket
      SocketSendMessage(Chat.chat_id,senderId,file.name,'file');
     
    }
  };
  connectRooms();
  useSocketRecieveMessage();
  return (
    <div className="flex items-center w-full p-4 bg-gray-100 rounded-lg">
      {/* Emoji Picker Toggle */}
      <button
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        className="p-2 text-gray-500 hover:text-gray-700"
      >
        <FaSmile size={24} />
      </button>

      {showEmojiPicker && (
        <div className="absolute bottom-16 left-4 z-10">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      {/* File Upload */}
      <label className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer">
        <FaPaperclip size={24} />
        <input
          type="file"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>

      {/* Input Field */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            handleSendMessage();
          }
        }}
        placeholder="Type a message..."
        className="flex-grow p-2 mx-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Send Button */}
      <button
        onClick={handleSendMessage}
        className="p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
      >
        <FaPaperPlane size={20} />
      </button>
    </div>
  );
};

export default ChatMessageInput;
