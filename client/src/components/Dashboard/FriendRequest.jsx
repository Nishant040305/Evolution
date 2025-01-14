import React, { useState, useEffect } from 'react';
import { FaUserCheck, FaUserTimes } from 'react-icons/fa'; // Icons for actions
import { SocketAcceptFriendRequest } from '../../event/SocketEvent';
import User from '../../scripts/API.User';
import Chats from '../../scripts/API.Chats';
import { addChat } from '../../Store/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNotification } from '../../Store/Notifications';
import ApiDashboard from '../../scripts/API.Dashboard';
const FriendRequest = ({ notification }) => {
  const [loading, setLoading] = useState(true);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const API = new User();
  const APINotif = new Chats();
  const userId = useSelector((state) => state.user.userInfo._id);
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Fetch user details using the provided API
    const fetchUserData = async () => {
      try {
        const apiDashboard = new ApiDashboard();
        const userData = await apiDashboard.FindUserByID(
          notification.message.senderId
        ); // `message` is senderId
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [notification.message]);

  const handleAccept = async (notificationId) => {
    const notification = notifications.find(
      (notif) => notif.type === 'friendRequest' && notif._id === notificationId
    );

    if (!notification) {
      console.error('Notification not found');
      return;
    }

    const { senderId } = notification.message;

    try {
      const chat = await API.createChat(senderId);
      dispatch(addChat(chat.data));
      dispatch(deleteNotification({ id: notificationId }));
      await APINotif.deleteNotification(notificationId);
      SocketAcceptFriendRequest(chat.data);
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleDecline = async (notificationId) => {
    const notification = notifications.find(
      (notif) => notif.type === 'friendRequest' && notif._id === notificationId
    );

    if (!notification) {
      console.error('Notification not found');
      return;
    }

    try {
      dispatch(deleteNotification({ id: notificationId }));
      await APINotif.deleteNotification(notificationId);
    } catch (error) {
      console.error('Error declining friend request:', error);
    }
  };

  return (
    <li className="pb-2 flex items-center flex-col justify-between  border-b">
      {/* Left Section: Icon */}
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 flex-shrink-0">
          {user?.displayname?.[0]?.toUpperCase() || '?'}
        </div>
        {/* Right Section */}
        <div className=" flex flex-col ml-2 gap-2 ">
          {/* Title */}
          <h5 className="text-sm font-medium text-gray-900">
            Friend Request from {user?.displayname || 'Unknown'}
          </h5>
          {/* Info */}
          <p className="text-sm text-gray-500">
            {user?.displayname || 'This user'} wants to connect with you.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="ml-4 mt-3 flex-shrink-0 flex items-center space-x-2">
        <button
          onClick={() => handleAccept(notification._id)}
          disabled={loading}
          className="flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 transition"
        >
          <FaUserCheck className="mr-1" />
          Accept
        </button>
        <button
          onClick={() => handleDecline(notification._id)}
          disabled={loading}
          className="flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300 transition"
        >
          <FaUserTimes className="mr-1" />
          Decline
        </button>
      </div>
    </li>
  );
};
export default FriendRequest;
