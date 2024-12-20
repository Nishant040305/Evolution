import React, { useState, useEffect } from "react";
import {
  Undo,
  Redo,
  Monitor,
  Tablet,
  Smartphone,
  Settings,
} from "lucide-react";
import { ActionCreators } from "redux-undo";
import { useDispatch, useSelector } from "react-redux";
import PublishPage from "../../hooks/PublishPage";
import { useNavigate } from "react-router-dom";
import url from "../../url.json";
import ConfirmationModal from "./ConfirmationModal";  // Import the ConfirmationModal

const TopBar = ({ setScreenSize, css, js, setStatusCode, toast, file }) => {
  const dispatch = useDispatch();
  const handleUndo = () => {
    dispatch(ActionCreators.undo());
  };
  const projectinfo = useSelector((state) => state.project);
  const navigate = useNavigate();
  const handleRedo = () => dispatch(ActionCreators.redo());
  const { preview, download, publish } = PublishPage({ css, js, toast });

  // Modal States
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const handlePreview = () => {
    setStatusCode(0);
    setIsPreviewModalOpen(true); // Open preview confirmation modal
  };

  const handleDownload = () => {
    setStatusCode(0);
    setIsDownloadModalOpen(true); // Open download confirmation modal
  };

  const handlePublish = () => {
    setStatusCode(0);
    setIsPublishModalOpen(true); // Open publish confirmation modal
  };

  const handleConfirmPreview = () => {
    preview();
  };

  const handleConfirmDownload = () => {
    download();
  };

  const handleConfirmPublish = () => {
    publish();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "z") {
        event.preventDefault();
        handleUndo();
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "y") {
        event.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-4 bg-white border-b h-14">
      <div className="flex items-center space-x-4">
        <h1
          className="text-xl font-semibold text-rose-800"
          onClick={() => navigate(url.LandingPage)}
        >
          Evolution
        </h1>
        <div className="flex space-x-2">
          <button
            className="p-2 rounded-lg hover:bg-rose-50"
            onClick={handleUndo}
          >
            <Undo className="w-5 h-5 text-gray-600" />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-rose-50"
            onClick={handleRedo}
          >
            <Redo className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      <div className="flex items-center mb-2 space-x-4 text-lg font-semibold text-rose-800">
        {projectinfo.name + " - " + file.name}
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(url.Settings)}
          className="p-2 rounded-full hover:bg-red-300"
        >
          <Settings className="w-5 h-5 text-black-600" />
        </button>
        <div className="flex p-1 border rounded-lg bg-rose-50">
          <button className="p-1 rounded hover:bg-white">
            <Monitor
              className="w-4 h-4"
              onClick={() => setScreenSize("desktop")}
            />
          </button>
          <button
            className="p-1 rounded hover:bg-white"
            onClick={() => setScreenSize("tablet")}
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            className="p-1 rounded hover:bg-white"
            onClick={() => setScreenSize("mobile")}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
        <button
          className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 rounded-lg text-rose-800"
          onClick={handlePreview}
        >
          Preview
        </button>
        <button
          className="px-3 py-1.5 bg-rose-100 hover:bg-rose-200 rounded-lg text-rose-800"
          onClick={handleDownload}
        >
          Download
        </button>
        <button
          className="px-3 py-1.5 bg-rose-800 text-white rounded-lg hover:bg-rose-900"
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onConfirm={handleConfirmPreview}
        title="Preview Project"
        message="Are you sure you want to preview this project? All changes will be saved."
      />
      <ConfirmationModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onConfirm={handleConfirmDownload}
        title="Download Project"
        message="Are you sure you want to download this project? All changes will be saved."
      />
      <ConfirmationModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onConfirm={handleConfirmPublish}
        title="Publish Project"
        message="Are you sure you want to publish this project? All changes will be saved."
      />
    </div>
  );
};

export default TopBar;
