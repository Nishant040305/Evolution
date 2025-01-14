import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react'; // Import eye icons

const ProjectOverview = ({
  webElements,
  setId,
  toggleRight,
  setStatusCode,
  handleDelete,
  handleViewChange,
}) => {
  const [expandedElements, setExpandedElements] = useState({}); // Track which elements are expanded

  // Toggle function for expanding/collapsing children
  const toggleExpand = (id) => {
    setExpandedElements((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Recursive function to render elements with their children
  const renderElement = (element) => {
    const hasChildren = element?.children && element?.children.length > 0; // Check if the element has children
    return (
      <div key={element.id} className="space-y-1 bg-white">
        <div className="flex items-center justify-between p-1 transition-all bg-white rounded-lg">
          <div className="flex items-center">
            {/* Arrow icon for expanding/collapsing */}
            {hasChildren && (
              <button
                onClick={() => toggleExpand(element.id)}
                className="mr-1 text-gray-600 hover:text-gray-800"
              >
                <span
                  className={`transform ${expandedElements[element.id] ? 'rotate-90' : ''}`}
                >
                  &#8594;
                </span>
              </button>
            )}
            {/* Element type and ID */}
            <button
              onClick={() => {
                setId(element.id);
                toggleRight(true);
                setStatusCode(0);
              }}
              className="text-gray-700 hover:text-blue-500"
            >
              {`${element.type} ${element.id}`}
            </button>
          </div>

          {/* Action buttons (Delete and Toggle View) */}
          <div className="flex items-center space-x-2">
            {/* Eye Icon for Toggling View */}
            <button
              onClick={() => handleViewChange(element.id, !element.view)} // Toggle view status
              className="p-1 text-gray-400 transition-all rounded-full hover:text-blue-500 hover:bg-blue-50"
            >
              {element.view ? (
                <Eye className="w-4 h-4" /> // Eye open icon for "on"
              ) : (
                <EyeOff className="w-4 h-4" /> // Eye off icon for "off"
              )}
            </button>

            {/* Delete Button */}
            <button
              onClick={() => {
                setId(0);
                handleDelete(element.id);
              }}
              className="p-1 text-gray-400 transition-all rounded-full hover:text-red-500 hover:bg-red-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Render children if the element is expanded */}
        {hasChildren && expandedElements[element.id] && (
          <div className="pl-4 space-y-2 border-l-2 border-gray-200">
            {element.children.map((child) => renderElement(webElements[child]))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Project Overview</h2>
      <div className="space-y-2">
        {/* Render top-level elements (without parents) */}
        {Object.entries(webElements)
          .filter(([index, value]) => !value.parent) // Filter out elements that have a parent
          .map(([index, value]) => renderElement(value))}
      </div>
    </div>
  );
};

export default ProjectOverview;
