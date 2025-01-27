import { 
  EnvelopeIcon,
  StarIcon,
  MapPinIcon,
  CalendarIcon,
  LinkIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const ProfileCard = ({ profile }) => {
  return (
    <div className="bg-[#161B22] p-6 rounded-lg border border-[#30363D] space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative group">
          <img 
            src={profile.avatarUrl || '/default-avatar.png'} 
            alt={profile.name}
            className="w-24 h-24 rounded-full border-4 border-[#58A6FF] object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-[#58A6FF] p-1.5 rounded-full hover:bg-[#1f6feb] transition-colors">
            <UserCircleIcon className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-[#8B949E] mt-1">{profile.username}</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-[#0D1117] rounded-lg">
          <EnvelopeIcon className="w-5 h-5 text-[#58A6FF] flex-shrink-0" />
          <div className="truncate">
            <p className="text-sm font-medium">Contact Email</p>
            <p className="text-sm text-[#8B949E] truncate">{profile.email}</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 justify-center">
          <a href={profile.twitterUrl} className="text-[#8B949E] hover:text-[#58A6FF] transition-colors">
            <XMarkIcon className="w-6 h-6" />
          </a>
          <a href={profile.githubUrl} className="text-[#8B949E] hover:text-[#58A6FF] transition-colors">
            <CodeBracketSquareIcon className="w-6 h-6" />
          </a>
          <a href={profile.websiteUrl} className="text-[#8B949E] hover:text-[#58A6FF] transition-colors">
            <LinkIcon className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-[#0D1117] rounded-lg text-center">
          <p className="text-2xl font-bold">{profile.projects.length}</p>
          <p className="text-sm text-[#8B949E]">Projects</p>
        </div>
        <div className="p-3 bg-[#0D1117] rounded-lg text-center">
          <p className="text-2xl font-bold">
            {profile.projects.reduce((acc, curr) => acc + curr.stars, 0).toLocaleString()}
          </p>
          <p className="text-sm text-[#8B949E]">Total Stars</p>
        </div>
      </div>

      {/* Additional Details */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-[#58A6FF]" />
          <span className="text-sm">{profile.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-[#58A6FF]" />
          <span className="text-sm">Joined {profile.joinDate}</span>
        </div>
      </div>

      {/* Bio Section */}
      <div className="pt-4 border-t border-[#30363D]">
        <h3 className="text-sm font-semibold mb-2">About Me</h3>
        <p className="text-sm text-[#8B949E] leading-relaxed">
          {profile.bio || "No biography available"}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;