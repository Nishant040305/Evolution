import React, { useEffect, useState } from 'react';
import { FaUserCheck, FaUserTimes } from 'react-icons/fa'; // Icons for actions
import { formatDistanceToNow } from 'date-fns'; // For formatting timestamps
import ApiDashboard from '../../scripts/API.Dashboard';

const FriendRequestNotification = ({ notification, onAccept, onDecline }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Fetch user details using the provided API
    const fetchUserData = async () => {
      try {
        const apiDashboard = new ApiDashboard();
        const userData = await apiDashboard.FindUserByID(notification.message.senderId); // `message` is senderId
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [notification.message]);

  return (
    <div
      className={`flex items-center p-3 rounded-lg shadow-md transition-transform transform ${
        notification.read ? 'bg-gray-100' : 'bg-white'
      } hover:scale-[1.01]`}
    >
      {/* Left section with user avatar and details */}
      <div className="flex items-center space-x-3">
        {/* User avatar */}
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={`${user.displayname}'s avatar`}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-sm">
            {user?.displayname ? user.displayname[0].toUpperCase() : '?'}
          </div>
        )}

        {/* User details */}
        <div className="flex flex-col">
          <span className="text-base font-semibold text-gray-800">Friend Request</span>
          <span className="text-sm text-gray-600">
            {user ? (
              <>
                Request from <span className="font-medium">{user.displayname}</span>
              </>
            ) : (
              'Loading user details...'
            )}
          </span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
          </span>
        </div>
      </div>

      {/* Right section with action buttons */}
      <div className="flex items-center space-x-3 ml-auto">
        <button
          onClick={() => onAccept(notification._id)}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
        >
          <FaUserCheck size={16} />
          <span>Accept</span>
        </button>
        <button
          onClick={() => onDecline(notification._id)}
          className="flex items-center space-x-2 px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
        >
          <FaUserTimes size={16} />
          <span>Decline</span>
        </button>
      </div>

    </div>
  );
};

export default FriendRequestNotification;
