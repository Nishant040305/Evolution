import React, { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../scripts/socket";
import { useSelector } from "react-redux";
const ChatTest = () => {
  const [username, setUsername] = useState("");
  const u = useSelector((state) => state.user.userInfo._id);
  const [userId, setUserId] = useState(u); // Mock user ID
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Join user to their chat rooms on mount
  useEffect(() => {
    if (userId) {
      socket.emit("joinChat", userId);
      console.log(`User ${userId} joined chats`);
    }
  }, [userId]);

  // Handle receiving new messages
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("New message received:", data.message);
      if (data.message.chat_id === selectedChat) {
        setMessages((prev) => [...prev, data.message]);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedChat]);

  // Fetch user chats
  const fetchChats = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/chat/chats");
      console.log("Fetched Chats:", response.data);
      setChats(response.data.data || []);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  // Fetch messages for a chat
  const fetchMessages = async (chatId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/message/messages`, {
        params: { chatId, limit: 20 },
      });
      console.log("Fetched Messages:", response.data);
      setMessages(response.data.data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Handle sending messages
  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return;

    const data = {
      chatId: selectedChat,
      senderId: userId,
      content: message,
      type: "text",
    };

    socket.emit("sendMessage", data);
    setMessage("");
  };

  // Handle chat selection
  const selectChat = (chatId) => {
    setSelectedChat(chatId);
    fetchMessages(chatId);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      <h1>Chat Test</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <button
        onClick={() => {
          setUserId("mock-user-id"); // Replace with actual user ID fetching logic
          fetchChats();
        }}
      >
        Login
      </button>

      <div style={{ marginTop: "20px" }}>
        <h2>Chats</h2>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.chat_id}
              onClick={() => selectChat(chat.chat_id)}
              style={{
                cursor: "pointer",
                fontWeight: chat.chat_id === selectedChat ? "bold" : "normal",
              }}
            >
              {chat.chat_name || "Unnamed Chat"}
            </li>
          ))}
        </ul>
      </div>

      {selectedChat && (
        <div style={{ marginTop: "20px" }}>
          <h2>Messages</h2>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              height: "200px",
              overflowY: "scroll",
            }}
          >
            {messages.map((msg) => (
              <p key={msg._id}>
                <strong>{msg.sender_name || "Unknown"}:</strong> {msg.content}
              </p>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default ChatTest;
