import { useState, useEffect, useRef } from "react";
import React from "react";
import components from "../../lib";
const {
  Button,
  TextArea,
  Label,
  Input,
  Select,
  Div,
} = components;
import { ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Grid } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addElement, addChild, removeChild, setPosition } from "../../Store/webElementSlice";
import RelativeChildrenTest from "../../test/RelativeChildrenTest";

const LeftSidebar = ({
  sidebarOpen,
  toggleSidebar,
  toggleRight,
  setId,
}) => {
  const evalCounter = (webElements) => {
    let val = 0;
    Object.keys(webElements).forEach((key) => {
      const parsedKey = parseInt(key, 10);  // Convert string to integer using base 10
      if (!isNaN(parsedKey) && parsedKey >= val) {
        val = parsedKey + 1;
      }
    });
    return val;
  };
  
  const [showComponents, setShowComponents] = useState(true); // New state to toggle sections
  const [showElements, setShowElements] = useState(true); // State to toggle elements
  const webElements = useSelector(state=>state.webElement.present);
  const webElementsRef = useRef(webElements);
  const [counter, setCounter] = useState(evalCounter(webElements));

  useEffect(() => {
    webElementsRef.current = webElements;
  }, [webElements]);

  const dispatch = useDispatch();

  // FUTURE: Move this to a separate file

  const onDragStart = (event, elementId) => {
    event.stopPropagation();
    console.log("Dragging.... ", elementId);
    const rect = event.currentTarget.getBoundingClientRect();
    
    // Calculate the offset between the mouse position and the top-left corner of the element
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    
    // Store both the element ID and the offset in dataTransfer
    event.dataTransfer.setData("text/plain", JSON.stringify({
      id: elementId,
      offsetX,
      offsetY
    }));
    event.dataTransfer.effectAllowed = "move";
  };
  
  const onDragEnter = (event, targetId) => {
    event.preventDefault(); // Allow the drop by preventing default behavior
    console.log("Entered:", targetId);
  };
  
  const onDragOver = (event, targetId) => {
    event.preventDefault(); // Allow the drop by preventing default behavior
    console.log("Dragging over:", targetId);
  };
  
  const onDragLeave = (event, targetId) => {
    console.log("Left:", targetId);
  };
  
  const onDrop = (event, targetId) => {
    event.preventDefault();
  
    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    const { id: draggedElementId, offsetX, offsetY } = data;

    if (draggedElementId === targetId) return;

    event.stopPropagation();

    const element = webElementsRef.current[draggedElementId];
    const target = webElementsRef.current[targetId];

    if (element && target) {
      // Get the bounding box of the drop target (main canvas or div)
      const rect = event.currentTarget.getBoundingClientRect();
      
      // Calculate the new position based on the drop location and offset
      const dx = event.clientX - rect.left - offsetX;
      const dy = event.clientY - rect.top - offsetY;

      // Handle parent-child relationship
      if (element.parent) {
        dispatch(removeChild({ id: element.parent, child: draggedElementId }));
      }
      dispatch(addChild({ id: targetId, child: draggedElementId }));
    }
  
    console.log("Dropped on:", targetId);
  };

  const canvasEvents = (id, container) => {
    const dragTarget = container ? {
      onDragEnter: (event) => onDragEnter(event, id),
      onDragOver: (event) => onDragOver(event, id),
      onDragLeave: (event) => onDragLeave(event, id),
      onDrop: (event) => onDrop(event, id),
    } : {};
    return {
      onDragStart: (event) => onDragStart(event, id),
      ...dragTarget,
    }
  }

  const sidebarElements = {
    "Button": (hash) => Button(hash, canvasEvents),
    "TextField": (hash) => TextArea(hash, canvasEvents),
    "Dropdown": (hash) => Select(hash, ["Option 1", "Option 2", "Option 3"], canvasEvents),
    "Label": (hash) => Label(hash, "New Label Text", canvasEvents),
    "Input": (hash) => Input(hash, canvasEvents),
    "Div": (hash) => Div(hash, canvasEvents),
  }

  return (
    <div className="relative">
      <RelativeChildrenTest canvasEvents={canvasEvents} />
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
                  {Object.keys(sidebarElements).map((element) => {
                    return (
                      <button
                        onClick={() => {
                          let id = counter + 1;
                          let hash = id.toString();
                          setCounter((prevCounter) => prevCounter + 1);
                          dispatch(addElement({hash:hash,value:sidebarElements[element](hash)}))
                        }}
                        key={element}
                      >
                        {element}
                      </button>
                    );
                  })}
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
