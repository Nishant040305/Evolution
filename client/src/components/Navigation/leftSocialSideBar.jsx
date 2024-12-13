import React from "react";
import { FaUser, FaCog, FaEnvelope, FaBell, FaUsers, FaArrowLeft, FaSignOutAlt } from "react-icons/fa";
import HoverInfoWrapper from "../utility/toolTip";

const LeftSocialSideBar = () => {
  const items = [
    { icon: <FaArrowLeft size={20} />, label: "Back" },
    { icon: <FaUser size={20} />, label: "Profile" },
    { icon: <FaBell size={20} />, label: "Notifications" },
    { icon: <FaEnvelope size={20} />, label: "Messages" },
    { icon: <FaUsers size={20} />, label: "Groups" },
    { icon: <FaCog size={20} />, label: "Settings" },
    { icon: <FaSignOutAlt size={20} />, label: "Logout" },
  ];

  return (
    <div className="left-social-sidebar w-10 bg-gray-800 text-white flex flex-col justify-between">
      {/* Sidebar Content */}
      <div className="left-social-sidebar-content flex flex-col items-center space-y-6">
        {items.slice(0, 5).map((item, index) => (
          <HoverInfoWrapper key={index} info={item.label}>
            <div
            key={index}
            className="relative group hover:bg-gray-700 p-2 rounded cursor-pointer"
            aria-label={item.label}
          >
            {item.icon}
            {/* Tooltip */}
          </div>
            </HoverInfoWrapper>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="left-social-sidebar-footer flex flex-col items-center space-y-6 py-4">
        {items.slice(5).map((item, index) => (
          <HoverInfoWrapper key={index} info={item.label}>
          <div
            key={index}
            className="relative group hover:bg-gray-700 p-2 rounded cursor-pointer"
            aria-label={item.label}
          >
            {item.icon}
            {/* Tooltip */}
          </div>
          </HoverInfoWrapper>
        ))}
      </div>
    </div>
  );
};

export default LeftSocialSideBar;
