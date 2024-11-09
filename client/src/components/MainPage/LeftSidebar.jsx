import { useState, useEffect, useRef } from "react";
import React from "react";
import components from "../../lib";
import server from "../../server.json";
import axios from "axios";
const { Button, TextArea, Label, Input, Select, Div,Anchor,Article,Section,Nav,Footer,Header } = components;
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

const LeftSidebar = ({
  sidebarOpen,
  toggleSidebar,
  toggleRight,
  setStatusCode,
  setId,
}) => {
  const BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
  const { projectID } = useParams();
  const dispatch = useDispatch();

  // States
  const [showComponents, setShowComponents] = useState(true);
  const [showElements, setShowElements] = useState(true);
  const [showMedia, setShowMedia] = useState(true);
  const [imageToUpload, setImageToUpload] = useState({ image: "", file: "" });
  const [isDraggingImage, setIsDraggingImage] = useState(false);

  // Selectors
  const webElements = useSelector((state) => state.webElement.present);
  const imagesMedia = useSelector((state) => state.image);
  const user = useSelector((state) => state.user.userInfo._id);

  // Refs
  const webElementsRef = useRef(webElements);
  const fileInputRef = useRef(null);

  // Counter logic
  const evalCounter = (webElements) => {
    let val = 0;
    Object.keys(webElements).forEach((key) => {
      const parsedKey = parseInt(key, 10);
      if (!isNaN(parsedKey) && parsedKey >= val) {
        val = parsedKey + 1;
      }
    });
    return val;
  };
  const [counter, setCounter] = useState(evalCounter(webElements));

  const { canvasEvents } = useCanvasEvents(setId, toggleRight, webElements);

  useEffect(() => {
    webElementsRef.current = webElements;
  }, [webElements]);

  const sidebarElements = {
    Button: (hash) => Button(hash, canvasEvents),
    TextField: (hash) => TextArea(hash, canvasEvents),
    Dropdown: (hash) =>
      Select(hash, ["Option 1", "Option 2", "Option 3"], canvasEvents),
    Label: (hash) => Label(hash, "New Label Text", canvasEvents),
    Input: (hash) => Input(hash, canvasEvents),
    Div: (hash) => Div(hash, canvasEvents),
    Anchor:(hash)=>Anchor(hash,canvasEvents),
    Article:(hash)=>Article(hash,canvasEvents),
    Section:(hash)=>Section(hash,canvasEvents),
    Nav:(hash)=>Nav(hash,canvasEvents),
    Footer:(hash)=>Footer(hash,canvasEvents), 
    Header:(hash)=>Header(hash,canvasEvents)  
  };

  const sidebarMedia = {
    ImageElement: (hash, image) =>
      ImageElement(hash, image, "Image", canvasEvents),
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!validImageTypes.includes(file.type)) {
      alert("Please upload a JPG or PNG image.");
      return;
    }

    const maxSizeInBytes = 200 * 1024;
    if (file.size > maxSizeInBytes) {
      alert("Image must be under 200KB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageToUpload({ file, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleEditSubmit = async () => {
    try {
      if (!imageToUpload.file) return;

      const formData = new FormData();
      formData.append("file", imageToUpload.file);

      const response = await axios.post(
        `${BACKWEB}${server.Project.MediaUpdate}${projectID}`,
        formData
      );

      if (response.status === 200) {
        dispatch(setImagesMedia(response.data.url));
        setImageToUpload({ image: "", file: "" });
        alert("Image uploaded successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload image. Please try again.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingImage(true);
  };

  const handleDragLeave = () => {
    setIsDraggingImage(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingImage(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      const fakeEvent = { target: { files: [file] } };
      handleImageChange(fakeEvent);
    }
  };

  return (
    <div className="relative h-full">
      {sidebarOpen ? (
        <div className="h-full transition-all duration-300 bg-white border-r shadow-lg w-72">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-red-50">
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                  setShowComponents(true)
                  setStatusCode(0)
                }}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    showComponents
                      ? "bg-red-500 text-white"
                      : "text-gray-600 hover:bg-red-100"
                  }`}
                >
                  Components
                </button>
                <button
                  onClick={() => {
                  setShowComponents(false)
                  setStatusCode(0)
                }}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    !showComponents
                      ? "bg-red-500 text-white"
                      : "text-gray-600 hover:bg-red-100"
                  }`}
                >
                  Project
                </button>
              </div>
              <button
                onClick={toggleSidebar}
                className="p-2 transition-all rounded-full hover:bg-red-100"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 space-y-6 overflow-y-auto">
              {showComponents ? (
                <>
                  {/* Elements Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="flex items-center text-sm font-semibold text-gray-700">
                        <Grid className="w-4 h-4 mr-2" />
                        Elements
                      </h3>
                      <button
                        onClick={() => setShowElements((prev) => !prev)}
                        className="p-1 transition-all rounded-full hover:bg-red-100"
                      >
                        {showElements ? (
                          <ChevronUp className="w-4 h-4 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </div>

                    {showElements && (
                      <div className="grid grid-cols-2 gap-2">
                        {Object.keys(sidebarElements).map((element) => (
                          <button
                            key={element}
                            onClick={() => {
                              setStatusCode(0);
                              const id = counter + 1;
                              const hash = id.toString();
                              setCounter((prev) => prev + 1);
                              dispatch(
                                addElement({
                                  hash: hash,
                                  value: sidebarElements[element](hash),
                                })
                              );
                            }}
                            className="px-3 py-2 text-sm text-gray-700 transition-all bg-white border border-gray-100 rounded-lg shadow-sm hover:bg-red-50"
                          >
                            {element}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Media Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="flex items-center text-sm font-semibold text-gray-700">
                        <Image className="w-4 h-4 mr-2" />
                        Media
                      </h3>
                      <button
                        onClick={() => setShowMedia((prev) => !prev)}
                        className="p-1 transition-all rounded-full hover:bg-red-100"
                      >
                        {showMedia ? (
                          <ChevronUp className="w-4 h-4 text-gray-600" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-600" />
                        )}
                      </button>
                    </div>

                    {showMedia && (
                      <div className="space-y-3">
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          className={`border-2 border-dashed rounded-lg p-4 text-center transition-all ${
                            isDraggingImage
                              ? "border-red-500 bg-red-50"
                              : "border-gray-300 hover:border-red-400"
                          }`}
                        >
                          <input
                            type="file"
                            onChange={handleImageChange}
                            className="hidden"
                            ref={fileInputRef}
                            accept="image/png,image/jpeg,image/jpg"
                          />
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex flex-col items-center w-full space-y-2 text-gray-500 hover:text-red-500"
                          >
                            <Upload className="w-6 h-6" />
                            <span className="text-sm">Click to Upload</span>
                          </button>
                        </div>

                        {imageToUpload.image && (
                          <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
                            <img
                              src={imageToUpload.image}
                              alt="Preview"
                              className="object-cover w-16 h-16 rounded"
                            />
                            <button
                              onClick={handleEditSubmit}
                              className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all text-sm"
                            >
                              Upload
                            </button>
                          </div>
                        )}

                        <div className="grid grid-cols-3 gap-2">
                          {imagesMedia.map((element, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                setStatusCode(0);
                                const id = counter + 1;
                                const hash = id.toString();
                                setCounter((prev) => prev + 1);
                                dispatch(
                                  addElement({
                                    hash: hash,
                                    value: sidebarMedia.ImageElement(
                                      hash,
                                      element
                                    ),
                                  })
                                );
                              }}
                              className="relative cursor-pointer group"
                            >
                              <img
                                src={element}
                                alt={`Media ${index + 1}`}
                                className="object-cover w-full h-20 transition-all rounded-lg shadow-sm hover:shadow-md"
                              />
                              <div className="absolute inset-0 flex items-center justify-center transition-all bg-opacity-0 rounded-lg group-hover:bg-opacity-20">
                                <Plus className="w-6 h-6 text-white transition-all opacity-0 group-hover:opacity-100" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

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
              ) : (
                // Project Overview
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Project Overview
                  </h2>
                  <div className="space-y-2">
                    {Object.entries(webElements).map(([index, value]) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 transition-all bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md"
                      >
                        <button
                          onClick={() => {
                            setId(value.id);
                            toggleRight(true);
                            setStatusCode(0);
                          }}
                          className="text-gray-700 hover:text-red-500"
                        >
                          {`${value.type} ${value.id}`}
                        </button>
                        <button
                          onClick={() => {
                            setId(0);
                            dispatch(deleteElement(value.id));
                          }}
                          className="p-1 text-gray-400 transition-all rounded-full hover:text-red-500 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LeftSidebar;
