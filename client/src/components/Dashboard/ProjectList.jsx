import React from 'react';
import ProjectCard from './ProjectCard';
import { useSelector } from 'react-redux';
const ProjectList = ({
  isSharedView,
  filteredProjects,
  sharedFilteredProjects,
  onCreate,
  onDelete,
  onUpdate,
  onProjectClick,
  isLoading,
  toast,
}) => {
  const userId = useSelector((state) => state.user.userInfo._id);
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <button
        onClick={onCreate}
        className="flex flex-col items-center justify-center h-64 gap-4 p-6 transition-colors bg-white border-2 border-red-300 border-dashed rounded-lg cursor-pointer hover:border-red-500"
      >
        Create New Project
      </button>
      {isLoading ? (
        <div className="col-span-3 py-12 text-center">Loading projects...</div>
      ) : (
        (isSharedView ? sharedFilteredProjects : filteredProjects).map(
          (project) =>
            project && (
              <ProjectCard
                key={project._id}
                project={project}
                onDelete={onDelete}
                onClick={onProjectClick}
                onUpdate={onUpdate}
                toast={toast}
                isShared={
                  isSharedView
                    ? project.members.find((member) => member.user === userId)
                        .role
                    : 'owner'
                }
              />
            )
        )
      )}
    </div>
  );
};

export default ProjectList;
