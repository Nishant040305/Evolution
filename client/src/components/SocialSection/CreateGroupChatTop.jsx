import React, { useState, useRef } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Upload, Camera } from "lucide-react";
import ChatSearchBar from "../utility/ChatSearchBar";
import axios from "axios";

const CreateGroupChatTop = ({
  groupName,
  setGroupName,
  searchQuery,
  imageToUpload,
  setImageToUpload,
  setSearchQuery,
  createGroup,
  toast,
}) => {
  const fileInputRef = useRef(null);
  // Handle group icon change
  const handleGroupIconChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!validImageTypes.includes(file.type)) {
      toast.error("Please upload a JPG or PNG image.");
      return;
    }

    const maxSizeInBytes = 1024*200;
    if (file.size > maxSizeInBytes) {
      toast.error("Image must be under 200KB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageToUpload({ file, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-start w-full p-4 border-b">
      <h2 className="text-lg font-semibold mb-4">Create Group</h2>
    <div className="flex flex-row">
      
      {/* Group Icon Upload */}
      <div className="w-full mb-4 flex justify-center">
        <label className="relative inline-block">
          <input
            type="file"
            accept="image/*"
            onChange={handleGroupIconChange}
            className="hidden"
            ref={fileInputRef}
          />
          {/* Upload Button (circle with camera overlay) */}
          <div
            className={`w-16 h-16 bg-gray-200 rounded-full flex justify-center items-center ${imageToUpload.image ? "relative" : "cursor-pointer"}`}
          >
            {imageToUpload.image ? (
              <img
                src={imageToUpload.image}
                alt="Group Icon Preview"
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              <Camera className="w-6 h-6 text-gray-500" />
            )}
            
          </div>
        </label>
      </div>
      {/* Group Name Input */}
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="w-full max-w-lg p-1 h-10  border-b-2 border-gray-300 focus:border-indigo-500 outline-none transition duration-300"
        />
    </div>
      {/* Search Bar */}
      <ChatSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Create Group Button */}
      <button
        onClick={createGroup}
        className="flex items-center mt-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
      >
        <FaUserPlus className="mr-2" />
        Create Group
      </button>
    </div>
  );
};

export default CreateGroupChatTop;
