import React from "react";
import Navbar from "../components/Profile_Page/navigation/Navbar";
import Sidebar from "../components/Profile_Page/navigation/Sidebar";
import GitHubProfilePage from "../components/Profile_Page/sections/GithubSection";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      <Navbar />
      <Sidebar />
      <main className="flex pl-[296px] pt-16">
        {/* Left Section (Profile and Organizations) */}
        <div className="w-[280px] mr-8">
          {children?.left || <GitHubProfilePage left />}
        </div>

        {/* Right Section (Content like Contributions, Projects, Activity Timeline) */}
        <div className="flex-1 space-y-6">
          {children?.right || <GitHubProfilePage right />}
        </div>
      </main>
    </div>
  );
}
