import React, { useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import {
  MagnifyingGlassIcon,
  StarIcon as OutlineStarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as SolidStarIcon } from "@heroicons/react/24/solid";
import { ProfileHeader, EditProfileModal } from "../components/ProfilePage/ProfileHeader";

import ContributionHeatmap from "../components/ProfilePage/ContributionHeatmap";
import ProjectGrid from "../components/ProfilePage/ProjectGrid";
import Section from "../components/ProfilePage/Section";
import ActivityTimeline from "../components/ProfilePage/ActivityTimeline";
import LeftSocialSideBar from "../components/Navigation/leftSocialSideBar";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "Kanye West",
    username: "@yeezus",
    email: "kanye@yeezy.com",
    avatarUrl: "/profile-image.jpg",
    location: "Chicago, IL",
    joinDate: "June 2010",
    bio: "Visionary artist, producer, and creative director. Changing the game one album at a time.",
    projects: [
      { id: 1, name: "Yeezy Design Studio", stars: 2450, description: "Next-gen fashion design platform", language: "TypeScript" },
      { id: 2, name: "Donda Academy", stars: 1890, description: "Creative education ecosystem", language: "Python" },
      { id: 3, name: "Yeezy Gap Engine", stars: 3567, description: "Retail infrastructure system", language: "Rust" },
    ],
    activity: [
      { date: "2023-03-15", action: "Created project 'Yeezy Design Studio'" },
      { date: "2023-03-12", action: "Updated profile information" },
      { date: "2023-03-10", action: "Launched new collection" },
    ],
    contributions: generateHeatmapData(200), // Generate more days for the heatmap
    socialLinks: {
      twitter: "#",
      website: "#",
      github: "#",
      linkedin: "#",
    },
    totalStars: 2450 + 1890 + 3567,
    searchQuery: "",
    editingProfile: false,
  });

  function generateHeatmapData(days) {
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      count: Math.floor(Math.random() * 5),
    }));
  }

  const handleStarProject = (projectId) => {
    setProfile((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === projectId ? { ...p, stars: p.stars + 1 } : p
      ),
      totalStars: prev.totalStars + 1,
    }));
  };

  const handleEditProfile = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const filteredProjects = profile.projects.filter((project) =>
    project.name.toLowerCase().includes(profile.searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0D1117] text-white flex">
      {/* Left Sidebar */}
      <div className="w-16 md:w-20 fixed left-0 top-0 bottom-0 bg-[#161B22] p-2 md:p-4 border-r border-[#30363D]">
        <LeftSocialSideBar
          twitterUrl={profile.socialLinks.twitter}
          websiteUrl={profile.socialLinks.website}
          stats={{
            projects: profile.projects.length,
            stars: profile.totalStars,
            contributions: profile.contributions.reduce((acc, curr) => acc + curr.count, 0),
          }}
        />
      </div>

      {/* Main Content */}
      <div className="ml-16 md:ml-20 w-full p-4 md:p-8 space-y-8">
        <ProfileHeader
          profile={profile}
          onEditProfile={() => setProfile((p) => ({ ...p, editingProfile: true }))}
        />

        <div className="space-y-8">
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-[#8B949E]" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 bg-[#0D1117] border border-[#30363D] rounded-lg focus:border-[#58A6FF] focus:outline-none placeholder-[#8B949E]"
                value={profile.searchQuery}
                onChange={(e) => setProfile((p) => ({ ...p, searchQuery: e.target.value }))}
              />
            </div>
          </div>

          {/* Projects Section */}
          <Section title="Projects">
            <ProjectGrid
              projects={filteredProjects}
              onStar={handleStarProject}
              StarIcon={filteredProjects.length === profile.projects.length ? OutlineStarIcon : SolidStarIcon}
            />
          </Section>

          {/* Insights Section */}
          <Section title="Insights">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Contribution Heatmap</h2>
                <div className="scale-90 md:scale-100">
                  <ContributionHeatmap contributions={profile.contributions} />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-4">Project Timeline</h2>
                <ActivityTimeline events={profile.activity} />
              </div>
            </div>
          </Section>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {profile.editingProfile && (
        <EditProfileModal
          profile={profile}
          handleEditProfile={handleEditProfile}
          onClose={() => setProfile((p) => ({ ...p, editingProfile: false }))}
        />
      )}
    </div>
  );
};

export default ProfilePage;