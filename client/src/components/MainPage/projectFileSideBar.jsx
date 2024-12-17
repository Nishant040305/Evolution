import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FileText, FileCode, Palette, MoreHorizontal } from "lucide-react";
import ApiDashboard from "../../scripts/API.Dashboard";

const ProjectFileSideBar = ({ file, setFile }) => {
  const { projectID } = useParams();
  const API = new ApiDashboard();

  const [files, setFiles] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchFiles = async () => {
      const projectComp = await API.getProjectById(projectID);
      const sortedFiles = projectComp.files.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setFiles(sortedFiles);
    };
    fetchFiles();
  }, [projectID]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownVisible(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOpen = (name) => {
    if (!dropdownVisible) {
      const selectedFile = files.find((f) => f.name === name);
      setFile(selectedFile);
      console.log("Opening file:", selectedFile.name);
    }
  };

  const handleAdd = () => {
    console.log("Add a new file");
  };

  const handleDelete = (name) => {
    console.log("Deleting file:", name);
    setDropdownVisible(null);
  };

  const handleCopy = (name) => {
    console.log("Copying file:", name);
    setDropdownVisible(null);
  };

  const toggleDropdown = (name) => {
    setDropdownVisible(dropdownVisible === name ? null : name);
  };

  const renderFileName = (name) => {
    const parts = name.split("/");
    return (
      <>
        <span className="text-gray-500">{parts.slice(0, -1).join("/") + "/"}</span>
        <span className="text-gray-800 font-medium">{parts[parts.length - 1]}</span>
      </>
    );
  };

  const renderFileIcon = (name) => {
    console.log(name);
    if (name.endsWith(".html")) return <FileText className="w-5 h-5 text-orange-500" />;
    if (name.endsWith(".css")) return <Palette className="w-5 h-5 text-blue-500" />;
    if (name.endsWith(".js")) return <FileCode className="w-5 h-5 text-yellow-500" />;
    return <FileText className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Project Files</h2>
      <ul className="space-y-2">
        {files.map((f) => (
          <li
            key={f.name}
            className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
              file?.name === f.name
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => handleOpen(f.name)}
          >
            <div className="flex items-center space-x-2">
              {renderFileIcon(f.name)}
              <div>{renderFileName(f.name)}</div>
            </div>

            {/* Dropdown Button */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown(f.name);
                }}
                className="p-2 text-gray-500 hover:text-blue-500"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {dropdownVisible === f.name && (
                <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(f.name);
                    }}
                    className="block px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(f.name);
                    }}
                    className="block px-4 py-2 text-blue-500 hover:bg-gray-100"
                  >
                    Copy&nbsp;&nbsp;
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={handleAdd}
        className="w-full mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Create New File
      </button>
    </div>
  );
};

export default ProjectFileSideBar;
