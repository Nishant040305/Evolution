import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ProfileUpdate } from "../../Store/userSlice"; // Import actions from ImageSlice
import { useParams } from "react-router-dom";
import server from "../../server.json";

const SettingsPage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [imageToUpload, setImageToUpload] = useState({ image: "", file: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
  });
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo); // Access Redux user state

  const BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;

  const defaultImage = `https://dummyimage.com/200x200
    ?.charAt(0)
    .toUpperCase()}`;

  useEffect(() => {
    const usernameFromEmail = user.email ? user.email.split("@")[0] : ""; // Extract the part before '@'

    setEditForm({
      username: usernameFromEmail || "",
      email: user.email || "",
    });
    setProfileImage(user.avatar || defaultImage);
  }, [user]);

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

  const uploadProfileImage = async () => {
    try {
      if (!imageToUpload.file) return;

      const formData = new FormData();
      formData.append("file", imageToUpload.file);

      const response = await axios.post(
        `${BACKWEB}${server.Image.ImageUpload}`,
        formData
      );

      if (response.status === 200 && response.data.url) {
        setProfileImage(response.data.url); // Update the profile image preview
        setImageToUpload({ image: "", file: "" }); // Reset image preview and file input
        alert("Image uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleEditSubmit = async () => {
    try {
      const urlB = `${BACKWEB}${server.User.ChangeProfile}`;
      const endpoint = urlB.replace(":id", user._id);
      const response = await axios.put(endpoint, {
        username: editForm.username,
        avatar: profileImage,
      });

      if (response.status === 200) {
        dispatch(ProfileUpdate({ ...user, ...editForm, avatar: profileImage })); // Dispatch action to update user
        setIsEditing(false); // Exit editing mode
        alert("Profile Updated");
      } else {
        throw new Error("Profile update failed");
      }
    } catch (err) {
      console.error(err);
      alert("There was an error updating your profile");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-8 mx-auto max-w-7xl">
        <div className="p-6 rounded-lg shadow-lg bg-red-50">
          <h2 className="mb-4 text-2xl font-semibold text-red-600">
            Profile Settings
          </h2>

          {/* Profile Image Section */}
          <div className="flex items-center justify-center mb-6 space-x-4">
            <div className="w-24 h-24 overflow-hidden border-4 border-red-300 rounded-full">
              <img
                src={profileImage || defaultImage} // Use either uploaded image or default
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Image Upload Button */}
          <div className="flex justify-center mb-4">
            <input
              type="file"
              onChange={handleImageChange}
              className="px-4 py-2 text-sm text-gray-700 border-2 border-gray-300 rounded-md"
              ref={fileInputRef}
              accept="image/png,image/jpeg,image/jpg"
            />
          </div>

          {/* Image Preview & Upload Button */}
          {imageToUpload.image && (
            <div className="flex justify-center mb-6">
              <img
                src={imageToUpload.image}
                alt="Preview"
                className="object-cover w-16 h-16 rounded-full"
              />
              <button
                onClick={uploadProfileImage}
                className="px-4 py-2 ml-4 text-sm text-white transition-all bg-red-500 rounded-md hover:bg-red-600"
              >
                Upload
              </button>
            </div>
          )}

          {/* Display Name */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Display Name
            </h3>
            <div className="text-sm text-gray-600">{user.username}</div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Email</h3>
            <div className="text-sm text-gray-600">{user.email}</div>
          </div>

          {/* Edit Form */}
          {isEditing ? (
            <>
              <div className="my-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editForm.username}
                  onChange={(e) =>
                    setEditForm({ ...editForm, username: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
              </div>

              <div className="my-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleEditSubmit}
                  className="px-4 py-2 text-white bg-green-500 rounded-md"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
