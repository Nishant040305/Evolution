import { useState, useEffect } from "react";
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
import { addElement, setElement, setPosition } from "../../Store/webElementSlice";

const LeftSidebar = ({
  sidebarOpen,
  toggleSidebar,
  toggleRight,
  setId,
}) => {
  const [counter, setCounter] = useState(1);
  const [showComponents, setShowComponents] = useState(true); // New state to toggle sections
  const [showElements, setShowElements] = useState(true); // State to toggle elements
  const webElements = useSelector(state=>state.webElement.present);
  const dispatch = useDispatch();
  const startDrag = (event, elementId) => {
    event.preventDefault();
    const element = document.getElementById(elementId);
    let startX = event.clientX;
    let startY = event.clientY;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
   
      dispatch(setPosition({id:elementId,dx:dx,dy:dy}))
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
    "Button": (hash) => Button(hash, startDrag),
    "TextField": (hash) => TextArea(hash, startDrag),
    "Dropdown": (hash) => Select(hash, ["Option 1", "Option 2", "Option 3"], startDrag),
    "Label": (hash) => Label(hash, "New Label Text", startDrag),
    "Input": (hash) => Input(hash, "New Label Text", startDrag),
    "Div": (hash) => Div(hash, startDrag),
  }

  // test elements
  // const testElements = () => {
  //   const parentButton = Button("parentButton", startDrag);
  //   parentButton.content = "really long button text";
  //   const childLabel = Label("childLabel", "TEST", startDrag);
  //   parentButton.childrenId = [childLabel.id];
  //   childLabel.parent = parentButton.id;
  //   setWebElements((prev) => {
  //     return {
  //       ...prev,
  //       [parentButton.id]: parentButton,
  //       [childLabel.id]: childLabel,
  //     };
  //   });

  //   // div test
  //   const div = Div("div", startDrag);
  //   const childofdiv = Label("childofdiv", "HELLO", startDrag);
  //   div.childrenId = [childofdiv.id];
  //   childofdiv.parent = div.id;
  //   childofdiv.position.x = 15;
  //   childofdiv.position.y = 15;
  //   setWebElements((prev) => {
  //     return {
  //       ...prev,
  //       [div.id]: div,
  //       [childofdiv.id]: childofdiv,
  //     };
  //   });
  // };

  return (
    <div className="relative">
      {/* <button onClick={testElements}>Children TEST</button> */}
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
