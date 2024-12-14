import React, { useState } from "react";
import {
  LayoutDashboard,
  User,
  Folder,
  Users,
  MessageCircle,
  Bell,
  BarChart2,
  Settings,
  HelpCircle,
} from "lucide-react";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    tooltip: "Quick stats and user insights",
  },
  {
    icon: User,
    label: "Profile",
    tooltip: "User details, analytics, and settings",
  },
  {
    icon: Folder,
    label: "Projects",
    tooltip: "Manage projects with filters and tools",
  },
  {
    icon: Users,
    label: "Groups/Organizations",
    tooltip: "View and manage groups",
  },
  {
    icon: MessageCircle,
    label: "Chats",
    tooltip: "Communication hub for messages",
  },
  {
    icon: Bell,
    label: "Notifications",
    tooltip: "Centralized alerts and updates",
  },
  {
    icon: BarChart2,
    label: "Analytics",
    tooltip: "Visualize contributions and trends",
  },
  {
    icon: Settings,
    label: "Settings",
    tooltip: "Customize preferences and theme",
  },
  {
    icon: HelpCircle,
    label: "Help & Support",
    tooltip: "FAQs, tutorials, and feedback",
  },
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      className={`fixed left-0 top-16 bg-[#0d1117] border-r border-[#21262d] py-6 transition-all duration-300 ease-in-out 
        ${isExpanded ? "w-[296px]" : "w-16"} h-[calc(100vh-4rem)]`}
    >
      {/* Profile Section */}
      <div className={`px-4 mb-8 ${!isExpanded && "hidden"}`}>
        <div className="relative flex items-center">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-10 h-10 mr-3 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-semibold text-[#c9d1d9]">John Doe</h2>
            <p className="text-[#7d8590] text-sm">@johndoe</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-3">
        {menuItems.map((item) => (
          <div key={item.label} className="relative group">
            <button
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sm mb-1 
                ${
                  activeTab === item.label
                    ? "bg-[#1f6feb] text-white font-medium"
                    : "text-[#c9d1d9] hover:bg-[#21262d]"
                } 
                ${!isExpanded && "justify-center"}`}
            >
              <div className="flex items-center space-x-2">
                <item.icon className="w-4 h-4" />
                {isExpanded && <span>{item.label}</span>}
              </div>
            </button>

            {/* Tooltip for Collapsed State */}
            {!isExpanded && (
              <div className="absolute px-2 py-1 ml-2 text-xs text-white transition-opacity duration-200 -translate-y-1/2 bg-black rounded opacity-0 pointer-events-none left-full top-1/2 group-hover:opacity-100">
                {item.label}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Expand/Collapse Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 
          bg-[#21262d] text-[#c9d1d9] 
          hover:bg-[#30363d] 
          p-2 rounded-full 
          transition-all duration-300`}
      >
        {isExpanded ? "←" : "→"}
      </button>
    </aside>
  );
}
