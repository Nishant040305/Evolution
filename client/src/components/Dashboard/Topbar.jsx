import React from "react";
import { Search, Settings, User, LogOut } from "lucide-react";

const TopBar = ({ searchQuery, setSearchQuery }) => (
  <div className="text-red-900 shadow-md bg-gradient-to-r from-red-300 to-red-100">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16 lg:h-20">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-white rounded-lg lg:w-10 lg:h-10">
              <span className="text-xl font-bold text-red-600 lg:text-2xl">
                E
              </span>
            </div>
            <h1 className="text-2xl font-bold">Evolution</h1>
          </div>
        </div>

        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-4 text-red-900 placeholder-red-500 bg-red-100 rounded-md"
          />
          <Search className="absolute w-5 h-5 text-red-500 transform -translate-y-1/2 left-3 top-1/2" />
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-red-200">
            <Settings className="w-5 h-5 text-red-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-red-200">
            <User className="w-5 h-5 text-red-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-red-200">
            <LogOut className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default TopBar;
