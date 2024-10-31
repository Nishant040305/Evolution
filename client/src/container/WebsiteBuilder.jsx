import React, { useState } from "react";
import TopBar from "../components/MainPage/Topbar";
import LeftSidebar from "../components/MainPage/LeftSidebar";
import MainCanvas from "../components/MainPage/MainCanvas";
import RightSidebar from "../components/MainPage/RightSidebar";
import BottomBar from "../components/MainPage/BottomBar";

const WebsiteBuilder = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [webElements,setWebElements] = useState({});
  const [id,setId] = useState(0);

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
      <TopBar webElements={webElements}
          setWebElements = {setWebElements}/>
      <div className="flex flex-1">
        <LeftSidebar
          sidebarOpen={leftSidebarOpen}
          toggleRight={setRightSidebarOpen}
          toggleSidebar={() => setLeftSidebarOpen(!leftSidebarOpen)}
          handleElementSelect={handleElementSelect}
          webElements={webElements}
          setWebElements = {setWebElements}
          id={id}
          setId={setId}
        />
        <MainCanvas
        webElements={webElements}
        setWebElements = {setWebElements}
         />
        {rightSidebarOpen && (
          <RightSidebar
            closeSidebar={() => setRightSidebarOpen(false)}
            webElements={webElements}
          setWebElements = {setWebElements}
          id={id}
          />
        )}
      </div>
      <BottomBar
      webElements={webElements}
      setWebElements = {setWebElements}
      />
    </div>
  );
};

export default WebsiteBuilder;
