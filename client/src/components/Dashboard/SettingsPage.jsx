import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setImagesMedia } from "../../Store/imageSlice"; // Import actions from ImageSlice
import components from "../../lib";
import { useParams } from "react-router-dom";
import server from "../../server.json";

const { Button, TextArea, Label, Input, Select, Div } = components;

const SettingsPage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [imageToUpload, setImageToUpload] = useState({ image: "", file: "" });
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const imagesMedia = useSelector((state) => state.image); // Access the Redux state for images
  const user = useSelector((state) => state.user); // Get the user from Redux or state
  const { projectID } = useParams(); // For project-specific images

  const BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;

  // Default image using the first letter of the user's name
  const defaultImage = `https://dummyimage.com/200x200/000/fff&text=${user?.name
    ?.charAt(0)
    .toUpperCase()}`;

  useEffect(() => {
    if (imagesMedia?.url) {
      setProfileImage(imagesMedia.url);
    }
  }, [imagesMedia]);

  // Handle image selection or drag-and-drop
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!validImageTypes.includes(file.type)) {
      alert("Please upload a JPG or PNG image.");
      return;
    }

    const maxSizeInBytes = 200 * 1024; // 200KB
    if (file.size > maxSizeInBytes) {
      alert("Image must be under 200KB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageToUpload({ file, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Function to upload image
  const uploadProfileImage = async () => {
    try {
      if (!imageToUpload.file) return; // Ensure file exists

      const formData = new FormData();
      formData.append("file", imageToUpload.file);

      const response = await axios.post(
        `${BACKWEB}${server.Project.MediaUpdate}${projectID}`,
        formData
      );

      if (response.status === 200 && response.data.url) {
        dispatch(setImagesMedia(response.data.url)); // Update Redux store with image URL
        setProfileImage(response.data.url); // Update the profile image preview
        setImageToUpload({ image: "", file: "" }); // Reset image preview and file input
        alert("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  // Drag & Drop functionality
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingImage(true);
  };

  const handleDragLeave = () => {
    setIsDraggingImage(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingImage(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const fakeEvent = { target: { files: [file] } };
      handleImageChange(fakeEvent);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 mx-auto max-w-7xl">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-red-600">
            Profile Settings
          </h2>

          {/* Profile Image Section */}
          <div
            className="flex items-center mb-6 space-x-4"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="w-20 h-20 overflow-hidden border-2 border-gray-300 rounded-full">
              <img
                src={profileImage || defaultImage} // Use either uploaded image or default
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>

            <input
              type="file"
              onChange={handleImageChange}
              className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md"
              ref={fileInputRef}
              accept="image/png,image/jpeg,image/jpg"
            />
          </div>

          {/* Image Preview & Upload Button */}
          {imageToUpload.image && (
            <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
              <img
                src={imageToUpload.image}
                alt="Preview"
                className="object-cover w-16 h-16 rounded"
              />
              <button
                onClick={uploadProfileImage} // Trigger the image upload
                className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all text-sm"
              >
                Upload
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
    