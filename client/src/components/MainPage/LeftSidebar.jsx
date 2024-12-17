import { useState, useEffect, useRef } from "react";
import React from "react";
import components from "../../lib";
import server from "../../server.json";
import axios from "axios";
import { viewChange } from "../../Store/webElementSlice";
const { Button, TextArea, Label, Input, Select, Div, Anchor, Article, Section, Nav, Footer, Header, H1, H2, H3, H4, H5, H6, Paragraph } = components;
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Grid,
  Image,
  Code,
  Palette,
  X,
  Upload,
  Plus,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addElement,
  setElement,
  setPosition,
  addChild,
  removeChild,
  deleteElement,
} from "../../Store/webElementSlice";
import ImageElement from "../../lib/img.component";
import { setImagesMedia } from "../../Store/imageSlice";
import { useParams } from "react-router-dom";
import { useCanvasEvents } from "../../hooks/DragDrop";
import ProjectOverview from "./ProjectOverview";
import ElementContainer from "./ElementContainer";
import MediaSection from "./MediaContainer";
import ProjectFileSideBar from "./ProjectFileSideBar";
const LeftSidebar = ({
  toggleRight,
  setStatusCode,
  toast,
  setId,
  file,
  setFile,
}) => {
  const { projectID } = useParams();
  const dispatch = useDispatch();

  // States
  const [currentTab, setCurrentTab] = useState("components"); // Track active section
  const [showElements, setShowElements] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Selectors
  const webElements = useSelector((state) => state.webElement.present);
  const imagesMedia = useSelector((state) => state.image);

  // Refs
  const webElementsRef = useRef(webElements);

  // Counter logic
  const evalCounter = (webElements) => {
    let val = 0;
    Object.keys(webElements).forEach((key) => {
      const parsedKey = parseInt(key, 10);
      if (!isNaN(parsedKey) && parsedKey >= val) {
        val = parsedKey + 1;
      }
    });
    console.log("COUNTER", val);
    return val;
  };
  const [counter, setCounter] = useState(evalCounter(webElements));
  const handleDelete = (id) => {
    dispatch(deleteElement(id));
  }
  const { canvasEvents } = useCanvasEvents(setId, toggleRight, webElements);

  useEffect(() => {
    webElementsRef.current = webElements;
  }, [webElements]);

  const sidebarElements = {
    Button: (hash) => Button(hash, canvasEvents),
    TextField: (hash) => TextArea(hash, canvasEvents),
    Dropdown: (hash) =>
    Select(hash, [{ value: 'option1', label: 'Option 1' },{ value: 'option2', label: 'Option 2' }], canvasEvents),
    Label: (hash) => Label(hash, "New Label Text", canvasEvents),
    Input: (hash) => Input(hash, canvasEvents),
    Div: (hash) => Div(hash, canvasEvents),
    Anchor:(hash)=>Anchor(hash,canvasEvents),
    Article:(hash)=>Article(hash,canvasEvents),
    Section:(hash)=>Section(hash,canvasEvents),
    Nav:(hash)=>Nav(hash,canvasEvents),
    Footer:(hash)=>Footer(hash,canvasEvents), 
    Header:(hash)=>Header(hash,canvasEvents),
    H1:(hash)=>H1(hash,canvasEvents),
    H2:(hash)=>H2(hash,canvasEvents),
    H3:(hash)=>H3(hash,canvasEvents),
    H4:(hash)=>H4(hash,canvasEvents),
    H5:(hash)=>H5(hash,canvasEvents),
    H6:(hash)=>H6(hash,canvasEvents),
    Paragraph:(hash)=>Paragraph(hash,canvasEvents)
  };

  const sidebarMedia = {
    ImageElement: (hash, image) =>
      ImageElement(hash, image, "Image", canvasEvents),
  };

  const handleMouseMove = (event) => {
    const { clientX } = event;
    if (clientX <= 50) {
      setIsVisible(true); // Show sidebar when mouse is near the left edge
    }
  };

  const handleSidebarLeave = () => {
    setIsVisible(false); // Hide sidebar when mouse leaves
  };
  const handleViewChange = (id,view) => {
    console.log(id,view);
    dispatch(viewChange({id:id,view:view}));
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div
      className="relative h-full"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={handleSidebarLeave}
    >
     {/* Sidebar logic */}
     <div
        className={`fixed top-0 left-0 bottom-0  bg-gray-100 border-r border-gray-300 transition-transform duration-300 transform ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        } z-10`}
      >
        <div className="flex flex-col h-full w-80">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-red-50">
            <div className="flex">
              <button
                onClick={() => setCurrentTab("components")}
                className={`px-2 py-1.5 rounded-md transition-all mr-1 ${
                  currentTab === "components"
                    ? "bg-red-500 text-white"
                    : "text-gray-600 hover:bg-red-100"
                }`}
              >
                Components
              </button>
              <button
                onClick={() => setCurrentTab("project")}
                className={`px-3 py-1.5 rounded-md transition-all mr-1 ${
                  currentTab === "project"
                    ? "bg-red-500 text-white"
                    : "text-gray-600 hover:bg-red-100"
                }`}
              >
                Elements
              </button>
              <button
                onClick={() => setCurrentTab("files")}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  currentTab === "files"
                    ? "bg-red-500 text-white"
                    : "text-gray-600 hover:bg-red-100"
                }`}
              >
                Files
              </button>
            </div>
          </div>


          {/* Content */}
          <div className="flex-1 p-4 space-y-6  overflow-y-auto">
            {currentTab === "components" ? (
              <>
                {/* Elements Section */}
                <ElementContainer showElements={showElements} setShowElements={setShowElements} sidebarElements={sidebarElements} setStatusCode={setStatusCode} dispatch={dispatch} counter={counter} setCounter={setCounter} addElement={addElement}/>
                {/* Media Section */}
                <MediaSection sidebarMedia={sidebarMedia} projectID={projectID} setCounter={setCounter} counter={counter} toast={toast} imagesMedia={imagesMedia} />
                {/* Additional Sections */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setStatusCode(1);
                      toggleRight(false);
                    }}
                    className="flex items-center w-full px-4 py-2 space-x-2 text-gray-700 transition-all rounded-lg hover:bg-red-50"
                  >
                    <Code className="w-4 h-4" />
                    <span>Custom JavaScript</span>
                  </button>

                  <button
                    onClick={() => {
                      setStatusCode(2);
                      toggleRight(false);
                    }}
                    className="flex items-center w-full px-4 py-2 space-x-2 text-gray-700 transition-all rounded-lg hover:bg-red-50"
                  >
                    <Palette className="w-4 h-4" />
                    <span>Style CSS3</span>
                  </button>
                </div>
              </>
            ) : currentTab === "project" ? (
              // Project Overview
              <ProjectOverview webElements={webElements} setId={setId} toggleRight={toggleRight} setStatusCode={setStatusCode} handleDelete={handleDelete} handleViewChange={handleViewChange} />
            ):  (
              <ProjectFileSideBar file={file} setFile={setFile} />
            ) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
