import { useState } from "react";
import React from "react";
import components from "../../lib";
const { Button, TextArea, Label, Input, Select, Div } = components;
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Grid,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addElement,
  setElement,
  setPosition,
} from "../../Store/webElementSlice";

const LeftSidebar = ({ sidebarOpen, toggleSidebar, toggleRight, setId }) => {
  const [counter, setCounter] = useState(1);
  const [showComponents, setShowComponents] = useState(true);
  const [showElements, setShowElements] = useState(true);
  const webElements = useSelector((state) => state.webElement.present);
  const dispatch = useDispatch();

  const startDrag = (event, elementId) => {
    event.preventDefault();
    const element = document.getElementById(elementId);
    let startX = event.clientX;
    let startY = event.clientY;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      dispatch(setPosition({ id: elementId, dx: dx, dy: dy }));
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

  const sidebarElements = {
    Button: (hash) => Button(hash, startDrag),
    TextField: (hash) => TextArea(hash, startDrag),
    Dropdown: (hash) =>
      Select(hash, ["Option 1", "Option 2", "Option 3"], startDrag),
    Label: (hash) => Label(hash, "New Label Text", startDrag),
    Input: (hash) => Input(hash, "New Label Text", startDrag),
    Div: (hash) => Div(hash, startDrag),
  };

  return (
    <div className="relative">
      {sidebarOpen ? (
        <div
          className={`w-64 transition-all duration-300 border-r bg-white overflow-hidden shadow-lg`}
          style={{ backgroundColor: "#FFE5E5" }} // Light red background
        >
          <div className="h-full p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowComponents(true)}
                className={`p-2 ${
                  showComponents ? "font-bold text-red-500" : "text-gray-600"
                } `}
              >
                Components
              </button>
              <button
                onClick={() => setShowComponents(false)}
                className={`p-2 ${
                  !showComponents ? "font-bold text-red-500" : "text-gray-600"
                } `}
              >
                Project
              </button>
              <button
                onClick={toggleSidebar}
                className="z-10 p-2 bg-white rounded-full shadow-md"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <>
              {showComponents ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="flex items-center text-sm font-semibold text-red-600">
                      <Grid className="w-4 h-4 mr-1" />
                      Elements
                    </h3>
                    <button onClick={() => setShowElements((prev) => !prev)}>
                      {showElements ? (
                        <ChevronUp className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  </div>

                  {showElements && (
                    <div className="flex flex-col items-start mt-2 space-y-2 Elements">
                      {Object.keys(sidebarElements).map((element) => (
                        <button
                          onClick={() => {
                            const id = counter + 1;
                            const hash = id.toString();
                            setCounter((prevCounter) => prevCounter + 1);
                            dispatch(
                              addElement({
                                hash: hash,
                                value: sidebarElements[element](hash),
                              })
                            );
                          }}
                          key={element}
                          className="w-full px-4 py-2 text-left text-gray-700 transition duration-150 bg-white rounded-md shadow hover:bg-red-50"
                        >
                          {element}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="project-overview">
                  <h2 className="mb-3 text-lg font-bold text-red-500">
                    Project Overview
                  </h2>
                  <div className="space-y-2 components">
                    {Object.entries(webElements).map(([index, value]) => (
                      <div
                        key={index}
                        onClick={() => {
                          setId(value.id);
                          toggleRight(true);
                        }}
                        className="p-2 text-gray-700 transition duration-150 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-red-50"
                      >
                        {`${value.type} ${value.id}`}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleSidebar}
          className="absolute top-0 left-0 z-10 p-2 transform bg-white rounded-full shadow-md"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default LeftSidebar;
