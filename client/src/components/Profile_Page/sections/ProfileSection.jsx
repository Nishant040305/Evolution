import React, { useState, useEffect } from "react";
import { Users, MapPin, Link as LinkIcon, Building, Clock } from "lucide-react";

const ProfileSection = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch profile data (future-proof for backend)
  const fetchProfileData = async () => {
    try {
      // Simulating an API call with dummy data for now
      const fetchedProfileData = {
        name: "John Doe",
        title: "Full Stack Developer",
        bio: "Building awesome things with code. Open source enthusiast and continuous learner.",
        company: "@techcorp",
        location: "San Francisco",
        website: "https://johndoe.dev",
        joinDate: "December 2020",
        followers: 2100,
        following: 89,
        avatarUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      };
      setProfileData(fetchedProfileData);
      setLoading(false);
    } catch (err) {
      setError("Error fetching profile data. Please try again later.");
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchProfileData();
  }, []);

  if (loading) {
    return <div className="text-center text-[#c9d1d9]">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-[#161b22] rounded-md p-4 border border-[#30363d] w-[280px] mr-8">
      <div className="flex flex-col items-center mb-8">
        <img
          src={profileData.avatarUrl}
          alt="Profile"
          className="w-20 h-20 mb-4 rounded-full"
        />
        <div className="text-center">
          <h1 className="text-[26px] font-semibold text-[#c9d1d9]">
            {profileData.name}
          </h1>
          <p className="text-[20px] text-[#7d8590]">{profileData.title}</p>
        </div>
        <button className="mt-4 px-3 py-1 text-sm font-medium text-[#c9d1d9] bg-[#21262d] hover:bg-[#30363d] border border-[#363b42] rounded-md">
          Edit profile
        </button>
      </div>

      <div className="text-[#7d8590] space-y-2">
        <p className="text-[16px] max-w-[600px] text-center">
          {profileData.bio}
        </p>
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center">
            <Building className="w-4 h-4 mr-2" />
            <span>{profileData.company}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{profileData.location}</span>
          </div>
          <div className="flex items-center">
            <LinkIcon className="w-4 h-4 mr-2" />
            <a
              href={profileData.website}
              className="text-[#58a6ff] hover:underline"
            >
              {profileData.website}
            </a>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>Joined {profileData.joinDate}</span>
          </div>
        </div>

        <div className="flex items-center justify-center mt-3 space-x-4">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span>
              <strong className="text-[#c9d1d9]">
                {profileData.followers}
              </strong>{" "}
              followers ·{" "}
              <strong className="text-[#c9d1d9]">
                {profileData.following}
              </strong>{" "}
              following
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
