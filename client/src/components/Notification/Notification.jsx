import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markAsRead, deleteNotification } from '../../Store/Notifications';
import { FaBell, FaEllipsisV } from 'react-icons/fa';
import InformationNotification from './Information';
import { SocketAcceptFriendRequest } from '../../event/SocketEvent';
import FriendRequestNotification from './FriendRequest';
import User from '../../scripts/API.User';
import Chats from '../../scripts/API.Chats';
import { addChat } from '../../Store/Chat';
import { connectRooms } from '../../event/connectRooms';
const NotificationPage = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const API = new User();
  const APINotif = new Chats();
  useEffect(() => {
    // Filter and sort notifications based on the selected filter type and search term
    let filtered = [...notifications]; // Make a shallow copy of the notifications array
  
    if (filter === 'unread') {
      filtered = filtered.filter(notification => !notification.read);
    } else if (filter === 'information') {
      filtered = filtered.filter(notification => notification.type === 'information');
    } else if (filter === 'friendRequest') {
      filtered = filtered.filter(notification => notification.type === 'friendRequest');
    }
  
    if (searchTerm) {
      filtered = filtered.filter(
        (notification) =>
          notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          notification.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    // Sort by timestamp (most recent first)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
    setFilteredNotifications(filtered);
  }, [notifications, filter, searchTerm]);

  const togglePopup = (notification) => {
    setSelectedNotification(notification);
    setShowPopup(!showPopup);
  };

  const handleMarkAsRead = (notificationId) => {
    dispatch(markAsRead(notificationId));
  };

  const handleDeleteNotification = (notificationId) => {
    dispatch(deleteNotification(notificationId));
  };

  const handleAcceptFriendRequest = async(notificationId) => {
    // Find the notification for the friend request
    const notification = notifications.find(
      (notification) => 
        notification.type === 'friendRequest' && 
        notification._id === notificationId
    );
  
    if (!notification) {
      console.error('Notification not found');
      return;
    }
  
    const { senderId } = notification.message;
  
    // Delete the notification
    dispatch(deleteNotification({ id: notificationId }));
  
    // Create a chat with the sender of the friend request
    const chat = await API.createChat(senderId);
    dispatch(addChat(chat.data));
    console.log(chat.data,"Delete Notification");
    await APINotif.deleteNotification(notificationId);
    // Notify the server about the accepted request
    console.log(chat.data,"Chat Data");
    SocketAcceptFriendRequest(chat.data);
  };
  

  const handleDeclineFriendRequest = (notificationId) => {
    // Find the notification for the friend request
    const notification = notifications.find(
      (notification) => 
        notification.type === 'friendRequest' && 
        notification._id === notificationId
    );
    console.log("Notification",notification,notificationId);
    if (!notification) {
      console.error('Notification not found');
      return;
    }
    console.log("Notification",notificationId);
    // Delete the notification
    dispatch(deleteNotification({ id: notificationId }));
  
    // Create a chat with the sender of the friend request
    APINotif.deleteNotification(notificationId);
    // Notify the server about the Declined request
    //pending
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center bg-white shadow-md rounded-t-lg p-4">
        <div className="text-lg font-semibold">Notifications</div>
        <button className="p-2 rounded-full text-gray-500">
          <FaBell size={20} />
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex justify-between mt-4 space-x-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded-lg ${
              filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 text-sm rounded-lg ${
              filter === 'unread' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter('information')}
            className={`px-3 py-1 text-sm rounded-lg ${
              filter === 'information' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Information
          </button>
          <button
            onClick={() => setFilter('friendRequest')}
            className={`px-3 py-1 text-sm rounded-lg ${
              filter === 'friendRequest' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Friend Requests
          </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search notifications"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-1/2 text-sm border border-gray-300 rounded-lg"
        />
      </div>

      {/* Notification List */}
      <div className="mt-4 space-y-2 overflow-y-scroll overflow-x-hidden scrollbar_edit" style={{ maxHeight: '73vh' }}>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            if (notification.type === 'information') {
              return (
                <InformationNotification
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDeleteNotification}
                />
              );
            } else if (notification.type === 'friendRequest') {
              return (
                <FriendRequestNotification
                  key={notification.id}
                  notification={notification}
                  onAccept={handleAcceptFriendRequest}
                  onDecline={handleDeclineFriendRequest}
                  onDelete={handleDeleteNotification}
                />
              );
            }
            return null; // Handle other notification types
          })
        ) : (
          <div className="text-gray-600 text-center">No notifications</div>
        )}
      </div>

      {/* Popup Menu */}
      {showPopup && selectedNotification && (
        <div className="absolute top-16 right-10 bg-white shadow-md rounded-md p-4 w-48">
          <button
            onClick={() => handleDeleteNotification(selectedNotification.id)}
            className="w-full text-left p-2 text-sm hover:bg-gray-100"
          >
            Delete Notification
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
