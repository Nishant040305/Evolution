import { useState, useEffect } from "react";
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
  const webElements = useSelector((state) => state.webElement.present);
  const user = useSelector(state=>state.user.userInfo._id)
  const [counter, setCounter] = useState(evalCounter(webElements));
  const [imageToUpload,setImageToUpload] = useState({image:"",file:""})
  const [showMedia,setShowMedia] = useState(true);
  const imagesMedia = useSelector(state=>state.image)
  const dispatch = useDispatch();
  const startDrag = (event, elementId) => {
    event.preventDefault();
    const element = document.getElementById("canvas-element " + elementId);
    console.log("ELEMENT", element);
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

  const canvasEvents = (id) => {
    return {
      onMouseDown: (event) => startDrag(event, id),
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
          const responseData = await response.json();
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
    }
  };

  return (
    <div className="relative">
      <RelativeChildrenTest canvasEvents={canvasEvents} />
      {sidebarOpen == true ? (
        <div
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
                <>
                  <div>
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold flex flex-row">
                        <Grid className="w-4 h-4"></Grid> Elements
                      </h3>
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
                                dispatch(
                                  addElement({
                                    hash: hash,
                                    value: sidebarElements[element](hash),
                                  })
                                );
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
                  <h2 className="font-bold text-lg">Project Overview</h2>
                  <div className="components">
                    <div>Components</div>
                    {Object.entries(webElements).map(([index, value]) => (
                      <div
                        key={index}
                        onClick={() => {
                          setId(value.id);
                          toggleRight(true);
                        }}
                      >{`${value.type} ${value.id}`}</div>
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
          className=" z-10 p-2 transform  bg-white   absolute top-0"
        >
          {sidebarOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );
};

export default LeftSidebar;
