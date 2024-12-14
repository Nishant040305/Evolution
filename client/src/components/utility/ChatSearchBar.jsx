import React, { useState } from "react";
import { FaArrowLeft, FaTimes,FaSearch } from "react-icons/fa";

const ChatSearchBar = ({setSearchQuery,searchQuery}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value.length > 0) {
      setIsProcessing(true);
    } else {
      setIsProcessing(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsProcessing(false);
  };

  return (
    <div className="w-full bg-white flex justify-center items-center h-20 ">
    <div className="relative px-4 py-2 bg-gray-100 border-gray-300 rounded-md  focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500 ChatSearchBar">
      <input
        type="text"
        placeholder="Search chats..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full px-3 py-1 pl-10 pr-12 rounded-md bg-gray-100  border-gray-300 text-gray-700 focus:outline-none transition duration-200  placeholder-gray-400"
      />
      {/* Arrow Icon for initial state */}
      {!searchQuery && !isProcessing ?(
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FaSearch size={14} />
        </div>):(<div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <FaArrowLeft size={14} />
        </div>
      )}

      {/* Clear Button (X) */}
      {isProcessing && (
        <div
          onClick={clearSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
        >
          <FaTimes size={14} />
        </div>
      )}
    </div>
    </div>
  );
};

export default ChatSearchBar;
