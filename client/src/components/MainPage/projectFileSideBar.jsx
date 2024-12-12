import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react"; // Import MoreHorizontal for the 3-dot menu

const ProjectFileSideBar = () => {
  // Dummy project pages with images (without id field)
  const initialFiles = [
    { content: "Content for Home Page", imageUrl: "https://via.placeholder.com/150" },
    { content: "Content for About Us", imageUrl: "https://via.placeholder.com/150" },
    { content: "Content for Contact", imageUrl: "https://via.placeholder.com/150" },
  ];

  const [files, setFiles] = useState(initialFiles);

  // State to track the visibility of the dropdown menu
  const [dropdownVisible, setDropdownVisible] = useState(null);

  // Add a new page
  const handleAdd = () => {
    const newFile = {
      content: `Content for Page ${files.length + 1}`,
      imageUrl: "https://via.placeholder.com/150", // Replace with actual image URL
    };
    setFiles([...files, newFile]);
  };

  // Delete a page by index
  const handleDelete = (index) => {
    setFiles(files.filter((_, i) => i !== index)); // Filter out the file at the specified index
    setDropdownVisible(null); // Reset the dropdown visibility when a page is deleted
  };

  // Copy a page (duplicate and insert after the selected one)
  const handleCopy = (index) => {
    // Create a copy of the selected file object
    const copiedFile = { 
      ...files[index], 
      content: files[index].content + " (Copy)" // Modify the content for the copy
    };

    // Insert the copied file right after the current index
    const newFiles = [
      ...files.slice(0, index + 1), // Keep files before the selected index
      copiedFile,                  // Insert the copied file
      ...files.slice(index + 1),   // Keep files after the selected index
    ];
    setDropdownVisible(null)

    setFiles(newFiles);
  };

  // Toggle dropdown visibility
  const toggleDropdown = (index) => {
    setDropdownVisible(dropdownVisible === index ? null : index);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Project Pages</h2>
      <div className="space-y-2 items-center flex flex-col">
        {files.map((file, index) => (
          <div className="p-2" key={index}> {/* Use index as the key */}
            <div
              className="relative flex flex-col items-center justify-between p-4 rounded-md shadow-sm hover:bg-gray-100"
              style={{
                backgroundImage: `url(${file.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "150px",
                height: "150px",
              }}
            >
              {/* More Options (Delete, Copy) */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the page click from being triggered
                  toggleDropdown(index); // Toggle the dropdown for the current page by index
                }}
                className="absolute top-2 right-2 p-2 text-gray-400 rounded-full hover:text-blue-500 hover:bg-gray-50"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {/* Dropdown Menu for Delete and Copy */}
              {dropdownVisible === index && (
                <div className="absolute top-10 right-0 p-2 mt-2 bg-white rounded-md shadow-md">
                  <button
                    onClick={() => handleDelete(index)} // Delete the page by index
                    className="block px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleCopy(index)} // Copy the page and insert after
                    className="block px-4 py-2 text-blue-500 hover:bg-gray-100"
                  >
                    Copy
                  </button>
                </div>
              )}
            </div>

            {/* Page Index (dynamically display index based on position in array) */}
            <div className="mt-2 text-gray-700 font-semibold text-center">
              {index + 1} {/* Display the index based on the position in the array (1-based index) */}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Page Button */}
      <button
        onClick={handleAdd}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Add New Page
      </button>
    </div>
  );
};

export default ProjectFileSideBar;
