import React, { useState } from "react";
import ApiDashboard from "../../scripts/API.Dashboard";

const ProjectSettingsModal = ({ project, onClose, onUpdate }) => {
  const [updatedProject, setUpdatedProject] = useState({
    name: project.name,
    description: project.description,
  });
  const API = new ApiDashboard();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProject((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = () => {
    console.log({...project,...updatedProject})
    API.updateProject(project._id, updatedProject);
    onUpdate(project._id,updatedProject);
    onClose();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black-200 z-50">
      <div className="w-full max-w-lg p-6 rounded-lg shadow-lg bg-red-50 z-60">
        <h2 className="mb-4 text-lg font-semibold text-red-800">
          Project Settings
        </h2>

        <input
          type="text"
          name="name"
          value={updatedProject.name}
          onChange={handleInputChange}
          placeholder="Project Name"
          className="w-full p-2 mb-4 text-red-800 border border-red-300 rounded-md"
        />

        <textarea
          name="description"
          value={updatedProject.description}
          onChange={handleInputChange}
          placeholder="Project Description"
          className="w-full p-2 mb-4 text-red-800 border border-red-300 rounded-md"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-red-600 bg-red-100 rounded-md hover:bg-red-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectSettingsModal;
