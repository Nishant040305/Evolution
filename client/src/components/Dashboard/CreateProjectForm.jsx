import React, { useState } from "react";

const CreateProjectForm = ({ onCreateProject }) => {
  const [newProject, setNewProject] = useState({ name: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newProject.name.trim()) {
      onCreateProject({ ...newProject, createdAt: new Date().toISOString() });
      setNewProject({ name: "", description: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="mb-4 text-lg font-semibold text-red-600">
        Create New Project
      </h2>
      <input
        type="text"
        value={newProject.name}
        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
        placeholder="Project Name"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      <textarea
        value={newProject.description}
        onChange={(e) =>
          setNewProject({ ...newProject, description: e.target.value })
        }
        placeholder="Project Description"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      <button
        type="submit"
        className="w-full py-2 mt-4 text-white transition-colors bg-red-600 rounded-md hover:bg-red-700"
      >
        Create Project
      </button>
    </form>
  );
};

export default CreateProjectForm;
