import React, { useState } from "react";
import { Bell, Plus, Search, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-[#0d1117] border-b border-[#21262d] z-50">
      <div className="h-full px-4 flex items-center justify-between max-w-[1280px] mx-auto">
        {/* Company Name & Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Evolution Logo"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-xl font-bold text-[#c9d1d9]">Evolution</span>
        </div>

        {/* Search Bar */}
        <div className="flex-grow max-w-xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#7d8590]" />
            <input
              type="text"
              placeholder="Search across projects, groups, users..."
              className="w-full h-9 px-3 pl-9 bg-[#161b22] text-[#c9d1d9] text-sm rounded-md border border-[#30363d] focus:border-[#58a6ff] focus:outline-none focus:ring-1 focus:ring-[#58a6ff]"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative text-[#7d8590] hover:text-[#c9d1d9] transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-[#1f6feb] text-white text-xs rounded-full px-1.5 py-0.5">
              3
            </span>
          </button>

          {/* Quick Actions */}
          <button className="text-[#7d8590] hover:text-[#c9d1d9] transition-colors">
            <Plus className="w-5 h-5" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="w-8 h-8 rounded-full ring-1 ring-[#30363d]"
              />
              <ChevronDown className="h-4 w-4 text-[#7d8590]" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#161b22] border border-[#30363d] rounded-md shadow-lg py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d]"
                >
                  Edit Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-[#c9d1d9] hover:bg-[#21262d]"
                >
                  Settings
                </a>
                <div className="border-t border-[#30363d] my-1"></div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-500 hover:bg-[#21262d]"
                >
                  Log Out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
