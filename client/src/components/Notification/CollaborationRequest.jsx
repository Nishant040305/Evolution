import React, { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Icons for actions
import { formatDistanceToNow } from 'date-fns'; // For formatting timestamps
import ApiDashboard from '../../scripts/API.Dashboard';
import { useNavigate } from 'react-router-dom';
const CollaborationRequestNotification = ({
  notification,
  onAccept,
  onDecline,
}) => {
  const [sender, setSender] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch sender details using the provided API
    const fetchSenderData = async () => {
      try {
        const apiDashboard = new ApiDashboard();
        const senderData = await apiDashboard.FindUserByID(
          notification.message.senderId
        ); // Fetch sender by senderId
        setSender(senderData);
      } catch (error) {
        console.error('Error fetching sender data:', error);
      }
    };

    fetchSenderData();
  }, [notification.message]);

  const { projectName, description, dateOfProjectCreated, roleOffered } =
    notification.message;

  return (
    <div
      className={`flex flex-col p-4 rounded-lg  shadow-md transition-transform transform ${
        notification.read ? 'bg-gray-100' : 'bg-white'
      } hover:scale-[1.001] `}
    >
      {/* Header Section */}
      <div
        className="flex items-center space-x-3"
        onClick={() => navigate('/profilepage/' + sender.displayname)}
      >
        {/* Sender avatar */}
        {sender?.avatar ? (
          <img
            src={sender.avatar}
            alt={`${sender.displayname}'s avatar`}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-sm">
            {sender?.displayname ? sender.displayname[0].toUpperCase() : '?'}
          </div>
        )}

        {/* Sender and Project Details */}
        <div className="flex flex-col">
          <span className="text-base font-semibold text-gray-800">
            Collaboration Request
          </span>
          <span className="text-sm text-gray-600">
            {sender ? (
              <>
                Request from{' '}
                <span className="font-medium">{sender.displayname}</span>
              </>
            ) : (
              'Loading sender details...'
            )}
          </span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(notification.timestamp), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>

      {/* Project Details Section */}
      <div className="mt-3 bg-gray-50 p-3 rounded-lg border">
        <h3 className="text-sm font-bold text-gray-700">Project Name</h3>
        <p className="text-sm text-gray-600">{projectName}</p>

        <h3 className="mt-2 text-sm font-bold text-gray-700">Description</h3>
        <p className="text-sm text-gray-600">{description}</p>

        <h3 className="mt-2 text-sm font-bold text-gray-700">Role Offered</h3>
        <p className="text-sm text-gray-600">{roleOffered}</p>

        <h3 className="mt-2 text-sm font-bold text-gray-700">Created On</h3>
        <p className="text-sm text-gray-600">
          {new Date(dateOfProjectCreated).toLocaleDateString()}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3 mt-4">
        <button
          onClick={() => onAccept(notification._id)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
        >
          <FaCheck size={16} />
          <span>Accept</span>
        </button>
        <button
          onClick={() => onDecline(notification._id)}
          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
        >
          <FaTimes size={16} />
          <span>Decline</span>
        </button>
      </div>
    </div>
  );
};

export default CollaborationRequestNotification;
