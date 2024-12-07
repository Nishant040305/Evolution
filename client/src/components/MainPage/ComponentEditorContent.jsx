import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAttribute, setContent, setProperty, setHtmlAttributes } from "../../Store/webElementSlice";
import ButtonContent from "../ComponentsFunction/ButtonContent";
const ComponentEditorContent = ({ id , toast }) => {
  const webElements = useSelector((state) => state.webElement.present);
  const element = webElements[id];
  const dispatch = useDispatch();

  const handleContentChange = (property, value) => {
    dispatch(setContent({ id, property, value }));
  };

  const handleAttributeChange = (property, value) => {
    dispatch(setAttribute({ id, property, value }));
  };

  const updateGridStyles = (property, value) => {
    dispatch(setProperty({ id, property, value }));
  };
  const handleHtmlAttributes = (property, value) => {
    dispatch(setHtmlAttributes({ id, property, value }));
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
      {/* Button Content */}
      {element.type === "button" && (
        <ButtonContent handleContentChange={handleContentChange} handleHtmlAttributes={handleHtmlAttributes} element={element} toast={toast} />
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

      
      {/* Layout Options */}
      {element.type === "div" && (
        <div>
          <label className="block mb-1 font-medium text-gray-600">
            Display Type:
            <select
              value={element.styles.display || ""}
              onChange={(e) =>
                dispatch(
                  setProperty({ id: element.id, property: "display", value: e.target.value })
                )
              }
              className="w-full p-2 mt-1 border border-gray-300 rounded"
            >
              <option value="block">Block</option>
              <option value="flex">Flex</option>
              <option value="grid">Grid</option>
            </select>
          </label>

          {/* Flex Layout Controls */}
          {element.styles.display === "flex" && (
            <>
              <label className="block mb-1 font-medium text-gray-600">
                Flex Direction:
                <select
                  value={element.styles.flexDirection || ""}
                  onChange={(e) =>
                    dispatch(
                      setProperty({
                        id: element.id,
                        property: "flexDirection",
                        value: e.target.value,
                      })
                    )
                  }
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                >
                  <option value="row">Row</option>
                  <option value="column">Column</option>
                </select>
              </label>

              <label className="block mb-1 font-medium text-gray-600">
                Justify Content:
                <select
                  value={element.styles.justifyContent || ""}
                  onChange={(e) =>
                    dispatch(
                      setProperty({
                        id: element.id,
                        property: "justifyContent",
                        value: e.target.value,
                      })
                    )
                  }
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                >
                  <option value="flex-start">Flex Start</option>
                  <option value="center">Center</option>
                  <option value="flex-end">Flex End</option>
                  <option value="space-between">Space Between</option>
                  <option value="space-around">Space Around</option>
                  <option value="space-evenly">Space Evenly</option>
                </select>
              </label>

              <label className="block mb-1 font-medium text-gray-600">
                Align Items:
                <select
                  value={element.styles.alignItems || ""}
                  onChange={(e) =>
                    dispatch(
                      setProperty({
                        id: element.id,
                        property: "alignItems",
                        value: e.target.value,
                      })
                    )
                  }
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                >
                  <option value="stretch">Stretch</option>
                  <option value="center">Center</option>
                  <option value="flex-start">Flex Start</option>
                  <option value="flex-end">Flex End</option>
                </select>
              </label>
            </>
          )}

          {/* Grid Layout Controls */}
          {element.styles.display === "grid" && (
            <>
              <label className="block mb-1 font-medium text-gray-600">
                Grid Template Columns:
                <input
                  type="text"
                  value={element.styles.gridTemplateColumns || ""}
                  onChange={(e) =>
                    updateGridStyles("gridTemplateColumns", e.target.value)
                  }
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  placeholder="e.g., 1fr 1fr"
                />
              </label>

              <label className="block mb-1 font-medium text-gray-600">
                Grid Template Rows:
                <input
                  type="text"
                  value={element.styles.gridTemplateRows || ""}
                  onChange={(e) =>
                    updateGridStyles("gridTemplateRows", e.target.value)
                  }
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  placeholder="e.g., auto"
                />
              </label>

              <label className="block mb-1 font-medium text-gray-600">
                Gap:
                <input
                  type="text"
                  value={element.styles.gap || ""}
                  onChange={(e) => updateGridStyles("gap", e.target.value)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  placeholder="e.g., 10px"
                />
              </label>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ComponentEditorContent;
