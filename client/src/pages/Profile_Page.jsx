import React, { useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import {
  MagnifyingGlassIcon,
  StarIcon as OutlineStarIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';
import ProfileHeader from '../components/ProfilePage/ProfileHeader';
import EditProfileModal from '../components/ProfilePage/EditProfileModal';
import ContributionHeatmap from '../components/ProfilePage/ContributionHeatmap';
import ProjectGrid from '../components/ProfilePage/ProjectGrid';
import Section from '../components/ProfilePage/Section';
import ActivityTimeline from '../components/ProfilePage/ActivityTimeline';
import { useEffect } from 'react';
import User from '../scripts/API.User';

const ProfilePage = (props) => {
  const [projects, setProjects] = useState([]);
  const API = new User();
  const [profile, setProfile] = useState({
    activity: [
      { date: '2023-03-15', action: "Created project 'Yeezy Design Studio'" },
      { date: '2023-03-12', action: 'Updated profile information' },
      { date: '2023-03-10', action: 'Launched new collection' },
    ],
    contributions: generateHeatmapData(200), // Generate more days for the heatmap
    searchQuery: '',
    edit: false,
  });
  function generateHeatmapData(days) {
    return Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      count: Math.floor(Math.random() * 5),
    }));
  }
  const handleEditProfile = () => {
    setProfile((prev) => ({ ...prev, edit: true }));
  };

  const filteredProjects = projects
    .filter((project) =>
      project.name.toLowerCase().includes(profile.searchQuery.toLowerCase())
    )
    .slice(0, 4);
  useEffect(() => {
    setProfile((p) => ({ ...p, ...props.profile }));
  }, [props.profile]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = await API.getAllHostedProjects(profile._id);
        setProjects(projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [profile._id]); // Depend on profile._id if it changes
  return (
    <div className="min-h-screen bg-[#0D1117] text-white flex w-full">
      {/* Main Content */}
      <div className="ml-16 md:ml-20 w-full p-4 md:p-8 space-y-8">
        <ProfileHeader
          profile={profile}
          onEditProfile={handleEditProfile}
          profileStatus={props.status}
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
                onChange={(e) =>
                  setProfile((p) => ({ ...p, searchQuery: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Projects Section */}
          <Section title="Projects">
            <ProjectGrid
              projects={filteredProjects}
              StarIcon={
                filteredProjects.length === projects.length
                  ? OutlineStarIcon
                  : SolidStarIcon
              }
            />
          </Section>

          {/* Insights Section */}
          <Section title="Insights">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Contribution Heatmap
                </h2>
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
      {profile.edit && (
        <EditProfileModal
          profile={profile}
          handleEditProfile={handleEditProfile}
          onClose={() => setProfile((p) => ({ ...p, edit: false }))}
        />
      )}
    </div>
  );
};

export default ProfilePage;
