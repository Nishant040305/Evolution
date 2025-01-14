import React, { useState } from 'react';
import { parseOnClick } from '../../scripts/parserFunctions';
import buttonFunctions from '../../constants/functions.json';
const ButtonContent = ({
  handleContentChange,
  handleHtmlAttributes,
  element,
  toast,
}) => {
  const predefinedActions = buttonFunctions.buttonsFuntions;
  const initialAction = parseOnClick(element.HTMLAttributes?.onclick);

  const [action, setAction] = useState(initialAction);
  const [actionValues, setActionValues] = useState({
    alert: initialAction.type === 'alert' ? initialAction.value : '',
    'console.log':
      initialAction.type === 'console.log' ? initialAction.value : '',
    navigate: initialAction.type === 'navigate' ? initialAction.value : '',
    custom: initialAction.type === 'custom' ? initialAction.value : '',
  });

  const handlePredefinedActionChange = (type) => {
    // Save the current value before switching
    setActionValues((prev) => ({
      ...prev,
      [action.type]: action.value,
    }));

    // Switch to the new type and load the stored value
    setAction({ type, value: actionValues[type] || '' });
  };

  const handleActionValueChange = (value) => {
    setAction((prev) => ({ ...prev, value }));

    let functionCall = '';
    if (action.type === 'custom') {
      functionCall = value;
    } else if (action.type === 'alert') {
      functionCall = `alert("${value}")`;
    } else if (action.type === 'console.log') {
      functionCall = `console.log("${value}")`;
    } else if (action.type === 'navigate') {
      functionCall = `window.location.href='${value}'`;
    }

    handleHtmlAttributes('onclick', functionCall); // Update function call format
  };

  const handleSubmit = () => {
    const { type, value } = action;
    console.log('Submitted onClick Action:', { type, value });
    toast.success('OnClick Action Updated!');
  };

  const selectedAction =
    predefinedActions.find((a) => a.type === action.type) ||
    predefinedActions[3];

  return (
    <>
      {/* Input for changing button text */}
      <label className="block mb-1 font-medium text-gray-600">
        Button Text:
        <input
          type="text"
          value={element.content || ''}
          onChange={(e) => handleContentChange('content', e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter button text"
        />
      </label>

      {/* Dropdown for predefined OnClick actions */}
      <label className="block mb-1 font-medium text-gray-600">
        OnClick Actions:
        <select
          value={action.type}
          onChange={(e) => handlePredefinedActionChange(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {predefinedActions.map((actionOption, index) => (
            <option key={index} value={actionOption.type}>
              {actionOption.label}
            </option>
          ))}
        </select>
      </label>

      {/* Input for action value */}
      {action.type !== 'custom' && (
        <label className="block mb-1 font-medium text-gray-600">
          {selectedAction.label} Value:
          <input
            type="text"
            value={action.value}
            onChange={(e) => handleActionValueChange(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder={`Enter ${selectedAction.label.toLowerCase()} value`}
          />
        </label>
      )}

      {/* Textarea for custom JavaScript */}
      {action.type === 'custom' && (
        <label className="block mb-1 font-medium text-gray-600">
          Custom OnClick Code:
          <textarea
            value={action.value}
            onChange={(e) => handleActionValueChange(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter JavaScript for onClick"
            rows="4"
          ></textarea>
        </label>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 px-3 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Set OnClick Actions
      </button>
    </>
  );
};

export default ButtonContent;
