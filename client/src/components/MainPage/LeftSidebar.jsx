import { useState, useEffect, useRef } from "react";
import React from "react";
import components from "../../lib";
import server from "../../server.json"
import axios from "axios"
const { Button, TextArea, Label, Input, Select, Div } = components;
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Grid,
  Image,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addElement,
  setElement,
  setPosition,
  addChild,
  removeChild
} from "../../Store/webElementSlice";
import RelativeChildrenTest from "../../test/RelativeChildrenTest";
import ImageElement from "../../lib/img.component";
import { setImagesMedia } from "../../Store/imageSlice";
import { useParams } from "react-router-dom";
const LeftSidebar = ({ sidebarOpen, toggleSidebar, toggleRight, setId }) => {
  let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
  const evalCounter = (webElements) => {
    let val = 0;
    Object.keys(webElements).forEach((key) => {
      const parsedKey = parseInt(key, 10); // Convert string to integer using base 10
      if (!isNaN(parsedKey) && parsedKey >= val) {
        val = parsedKey + 1;
      }
    });
    return val;
  };
  const {projectID} = useParams();
  const [showComponents, setShowComponents] = useState(true); // New state to toggle sections
  const [showElements, setShowElements] = useState(true); // State to toggle elements
  const webElements = useSelector(state=>state.webElement.present);
  const webElementsRef = useRef(webElements);
  const [counter, setCounter] = useState(evalCounter(webElements));
  const user = useSelector(state=>state.user.userInfo._id)
  const [imageToUpload,setImageToUpload] = useState({image:"",file:""})
  const [showMedia,setShowMedia] = useState(true);
  const imagesMedia = useSelector(state=>state.image)

  useEffect(() => {
    webElementsRef.current = webElements;
  }, [webElements]);

  const dispatch = useDispatch();

  // FUTURE: Move this to a separate file

  const onDragStart = (event, elementId) => {
    const handleClick = ()=>{
      setId(elementId);
      toggleRight(true);
    }
    document.getElementById(`canvas-element ${elementId}`).addEventListener("click",handleClick)
    event.stopPropagation();
    console.log("Dragging.... ", elementId);
    setId(elementId);
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

    event.stopPropagation(); // Stop propagating as target found

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

  const openProperties = (event, elementId) => {
    setId(elementId);
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
      onClick: (event) => openProperties(event, id),
      ...dragTarget,
    };
  };

  const sidebarElements = {
    Button: (hash) => Button(hash, canvasEvents),
    TextField: (hash) => TextArea(hash, canvasEvents),
    Dropdown: (hash) =>
      Select(hash, ["Option 1", "Option 2", "Option 3"], canvasEvents),
    Label: (hash) => Label(hash, "New Label Text", canvasEvents),
    Input: (hash) => Input(hash, canvasEvents),
    Div: (hash) => Div(hash, canvasEvents),
  };

  const sidebarMedia={
    ImageElement:(hash,image)=>ImageElement(hash,image,"Image",canvasEvents)
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
      if (!validImageTypes.includes(file.type)) {
        alert('Invalid file type. Please upload an image (jpg or png).');
        return;
      }

      const maxSizeInBytes = 200 * 1024;
      if (file.size > maxSizeInBytes) {
        alert('File size exceeds 200KB. Please upload a smaller image.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const previewUrl = reader.result;
        setImageToUpload({ file, image: previewUrl });
      };
      reader.readAsDataURL(file);

      
    }
  };

  const handleEditSubmit = async () => {
    try {
      if (imageToUpload.file) {
        const formData = new FormData();
        formData.append('file', imageToUpload.file);
        const response = await axios.post(`${BACKWEB}${server.Project.MediaUpdate}${projectID}`,formData);

        if (response.status==200) {
          const responseData = await response.data;
          const newImageUrl = responseData.url;
          dispatch(setImagesMedia(newImageUrl));
          setImageToUpload({ image: "", file: "" });
          alert("Image Uploaded Successfully");
        } else {

          throw new Error('Image upload failed');
        }
      }
    } catch (error) {
      console.error(error);
      alert('There was an error uploading the image');
    }}

  return (
    <div className="relative">
      {/* <RelativeChildrenTest canvasEvents={canvasEvents} /> */}
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
                <>
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
                <div>
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold flex flex-row">
                        <Image className="w-4 h-4"></Image> Media
                      </h3>
                      <button onClick={() => setShowMedia((prev) => !prev)}>
                        {showElements ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {showMedia && (
                      <div className="Elements transition-all duration-300 flex flex-row mt-2 items-start flex-wrap">
                                  <input type="file" onChange={handleImageChange} />
                                  <button onClick={handleEditSubmit}>Upload</button>

                        {imagesMedia.map((element, index) => {
                            return (
                              <img
                                src={element}
                                className="w-20 h-20 m-1"
                                onClick={() => {
                                  let id = counter + 1;
                                  let hash = id.toString();
                                  setCounter((prevCounter) => prevCounter + 1);
                                  dispatch(
                                    addElement({
                                      hash: hash,
                                      value: sidebarMedia.ImageElement(hash, element),
                                    })
                                  );
                                }}
                                key={index}
                              />
                            );
                          })}
                      </div>
                    )}
                  </div>
                  </>
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
