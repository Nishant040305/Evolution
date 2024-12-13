import React, { useState, useEffect, useRef } from "react";
import ChatMessageBlock from "./ChatMessageBlock";
import ChatMessageInput from "./ChatMessageInput";
import Chats from "../../scripts/API.Chats";

const ChatMessageList = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [lastSeen, setLastSeen] = useState(null); // Tracks the last fetched message timestamp
  const containerRef = useRef(null);
  const isLoadingRef = useRef(false); // Prevent simultaneous API calls
  const API = new Chats();
  // Fetch messages from the backend
  const fetchMessages = async () => {
    if (isLoadingRef.current || !hasMore) return;
    isLoadingRef.current = true;

    try {
      const data = await API.getMessages(chatId, lastSeen); // Fetch messages using chatId and lastSeen
      const newMessages = data?.data || [];
      const meta = data?.meta || {};

      // Update state with new messages
      setMessages((prev) => [...newMessages.reverse(), ...prev]); // Add new messages to the start
      setHasMore(meta.hasMore);
      setLastSeen(meta.lastSeen); // Update lastSeen with the timestamp of the last message fetched
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      isLoadingRef.current = false;
    }
  };

  // Fetch initial messages on chatId change
  useEffect(() => {
    setMessages([]); // Clear existing messages
    setHasMore(true);
    setLastSeen(null);
    fetchMessages(); // Load the first batch of messages
  }, [chatId]);

  // Handle scroll to load more messages when reaching the top
  const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollTop === 0 && hasMore && !isLoadingRef.current) {
      fetchMessages(); // Load the next batch of messages
    }
  };

  // Render a date marker between different message days
  const renderDateMarker = (current, previous) => {
    const currentDate = new Date(current.timestamp).toDateString();
    const previousDate = previous ? new Date(previous.timestamp).toDateString() : null;

    if (currentDate !== previousDate) {
      return (
        <div className="text-xs text-center text-gray-500 py-2">
          {currentDate}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col w-full ChatMessageList bg-gray-100">
      {/* Messages List */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex flex-col-reverse flex-grow overflow-y-auto p-4 space-y-4"
        style={{ height: "76.5vh" }}
      >
        {/* Placeholder for loading */}
        {isLoadingRef.current && (
          <div className="text-center text-gray-500 py-4">Loading messages...</div>
        )}

        {messages.map((message, index) => (
          <React.Fragment key={message._id}>
            {renderDateMarker(message, messages[index - 1])}
            <ChatMessageBlock message={message} />
          </React.Fragment>
        ))}
      </div>

      {/* Message Input */}
      <ChatMessageInput chatId={chatId} />
    </div>
  );
};

export default ChatMessageList;
