import { createSlice } from "@reduxjs/toolkit";
import { SocketMarkAsRead } from "../event/SocketEvent";
const ChatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [], // List of chats
    messages: {}, // Object where keys are chat IDs and values are message arrays
    presentChat:null,

  },
  reducers: {
    // Set the list of chats
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    // Set the present chat
    setPresentChat: (state, action) => {
      const { chatId, userId } = action.payload;
      state.presentChat = chatId;
      if(chatId){
        SocketMarkAsRead(chatId,userId);
        state.chats.find(chat => chat.chat_id === chatId).unread_messages[userId] = 0;
      }
    },

    // Set the messages for a specific chat
    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.messages[chatId] = messages;
    
    },

    // Add a message to a specific chat
    addMessage: (state, action) => {
      const { chatId, messages ,userId} = action.payload;
    
      // Ensure the chatId exists in the state.messages object
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      // Update unread messages for all users in the chat
      const chat = state.chats.find(chat => chat.chat_id === chatId);
      chat.last_message = messages.content;
      chat.last_message_time = messages.timestamp;
      if (chat) {
        for (const userId in chat.unread_messages) {
          if (userId === messages.sender_id) {
                  // Set the sender's unread count to 0
              chat.unread_messages[userId] = 0;
            } else {
                  // Increment unread count for all other users
                  chat.unread_messages[userId] += 1;
                }
              }
            }
            if(messages.chat_id === state.presentChat){
              SocketMarkAsRead(messages.chat_id,userId);
              chat.unread_messages[userId] = 0;
            }
      const existingMessage = state.messages[chatId].find((m) => m._id === messages._id);
      if (!existingMessage) {
        state.messages[chatId].push({
          chat_id: chatId,
          sender_id: messages.sender_id,
          content: messages.content,
          type: messages.type,
          timestamp: messages.timestamp,
          _id: messages._id,
        });
      }
    },    
    addMessageToChat: (state, action) => {
      const { chatId, messages } = action.payload;
      // Ensure the chatId exists in the state.messages object
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      const reversedMessages = messages.reverse();
      state.messages[chatId] = {...state.messages[chatId],...reversedMessages};
    
    },
      
    // set the meta data
    setMeta: (state, action) => {
        const { chatId, meta } = action.payload;
        // Find the index of the chat with the given chatId
        const chatIndex = state.chats.findIndex((chat) => chat.chat_id === chatId);
      
        if (chatIndex !== -1) {
          // Chat exists; update its meta property
          state.chats[chatIndex] = {
            ...state.chats[chatIndex],
            meta, // Add or update the meta property
          };
        } else {
          console.error(`Chat with ID ${chatId} not found`);
        }
      },      
    // Delete a chat by its ID
    deleteChat: (state, action) => {
      const chatId = action.payload;
      state.chats = state.chats.filter((chat) => chat.chat_id !== chatId);
      delete state.messages[chatId]; // Remove messages for the deleted chat
    },

    // Mark all messages in a chat as read
    markChatAsRead: (state, action) => {
      const { chatId, userId } = action.payload;
      if (state.chats.find((chat) => chat.chat_id === chatId)) {
        // Find the index of the chat with the given chatId
        const chatIndex = state.chats.findIndex((chat) => chat.chat_id === chatId);
        state.chats[chatIndex] = {
          ...state.chats[chatIndex],
          unread_messages: { ...state.chats[chatIndex].unread_messages, [userId]: 0 },
        };
      }
    },
    // Update user who read the message
    updateReadUser: (state, action) => {
      const { chatId, userId } = action.payload;
      if (state.chats.find((chat) => chat.chat_id === chatId)) {
        // Find the index of the chat with the given chatId
        const chatIndex = state.chats.findIndex((chat) => chat.chat_id === chatId);
        state.chats[chatIndex] = {
          ...state.chats[chatIndex],
          unread_messages: { ...state.chats[chatIndex].unread_messages, [userId]: 0 },
        };
      }
    },
    // Update a specific chat (e.g., for renaming or changing metadata)
    updateChat: (state, action) => {
      const updatedChat = action.payload;
      state.chats = state.chats.map((chat) =>
        chat.chat_id === updatedChat.chat_id ? updatedChat : chat
      );
    },
    deleteMessage: (state, action) => {
      const { chatId, messageId } = action.payload;
      const chat = state.chats.find((chat) => chat.chat_id === chatId);
      if (chat && state.messages[chatId]) {
        const index = state.messages[chatId].findIndex((message) => message._id === messageId);
        if (index !== -1) {
          state.messages[chatId].splice(index, 1);
        }
      }
    },
    addChat: (state, action) => {
      if(action.payload){
        const existingChat = state.chats.find(chat => chat.chat_id === action.payload.chat_id);
        if(!existingChat){
          // Add new chat if it doesn't exist
          state.chats.push(action.payload);
        } else {
          // Update the existing chat with new data
          Object.assign(existingChat, action.payload); // Merge the updated chat data
        }
      }
    },
    updateNameChat: (state, action) => {
      const { chatId, name } = action.payload;
      state.chats = state.chats.map((chat) =>
        chat.chat_id === chatId ? { ...chat, chat_name: name } : chat
      );
    },
    updateIconChat: (state, action) => {
      const { chatId, icon } = action.payload;
      state.chats = state.chats.map((chat) =>
        chat.chat_id === chatId ? { ...chat, chat_avatar: icon } : chat
      );
    },
    
  },
});

export const {
  setChats,
  setMessages,
  addMessageToChat,
  deleteChat,
  markChatAsRead,
  updateChat,
  setPresentChat,
  setMeta,
  updateReadUser,
  addMessage,
  deleteMessage,
  addChat,
  updateNameChat,
  updateIconChat
} = ChatSlice.actions;

export default ChatSlice.reducer;
