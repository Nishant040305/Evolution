import { createSlice } from "@reduxjs/toolkit";

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
      state.presentChat = action.payload;
    },

    // Set the messages for a specific chat
    setMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      state.messages[chatId] = messages;
    
    },

    // Add a message to a specific chat
    addMessage: (state, action) => {
      const { chatId, messages } = action.payload;
      console.log("Message",messages.content);
      // Ensure the chatId exists in the state.messages object
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
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
          readBy: [messages.sender_id],
        });
      }

    },
    addMessageToChat: (state, action) => {
      const { chatId, messages } = action.payload;
      // Ensure the chatId exists in the state.messages object
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      console.log(messages);
      const reversedMessages = messages.reverse();
      state.messages[chatId] = {...state.messages[chatId],...reversedMessages};
    
    },
      
    // set the meta data
    setMeta: (state, action) => {
        const { chatId, meta } = action.payload;
        console.log(meta)
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
      if (state.messages[chatId]) {
        state.messages[chatId] = state.messages[chatId].map((message) => ({
          ...message,
          read_by: message.read_by.includes(userId)
            ? message.read_by
            : [...message.read_by, userId],
        }));
      }
    },

    // Update a specific chat (e.g., for renaming or changing metadata)
    updateChat: (state, action) => {
      const updatedChat = action.payload;
      state.chats = state.chats.map((chat) =>
        chat.chat_id === updatedChat.chat_id ? updatedChat : chat
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
  addMessage
} = ChatSlice.actions;

export default ChatSlice.reducer;
