import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setProperty } from "../../Store/webElementSlice";

const ComponentEditorAdvanced = ({ id }) => {
  const webElements = useSelector((state) => state.webElement.present);
  const element = webElements[id];
  const [on, setOFF] = useState(false);

  const dispatch = useDispatch();

  const handleAdvancedChange = (property, value) => {
    dispatch(setProperty({ id: id, property: property, value: value }));
  };

  const handleBorderWidthChange = (side, value) => {
    handleAdvancedChange(`border${side}Width`, `${value}px`);
  };

  const [hoverStyles, setHoverStyles] = useState(element.styles.hover || {});

  const handleHoverChange = (property, value) => {
    setHoverStyles((prev) => ({
      ...prev,
      [property]: value,
    }));
    handleAdvancedChange("hover", { ...hoverStyles, [property]: value });
  };

  const boxShadow = element.styles.boxShadow || "0px 0px 0px 0px #000000";

  const [shadowParams, setShadowParams] = useState({
    horizontalOffset: boxShadow.split(" ")[0] || "0px",
    verticalOffset: boxShadow.split(" ")[1] || "0px",
    blurRadius: boxShadow.split(" ")[2] || "0px",
    spreadRadius: boxShadow.split(" ")[3] || "0px",
    color: boxShadow.split(" ")[4] || "#000000",
  });

  const handleShadowChange = (property, value) => {
    setShadowParams((prev) => ({
      ...prev,
      [property]: value,
    }));

    const {
      horizontalOffset,
      verticalOffset,
      blurRadius,
      spreadRadius,
      color,
    } = {
      ...shadowParams,
      [property]: value,
    };

    const newBoxShadow = `${horizontalOffset} ${verticalOffset} ${blurRadius} ${spreadRadius} ${color}`;
    dispatch(
      setProperty({ id: id, property: "boxShadow", value: newBoxShadow })
    );
  };

  return (
    <div className="p-4 space-y-4 bg-white border border-gray-300 rounded-lg shadow-sm appearance-editor">
      <h3 className="flex items-center text-lg font-semibold text-gray-800">
        Advanced Properties
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
          {/* Border Width */}
          <h4 className="mt-3 font-semibold text-gray-700">Border Width</h4>
          <div className="grid grid-cols-2 gap-4 p-3 bg-white border border-gray-200 rounded">
            {["Top", "Bottom", "Left", "Right"].map((side) => (
              <label key={side} className="flex flex-col">
                <span className="font-medium text-gray-600">{side}:</span>
                <input
                  type="number"
                  value={parseInt(element.styles[`border${side}Width`]) || 0}
                  onChange={(e) =>
                    handleBorderWidthChange(side, e.target.value)
                  }
                  className="p-1 mt-1 border border-gray-300 rounded focus:border-gray-400 focus:outline-none"
                />
              </label>
            ))}
          </div>

          {/* Cursor */}
          <div className="mt-4">
            <label className="flex flex-col">
              <span className="font-medium text-gray-700">Cursor:</span>
              <select
                value={element.styles.cursor || "default"}
                onChange={(e) => handleAdvancedChange("cursor", e.target.value)}
                className="p-1 mt-1 border border-gray-300 rounded focus:border-gray-400 focus:outline-none"
              >
                <option value="default">Default</option>
                <option value="pointer">Pointer</option>
                <option value="text">Text</option>
                <option value="move">Move</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </label>
          </div>

          {/* Box Shadow Controls */}
          <h4 className="mt-3 font-semibold text-gray-700">Box Shadow</h4>
          <div className="grid grid-cols-2 gap-4 p-3 bg-white border border-gray-200 rounded">
            <label className="flex flex-col">
              <span className="font-medium text-gray-600">
                Horizontal Offset
              </span>
              <input
                type="number"
                value={parseInt(shadowParams.horizontalOffset)}
                onChange={(e) =>
                  handleShadowChange("horizontalOffset", `${e.target.value}px`)
                }
                className="p-1 mt-1 border border-gray-300 rounded focus:border-gray-400 focus:outline-none"
              />
            </label>

            <label className="flex flex-col">
              <span className="font-medium text-gray-600">Vertical Offset</span>
              <input
                type="number"
                value={parseInt(shadowParams.verticalOffset)}
                onChange={(e) =>
                  handleShadowChange("verticalOffset", `${e.target.value}px`)
                }
                className="p-1 mt-1 border border-gray-300 rounded focus:border-gray-400 focus:outline-none"
              />
            </label>

            <label className="flex flex-col">
              <span className="font-medium text-gray-600">Blur Radius</span>
              <input
                type="number"
                value={parseInt(shadowParams.blurRadius)}
                onChange={(e) =>
                  handleShadowChange("blurRadius", `${e.target.value}px`)
                }
                className="p-1 mt-1 border border-gray-300 rounded focus:border-gray-400 focus:outline-none"
              />
            </label>

            <label className="flex flex-col">
              <span className="font-medium text-gray-600">Spread Radius</span>
              <input
                type="number"
                value={parseInt(shadowParams.spreadRadius)}
                onChange={(e) =>
                  handleShadowChange("spreadRadius", `${e.target.value}px`)
                }
                className="p-1 mt-1 border border-gray-300 rounded focus:border-gray-400 focus:outline-none"
              />
            </label>

            
          </div>
          <label className="flex flex-row justify-between items-center">
              <span className="font-medium text-gray-600">Color</span>
              <input
                type="color"
                value={shadowParams.color}
                onChange={(e) => handleShadowChange("color", e.target.value)}
                className="mt-1 border border-gray-300 rounded focus:outline-none color-picker"
              />
            </label>
          {/* Letter Spacing */}
          <div className="mt-4">
            <label className="flex flex-col">
              <span className="font-medium text-gray-700">Letter Spacing:</span>
              <input
                type="number"
                value={parseInt(element.styles.letterSpacing) || 0}
                onChange={(e) =>
                  handleAdvancedChange("letterSpacing", `${e.target.value}px`)
                }
                className="p-1 mt-1 border border-gray-300 rounded focus:border-gray-400 focus:outline-none"
                placeholder="px"
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default ComponentEditorAdvanced;
