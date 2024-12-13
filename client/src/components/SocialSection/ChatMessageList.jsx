import React, { useState, useEffect, useRef } from "react";
import ChatMessageBlock from "./ChatMessageBlock";
import ChatMessageInput from "./ChatMessageInput";

// Dummy API for fetching messages
const API = {
  getMessages: async (chatId, page) => {
    const dummyMessages = [
      
      {
        _id: "7",
        chat_id: chatId,
        sender_id: "123",
        sender: {
          avatar: "https://via.placeholder.com/150",
          displayname: "John",
        },
        content: "Hello!",
        timestamp: new Date("2024-12-12T10:00:00Z").toISOString(),
        readBy: ["456", "123"],
      },{
        _id: "6",
        chat_id: chatId,
        sender_id: "123",
        sender: {
          avatar: "https://via.placeholder.com/150",
          displayname: "John",
        },
        content: "Hello!",
        timestamp: new Date("2024-12-12T10:00:00Z").toISOString(),
        readBy: ["456", "123"],
      },{
        _id: "5",
        chat_id: chatId,
        sender_id: "123",
        sender: {
          avatar: "https://via.placeholder.com/150",
          displayname: "John",
        },
        content: "Hello!",
        timestamp: new Date("2024-12-12T10:00:00Z").toISOString(),
        readBy: ["456", "123"],
      },
      {
        _id: "2",
        chat_id: chatId,
        sender_id: "456",
        sender: {
          avatar: "https://via.placeholder.com/150",
          displayname: "Jane",
        },
        content: "Hi John!",
        timestamp: new Date("2024-12-12T10:05:00Z").toISOString(),
        readBy: ["123"],
      },
      {
        _id: "3",
        chat_id: chatId,
        sender_id: "123",
        sender: {
          avatar: "https://via.placeholder.com/150",
          displayname: "John",
        },
        content: "How are you?",
        timestamp: new Date("2024-12-13T09:00:00Z").toISOString(),
        readBy: [],
      },
    ];

    // Simulate paginated API response
    const startIndex = (page - 1) * 2; // Assuming 2 messages per page
    const paginatedMessages = dummyMessages.slice(startIndex, startIndex + 2);

    return new Promise((resolve) => {
      setTimeout(() => resolve(paginatedMessages), 500); // Simulate delay
    });
  },
};

const ChatMessageList = ({ chatId, senderId }) => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef();
  const isLoadingRef = useRef(false); // Track if a load is in progress to avoid multiple loads

  // Fetch messages on page change or when the chatId changes
  useEffect(() => {
    const fetchMessages = async () => {
      const newMessages = await API.getMessages(chatId, page);

      if (newMessages.length === 0) {
        setHasMore(false); // No more messages to load
      } else {
        setMessages((prev) => [...newMessages.reverse(), ...prev]); // Add new messages to the start
        adjustScrollAfterNewMessages(newMessages.length);
      }
    };

    fetchMessages();
  }, [page, chatId]);

  // Adjust scroll when new messages are loaded
  const adjustScrollAfterNewMessages = (newMessagesCount) => {
    const container = containerRef.current;
    if (container && newMessagesCount > 0) {
      const previousScrollHeight = container.scrollHeight;
      setTimeout(() => {
        container.scrollTop = container.scrollHeight - previousScrollHeight;
      }, 0);
    }
  };

  // Handle scroll to load more messages when reaching the top
  const handleScroll = () => {
    const container = containerRef.current;
    
    // Check if the scroll is at the top and if messages are not being loaded already
    if (container.scrollTop === 0 && hasMore && !isLoadingRef.current) {
      isLoadingRef.current = true; // Set loading state to true to prevent multiple calls
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1); // Load next page of messages
        isLoadingRef.current = false; // Reset loading state after timeout
      }, 500); // Simulate delay of 500ms before loading the next batch of messages
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
        {hasMore && messages.length === 0 && (
          <div className="text-center text-gray-500 py-4">Loading messages...</div>
        )}

        {messages.map((message, index) => (
          <React.Fragment key={message._id}>
            {renderDateMarker(message, messages[index - 1])}
            <ChatMessageBlock message={message} currentUserId={senderId} />
          </React.Fragment>
        ))}
      </div>

      {/* Message Input */}
      <ChatMessageInput Chat={{ chat_id: chatId }} senderId={senderId} />
    </div>
  );
};

export default ChatMessageList;
