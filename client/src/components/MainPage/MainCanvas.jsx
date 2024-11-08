import { useEffect, useState } from "react";
import ComponentRenderer from "./ComponentRenderer";
import { useSelector, useDispatch } from "react-redux";
import { setPosition } from "../../Store/webElementSlice";

const MainCanvas = () => {
  const dispatch = useDispatch();
  const webElements = useSelector(state => state.webElement.present);

  const handleDragOver = (event) => {
    event.preventDefault(); // Allow elements to be dropped by preventing default behavior
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    const { id: draggedElementId, offsetX, offsetY } = data;
    const element = webElements[draggedElementId];

    if (element) {
      // Calculate drop position relative to the canvas
      const canvasRect = event.currentTarget.getBoundingClientRect();
      const dx = event.clientX - canvasRect.left - offsetX;
      const dy = event.clientY - canvasRect.top - offsetY;

      dispatch(setPosition({ id: draggedElementId, dx, dy }));
    }
  };

  const handleDragEnter = (event) => {
    console.log("Drag entered canvas");
  };

  const handleDragLeave = (event) => {
    console.log("Drag left canvas");
  };

  return (
    <div className="flex-1 p-8 overflow-auto bg-gray-100">
      <div className="min-h-full p-8 bg-white rounded-lg shadow-lg">
        <div
          id="canvas"
          className="flex items-center justify-center rounded-lg h-96 relative"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          {Object.keys(webElements).length === 0 ? (
            <p className="text-gray-500">Drag and drop elements here</p>
          ) : null}
          {Object.values(webElements).map((component) => (
            <ComponentRenderer
              key={component.id}
              instance={component}
              webElements={webElements}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCanvas;
