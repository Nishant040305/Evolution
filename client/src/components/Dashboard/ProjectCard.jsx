import React from "react";
import { Folder, Trash2 } from "lucide-react";

const ProjectCard = ({ project, onDelete, onClick }) => (
  <div className="relative h-64 p-6 transition-shadow bg-white border border-gray-200 rounded-lg hover:shadow-lg group">
    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete(project._id);
      }}
      className="absolute p-2 text-gray-700 transition-opacity top-4 right-4 hover:text-red-600 group-hover:opacity-100"
    >
      <Trash2 className="w-5 h-5" />
    </button>
    <div onClick={() => onClick(project._id)} className="cursor-pointer">
      <div className="flex items-center justify-center w-12 h-12 mb-4 bg-red-100 rounded-full">
        <Folder className="w-6 h-6 text-red-600" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">{project.name}</h3>
      <p className="mb-4 text-gray-600">{project.description}</p>
      <p className="text-sm text-gray-400">
        Created: {new Date(project.createdAt).toLocaleDateString()}
      </p>
    </div>
  </div>
);

export default ProjectCard;
