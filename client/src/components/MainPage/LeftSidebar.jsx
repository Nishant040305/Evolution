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
  Code,
  Palette,
  X
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addElement,
  setElement,
  setPosition,
  addChild,
  removeChild,
  deleteElement
} from "../../Store/webElementSlice";
import RelativeChildrenTest from "../../test/RelativeChildrenTest";
import ImageElement from "../../lib/img.component";
import { setImagesMedia } from "../../Store/imageSlice";
import { useParams } from "react-router-dom";
import { useCanvasEvents } from "../../hooks/DragDrop";
const LeftSidebar = ({ sidebarOpen, toggleSidebar, toggleRight, setStatusCode,setId }) => {
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
  const { canvasEvents } = useCanvasEvents(setId, toggleRight, webElements);
 

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
          className={`w-64 transition-all duration-300 border-r bg-white h-full overflow-hidden shadow-lg`}
          style={{ backgroundColor: "#FFE5E5" }} // Light red background
        >
          <div className=" p-4 ">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => {
                  setShowComponents(true)
                  setStatusCode(0)
                }}
                className={`p-2 ${
                  showComponents ? "font-bold text-red-500" : "text-gray-600"
                } `}
              >
                Components
              </button>
              <button
                onClick={() => {
                  setShowComponents(false)
                  setStatusCode(0)
                }}

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
                            setStatusCode(0)
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
                <div onClick={()=>setStatusCode(0)}>
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
                                  setStatusCode(0)
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
                  <div className="flex items-center justify-between mb-2" onClick={()=>{
                    setStatusCode(1);
                    toggleRight(false);
                    }}>
                    <h3 className="flex items-center text-sm font-semibold ">
                      <Code className="w-4 h-4 mr-1" />
                      JavaScript
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mb-2"  onClick={()=>{
                    setStatusCode(2);
                    toggleRight(false);
                    }}>
                    <h3 className="flex items-center text-sm font-semibold">
                      <Palette className="w-4 h-4 mr-1" />
                      Style CSS3
                    </h3>
                  </div>
                  </>
              ) : (
                <div className="project-overview">
                  <h2 className="mb-3 text-lg font-bold text-red-500">
                    Project Overview
                  </h2>
                  <div className="space-y-2 components">
                    {Object.entries(webElements).map(([index, value]) => (
                      <div className="p-2 text-gray-700 transition duration-150 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-red-50 flex flex-row justify-between">
                      <div
                        key={index}
                        onClick={() => {
                          setId(value.id);
                          toggleRight(true);
                          setStatusCode(0)
                        }}

                        className=""
                      >
                        {`${value.type} ${value.id}`}
                      </div>
                      <button onClick={()=> {
                        setId(0)
                        dispatch(deleteElement(value.id))}}><X ></X></button>
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
