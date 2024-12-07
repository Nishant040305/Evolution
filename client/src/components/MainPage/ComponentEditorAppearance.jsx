import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setProperty } from "../../Store/webElementSlice";
import '../../style/ComponentsClass.css';
import {fonts,fontWeight} from "../../constants/Fonts";
const ComponentEditorAppearance = ({ id }) => {
  const [on, setOFF] = useState(false);
  const webElements = useSelector((state) => state.webElement.present);
  const element = webElements[id];
  const dispatch = useDispatch();
  const handleAppearanceChange = (property, value) => {
    dispatch(setProperty({ id: id, property: property, value: value }));
  };

  const handlePaddingChange = (side, value) => {
    handleAppearanceChange(`padding${side}`, `${value}px`);
  };

  return (
    <div className="p-4 space-y-4 bg-white border border-gray-300 rounded-lg shadow-sm appearance-editor">
      <h3 className="flex items-center justify-between text-lg font-semibold text-gray-800">
        Appearance Properties
        <button
          onClick={() => setOFF((prev) => !prev)}
          className="p-1 ml-2 text-gray-500 transition rounded hover:text-gray-700"
        >
          {on ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </h3>

      {on && (
        <>
          {/* Color */}
          <label className="flex flex-row justify-between items-center text-gray-700">
            <span className="font-medium">Color:</span>
            <input
              type="color"
              value={element.styles.color || "#000000"}
              onChange={(e) => handleAppearanceChange("color", e.target.value)}
              className="p-1 border border-gray-300 color-picker"
            />
          </label>

          {/* Background Color */}
          <label className="flex flex-row justify-between items-center text-gray-700">
            <span className="font-medium">Background Color:</span>
            <input
              type="color"
              value={element.styles.backgroundColor || "#ffffff"}
              onChange={(e) =>
                handleAppearanceChange("backgroundColor", e.target.value)
              }
              className="p-1 border border-gray-300 color-picker"
            />
          </label>

          {/* Font Size */}
          <label className="flex flex-col text-gray-700">
            <span className="font-medium">Font Size:</span>
            <input
              type="number"
              value={parseInt(element.styles.fontSize) || ""}
              onChange={(e) =>
                handleAppearanceChange("fontSize", `${e.target.value}px`)
              }
              className="p-1 mt-1 border border-gray-300 rounded"
              placeholder="px"
            />
          </label>

          {/* Font Family */}
          <label className="flex flex-col text-gray-700">
            <span className="font-medium">Font Family:</span>
            <select
              value={element.styles.fontFamily || "Arial"}
              onChange={(e) =>
                handleAppearanceChange("fontFamily", e.target.value)
              }
              className="p-1 mt-1 bg-white border border-gray-300 rounded"
            >
             {fonts.map((font) => (
              <option
                key={font}
                value={font}
                style={{ fontFamily: font }}
              >
                {font}
              </option>
            ))}
            </select>
          </label>

          {/* Font Weight */}
          <label className="flex flex-col text-gray-700">
          <span className="font-medium">Font Weight:</span>
          <select
            value={element.styles.fontWeight || "normal"}
            onChange={(e) => handleAppearanceChange("fontWeight", e.target.value)}
            className="p-1 mt-1 bg-white border border-gray-300 rounded"
          >
    {fontWeight.map((fontWeight) => (
            <option
            key={fontWeight.value}
            value={fontWeight.value}
            style={{ fontWeight: fontWeight.value }}
          >    
        {fontWeight.label} ({fontWeight.value})
      </option>
    ))}
          </select>
        </label>


          {/* Text Align */}
          <label className="flex flex-col text-gray-700">
            <span className="font-medium">Text Align:</span>
            <select
              value={element.styles.textAlign || "left"}
              onChange={(e) =>
                handleAppearanceChange("textAlign", e.target.value)
              }
              className="p-1 mt-1 bg-white border border-gray-300 rounded"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
              <option value="justify">Justify</option>
            </select>
          </label>

          {/* Border Color */}
          <label className="flex flex-row items-center justify-between text-gray-700">
            <span className="font-medium">Border Color:</span>
            <input
              type="color"
              value={element.styles.borderColor || "#000000"}
              onChange={(e) =>
                handleAppearanceChange("borderColor", e.target.value)
              }
              className="p-1  border border-gray-300 color-picker"
            />
          </label>

          {/* Padding */}
          <h4 className="mt-4 font-semibold text-gray-800">Padding</h4>
          <div className="grid grid-cols-2 gap-2 text-gray-700">
            {["Top", "Bottom", "Left", "Right"].map((side) => (
              <label key={side} className="flex flex-col">
                <span className="font-medium">{side}:</span>
                <input
                  type="number"
                  value={parseInt(element.styles[`padding${side}`]) || 0}
                  onChange={(e) => handlePaddingChange(side, e.target.value)}
                  className="p-1 mt-1 border border-gray-300 rounded"
                />
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ComponentEditorAppearance;
