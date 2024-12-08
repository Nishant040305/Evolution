import { useState } from "react";
import { X } from "lucide-react"; // Import X icon (or use any icon library)

const ProjectOverview = ({ webElements, setId, toggleRight, setStatusCode, handleDelete }) => {
  const [expandedElements, setExpandedElements] = useState({}); // Track which elements are expanded
    console.log(webElements)
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
        <div
          className="flex items-center justify-between p-1 transition-all bg-white   rounded-lg "
        >
          <div className="flex items-center">
            {/* Arrow icon */}
            {hasChildren && (
              <button
                onClick={() => toggleExpand(element.id)}
                className="mr-1 text-gray-600 hover:text-gray-800"
              >
                <span className={`transform ${expandedElements[element.id] ? "rotate-90" : ""}`}>
                  &#8594;
                </span>
              </button>
            )}
            <button
              onClick={() => {
                setId(element.id);
                toggleRight(true);
                setStatusCode(0);
              }}
              className="text-gray-700 hover:text-red-500"
            >
              {`${element.type} ${element.id}`}
            </button>
          </div>
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

        {/* Render children if the element is expanded */}
        {hasChildren && expandedElements[element.id] && (
          <div className="pl-1 space-y-2"> {/* Indented for nested children */}
            {/* Recursively render children */}
            {
                console.log(element.children)
            }
            {element.children.map((child) => renderElement(webElements[child]))} {/* Recursively render children */}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Project Overview</h2>
      <div className="space-y-2">
        {Object.entries(webElements)
          .filter(([index, value]) => !value.parent)  // Filter out elements that have a parent
          .map(([index, value]) => (
            renderElement(value) // Render the element recursively
          ))}
      </div>
    </div>  
  );
};

export default ProjectOverview;
