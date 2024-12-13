import React, { useState } from 'react';
import { FaPaperPlane, FaSmile, FaPaperclip } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react'; // Install using `npm install emoji-picker-react`

const API = {
  sendMessage: (message) => {
    console.log("Message sent:", message);
  },
};

const ChatMessageInput = ({ Chat, senderId }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Construct the message object
    const newMessage = {
      chat_id: Chat.chat_id,
      sender_id: senderId,
      content: message,
      type: 'text',
      timestamp: new Date(),
      readBy: [],
    };

    // Call the dummy API to send the message
    API.sendMessage(newMessage);

    // Clear the input field
    setMessage('');
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (event, emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a message for the uploaded file
      const newMessage = {
        chat_id: Chat.chat_id,
        sender_id: senderId,
        content: file.name, // Could also send the file directly if the API supports it
        type: 'file',
        timestamp: new Date(),
        readBy: [],
      };

      // Call the dummy API to send the message
      API.sendMessage(newMessage);
    }
  };

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
