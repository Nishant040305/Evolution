import React from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Icon for Delete
import { formatDistanceToNow } from 'date-fns'; // For relative time formatting

const InformationNotification = ({ notification, onDelete }) => {
  const formattedTime = formatDistanceToNow(new Date(notification.timestamp), {
    addSuffix: true,
  });

  return (
    <div
      className={`flex justify-between items-center p-3 rounded-md shadow-sm bg-white border transition-transform transform hover:scale-[1.01]`}
    >
      {/* Left section with title, message, and timestamp */}
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-800">{notification.title}</div>
        <div className="text-xs text-gray-500 mt-1">{notification.message}</div>
        <div className="text-xs text-gray-400 mt-1">{formattedTime}</div>
      </div>

      {/* Right section with Delete button */}
      <button
        onClick={() => onDelete(notification.id)}
        className="flex items-center text-gray-400 hover:text-red-500 text-sm transition"
      >
        <FaTrashAlt size={14} />
      </button>
    </div>
  );
};

export default InformationNotification;
