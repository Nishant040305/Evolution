import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markAsRead, deleteNotification } from '../../Store/Notifications';
import { FaBell } from 'react-icons/fa';
import InformationNotification from './Information';
import FriendRequestNotification from './FriendRequest';
import CollaborationRequestNotification from './CollaborationRequest'; // Importing Collaboration Component
import { SocketAcceptFriendRequest } from '../../event/SocketEvent';
import User from '../../scripts/API.User';
import Chats from '../../scripts/API.Chats';
import { addChat } from '../../Store/Chat';
import ApiDashboard from '../../scripts/API.Dashboard';

const NotificationPage = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);

  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const API = new User();
  const APINotif = new Chats();
  const APIProject = new ApiDashboard();
  const userId = useSelector((state) => state.user.userInfo._id);
  useEffect(() => {
    // Filter and sort notifications
    let filtered = [...notifications];

    if (filter === 'unread') {
      filtered = filtered.filter((notification) => !notification.read);
    } else if (filter === 'information') {
      filtered = filtered.filter(
        (notification) => notification.type === 'information'
      );
    } else if (filter === 'friendRequest') {
      filtered = filtered.filter(
        (notification) => notification.type === 'friendRequest'
      );
    } else if (filter === 'collaborationRequest') {
      filtered = filtered.filter(
        (notification) => notification.type === 'collaborationRequest'
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (notification) =>
          notification.title
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          notification.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredNotifications(filtered);
  }, [notifications, filter, searchTerm]);

  // Handle Collaboration Request actions
  const handleAcceptCollaborationRequest = async (notificationId) => {
    const notification = notifications.find(
      (notif) =>
        notif.type === 'collaborationRequest' && notif._id === notificationId
    );

    if (!notification) {
      console.error('Notification not found');
      return;
    }
    console.log(notification);
    const { groupChatId, projectId } = notification.message;

    try {
      // Perform necessary API call or logic for accepting collaboration

      await APIProject.acceptCollaboration(projectId, notification.receiverId); // Hypothetical API call
      dispatch(deleteNotification({ id: notificationId }));
      await APINotif.deleteNotification(notificationId);
      console.log(groupChatId);
      const chat = await APINotif.addUserToGroupChat(groupChatId, [userId]);
      SocketAcceptFriendRequest(chat.data);
      SocketRefreshOrganizationChanges(projectId);
    } catch (error) {
      console.error('Error accepting collaboration request:', error);
    }
  };

  const handleDeclineCollaborationRequest = async (notificationId) => {
    const notification = notifications.find(
      (notif) =>
        notif.type === 'collaborationRequest' && notif._id === notificationId
    );

    if (!notification) {
      console.error('Notification not found');
      return;
    }

    try {
      dispatch(deleteNotification({ id: notificationId }));
      await APINotif.deleteNotification(notificationId);
    } catch (error) {
      console.error('Error declining collaboration request:', error);
    }
  };

  // Handle other actions (Friend Request, Mark as Read, Delete, etc.)
  const handleAcceptFriendRequest = async (notificationId) => {
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

  const handleDeclineFriendRequest = async (notificationId) => {
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

  const handleMarkAsRead = (notificationId) => {
    dispatch(markAsRead(notificationId));
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      dispatch(deleteNotification(notificationId));
      await APINotif.deleteNotification(notificationId);
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center bg-white shadow-md rounded-t-lg p-4">
        <div className="text-lg font-semibold">Notifications</div>
        <button className="p-2 rounded-full text-gray-500">
          <FaBell size={20} />
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex justify-between mt-4 space-x-4">
        <div className="flex space-x-2">
          {[
            'all',
            'unread',
            'information',
            'friendRequest',
            'collaborationRequest',
          ].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === type
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {type === 'all'
                ? 'All'
                : type.charAt(0).toUpperCase() +
                  type.slice(1).replace(/([A-Z])/g, ' $1')}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search notifications"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 w-1/2 text-sm border border-gray-300 rounded-lg"
        />
      </div>

      {/* Notification List */}
      <div
        className="mt-4 space-y-2 overflow-y-scroll overflow-x-hidden scrollbar_edit"
        style={{ maxHeight: '73vh' }}
      >
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            switch (notification.type) {
              case 'information':
                return (
                  <InformationNotification
                    key={notification._id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDeleteNotification}
                  />
                );
              case 'friendRequest':
                return (
                  <FriendRequestNotification
                    key={notification._id}
                    notification={notification}
                    onAccept={handleAcceptFriendRequest}
                    onDecline={handleDeclineFriendRequest}
                  />
                );
              case 'collaborationRequest':
                return (
                  <CollaborationRequestNotification
                    key={notification._id}
                    notification={notification}
                    onAccept={handleAcceptCollaborationRequest}
                    onDecline={handleDeclineCollaborationRequest}
                  />
                );
              default:
                return null;
            }
          })
        ) : (
          <div className="text-gray-600 text-center">No notifications</div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
