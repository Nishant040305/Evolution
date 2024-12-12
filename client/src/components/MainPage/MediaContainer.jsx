import React, { useState, useRef } from "react";
import { Upload, Plus, ChevronUp, ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { addElement } from "../../Store/webElementSlice";
import { setImagesMedia } from "../../Store/imageSlice";
import server from "../../server.json";
import axios from "axios"
const MediaSection = ({
  toast,
  imagesMedia,
  sidebarMedia,
  projectID,
  setCounter,
  counter,
}) => {
  const [showMedia, setShowMedia] = useState(true);
  const [imageToUpload, setImageToUpload] = useState({ image: "", file: "" });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const fileInputRef = useRef(null);
  const BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!validImageTypes.includes(file.type)) {
      toast.error("Please upload a JPG or PNG image.");
      return;
    }

    const maxSizeInBytes = 2000 * 1024;
    if (file.size > maxSizeInBytes) {
      toast.error("Image must be under 200KB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageToUpload({ file, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", imageToUpload.file);

      const response = await axios.post(
        `${BACKWEB}${server.Project.MediaUpdate}${projectID}`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
            setTotalProgress(percent);
          },
        }
      );

      if (response.status === 200) {
        dispatch(setImagesMedia(response.data.url));
        setImageToUpload({ image: "", file: "" });
        setUploadProgress(0);
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image. Please try again.");
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
    <div className="space-y-3 " >
      <div className="flex items-center justify-between">
        <h3 className="flex items-center text-sm font-semibold text-gray-700">
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
        <>
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
              className="hidden "
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
            <div className="relative flex flex-col items-center p-2">
              <img
                src={imageToUpload.image}
                alt="Preview"
                className="object-cover w-20 h-20 rounded"
              />
              <button
                onClick={handleUpload}
                className="px-3 py-1.5 mt-3 bg-blue-500 text-white rounded-md hover:bg-red-600 transition-all w-full text-sm"
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
                  const id = counter + 1;
                  const hash = id.toString();
                  setCounter((prev) => prev + 1);
                  dispatch(
                    addElement({
                      hash: hash,
                      value: sidebarMedia.ImageElement(hash, element),
                    })
                  );
                }}
                className="relative cursor-pointer group"
              >
                <img
                  src={element}
                  alt={`Media ${index + 1}`}
                  className="object-cover w-full h-20 rounded-lg shadow-sm hover:shadow-md"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-all bg-opacity-0 rounded-lg group-hover:bg-opacity-20">
                  <Plus className="w-6 h-6 text-white transition-all opacity-0 group-hover:opacity-100" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MediaSection;
