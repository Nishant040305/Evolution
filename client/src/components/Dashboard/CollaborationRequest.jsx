import {
  SocketRefreshOrganizationChanges,
  SocketAcceptFriendRequest,
} from '../../event/SocketEvent';
import { useEffect, useState } from 'react';
import User from '../../scripts/API.User';
import Chats from '../../scripts/API.Chats';
import ApiDashboard from '../../scripts/API.Dashboard';
import { deleteNotification } from '../../Store/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, FaTimes } from 'react-icons/fa';

const CollabrationRequest = ({ notification }) => {
  const [sender, setSender] = useState(null);
  const notifications = useSelector((state) => state.notifications);
  const API = new User();
  const dispatch = useDispatch();
  const APINotif = new Chats();
  const APIProject = new ApiDashboard();
  const userId = useSelector((state) => state.user.userInfo._id);

  const onAccept = async (notificationId) => {
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
      const chat = await APINotif.addUserToGroupChat(groupChatId, [userId]);
      SocketAcceptFriendRequest(chat.data);
      SocketRefreshOrganizationChanges(projectId);
    } catch (error) {
      console.error('Error accepting collaboration request:', error);
    }
  };

  const onDecline = async (notificationId) => {
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
  useEffect(() => {
    // Fetch sender details
    const fetchSenderData = async () => {
      try {
        const senderData = await new ApiDashboard().FindUserByID(
          notification.message.senderId
        );
        setSender(senderData);
      } catch (error) {
        console.error('Error fetching sender data:', error);
      }
    };

    fetchSenderData();
  }, [notification.message]);

  const { projectName, roleOffered } = notification.message;

  return (
    <div
      className={`p-3 rounded-lg shadow-md flex items-center justify-between ${notification.read ? 'bg-gray-100' : 'bg-red-50'}`}
    >
      {/* Left Section: Icon */}
      <div className="flex items-center space-x-3">
        {sender?.avatar ? (
          <img
            src={sender.avatar}
            alt={`${sender.displayname}'s avatar`}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm text-gray-600">
            {sender?.displayname?.[0]?.toUpperCase() || '?'}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex flex-col flex-grow ml-3">
        {/* Title */}
        <p className="text-sm font-medium text-gray-800">
          {sender?.displayname || 'Loading...'} invited you
        </p>
        {/* Info */}
        <p className="text-xs text-gray-500">{`Project: ${projectName}`}</p>
        <p className="text-xs text-gray-500">{`Role: ${roleOffered}`}</p>
        {/* Action Buttons */}
        <div className="flex space-x-2 mt-2">
          <button
            onClick={() => onAccept(notification._id)}
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none"
          >
            <FaCheck size={14} />
          </button>
          <button
            onClick={() => onDecline(notification._id)}
            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
          >
            <FaTimes size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollabrationRequest;
