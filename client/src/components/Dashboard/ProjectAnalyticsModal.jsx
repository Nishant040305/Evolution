import React from "react";
import { X } from "lucide-react";

const ProjectAnalyticsModal = ({ isOpen, onClose, project }) => {
  if (!isOpen) return null;

  // Dummy data for project analytics
  const dummyData = {
    projectViews: 150, // Number of views for the project
    dateCreated: project.createdAt
      ? new Date(project.createdAt).toLocaleDateString()
      : "N/A", // Formatting the created date
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg">
        <button
          onClick={onClose}
          className="absolute text-gray-500 right-4 top-4 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Project Analytics
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Project Name:</span>
            <span>{project.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Project Views:</span>
            <span>{dummyData.projectViews}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Date Created:</span>
            <span>{dummyData.dateCreated}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalyticsModal;
