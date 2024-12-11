import React, { useState } from "react";
import { Folder, Trash2, Edit, Users, Settings } from "lucide-react";
import ProjectSettingsModal from "./ProjectSettingsModal";
import CombinedProjectModal from "./CombinedModal"; // Import the combined modal

// Delete Confirmation Modal
const DeleteProjectModal = ({ isOpen, onClose, onConfirm, project }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold text-red-600">Are you sure?</h3>
        <p className="text-red-500 mt-4">
          Do you really want to delete the project <strong>{project.name}</strong>? This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm(project._id);
              onClose();
            }}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, onDelete, onClick, onUpdate, toast }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCombinedModalOpen, setIsCombinedModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsSettingsOpen(true);
  };

  const handleCombinedModalClick = (e) => {
    e.stopPropagation();
    setIsCombinedModalOpen(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const closeSettingsModal = () => {
    setIsSettingsOpen(false);
  };

  const closeCombinedModal = () => {
    setIsCombinedModalOpen(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false); // Close the delete modal
  };

  return (
    <div className="relative p-6 transition-shadow border border-red-200 rounded-lg h-72 hover:shadow-lg group">
      <button
        onClick={handleDeleteClick}
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

      <button
        onClick={handleCombinedModalClick}
        className="absolute p-2 text-red-700 transition-opacity top-4 right-20 hover:text-green-600 group-hover:opacity-100"
      >
        <Settings className="w-5 h-5" />
      </button>

      <div onClick={() => onClick(project._id)} className="cursor-pointer">
        <div className="flex items-center justify-center w-12 h-12 mb-4 bg-red-100 rounded-full">
          <Folder className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-red-800">{project.name}</h3>
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

      {/* Conditional Rendering for Modals */}
      {isSettingsOpen && (
        <ProjectSettingsModal
          project={project}
          onClose={closeSettingsModal}
          onUpdate={onUpdate}
        />
      )}

      {isCombinedModalOpen && (
        <CombinedProjectModal
          project={project}
          onClose={closeCombinedModal}
          onUpdate={onUpdate}
          toast={toast}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteProjectModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={onDelete}
        project={project}
      />
    </div>
  );
};

export default ProjectCard;
