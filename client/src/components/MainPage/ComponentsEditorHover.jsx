import React, { useState } from "react";
import { ChevronDown, ChevronUp, Component } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setProperty } from "../../Store/webElementSlice";
/* Work Required */
const ComponentEditorHover = ({ id }) => {
  const webElements = useSelector((state) => state.webElement.present);
  const element = webElements[id];
  const [on, setOFF] = useState(false);

  const dispatch = useDispatch();

  const handleAdvancedChange = (property, value) => {
    dispatch(setProperty({ id: id, property: property, value: value }));
  };


  const [hoverStyles, setHoverStyles] = useState(element.styles.hover || {});

  const handleHoverChange = (property, value) => {
    setHoverStyles((prev) => ({
      ...prev,
      [property]: value,
    }));
    handleAdvancedChange("hover", { ...hoverStyles, [property]: value });
  };


  return (
    <div className="p-4 space-y-4 bg-white border border-gray-300 rounded-lg shadow-sm appearance-editor">
      <h3 className="flex items-center text-base font-semibold text-gray-800">
        Hover Properties<small>(in work)</small>
        <button onClick={() => setOFF((prev) => !prev)} className="ml-auto">
          {on ? (
            <ChevronUp className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </h3>

      {on && (
        <>
            {/* Hover Properties */}
            <h4 className="mt-8 mb-4 font-semibold text-gray-700">
            </h4>
            <div className="space-y-3">
              <label className="flex flex-row justify-between items-center">
                <span className="font-medium text-gray-600">Color:</span>
                <input
                  type="color"
                  value={hoverStyles.color || "#000000"}
                  onChange={(e) => handleHoverChange("color", e.target.value)}
                  className="p-1 mt-1 border border-gray-300 rounded focus:outline-none color-picker"
                />
              </label>
              <label className="flex flex-row justify-between items-center">
                <span className="font-medium text-gray-600">
                  Background Color:
                </span>
                <input
                  type="color"
                  value={hoverStyles.backgroundColor || "#ffffff"}
                  onChange={(e) =>
                    handleHoverChange("backgroundColor", e.target.value)
                  }
                  className="p-1 mt-1 border border-gray-300 rounded focus:outline-none color-picker"
                />
              </label>
              <label className="flex flex-col">
                <span className="font-medium text-gray-600">
                  Hover Box Shadow:
                </span>
                <input
                  type="text"
                  placeholder="e.g., 5px 5px 10px #000000"
                  value={hoverStyles.boxShadow || ""}
                  onChange={(e) =>
                    handleHoverChange("boxShadow", e.target.value)
                  }
                  className="p-1 mt-1 border border-gray-300 rounded focus:outline-none"
                />
              </label>
            </div>
        </>
      )}
    </div>
  );
};

export default ComponentEditorHover;
