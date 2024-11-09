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

  const imagesMedia = useSelector((state) => state.image); // Access Redux image state
  const user = useSelector((state) => state.user.userInfo); // Access Redux user state

  const BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;

  const defaultImage = `https://dummyimage.com/200x200/000/fff&text=${user?.name?.charAt(0).toUpperCase()}`;

  useEffect(() => {
    setEditForm({
      username: user.username || "",
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
      const endpoint = urlB.replace(':id', user._id);
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
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 mx-auto max-w-7xl">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-semibold text-red-600">Profile Settings</h2>

          {/* Profile Image Section */}
          <div className="flex items-center mb-6 space-x-4">
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
                onClick={uploadProfileImage}
                className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all text-sm"
              >
                Upload
              </button>
            </div>
          )}

          {/* Username and Email */}
          {isEditing ? (
            <>
              <div className="my-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="my-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleEditSubmit}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="my-4">
                <div className="text-sm font-medium text-gray-700">Username</div>
                <div>{user.username}</div>
              </div>

              <div className="my-4">
                <div className="text-sm font-medium text-gray-700">Email</div>
                <div>{user.email}</div>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
