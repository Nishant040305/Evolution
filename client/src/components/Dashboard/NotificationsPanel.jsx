import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa"; // Assuming you're using react-icons

const NotificationsPanel = () => {
  const [notificationList, setNotificationList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setTimeout(() => {
        const dummyData = [
          {
            id: 1,
            title: "Collaboration Invitation",
            message: "You have been invited to collaborate on Project X.",
            read: false,
            isInvitation: true,
          },
          {
            id: 2,
            title: "New Comment",
            message: "You have a new comment on your post.",
            read: false,
          },
        ];
        setNotificationList(dummyData);
        setLoading(false);
      }, 1000);
    };

    fetchNotifications();
  }, []);

  const handleAccept = (id) => {
    console.log(`Accepted invitation with id: ${id}`);
    markAsRead(id);
  };

  const handleDecline = (id) => {
    console.log(`Declined invitation with id: ${id}`);
    markAsRead(id);
  };

  const markAsRead = (id) => {
    setNotificationList((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="flex items-center mb-4 text-lg font-semibold text-red-600">
        <FaBell className="w-6 h-6 mr-2" /> Notifications
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading notifications...</p>
      ) : notificationList.length > 0 ? (
        <ul className="space-y-4">
          {notificationList.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 rounded-md ${
                notification.read
                  ? "bg-gray-100 text-gray-500"
                  : "bg-red-50 text-gray-700"
              }`}
            >
              <p className="font-medium">{notification.title}</p>
              <p className="text-sm">{notification.message}</p>
              {notification.isInvitation && (
                <div className="flex mt-2 space-x-2">
                  <button
                    onClick={() => handleAccept(notification.id)}
                    className="px-2 py-1 text-white bg-green-500 rounded-md hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecline(notification.id)}
                    className="px-2 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Decline
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No new notifications</p>
      )}
    </div>
  );
};

export default NotificationsPanel;
