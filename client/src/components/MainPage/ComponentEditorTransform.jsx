import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPosition,
  setProperty,
  setTransform,
} from "../../Store/webElementSlice";
const Map={
  "TopL":"borderTopLeftRadius",
  "TopR":"borderTopRightRadius",
  "BotR":"borderBottomRightRadius", 
  "BotL":"borderBottomLeftRadius"
}
const ComponentEditorTransform = ({ id }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const webElements = useSelector((state) => state.webElement.present);
  const element = webElements[id];
  const dispatch = useDispatch();

  const handleTransformChange = (property, value) => {
    dispatch(setProperty({ id, property, value }));
  };

  const handleRotationChange = (value) => {
    const currentTransform = element.styles.transform || "";
    const updatedTransform = `${currentTransform.replace(
      /rotate\([^)]+\)/,
      ""
    )} rotate(${value}deg)`;
    dispatch(setTransform({ id, transform: updatedTransform }));
  };

  const handleReflectionChange = (direction) => {
    const currentTransform = element.styles.transform || "";
    const reflectionTransform =
      direction === "horizontal" ? "scaleX(-1)" : "scaleY(-1)";
    const updatedTransform = `${currentTransform.replace(
      /scale[XY]\(-1\)/,
      ""
    )} ${reflectionTransform}`;
    dispatch(setTransform({ id, transform: updatedTransform }));
  };
  const handleAppearanceChange = (property, value) => {
    dispatch(setProperty({ id: id, property: property, value: value }));
  };

  const handleMarginChange= (side, value) => {
    handleAppearanceChange(`margin${side}`, `${value}px`);
  };
  const handlePositionChangeX = (value) => {
    console.log(value);
    dispatch(setPosition({ id, dx: parseFloat(value), dy: element.position.y }));
  };
  const handlePositionChangeY = (value) => {
    dispatch(setPosition({ id, dx: element.position.x, dy: parseFloat(value) }));
  };
  return (
    <div className="p-4 space-y-3 border border-gray-300 rounded-lg">
      <h3 className="flex items-center text-lg font-semibold">
        Transform Properties
        <button onClick={() => setIsExpanded((prev) => !prev)} className="ml-2">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </h3>

      {isExpanded && (
        <div className="space-y-2">
          {/* Rotation */}
          <label className="flex items-center">
            <span className="w-32">Rotation (deg):</span>
            <input
              type="number"
              defaultValue={0}
              onChange={(e) => handleRotationChange(e.target.value)}
              className="w-full p-1 ml-2 border border-gray-300 rounded"
            />
          </label>

          {/* X Position */}
          {webElements[id].position?(
            <>
          <label className="flex items-center">
            <span className="w-32">X Position:</span>
            <input
              type="number"
              value={element.position.x}
              onChange={(e) => handlePositionChangeX(e.target.value)}
              className="w-full p-1 ml-2 border border-gray-300 rounded"
            />
          </label>

          {/* Y Position */}
          <label className="flex items-center">
            <span className="w-32">Y Position:</span>
            <input
              type="number"
              value={element.position.y}
              onChange={(e) => handlePositionChangeY(e.target.value)}
              className="w-full p-1 ml-2 border border-gray-300 rounded"
            />
          </label>
          </>):(
            <>
            <h4 className="mt-4 font-semibold text-gray-800">Margin</h4>
          <div className="grid grid-cols-2 gap-2 text-gray-700">
            {["Top", "Bottom", "Left", "Right"].map((side) => (
              <label key={side} className="flex flex-col">
                <span className="font-medium">{side}:</span>
                <input
                  type="number"
                  value={parseInt(element.styles[`margin${side}`]) || 0}
                  onChange={(e) => handleMarginChange(side, e.target.value)}
                  className="p-1 mt-1 border border-gray-300 rounded"
                />
              </label>
            ))}
          </div>
          </>
          )}

          {/* Width */}
          <label className="flex items-center">
            <span className="w-32">Width:</span>
            <input
              type="number"
              value={element.styles.width ? parseInt(element.styles.width) : ""}
              onChange={(e) =>
                handleTransformChange(
                  "width",
                  e.target.value ? `${e.target.value}px` : "auto"
                )
              }
              className="w-full p-1 ml-2 border border-gray-300 rounded"
              placeholder="auto"
            />
          </label>

          {/* Height */}
          <label className="flex items-center">
            <span className="w-32">Height:</span>
            <input
              type="number"
              value={
                element.styles.height ? parseInt(element.styles.height) : ""
              }
              onChange={(e) =>
                handleTransformChange(
                  "height",
                  e.target.value ? `${e.target.value}px` : "auto"
                )
              }
              className="w-full p-1 ml-2 border border-gray-300 rounded"
              placeholder="auto"
            />
          </label>

          {/* Reflection */}
          <label className="flex items-center">
            <span className="w-32">Reflection:</span>
            <select
              onChange={(e) => handleReflectionChange(e.target.value)}
              className="w-full p-1 ml-2 border border-gray-300 rounded"
            >
              <option value="">None</option>
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
          </label>

          {/* Border Radius */}
          <h4 className="mt-3 font-semibold">Border Radius</h4>
          <div className="grid grid-cols-2 gap-4">
            {["TopL", "TopR", "BotR", "BotL"].map((corner) => (
              <div key={corner} className="flex items-center">
                <label className="w-32">{corner}:</label>
                <input
                  type="text"
                  placeholder={(element.styles[Map[corner]])}
                  onChange={(e) =>
                    handleTransformChange(
                      `${Map[corner]}`,
                      `${e.target.value}px`
                    )
                  }
                  className="w-full p-1 border border-gray-300 rounded"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentEditorTransform;
