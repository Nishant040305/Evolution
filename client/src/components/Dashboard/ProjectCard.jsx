import React, { useState } from "react";
import { Folder, Trash2, Edit, Users } from "lucide-react";
import ProjectSettingsModal from "./ProjectSettingsModal"; // Assuming this is in the same folder

const ProjectCard = ({ project, onDelete, onClick, onUpdate }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsSettingsOpen(true);
  };

  const closeSettingsModal = () => {
    setIsSettingsOpen(false);
  };

  return (
    <div className="relative p-6 transition-shadow border border-red-200 rounded-lg h-72 hover:shadow-lg group">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(project._id);
        }}
        className="absolute p-2 text-red-700 transition-opacity top-4 right-4 hover:text-red-600 group-hover:opacity-100"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      <button
        onClick={handleEditClick}
        className="absolute p-2 text-red-700 transition-opacity top-4 right-12 hover:text-blue-600 group-hover:opacity-100"
      >
        <Edit className="w-5 h-5" />
      </button>

      <div onClick={() => onClick(project._id)} className="cursor-pointer">
        <div className="flex items-center justify-center w-12 h-12 mb-4 bg-red-100 rounded-full">
          <Folder className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-red-800">
          {project.name}
        </h3>
        <p className="mb-4 text-red-600 line-clamp-2">{project.description}</p>
        <p className="text-sm text-red-400">
          Created: {new Date(project.createdAt).toLocaleDateString()}
        </p>

        {project.collaborators && project.collaborators.length > 0 && (
          <div className="flex items-center mt-3 space-x-2">
            <Users className="w-4 h-4 text-red-500" />
            <p className="text-sm text-red-500">Collaborators:</p>
            {project.collaborators.map((collaborator, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs text-red-700 bg-red-200 rounded-md"
              >
                {collaborator.email}
              </span>
            ))}
          </div>
        )}
      </div>

      {isSettingsOpen && (
        <ProjectSettingsModal
          project={project}
          onClose={closeSettingsModal}
          onUpdate={onUpdate}
        />
      )}
    </div>
  );
};

export default ProjectCard;
