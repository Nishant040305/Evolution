import React from 'react';
import { 
  PencilSquareIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const EditProfileModal = ({ profile, handleEditProfile, onClose }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleEditProfile('avatarUrl', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-[#161B22] p-6 rounded-lg w-full max-w-md space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          <button 
            onClick={onClose}
            className="text-[#8B949E] hover:text-[#C9D1D9]"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        
        {/* Avatar Upload */}
        <div className="flex flex-col items-center gap-2">
          <img 
            src={profile.avatarUrl} 
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
        </div>

        {/* Editable Fields */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleEditProfile('name', e.target.value)}
              className="w-full p-2 bg-[#0D1117] border border-[#30363D] rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => handleEditProfile('username', e.target.value)}
              className="w-full p-2 bg-[#0D1117] border border-[#30363D] rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => handleEditProfile('bio', e.target.value)}
              className="w-full p-2 bg-[#0D1117] border border-[#30363D] rounded"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => handleEditProfile('location', e.target.value)}
              className="w-full p-2 bg-[#0D1117] border border-[#30363D] rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Twitter URL</label>
            <input
              type="url"
              value={profile.socialLinks.twitter}
              onChange={(e) => handleEditProfile('socialLinks', { ...profile.socialLinks, twitter: e.target.value })}
              className="w-full p-2 bg-[#0D1117] border border-[#30363D] rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Instagram URL</label>
            <input
              type="url"
              value={profile.socialLinks.instagram}
              onChange={(e) => handleEditProfile('socialLinks', { ...profile.socialLinks, instagram: e.target.value })}
              className="w-full p-2 bg-[#0D1117] border border-[#30363D] rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">LinkedIn URL</label>
            <input
              type="url"
              value={profile.socialLinks.linkedin}
              onChange={(e) => handleEditProfile('socialLinks', { ...profile.socialLinks, linkedin: e.target.value })}
              className="w-full p-2 bg-[#0D1117] border border-[#30363D] rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">GitHub URL</label>
            <input
              type="url"
              value={profile.socialLinks.github}
              onChange={(e) => handleEditProfile('socialLinks', { ...profile.socialLinks, github: e.target.value })}
              className="w-full p-2 bg-[#0D1117] border border-[#30363D] rounded"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button 
            className="px-4 py-2 bg-[#30363D] rounded hover:bg-[#484f58]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-[#238636] rounded hover:bg-[#2ea043]"
            onClick={onClose}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;