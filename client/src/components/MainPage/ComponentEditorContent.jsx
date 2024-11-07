import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAttribute, setContent } from "../../Store/webElementSlice";

const ComponentEditorContent = ({ id }) => {
  const webElements = useSelector((state) => state.webElement.present);
  const element = webElements[id];
  const dispatch = useDispatch();

  const handleContentChange = (property, value) => {
    dispatch(setContent({ id, property, value }));
  };

  const handleAttributeChange = (property, value) => {
    dispatch(setAttribute({ id, property, value }));
  };

  return (
    <div className="p-4 space-y-4 bg-white border border-gray-300 rounded-lg shadow-sm appearance-editor">
      <h3 className="text-xl font-semibold text-gray-700">
        Content Properties
      </h3>

      {/* Textarea Content */}
      {element.type === "textarea" && (
        <div>
          <label className="block mb-1 font-medium text-gray-600">
            Content:
            <textarea
              value={element.attributes.placeholder || ""}
              onChange={(e) =>
                handleAttributeChange("placeholder", e.target.value)
              }
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter text content here"
            />
          </label>
        </div>
      )}

      {/* Input Placeholder */}
      {element.type === "input" && (
        <div>
          <label className="block mb-1 font-medium text-gray-600">
            Placeholder:
            <input
              type="text"
              value={element.attributes.placeholder || ""}
              onChange={(e) =>
                handleAttributeChange("placeholder", e.target.value)
              }
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter placeholder text"
            />
          </label>
        </div>
      )}

      {/* Label Content */}
      {element.type === "label" && (
        <div>
          <label className="block mb-1 font-medium text-gray-600">
            Content:
            <input
              type="text"
              value={element.content || ""}
              onChange={(e) => handleContentChange("content", e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter label content"
            />
          </label>
        </div>
      )}

      {/* Select Options (Work in Progress) */}
      {element.type === "select" && (
        <div>
          <label className="block mb-1 font-medium text-gray-600">
            Options:
          </label>
          {(element.attributes.content || []).map((option, index) => (
            <div key={index} className="flex items-center mb-2 space-x-2">
              <input
                type="text"
                value={option.label}
                onChange={(e) => {
                  const updatedOptions = [...element.attributes.content];
                  updatedOptions[index] = {
                    ...updatedOptions[index],
                    label: e.target.value,
                  };
                  handleAttributeChange("content", updatedOptions);
                }}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={() => {
                  const updatedOptions = element.attributes.content.filter(
                    (_, i) => i !== index
                  );
                  handleAttributeChange("content", updatedOptions);
                }}
                className="p-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              handleAttributeChange("content", [
                ...(element.attributes.content || []),
                { label: "", value: "" },
              ])
            }
            className="w-full p-2 mt-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Option
          </button>
        </div>
      )}

      {/* Button Text */}
      {element.type === "button" && (
        <div>
          <label className="block mb-1 font-medium text-gray-600">
            Button Text:
            <input
              type="text"
              value={element.content || ""}
              onChange={(e) => handleContentChange("content", e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter button text"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default ComponentEditorContent;
