import React from 'react';
import {
  FaUser,
  FaCog,
  FaEnvelope,
  FaBell,
  FaUsers,
  FaArrowLeft,
  FaUserPlus,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import HoverInfoWrapper from '../utility/toolTip';
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/userSlice';
import AuthService from '../../scripts/API.Login';

const LeftSocialSideBar = ({ setNav }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const items = [
    { 
      icon: <FaArrowLeft size={20} />, 
      label: 'Back',
      action: () => navigate(-1)
    },
    { 
      icon: <FaUser size={20} />, 
      label: 'Profile',
      action: () => navigate('/profilepage'),
      active: location.pathname === '/profilepage'
    },
    { 
      icon: <FaBell size={20} />, 
      label: 'Notifications',
      action: () => setNav('Notifications')
    },
    { 
      icon: <FaEnvelope size={20} />, 
      label: 'Messages',
      action: () => setNav('Messages')
    },
    { 
      icon: <FaUsers size={20} />, 
      label: 'Groups',
      action: () => setNav('Groups')
    },
    { 
      icon: <FaUserPlus size={20} />, 
      label: 'Find Users',
      action: () => setNav('Find Users')
    },
    { 
      icon: <FaCog size={20} />, 
      label: 'Settings',
      action: () => setNav('Settings')
    },
    { 
      icon: <FaSignOutAlt size={20} />, 
      label: 'Logout',
      action: async () => {
        const APT = new AuthService();
        dispatch(logout());
        await APT.logout();
        navigate('/login');
      }
    },
  ];

  return (
    <div className="left-social-sidebar w-12 bg-gray-800 text-white flex flex-col justify-between py-6">
      {/* Sidebar Content */}
      <div className="flex flex-col items-center space-y-4">
        {items.slice(0, 6).map((item, index) => (
          <HoverInfoWrapper key={index} info={item.label} position="right">
            <button
              className={`p-2 rounded-lg transition-all duration-200 ${
                item.active 
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-700 hover:text-blue-400'
              }`}
              onClick={item.action}
              aria-label={item.label}
            >
              {item.icon}
            </button>
          </HoverInfoWrapper>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="flex flex-col items-center space-y-4">
        {items.slice(6).map((item, index) => (
          <HoverInfoWrapper key={index + 6} info={item.label} position="right">
            <button
              className={`p-2 rounded-lg transition-all duration-200 ${
                item.label === 'Logout'
                  ? 'hover:bg-red-500/20 hover:text-red-400'
                  : 'hover:bg-gray-700 hover:text-blue-400'
              }`}
              onClick={item.action}
              aria-label={item.label}
            >
              {item.icon}
            </button>
          </HoverInfoWrapper>
        ))}
      </div>
    </div>
  );
};

export default LeftSocialSideBar;