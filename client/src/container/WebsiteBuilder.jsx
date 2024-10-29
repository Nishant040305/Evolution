import React, { useState } from "react";
import TopBar from "../components/MainPage/Topbar";
import LeftSidebar from "../components/MainPage/LeftSidebar";
import MainCanvas from "../components/MainPage/MainCanvas";
import RightSidebar from "../components/MainPage/RightSidebar";
import BottomBar from "../components/MainPage/BottomBar";

const WebsiteBuilder = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleElementSelect = (item, subItem) => {
    setSelectedElement({ main: item, sub: subItem });
    setRightSidebarOpen(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1">
        <LeftSidebar
          sidebarOpen={leftSidebarOpen}
          toggleSidebar={() => setLeftSidebarOpen(!leftSidebarOpen)}
          toggleCategory={toggleCategory}
          expandedCategories={expandedCategories}
          handleElementSelect={handleElementSelect}
        />
        <MainCanvas />
        {rightSidebarOpen && (
          <RightSidebar
            element={selectedElement}
            closeSidebar={() => setRightSidebarOpen(false)}
          />
        )}
      </div>
      <BottomBar />
    </div>
  );
};

export default WebsiteBuilder;
