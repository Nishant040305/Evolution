// NotificationsPanel.js
import React, { useState } from "react";
import { Bell, XCircle } from "lucide-react";

const NotificationsPanel = ({ notifications, onClearAll }) => {
  const [notificationList, setNotificationList] = useState(notifications);

  const markAsRead = (index) => {
    const updatedNotifications = notificationList.map((notification, i) =>
      i === index ? { ...notification, read: true } : notification
    );
    setNotificationList(updatedNotifications);
  };

  const clearAllNotifications = () => {
    setNotificationList([]);
    onClearAll && onClearAll();
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-white border border-gray-200 rounded-lg shadow-md">
      <h2 className="flex items-center mb-4 text-lg font-semibold text-red-600">
        <Bell className="w-6 h-6 mr-2" /> Notifications
      </h2>

      {notificationList.length > 0 ? (
        <ul className="space-y-4">
          {notificationList.map((notification, index) => (
            <li
              key={index}
              className={`flex items-start justify-between p-4 rounded-md ${
                notification.read
                  ? "bg-gray-100 text-gray-500"
                  : "bg-red-50 text-gray-700"
              }`}
            >
              <div>
                <p className="font-medium">{notification.title}</p>
                <p className="text-sm">{notification.message}</p>
              </div>
              <button
                onClick={() => markAsRead(index)}
                className="text-red-600 transition-colors hover:text-red-700"
                aria-label="Mark as read"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No new notifications</p>
      )}

      <div className="flex justify-end mt-4">
        {notificationList.length > 0 && (
          <button
            onClick={clearAllNotifications}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;
