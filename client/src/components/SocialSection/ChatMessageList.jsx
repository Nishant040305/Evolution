import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChatMessageBlock from "./ChatMessageBlock";
import ChatMessageInput from "./ChatMessageInput";
import Chats from "../../scripts/API.Chats";
import { addMessageToChat, setMessages, setMeta } from "../../Store/Chat";
import { set } from "mongoose";

const ChatMessageList = () => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const isLoadingRef = useRef(false);
  const API = new Chats();
  const chatId = useSelector((state) => state.chat.presentChat);
  
  // Select chat data and messages from Redux
  const messages = useSelector((state) => state.chat.messages[chatId] || []);
  const chat = useSelector((state) =>
    state.chat.chats.find((c) => c.chat_id === chatId)
  );

  const hasMore = chat?.meta === undefined ? true : chat.meta.hasMore;
  const lastSeen = chat?.meta===undefined? null:chat.meta.lastSeen; // Get lastSeen for the current chat

  // Fetch messages from the backend
  const fetchMessages = async (isInitialLoad = false) => {
    if (isLoadingRef.current || !hasMore) return;
    isLoadingRef.current = true;

    const container = containerRef.current;
    const previousScrollHeight = container.scrollHeight; // Record current scroll height

    try {
      const data = await API.getMessages(chatId, lastSeen); // Fetch messages using chatId and lastSeen
      const newMessages = data?.data || [];
      const meta = data?.meta || {};

      dispatch(setMeta({ chatId, meta }));
      dispatch(
        setMessages({ chatId, messages: [ ...newMessages.reverse(),...messages] })

      );

      if (!isInitialLoad) {
        // Restore scroll position after fetching older messages
        setTimeout(() => {
          container.scrollTop = container.scrollHeight - previousScrollHeight;
        }, 0);
      } else {
        // For initial load, scroll to the bottom of the chat
        setTimeout(() => {
          container.scrollTop = container.scrollHeight;
        }, 0);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      isLoadingRef.current = false;
    }
  };

  // Fetch initial messages on chatId change
  useEffect(() => {
    fetchMessages(true); // Load the first batch of messages
  }, [chatId]);

  // Handle scroll to load more messages when reaching the top
  const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollTop === 0 && hasMore && !isLoadingRef.current) {
      fetchMessages(); // Load the next batch of older messages
    }
  };

  // Helper function to format date (Year-Month-Day)
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0]; // Return the date part (YYYY-MM-DD)
  };

  // Render a date marker between different message days
  const renderDateMarker = (current, previous) => {
    const currentDate = formatDate(current.timestamp);
    const previousDate = previous ? formatDate(previous.timestamp) : null;

    if (currentDate !== previousDate) {
      return (
        <div className="text-xs text-center text-gray-500 py-2">
          {new Date(current.timestamp).toDateString()}
        </div>
      );
    }
    return null;
  };
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight; // Scroll to the bottom
    }
  }, [messages]); // Trigger this effect whenever messages change


  return (
    <div className="flex flex-col w-full ChatMessageList bg-gray-100">
      {/* Messages List */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-grow overflow-y-auto p-4 space-y-4"
        style={{ height: "76.5vh" }}
      >
        {/* Placeholder for loading */}
        {isLoadingRef.current && (
          <div className="text-center text-gray-500 py-4">Loading messages...</div>
        )}

        {messages.map((message, index) => {
          const previousMessage = messages[index - 1]; // Check the previous message
          return (
            <React.Fragment key={message._id}>
              {/* Render a date marker when the date changes */}
              {renderDateMarker(message, previousMessage)}
              <ChatMessageBlock message={message} index={messages.length-index} />
            </React.Fragment>
          );
        })}
      </div>

      {/* Message Input */}
      <ChatMessageInput />
    </div>
  );
};

export default ChatMessageList;
