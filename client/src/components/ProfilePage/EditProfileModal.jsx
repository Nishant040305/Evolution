import React, { useState } from 'react';
import axios from 'axios';
import server from '../../server.json';
import { useDispatch } from 'react-redux';
import { ProfileUpdate } from '../../Store/userSlice';
const EditProfileModal = ({ profile, onClose }) => {
  const [profileToUpdate, setProfileUpdate] = useState(profile);
  const [imageToUpload, setImageToUpload] = useState({ image: '', file: '' });
  const dispatch = useDispatch();
  const BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    if (!validImageTypes.includes(file.type)) {
      alert('Please upload a JPG or PNG image.');
      return;
    }

    const maxSizeInBytes = 200 * 1024; // 200KB
    if (file.size > maxSizeInBytes) {
      alert('Image must be under 200KB.');
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
      formData.append('file', imageToUpload.file);

      const response = await axios.post(
        `${BACKWEB}${server.Image.ImageUpload}`,
        formData
      );

      if (response.status === 200 && response.data.url) {
        setProfileUpdate({ ...profileToUpdate, avatar: response.data.url });
        setImageToUpload({ image: '', file: '' });
        alert('Image uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  const handleEditProfile = (field, value) => {
    setProfileUpdate({ ...profileToUpdate, [field]: value });
  };

  const handleSave = async () => {
    try {
      const urlB = `${BACKWEB}${server.User.ChangeProfile}`;
      const endpoint = urlB.replace(':id', profileToUpdate._id);
      const response = await axios.put(endpoint, {
        name: profileToUpdate.name,
        bio: profileToUpdate.bio,
        location: profileToUpdate.location,
        linkedin: profileToUpdate.linkedin,
        github: profileToUpdate.github,
        avatar: profileToUpdate.avatar,
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
        dispatch(ProfileUpdate(response.data.user));
        onClose(); // Close the modal after saving
      } else {
        throw new Error('Profile update failed');
      }
    } catch (err) {
      console.error(err);
      alert('There was an error updating your profile');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-[#161B22] p-6 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Edit Profile</h2>

        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={profileToUpdate.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-2"
          />
          <input
            type="file"
            onChange={handleImageChange}
            className="hidden"
            id="avatarInput"
            accept="image/*"
          />
          <label
            htmlFor="avatarInput"
            className="px-4 py-2 bg-[#238636] rounded hover:bg-[#2ea043] cursor-pointer"
          >
            Change Avatar
          </label>
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
        </div>

        {/* Editable Fields */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              value={profileToUpdate.name}
              onChange={(e) => handleEditProfile('name', e.target.value)}
              className="w-full p-2 bg-[#0D1117] border border-[#30363D] rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Bio</label>
            <textarea
              value={profileToUpdate.bio}
              onChange={(e) => handleEditProfile('bio', e.target.value)}
              className="w-full p-2 bg-[#0D1117] border border-[#30363D] rounded"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Location</label>
            <input
              type="text"
              value={profileToUpdate.location}
              onChange={(e) => handleEditProfile('location', e.target.value)}
              className="w-full p-2 bg-[#0D1117] border border-[#30363D] rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">LinkedIn URL</label>
            <input
              type="url"
              value={profileToUpdate.linkedin}
              onChange={(e) => handleEditProfile('linkedin', e.target.value)}
              className="w-full p-2 bg-[#0D1117] border border-[#30363D] rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">GitHub URL</label>
            <input
              type="url"
              value={profileToUpdate.github}
              onChange={(e) => handleEditProfile('github', e.target.value)}
              className="w-full p-2 bg-[#0D1117] border border-[#30363D] rounded"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-[#d94949] rounded hover:bg-[#484f58]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#238636] rounded hover:bg-[#2ea043]"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
