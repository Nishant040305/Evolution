import {
  MapPinIcon,
  CalendarIcon,
  PencilSquareIcon,
  EnvelopeIcon,
  LinkIcon,
  CodeBracketSquareIcon,
  XMarkIcon,
  UserCircleIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const ProfileHeader = ({ profile, onEditProfile, profileStatus }) => {
  return (
    <div className="bg-[#161B22] py-8 px-4 border-b border-[#30363D]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Profile Image Section */}
        <div className="relative group">
          <img
            src={profile.avatar}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-[#58A6FF] hover:border-[#1f6feb] transition-colors object-cover"
          />
          {profileStatus && (
            <button
              className="absolute bottom-0 right-0 bg-[#58A6FF] p-2 rounded-full hover:bg-[#1f6feb] transition-colors"
              onClick={onEditProfile}
            >
              <PencilSquareIcon className="w-4 h-4 text-white" />
            </button>
          )}
        </div>

        {/* Profile Details Section */}
        <div className="flex-1 space-y-4">
          {/* Name and Edit Button */}
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            {profileStatus && (
              <button
                className="px-4 py-1 bg-[#238636] rounded-full hover:bg-[#2ea043] flex items-center gap-2"
                onClick={onEditProfile}
              >
                <PencilSquareIcon className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>

          {/* Username and Basic Info */}
          <div className="space-y-2">
            <p className="text-[#8B949E] text-lg">{profile.displayname}</p>
            <div className="flex flex-wrap gap-4 text-[#8B949E]">
              <div className="flex items-center gap-1">
                <MapPinIcon className="w-4 h-4" />
                <span>
                  {profile.location == null
                    ? 'Not Specified'
                    : profile.location}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-4 h-4" />
                <span>
                  Joined{' '}
                  {new Date(profile.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Stats and Social Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="flex items-center gap-2">
              <FaLinkedin className="w-5 h-5 text-[#58A6FF]" />
              <a href={profile.linkedin} className="hover:text-[#58A6FF]">
                {profile.linkedin == null
                  ? 'Connect with linkedin'
                  : 'linkedin'}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FaGithub className="w-5 h-5 text-[#58A6FF]" />
              <a href={profile.github} className="hover:text-[#58A6FF]">
                {profile.github == null ? 'Connect with Github' : 'Github'}
              </a>
            </div>
          </div>

          {/* Contact and Bio Section */}
          <div className="pt-4 space-y-2">
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="w-5 h-5 text-[#58A6FF]" />
              <span>{profile.email}</span>
            </div>
            <p className="text-[#8B949E] max-w-2xl">
              {profile.bio == null ? 'No Bio Provided' : profile.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileHeader;
