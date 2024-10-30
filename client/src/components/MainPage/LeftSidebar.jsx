import { useState } from "react";
import React from "react";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Grid,
  Type,
  Image,
} from "lucide-react";
//webElements is the elements of the selected and configured components on the webpage
const LeftSidebar = ({
  sidebarOpen,
  toggleSidebar,
  toggleCategory,
  expandedCategories,
  handleElementSelect,
  webElements,
  setWebElements,
  setId,
  id,

}) => {
  const categories = {
    elements: {
      label: "Elements",
      icon: Grid,
      items: [
        {
          type: "container",
          label: "Container",
          subItems: ["Flex", "Grid", "Box"],
        },
        {
          type: "section",
          label: "Section",
          subItems: ["Hero", "Feature", "CTA"],
        },
        {
          type: "layout",
          label: "Layout",
          subItems: ["1-Column", "2-Column", "3-Column"],
        },
      ],
    },
    text: {
      label: "Text",
      icon: Type,
      items: [
        {
          type: "heading",
          label: "Headings",
          subItems: ["H1", "H2", "H3", "H4"],
        },
        {
          type: "paragraph",
          label: "Paragraphs",
          subItems: ["Regular", "Left", "Small"],
        },
        {
          type: "special",
          label: "Special",
          subItems: ["Code", "Ordered List", "Unordered List"],
        },
      ],
    },
    media: {
      label: "Media",
      icon: Image,
      items: [
        {
          type: "image",
          label: "Images",
          subItems: ["Single", "Gallery", "Slider"],
        },
        {
          type: "video",
          label: "Video",
          subItems: ["Local", "YouTube", "Vimeo"],
        },
        {
          type: "icon",
          label: "Icons",
          subItems: ["Basic", "Social", "Custom"],
        },
      ],
    },
  };
  const [counter,setCounter] = useState(1);
  //drag and drop
  const startDrag = (event, elementId) => {
    event.preventDefault();

    const element = document.getElementById(elementId);
    let startX = event.clientX;
    let startY = event.clientY;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      setWebElements((prevWebElements) => {
        const newPosition = {
          x: prevWebElements[elementId].position.x + dx,
          y: prevWebElements[elementId].position.y + dy,
        };

        return {
          ...prevWebElements,
          [elementId]: {
            ...prevWebElements[elementId],
            position: newPosition,
          },
        };
      });

      startX = moveEvent.clientX;
      startY = moveEvent.clientY;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };


  return (
    <>
      <button
        onClick={toggleSidebar}
        className="absolute left-0 z-10 p-1 transform -translate-y-1/2 bg-white border rounded-r-lg top-1/2"
      >
        {sidebarOpen ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      <div
        className={`${sidebarOpen ? "w-64" : "w-0"
          } transition-all duration-300 border-r bg-white overflow-hidden`}
      >
        <div className="h-full p-4 overflow-y-auto">
          {Object.entries(categories).map(([key, category]) => (
            <div key={key} className="mb-4">
              <button
                onClick={() => toggleCategory(key)}
                className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-rose-50"
              >
                <div className="flex items-center space-x-2">
                  {React.createElement(category.icon, { className: "w-4 h-4" })}
                  <span>{category.label}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 transform transition-transform ${expandedCategories[key] ? "rotate-180" : ""
                    }`}
                />
              </button>

              {expandedCategories[key] && (
                <div className="mt-2 ml-4 space-y-2">
                  {category.items.map((item) => (
                    <div key={item.type} className="space-y-1">
                      <div className="text-sm font-medium text-gray-600">
                        {item.label}
                      </div>
                      {item.subItems.map((subItem) => (
                        <button
                          key={subItem}
                          onClick={() => handleElementSelect(item, subItem)}
                          className="w-full py-1 pl-4 text-sm text-left rounded hover:bg-rose-50"
                        >
                          {subItem}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="Test">
            <button onClick={async()=>{
              let id = counter+1;
              let hash = id.toString();
              setCounter((prevCounter) => prevCounter + 1);
              setWebElements({
                ...webElements,
                [hash]:{
                  "id":`${hash}`,
                  "type": "button",
                  "styles": {
                      "backgroundColor": "gray",
                      
                  },
                  "position":{x:100,y:100},
                  "attributes": {
                      "onClick": function() { 
                        alert(`Button ${id} clicked`)
                       },
                       onMouseDown: (event) => startDrag(event, hash)
                  },
                  "content": `Button ${counter}`
              }
              

              })
              }}>Add buttons</button>

          </div>
          <div className="components">
            <div>components</div>
            {Object.entries(webElements).map(([index, value]) => (
               <div key={index} onClick={()=>{setId(value.id)}}>{`${value.type} ${value.id}`}</div>
             ))}

          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
