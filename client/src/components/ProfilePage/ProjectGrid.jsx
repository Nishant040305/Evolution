import React from 'react';
import { 
  CodeBracketIcon,
  UserGroupIcon,
  CalendarIcon,
  ClockIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const ProjectGrid = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {projects.map(project => (
        <div 
          key={project.id}
          className="bg-[#161B22] p-4 rounded-lg border border-[#30363D] hover:border-[#58A6FF] transition-colors"
        >
          <div className="flex flex-col gap-3">
            {/* Title and Contributors */}
            <div className="flex items-center gap-2">
              <CodeBracketIcon className="w-4 h-4 text-[#58A6FF]" />
              <h3 className="font-semibold text-[#C9D1D9]">{project.name}</h3>
              {project.contributors && (
                <div className="flex items-center gap-1 ml-2 text-xs text-[#8B949E]">
                  <UserGroupIcon className="w-3.5 h-3.5" />
                  <span>{project.contributors}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-[#8B949E] line-clamp-2 mb-2">
              {project.description}
            </p>

            {/* Metadata Row */}
            <div className="flex items-center gap-4 text-xs text-[#8B949E]">
              <div className="flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>
                  {new Date(project.createdOn).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: '2-digit'
                  })}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <ClockIcon className="w-3.5 h-3.5" />
                <span>
                  {new Date(project.lastModified).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short'
                  })}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <DocumentTextIcon className="w-3.5 h-3.5" />
                <span>v{project.versions}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGrid;