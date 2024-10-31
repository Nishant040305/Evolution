import { useState } from "react";
import React from "react";
import { Textarea } from "../../lib/TextArea-standared";
import { Label } from "../../lib/label";
import { Button } from "../../lib/Buttons-standard";
import { Input } from "../../lib/Input-standard";
import { Select } from "../../lib/select";
import { ChevronRight, ChevronLeft, ChevronDown, ChevronUp,Grid } from "lucide-react";

const LeftSidebar = ({
  sidebarOpen,
  toggleSidebar,
  webElements,
  setWebElements,
  toggleRight,
  setId,
}) => {
  const [counter, setCounter] = useState(1);
  const [showComponents, setShowComponents] = useState(true); // New state to toggle sections
  const [showElements, setShowElements] = useState(true); // State to toggle elements

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
    <div className="relative">
      {sidebarOpen==true?<div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 border-r bg-white overflow-hidden`}
      >
        <div className="h-full p-4 overflow-y-auto">
          <div className="flex justify-between mb-4">
            <button
              onClick={() => setShowComponents(true)}
              className={`p-2 ${showComponents ? "font-bold" : ""}`}
            >
              Components
            </button>
            <button
              onClick={() => setShowComponents(false)}
              className={`p-2 ${!showComponents ? "font-bold" : ""}`}
            >
              Project
            </button>
            <button
              onClick={toggleSidebar}
              className=" z-10 p-2 transform  bg-white   "
            >
        {sidebarOpen ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

          </div>
          
          <>
          {showComponents ? (
            <div>
              <div className="flex justify-between items-center">
                <h3 className="font-bold flex flex-row"><Grid className="w-4 h-4"></Grid>   Elements</h3>
                <button onClick={() => setShowElements((prev) => !prev)}>
                  {showElements ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>

              {showElements && (
                <div className="Elements transition-all duration-300 flex flex-col mt-2 items-start">
                  <button
                    onClick={() => {
                      let id = counter + 1;
                      let hash = id.toString();
                      setCounter((prevCounter) => prevCounter + 1);
                      setWebElements({
                        ...webElements,
                        [hash]: Button(hash, startDrag), // Adds a Button component
                      });
                    }}
                  >
                    Button
                  </button>

                  <button
                    onClick={() => {
                      let id = counter + 1;
                      let hash = id.toString();
                      setCounter((prevCounter) => prevCounter + 1);
                      setWebElements({
                        ...webElements,
                        [hash]: Textarea(hash, startDrag), // Adds a TextField component
                      });
                    }}
                  >
                    Text Field
                  </button>
                    {/* work in progress */}
                  {/* <button
                    onClick={() => {
                      let id = counter + 1;
                      let hash = id.toString();
                      setCounter((prevCounter) => prevCounter + 1);
                      setWebElements({
                        ...webElements,
                        [hash]: Select(hash, ["Option 1", "Option 2", "Option 3"], startDrag), // Adds a Dropdown component
                      });
                    }}
                  >
                    Dropdown
                  </button> */}

                  <button
                    onClick={() => {
                      let id = counter + 1;
                      let hash = id.toString();
                      setCounter((prevCounter) => prevCounter + 1);
                      setWebElements({
                        ...webElements,
                        [hash]: Label(hash, "New Label Text", startDrag), // Adds a Label component
                      });
                    }}
                  >
                    Label
                  </button>

                  <button
                    onClick={() => {
                      let id = counter + 1;
                      let hash = id.toString();
                      setCounter((prevCounter) => prevCounter + 1);
                      setWebElements({
                        ...webElements,
                        [hash]: Input(hash, "New Label Text", startDrag), // Adds a Label component
                      });
                    }}
                  >
                    Input
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="project-overview">
              <h2 className="font-bold text-lg">Project Overview</h2>
              <div className="components">
                <div>Components</div>
                {Object.entries(webElements).map(([index, value]) => (
                  <div key={index} onClick={() => { setId(value.id);toggleRight(true) }}>{`${value.type} ${value.id}`}</div>
                ))}
              </div>
            </div>
          )}
          </>
        </div>
        
      </div>:<button
              onClick={toggleSidebar}
              className=" z-10 p-2 transform  bg-white   absolute top-0"
            >
        {sidebarOpen ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>}
    </div>
  );
};

export default LeftSidebar;
