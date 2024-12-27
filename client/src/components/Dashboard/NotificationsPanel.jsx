import React  from "react";
import { FaBell } from "react-icons/fa"; // Assuming you're using react-icons
import FriendRequest from './FriendRequest';
import CollabrationRequest from './CollaborationRequest';
import { useSelector } from 'react-redux';
const Information = ({ notification }) => {
  return(
    <div>
      <p>Information</p>
    </div>
  )
}
const NotificationsPanel = () => {
  const notificationList = useSelector((state) => state.notifications);
  const loading = false;


  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="flex items-center mb-4 text-lg font-semibold text-red-600">
        <FaBell className="w-6 h-6 mr-2" /> Notifications
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading notifications...</p>
      ) : notificationList.length > 0 ? (
        <ul className="space-y-4 w-full">
          {notificationList.map((notification) => {
            switch (notification.type) {
              case 'information':
                return (
                  <Information
                    key={notification._id}
                    notification={notification}
                  />
                );
              case 'friendRequest':
                return (
                  <FriendRequest
                    key={notification._id}
                    notification={notification}
                  />
                );
              case 'collaborationRequest':
                return (
                  <CollabrationRequest
                    key={notification._id}
                    notification={notification}
                  />
                );
              default:
                return null;
            }
      })}
        </ul>
      ) : (
        <p className="text-gray-500">No new notifications</p>
      )}
    </div>
  );
};

export default NotificationsPanel;
