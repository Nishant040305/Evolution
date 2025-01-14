/**
 * This component is a custom select modal for file selection.
 *
 * It requires the following props:
 * handleClose: A function to close the modal
 * handleSelect: A function to handle the selection of files
 * options: An array of objects containing the file names and their respective checked status
 * selectOption: A string indicating whether to allow multiple selection or single selection
 */

import React, { useState } from 'react';
import '../../style/SelectModal.css'; // Import custom CSS for modal
import { X } from 'lucide-react';
import { FileText, Palette, FileCode } from 'lucide-react'; // Icons for file types

// Function to render icons based on file type
const renderFileIcon = (name) => {
  if (name.endsWith('.html'))
    return <FileText className="w-5 h-5 text-orange-500" />;
  if (name.endsWith('.css'))
    return <Palette className="w-5 h-5 text-blue-500" />;
  if (name.endsWith('.js'))
    return <FileCode className="w-5 h-5 text-yellow-500" />;
  return <FileText className="w-5 h-5 text-gray-500" />;
};

const SelectModal = ({ handleClose, handleSelect, options, selectOption }) => {
  // Local state to track selected options in this modal
  const [tempSelectedOptions, setTempSelectedOptions] = useState([]);

  // Handle checkbox select (single or multiple)
  const handleCheckboxChange = (option, checked) => {
    if (selectOption === 'multiple') {
      // For multiple selection, allow adding/removing options
      if (checked) {
        setTempSelectedOptions((prevSelected) => [
          ...prevSelected,
          option.name,
        ]);
      } else {
        setTempSelectedOptions((prevSelected) =>
          prevSelected.filter((item) => item !== option.name)
        );
      }
    } else if (selectOption === 'single') {
      // For single selection, select the new option and overwrite the previous selection
      if (checked) {
        setTempSelectedOptions(option); // Replace with the new selected option
      }
    }
  };

  // Handle the "Select" button click to confirm the selection
  const handleSelectClick = () => {
    if (tempSelectedOptions.length === 0) {
      handleClose(); // Close the modal if no files are selected
      return;
    }

    handleSelect(tempSelectedOptions); // Pass the selected options to the parent
    handleClose(); // Close the modal after selection
  };

  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <h5>Select the Files</h5>
          <button className="close-btn" onClick={handleClose}>
            <X className="text-gray-700" />
          </button>
        </div>
        <div className="custom-modal-body">
          <ul className="list-unstyled ">
            {options.map((option, index) => (
              <li key={index} className="flex items-center space-x-3">
                <button
                  className={`option-btn p-3  border-b border-gray-200 rounded-lg ${(selectOption == 'single' ? tempSelectedOptions == option : tempSelectedOptions.includes(option.name)) ? 'selected' : 'bg-white'}`}
                  onClick={() =>
                    handleCheckboxChange(
                      option,
                      !(selectOption == 'single'
                        ? tempSelectedOptions == option
                        : tempSelectedOptions.includes(option.name))
                    )
                  }
                >
                  {renderFileIcon(option.name)}
                  <span>{option.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="custom-modal-footer">
          <button className="close-btn" onClick={handleClose}>
            Close
          </button>
          <button className="select-btn" onClick={handleSelectClick}>
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectModal;
