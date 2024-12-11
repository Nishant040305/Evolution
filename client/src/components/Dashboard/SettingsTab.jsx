import React,{useState} from "react";

const SettingsTab = ({ handleInputChange,handleKeywordChange,updatedProject,handleSave,handleCancel }) => {
  return (
      <div>
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
  
        <div className="mb-4">
          <label
            htmlFor="keywords"
            className="block mb-2 text-sm font-semibold text-red-800"
          >
            Keywords (for Website)
          </label>
          <input
            type="text"
            name="keywords"
            value={updatedProject.keywords.join(", ")}
            string
            onChange={handleKeywordChange}
            placeholder="Enter keywords, separated by commas"
            className="w-full p-2 mb-4 text-red-800 border border-red-300 rounded-md"
          />
          <p className="text-sm text-red-500">
            Enter keywords related to your project for better SEO optimization.
          </p>
        </div>
  
        <div className="mb-4">
          <label
            htmlFor="domain"
            className="block mb-2 text-sm font-semibold text-red-800"
          >
            Domain
          </label>
          <input
            type="text"
            name="domain"
            value={updatedProject.domain}
            onChange={handleInputChange}
            placeholder="Enter project domain"
            className="w-full p-2 mb-4 text-red-800 border border-red-300 rounded-md"
          />
        </div>
        <div className="flex justify-end mt-6 space-x-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Save
            </button>
          </div>
      </div>
  );
};

export default SettingsTab;