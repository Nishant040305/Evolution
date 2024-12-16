import React from "react";

const SelectUserForGroupChat = ({ user, isSelected, toggleSelect }) => {
  return (
    <div
      className="flex items-center justify-between w-full p-3 border-b cursor-pointer hover:bg-gray-100"
      onClick={() => toggleSelect(user.id)}
    >
      {/* User Avatar */}
      <div className="flex items-center space-x-3">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        {/* Display Name */}
        <div className="text-sm font-medium">{user.name}</div>
      </div>

      {/* Pretty Checkbox */}
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => {}}
        className="w-5 h-5 text-indigo-500 rounded focus:ring focus:ring-indigo-300"
      />
    </div>
  );
};

export default SelectUserForGroupChat;
