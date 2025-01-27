import { 
  MapPinIcon,
  CalendarIcon,
  PencilSquareIcon,
  EnvelopeIcon,
  LinkIcon,
  CodeBracketSquareIcon,
  XMarkIcon,
  UserCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const ProfileHeader = ({ profile, onEditProfile }) => {
  return (
    <div className="bg-[#161B22] py-8 px-4 border-b border-[#30363D]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Profile Image Section */}
        <div className="relative group">
          <img 
            src={profile.avatarUrl} 
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-[#58A6FF] hover:border-[#1f6feb] transition-colors object-cover"
          />
          <button 
            className="absolute bottom-0 right-0 bg-[#58A6FF] p-2 rounded-full hover:bg-[#1f6feb] transition-colors"
            onClick={onEditProfile}
          >
            <PencilSquareIcon className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Profile Details Section */}
        <div className="flex-1 space-y-4">
          {/* Name and Edit Button */}
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <button 
              className="px-4 py-1 bg-[#238636] rounded-full hover:bg-[#2ea043] flex items-center gap-2"
              onClick={onEditProfile}
            >
              <PencilSquareIcon className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Username and Basic Info */}
          <div className="space-y-2">
            <p className="text-[#8B949E] text-lg">{profile.username}</p>
            <div className="flex flex-wrap gap-4 text-[#8B949E]">
              <div className="flex items-center gap-1">
                <MapPinIcon className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span>Joined {profile.joinDate}</span>
              </div>
            </div>
          </div>

          {/* Stats and Social Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="flex items-center gap-2">
              <CodeBracketSquareIcon className="w-5 h-5 text-[#58A6FF]" />
              <span>{profile.projects.length} Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-[#58A6FF]" />
              <span>{profile.totalStars.toLocaleString()} Stars</span>
            </div>
            <div className="flex items-center gap-2">
              <XMarkIcon className="w-5 h-5 text-[#58A6FF]" />
              <a href={profile.twitterUrl} className="hover:text-[#58A6FF]">Twitter</a>
            </div>
            <div className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-[#58A6FF]" />
              <a href={profile.websiteUrl} className="hover:text-[#58A6FF]">Website</a>
            </div>
          </div>

          {/* Contact and Bio Section */}
          <div className="pt-4 space-y-2">
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="w-5 h-5 text-[#58A6FF]" />
              <span>{profile.email}</span>
            </div>
            <p className="text-[#8B949E] max-w-2xl">{profile.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

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
        <h2 className="text-xl font-bold">Edit Profile</h2>
        
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
              value={profile.twitterUrl}
              onChange={(e) => handleEditProfile('twitterUrl', e.target.value)}
              className="w-full p-2 bg-[#0D1117] border border-[#30363D] rounded"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Website URL</label>
            <input
              type="url"
              value={profile.websiteUrl}
              onChange={(e) => handleEditProfile('websiteUrl', e.target.value)}
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

export { ProfileHeader, EditProfileModal };